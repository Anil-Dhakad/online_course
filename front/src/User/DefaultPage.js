import React, { useState, useEffect, Fragment } from "react";
import { showAllCategory, showAllSkill } from "../Admin/apiAdmin";
import ShowCard from "../Course/ShowCard";
import { searchCourse, isAuthenticated } from "../Components/apiCore";

const DefaultPage = (props) => {
  const [courses, setCourses] = useState(props.courses);
  const cart = props.cart;
  const [categories, setCategories] = useState();
  const [skills, setSkills] = useState();

  const [values, setValues] = useState({
    category: "",
    skill: "",
    search: false,
    message: false,
  });

  const changeHandler = (name) => (event) => {
    const value = event.target.value;
    setValues({ ...values, [name]: value, search: true, message: false });
  };

  const { category, skill, search, message } = values;
  const { user } = isAuthenticated();

  const showCategories = () => {
    showAllCategory().then((data) => {
      if (data.error) {
        console.log("showCategories: ", data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const showSkills = () => {
    showAllSkill().then((data) => {
      if (data.error) {
        console.log("showSkills: ", data.error);
      } else {
        setSkills(data);
      }
    });
  };

  useEffect(() => {
    showCategories();
    showSkills();
  }, []);

  const loadSearch = () => {
    if (search && category !== "") {
      searchCourse(values).then((data) => {
        if (data.error) {
          console.log("DefaultPage: ", data.error);
        } else {
          setCourses(data);
          setValues({ ...values, search: false, message: true });
        }
      });
    } else if (search && category === "") {
      setCourses(props.courses);
      setValues({ ...values, search: false, message: true });
    }
  };

  const showMessage = () => {
    if (message && courses.length < 1) {
      return (
        <h5>
          <i className="fa fa-info-circle" />
          &nbsp;&nbsp;No course found from your search
        </h5>
      );
    }
  };

  const SearchBox = () => {
    return (
      <span
        className="input-group-text"
        style={{
          padding: "0.1rem",
          margin: "-1em 0 0 -0.8em",
          width: "102%",
        }}
      >
        <div className="input-group input-group-md">
          <div className="input-group-prepend">
            <select
              className="btn btn-primary m-1 rounded"
              onChange={changeHandler("category")}
            >
              <option value="">Category</option>
              {categories &&
                categories.map((c, i) => (
                  <option key={i} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="input-group-prepend">
            <select className="btn btn-secondary mt-1 mb-1 rounded">
              <option value="">Skill</option>
              {skills &&
                skills.map((s, i) => (
                  <option key={i} value={s._id}>
                    {s.name}
                  </option>
                ))}
            </select>
          </div>

          <input
            type="search"
            id="sear-home"
            className="form-control mt-1 ml-1 mr-1 rounded"
            placeholder="Search by course name"
            style={{ backgroundPosition: "8px" }}
          />

          <div className="input-group-append">
            <button className="btn btn-info m-1 rounded">Search</button>
          </div>
        </div>
      </span>
    );
  };

  return (
    <Fragment>
      {loadSearch()}
      {SearchBox()}

      {showMessage()}
      <div>
        {courses &&
          courses.map((course, i) => {
            if (course.user._id !== user._id) {
              return (
                <ShowCard
                  key={i}
                  AddToCart={false}
                  clickHandler={props.clickHandler}
                  course={course}
                  cart={cart}
                />
              );
            }
          })}
      </div>
    </Fragment>
  );
};

export default DefaultPage;
