import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import { CartContext } from '../../Context/CartContext';
import * as Yup from "yup"
import {Helmet} from "react-helmet";


export default function Checkout() {

  let {Checkout , cartId} = useContext(CartContext)
  const [isLoading, setisLoading] = useState(false)


    // validation for Yup
    let validationSchema = Yup.object().shape({
      details: Yup.string().required("details is required"),
      phone: Yup.string().matches(/^01[0125][1-9]{8}$/ , "invalid phone number").required("phone is required"),
      city: Yup.string().matches(/^[A-za-z]{4,10}$/ , "invalid city").required("city is required"),
      // password: Yup.string().matches(/^[A-Za-z0-9]{6,10}$/ , "password should be between 6 and 10char").required("password is required"),
    })

let formik = useFormik ({
  initialValues :{
    details: "",
    phone: "",
    city: "",
  },
  validationSchema,
  onSubmit: () =>
    handleCheckout( cartId , `http://localhost:5173`),
})

  // call api
  async function handleCheckout(cartId , url) {
    setisLoading(true)
    try{
      let response = await Checkout(cartId , url , formik.values)
  // console.log(response.data.session.url);
  // url giteway
    window.location.href = response.data.session.url
    setisLoading(false)
    }
    catch{
      setisLoading(false)
    }

  }

  return<>

  <Helmet>
    <title>Checkout</title>
  </Helmet>
  <h2 className='color-title py-5 my-5 font-bold text-2xl flex items-center justify-center'>CheckOut Now!</h2>
  <form onSubmit={formik.handleSubmit} className ="max-w-md mx-auto">


  <div className ="relative z-0 w-full mb-8 group">
      <input type="text" 
      name="details"
      value={formik.values.details}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      id="floating_details"
      className ="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
      <label htmlFor="floating_details" className ="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details...</label>

      {formik.errors.details && formik.touched.details ?  
    <span className="text-red-800">{formik.errors.details}
    </span> : null}
  </div>

  <div className ="relative z-0 w-full mb-8 group">
      <input type="tel" 
      name="phone" 
      value={formik.values.phone}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      id="phone" 
      className ="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
      <label htmlFor="floating_phone" className ="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Phone</label>

      {formik.errors.phone && formik.touched.phone ?  
    <span className="text-red-800">{formik.errors.phone}
    </span> : null}
  </div>
  
  <div className ="relative z-0 w-full mb-8 group">
      <input type="text" 
      name="city" 
      value={formik.values.city}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      id="city" 
      className ="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
      <label htmlFor="floating_city" className ="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your City</label>

      {formik.errors.city && formik.touched.city ?  
    <span className="text-red-800">{formik.errors.city}
    </span> : null}
  </div>


<div className="flex items-center justify-center gap-4">
  <button type="submit" className ="text-white my-2 bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none
      focus:ring-green-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center
      dark:bg-green-600 dark:hover:bg-green-800 dark:focus:ring-green-800">
        {isLoading ? <i className='fas fa-spinner fa-spin'></i>
        :"CheckOut Now"}
  </button>
</div>
  
      
  </form>
  </>
}
