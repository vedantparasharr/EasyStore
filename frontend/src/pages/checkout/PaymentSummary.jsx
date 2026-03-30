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
            <h2 className="font-headline text-lg font-bold tracking-tight text-on-surface mb-4">
                Payment Summary
            </h2>

            <div className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                    <span className="text-on-surface-variant">Items ({paymentSummary.totalItems}):</span>
                    <span className="text-on-surface font-medium">{formatMoney(paymentSummary.productCostCents)}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-on-surface-variant">Shipping &amp; handling:</span>
                    <span className="text-on-surface font-medium">{formatMoney(paymentSummary.shippingCostCents)}</span>
                </div>

                <div className="pt-3 border-t border-outline-variant/15">
                    <div className="flex justify-between">
                        <span className="text-on-surface-variant">Total before tax:</span>
                        <span className="text-on-surface font-medium">{formatMoney(paymentSummary.totalCostBeforeTaxCents)}</span>
                    </div>
                </div>

                <div className="flex justify-between">
                    <span className="text-on-surface-variant">Estimated tax (10%):</span>
                    <span className="text-on-surface font-medium">{formatMoney(paymentSummary.taxCents)}</span>
                </div>

                <div className="pt-4 border-t border-outline-variant/15">
                    <div className="flex justify-between">
                        <span className="text-primary font-headline font-bold text-lg">Order total:</span>
                        <span className="text-primary font-headline font-bold text-lg">{formatMoney(paymentSummary.totalCostCents)}</span>
                    </div>
                </div>
            </div>

            <button
                className="w-full py-3.5 mt-6 mb-2 bg-gradient-to-br from-primary to-primary-container text-on-primary font-semibold text-sm rounded-xl cursor-pointer hover:brightness-110 hover:shadow-[0_4px_16px_rgba(78,222,163,0.25)] active:brightness-95 transition-all duration-200"
                onClick={createOrder}
            >
                Place your order
            </button>
        </>
    );
}
