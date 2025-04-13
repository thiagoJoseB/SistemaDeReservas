const clienteModel = require("../models/ClienteModel");
const express = require('express');
const app = express();
const router = express.Router();

app.use(express.json());


class ClienteController {

    insert(cadastroDados) {
        return new Promise(async (resolve, reject) => {
            try {
                const emailExistente = await clienteModel.emailExiste(cadastroDados.email);
                if (emailExistente) {
                    return reject({ message: "E-mail já cadastrado" });
                }
    
                const telefoneExistente = await clienteModel.telefoneExiste(cadastroDados.telefone);
                if (telefoneExistente) {
                    return reject({ message: "Telefone já cadastrado" });
                }
    
                const cpfExistente = await clienteModel.cpfExiste(cadastroDados.cpf);
                if (cpfExistente) {
                    return reject({ message: "CPF já cadastrado" });
                }
                const cadastroCriado = await clienteModel.create(cadastroDados);
                resolve({ message: "Cadastro realizado com sucesso", data: cadastroCriado });
    
            } catch (error) {
                reject({ message: "Erro ao processar o cadastro", error });
            }
        });
    }

    editarDados(req, res) {
        const { id, nome, email, telefone, cpf, data_criacao } = req.body;
        console.log("Dados recebidos para atualização:", { id, nome, email, telefone, cpf, data_criacao });
    
        if (!id) {
            return res.status(400).json({ message: "ID do cliente é obrigatório para atualizar os dados." });
        }
    
        clienteModel.buscarId(id)
            .then((clienteExistente) => {
                if (!clienteExistente) {
                    throw new Error("Cliente não encontrado");
                }
    
                const dadosAtualizados = {
                    nome: nome || clienteExistente.nome,
                    email: email || clienteExistente.email,
                    telefone: telefone || clienteExistente.telefone,
                    cpf: cpf || clienteExistente.cpf,
                    data_criacao: data_criacao || clienteExistente.data_criacao
                };
    
                return clienteModel.update(id, dadosAtualizados);
            })
            .then((resultado) => {
                res.status(200).json({ message: "Dados atualizados com sucesso", data: resultado });
            })
            .catch((error) => {
                console.error("Erro ao editar dados:", error);
                res.status(400).json({ message: error.message || "Erro ao atualizar dados" });
            });
    }


    deletarCliente(req, res) {
        const { id } = req.params;
    
        if (!id) {
            return res.status(400).json({ message: "ID do cliente é obrigatório" });
        }
    
        clienteModel.buscarId(id)
            .then((clienteExistente) => {
                if (!clienteExistente) {
                    throw new Error("Cliente não encontrado");
                }
    
                return clienteModel.delete(id);
            })
            .then((resultado) => {
                res.status(200).json(resultado);
            })
            .catch((error) => {
                console.error("Erro ao excluir cliente:", error);
                res.status(400).json({ message: error.message || "Erro ao excluir cliente" });
            });
    }
    
    listarClientePorId(req, res) {
        const { id } = req.params;
    
        clienteModel.buscarId(id)
            .then((cliente) => {
                if (!cliente) {
                    return res.status(404).json({ message: "Cliente não encontrado" });
                }
                res.status(200).json({ message: "Cliente encontrado", data: cliente });
            })
            .catch((error) => {
                console.error("Erro ao buscar cliente por ID:", error);
                res.status(500).json({ message: "Erro ao buscar cliente por ID", error });
            });
    }

    listarClientes(req, res) {
        clienteModel.listarTodos()
            .then((clientes) => {
                res.status(200).json({ message: "Clientes listados com sucesso", data: clientes });
            })
            .catch((error) => {
                console.error("Erro ao listar clientes:", error);
                res.status(500).json({ message: "Erro ao listar clientes", error });
            });
    }
    
     
}

module.exports = new ClienteController();