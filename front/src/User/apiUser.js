import { API } from "../config";
import axios from "axios";

//////////////////////// User ///////////////////////////

export const userPhoto = (formData) => {
  return axios
    .post(`${API}/user/photo`, formData)
    .then((response) => {
      return response;
    })
    .catch((err) => console.log(err));
};

export const profile = (data) => {
  return fetch(`${API}/profile`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const changePwd = (data) => {
  return fetch(`${API}/changepwd`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const becomeInstructor = (data) => {
  return fetch(`${API}/become`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
