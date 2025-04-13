import { useContext, useState } from 'react'
import { useEffect } from 'react'
import React  from 'react'
import { productContext } from '../../contex/ProductsProvider'
const PriceComponent = () => {
    const {products,productDispatch} = useContext(productContext);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalPrice,setTotalPrice] = useState(0);
    useEffect(() => {
      const total = products.reduce((sum, item) => {
        return item.isInCart ? sum + item.quantity : sum;
      }, 0);
      setTotalQuantity(total);
      const price = products.reduce((sum,product)=>{
        return product.isInCart?sum + (product.quantity*product.price):sum
      },0)
      setTotalPrice(price)
    }, [products]);
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
      const handlePayment = async () => {
        const res = await loadRazorpayScript();
        if (!res) {
          alert("Razorpay SDK failed to load. Are you online?");
          return;
        }
        const options = {
          key: REACT_APP_RAZORPAY_KEY_ID, // from .env
          amount: (totalPrice+49)*100, // 500.00 INR in paise
          currency: "INR",
          name: "ShopSwiftly",
          description: "Test Transaction",
          handler: function (response) {
            alert("Payment Successful!");
            productDispatch({
                type:"CLEAN",
                payload:1
            })
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
    <div>
        <div className="w-80 bg-white rounded-2xl shadow-lg p-6 space-y-4">
  <h1 className="text-xl font-semibold text-gray-800">Price Details</h1>
  <hr />

  <div className="flex justify-between text-gray-700">
    <span className="text-base">Price ({totalQuantity} items)</span>
    <span className="text-base">₹{totalPrice}</span>
  </div>

  <div className="flex justify-between text-gray-700">
    <span className="text-base">Delivery Charge</span>
    <span className="text-base">₹49</span>
  </div>

  <hr />

  <div className="flex justify-between font-bold text-lg text-gray-900">
    <span>Total Amount</span>
    <span>₹{totalPrice>0?totalPrice + 49:0}</span>
  </div>

  <button onClick={handlePayment}
   className="w-full mt-4 bg-green-600 hover:bg-green-700 transition-all text-white py-2 rounded-xl font-semibold">
    Place Order
  </button>
</div>

    </div>
  )
}

export default PriceComponent
