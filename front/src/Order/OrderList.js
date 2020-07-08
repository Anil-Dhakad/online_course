import React, { Fragment, useState, useEffect } from "react";
import { isAuthenticated } from "../Components/apiCore";
import { ordersByUserId } from "../Order/apiOrder";
import Card from "../Cart/Card";

const OrderList = (props) => {
  const [orders, setOrders] = useState();

  const { user } = isAuthenticated();

  const orderlist = () => {
    const id = user._id;
    ordersByUserId({ id }).then((data) => {
      console.log("order: ", data);
      if (data.error) {
        console.log("Order Item: ", data.error);
      } else {
        setOrders(data);
      }
    });
  };

  useEffect(() => {
    orderlist();
  }, []);

  return (
    <Fragment>
      <center>
        {user && user.role === "instructor" ? (
          <h3 style={{ textDecoration: "underline" }}>Order List</h3>
        ) : (
          <h3 style={{ textDecoration: "underline" }}>My Courses</h3>
        )}
      </center>

      {orders && orders.length === 0 ? (
        <h5 className="m-4">
          No order has been placed yet &nbsp;
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
        <div>
          {orders &&
            orders.map((order, i) => (
              <Card
                key={i}
                cart={order}
                showViewBtn={true}
                clickHandler={props.clickHandler}
              />
            ))}
        </div>
      )}
    </Fragment>
  );
};

export default OrderList;
