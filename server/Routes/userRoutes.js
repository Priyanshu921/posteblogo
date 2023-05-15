import express from "express"
import { createUser, userLogin } from "../controller/user.controller"
import {body} from 'express-validator';
export const userRoutes = express()
// routes for user apis
userRoutes.post(
  "/createuser",
  [
      body("email").notEmpty().withMessage("Please enter Email"),
      body("name").notEmpty().withMessage("Please enter Name"),
      body("password").notEmpty().withMessage("Please enter Password"),
      body("confirmPassword").notEmpty().withMessage("Please enter Password again"),
      body("email").isEmail().withMessage("Email is not valid"),

  ],
  createUser
);
userRoutes.post(
  "/login",
  [
    body("email").notEmpty().withMessage("Please enter Email"),
    body("password").notEmpty().withMessage("Please enter Password"),
    body("email").isEmail().withMessage("Email is not valid"),
  ],
  userLogin
);