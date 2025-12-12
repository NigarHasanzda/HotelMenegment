import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Redux/Features/RegisterSlice";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.register);

  const [form, setForm] = useState({
    name: "",
    surname: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(form));
  };

  useEffect(() => {
    if (success) {
      toast.success("Qeydiyyat uğurla tamamlandı. Email təsdiqləyin!");
    }
    if (error) {
      // error obyektin errorMessage property-si varsa göstər
      toast.error(error.errorMessage || "Qeydiyyat zamanı xəta baş verdi");
    }
  }, [success, error]);

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="surname" placeholder="Surname" onChange={handleChange} />
      <input name="userName" placeholder="Username" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} />

      <button type="submit" disabled={loading}>
        {loading ? "Göndərilir..." : "Qeydiyyat"}
      </button>

      {error && <p style={{color:"red"}}>{error.errorMessage || "Qeydiyyat xətası"}</p>}
    </form>
  );
};

export default Register;
