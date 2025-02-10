const express = require('express');
const { shortenUrl, getUrls, redirectUrl, getAccessCount, getAccessDetails, deleteUrl } = require('../controllers/urlController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/shorten', authMiddleware, shortenUrl);
router.get('/urls', authMiddleware, getUrls);
router.get('/:shortUrl', redirectUrl);
router.delete('/delete/:urlId', authMiddleware, deleteUrl);
router.get('/:urlId/access-count', authMiddleware, getAccessCount);
router.get('/:urlId/access-details', authMiddleware, getAccessDetails);

module.exports = router;