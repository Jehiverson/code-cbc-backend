import { Router as expressRouter } from "express";
import PermissionRole from "../../bd/models/PermissionRole.model";

const routes = expressRouter();

routes.post('/permission-role', async (req, res) => {
  try {
    const permissionRole = await PermissionRole.create(req.body);
    res.status(201).send(permissionRole);
  } catch (error) {
    res.status(400).send(error);
  }
});

routes.get('/permission-role', async (req, res) => {
  try {
    const permissionRoles = await PermissionRole.findAll({
      include: ['Permission', 'Role']
    });
    res.status(200).send(permissionRoles);
  } catch (error) {
    res.status(500).send(error);
  }
});

routes.get('/permission-role/:id', async (req, res) => {
  try {
    const permissionRole = await PermissionRole.findByPk(req.params.id, {
      include: ['Permission', 'Role']
    });
    if (permissionRole) {
      res.status(200).send(permissionRole);
    } else {
      res.status(404).send({ message: 'Permission Role not found' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

routes.put('/permission-role/:id', async (req, res) => {
  try {
    const updated = await PermissionRole.update(req.body, {
      where: { idPermissionRole: req.params.id }
    });

    if (updated) {
      const updatedPermissionRole = await PermissionRole.findByPk(req.params.id, {
        include: ['Permission', 'Role']
      });
      res.status(200).send(updatedPermissionRole);
    } else {
      res.status(404).send({ message: 'Permission Role not found' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

routes.delete('/permission-role/:id', async (req, res) => {
  try {
    const deleted = await PermissionRole.destroy({
      where: { idPermissionRole: req.params.id }
    });

    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).send({ message: 'Permission Role not found' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

export default routes;