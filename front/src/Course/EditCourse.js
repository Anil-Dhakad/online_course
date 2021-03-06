import React, { useState, Fragment } from "react";
import { editCourse } from "./apiCourse";
import $ from "jquery";

const EditCourse = ({ categories, skills, course }) => {
  // console.log("course: ", course.skills);

  const [values, setValues] = useState({
    name: course.name,
    description: course.description,
    price: course.price,
    category: course.category._id,
    categoryName: course.category.name,
  });
  const [items, setSkill] = useState(course.skills);

  const [error, setError] = useState();

  const handleChange = (event) => {
    setError("");
    const name = event.target.name;
    const value = event.target.value;
    setValues({ ...values, [name]: value });
  };

  const searchSkill = (idd) => {
    $(document).on("keyup", "#search" + idd, function () {
      var input, filter, ul, li, a, i, txtValue;
      input = document.getElementById("search" + idd).value;

      filter = input.toUpperCase();
      li = document.getElementsByClassName("chip");
      for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("button")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
        } else {
          li[i].style.display = "none";
        }
      }
    });
  };

  const skillHandler = (event) => {
    const val = event.target.value;

    $("#chips" + val + course._id).toggleClass("chip-change");

    setError("");
    event.preventDefault();
    if (items.find((element) => element === val)) {
      items.splice(items.indexOf(val), 1);
    } else {
      setSkill([...items, val]);
    }
  };

  const { name, description, price, category, categoryName } = values;

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(values, items);

    if (
      items.length === 0 ||
      name === "" ||
      description === "" ||
      category === "" ||
      price === ""
    ) {
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

      const courseData = {
        id: course._id,
        name: name,
        description: description,
        price: price,
        category: category,
        skills: items,
      };

      editCourse(courseData).then((data) => {
        if (data.error === "all fields") {
          setError(
            <div className="alert alert-danger p-1">
              <strong style={{ color: "red" }}>
                <i className="fa fa-info-circle" />
                &nbsp; All fields are required...
              </strong>
            </div>
          );
        } else if (data.msg === "updated") {
          window.location.reload();
        } else if (data.error) {
          setError(
            <div className="alert alert-danger p-2">
              <i className="fa fa-info-circle" />
              &nbsp;
              <strong>{data.error}</strong>
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

  const modalBody = () => (
    <form onSubmit={submitHandler}>
      <div className="form-group">
        <label style={{ margin: "0px", width: "40%", fontSize: "1.3em" }}>
          Course Image:
        </label>

        <button
          className="btn btn-primary"
          style={{ width: "30%" }}
          data-dismiss="modal"
          data-toggle="modal"
          data-target={"#photo" + course._id}
        >
          Change Image
        </button>
      </div>

      <div className="form-group">
        <label style={{ margin: "0px", width: "19%", fontSize: "1.3em" }}>
          Name:
        </label>
        <input
          type="text"
          name="name"
          className="form-control"
          required
          style={{ float: "right", width: "80%", paddingLeft: "0.5em" }}
          value={name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label className="text-muted" style={{ margin: "0px" }}>
          Description :
        </label>
        <textarea
          type="text"
          name="description"
          required
          className="form-control"
          style={{ padding: "0.3em", height: "12vh" }}
          value={description}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="form-group">
        <label
          style={{
            margin: "0px",
            width: "19%",
            fontSize: "1.3em",
            float: "left",
          }}
        >
          Price:
        </label>
        <input
          type="number"
          name="price"
          className="form-control"
          required
          style={{
            width: "30%",
            display: "inline-block",
            paddingLeft: "0.5em",
          }}
          value={price}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label
          style={{
            margin: "0px",
            width: "25%",
            fontSize: "1.3em",
          }}
        >
          Category:
        </label>
        <select
          name="category"
          required
          className="custom-select"
          style={{ float: "right", width: "73%" }}
          onChange={handleChange}
        >
          <option value={course.category._id}>{categoryName}</option>
          {categories &&
            categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <label
          style={{
            margin: "0px",
            width: "25%",
            fontSize: "1.3em",
            float: "left",
          }}
        >
          Skills:
        </label>
        <div>
          <i
            className="fa fa-search"
            style={{ fontSize: "1.6em", color: "#a18ace" }}
            aria-hidden="true"
          ></i>
          <input
            type="text"
            id={"search" + course._id}
            placeholder="Search..."
            title="Search Skills"
            className="form-control input-sm editSearch"
            style={{
              // width: "50%",
              height: "5vh",
              display: "inline",
            }}
            onChange={() => searchSkill(course._id)}
          />
        </div>
      </div>

      <div className="form-group search_box">
        {skills &&
          skills.map((s, i) => {
            if (course.skills.includes(s._id)) {
              return (
                <div
                  className="chip chip-change"
                  id={"chips" + s._id + course._id}
                  key={i}
                  onClick={skillHandler}
                >
                  <button
                    style={{ background: "transparent", border: "transparent" }}
                    value={s._id}
                  >
                    {s.name}
                  </button>
                </div>
              );
            } else {
              return (
                <div
                  className="chip"
                  id={"chips" + s._id + course._id}
                  key={i}
                  onClick={skillHandler}
                >
                  <button
                    style={{ background: "transparent", border: "transparent" }}
                    value={s._id}
                  >
                    {s.name}
                  </button>
                </div>
              );
            }
          })}
      </div>

      <hr style={{ width: "106%", margin: "2% 0% 2% -3%" }} />

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
          className="btn btn-secondary"
          style={{ marginLeft: "2%" }}
          data-dismiss="modal"
        >
          Close
        </button>
      </center>
    </form>
  );

  return (
    <Fragment>
      {error}
      {modalBody()}
    </Fragment>
  );
};

export default EditCourse;
