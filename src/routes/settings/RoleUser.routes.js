import { Router as expressRouter } from "express";
import Role from "../../bd/models/Role.model.js";
import RoleUser from "../../bd/models/RoleUser.model.js";
import User from "../../bd/models/User.model.js";

const routes = expressRouter();

routes.post('/role-user', async (req, res) => {
  try {
    const role = await RoleUser.create(req.body);
    res.status(201).send(role);
  } catch (error) {
    res.status(400).send(error);
  }
});

routes.get('/role-user', async (req, res) => {
  try {
    const roles = await RoleUser.findAll({
      include: [
        {model: Role},
        {model: User},
      ]
    });
    res.status(200).send(roles);
  } catch (error) {
    res.status(500).send(error);
  }
});

routes.get('/role-user/:id', async (req, res) => {
  try {
    const role = await RoleUser.findByPk(req.params.id);
    if (role) {
      res.status(200).send(role);
    } else {
      res.status(404).send({ message: 'Role not found' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

routes.put('/role-user/:id', async (req, res) => {
  try {
    const updated = await RoleUser.update(req.body, {
      where: { idRoleUser: req.params.id }
    });

    if (updated) {
      const updatedRole = await RoleUser.findByPk(req.params.id);
      res.status(200).send(updatedRole);
    } else {
      res.status(404).send({ message: 'Role not found' });
    }
  } catch (error) {
    console.log(error)
    res.status(400).send(error);
  }
});

routes.delete('/role-user/:id', async (req, res) => {
  try {
    const deleted = await RoleUser.destroy({
      where: { idRoleUser: req.params.id }
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