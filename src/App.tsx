import './App.css'
import AvistamientosPorEspecies from './Views/AvistamientosPorEspecies'
import Avistamientos from './Views/Avistamientos'
import Lugares from './Views/Lugares'
import Especies from './Views/Especies'
import Categorias from './Views/Categorias'

function App() {
  return (
    <>
      <h1>Prueba invemar</h1>
      <hr />
      <Avistamientos />
      <hr />
      <Lugares />
      <hr />
      <Especies />
      <hr />
      <Categorias />
      <hr />
      <AvistamientosPorEspecies />
    </>
  )
}

export default App
