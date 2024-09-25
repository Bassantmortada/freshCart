import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext()

export default function CartContextProvider(props) {

    let headers = { token: localStorage.getItem("token")}
    const [numberOfCart, setnumberOfCart] = useState(0)
    const [cartId, setcartId] = useState(0)


    function addProductToCart(productId) {
        return axios
        .post(`https://ecommerce.routemisr.com/api/v1/cart`, 
            {productId: productId,},
            {headers,}
        )
        .then((res)=>res)
        .catch((err)=>err);
    }

    function getLoggedUserCart() {
        return axios
        .get(`https://ecommerce.routemisr.com/api/v1/cart`, {headers})
        .then((res)=>{
            setcartId(res.data.data._id)
            // console.log(res.data.numOfCartItems);
            setnumberOfCart(res.data.numOfCartItems)
            
        return res
        })
        .catch((err)=>err);

    }

    function updateCart(productId , newCount) {
        return axios
        .put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {count:newCount,}
            , {headers})
        .then((res)=>res)
        .catch((err)=>err);
    }

    function deleteProductCart(productId) {
        return axios
        .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{headers})
        .then((res)=>res)
        .catch((err)=>err);
    }

    function ClearUserCart() {
        return axios
        .delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers})
        .then((res)=>res)
        .catch((err)=>err);
    }

    function Checkout(cartId , url , formData) {
        return axios
        .post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
            {
                shippingAddress : formData
            },
            {
                headers,
            }
        )
        .then((res)=>res)
        .catch((err)=>err);
    }


    useEffect(()=>{
        getLoggedUserCart()
        },[])



    return(
<CartContext.Provider value={{addProductToCart , getLoggedUserCart , updateCart , deleteProductCart , ClearUserCart , Checkout
    , numberOfCart, setnumberOfCart , cartId}} >
        {props.children}
    </CartContext.Provider>
    ) 
}