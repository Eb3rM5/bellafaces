import React, { Component } from 'react';

import { Container, Form, TextField, IconButton, Title, EmptyContainer } from './styles';

import { MdAccountCircle, MdLock } from 'react-icons/md';

import AuthController from '../../controllers/AuthController';

export default class Login extends Component {

    state = {
        login:'',
        password: '',
    }

    handleSubmit = async e => {
        const { login, password } = this.state;
        const token = await AuthController.Authenticate(login, password);

        console.log(token);
    }

    onLoginChange = e => {
        this.setState({
            login: e.target.value
        })
    }

    onPasswordChange = e => {
        this.setState({
            password: e.target.value
        })
    }

    render(){
        return (
            <EmptyContainer>
                <Container>
                    <Form onSubmit={this.handleSubmit}>
                        <Title>ACESSAR SISTEMA</Title>
                        <TextField>
                            <IconButton>
                                <MdAccountCircle size={28} />
                            </IconButton>

                            <input type='text' onChange={this.onLoginChange} placeholder="Insira seu login"></input>
                        </TextField>
                        <TextField>
                            <IconButton>
                                <MdLock size={28} />
                            </IconButton>

                            <input type='password' onChange={this.onPasswordChange} placeholder="Insira sua senha"></input>
                        </TextField>

                        <button type='submit'>FAZER LOGIN</button>
                    </Form>

                </Container>
            </EmptyContainer>

        );
    }

}
