import { useState, useEffect } from 'react'
import { formatMoney } from "../utils/money";
import dayjs from 'dayjs';
import axios from 'axios';

export function CartItem({ item, id, productId, quantity, deliveryOptionId }) {

    const [deliveryOptions, setDeliveryOptions] = useState([]);


    useEffect(() => {
        async function getDeliveryOptions() {
            const response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
            setDeliveryOptions(response.data)
        }
        getDeliveryOptions();
    }, []);

    const selectedDeliveryOption = deliveryOptions
        .find((deliveryOption) => {
            return deliveryOption.id === deliveryOptionId;
        })

    function DeliveryOptions() {

        return deliveryOptions.map((deliveryOption) => {

            let priceString = 'FREE Shipping';
            if (deliveryOption.priceCents > 0) {
                priceString = `${formatMoney(deliveryOption.priceCents)} - Shipping `;
            }

            return (
                <div key={deliveryOption.id} className="delivery-option">
                    <input type="radio" checked={deliveryOption.id === deliveryOptionId}
                        className="delivery-option-input"
                        name={`delivery-option-${productId}`} />
                    <div>
                        <div className="delivery-option-date">
                            {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                        </div>

                        <div className="delivery-option-price">
                            {priceString}
                        </div>
                    </div>
                </div>
            )
        }
        )
    }

    return (

        <>
            {deliveryOptions.length > 0 && selectedDeliveryOption && (
                <div className="cart-item-container">
                    <div className="delivery-date">
                        Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                    </div>

                    <div className="cart-item-details-grid">
                        <img className="product-image"
                            src={`${item.product.image}`} />

                        <div className="cart-item-details">
                            <div className="product-name">
                                {item.product.name}
                            </div>
                            <div className="product-price">
                                {formatMoney(item.product.priceCents)}
                            </div>
                            <div className="product-quantity">
                                <span>
                                    Quantity: <span className="quantity-label">{quantity}</span>
                                </span>
                                <span className="update-quantity-link link-primary">
                                    Update
                                </span>
                                <span className="delete-quantity-link link-primary">
                                    Delete
                                </span>
                            </div>
                        </div>

                        <div className="delivery-options">
                            <div className="delivery-options-title">
                                Choose a delivery option:
                            </div>
                            <DeliveryOptions />
                        </div>
                    </div>
                </div>
            )}

        </>
    )

}