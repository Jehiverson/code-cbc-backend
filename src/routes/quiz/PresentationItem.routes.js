import { Router as expressRouter } from "express";
import PresentationItem from "../../bd/models/PresentationItem.model.js";
import Presentation from "../../bd/models/Presentation.model.js";

const routes = expressRouter();

routes.post('/presentation-item', async (req, res) => {
  try {
    const presentationItem = await PresentationItem.create(req.body);
    res.status(201).send(presentationItem);
  } catch (error) {
    res.status(400).send(error);
  }
});

routes.get('/presentation-item', async (req, res) => {
  try {
    const presentationItems = await PresentationItem.findAll({
      include: [{model:Presentation}]
    });
    res.status(200).send(presentationItems);
  } catch (error) {
    res.status(500).send(error);
  }
});

routes.get('/presentation-item/:id', async (req, res) => {
  try {
    const presentationItem = await PresentationItem.findByPk(req.params.id, {
      include: [{model:Presentation}]
    });
    if (presentationItem) {
      res.status(200).send(presentationItem);
    } else {
      res.status(404).send({ message: 'Presentation Item not found' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

routes.put('/presentation-item/:id', async (req, res) => {
  try {
    const updated = await PresentationItem.update(req.body, {
      where: { idPresentationItem: req.params.id }
    });

    if (updated) {
      const updatedPresentationItem = await PresentationItem.findByPk(req.params.id, {
        include: [{model:Presentation}]
      });
      res.status(200).send(updatedPresentationItem);
    } else {
      res.status(404).send({ message: 'Presentation Item not found' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

routes.delete('/presentation-item/:id', async (req, res) => {
  try {
    const deleted = await PresentationItem.destroy({
      where: { idPresentationItem: req.params.id }
    });

    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).send({ message: 'Presentation Item not found' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

export default routes;