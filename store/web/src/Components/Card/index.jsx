import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'
import { PlusIcon, CheckIcon } from '@heroicons/react/24/solid'

const Card = (data) => {
  //Pasamos el contexto para poder interactuar o contar el evento click de cart
  const context = useContext(ShoppingCartContext)

  const showProduct= (productDetail)=>{
    context.openProductDetail()
    context.setproductToShow(productDetail)
  }

  const addProductsToCart = (event, productData)=>{
    event.stopPropagation()
    context.setCount(context.count + 1)
    context.setCartProducts([...context.cartProducts, productData])
    context.openCheckoutSideMenu()
    context.closeProductDetail()
    //console.log('CART: ', context.cartProducts)
  }

  const renderIcon= (id)=>{
    const isInCart = context.cartProducts.filter(product => product.id === id).length > 0
    if(isInCart){
      return(
        <button
          className='absolute top-0 right-0 flex justify-center items-center bg-black w-6 h-6 rounded-full
          m-2 p-1'>
          {/* check */}
          <CheckIcon className="h-6 w-6 text-white cursor-pointer" />
        </button>
      )
    }else{
      return(
        <button
          className='absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1'
          onClick={(event)=> { addProductsToCart(event, data.data) }}>
          {/* + */}
          <PlusIcon className="h-6 w-6 text-black cursor-pointer" />
        </button>
      )
    }

  }

  //Abrir y cerrar Product Detail -> openProductDetail
  return (
    <div
      className='bg-white cursor-pointer w-56 h-60 rounded-lg'
      onClick={()=> showProduct(data.data)}>

      <figure className='relative mb-2 w-full h-4/5'>
        <span className='absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5'>
          {/* Electronics */}
          {data.data.category.name}
        </span>
        {/* <img className='w-full h-full object-cover rounded-lg'
          src={data.data.images[0]}
          alt={data.data.title} /> */}
        <img className='w-full h-full object-cover rounded-lg'
          src={data.data.image}
          alt={data.data.description} />
        {/* + */}
        {renderIcon(data.data.id)}
      </figure>
      <p className='flex justify-between items-center'>
         {/* <span className='text-sm font-light'>{data.data.title} </span>*/}
        <span className='text-sm font-light'> {data.data.description} </span>
        <span className='text-lg font-medium'> ${data.data.price} </span>
      </p>
    </div>
  )
}

export default Card
