import React, { useState,useContext } from 'react'
import {NavLink} from "react-router-dom"
import { productContext } from '../../contex/ProductsProvider';
const NavBar = () => {
  const [product,setProduct] = useState("");
  const {searchedProducts,productDispatch} = useContext(productContext)
  function onSearchClick(event){
    setProduct(event.target.value);
    console.log(product,product.length)
    productDispatch({
      type:"SEARCH",
      payload:product
    })
  }
  return (
    <header>
        <nav className='flex justify-between bg-red-400 items-center h-15'>
            <div className='ml-15'><NavLink to="/"><h1 className='text-white text-4xl font-bold'>E-COM APP</h1></NavLink></div>
            <div className='mr-15'>
                <ul className='flex gap-10 items-center'>
                  <li><div className="relative w-full max-w-sm">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-500">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-white pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 rounded-6xl w-full"
                  onChange={onSearchClick}/>
              </div></li>
                    <li className='font-bold text-2xl text-white'><NavLink to="/wishlist"><span><i className="fa-regular fa-heart mr-3 hover:cursor-pointer"></i></span></NavLink></li>
                    <li className='font-bold text-2xl text-white'><NavLink to="/cart"><span><i className="fa-solid fa-cart-shopping mr-3 hover:cursor-pointer"></i></span></NavLink></li>
                    <li className='font-bold text2xl text-white'><NavLink to="/profile"><span className="material-symbols-outlined hover:cursor-pointer" style={{ fontSize: "30px" }}>account_circle</span></NavLink></li>
                </ul>
            </div>

        </nav>
    </header>
  )
}

export default React.memo(NavBar)
