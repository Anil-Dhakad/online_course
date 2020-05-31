import React, { useState } from "react";
import $ from "jquery";
import { profile } from "./apiUser";
import { isAuthenticated, updateAuthenticate } from "../Components/apiCore";

const Profile = (props) => {
  const { user } = isAuthenticated();

  const [values, setValues] = useState({
    name: user.name,
    email: user.email,
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    setError("");
    event.preventDefault();
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  setTimeout(function () {
    $("#updateMessage").fadeOut("slow");
  }, 5000);

  const { name, email } = values;

  const submitHandler = (event) => {
    event.preventDefault();
    const _id = user._id;
    profile({ _id, name, email }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        updateAuthenticate(data, () => {
          setError(
            <b
              style={{ color: "#0e9e0e", fontSize: "1.2em" }}
              id="updateMessage"
            >
              Profile successfully updated...
            </b>
          );
        });
      }
    });
  };

  return (
    <div className="signup-form">
      <form onSubmit={submitHandler}>
        <center>
          <h3>Edit Profile</h3>
          <br />
          {error}
        </center>

        <label style={{ margin: "0px", fontSize: "1.2em" }}>Username</label>
        <div className="form-group">
          <i className="fa fa-user-circle"></i>
          <input
            type="text"
            className="form-control input-lg"
            name="name"
            required="required"
            onChange={handleChange}
            value={name}
          />
        </div>
        <label style={{ margin: "0px", fontSize: "1.2em" }}>Email</label>
        <div className="form-group">
          <i className="fa fa-envelope"></i>
          <input
            type="email"
            className="form-control input-lg"
            name="email"
            required="required"
            onChange={handleChange}
            value={email}
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

export default Profile;
