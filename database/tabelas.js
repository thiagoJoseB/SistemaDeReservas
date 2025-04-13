class tabelas {
    init(conexao){
        this.conexao = conexao;
        this.criarTabelaCliente();
        
    }


    criarTabelaCliente(){
        const sql = `
        create table if not exists Cliente(
            id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL,
            telefone VARCHAR(32) NOT NULL,
            cpf VARCHAR(32) NOT NULL,
            data_criacao TIMESTAMP
            );
            `;

            
        this.conexao.query(sql, (error) =>{
            if(error){
                console.log("Ocorreu um erro ao criar a tebela do banco de dados!");
                console.log(error.message);
                return;
            }
        console.log("Sucesso, tabela do bando criada com sucesso!");
        });
    }
}


module.exports = new tabelas();
