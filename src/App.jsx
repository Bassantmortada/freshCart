import { useState } from 'react'
import './App.css'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Cart from './Components/Cart/Cart';
import Brands from './Components/Brands/Brands';
import Categories from './Components/Categories/Categories';
import Products from './Components/Products/Products';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import NotFound from './Components/NotFound/NotFound';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import UserContextProvider from './Context/userContext'
import CartContextProvider from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import Checkout from './Components/Checkout/Checkout';
import AllOrders from './Components/AllOrders/AllOrders';
import WishListContextProvider from './Context/WishListContext';
import WishList from './Components/WishList/WishList';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ResetCode from './Components/ResetCode/ResetCode';
import NewPassword from './Components/NewPassword/NewPassword';




let query = new QueryClient()

let x = createHashRouter([
  {path: "/" , element: <Layout/> , children:[
    {index: true , element: <ProtectedRoute> <Home/> </ProtectedRoute> },
    {path: "cart" , element: <ProtectedRoute> <Cart/> </ProtectedRoute> },
    {path: "brands" , element: <ProtectedRoute> <Brands/> </ProtectedRoute> },
    {path: "categories" , element: <ProtectedRoute> <Categories/> </ProtectedRoute> },
    {path: "products" , element: <ProtectedRoute> <Products/> </ProtectedRoute> },
    {path: "productdetails/:id/:category" , element: <ProtectedRoute> <ProductDetails/> </ProtectedRoute> },
    {path: "checkout" , element: <ProtectedRoute> <Checkout/> </ProtectedRoute> },
    {path: "allorders" , element: <ProtectedRoute> <AllOrders/> </ProtectedRoute> },
    {path: "wishlist" , element: <ProtectedRoute> <WishList/> </ProtectedRoute> },
    {path: "register" , element: <Register/>},
    {path: "login" , element: <Login/>},
    {path: "forgetpassword" , element: <ForgetPassword/>},
    {path: "resetcode" , element: <ResetCode/>},
    {path: "newpassword" , element: <NewPassword/>},
    {path: "*" , element: <NotFound/>},
  ] },
])




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <UserContextProvider>
    <QueryClientProvider client={query}>
      <CartContextProvider>
        <WishListContextProvider>
        <RouterProvider router={x}></RouterProvider>
        </WishListContextProvider>
      <Toaster/>
      </CartContextProvider>
    <ReactQueryDevtools/>
    </QueryClientProvider>
    </UserContextProvider>
    </>
  )
}

export default App
