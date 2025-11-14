import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { formatMoney } from "../../utils/money";

const API_URL = import.meta.env.VITE_API_URL;

export function PaymentSummary({ cart, loadCart }) {

    const [paymentSummary, setPaymentSummary] = useState(null);

    useEffect(() => {
        async function fetchPaymentSummary() {
            const response = await axios.get(`${API_URL}/api/payment-summary`);
            setPaymentSummary(response.data);
        }
        fetchPaymentSummary();
    }, [cart]);

    const navigate = useNavigate();

    const createOrder = async () => {
        await axios.post(`${API_URL}/api/orders`);
        await loadCart();
        navigate('/orders');
    };

    return paymentSummary && (
        <>
            <div className="payment-summary-title">
                Payment Summary
            </div>

            <div className="payment-summary-row">
                <div>Items ({paymentSummary.totalItems}):</div>
                <div className="payment-summary-money">
                    {formatMoney(paymentSummary.productCostCents)}
                </div>
            </div>

            <div className="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div className="payment-summary-money">
                    {formatMoney(paymentSummary.shippingCostCents)}
                </div>
            </div>

            <div className="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div className="payment-summary-money">
                    {formatMoney(paymentSummary.totalCostBeforeTaxCents)}
                </div>
            </div>

            <div className="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div className="payment-summary-money">
                    {formatMoney(paymentSummary.taxCents)}
                </div>
            </div>

            <div className="payment-summary-row total-row">
                <div>Order total:</div>
                <div className="payment-summary-money">
                    {formatMoney(paymentSummary.totalCostCents)}
                </div>
            </div>

            <button
                className="place-order-button button-primary"
                onClick={createOrder}
            >
                Place your order
            </button>
        </>
    );
}
