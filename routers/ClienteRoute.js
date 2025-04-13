const clienteController = require("../controllers/ClienteController");
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


module.exports = router;