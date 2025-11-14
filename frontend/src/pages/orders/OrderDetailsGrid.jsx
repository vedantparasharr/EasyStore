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
            <div key={product.productId} className="order-details-grid">
                <div className="product-image-container">
                    <img src={`${API_URL}/${product.product.image}`} />
                </div>

                <div className="product-details">
                    <div className="product-name">
                        {product.product.name}
                    </div>

                    <div className="product-delivery-date">
                        Arriving on: {dayjs(product.estimatedDeliveryTimeMs).format('MMMM DD')}
                    </div>

                    <div className="product-quantity">
                        Quantity: {product.quantity}
                    </div>

                    <button className="buy-again-button button-primary" onClick={addToCart}>
                        <img
                            className="buy-again-icon"
                            src={`${API_URL}/images/icons/buy-again.png`}
                        />
                        <span className="buy-again-message">Add to Cart</span>
                    </button>
                </div>

                <div className="product-actions">
                    <Link to={`/tracking/${order.id}/${product.productId}`}>
                        <button className="track-package-button button-secondary">
                            Track package
                        </button>
                    </Link>
                </div>
            </div>
        );
    });
}
