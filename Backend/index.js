import express, { urlencoded } from "express";
import cors from "cors";
import DbConnet from "./DB/db.connection.js";
import dotenv from "dotenv";
import router from "./Routes/route.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3006;

DbConnet();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "100kb" }));


app.use('/api', router)
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
