import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/Api';
import Swal from 'sweetalert2';
import './ListasProduto.css';

function ListasProduto() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;

    useEffect(() => {
        api.get('/')
            .then((response) => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(() => {
                Swal.fire('Erro', 'Erro ao carregar os produtos', 'error');
                setLoading(false);
            });
    }, []);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleDelete = (productId) => {
        Swal.fire({
            title: 'Tem certeza?',
            text: 'Você não poderá reverter esta ação!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sim, excluir!'
        }).then((result) => {
            if (result.isConfirmed) {
                api.delete(`/${productId}`)
                    .then(() => {
                        setProducts(products.filter(product => product.id !== productId));
                        Swal.fire('Excluído!', 'O produto foi excluído.', 'success');
                    })
                    .catch(() => Swal.fire('Erro', 'Não foi possível excluir o produto', 'error'));
            }
        });
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Carregando...</span>
                </div>
                <p>Carregando produtos...</p>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Lista de Produtos</h2>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <Link to="/criarproduto">
                    <button className="btn btn-primary">Adicionar Produto</button>
                </Link>
            </div>

            <div className="table-responsive">
                <table className="table table-hover text-center">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Imagem</th>
                            <th>Nome</th>
                            <th>Preço</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="img-thumbnail"
                                        width="50"
                                    />
                                </td>
                                <td>{product.title}</td>
                                <td>{`R$ ${product.price.toFixed(2)}`}</td>
                                <td>
                                    <div className="d-flex justify-content-center gap-2">
                                        <Link to={`/editarproduto/${product.id}`} className="btn btn-warning btn-sm">
                                            Editar
                                        </Link>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(product.id)}
                                        >
                                            Excluir
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <nav>
                <ul className="pagination justify-content-center mt-3">
                    {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, index) => (
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

export default ListasProduto;
