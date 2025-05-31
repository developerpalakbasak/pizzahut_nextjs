import React from 'react'
import Link from 'next/link'
import { FaShoppingCart } from 'react-icons/fa'
import DesktopMenuItem from './DesktopMenuItem'

const DesktopMenu = ({ cart }) => {
    return (<>

        <div className="flex items-center">
            <DesktopMenuItem />
        </div>


    </>
    )
}

export default DesktopMenu