import { Router as expressRouter } from "express";
import Question from "../../bd/models/Question.model.js";
import Quiz from "../../bd/models/Quiz.model.js";


const routes = expressRouter();

routes.post('/question', async (req, res) => {
    try {
      const question = await Question.create(req.body);
      res.status(201).send(question);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  routes.get('/question', async (req, res) => {
    try {
      const questions = await Question.findAll({
        include: [{model:Quiz}]
      });
      res.status(200).send(questions);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  routes.get('/question/:id', async (req, res) => {
    try {
      const question = await Question.findByPk(req.params.id, {
        include: [{model:Quiz}]
      });
      if (question) {
        res.status(200).send(question);
      } else {
        res.status(404).send({ message: 'Question not found' });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  routes.put('/question/:id', async (req, res) => {
    try {
      const updated = await Question.update(req.body, {
        where: { idQuestion: req.params.id }
      });
  
      if (updated) {
        const updatedQuestion = await Question.findByPk(req.params.id, {
          include: [{model:Quiz}]
        });
        res.status(200).send(updatedQuestion);
      } else {
        res.status(404).send({ message: 'Question not found' });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  routes.delete('/question/:id', async (req, res) => {
    try {
      const deleted = await Question.destroy({
        where: { idQuestion: req.params.id }
      });
  
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).send({ message: 'Question not found' });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });
  

export default routes;