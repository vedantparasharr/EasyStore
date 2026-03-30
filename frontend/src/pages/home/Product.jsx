import axios from "axios";
import { useState } from "react";
import { formatMoney } from "../../utils/money";

const API_URL = import.meta.env.VITE_API_URL;

export function Product({ id, image, name, ratingStars, ratingCount, priceCents, loadCart }) {

    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    const addToCart = async () => {
        await axios.post(`${API_URL}/api/cart-items`, {
            productId: id,
            quantity
        });

        setAdded(true);
        setTimeout(() => setAdded(false), 1500);

        loadCart();
    };

    const selectQuantity = (event) => {
        const quantitySelected = Number(event.target.value);
        setQuantity(quantitySelected);
    };

    return (
        <div
            className="group bg-surface-container rounded-2xl p-5 flex flex-col transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-surface-high hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(71,70,74,0.08)]"
            data-id={id}
        >
            {/* Product Image */}
            <div className="flex items-center justify-center h-44 mb-5 rounded-xl bg-surface-low/50 p-3">
                <img
                    className="max-w-full max-h-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
                    src={`${API_URL}/${image}`}
                    alt={name}
                />
            </div>

            {/* Product Name */}
            <div className="font-body text-sm text-on-surface line-clamp-2 h-10 mb-2">
                {name}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mb-3">
                <img
                    className="w-24"
                    src={`${API_URL}/images/ratings/rating-${ratingStars * 10}.png`}
                    alt={`${ratingStars} stars`}
                />
                <span className="text-xs text-primary-fixed-dim mt-0.5">
                    {ratingCount}
                </span>
            </div>

            {/* Price */}
            <div className="font-headline text-lg font-bold text-on-surface tracking-tight mb-3">
                {formatMoney(priceCents)}
            </div>

            {/* Quantity Selector */}
            <div className="mb-4">
                <select
                    value={quantity}
                    onChange={selectQuantity}
                    className="bg-surface-lowest text-on-surface text-sm border border-outline-variant/15 rounded-lg px-3 py-1.5 cursor-pointer focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(78,222,163,0.15)] transition-all duration-200 appearance-auto"
                >
                    {Array.from({ length: 10 }, (_, i) => (
                        <option key={i} value={i + 1}>{i + 1}</option>
                    ))}
                </select>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Added to Cart Message */}
            <div
                className="flex items-center gap-1.5 mb-2 text-sm text-primary transition-opacity duration-300"
                style={{ opacity: added ? 1 : 0 }}
            >
                <img className="h-4.5" src={`${API_URL}/images/icons/checkmark.png`} alt="" />
                Added
            </div>

            {/* Add to Cart Button */}
            <button
                className="w-full py-2.5 bg-gradient-to-br from-primary to-primary-container text-on-primary font-semibold text-sm rounded-lg cursor-pointer hover:brightness-110 hover:shadow-[0_4px_16px_rgba(78,222,163,0.25)] active:brightness-95 transition-all duration-200"
                onClick={addToCart}
            >
                Add to Cart
            </button>
        </div>
    );
}
