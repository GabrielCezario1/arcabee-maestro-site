const express = require('express');
const router = express.Router();

const produtos = require('../mocks/produtos.json');

const CAMPOS_ORDENACAO = new Set(['id', 'nome', 'marca', 'linha', 'tipo', 'acabamento']);

router.post('/produtos/pesquisar', (req, res) => {
    const {
        Pg = 1,
        Qt = 12,
        TpOrd = 'ASC',
        CpOrd = 'nome',
        Marca = null,
        Linha = null,
        Tipo = null,
        Busca = null,
    } = req.body || {};

    let lista = Array.isArray(produtos) ? [...produtos] : [];

    if (Marca && typeof Marca === 'string') {
        lista = lista.filter(x => (x.marca || '').toLowerCase() === Marca.toLowerCase());
    }
    if (Linha && typeof Linha === 'string') {
        lista = lista.filter(x => (x.linha || '').toLowerCase() === Linha.toLowerCase());
    }
    if (Tipo && typeof Tipo === 'string') {
        lista = lista.filter(x => (x.tipo || '').toLowerCase() === Tipo.toLowerCase());
    }
    if (Busca && typeof Busca === 'string' && Busca.trim().length > 0) {
        const termo = Busca.trim().toLowerCase();
        lista = lista.filter(x => (x.nome || '').toLowerCase().includes(termo));
    }

    const campoOrdenacao = CAMPOS_ORDENACAO.has(String(CpOrd)) ? String(CpOrd) : 'nome';
    const multiplicador = String(TpOrd).toUpperCase() === 'DESC' ? -1 : 1;
    lista.sort((a, b) => {
        const va = (a?.[campoOrdenacao] ?? '').toString().toLowerCase();
        const vb = (b?.[campoOrdenacao] ?? '').toString().toLowerCase();
        if (va < vb) return -1 * multiplicador;
        if (va > vb) return 1 * multiplicador;
        return 0;
    });

    const total = lista.length;
    const page = Math.max(1, parseInt(Pg, 10) || 1);
    const qt = Math.max(1, parseInt(Qt, 10) || 12);
    const start = (page - 1) * qt;
    const registros = lista.slice(start, start + qt);

    console.log(`POST /produtos/pesquisar => filtros: { Marca:${Marca}, Linha:${Linha}, Tipo:${Tipo}, Busca:${Busca} } | ord: ${campoOrdenacao} ${multiplicador === -1 ? 'DESC' : 'ASC'} | Pg:${page} Qt:${qt} | Total:${total}`);

    return res.json({
        Total: total,
        Registros: registros,
    });
});

module.exports = router;