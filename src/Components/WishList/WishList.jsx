import React, { useContext, useEffect, useState } from 'react'
import style from './WishList.module.css'
import { WishListContext } from '../../Context/WishListContext'
import toast from 'react-hot-toast'
import {Helmet} from "react-helmet";

export default function WishList() {

  let {GetLoggedUserWishList , RemoveProductFromWishList} = useContext(WishListContext)
  const [wishListdetails, setwishListdetails] = useState(null)

async function getWishList() {
  let response = await GetLoggedUserWishList()
  console.log(response?.data);
  if (response?.data?.status == "success") {
    setwishListdetails(response?.data?.data)
  }
}

useEffect(() => {
  getWishList()
}, [])


async function DeleteProduct(id) {
  let response = await RemoveProductFromWishList(id)
  console.log(response?.data);
  if (response?.data?.status == "success") {
    setwishListdetails(response?.data?.data)
    toast.success(response?.data?.message)
    getWishList()
  }
}
  return(
  <>
<Helmet>
      <title>Wish List</title>
</Helmet>

  {wishListdetails?.length > 0 ? <>
  <div className="py-10">
    <h1 className='color-title text-center font-semibold text-3xl bg-slate-200 rounded-2xl w-80 mx-auto p-3'>Your Wish List</h1></div>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          
        </th>
      </tr>
    </thead>
    <tbody>
    {wishListdetails?.map((product)=>
    <tr key={product?._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={product?.imageCover} className=" w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        {product?.title}
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        {product?.price} EGP
        </td>
        <td className="px-6 py-4">
          <span onClick={()=>DeleteProduct(product?._id)} href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer">
            <i className="fa-solid fa-trash px-2"></i>Remove</span>
        </td>
      </tr>
    )}
    </tbody>
  </table>
</div>
  </> : <h1 className='text-red-600 capitalize text-3xl font-bold text-center my-10 py-10 '>No Product Added</h1>}





  </>
  )
}
