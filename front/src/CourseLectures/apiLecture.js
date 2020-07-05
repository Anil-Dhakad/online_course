import { API } from "../config";
import axios from "axios";

////////////////////////////////////  Sections  ////////////////////////////////////////
export const createSection = (data) => {
  return fetch(`${API}/section/create`, {
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

export const showAllSection = (id) => {
  console.log("id-section: ", id);
  return fetch(`${API}/section/${id}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const editSection = (data) => {
  return fetch(`${API}/section/edit`, {
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

///////////////////////////////  Lectures ///////////////////////////////////

export const createLecture = (formData) => {
  return axios
    .post(`${API}/lecture/create`, formData)
    .then((response) => {
      return response;
    })
    .catch((err) => console.log(err));
};
