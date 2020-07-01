import React, { useState, useEffect, Fragment } from "react";

const NewVideo = () => {
  const [values, setValues] = useState({
    title: "",
    video: "",
  });

  const handleChange = (event) => {
    setError("");
    const name = event.target.name;
    const value = name === "video" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

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
      setError("");
      const formData = new FormData();
      formData.append("title", title);
      formData.append("video", video);
      formData.append("course", course._id);

      createCourse(formData).then((data) => {
        data = data.data;
        if (data.error === "all fields") {
          setError(
            <div className="alert alert-danger p-1">
              <strong style={{ color: "red" }}>
                <i className="fa fa-info-circle" />
                &nbsp; All fields are required...
              </strong>
            </div>
          );
        } else if (data.msg === "not") {
          setError(
            <div className="alert alert-warning p-2">
              <strong>
                <i className="fa fa-info-circle" />
                &nbsp; Course <b style={{ color: "#30bd30" }}>{name}</b> is
                already available...
              </strong>
            </div>
          );
        } else if (data.msg === "created") {
          setError(
            <div className="alert alert-success p-2">
              <strong>
                Course <b style={{ color: "#30bd30" }}>{name}</b> is
                successfully created...
              </strong>
            </div>
          );
          window.location.reload();
        } else if (data.error) {
          setError(
            <div className="alert alert-danger p-2">
              <strong>{data.error}</strong>
            </div>
          );
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

  function progressHandler(event) {
    var percent = (event.loaded / event.total) * 100;
    _("progressBar").value = Math.round(percent);
    _("status").innerHTML = Math.round(percent) + "% uploaded... please wait";
  }

  function completeHandler(event) {
    _("status").innerHTML = event.target.responseText;
    _("progressBar").value = 0; //wil clear progress bar after successful upload
  }

  return (
    <div className="form-group">
      {/* <progress
        id="progressBar"
        value="0"
        max="100"
        style={{ width: "300px" }}
      ></progress> 
      <h3 id="status"></h3> */}

      <img
        className="card-img-top"
        src={`/images/bg.jpg`}
        alt="Card image"
        style={{
          width: "100%",
          height: "30vh",
          borderBottom: "2px solid #c8e3ea",
        }}
      />
      <br />
      <br />

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
      <center>
        <form>
          <label className="btn btn-secondary" style={{ width: "90%" }}>
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
          <input
            className="form-control"
            type="text"
            name="title"
            placeholder="Add Title"
            required
            onChange={handleChange}
            style={{ width: "90%", paddingLeft: "12px" }}
          />

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
            className="btn btn-danger"
            style={{ marginLeft: "2%" }}
            data-dismiss="modal"
          >
            Cancel
          </button>
        </form>
      </center>
    </div>
  );
};

export default NewVideo;
