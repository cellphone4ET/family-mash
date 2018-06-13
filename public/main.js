function chooseSignUp() {
  $("#sign-up-button").on("click", function(event) {
    console.log('chooseSignUp')
    $(".landing-page").hide();
    $(".signup-login-page").show();
    $("#sign-up-form").show();
    $("#login-form").hide();
  });
}

function chooseLogin() {
  $("#login-button").on("click", function(event) {
    console.log('chooseLogin');
    $(".landing-page").hide();
    $(".signup-login-page").show();
    $("#login-form").show();
    $("#sign-up-form").hide();
  });
}

function submitLogin() {
  $("#login-form").on("submit", showMain);
}

function submitSignUp() {
  $("#sign-up-form").on("submit", showMain);
}

function showMain(event) {
  event.preventDefault();
  $("#nav-bar").show();
  $("#family-members-page").show();
  $(".signup-login-page").hide();
  document.body.style.backgroundColor = "white";
  insertPhotos();
}

// function clickMenu() {
//   $("#nav-bar").on("click", ".menu-link", function(event) {
//     console.log("dropdown menu");
//   });
// }

function createPerson() {
  $("#nav-bar").on("click", "#createperson", function(event) {
    $('.row').hide();
    $('.create-person-form').show();
  });
}

function signOut() {
  $("#nav-bar").on("click", "#sign-out", function(event) {
    console.log("Sign out");
    $("#nav-bar").hide();
    $("#family-members-page").hide();
    $(".landing-page").show();
    $('.row').hide();
    $('.create-person-form').hide();
    document.body.style.backgroundColor = "#dcd0c0";
  });
}

function returnToMainScreen() {
  $("#nav-bar").on("click", "#mainpage", function(event) {
    console.log("returnToMainScreen ran");
    $(".create-person-form").hide();
    $(".row").show();
    $(".person-info").empty();
  insertPhotos();
  });
}

function submitPerson() {
  $(".add-person-form").on("submit", "#submit-person", function(event) {
    event.preventDefault();
    console.log('submitPerson');
    $(".create-person-form").hide();
    insertPhotos();
  });
}

function moreInfoLink() {
  $("#family-members-page").on("click", ".person-info", function() {
    console.log('moreInfoLink');
    $(".row").hide();
    insertPersonInfo();
  });
}

// FOR DISPLAY ONLY: this will need to be reformatted to account for data
function insertPersonInfo() {
  let html = `<div class="info-bloc">
  <div class="row">
  <div class="col-4">
  <div class="card">
  <img alt="family-member" class="card-image" src="morticia.jpg" />
  <div class="card-content">
  <h3>Morticia Addams</h3>
  <p><span class="content-field">Relation</span>: mother</p>
  <p><span class="content-field">Age</span>: immortal</p>
  <p><span class="content-field">Birthday</span>: 01/01/1300</p>
  <p><span class="content-field">Significant Other</span>: Gomes Addams</p>
  <p><span class="content-field">Anniversary</span>: 02/14/1666</p>
  <p><span class="content-field">Notes</span>: needs vitamin D</p>
  </div>
  </div>
  </div>
  </div>`;
  $(".person-info").append(html);
}

// FOR DISPLAY ONLY: this will need to be reformatted to account for data
function insertPhotos() {
  let html = `
  <div class="row">

  <div class="col-4">
  <div class="card">
  <img alt="family-member" class="card-image" src="morticia.jpg" />
  <div class="card-content">
  <h3><a href="#family-member-info" class="person-info">Morticia Addams</a></h3>
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
  <div class="row">`;

  $("#family-members-page").html(html);
}


$(document).ready(function() {
  returnToMainScreen();
  moreInfoLink();
  submitPerson();
  createPerson();
  signOut();
  chooseSignUp();
  chooseLogin();
  submitLogin();
  submitSignUp();
});
