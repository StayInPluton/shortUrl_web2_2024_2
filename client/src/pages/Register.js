import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [role, setRole] = useState('user'); // Valor padrão
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // TODO outro regex /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i

        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateEmail(username)) {
            setError('O nome de usuário deve ser um e-mail válido.');
            return;
        }

        if (password !== confirmPassword) {
            setError('As senhas não são iguais');
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/auth/register', { username, password, role });
            navigate('/login'); //tela de login 
        } catch (error) {
            setError('Erro ao registrar. Tente novamente.');
            console.error('Erro ao registrar:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="title">Registrar</h1>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label className="label">Usuário (E-mail)</label>
                    <div className="control">
                        <input
                            type="text"
                            className="input"
                            placeholder="Digite seu e-mail"
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
                    <label className="label">Confirme a Senha</label>
                    <div className="control">
                        <input
                            type="password"
                            className="input"
                            placeholder="Confirme sua senha"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Função (Role)</label>
                    <div className="control">
                        <div className="select is-fullwidth">
                            <select value={role} onChange={(e) => setRole(e.target.value)} required>
                                <option value="user">Usuário</option>
                                <option value="admin">Administrador</option>
                            </select>
                        </div>
                    </div>
                </div>

                {error && <p className="help is-danger">{error}</p>}

                <div className="field">
                    <div className="control">
                        <button type="submit" className="button is-primary is-fullwidth">Registrar</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Register;
