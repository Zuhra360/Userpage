import React from 'react'
import { Sidebar } from '../Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import { Myday } from '../Todolist/Myday/Myday'

export const Todolist = () => {
  return (
    <div className='flex flex-row h-screen'>
        
        <Sidebar/>
        <div className='h-screen w-[100%] '>
        <Myday />
        </div>
        
  
    </div>
    
  )
}
