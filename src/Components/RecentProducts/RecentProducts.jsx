import React, { useContext, useEffect, useState } from 'react'
import style from './RecentProducts.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import useProduct from '../Hooks/useProduct'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast';
import { WishListContext } from '../../Context/WishListContext'





export default function RecentProducts() {
  
      // hook used to shared data(api) to all components 
  let {data , error , isError , isLoading , isFetched} = useProduct()
  let {addProductToCart , numberOfCart, setnumberOfCart} = useContext(CartContext)
  const [loading, setloading] = useState(false)
  const [curentId, setcurentId] = useState(0)
  const [searchInput, setsearchInput] = useState("")
  let {addProductToWishList , RemoveProductFromWishList} = useContext(WishListContext)
  const [isInWishlist, setIsInWishlist] = useState(new Set())


  async function addTowishlist(id){
    let newWishlist = new Set(isInWishlist);
  if(newWishlist.has(id)){
  let response= await RemoveProductFromWishList(id)
    if(response?.data?.status=='success'){
      newWishlist.delete(id)
    toast.success('Prouduct removed from wishlist')
      localStorage.setItem("isInWishlist", JSON.stringify(response.data.data));
    }else{
      toast.error('Failedv to remove prouduct ')
    }
    }else{
  
  let response = await addProductToWishList(id)
    if(response?.data?.status=='success'){
        newWishlist.add(id)
        
    toast.success(response?.data?.message)
        localStorage.setItem("isInWishlist", JSON.stringify(response.data.data));
  }
  else{
    toast.error('Failedv to added prouduct ');
    }
  }
        setIsInWishlist(newWishlist);
  
  }


  useEffect(() => {
    const savedWishlist = localStorage.getItem("isInWishlist");
    if (savedWishlist) {
      setIsInWishlist(new Set(JSON.parse(savedWishlist)));
    }
  },[]);



  // Search
  const filteredProduct=data?.data?.data.filter((product)=>{
    if (searchInput == "") {
      return product
    }
    else if(product.title.toLowerCase().includes(searchInput.toLowerCase())){
      return product

    }
  })

  async function addToCart(id) {
    setcurentId(id)
    setloading(true)
  let response = await addProductToCart(id)
  // console.log(response);
  if (response.data.status == "success") {
    setloading(false)
    toast.success(response.data.message)
    setnumberOfCart(numberOfCart + 1)

  }
  else{
    setloading(false)
    toast.error(response.data.message)

  }
  }


  // function getProducts() {
  //  return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  // }

  // let {data , error , isError , isLoading , isFetched} = useQuery({
  //   queryKey:["recentproducts"],
  //   queryFn: getProducts,
  //   staleTime : 3000,
  //   gcTime: 4000,
  //   // data بيستقل اللي فوق في data
  //   select: (data)=> data.data.data
  // })
  // // console.log(data?.data?.data);

  
  if (isError) {
    return <h3>{error}</h3>
  }
  if (isLoading) {
   return <div className="spinner"></div>
  }
  






  return<>

<form className="flex items-center max-w-sm mx-auto mt-10 pt-10">   
  <label htmlFor="simple-search" className="sr-only">Search</label>
  <div className="relative w-full">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2" />
      </svg>
    </div>
    <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 
    dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..."
    onChange={(event)=> setsearchInput(event.target.value)} required />
< div />
  </div>
  </form>


  <div className="row">
    {filteredProduct.map((product)=> <div key={product.id} className='w-1/2 md:w-1/6'>
      <div className="product p-2 my-3 relative">
    <span>
    <i className={`${isInWishlist.has(product.id)?'fa-solid text-red-600':'fa-regular text-black'} fa-heart  absolute m-4 btt `}
    onClick={()=>addTowishlist(product.id)}></i>
    </span>

        <Link to={`productdetails/${product.id}/${product.category.name}`}>
          <img src={product.imageCover} className='w-full' alt="" />
          <h3 className='text-green-500'>{product.category.name}</h3>
          <h3 className='mb-1'>{product.title.split(" ").slice(0,2).join(" ")}</h3>
      <div className="flex items-center justify-between p-2">
          <span>{product.price} EGP</span>
          <span><i className='fas fa-star text-yellow-400'></i>{product.ratingsAverage} </span>
      </div>
        </Link>
        
        <button onClick={()=> addToCart(product.id)} className="btn">
        {loading && curentId == product.id? <i className='fas fa-spinner fa-spin'></i> : "Add To Cart"}
        </button>
      </div>
    </div>) }
  </div>


</>
}
