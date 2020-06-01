import { API } from "../config";

export const addCartItem = (item) => {
  // console.log("cart: ", item);
  return fetch(`${API}/cart/add`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const showCartItem = (user) => {
  // console.log("user: ", user);
  return fetch(`${API}/cart/list`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// export const editCategory = (edit_Id) => {
//   // console.log("edit_id: ", edit_Id);
//   return fetch(`${API}/category/edit`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(edit_Id),
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

export const removeCourse = (delete_Id) => {
  console.log("delete_id: ", delete_Id);
  return fetch(`${API}/cart/remove`, {
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
