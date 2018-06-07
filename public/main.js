

function submitSignUp() {
  $('#sign-up-form').on('submit', $('#sign-up-button'), function(event) {
    event.preventDefault();
    hideElementOnSubmit('#sign-up-login-div');
    insertSignUp();
  });
}

function submitLogin() {
  $('#login-form').on('submit', $('#login-button'), function(event) {
    event.preventDefault();
    hideElementOnSubmit('#sign-up-login-div');
    insertLogin();
  });
}

function insertLogin() {
  console.log('login')
  let html = `<form>
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
  console.log('sin')
  let html = `<form>
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
  submitSignUp();
  submitLogin()
})
