import googleTTS from 'google-tts-api';
export class TtsService {
    async gerarAudioBuffer(mensagem) {
        const url = await googleTTS(mensagem, 'pt-BR', 1);
        const resposta = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        if (!resposta.ok) {
            throw new Error(`Falha ao baixar áudio: HTTP ${resposta.status}`);
        }
        return Buffer.from(await resposta.arrayBuffer());
    }
}
