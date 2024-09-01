
import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';
import Navbar from './components/Navbar';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const api="https://pokeapi.co/api/v2/pokemon"

  const [pokemon, setPokemon] = useState([])
  const [input, setInput] = useState("")
 
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

   
    
  } catch (error) {
    console.log("error while fetching data")
  }
 }

 useEffect(() => {
  fetchPokemon()
 }, [])
 
 const filteredPokemon = input
 ? pokemon.filter((p) =>
     p.name.toLowerCase().includes(input.toLowerCase())
   )
 : pokemon;
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
