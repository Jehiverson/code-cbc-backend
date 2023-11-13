import { Router as expressRouter } from "express";
import Presentation from "../../bd/models/Presentation.model.js";

const routes = expressRouter();

routes.post('/presentation', async (req, res) => {
  try {
    const presentation = await Presentation.create(req.body);
    res.status(201).send(presentation);
  } catch (error) {
    res.status(400).send(error);
  }
});

routes.get('/presentation', async (req, res) => {
  try {
    const presentations = await Presentation.findAll();
    res.status(200).send(presentations);
  } catch (error) {
    res.status(500).send(error);
  }
});

routes.get('/presentation/:id', async (req, res) => {
  try {
    const presentation = await Presentation.findByPk(req.params.id);
    if (presentation) {
      res.status(200).send(presentation);
    } else {
      res.status(404).send({ message: 'Presentation not found' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

routes.put('/presentation/:id', async (req, res) => {
  try {
    const updated = await Presentation.update(req.body, {
      where: { idPresentation: req.params.id }
    });

    if (updated) {
      const updatedPresentation = await Presentation.findByPk(req.params.id);
      res.status(200).send(updatedPresentation);
    } else {
      res.status(404).send({ message: 'Presentation not found' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

routes.delete('/presentation/:id', async (req, res) => {
  try {
    const deleted = await Presentation.destroy({
      where: { idPresentation: req.params.id }
    });

    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).send({ message: 'Presentation not found' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});


export default routes;