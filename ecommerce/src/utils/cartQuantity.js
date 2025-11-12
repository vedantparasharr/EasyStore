export function getCartQuantity(cart) {
    let cartQuantity = 0;
    cart.forEach((item) => {
        cartQuantity += item.quantity;
    })

    return cartQuantity;
}