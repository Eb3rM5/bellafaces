import api from '../services/api';

class AuthController {

    constructor(){
        this.IsAuthenticated = this.IsAuthenticated.bind(this);
        this.Authenticate = this.Authenticate.bind(this);
    }

    async Authenticate(login, password){
        let response = await api.post('/sessions', {
            login,
            password
        });

        if (response && response.status === 200){
            let { token } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('id', response.data.user.id);
        }

        return this.IsAuthenticated();
    }

    GetId(){
        return localStorage.getItem('id');
    }

    GetToken(){
        return localStorage.getItem('token');
    }

    IsAuthenticated(){
        const token = this.GetToken();
        return token && token !== '';
    }

}

const controller = new AuthController();

export default controller;

export const { IsAuthenticated } = controller;
