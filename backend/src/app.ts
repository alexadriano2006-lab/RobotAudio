import express from 'express';
import cors from 'cors';
import userRoutes from './modules/users/user.routes.js';
import { errorHandler } from './middlewares/error.middleware.js'; // Importação do novo arquivo

const app = express();

app.use(cors());
app.use(express.json());

// Suas rotas normais
app.use('/api/users', userRoutes);

// O middleware de erro DEVE ser sempre o último a ser declarado
app.use(errorHandler);

export default app;
