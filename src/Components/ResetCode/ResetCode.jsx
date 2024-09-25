import React, { useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup"
import {Helmet} from "react-helmet";

export default function ResetCode() {

  const [ApiError, setApiError] = useState("")

  const [isLoading, setisLoading] = useState(false)

  // navigate to go to page home
  const navigate = useNavigate()

  // call api
  async function handleResetCode(values) {
    try{
      setisLoading(true)
      let res = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode` , values )
      setisLoading(false)
      if (res.data.status == "Success") {
        navigate("/newpassword")
      }
    }
      catch{
      setisLoading(false)
      setApiError(res.response.data.message)
  }
    
  }

  // validation for Yup
  let validationSchema = Yup.object().shape({
    resetCode: Yup.string().matches(/^[0-9]{6}$/ , "invalid code").required("Enter the code that was sent"),
  })

let formik = useFormik ({
  initialValues :{
    resetCode: "",
  },
  validationSchema,
  onSubmit: handleResetCode,
})


  return<>

<Helmet>
      <title>Reset Code</title>
</Helmet>

  <div>
    {ApiError ?<div className="w-1/2 mx-auto text-white bg-red-600 rounded-lg p-4 my-5">
    {ApiError}
    </div>:null}
  <h2 className='py-5 mb-5 font-bold text-2xl text-emerald-600 text-center'>ResetCode</h2>
  <form onSubmit={formik.handleSubmit} className ="max-w-md mx-auto">


  <div className ="relative z-0 w-full mb-8 group">
      <input type="text" 
      name="resetCode"
      value={formik.values.resetCode}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      id="floating_resetCode"
      className ="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
      <label htmlFor="floating_resetCode" className ="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto
      peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >ResetCode</label>
  
      {formik.errors.resetCode && formik.touched.resetCode ?  
    <span className="text-red-800">{formik.errors.resetCode}
    </span> : null}
  </div>



<div className="flex items-center gap-4">
  <button type="submit" className ="text-white my-2 bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none
      focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center
      dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
        {isLoading ? <i className='fas fa-spinner fa-spin'></i>
        :"Submit"}
  </button>
  {/* <span onClick={formik.handleSubmit}><span className='text-blue-600 underline flex items-center justify-center cursor-pointer'>Resent code agin</span></span> */}
</div>
  
      
  </form>
  </div>
  </>
}
