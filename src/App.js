import PokemonThumnail from "./components/PokemonThumnail";
import {useEffect, useState} from "react";

function App() {

  const [allPokemons, setAllPokemons] = useState([])
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit = 20')

  const getAllPokemons = async () => {
    const res = await fetch(loadMore)
    const data = await res.json()

    setLoadMore(data.next)
    // looping through an array by calling a function bcoz each pokemon has unique ids

    function createPokemonObject  (result) {
      result.forEach(async (pokemon) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data = await res.json()
        
        setAllPokemons(currentList => [...currentList, data])
        
      });
    }
    createPokemonObject(data.results)
    await console.log(allPokemons)
  }

  useEffect(() => {
    getAllPokemons()
  }, [])


  return (
    <div className="app_container">
      <h1>Pokemon Evolution</h1>
      <div className="pokemon_container">
        <div className="all_container">
          {allPokemons.map( (pokemonStats, index) => 
            <PokemonThumnail
              
              id={pokemonStats.id}
              image={pokemonStats.sprites.other.dream_world.front_default}
              name={pokemonStats.name}
              type={pokemonStats.types[0].type.name}
              key={index}
            />)}
        </div>
        <button className="load_more" onClick={() => getAllPokemons()}>Load More</button>
      </div>
    </div>
  );
}

export default App;
