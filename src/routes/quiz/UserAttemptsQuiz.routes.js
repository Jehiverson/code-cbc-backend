import { Router as expressRouter } from "express";
import UserAttemptsQuiz from "../../bd/models/UserAttemptsQuiz.model.js";

const routes = expressRouter();

routes.post('/user-attempts-quiz', async (req, res) => {
  try {
    const userAttemptsQuiz = await UserAttemptsQuiz.create(req.body);
    res.status(201).send(userAttemptsQuiz);
  } catch (error) {
    res.status(400).send(error);
  }
});

routes.get('/user-attempts-quiz', async (req, res) => {
  try {
    const userAttemptsQuizzes = await UserAttemptsQuiz.findAll({
      include: ['User', 'Quiz']
    });
    res.status(200).send(userAttemptsQuizzes);
  } catch (error) {
    res.status(500).send(error);
  }
});

routes.get('/user-attempts-quiz/:id', async (req, res) => {
  try {
    const userAttemptsQuiz = await UserAttemptsQuiz.findByPk(req.params.id, {
      include: ['User', 'Quiz']
    });
    if (userAttemptsQuiz) {
      res.status(200).send(userAttemptsQuiz);
    } else {
      res.status(404).send({ message: 'User Attempts Quiz not found', data: null });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

routes.put('/user-attempts-quiz/:id', async (req, res) => {
  try {
    const updated = await UserAttemptsQuiz.update(req.body, {
      where: { idUserAttemptsQuiz: req.params.id }
    });

    if (updated) {
      const updatedUserAttemptsQuiz = await UserAttemptsQuiz.findByPk(req.params.id, {
        include: ['User', 'Quiz']
      });
      res.status(200).send(updatedUserAttemptsQuiz);
    } else {
      res.status(404).send({ message: 'User Attempts Quiz not found' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

routes.delete('/user-attempts-quiz/:id', async (req, res) => {
  try {
    const deleted = await UserAttemptsQuiz.destroy({
      where: { idUserAttemptsQuiz: req.params.id }
    });

    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).send({ message: 'User Attempts Quiz not found' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

export default routes;