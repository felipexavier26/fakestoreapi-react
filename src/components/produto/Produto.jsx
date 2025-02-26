import React, { useState, useEffect } from 'react';
import ProdutoService from '../produtoservice/ProdutoService';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Produto.css';

function Produto() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const productsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ProdutoService.getAllProducts();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError('Erro ao carregar produtos. Tente novamente mais tarde.');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = category
    ? products.filter(product => product.category === category)
    : products;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <p className="mt-2">Carregando produtos...</p>
      </div>
    );
  }

  if (error) {
    Swal.fire('Erro!', error, 'error');
    return <div className="alert alert-danger text-center">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Produtos</h2>

      <div className="row mb-4">
        <div className="col-md-6">
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="form-select"
          >
            <option value="">Todas as Categorias</option>
            {Array.from(new Set(products.map(product => product.category))).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <select
            onChange={(e) => setSortOrder(e.target.value)}
            value={sortOrder}
            className="form-select"
          >
            <option value="asc">Preço: Menor para Maior</option>
            <option value="desc">Preço: Maior para Menor</option>
          </select>
        </div>
      </div>

      <div className="row">
        {currentProducts.map((product) => (
          <div className="col-md-3 mb-4" key={product.id}>
            <div className="card produto-card">
            <img src={product.image} alt={product.title} className="card-img-top produto-card" />
              <div className="card-body">
                <h5 className="card-title">
                  {product.title.length > 30 ? product.title.substring(0, 30) + '...' : product.title}
                </h5>
                <p className="card-text">Preço: <strong>R$ {product.price.toFixed(2)}</strong></p>
                <p className="text-muted">Avaliação: ⭐ {product.rating.rate}</p>
                <Link to={`/produto/${product.id}`} className="btn btn-primary w-100">
                  Ver detalhes
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          {Array.from({ length: Math.ceil(sortedProducts.length / productsPerPage) }, (_, index) => (
            <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Produto;
