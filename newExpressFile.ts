//Updating, Deleting, Reading, Creating, Targeting One Single File...

import express, { Application, Request, Response } from "express";
import crypto from "crypto";

interface iData {
  id?: string;
  name?: string;
  price?: string;
}

const dataSet: iData[] = [];

const port: number = 1122;

const app: Application = express();

app.use(express.json());

//Reading

app.get("/", (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      message: "Reading from express file",
      data: dataSet,
    });
  } catch (error) {
    throw error;
  }
});

//Creating

app.post("/create", (req: Request, res: Response) => {
  try {
    const { name, price } = req.body;

    const Id = dataSet.length + 1;

    const newId = crypto.randomBytes(16).toString("hex");

    const newObj = {
      id: newId,
      name,
      price,
    };

    dataSet.push(newObj);

    return res.status(201).json({
      message: "Creating from express file",
      data: dataSet,
    });
  } catch (error) {
    throw error;
  }
});

// Targeting One Single File

app.get("/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const realData = dataSet.filter((el: iData) => {
      return el?.id === id;
    });

    return res.status(200).json({
      message: "Target a Single data from express file",
      data: realData,
    });
  } catch (error) {
    throw error;
  }
});

//Deleting

app.delete("/:id/delete", (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const realData = dataSet.filter((el: iData) => {
      return el?.id !== id;
    });

    return res.status(201).json({
      message: `Deleting '${id}' from express file`,
      data: realData,
    });
  } catch (error) {
    throw error;
  }
});

//Updating

app.patch("/:id/update", (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { name, price } = req.body;

    const realData = parseInt(id) - 1;

    dataSet[realData].name = name;
    dataSet[realData].price = price;

    return res.status(201).json({
      message: `Updating '${name} & ${price}' from express file`,
      data: dataSet,
    });
  } catch (error) {
    throw error;
  }
});

app.listen(port, () => {
  console.log("Server is listening to port: ", port);
});
