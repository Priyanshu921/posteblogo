import dotenv from "dotenv";
dotenv.config();

// Configuring dot env to use environment variables
import { app } from "./server/app.js";
import { database } from "./server/helper/database";

//server will run on port stored in the environment file or 3000
const port = process.env.PORT || 3000;

// connecting with the database and then starting the server
database()
  .then(() => {
    app.listen(port, (error) => {
      if (error) {
        throw new Error(error);
      }
      console.log(`Server has started runnin on the port:- ${port}`);
    });
  })
  .catch((err) => {
    throw new Error(err);
  });
