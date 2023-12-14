import { Router as expressRouter } from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

import User from "../../bd/models/User.model.js";
import Role from "../../bd/models/Role.model.js";
import Agency from "../../bd/models/Agency.model.js";
import { createToken } from "../../middlewares/_tokenFunctions.js";
import RoleUser from "../../bd/models/RoleUser.model.js";

const routes = expressRouter();

export const generateToken = (payload, secret) => {
  return jwt.sign(payload, secret);
};

export const verifyToken = (token, secret) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    throw new Error('Token inválido');
  }
};

routes.post('/user', async (req, res) => {
  try {
    const { password } = req.body;
    const saltRounds = 10;
    console.log(password);

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(`${password}`, salt);
    console.log("PASSWORD", hash);

    const user = await User.create({...req.body, password: hash});
    res.status(201).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

routes.post('/user/login', async (req, res) => {
  try {
    const { user, password } = req.body;

    // const dataUser = await User.findOne({ where: { user }, include: [Role] });
    const dataUser = await User.findOne({
      include: [{model: RoleUser}],
      where: { user }
    });
    if (dataUser) {
      const isValidPassword = await bcrypt
        .compare(password, dataUser.password)
        .then(res => {
          return res;
        })
        .catch(err => console.error(err.message));
      if (isValidPassword) {
        res.status(201).json({ isValid: isValidPassword, userData: { dataUser } });
      } else {
        res.status(202).json({ error: true, message: "Contraseña invalida para este usuario." });
      }
    } else {
      res.status(202).json({ error: true, message: "Este usuario no existe" });
    }

  } catch (error) {
    res.status(501).send(error);
  }
});

routes.get('/user', async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{model: Agency}]
    });
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

routes.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

routes.put('/user/:id', async (req, res) => {
  try {

    const { password } = req.body;
    const saltRounds = 10;
    console.log(password);

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(`${password}`, salt);
    console.log("PASSWORD", hash);

    const updated = await User.update({ ...req.body, password: hash }, {
      where: { idUser: req.params.id }
    });

    if (updated) {
      const updatedUser = await User.findByPk(req.params.id);
      res.status(200).send(updatedUser);
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

routes.delete('/user/:id', async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { idUser: req.params.id }
    });

    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});


export default routes;