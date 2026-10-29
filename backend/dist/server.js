import app from './app.js'; // Importa o app já configurado com CORS e rotas
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`\n Servidor arquitetado rodando localmente em http://localhost:${PORT}`);
    console.log(`🔗 Link de teste: http://localhost:${PORT}/api/users/tts?texto=Estrutura%20separada%20com%20sucesso\n`);
});
