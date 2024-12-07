"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { X, Loader2 } from "lucide-react";

const Signin: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSignIn = async (provider: string) => {
    setLoading(provider);
    try {
      await signIn(provider);
    } catch (error) {
      console.error("Sign-in error:", error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-opacity-70 bg-[#E0E0E0] flex justify-center items-center transition-all px-3 duration-300">
      <div className="bg-[#F7F7F7] p-6 rounded-2xl w-[400px] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black w-8 h-8 flex justify-center items-center hover:bg-gray-200 hover:rounded-full transition"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold text-center text-black my-10">
          Sign In to continue
        </h2>

        {/* Sign-In Buttons */}
        <div className="space-y-3">
          <button
            disabled={loading === "google"}
            onClick={() => handleSignIn("google")}
            className={`w-full px-4 py-4 bg-[#16181D] border border-white border-opacity-10 text-white font-semibold rounded-xl flex justify-center items-center gap-3 transition-opacity duration-300 ${
              loading === "google"
                ? "bg-opacity-50 cursor-not-allowed"
                : "opacity-100"
            }`}
          >
            {loading === "google" ? (
              <>
                <Loader2 className="animate-spin w-6 h-6 mr-2" />
                <img
                  src="/google.svg"
                  alt="google"
                  className="text-[#5865f2]"
                />
                <span>Continue With Google</span>
              </>
            ) : (
              <>
                <img
                  src="/google.svg"
                  alt="google"
                  className="text-[#5865f2]"
                />
                <span>Continue With Google</span>
              </>
            )}
          </button>

          <button
            disabled={loading !== null}
            onClick={() => handleSignIn("github")}
            className={`w-full px-4 py-4 bg-[#16181D] border border-white border-opacity-10 text-white font-semibold rounded-xl flex justify-center items-center gap-3 transition-opacity duration-300 ${
              loading === "github"
                ? "bg-opacity-50 cursor-not-allowed"
                : "opacity-100"
            }`}
          >
            {loading === "github" ? (
              <>
                <Loader2 className="animate-spin w-6 h-6 mr-2" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-block"
                  width="24"
                  height="24"
                  viewBox="0 0 256 256"
                  fill="#FFFFFF"
                >
                  <path d="M128 0C57.307 0 0 57.307 0 128c0 56.516 36.657 104.4 87.477 121.336 6.4 1.182 8.736-2.772 8.736-6.144 0-3.024-.11-11.041-.165-21.678-35.588 7.728-43.096-15.134-43.096-15.134-5.82-14.799-14.22-18.722-14.22-18.722-11.62-7.944.874-7.79.874-7.79 12.847.905 19.608 13.182 19.608 13.182 11.415 19.58 29.949 13.915 37.266 10.64 1.146-8.274 4.462-13.921 8.127-17.114-28.41-3.238-58.3-14.204-58.3-63.238 0-13.973 5.01-25.409 13.182-34.37-1.322-3.236-5.71-16.254 1.264-33.91 0 0 10.757-3.448 35.258 13.147a122.77 122.77 0 0 1 32.057-4.314c10.877.05 21.828 1.46 32.055 4.314 24.493-16.595 35.245-13.147 35.245-13.147 6.982 17.656 2.586 30.674 1.263 33.91 8.178 8.96 13.182 20.397 13.182 34.37 0 49.12-29.933 59.964-58.427 63.155 4.586 3.96 8.685 11.77 8.685 23.72 0 17.14-.148 30.914-.148 35.136 0 3.392 2.309 7.366 8.763 6.136C219.343 232.4 256 184.516 256 128 256 57.307 198.693 0 128 0z" />
                </svg>
                <span>Continue With GitHub</span>
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-block"
                  width="24"
                  height="24"
                  viewBox="0 0 256 256"
                  fill="#FFFFFF"
                >
                  <path d="M128 0C57.307 0 0 57.307 0 128c0 56.516 36.657 104.4 87.477 121.336 6.4 1.182 8.736-2.772 8.736-6.144 0-3.024-.11-11.041-.165-21.678-35.588 7.728-43.096-15.134-43.096-15.134-5.82-14.799-14.22-18.722-14.22-18.722-11.62-7.944.874-7.79.874-7.79 12.847.905 19.608 13.182 19.608 13.182 11.415 19.58 29.949 13.915 37.266 10.64 1.146-8.274 4.462-13.921 8.127-17.114-28.41-3.238-58.3-14.204-58.3-63.238 0-13.973 5.01-25.409 13.182-34.37-1.322-3.236-5.71-16.254 1.264-33.91 0 0 10.757-3.448 35.258 13.147a122.77 122.77 0 0 1 32.057-4.314c10.877.05 21.828 1.46 32.055 4.314 24.493-16.595 35.245-13.147 35.245-13.147 6.982 17.656 2.586 30.674 1.263 33.91 8.178 8.96 13.182 20.397 13.182 34.37 0 49.12-29.933 59.964-58.427 63.155 4.586 3.96 8.685 11.77 8.685 23.72 0 17.14-.148 30.914-.148 35.136 0 3.392 2.309 7.366 8.763 6.136C219.343 232.4 256 184.516 256 128 256 57.307 198.693 0 128 0z" />
                </svg>
                <span>Continue With GitHub</span>
              </>
            )}
          </button>

          <button
            onClick={() => handleSignIn("discord")}
            disabled={loading !== null}
            className={`w-full px-4 py-4 bg-[#16181D] border border-white border-opacity-10 text-white font-semibold rounded-xl flex justify-center items-center gap-3 transition-opacity duration-300 ${
              loading === "discord"
                ? "bg-opacity-50 cursor-not-allowed"
                : "opacity-100"
            }`}
          >
            {loading === "discord" ? (
              <>
                <Loader2 className="animate-spin w-6 h-6 mr-2" />
                <svg
                  className="inline-block text-[#5865f2]"
                  fill="#5865F2"
                  width="24"
                  height="24"
                  viewBox="0 0 256 256"
                  stroke="none"
                  strokeWidth="1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="DiscordLogo">
                    <g
                      fill="currentColor"
                      fillRule="nonzero"
                      stroke="none"
                      strokeWidth="1"
                      strokeLinecap="butt"
                      strokeLinejoin="miter"
                      strokeMiterlimit="10"
                      strokeDasharray=""
                      strokeDashoffset="0"
                    >
                      <g transform="scale(5.33333,5.33333)">
                        <path d="M40,12c0,0 -4.585,-3.588 -10,-4l-0.488,0.976c4.896,1.198 7.142,2.915 9.488,5.024c-4.045,-2.065 -8.039,-4 -15,-4c-6.961,0 -10.955,1.935 -15,4c2.346,-2.109 5.018,-4.015 9.488,-5.024l-0.488,-0.976c-5.681,0.537 -10,4 -10,4c0,0 -5.121,7.425 -6,22c5.162,5.953 13,6 13,6l1.639,-2.185c-2.782,-0.967 -5.924,-2.694 -8.639,-5.815c3.238,2.45 8.125,5 16,5c7.875,0 12.762,-2.55 16,-5c-2.715,3.121 -5.857,4.848 -8.639,5.815l1.639,2.185c0,0 7.838,-0.047 13,-6c-0.879,-14.575 -6,-22 -6,-22zM17.5,30c-1.933,0 -3.5,-1.791 -3.5,-4c0,-2.209 1.567,-4 3.5,-4c1.933,0 3.5,1.791 3.5,4c0,2.209 -1.567,4 -3.5,4zM30.5,30c-1.933,0 -3.5,-1.791 -3.5,-4c0,-2.209 1.567,-4 3.5,-4c1.933,0 3.5,1.791 3.5,4c0,2.209 -1.567,4 -3.5,4z"></path>
                      </g>
                    </g>
                  </g>
                </svg>
                <span>Continue With Discord</span>
              </>
            ) : (
              <>
                <svg
                  className="inline-block text-[#5865f2]"
                  fill="#5865F2"
                  width="24"
                  height="24"
                  viewBox="0 0 256 256"
                  stroke="none"
                  strokeWidth="1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="DiscordLogo">
                    <g
                      fill="currentColor"
                      fillRule="nonzero"
                      stroke="none"
                      strokeWidth="1"
                      strokeLinecap="butt"
                      strokeLinejoin="miter"
                      strokeMiterlimit="10"
                      strokeDasharray=""
                      strokeDashoffset="0"
                    >
                      <g transform="scale(5.33333,5.33333)">
                        <path d="M40,12c0,0 -4.585,-3.588 -10,-4l-0.488,0.976c4.896,1.198 7.142,2.915 9.488,5.024c-4.045,-2.065 -8.039,-4 -15,-4c-6.961,0 -10.955,1.935 -15,4c2.346,-2.109 5.018,-4.015 9.488,-5.024l-0.488,-0.976c-5.681,0.537 -10,4 -10,4c0,0 -5.121,7.425 -6,22c5.162,5.953 13,6 13,6l1.639,-2.185c-2.782,-0.967 -5.924,-2.694 -8.639,-5.815c3.238,2.45 8.125,5 16,5c7.875,0 12.762,-2.55 16,-5c-2.715,3.121 -5.857,4.848 -8.639,5.815l1.639,2.185c0,0 7.838,-0.047 13,-6c-0.879,-14.575 -6,-22 -6,-22zM17.5,30c-1.933,0 -3.5,-1.791 -3.5,-4c0,-2.209 1.567,-4 3.5,-4c1.933,0 3.5,1.791 3.5,4c0,2.209 -1.567,4 -3.5,4zM30.5,30c-1.933,0 -3.5,-1.791 -3.5,-4c0,-2.209 1.567,-4 3.5,-4c1.933,0 3.5,1.791 3.5,4c0,2.209 -1.567,4 -3.5,4z"></path>
                      </g>
                    </g>
                  </g>
                </svg>
                <span>Continue With Discord</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
