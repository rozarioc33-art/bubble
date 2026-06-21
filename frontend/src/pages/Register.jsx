import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "@/services/api";
import { useUser } from "../context/UserContext";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { setCurrentUser } = useUser();
  const navigate = useNavigate();

  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1. Call your backend register route
      const { data } = await API.post("/auth/register", formData);
      localStorage.setItem("user", JSON.stringify(data));
      if (data.token) localStorage.setItem("token", data.token);

      setCurrentUser(data);
      navigate("/chat");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={name}
          onChange={onChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={email} // Added this
          onChange={onChange} // Added this
          required // Added this
        />

        <input
          type="password"
          name="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={onChange}
          minLength="6"
          required
        />

        <button type="submit">Sign Up</button>

        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
