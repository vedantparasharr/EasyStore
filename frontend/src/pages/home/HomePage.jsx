import axios from 'axios'
import { Header } from '../../components/Header'
import './HomePage.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ProductsGrid } from "./ProductsGrid";

export function HomePage({ cart, loadCart }) {

    const [products, setProducts] = useState([]);

    const { searchTerm } = useParams();
    useEffect(() => {
        async function fetchProducts() {
            const query = searchTerm ? `?search=${searchTerm}` : "";
            const response = await axios.get(`https://easycart-u08y.onrender.com/api/products${query}`);
            setProducts(response.data);
        }
        fetchProducts();
    }, [searchTerm]);


    return (
        <>
            <title>Ecommerce Project</title>
            <Header cart={cart} />

            <div className="home-page">
                <div className="products-grid">
                    <ProductsGrid products={products} loadCart={loadCart} />
                </div>
            </div>
        </>
    )
}