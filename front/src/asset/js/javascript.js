import jQuery from "jquery";

(function ($) {
  // "use strict";

  var fullHeight = function () {
    $(".js-fullheight").css("height", $(window).height());
    $(window).resize(function () {
      $(".js-fullheight").css("height", $(window).height());
    });
  };
  fullHeight();

  // $("#example").dataTable({
  //   lengthMenu: [[1000], [1000]],
  // });

  $(document).on("click", "#sidebarCollapse", function () {
    $("#sidebar").toggleClass("active");
    $("#sidebarCollapse").toggleClass("change");
  });

  $(document).on("click", "#showSearch", function () {
    document.getElementById("mySearch").style.display = "block";
  });

  $(document).on("keyup", "#search", function () {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("search").value;

    filter = input.toUpperCase();
    li = document.getElementsByClassName("chip");
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("button")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  });

  for (let i = 0; i < 50; i++) {
    $(document).on("click", "#chip" + i, function () {
      $("#chip" + i).toggleClass("chip-change");
    });
  }

  var header = document.getElementById("myUL");
  console.log("header: ", header);
  // var btns = header.getElementsByClassName("btn");
  // for (var i = 0; i < btns.length; i++) {
  //   btns[i].addEventListener("click", function () {
  //     var current = document.getElementsByClassName("active");
  //     if (current.length > 0) {
  //       current[0].className = current[0].className.replace(" active", "");
  //     }
  //     this.className += " active";
  //   });
  // }
})(jQuery);
