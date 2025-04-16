class tabelas {
    init(conexao){
        this.conexao = conexao;
        this.criarTabelaCliente();
        this.criarTabelaTipoLocacao();
        this.criarTabelaReserva();
        
        
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
        console.log("Sucesso, tabela Cliente criada com sucesso!");
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
        console.log("Sucesso, tabela Tipo Locação criada com sucesso!");
        });
    }
    
    criarTabelaReserva() {
        const sql = `
            CREATE TABLE IF NOT EXISTS Reserva (
                id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
                cliente_id INTEGER NOT NULL,
                locacao_id INTEGER NOT NULL,
                data_inicio DATETIME NOT NULL,
                data_fim DATETIME NOT NULL,
                valor_final DECIMAL(10,2) NOT NULL,
                situacao VARCHAR(100) NOT NULL,
                data_criacao TIMESTAMP,
    
                CONSTRAINT fk_cliente FOREIGN KEY (cliente_id) REFERENCES Cliente(id),
                CONSTRAINT fk_locacao FOREIGN KEY (locacao_id) REFERENCES Locacao(id)
            );
        `;
    
        this.conexao.query(sql, (error) => {
            if (error) {
                console.log("Erro ao criar a tabela Reserva!");
                console.log(error.message);
                return;
            }
            console.log("Sucesso, tabela Reserva criada com sucesso!");
        });
    }
    
}


module.exports = new tabelas();
