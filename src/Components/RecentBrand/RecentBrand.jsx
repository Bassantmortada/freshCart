import React, { useEffect, useState } from 'react'
import axios from 'axios'


export default function RecentBrand() {

  const [allBrand, setallBrand] = useState([])


  function getAllBrand() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    .then((res)=>{
      // console.log(res.data.data)
      setallBrand(res.data.data);
    })
    .catch((res)=>{})
  }


  useEffect(() => {
    getAllBrand()
  }, [])
  
  return(
  <>
  {allBrand.length > 0? <>
  <h1 className='color-title text-center text-3xl font-semibold my-8 pt-8'>All Brands</h1>
  <div className="row gap-y-5">
    {allBrand.map((brand)=> <div key={brand._id} className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-3'>
    <div className="border">
    <img src={brand.image} className='w-full h-[200px] object-cover' alt="" />
    <h4 className='color-title text-center p-5 text-2xl font-semibold'>{brand.name}</h4>
    </div>
    </div>)}
  </div> </>: <div className="spinner"></div>}

</>
)}
