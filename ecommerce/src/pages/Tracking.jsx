import { Header } from '../components/Header';
import { Link, useParams } from 'react-router-dom'; // ✅ Correct
import axios from 'axios';
import { useEffect, useState } from 'react';
import './Tracking.css';
import dayjs from 'dayjs';

export function Tracking({ cart }) {

    const { orderId, productId } = useParams();

    const [order, setOrder] = useState(null)
    const [product, setProduct] = useState(null);



    useEffect(() => {
        async function fetchProduct() {
            const response = await axios.get(`/api/orders/${orderId}?expand=products`)
            const orderData = response.data;
            setOrder(orderData);
            const foundProduct = orderData.products.find((p) => p.productId === productId);
            setProduct(foundProduct);
            console.log(foundProduct)
        }
        fetchProduct();

    }, [orderId, productId])

    return product && order && (
        <>
            <title>Tracking</title>
            <Header cart={cart} />

            <div className="tracking-page">
                <div className="order-tracking">
                    <Link className="back-to-orders-link link-primary" to="/orders">
                        View all orders
                    </Link>

                    <div className="delivery-date">
                        Arriving on {dayjs(product.estimatedDeliveryTimeMs).format('dddd, MMMM DD')}
                    </div>

                    <div className="product-info">
                        {product.product.name}
                    </div>

                    <div className="product-info">
                        Quantity: {product.quantity}
                    </div>

                    <img className="product-image" src={product.product.image} />

                    <div className="progress-labels-container">
                        <div className="progress-label">
                            Preparing
                        </div>
                        <div className="progress-label current-status">
                            Shipped
                        </div>
                        <div className="progress-label">
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-bar"></div>
                    </div>
                </div>
            </div>
        </>
    )
}