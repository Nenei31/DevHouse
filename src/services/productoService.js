import axios from "axios";

const API_URL = 'http://localhost:8080/api/productos';

class ProductoService{

    getAllProductos(){
        return axios.get(API_URL);
    }
    guardarProducto(producto){
        return axios.post(API_URL,producto, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
    });
    }
    getProductoById(productoId){
        return axios.get(`${API_URL}/id/${productoId}`);
    }

    buscarProductos(nombre) {
        return axios.get(`${API_URL}/buscar/${nombre}`);
    }
    filtrarProductosPorPrecio(minPrecio, maxPrecio) {
        return axios.get(`${API_URL}/precio?min=${minPrecio}&max=${maxPrecio}`);
    }

    ordenarProductos(criterio) {
        return axios.get(`${API_URL}/ordenar/${criterio}`);
    }

    getProductosByCategoria(nombreCategoria){
        return axios.get(`${API_URL}/categoria/${nombreCategoria}`)
    }

    actualizarProducto(id,formData){
        return axios.put(`${API_URL}/update/${id}`, formData)
    }
    deleteProducto(ProductoId){
        return axios.delete(`${API_URL}/${ProductoId}`);
    }
}
export default new ProductoService();