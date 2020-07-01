import React, { Fragment, useState, useEffect } from "react";
import { showAllSkill } from "../Admin/apiAdmin";
import $ from "jquery";

const SkillCheckBox = ({ handleCheckBox }) => {
  const [skills, setSkills] = useState();

  const skillHandler = (val) => {
    $("#li" + val).toggleClass("skill-li-change");

    var checkBox = document.getElementById("input" + val);
    if (checkBox.checked == true) {
      checkBox.checked = false;
    } else {
      checkBox.checked = true;
    }
    console.log("option: ", val);
    handleCheckBox(val);
  };

  const showSkills = () => {
    console.log("show---Skills");
    showAllSkill().then((data) => {
      if (data.error) {
        console.log("showSkills: ", data.error);
      } else {
        setSkills(data);
      }
    });
  };

  useEffect(() => {
    showSkills();
  }, []);

  return (
    <Fragment>
      {/* {skillHandler()} */}
      <div className="dropdown m-1">
        <button
          className="btn btn-secondary dropdown-toggle pr-4"
          type="button"
          data-toggle="dropdown"
        >
          Choose Skills&nbsp;&nbsp;
          <span className="caret"></span>
        </button>
        <ul className="dropdown-menu ul-menu">
          <li>
            <input
              className="form-control"
              id="mySkillSearch"
              type="search"
              placeholder="Search..."
              style={{ backgroundPosition: "8px" }}
            />
          </li>
          <li className="dropdown-divider"></li>
          {skills &&
            skills.map((s, i) => (
              <li
                key={i}
                id={"li" + s._id}
                className="skill-li pl-2"
                onClick={() => skillHandler(s._id)}
              >
                <input type="checkbox" id={"input" + s._id} className="mr-2" />
                {s.name}
              </li>
            ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default SkillCheckBox;
