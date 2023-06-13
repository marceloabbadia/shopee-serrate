import ListaProdutos from "../src/pages/listaProdutos/ListaProdutos";
import Header from "./components/header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetalheProduto from "./pages/detalheProduto/DetalheProduto";
import LoginEUsuario from "./pages/loginEUsuario/logineusuario";
import Carrinho from "./pages/carrinho/Carrinho";
import { Context } from "./context/Context";
import PesquisaProdutos from "./pages/pesquisaprodutos/PesquisaProdutos";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ListaProdutos />} />
          <Route path="/login" element={<LoginEUsuario />} />
          <Route path="/detalheProduto/:id" element={<DetalheProduto />} />
          <Route path="/pesquisaProdutos/" element={<PesquisaProdutos />} />
          <Route path="/carrinho" element={<Carrinho />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
