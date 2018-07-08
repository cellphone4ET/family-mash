var state = {
  loggedIn: false,
  token:localStorage.getItem('token'),
  familyMembers: [],
  activeFamilyMember: ""
};

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

function clickReturnArrow() {
  $('#sign-up-form').on('click', ".back-arrow", function(event) {
    $(".landing-page").show();
    $(".signup-login-page").hide();
    $("#login-form").hide();
    $("#sign-up-form").hide();
  });
  $('#login-form').on('click', ".back-arrow", function(event) {
    $(".landing-page").show();
    $(".signup-login-page").hide();
    $("#login-form").hide();
    $("#sign-up-form").hide();
  });
}

function submitLogin() {
  $("#login-form").on("submit", function(event) {
    event.preventDefault();
    let email = $('#login-email-input').val();
    $('#login-email-input').val("");
    let password = $('#login-password-input').val();
    $('#login-password-input').val("");
    let route = 'auth/login';
    handleAuth(route, email, password);
  })

}

function submitSignUp() {
  $("#sign-up-form").on("submit", function(event) {
    event.preventDefault();
    let firstName = $('#sign-up-first-name').val();
    $('#sign-up-first-name').val("");
    let lastName = $('#sign-up-last-name').val();
    $('#sign-up-last-name').val("");
    let email = $('#sign-up-email-input').val();
    $('#sign-up-email-input').val("");
    let password = $('#sign-up-password-input').val();
    $('#sign-up-password-input').val("");
    let route = 'users'
    handleAuth(route, email, password, firstName, lastName);
  })
}

function handleAuth(route, email, password, firstName, lastName) {

  var userData = {
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName
  }

  let settings = {
    url: `/api/${route}`,
    type: "POST",
    data: JSON.stringify(userData),
    contentType: "application/json; charset=utf-8",
    dataType: 'json',
    success: function(data) {
      state.loggedIn = true;
      localStorage.setItem('token', data.authToken);
      state.token = data.authToken;
      showMain();
    },
    error: function(error) {
      console.log('error with authenticating the account');
      console.log(error);
    }
  }

  $.ajax(settings);
}

function showMain() {
    $(".site-nav").show();
    $("#family-members-page").show();
    $(".signup-login-page").hide();
    $(".landing-page").hide();
    document.body.style.backgroundColor = "white";
    getFamilyMembers();

}

