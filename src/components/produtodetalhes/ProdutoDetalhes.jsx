import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import './ProdutoDetalhes.css';
import api from '../api/Api';

function ProdutoDetalhes() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get(`/${id}`)
      .then((response) => {
        setProduct(response.data); 
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    Swal.fire({
      title: 'Produto adicionado!',
      text: `${product.title} foi adicionado ao carrinho.`,
      icon: 'success',
      confirmButtonText: 'OK',
    });
  };

  if (loading) return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Carregando...</p>
    </div>
  );

  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="produto-details-container">
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} className="produto-detail-image" />
      <p>{product.description}</p>
      <p><strong>Preço:</strong> ${product.price}</p>
      <button className="add-to-cart-button" onClick={handleAddToCart}>
        Adicionar ao Carrinho
      </button>
    </div>
  );
}

export default ProdutoDetalhes;
