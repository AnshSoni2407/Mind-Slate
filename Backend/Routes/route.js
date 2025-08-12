import express from "express";
import {
  createData,
  getData,
  updateData,
  deleteData,
  deleteAllData,
} from "../Controllers/controller.js";

const router = express.Router();

router.post("/userdata", createData);
router.get("/getuser", getData);
router.put("/getuser/:id", updateData);
router.delete("/delete/:id", deleteData);

router.delete("/deleteAll", deleteAllData);
export default router;
