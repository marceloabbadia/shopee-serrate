import ListaProdutos from '../src/pages/listaProdutos/ListaProdutos'
import Header from './components/header/Header'
import Login from '../src/pages/login/Login'
import Cadastro from './pages/cadastro/Cadastro'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DetalheProduto from './pages/detalheProduto/DetalheProduto'

function App() {
   return (
      <>
         <BrowserRouter>
            <Header />
            <Routes>
               <Route path="/" element={<ListaProdutos />} />
               <Route path="/login" element={<Login />} />
               <Route path="/cadastro" element={<Cadastro />} />
               <Route path="/detalheProduto/:id" element={<DetalheProduto />} />
            </Routes>
         </BrowserRouter>
      </>
   )
}

export default App
