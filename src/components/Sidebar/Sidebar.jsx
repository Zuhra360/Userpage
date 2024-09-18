import React from 'react'
import { MdOutlineWbSunny,MdOutlineTask} from "react-icons/md";
import { FaRegStar,FaRegCalendarAlt  } from "react-icons/fa";
import {  Divider} from "@mantine/core";
export const Sidebar = () => {
  return (
    <div  className='flex flex-col items-start w-64 h-screen gap-4 bg-white '>
        <h1 className='text-3xl font-bold p-4 '>Todolist</h1>
        <div className='flex flex-row text-xl font-semibold p-4 gap-4 hover:bg-gray-200 w-64'>
        <MdOutlineWbSunny />
        <p className=' ' >My Day</p>
        </div>

        <div className='flex flex-row text-xl font-semibold p-4  hover:bg-gray-200 gap-4 w-64'>
        <FaRegStar />
        <p >Important</p>
        </div>

        <div className='flex flex-row text-xl font-semibold p-4 gap-4 hover:bg-gray-200 w-64'>
        <FaRegCalendarAlt />
        <p >Planned</p>
        </div>

        <div className='flex flex-row text-xl font-semibold p-4 gap-4 hover:bg-gray-200 w-64'>
        <MdOutlineTask />
        <p className=' '>Tasks</p>
        </div>


        <Divider orientation="vertical" size="sm"  />
        
    </div>
  )
}


