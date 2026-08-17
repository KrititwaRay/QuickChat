import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");

  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const { login } = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault();

    // Step 1 of Sign up
    if (currState === "Sign up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }

    // Login or Final Sign Up
    if (currState === "Login") {

      login('login', {
        email,
        password,

      })
      // console.log({
      //   email,
      //   password,
      // });
    } else {
      login('signup', {
        fullName,
        email,
        password,
        bio

      })
      // console.log({
      //   fullName,
      //   email,
      //   password,
      //   bio,
      // });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080816] relative overflow-hidden px-4">
      {/* Background Blur */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-700 rounded-full blur-[120px] opacity-40"></div>

      <div className="absolute bottom-0 -right-16 w-80 h-80 bg-indigo-700 rounded-full blur-[120px] opacity-30"></div>

      {/* Card */}
      <div className="relative w-full max-w-[380px] rounded-xl border border-white/15 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-white mb-8">
          {currState}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          {currState === "Sign up" && !isDataSubmitted && (
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-transparent border border-white/15 rounded-md px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-400"
              required
            />
          )}

          {/* Email + Password */}
          {!isDataSubmitted && (
            <>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border border-white/15 rounded-md px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-400"
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border border-white/15 rounded-md px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-400"
                required
              />
            </>
          )}

          {/* Bio */}
          {currState === "Sign up" && isDataSubmitted && (
            <textarea
              rows={4}
              placeholder="Tell us about yourself..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-transparent border border-white/15 rounded-md px-4 py-3 text-white placeholder-gray-400 outline-none resize-none focus:border-purple-400"
              required
            />
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="cursor-pointer w-full py-3 rounded-md bg-gradient-to-r from-[#D38CFF] to-[#8B5CF6] text-white font-semibold hover:brightness-110 active:scale-95 transition"
          >
            {currState === "Login"
              ? "Login"
              : isDataSubmitted
              ? "Complete Sign Up"
              : "Continue"}
          </button>

          {/* Terms */}
          {currState === "Sign up" && !isDataSubmitted && (
            <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
              <input
                type="checkbox"
                className="accent-purple-500"
                required
              />
              I agree to the Terms of Use & Privacy Policy.
            </label>
          )}

          {/* Switch Login / Signup */}
          <div className="text-center text-sm text-gray-400 pt-2">
            {currState === "Sign up" ? (
              <>
                Already have an account?
                <button
                  type="button"
                  onClick={() => {
                    setCurrState("Login");
                    setIsDataSubmitted(false);
                  }}
                  className="ml-1 text-purple-400 hover:text-purple-300 cursor-pointer font-medium"
                >
                  Login here
                </button>
              </>
            ) : (
              <>
                Don't have an account?
                <button
                  type="button"
                  onClick={() => {
                    setCurrState("Sign up");
                    setIsDataSubmitted(false);
                  }}
                  className="ml-1 text-purple-400 hover:text-purple-300 cursor-pointer font-medium"
                >
                  Sign up
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;