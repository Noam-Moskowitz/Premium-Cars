import { navBarArray } from '@/consts/navBar'
import { FiSun } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import React from 'react'
import { Button } from '../ui/button';

const NavBar = () => {
  return (
    <nav className='w-full h-16 bg-primary shadow-md flex justify-between'>
        <div className='flex gap-10'>
            <img className='p-1' src="/images/logo.png" alt="Company Logo" />
            <div className='flex py-2 h-full items-end text-secondary gap-8 font-bold'>
                {navBarArray.map(navItem=>(
                    <div
                        className='border-b-4 border-primary hover:border-secondary cursor-pointer'
                    >{navItem.label}</div>
                ))}
            </div>
        </div>
        <div className='flex items-center px-5 gap-5'>
            <div className='border-2 border-secondary p-2 rounded cursor-pointer hover:bg-primary-foreground'>
                <FiSun size={18} className='text-secondary'/>
            </div>
            <div className='border-2 border-secondary p-2 rounded-full cursor-pointer hover:bg-primary-foreground'>
                <FiUser size={18} className='text-secondary' />
            </div>
        </div>
    </nav>
  )
}

export default NavBar
