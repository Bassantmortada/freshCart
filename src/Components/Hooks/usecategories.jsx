import { useQuery } from '@tanstack/react-query'
import React from 'react'

export default function usecategories() {
    function getAllCategories() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
        .then((res)=>{console.log(res.data.data)})
        .catch((res)=>{console.log(res.data.data)})
      }
      let categoriesInfo = useQuery({
        queryKey:["allCategories"],
        queryFn: getAllCategories,
        staleTime : 3000,
        gcTime: 4000,
      })
      // console.log(useQuery);
      

  return categoriesInfo
}
