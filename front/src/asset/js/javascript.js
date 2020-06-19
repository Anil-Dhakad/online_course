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

  ////////////////// Search by skills - NewCourse ////////////////////

  $(document).on("keyup", "#search", function () {
    console.log("search: ");
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

  ////////////////// Search by course-name in home page ///////////////

  $(document).on("keyup", "#sear", function () {
    var input, filter, card, h6, i, txtValue;
    input = document.getElementById("sear").value;

    filter = input.toUpperCase();
    card = document.getElementsByClassName("card");
    for (i = 0; i < card.length; i++) {
      h6 = card[i].getElementsByTagName("h6")[0];
      txtValue = h6.textContent || h6.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        card[i].style.display = "inline-block";
      } else {
        card[i].style.display = "none";
      }
    }
  });

  ////////////////// Search by course-name for select user in home page ///////////////

  $(document).on("click", "#sel", function () {
    var input, filter, card, p, i, txtValue;
    input = document.getElementById("sel").value;

    filter = input.toUpperCase();
    card = document.getElementsByClassName("card");

    if (input === "All") {
      document.getElementById("sear").disabled = false;
      for (i = 0; i < card.length; i++) {
        card[i].style.display = "inline-block";
      }
    } else {
      document.getElementById("sear").disabled = true;
      for (i = 0; i < card.length; i++) {
        p = card[i].getElementsByTagName("p")[0];
        txtValue = p.textContent || p.innerText;

        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          card[i].style.display = "inline-block";
        } else {
          card[i].style.display = "none";
        }
      }
    }
  });

  ////////////////// Search by course-name in main page ///////////////

  $(document).on("keyup", "#sear-home", function () {
    var input, filter, card, h6, i, txtValue;
    input = document.getElementById("sear-home").value;

    filter = input.toUpperCase();
    card = document.getElementsByClassName("card");
    for (i = 0; i < card.length; i++) {
      h6 = card[i].getElementsByTagName("h6")[0];
      txtValue = h6.textContent || h6.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        card[i].style.display = "inline-block";
      } else {
        card[i].style.display = "none";
      }
    }
  });

  ////////////////// Search by Skill name in main page ///////////////

  $(document).on("keyup", "#mySkillSearch", function () {
    let value = $(this).val().toLowerCase();
    $(".skill-li").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });

  //////////////////////// Toggle Skills chips NewCourse /////////////////////

  for (let i = 0; i < 50; i++) {
    $(document).on("click", "#chip" + i, function () {
      $("#chip" + i).toggleClass("chip-change");
    });
  }
})(jQuery);
