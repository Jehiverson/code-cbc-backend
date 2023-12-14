import { Router as expressRouter } from "express";
import Division from "../../bd/models/Division.model.js";

const routes = expressRouter();

routes.post('/division', async (req, res) => {
  try {
    const division = await Division.create(req.body);
    console.log(division);
    res.status(201).send(division);
  } catch (error) {
    res.status(400).send(error);
  }
});

routes.get('/division', async (req, res) => {
  try {
    const Divisions = await Division.findAll();
    res.status(200).send(Divisions);
  } catch (error) {
    res.status(500).send(error);
  }
});

routes.get('/division/:id', async (req, res) => {
  try {
    const Division = await Division.findByPk(req.params.id);
    if (Division) {
      res.status(200).send(Division);
    } else {
      res.status(404).send({ message: 'Division not found' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

routes.put('/division/:id', async (req, res) => {
  try {
    const updated = await Division.update(req.body, {
      where: { idDivision: req.params.id }
    });

    if (updated) {
      const updatedDivision = await Division.findByPk(req.params.id);
      res.status(200).send(updatedDivision);
    } else {
      res.status(404).send({ message: 'Division not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

routes.delete('/division/:id', async (req, res) => {
  try {
    const deleted = await Division.destroy({
      where: { idDivision: req.params.id }
    });

    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).send({ message: 'Division not found' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

export default routes;