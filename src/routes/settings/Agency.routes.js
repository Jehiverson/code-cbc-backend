import { Router as expressRouter } from "express";
import Agency from "../../bd/models/Agency.model";

const routes = expressRouter();

routes.post('/agency', async (req, res) => {
    try {
        const agency = await Agency.create(req.body);
        res.status(201).send(agency);
    } catch (error) {
        res.status(400).send(error);
    }
});

routes.get('/agency', async (req, res) => {
    try {
        const agencies = await Agency.findAll();
        res.status(200).send(agencies);
    } catch (error) {
        res.status(500).send(error);
    }
});

routes.get('/agency/:id', async (req, res) => {
    try {
        const agency = await Agency.findByPk(req.params.id);
        if (agency) {
            res.status(200).send(agency);
        } else {
            res.status(404).send({ message: 'Agency not found' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

routes.put('/agency/:id', async (req, res) => {
    try {
        const updated = await Agency.update(req.body, {
            where: { idAgency: req.params.id }
        });

        if (updated) {
            const updatedAgency = await Agency.findByPk(req.params.id);
            res.status(200).send(updatedAgency);
        } else {
            res.status(404).send({ message: 'Agency not found' });
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

routes.delete('/agency/:id', async (req, res) => {
    try {
        const deleted = await Agency.destroy({
            where: { idAgency: req.params.id }
        });

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send({ message: 'Agency not found' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});



export default routes;