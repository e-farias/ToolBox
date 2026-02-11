import express from "express";
import routes from "./routes";
import "reflect-metadata";
import "./database/connect";

const app = express();
const app_port: Number = 8080;

app.use(express.json());
app.use(routes);

app.listen(app_port, () => console.log(`✅ Server is running on http://localhost:${app_port}`));
