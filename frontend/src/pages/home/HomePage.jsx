import axios from 'axios'
import { Header } from '../../components/Header'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ProductsGrid } from "./ProductsGrid";

const API_URL = import.meta.env.VITE_API_URL;

export function HomePage({ cart, loadCart }) {

    const [products, setProducts] = useState([]);

    const { searchTerm } = useParams();

    useEffect(() => {
        async function fetchProducts() {
            const query = searchTerm ? `?search=${searchTerm}` : "";
            const response = await axios.get(`${API_URL}/api/products${query}`);
            setProducts(response.data);
        }
        fetchProducts();
    }, [searchTerm]);

    return (
        <>
            <title>EasyStore</title>
            <Header cart={cart} />

            <main className="pt-20 pb-16 px-4 lg:px-6">
                {searchTerm && (
                    <div className="max-w-7xl mx-auto mb-6">
                        <h2 className="font-headline text-xl font-semibold text-on-surface-variant">
                            Results for "<span className="text-primary">{searchTerm}</span>"
                        </h2>
                    </div>
                )}
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
                    <ProductsGrid products={products} loadCart={loadCart} />
                </div>
            </main>
        </>
    )
}
