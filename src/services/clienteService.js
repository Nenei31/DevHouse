import axios from "axios";

const API_URL = 'http://localhost:8080/api/clientes';

class ClienteService{

    getAllClientes(){
        return axios.get(API_URL);
    }
    createCliente(cliente){
        return axios.post(API_URL,cliente);
    }
    getClienteByDni(clienteDni){
        return axios.get(`${API_URL}/dni/${clienteDni}`);
    }
    updateCliente(clienteId,cliente){
        return axios.put(`${API_URL}/${clienteId}`, cliente);
    }
    deleteCliente(clienteId){
        return axios.delete(`${API_URL}/${clienteId}`);
    }
}
export default new ClienteService();