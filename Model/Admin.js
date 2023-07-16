const mysql = require('mysql');

class Admin{
    //Função para conectar o BD
    static connect(){
        //Cria conexao
        const connection = mysql.createConnection({
            host:'bd2-ufvjm.mysql.database.azure.com',
            user:'Mariano',
            password:'m-88443244',
            database:'ongAnimal',
        });
        //Conecta ao banco
        connection.connect();
        return connection;
    }
    //Retorna lista de carros
    static getAdmins(res){
        const connection = Admin.connect();
        connection.beginTransaction();
        try {
            const sql = "select * from t_admin";
            connection.query(sql, function(error, results, fields){
                return res.status(200).send(results);
            });
            connection.commit();
        } catch (error) {
            connection.rollback();
            throw new Error("Erro com servidor", 500)
        }finally{
            connection.end();
        }
    }
}

module.exports = Admin;