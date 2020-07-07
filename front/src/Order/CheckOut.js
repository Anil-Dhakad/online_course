import React, { Fragment, useState, useEffect } from "react";
import { isAuthenticated } from "../Components/apiCore";
import { submitOrder } from "./apiOrder";
import { removeCourse } from "../Cart/apiCart";

const CheckOut = (props) => {
  const carts = props.carts;
  const { user } = isAuthenticated();

  let tprice = 0;
  carts.forEach((element) => {
    tprice = tprice + element.course.price;
  });

  const placeOrder = () => {
    let len = 0;
    carts.forEach((element) => {
      const _id = element._id;
      const item = {
        user: user._id,
        course: element.course._id,
      };
      submitOrder(item).then((data) => {
        if (data.error) {
          console.log("submit order: ", data.error);
        } else {
          removeCourse({ _id }).then((data) => {
            if (data.error) {
              console.log("remove order: ", data.error);
            } else {
              len++;
              if (len >= carts.length) {
                console.log("yessssssss");
                $("#checkout").modal("hide");
                props.clickHandler("order");
              }
            }
          });
        }
      });
    });
  };

  return (
    <Fragment>
      {carts &&
        carts.map((cart, i) => (
          <div
            key={i}
            className={"row pt-1 pb-1 check" + (i % 2)}
            style={{ borderBottom: "1px solid #cdd0d4" }}
          >
            <div className="col-5">
              <img
                className="card-img-top"
                src={`/images/course_profile/${cart.course.photo}`}
                alt={cart.course.name}
                style={{ width: "100%", height: "15vh" }}
              />
            </div>
            <div className="col-7 pt-4">
              <h6>
                <strong>{cart.course.name}</strong>
              </h6>
              <p className="float-left">{cart.user.name}</p>
              <p className="float-right text-success">
                <strong>₹{cart.course.price}</strong>
              </p>
            </div>
          </div>
        ))}
      <div className="row mt-2">
        <div className="col-4 check0">
          Total
          <br />
          Total VAT
          <br />
          <strong>Order Total</strong>
        </div>
        <div className="col-3 check0">
          ₹{tprice}
          <br />
          ₹0
          <br />
          <strong>₹{tprice}</strong>
        </div>
        <div className="col-5 align-self-center text-center">
          <button
            type="button"
            className="btn btn-success"
            onClick={placeOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default CheckOut;
