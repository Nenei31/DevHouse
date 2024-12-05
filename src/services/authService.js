import axios from "axios";

const API_URL = 'http://localhost:8080/auth';

class AuthService {
    login(credentials) {
        return axios.post(`${API_URL}/login`, credentials);
    }
    
    registro(RegisterRequest) {
        return axios.post(`${API_URL}/register`, RegisterRequest);
    }
}

export default new AuthService();