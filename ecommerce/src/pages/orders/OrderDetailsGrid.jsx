import dayjs from "dayjs";
import { Link } from "react-router-dom"

export function OrderDetailsGrid({ order }) {
    if (!order?.products?.length) return null;

    return order.products.map((product) => {
        return (
            <div key={product.productId} className="order-details-grid">
                <div className="product-image-container">
                    <img src={product.product.image} />
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
                    <button className="buy-again-button button-primary">
                        <img className="buy-again-icon" src="images/icons/buy-again.png" />
                        <span className="buy-again-message">Add to Cart</span>
                    </button>
                </div>

                <div className="product-actions">
                    <Link to="/tracking">
                        <button className="track-package-button button-secondary">
                            Track package
                        </button>
                    </Link>
                </div>
            </div>
        )
    })
}