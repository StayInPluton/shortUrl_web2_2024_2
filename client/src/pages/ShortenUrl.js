import React, { useState } from 'react';
import axios from 'axios';

const UrlShortener = () => {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setLoading(true); 
        setError('');
        setShortUrl(''); 

        try {
            const token = localStorage.getItem('token');
            const headers = token ? { Authorization: `Bearer ${token}` } : {}; // Define os headers

            // Requisição post
            const response = await axios.post(
                'http://localhost:5000/api/url/shorten',
                { originalUrl },
                { headers }
            );

            // URL encurtada
            setShortUrl(`http://localhost:5000/api/url/${response.data.shortUrl}`);
        } catch (error) {
            setError('Erro ao encurtar a URL. Tente novamente.');
            console.error('Erro ao encurtar URL:', error);
        } finally {
            setLoading(false); // Finaliza o carregamento
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="title has-text-centered">Encurtar URL</h1>
            <form onSubmit={handleSubmit} className="box">
                <div className="field">
                    <label className="label">URL Original</label>
                    <div className="control">
                        <input
                            type="url"
                            className="input"
                            placeholder="Cole sua URL aqui"
                            value={originalUrl}
                            onChange={(e) => setOriginalUrl(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    <div className="control">
                        <button
                            type="submit"
                            className={`button is-primary is-fullwidth ${loading ? 'is-loading' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Encurtando...' : 'Encurtar'}
                        </button>
                    </div>
                </div>
            </form>

            {shortUrl && (
                <div className="notification is-success">
                    <p>
                        URL encurtada: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
                    </p>
                </div>
            )}

            {error && (
                <div className="notification is-danger">
                    <button className="delete" onClick={() => setError('')}></button>
                    {error}
                </div>
            )}
        </div>
    );
};

export default UrlShortener;