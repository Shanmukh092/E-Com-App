import React, { useContext, useMemo } from 'react'
import ProductCard from '../../components/productCard/ProductCard'
import { productContext } from '../../contex/ProductsProvider'
import AllProducts from '../../components/allProducts/AllProducts'
const Home = () => {
  const {searchedProducts} = useContext(productContext)
  return (
    <>
      {searchedProducts.length>0?<ProductCard products = {searchedProducts}/>:<AllProducts/>}
    </>

  )
}
export default React.memo(Home)
