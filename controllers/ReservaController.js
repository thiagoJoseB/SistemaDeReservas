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
    
}


module.exports = new ReservaController();