function createPerson() {
  $(".site-nav").on("click", "#createperson", function(event) {
    clearPersonInfo();
    $(".row").hide();
    state.activeFamilyMember = "";
    $('#person-name').val("");
    $('#person-relation').val("");
    $('#person-birthday').val("");
    $('#person-significant-other').val("");
    $('#person-anniversary').val("");
    $('#person-notes').val("");
    $('#person-photo-url').val("");
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
    state.token = "";
    localStorage.setItem('token', "");

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

// POST + PUT
function submitPerson() {
  $(".create-person-page").submit("#submit-person", function(event) {
    event.preventDefault();

      let name = $('#person-name').val();
      let relation = $('#person-relation').val();
      let birthday = $('#person-birthday').val();
      let significant_other = $('#person-significant-other').val();
      let anniversary = $('#person-anniversary').val();
      let notes = $('#person-notes').val();
      let photo_url = $('#person-photo-url').val();


      let familyMemberData = {
    		name: name,
    		relation: relation,
        birthday: birthday,
        significant_other: significant_other,
        anniversary: anniversary,
        notes: notes,
        photo_url: photo_url
    	};

      

      let settings = {
        url: `/api/family-members`,
        type: "POST",
        data: familyMemberData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
    			"Authorization": `Bearer ${state.token}`
    		},
        success: showMain,
        error: function(error) {
          console.log(error);
        }
      };

    let editingId = state.activeFamilyMember.id

    if(state.activeFamilyMember && editingId )  { // EDITING
      settings.type= "PUT",
      settings.url = `/api/family-members/${editingId}`,
      settings.data.id = editingId
    }
    settings.data = JSON.stringify(settings.data);

      $.ajax(settings);

      $(".create-person-form").hide()
  });
}

function moreInfoLink() {
  $("#family-members-page").on("click", ".card", function(event) {
    $(".row").hide();
    let index = $(event.currentTarget).attr('data-index');
    state.activeFamilyMember = state.familyMembers[index];
    insertPersonInfo(state.activeFamilyMember);
  });
}

// DELETE
function clickDeleteFamMember() {
  $(".person-info-div").on("click", ".delete-family-member", function() {
    console.log('clickDeleteFamMember ran');
    let result = confirm(`Are you sure you want to delete ${state.activeFamilyMember.name}?`);
    let id = state.activeFamilyMember.id;
      if (result) {
        $.ajax({
          url: `/api/family-members/${id}`,
          type: "DELETE",
          data: JSON.stringify({id: id}),
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          headers: {
      			"Authorization": `Bearer ${state.token}`
      		},
          success: function(data) {
            clearPersonInfo();
            showMain();
            state.activeFamilyMember = "";
          },
          error: function(errorData) {
          }
        });
      }
  });
}

function clickEditFamMember() {
  $(".person-info-div").on("click", ".edit-family-member", function() {
    clearPersonInfo();

    let birthday = moment(state.activeFamilyMember.birthday).format("YYYY-MM-DD");
    let anniversary = moment(state.activeFamilyMember.anniversary).format("YYYY-MM-DD");

    $(".create-person-form").show();
    $('#person-name').val(state.activeFamilyMember.name);
    $('#person-relation').val(state.activeFamilyMember.relation);
    $('#person-birthday').val(birthday);
    $('#person-significant-other').val(state.activeFamilyMember.significant_other);
    $('#person-anniversary').val(anniversary);
    $('#person-notes').val(state.activeFamilyMember.notes);
    $('#person-photo-url').val(state.activeFamilyMember.photo_url);


  })
}

// GET
function getFamilyMembers(id) {
  $.ajax({
    url: `/api/family-members`,
    dataType: "json",
    type: 'GET',
    headers: {
			"Authorization": `Bearer ${state.token}`
		},
    success: function(data) {
        console.log(data)
        state.familyMembers = data;
        if (state.familyMembers.length === 0) {
          alert("Looks like you haven't added any family members yet!");
        } else {
          insertPhotos(state.familyMembers);
        }

      },
      error: function(error) {
        console.log(error);
      }
    });
}

function insertPersonInfo(familyMember) {
  let formattedBirthday = moment(state.activeFamilyMember.birthday).format("MMMM Do, YYYY");
  let formattedAnniversary = moment(state.activeFamilyMember.anniversary).format("MMMM Do, YYYY");


  let significantOtherHTML = state.activeFamilyMember.significant_other ?
    `<p class="content-field"><span class="bold">Significant Other</span><span class="smaller">:   ${state.activeFamilyMember.significant_other}</span></p>` :
    "";

  let anniversaryHTML = state.activeFamilyMember.anniversary ?
    `<p class="content-field"><span class="bold">Anniversary</span><span class="smaller">:   ${formattedAnniversary}</span></p>` :
    "";

  let notesHTML = state.activeFamilyMember.notes ?
    `<p class="content-field"><span class="bold">Notes</span><span class="smaller">:   ${state.activeFamilyMember.notes}</span></p>` :
    "";


  let html1 = `<img alt="family-member" class="card-image-active" src="${state.activeFamilyMember.photo_url}" />`
  $(".person-photo").html(html1);

  let html2 = `
  <div class="fam-member-info">
  <h4>${state.activeFamilyMember.name}</h4>
  <div class="text-info">
  <p class="content-field"><span class="bold">Relation</span><span class="smaller">:   ${state.activeFamilyMember.relation}</span></p>
  <p class="content-field"><span class="bold">Birthday</span><span class="smaller">:   ${formattedBirthday} </span></p>
  ${significantOtherHTML}
  ${anniversaryHTML}
  ${notesHTML}
  </div>
  </div>

  <a href="#delete-family-member" class="delete-family-member"><img src="delete.jpg" alt="trash-can" class="delete"></a>
  <a href="#edit-family-member" class="edit-family-member"><img src="edit.jpg" alt="edit-pencil" class="edit"></a>

  `;
  $(".person-info-div").html(html2);
}

function insertPhotos(familyMembers) {
    let html = familyMembers.map(function(familyMember, index) {
      return `
      <div class="row">
      <div class="col-4">
      <div class="card" data-index="${index}">
      <img alt="family-member" class="card-image" src="${familyMember.photo_url}" />
      <div class="card-content">
      <h3><a href="#family-member-info" class="person-info">${familyMember.name}</a></h3>
      <p class="upper-case">${familyMember.relation}</p>
      </div>
      </div>
      </div>`;
      });
    $("#family-members-page").html(html);
}

$(".menu-toggle").click(function() {
  $("ul").toggleClass("opening");
  $(this).toggleClass("open");
});

$(document).ready(function() {

  if (state.token) {
    showMain();
  }

  clickReturnArrow();
  clickEditFamMember();
  clickDeleteFamMember();
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
