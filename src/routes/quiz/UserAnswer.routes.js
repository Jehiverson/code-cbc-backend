import { Router as expressRouter } from "express";
import UserAnswer from "../../bd/models/UserAnswer.model.js";

const routes = expressRouter();

routes.post('/user-answer', async (req, res) => {
  try {
      req.body.map(async(item) => {
        await UserAnswer.create(item);
      });
      res.status(200).send("created")
  } catch (error) {
    res.status(400).send(error);
  }
});

routes.post('/user-answer/bulk', async (req, res) => {
  try {
    const userAnswer = await UserAnswer.bulkCreate(req.body);
    res.status(201).send(userAnswer);
  } catch (error) {
    res.status(400).send(error);
  }
});

routes.get('/user-answer', async (req, res) => {
  try {
    const userAnswers = await UserAnswer.findAll({
      include: ['User', 'Question', 'Answer']
    });
    res.status(200).send(userAnswers);
  } catch (error) {
    res.status(500).send(error);
  }
});

routes.get('/user-answer/:id', async (req, res) => {
  try {
    const userAnswer = await UserAnswer.findByPk(req.params.id, {
      include: ['User', 'Question', 'Answer']
    });
    if (userAnswer) {
      res.status(200).send(userAnswer);
    } else {
      res.status(404).send({ message: 'User Answer not found' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

routes.put('/user-answer/:id', async (req, res) => {
  try {
    const updated = await UserAnswer.update(req.body, {
      where: { idUserAnswer: req.params.id }
    });

    if (updated) {
      const updatedUserAnswer = await UserAnswer.findByPk(req.params.id, {
        include: ['User', 'Question', 'Answer']
      });
      res.status(200).send(updatedUserAnswer);
    } else {
      res.status(404).send({ message: 'User Answer not found' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

routes.delete('/user-answer/:id', async (req, res) => {
  try {
    const deleted = await UserAnswer.destroy({
      where: { idUserAnswer: req.params.id }
    });

    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).send({ message: 'User Answer not found' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

export default routes;