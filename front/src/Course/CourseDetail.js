import React, { useEffect, useState, Fragment } from "react";
import EditCard from "./EditCard";
import { showAllCategory, showAllSkill, showAllUser } from "../Admin/apiAdmin";
import { deleteCourse, getCourse } from "./apiCourse";
import { isAuthenticated } from "../Components/apiCore";
import NewSection from "../CourseLectures/NewSection";
import SectionAccordian from "../CourseLectures/SectionAccordian";

const CourseDetail = ({ courseId }) => {
  const [categories, setCategories] = useState();
  const [skills, setSkills] = useState();
  const [course, setCourse] = useState();
  const [file, setFile] = useState({
    video: "",
    title: "",
  });

  const showCategories = () => {
    showAllCategory().then((data) => {
      if (data.error) {
        console.log("showCategories: ", data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const showSkills = () => {
    showAllSkill().then((data) => {
      if (data.error) {
        console.log("showSkills: ", data.error);
      } else {
        setSkills(data);
      }
    });
  };

  const getCourseById = () => {
    getCourse(courseId).then((data) => {
      if (data.error) {
        console.log("getCourseById: ", data.error);
      } else {
        setCourse(data);
      }
    });
  };

  useEffect(() => {
    getCourseById();
    showCategories();
    showSkills();
  }, []);

  const deleteHandler = (_id) => {
    // console.log("id: ", _id);
    deleteCourse({ _id }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        window.location.reload();
      }
    });
  };

  const { user } = isAuthenticated();

  const showVideo = (child1, child2) => {
    setFile({ title: child1, video: child2 });
  };

  const leftComponent = () => {
    console.log("child: ", file);
    if (file.video) {
      return (
        <div
          style={{
            boxShadow: "1px 1px 20px 1px darkcyan",
            padding: "0.1em",
            marginTop: "1em",
            border: "1px solid grey",
          }}
        >
          <video
            controls
            style={{ outline: "none", width: "100%", height: "100%" }}
          >
            <source src={`/course_videos/${file.video}`} type="video/mp4" />
          </video>
          <h6>
            <i className="fa fa-arrow-right text-success mr-1" />
            {file.title}
          </h6>
        </div>
      );
    } else if (course) {
      return (
        <EditCard
          categories={categories}
          skills={skills}
          course={course}
          delHandler={deleteHandler}
        />
      );
    }
  };

  const addVideoBtn = () => {
    return (
      <Fragment>
        <center>
          <button
            className="btn btn-secondary"
            data-dismiss="modal"
            data-toggle="modal"
            data-target="#add-section"
          >
            Add New Section
          </button>
        </center>
        <br />

        {/* ...............Course Section................ */}
        <div className="modal fade" id="add-section">
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <div className="modal-header" style={{ padding: "0.5em 1em" }}>
                <h5 className="modal-title">Add New Section</h5>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>

              <div className="modal-body text-body p-2">
                {course && <NewSection course={course} />}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  return (
    <div
      className="container-fluid bootstrap snippet bg-white p-2"
      style={{ boxShadow: "1px 1px 20px 1px darkcyan" }}
    >
      <center>
        <h4>{course && course.name}</h4>
      </center>

      <div className="row">
        <div className="col-sm-5">
          {leftComponent()}
          <br />
          {addVideoBtn()}
        </div>

        <div className="col-sm-7 p-3">
          <SectionAccordian courseId={courseId} showVideo={showVideo} />
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
