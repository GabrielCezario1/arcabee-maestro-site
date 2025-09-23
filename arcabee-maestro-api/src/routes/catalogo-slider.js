const express = require('express');
const router = express.Router();

const preview = require('../mocks/catalogo-preview.json');
const oficial = require('../mocks/catalogo-oficial.json');

router.get('/catalogo-slider/preview', (req, res) => {
    const base = `${req.protocol}://${req.get('host')}/static/`;
    const itens = (Array.isArray(preview) ? preview : []).map((p, i) => ({
        url: `${base}${p}`,
        alt: `Produto ${i + 1}`
    }));
    console.log(`GET /catalogo-slider/preview - enviando ${itens.length} imagens`);
    return res.json(itens);
});

router.get('/catalogo-slider/oficial', (req, res) => {
    const base = `${req.protocol}://${req.get('host')}/static/`;
    const itens = (Array.isArray(oficial) ? oficial : []).map((p, i) => ({
        url: `${base}${p}`,
        alt: `Produto ${i + 1}`
    }));
    console.log(`GET /catalogo-slider/oficial - enviando ${itens.length} imagens`);
    return res.json(itens);
});

module.exports = router;