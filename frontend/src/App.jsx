import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/home/HomePage';
import { Checkout } from './pages/checkout/Checkout';
import { Orders } from './pages/orders/Orders';
import { Tracking } from './pages/Tracking';
import { Error } from './pages/Error';
import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

function App() {

  const [cart, setCart] = useState([]);
  window.axios = axios;

  const loadCart = async function fetchProducts() {
    const cartData = await axios.get(`${API_URL}/api/cart-items?expand=product`);
    setCart(cartData.data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <Routes>
        <Route index element={<HomePage cart={cart} loadCart={loadCart} />}></Route>
        <Route path='/checkout' element={<Checkout cart={cart} loadCart={loadCart} />} />
        <Route path='/orders' element={<Orders cart={cart} loadCart={loadCart}/>} />
        <Route path='/tracking/:orderId/:productId' element={<Tracking cart={cart} />} />
        <Route path='/search/:searchTerm' element={<HomePage cart={cart} loadCart={loadCart} />} />
        <Route path='*' element={<Error />} ></Route>
      </Routes>
    </div>
  );
}

export default App;
