const { nanoid } = require('nanoid');

//TODO: fazer a função de gerar a url curta
const generateShortUrl = () => {
    return nanoid(8);
};

module.exports = generateShortUrl;