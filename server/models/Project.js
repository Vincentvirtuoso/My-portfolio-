// server/models/Project.js
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },
    tagline: {
      type: String,
      required: [true, "Project tagline is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Project category is required"],
      enum: ["Web App", "Mobile App", "Web3", "AI/ML", "Design", "Other"],
    },
    date: {
      type: String,
      required: [true, "Project date is required"],
    },
    role: {
      type: String,
      required: [true, "Your role is required"],
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["In Progress", "Completed", "On Hold", "Draft"],
      default: "Draft",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      required: [true, "Main project image is required"],
    },
    gallery: [
      {
        type: String,
      },
    ],
    tech: [
      {
        name: String,
        icon: String,
      },
    ],
    collaborators: [
      {
        name: String,
        role: String,
        link: String,
      },
    ],
    github: {
      type: String,
      match: [
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
        "Please enter a valid URL",
      ],
    },
    live: {
      type: String,
      match: [
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
        "Please enter a valid URL",
      ],
    },
    details: {
      longDescription: {
        type: String,
        required: [true, "Long description is required"],
      },
      features: [String],
      architecture: {
        frontend: String,
        backend: String,
        database: String,
        hosting: String,
      },
      challenges: String,
      outcome: String,
      lessonsLearned: [String],
      tags: [String],
    },
    // createdBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
  },
  {
    timestamps: true,
  },
);

projectSchema.index({
  title: "text",
  "details.longDescription": "text",
  "details.tags": "text",
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
