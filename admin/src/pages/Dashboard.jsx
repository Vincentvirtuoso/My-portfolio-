import { useState } from "react";
import {
  LuTrendingUp as TrendingUp,
  LuMessageCircle as MessageCircle,
  LuFolderOpen as FolderOpen,
  LuEye as Eye,
  LuArrowUp as ArrowUp,
  LuArrowDown as ArrowDown,
} from "react-icons/lu";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProjects: 24,
    totalVisitors: 15420,
    messagesReceived: 48,
    totalViews: 45231,
  });

  const [recentMessages, setRecentMessages] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      message: "Interested in your Web3 development services...",
      date: "2 hours ago",
      status: "unread",
    },
    {
      id: 2,
      name: "Michael Chen",
      message: "Great portfolio! Would love to discuss a project...",
      date: "5 hours ago",
      status: "read",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      message: "Looking for a full-stack developer for startup...",
      date: "1 day ago",
      status: "unread",
    },
  ]);

  const [recentProjects, setRecentProjects] = useState([
    { id: 1, title: "DeFi Dashboard", status: "completed", views: 1234 },
    { id: 2, title: "NFT Marketplace", status: "in-progress", views: 892 },
    { id: 3, title: "Portfolio 3.0", status: "draft", views: 456 },
  ]);

  const StatCard = ({ title, value, icon: Icon, change, changeType }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
          <Icon className="text-purple-600 dark:text-purple-400" size={24} />
        </div>
        {change && (
          <div
            className={`flex items-center space-x-1 text-sm ${
              changeType === "positive" ? "text-green-600" : "text-red-600"
            }`}
          >
            {changeType === "positive" ? (
              <ArrowUp size={16} />
            ) : (
              <ArrowDown size={16} />
            )}
            <span>{change}%</span>
          </div>
        )}
      </div>
      <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-800 dark:text-white">
        {value.toLocaleString()}
      </p>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Welcome back, Alex! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here's what's happening with your portfolio today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Projects"
          value={stats.totalProjects}
          icon={FolderOpen}
          change="12"
          changeType="positive"
        />
        <StatCard
          title="Total Visitors"
          value={stats.totalVisitors}
          icon={Eye}
          change="8"
          changeType="positive"
        />
        <StatCard
          title="Messages"
          value={stats.messagesReceived}
          icon={MessageCircle}
          change="5"
          changeType="negative"
        />
        <StatCard
          title="Profile Views"
          value={stats.totalViews}
          icon={TrendingUp}
          change="23"
          changeType="positive"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Messages */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Recent Messages
          </h2>
          <div className="space-y-4">
            {recentMessages.map((message) => (
              <div
                key={message.id}
                className="flex items-start space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <div
                  className={`w-2 h-2 mt-2 rounded-full ${message.status === "unread" ? "bg-purple-500" : "bg-gray-300"}`}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      {message.name}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {message.date}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                    {message.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 text-purple-600 dark:text-purple-400 text-sm font-medium hover:underline">
            View all messages →
          </button>
        </div>

        {/* Recent Projects */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Recent Projects
          </h2>
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-1">
                    {project.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        project.status === "completed"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : project.status === "in-progress"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400"
                      }`}
                    >
                      {project.status}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {project.views} views
                    </span>
                  </div>
                </div>
                <button className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300">
                  Edit
                </button>
              </div>
            ))}
          </div>
          <button className="mt-4 text-purple-600 dark:text-purple-400 text-sm font-medium hover:underline">
            Manage all projects →
          </button>
        </div>
      </div>

      {/* Activity Chart Placeholder */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Visitor Activity
        </h2>
        <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">
            Chart component would go here (using Recharts or similar)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
