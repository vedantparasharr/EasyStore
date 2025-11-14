import axios from "axios";
import { useState } from "react";
import { formatMoney } from "../../utils/money";

const API_URL = "https://easycart-u08y.onrender.com";

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
        <div className="product-container" data-id={id}>
            <div className="product-image-container">
                <img
                    className="product-image"
                    src={`${API_URL}/${image}`}
                />
            </div>

            <div className="product-name limit-text-to-2-lines">
                {name}
            </div>

            <div className="product-rating-container">
                <img
                    className="product-rating-stars"
                    src={`${API_URL}/images/ratings/rating-${ratingStars * 10}.png`}
                />
                <div className="product-rating-count link-primary">
                    {ratingCount}
                </div>
            </div>

            <div className="product-price">
                {formatMoney(priceCents)}
            </div>

            <div className="product-quantity-container">
                <select value={quantity} onChange={selectQuantity}>
                    {Array.from({ length: 10 }, (_, i) => (
                        <option key={i} value={i + 1}>{i + 1}</option>
                    ))}
                </select>
            </div>

            <div className="product-spacer" />

            <div className="added-to-cart" style={{ opacity: added ? 1 : 0 }}>
                <img src={`${API_URL}/images/icons/checkmark.png`} />
                Added
            </div>

            <button
                className="add-to-cart-button button-primary"
                onClick={addToCart}
            >
                Add to Cart
            </button>
        </div>
    );
}
