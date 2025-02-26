import React from 'react';
import './Servicos.css';

function Servicos() {
  return (
    <div className="servicos-container">
      <h2>Serviços</h2>
      <p>
        Na nossa plataforma, oferecemos uma ampla gama de serviços projetados para atender às suas necessidades de compra e desenvolvimento.
        Seja você um desenvolvedor, empreendedor ou apenas alguém em busca de uma experiência de compra mais eficiente, temos algo para você.
      </p>
      <ul>
        <li><strong>Integração com APIs:</strong> Conecte-se facilmente com APIs externas e aprenda a consumir dados em tempo real para construir projetos robustos e dinâmicos.</li>
        <li><strong>Consultoria em Desenvolvimento Web:</strong> Receba dicas e truques sobre como melhorar seu fluxo de trabalho, otimizar sites e utilizar as melhores práticas de codificação.</li>
        <li><strong>Criação de Listas de Compras:</strong> Organize e personalize suas compras com nossas ferramentas intuitivas para criar e gerenciar listas de produtos.</li>
        <li><strong>Suporte ao Usuário:</strong> Nossa equipe está pronta para ajudar com dúvidas sobre a navegação da plataforma, recursos e funcionalidades.</li>
      </ul>
      <p>
        Estamos comprometidos em fornecer soluções inovadoras que tornam sua experiência ainda mais completa. Entre em contato conosco para saber mais ou explorar os serviços que oferecemos!
      </p>
    </div>
  );
}

export default Servicos;
