import { useContext } from 'react'
import { useRoutes, BrowserRouter, Navigate } from 'react-router-dom'
import { ShoppingCartProvider, initializeLocalStorage, ShoppingCartContext } from '../../Context/'
import Home from '../Home'
import MyAccount from '../MyAccount'
import MyOrder from '../MyOrder'
import MyOrders from '../MyOrders'
import MyProduct from '../MyProduct'
import MyCategory from '../MyCategory'
import MyUser from '../MyUser'
import SignIn from '../SignIn'
import NotFound from '../NotFound'
import Navbar from '../../Components/Navbar'
import CheckoutSideMenu from '../../Components/CkeckoutSideMenu'
import './App.css'

const AppRoutes = () => {
  const context = useContext(ShoppingCartContext)

  //Account
  const account = localStorage.getItem('account')
  const parsedAccount = JSON.parse(account)

  //SingOut
  const signOut = localStorage.getItem('sign-out')
  const parsedSignOut = JSON.parse(signOut)

   // Has an account
   const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
   const noAccountInLocalState = Object.keys(context.account).length === 0
   const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState
   const isUserSignOut = context.signOut || parsedSignOut


  let routers = useRoutes([
    //{ path: '/category/:category', element: <Home /> },
    { path: '/', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'/sign-in'} /> },
    { path: '/all', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'/sign-in'} /> },
    { path: '/clothes', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'/sign-in'} /> },
    { path: '/electronics', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'/sign-in'} /> },
    { path: '/furnitures', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'/sign-in'} /> },
    { path: '/toys', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'/sign-in'} /> },
    { path: '/others', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'/sign-in'} /> },
    { path: '/my-account', element: <MyAccount /> },
    { path: '/my-order', element: <MyOrder /> },
    { path: '/my-orders', element: <MyOrders /> },
    { path: '/my-orders/last', element: <MyOrder /> },
    { path: '/my-orders/:id', element: <MyOrder /> },
    { path: '/my-product', element: <MyProduct /> },
    { path: '/my-category', element: <MyCategory /> },
    { path: '/my-user', element: <MyUser /> },
    { path: '/sign-in', element: <SignIn /> },
    { path: '/*', element: <NotFound /> },
  ])
  return routers
}

function App() {
  initializeLocalStorage()
  
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <AppRoutes />
        <Navbar />
        <CheckoutSideMenu />
      </BrowserRouter>
    </ShoppingCartProvider>
  )
}

export default App
