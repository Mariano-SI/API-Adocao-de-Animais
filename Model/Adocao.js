
const mysql = require('mysql');
const Database = require('../Database/Database')
class Adocao{
    

            

    getAllAdocao(req,res){
        this.dbConnection = Database.connect();
        this.dbConnection.beginTransaction();
        try {
            const sql = "SELECT * FROM adocao";
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

    getAdocaoById(req, res){
        this.dbConnection = Database.connect();
        const idAdocao = req.params.idAdocao;
        
        this.dbConnection.beginTransaction();
        try {
            const sql = `SELECT * FROM adocao where idAdocao = ${idAdocao}`;
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

    createAdocao(req, res){
        this.dbConnection = Database.connect();
        const adotanteInfo = req.body;
        
        this.dbConnection.beginTransaction();
        try {
            const {idAnimal, cpfAdotante , dataAdocao} = adotanteInfo;
        
            const sql = `INSERT INTO adocao ( idAnimal, cpfAdotante, dataAdocao) values ( ${idAnimal}, ${cpfAdotante}, '${dataAdocao}')`; 
 
            this.dbConnection.query(sql, function(error, results, fields){
                return res.status(200).send({msg: "Adocao registrada com sucesso!"});
             });
             this.dbConnection.commit()
        } catch (error) {
            this.dbConnection.rollback();
            throw new Error("Erro com servidor", 500)
        }finally{
            this.dbConnection.end();
        }
    }

    deleteAdocaoById(req, res){
        this.dbConnection = Database.connect();
        const AdocaoById = req.params.idAdocao;
        
        this.dbConnection.beginTransaction();

        try {
            const sql = `DELETE FROM adocao where adocao.idAdocao   = ${AdocaoById}`;
            this.dbConnection.query(sql, [AdocaoById], function(){
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

    updateAdocao(req, res){
        this.dbConnection = Database.connect();
        const AdocaoById = req.params.idAdocao;
        const {idAnimal , cpfAdotante , dataAdocao} = req.body;
        
        this.dbConnection.beginTransaction();
        try {
            const setStatementCollumns = []; 

            if(idAnimal){
                setStatementCollumns.push(`idAnimal = ${idAnimal}`);
            }if(cpfAdotante){
                setStatementCollumns.push(`cpfAdotante = ${cpfAdotante}`);
            }if (dataAdocao) {
                setStatementCollumns.push(`dataAdocao = '${dataAdocao}'`);
            }

            const sql = `UPDATE adocao SET ${setStatementCollumns.join(",")} where adocao.idAdocao = ${AdocaoById}`;
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

module.exports = Adocao;