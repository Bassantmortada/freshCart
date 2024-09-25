import React, { useEffect, useState } from 'react'
import style from './AllOrders.module.css'
import {Helmet} from "react-helmet";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { Accordion } from 'flowbite-react';
import { Link } from 'react-router-dom';
export default function AllOrders() {


  let {id} = jwtDecode(localStorage.getItem("token"))
  const [AllUserOrder, setAllUserOrder] = useState(null)

  async function getUserAllOrders() {
try{
  let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
  // console.log(data);
  setAllUserOrder(data)
} catch(error){
console.log(error);
}
}

useEffect(()=>{
  getUserAllOrders()
},[])










  return<>
<Helmet>
      <title>All Orders</title>
</Helmet>
<div className="relative">
<Link to={"/"} className='fixed mt-16 me-20 bg-slate-200 hover:bg-green-500 rounded-full size-10'>
<span className='flex items-center justify-center p-1'><i className="fa-solid fa-arrow-left text-3xl font-bold"></i></span>
  </Link>
</div>
  <h1 className='color-title text-center capitalize pt-10 text-3xl font-semibold my-5 '>All Orders</h1>
  <Accordion> 
    {AllUserOrder?.map((order)=><Accordion.Panel key={order._id}>
        <Accordion.Title className= {order.isPaid?'bg-emerald-950 mb-10 text-black hover:bg-emerald-900'
          :'bg-red-900 text-white hover:bg-red-600'}> <h2 className=' capitalize'>Payment Method Type : 
          {order.paymentMethodType}</h2> <h2 className=' capitalize'>isDelivered :  <span className={order.isDelivered.toString()?
            'text-red-700':'text-blue-700'}>{order.isDelivered.toString()} </span></h2>  <h2 className=' capitalize'>City :
            {order.shippingAddress.city}</h2> <h2 className=' capitalize'>ID : {order.id}</h2> </Accordion.Title>
    <h3 className='text-center text-xl capitalize font-semibold text-red-600 '>Total Order Price : {order.totalOrderPrice} EGP</h3>
<Accordion.Content className='md:w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
  <table className=" md:w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
        
      </tr>
    </thead>
    <tbody className='w-full'>
  {order.cartItems.map((item)=><>
<tr key={item?._id}  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 w-flex items-center ">
<td className="p-4">
  <img src={item.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
</td>
<td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
{item?.product?.title}
</td>
<td className="px-6 py-4">
  <div className="flex items-center">
    <div>
    {item?.count}     
  </div>
  </div>
</td>
<td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
  {item?.price} EGP
</td>

</tr>
</>)}
    </tbody>
  </table>
        </Accordion.Content>
      </Accordion.Panel>

  )}
    
    
</Accordion>

  </>
}
