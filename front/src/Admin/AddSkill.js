import React, { useState, useEffect, Fragment } from "react";
import { createSkill, deleteSkill, showAllSkill, editSkill } from "./apiAdmin";

const AddSkill = () => {
  const [values, setValues] = useState({
    name: "",
    skills: "",
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
  const { name, skills } = values;

  const showSkills = () => {
    showAllSkill().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setValues({ ...values, skills: data });
      }
    });
  };

  useEffect(() => {
    showSkills();
  }, []);

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
      editSkill({ _id, name }).then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setValues("");
          showSkills();
        }
      });
    }
  };

  const deleteHandler = (_id) => {
    setError("");
    deleteSkill({ _id }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        showSkills();
      }
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    createSkill({ name }).then((data) => {
      if (data.error) {
        setError(
          <b style={{ color: "#0e9e0e" }}>
            Skill&nbsp;
            <b style={{ textDecoration: "underline", color: "red" }}>{name}</b>
            &nbsp; is already available...
          </b>
        );
      } else {
        showSkills();
        setError(
          <b style={{ color: "#0e9e0e" }}>
            Skill&nbsp;
            <b style={{ textDecoration: "underline", color: "red" }}>{name}</b>
            &nbsp; is successfully submitted...
          </b>
        );
      }
    });
  };

  const skillForm = () => {
    return (
      <div
        className="container"
        style={{ height: "32em", overflow: "auto", textAlign: "center" }}
      >
        <h3 className="h3-header">Skills/Technologies</h3>
        <table className="table">
          <thead>
            <tr className="row table-head">
              <th className="col">SNo.</th>
              <th className="col">SKILL NAME</th>
              <th className="col">EDIT</th>
              <th className="col">DELETE</th>
            </tr>
          </thead>
          <tbody>
            {skills &&
              skills.map((s, i) => (
                <tr key={i} className="row">
                  <td className="col">
                    <b>{i + 1}</b>
                  </td>
                  <td
                    className="col"
                    id={`del1_${i}`}
                    style={{ display: "block" }}
                  >
                    {s.name}
                  </td>
                  <td
                    className="col"
                    id={`show1_${i}`}
                    style={{ display: "none" }}
                  >
                    <input
                      name="name"
                      type="text"
                      required
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
                      onClick={() => showClick(i, s.name)}
                    >
                      EDIT
                    </button>
                    <button
                      className="btn btn-primary"
                      id={`show2_${i}`}
                      style={{ padding: "0em 0.5em", display: "none" }}
                      onClick={() => editHandler(s._id)}
                    >
                      Save
                    </button>
                  </td>

                  <td className="col">
                    <button
                      className="btn btn-danger"
                      style={{ padding: "0em 0.5em" }}
                      onClick={() => deleteHandler(s._id)}
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

  const newSkill = () => (
    <form onSubmit={submitHandler}>
      <div className="container p-2">
        <div className="row">
          <div className="col-md-3 mt-1">
            <label style={{ fontSize: "1.2em", float: "right" }}>
              Add New Skill:
            </label>
          </div>
          <div className="col-md-6 mb-1">
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
      {skillForm()}
      <br />
      {newSkill()}
    </Fragment>
  );
};

export default AddSkill;
