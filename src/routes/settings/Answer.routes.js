import { Router as expressRouter } from "express";
import Answer from "../../bd/models/Answer.model.js";
import Question from "../../bd/models/Question.model.js";

const routes = expressRouter();

routes.post('/answer', async (req, res) => {
    try {
        const answer = await Answer.create(req.body);
        res.status(201).send(answer);
    } catch (error) {
        res.status(400).send(error);
    }
});

routes.get('/answer', async (req, res) => {
    try {
        const answers = await Answer.findAll({
            include: [{model: Question}]
        });
        console.log("DATA ====>", answers);
        res.status(200).send(answers);
    } catch (error) {
        res.status(500).send(error);
    }
});

routes.get('/answer/:id', async (req, res) => {
    try {
        const answer = await Answer.findByPk(req.params.id);
        if (answer) {
            res.status(200).send(answer);
        } else {
            res.status(404).send({ message: 'Answer not found' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

routes.put('/answer/:id', async (req, res) => {
    try {
        const updated = await Answer.update(req.body, {
            where: { idAnswers: req.params.id }
        });

        if (updated) {
            const updatedAnswer = await Answer.findByPk(req.params.id);
            res.status(200).send(updatedAnswer);
        } else {
            res.status(404).send({ message: 'Answer not found' });
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

routes.delete('/answer/:id', async (req, res) => {
    try {
        const deleted = await Answer.destroy({
            where: { idAnswers: req.params.id }
        });

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send({ message: 'Answer not found' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

export default routes;