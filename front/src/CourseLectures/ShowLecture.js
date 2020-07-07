import React, { useState, useEffect, Fragment } from "react";
import { showAllLecture } from "./apiLecture";

const ShowLecture = ({ sectionId, showVideo }) => {
  console.log("sectionId: ", sectionId);
  const [error, setError] = useState();
  const [lectures, setLectures] = useState();

  const getLecture = () => {
    showAllLecture(sectionId).then((data) => {
      console.log("data-lecture: ", data);
      if (data.error) {
        console.log("ShowAllLecture: ", data.error);
      } else {
        setLectures(data);
      }
    });
  };

  useEffect(() => {
    getLecture();
  }, []);

  return (
    <Fragment>
      {lectures &&
        lectures.map((lecture, i) => (
          <h6
            className={"lecture-title m-0 p-2 pl-4 check" + (i % 2)}
            key={i}
            style={{ cursor: "pointer" }}
            onClick={() => showVideo(lecture.title, lecture.video)}
          >
            <i className="fa fa-play-circle" />
            &nbsp;&nbsp;&nbsp;{i + 1}.&nbsp;&nbsp;
            {lecture.title}
          </h6>
        ))}
    </Fragment>
  );
};

export default ShowLecture;
