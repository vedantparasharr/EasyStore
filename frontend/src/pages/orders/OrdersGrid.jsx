import axios from 'axios';
import dayjs from 'dayjs';
import { formatMoney } from '../../utils/money';
import { useEffect, useState } from 'react';
import { OrderDetailsGrid } from './OrderDetailsGrid';

const API_URL = import.meta.env.VITE_API_URL;

export function OrdersGrid({ loadCart }) {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function fetchOrders() {
            const response = await axios.get(`${API_URL}/api/orders?expand=products`);
            setOrders(response.data);
        }
        fetchOrders();
    }, []);

    return orders && orders.map((order) => {
        return (
            <div key={order.id} className="rounded-2xl overflow-hidden">
                {/* Order Header */}
                <div className="bg-surface-low flex items-center justify-between flex-wrap gap-4 px-6 py-4">
                    <div className="flex items-center gap-8 max-sm:flex-col max-sm:items-start max-sm:gap-1">
                        <div>
                            <div className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-0.5">Order Placed</div>
                            <div className="text-sm text-on-surface">{dayjs(Number(order.orderTimeMs)).format("MMMM DD")}</div>
                        </div>
                        <div>
                            <div className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-0.5">Total</div>
                            <div className="text-sm text-primary font-semibold">{formatMoney(order.totalCostCents)}</div>
                        </div>
                    </div>

                    <div className="max-sm:w-full">
                        <div className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-0.5">Order ID</div>
                        <div className="text-xs text-on-surface-variant/70 font-mono">{order.id}</div>
                    </div>
                </div>

                {/* Order Details */}
                <div className="bg-surface-container">
                    <OrderDetailsGrid order={order} loadCart={loadCart} />
                </div>
            </div>
        );
    });
}
