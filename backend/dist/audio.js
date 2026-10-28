import * as googleTTS from 'google-tts-api';
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import axios from 'axios';
async function gerarAudioNeural() {
    const mensagem = 'Olá, humanos!';
    const caminhoArquivo = resolve('mensagem.mp3');
    try {
        console.log('Gerando áudio com voz humana...');
        // 1. Deixamos a biblioteca usar o host padrão dela (https://translate.google.com)
        const url = googleTTS.getAudioUrl(mensagem, {
            lang: 'pt-BR',
            slow: false,
        });
        // 2. Adicionamos um User-Agent real na requisição para simular um navegador
        const resposta = await axios.get(url, {
            responseType: 'arraybuffer',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        const buffer = Buffer.from(resposta.data);
        // 3. Salva o arquivo no disco
        await writeFile(caminhoArquivo, buffer);
        console.log('Áudio natural gerado com sucesso!');
        console.log(`Arquivo salvo em: ${caminhoArquivo}`);
    }
    catch (erro) {
        console.error('Erro ao gerar o áudio:', erro);
    }
}
gerarAudioNeural();
