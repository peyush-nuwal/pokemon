import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
const Navbar = ({input,setInput}) => {
      const [isSearchBarOpen, setIsSearchBarOpen] = useState(false)
     

      const handleChange=(e)=>{
        setInput(e.target.value)
      }
  
    const searchVariants={
         initial:{
           width:"40px",
           height:"40px",
         },
         animate:{
        width:"384px"
         },
         transition:{
          duration:0.5

         }
    }
     
    const handleIsSearchBar=()=>{
      setIsSearchBarOpen(!isSearchBarOpen)
    }
  return (
    <div className='
     w-full h-16 flex  justify-between items-center px-4 border-b-[1px] border-black'>
        <img src="/nav_logo.svg" alt="" className='w-60 '/>
        <div className='relative  top-12 right-5 md:top-0 md:right-0'>
        <motion.input
         initial="initial" animate={isSearchBarOpen?"animate":"initial"} transition={"transition"} variants={searchVariants}
        type="text" placeholder='Type Here' 
        value={input}
        onChange={handleChange}
        className='-96   border-black rounded-full px-4 border-[1px] outline-0 ' />
        <button 
        onClick={handleIsSearchBar}
        className='w-[35px] h-[35px] rounded-full absolute top-1/2 right-1  -translate-y-1/2   bg-white flex items-center justify-center'>
            {
                   isSearchBarOpen
                   ?
                   <RxCross1/>
                   :
                   <CiSearch />
            }
           </button>
        </div>
        </div>
  )
}

export default Navbar