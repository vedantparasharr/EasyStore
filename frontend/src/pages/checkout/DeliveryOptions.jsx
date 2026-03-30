import { formatMoney } from "../../utils/money";
import axios from "axios";
import dayjs from "dayjs";

const API_URL = import.meta.env.VITE_API_URL;

export function DeliveryOptions({ deliveryOptions, productId, deliveryOptionId, loadCart }) {

    return deliveryOptions.map((deliveryOption) => {

        const updateDeliveryOption = async () => {
            await axios.put(`${API_URL}/api/cart-items/${productId}`, {
                deliveryOptionId: deliveryOption.id
            });
            loadCart();
        };

        let priceString = 'FREE Shipping';
        if (deliveryOption.priceCents > 0) {
            priceString = `${formatMoney(deliveryOption.priceCents)} - Shipping `;
        }

        const isSelected = deliveryOption.id === deliveryOptionId;

        return (
            <div
                key={deliveryOption.id}
                className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                    isSelected
                        ? 'bg-surface-high'
                        : 'hover:bg-surface-low'
                }`}
                onClick={updateDeliveryOption}
            >
                <input
                    type="radio"
                    checked={isSelected}
                    onChange={() => {}}
                    className="mt-1 accent-primary cursor-pointer"
                    name={`delivery-option-${productId}`}
                />

                <div>
                    <div className={`font-medium text-sm mb-0.5 ${isSelected ? 'text-primary' : 'text-on-surface'}`}>
                        {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                    </div>

                    <div className="text-xs text-on-surface-variant">
                        {priceString}
                    </div>
                </div>
            </div>
        );
    });
}
