import express from "express";
import { userRoutes } from "./userRoutes";
import { postRoutes } from "./postRoutes";

export const routes = express();
routes.use('/user',userRoutes)
routes.use('/post',postRoutes)