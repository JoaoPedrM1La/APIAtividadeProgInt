import { Router } from "express";
import { teste, criarDB, criarTBL, mostrarDados, enviarDados } from '../controller/controller.js';

const route = Router();

route.get('/', teste);
route.get('/setup/db', criarDB);
route.get('/setup/tbl', criarTBL);
route.get('/mostrar', mostrarDados);
route.post('/enviar', enviarDados);

export default route;