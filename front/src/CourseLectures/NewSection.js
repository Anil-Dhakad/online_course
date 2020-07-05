import React, { useState, useEffect, Fragment } from "react";
import { createSection, showAllSection } from "./apiLecture";

const NewSection = ({ course }) => {
  // console.log("course: ", course);
  const [values, setValues] = useState({
    courseId: course._id,
    sectionNo: "1",
    name: "",
  });
  const [error, setError] = useState();

  const getSection = () => {
    showAllSection(course._id).then((data) => {
      // console.log("data-section: ", data);
      if (data.error) {
        console.log("getCourseById: ", data.error);
      } else if (data.length !== 0) {
        setValues({
          ...values,
          sectionNo: data[data.length - 1].sectionNo + 1,
        });
      }
    });
  };

  useEffect(() => {
    getSection();
  }, []);

  const handleChange = (event) => {
    setError("");
    const name = event.target.name;
    const value = event.target.value;
    setValues({ ...values, [name]: value });
  };

  const { sectionNo, name } = values;

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(values);

    if (sectionNo === "" || name === "") {
      setError(
        <div className="alert alert-danger p-1">
          <strong style={{ color: "red" }}>
            <i className="fa fa-info-circle" />
            &nbsp; All fields are required...
          </strong>
        </div>
      );
    } else {
      setError("");

      createSection(values).then((data) => {
        // data = data.data;
        console.log("data:", data);
        if (data.error === "not") {
          setError(
            <div className="alert alert-warning p-2">
              <strong>
                <i
                  className="fa fa-info-circle"
                  style={{ fontSize: "1.2em", margin: "0.3em -0.2em" }}
                />
                &nbsp;&nbsp;&nbsp;&nbsp; Section &nbsp;
                <b style={{ color: "#30bd30" }}>{name}</b> is already
                available...
              </strong>
            </div>
          );
        } else if (data.res) {
          setError(
            <div className="alert alert-success p-2">
              <strong>
                Section <b style={{ color: "#30bd30" }}>{name}</b> is
                successfully created...
              </strong>
            </div>
          );
        } else {
          setError(
            <div className="alert alert-danger p-2">
              <strong>Something went wrong...</strong>
            </div>
          );
        }
      });
    }
  };

  return (
    <div className="form-group">
      <form onSubmit={submitHandler}>
        <div className="form-group">
          {error}
          <label
            style={{ margin: "1em 0 0", width: "25%", fontWeight: "bold" }}
          >
            Course :
          </label>
          <label style={{ margin: "1em 0 0", float: "right", width: "74%" }}>
            {course.name}
          </label>
        </div>
        <div className="form-group">
          <label
            style={{ margin: "0.5em 0 0", width: "25%", fontWeight: "bold" }}
          >
            Section No.:
          </label>
          <input
            type="number"
            name="sectionNo"
            className="form-control"
            required
            value={sectionNo}
            onChange={handleChange}
            style={{ float: "right", width: "74%", paddingLeft: "0.5em" }}
          />
        </div>
        <div className="form-group">
          <label
            style={{ margin: "0.5em 0 0", width: "25%", fontWeight: "bold" }}
          >
            Section Name:
          </label>
          <input
            type="text"
            name="name"
            className="form-control"
            required
            style={{ float: "right", width: "74%", paddingLeft: "0.5em" }}
            onChange={handleChange}
          />
        </div>

        <br />
        <center>
          <button
            type="submit"
            className="btn btn-success"
            style={{ marginRight: "2%" }}
          >
            Submit
          </button>
          <button
            type="button"
            className="btn btn-info"
            style={{ marginLeft: "2%" }}
            data-dismiss="modal"
          >
            Cancel
          </button>
        </center>
      </form>
    </div>
  );
};

export default NewSection;
