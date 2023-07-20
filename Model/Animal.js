const Database = require('../Database/Database');
const { format } = require('date-fns');

class CadAnimal {
  getAnimais(res) {
    this.dbConnection = Database.connect();
    this.dbConnection.beginTransaction();

    try {
      const sql = 'select * from animal';
      this.dbConnection.query(sql, function (error, results, fields) {
        return res.status(200).send(results);
      });
      this.dbConnection.commit();
    } catch (error) {
      this.dbConnection.rollback();
      throw new Error('Não foi possivel concluir a transação', 500);
    } finally {
      this.dbConnection.end();
    }
  }

  getAnimalById(req, res) {
    const id = req.params.id;

    this.dbConnection = Database.connect();
    this.dbConnection.beginTransaction();

    try {
      const sql = `CALL spDadosAnimal(?)`;
      this.dbConnection.query(sql, [id], function (error, results, fields) {
        results[0].map((item) => {
          item.dResgate = format(new Date(item.dResgate), 'yyyy-MM-dd');
        });

        return res.status(200).send(results[0]);
      });
      this.dbConnection.commit();
    } catch (error) {
      this.dbConnection.rollback();
      throw new Error('Erro com servidor', 500);
    } finally {
      this.dbConnection.end();
    }
  }

  createAnimal(req, res) {
    const animalInfo = req.body;
    this.dbConnection = Database.connect();
    this.dbConnection.beginTransaction();

    try {
      const { nome, idade, porte, sexo, especie, dResgate, nResgate } =
        animalInfo;
      const parameters = [
        nome,
        idade,
        porte,
        sexo,
        especie,
        dResgate,
        nResgate,
      ];

      const sql = `CALL spCadAnimal(?,?,?,?,?,?,?)`;

      this.dbConnection.query(sql, parameters, function () {
        return res.status(200).send({ msg: 'Animal cadastrado com sucesso' });
      });
      this.dbConnection.commit();
    } catch (error) {
      this.dbConnection.rollback();
      throw new Error('Erro com servidor', 500);
    } finally {
      this.dbConnection.end();
    }
  }

  deleteAnimalById(req, res) {
    this.dbConnection = Database.connect();
    const id = req.params.id;

    this.dbConnection.beginTransaction();
    try {
      const sql = `CALL spDeleteAnimalById(?)`;
      this.dbConnection.query(sql, [id], function () {
        return res.status(200).send({ msg: 'Animal deletado com sucesso!' });
      });
      this.dbConnection.commit();
    } catch (error) {
      this.dbConnection.rollback();
      throw new Error('Erro com servidor', 500);
    } finally {
      this.dbConnection.end();
    }
  }

  updateAnimal(req, res) {
    this.dbConnection = Database.connect();
    this.dbConnection.beginTransaction();
    const id = req.params.id;
    const { nome, idade, porte, sexo, especie, dataResgate, nomeResgatante } =
      req.body;

    try {
      const setStatementCollumns = [];
      const setStatementCollumnsResgate = [];

      if (nome) {
        setStatementCollumns.push(`nome = '${nome}'`);
      }
      if (idade) {
        setStatementCollumns.push(`idade = ${idade}`);
      }
      if (porte) {
        setStatementCollumns.push(`porte = '${porte}'`);
      }
      if (sexo) {
        setStatementCollumns.push(`sexo = '${sexo}'`);
      }
      if (especie) {
        setStatementCollumns.push(`especie = '${especie}'`);
      }
      if (dataResgate) {
        setStatementCollumnsResgate.push(`dataResgate = '${dataResgate}'`);
      }
      if (nomeResgatante) {
        setStatementCollumnsResgate.push(
          `nomeResgatante = '${nomeResgatante}'`,
        );
      }

      const sql = `UPDATE animal SET ${setStatementCollumns.join(
        ',',
      )} where id = ${id};`;

      console.log(sql);

      this.dbConnection.query(sql, function () {
        return res
          .status(200)
          .send({ msg: 'Registro do animal atualizado com sucesso!' });
      });

      this.dbConnection.commit();
    } catch (error) {
      this.dbConnection.rollback();
      throw new Error('Erro no servidor', 500);
    } finally {
      this.dbConnection.end();
    }
  }
}

module.exports = CadAnimal;
