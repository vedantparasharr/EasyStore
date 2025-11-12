import axios from 'axios'
import { Header } from '../../components/Header'
import { Product } from './Product'
import './HomePage.css'
import { useEffect, useState } from 'react'
import { ProductsGrid  } from "./ProductsGrid";

export function HomePage({cart}) {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            const productsData = await axios.get('/api/products');
            setProducts(productsData.data);
        }
        fetchProducts();
    }, [])

    return (
        <>
            <title>Ecommerce Project</title>
            <Header cart={cart} />

            <div className="home-page">
                <div className="products-grid">
                    <ProductsGrid products={products} />
                </div>
            </div>
        </>
    )
}