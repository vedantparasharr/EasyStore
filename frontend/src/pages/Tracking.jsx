import { Header } from '../components/Header';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './Tracking.css';
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

                <div className="tracking-page">
                    <div className="order-tracking">
                        <Link
                            className="back-to-orders-link link-primary"
                            to="/orders"
                        >
                            View all orders
                        </Link>

                        <div className="delivery-date">
                            Arriving on{' '}
                            {dayjs(product.estimatedDeliveryTimeMs).format(
                                'dddd, MMMM DD'
                            )}
                        </div>

                        <div className="product-info">
                            {product.product.name}
                        </div>

                        <div className="product-info">
                            Quantity: {product.quantity}
                        </div>

                        <img
                            className="product-image"
                            src={`${API_URL}/${product.product.image}`}
                        />

                        <div className="progress-labels-container">
                            <div className="progress-label">Preparing</div>
                            <div className="progress-label current-status">
                                Shipped
                            </div>
                            <div className="progress-label">Delivered</div>
                        </div>

                        <div className="progress-bar-container">
                            <div
                                className="progress-bar"
                                style={{
                                    width: `${deliveryPercent}%`,
                                    transition: 'width 0.8s ease-in-out',
                                }}
                            ></div>
                        </div>

                        <p className="progress-percent">
                            {Math.round(deliveryPercent)}% delivered
                        </p>
                    </div>
                </div>
            </>
        )
    );
}
