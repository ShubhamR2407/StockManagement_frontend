import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("user/login", {
        name: username,
        password: password,
      });
      sessionStorage.setItem("token", response.data);
      toast.success("Logged In Successfully", {
        position: toast.POSITION.TOP_CENTER,
      });

      navigate("/dashboard");
    } catch (error) {
      toast.error("Login failed: " + error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-96 h-96 p-8 border rounded-md shadow-lg">
        <h2 className="text-3xl font-semibold mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 block w-full border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 block w-full border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            >
              Login
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          Don't have an Account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-500 font-medium focus:outline-none hover:underline"
          >
            Register here!
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
