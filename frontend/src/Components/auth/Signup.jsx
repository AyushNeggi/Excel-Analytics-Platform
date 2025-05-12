import { useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import './style.css'; 
import { useNavigate } from "react-router-dom";

const Signup = () => {


  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        withCredentials: true,
      });
      if (res.data.success) {
                navigate("/login");
      alert(res.data.message);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1>Jobify – Sign Up</h1>
        <form onSubmit={handleRegister}>
          <input
            name="fullname"
            type="text"
            placeholder="Full Name"
            onChange={handleChange}
            className="input-field"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className="input-field"
          />
          <input
            name="phoneNumber"
            type="text"
            placeholder="Phone Number"
            onChange={handleChange}
            className="input-field"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="input-field"
          />
          <select
            name="role"
            onChange={handleChange}
            className="input-field"
          >
            <option value="user">Student</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="submit-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
