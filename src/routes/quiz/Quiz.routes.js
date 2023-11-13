import { Router as expressRouter } from "express";
import Quiz from "../../bd/models/Quiz.model.js";

const routes = expressRouter();

routes.post('/quiz', async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.status(201).send(quiz);
  } catch (error) {
    res.status(400).send(error);
  }
});

routes.get('/quiz', async (req, res) => {
  try {
    const quizzes = await Quiz.findAll({
      include: ['Questions']
    });
    res.status(200).send(quizzes);
  } catch (error) {
    res.status(500).send(error);
  }
});

routes.get('/quiz/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findByPk(req.params.id, {
      include: ['Questions']
    });
    if (quiz) {
      res.status(200).send(quiz);
    } else {
      res.status(404).send({ message: 'Quiz not found' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

routes.put('/quiz/:id', async (req, res) => {
  try {
    const updated = await Quiz.update(req.body, {
      where: { idQuiz: req.params.id }
    });

    if (updated) {
      const updatedQuiz = await Quiz.findByPk(req.params.id, {
        include: ['Questions']
      });
      res.status(200).send(updatedQuiz);
    } else {
      res.status(404).send({ message: 'Quiz not found' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

routes.delete('/quiz/:id', async (req, res) => {
  try {
    const deleted = await Quiz.destroy({
      where: { idQuiz: req.params.id }
    });

    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).send({ message: 'Quiz not found' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

export default routes;