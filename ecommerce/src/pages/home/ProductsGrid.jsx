import { Product } from "./Product"

export function ProductsGrid({products, loadCart}) {

    return products.map((product) => (
        <Product
            key={product.id}
            id={product.id}
            image={product.image}
            name={product.name}
            ratingStars={product.rating.stars}
            ratingCount={product.rating.count}
            priceCents={product.priceCents}
            loadCart={loadCart}
        />
    ))
}