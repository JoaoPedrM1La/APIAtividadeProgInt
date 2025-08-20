import express from 'express';
import cors from 'cors';
import dataRoutes from './router/routes.js'

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use('/', dataRoutes);

app.listen(PORT, () => {
    console.log(`Conectado na porta ${PORT}`);
});