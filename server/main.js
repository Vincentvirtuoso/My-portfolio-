import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import { connectDB } from "./db.js";
import projectRoutes from "./routes/project.routes.js";
import aboutRoutes from "./routes/about.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import settingsRoutes from "./routes/settings.routes.js";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

// Setup CORS
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use("/api/about", aboutRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/settings", settingsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
