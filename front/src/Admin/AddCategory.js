import React, { useState, useEffect, Fragment } from "react";
import {
  createCategory,
  showAllCategory,
  editCategory,
  deleteCategory,
} from "./apiAdmin";

const AddCategory = () => {
  const [values, setValues] = useState({
    name: "",
    categories: "",
  });
  const [editvalue, setEditvalue] = useState({
    name: "",
  });
  const [error, setError] = useState();

  const changeHandler = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    setError("");
  };
  const changeEdit = (event) => {
    setEditvalue({ ...editvalue, [event.target.name]: event.target.value });
    setError("");
  };

  const { name, categories } = values;

  const showCategories = () => {
    showAllCategory().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setValues({ ...values, categories: data });
      }
    });
  };

  useEffect(() => {
    showCategories();
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    createCategory({ name }).then((data) => {
      if (data.error) {
        setError(
          <b style={{ color: "#0e9e0e" }}>
            Category&nbsp;
            <b style={{ textDecoration: "underline", color: "red" }}>{name}</b>
            &nbsp; is already available...
          </b>
        );
      } else {
        showCategories();
        setError(
          <b style={{ color: "#0e9e0e" }}>
            Category&nbsp;
            <b style={{ textDecoration: "underline", color: "red" }}>{name}</b>
            &nbsp; is successfully submitted...
          </b>
        );
      }
    });
  };

  const showClick = (child, clickName) => {
    setError("");
    setEditvalue({ name: clickName });
    document.getElementById("del1_" + child).style.display = "none";
    document.getElementById("del2_" + child).style.display = "none";
    document.getElementById("show1_" + child).style.display = "block";
    document.getElementById("show2_" + child).style.display = "inline";
  };

  const editHandler = (_id) => {
    const name = editvalue.name;
    if (name !== "") {
      editCategory({ _id, name }).then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setValues("");
          showCategories();
        }
      });
    }
  };

  const deleteHandler = (_id) => {
    setError("");
    deleteCategory({ _id }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        showCategories();
      }
    });
  };

  const categoryForm = () => {
    return (
      <div
        className="container"
        style={{ height: "32em", overflow: "auto", textAlign: "center" }}
      >
        <h3 className="h3-header">Categories</h3>
        <table className="table">
          <thead>
            <tr className="row table-head">
              <th className="col">SNo.</th>
              <th className="col">CATEGORY NAME</th>
              <th className="col">EDIT</th>
              <th className="col">DELETE</th>
            </tr>
          </thead>
          <tbody>
            {categories &&
              categories.map((c, i) => (
                <tr key={i} className="row">
                  <td className="col">
                    <b>{i + 1}</b>
                  </td>
                  <td
                    className="col"
                    id={`del1_${i}`}
                    style={{ display: "block" }}
                  >
                    {c.name}
                  </td>
                  <td
                    className="col"
                    id={`show1_${i}`}
                    style={{ display: "none" }}
                  >
                    <input
                      name="name"
                      type="text"
                      className="form-control input-md"
                      style={{ fontSize: "18px", border: "1px solid #d4cccc" }}
                      onChange={changeEdit}
                      value={editvalue.name}
                    />
                  </td>
                  <td className="col">
                    <button
                      className="btn btn-warning"
                      id={`del2_${i}`}
                      style={{ padding: "0em 0.5em", display: "inline" }}
                      onClick={() => showClick(i, c.name)}
                    >
                      EDIT
                    </button>
                    <button
                      className="btn btn-primary"
                      id={`show2_${i}`}
                      style={{ padding: "0em 0.5em", display: "none" }}
                      onClick={() => editHandler(c._id)}
                    >
                      Save
                    </button>
                  </td>
                  <td className="col">
                    <button
                      className="btn btn-danger"
                      style={{ padding: "0em 0.5em" }}
                      onClick={() => deleteHandler(c._id)}
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  };

  const newCategory = () => (
    <form onSubmit={submitHandler}>
      <div className="container p-2">
        <div className="row">
          <div className="col-md-3 mt-1">
            <label style={{ fontSize: "1.2em", float: "right" }}>
              Add New Category:
            </label>
          </div>
          <div className="col-md-6">
            <input
              name="name"
              type="text"
              required
              className="form-control input-md"
              style={{ fontSize: "18px", border: "1px solid #d4cccc" }}
              onChange={changeHandler}
            />
          </div>
          <div className="col-md-3" style={{ float: "left" }}>
            <button type="submit" className="btn btn-success mr-2">
              Submit
            </button>
          </div>
        </div>
        {error}
      </div>
    </form>
  );
  return (
    <Fragment>
      {categoryForm()}
      <br />
      {newCategory()}
    </Fragment>
  );
};

export default AddCategory;
