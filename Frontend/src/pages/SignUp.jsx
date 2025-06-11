import React, { useState } from "react";
import AuthImagePattern from "../Components/AuthImagePattern";
import { RiChatSmileAiLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../features/auth/authSlice.js";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const dispatch = useDispatch();
  const { isSigningUp } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validate()) {
      try {
       await dispatch(signUp(formData)).unwrap();
      } catch (error) {
        toast.error(error)
      }

    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const errors = {};
    if (!formData || formData.fullname.length < 3) {
      errors.fullname = "Name cannot be this short";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      errors.email = "Enter a valid email address";
    }
    if (!formData || formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setErrors((prev) => ({ ...prev, ...errors }));

    return Object.keys(errors).length === 0;
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen  border-red-100  rounded-lg px-4">
        <div className="card w-full max-w-xl shadow-xl">
          <div className="card-body">
            <RiChatSmileAiLine className="text-4xl mx-auto" />
            <h2 className="text-3xl font-bold text-primary text-center">
              Create your Account
            </h2>
            <p className="text-sm text-center text-base-content mt-2">
              Get Started with your free account
            </p>

            <form
              onSubmit={handleSubmit}
              className="form-control w-full space-y-2 mt-6"
            >
              <div>
                <label className="label" htmlFor="name">
                  <span className="label-text">Name</span>
                </label>
                <input
                  id="name"
                  name="fullname"
                  type="text"
                  placeholder="Enter your name"
                  className="input input-bordered w-full"
                  value={formData.fullname}
                  required
                  onChange={handleChange}
                />
                <span className="error-msg">{errors.fullname}</span>
              </div>
              <div>
                <label className="label" htmlFor="email">
                  <span className="label-text">Email Address</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                  value={formData.email}
                  required
                  onChange={handleChange}
                />
                <span className="error-msg">{errors.email}</span>
              </div>
              <div>
                <label className="label" htmlFor="password">
                  <span className="label-text">Password</span>
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full"
                  value={formData.password}
                  required
                  onChange={handleChange}
                />
                <span className="error-msg">{errors.password}</span>
              </div>
              <button className="btn btn-primary mt-4 w-full" type="submit">
                {!isSigningUp ? (
                  <span>Sign Up</span>
                ) : (
                  <img
                    src="https://raw.githubusercontent.com/n3r4zzurr0/svg-spinners/main/preview/90-ring-with-bg-white-36.svg"
                    alt="loading animation"
                  />
                )}
              </button>
            </form>

            <p className="text-sm text-center mt-6">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Log in
              </Link>
            </p>
          </div>
        </div>
        <AuthImagePattern
          title="Join our community"
          subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
        />
      </div>
    </div>
  );
};

export default SignUpPage;
