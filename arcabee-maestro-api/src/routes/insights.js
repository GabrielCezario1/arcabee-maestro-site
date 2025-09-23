const express = require('express');
const router = express.Router();

function logarPropriedades(titulo, objeto) {
    console.log('============================');
    console.log(titulo);
    if (!objeto || typeof objeto !== 'object') {
        console.log(objeto);
        console.log('============================');
        return;
    }
    const entradas = Object.entries(objeto);
    if (entradas.length === 0) {
        console.log('(corpo vazio)');
    } else {
        for (const [chave, valor] of entradas) {
            console.log(`${chave}:`, valor);
        }
    }
    console.log('============================');
}

router.post('/insights/assinar', (req, res) => {
    logarPropriedades('Insights - assinatura recebida', req.body);
    return res.json(true);
});

module.exports = router;