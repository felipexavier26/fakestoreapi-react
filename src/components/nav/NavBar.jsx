import { BrowserRouter, Route, Routes, NavLink, useNavigate } from 'react-router-dom'; 
import { useState } from 'react';
import './NavBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from '../home/Home';
import Contato from '../contato/Contato';
import SobreNos from '../sobre-nos/SobreNos';
import Servicos from '../servicos/Servicos';
import Produto from '../produto/Produto';
import ProdutoDetails from '../produtodetalhes/ProdutoDetalhes';
import PageNotFound from '../pagenotfound/PageNotFound';
import ListasProduto from '../listaproduto/ListasProduto';
import CriarProduto from '../criarproduto/CriarProduto';
import EditarProduto from '../editarproduto/EditarProduto';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink to="/home" className="navbar-brand">Fake Store Api</NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>


        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink to="/home" className="nav-link" activeClassName="active">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/produto" className="nav-link" activeClassName="active">Produtos</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/listaproduto" className="nav-link" activeClassName="active">Listas de produto</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/sobrenos" className="nav-link" activeClassName="active">Sobre Nós</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/servicos" className="nav-link" activeClassName="active">Serviços</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contato" className="nav-link" activeClassName="active">Contato</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route>
          <Route path="/home" element={<Home />} />
          <Route path="/produto" element={<Produto />} />
          <Route path="/listaproduto" element={<ListasProduto />} />
          <Route path="/criarproduto" element={<CriarProduto />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/sobrenos" element={<SobreNos />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/produto/:id" element={<ProdutoDetails />} />
          <Route path="/editarproduto/:id" element={<EditarProduto />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
