import React from 'react'
import style from './NotFound.module.css'
import img from '../../assets/error.svg'
export default function NotFound() {
  return<>
    <img src={img} alt="Not Found" className='m-auto mt-10 pt-10' />
  </>
}
