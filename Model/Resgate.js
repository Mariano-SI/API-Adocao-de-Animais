const mysql = require('mysql');
const Database = require('../Database/Database');

class Resgate{
    static createResgate(resgate, callback){
        this.dbConnection = Database.connect();
        this.dbConnection.beginTransaction();
        const {id_animal, nome_resgatante, data_resgate, situacao_resgate} = resgate;
        
       const sql = `INSERT INTO resgateAnimal ( id_animal, nome_resgatante, data_resgate, situacao_resgate) values ( ${id_animal}, '${nome_resgatante}', '${data_resgate}', '${situacao_resgate}')`; 
        const query = this.dbConnection.query(sql, function(error, results, fields){
            if(error) throw error;
        });

        console.log(query.sql); 
        this.dbConnection.end();
    }
}

module.exports = Resgate;