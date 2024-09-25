import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup"
import {Helmet} from "react-helmet";

export default function ForgetPassword() {

  const [ApiError, setApiError] = useState("")

  const [isLoading, setisLoading] = useState(false)

  // navigate to go to page home
  const navigate = useNavigate()

  // call api
  async function handleForgetPassword(values) {
    setisLoading(true)
    let res = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords` , values )

    // if data succes
      .then((res)=>{ 
      setisLoading(false)
      // console.log(res); 
      if (res.data.statusMsg == "success") {
        navigate("/resetcode")
      }
    })
      .catch((res)=>{
      setisLoading(false)
      setApiError(res.response.data.message)
  })
    // if (data.message == "success") {
    //   navigate("/")
    // }
    
  }

  // validation for Yup
  let validationSchema = Yup.object().shape({
    email: Yup.string().email("invalid email").required("email is required"),
  })

let formik = useFormik ({
  initialValues :{
    email: "",
  },
  validationSchema,
  onSubmit: handleForgetPassword,
})


  return<>

<Helmet>
      <title>Forget Password</title>
</Helmet>

  <div className="">
    {ApiError ?<div className="w-1/2 mx-auto text-white bg-red-600 rounded-lg p-4 my-5">
    {ApiError}
    </div>:null}
  <h2 className='py-5 mb-5 font-bold text-2xl text-emerald-600 text-center'>Forget Password!</h2>
  <form onSubmit={formik.handleSubmit} className ="max-w-md mx-auto">


  <div className ="relative z-0 w-full mb-8 group">
      <input type="email" 
      name="email"
      value={formik.values.email}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      id="floating_email"
      className ="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
      <label htmlFor="floating_email" className ="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
  
      {formik.errors.email && formik.touched.email ?  
    <span className="text-red-800">{formik.errors.email}
    </span> : null}
  </div>



<div className="flex items-center gap-4">
  <button type="submit" className ="text-white my-2 bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none
      focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center
      dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
        {isLoading ? <i className='fas fa-spinner fa-spin'></i>
        :"Submit"}
  </button>
</div>
  
      
  </form>
  </div>
  </>
}
