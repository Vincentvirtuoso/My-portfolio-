import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const adminEmail = process.env.ADMIN_EMAIL;
const adminPasswordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (email !== adminEmail) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const isValid = await bcrypt.compare(password, adminPasswordHash);
  if (!isValid) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
  res.json({ token });
};
