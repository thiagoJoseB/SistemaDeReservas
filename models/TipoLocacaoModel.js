const conexao = require("../database/conexao");

class TipoLocacaoModel{

    async buscarId(id) {
        const sql = "SELECT * FROM Locacao WHERE id = ?";
        return new Promise((resolve, reject) => {
          conexao.query(sql, [id], (error, resultados) => {
            if (error) {
              reject({ message: "Erro ao buscar locacao pelo ID", error });
            } else if (resultados.length === 0) {
              resolve(null);
            } else {
              resolve(resultados[0]);
            }
          });
        });
      }

      async listarTodos() {
        const sql = "SELECT * FROM Locacao";
        return new Promise((resolve, reject) => {
            conexao.query(sql, (error, resultados) => {
                if (error) {
                    reject({ message: "Erro ao listar as Locações", error: error });
                } else {
                    resolve(resultados);
                }
            });
        });
    }
    
    async create(TipoLocacaoCadastro) {
       
        const sql = "INSERT INTO Locacao (id, nome, tipo, descricao, valor_hora, tempo_minimo,tempo_maximo,data_criacao) VALUES (null, ?, ?, ?, ?, ?,?,?)";
    
        return new Promise((resolve, reject) => {
            conexao.query(
                sql,
                [TipoLocacaoCadastro.nome, TipoLocacaoCadastro.tipo, 
                TipoLocacaoCadastro.descricao, TipoLocacaoCadastro.valor_hora,
                TipoLocacaoCadastro.tempo_minimo,TipoLocacaoCadastro.tempo_maximo,
                TipoLocacaoCadastro.data_criacao],
                (error, resposta) => {
                    if (error) {
                        console.log("Erro ao criar o cadastro", error);
                        reject({ message: "Erro ao criar o cadastro", error: error });
                    } else {
                        console.log("Cadastro realizado com sucesso");
                        resolve({ message: "Cadastro realizado com sucesso", insertId: resposta.insertId });
                    }
                }
            );
        });
    }


    async update(id, dadosAtualizados) {
        const sql = "UPDATE Locacao SET nome = ?, tipo = ?, descricao = ?, valor_hora = ?, tempo_minimo = ?, tempo_maximo = ?, data_criacao = ? WHERE id = ?";
        return new Promise((resolve, reject) => {
            conexao.query(
                sql, 
                [
                    dadosAtualizados.nome, 
                    dadosAtualizados.tipo, 
                    dadosAtualizados.descricao, 
                    dadosAtualizados.valor_hora,
                    dadosAtualizados.tempo_minimo, 
                    dadosAtualizados.tempo_maximo, 
                    dadosAtualizados.data_criacao, 
                    id
                ], 
                (error, resposta) => {
                    if (error) {
                        reject({ message: "Erro ao atualizar dados", error: error });
                    } else {
                        resolve({ message: "Dados atualizados com sucesso" });
                    }
                }
            );
        });
    }


    async delete(id) {
        const sql = "DELETE FROM Locacao WHERE id = ?";
        return new Promise((resolve, reject) => {
            conexao.query(sql, [id], (error, resultado) => {
                if (error) {
                    reject({ message: "Erro ao excluir Locacao", error: error });
                } else {
                    if (resultado.affectedRows === 0) {
                        resolve({ message: "Nenhuma Locacao encontrado com esse ID" });
                    } else {
                        resolve({ message: "Locacao excluída com sucesso" });
                    }
                }
            });
        });
    }


    async listarLocacoesDisponiveis(data) {
        const sql = `
        SELECT l.*
            FROM Locacao l
            WHERE NOT EXISTS (
                SELECT 1
                FROM Reserva r
                WHERE r.locacao_id = l.id
                AND DATE(?) BETWEEN DATE(r.data_inicio) AND DATE(r.data_fim)
            );
    `;
    
        return new Promise((resolve, reject) => {
            conexao.query(sql, [data], (error, resultados) => {
                if (error) {
                    reject({ message: "Erro ao buscar locações disponíveis", error });
                } else {
                    resolve(resultados);
                }
            });
        });
    }
    
    
    
}
module.exports = new TipoLocacaoModel();
