function chooseSignUp() {
  $("#sign-up-button").on("click", function(event) {
    console.log("chooseSignUp");
    $(".landing-page").hide();
    $(".signup-login-page").show();
    $("#sign-up-form").show();
    $("#login-form").hide();
  });
}

function chooseLogin() {
  $("#login-button").on("click", function(event) {
    console.log("chooseLogin");
    $(".landing-page").hide();
    $(".signup-login-page").show();
    $("#login-form").show();
    $("#sign-up-form").hide();
  });
}

function submitLogin() {
  $("#login-form").on("submit", showMain);
  console.log("submitLogin");
}

function submitSignUp() {
  $("#sign-up-form").on("submit", showMain);
  console.log("submitSignUp");
}

function showMain(event) {
  event.preventDefault();
  console.log("showmain ran");
  $(".site-nav").show();
  $("#family-members-page").show();
  $(".signup-login-page").hide();
  insertPhotos();
  document.body.style.backgroundColor = "white";
}

function createPerson() {
  $(".site-nav").on("click", "#createperson", function(event) {
    console.log("createperson");
    $(".row").hide();
    $(".create-person-form").show();
  });
}

function signOut() {
  $(".site-nav").on("click", "#sign-out", function(event) {
    console.log("Sign out");
    $(".site-nav").hide();
    $("#family-members-page").hide();
    $(".landing-page").show();
    $(".row").hide();
    $(".create-person-form").hide();
    document.body.style.backgroundColor = "#dcd0c0";
  });
}

function returnToMainScreen() {
  $(".site-nav").on("click", "#mainpage", function(event) {
    console.log("returnToMainScreen ran");
    $(".create-person-form").hide();
    $(".row").show();
    $(".person-info").empty();
    insertPhotos();
  });
}

function submitPerson() {
  $(".site-nav").on("submit", "#submit-person", function(event) {
    console.log("submitPerson");
    event.preventDefault();
    $(".create-person-form").hide();
    insertPhotos();
  });
}

function moreInfoLink() {
  $("#family-members-page").on("click", ".person-info", function() {
    console.log("moreInfoLink");
    $(".row").hide();
    insertPersonInfo();
  });
}

// FOR DISPLAY ONLY: this will need to be reformatted to account for data

function insertPersonInfo() {
  let html = `<div class="info-bloc">
  <div class="row">
  <div class="col-4">
  <img alt="family-member" class="card-image" src="morticia.jpg" />
  <div class="card-content">
  <div class="fam-member-info">
  <h3>Morticia Addams</h3>
  <p><span class="content-field">Relation</span>: mother</p>
  <p><span class="content-field">Age</span>: immortal</p>
  <p><span class="content-field">Birthday</span>: 01/01/1300</p>
  <p><span class="content-field">Significant Other</span>: Gomes Addams</p>
  <p><span class="content-field">Anniversary</span>: 02/14/1666</p>
  <p><span class="content-field">Notes</span>: needs vitamin D</p>
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

$(".menu-toggle").click(function() {
  $("ul").toggleClass("opening");
  $(this).toggleClass("open");
});

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
