import { PaymentSummary } from './PaymentSummary';
import { CartItemsGrid } from './CartItemsGrid'
import { CheckoutHeader } from './CheckoutHeader';

export function Checkout({ cart, loadCart }) {

  return (
    <>
      <title>Checkout</title>

      <CheckoutHeader cart={cart} />

      <main className="max-w-[1100px] mx-auto px-6 pt-28 pb-24">
        <h1 className="font-headline text-2xl font-bold tracking-tight text-on-surface mb-6">
          Review your order
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-5 items-start">
          <div className="space-y-4">
            <CartItemsGrid cart={cart} loadCart={loadCart} />
          </div>

          <div className="lg:sticky lg:top-24 bg-surface-container rounded-2xl p-6">
            <PaymentSummary cart={cart} loadCart={loadCart} />
          </div>
        </div>
      </main>
    </>
  )
}