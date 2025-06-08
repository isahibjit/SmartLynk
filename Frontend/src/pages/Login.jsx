import React from "react";
import AuthImagePattern from "../Components/AuthImagePattern";
import { RiChatSmileAiLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Login = () => {
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

            <form className="form-control w-full space-y-2 mt-6">
              <label className="label" htmlFor="email">
                <span className="label-text">Email Address</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                required
              />

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
              />

              <button className="btn btn-primary mt-4 w-full" type="submit">
                Sign Up
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
