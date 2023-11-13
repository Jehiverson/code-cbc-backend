import { Router as expressRouter } from "express";
import Permission from "../../bd/models/Permission.model";

const routes = expressRouter();

routes.post('/permission', async (req, res) => {
    try {
      const permission = await Permission.create(req.body);
      res.status(201).send(permission);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  routes.get('/permission', async (req, res) => {
    try {
      const permissions = await Permission.findAll();
      res.status(200).send(permissions);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  routes.get('/permission/:id', async (req, res) => {
    try {
      const permission = await Permission.findByPk(req.params.id);
      if (permission) {
        res.status(200).send(permission);
      } else {
        res.status(404).send({ message: 'Permission not found' });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  routes.put('/permission/:id', async (req, res) => {
    try {
      const updated = await Permission.update(req.body, {
        where: { idPermission: req.params.id }
      });
  
      if (updated) {
        const updatedPermission = await Permission.findByPk(req.params.id);
        res.status(200).send(updatedPermission);
      } else {
        res.status(404).send({ message: 'Permission not found' });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  routes.delete('/permission/:id', async (req, res) => {
    try {
      const deleted = await Permission.destroy({
        where: { idPermission: req.params.id }
      });
  
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).send({ message: 'Permission not found' });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });

export default routes;