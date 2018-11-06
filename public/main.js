var state = {
  loggedIn: false,
  token:localStorage.getItem('token'),
  familyMembers: [],
  activeFamilyMember: "",
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

function submitDemoLogin() {
  $("#demo").on("click", function(event) {
    let email = 'wednesday@addamsfamily.com';
    let password = '012345678910';
    let route = 'auth/login';
    handleAuth(route, email, password);
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
      if (data.authToken) {
        state.loggedIn = true;
        localStorage.setItem('token', data.authToken);
        state.token = data.authToken;
        showMain();
      } else {
        handleAuth('auth/login', email, password)
      }
    },
    error: function(error) {
      if (error.responseJSON === undefined) {
        return loginErrors(error.status);
      } else {
        let errorMessage = error.responseJSON.message;
        signupErrors(errorMessage);
      }
    }
  }

  $.ajax(settings);
}

function signupErrors(errorMessage) {
	if(errorMessage === "Username already taken") {
		$('#email-taken').show();
	}
	if(errorMessage === "Must be at least 10 characters long") {
		$('#password-length').show();
	}
}

function loginErrors(errorStatus) {
	if(errorStatus === 400) {
		$('#empty-fields').show();
	}
	else if(errorStatus === 401) {
		$('#no-match').show();
  }
}

function hideAllErrorMessages() {
	$('#email-taken').hide();
  $('#password-length').hide();
  $('#empty-fields').hide();
  $('#no-match').hide();
}

function showMain() {
    $(".topnav").show();
    $("#family-members-page").show();
    $(".signup-login-page").hide();
    $(".landing-page").hide();
    document.body.style.backgroundColor = "white";
    hideAllErrorMessages();
    getFamilyMembers();

}

function addFamilyMember() {
  $("#add-family-member-button").on("click", function(event) {
    $(".create-person-form").show();
    $('#no-family-members').hide();
    $('#person-name').val("");
    $('#person-relation').val("");
    $('#person-birthday').val("");
    $('#person-significant-other').val("");
    $('#person-anniversary').val("");
    $('#person-notes').val("");
    $('#person-photo-url').val("");
  })
}

function createPerson() {
  $(".topnav").on("click", "#createperson", function(event) {
    $("#no-family-members").hide();
    clearPersonInfo();
    $(".row").hide();
    $(".topnav").removeClass("responsive");
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
  $(".topnav").on("click", "#sign-out", function(event) {
    $(".topnav").hide();
    clearPersonInfo();
    $(".landing-page").show();
    $(".row").hide();
    $(".create-person-form").hide();
    $(".topnav").removeClass("responsive");
    $('#no-family-members').hide();
    document.body.style.backgroundColor = "#dcd0c0";
    state.token = "";
    localStorage.setItem('token', "");

  });
}

function returnToMainScreen() {
  $(".topnav").on("click", "#mainpage", function(event) {
    $(".create-person-form").hide();
    clearPersonInfo();
    $(".topnav").removeClass("responsive");
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
    // assignation of data attribute to designate which fam  member is
    // the current active one amongst all fam members
    let index = $(event.currentTarget).attr('data-index');
    state.activeFamilyMember = state.familyMembers[index];
    insertPersonInfo(state.activeFamilyMember);
  });
}

// DELETE
function clickDeleteFamMember() {
  $(".person-info-div").on("click", ".delete-family-member", function() {
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
        state.familyMembers = data;
        if (state.familyMembers.length === 0) {
          $('#no-family-members').show();

        } else {
          insertPhotos(state.familyMembers);
        }

      },
      error: function(error) {
      }
    });
}

function insertPersonInfo(familyMember) {
  // necessary date reformatting to a readable form for birthday/anniversaries
  let formattedBirthday = moment(state.activeFamilyMember.birthday).format("MMMM Do, YYYY");
  let formattedAnniversary = moment(state.activeFamilyMember.anniversary).format("MMMM Do, YYYY");

  // significant other, anniversary and notes are optional for each family member; the following code checks to see if
  // this information has been provided, and if not, the corresponding display HTML + 'undefined' will not be rendered
  let significantOtherHTML = state.activeFamilyMember.significant_other ?
    `<p class="content-field"><span class="bold">Significant Other</span><span class="smaller">:   ${state.activeFamilyMember.significant_other}</span></p>` :
    "";

  let anniversaryHTML = state.activeFamilyMember.anniversary ?
    `<p class="content-field"><span class="bold">Anniversary</span><span class="smaller">:   ${formattedAnniversary}</span></p>` :
    "";

  let notesHTML = state.activeFamilyMember.notes ?
    `<p class="content-field"><span class="bold">Notes</span><span class="smaller">:   ${state.activeFamilyMember.notes}</span></p>` :
    "";
  // family member photo is an optional input; if none provided the following code provides a generic user avatar
  let photoHTML = state.activeFamilyMember.photo_url ? `<img alt="family-member" class="card-image-active" src="${state.activeFamilyMember.photo_url}" />` :
  `<img alt="family-member" class="card-image-active avatar" src="user.png">`;

  $(".person-photo").html(photoHTML);

  // age is a virtual preoperty automatically calculated and updated each year based on
  // the user's birthday
  let html2 = `
  <div class="fam-member-info">
  <h4>${state.activeFamilyMember.name}</h4>
  <div class="text-info">
  <p class="content-field"><span class="bold">Relation</span><span class="smaller">:   ${state.activeFamilyMember.relation}</span></p>
  <p class="content-field"><span class="bold">Birthday</span><span class="smaller">:   ${formattedBirthday} </span></p>
   <p class="content-field"><span class="bold">Age</span><span class="smaller">: ${state.activeFamilyMember.age}</span></p>
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

      let photoHTML = familyMember.photo_url ? `<img alt="family-member" class="card-image" src="${familyMember.photo_url}" />` :
      `<img alt="family-member" class="card-image" src="user.png" />`;

      return `
      <div class="row">
      <div class="col-4">
      <div class="card" data-index="${index}">
      ${photoHTML}
      <div class="card-content">
      <h3><a href="#family-member-info" class="person-info">${familyMember.name}</a></h3>
      <p class="upper-case">${familyMember.relation}</p>
      </div>
      </div>
      </div>`;
      });
    $("#family-members-page").html(html);
}

function openNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

$(document).ready(function() {

  // check to see if auth token is provided in header; if so then main landing
  // page is rendered
  if (state.token) {
    showMain();
  }

  addFamilyMember();
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
  submitDemoLogin();
});
