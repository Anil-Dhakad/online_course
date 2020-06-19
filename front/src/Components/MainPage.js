import React, { useState, useEffect } from "react";
import { showAllCourse } from "../Course/apiCourse";
import { showAllCategory } from "../Admin/apiAdmin";
import ShowCard from "../Course/ShowCard";
import { searchCourse } from "./apiCore";
import SkillCheckBox from "./SkillCheckBox";
import MoreFilter from "./MoreFilter";
import { prices } from "./priceFilter";

const MainPage = (props) => {
  const [courses, setCourses] = useState();
  const [categories, setCategories] = useState();

  const [values, setValues] = useState({
    category: "",
    skill: "",
    sort: "",
    price: "",
    search: false,
    message: false,
  });

  const categoryHandler = (name) => (event) => {
    event.preventDefault();

    const value = event.target.value;
    console.log("category: ", value);
    setValues({ ...values, [name]: value, search: true, message: false });
  };

  const { category, skill, sort, price, search, message } = values;

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
      console.log("showCategory: ", data);
      if (data.error) {
        console.log("showCategories: ", data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    showCategories();
    ShowCourses();
  }, []);

  const handleCheckBox = (list) => {
    console.log("handle-check-box", list);
    setValues({ ...values, skill: list, search: true, message: false });
  };
  const handlePriceFilters = (filter1) => {
    console.log("handle-Price-filters", filter1);

    for (let key in prices) {
      if (prices[key].id === parseInt(filter1)) {
        setValues({
          ...values,
          price: prices[key].array,
          search: true,
          message: false,
        });
        break;
      }
    }
  };
  const handleSortFilters = (filter2) => {
    console.log("handle-Sort-filters", filter2);

    setValues({
      ...values,
      sort: filter2,
      search: true,
      message: false,
    });
  };

  const loadSearch = () => {
    console.log("values: ", values);
    // if (search) {
    searchCourse(values).then((data) => {
      console.log("ddddddddddddddddddddddddddddddd");
      if (data.error) {
        console.log("MainPage: ", data.error);
      } else {
        setValues({ ...values, search: false, message: true });
        setCourses(data);
      }
    });
    // }
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
              onChange={categoryHandler("category")}
            >
              <option value="" className="option">
                Category
              </option>
              {categories &&
                categories.map((c, i) => (
                  <option key={i} value={c._id} className="option">
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="input-group-prepend">
            <SkillCheckBox handleCheckBox={handleCheckBox} />
          </div>

          <input
            type="search"
            id="sear-home"
            className="form-control rounded"
            placeholder="Search by course name"
            style={{ backgroundPosition: "8px", margin: "0.15em 0.2em" }}
          />

          <div className="input-group-prepend dropdown">
            <MoreFilter
              prices={prices}
              handlePriceFilters={handlePriceFilters}
              handleSortFilters={handleSortFilters}
            />
          </div>
        </div>
      </span>
    );
  };

  return (
    <div style={{ padding: "3.1em 0 0 1.5em" }}>
      {values && values.search ? loadSearch() : ""}

      {SearchBox()}
      <br />
      <br />
      <br />
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
