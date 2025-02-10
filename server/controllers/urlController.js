const generateShortUrl = require('../utils/generateShortUrl');
const URL = require('../models/url');
const Access = require('../models/access');
const geoip = require('geoip-lite');

const shortenUrl = async (req, res) => {
    const { originalUrl } = req.body;
    const shortUrl = generateShortUrl();

    try {
        const urlData = {
            originalUrl,
            shortUrl
        };

        if (req.user) {
            urlData.userId = req.user.id;  // Associa ao usuário logado
        }

        const url = await URL.create(urlData);
        res.json({ shortUrl: url.shortUrl });
    } catch (err) {
        res.status(500).json({ message: 'Server error', err });
        console.error('Erro ao encurtar URL:', err);
    }
};

const deleteUrl = async (req, res) => {
    const { urlId } = req.params;

    try {
        // Verifica se a URL existe
        const url = await URL.findOne({ where: { id: urlId } });

        if (!url) {
            return res.status(404).json({ message: 'URL não encontrada.' });
        }

        // Exclui a URL
        await URL.destroy({ where: { id: urlId } });

        // Exclui todos os acessos associados à URL
        await Access.destroy({ where: { urlId } });

        res.json({ message: 'URL e acessos associados excluídos com sucesso.' });
    } catch (err) {
        console.error('Erro ao excluir URL:', err);
        res.status(500).json({ message: 'Erro ao excluir URL.', error: err.message });
    }
};

const getUrls = async (req, res) => {
    try {
        // O middleware já garante que req.user contém o usuário autenticado
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Usuário não autenticado' });
        }

        // Busca todas as URLs associadas ao userId
        const urls = await URL.findAll({
            where: {
                userId: req.user.id  // Filtra pela ID do usuário (do req.user)
            }
        });

        // Verifica se não encontrou URLs associadas ao usuário
        if (!urls || urls.length === 0) {
            return res.status(404).json({ message: 'Nenhuma URL encontrada para este usuário' });
        }

        // Retorna as URLs encontradas
        res.json(urls);
    } catch (err) {
        console.error('Erro ao buscar URLs:', err);
        res.status(500).json({ message: 'Erro ao buscar URLs.', error: err.message });
    }
};


const redirectUrl = async (req, res) => {
    const { shortUrl } = req.params;

    try {
        const url = await URL.findOne({ where: { shortUrl } });

        if (!url) {
            return res.status(404).json({ message: 'URL not found' });
        }

        // Captura o IP do usuário
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        // Obtém a localização a partir do IP
        const geo = geoip.lookup(ip);

        // Registra o acesso no banco de dados
        await Access.create({
            urlId: url.id,
            ip: ip,
            country: geo ? geo.country : null,
            region: geo ? geo.region : null,
            city: geo ? geo.city : null
        });

        res.redirect(url.originalUrl);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getAccessCount = async (req, res) => {
    const { urlId } = req.params;

    try {
        // Busca a URL pelo urlId
        const url = await URL.findOne({ where: { id: urlId } });

        if (!url) {
            return res.status(404).json({ message: 'URL não encontrada.' });
        }

        // Conta os acessos
        const accessCount = await Access.count({
            where: { urlId },
        });

        // Retorna o accessCount e o shortUrl
        res.json({ accessCount, shortUrl: url.shortUrl });
    } catch (err) {
        console.error('Erro ao contar acessos:', err);
        res.status(500).json({ message: 'Erro ao contar acessos.', error: err.message });
    }
};

const getAccessDetails = async (req, res) => {
    const { urlId } = req.params;

    try {
        // Busca a URL pelo urlId
        const url = await URL.findOne({ where: { id: urlId } });

        if (!url) {
            return res.status(404).json({ message: 'URL não encontrada.' });
        }

        // Busca os detalhes dos acessos
        const accessDetails = await Access.findAll({
            where: { urlId },
            order: [['accessedAt', 'DESC']],
        });

        // Retorna os accessDetails e o shortUrl
        res.json({ accessDetails, shortUrl: url.shortUrl });
    } catch (err) {
        console.error('Erro ao buscar detalhes de acessos:', err);
        res.status(500).json({ message: 'Erro ao buscar detalhes de acessos.', error: err.message });
    }
};

module.exports = { shortenUrl, getUrls, redirectUrl, getAccessCount, getAccessDetails, deleteUrl };