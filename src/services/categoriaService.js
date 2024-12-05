import axios from "axios";

const API_URL = 'http://localhost:8080/api/categorias';

class CategoriaService{

    getAllCategorias(){
        return axios.get(API_URL);
    }
    createCategoria(categoria){
        return axios.post(API_URL,categoria);
    }
    getCategoriaById(id){
        return axios.get(`${API_URL}/id/${id}`);
    }
    actualizarCategoria(id,categoria){
        return axios.put(`${API_URL}/update/${id}`, categoria);
    }
    deleteCategoria(categoriaId){
        return axios.delete(`${API_URL}/${categoriaId}`);
    }
}
export default new CategoriaService();