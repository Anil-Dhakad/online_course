import React, { useState } from "react";
import { forgotpwd } from "./apiUser";

const ForgotPassword = (props) => {
  const [values, setValues] = useState({
    email: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    setValues({ [event.target.name]: event.target.value });
    setError("");
  };

  const { email } = values;

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    if (email === "") {
      setError("Email is required");
    } else {
      setError("");
      forgotpwd({ email }).then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setError(data);
          setValues({ email: "" });
        }
      });
    }
  };

  const ForgotPwdForm = () => (
    <div className="signup-form">
      <center>
        <h3>Lost Your Password?</h3>
      </center>
      <p className="hint-text" style={{ marginBottom: "20px" }}>
        Enter your email address and we’ll send you a recovery link.
      </p>

      <center>
        <strong style={{ color: "red" }}>{error}</strong>
      </center>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <i className="fa fa-envelope"></i>
          <input
            type="email"
            className="form-control input-lg"
            name="email"
            placeholder="Email Address"
            required="required"
            value={email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <button
            type="submit"
            className="btn btn-success btn-lg btn-block signup-btn"
          >
            Submit
          </button>
        </div>
      </form>
      <div className="text-center">
        Back to{" "}
        <a className="anchor" onClick={() => props.clickHandler("signin")}>
          SignIn
        </a>
      </div>
    </div>
  );

  return <div>{ForgotPwdForm()}</div>;
};

export default ForgotPassword;
