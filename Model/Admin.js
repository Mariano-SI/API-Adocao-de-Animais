const mysql = require('mysql');

class Admin{
    //Função para conectar o BD
    static connect(){
        //Cria conexao
        const connection = mysql.createConnection({
            host:'bd2-ufvjm.mysql.database.azure.com',
            user:'Mariano',
            password:'m-88443244',
            database:'trabbd',
        });
        //Conecta ao banco
        connection.connect();
        return connection;
    }
    //Retorna lista de carros
    static getAdmins(callback){
        const connection = Admin.connect();
        //Cria uma consulta
        const sql = "select * from adm";
        const query = connection.query(sql, function(error, results, fields){
            if(error) throw error;
            //Retorna os dados pela callback
            callback(results);
        });

        console.log(query.sql);
        connection.end()
    }

    //Retorna a lista de carros por tipo de banco de dado
    static getAdminById(id, callback){
        const connection = Admin.connect();

        //Consulta
        const sql= `SELECT * FROM adm where id = ${id}`
        const query = connection.query(sql, function(error, results, fields){
            if(error) throw error;
            //Retorna os dados pela callback
            callback(results);
        });
        console.log(query.sql);
        connection.end();

    }


}

module.exports = Admin;