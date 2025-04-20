const reservaModel = require("../models/ReservaModel");
const express = require('express');
const app = express();
const router = express.Router();
app.use(express.json());

class ReservaController

{
    insert(reservaCadastro) {
        return new Promise(async (resolve, reject) => {
            try {
                const reservaCriada = await reservaModel.create(reservaCadastro);
                resolve({ message: "Reserva cadastrada com sucesso", data: reservaCriada });
            } catch (error) {
                reject({ message: "Erro ao processar o cadastro da reserva", error });
            }
        });
    }

        listarReservas(req, res) {
            reservaModel.listarReservas()
                .then((clientes) => {
                    res.status(200).json({ message: "Reservas listadas com sucesso", data: clientes });
                })
                .catch((error) => {
                    console.error("Erro ao listar Reservas:", error);
                    res.status(500).json({ message: "Erro ao listar Reservas", error });
                });
        }


        editarReserva(req, res) {
            const { id, cliente_id, locacao_id, data_inicio, data_fim, valor_final, situacao, data_criacao } = req.body;
        
            console.log("Dados recebidos para atualização da reserva:", {
                id, cliente_id, locacao_id, data_inicio, data_fim, valor_final, situacao, data_criacao
            });
        
            if (!id) {
                return res.status(400).json({ message: "ID da reserva é obrigatório para atualizar os dados." });
            }
        
            reservaModel.buscarId(id)
                .then((reservaExistente) => {
                    if (!reservaExistente) {
                        throw new Error("Reserva não encontrada");
                    }
        
                    const dadosAtualizados = {
                        cliente_id: cliente_id || reservaExistente.cliente_id,
                        locacao_id: locacao_id || reservaExistente.locacao_id,
                        data_inicio: data_inicio || reservaExistente.data_inicio,
                        data_fim: data_fim || reservaExistente.data_fim,
                        valor_final: valor_final || reservaExistente.valor_final,
                        situacao: situacao || reservaExistente.situacao,
                        data_criacao: data_criacao || reservaExistente.data_criacao
                    };
        
                    return reservaModel.update(id, dadosAtualizados);
                })
                .then((resultado) => {
                    res.status(200).json({ message: "Reserva atualizada com sucesso", data: resultado });
                })
                .catch((error) => {
                    console.error("Erro ao editar reserva:", error);
                    res.status(400).json({ message: error.message || "Erro ao atualizar reserva" });
                });
        }
        
    
        deletarReserva(req, res) {
            const { id } = req.params;
    
            if (!id) {
                return res.status(400).json({ message: "ID da reserva é obrigatório" });
            }
    
            reservaModel.listarReservas()
                .then((reservas) => {
                    const reservaExistente = reservas.find(reserva => reserva.id === parseInt(id));
                    if (!reservaExistente) {
                        throw new Error("Reserva não encontrada");
                    }
    
                    return reservaModel.delete(id);
                })
                .then((resultado) => {
                    res.status(200).json(resultado);
                })
                .catch((error) => {
                    console.error("Erro ao excluir reserva:", error);
                    res.status(400).json({ message: error.message || "Erro ao excluir reserva" });
                });
        }
    
}


module.exports = new ReservaController();
