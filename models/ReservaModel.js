const conexao = require("../database/conexao");

class ReservaModel
{
    async create(reservaCadastro) {
        const sql = `
            INSERT INTO Reserva (
            id,
            cliente_id, 
            locacao_id, 
            data_inicio, 
            data_fim, 
            valor_final,
             situacao, 
             data_criacao)
            VALUES (null,?, ?, ?, ?, ?, ?,?)
        `;

        return new Promise((resolve, reject) => {
            conexao.query(
                sql,
                [
                    reservaCadastro.cliente_id,
                    reservaCadastro.locacao_id,
                    reservaCadastro.data_inicio,
                    reservaCadastro.data_fim,
                    reservaCadastro.valor_final,
                    reservaCadastro.situacao,
                    reservaCadastro.data_criacao
                ],
                (error, resultado) => {
                    if (error) {
                        console.error("Erro ao cadastrar reserva:", error);
                        reject({ message: "Erro ao cadastrar reserva", error });
                    } else {
                        resolve({
                            message: "Reserva cadastrada com sucesso",
                            reserva_id: resultado.insertId
                        });
                    }
                }
            );
        });
    }

    async buscarId(id) {
        const sql = "SELECT * FROM Reserva WHERE id = ?";
        return new Promise((resolve, reject) => {
          conexao.query(sql, [id], (error, resultados) => {
            if (error) {
              reject({ message: "Erro ao buscar Reserva pelo ID", error });
            } else if (resultados.length === 0) {
              resolve(null);
            } else {
              resolve(resultados[0]);
            }
          });
        });
      }
      

    async listarReservas() {
        const sql = "SELECT * FROM Reserva";
        return new Promise((resolve, reject) => {
            conexao.query(sql, (error, resultados) => {
                if (error) {
                    reject({ message: "Erro ao listar as Reservas", error: error });
                } else {
                    resolve(resultados);
                }
            });
        });
    }


    async update(id, dadosAtualizados) {
        const sql = `
            UPDATE Reserva SET 
                cliente_id = ?, 
                locacao_id = ?, 
                data_inicio = ?, 
                data_fim = ?, 
                valor_final = ?, 
                situacao = ?, 
                data_criacao = ?
            WHERE id = ?
        `;

        return new Promise((resolve, reject) => {
            conexao.query(
                sql,
                [
                    dadosAtualizados.cliente_id,
                    dadosAtualizados.locacao_id,
                    dadosAtualizados.data_inicio,
                    dadosAtualizados.data_fim,
                    dadosAtualizados.valor_final,
                    dadosAtualizados.situacao,
                    dadosAtualizados.data_criacao,
                    id
                ],
                (error, resposta) => {
                    if (error) {
                        reject({ message: "Erro ao atualizar reserva", error });
                    } else {
                        resolve({ message: "Reserva atualizada com sucesso" });
                    }
                }
            );
        });
    }

    async delete(id) {
        const sql = "DELETE FROM Reserva WHERE id = ?";
        return new Promise((resolve, reject) => {
            conexao.query(sql, [id], (error, resultado) => {
                if (error) {
                    reject({ message: "Erro ao excluir reserva", error });
                } else {
                    if (resultado.affectedRows === 0) {
                        resolve({ message: "Nenhuma reserva encontrada com esse ID" });
                    } else {
                        resolve({ message: "Reserva excluída com sucesso" });
                    }
                }
            });
        });
    }
    

}

module.exports = new ReservaModel();