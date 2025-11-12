import { formatMoney } from "../utils/money";
import dayjs from "dayjs";

export function DeliveryOptions({deliveryOptions, productId, deliveryOptionId}) {

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