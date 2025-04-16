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

}

module.exports = new ReservaModel();