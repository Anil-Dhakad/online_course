import { API } from "../config";

////////////////////////////////////---- User ----////////////////////////////////

export const showAllUser = () => {
  return fetch(`${API}/user/users`, {
    method: "POST",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editUser = (edit_Id) => {
  // console.log("edit_id: ", edit_Id);
  return fetch(`${API}/skill/edit`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(edit_Id),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteUser = (delete_Id) => {
  // console.log("delete_id: ", delete_Id);
  return fetch(`${API}/skill/delete`, {
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

////////////////////////////////---- Category ----//////////////////////////////

export const createCategory = (category) => {
  // console.log("category: ", category);
  return fetch(`${API}/category/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const showAllCategory = () => {
  return fetch(`${API}/category/categories`, {
    method: "POST",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editCategory = (edit_Id) => {
  // console.log("edit_id: ", edit_Id);
  return fetch(`${API}/category/edit`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(edit_Id),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteCategory = (delete_Id) => {
  // console.log("delete_id: ", delete_Id);
  return fetch(`${API}/category/delete`, {
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

////////////////////////////////////---- Skill ----////////////////////////////////

export const createSkill = (skill) => {
  // console.log("skill: ", skill);
  return fetch(`${API}/skill/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(skill),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const showAllSkill = () => {
  return fetch(`${API}/skill/skills`, {
    method: "POST",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editSkill = (edit_Id) => {
  // console.log("edit_id: ", edit_Id);
  return fetch(`${API}/skill/edit`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(edit_Id),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteSkill = (delete_Id) => {
  // console.log("delete_id: ", delete_Id);
  return fetch(`${API}/skill/delete`, {
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
