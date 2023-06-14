import express, { Application, Request, Response } from "express";
import crypto from "crypto";
import axios from "axios";

interface iData {
  id?: string;
  name?: string;
  price?: number;
}

const dataSet: iData[] = [];

const port: number = 4443;

const app: Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      message: "Reading express",
      data: dataSet,
    });
  } catch (error) {
    throw error;
  }
});

app.post("/create", (req: Request, res: Response) => {
  try {
    const { name, price } = req.body;

    const ID = dataSet.length + 1;

    const newID = crypto.randomUUID();

    const newID2 = crypto.randomBytes(16).toString("hex");

    const newObj: any = {
      id: newID,
      name,
      price,
    };
    dataSet.push(newObj);

    return res.status(201).json({
      message: "Writing express",
      data: dataSet,
    });
  } catch (error) {
    throw error;
  }
});

app.get("/:id/getting", (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    let realData = dataSet.filter((el: any) => {
      return id === el?.id;
    });

    return res.status(200).json({
      message: "Get one express data",
      data: realData,
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

    return res.status(200).json({
      message: "Reading from Github",
      data: myData,
    });
  } catch (error) {
    throw error;
  }
});

app.delete("/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const realData = dataSet.filter((el: any) => {
      return el?.id !== id;
    });

    return res.status(201).json({
      message: `Deleting '${id}' from express`,
      data: realData,
    });
  } catch (error) {
    throw error;
  }
});

app.patch("/:id", (req: Request, res: Response) => {
  // const { id } = req.params;

  // const { price, name } = req.body;

  // const newID = parseInt(id) - 1;

  // dataSet[newID].name = name;
  // dataSet[newID].price = price;

  const { id } = req.params;
  const { price, name } = req.body;

  const newId = parseInt(id) - 1;

  dataSet[newId].name = name;
  dataSet[newId].price = price;

  return res.status(201).json({
    message: `Updating '${name} & ${price}' from express`,
    data: dataSet,
  });
});

app.listen(port, () => {
  console.log("Server is tuning", port);
});
