import About from "../models/About.js";

export const getAbout = async (req, res) => {
  try {
    let about = await About.findOne();

    if (!about) {
      about = await About.create({
        name: "Felix Vincent",
        role: "Full-Stack Developer & Web3 Engineer",
        location: "Lagos, Nigeria",
        bio: [
          "I specialize in building modern web applications with React, Node.js, and cloud technologies.",
          "Passionate about clean code, intuitive design, and scalable architecture with a growing focus on decentralized systems.",
        ],
        stats: {
          yearsExperience: 3,
          projectsCompleted: 10,
          teamProjects: 4,
          commitment: 100,
        },
        technicalSkills: [
          {
            skill: "React.js",
            level: 90,
            icon: "FaReact",
            category: "frontend",
          },
          {
            skill: "JavaScript",
            level: 95,
            icon: "FaJs",
            category: "frontend",
          },
          {
            skill: "Node.js",
            level: 90,
            icon: "FaNodeJs",
            category: "backend",
          },
          {
            skill: "Next.js",
            level: 75,
            icon: "SiNextdotjs",
            category: "frontend",
          },
          {
            skill: "Solidity",
            level: 70,
            icon: "SiSolidity",
            category: "web3",
          },
          {
            skill: "MongoDB",
            level: 80,
            icon: "SiMongodb",
            category: "backend",
          },
        ],
        tools: [
          { icon: "SiGit", title: "Git & GitHub" },
          { icon: "SiFigma", title: "Figma" },
          { icon: "SiPostman", title: "Postman" },
        ],
        timeline: [
          {
            year: "2021",
            title: "The Beginning",
            description: "Mastered HTML, CSS, and JS fundamentals.",
          },
          {
            year: "2022",
            title: "Full-Stack Shift",
            description: "Deep dive into React and Node.js ecosystem.",
          },
          {
            year: "2024",
            title: "Web3 & Scale",
            description: "Focusing on Blockchain and System Design.",
          },
        ],
        coreValues: [
          {
            icon: "FaLightbulb",
            title: "Innovation",
            description: "Exploring new tech and creative solutions.",
          },
          {
            icon: "FaChartLine",
            title: "Performance",
            description: "Optimizing for speed and efficiency.",
          },
        ],
        developmentPhilosophy: [
          {
            title: "Clean Code",
            description: "Readable, maintainable, and scalable architecture.",
          },
          {
            title: "User First",
            description: "Prioritizing accessibility and intuitive UX.",
          },
        ],
        currentFocus:
          "Building decentralized applications and exploring Layer 2 solutions",
      });
    }
    res.json(about);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Failed to fetch about information" });
  }
};

export const updateAbout = async (req, res) => {
  try {
    let about = await About.findOne();

    if (!about) {
      // Create new if doesn't exist
      about = new About(req.body);
    } else {
      // Update existing
      Object.assign(about, req.body);
    }

    about.updatedAt = Date.now();
    await about.save();

    res.json({
      success: true,
      message: "About information updated successfully",
      about,
    });
  } catch (error) {
    console.error("Update about error:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to update about information" });
  }
};

export const updateSection = async (req, res) => {
  try {
    const { section } = req.params;
    const updates = req.body;

    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({ error: "About information not found" });
    }

    // Update the specific section
    about[section] = updates;
    about.updatedAt = Date.now();
    await about.save();

    res.json({
      success: true,
      message: `${section} updated successfully`,
      [section]: about[section],
    });
  } catch (error) {
    console.error("Update section error:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to update section" });
  }
};

export const addArrayItem = async (req, res) => {
  try {
    const { section } = req.params;
    const newItem = req.body;

    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({ error: "About information not found" });
    }

    // Add to the specified array field
    if (!Array.isArray(about[section])) {
      return res.status(400).json({ error: `${section} is not an array` });
    }

    about[section].push(newItem);
    about.updatedAt = Date.now();
    await about.save();

    res.status(201).json({
      success: true,
      message: `Item added to ${section}`,
      item: newItem,
      [section]: about[section],
    });
  } catch (error) {
    console.error("Add array item error:", error);
    res.status(500).json({ error: error.message || "Failed to add item" });
  }
};

export const updateArrayItem = async (req, res) => {
  try {
    const { section, index } = req.params;
    const updates = req.body;
    const itemIndex = parseInt(index);

    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({ error: "About information not found" });
    }

    if (!Array.isArray(about[section])) {
      return res.status(400).json({ error: `${section} is not an array` });
    }

    if (itemIndex < 0 || itemIndex >= about[section].length) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Update the specific item
    about[section][itemIndex] = {
      ...about[section][itemIndex].toObject(),
      ...updates,
    };

    about.updatedAt = Date.now();
    await about.save();

    res.json({
      success: true,
      message: `Item updated in ${section}`,
      item: about[section][itemIndex],
      [section]: about[section],
    });
  } catch (error) {
    console.error("Update array item error:", error);
    res.status(500).json({ error: error.message || "Failed to update item" });
  }
};

export const deleteArrayItem = async (req, res) => {
  try {
    const { section, index } = req.params;
    const itemIndex = parseInt(index);

    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({ error: "About information not found" });
    }

    if (!Array.isArray(about[section])) {
      return res.status(400).json({ error: `${section} is not an array` });
    }

    if (itemIndex < 0 || itemIndex >= about[section].length) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Remove the item
    about[section].splice(itemIndex, 1);
    about.updatedAt = Date.now();
    await about.save();

    res.json({
      success: true,
      message: `Item removed from ${section}`,
      [section]: about[section],
    });
  } catch (error) {
    console.error("Delete array item error:", error);
    res.status(500).json({ error: error.message || "Failed to delete item" });
  }
};

export const updateStats = async (req, res) => {
  try {
    const updates = req.body;

    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({ error: "About information not found" });
    }

    // Update stats while preserving other fields
    about.stats = {
      ...about.stats.toObject(),
      ...updates,
    };

    about.updatedAt = Date.now();
    await about.save();

    res.json({
      success: true,
      message: "Stats updated successfully",
      stats: about.stats,
    });
  } catch (error) {
    console.error("Update stats error:", error);
    res.status(500).json({ error: error.message || "Failed to update stats" });
  }
};
