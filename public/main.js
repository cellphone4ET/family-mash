function chooseSignUp() {
  $("#sign-up-button").on("click", function(event) {
    $(".landing-page").hide();
    $(".signup-login-page").show();
    $("#sign-up-form").show();
  });
}

function chooseLogin() {
  $("#login-button").on("click", function(event) {
    $(".landing-page").hide();
    $(".signup-login-page").show();
    $("#login-form").show();
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
  insertPhotos();
}

function clickMenu() {
  $(".main-nav").on("click", ".menu-link", function(event) {
    // $(".row").hide();
    // $(".add-fam-member").show();
    // $(".sign-out").show();
    // $(".create-person-form").hide();

    console.log("dropdown menu");
  });
}

function signOut() {
  $("#nav-bar").on("click", "#sign-out", function(event) {
    console.log("Sign out");
    $("#nav-bar").hide();
    $("#family-members-page").hide();
    $(".landing-page").show();
  });
}

function returnToMainScreen() {
  $("#nav-bar").on("click", "#mainpage", function(event) {
    console.log("returnToMainScreen ran");
    //   $(".add-fam-member").hide();
    //   $(".sign-out").hide();
    //   $(".create-person-form").hide();
    //   insertPhotos();
  });
}

function createPerson() {
  $("#nav-bar").on("click", "#createperson", function(event) {
    //   $(".add-fam-member").hide();
    //   $(".sign-out").hide();
    //   $(".create-person-form").show();
  });
}

function submitPerson() {
  $("#nav-bar").on("submit", "#submit-person", function(event) {
    //   event.preventDefault();
    //   $(".create-person-form").hide();
    //   insertPhotos();
  });
}

function moreInfoLink() {
  $("#family-members-page").on("click", "#family-member-info", function() {
    // $(".row").hide();
    // insertPersonInfo();
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
  $(".person-info").html(html);
}

// FOR DISPLAY ONLY: this will need to be reformatted to account for data
function insertPhotos() {
  let html = `
  <div class="row">
  
  <div class="col-4">
  <div class="card">
  <img alt="family-member" class="card-image" src="morticia.jpg" />
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
  <div class="row">`;

  $("#family-members-page").html(html);
}

$(document).ready(function() {
  returnToMainScreen();
  moreInfoLink();
  submitPerson();
  createPerson();
  signOut();
  clickMenu();
  chooseSignUp();
  chooseLogin();
  submitLogin();
  submitSignUp();
});
