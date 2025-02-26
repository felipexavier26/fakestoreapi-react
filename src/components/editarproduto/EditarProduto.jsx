import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/Api';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EditarProduto.css';

function EditarProduto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
    newImage: null,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    api.get(`/${id}`)
      .then((response) => setFormData({ ...response.data, newImage: null }))
      .catch(() => Swal.fire('Erro', 'Erro ao carregar os dados do produto.', 'error'));
  }, [id]);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.title) newErrors.title = "O nome do produto é obrigatório.";
    if (!formData.price) newErrors.price = "O preço é obrigatório.";
    if (!formData.description) newErrors.description = "A descrição é obrigatória.";
    if (!formData.category) newErrors.category = "A categoria é obrigatória.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, newImage: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      Swal.fire('Erro!', 'Preencha todos os campos obrigatórios!', 'error');
      return;
    }

    setLoading(true);

    const updatedData = { ...formData };
    if (formData.newImage) {
      updatedData.image = URL.createObjectURL(formData.newImage);
    }

    try {
      await api.put(`/${id}`, updatedData);
      Swal.fire('Sucesso!', 'Produto atualizado com sucesso!', 'success').then(() => navigate('/produto'));
    } catch {
      Swal.fire('Erro!', 'Não foi possível atualizar o produto.', 'error');
    }

    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Editar Produto</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">

            <div className="mb-3">
              <label className="form-label">Nome do Produto</label>
              <input
                type="text"
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Digite o nome do produto"
              />
              {errors.title && <div className="invalid-feedback">{errors.title}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Preço</label>
              <input
                type="number"
                className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Digite o preço"
              />
              {errors.price && <div className="invalid-feedback">{errors.price}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Descrição</label>
              <textarea
                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Digite a descrição"
                rows="3"
              ></textarea>
              {errors.description && <div className="invalid-feedback">{errors.description}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Categoria</label>
              <input
                type="text"
                className={`form-control ${errors.category ? 'is-invalid' : ''}`}
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Digite a categoria"
              />
              {errors.category && <div className="invalid-feedback">{errors.category}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Imagem do Produto</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImageChange}
              />
              <div className="mt-3 text-center">
                <p>Imagem atual:</p>
                {formData.image && <img src={formData.image} alt="Produto" className="img-thumbnail" width="150" />}
                {formData.newImage && (
                  <>
                    <p className="mt-2">Nova imagem:</p>
                    <img src={URL.createObjectURL(formData.newImage)} alt="Nova Prévia" className="img-thumbnail" width="150" />
                  </>
                )}
              </div>
            </div>

            <button type="submit" className="btn btn-success w-100" disabled={loading}>
              {loading ? "Atualizando..." : "Atualizar Produto"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditarProduto;
