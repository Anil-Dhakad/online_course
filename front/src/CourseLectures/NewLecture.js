import React, { useState, useEffect, Fragment } from "react";
import { createLecture } from "./apiLecture";

const NewLecture = ({ sectionId, sections }) => {
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa: ", sectionId, sections);
  const [values, setValues] = useState({
    title: "",
    video: "",
  });
  const [error, setError] = useState();

  const handleChange = (event) => {
    setError("");
    const name = event.target.name;
    const value = name === "video" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  const { title, video } = values;

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(values);

    if (title === "" || video === "") {
      setError(
        <div className="alert alert-danger p-1">
          <strong style={{ color: "red" }}>
            <i className="fa fa-info-circle" />
            &nbsp; All fields are required...
          </strong>
        </div>
      );
    } else {
      // setError("");

      // function progressHandler(event) {
      //   var percent = (event.loaded / event.total) * 100;
      //   _("progressBar").value = Math.round(percent);
      //   _("status").innerHTML =
      //     Math.round(percent) + "% uploaded... please wait";
      // }

      const formData = new FormData();
      formData.append("sectionId", sectionId);
      formData.append("title", title);
      formData.append("video", video);

      createLecture(formData).then((data) => {
        console.log("NewLecture-data: ", data);
        // data = data.data;
        // function completeHandler(event) {
        //   _("status").innerHTML = event.target.responseText;
        //   _("progressBar").value = 0; //wil clear progress bar after successful upload
        // }
        // if (data.error === "all fields") {
        //   setError(
        //     <div className="alert alert-danger p-1">
        //       <strong style={{ color: "red" }}>
        //         <i className="fa fa-info-circle" />
        //         &nbsp; All fields are required...
        //       </strong>
        //     </div>
        //   );
        // } else if (data.msg === "not") {
        //       setError(
        //         <div className="alert alert-warning p-2">
        //           <strong>
        //             <i className="fa fa-info-circle" />
        //             &nbsp; Course <b style={{ color: "#30bd30" }}>{name}</b> is
        //             already available...
        //           </strong>
        //         </div>
        //       );
        //     } else if (data.msg === "created") {
        //       setError(
        //         <div className="alert alert-success p-2">
        //           <strong>
        //             Course <b style={{ color: "#30bd30" }}>{name}</b> is
        //             successfully created...
        //           </strong>
        //         </div>
        //       );
        //       window.location.reload();
        //     } else if (data.error) {
        //       setError(
        //         <div className="alert alert-danger p-2">
        //           <strong>{data.error}</strong>
        //         </div>
        //       );
        //     } else {
        //       setError(
        //         <div className="alert alert-danger p-2">
        //           <strong>Something went wrong...</strong>
        //         </div>
        //       );
        // }
      });
    }
  };

  return (
    <Fragment>
      <div className="form-group">
        <progress
          id="progressBar"
          value="0"
          max="100"
          style={{ width: "300px" }}
        ></progress>
        {/* <h3 id="status"></h3> */}
        <div
          className="progress"
          style={{
            height: "1.4rem",
            fontSize: "1rem",
            fontWeight: "bolder",
            border: "1px solid #76acde",
          }}
        >
          <div
            className="progress-bar progress-bar-striped active"
            role="progressbar"
            aria-valuenow="40"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{
              width: "40%",
              animation: "progress-bar-stripes 1s linear infinite",
            }}
          >
            40%
          </div>
        </div>

        <br />
        {error}

        {sections &&
          sections.map((sec, i) => {
            if (sec._id === sectionId) {
              return (
                <Fragment key={i}>
                  <div className="form-group mb-1">
                    <label
                      style={{
                        margin: "0",
                        width: "30%",
                        fontWeight: "bold",
                      }}
                    >
                      Course:
                    </label>
                    <label
                      style={{
                        margin: "0",
                        float: "right",
                        width: "69%",
                      }}
                    >
                      {sec.courseId.name}
                    </label>
                  </div>
                  <div className="form-group mb-1">
                    <label
                      style={{
                        margin: "0",
                        width: "30%",
                        fontWeight: "bold",
                      }}
                    >
                      Section No.:
                    </label>
                    <label
                      style={{
                        margin: "0",
                        float: "right",
                        width: "69%",
                        fontWeight: "bold",
                      }}
                    >
                      {sec.sectionNo}
                    </label>
                  </div>
                  <div className="form-group mb-3">
                    <label
                      style={{
                        margin: "0",
                        width: "30%",
                        fontWeight: "bold",
                      }}
                    >
                      Section Name:
                    </label>
                    <label
                      style={{
                        margin: "0",
                        float: "right",
                        width: "69%",
                      }}
                    >
                      {sec.name}
                    </label>
                  </div>
                </Fragment>
              );
            }
          })}

        <form onSubmit={submitHandler}>
          <div className="form-group mb-1">
            <label
              style={{ margin: "0.5em 0 0", width: "30%", fontWeight: "bold" }}
            >
              Lecture title:
            </label>
            <input
              className="form-control"
              type="text"
              name="title"
              placeholder="Add Title"
              required
              onChange={handleChange}
              style={{
                paddingLeft: "0.5em",

                float: "right",
                width: "69%",
              }}
            />
          </div>

          <center>
            <label
              className="btn btn-secondary mt-4 mb-4"
              style={{ width: "90%" }}
            >
              <input
                type="file"
                name="video"
                accept="video/*"
                required
                onChange={handleChange}
                style={{ float: "left", outline: "0", cursor: "pointer" }}
              />
            </label>

            <br />

            <button
              type="submit"
              className="btn btn-success"
              style={{ marginRight: "2%" }}
            >
              <i
                className="fas fa-upload m-0"
                style={{
                  position: "relative",
                  fontSize: "1em",
                  color: "#000000",
                }}
              />
              &nbsp; Upload
            </button>
            <button
              type="button"
              className="btn btn-info"
              style={{ marginLeft: "2%" }}
              data-dismiss="modal"
            >
              Cancel
            </button>
          </center>
        </form>
      </div>
    </Fragment>
  );
};

export default NewLecture;
