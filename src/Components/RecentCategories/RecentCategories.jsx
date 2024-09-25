import React, { useEffect, useState } from 'react'
import style from './RecentCategories.module.css'
import axios from 'axios'
export default function RecentCategories() {

  const [allCategories, setallCategories] = useState([])
  const [subCategories, setsubCategories] = useState([])


  function getAllCategories() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then((res)=>{
      // console.log(res.data.data)
      setallCategories(res.data.data);
    })
    .catch((res)=>{})
  }

  function getSubCategories(idCategories) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${idCategories}/subcategories`)
    .then((res)=>{
      setsubCategories(res.data.data)
    })
    .catch((res)=>{})    
  }

  useEffect(() => {
    getAllCategories()
  }, [])
  
  return(
  <>
  {allCategories.length > 0?    <div className="row my-5">
    {allCategories.map((categories)=> <div key={categories._id} className='w-full md:w-1/2 lg:w-1/3 px-3'>
    <div onClick={()=>getSubCategories(categories._id)} className="border">
    <img src={categories.image} className='w-full h-[300px] object-cover' alt="" />
    <h4 className='color-title text-center p-5 text-2xl font-semibold'>{categories.name}</h4>
    </div>
    </div>
  )}
    
  </div> : <div className="spinner"></div>}


{subCategories? <>
  <h2 className='text-center text-2xl text-emerald-700 p-5'>{subCategories?.name}</h2>
<div className="row">
{subCategories?.map((subcategoriesProduct)=>
<div key={subcategoriesProduct._id} className="w-full md:w-1/2 lg:w-1/3 px-3 my-4">
<div className="border">
<h4 className='text-center p-5 text-2xl font-semibold'>{subcategoriesProduct.name}</h4>
</div>
</div>
)}
</div>

</> : <h2>No Prodect!</h2>
}

</>
)}
