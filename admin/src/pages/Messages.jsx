// pages/Messages.jsx
import { useState } from "react";
import {
  LuMail as Mail,
  LuCalendar as Calendar,
  LuStar as Star,
  LuArchive as Archive,
  LuTrash2 as Trash2,
} from "react-icons/lu";

const Messages = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      message:
        "Hi Alex, I came across your portfolio and I'm really impressed with your Web3 work. I'm looking for a developer to help build a DeFi dashboard for my startup. Would you be available for a chat next week?",
      date: "2024-03-15T10:30:00",
      read: false,
      starred: false,
      archived: false,
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@techventures.io",
      message:
        "Great portfolio! Your NFT marketplace project caught my attention. We're launching a new digital art platform and need a lead developer. Let me know if you're interested in discussing this opportunity.",
      date: "2024-03-14T15:45:00",
      read: true,
      starred: true,
      archived: false,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.r@creativestudio.com",
      message:
        "Love your design aesthetic! We're looking for a full-stack developer to join our creative agency. Your combination of technical skills and design sense would be a great fit. Are you open to freelance work?",
      date: "2024-03-13T09:15:00",
      read: false,
      starred: false,
      archived: false,
    },
    {
      id: 4,
      name: "David Kim",
      email: "david.k@blockchainfund.com",
      message:
        "Impressive Web3 experience! We're always looking for talented developers in the space. Would you be interested in auditing some smart contracts for our upcoming DeFi protocol?",
      date: "2024-03-12T11:20:00",
      read: true,
      starred: false,
      archived: true,
    },
  ]);

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filter, setFilter] = useState("inbox");

  const filteredMessages = messages.filter((msg) => {
    if (filter === "inbox") return !msg.archived;
    if (filter === "starred") return msg.starred && !msg.archived;
    if (filter === "archived") return msg.archived;
    return true;
  });

  const toggleStar = (id) => {
    setMessages(
      messages.map((msg) =>
        msg.id === id ? { ...msg, starred: !msg.starred } : msg,
      ),
    );
  };

  const toggleArchive = (id) => {
    setMessages(
      messages.map((msg) =>
        msg.id === id ? { ...msg, archived: !msg.archived } : msg,
      ),
    );
    if (selectedMessage?.id === id) setSelectedMessage(null);
  };

  const markAsRead = (id) => {
    setMessages(
      messages.map((msg) => (msg.id === id ? { ...msg, read: true } : msg)),
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Messages
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your contact form inquiries
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setFilter("inbox")}
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              filter === "inbox"
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            }`}
          >
            Inbox ({messages.filter((m) => !m.archived && !m.read).length})
          </button>
          <button
            onClick={() => setFilter("starred")}
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              filter === "starred"
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            }`}
          >
            Starred
          </button>
          <button
            onClick={() => setFilter("archived")}
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              filter === "archived"
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            }`}
          >
            Archived
          </button>
        </div>

        <div className="flex flex-col md:flex-row h-[600px]">
          {/* Messages List */}
          <div className="md:w-2/5 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                onClick={() => {
                  setSelectedMessage(message);
                  markAsRead(message.id);
                }}
                className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  selectedMessage?.id === message.id
                    ? "bg-purple-50 dark:bg-purple-900/20"
                    : ""
                } ${!message.read ? "bg-blue-50 dark:bg-blue-900/10" : ""}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {message.name.charAt(0)}
                    </div>
                    <div>
                      <h3
                        className={`font-semibold ${!message.read ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300"}`}
                      >
                        {message.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {message.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStar(message.id);
                    }}
                    className={`p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
                      message.starred ? "text-yellow-500" : "text-gray-400"
                    }`}
                  >
                    <Star
                      size={16}
                      fill={message.starred ? "currentColor" : "none"}
                    />
                  </button>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                  {message.message}
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 dark:text-gray-500">
                    {new Date(message.date).toLocaleDateString()}
                  </span>
                  {!message.read && (
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Message Detail */}
          <div className="md:w-3/5 p-6 overflow-y-auto">
            {selectedMessage ? (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Message Details
                  </h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleArchive(selectedMessage.id)}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                      <Archive size={20} />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {selectedMessage.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                        {selectedMessage.name}
                      </h3>
                      <a
                        href={`mailto:${selectedMessage.email}`}
                        className="text-purple-600 dark:text-purple-400 hover:underline"
                      >
                        {selectedMessage.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar size={16} />
                      <span>
                        {new Date(selectedMessage.date).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                    <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    Reply via Email
                  </button>
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                    Mark as Unread
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <Mail size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Select a message to view its contents</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
