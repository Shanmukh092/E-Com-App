export const productReducer= ((state,{type,payload})=>{
    switch (type){
        case "SET_DATA":
                return {...state,products:payload}
        case "ADD_TO_CART":
            return {...state,searchedProducts:
                state.searchedProducts.map(product=>product.id==payload?
                    {...product,isInCart:true}:product),
                products:state.products.map(product=>product.id==payload?
                {...product,isInCart:true}:product
            )}
        case "INCREMENT":
            return {...state,products:state.products.map(product=>product.id==payload?
                {...product,quantity:product.quantity+1}:product
            )}
        case "DECREMENT":
            return {...state,products:state.products.map(product=>product.id==payload?
                {...product,quantity:product.quantity-1}:{...product}
            )}
        case "CHECK":
            return{
                ...state,products:state.products.map(product=>product.quantity==0?
                    {...product,quantity:1,isInCart:false}:{...product})
            }
        case "CLEAN":
            return{
                ...state,products:state.products.map(product=>product.isInCart?{...product,isInCart:false,quantity:1}:{...product})
            }
        case "SEARCH":
            return{
                ...state,searchedProducts:payload.length>0?
                state.products.filter(product=>product.title.toLowerCase().includes(payload.toLowerCase())):[]
            }
        case "REMOVE":
            return{
                ...state,products:state.products.map
                (product=>product.id==payload?{...product,isInCart:false,quantity:1}:product)
            }
        default:
            return state
    }
})