{
  console.log('upload_picture is loaded')
$(document).ready(function () {
  function updateProfile() {
    let form = $('#section1 form');  // Assuming your inputs are inside a form with an ID

    form.submit(function (e) {
      e.preventDefault();

      var formData = new FormData(this);  // 'this' refers to the form element

      $.ajax({
        type: "POST",
        url: form.attr("action"),  // Assuming the form has an 'action' attribute
        data: formData,
        processData: false,  // Important: tell jQuery not to process the data
        contentType: false,  // Important: tell jQuery not to set contentType
        success: function (data) {
        
          // Assuming data.data.user.avatar and data.data.user.location are the correct paths
          $("#section1 .imgPlaceholder img").attr("src", data.data.user.avatar);
          $('#section1 input[type="text"]').attr("placeholder", data.data.user.location);
        },
        error: function (error) {
          console.log(error.responseText);
        }
      });
    });
  }

  updateProfile();
});
}