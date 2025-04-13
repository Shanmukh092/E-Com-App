import React, { useContext } from 'react'
import { productContext } from '../../contex/ProductsProvider'
import ProductCard from '../../components/productCard/ProductCard'
const Cart = () => {
  const {products} = useContext(productContext);
  const cartItems = products.filter(product=>product.isInCart && product.quantity>0);
  return (
    <div>
      <ProductCard products = {cartItems}/>
    </div>
  )
}

export default Cart
