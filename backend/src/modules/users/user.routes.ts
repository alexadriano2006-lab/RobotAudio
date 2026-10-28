import { Router } from 'express';
import { gerarAudio } from './user.controller.js';

const router = Router();

// Define a rota de GET vinculada à função do controller
router.get('/tts', gerarAudio);

export { router as ttsRoutes };
