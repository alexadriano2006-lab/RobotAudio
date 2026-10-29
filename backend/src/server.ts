import express from 'express';
import { ttsRoutes } from './modules/users/user.routes.js';

const app = express();
const PORT = 3000;

// Middleware padrão para JSON caso precise no futuro
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    if (req.method === 'OPTIONS') {
        res.sendStatus(204);
        return;
    }

    next();
});

// Injeta as rotas prefixadas com /api (ficando http://localhost:3000/api/tts)
app.use('/api', ttsRoutes);

app.listen(PORT, () => {
    console.log(`\n🚀 Servidor arquitetado rodando localmente em http://localhost:${PORT}`);
    console.log(`🎧 Link de teste: http://localhost:${PORT}/api/tts?texto=Estrutura%20separada%20com%20sucesso\n`);
});
