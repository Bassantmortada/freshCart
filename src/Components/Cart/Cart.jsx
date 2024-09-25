import React, { useContext, useState } from 'react'
import style from './Cart.module.css'
import { CartContext } from '../../Context/CartContext'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import {Helmet} from "react-helmet";


export default function Cart() {

  let {getLoggedUserCart , updateCart , deleteProductCart , ClearUserCart , numberOfCart, setnumberOfCart} = useContext(CartContext)
  const [cartDetails, setcartDetails] = useState(null)
  const [loading, setloading] = useState(false)
  const [curentId, setcurentId] = useState(0)


  async function getCartItem() {
  let response = await getLoggedUserCart()
  if (response.data.status == "success") {
    setcartDetails(response.data.data)
  }
  }

  async function updateProduct(id , count) {
    setcurentId(count)
    setloading(true)

    if (count == 0) {
      deleteProduct(id)
    }
    else{
      let response = await updateCart(id , count)
      if (response.data.status == "success") {
        setloading(false)
        setcartDetails(response.data.data)
        toast.success("Product Updated Successfully")
    
      }
      else{
        toast.error("error!!")
        setloading(false)
      }
      
      }
    }
    

  async function deleteProduct(id) {
  let response = await deleteProductCart(id)
  if (response.data.status == "success") {
    setcartDetails(response.data.data)
    setnumberOfCart(numberOfCart - 1)
    toast.success("Product Delete Successfully")
  }
  }

async function deleteCart() {
  setnumberOfCart(0)
  setloading(true)
  let response = await ClearUserCart()
  // console.log(response.data.data);
  if (response.data.message == "success") {
    setcartDetails(null)
    toast.success("Removed All Cart")
  }
  else{
        setloading(false)
  }
  }


  useEffect(()=>{
    getCartItem()
  },[])

  return(
  <>
      <Helmet>
      <title>Cart</title>
      </Helmet>
  {cartDetails?.products.length > 0 ? <>
  {/* <Link to={"/"}><i className="fa-solid fa-arrow-left text-3xl font-bold"></i></Link> */}
  <div className="pt-10">
    <h1 className='color-title text-3xl font-semibold text-center bg-slate-200 rounded-2xl w-60 mx-auto p-3'>Shopping Cart</h1></div>
    <h2 className=' text-center text-xl my-3 font-semibold'>Total Price: 
      <span className='text-red-600 text-2xl font-semibold'>{cartDetails?.totalCartPrice}EGP</span></h2>
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          Image
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
        {cartDetails?.products.map((product)=>
        <tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        {product.product.title}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button onClick={()=>updateProduct(product.product.id , product.count -1 )}
            className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
              {loading && curentId == product.count? <i className='fas fa-spinner fa-spin'></i> : <span>{product.count}</span>
            }
            </div>
            <button onClick={()=>updateProduct(product.product.id , product.count +1 )}
            className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        {product.price}EGP
        </td>
        <td className="px-6 py-4">
          <span onClick={()=>deleteProduct(product.product.id)} className="font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline">
            Remove</span>
        </td>
      </tr>)
      }

    </tbody>
  </table>
  <div className="text-center md:flex md:items-center md:justify-evenly">
        <Link  to={"/checkout"}>
            <button className='btn p-3 text-white rounded-lg my-4 mx-5'>CheckOut
            <i className="fa-regular fa-credit-card px-2"></i>
            </button>
        </Link>

  <button onClick={deleteCart} className='bg-red-600 hover:bg-red-700 py-2 px-4 text-white rounded-lg my-4'>Delete Cart
  <i className="fa-solid fa-trash-can px-2"></i>
  </button>
  </div>

</div></> : <h1 className='text-red-600 capitalize text-3xl font-bold text-center my-10 py-10 '>No Product Added</h1>


  }
  </>
  );
}
