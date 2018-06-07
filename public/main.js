

function chooseSignUp() {
  $('#sign-up-form').on('submit', $('#sign-up-button'), function(event) {
    event.preventDefault();
    hideElementOnSubmit('#sign-up-login-div');
    insertSignUp();
  });
}

function chooseLogin() {
  $('#login-form').on('submit', $('#login-button'), function(event) {
    event.preventDefault();
    hideElementOnSubmit('#sign-up-login-div');
    insertLogin();
  });
}

function submitLogin() {
  $('#main-div').on('submit', function(event) {
    event.preventDefault();
    hideElementOnSubmit('#login-form2');
    hideElementOnSubmit('#title1');
  });
}

function submitSignUp() {
  $('#main-div').on('submit', function(event) {
    event.preventDefault();
    hideElementOnSubmit('#sign-up-form2');
    hideElementOnSubmit('#title1');
  });
}

function insertLogin() {
  let html = `<form id="login-form2">
    <fieldset>
      <legend>
        <input id="login-email-input" class="sign-up-input" type="text" required="required" value="email@email.com" aria-label="email">
        <input id="login-password-input" class="sign-up-input" type="text" required="required" value="password123" aria-label="password">
          <input id="submit-login" type="submit" value="Login" aria-label="submit-login">
      </legend>
    </fieldset>
  </form>`;
  $('#main-div').html(html);
}

function insertSignUp() {
  let html = `<form id="sign-up-form2">
    <fieldset>
      <legend>
        <input id="sign-up-email-input" class="sign-up-input" type="text" required="required" value="email@email.com" aria-label="email">
        <input id="sign-up-password-input" class="sign-up-input" type="text" required="required" value="password123" aria-label="password">
          <input id="submit-new-user" type="submit" value="Sign Up" aria-label="submit-sign-up">
      </legend>
    </fieldset>
  </form>`;
  $('#main-div').html(html);
}

function hideElementOnSubmit(elementToHide) {
  $(elementToHide).hide();
}

function showElementOnSubmit(elementToShow) {
  $(elementToShow).show();
}

$(document).ready(function() {
  chooseSignUp();
  chooseLogin();
  submitLogin();
  submitSignUp();
})
