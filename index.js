import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { MongoClient } from "mongodb";
import { usersRouter } from "./user.js";

dotenv.config();

const app = express();
// const PORT = 9000;
const PORT = process.env.PORT;

// const MONGO_URL = "mongodb://localhost";
const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is connected");
  return client;
}

export const client = await createConnection();

app.use(express.json());
app.use(cors());

app.get("/", (request, response) => {
  response.send("Hello!");
});

app.use("/users", usersRouter);

app.listen(PORT, () => console.log("SERVER STARTED ON PORT", PORT));
