import React, { useState, useEffect, Fragment } from "react";
import { deleteUser, showAllUser } from "./apiAdmin";

const ShowInstructors = ({ courses }) => {
  const [users, setUsers] = useState();

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

  useEffect(() => {
    showUsers();
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
        <h3 className="h3-header">Instructors</h3>
        <table className="table" id="example">
          <thead>
            <tr className="row table-head">
              <th className="col">SNo.</th>
              <th className="col">Profile</th>
              <th className="col">Details</th>
              <th className="col">DELETE</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user, i) => {
                let j = 1;
                if (user.role === "instructor") {
                  return (
                    <tr key={i} className="row">
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

                      <td
                        className="col"
                        id={`del1_${i}`}
                        style={{ display: "block" }}
                      >
                        {courses &&
                          courses.map((course, k) => {
                            if (course.user._id === user._id) {
                              return <h6 key={k}>{course.name}</h6>;
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

export default ShowInstructors;
