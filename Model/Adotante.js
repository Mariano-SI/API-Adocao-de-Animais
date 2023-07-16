const mysql = require('mysql');

class Adotante{
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

    static getAllAdotantes(req,res){
        const connection = Adotante.connect();
        connection.beginTransaction();
        try {
            const sql = "SELECT * FROM adotante";
            connection.query(sql, function(error, results, fields){
                return res.status(200).send(results);
             })
             connection.commit();
        } catch (error) {
            connection.rollback();
            throw new Error("Erro com servidor", 500)
        }finally{
            connection.end();
        }
    }

    static getAdotantesByCPF(req, res){
        const cpf = req.params.cpf;
        const connection = Adotante.connect();
        connection.beginTransaction();
        try {
            const sql = `SELECT * FROM adotante where cpf = ${cpf}`;
            connection.query(sql, function(error, results, fields){
                return res.status(200).send(results);
             })
             connection.commit();
        } catch (error) {
            connection.rollback();
            throw new Error("Erro com servidor", 500)
        }finally{
            connection.end();
        }
        console.log(cpf)
    }

    static createAdotante(req, res){
        const adotanteInfo = req.body;
        const connection = Adotante.connect();

        connection.beginTransaction();
        try {
            const {cpf, nome, sobrenome, rua, cidade, estado, nCasa, telefone} = adotanteInfo;
        
            const sql = `INSERT INTO adotante ( cpf, nome, sobrenome, rua, cidade, estado, nCasa, telefone ) values ( ${cpf}, '${nome}', '${sobrenome}', '${rua}', '${cidade}','${estado}', ${nCasa}, '${telefone}')`; 
 
            connection.query(sql, function(error, results, fields){
                return res.status(200).send(results);
             });
             connection.commit()
        } catch (error) {
            connection.rollback();
            throw new Error("Erro com servidor", 500)
        }finally{
            connection.end();
        }
    }

    static deleteAdotantesByCPF(req, res){
        const cpf = req.params.cpf;
        const connection = Adotante.connect();
        connection.beginTransaction();
        try {
            const sql = `Delete * FROM adotante where cpf = ${cpf}`;
            connection.query(sql, function(error, results, fields){
                return res.status(200).send({msg:"Deletado com sucesso!"});
             })
             connection.commit();
        } catch (error) {
            connection.rollback();
            throw new Error("Erro com servidor", 500)
        }finally{
            connection.end();
        }
    }

    static updateAdotante(req, res){
        const connection = Adotante.connect();
        const cpf = req.params.cpf;
        const {nome, sobrenome, rua, cidade, estado, nCasa, telefone} = req.body;

        try {
            const setStatementCollumns = [] //copiei da Round, gostei.

            if(nome){
                setStatementCollumns.push(`nome = '${nome}'`)
            }
            if(sobrenome){
                setStatementCollumns.push(`sobrenome = '${sobrenome}'`)
            }
            if (rua) {
                setStatementCollumns.push(`rua = '${rua}'`)
            }
            if(cidade){
                setStatementCollumns.push(`cidade = '${cidade}'`)
            }if(estado){
                setStatementCollumns.push(`estado = '${estado}'`)
            }if(nCasa){
                setStatementCollumns.push(`nCasa = ${nCasa}`)
            }if(telefone){
                setStatementCollumns.push(`telefone = '${telefone}'`)
            }

            const sql = `UPDATE adotante SET ${setStatementCollumns.join(",")} where cpf = ${cpf}`;
            connection.query(sql, function(){
                return res.status(200).send({msg:"Atualizado com sucesso!"});
            })
            connection.commit()
        } catch (error) {
            connection.rollback();
            throw new Error("Erro no servidor", 500);
        }finally{
            connection.end();
        }         
    }
}

module.exports = Adotante;