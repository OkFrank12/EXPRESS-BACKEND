import express, { Application, Request, Response } from "express";
import crypto from "crypto";
import axios from "axios";

interface iData {
  id?: string;
  price?: number;
  name?: string;
}

const dataSet: iData[] = [];

const port: number = 3344;

const app: Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response): Response => {
  try {
    return res.status(200).json({
      message: "create data",
      data: dataSet,
    });
  } catch (error) {
    throw error;
  }
});

app.post("/create", (req: Request, res: Response) => {
  try {
    const { name, price } = req.body; // or these: const body = req.body;

    const Id = dataSet.length + 1;

    const newId = crypto.randomUUID();

    const newId2 = crypto.randomBytes(16).toString("hex");

    // const newObj = { id: Id, name, price };
    const newObj = { id: newId, name, price };

    const addData = dataSet.push(newObj);

    return res.status(200).json({
      message: "create data",
      data: newObj,
    });
  } catch (error) {
    throw error;
  }
});
app.get("/:id/update", (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const newData = dataSet.filter((el: any) => {
      return id !== el?.id;
    });

    return res.status(200).json({
      message: "update data",
      data: newData,
    });
  } catch (error) {
    throw error;
  }
});

app.get("/api/github", async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const url = `https://api.github.com/users/${name}`;
    const myData = await axios.get(url).then((res) => {
      return res.data;
    });

    res.status(200).json({ message: "success", data: myData });
  } catch (error) {
    throw error;
  }
});

app.listen(port, () => {
  console.log("Server is on and listening to port.", port);
});
