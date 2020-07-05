import React, { useState, useEffect, Fragment } from "react";
import { showAllSection, editSection } from "./apiLecture";
import NewLecture from "./NewLecture";

const SectionAccordian = ({ courseId, showVideo }) => {
  // console.log("courseID: ", courseId);
  const [editvalue, setEditvalue] = useState({
    _id: "",
    sectionNo: "",
    name: "",
  });
  const [error, setError] = useState();
  const [section, setSection] = useState();
  const [sect, setSect] = useState({
    secId: "",
    secOpen: false,
  });

  const getSection = () => {
    showAllSection(courseId).then((data) => {
      console.log("data-section: ", data);
      if (data.error) {
        console.log("getCourseById: ", data.error);
      } else {
        setSection(data);
      }
    });
  };

  useEffect(() => {
    getSection();
  }, []);

  const changeEdit = (event) => {
    setEditvalue({ ...editvalue, [event.target.name]: event.target.value });
    setError("");
  };

  const clickToggle = (id) => {
    $("#arrow-toggle" + id).toggleClass("fa-angle-up");
  };
  const showClick = (child, clickId, clickSecNo, clickName) => {
    // console.log("child: ", child, " -- ", clickSecNo, " -- ", clickName);
    setError("");
    setEditvalue({
      ...editvalue,
      _id: clickId,
      sectionNo: clickSecNo,
      name: clickName,
    });
    document.getElementById("hide_" + child).style.display = "none";
    document.getElementById("show_" + child).style.display = "block";
  };

  const openLectureForm = () => {
    return (
      <div className="modal fade" id="add-lecture">
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-header" style={{ padding: "0.5em 1em" }}>
              <h5 className="modal-title">Add New Lecture</h5>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div className="modal-body text-body p-2">
              {sect.secOpen && (
                <NewLecture sectionId={sect.secId} sections={section} />
              )}
              {/* {course && <NewSection course={course} />} */}
            </div>
          </div>
        </div>
      </div>
    );
    setSect({ ...sect, secOpen: false });
  };

  const { _id, sectionNo, name } = editvalue;

  const editHandler = (child, id) => {
    console.log(id, "editValue: ", editvalue);
    document.getElementById("hide_" + child).style.display = "block";
    document.getElementById("show_" + child).style.display = "none";
    if (_id === "" || sectionNo === "" || name === "") {
      setError(
        <div className="alert alert-danger p-1">
          <strong style={{ color: "red" }}>
            <i className="fa fa-info-circle" />
            &nbsp; All fields are required...
          </strong>
        </div>
      );
    } else if (_id === id) {
      setError("");
      editSection(editvalue).then((data) => {
        // data = data.data;
        console.log("data:", data);
        if (data.error === "not") {
          setError(
            <div className="alert alert-warning p-2">
              <strong>
                <i
                  className="fa fa-info-circle"
                  style={{ fontSize: "1.2em", margin: "0.3em -0.2em" }}
                />
                &nbsp;&nbsp;&nbsp;&nbsp; Section &nbsp;
                <b style={{ color: "#30bd30" }}>{name}</b> is already
                available...
              </strong>
            </div>
          );
        } else if (data) {
          getSection();
        } else {
          setError(
            <div className="alert alert-danger p-2">
              <strong>Something went wrong...</strong>
            </div>
          );
        }
      });
    }
  };

  return (
    <Fragment>
      {openLectureForm()}
      <div
        className="accordion md-accordion accordion-blocks"
        id="accordionEx78"
        role="tablist"
        aria-multiselectable="true"
      >
        {section &&
          section.map((sec, i) => (
            <div
              className="card"
              style={{ overflow: "unset" }}
              key={i}
              onClick={() => {
                clickToggle(i);
              }}
            >
              <div
                className="card-header pl-4 pr-4 pt-2 pb-2"
                role="tab"
                id="headingUnfiled"
              >
                <div className="dropdown float-left">
                  <button
                    className="btn btn-info btn-sm m-0 mr-3 p-1 dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fa fa-pencil-alt"></i>
                  </button>
                  <div className="dropdown-menu dropdown-info animate slideIn">
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() =>
                        setSect({ ...sect, secId: sec._id, secOpen: true })
                      }
                      data-dismiss="modal"
                      data-toggle="modal"
                      data-target="#add-lecture"
                    >
                      Add New Lecture
                    </a>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() =>
                        showClick(i, sec._id, sec.sectionNo, sec.name)
                      }
                    >
                      Rename Section
                    </a>
                    <a className="dropdown-item" href="#">
                      Delete Section
                    </a>
                  </div>
                </div>
                <div>
                  <a
                    data-toggle="collapse"
                    data-parent="#accordionEx78"
                    href={"#collapseUnfiled" + i}
                    aria-expanded="true"
                    aria-controls="collapseUnfiled"
                    id={`hide_${i}`}
                    style={{ display: "block" }}
                  >
                    <h5 className="mt-1 mb-0 ml-1">
                      <span>
                        {sec.sectionNo}. &nbsp;{sec.name}
                      </span>
                      <i
                        id={"arrow-toggle" + i}
                        className="fa fa-angle-down float-right"
                      ></i>
                    </h5>
                  </a>
                  {/* //////////////////  Change Section name ///////////////// */}
                  <a id={`show_${i}`} style={{ display: "none" }}>
                    <h5 className="mt-1 mb-0">
                      <span>
                        <input
                          className="form-control p-0 pl-2 mr-1"
                          name="sectionNo"
                          type="number"
                          required
                          value={sectionNo}
                          onChange={changeEdit}
                          style={{
                            display: "inline",
                            border: "1px solid #d4cccc",
                            width: "18%",
                            height: "4vh",
                          }}
                        />
                        <input
                          className="form-control p-0 pl-2 ml-1 mr-1 mb-1"
                          name="name"
                          type="text"
                          required
                          value={name}
                          onChange={changeEdit}
                          style={{
                            display: "inline",
                            border: "1px solid #d4cccc",
                            width: "54%",
                            height: "4vh",
                          }}
                        />
                      </span>
                      <button
                        className="btn btn-success ml-1 float-right"
                        id={`show2_${i}`}
                        style={{ padding: "0em 0.2em" }}
                        onClick={() => editHandler(i, sec._id)}
                      >
                        Save
                      </button>
                    </h5>
                  </a>
                </div>
              </div>

              <div
                id={"collapseUnfiled" + i}
                className="collapse"
                role="tabpanel"
                aria-labelledby="headingUnfiled"
                data-parent="#accordionEx78"
              >
                <div className="card-body p-1 pl-4">
                  <h3
                    onClick={() =>
                      showVideo(sec.name, "52a0bf208cdf9807d2ddeb9bca7788fc")
                    }
                  >
                    hello
                  </h3>
                </div>
              </div>
            </div>
          ))}
      </div>
    </Fragment>
  );
};

export default SectionAccordian;
