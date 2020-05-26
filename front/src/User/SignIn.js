import React, { useState } from "react";
import { signin, isAuthenticated, authenticate } from "./apiUser";
import { Redirect } from "react-router-dom";

const SignIn = (props) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    redirectTo: false,
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    setValues({ ...values, [event.target.name]: event.target.value });
    setError("");
  };

  const { email, password, redirectTo } = values;
  const { user } = isAuthenticated();

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    if (email === "" || password === "") {
      setError("All input fields are required");
    } else {
      setError("");
      signin(values).then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          authenticate(data, () => {
            setError("");
            setValues({ email: "", password: "", redirectTo: true });
          });
        }
      });
    }
  };

  const redirectUser = () => {
    if (redirectTo && user) {
      return <Redirect to="/home" />;
    }
    if (isAuthenticated()) {
      return <Redirect to="/home" />;
    }
  };

  const signinForm = () => (
    <div className="signup-form">
      <form onSubmit={handleSubmit}>
        <center>
          <h3>Sign In</h3>
        </center>
        <p className="hint-text">
          Sign in with your social media account or email address
        </p>
        <div className="social-btn text-center">
          <a href="#" className="btn btn-primary btn-lg">
            <i className="fab fa-facebook"></i> Facebook
          </a>

          <a href="#" className="btn btn-danger btn-lg">
            <i className="fab fa-google"></i> Google
          </a>
        </div>
        <div className="or-seperator">
          <b>or</b>
        </div>
        <center>
          <strong style={{ color: "red" }}>{error}</strong>
        </center>

        <div className="form-group">
          <i className="fa fa-envelope"></i>
          <input
            type="email"
            className="form-control input-lg"
            name="email"
            placeholder="Email Address"
            required="required"
            onChange={handleChange}
            value={email}
          />
        </div>
        <div className="form-group">
          <i className="fa fa-lock"></i>
          <input
            type="password"
            className="form-control input-lg"
            name="password"
            placeholder="Password"
            required="required"
            onChange={handleChange}
            value={password}
          />
        </div>
        <div className="forgotpwd">
          <a className="anchor" onClick={() => props.clickHandler("forgotpwd")}>
            Forgot Password?
          </a>
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-success btn-lg btn-block signup-btn"
          >
            Sign In
          </button>
        </div>
      </form>
      <div className="text-center">
        Not have an account?{" "}
        <a className="anchor" onClick={() => props.clickHandler("signup")}>
          SignUp here
        </a>
      </div>
    </div>
  );

  return (
    <div>
      {signinForm()} {redirectUser()}
    </div>
  );
};

export default SignIn;
