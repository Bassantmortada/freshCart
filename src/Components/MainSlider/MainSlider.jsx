import React from 'react'
import style from './MainSlider.module.css'
import Slider from "react-slick";
import slider1 from "../../assets/grocery-banner.png"
import slider2 from "../../assets/slider-image-2.jpeg"
import slider3 from "../../assets/slider-image-3.jpeg"


export default function MainSlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000
  };

  return<>
       <div className="row my-5">
          <div className="w-3/4">
          <Slider {...settings}>
          <img src={slider1} className='w-full h-[400px] object-cover' alt="" />
          <img src={slider2} className='w-full h-[400px] object-cover' alt="" />
          <img src={slider3} className='w-full h-[400px] object-cover' alt="" />
          </Slider> 
          </div>
          <div className="w-1/4">
          <img src={slider2} className='w-full h-[200px]' alt="" />
          <img src={slider3} className='w-full h-[200px]' alt="" />
          </div>
        </div>
      <Slider {...settings}>
      </Slider> 

  </>
}
