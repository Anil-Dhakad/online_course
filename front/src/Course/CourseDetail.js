import React, { useEffect, useState, Fragment } from "react";
import EditCard from "./EditCard";
import { showAllCategory, showAllSkill, showAllUser } from "../Admin/apiAdmin";
import { deleteCourse } from "./apiCourse";
import { isAuthenticated } from "../Components/apiCore";
import NewVideo from "../CourseLectures/NewLecture";
import NewSection from "../CourseLectures/NewSection";

const CourseDetail = ({ courses }) => {
  const [categories, setCategories] = useState();
  const [skills, setSkills] = useState();
  const [users, setUsers] = useState();

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

  const showUsers = () => {
    showAllUser().then((data) => {
      if (data.error) {
        console.log("showUsers: ", data.error);
      } else {
        setUsers(data);
      }
    });
  };

  useEffect(() => {
    showCategories();
    showSkills();
    showUsers();
  }, []);

  const deleteHandler = (_id) => {
    // console.log("id: ", _id);
    deleteCourse({ _id }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        window.location.reload();
      }
    });
  };

  const { user } = isAuthenticated();

  const addVideoBtn = () => {
    return (
      <Fragment>
        <center>
          <button
            className="btn btn-primary mr-1"
            data-dismiss="modal"
            data-toggle="modal"
            data-target="#add-section"
          >
            Add New Section
          </button>

          <button
            className="btn btn-secondary ml-1"
            data-dismiss="modal"
            data-toggle="modal"
            data-target="#add-lecture"
          >
            Add New Lecture
          </button>
        </center>

        {/* ...............Course Section................ */}
        <div className="modal fade" id="add-section">
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <div className="modal-header" style={{ padding: "0.5em 1em" }}>
                <h5 className="modal-title">Add New Section</h5>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>

              <div className="modal-body text-body p-1">
                <NewSection />
              </div>
            </div>
          </div>
        </div>

        {/* ...............Course Lecture................ */}
        <div className="modal fade" id="add-lecture">
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <div className="modal-header" style={{ padding: "0.5em 1em" }}>
                <h5 className="modal-title">Upload New Lecture</h5>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>

              <div className="modal-body text-body p-1">
                <NewVideo />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  return (
    <div
      className="container-fluid bootstrap snippet bg-white"
      style={{ boxShadow: "1px 1px 20px 1px darkcyan" }}
    >
      <center>
        <h1>User name</h1>
      </center>

      <div className="row">
        <div className="col-sm-4">
          {courses &&
            courses.map((course, i) => {
              if (course._id === "5ec966d035eb2d29a4e83620") {
                return (
                  <EditCard
                    key={i}
                    categories={categories}
                    skills={skills}
                    course={course}
                    delHandler={deleteHandler}
                  />
                );
              }
            })}

          <br />
          {addVideoBtn()}
        </div>

        <div className="col-sm-8">
          <center>
            <h4>Course Sections</h4>
          </center>
          {courses &&
            courses.map((course, i) => (
              <div
                className="row m-1 mb-4"
                style={{ boxShadow: "1px 1px 5px 1px darkcyan" }}
              >
                <div
                  key={i}
                  className="bg-primary m-2 col-sm-5"
                  style={{
                    width: "95%",
                    height: "25vh",
                  }}
                ></div>
                <div
                  key={"a" + i}
                  className="bg-secondary m-2 col-sm-6"
                  style={{
                    width: "95%",
                    height: "25vh",
                  }}
                ></div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
