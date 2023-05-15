import express from "express";
import cors from 'cors';
import { routes } from "./Routes/routes";
export const app = express();
import path from "path"
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
app.use('/api',routes)

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(path.resolve() , "/client/build/index.html"));
  });
}
console.log(path.join(path.resolve(), "/client/build/index.html"));