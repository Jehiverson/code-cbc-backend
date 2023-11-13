import { Router as expressRouter } from "express";
import Role from "../../bd/models/Role.model";

const routes = expressRouter();

routes.post('/role', async (req, res) => {
  try {
    const role = await Role.create(req.body);
    res.status(201).send(role);
  } catch (error) {
    res.status(400).send(error);
  }
});

routes.get('/role', async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).send(roles);
  } catch (error) {
    res.status(500).send(error);
  }
});

routes.get('/role/:id', async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (role) {
      res.status(200).send(role);
    } else {
      res.status(404).send({ message: 'Role not found' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

routes.put('/role/:id', async (req, res) => {
  try {
    const updated = await Role.update(req.body, {
      where: { idRole: req.params.id }
    });

    if (updated) {
      const updatedRole = await Role.findByPk(req.params.id);
      res.status(200).send(updatedRole);
    } else {
      res.status(404).send({ message: 'Role not found' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

routes.delete('/role/:id', async (req, res) => {
  try {
    const deleted = await Role.destroy({
      where: { idRole: req.params.id }
    });

    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).send({ message: 'Role not found' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

export default routes;