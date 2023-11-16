import { Router as expressRouter } from "express";
import AgencyDivision from "../../bd/models/AgencyDivision.model.js";

const routes = expressRouter();

routes.post('/agency-division', async (req, res) => {
    try {
        const agencyDivision = await AgencyDivision.create(req.body);
        res.status(201).send(agencyDivision);
    } catch (error) {
        res.status(400).send(error);
    }
});

routes.get('/agency-division', async (req, res) => {
    try {
        const agencyDivisions = await AgencyDivision.findAll();
        res.status(200).send(agencyDivisions);
    } catch (error) {
        res.status(500).send(error);
    }
});

routes.get('/agency-division/:id', async (req, res) => {
    try {
        const agencyDivision = await AgencyDivision.findByPk(req.params.id);
        if (agencyDivision) {
            res.status(200).send(agencyDivision);
        } else {
            res.status(404).send({ message: 'Agency Division not found' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

routes.put('/agency-division/:id', async (req, res) => {
    try {
        const updated = await AgencyDivision.update(req.body, {
            where: { idAgencyDivision: req.params.id }
        });

        if (updated) {
            const updatedAgencyDivision = await AgencyDivision.findByPk(req.params.id);
            res.status(200).send(updatedAgencyDivision);
        } else {
            res.status(404).send({ message: 'Agency Division not found' });
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

routes.delete('/agency-division/:id', async (req, res) => {
    try {
        const deleted = await AgencyDivision.destroy({
            where: { idAgencyDivision: req.params.id }
        });

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send({ message: 'Agency Division not found' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});


export default routes;