// import PropTypes from 'prop-types'
import { ChevronRightIcon } from '@heroicons/react/24/solid'
import { ShoppingBagIcon } from '@heroicons/react/24/solid'
import { CalendarDaysIcon } from '@heroicons/react/24/solid'

const OrdersCard= props => {

  // OrderCard.propTypes = {
  //   props: PropTypes.node.isRequired,
  // }

  //eslint-disable-next-line react/prop-types
  const { totalPrice, totalProducts } = props

  console.log(totalPrice, totalProducts)

  return(
    <div className="flex justify-between items-center mb-3 border border-black rounded-lg p-4 w-80">
      <div className="flex justify-between w-full">
        <div className="flex flex-col">
          <p className='flex items-center gap-2'>
            <CalendarDaysIcon className='h-6 w-6 text-black cursor-pointer' />
            <span className="font-light">29.4.24</span>
          </p>
          <p className='flex items-center gap-2'>
            <ShoppingBagIcon className='h-6 w-6 text-black cursor-pointer' />
            <span className="font-light">{ totalProducts } art&iacute;culos</span>
          </p>
        </div>
        <p className='flex items-center gap-2'>
          <span className="font-medium text-2xl">${ totalPrice }</span>
          <ChevronRightIcon className='h-6 w-6 text-black cursor-pointer' />
        </p>
      </div>
    </div>
  )
}

export default OrdersCard
