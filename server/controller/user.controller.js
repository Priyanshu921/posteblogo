import { user } from "../models/user";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { apiResponse } from "../helper/utils";
export const createUser = async (req, res) => {
  const { email, password, confirmPassword, name } = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If there are validation errors, send a response with status 400 and the error messages
      return apiResponse(res, { statusCode: 400, error: errors.errors[0].msg });
    }
    const userFound = await user.findOne({ email: email });
    if (userFound) {
      return apiResponse(res, { statusCode: 409, error: "user already exist" });
    }
    if (password !== confirmPassword) {
      return apiResponse(res, {
        statusCode: 400,
        error: "Passwords does not match",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userCreated = await user.create({
      name,
      email,
      password: hashedPassword,
    });
    if (userCreated) {
      return apiResponse(res, {
        statusCode: 201,
        message: "user created successfully",
      });
    }
  } catch (error) {
    return apiResponse(res, {
      statusCode: 500,
      error: "problem while creating user ",
    });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await user.findOne({ email }).lean().exec();
    if (!userExist) {
      return apiResponse(res, {
        statusCode: 403,
        error: "Invalid email",
      });
    }
    const passwordMatched = await bcrypt.compare(password, userExist.password);
    if (!passwordMatched) {
      return apiResponse(res, {
        statusCode: 403,
        error: "Invalid password",
      });
    }
    const token = jwt.sign(userExist, process.env.SECRET_KEY, {
      expiresIn: process.env.EXPIRES_IN,
    });
    return apiResponse(res, {
      statusCode: 200,
      message: "successfully logged in",
      data: { ...userExist, token },
    });
  } catch (err) {
    console.log(err);
    return apiResponse(res, {
      statusCode: 500,
      error: "Probelem while logging in",
    });
  }
};
