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
                    console.log(data);
                    let inputs = $('#section1 input[type="text"]');  // Get all text inputs within section1
                    $('#userName').text(data.data.user.name);

                    // Assuming data.data.user contains the updated name and location
                    if (inputs.length >= 2) {
                        $(inputs[0]).val(data.data.user.name); // Update the value of the first input
                        $(inputs[1]).val(data.data.user.location); // Update the value of the second input
                    } else {
                        console.log('Not enough input elements found.');
                    }
                },
                error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }

    updateProfile();
});
