import React, { useContext} from "react";
import { productContext } from "../../contex/ProductsProvider";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
const AllProducts = React.memo(() => {
  const navigate = useNavigate();
  const {products,productDispatch} = useContext(productContext);
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
  console.log(products.length)
  const REACT_APP_RAZORPAY_KEY_ID="rzp_test_Zo211LQnx0c5rk";
  const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };
    const handlePayment = async (price) => {
      const res = await loadRazorpayScript();
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");

        return;
      }
      const options = {
        key: REACT_APP_RAZORPAY_KEY_ID, // from .env
        amount: (price + 49)*100, // 500.00 INR in paise
        currency: "INR",
        name: "ShopSwiftly",
        description: "Test Transaction",
        handler: function (response) {
          alert("Payment Successful!");
          console.log(response); // response.razorpay_payment_id etc.
        },
        notes: {
          address: "Razorpay Corporate Office"
        },
        theme: {
          color: "#3399cc"
        }
      };
    
      const rzp = new window.Razorpay(options);
      rzp.open();
    }; 
  return (
    <>
        <div className='grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4'>
          {products.map(product=><div
        className="bg-white p-6 max-w-xs border-2 mx-auto rounded-2xl shadow-2xl
          space-x-4 mt-5 hover:scale-110"
      >
        <div className="mt-4">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="mt-5">
          <h1 className="text-slate-800 font-bold text-xl">{product.title}</h1>
          <p className="text-red-500 font-bold">${product.price}</p>
          {pathname=="/cart"?
          <>
          <div className="flex justify-between items-center w-[40%] h-20">
            <div><button onClick={()=>{onDecrement(product.id)}}
             className="cursor-pointer border-1  w-8 h-8 bg-red-600 rounded-full mt-5 flex items-center justify-center">
            <span className="font-bold text-2xl">-</span>
            </button></div>
            <div className="font-bold mt-5">{product.quantity}</div>
            <div>
            <button onClick={()=>onIncrement(product.id)}
             className="cursor-pointer border-1 w-8 h-8 bg-green-500 rounded-full mt-5 flex items-center justify-center">
              <span className="font-bold text-2xl">+</span>
            </button>
            </div>
            </div>
          </>
          :""}
          {product.isInCart && pathname!="/cart"? <button  onClick={()=>navigate("/cart")}
           className="cursor-pointer border-1 w-full h-8.5 bg-yellow-300 rounded-2xl mt-5 flex items-center justify-center">
            <span className="material-symbols-outlined">shopping_cart</span>
            <span >GO TO CART</span>
          </button>:          <button  onClick={()=>addToCart(product.id)}
           className="cursor-pointer border-1 w-full h-8.5 bg-yellow-300 rounded-2xl mt-5 flex items-center justify-center">
            <span className="material-symbols-outlined">shopping_cart</span>
            <span >{product.isInCart?"GO To Cart":"ADD TO CART"}</span>
          </button>}
          <button  onClick={()=>pathname!="/cart"?handlePayment(product.price):""}
          className="cursor-pointer border-1 w-full h-8.5 bg-orange-400 rounded-2xl mt-3 flex items-center justify-center">
            <span className="material-symbols-outlined">bolt</span>
            <span>{(product.isInCart)?pathname=="/cart"?"Check Out":"Buy Now":"Buy Now"}</span>
          </button>
        </div>
      </div>)}
        </div>
        {/* <div className={`grid gap-8 px-4 py-6 ${pathname !== "/cart" ? "sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4":"sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3"}`}>
  
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
        <p className="text-xl font-bold text-red-500">₹{product.price}</p>
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
</div> */}

    </>
  );
})

export default (AllProducts);
