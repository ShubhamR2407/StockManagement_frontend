import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserData } from "../store/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileData = useSelector((state) => state.user.userData);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    dispatch(fetchUserData(token));
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
    window.location.reload(); // Refresh the window after logout
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-bold">
          Stock Market Dashboard
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            to="/dashboard"
            className="text-white px-4 py-2 hover:underline"
          >
            All Stocks
          </Link>
          {profileData.admin && (
            <Link
              to="/all-users"
              className="text-white px-4 py-2 hover:underline"
            >
              Users
            </Link>
          )}
          {(profileData.company || profileData.admin) && (
            <Link
              to="/add-new-stock"
              className="text-white px-4 py-2 hover:underline"
            >
              Add New Stock
            </Link>
          )}
          {!profileData.company && <Link
            to="/my-stocks"
            className="text-white px-4 py-2 hover:underline"
          >
            My Stocks
          </Link>}
          <Link
            to="/profile"
            className="text-white px-4 py-2 hover:underline flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                clipRule="evenodd"
              />
            </svg>
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="border border-white rounded px-4 py-2"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
