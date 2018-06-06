

function submitSignUp() {
  $('#sign-up-form').on('submit', function(event) {
    console.log('submitSignUp ran');
    event.preventDefault();
    hideShowElementsOnSubmit();
  });
}

// function hideShowElementsOnSubmit() {
//   $)
// }


$(document).ready(function() {
  submitSignUp();
})
