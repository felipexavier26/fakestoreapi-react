import React, { useState } from 'react';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

function Contato() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "O nome é obrigatório.";
    if (!formData.email) newErrors.email = "O email é obrigatório.";
    if (!formData.message) newErrors.message = "A mensagem não pode estar vazia.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      Swal.fire({
        title: 'Erro!',
        text: 'Por favor, corrija os campos destacados.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    Swal.fire({
      title: 'Mensagem enviada!',
      text: `Obrigado pelo contato, ${formData.name}. Entraremos em contato em breve.`,
      icon: 'success',
      confirmButtonText: 'OK',
    });

    setFormData({ name: '', email: '', message: '' });
    setErrors({});
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Fale Conosco</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
            <div className="mb-3">
              <label className="form-label">Nome:</label>
              <input
                type="text"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Digite seu nome"
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Digite seu email"
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Mensagem:</label>
              <textarea
                className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Digite sua mensagem"
                rows="5"
              ></textarea>
              {errors.message && <div className="invalid-feedback">{errors.message}</div>}
            </div>

            <button type="submit" className="btn btn-primary w-100">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contato;
