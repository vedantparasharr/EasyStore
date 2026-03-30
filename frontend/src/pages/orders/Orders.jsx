import { Header } from '../../components/Header'
import { OrdersGrid } from './OrdersGrid'

export function Orders({cart, loadCart}) {
    return (
        <>
            <title>Orders</title>
            <Header cart={cart}/>
            <main className="max-w-[850px] mx-auto px-5 pt-24 pb-24">
                <h1 className="font-headline text-2xl font-bold tracking-tight text-on-surface mb-7">
                    Your Orders
                </h1>
                <div className="space-y-10">
                    <OrdersGrid loadCart={loadCart} />
                </div>
            </main>
        </>
    )
}