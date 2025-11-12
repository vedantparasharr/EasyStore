import './Checkout.css'
import { PaymentSummary } from './PaymentSummary';
import { CartItemsGrid } from './CartItemsGrid'
import { CheckoutHeader } from './CheckoutHeader';


export function Checkout({ cart }) {
  return (
    <>
      <title>Checkout</title>

      <CheckoutHeader cart={cart}/>

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