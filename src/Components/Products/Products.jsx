  import React, { useContext } from 'react'
  import style from './Products.module.css'
  import axios from 'axios'
  import { Link } from 'react-router-dom'
  import useProduct from '../Hooks/useProduct'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import RecentProducts from '../RecentProducts/RecentProducts'
import {Helmet} from "react-helmet";

  export default function Products() {
  
    return<>
    <Helmet>
      <title>Product</title>
  </Helmet>
    <RecentProducts/>
  </>
  }
