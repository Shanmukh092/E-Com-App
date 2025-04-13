import React from 'react'

const Product = ({product}) => {
  return (
    <div>
      <div
        className="bg-white p-6 max-w-xs border-2 mx-auto rounded-2xl shadow-2xl
    space-x-4 mt-5 hover:scale-110"
      >
        <div className="mt-4">
          <img src={product.images[0]} alt={product.title} />
        </div>
        <div className="mt-5">
          <h1 className="text-slate-800 font-bold text-xl">{product.title}</h1>
          <p className="text-red-500 font-bold">${product.price}</p>
          <button onClick={()=>addToCart(product.id)}
           className="cursor-pointer border-1 w-full h-8.5 bg-yellow-300 rounded-2xl mt-5 flex items-center justify-center">
            <span className="material-symbols-outlined">shopping_cart</span>
            <span >Add TO Cart</span>
          </button>
          <button  onClick={()=>{}}
          className="cursor-pointer border-1 w-full h-8.5 bg-orange-400 rounded-2xl mt-3 flex items-center justify-center">
            <span className="material-symbols-outlined">bolt</span>
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Product
