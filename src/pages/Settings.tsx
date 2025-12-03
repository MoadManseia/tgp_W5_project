import React, { useState } from "react";
import {
  UserIcon,
  BellIcon,
  ArrowLeftIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import type { AppUser } from "../App";

type SettingsPageProps = {
  user: AppUser;
  onLogout: () => void;
  onBackToDashboard: () => void;
};

type SettingsState = {
  notifications: boolean;
  sound: boolean;
  darkMode: boolean;
};

const SettingsPage: React.FC<SettingsPageProps> = ({
  user,
  onLogout,
  onBackToDashboard,
}) => {
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [focusedField, setFocusedField] = useState<"name" | "email" | null>(
    null
  );
  const [settings, setSettings] = useState<SettingsState>({
    notifications: true,
    sound: true,
    darkMode: false,
  });

  const handleSettingChange = <K extends keyof SettingsState>(
    key: K,
    value: SettingsState[K]
  ) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50 h-full overflow-hidden">
      {/* Fixed Header */}
      <div className="flex-shrink-0 bg-gray-50 border-b border-gray-200 px-6 py-4 z-10">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToDashboard}
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-gray-300 bg-white hover:bg-gray-100 text-gray-600 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Settings</h1>
            <p className="text-gray-600">
              Manage your account preferences and settings
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 max-w-4xl mx-auto">
          {/* Profile Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <UserIcon className="w-5 h-5" />
              Profile Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={profile.email}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
                  placeholder="your@email.com"
                />
              </div>
            </div>
          </div>

          {/* Logout Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            
            <p className="text-sm text-gray-600 mb-4">
              You can log back in at any time.
            </p>
            {/* Logout Action */}
            <div>
              <button
                type="button"
                onClick={onLogout}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors"
              >
                <ArrowLeftOnRectangleIcon className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
