import React from 'react';

function Home() {
  return (
    <div className="container mt-5">
      <div className="home-container p-4 shadow-sm rounded bg-light text-center">
        <h1 className="display-4 mb-4">Bem-vindo ao FakeStore</h1>
        <p className="lead">
          Descubra, explore e experimente! Este projeto utiliza a
          <a href="https://fakestoreapi.com" target="_blank" rel="noopener noreferrer" className="text-primary"> FakeStoreAPI</a>,
          uma API pública que simula um catálogo completo de produtos, incluindo roupas, eletrônicos e acessórios.
        </p>
        <p className="lead">
          Navegue por nossa coleção, veja detalhes dos produtos e experimente interagir com uma API de maneira prática e dinâmica.
        </p>
        <p className="text-muted">
          Ideal para aprendizado e testes em desenvolvimento web. Explore agora!
        </p>
      </div>
    </div>
  );
}

export default Home;
