import React, { useState, Fragment } from "react";
import { editCourse } from "./apiCourse";
import { isAuthenticated } from "../User/apiUser";

const EditCourse = ({ categories, skills, course }) => {
  console.log("course: ", course);
  console.log("userId: ", course.user._id);
  const [values, setValues] = useState({
    name: course.name,
    description: course.description,
    price: course.price,
    category: course.category.name,
    photo: course.photo,
    loading: false,
    redirectToProfile: false,
    formData: "",
  });
  const [items, setSkill] = useState([]);

  const [error, setError] = useState();

  const handleChange = (event) => {
    setError("");
    const name = event.target.name;
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  const skillHandler = (event) => {
    setError("");
    event.preventDefault();
    if (items.find((element) => element === event.target.value)) {
      items.splice(items.indexOf(event.target.value), 1);
    } else {
      setSkill([...items, event.target.value]);
    }
  };

  const {
    name,
    description,
    price,
    category,
    photo,
    loading,
    redirectToProfile,
    formData,
  } = values;

  const { user } = isAuthenticated();

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(values, items);

    if (
      items.length === 0 ||
      name === "" ||
      description === "" ||
      category === "" ||
      price === "" ||
      photo === ""
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
      const formData = new FormData();
      formData.append("id", course._id);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("skills", items);
      formData.append("price", price);
      formData.append("photo", photo);

      console.log("formData: ", formData);

      editCourse(formData).then((data) => {
        data = data.data;
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
          setError(
            <div className="alert alert-success p-2">
              <strong>
                Course <b style={{ color: "#30bd30" }}>{name}</b> is
                successfully updated...
              </strong>
            </div>
          );
        } else if (data.error) {
          setError(
            <div className="alert alert-danger p-2">
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
        <label style={{ margin: "0px", width: "19%", fontSize: "1.3em" }}>
          Photo:
        </label>
        <label className="btn btn-secondary" style={{ width: "80%" }}>
          <input
            type="file"
            name="photo"
            accept="image/*"
            required
            style={{ float: "left" }}
            onChange={handleChange}
          />
        </label>
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
          <option value={course.category._id}>{category}</option>
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
            id="search"
            placeholder="Search..."
            title="Search Skills"
            className="form-control input-sm"
            style={{
              // width: "50%",
              height: "5vh",
              display: "inline",
            }}
          />
        </div>
      </div>

      <div className="form-group search_box">
        {skills &&
          skills.map((s, i) => (
            <div
              className="chip"
              id={"chip" + i}
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
          ))}
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
