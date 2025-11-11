import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { Checkout } from './pages/Checkout';
import { Orders } from './pages/Orders';
import { Tracking } from './pages/Tracking';
import './App.css'
import { Error } from './pages/Error';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const cartData = await axios.get('/api/cart-items');
      setCart(cartData.data);
    }
    fetchProducts();
  }, [])

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} />}></Route>
      <Route path='/checkout' element={<Checkout cart={cart} />} />
      <Route path='/orders' element={<Orders />} />
      <Route path='/tracking' element={<Tracking />} />
      <Route path='*' element={<Error />} ></Route>
    </Routes>
  )
}

export default App
