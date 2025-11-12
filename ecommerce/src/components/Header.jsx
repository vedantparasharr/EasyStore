import './Header.css'
import { NavLink } from 'react-router-dom'

export function Header({cart}) {

    let cartQuantity = 0;
    cart.forEach((item) => {
        cartQuantity+=item.quantity;
    })

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
                    <input className="search-bar" type="text" placeholder="Search" />

                    <button className="search-button">
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