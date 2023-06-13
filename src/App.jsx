import ListaProdutos from '../src/pages/listaProdutos/ListaProdutos'
import Header from './components/header/Header'
import Login from '../src/pages/login/Login'
import Cadastro from './pages/cadastro/Cadastro'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DetalheProduto from './pages/detalheProduto/DetalheProduto'
import LoginEUsuario from './pages/logineusuario/logineusuario'
import Carrinho from './pages/carrinho/Carrinho'
import { Context } from './context/Context'
import Footer from './components/footer/Footer'

function App() {
   return (
      <>
         <BrowserRouter>
            <Header />
            <Routes>
               <Route path="/" element={<ListaProdutos />} />
               <Route path="/login" element={<LoginEUsuario />} />
               <Route path="/detalheProduto/:id" element={<DetalheProduto />} />
               <Route path="/carrinho" element={<Carrinho />} />
            </Routes>
            <Footer/>
         </BrowserRouter>
      </>
   )
}

export default App
