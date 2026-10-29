import { TtsService } from './user.service.js'; // Atenção ao .js no final se o TS exigir por conta do ES Modules
const MENSAGEM_PADRAO = 'Olá, humanos!';
const ttsService = new TtsService();
export async function gerarAudio(req, res) {
    const mensagem = req.query.texto || MENSAGEM_PADRAO;
    try {
        console.log(`[TTS] Processando áudio para: "${mensagem}"`);
        // Chama a regra de negócio
        const buffer = await ttsService.gerarAudioBuffer(mensagem);
        // Define os cabeçalhos de áudio no Express
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Content-Length', buffer.length);
        return res.send(buffer);
    }
    catch (erro) {
        console.error('[TTS Controller Error]:', erro);
        return res.status(500).json({ error: 'Falha ao processar áudio neural' });
    }
}
