import React from "react";
import { becomeInstructor } from "./apiUser";
import { isAuthenticated, updateAuthenticate } from "../Components/apiCore";

const BecomeAnInstructor = () => {
  const { user } = isAuthenticated();

  const submitHandler = () => {
    const _id = user._id;
    const role = "instructor";
    becomeInstructor({ _id, role }).then((data) => {
      if (data.error) {
        console.log("become-data: ", data.error);
      } else {
        updateAuthenticate(data, () => {
          window.location.reload();
        });
      }
    });
  };

  return (
    <div className="signup-form">
      <center>
        <h4>Want to be an Instructor ?</h4>
        <br />

        <button
          type="submit"
          className="btn btn-success"
          onClick={submitHandler}
        >
          Switch to Instructor view
        </button>
      </center>
    </div>
  );
};

export default BecomeAnInstructor;
