import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  id: string,
  iat: number,
  exp: number,
}

export default function authMiddleware(
  req: Request, res: Response, next: NextFunction
) {

  const { authorization } = req.headers;

  if (!authorization) {
    return res.sendStatus(401);
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    
    const data = jwt.verify(
      token,
      "myJwtSecret",
    );

    const { id } = data as TokenPayload;
			
    req.userId = id;

    return next();

  } catch (error) {
    console.log(`\nerror: \n${error}\n`);
    return res.sendStatus(401);
  }

} 
