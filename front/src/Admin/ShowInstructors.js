import React, { useState, useEffect, Fragment } from "react";
import { deleteUser, showAllUser } from "./apiAdmin";

// import "../asset/css/jquery.dataTables.css";
// import "../asset/css/dataTable.css";
// import "../asset/css/shCore.css";
// import "../asset/js/jquery.dataTables";
// import "../asset/js/shCore";
// import "../asset/js/dataTable";

const ShowInstructors = () => {
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
              <th className="col">NAME</th>
              <th className="col">EMAIL-ID</th>
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
                      </td>

                      <td
                        className="col"
                        id={`del1_${i}`}
                        style={{ display: "block" }}
                      >
                        {user.email}
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
