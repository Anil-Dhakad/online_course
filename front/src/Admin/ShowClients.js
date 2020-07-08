import React, { useState, useEffect, Fragment } from "react";
import { deleteUser, showAllUser } from "./apiAdmin";
import { showAllOrder } from "../Order/apiOrder";

const ShowClients = (props) => {
  const [users, setUsers] = useState();
  const [orders, setOrders] = useState();
  const [error, setError] = useState();

  const showUsers = () => {
    showAllUser().then((data) => {
      if (data.error) {
        console.log("showUsers: ", data.error);
      } else {
        setUsers(data);
      }
    });
  };

  const orderlist = () => {
    showAllOrder().then((data) => {
      console.log("order: ", data);
      if (data.error) {
        console.log("Order Item: ", data.error);
      } else {
        setOrders(data);
      }
    });
  };

  useEffect(() => {
    showUsers();
    orderlist();
  }, []);

  const deleteHandler = (_id) => {
    setError("");
    deleteUser({ _id }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        showAll();
      }
    });
  };

  const showForm = () => {
    return (
      <div
        className="container"
        style={{
          minHeight: "20em",
          maxHeight: "40em",
          overflow: "auto",
          textAlign: "center",
        }}
      >
        <h3 className="h3-header">Clients</h3>
        <table className="table" id="example">
          <thead>
            <tr className="row table-head">
              <th className="col">SNo.</th>
              <th className="col">Profile</th>
              <th className="col">Bought Courses</th>
              <th className="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user, i) => {
                let j = 1;
                if (user.role === "client") {
                  return (
                    <tr key={i} className={"row check" + (j % 2)}>
                      <td className="col">
                        <b>{j}</b>
                      </td>
                      <td
                        className="col"
                        id={`del1_${i}`}
                        style={{ display: "block" }}
                      >
                        {user.name}
                        <br />
                        {user.email}
                      </td>

                      <td className="col" id={`del1_${i}`}>
                        {orders &&
                          orders.map((order, k) => {
                            if (order.user === user._id) {
                              return (
                                <a
                                  key={k}
                                  className="course-a"
                                  style={{
                                    display: "block",
                                    fontSize: "0.9em",
                                  }}
                                  onClick={() =>
                                    props.clickHandler(
                                      "detail-" + order.course._id
                                    )
                                  }
                                >
                                  {order.course.name}
                                </a>
                              );
                            }
                          })}
                      </td>

                      <td className="col">
                        <button
                          className="btn btn-danger"
                          style={{ padding: "0em 0.5em" }}
                          onClick={() => deleteHandler(user._id)}
                        >
                          DELETE
                        </button>
                      </td>
                    </tr>
                  );
                  j++;
                }
              })}
          </tbody>
        </table>
      </div>
    );
  };

  return <Fragment>{showForm()}</Fragment>;
};

export default ShowClients;
