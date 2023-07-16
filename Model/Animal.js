//importa o modulo do mysql
const mysql = require('mysql');

class CadAnimal {
  //Função para conectar o BD
  static connect() {
    //Cria conexao
    const connection = mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'onganimal',
    });
    //Conecta ao banco
    connection.connect();
    return connection;
  }
  //Retorna lista de carros
  static getAnimal(res) {
    const connection = CadAnimal.connect();
    connection.beginTransaction();
    try {
      const sql = 'select * from animal';

      const query = connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        return res.status(200).send(results);
      });
      connection.commit();
    } catch (error) {
      connection.rollback();
      throw new Error('Não foi possivel concluir a transação', 500);
    } finally {
      connection.end();
    }
  }

  //Retorna a lista de carros por tipo de banco de dado
  static getAnimalById(id, callback) {
    const connection = CadAnimal.connect();

    //Consulta
    const sql = `select * from animal where animal.id = ${id}`;
    const query = connection.query(sql, function (error, results, fields) {
      if (error) throw error;
      //Retorna os dados pela callback
      callback(results);
    });
    console.log(query.sql);
    connection.end();
  }

  //Atualiza o carro no BD
  static updateAnimal(id, { nome, especie, porte, sexo, idade }, res) {
    const connection = CadAnimal.connect();
    connection.beginTransaction();
    try {
      const setStatementCollumns = []; //copiei da Round, gostei.

      if (nome) {
        setStatementCollumns.push(`nome = '${nome}'`);
      }
      if (especie) {
        setStatementCollumns.push(`especie = '${especie}'`);
      }
      if (porte) {
        setStatementCollumns.push(`porte = '${porte}'`);
      }
      if (sexo) {
        setStatementCollumns.push(`sexo = '${sexo}'`);
      }
      if (idade) {
        setStatementCollumns.push(`idade = ${idade}`);
      }

      const sql = `UPDATE animal SET ${setStatementCollumns.join(
        ',',
      )} where id = ${id}`;
      const query = connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        return res.status(200).send(results);
      });

      connection.commit();
    } catch (error) {
      connection.rollback();
      throw new Error('Erro com o servidor', 500);
    } finally {
      connection.end();
    }
  }

  static createAnimal(animal, callback) {
    const connection = CadAnimal.connect();
    const { nome, especie, porte, sexo, idade } = animal;

    const sql = `INSERT INTO animal ( nome, especie, porte, sexo, idade ) values ( '${nome}', '${especie}', '${porte}', '${sexo}', ${idade})`;
    const query = connection.query(sql, function (error, results, fields) {
      if (error) throw error;
    });

    console.log(query.sql);
    connection.end();
    callback();
  }
}

module.exports = CadAnimal;
