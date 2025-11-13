import { Header } from '../../components/Header'
import './Orders.css'
import { OrdersGrid } from './OrdersGrid'

export function Orders({cart, loadCart}) {
    return (
        <>
            <title>Orders</title>
            <Header cart={cart}/>
            <div className="orders-page">
                <div className="page-title">Your Orders</div>
                <div className="orders-grid">
                    <OrdersGrid loadCart={loadCart} />
                </div>
            </div>
        </>
    )
}