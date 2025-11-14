import axios from 'axios';
import dayjs from 'dayjs';
import {formatMoney} from '../../utils/money'
import { useEffect, useState } from 'react'
import { OrderDetailsGrid } from './OrderDetailsGrid';



export function OrdersGrid({loadCart}) {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function fetchOrders() {
            const response = await axios.get('https://easycart-u08y.onrender.com/api/orders?expand=products')
            setOrders(response.data)
            console.log(response)
        }
        fetchOrders()
    }, [])

    return orders && orders.map((order) => {
        return (
            <div key={order.id} className="order-container">
                <div className="order-header">
                    <div className="order-header-left-section">
                        <div className="order-date">
                            <div className="order-header-label">Order Placed:</div>
                            <div>{dayjs(order.orderTimeMs).format('MMMM DD')}</div>
                        </div>
                        <div className="order-total">
                            <div className="order-header-label">Total:</div>
                            <div>{formatMoney(order.totalCostCents)}</div>
                        </div>
                    </div>

                    <div className="order-header-right-section">
                        <div className="order-header-label">Order ID:</div>
                        <div>{order.id}</div>
                    </div>
                </div>

                <OrderDetailsGrid order={order} loadCart={loadCart}/>
                
            </div>
        )
    })
}