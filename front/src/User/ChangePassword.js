import React, { useState } from "react";
import $ from "jquery";
import { isAuthenticated } from "../Components/apiCore";
import { changePwd } from "./apiUser";

const ChangePassword = () => {
  const { user } = isAuthenticated();

  const [values, setValues] = useState({
    oldPwd: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    setError("");
    event.preventDefault();
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  setTimeout(function () {
    $("#updateMessage").fadeOut("slow");
  }, 10000);

  const { oldPwd, password } = values;

  const submitHandler = (event) => {
    event.preventDefault();
    const _id = user._id;
    changePwd({ _id, oldPwd, password }).then((data) => {
      console.log(data);
      if (data.error) {
        setError(data.error);
      } else if (data === "incorrect") {
        setError(
          <b style={{ color: "#0e9e0e", fontSize: "1.2em" }}>
            Incorrect Old Password...
          </b>
        );
      } else {
        setError(
          <b style={{ color: "#0e9e0e", fontSize: "1.2em" }} id="updateMessage">
            Password successfully updated...
          </b>
        );
      }
    });
  };

  return (
    <div className="signup-form">
      <form onSubmit={submitHandler}>
        <center>
          <h3>Change Password</h3>
          <br />
          {error}
        </center>

        <label style={{ margin: "0px", fontSize: "1.2em" }}>Old Password</label>
        <div className="form-group">
          <i className="fa fa-lock"></i>
          <input
            type="password"
            className="form-control input-lg"
            name="oldPwd"
            required
            onChange={handleChange}
          />
        </div>

        <label style={{ margin: "0px", fontSize: "1.2em" }}>New Password</label>
        <div className="form-group">
          <i className="fa fa-lock"></i>
          <input
            type="password"
            className="form-control input-lg"
            name="password"
            required
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <button
            type="submit"
            className="btn btn-success btn-lg btn-block signup-btn"
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
