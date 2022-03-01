import { Request, Response } from "express";
import { getRepository } from "typeorm";

import User from "../database/models/User";

class UserController {

  async index(req: Request, res: Response) {
    return res.sendStatus(200);
  }

  async store(req: Request, res: Response) {

    const { username, name, email, phone, password } = req.body;
    let { role } = req.body;
    const repository = getRepository(User);

    // Check if user exists
    const userExists = await repository.find({
      where: [
        { username: username },
        { email: email },
        { phone: phone }
      ]
    });

    if (userExists.length > 0) {
      return res.sendStatus(409);
    }

    // Validate username

    // Validate email
    if (email == undefined) {
      return res.status(400).json({
        email: "Favor informar um email"
      });
    }
    if (/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i.test(email)) {
      return res.status(400).json({
        email: "Favor informar um email válido"
      });
    }

    // Validate phone
    if (phone == undefined) {
      return res.status(400).json({
        phone: "Favor informar um telefone"
      });
    }

    // Validate role
    if (role == undefined) {
      role = "user";
    }

    // Validate password
    if (password == undefined) {
      return res.status(400).json({
        password: "Favor informar a senha"
      });
    }
    if (password.length < 8) {
      return res.status(400).json({
        password: "A senha deve conter pelo menos 8 caracteres."
      });
    }
    if (password.length > 32) {
      return res.status(400).json({
        password: "A senha deve conter no máximo 32 caracteres."
      });
    }
    if (!/(?=(?:.*[A-Z]){1,})/.test(password)) {
      return res.status(400).json({
        password: "A senha deve conter pelo menos 1 letra maiúscula."
      });
    }
    if (!/(?=(?:.*[a-z]){1,})/.test(password)) {
      return res.status(400).json({
        password: "A senha deve conter pelo menos 1 letra minúscula."
      });
    }
    if (!/(?=(?:.*\d){1,})/.test(password)) {
      return res.status(400).json({
        password: "A senha deve conter pelo menos 1 número."
      });
    }
    if (!/(?=(?:.*[!@#$%^&*()\-_=+{};:,<.>]){1,})/.test(password)) {
      return res.status(400).json({
        password: "A senha deve conter pelo menos 1 caractere especial."
      });
    }
    if (!/([A-Za-z0-9!@#$%^&*()\-_=+{};:,<.>]{8,32})/.test(password)) {
      return res.status(400).json({
        password: "A senha deve ter de 8 a 32 caracteres."
      });
    }

    // Create User
    const user = repository.create({username, name, email, phone, role, password});
    await repository.save(user);

    // Response
    return res.json(user);
  }

}

export default new UserController();
