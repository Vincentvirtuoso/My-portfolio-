import express from "express";
import {
  getSettings,
  updateSettings,
} from "../controllers/settings.controller.js";

const settingsRoutes = express.Router();

settingsRoutes.get("/", getSettings);
settingsRoutes.patch("/", updateSettings);

export default settingsRoutes;
