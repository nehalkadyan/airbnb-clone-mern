import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    username: "",
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

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/auth/signup", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("data", data);
      setLoading(false);
      navigate("/login");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-neutral-200 h-screen flex justify-center items-center flex-col gap-4">
      <form
        onSubmit={handleSignup}
        className=" bg-white flex gap-6 p-6 rounded-md flex-col w-3/4 md:w-1/2 lg:w-1/3"
      >
        <h1 className="text-center text-3xl font-medium">Sign up</h1>
        <input
          id="username"
          className="p-4 outline-none border border-neutral-200 rounded"
          type="text"
          placeholder="Username"
          onChange={handleChange}
        />
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
          {loading ? "Loading" : "Sign up"}
        </button>
      </form>

      <div className="mb-16">
        <p>
          Already have an account?
          <Link to="/login">
            <span className="pl-2 text-slate-800 font-medium">Login</span>
          </Link>
        </p>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default Signup;
