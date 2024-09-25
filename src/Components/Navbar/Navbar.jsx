import React, { useContext, useState } from 'react'
import style from './Navbar.module.css'
import Logo from '../../assets/freshcart-logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/userContext'
import { CartContext } from '../../Context/CartContext'
import { useEffect } from 'react'

export default function Navbar() {
  let {userLogin , setuserLogin} = useContext(UserContext)
  let navigate = useNavigate()
  let {numberOfCart , getLoggedUserCart}= useContext(CartContext)
  const [open, setopen] = useState(false)


  function toggle() {
    setopen(!open)
  }
  
  function signout() {
    localStorage.removeItem("token");
    setuserLogin(null);
    navigate("/login")
  }


  return<>
<nav className="bg-slate-200 fixed top-0 right-0 left-0 border-gray-200 z-10">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4 px-10 relative">
    <div className="md:flex items-center gap-3 w-full md:w-auto">
    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src={Logo} className="h-10" width="120px" alt="Flowbite Logo" />
    </Link>
    {userLogin != null ? <ul className={`md:flex gap-4 ${open?'block':'hidden'}`}>
          <li><NavLink className='block mt-3 md:mt-0 bg-gray-900 text-white md:text-black hover:text-white md:hover:text-black md:bg-transparent rounded p-3 md:p-0'
            to="">Home</NavLink></li>
          <li><NavLink className='block mt-3 md:mt-0 bg-gray-900 text-white md:text-black hover:text-white md:hover:text-black md:bg-transparent rounded p-3 md:p-0'
            to="products">Products</NavLink></li>
          <li><NavLink className='block mt-3 md:mt-0 bg-gray-900 text-white md:text-black hover:text-white md:hover:text-black md:bg-transparent rounded p-3 md:p-0'
            to="categories">Categories</NavLink></li>
          <li><NavLink className='block mt-3 md:mt-0 bg-gray-900 text-white md:text-black hover:text-white md:hover:text-black md:bg-transparent rounded p-3 md:p-0'
            to="brands">Brands</NavLink></li>
          <li>
            <Link className='relative' to="cart"><i className="fa-solid fa-cart-shopping my-5 md:my-0"></i>
            {numberOfCart == 0 ? "" 
            :<div className=" bg-green-500 absolute top-[-20px] left-2 rounded-full size-5 flex items-center justify-center font-semibold">
            {numberOfCart}</div>
            }
          </Link></li>
        </ul> : null}
    
    </div>

    <div className={`w-full md:w-auto md:flex items-center justify-between ${open?'block':'hidden'}`} id="navbar-default">
      <div className="icons md:flex md:gap-4  justify-center items-center cursor-pointer md:p-4">

        <Link to="wishlist">
        <i className="fa-solid fa-heart" />
        </Link>
      <i className="fa-brands fa-facebook mx-3 md:m-0"></i>     
      <i className="fa-brands fa-twitter mx-2 md:m-0"></i>
      <i className="fa-brands fa-linkedin mx-2 md:m-0"></i>
      <i className="fa-brands fa-youtube mx-2 md:m-0"></i>
      <i className="fa-brands fa-tiktok mx-2 md:m-0"></i>
      </div>

    <div className="icons md:flex items-center justify-center gap-4 cursor-pointer md:p-">
        {userLogin != null ?  <ul><li onClick={signout} className='flex md:items-center md:justify-center md:dark:hover:text-green-500'>
          <i className="fa-solid fa-right-from-bracket"></i>
          <span className="block rounded cursor-pointer md:border-0 md:p-0">
            Signout
          </span>
        </li></ul>  
        :<ul className="font-medium gap-4 md:flex flex-col p-4 text-black md:p-0 md:flex-row rtl:space-x-reverse md:mt-0 md:border-0 ">
        <li>
          <Link to="login" className="block md:p-0 emerald-500 md:dark:hover:text-green-500">Login</Link>
        </li>
        <li>
          <Link to="register" className="block rounded md:border-0 md:p-0 md:dark:hover:text-green-500 ">Register</Link>
        </li>
      </ul>}
      </div>
    </div>
    <div className="md:hidden block">
    <i onClick={toggle} className={` ${!open? 'fa-bars':'fa-close'}  fas  fa-2x absolute top-5 right-3 cursor-pointer`}></i>
    </div>
  </div>
</nav>

  </>
}
