import { getCartQuantity } from '../utils/cartQuantity';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function Header({ cart }) {

    const navigate = useNavigate();

    let cartQuantity = getCartQuantity(cart);
    const [searchInput, setSearchInput] = useState('')

    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-16 px-4 flex items-center justify-between bg-surface-variant/60 backdrop-blur-[20px] border-b border-on-surface/[0.08]">
            {/* Left: Logo */}
            <div className="w-52 shrink-0 max-md:w-auto">
                <NavLink to="/" className="inline-block p-1.5 rounded-md transition-colors duration-200 hover:bg-surface-high/60">
                    <img className="h-9 max-sm:hidden" src="/images/logo-white.png" alt="EasyStore" />
                    <img className="h-7 hidden max-sm:block" src="/images/mobile-logo-white.png" alt="EasyStore" />
                </NavLink>
            </div>

            {/* Middle: Search */}
            <div className="flex-1 max-w-[850px] mx-3 flex">
                <input
                    className="flex-1 w-0 h-10 px-4 text-base bg-surface-lowest rounded-l-lg border border-outline-variant/15 text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(78,222,163,0.15)] transition-all duration-200"
                    type="text"
                    value={searchInput}
                    placeholder="Search products..."
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && e.target.value.trim()) {
                            navigate(`/search/${searchInput}`);
                        }
                    }}
                />
                <button
                    className="w-12 h-10 flex items-center justify-center bg-gradient-to-br from-primary to-primary-container rounded-r-lg shrink-0 cursor-pointer hover:brightness-110 transition-all duration-200"
                    onClick={() => searchInput && navigate(`/search/${searchInput}`)}
                >
                    <img className="h-5 invert" src="/images/icons/search-icon.png" alt="Search" />
                </button>
            </div>

            {/* Right: Nav Links */}
            <div className="w-44 shrink-0 flex items-center justify-end gap-1">
                <NavLink
                    className={({ isActive }) =>
                        `flex items-center px-3.5 py-1.5 rounded-md text-sm font-semibold font-headline tracking-tight text-on-surface no-underline transition-colors duration-200 hover:bg-surface-high/60 ${isActive ? 'text-primary' : ''}`
                    }
                    to="/orders"
                >
                    <span>Orders</span>
                </NavLink>

                <NavLink className="flex items-center px-3 py-1.5 rounded-md text-on-surface no-underline relative transition-colors duration-200 hover:bg-surface-high/60" to="/checkout">
                    <img className="w-9" src="/images/icons/cart-icon.png" alt="Cart" />
                    <div className="absolute top-1.5 right-10 w-6.5 text-center text-sm font-bold text-primary-container">
                        {cartQuantity}
                    </div>
                    <span className="ml-1.5 text-sm font-semibold font-headline tracking-tight">Cart</span>
                </NavLink>
            </div>
        </header>
    )
}