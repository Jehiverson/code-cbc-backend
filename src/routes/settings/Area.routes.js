import { Router as expressRouter } from "express";
import Area from "../../bd/models/Area.model.js";

const routes = expressRouter();

routes.post('/area', async (req, res) => {
    try {
        const area = await Area.create(req.body);
        res.status(201).send(area);
    } catch (error) {
        res.status(400).send(error);
    }
});

routes.get('/area', async (req, res) => {
    try {
        const areas = await Area.findAll();
        res.status(200).send(areas);
    } catch (error) {
        res.status(500).send(error);
    }
});

routes.get('/area/:id', async (req, res) => {
    try {
        const area = await Area.findByPk(req.params.id);
        if (area) {
            res.status(200).send(area);
        } else {
            res.status(404).send({ message: 'Area not found' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

routes.put('/area/:id', async (req, res) => {
    try {
        const updated = await Area.update(req.body, {
            where: { idArea: req.params.id }
        });

        if (updated) {
            const updatedArea = await Area.findByPk(req.params.id);
            res.status(200).send(updatedArea);
        } else {
            res.status(404).send({ message: 'Area not found' });
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

routes.delete('/area/:id', async (req, res) => {
    try {
        const deleted = await Area.destroy({
            where: { idArea: req.params.id }
        });

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send({ message: 'Area not found' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

export default routes;