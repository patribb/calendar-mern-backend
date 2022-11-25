import express from 'express';
import cors from 'cors';
import { PORT } from './constants/constants.js';
import authRoutes from './routes/auth-routes.js';
import eventRoutes from './routes/events-routes.js'
import dbConnection from './db/config.js';

const app = express();
dbConnection();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public')); //directorio público

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

app.listen(PORT, () => console.log(`🚀 Servidor listo en el puerto ${PORT}`));