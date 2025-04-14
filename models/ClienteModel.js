const conexao = require("../database/conexao");
const clienteRoute = require("../routers/Route");

class ClienteModel{

    async emailExiste(email) {
        const sql = "SELECT email FROM Cliente WHERE email = ?";
        return new Promise((resolve, reject) => {
            conexao.query(sql, [email], (error, resposta) => {
                if (error) {
                    reject({ message: "Erro ao verificar o e-mail", error: error });
                } else {
                    resolve(resposta.length > 0);
                }
            });
        });
    }


async telefoneExiste(telefone) {
    const sql = "SELECT * FROM Cliente WHERE telefone = ?";
    return new Promise((resolve, reject) => {
        conexao.query(sql, [telefone], (error, results) => {
            if (error) return reject(error);
            resolve(results.length > 0);
        });
    });
}

async cpfExiste(cpf) {
    const sql = "SELECT * FROM Cliente WHERE cpf = ?";
    return new Promise((resolve, reject) => {
        conexao.query(sql, [cpf], (error, results) => {
            if (error) return reject(error);
            resolve(results.length > 0);
        });
    });
}


async buscarId(id) {
    const sql = "SELECT * FROM Cliente WHERE id = ?";
    return new Promise((resolve, reject) => {
      conexao.query(sql, [id], (error, resultados) => {
        if (error) {
          reject({ message: "Erro ao buscar cliente pelo ID", error });
        } else if (resultados.length === 0) {
          resolve(null);
        } else {
          resolve(resultados[0]);
        }
      });
    });
  }
  

async listarTodos() {
    const sql = "SELECT * FROM Cliente";
    return new Promise((resolve, reject) => {
        conexao.query(sql, (error, resultados) => {
            if (error) {
                reject({ message: "Erro ao listar os clientes", error: error });
            } else {
                resolve(resultados);
            }
        });
    });
}


async update(id, dadosAtualizados) {
    const sql = "UPDATE Cliente SET nome = ?, email = ?, telefone = ?, cpf = ?, data_criacao = ? WHERE id = ?";
    return new Promise((resolve, reject) => {
      conexao.query(sql, [dadosAtualizados.nome, dadosAtualizados.email, dadosAtualizados.telefone, dadosAtualizados.cpf,dadosAtualizados.data_criacao, id], (error, resposta) => {
        if (error) {
          reject({ message: "Erro ao atualizar dados", error: error });
        } else {
          resolve({ message: "Dados atualizado com sucesso" });
        }
      });
    });
  }
  
  
  async create(cadastroDados) {
    const emailExistente = await this.emailExiste(cadastroDados.email);
    if (emailExistente) {
        throw new Error("E-mail já cadastrado");
    }

    const telefoneExiste = await this.telefoneExiste(cadastroDados.telefone);
    if (telefoneExiste) {
        throw new Error("Telefone já cadastrado");
    }

    const cpfExiste = await this.cpfExiste(cadastroDados.cpf);
    if (cpfExiste) {
        throw new Error("CPF já cadastrado");
    }

    const sql = "INSERT INTO Cliente (id, nome, email, telefone, cpf, data_criacao) VALUES (null, ?, ?, ?, ?, ?)";

    return new Promise((resolve, reject) => {
        conexao.query(
            sql,
            [cadastroDados.nome, cadastroDados.email, cadastroDados.telefone, cadastroDados.cpf, cadastroDados.data_criacao],
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




async delete(id) {
    const sql = "DELETE FROM Cliente WHERE id = ?";
    return new Promise((resolve, reject) => {
        conexao.query(sql, [id], (error, resultado) => {
            if (error) {
                reject({ message: "Erro ao excluir cliente", error: error });
            } else {
                if (resultado.affectedRows === 0) {
                    resolve({ message: "Nenhum cliente encontrado com esse ID" });
                } else {
                    resolve({ message: "Cliente excluído com sucesso" });
                }
            }
        });
    });
}


}

module.exports = new ClienteModel();