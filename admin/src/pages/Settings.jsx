// pages/Settings.jsx
import React, { useState, useEffect } from "react";
import {
  LuLink as LinkIcon,
  LuSave as Save,
  LuUpload as Upload,
  LuTwitter as Twitter,
  LuGithub as Github,
  LuLinkedin as Linkedin,
  LuClock,
  LuPlus,
  LuTrash2,
} from "react-icons/lu";
import { useAbout } from "../hooks/useAbout";
import { useSettings } from "../hooks/useSettings";
import { useImageUpload } from "../hooks/useImageUpload";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/loaders/Spinner";

const Settings = () => {
  const { user } = useAuth();
  const { about, loading: aboutLoading, updateAbout, fetchAbout } = useAbout();

  const {
    settings,
    loading: settingsLoading,
    saveSettings,
    fetchSettings,
  } = useSettings();

  const { uploading, uploadImage } = useImageUpload();

  // Local state for forms
  const [profile, setProfile] = useState({
    name: "",
    role: "",
    bio: [],
    email: "",
    location: "",
    avatar: "",
    availability: "",
  });

  const [stats, setStats] = useState({
    yearsExperience: 0,
    projectsCompleted: 0,
    teamProjects: 0,
    commitment: 100,
  });

  const [socialLinks, setSocialLinks] = useState({
    github: "",
    twitter: "",
    linkedin: "",
  });

  const [siteSettings, setSiteSettings] = useState({
    siteTitle: "",
    siteDescription: "",
    theme: "system",
    showAnalytics: true,
    enableComments: false,
    maintenanceMode: false,
  });

  const [availability, setAvailability] = useState({
    workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    slots: [],
    newSlot: "",
  });

  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(null);

  // Load data from APIs
  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchAbout(), fetchSettings()]);
    };
    loadData();
  }, []);

  // Update local state when about data loads
  useEffect(() => {
    if (about) {
      setProfile({
        name: about.name || "",
        role: about.role || "",
        bio: about.bio || [],
        email: user?.email || "",
        location: about.location || "",
        avatar: about.avatar || "",
        availability: about.availability || "",
      });

      setStats({
        yearsExperience: about.stats?.yearsExperience || 0,
        projectsCompleted: about.stats?.projectsCompleted || 0,
        teamProjects: about.stats?.teamProjects || 0,
        commitment: about.stats?.commitment || 100,
      });

      setAvailability((prev) => ({
        ...prev,
        slots: about.availabilitySlots || [],
      }));

      // Extract social links from about if they exist
      setSocialLinks({
        github: about.socialLinks?.github || "",
        twitter: about.socialLinks?.twitter || "",
        linkedin: about.socialLinks?.linkedin || "",
      });
    }
  }, []);

  // Update local state when settings data loads
  useEffect(() => {
    if (settings) {
      setSiteSettings({
        siteTitle: settings.siteTitle || "",
        siteDescription: settings.siteDescription || "",
        theme: settings.theme || "system",
        showAnalytics: settings.showAnalytics || true,
        enableComments: settings.enableComments || false,
        maintenanceMode: settings.maintenanceMode || false,
      });
    }
  }, [settings]);

  const addSlot = () => {
    if (
      availability.newSlot &&
      !availability.slots.includes(availability.newSlot)
    ) {
      setAvailability({
        ...availability,
        slots: [...availability.slots, availability.newSlot].sort(),
        newSlot: "",
      });
    }
  };

  const removeSlot = (slotToRemove) => {
    setAvailability({
      ...availability,
      slots: availability.slots.filter((s) => s !== slotToRemove),
    });
  };

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleStatsChange = (e) => {
    setStats({ ...stats, [e.target.name]: parseInt(e.target.value) || 0 });
  };

  const handleSocialChange = (e) => {
    setSocialLinks({ ...socialLinks, [e.target.name]: e.target.value });
  };

  const handleSiteSettingChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setSiteSettings({ ...siteSettings, [e.target.name]: value });
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const result = await uploadImage(file, 1);
    if (result.success) {
      setProfile({ ...profile, avatar: result.url });
    }
  };

  const handleBioArrayUpdate = (bioText) => {
    // Convert bio textarea input to array format
    const bioArray = bioText.split("\n").filter((line) => line.trim() !== "");
    setProfile({ ...profile, bio: bioArray });
  };

  const handleSaveAll = async () => {
    setSaving(true);
    setSaveSuccess(false);
    setSaveError(null);

    try {
      const aboutUpdate = {
        name: profile.name,
        role: profile.role,
        bio: profile.bio,
        location: profile.location,
        avatar: profile.avatar,
        availability: profile.availability,
        stats: stats,
        socialLinks: socialLinks,
        availabilitySlots: availability.slots,
      };

      const aboutResult = await updateAbout(aboutUpdate);

      if (!aboutResult.success) {
        throw new Error(aboutResult.error);
      }

      // Update Settings document
      const settingsResult = await saveSettings(siteSettings);

      if (!settingsResult.success) {
        throw new Error("Failed to save site settings");
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setSaveError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const isLoading = aboutLoading || settingsLoading;

  if (isLoading) {
    return (
      <div className="p-6 max-w-4xl mx-auto flex items-center justify-center min-h-[400px]">
        <div className="text-gray-600 dark:text-gray-400">
          Loading settings...
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your profile and site preferences
        </p>
      </div>

      {saveSuccess && (
        <div className="mb-4 p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg">
          Settings saved successfully!
        </div>
      )}

      {saveError && (
        <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg">
          Error: {saveError}
        </div>
      )}

      <div className="space-y-6">
        {/* Profile Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
            Profile Information
          </h2>

          {/* Avatar Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Profile Picture
            </label>
            <div className="flex items-center space-x-4">
              <img
                src={profile.avatar || "/images/profile.png"}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
              />
              <div>
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
                <label
                  htmlFor="avatar-upload"
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                >
                  {uploading ? <Spinner size="sm" /> : <Upload size={18} />}
                  <span>{uploading ? "Uploading..." : "Upload New"}</span>
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Professional Role
              </label>
              <input
                type="text"
                name="role"
                value={profile.role}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Bio (one paragraph per line)
              </label>
              <textarea
                name="bio"
                value={profile.bio.join("\n")}
                onChange={(e) => handleBioArrayUpdate(e.target.value)}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={profile.location}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Availability Status
              </label>
              <input
                type="text"
                name="availability"
                value={profile.availability}
                onChange={handleProfileChange}
                placeholder="Available for remote work"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
            Professional Stats
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Years of Experience
              </label>
              <input
                type="number"
                name="yearsExperience"
                value={stats.yearsExperience}
                onChange={handleStatsChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Projects Completed
              </label>
              <input
                type="number"
                name="projectsCompleted"
                value={stats.projectsCompleted}
                onChange={handleStatsChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Team Projects
              </label>
              <input
                type="number"
                name="teamProjects"
                value={stats.teamProjects}
                onChange={handleStatsChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Commitment %
              </label>
              <input
                type="number"
                name="commitment"
                value={stats.commitment}
                onChange={handleStatsChange}
                min="0"
                max="100"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Availability Settings Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-2 mb-6">
            <LuClock className="text-purple-600" size={24} />
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Booking & Availability
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Slot Manager */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Available Daily Time Slots
              </label>
              <div className="flex gap-2 mb-4">
                <input
                  type="time"
                  value={availability.newSlot}
                  onChange={(e) =>
                    setAvailability({
                      ...availability,
                      newSlot: e.target.value,
                    })
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                />
                <button
                  onClick={addSlot}
                  className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <LuPlus size={20} />
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {availability.slots.map((slot) => (
                  <div
                    key={slot}
                    className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full text-sm"
                  >
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      {slot}
                    </span>
                    <button
                      onClick={() => removeSlot(slot)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <LuTrash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <h2 className="my-3 text-sm">Working Days</h2>
              <div className="flex flex-wrap gap-2 mt-4">
                {availability.workingDays.map((slot) => (
                  <div
                    key={slot}
                    className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full text-sm"
                  >
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      {slot}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* General Rules */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Booking Buffer (Minutes)
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none">
                  <option value="15">15 Minutes</option>
                  <option value="30">30 Minutes</option>
                  <option value="60">1 Hour</option>
                </select>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 rounded-xl">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  <strong>Note:</strong> These slots will be available for
                  clients to pick from on your public booking page.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
            Social Links
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <div className="flex items-center space-x-2">
                  <Github size={16} />
                  <span>GitHub</span>
                </div>
              </label>
              <div className="flex items-center space-x-2">
                <LinkIcon size={18} className="text-gray-400" />
                <input
                  type="url"
                  name="github"
                  value={socialLinks.github}
                  onChange={handleSocialChange}
                  placeholder="https://github.com/username"
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <div className="flex items-center space-x-2">
                  <Twitter size={16} />
                  <span>Twitter</span>
                </div>
              </label>
              <div className="flex items-center space-x-2">
                <LinkIcon size={18} className="text-gray-400" />
                <input
                  type="url"
                  name="twitter"
                  value={socialLinks.twitter}
                  onChange={handleSocialChange}
                  placeholder="https://twitter.com/username"
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <div className="flex items-center space-x-2">
                  <Linkedin size={16} />
                  <span>LinkedIn</span>
                </div>
              </label>
              <div className="flex items-center space-x-2">
                <LinkIcon size={18} className="text-gray-400" />
                <input
                  type="url"
                  name="linkedin"
                  value={socialLinks.linkedin}
                  onChange={handleSocialChange}
                  placeholder="https://linkedin.com/in/username"
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Site Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
            Site Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Site Title
              </label>
              <input
                type="text"
                name="siteTitle"
                value={siteSettings.siteTitle}
                onChange={handleSiteSettingChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Site Description
              </label>
              <input
                type="text"
                name="siteDescription"
                value={siteSettings.siteDescription}
                onChange={handleSiteSettingChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Default Theme
              </label>
              <select
                name="theme"
                value={siteSettings.theme}
                onChange={handleSiteSettingChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System Default</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Show Analytics
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Display visitor analytics on dashboard
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="showAnalytics"
                  checked={siteSettings.showAnalytics}
                  onChange={handleSiteSettingChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Enable Comments
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Allow comments on blog posts
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="enableComments"
                  checked={siteSettings.enableComments}
                  onChange={handleSiteSettingChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Maintenance Mode
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Make site temporarily unavailable
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="maintenanceMode"
                  checked={siteSettings.maintenanceMode}
                  onChange={handleSiteSettingChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={20} />
            <span>{saving ? "Saving..." : "Save All Changes"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
