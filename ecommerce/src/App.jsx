import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { Checkout } from './pages/Checkout';
import { Orders } from './pages/Orders';
import { Tracking } from './pages/Tracking';
import './App.css'

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />}></Route>
      <Route path='/checkout' element={<Checkout/>} />
      <Route path='/orders' element={<Orders/>}/>
      <Route path='/tracking' element={<Tracking/>}/>
    </Routes>
  )
}

export default App
