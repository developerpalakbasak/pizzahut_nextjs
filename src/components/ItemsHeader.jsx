import React from 'react'

const ItemHeader = ({firstHeading, lastHeading}) => {
  return (
 <>
 <h4 className='text-2xl text-center'>{firstHeading}<span> </span><span className='text-primary'>{lastHeading}</span></h4>
 </>
  )
}

export default ItemHeader