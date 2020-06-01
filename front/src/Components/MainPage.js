import React, { useState, useEffect } from "react";
import { showAllCourse } from "../Course/apiCourse";
import { showAllCategory, showAllSkill } from "../Admin/apiAdmin";
import ShowCard from "../Course/ShowCard";
import { searchCourse } from "./apiCore";

const MainPage = (props) => {
  const [courses, setCourses] = useState();
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

  const ShowCourses = () => {
    showAllCourse().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCourses(data);
      }
    });
  };

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
    ShowCourses();
  }, []);

  const loadSearch = () => {
    console.log("values: ", values);
    if (search && category !== "") {
      searchCourse(values).then((data) => {
        if (data.error) {
          console.log("MainPage: ", data.error);
        } else {
          setCourses(data);
          setValues({ ...values, search: false, message: true });
        }
      });
    } else if (search && category === "") {
      ShowCourses();
      setValues({ ...values, search: false, message: true });
    }
  };

  const showMessage = () => {
    if (message && courses.length < 1) {
      return <h4>No course found from your search</h4>;
    }
  };

  const SearchBox = () => {
    return (
      <span
        className="input-group-text"
        style={{
          padding: "0.1rem",
          margin: "1.05em 0 0 -1.3em",
          width: "100%",
          position: "fixed",
          zIndex: "1000",
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
            <select className="btn btn-secondary m-1 rounded">
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
    <div style={{ padding: "3.1em 0 0 1.5em" }}>
      {loadSearch()}
      {SearchBox()}
      <br />
      <br />
      <br className="mob" />
      <br className="mob" />
      <br className="mob" />
      {showMessage()}
      <div>
        {courses &&
          courses.map((course, i) => (
            <ShowCard
              key={i}
              course={course}
              AddToCart={false}
              clickHandler={props.clickHandler}
            />
          ))}
      </div>
    </div>
  );
};

export default MainPage;
