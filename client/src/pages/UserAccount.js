import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserAccount = () => {
    const [urls, setUrls] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUrls = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/url/urls', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUrls(response.data);
            } catch (error) {
                console.error('Erro ao buscar URLs:', error);
            }
        };

        fetchUrls();
    }, []);

    const paginaDeAcessos = (urlId) => {
        navigate(`/access/${urlId}`);
    };


    return (
        <div className="container">
            <h1 className="title is-3 has-text-centered">Minha Conta</h1>

            {/* Grid de cartões */}
            <div className="columns is-multiline">
                {urls.map((url) => (
                    <div key={url.id} className="column is-one-third">
                        <div className="card">
                            <div className="card-content">
                                {/* URL Original */}
                                <div className="content">
                                    <p className="title is-5">URL Original</p>
                                    <p
                                        className="is-clipped"
                                        style={{
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap", // Impede que o texto quebre em várias linhas
                                            maxWidth: "100%", // Limita o tamanho do texto ao tamanho do card
                                        }}
                                    >
                                        {url.originalUrl}
                                    </p>
                                </div>

                                {/* URL Encurtada */}
                                <div className="content">
                                    <p className="title is-5">URL Encurtada</p>
                                    <a
                                        className="has-text-link is-clipped"
                                        href={`http://localhost:5000/api/url/${url.shortUrl}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: "block",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                            maxWidth: "100%", 
                                        }}
                                    >
                                        {`http://localhost:5000/api/url/${url.shortUrl}`}
                                    </a>
                                </div>

                                {/* Acessos */}
                                <div className="content">
                                    <p className="title is-5">Acessos</p>
                                    <button
                                        className="button is-link is-fullwidth"
                                        onClick={() => paginaDeAcessos(url.id)}
                                    >
                                        {url.clicks} acessos
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserAccount;