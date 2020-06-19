import React, { useState, Fragment } from "react";
import { isAuthenticated, updateAuthenticate } from "../Components/apiCore";
import { URL } from "../config";
import { userPhoto } from "./apiUser";

const Photo = () => {
  const { user } = isAuthenticated();

  const [values, setValues] = useState({
    photo: user.photo,
    update: false,
  });

  const { photo, update } = values;

  const changeHandler = (event) => {
    const value = event.target.files[0];
    if (value.type.includes("image/")) {
      setValues({ photo: value, update: true });
    }
  };

  const submitPhoto = () => {
    if (update) {
      const formData = new FormData();
      formData.append("id", user._id);
      formData.append("photo", photo);

      userPhoto(formData).then((data) => {
        data = data.data;
        if (data.result) {
          updateAuthenticate({ image: data.result }, () => {
            setValues({ ...values, photo: data.result, update: false });
          });
        }
      });
    }
  };

  return (
    <Fragment>
      {submitPhoto()}
      <label htmlFor="image">
        <input
          type="file"
          name="photo"
          id="image"
          accept="image/*"
          style={{ display: "none" }}
          onChange={changeHandler}
        />
        <img
          className="img"
          src={`/images/user/${photo}`}
          alt="profile image"
          title="Change your pic"
          style={{ cursor: "pointer", marginBottom: "0" }}
        />
      </label>
    </Fragment>
  );
};

export default Photo;
