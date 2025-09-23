const express = require('express');
const router = express.Router();

const depoimentos = require('../mocks/depoimentos.json');

router.get('/depoimentos', (req, res) => {
    console.log('GET /depoimentos - enviando', Array.isArray(depoimentos) ? `${depoimentos.length} itens` : '0 itens');
    return res.json(depoimentos);
});

module.exports = router;