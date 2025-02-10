import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Limpa a mensagem de erro antes do login
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                username,
                password,
            });
            localStorage.setItem('token', response.data.token);
            navigate('/');
        } catch (error) {
            setError('Nome de usuário ou senha incorretos.');
            console.error('Erro ao fazer login:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="title has-text-centered">Login</h1>
            <form onSubmit={handleSubmit} className="box">
                {error && (
                    <div className="notification is-danger">
                        <button className="delete" onClick={() => setError('')}></button>
                        {error}
                    </div>
                )}

                <div className="field">
                    <label className="label">Usuário</label>
                    <div className="control">
                        <input
                            type="text"
                            className="input"
                            placeholder="Digite seu nome de usuário"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Senha</label>
                    <div className="control">
                        <input
                            type="password"
                            className="input"
                            placeholder="Digite sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    <div className="control">
                        <button type="submit" className="button is-primary is-fullwidth">
                            Entrar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
