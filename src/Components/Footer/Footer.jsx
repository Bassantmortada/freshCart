import React from 'react'
import style from './Footer.module.css'
import Logo from '../../assets/freshcart-logo.svg'
import { Link } from 'react-router-dom'

export default function Footer() {
return<> 
<footer className="bg-blue-100/80 font-sans dark:bg-white my-5">
    <div className="py-12 mx-auto">
            <div className="sm:col-span-2">
                <h1 className="max-w-lg text-xl font-semibold tracking-tight text-gray-800 xl:text-2xl">Get the FreshCart app</h1>
                <p className='text-gray-500 mt-2'>We will send you a link, open it in your phone to download the app.</p>

                <div className="flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
                    <input id="email" type="text" className="w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-white dark:text-gray-500 dark:border-gray-200 focus:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0" placeholder="Email Address" />
            
                    <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none bg-green-700 rounded-lg hover:bg-green-800 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                        Subscribe
                    </button>
                </div>
            </div>
        
        <hr className="my-6 border-gray-200 md:my-8 dark:border-gray-700 h-2" />
        
        <div className="md:flex md:items-center md:justify-between">
            <div className="flex flex-1 items-center gap-4 hover:cursor-pointer">
                <p className='text-gray-700'>Get deliveries With FreshCart</p>
                <img src="https://www.svgrepo.com/show/303139/google-play-badge-logo.svg" width="130" height="110" alt="" />
                <img src="https://www.svgrepo.com/show/303128/download-on-the-app-store-apple-logo.svg" width="130" height="110" alt="" />
            </div>
            
            <div className="flex gap-4 hover:cursor-pointer">
                <img src="https://www.svgrepo.com/show/303114/facebook-3-logo.svg" width="20" height="20" alt="fb" />
                <img src="https://www.svgrepo.com/show/303115/twitter-3-logo.svg" width="20" height="20" alt="tw" />
                <img src="https://www.svgrepo.com/show/303145/instagram-2-1-logo.svg" width="20" height="20" alt="inst" />
                <img src="https://www.svgrepo.com/show/94698/github.svg" className="" width="20" height="20" alt="gt" />
                <img src="https://www.svgrepo.com/show/22037/path.svg" width="20" height="20" alt="pn" />
                <img src="https://www.svgrepo.com/show/28145/linkedin.svg" width="20" height="20" alt="in" />
                <img src="https://www.svgrepo.com/show/22048/dribbble.svg" className="" width="20" height="20" alt="db" />
            </div>
        </div>
    </div>
</footer>



  </>
}
