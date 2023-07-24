import {Routes, Route} from "react-router-dom"
import axios from "axios"
import 'react-toastify/dist/ReactToastify.css';
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard"
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import MyStocks from "./Pages/MyStocks";
import AddStock from "./Pages/AddStock";
import AllUsers from "./Pages/AllUsers";
import UpdateProfile from "./Pages/UpdateProfile";

function App() {
  axios.defaults.baseURL = "http://localhost:8080/api"
  axios.defaults.withCredentials = true;
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-stocks" element={<MyStocks />} />
        <Route path="/add-new-stock" element={<AddStock />} />
        <Route path="/all-users" element={<AllUsers />} />
        <Route path="/update-profile/:name" element={<UpdateProfile />} />
      </Routes>
  );
}

export default App;
