import { Router as expressRouter } from "express";
import UserScoreQuiz from "../../bd/models/UserScoreQuiz.model.js";

const routes = expressRouter();

routes.post('/user-score-quiz', async (req, res) => {
    try {
      const userScoreQuiz = await UserScoreQuiz.create(req.body);
      res.status(201).send(userScoreQuiz);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  routes.get('/user-score-quiz', async (req, res) => {
    try {
      const userScoreQuizzes = await UserScoreQuiz.findAll({
        include: ['Quiz']
      });
      res.status(200).send(userScoreQuizzes);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  routes.get('/user-score-quiz/:id', async (req, res) => {
    try {
      const userScoreQuiz = await UserScoreQuiz.findByPk(req.params.id, {
        include: ['Quiz']
      });
      if (userScoreQuiz) {
        res.status(200).send(userScoreQuiz);
      } else {
        res.status(404).send({ message: 'User Score Quiz not found' });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  routes.put('/user-score-quiz/:id', async (req, res) => {
    try {
      const updated = await UserScoreQuiz.update(req.body, {
        where: { idUserScore: req.params.id }
      });
  
      if (updated) {
        const updatedUserScoreQuiz = await UserScoreQuiz.findByPk(req.params.id, {
          include: ['Quiz']
        });
        res.status(200).send(updatedUserScoreQuiz);
      } else {
        res.status(404).send({ message: 'User Score Quiz not found' });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  routes.delete('/user-score-quiz/:id', async (req, res) => {
    try {
      const deleted = await UserScoreQuiz.destroy({
        where: { idUserScore: req.params.id }
      });
  
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).send({ message: 'User Score Quiz not found' });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });

export default routes;