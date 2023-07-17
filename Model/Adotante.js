const mysql = require('mysql');
const Database = require('../Database/Database')
class Adotante{
    
    
    static getAllAdotantes(req,res){
        this.dbConnection = Database.connect();
        this.dbConnection.beginTransaction();
        try {
            const sql = "SELECT * FROM adotante";
            this.dbConnection.query(sql, function(error, results, fields){
                return res.status(200).send(results);
             })
             this.dbConnection.commit();
        } catch (error) {
            this.dbConnection.rollback();
            throw new Error("Erro com servidor", 500)
        }finally{
            this.dbConnection.end();
        }
    }

    static getAdotantesByCPF(req, res){
        const cpf = req.params.cpf;
        this.dbConnection = Database.connect();
        this.dbConnection.beginTransaction();
        try {
            const sql = `SELECT * FROM adotante where cpf = ${cpf}`;
            this.dbConnection.query(sql, function(error, results, fields){
                return res.status(200).send(results);
             })
             this.dbConnection.commit();
        } catch (error) {
            this.dbConnection.rollback();
            throw new Error("Erro com servidor", 500)
        }finally{
            this.dbConnection.end();
        }
    }

    static createAdotante(req, res){
        const adotanteInfo = req.body;

        this.dbConnection = Database.connect();
        this.dbConnection.beginTransaction();
        try {
            const {cpf, nome, sobrenome, rua, cidade, estado, nCasa, telefone} = adotanteInfo;
        
            const sql = `INSERT INTO adotante ( cpf, nome, sobrenome, rua, cidade, estado, nCasa, telefone ) values ( ${cpf}, '${nome}', '${sobrenome}', '${rua}', '${cidade}','${estado}', ${nCasa}, '${telefone}')`; 
 
            this.dbConnection.query(sql, function(error, results, fields){
                return res.status(200).send(results);
             });
             this.dbConnection.commit()
        } catch (error) {
            this.dbConnection.rollback();
            throw new Error("Erro com servidor", 500)
        }finally{
            this.dbConnection.end();
        }
    }

    static deleteAdotantesByCPF(req, res){
        const cpf = req.params.cpf;
        this.dbConnection = Database.connect();
        this.dbConnection.beginTransaction();

        try {
            const sql = `Delete * FROM adotante where cpf = ${cpf}`;
            this.dbConnection.query(sql, function(){
                return res.status(200).send({msg:"Deletado com sucesso!"});
             })
             this.dbConnection.commit();
        } catch (error) {
            this.dbConnection.rollback();
            throw new Error("Erro com servidor", 500)
        }finally{
            this.dbConnection.end();
        }
    }

    static updateAdotante(req, res){
        this.dbConnection = Database.connect();
        
        const cpf = req.params.cpf;
        const {nome, sobrenome, rua, cidade, estado, nCasa, telefone} = req.body;
        
        this.dbConnection.beginTransaction();
        try {
            const setStatementCollumns = []; 

            if(nome){
                setStatementCollumns.push(`nome = '${nome}'`);
            }if(sobrenome){
                setStatementCollumns.push(`sobrenome = '${sobrenome}'`);
            }if (rua) {
                setStatementCollumns.push(`rua = '${rua}'`);
            }if(cidade){
                setStatementCollumns.push(`cidade = '${cidade}'`);
            }if(estado){
                setStatementCollumns.push(`estado = '${estado}'`);
            }if(nCasa){
                setStatementCollumns.push(`nCasa = ${nCasa}`);
            }if(telefone){
                setStatementCollumns.push(`telefone = '${telefone}'`);
            }

            const sql = `UPDATE adotante SET ${setStatementCollumns.join(",")} where cpf = ${cpf}`;
            this.dbConnection.query(sql, function(){
                return res.status(200).send({msg:"Atualizado com sucesso!"});
            })
            this.dbConnection.commit()
        } catch (error) {
            this.dbConnection.rollback();
            throw new Error("Erro no servidor", 500);
        }finally{
            this.dbConnection.end();
        }         
    }
}

module.exports = Adotante;