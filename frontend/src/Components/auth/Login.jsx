import { useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import './style.css'; 
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${USER_API_END_POINT}/login`, formData, {
        withCredentials: true,
      });
      if (res.data.success) {
                navigate("/");
      alert(res.data.message);

            }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Jobify – Login</h1>
        <form onSubmit={handleLogin}>
          <input
            name="email"
            type="email"
            placeholder="Email"
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
          <button type="submit" className="submit-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
