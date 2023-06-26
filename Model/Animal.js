//importa o modulo do mysql
const mysql = require('mysql');

class CadAnimal{
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
    static getAnimal(callback){
        const connection = CadAnimal.connect();
        //Cria uma consulta
        const sql = "select * from cadAnimal";
        const query = connection.query(sql, function(error, results, fields){
            if(error) throw error;
            //Retorna os dados pela callback
            callback(results);
        });

        console.log(query.sql);
        connection.end()
    }

    //Retorna a lista de carros por tipo de banco de dado
    static getAnimalById(id, callback){
        const connection = CadAnimal.connect();

        //Consulta
        const sql= `select * from cadAnimal left join resgateAnimal on cadAnimal.id = resgateAnimal.id_animal where cadAnimal.id = ${id}`;
        const query = connection.query(sql, function(error, results, fields){
            if(error) throw error;
            //Retorna os dados pela callback
            callback(results);
        });
        console.log(query.sql);
        connection.end();
    }

        //Atualiza o carro no BD
        static updateAnimal(id, {nome, especie, porte, sexo, idade, descricao}, callback){
            const connection = CadAnimal.connect();

            const setStatementCollumns = [] //copiei da Round, gostei.

            if(nome){
                setStatementCollumns.push(`nome = '${nome}'`)
            }
            if(especie){
                setStatementCollumns.push(`especie = '${especie}'`)
            }
            if (porte) {
                setStatementCollumns.push(`porte = '${porte}'`)
            }
            if(sexo){
                setStatementCollumns.push(`sexo = '${sexo}'`)
            }if(idade){
                setStatementCollumns.push(`idade = ${idade}`)
            }if(descricao){
                setStatementCollumns.push(`descricao = '${descricao}'`)
            }

            const sql = `UPDATE cadAnimal SET ${setStatementCollumns.join(",")} where id = ${id}`;
            const query= connection.query(sql, function(error, results, fields){
                if(error) throw error;
                callback(results);
            })
    
            console.log(query.sql);
            connection.end();
    
        }

        
   


    static  createAnimal(animal, callback){
        const connection = CadAnimal.connect();
        const {nome, especie, porte, sexo, idade, descricao} = animal;
        
       const sql = `INSERT INTO cadAnimal ( nome, especie, porte,sexo, idade, descricao ) values ( '${nome}', '${especie}', '${porte}', '${sexo}', ${idade}, '${descricao}')`; 
        const query = connection.query(sql, function(error, results, fields){
            if(error) throw error;
        });

        console.log(query.sql); 
        connection.end();
    }


}

module.exports = CadAnimal;