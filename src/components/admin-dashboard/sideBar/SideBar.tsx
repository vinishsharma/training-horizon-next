"use client";

import Image from "next/image";
import { useState } from "react";

interface ChildComponentProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}
const Sidebar: React.FC<ChildComponentProps> = ({ value, setValue }) => {
  const [activeButton, setActiveButton] = useState<string | null>("Dashboard");
  const [isListingOpen, setIsListingOpen] = useState(false);

  const handleClick = (button: string) => {
    setActiveButton(button);
    if (button === "Listing") {
      setIsListingOpen(!isListingOpen);
    } else {
      setIsListingOpen(false);
    }
  };

  return (
    <aside className="bg-blue-50 p-4 w-64">
      <div className="mb-12 flex justify-center">
        <Image
          src="/img/dashboard/logo.svg"
          alt="Logo"
          width={180}
          height={120}
        />
      </div>

      <nav>
        <ul>
          <li className="mb-2">
            <button
              onClick={() => {
                handleClick("Profile");
              }}
              className={`flex flex-row rounded-lg w-full p-2 ${
                activeButton === "Profile"
                  ? "bg-[#17A8FC] text-white"
                  : " text-black"
              }`}
            >
              <img
                className="mx-2"
                src="/img/dashboard/profile.svg"
                alt="dashboardlogo"
              />
              Profile
            </button>
          </li>
          <li className="mb-2">
            <button
              onClick={() => {
                handleClick("Dashboard");
                setValue("dashboard");
              }}
              className={`flex flex-row rounded-lg w-full p-2 ${
                activeButton === "Dashboard"
                  ? "bg-[#17A8FC] text-white"
                  : " text-black"
              }`}
            >
              <img
                className="mx-2"
                src="/img/dashboard/dashboardlogo.svg"
                alt="dashboardlogo"
              />
              Dashboard
            </button>
          </li>
          <li className="mb-2">
            <div className="relative text-left">
              <button
                onClick={() => {
                  handleClick("Listing");
                }}
                className={`flex flex-row rounded-lg w-full p-2 ${
                  activeButton === "Listing"
                    ? "bg-[#17A8FC] text-white"
                    : " text-black"
                }`}
              >
                <img
                  className="mx-2"
                  src="/img/dashboard/profile.svg"
                  alt="dashboardlogo"
                />
                Listing
              </button>

              {isListingOpen && (
                <div className="absolute left-full top-0 ml-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setValue("listings")}
                  >
                    Listings
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setValue("trainers")}
                  >
                    Trainers
                  </button>
                </div>
              )}
            </div>
          </li>
        </ul>
      </nav>

      <nav>
        <ul>
          <li className="mb-2 mt-2 w-48">
            <button
              onClick={() => handleClick("Account Setting")}
              className={`flex flex-row rounded-lg w-full p-2 ${
                activeButton === "Account Setting"
                  ? "bg-[#17A8FC] text-white"
                  : " text-black"
              }`}
            >
              <img
                className="mx-2"
                src="/img/dashboard/setting.svg"
                alt="dashboardlogo"
              />
              Account Setting
            </button>
          </li>
          <li className="mb-2">
            <button
              onClick={() => handleClick("Log Out")}
              className={`flex flex-row rounded-lg w-full p-2 ${
                activeButton === "Log Out"
                  ? "bg-[#17A8FC] text-white"
                  : " text-black"
              }`}
            >
              <img
                className="mx-2"
                src="/img/dashboard/logout.svg"
                alt="dashboardlogo"
              />
              Log Out
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
