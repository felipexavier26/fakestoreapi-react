import api from '../api/Api';

class ProdutoService {
  static async getAllProducts() {
    try {
      const response = await api.get('/');
      return response.data;
    } catch (error) {
      throw new Error('Erro ao carregar os produtos');
    }
  }

  static async deleteProduct(id) {
    try {
      await api.delete(`/${id}`);
    } catch (error) {
      throw new Error('Erro ao excluir o produto');
    }
  }
}

export default ProdutoService;
