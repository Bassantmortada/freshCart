import React, { useEffect, useState } from 'react'
import style from './CategoriesSlider.module.css'
import axios from 'axios'
import Slider from "react-slick";

export default function CategoriesSlider() {

  const [categories, setcategories] = useState([])
  

  // slick slider
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 1000
  };

  function getCategories() {
    axios
    .get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then((res)=>{
      // console.log(res.data.data);
      setcategories(res.data.data)
    })
    .catch((res)=>{

    })
  }

  useEffect(() => {
    getCategories()
  }, [])
  
  return(
  <>
  <h2 className='text-xl font-semibold my-5'>Shope Popular Categories</h2>
    <Slider {...settings}>    
    {categories.map((categories)=> <div key={categories._id}>
      <img src={categories.image} className='w-full h-[200px] object-cover' alt="" />
      <h4>{categories.name}</h4>
    </div>)}  
    </Slider>

  </>
  )
}

