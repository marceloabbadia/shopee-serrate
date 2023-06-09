import ListaProdutos from '../src/pages/listaProdutos/ListaProdutos'
import Header from './components/header/Header'
import Login from '../src/pages/login/Login'
import Cadastro from './pages/cadastro/Cadastro'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
   return (
      <>
         <Header />
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<ListaProdutos />} />
               <Route path="/login" element={<Login />} />
               <Route path="/cadastro" element={<Cadastro />} />
            {/* </Routes> */}
         </BrowserRouter>
      </>
   )
}

export default App
