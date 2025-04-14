class tabelas {
    init(conexao){
        this.conexao = conexao;
        this.criarTabelaCliente();
        this.criarTabelaTipoLocacao();
        
        
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
                console.log("Erro ao criar a tabela Cliente!");
                console.log(error.message);
                return;
            }
        console.log("Sucesso, tabela do bando criada com sucesso!");
        });
    }

    criarTabelaTipoLocacao(){
        const sql = `
    create table if not exists Locacao(
        id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        tipo VARCHAR(100) NOT NULL,
        descricao TEXT ,
        valor_hora DECIMAL(10,2) NOT NULL,
        tempo_minimo INTEGER not null,
        tempo_maximo INTEGER not null,
        data_criacao TIMESTAMP
        );
    `;

            
        this.conexao.query(sql, (error) =>{
            if(error){
                console.log("Erro ao criar a tabela Locacao!");
                console.log(error.message);
                return;
            }
        console.log("Sucesso, tabela do bando criada com sucesso!");
        });
    }
}


module.exports = new tabelas();
