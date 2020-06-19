import React, { Fragment } from "react";
import $ from "jquery";

const MoreFilter = ({ prices, handlePriceFilters, handleSortFilters }) => {
  // const filterHandler = () => {
  var options = ["", ""];

  $(".more-menu li").on("click", function (event) {
    let $target = $(event.currentTarget);
    let valSort = $target.attr("sort-value");
    let valPrice = $target.attr("price-value");

    // console.log("val-Sort: ", valSort);
    // console.log("val-Price: ", valPrice);

    if (valSort && (options[0] === "" || options[0] !== valSort)) {
      console.log("val---Sort");
      if (options[0])
        document.getElementById(options[0]).style.background = "#ffffff";
      document.getElementById(valSort).style.background = "#02f702";

      options[0] = valSort;
      handleSortFilters(valSort);
    }
    if (valPrice && (options[1] === "" || options[1] !== valPrice)) {
      console.log("val---Price");
      if (options[1])
        document.getElementById(options[1]).style.background = "#ffffff";
      document.getElementById(valPrice).style.background = "#d0c3f1";
      options[1] = valPrice;
      handlePriceFilters(valPrice);
    }

    console.log("options: ", options);
  });
  // };

  return (
    <Fragment>
      {/* {filterHandler()} */}
      <button
        className="btn btn-info m-1 pr-4 rounded dropdown-toggle"
        data-toggle="dropdown"
      >
        More
      </button>
      <ul className="dropdown-menu dropdown-menu-right more-menu">
        <li className="dropdown-header medium">Sort By</li>
        <li
          sort-value={"new"}
          id={"new"}
          className="dropdown-item small"
          style={{ cursor: "pointer" }}
        >
          Newest
        </li>
        <li
          sort-value={"low"}
          id={"low"}
          className="dropdown-item small"
          style={{ cursor: "pointer" }}
        >
          Price Low
        </li>
        <li
          sort-value={"high"}
          id={"high"}
          className="dropdown-item small"
          style={{ cursor: "pointer" }}
        >
          Price High
        </li>

        <li className="dropdown-divider"></li>

        <li className="dropdown-header medium">Price Range</li>
        {prices &&
          prices.map((p, i) => (
            <li
              key={i}
              price-value={p.id}
              id={p.id}
              className="dropdown-item small"
              style={{ cursor: "pointer" }}
            >
              {p.name}
            </li>
          ))}
      </ul>
    </Fragment>
  );
};

export default MoreFilter;
