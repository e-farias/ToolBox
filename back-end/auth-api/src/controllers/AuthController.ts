import { Request, Response } from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../database/models/User";

class AuthController {

  async auth(req: Request, res: Response) {

    const { username, password } = req.body;
    const repository = getRepository(User);

    // Check if user exists
    const user = await repository.findOne({ where: { username } });

    if (!user) {
      return res.sendStatus(401);
    }

    // Validate user password
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log(`\nisValidPassword: ${isValidPassword}\n`);

    if (!isValidPassword) {
      return res.sendStatus(401);
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id },
      "myJwtSecret", // process.env.JWT_SECRET
      { expiresIn: "15d" }
    );

    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      token: token
    });

  }

}

export default new AuthController();
