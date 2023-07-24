import React from 'react';
import Navbar from '../Components/Navbar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Profile = () => {
  const profileData = useSelector(state => state.user.userData);

  return (
    <div>
      <Navbar />
      <div className="flex text-center items-center justify-center h-screen bg-gray-100">
        <div className="p-16 max-w-3xl w-full">
          <h1 className="text-4xl font-bold mb-6">Profile Page</h1>
          <div className="bg-white shadow-md rounded-lg p-8 space-y-4">
            <div>
              <label className="block text-gray-700 font-bold text-lg mb-2">Name:</label>
              <p className="text-gray-800 text-xl">{profileData.name}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-bold text-lg mb-2">Email:</label>
              <p className="text-gray-800 text-xl">{profileData.email}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-bold text-lg mb-2">Number:</label>
              <p className="text-gray-800 text-xl">{profileData.number}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-bold text-lg mb-2">Aadhar Number:</label>
              <p className="text-gray-800 text-xl">{profileData.aadharNumber}</p>
            </div>
            <div className="flex justify-center">
              <Link to={`/update-profile/${profileData.name}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline">
                Update Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
