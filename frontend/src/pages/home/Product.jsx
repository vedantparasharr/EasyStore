import axios from "axios";
import { useState } from "react";
import { formatMoney } from "../../utils/money";

export function Product({ id, image, name, ratingStars, ratingCount, priceCents, loadCart }) {

    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);


    const addToCart = async () => {
        await axios.post('https://easycart-u08y.onrender.com/api/cart-items', {
            productId: id,
            quantity
        })
        setAdded(true);

        setTimeout(()=> {
            setAdded(false);
        }, 1500);
        loadCart();
    }

    const selectQuantity = (event) => {
        const quantitySelected = Number(event.target.value)
        setQuantity(quantitySelected);
    }

    return (
        <>
            <div className="product-container" data-id={id}>
                <div className="product-image-container">
                    <img className="product-image"
                        src={image} />
                </div>

                <div className="product-name limit-text-to-2-lines">
                    {name}
                </div>

                <div className="product-rating-container">
                    <img className="product-rating-stars"
                        src={`images/ratings/rating-${ratingStars * 10}.png`} />
                    <div className="product-rating-count link-primary">
                        {ratingCount}
                    </div>
                </div>

                <div className="product-price">
                    {formatMoney(priceCents)}
                </div>

                <div className="product-quantity-container">
                    <select value={quantity} onChange={selectQuantity}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>

                <div className="product-spacer"></div>

                <div className="added-to-cart" style={{opacity: added? 1 : 0}}>
                    <img src="images/icons/checkmark.png" />
                    Added
                </div>

                <button className="add-to-cart-button button-primary"
                    onClick={addToCart}
                >
                    Add to Cart
                </button>
            </div>
        </>
    )
}