const express = require('express');
const router = express.Router();

const fotoPerfil = require('../mocks/foto-perfil.json');

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

router.post('/cadastro', (req, res) => {
    logarPropriedades('Cadastro recebido', req.body);
    return res.json(true);
});

router.post('/login', (req, res) => {
    logarPropriedades('Login recebido', req.body);

    const { Usuario, Senha } = req.body;

    if (Usuario === 'admin' && Senha === 'arcabee2025') {
        const base = `${req.protocol}://${req.get('host')}/static/`;
        const foto = Array.isArray(fotoPerfil) && fotoPerfil.length > 0
            ? `${base}${fotoPerfil[0]}`
            : null;

        const usuario = {
            login: 'admin',
            nome: 'Admin',
            sobrenome: 'Arcabee',
            email: 'admin@arcabee.com',
            plano: {
                id: 1,
                nome: 'Silver',
                vencimento: new Date('2025-12-31T00:00:00-03:00'),
            }
        };
        return res.json(usuario);
    }

    return res.status(401).json({ mensagem: 'Login ou senha incorretos' });
});

router.post('/redefinir-senha', (req, res) => {
    logarPropriedades('Redefinir Senha recebido', req.body);
    return res.json(true);
});

router.post('/nova-senha', (req, res) => {
    logarPropriedades('Nova Senha recebida', req.body);
    return res.json(true);
});

module.exports = router;