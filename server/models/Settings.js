import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema({
  siteTitle: { type: String, default: "Felix Vincent | Portfolio" },
  siteDescription: { type: String, default: "Full-Stack Developer" },
  theme: { type: String, enum: ["light", "dark", "system"], default: "system" },
  showAnalytics: { type: Boolean, default: true },
  enableComments: { type: Boolean, default: false },
  maintenanceMode: { type: Boolean, default: false },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Settings", SettingsSchema);
