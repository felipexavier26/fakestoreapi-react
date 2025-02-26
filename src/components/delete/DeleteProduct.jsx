import React from 'react';
import Swal from 'sweetalert2';

function DeleteProduct({ onDelete }) {
  const handleDelete = () => {
    Swal.fire({
      title: 'Tem certeza que deseja excluir este produto?',
      text: 'Essa ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete();
        Swal.fire(
          'Excluído!',
          'O produto foi excluído com sucesso.',
          'success'
        );
      }
    });
  };

  return (
    <div>
      <button className="btn btn-danger" onClick={handleDelete}>
        Excluir Produto
      </button>
    </div>
  );
}

export default DeleteProduct;
