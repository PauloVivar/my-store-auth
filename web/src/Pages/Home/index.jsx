import { useContext } from 'react'
import Layout from '../../Components/Layout'
import Card from '../../Components/Card'
import ProductDetail from '../../Components/ProductDetail'
import { ShoppingCartContext } from '../../Context'

function Home() {
  const context = useContext(ShoppingCartContext)

  //Inicio
  //const currentPath = window.location.pathname
  //let index = capitalizarPrimeraLetra(currentPath.substring(currentPath.lastIndexOf('/')+1))
  // let index = currentPath.substring(currentPath.lastIndexOf('/category/')+1)
  // console.log('items: ', context.items)

  // const renderView= ()=>{
  //   if(context.searchByTitle?.length > 0){
  //     if(context.filteredItems?.length > 0){
  //       if(index){
  //         return (
  //           context.filteredItems?.filter(item => item.category.name === index).map((item)=>(
  //             <Card key={item.id} data = {item}/>
  //          ))
  //         )
  //       }else{
  //         return (
  //           context.filteredItems?.map((item)=>
  //           (<Card key={item.id} data = {item}/>))
  //         )
  //       }
  //     }else{
  //       return(
  //         <div>Producto no encontrado</div>
  //       )
  //     }
  //   }
  // }
  //Fin

  const renderView= ()=>{
    if(context.filteredItems?.length > 0){
      return(
        context.filteredItems?.map( item => (
          <Card key={item.id} data={item}/>
        ))
      )
    }else{
      return (
        <div>Producto no encontrado</div>
      )
    }
  }

  return (
      <Layout>
        <div className='flex items-center justify-center relative w-80'>
          <h1 className='font-medium text-xl mb-4'>Home: Productos Exclusivos</h1>
        </div>
        <input
          type="text"
          placeholder='Busca un Producto'
          className='rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none'
          onChange={(event)=> context.setSearchByTitle(event.target.value)}/>

        <div className='grid gap-4 grid-cols-4 w-full max-w-screen-lg'>
          {
           renderView()
          }
        </div>

        <ProductDetail />
      </Layout>
  )
}

export default Home
