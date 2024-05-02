import './styles.css'
import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'

const ProductDetail= ()=>{
  const context = useContext(ShoppingCartContext)
  //console.log('PRODUCT-SHOW', context.productToShow)

  return(
    <aside
      className= {`${context.isProductDetailOpen ? 'flex' : 'hidden'} product-detail flex-col fixed right-0 border border-black rounded-lg bg-white`}>
      <div className='flex justify-between items-center p-6'>
        <h2 className='font-medium text-xl'>Detalle</h2>
        <div>
          {/* X */}
          <svg
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black cursor-pointer"
            onClick={()=> context.closeProductDetail()}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>
      </div>

      <figure className='px-6'>
        <img
          className='w-full h-full rounded-lg'
          src={context.productToShow.image}
          alt={context.productToShow.name}  />
      </figure>

      <p className=' flex flex-col p-6'>
        <span className='font-medium text-2xl'>${context.productToShow.price}</span>
        <span className='font-medium text-md'>{context.productToShow.name}</span>
        <span className='font-medium text-sm'>{context.productToShow.description}</span>
      </p>
    </aside>
  )
}

export default ProductDetail
