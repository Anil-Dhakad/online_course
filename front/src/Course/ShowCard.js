import React, { Fragment } from "react";
import moment from "moment";
import { URL } from "../config";

const ShowCard = (props) => {
  const course = props.course;
  //   const categories = props.categories;
  //   const skills = props.skills;

  const ShowAddToCartButton = () => {
    if (props.AddToCart) {
      return (
        <button
          className="btn btn-secondary"
          data-dismiss="modal"
          onClick={() => props.clickHandler("cart")}
        >
          Add to cart
        </button>
      );
    } else {
      return (
        <button
          className="btn btn-secondary"
          data-dismiss="modal"
          onClick={() => props.clickHandler("signin")}
        >
          Add to cart
        </button>
      );
    }
  };

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
              style={{ padding: "0.5rem 1rem 0.5rem", display: "block" }}
            >
              <h6
                className="pt-2"
                style={{
                  float: "left",
                }}
              >
                Discounted price :&nbsp;
                <b
                  style={{
                    color: "#228a22",
                    fontWeight: "bold",
                  }}
                >
                  ₹{course.price}
                </b>
              </h6>
              <div
                style={{
                  float: "right",
                }}
              >
                {ShowAddToCartButton()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ShowCard;
