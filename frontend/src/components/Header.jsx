import './Header.css'
import { getCartQuantity } from '../utils/cartQuantity';
import { NavLink, useNavigate } from 'react-router-dom';

import { useState } from 'react';

export function Header({ cart }) {

    const navigate = useNavigate();

    let cartQuantity = getCartQuantity(cart);
    const [searchInput, setSearchInput] = useState('')

    return (
        <>
            <div className="header">
                <div className="left-section">
                    <NavLink to="/" className="header-link">
                        <img className="logo"
                            src="public/images/logo-white.png" />
                        <img className="mobile-logo"
                            src="public/images/mobile-logo-white.png" />
                    </NavLink>
                </div>

                <div className="middle-section">
                    <input
                        className="search-bar"
                        type="text"
                        value={searchInput}
                        placeholder="Search"
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && e.target.value.trim()) {
                                navigate(`/search/${searchInput}`);
                            }
                        }}
                    />


                    <button className="search-button" onClick={() => searchInput &&  navigate(`/search/${searchInput}`)}
                    >
                        <img className="search-icon" src="images/icons/search-icon.png" />
                    </button>
                </div>

                <div className="right-section">
                    <NavLink className={({ isActive }) => `orders-link header-link${isActive ? ' active' : ''}`} to="/orders">
                        <span className="orders-text">Orders</span>
                    </NavLink>

                    <NavLink className="cart-link header-link" to="/checkout">
                        <img className="cart-icon" src="images/icons/cart-icon.png" />
                        <div className="cart-quantity">{cartQuantity}</div>
                        <div className="cart-text">Cart</div>
                    </NavLink>
                </div>
            </div>
        </>
    )
}