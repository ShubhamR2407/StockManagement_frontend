import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../store/userSlice";
import { userActions } from "../store/userSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllUsers = () => {
  const allUsers = useSelector((state) => state.user.allUsers);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    dispatch(fetchAllUsers(token));
  }, []);

  const handleRemoveUser = async (name) => {
    const confirmed = window.confirm(
      "Are you sure, you want to remove this user?"
    );
    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(`/user/${name}`, config);
      dispatch(userActions.removeUser(name));
      toast.success("User Removed Successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      window.location.reload();
    } catch (error) {
      toast.error("Error removing user", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const handleUpdateUser = (name) => {
    navigate(`/update-profile/${name}`);
  };

  return (
    <div>
      <Navbar />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">All Users (Admin View)</h1>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-4 text-center">Name</th>
              <th className="p-4 text-center">Email</th>
              <th className="p-4 text-center">Number</th>
              <th className="p-4 text-center">Aadhar Number</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => (
              <tr key={user.userId} className="border-b text-center">
                <td className="p-4 ">{user.name}</td>
                <td className="p-4 ">{user.email}</td>
                <td className="p-4 ">{user.number}</td>
                <td className="p-4 ">{user.aadharNumber}</td>
                <td className="p-4 ">
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded mr-2"
                    onClick={() => handleRemoveUser(user.name)}
                  >
                    Remove
                  </button>
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                    onClick={() => handleUpdateUser(user.name)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
