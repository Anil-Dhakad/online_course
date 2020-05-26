import React, { useState } from "react";
import { signup } from "./apiUser";

const SignUp = (props) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    role: "client",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    setValues({ ...values, [event.target.name]: event.target.value });
    setError("");
  };

  const { name, email, password } = values;

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");
    var d = 0;

    if (name === "" || email === "" || password === "") {
      setError("All input fields are required");
      d = 1;
    }
    if (name !== "" && d === 0) {
      for (let i = 0; i < name.length; i++) {
        let c = name.charCodeAt(i);
        if (!((c >= 65 && c <= 90) || (c >= 97 && c <= 122) || c === 32)) {
          setError("Enter valid name");
          d = 1;
          break;
        }
      }
    }
    if (email !== "" && d === 0) {
      const pattern = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})$/g;
      if (!pattern.test(email)) {
        setError("Enter valid email id");
        d = 1;
      }
    }

    if (password !== "" && password.length < 8 && d === 0) {
      setError("Password length must be of at least 8 characters");
      d = 1;
    }

    if (d === 0) {
      // setError("");
      signup(values).then((data) => {
        if (data.error && data.error.includes("email already exists")) {
          setError("Email-Id already exists...");
        } else {
          setError(
            <b>
              Successfully registered, please&nbsp;
              <a
                className="anchor"
                onClick={() => props.clickHandler("signin")}
              >
                SignIn here
              </a>
            </b>
          );
          setValues({ name: "", email: "", password: "" });
        }
      });
    }
  };

  const signupForm = () => (
    <div className="signup-form">
      <form onSubmit={handleSubmit}>
        <center>
          <h3>Create an Account</h3>
        </center>
        <p className="hint-text">
          Sign up with your social media account or email address
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
          <i className="fa fa-user-circle"></i>
          <input
            type="text"
            className="form-control input-lg"
            name="name"
            placeholder="Username"
            required="required"
            onChange={handleChange}
            value={name}
          />
        </div>
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
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-success btn-lg btn-block signup-btn"
          >
            Sign Up
          </button>
        </div>
      </form>
      <div className="text-center">
        Already have an account?
        <a className="anchor" onClick={() => props.clickHandler("signin")}>
          SignIn here
        </a>
      </div>
    </div>
  );

  return <div>{signupForm()}</div>;
};

export default SignUp;
