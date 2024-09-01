
import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';
import Navbar from './components/Navbar';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { MdOutlineCatchingPokemon } from "react-icons/md";

function App() {
  const api="https://pokeapi.co/api/v2/pokemon"

  const [pokemon, setPokemon] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(true)
 
  // __________fetching data using axios___________
 const fetchPokemon = async () => {
  try {
    const response=await axios.get(api)
    const pokemondata= await response.data.results;
    
    const detailedPokemonData =pokemondata.map(async(curpokemon)=>{
      const res =await axios.get(curpokemon.url)
      const data =await res.data
            return data
    })
  
    const detailedPokemonResponse =await Promise.all(detailedPokemonData)
    setPokemon(detailedPokemonResponse)
      setLoading(false)
   
    
  } catch (error) {
    console.log("error while fetching data")
    setLoading(false)
  }
 }

 useEffect(() => {
  fetchPokemon()
 }, [])


//  _________filltering the list ___________
 const filteredPokemon = input
 ? pokemon.filter((p) =>
     p.name.toLowerCase().includes(input.toLowerCase())
   )
 : pokemon;

//  _______loader________
  if(loading){
    return <div className='h-screen w-screen flex justify-center items-center'><MdOutlineCatchingPokemon className='text-4xl animate-spin'/></div>
  }

   

  return (
    <div>
       <Navbar input={input} setInput={setInput}/>

       <motion.ul
       layout
       className='m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-fit gap-x-2  gap-y-3 items-center justify-center py-10 '>
         <AnimatePresence>
        { filteredPokemon.map((pokemon)=>(
          <Card layout pokemon={pokemon} key={pokemon.id}/>
        )
        
      )}
      </AnimatePresence>
       </motion.ul>
      
      
    </div>
  );
}

export default App;
