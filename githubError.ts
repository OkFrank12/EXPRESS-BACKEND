import express, { Application, Request, Response } from "express";

import axios from "axios";

const port: number = 1000;

const app: Application = express();

app.use(express.json());

app.get("/api/github", async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const url = `https://api.github.com/users/${name}`;

    const myData = await axios.get(url).then((res) => {
      return res.data;
    });

    return res.status(200).json({
      message: "Github Reading Access",
      data: myData,
    });
  } catch (error) {
    if (error) {
      res.write(`You are recieving a 404 message!`);
      res.end();
    } else {
      res.end();
    }
  }
});

app.listen(port, () => {
  console.log("Server is singing...");
});
