import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Redux/Features/LoginSlice";

const Login = () => {
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.login);

  const [form, setForm] = useState({
    userNameOrEmail: "",
    password: "",
    isRemembered: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="userNameOrEmail"
        placeholder="Username or Email"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <label>
        <input
          type="checkbox"
          name="isRemembered"
          checked={form.isRemembered}
          onChange={handleChange}
        /> Remember me
      </label>
      <button type="submit" disabled={loading}>
        {loading ? "Gözləyin..." : "Login"}
      </button>

      {error && <p style={{ color: "red" }}>{error.errorMessage || error}</p>}
    </form>
  );
};

export default Login;
