// http://api.weatherapi.com/v1/current.json?key=67533b357bb14164adc202331230506&q=Lagos&aqi=yes  //Humidity
// http://api.weatherapi.com/v1/current.json?key=67533b357bb14164adc202331230506&q=Lagos&aqi=yes  //Temperature
// http://api.weatherapi.com/v1/current.json?key=67533b357bb14164adc202331230506&q=Lagos&aqi=yes  //Pressure

import express, { Application, Request, Response } from "express";

import axios from "axios";

const port: number = 2101;

const app: Application = express();

app.use(express.json());

app.get("/api/weather", async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    // const url = `http://api.weatherapi.com/v1/current.json?key=67533b357bb14164adc202331230506&q=${name}&aqi=yes`;
    // const url = `http://api.weatherapi.com/v1/current.json?key=67533b357bb14164adc202331230506&q=${name}&aqi=yes`;
    const url = `http://api.weatherapi.com/v1/current.json?key=67533b357bb14164adc202331230506&q=${name}&aqi=yes`;

    const aData = await axios.get(url).then((res) => {
      return res.data;
    });

    return res.status(200).json({
      message: "Reading Temperature API",
      data: aData,
    });
  } catch (error) {
    throw error;
  }
});

app.listen(port, () => {
  console.log("Server is listening to: ", port);
});
