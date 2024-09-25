import axios from "axios";
import { createContext } from "react";

export let WishListContext = createContext()

export default function WishListContextProvider(props) {
    
    let headers = { token: localStorage.getItem("token")}


    function addProductToWishList(productId) {
        return axios
        .post(`https://ecommerce.routemisr.com/api/v1/wishlist`, 
            {productId: productId,},
            {headers,}
        )
        .then((res)=>res)
        .catch((err)=>err);
    }

    function GetLoggedUserWishList() {
        return axios
        .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, 
            {headers,}
        )
        .then((res)=>res)
        .catch((err)=>err);
    }

    function RemoveProductFromWishList(productId) {
        return axios
        .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, 
            {headers,}
        )
        .then((res)=>res)
        .catch((err)=>err);
    }



    return(
        <WishListContext.Provider value={  {addProductToWishList , GetLoggedUserWishList , RemoveProductFromWishList}  }>
            {props.children}
        </WishListContext.Provider>
    )
}
