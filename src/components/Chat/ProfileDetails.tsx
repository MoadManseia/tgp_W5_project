import React from "react";
import type { Chat } from "../../pages/Dashboard";

type ProfileDetailsProps = {
  chat: Chat | null;
};

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ chat }) => {
  if (!chat) return null;

  // Mocked details for now – in a real app these would come from your backend
  const lastActiveMinutes = chat.lastActiveMinutes ?? 12;
  const phone = chat.phone ?? "+1 (555) 123-4567";
  const email =
    chat.email ??
    `${chat.name?.toLowerCase().replace(/\s+/g, ".")}@example.com`;

  return (
    <aside
      className=" lg:block md:hidden w-72 border-l border-gray-200 bg-white flex-shrink-0 px-5 py-6 space-y-6"
      style={{ fontFamily: "Roboto, Arial, sans-serif" }}
    >
      {/* Profile section */}
      <section className="grid grid-rows-2 gap-3">
        <div className="flex items-center gap-3 row-span-2">
          {chat.profilePic ? (
            <img
              src={chat.profilePic}
              alt={chat.name}
              className="w-14 h-14 rounded-full object-cover"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-lg font-medium text-blue-600">
                {chat.name?.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <h3 className="text-sm font-medium text-gray-900">{chat.name}</h3>
            <p className="text-xs text-gray-500">Conversation details</p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-b border-gray-200" />

      {/* Last active section */}
      <section className="grid grid-rows-2 gap-1">
        <h4 className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
          Last Active
        </h4>
        <p className="text-sm text-gray-800">{lastActiveMinutes} minutes ago</p>
      </section>

      {/* Divider */}
      <div className="border-b border-gray-200" />

      {/* Contact information */}
      <section className="space-y-3">
        <h4 className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
          Contact Information
        </h4>
        <div className="grid grid-rows-2 gap-2 text-sm">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Phone</span>
            <span className="text-gray-800">{phone}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Email</span>
            <span className="text-gray-800 break-all">{email}</span>
          </div>
        </div>
      </section>
    </aside>
  );
};

export default ProfileDetails;
