import { Router as expressRouter } from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

import User from "../../bd/models/User.model";

const routes = expressRouter();

export const generateToken = (payload, secret, expiresIn) => {
  return jwt.sign(payload, secret, { expiresIn });
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
    // Implement any password hashing or validation here if necessary
    const user = await User.create(req.body);
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

routes.get('/user', async (req, res) => {
  try {
    const users = await User.findAll();
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

    const updated = await User.update({...req.body, password: hash}, {
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