import BestSellings from '@/components/BestSellings'
import ItemHeader from '@/components/ItemsHeader'
import React from 'react'

const shop = () => {
  return (

      
      <div className='w-[90vw] md:w-[80vw] max-w-6xl pb-5 mx-auto flex flex-col gap-16 mt-20'>
      <ItemHeader firstHeading="Find Your Happiness" lastHeading="PizzaHut" />
      <BestSellings/>
    </div>
  
  )
}

export default shop