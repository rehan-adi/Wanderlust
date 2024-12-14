"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

const Settings = () => {
  const [showHistory, setShowHistory] = useState<boolean>(false);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 py-8">
      <h1 className="text-3xl font-semibold text-black">Settings</h1>

      {/* Data Usage Section */}
      <section className="mt-8 bg-white shadow-lg border rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-black">Data Usage</h2>
        <div className="mt-4 space-y-2">
          <p className="text-gray-700">
            Total images generated: <strong>25</strong>
          </p>
          <p className="text-gray-700">
            Remaining credits: <strong>Unlimited</strong>
          </p>
        </div>
      </section>

      {/* Chat History Section */}
      <section className="mt-8 bg-white shadow-lg border rounded-xl px-6 py-4">
        <h2 className="text-2xl font-semibold text-black">Chat History</h2>
        <div className="mt-4 flex items-center space-x-2">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-gray-600 hover:text-gray-900 flex items-center space-x-2"
          >
            {showHistory ? (
              <>
                <ChevronUp size={20} />
                <span className="text-gray-600">Hide chat history</span>
              </>
            ) : (
              <>
                <ChevronDown size={20} />
                <span className="text-gray-600">Show chat history</span>
              </>
            )}
          </button>
        </div>
        <div
          className={`mt-4 transition-all duration-500 ease-in-out ${
            showHistory ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          {showHistory && (
            <div className="mt-6 border-t border-gray-300 pt-4">
              <ul className="space-y-3">
                <li className="flex justify-between items-center">
                  <span className="text-gray-800">
                    Prompt: Sunset over the mountains
                  </span>
                  <button className="text-sm text-blue-500">View</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Settings;
