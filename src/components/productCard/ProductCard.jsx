import React, { useContext, useState} from "react";
import { productContext } from "../../contex/ProductsProvider";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const ProductCard = React.memo(({ products }) => {
  const navigate = useNavigate();
  const {productDispatch} = useContext(productContext);
  const {pathname} = useLocation()
  function addToCart(productId){
    productDispatch({
      type:"ADD_TO_CART",
      payload:productId
    })
  }
  function onDecrement(productId){
    productDispatch({
      type:"DECREMENT",
      payload:productId
    })
    productDispatch({
      type:"CHECK",
      payload:productId,
    })
  }
  function onIncrement(productId){
    productDispatch({
      type:"INCREMENT",
      payload:productId
    })
  }
  function onRemoveClick(productId){
    if(pathname=="/cart"){
      productDispatch({
        type:"REMOVE",
        payload:productId
      })
    }
  }
  return (
    <>
        
    <div className={`grid gap-8 px-4 py-6 ${pathname !== "/cart" ? "sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4":"sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3"}`}>
  
  {products.map(product => (
    <div
      key={product.id}
      className="bg-white p-5 max-w-sm mx-auto rounded-2xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
    >
      <div className="aspect-square overflow-hidden rounded-lg">
        <img src={product.image} alt={product.title} className="w-full h-full object-contain" />
      </div>

      <div className="mt-4 space-y-2">
        <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>
        <p className="text-xl font-bold text-red-500">${product.price}</p>
      </div>
      {pathname === "/cart" && (
        <div className="flex justify-center items-center gap-4 mt-4">
          <button onClick={() => onDecrement(product.id)}
            className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-lg font-bold">
            -
          </button>
          <span className="font-semibold">{product.quantity}</span>
          <button onClick={() => onIncrement(product.id)}
            className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-lg font-bold">
            +
          </button>
        </div>
      )}

      <div className="mt-4 space-y-3">
        {product.isInCart && pathname !== "/cart" && (
          <button onClick={() => navigate("/cart")}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-xl flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">shopping_cart</span>
            Go to Cart
          </button>
        )}

        {!product.isInCart && (
          <button onClick={() => addToCart(product.id)}
            className="w-full bg-yellow-300 hover:bg-yellow-400 text-black font-semibold py-2 rounded-xl flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">add_shopping_cart</span>
            Add to Cart
          </button>
        )}
        
        <button onClick={()=>onRemoveClick(product.id)}
          className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 rounded-xl flex items-center justify-center gap-2">
          <span className="material-symbols-outlined">bolt</span>
          {product.isInCart && pathname === "/cart" ? "Remove from Cart" : "Buy Now"}
        </button>
      </div>
    </div>
  ))}
</div>

    
    </>
  );
})

export default (ProductCard);
