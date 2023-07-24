import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const { name } = useParams();
  const profileData = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [formData, setFormData] = useState({
    name,
    email: "",
    number: "",
    aadharNumber: "",
  });

  // Fetch profile data and update the formData state when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/user/${name}`, config);
        const userData = response.data;
        setFormData({
          ...formData,
          email: userData.email,
          number: userData.number,
          aadharNumber: userData.aadharNumber,
        });
      } catch (error) {
        // Handle the error if the API call fails or data is not available
        console.error("Error fetching profile data:", error.message);
        toast.error("Error fetching profile data", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };

    fetchUserData();
  }, [name]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation checks for email, number, and aadharNumber fields
    if (!validateEmail(formData.email)) {
      toast.error("Invalid email format!", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    if (!validateNumber(formData.number)) {
      toast.error("Invalid number format!", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    if (!validateAadharNumber(formData.aadharNumber)) {
      toast.error("Invalid Aadhar number format!", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    // Continue with the form submission if all data is valid
    axios
      .put(
        `/user/${name}`,
        {
          email: formData.email,
          number: formData.number,
          aadharNumber: formData.aadharNumber,
        },
        config
      )
      .then(() => {
        {!profileData.admin ? navigate("/profile") : navigate("/all-users")};
        toast.success("Profile Updated", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((error) => {
        toast.error("Error updating profile: " + error.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  const handleCancel = () => {
    {!profileData.admin ? navigate("/profile") : navigate("/all-users")};
  };

  // Helper functions for validation checks
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validateNumber = (number) => {
    const numberPattern = /^\d{10}$/;
    return numberPattern.test(number);
  };

  const validateAadharNumber = (aadharNumber) => {
    const aadharNumberPattern = /^\d{12}$/;
    return aadharNumberPattern.test(aadharNumber);
  };
  return (
    <div className="p-8 flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-8 space-y-4">
        <h1 className="text-3xl font-bold mb-6">Update Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold text-lg mb-2">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              readOnly
              className="bg-gray-100 border-2 border-gray-300 p-2 rounded w-full"
            />
            <p className="text-sm text-gray-500 mt-1">Name cannot be changed</p>
          </div>
          <div>
            <label className="block text-gray-700 font-bold text-lg mb-2">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-100 border-2 border-gray-300 p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold text-lg mb-2">
              Number:
            </label>
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              className="bg-gray-100 border-2 border-gray-300 p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold text-lg mb-2">
              Aadhar Number:
            </label>
            <input
              type="text"
              name="aadharNumber"
              value={formData.aadharNumber}
              onChange={handleChange}
              className="bg-gray-100 border-2 border-gray-300 p-2 rounded w-full"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update
            </button>
          </div>
        </form>
        {!profileData.admin && (
          <div className="mt-4">
            <Link
              to="/change-password"
              className="text-blue-500 hover:underline"
            >
              Change Password
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateProfile;
