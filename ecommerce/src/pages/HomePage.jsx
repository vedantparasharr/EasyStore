import { Header } from '../components/Header'
import { products } from '../../ecommerce-project-main/data/products'
import { Product } from './Product'
import './HomePage.css'



function ProductsGrid() {
    return products.map((product) => (
        <Product
            key={product.id}
            id={product.id}
            image={product.image}
            name={product.name}
            ratingStars={product.rating.stars}
            ratingCount={product.rating.count}
            priceCents={product.priceCents}
        />
    ))
}



export function HomePage() {

    return (
        <>
            <title>Ecommerce Project</title>
            <Header />

            <div className="home-page">
                <div className="products-grid">
                    <ProductsGrid />
                </div>
            </div>
        </>
    )
}