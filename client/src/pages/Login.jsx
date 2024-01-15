import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UseDispatch, useDispatch } from "react-redux";
import { loginSuccess } from "../redux/user/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  console.log(formData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);
      setRedirect(true);
      dispatch(loginSuccess(data));
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };

  if (redirect) {
    navigate("/");
  }

  return (
    <div className="w-full bg-neutral-200 h-screen flex justify-center items-center flex-col gap-4">
      <form
        onSubmit={handleLogin}
        className=" bg-white flex gap-6 p-6 rounded-md flex-col w-3/4 md:w-1/2 lg:w-1/3"
      >
        <h1 className="text-center text-3xl font-medium">Login</h1>
        <input
          id="email"
          className="p-4  outline-none border border-neutral-200 rounded"
          type="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          id="password"
          className="p-4 outline-none border border-neutral-200 rounded"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button className="w-1/2 mx-auto bg-slate-800 text-white py-2 rounded-md">
          {loading ? "....." : "Login"}
        </button>
      </form>

      <div className="mb-16">
        <p>
          Don't have an account?
          <Link to="/signup">
            <span className="pl-2 text-slate-800 font-medium">Sign up</span>
          </Link>
        </p>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
