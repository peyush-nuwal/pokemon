import { delay, easeInOut, motion } from 'framer-motion'
import React from 'react'


const Card = ({pokemon}) => {
     
  const pokemonName = pokemon.name || "Unknown";
  const DURATION=0.25;
  const STAGGER=0.025;
  
  
  const variants = {
    initial: { y: 0 },
    hover: { y: "-100%" },
  };

  return (
    <motion.div initial="initial" whileHover="hover" className=' h-64 w-52 border-[1px] rounded-lg'>
      <div className='h-1/2 relative flex justify-center items-center '>
       <img src="/blob.svg" alt="" className=' w-[240px] h-[240px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10' />


       <motion.img 
       variants={{initial:{scale:1},hover:{scale:1.2}}} 
       transition={{duration:DURATION, ease:easeInOut}}
       src={pokemon.sprites.front_default} alt="" 
       className=' w-full h-full object-contain' />
      </div>

       {/* ____________-__pokemon detailss________________ */}
       <div className='w-full h-1/2 px-1  relative  flex flex-col  '>
        <motion.h1  className='h-8 text-2xl font-semibold relative   block whitespace-nowrap overflow-hidden text-center '>
         <motion.div className='absolute inset-0  ' >
           {pokemonName.split('').map((c,i)=>(
             <motion.span variants={variants} 
             transition={{duration:DURATION, ease:easeInOut, delay:STAGGER*i}} key={i} className='inline-block' >{c}</motion.span>
           ))}
         </motion.div>

         <motion.div className='absolute inset-0  ' >
           {pokemonName.split('').map((c,i)=>(
             <motion.span variants={{initial:{y:"100%"},hover:{y:0}}} 
             transition={{duration:DURATION, ease:easeInOut, delay:STAGGER*i}} key={i} className='inline-block' >{c}</motion.span>
           ))}
         </motion.div>
        </motion.h1>
        
        <div className='w-fit  flex gap-2 self-center bg-lime-500 rounded-full px-2 py-1  mt-2  '>
           {pokemon.types.map((a,i)=>(
             <div key={i} className='text-sm'>{a.type.name}</div>
           ))} 
        </div>
      
         <div className='grid grid-cols-2 text-xs gap-y-1 px-2 py-1 text-center my-2'>
          <p>Weight: {pokemon.weight}</p> 
          <p>Height: {pokemon.height}</p>
          <p >Exp: {pokemon.base_experience
          }</p>
          <p>Attack: {pokemon.moves.length}</p>
           

          </div>  
        
       </div>
       
    </motion.div>
  )
}

export default Card