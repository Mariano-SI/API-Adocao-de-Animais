const mysql = require('mysql');
class Database{
    static connect(){
        const connection = mysql.createConnection({
            host:'bd2-ufvjm.mysql.database.azure.com',
            user:'Mariano',
            password:'m-88443244',
            database:'ongAnimal',
        });

        connection.connect();
        return connection;
    }
}
module.exports = Database;