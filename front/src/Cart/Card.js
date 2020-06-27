import React, { Fragment, useState } from "react";
import moment from "moment";
import { isAuthenticated } from "../Components/apiCore";

const Card = (props) => {
  const cart = props.cart;

  // console.log("items: ", cart);

  const { user } = isAuthenticated();

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
        <img
          className="card-img-top"
          src={`/images/course_profile/${cart.course.photo}`}
          alt="Card image"
          style={{ width: "100%", height: "25vh" }}
        />
        <div className="card-body">
          <h6
            className="card-title"
            style={{ fontWeight: "bold", color: "#000000" }}
          >
            {cart.course.name}
          </h6>
          {/* <p className="card-text">{course.user.name}</p> */}
          <h6
            className="card-title"
            style={{ float: "right", color: "#228a22", fontWeight: "bold" }}
          >
            ₹{cart.course.price}
          </h6>
          <br />
          <strong
            className="remove"
            onClick={() => props.clickHandler(cart._id)}
          >
            <i className="fa fa-trash-alt" />
            &nbsp; Remove
          </strong>
        </div>
      </div>
    </Fragment>
  );
};

export default Card;
