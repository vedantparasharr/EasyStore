import { useState, useEffect } from 'react';
import { formatMoney } from "../../utils/money";
import { DeliveryOptions } from './DeliveryOptions';
import dayjs from 'dayjs';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export function CartItem({ item, productId, quantity, deliveryOptionId, loadCart }) {

    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [editing, setEditing] = useState(false);
    const [newQuantity, setNewQuantity] = useState(quantity);

    const updateQuantity = async () => {
        await axios.put(`${API_URL}/api/cart-items/${productId}`, {
            quantity: newQuantity
        });

        setEditing(false);
        loadCart();
    };

    const deleteProduct = async () => {
        await axios.delete(`${API_URL}/api/cart-items/${productId}`, {
            productId: productId,
            quantity
        });
        loadCart();
    };

    useEffect(() => {
        async function getDeliveryOptions() {
            const response = await axios.get(`${API_URL}/api/delivery-options?expand=estimatedDeliveryTime`);
            setDeliveryOptions(response.data);
        }
        getDeliveryOptions();
    }, []);

    const selectedDeliveryOption = deliveryOptions.find(
        (deliveryOption) => deliveryOption.id === deliveryOptionId
    );

    return (
        <>
            {deliveryOptions.length > 0 && selectedDeliveryOption && (
                <div className="bg-surface-container rounded-2xl p-5 transition-colors duration-200">
                    {/* Delivery Date */}
                    <div className="text-primary font-headline font-bold text-lg mb-5">
                        Delivery date:{' '}
                        {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                    </div>

                    {/* Cart Item Details Grid */}
                    <div className="grid grid-cols-[100px_1fr_1fr] max-lg:grid-cols-[100px_1fr] gap-x-6 gap-y-7">
                        {/* Product Image */}
                        <img
                            className="max-w-full max-h-[120px] mx-auto rounded-lg"
                            src={`${API_URL}/${item.product.image}`}
                            alt={item.product.name}
                        />

                        {/* Product Details */}
                        <div>
                            <div className="font-headline font-bold text-on-surface mb-2 tracking-tight">
                                {item.product.name}
                            </div>

                            <div className="font-headline font-bold text-primary text-lg mb-1.5">
                                {formatMoney(item.product.priceCents)}
                            </div>

                            <div className="flex items-center flex-wrap gap-1 text-sm text-on-surface-variant">
                                {!editing && (
                                    <>
                                        <span>
                                            Quantity:{' '}
                                            <span className="font-semibold text-on-surface">{quantity}</span>
                                        </span>

                                        <span
                                            className="text-primary cursor-pointer hover:text-primary-fixed transition-colors duration-200 ml-1"
                                            onClick={() => setEditing(true)}
                                        >
                                            Update
                                        </span>
                                    </>
                                )}

                                {editing && (
                                    <span className="flex items-center gap-2">
                                        <input
                                            type="number"
                                            min="1"
                                            value={newQuantity}
                                            onChange={(e) => setNewQuantity(Number(e.target.value))}
                                            className="w-14 px-2 py-1 bg-surface-lowest text-on-surface rounded-lg border border-outline-variant/15 focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(78,222,163,0.15)] transition-all duration-200 text-sm"
                                        />

                                        <span
                                            className="text-primary cursor-pointer hover:text-primary-fixed transition-colors duration-200"
                                            onClick={updateQuantity}
                                        >
                                            Save
                                        </span>

                                        <span
                                            className="text-on-surface-variant cursor-pointer hover:text-on-surface transition-colors duration-200"
                                            onClick={() => setEditing(false)}
                                        >
                                            Cancel
                                        </span>
                                    </span>
                                )}

                                <span
                                    className="text-error cursor-pointer hover:text-tertiary transition-colors duration-200 ml-1"
                                    onClick={deleteProduct}
                                >
                                    Delete
                                </span>
                            </div>
                        </div>

                        {/* Delivery Options */}
                        <div className="max-lg:col-span-2">
                            <div className="font-headline font-semibold text-on-surface text-sm mb-3 tracking-tight">
                                Choose a delivery option:
                            </div>
                            <DeliveryOptions
                                deliveryOptions={deliveryOptions}
                                productId={productId}
                                deliveryOptionId={deliveryOptionId}
                                loadCart={loadCart}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
