import express from 'express';
import * as googleTTS from 'google-tts-api';
import axios from 'axios';

const app = express();

// Rota para gerar e retornar o áudio diretamente
app.get('/api/tts', async (req, res) => {
    // Permite passar o texto dinamicamente pela Query String (ex: /api/tts?texto=Ola)
    // Se não passar nada, usa o valor padrão 'Olá, humanos!'
    const mensagem = (req.query.texto as string) || 'Olá, humanos!';

    try {
        console.log(`Gerando áudio para: "${mensagem}"`);

        // 1. Obtém a URL da API de tradução do Google
        const url = googleTTS.getAudioUrl(mensagem, {
            lang: 'pt-BR',
            slow: false,
        });

        // 2. Faz a requisição usando Axios para capturar o arraybuffer
        const resposta = await axios.get(url, { 
            responseType: 'arraybuffer',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        
        const buffer = Buffer.from(resposta.data);

        // 3. Define os cabeçalhos HTTP corretos para indicar que a resposta é um áudio MP3
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Content-Length', buffer.length);

        // Opcional: Descomente a linha abaixo se quiser que o navegador force o DOWNLOAD do arquivo em vez de reproduzir
        // res.setHeader('Content-Disposition', 'attachment; filename="audio.mp3"');

        // 4. Envia o buffer bruto diretamente para o cliente
        return res.send(buffer);

    } catch (erro: unknown) {
        console.error('Erro ao gerar o áudio neural:', erro);
        return res.status(500).json({ error: 'Falha ao gerar o áudio TTS' });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando localmente em http://localhost:3000');
    console.log('Teste no navegador: http://localhost:3000/api/tts?texto=Teste%20de%20audio');
});
