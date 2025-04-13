import React from 'react'
import { createContext,useReducer } from 'react'
import { productReducer } from '../product_reducer/ProductReducer';
import { getAllProducts } from '../api/allProducts';
import { useEffect } from 'react'
const productContext = createContext();
const ProductsProvider = ({children}) => {
  useEffect(()=>{
    async function getAll(){
      let data = await getAllProducts()
      data = data.products;
      data = data.map(product => ({
        ...product,
        isInCart: false,
        isWishItem: false,
        quantity: 1
      }));
      productDispatch({type:"SET_DATA",payload:data});
      localStorage.setItem("data",JSON.stringify(data))
    }
    getAll()
  },[])
  let initialState = {
    products:[],
    searchedProducts:[]
  }
  const [state,productDispatch] = useReducer(productReducer,initialState)
  const {products,searchedProducts} = state;
  return (
    <div>
      <productContext.Provider value={{products,searchedProducts,productDispatch}}>
        {children}
      </productContext.Provider>
    </div>
  )
}
export {productContext};
export default React.memo(ProductsProvider)
