import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

function CriarProduto() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: null,
    imagePreview: null,
    rating: {
      rate: '',
      count: '',
    },
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!formData.title) newErrors.title = "O nome do produto é obrigatório.";
    if (!formData.price) newErrors.price = "O preço é obrigatório.";
    if (!formData.description) newErrors.description = "A descrição é obrigatória.";
    if (!formData.category) newErrors.category = "A categoria é obrigatória.";
    if (!formData.image) newErrors.image = "A imagem do produto é obrigatória.";
    if (!formData.rating.rate) newErrors.rate = "A nota é obrigatória.";
    if (!formData.rating.count) newErrors.count = "O número de avaliações é obrigatório.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'rate' || name === 'count') {
      setFormData({
        ...formData,
        rating: { ...formData.rating, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file, imagePreview: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Preencha todos os campos corretamente antes de continuar.',
      });
      return;
    }

    Swal.fire({
      icon: 'success',
      title: 'Sucesso!',
      text: 'Produto cadastrado com sucesso!',
    }).then(() => {
      navigate('/produto');
    });

    console.log('Dados do formulário:', formData);

    setFormData({
      title: '',
      price: '',
      description: '',
      category: '',
      image: null,
      imagePreview: null,
      rating: { rate: '', count: '' },
    });
    setErrors({});
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Adicionar Novo Produto</h2>
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
                placeholder="Digite o preço do produto"
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
                placeholder="Digite a descrição do produto"
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
                placeholder="Digite a categoria do produto"
              />
              {errors.category && <div className="invalid-feedback">{errors.category}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Imagem do Produto</label>
              <input
                type="file"
                className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                name="image"
                onChange={handleFileChange}
              />
              {errors.image && <div className="invalid-feedback">{errors.image}</div>}
              {formData.imagePreview && (
                <div className="mt-2">
                  <img src={formData.imagePreview} alt="Pré-visualização" className="img-thumbnail" width="150" />
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Avaliação (Nota)</label>
              <input
                type="number"
                className={`form-control ${errors.rate ? 'is-invalid' : ''}`}
                name="rate"
                value={formData.rating.rate}
                onChange={handleChange}
                placeholder="Nota (ex: 4.5)"
                step="0.1"
                min="0"
                max="5"
              />
              {errors.rate && <div className="invalid-feedback">{errors.rate}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Número de Avaliações</label>
              <input
                type="number"
                className={`form-control ${errors.count ? 'is-invalid' : ''}`}
                name="count"
                value={formData.rating.count}
                onChange={handleChange}
                placeholder="Número de avaliações (ex: 100)"
              />
              {errors.count && <div className="invalid-feedback">{errors.count}</div>}
            </div>

            <button type="submit" className="btn btn-primary w-100">Cadastrar Produto</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CriarProduto;
