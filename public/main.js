
function getStartedButton(){
  $('#landing-div').on('submit', $('get-started-button'), function(event) {
    event.preventDefault();
    $('#landing-div').hide();
    $('#sign-up-form').show();
    $('#login-form').show();
  });
}

function chooseSignUp() {
  $('#sign-up-form').on('submit', $('#sign-up-button'), function(event) {
    event.preventDefault();
    $('#sign-up-form').hide();
    $('#login-form').hide();
    $('#sign-up-form2').show();
  });
}

function chooseLogin() {
  $('#login-form').on('submit', $('#login-button'), function(event) {
    event.preventDefault();
    $('#sign-up-form').hide();
    $('#login-form').hide();
    $('#login-form2').show();
  });
}

function submitLogin() {
  $('#login-form2').on('submit', $('submit-login2'), function(event) {
    event.preventDefault();
    $('#nav-bar').show();
    $('#login-form2').hide();
    $('#logo').hide();
  });
}

function submitSignUp() {
  $('#sign-up-form2').on('submit',  $('submit-new-user'), function(event) {
    event.preventDefault();
    $('#nav-bar').show();
    $('#sign-up-form2').hide();
    $('#logo').hide();
  });
}


$(document).ready(function() {
  getStartedButton();
  chooseSignUp();
  chooseLogin();
  submitLogin();
  submitSignUp();
})
