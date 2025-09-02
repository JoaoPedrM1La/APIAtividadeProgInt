import { Router } from "express";
import { teste, criarDB, criarTBL, mostrarDados, enviarDados, deletarDados, atualizarDados, mostrarDadosEspec } from '../controller/controller.js';

const route = Router();

route.get('/', teste);
route.get('/setup/db', criarDB);
route.get('/setup/tbl', criarTBL);
route.get('/mostrar', mostrarDados);
route.get('/mostrar/:id', mostrarDadosEspec);
route.post('/enviar', enviarDados);
route.put('/alterar/:id', atualizarDados);
route.delete('/deletar/:id', deletarDados);

export default route;