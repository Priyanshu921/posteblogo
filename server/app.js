import express from "express";
import cors from 'cors';
import { routes } from "./Routes/routes";
export const app = express();

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
app.use('/api',routes)

