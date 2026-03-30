import { Header } from '../components/Header';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const API_URL = import.meta.env.VITE_API_URL;

export function Tracking({ cart }) {

    const { orderId, productId } = useParams();
    const [order, setOrder] = useState(null);
    const [product, setProduct] = useState(null);
    const [deliveryPercent, setDeliveryPercent] = useState(0);

    useEffect(() => {
        async function fetchProduct() {
            const response = await axios.get(
                `${API_URL}/api/orders/${orderId}?expand=products`
            );

            const orderData = response.data;
            setOrder(orderData);

            const foundProduct = orderData.products.find(
                (p) => p.productId === productId
            );
            setProduct(foundProduct);
        }
        fetchProduct();
    }, [orderId, productId]);

    useEffect(() => {
        if (!order || !product) return;

        function updateProgress() {
            const totalDeliveryTimeMs =
                product.estimatedDeliveryTimeMs - order.orderTimeMs;

            const timePassedMs = dayjs().valueOf() - order.orderTimeMs;

            let percent = (timePassedMs / totalDeliveryTimeMs) * 100;

            if (percent > 100) percent = 100;
            if (percent < 0) percent = 0;

            setDeliveryPercent(percent);
        }

        updateProgress();
        const interval = setInterval(updateProgress, 10000);

        return () => clearInterval(interval);
    }, [order, product]);

    return (
        product && order && (
            <>
                <title>Tracking</title>
                <Header cart={cart} />

                <main className="max-w-[850px] mx-auto px-6 pt-24 pb-24">
                    <div className="bg-surface-container rounded-2xl p-8">
                        <Link
                            className="inline-flex items-center text-primary text-sm font-medium no-underline hover:text-primary-fixed transition-colors duration-200 mb-8"
                            to="/orders"
                        >
                            ← View all orders
                        </Link>

                        {/* Delivery Date */}
                        <h1 className="font-headline text-2xl font-bold tracking-tight text-on-surface mb-3">
                            Arriving on{' '}
                            {dayjs(product.estimatedDeliveryTimeMs).format(
                                'dddd, MMMM DD'
                            )}
                        </h1>

                        {/* Product Info */}
                        <p className="text-on-surface-variant mb-1">
                            {product.product.name}
                        </p>

                        <p className="text-on-surface-variant mb-6">
                            Quantity: {product.quantity}
                        </p>

                        {/* Product Image */}
                        <img
                            className="max-w-[150px] max-h-[150px] rounded-xl mb-10"
                            src={`${API_URL}/${product.product.image}`}
                            alt={product.product.name}
                        />

                        {/* Progress Labels */}
                        <div className="flex justify-between text-base font-medium mb-4 max-sm:flex-col max-sm:gap-1 max-sm:mb-2">
                            <span className="text-on-surface-variant">Preparing</span>
                            <span className="text-primary font-semibold">Shipped</span>
                            <span className="text-on-surface-variant">Delivered</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="h-3 w-full bg-surface-low rounded-full overflow-hidden mb-3">
                            <div
                                className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full"
                                style={{
                                    width: `${deliveryPercent}%`,
                                    transition: 'width 0.8s ease-in-out',
                                }}
                            ></div>
                        </div>

                        <p className="text-sm text-on-surface-variant">
                            <span className="text-primary font-semibold">{Math.round(deliveryPercent)}%</span> delivered
                        </p>
                    </div>
                </main>
            </>
        )
    );
}
