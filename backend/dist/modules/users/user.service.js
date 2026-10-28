import * as googleTTS from 'google-tts-api';
import axios from 'axios';
export class TtsService {
    async gerarAudioBuffer(mensagem) {
        // Obtém a URL da API do Google
        const url = googleTTS.getAudioUrl(mensagem, {
            lang: 'pt-BR',
            slow: false,
        });
        // Faz o download do binário
        const resposta = await axios.get(url, {
            responseType: 'arraybuffer',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        return Buffer.from(resposta.data);
    }
}
