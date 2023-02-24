const User = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userController = {
  create: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(req.body.password, salt);
      const user = {
        name: req.body.name,
        email: req.body.email,
        password: passwordHash,
        admin: req.body.admin,
      };
      console.log(user.password);

      const userExists = await User.findOne({ email: user.email });

      if (!user.name) {
        return res.status(422).json({ message: "Nome é obrigatório" });
      }

      if (!user.email) {
        return res.status(422).json({ message: "E-mail é obrigatório" });
      }

      if (!user.password) {
        return res.status(422).json({ message: "Password é obrigatório" });
      }

      if (userExists) {
        return res.status(422).json({ message: "Este email já está em uso" });
      }

      const response = await User.create(user);

      res.status(201).json({ response, message: "Usuário criado com sucesso" });
    } catch (error) {
      console.log(error);
    }
  },

  login: async (req, res) => {
    try {
      const userBody = {
        email: req.body.email,
        password: req.body.password,
      };

      const user = await User.findOne({ email: userBody.email });

      if (!userBody.email) {
        return res.status(422).json({ message: "E-mail é obrigatório" });
      }

      if (!userBody.password) {
        return res.status(422).json({ message: "Password é obrigatório" });
      }

      if (!user) {
        return res.status(422).json({ message: "Usuário não encontrado" });
      }

      const checkPassword = await bcrypt.compare(
        userBody.password,
        user.password
      );

      if (!checkPassword) {
        return res.status(422).json({ message: "Senha inválida" });
      }

      const secret = process.env.SECRET;

      const token = jwt.sign(
        {
          id: user._id,
        },
        secret
      );

      res.status(200).json({ message: "Usuário logado comm sucesso", token });
    } catch (error) {
      console.log(error);
    }
  },

  getAll: async (req, res) => {
    try {
      const users = await User.find();

      res.status(200).json(users);
    } catch (error) {
      console.log(error);
    }
  },

  getOne: async (req, res) => {
    try {
      const id = req.params.id;
      const user = await User.findById(id);

      if (!user) {
        res.status(404).json({ message: "Usuário não encontrado" });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      console.log(error);
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        res.status(404).json({ message: "Usuário não encontrado" });
        return;
      }
      res.status(200).json(user, "Usuário excluído com sucesso");
    } catch (error) {
      console.log(error);
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;
      const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        admin: req.body.admin,
      };
      const updateUser = await User.findByIdAndUpdate(id, user);
      if (!updateUser) {
        res.status(404).json({ message: "Usuário não encontrado" });
        return;
      }

      res.status(200).json({ user, message: "Usuário atualizado com sucesso" });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = userController;
