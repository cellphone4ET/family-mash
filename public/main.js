
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
    insertPhotos();
  });
}

function insertPhotos() {
let html = `<div class="row">
    <div class="col-12">
      <h1>Star Wars Characters</h1>
      <p>Incomplete list</p>
    </div>
  </div>
</header>

<div class="row">

  <div class="col-4">
    <div class="card">
      <img class="card-image" src="juliet.jpg" />
      <div class="card-content">
        <h3>Rey</h3>
        <p>Protagonist, from Jakku</p>
      </div>
    </div>
  </div>

  <div class="col-4">
    <div class="card">
      <img class="card-image" src="juliet.jpg" />
      <div class="card-content">
        <h3>Finn</h3>
        <p>Stormtrooper, befriends Rey</p>
      </div>
    </div>
  </div>

  <div class="col-4">
    <div class="card">
      <img class="card-image" src="juliet.jpg" />
      <div class="card-content">
        <h3>Kylo Ren</h3>
        <p>Main villain, or is he?</p>
      </div>
    </div>
  </div>

</div>
<div class="row">

  <div class="col-4">
    <div class="card">
      <img class="card-image" src="juliet.jpg" />
      <div class="card-content">
        <h3>Poe</h3>
        <p>Pilot for the resistance</p>
      </div>
    </div>
  </div>

  <div class="col-4">
    <div class="card">
      <img class="card-image" src="juliet.jpg" />
      <div class="card-content">
        <h3>Chewbacca</h3>
        <p>A great first mate</p>
      </div>
    </div>
  </div>

  <div class="col-4">
    <div class="card">
      <img class="card-image" src="juliet.jpg" />
      <div class="card-content">
        <h3>Yoda</h3>
        <p>Wise old Jedi master</p>
      </div>
    </div>
  </div>
</div>`
$('#main-div').html(html);
}


$(document).ready(function() {
  getStartedButton();
  chooseSignUp();
  chooseLogin();
  submitLogin();
  submitSignUp();
})
