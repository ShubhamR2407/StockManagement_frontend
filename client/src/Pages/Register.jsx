import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Password validation regex
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/;
  
    if (
      number.toString().length === 10 &&
      aadharNumber.toString().length === 12 &&
      passwordRegex.test(password) // Check if the password matches the regex
    ) {
      try {
        await axios.post("/user/save", {
          name: username,
          email,
          number,
          aadharNumber,
          password,
        });
        toast.success("Registered Successfully, Login to Enter!", {
          position: toast.POSITION.TOP_CENTER,
        });
        navigate("/");
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          // Check if the error is due to duplicate user
          if (
            error.response.data.message ===
            "User with the same email, Aadhar number, or name already exists."
          ) {
            toast.error(error.response.data.message, {
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            // Handle other errors
            toast.error(error.response.data.message, {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        } else {
          toast.error("An error occurred: User with the same email, Aadhar number, or name already exists.", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      }
    } else {
      let errorMsg = "Invalid details. Please provide: ";
      if (number.toString().length !== 10) {
        errorMsg += "Phone number (10 digits), ";
      }
      if (aadharNumber.toString().length !== 12) {
        errorMsg += "Aadhar number (12 digits), ";
      }
      if (!passwordRegex.test(password)) {
        errorMsg +=
          "Password (8-20 characters, at least one capital letter, one digit, and one special character), ";
      }
      errorMsg = errorMsg.slice(0, -2); // Remove the last comma and space
      toast.error(errorMsg, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  
  

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-100 p-8 border rounded-md shadow-lg">
        <h2 className="text-3xl font-semibold mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-7">
            <div>
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
                className="mt-1 p-2 w-60 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter your username"
                required
              />
            </div>
            <div>
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
                className="mt-1 p-2 w-60 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter your password"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 w-60 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label
                htmlFor="number"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="number"
                name="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="mt-1 p-2 w-60 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div>
              <label
                htmlFor="aadharNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Aadhar Number
              </label>
              <input
                type="text"
                id="aadharNumber"
                name="aadharNumber"
                value={aadharNumber}
                onChange={(e) => setAadharNumber(e.target.value)}
                className="mt-1 p-2 w-60 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter your Aadhar number"
                required
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            >
              Register
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          Already have an Account?{" "}
          <button
            onClick={() => navigate("/")}
            className="text-blue-500 font-medium focus:outline-none hover:underline"
          >
            Login here!
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
