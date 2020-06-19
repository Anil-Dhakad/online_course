import { API } from "../config";
import axios from "axios";

export const createCourse = (formData) => {
  return axios
    .post(`${API}/course/create`, formData)
    .then((response) => {
      return response;
    })
    .catch((err) => console.log(err));
};

export const showAllCourse = () => {
  return fetch(`${API}/course/courses`, {
    method: "POST",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editCourse = (course) => {
  console.log("course_Data: ", course);
  return fetch(`${API}/course/edit`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(course),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editPhoto = (formData) => {
  return axios
    .post(`${API}/course/photo`, formData)
    .then((response) => {
      return response;
    })
    .catch((err) => console.log(err));
};

export const deleteCourse = (delete_Id) => {
  // console.log("delete_id: ", delete_Id);
  return fetch(`${API}/course/delete`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(delete_Id),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
