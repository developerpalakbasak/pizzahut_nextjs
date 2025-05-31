// "use client"
import BestSellings from '@/components/BestSellings'
import HeroSection from '@/components/HeroSection'
import ItemHeader from '@/components/ItemsHeader'
import Image from 'next/image'
import React from 'react'

const page = () => {

  return (
    
    <div className='relative flex flex-col w-full gap-12 overflow-hidden'>
      <Image src="./Vector.svg" alt='' width={500} height={500} className='w-full' />
    <HeroSection />
    <div className='w-[90vw] md:w-[80vw] max-w-6xl pb-5 mx-auto flex flex-col gap-10'>
      <ItemHeader firstHeading="Best Selling" lastHeading="Pizza" />
      <BestSellings/>
    </div>
  </div>
  )
}

export default page