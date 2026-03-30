import dayjs from "dayjs";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export function OrderDetailsGrid({ order, loadCart }) {
    if (!order?.products?.length) return null;

    return order.products.map((product) => {
        let quantity = 0;

        const addToCart = async () => {
            quantity = quantity + 1;
            await axios.post(`${API_URL}/api/cart-items`, {
                productId: product.productId,
                quantity: quantity
            });
            loadCart();
        };

        return (
            <div key={product.productId} className="grid grid-cols-[110px_1fr_200px] max-md:grid-cols-[110px_1fr] max-sm:grid-cols-1 gap-x-8 gap-y-4 p-6 items-center">
                {/* Product Image */}
                <div className="flex justify-center max-sm:mb-2">
                    <img
                        className="max-w-[110px] max-h-[110px] rounded-xl"
                        src={`${API_URL}/${product.product.image}`}
                        alt={product.product.name}
                    />
                </div>

                {/* Product Details */}
                <div>
                    <div className="font-headline font-bold text-on-surface tracking-tight mb-1.5">
                        {product.product.name}
                    </div>

                    <div className="text-sm text-on-surface-variant mb-1">
                        Arriving on: {dayjs(product.estimatedDeliveryTimeMs).format('MMMM DD')}
                    </div>

                    <div className="text-sm text-on-surface-variant mb-3">
                        Quantity: {product.quantity}
                    </div>

                    <button
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-primary to-primary-container text-on-primary font-semibold text-sm rounded-lg cursor-pointer hover:brightness-110 hover:shadow-[0_4px_16px_rgba(78,222,163,0.25)] active:brightness-95 transition-all duration-200"
                        onClick={addToCart}
                    >
                        <img
                            className="w-4.5"
                            src={`${API_URL}/images/icons/buy-again.png`}
                            alt=""
                        />
                        <span>Add to Cart</span>
                    </button>
                </div>

                {/* Track Package */}
                <div className="self-start max-md:col-start-2 max-sm:col-start-auto max-md:mb-6">
                    <Link to={`/tracking/${order.id}/${product.productId}`}>
                        <button className="w-full px-4 py-2.5 bg-surface-high text-on-surface text-sm font-medium rounded-lg cursor-pointer hover:bg-surface-highest transition-colors duration-200">
                            Track package
                        </button>
                    </Link>
                </div>
            </div>
        );
    });
}
