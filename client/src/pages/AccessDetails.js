import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AccessDetails = () => {
    const { urlId } = useParams();
    const navigate = useNavigate();
    const [accessCount, setAccessCount] = useState(0);
    const [accessDetails, setAccessDetails] = useState([]);
    const [shortUrl, setShortUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchAccessData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token de autenticação não encontrado.');
            }

            // TODO contar acessos e obter o shortUrl
            const accessCountResponse = await axios.get(
                `http://localhost:5000/api/url/${urlId}/access-count`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setAccessCount(accessCountResponse.data.accessCount);
            setShortUrl(accessCountResponse.data.shortUrl);

            // TODO detalhes dos acessos
            const accessDetailsResponse = await axios.get(
                `http://localhost:5000/api/url/${urlId}/access-details`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setAccessDetails(accessDetailsResponse.data.accessDetails);
        } catch (err) {
            console.error('Erro ao buscar dados de acesso:', err);
            setError(err.response?.data?.message || 'Erro ao carregar dados de acesso.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token de autenticação não encontrado.');
            }

            // TODO confirmação antes de excluir
            const confirmDelete = window.confirm('Tem certeza que deseja excluir esta URL?');
            if (!confirmDelete) return;

            await axios.delete(`http://localhost:5000/api/url/delete/${urlId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            navigate('/account');
        } catch (err) {
            console.error('Erro ao excluir URL:', err);
            setError(err.response?.data?.message || 'Erro ao excluir URL.');
        }
    };

    useEffect(() => {
        let intervalId;

        const startPolling = () => {
            fetchAccessData();
            intervalId = setInterval(fetchAccessData, 10000);
        };

        startPolling();
        return () => clearInterval(intervalId);
    }, [urlId]);

    if (loading) return <p>Carregando dados...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mt-5">
            <h1 className="title has-text-centered">Detalhes de Acesso para:
                <a
                    href={`http://localhost:5000/api/url/${shortUrl}`}
                    target="_blank">
                    {shortUrl}
                </a>
            </h1>

            {loading && <p className="has-text-centered">Carregando...</p>}

            {error && (
                <div className="notification is-danger">
                    <button className="delete" onClick={() => setError('')}></button>
                    {error}
                </div>
            )}

            {!loading && !error && (
                <div>
                    <div className="box">
                        <h2>
                            <strong>Total de acessos:</strong> {accessCount}
                        </h2>
                        <button className="button is-small is-danger" onClick={handleDelete}>
                            Excluir URL
                        </button>
                    </div>

                    <h2 className="subtitle">Detalhes dos acessos:</h2>
                    <table className="table is-fullwidth is-striped">
                        <thead>
                            <tr>
                                <th>IP</th>
                                <th>Localização</th>
                                <th>Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accessDetails.map((access, index) => (
                                <tr key={index}>
                                    <td>{access.ip}</td>
                                    <td>
                                        {access.city}, {access.region}, {access.country}
                                    </td>
                                    <td>{new Date(access.accessedAt).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AccessDetails;