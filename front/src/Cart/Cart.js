import React, { Fragment, useState, useEffect } from "react";
import Card from "./Card";

const Cart = (props) => {
  const carts = props.cart;
  console.log("carts: ", carts);

  let tprice = 0;

  carts.forEach((element) => {
    console.log("element: ", element.course.price);
    tprice = tprice + element.course.price;
  });

  const deleteHandler = (_id) => {
    console.log("id: ", _id);
    // deleteCourse({ _id }).then((data) => {
    //   if (data.error) {
    //     setError(data.error);
    //   } else {
    //     window.location.reload();
    //   }
    // });
  };

  return (
    <Fragment>
      <center>
        <h3>Shopping Cart</h3>
      </center>

      <div className="row">
        <div className="col-lg-8">
          {carts &&
            carts.map((cart, i) => (
              <Card key={i} cart={cart} clickHandler={deleteHandler} />
            ))}
        </div>
        <div className="col-lg-4">
          <div
            className="mb-3 bg-white mt-3 p-2 rounded card"
            style={{ width: "100%" }}
          >
            <h5 className="mb-3">The total amount of</h5>

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

            <button type="button" className="btn btn-primary btn-block">
              GO TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Cart;
