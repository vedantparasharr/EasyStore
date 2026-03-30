import { Link } from 'react-router-dom';
import { getCartQuantity } from '../../utils/cartQuantity';

export function CheckoutHeader({ cart }) {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-16 px-6 flex justify-center bg-surface-variant/60 backdrop-blur-[20px] border-b border-on-surface/[0.08]">
            <div className="w-full max-w-[1100px] flex items-center">
                {/* Left: Logo */}
                <div className="w-48 shrink-0 max-sm:w-auto">
                    <Link to="/">
                        <img className="h-9 max-sm:hidden" src="/images/logo-white.png" alt="EasyStore" />
                        <img className="h-7 hidden max-sm:block" src="/images/mobile-logo-white.png" alt="EasyStore" />
                    </Link>
                </div>

                {/* Middle: Checkout title */}
                <div className="flex-1 text-center font-headline text-xl font-medium text-on-surface max-sm:mr-1 max-md:mr-14">
                    Checkout (
                    <Link className="text-primary no-underline hover:text-primary-fixed transition-colors duration-200" to="/">
                        {getCartQuantity(cart)} items
                    </Link>
                    )
                </div>

                {/* Right: Lock icon */}
                <div className="w-48 flex items-center justify-end max-md:w-auto">
                    <img className="h-8 opacity-60" src="/images/icons/checkout-lock-icon.png" alt="Secure Checkout" />
                </div>
            </div>
        </header>
    );
}
