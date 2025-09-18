// pages/Login.tsx
import React, { useState } from "react";
import { auth, provider } from "../firebase";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle email/password sign in
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/cms');
    } catch (err: any) {
      setError("Invalid email or password.");
    }
  };

  // Handle Google sign in
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setError('');
    try {
    const data:any =  await signInWithPopup(auth, provider);
    console.log(`data`,data)
    localStorage.setItem(`token`,data?.user?.accessToken)
      navigate("/cms");
    } catch (error) {
      console.error("Google Login Error", error);
      setError("Google login failed. Make sure your Firebase auth and domain are correctly configured.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white max-w-3xl rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Right Section */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 w-full">Sign In</h2>

          <form onSubmit={handleEmailLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-4 px-4 py-2 border rounded-md"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-4 px-4 py-2 border rounded-md"
              required
            />

            <p className="text-sm text-right text-gray-600 mb-4">
              <Link to="/forgot-password" className="hover:underline">Forgot password?</Link>
            </p>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2 bg-black text-white rounded-md hover:bg-gray-900 transition"
            >
              Sign In with Email
            </button>
          </form>

          <button
            onClick={handleGoogleLogin}
            className="w-full mt-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Sign in with Google
          </button>

          {error && <p className="mt-4 text-red-600 text-sm text-center">{error}</p>}

          <p className="text-sm text-center mt-6 text-gray-700">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
