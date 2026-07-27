import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";

const ProfilePage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const [name, setName] = useState("Martin Johnson");
  const [bio, setBio] = useState("Hi");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl overflow-hidden flex max-md:flex-col">

        {/* Left Side */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 p-10 flex flex-col justify-center gap-6"
        >
          <div>
            <h2 className="text-3xl font-bold text-white">
              Profile Details
            </h2>
            <p className="text-gray-300 mt-2">
              Complete your profile to continue.
            </p>
          </div>

          <label
            htmlFor="avatar"
            className="flex items-center gap-4 cursor-pointer group"
          >
            <input
              type="file"
              id="avatar"
              hidden
              accept=".png,.jpg,.jpeg"
              onChange={(e) => setSelectedImage(e.target.files[0])}
            />

            <img
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : assets.avatar_icon
              }
              alt=""
              className="w-16 h-16 rounded-full object-cover border-2 border-violet-500 group-hover:scale-105 transition"
            />

            <div>
              <p className="text-white font-medium">
                Upload Profile Picture
              </p>
              <p className="text-gray-400 text-sm">
                PNG, JPG or JPEG
              </p>
            </div>
          </label>

          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full bg-white/10 text-white placeholder-gray-400 border border-gray-500 rounded-xl px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30"
          />

          <textarea
            rows={4}
            required
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write your bio..."
            className="w-full bg-white/10 text-white placeholder-gray-400 border border-gray-500 rounded-xl px-4 py-3 outline-none resize-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30"
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 transition text-white font-semibold py-3 rounded-xl cursor-pointer"
          >
            Save Profile
          </button>
        </form>

        {/* Right Side */}
        <div className="flex-1 flex items-center justify-center p-10 bg-white/5">
          <img
            src={assets.logo_icon}
            alt="Logo"
            className="w-72 max-w-full rounded-full shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;