import { useState, useEffect } from 'react'
import { formatMoney } from "../../utils/money";
import { DeliveryOptions } from './DeliveryOptions';
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
                            <DeliveryOptions deliveryOptions={deliveryOptions} productId={productId} deliveryOptionId={deliveryOptionId} />
                        </div>
                    </div>
                </div>
            )}

        </>
    )

}