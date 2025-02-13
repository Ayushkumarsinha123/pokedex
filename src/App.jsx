import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './pages/Home'
import './App.css'
import PokemonDetail from "./pages/pokemonDetails";


function App() {
  

  return (
   <Router>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/pokemon/:name" element={<PokemonDetail/>}/>
    </Routes>
   </Router>
  )
}

export default App
