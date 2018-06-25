

function chooseSignUp() {
  $("#sign-up-button").on("click", function(event) {
    $(".landing-page").hide();
    $(".signup-login-page").show();
    $("#sign-up-form").show();
    $("#login-form").hide();
  });
}

function chooseLogin() {
  $("#login-button").on("click", function(event) {
    $(".landing-page").hide();
    $(".signup-login-page").show();
    $("#login-form").show();
    $("#sign-up-form").hide();
  });
}

function submitLogin() {
  $("#login-form").on("submit", showMain);
     event.preventDefault();
       const email = $('').val();
       const password = $('').val();

       $.ajax({
           url: '/api/login',
           method: 'POST',
           data: {
               email: email,
               password: password,
           },
           success: (response) => {
               sessionStorage.setItem('token', response.token);
               location.href = '/protected.html';
           },
           error: () => {
               renderError();
           }
       })


}

function submitSignUp() {
  $("#sign-up-form").on("submit", showMain);
}

function showMain(event) {
  event.preventDefault();
    $(".site-nav").show();
    $("#family-members-page").show();
    $(".signup-login-page").hide();
    insertPhotos();
    document.body.style.backgroundColor = "white";
}

function createPerson() {
  $(".site-nav").on("click", "#createperson", function(event) {
    clearPersonInfo();
    $(".row").hide();
    $(".create-person-form").show();
  });
}

function signOut() {
  $(".site-nav").on("click", "#sign-out", function(event) {
    $(".site-nav").hide();
    clearPersonInfo();
    $(".landing-page").show();
    $(".row").hide();
    $(".create-person-form").hide();
    document.body.style.backgroundColor = "#dcd0c0";
  });
}

function returnToMainScreen() {
  $(".site-nav").on("click", "#mainpage", function(event) {
    $(".create-person-form").hide();
    clearPersonInfo();
    $(".row").show();
    insertPhotos();

  });
}

function clearPersonInfo() {
  $(".person-info-div").empty();
  $(".person-photo").empty();
  $(".person-name").empty();
}

function submitPerson() {
  $(".site-nav").on("submit", "#submit-person", function(event) {
    event.preventDefault();
    $(".create-person-form").hide();
    insertPhotos();
  });
}

function moreInfoLink() {
  $("#family-members-page").on("click", ".person-info", function() {
    $(".row").hide();
    insertPersonInfo();
  });
}

// FOR DISPLAY ONLY: this will need to be reformatted to account for data

function insertPersonInfo() {

  let html1 = `<img alt="family-member" class="card-image-active" src="morticia.jpg" />`
  $(".person-photo").append(html1);

  let html2 = `
  <div class="fam-member-info">
  <h4>Morticia Addams</h4>
  <div class="text-info">
  <p class="content-field"><span class="bold">Relation</span><span class="smaller">:   mother</span></p>
  <p class="content-field"><span class="bold">Age</span><span class="smaller">:   immortal</span></p>
  <p class="content-field"><span class="bold">Birthday</span><span class="smaller">:   01/01/1300</span></p>
  <p class="content-field"><span class="bold">Significant Other</span><span class="smaller">:   Gomes Addams</span></p>
  <p class="content-field"><span class="bold">Anniversary</span><span class="smaller">:   02/14/1666</span></p>
  <p class="content-field"><span class="bold">Notes</span><span class="smaller">:   needs vitamin D</span></p>
  </div>
  </div>
  `;
  $(".person-info-div").append(html2);
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
