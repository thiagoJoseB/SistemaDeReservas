const tipoLocacaoModel = require("../models/TipoLocacaoModel");
const express = require('express');
const app = express();
const router = express.Router();

app.use(express.json());


class TipoLocacaoController 
{
    insert(TipoLocacaoCadastro) {
        return new Promise(async (resolve, reject) => {
            try {
                const TipoLocacaoCadastroCriado = await tipoLocacaoModel.create(TipoLocacaoCadastro);
                resolve({ message: "Cadastro realizado com sucesso", data: TipoLocacaoCadastroCriado});
            } catch (error) {
                reject({ message: "Erro ao processar o cadastro", error });
            }
        });
    }


    editarLocacao(req, res) {
        const { id, nome, tipo, descricao, valor_hora, tempo_minimo, tempo_maximo, data_criacao } = req.body;
        console.log("Dados recebidos para atualização:", { id, nome, tipo, descricao, valor_hora, tempo_minimo, tempo_maximo, data_criacao });

        if (!id) {
            return res.status(400).json({ message: "ID da locação é obrigatório para atualizar os dados." });
        }

        tipoLocacaoModel.buscarId(id)
            .then((locacaoExistente) => {
                if (!locacaoExistente) {
                    throw new Error("Locação não encontrada");
                }

                const dadosAtualizados = {
                    nome: nome || locacaoExistente.nome,
                    tipo: tipo || locacaoExistente.tipo,
                    descricao: descricao || locacaoExistente.descricao,
                    valor_hora: valor_hora || locacaoExistente.valor_hora,
                    tempo_minimo: tempo_minimo || locacaoExistente.tempo_minimo,
                    tempo_maximo: tempo_maximo || locacaoExistente.tempo_maximo,
                    data_criacao: data_criacao || locacaoExistente.data_criacao
                };

                return tipoLocacaoModel.update(id, dadosAtualizados);
            })
            .then((resultado) => {
                res.status(200).json({ message: "Dados da locação atualizados com sucesso", data: resultado });
            })
            .catch((error) => {
                console.error("Erro ao editar dados da locação:", error);
                res.status(400).json({ message: error.message || "Erro ao atualizar dados da locação" });
            });
    }

    deletarLocacao(req, res) {
        const { id } = req.params;
    
        if (!id) {
            return res.status(400).json({ message: "ID da locação é obrigatório" });
        }
    
        tipoLocacaoModel.buscarId(id)
            .then((locaçãoExistente) => {
                if (!locaçãoExistente) {
                    throw new Error("Cliente não encontrado");
                }
    
                return tipoLocacaoModel.delete(id);
            })
            .then((resultado) => {
                res.status(200).json(resultado);
            })
            .catch((error) => {
                console.error("Erro ao excluir locação:", error);
                res.status(400).json({ message: error.message || "Erro ao excluir locação" });
            });
    }

    listarLocações(req, res) {
        tipoLocacaoModel.listarTodos()
                .then((clientes) => {
                    res.status(200).json({ message: "Locações listadas com sucesso", data: clientes });
                })
                .catch((error) => {
                    console.error("Erro ao listar Locações:", error);
                    res.status(500).json({ message: "Erro ao listar Locações", error });
                });
        }


    listarDisponiveis(req, res) {
        const { data } = req.query;
    
        if (!data) {
            return res.status(400).json({ message: "A data é obrigatória para verificar disponibilidade." });
        }
    
        tipoLocacaoModel.listarLocacoesDisponiveis(data)
            .then(locacoesDisponiveis => {
                res.status(200).json(locacoesDisponiveis);
            })
            .catch(error => {
                console.error("Erro ao buscar locações disponíveis:", error);
                res.status(500).json({ message: "Erro interno ao buscar locações disponíveis", error });
            });
    }
    


}

module.exports = new TipoLocacaoController();


