import React from 'react'
import style from './Home.module.css'
import RecentProducts from '../RecentProducts/RecentProducts'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import MainSlider from '../MainSlider/MainSlider'
import {Helmet} from "react-helmet";

export default function Home() {
  return<>

  <Helmet>
      <title>FreshCart</title>
  </Helmet>
  <MainSlider/>
  <CategoriesSlider/>
  <RecentProducts/>
  </>
}
