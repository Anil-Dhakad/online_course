import React, { Fragment } from "react";
import moment from "moment";
import { URL } from "../config";
import EditCourse from "../Course/EditCourse";

const Card = (props) => {
  const course = props.course;
  const categories = props.categories;
  const skills = props.skills;

  // console.log(course);

  return (
    <Fragment>
      <div
        className="card"
        style={{
          width: "45vh",
          height: "auto",
          display: "inline-block",
          margin: "2vh",
        }}
      >
        <a
          style={{ cursor: "pointer" }}
          data-toggle="modal"
          data-target={"#m" + course._id}
        >
          <img
            className="card-img-top"
            src={`${URL}/images/course_profile/${course.photo}`}
            alt="Card image"
            style={{ width: "100%", height: "30vh" }}
          />
          <div className="card-body">
            <h6
              className="card-title"
              style={{ fontWeight: "bold", color: "#000000" }}
            >
              {course.name}
            </h6>
            <p className="card-text">{course.user.name}</p>
            <h6
              className="card-title"
              style={{ float: "right", color: "#228a22", fontWeight: "bold" }}
            >
              ₹{course.price}
            </h6>
          </div>
        </a>
      </div>

      <div className="modal fade" id={"m" + course._id}>
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div
              className="modal-header"
              style={{ padding: "0.5rem 1rem 0rem", display: "block" }}
            >
              <h5 className="modal-title">{course.name}</h5>
              <p style={{ float: "right" }}>
                Created : {moment(course.createdAt).fromNow()}
              </p>
            </div>

            <div
              className="modal-body"
              style={{ padding: "0.5rem 1rem 0.5rem" }}
            >
              <div style={{ display: "flow-root" }}>
                <h6 style={{ float: "left" }}>
                  <i
                    className="fa fa-square"
                    style={{ fontSize: "0.77rem", color: "yellowgreen" }}
                  ></i>
                  <i
                    className="fa fa-caret-right"
                    style={{ fontSize: "0.8rem", color: "yellowgreen" }}
                  ></i>
                  {course.category.name}
                </h6>
                <p style={{ float: "right" }}>
                  by&nbsp;
                  <label style={{ color: "#000000" }}>{course.user.name}</label>
                </p>
              </div>
              <p style={{ marginTop: "0.5em" }}>{course.description}</p>
            </div>
            <div
              className="modal-footer"
              style={{ padding: "0.5rem 1rem 0.5rem" }}
            >
              <button
                className="btn btn-warning"
                data-dismiss="modal"
                data-toggle="modal"
                data-target={"#e" + course._id}
              >
                Edit Course
              </button>
              <button
                className="btn btn-danger"
                data-dismiss="modal"
                data-toggle="modal"
                data-target={"#del" + course._id}
              >
                Delete Course
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id={"e" + course._id}>
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            {/* <div className="modal-header" style={{ padding: "0.5em 1em" }}> */}
            <div
              className="modal-header"
              style={{ padding: "0.5rem 1rem 0rem", display: "block" }}
            >
              <h5 className="modal-title" style={{ float: "left" }}>
                {course.name}
              </h5>
              <button
                type="button"
                className="close"
                style={{ float: "right" }}
                data-dismiss="modal"
              >
                &times;
              </button>
              <br />
              <p style={{ float: "right" }}>
                Created : {moment(course.createdAt).fromNow()}
              </p>
            </div>

            <div className="modal-body">
              <EditCourse
                categories={categories}
                skills={skills}
                course={course}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id={"del" + course._id}>
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-header" style={{ padding: "0.5em 1em" }}>
              <h4 className="modal-title">Delete Course</h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>
            <div className="modal-body text-body">
              <h6>
                Are you sure! you want to delete course{" "}
                <b className="text-warning">{course.name}</b>
                &nbsp; created by&nbsp;
                <b className="text-success">{course.user.name}</b> on&nbsp;
                <b className="text-success">{course.createdAt}</b>.
              </h6>
            </div>
            <div
              className="modal-footer"
              style={{ padding: "0.5rem 1rem 0.5rem" }}
            >
              <button
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={() => props.delHandler(course._id)}
              >
                Yes
              </button>
              <button className="btn btn-secondary" data-dismiss="modal">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Card;
