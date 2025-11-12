import { CartItem } from './CartItem'


export function CartItemsGrid({ cart }) {
  return cart.map((item) => {
    return (
      <CartItem
        item={item}
        key={item.productId}
        id={item.id}
        productId={item.productId}
        quantity={item.quantity}
        deliveryOptionId={item.deliveryOptionId}
      />
    );
  });
}