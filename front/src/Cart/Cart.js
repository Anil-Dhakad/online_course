import React, { Fragment, useState, useEffect } from "react";
import Card from "./Card";
import { removeCourse } from "./apiCart";
import CheckOut from "../Order/CheckOut";

const Cart = (props) => {
  const carts = props.cart;
  console.log("carts: ", carts);

  let tprice = 0;
  let tlength = 0;

  carts.forEach((element) => {
    tprice = tprice + element.course.price;
    tlength = tlength + 1;
  });

  const removeHandler = (_id) => {
    console.log("id: ", _id);
    removeCourse({ _id }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        window.location.reload();
      }
    });
  };

  return (
    <Fragment>
      <center>
        <h3 style={{ textDecoration: "underline" }}>Shopping Cart</h3>
      </center>

      {tlength === 0 ? (
        <h5 className="m-4">
          Your Cart is empty &nbsp;
          <a
            onClick={() => props.clickHandler("home")}
            style={{
              cursor: "pointer",
              color: "blue",
              textDecoration: "underline",
            }}
          >
            Continue
          </a>
        </h5>
      ) : (
        <Fragment>
          <div className="row">
            <div className="col-lg-8">
              {carts &&
                carts.map((cart, i) => (
                  <Card key={i} cart={cart} clickHandler={removeHandler} />
                ))}
            </div>
            <div className="col-lg-4">
              <div
                className="mb-3 bg-white mt-3 p-2 rounded card"
                style={{ width: "100%" }}
              >
                <h6
                  className="mb-3"
                  style={{ color: "#000000", textAlign: "center" }}
                >
                  Subtotal amount of {tlength} courses
                </h6>

                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Temporary amount
                    <span>₹{tprice}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                      <strong>
                        <p className="mb-0">(including VAT)</p>
                      </strong>
                    </div>
                    <span>
                      <strong>₹{tprice}</strong>
                    </span>
                  </li>
                </ul>

                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  data-toggle="modal"
                  data-target="#checkout"
                >
                  GO TO CHECKOUT
                </button>
              </div>
            </div>
          </div>

          {/* ///////////////////////  CheckOut //////////////////////// */}

          <div className="modal fade" id="checkout">
            <div className="modal-dialog modal-md">
              <div className="modal-content">
                <div className="modal-header" style={{ padding: "0.5em 1em" }}>
                  <h5 className="modal-title">Check Out</h5>
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>

                <div className="modal-body text-body pt-0">
                  <CheckOut carts={carts} clickHandler={props.clickHandler} />
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
