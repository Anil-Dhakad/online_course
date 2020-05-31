import React from "react";
import { isAuthenticated } from "../Components/apiCore";

const SearchBar = ({ users }) => {
  const { user } = isAuthenticated();

  const selectBox = () => {
    if (user.role === "admin") {
      return (
        <div className="input-group-prepend">
          <select className="btn mr-2 bg-primary text-white rounded" id="sel">
            <option value="All">All</option>
            {users &&
              users.map((u, i) => {
                let j = 1;
                if (u.role === "instructor" || u.role === "admin") {
                  return <option key={i}>{u.name}</option>;
                }
              })}
          </select>
        </div>
      );
    }
  };

  return (
    <span
      className="input-group-text"
      style={{ padding: "0.1rem 0.2rem", margin: "2vh" }}
    >
      <div className="input-group input-group-lg">
        {selectBox()}
        <input
          type="search"
          id="sear"
          className="form-control rounded"
          placeholder="Search by course name"
        />
      </div>
      <div className="btn input-group-append" style={{ border: "none" }}>
        <button
          type="button"
          className="btn btn-secondary"
          data-toggle="modal"
          data-target="#myModal"
        >
          Add new course
        </button>
      </div>
    </span>
  );
};

export default SearchBar;
