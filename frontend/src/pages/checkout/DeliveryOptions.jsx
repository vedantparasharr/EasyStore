import { formatMoney } from "../../utils/money";
import axios from "axios";
import dayjs from "dayjs";


export function DeliveryOptions({ deliveryOptions, productId, deliveryOptionId, loadCart }) {

    return deliveryOptions.map((deliveryOption) => {

        const updateDeliveryOption = async () => {
            await axios.put(`https://easycart-u08y.onrender.com/api/cart-items/${productId}`, {
                deliveryOptionId: deliveryOption.id
            });
            loadCart();
        }

        let priceString = 'FREE Shipping';
        if (deliveryOption.priceCents > 0) {
            priceString = `${formatMoney(deliveryOption.priceCents)} - Shipping `;
        }

        return (
            <div key={deliveryOption.id} className="delivery-option" onClick={updateDeliveryOption}>
                <input type="radio"
                    checked={deliveryOption.id === deliveryOptionId}
                    onChange={() => { }}
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