
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
    insertPhotos();
  });
}

function submitSignUp() {
  $('#sign-up-form2').on('submit',  $('submit-new-user'), function(event) {
    event.preventDefault();
    $('#nav-bar').show();
    $('#sign-up-form2').hide();
    $('#logo').hide();
    insertPhotos();
  });
}

// for display only: this will need to be reformatted to account for data
function insertPhotos() {
let html = `
<div class="row">

  <div class="col-4">
    <div class="card">
      <img class="card-image" src="juliet.jpg" />
      <div class="card-content">
        <h3><a href="#family-member-info">Juliet Capulet</a></h3>
        <p>Wife</p>
      </div>
    </div>
  </div>

  <div class="col-4">
    <div class="card">
      <img class="card-image" src="benvolio.jpg" />
      <div class="card-content">
        <h3>Benvolio</h3>
        <p>Cousin</p>
      </div>
    </div>
  </div>

  <div class="col-4">
    <div class="card">
      <img class="card-image" src="lordmontague.jpg" />
      <div class="card-content">
        <h3>Lord Montague</h3>
        <p>Father</p>
      </div>
    </div>
  </div>

</div>
<div class="row">

`

$('#main-div').html(html);
}


$(document).ready(function() {
  getStartedButton();
  chooseSignUp();
  chooseLogin();
  submitLogin();
  submitSignUp();
})
