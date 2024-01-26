const { Router } = require('express');
const { cadastroCorrentista, criarConta, saque, deposito, listarConta } = require('../controllers/contaBancaria');

const routes = Router();

routes.post('/correntistas', cadastroCorrentista);

routes.post('/correntista/criarConta', criarConta);

routes.post('/conta/saque', saque);

routes.post('/conta/deposito', deposito);

routes.get('/conta/:cpf', listarConta);

module.exports = routes
