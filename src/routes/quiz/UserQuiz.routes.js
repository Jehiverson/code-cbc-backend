import { Router as expressRouter } from "express";
import UserQuiz from "../../bd/models/UserQuiz.model.js";
import User from "../../bd/models/User.model.js";
import Quiz from "../../bd/models/Quiz.model.js";

const routes = expressRouter();

routes.post('/user-quiz', async (req, res) => {
  try {
    console.log(req.body);
    const userQuiz = await UserQuiz.create(req.body);
    res.status(201).send(userQuiz);
  } catch (error) {
    res.status(400).send(error);
  }
});

routes.get('/user-quiz', async (req, res) => {
  try {
    const userQuizzes = await UserQuiz.findAll({
      include: [User, Quiz]
    });
    res.status(200).send(userQuizzes);
  } catch (error) {
    res.status(500).send(error);
  }
});

// PUT: Update a user quiz
routes.put('/user-quiz/:idUSer/:idQuiz', async (req, res) => {
  try {
    const updated = await UserQuiz.update(req.body, {
      where: { idUser: req.params.idUSer, idQuiz: req.params.idQuiz}
    });

    if (updated) {
      const updatedUserQuiz = await UserQuiz.findByPk(req.params.id, {
        include: [User, Quiz]
      });
      res.status(200).send(updatedUserQuiz);
    } else {
      res.status(404).send({ message: 'User Quiz not found' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE: Delete a user quiz
routes.delete('/user-quiz/:id', async (req, res) => {
  try {
    const deleted = await UserQuiz.destroy({
      where: { idUserQuiz: req.params.id }
    });

    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).send({ message: 'User Quiz not found' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

routes.get('/user/:idUser/quiz/:idQuiz', async (req, res) => {
  try {
    const userQuiz = await UserQuiz.findOne({
      where: {
        idUser: req.params.idUser,
        idQuiz: req.params.idQuiz,
      },
    });
    console.log("GET DATOS", userQuiz)
    res.status(200).send(userQuiz);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default routes;