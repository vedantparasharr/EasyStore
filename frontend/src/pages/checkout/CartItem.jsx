import { useState, useEffect } from 'react'
import { formatMoney } from "../../utils/money";
import { DeliveryOptions } from './DeliveryOptions';
import dayjs from 'dayjs';
import axios from 'axios';

export function CartItem({ item, productId, quantity, deliveryOptionId, loadCart }) {

    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [editing, setEditing] = useState(false);
    const [newQuantity, setNewQuantity] = useState(quantity);


    const updateQuantity = async () => {
        await axios.put(`https://easycart-u08y.onrender.com/api/cart-items/${productId}`, {
            quantity: newQuantity
        });

        setEditing(false);
        loadCart();
    };


    const deleteProduct = async () => {
        await axios.delete(`https://easycart-u08y.onrender.com/api/cart-items/${productId}`, {
            productId: productId,
            quantity
        })
        loadCart();
    }

    useEffect(() => {
        async function getDeliveryOptions() {
            const response = await axios.get('https://easycart-u08y.onrender.com/api/delivery-options?expand=estimatedDeliveryTime');
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
                                {!editing && (
                                    <>
                                        <span>
                                            Quantity: <span className="quantity-label">{quantity}</span>
                                        </span>

                                        <span
                                            className="update-quantity-link link-primary"
                                            onClick={() => setEditing(true)}
                                        >
                                            Update
                                        </span>
                                    </>
                                )}

                                {editing && (
                                    <span className="update-quantity-edit">
                                        <input
                                            type="number"
                                            min="1"
                                            value={newQuantity}
                                            onChange={(e) => setNewQuantity(Number(e.target.value))}
                                            style={{ width: "50px", padding: "4px" }}

                                        />

                                        <span
                                            className="save-quantity-link link-primary"
                                            onClick={updateQuantity}
                                        >
                                            Save
                                        </span>

                                        <span
                                            className="cancel-quantity-link link-primary"
                                            onClick={() => setEditing(false)}
                                            style={{ marginRight: '4px' }}
                                        >
                                            Cancel
                                        </span>
                                    </span>
                                )}

                                <span
                                    className="delete-quantity-link link-primary"
                                    onClick={deleteProduct}
                                >
                                    Delete
                                </span>
                            </div>
                        </div>

                        <div className="delivery-options">
                            <div className="delivery-options-title">
                                Choose a delivery option:
                            </div>
                            <DeliveryOptions deliveryOptions={deliveryOptions} productId={productId} deliveryOptionId={deliveryOptionId} loadCart={loadCart} />
                        </div>
                    </div>
                </div>
            )}

        </>
    )

}