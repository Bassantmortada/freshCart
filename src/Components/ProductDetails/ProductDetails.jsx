import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import Slider from "react-slick";
import {Helmet} from "react-helmet";
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishListContext } from '../../Context/WishListContext';


export default function ProductDetails() {

  // to catch id from url
  let {id , category} = useParams()
  // to call api details
  let [productDetails, setproductDetails] = useState(null)
  // to call api relatedProduct
  const [relatedProduct, setrelatedProduct] = useState([])

  let {addProductToCart , numberOfCart, setnumberOfCart} = useContext(CartContext)
  const [loading, setloading] = useState(false)
  const [curentId, setcurentId] = useState(0)


  let {addProductToWishList , RemoveProductFromWishList} = useContext(WishListContext)
  const [isInWishlist, setIsInWishlist] = useState(new Set())


   // slick slider
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 2,
    autoplay: false,
    autoplaySpeed: 1000
  };

  function getProductdetails(id) {
    axios
    .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    .then((res)=>{
      // console.log(res.data.data);
      setproductDetails(res.data.data);
      
    })
    .catch((res)=>{
      console.log(res);
    })
    }

  function getRelatedProduct() {
    axios
    .get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then((res)=>{
    let related =  res.data.data.filter((product)=> product.category.name == category)
    setrelatedProduct(related);
    })
    .catch((res)=>{
      console.log(res);
    })
    }

    useEffect(()=>{
      getProductdetails(id)
      getRelatedProduct()
    },[id , category])
  

    // add to cart
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


    // wishlist
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

  
  return<>

<Helmet>
      <title>Product Details</title>
</Helmet>

  <div className="row items-center relative">
    <div className="w-1/4">
    <Slider {...settings}>      
      {productDetails?.images.map((src)=> <img src={src} className='w-full'/>)}
    </Slider>
    <span>
    <i className={`${isInWishlist.has(productDetails?.id)?'fa-solid text-red-600':'fa-regular text-black'} fa-heart text-xl absolute top-5 right-2  md:top-2 md:right-2 m-4 btt `}
    onClick={()=>addTowishlist(productDetails?.id)}></i>
    </span>
    </div>

    <div className="w-3/4 p-5 ">
    <h2 className='text-2xl capitalize font-semibold'>{productDetails?.title}</h2>
    <h4 className='my-4 text-gray-500'>{productDetails?.description}</h4>
    <h4 className='mt-5'>{productDetails?.category.name}</h4>
    <div className="flex items-center justify-between my-1">
      <span>{productDetails?.price} EGP</span>
      <span><i className='fas fa-star text-yellow-400'></i>{productDetails?.ratingsAverage} </span>
    </div>
    <button onClick={()=>addToCart(productDetails?.id)} className="btn my-4">
    {loading && curentId == productDetails?.id? <i className='fas fa-spinner fa-spin'></i> : "Add To Cart"}
    </button>
    </div>
  </div>

  <h2 className='text-xl font-semibold mt-8 py-5'>Related Product</h2>
  <div className="row">
  {relatedProduct.length > 0 ?  relatedProduct.map((product)=> <div key={product.id} className='w-1/2 md:w-1/6'>
  <div className="product p-2 my-3 relative">
  <span>
    <i className={`${isInWishlist.has(product.id)?'fa-solid text-red-600':'fa-regular text-black'} fa-heart  absolute m-4 btt `}
    onClick={()=>addTowishlist(product.id)}></i>
    </span>
    <Link to={`/productdetails/${product.id}/${product.category.name}`}>
    <img src={product.imageCover} className='w-full' alt="" />
    <h3 className='text-emerald-600 '>{product.category.name}</h3>
    <h3 className='mb-1'>{product.title.split(" ").slice(0,2).join(" ")}</h3>
    <div className="flex items-center justify-between p-2">
      <span>{product.price} EGP</span>
      <span><i className='fas fa-star text-yellow-400'></i>{product.ratingsAverage} </span>
    </div>
    </Link>
    <button onClick={()=>addToCart(product?.id)} className="btn my-4">
    {loading && curentId == product?.id? <i className='fas fa-spinner fa-spin'></i> : "Add To Cart"}
    </button>
  </div>
</div>) : <span className="loader"></span>}
  </div>
  </>
}
