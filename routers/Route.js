const clienteController = require("../controllers/ClienteController");
const tipoLocacaoController = require("../controllers/TipoLocacaoController");
const ReservaController = require("../controllers/ReservaController");
// importando express
const {Router} = require("express");
const router = Router();


// criando metodos da apis
router.post("/cadastroCliente", (req, res) => {
    const cadastroDados = req.body;
    const cadastroUsuario = clienteController.insert(cadastroDados);
    cadastroUsuario.then(cadastroCriado =>
    res.status(201).json(cadastroCriado)).catch(error =>
    res.status(400).json(error.message))
  
});


router.put('/editarDadosCliente',  clienteController.editarDados);

router.delete('/excluirDadosCliente/:id', clienteController.deletarCliente);

router.get('/listarClientes', clienteController.listarClientes);

router.get('/listarClientesId/:id', clienteController.listarClientePorId);

router.post("/cadastroTipoLocacao", (req, res) => {
    const TipoLocacaoCadastro = req.body;
    const cadastroTipoLocacao = tipoLocacaoController.insert(TipoLocacaoCadastro);
    cadastroTipoLocacao.then(TipoLocacaoCadastroCriado =>
    res.status(201).json(TipoLocacaoCadastroCriado)).catch(error =>
    res.status(400).json(error.message))
  
});

router.get('/locacoesDisponiveis', (req, res) => tipoLocacaoController.listarDisponiveis(req, res));


router.put('/editarDadosLocacao',  tipoLocacaoController.editarLocacao);

router.delete('/excluirDadosLocacao/:id', tipoLocacaoController.deletarLocacao);


router.post("/cadastroReserva", (req, res) => {
    const reservaCadastro = req.body;
    const cadastroReserva = ReservaController.insert(reservaCadastro);
    cadastroReserva.then(ReservaCadastroCriado =>
    res.status(201).json(ReservaCadastroCriado)).catch(error =>
    res.status(400).json(error.message))
  
});




module.exports = router;