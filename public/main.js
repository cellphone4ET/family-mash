
function getStartedButton(){
  $('#landing-div').on('click', $('get-started-button'), function(event) {
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
    document.body.style.backgroundColor = "white";
    document.body.style.marginTop = "0px";
  });
}

function submitSignUp() {
  $('#sign-up-form2').on('submit',  $('submit-new-user'), function(event) {
    event.preventDefault();
    $('#nav-bar').show();
    $('#sign-up-form2').hide();
    $('#logo').hide();
    insertPhotos();
    document.body.style.backgroundColor = "white";
    document.body.style.marginTop = "0px";
  });
}

function clickMenu() {
  $('.main-nav').on('click', $('#menu-link'), function(event) {
    $('.row').hide();
    $('.add-fam-member').show();
    $('.sign-out').show();
  });
}

function signOut() {
  $('.menu-elements').on('click', $('#sign-out'), function(event) {
    $('#nav-bar').hide();
    $('#logo').show();
    $('.add-fam-member').hide();
    $('.sign-out').hide();
    $('#landing-div').show();
    document.body.style.backgroundColor = "#DCD0C0";
    document.body.style.marginTop = "150px";
  });
}

function createPerson() {
  $('.menu-elements2').on('click', $('#createperson'), function(event) {
    $('.add-fam-member').hide();
    $('.sign-out').hide();
  });
}

// function returnToMainScreen() {
//   $('.main-nav2').on('click', $('#mainpage'), function(event) {
//     console.log('returnToMainScreen ran');
//     $('.add-fam-member').hide();
//     $('.sign-out').hide();
//     insertPhotos();
//   });
// }

// for display only: this will need to be reformatted to account for data
function insertPhotos() {
let html = `
<div class="row">

  <div class="col-4">
    <div class="card">
      <img class="card-image" src="morticia.jpg" />
      <div class="card-content">
        <h3><a href="#family-member-info">Morticia Addams</a></h3>
        <p>Mother</p>
      </div>
    </div>
  </div>

  <div class="col-4">
    <div class="card">
      <img class="card-image" src="gomez.jpg" />
      <div class="card-content">
        <h3>Gomez Addams</h3>
        <p>Father</p>
      </div>
    </div>
  </div>

  <div class="col-4">
    <div class="card">
      <img class="card-image" src="uncle-fester.jpg" />
      <div class="card-content">
        <h3>Uncle Fester</h3>
        <p>Uncle</p>
      </div>
    </div>
  </div>

</div>
<div class="row">`

$('#main-div').html(html);
}


$(document).ready(function() {
  createPerson();
  signOut();
  clickMenu();
  getStartedButton();
  chooseSignUp();
  chooseLogin();
  submitLogin();
  submitSignUp();
})
