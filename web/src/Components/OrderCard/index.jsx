// import PropTypes from 'prop-types'
import { XMarkIcon } from '@heroicons/react/24/solid'

const OrderCard= props => {

  // OrderCard.propTypes = {
  //   props: PropTypes.node.isRequired,
  // }

  //eslint-disable-next-line react/prop-types
  const {id, name, imageURL, price, handleDelete} = props

  let renderXMarkIcon
  if(handleDelete){
    {/* X */}
    renderXMarkIcon = <XMarkIcon onClick={ ()=>handleDelete(id) } className="h-6 w-6 text-black cursor-pointer" />
  }

  return(
    <div className="flex justify-between items-center mb-3">
      <div className=" flex items-center gap-2">
        <figure className="w-20 h-20">
          <img className="w-full h-full rounded-lg object-cover" src={imageURL} alt={name} />
        </figure>
        <p className=" text-sm font-light">{name}</p>
      </div>

      <div className=" flex items-center gap-2">
        <p className=" text-lg font-medium">${price}</p>
        {/* X */}
        {renderXMarkIcon}
      </div>
    </div>
  )
}

export default OrderCard
