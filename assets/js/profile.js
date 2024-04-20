
  console.log("profile_preview is loaded");
var page = $("section");

console.log("upload_picture is loaded");
$(document).ready(function () {
  function updateProfile() {
    let form = $("#section1 form"); // Assuming your inputs are inside a form with an ID

    form.submit(function (e) {
      e.preventDefault();

      var formData = new FormData(this); // 'this' refers to the form element

      $.ajax({
        type: "POST",
        url: form.attr("action"), // Assuming the form has an 'action' attribute
        data: formData,
        processData: false, // Important: tell jQuery not to process the data
        contentType: false, // Important: tell jQuery not to set contentType
        success: function (data) {
          // Assuming data.data.user.avatar and data.data.user.location are the correct paths
          $("#section1 .imgPlaceholder img").attr("src", data.data.user.avatar);
          $('#section1 input[type="submit"]').attr(
            "placeholder",
            data.data.user.location
          );
          newPage(page);
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  }

  function newPage(page) {
    page[0].style.left = "-100%";
    page[1].style.right = "0%";
    page[0].style.position = "absolute";
    page[1].style.position = "relative";
  }

  $(document).ready(function () {
    $(".backBtn").on("click",function () {
      page[0].style.left = "0%";
      page[1].style.right = "-100%";
      page[1].style.position = "absolute";
      page[0].style.position = "relative";
    });
  
    $('#section2 .tile input[type="checkbox"]').on("change", function () {
      // This finds the <p> element inside the same label as the checkbox
      var $pElement = $(this).siblings("label").find("p");
  
      if (this.checked) {
        $pElement.css("display", "block"); // Show the paragraph
      } else {
        $pElement.css("display", "none"); // Hide the paragraph
      }
    });
  });
  
  updateProfile();
});
