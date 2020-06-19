import React, { Fragment, useState, useEffect } from "react";
import { showAllSkill } from "../Admin/apiAdmin";
import $ from "jquery";

const SkillCheckBox = ({ handleCheckBox }) => {
  const [skills, setSkills] = useState();

  const skillHandler = () => {
    var options = [];

    $(".ul-menu li").on("click", function (event) {
      console.log("Skill-Check-Box: ");
      var $target = $(event.currentTarget),
        val = $target.attr("data-value"),
        $inp = $target.find("input"),
        idx;

      $("#li" + val).toggleClass("skill-li-change");

      if ((idx = options.indexOf(val)) > -1) {
        options.splice(idx, 1);
        setTimeout(function () {
          $inp.prop("checked", false);
        }, 0);
      } else {
        options.push(val);
        setTimeout(function () {
          $inp.prop("checked", true);
        }, 0);
      }

      //   $(event.target).blur();

      console.log(options);
      handleCheckBox(options);
      return false;
    });
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
        <ul className="dropdown-menu ul-menu" onClick={skillHandler}>
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
                data-value={s._id}
                id={"li" + s._id}
                className="skill-li pl-2"
              >
                <input type="checkbox" className="mr-2" />
                {s.name}
              </li>
            ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default SkillCheckBox;
