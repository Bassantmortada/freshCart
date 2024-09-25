import React, { useContext, useState } from 'react'
import style from './Register.module.css'
import { useFormik } from 'formik'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup"
import { UserContext } from '../../Context/userContext';
import {Helmet} from "react-helmet";


export default function Register() {

  let {userLogin, setuserLogin} = useContext(UserContext)

  const [ApiError, setApiError] = useState("")

  const [isLoading, setisLoading] = useState(false)

  // navigate to go to page home
  const navigate = useNavigate()

  // call api
  function handleRegister(values) {
    setisLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , values )

    // if data succes
      .then((res)=>{ 
      setisLoading(false)
      if (res.data.message == "success") {
        localStorage.setItem("token", res.data.token )
        setuserLogin(res.data.token)
        navigate("/")
      }})

      // if data have error
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
    name: Yup.string().min(3 ,"min length is 3").max(10 , "max length is 10").required("name is required"),
    email: Yup.string().email("invalid email").required("email is required"),
    password: Yup.string().matches(/^[A-Za-z0-9@#.]{6,10}$/ , "password should be between 6 and 10char").required("password is required"),
    rePassword: Yup.string().oneOf([Yup.ref("password")] , "rePassword and password not the same").required("rePassword is required"),
    phone: Yup.string().matches(/^01[0125][1-9]{8}$/ , "invalid phone number").required("phone is required")
  })

  // function validationError(values) {
  //   let errors = {}
  //   if (values.name = "") {
  //     errors.name = "name is reqired"
  //   }  
  //   else if(!/^[A-Z][a-z]{3}$/.test(values.name)){
  //     errors.name = "name is not valid"
  //   }
  //   return errors
  // }

let formik = useFormik ({
  initialValues :{
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: ""
  },
  validationSchema,
  onSubmit: handleRegister,
})


  return<>

<Helmet>
      <title>Register</title>
</Helmet>

  <div className="">
    {ApiError ?<div className="w-1/2 mx-auto text-white bg-red-600 rounded-lg p-4">
    {ApiError}
    </div>:null}
  <h2 className='color-title py-10 mt-14 md:py-4 md:mb-4  font-bold text-2xl text-emerald-600 text-center'>Register Now!</h2>
  <form onSubmit={formik.handleSubmit} className ="max-w-md mx-auto">
  <div className ="relative z-0 w-full mb-8 group">
      <input type="text"
    name="name"
    value={formik.values.name}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    id="name"
    className ="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
      <label htmlFor="floating_email" className ="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Name</label>
     
  {formik.errors.name && formik.touched.name ?  
    <span className="text-red-800">{formik.errors.name}
    </span> : null}
  </div>

 



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
  <div className ="relative z-0 w-full mb-8 group">
      <input type="password" 
      name="password" 
      value={formik.values.password}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      id="password" 
      className ="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
      <label htmlFor="floating_password" className ="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
 
      {formik.errors.password && formik.touched.password ?  
    <span className="text-red-800">{formik.errors.password}
    </span> : null}
  </div>
  <div className ="relative z-0 w-full mb-8 group">
      <input type="password" 
      name="rePassword" 
      value={formik.values.rePassword}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      id="rePassword" 
      className ="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
      <label htmlFor="floating_password" className ="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">RePassword</label>
  
      {formik.errors.rePassword && formik.touched.rePassword ?  
    <span className="text-red-800">{formik.errors.rePassword}
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
      <label htmlFor="floating_password" className ="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Phone</label>

      {formik.errors.phone && formik.touched.phone ?  
    <span className="text-red-800">{formik.errors.phone}
    </span> : null}
  </div>

<div className="text-center md:flex md:items-center md:gap-4">
  <button type="submit" className ="text-white my-2 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none
      focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center
      dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
        {isLoading ? <i className='fas fa-spinner fa-spin'></i>
        :"Register"}
  </button>
    <Link to={"/login"}>do you have an account?<span className='text-blue-600 underline'>Login Now</span></Link>
</div>
  
      
  </form>
  </div>
  </>
}
