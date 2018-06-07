

function submitSignUp() {
  $('#sign-up-div').on('submit', function(event) {
    event.preventDefault();
    hideElementOnSubmit('#sign-up-div');
    insertSignUp();
  });
}

function insertSignUp() {
  let html = `<p>hi</p>`;
  $('#main-div').html(html);
}

function hideElementOnSubmit(elementToHide) {
  $(elementToHide).hide();
}

function showElementOnSubmit(elementToShow) {
  $(elementToShow).show();
}

$(document).ready(function() {
  submitSignUp();
})
