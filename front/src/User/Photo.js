import React, { useState } from "react";
import { isAuthenticated } from "../Components/apiCore";
import { URL } from "../config";
import { userPhoto } from "./apiUser";

const Photo = () => {
  const { user } = isAuthenticated();

  const [photo, setPhoto] = useState(user.photo);

  const changeHandler = (event) => {
    console.log("event: ", event);
    const value = event.target.files[0];
    setPhoto({ ...photo, value });

    if (photo !== "") {
      console.log("photo: ", photo);

      const formData = new FormData();
      formData.append("id", user._id);
      formData.append("photo", photo);

      userPhoto(formData).then((data) => {
        data = data.data;
        console.log("data: ", data);
        if (data.result) {
          setPhoto(data.result);
        }
      });
    }
  };

  return (
    <label htmlFor="image">
      <input
        type="file"
        name="photo"
        accept="image/*"
        style={{ display: "none" }}
        onChange={changeHandler}
      />
      <img
        className="img"
        src={`${URL}/images/user/${photo}`}
        alt="Card image"
        style={{ cursor: "pointer", marginBottom: "0" }}
      />
    </label>
  );
};

export default Photo;
