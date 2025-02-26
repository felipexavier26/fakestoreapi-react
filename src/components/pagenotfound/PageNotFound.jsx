import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
  const navigate = useNavigate(); 

  useEffect(() => {
    Swal.fire({
      title: 'Página Não Encontrada',
      text: 'A página que você está procurando não existe.',
      icon: 'error',
      confirmButtonText: 'OK',
    }).then(() => {
      setTimeout(() => {
        navigate('/home'); 
      }, 1500); 
    });
  }, [navigate]);

}

export default PageNotFound;
