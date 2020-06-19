import React, { useState, Fragment } from "react";
import { editPhoto } from "./apiCourse";

const EditCoursePhoto = ({ course }) => {
  console.log("course: ", course);
  const [photo, setPhoto] = useState();

  const [error, setError] = useState();

  const handleChange = (event) => {
    setError("");
    const value = event.target.files[0];
    setPhoto(value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (photo === "") {
      setError(
        <div className="alert alert-danger p-1">
          <strong style={{ color: "red" }}>
            <i className="fa fa-info-circle" />
            &nbsp; Select image to upload...
          </strong>
        </div>
      );
    } else {
      setError("");
      console.log("photo: ", photo);

      const formData = new FormData();
      formData.append("id", course._id);
      formData.append("photo", photo);

      editPhoto(formData).then((data) => {
        data = data.data;
        console.log("data: ", data);
        if (data.result) {
          window.location.reload();
        } else if (data.error) {
          setError(
            <div className="alert alert-danger p-2">
              <i className="fa fa-info-circle" />
              &nbsp;
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

  const modalBody = () => (
    <div className="form-group">
      <img
        className="card-img-top"
        src={`/images/course_profile/${course.photo}`}
        alt="Card image"
        style={{
          width: "100%",
          height: "30vh",
          borderBottom: "2px solid #c8e3ea",
        }}
      />
      <br />
      <br />
      <center>
        <form onSubmit={submitHandler}>
          <label className="btn btn-secondary" style={{ width: "90%" }}>
            <input
              type="file"
              name="photo"
              accept="image/*"
              required
              style={{ float: "left", outline: "0", cursor: "pointer" }}
              onChange={handleChange}
            />
          </label>

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

  return (
    <Fragment>
      {error}
      {modalBody()}
    </Fragment>
  );
};

export default EditCoursePhoto;
