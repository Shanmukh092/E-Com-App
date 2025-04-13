{// import axios from "axios";
// const baseURL = 'https://api.escuelajs.co/api/v1';
// // export const getAllProducts = async ()=>{
//     const url = `${baseURL}/products`;
// //     try{
// //         const response = await fetch(url)
// //         if(!response.ok){
// //             alert("HTTP Error");            
// //         }
// //         const data = await response.json();
// //         return data;
// //     }
// //     catch(error){
// //         alert("ERROR WHILE FETCHING DATA....")
// //     }
// // }
// const getAllProducts = axios.get(url)
// const products = getAllProducts.then(res=>res)
// console.log(products)
// console.log(getAllProducts)
}
import axios from "axios";

const baseURL = 'https://fakestoreapi.in/api';

export const getAllProducts = async () => {
    const url = `${baseURL}/products?limit=500`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    alert("Error fetching products:", error);
  }
};
getAllProducts()
