import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema({
  // ─── Basic Info ───────────────────────────────────────────────
  name: { type: String, required: true, default: "Felix Vincent" },
  role: { type: String, required: true },
  email: { type: String, required: true },
  bio: [{ type: String, required: true }],
  location: { type: String, default: "Lagos, Nigeria" },
  avatar: { type: String },
  availability: { type: String, default: "Available for remote work" },
  availabilitySlots: {
    type: [String],
    default: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
  },

  stats: {
    yearsExperience: { type: Number, default: 3 },
    projectsCompleted: { type: Number, default: 10 },
    teamProjects: { type: Number, default: 4 },
    commitment: { type: Number, default: 100 },
  },

  coreValues: [
    {
      icon: { type: String, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
    },
  ],

  technicalSkills: [
    {
      skill: { type: String, required: true },
      level: { type: Number, required: true, min: 0, max: 100 },
      icon: { type: String },
      categories: { type: [String], default: [] },
    },
  ],

  socialLinks: {
    github: { type: String },
    twitter: { type: String },
    linkedin: { type: String },
  },

  specializations: [
    {
      category: { type: String, required: true },
      icon: { type: String, required: true },
      title: { type: String, required: true },
      items: [{ type: String, required: true }],
    },
  ],

  timeline: [
    {
      year: { type: String, required: true },
      title: { type: String, required: true },
      company: { type: String },
      description: { type: String, required: true },
      type: {
        type: String,
        enum: ["work", "education", "project"],
        default: "work",
      },
    },
  ],

  currentFocus: { type: String, required: true },

  tools: [
    {
      icon: { type: String, required: true },
      title: { type: String, required: true },
      level: { type: Number, required: true, min: 0, max: 100 },
    },
  ],

  services: [
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: String },
    },
  ],

  developmentPhilosophy: [
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
    },
  ],

  // ─── Meta ─────────────────────────────────────────────────────
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("About", AboutSchema);
