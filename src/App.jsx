import React from 'react'
import NavBar from './components/NavBar/NavBar'
import Home from './pages/home/Home'
import WishList from './pages/wishlist/WishList'
import Cart from './pages/cart/Cart'
import {Routes,Route} from "react-router-dom"
import PriceComponent from './components/pricec-component/priceComponent'
const App = () => {
  return (
    
    <div>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/wishlist" element={<WishList/>}/>
        <Route path="/cart" element={<div className='flex justify-between'>
          <Cart/>
          <PriceComponent/>
        </div>}/>
      </Routes>
    </div>
  )
}

export default App
