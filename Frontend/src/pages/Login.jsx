import React, { useState } from "react";
import AuthImagePattern from "../Components/AuthImagePattern";
import { RiChatSmileAiLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../features/auth/authSlice";
import toast from "react-hot-toast";

const Login = () => {
  const {isSigningIn} = useSelector((state)=>state.auth)
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validate = () => {
    const errors = {};
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async(e) => {
    e.preventDefault()
    if (validate()) {

     try {
       await dispatch(signIn(formData)).unwrap();
       toast.success("Login Successful")
     } catch (error) {
      toast.error(error);  // since rejectWithValue gives a message
     }
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen  border-red-100  rounded-lg px-4">
        <div className="card w-full max-w-xl shadow-xl">
          <div className="card-body">
            <RiChatSmileAiLine className="text-4xl mx-auto" />
            <h2 className="text-3xl text-primary font-bold text-center">
              Welcome Back
            </h2>
            <p className="text-center text-base mt-2">
              Sign in to your Account!
            </p>

            <form onSubmit={handleSubmit} className="form-control w-full space-y-2 mt-6">
              <div>
                <label className="label" htmlFor="email">
                  <span className="label-text">Email Address</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                  value={formData.email}
                  onChange={handleChange}
                  required
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
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
                 <span className="error-msg">{errors.password}</span>
              </div>
              <button className="btn btn-primary mt-4 w-full" type="submit">
                 {!isSigningIn ? (
                  <span>Sign In</span>
                ) : (
                  <img
                    src="https://raw.githubusercontent.com/n3r4zzurr0/svg-spinners/main/preview/90-ring-with-bg-white-36.svg"
                    alt="loading animation"
                  />
                )}
              </button>
            </form>

            <p className="text-sm text-center mt-6">
              Don't have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Create Account
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

export default Login;
