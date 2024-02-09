import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Layout from "../core/layouts";
import { authenticate, isAuthenticated, signin } from "../auth";

const Signin = () => {
  const [values, setValues] = useState({
    email: "goku2626@gmail.com",
    password: "goku2626",
    error: "",
    loading: false,
    redirectToReferer: false,
  });

  const clickSubmit = (event) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValues({ ...values, error: "Invalid email format", loading: false });
      return;
    }
    if (password.length < 6) {
      setValues({ ...values, error: "Password must be at least 6 characters long", loading: false });
      return;
    }
  
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferer: true,
          });
        });
      }
    });
  };

  const { email, password, loading, error, redirectToReferer } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const signInForm = () => (
  <form>
    <div className="form-group">
      <label htmlFor="email" className="text-muted">Email</label>
      <input
        onChange={handleChange("email")}
        type="email"
        className="form-control form-control-sm" // Use form-control-sm for smaller input fields
        id="email"
        value={email}
      />
    </div>

    <div className="form-group">
      <label htmlFor="password" className="text-muted">Password</label>
      <input
        onChange={handleChange("password")}
        type="password"
        className="form-control form-control-sm" // Use form-control-sm for smaller input fields
        id="password"
        value={password}
      />
      <div className="text-right mt-2">
        <a href="/forgot-password" className="text-muted">Forgot Password?</a>
      </div>
    </div>

    <div className="form-group">
      <button onClick={clickSubmit} className="btn btn-primary btn-block">
        Submit
      </button>
    </div>

    <hr className="my-4"/> {/* This will create a line */}

    <div className="form-group">
      <button onClick={handleGoogleSignIn} className="btn btn-danger btn-block">
        Sign In with Google
      </button>
    </div>
  </form>
);
  
  // Function to handle Google Sign-In, adjust as per your authentication flow
  const handleGoogleSignIn = () => {
    // Implementation for Google Sign-In
  };
  
  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );
  const redirectUser = () => {
    if (redirectToReferer) {
      if (user && user.role === 1) {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/user/dashboard" />;
      }
    }
    if(isAuthenticated()) {
        return <Navigate to="/" />;
    }
  };
 
  return (
    <Layout
      title="Sign in to Prompt Hub"
      description="Node React E-commerce App"
      className="container col-md-8 offset-md-2"
    >
      {showLoading()}
      {showError()}
      {signInForm()}
      {redirectUser()}
    </Layout>
  );
};

export default Signin;
