import { Link } from 'react-router-dom'
import { CartItem } from './CartItem'
import './Checkout-header.css'
import './Checkout.css'
import { getCartQuantity } from '../utils/cartQuantity';
import { PaymentSummary } from './PaymentSummary';

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

export function Checkout({ cart }) {
  return (
    <>
      <title>Checkout</title>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <Link to="/">
              <img className="logo" src="/public/images/logo.png" />
              <img className="mobile-logo" src="public/images/mobile-logo.png" />
            </Link>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (<Link className="return-to-home-link"
              to="/">{getCartQuantity(cart)} items</Link>)
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <div className="order-summary">
            <CartItemsGrid cart={cart} />
          </div>
  
          <div className="payment-summary">
              <PaymentSummary/>
          </div>
        </div>
      </div>
    </>
  )
}