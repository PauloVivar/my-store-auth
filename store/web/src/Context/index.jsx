/* eslint-disable no-unused-vars */

//Estado Global Context
import PropTypes from 'prop-types'
import { createContext, useState, useEffect } from 'react'

export const ShoppingCartContext = createContext()

//account and sign-out
export const initializeLocalStorage= ()=>{

  // initializeLocalStorage.propTypes = {
  //   children: PropTypes.node.isRequired,
  // }

  const accountInLocalStorage = localStorage.getItem('account')
  const signOutInLocalStorage = localStorage.getItem('sign-out')
  let parsedAccount
  let parsedSignOut

  if(!accountInLocalStorage){
    localStorage.getItem('account', JSON.stringify({}))
    parsedAccount = {}
  }else{
    parsedAccount = JSON.parse(accountInLocalStorage)
  }
  
  if(!signOutInLocalStorage){
    localStorage.getItem('sign-out', JSON.stringify(false))
    parsedSignOut = false
  }else{
    parsedSignOut = JSON.parse(signOutInLocalStorage)
  }
}

export const ShoppingCartProvider= ({children}) =>{
  ShoppingCartProvider.propTypes = {
    children: PropTypes.node.isRequired,
  }

  //My account
  const [account, setAccount] = useState({})

  //My sign-out
  const [signOut, setSignOut] = useState(false)

  //Shopping Cart . Increment quantity
  const [count, setCount] = useState(0)

  //Product Detail . Open/Close event-click in Carts
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
  const openProductDetail= ()=> setIsProductDetailOpen(true)
  const closeProductDetail= ()=> setIsProductDetailOpen(false)

  //Checkout Side Menu . Open/Close event-click in Checkout Side Menu
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
  const openCheckoutSideMenu= ()=> setIsCheckoutSideMenuOpen(true)
  const closeCheckoutSideMenu= ()=> setIsCheckoutSideMenuOpen(false)

  //Product Detail . Show Product
  const [productToShow, setproductToShow] = useState({})

 //Shopping Cart Products . Add Product
 const [cartProducts, setCartProducts] = useState([])

 //Shopping Cart . Order
 const [order, setOrder] = useState([])

 //Get Products
 const [items, setItems] = useState(null)
 const [filteredItems, setFilteredItems] = useState(null)

 //Get Products . By title or name
  const [searchByTitle, setSearchByTitle] = useState(null)

 //Get Products . By category
 const [searchByCategory, setSearchByCategory] = useState(null)

 //items, setItems
 useEffect ( ()=>{
  //fetch('https://api.escuelajs.co/api/v1/products')
  fetch('http://localhost:3000/api/v1/products')
    .then(response => response.json())
    .then(data => setItems(data))
},[] )

//filteredItems, filteredItems By Title Name and Category
const filteredItemsByTitle = (items, searchByTitle)=>{
  return items?.filter(item => item.name.toLowerCase().includes(searchByTitle.toLowerCase()))
}
const filteredItemsByCategory = (items, searchByCategory)=>{
  return items?.filter(item => item.category.name.toLowerCase().includes(searchByCategory.toLowerCase()))
}

const filterBy = (searchType, items, searchByTitle, searchByCategory) =>{
  if(searchType === 'BY_TITLE'){
    return filteredItemsByTitle(items, searchByTitle)
  }
  if(searchType === 'BY_CATEGORY'){
    return filteredItemsByCategory(items, searchByCategory)
  }
  if(searchType === 'BY_TITLE_AND_CATEGORY'){
    return filteredItemsByCategory(items, searchByCategory).filter(item =>
      item.name.toLowerCase().includes(searchByTitle.toLowerCase()))
  }
  if(!searchType){
    return items
  }
}

useEffect ( ()=>{
  if(searchByTitle && searchByCategory){ setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY', items, searchByTitle, searchByCategory)) }
  if(searchByTitle && !searchByCategory){ setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory)) }
  if(!searchByTitle && searchByCategory){ setFilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory)) }
  if(!searchByTitle && !searchByCategory){ setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory)) }
}, [items, searchByTitle, searchByCategory])

//console.log('filteredItems: ', filteredItems)

  return(
    <ShoppingCartContext.Provider value={{
      count,
      setCount,
      openProductDetail,
      closeProductDetail,
      isProductDetailOpen,
      productToShow,
      setproductToShow,
      cartProducts,
      setCartProducts,
      isCheckoutSideMenuOpen,
      openCheckoutSideMenu,
      closeCheckoutSideMenu,
      order,
      setOrder,
      items,
      setItems,
      searchByTitle,
      setSearchByTitle,
      filteredItems,
      setFilteredItems,
      searchByCategory,
      setSearchByCategory,

      account,
      setAccount,
      signOut,
      setSignOut

    }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}
