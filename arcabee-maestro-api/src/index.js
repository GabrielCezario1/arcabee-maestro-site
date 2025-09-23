const express = require('express');
const cors = require('cors');
const path = require('path');

const authRouter = require('./routes/auth');
const contactRouter = require('./routes/contact');
const insightsRouter = require('./routes/insights');
const depoimentosRouter = require('./routes/depoimentos');
const catalogoSliderRouter = require('./routes/catalogo-slider');
const produtosRouter = require('./routes/produtos');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'public'), { maxAge: '1d' }));

app.use('/', authRouter);
app.use('/', contactRouter);
app.use('/', insightsRouter);
app.use('/', depoimentosRouter);
app.use('/', catalogoSliderRouter);
app.use('/', produtosRouter);

app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`);
});