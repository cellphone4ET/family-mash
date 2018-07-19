// make this into router

// to call from postman /api/cron/all
app.get("/all", (req, res) => {
  var current_date = moment(new Date()).format("MM-DD");

  FamilyMember.find({ simpleBirthdayDate: current_date })
    .populate("user")
    .then(familyMembers => {
      familyMembers.forEach(member => {
        sgMail.send(generateEmail(member, "birthday"));
      });
    })
    .catch(err => console.log(err));

  FamilyMember.find({ simpleAnniversary: current_date })
    .populate("user")
    .then(familyMembers => {
      familyMembers.forEach(member => {
        sgMail.send(generateEmail(member, "anniversary"));
      });
    })
    .catch(err => console.log(err));
  res.send("sent");
});

function generateEmail(member, type) {
  const msg = {
    to: member.user.email,
    from: "reminders@familymash.com",
    subject: `It\'s ${member.name}\'s ${type}!`,
    html: `
      <html>
        <head>
          <link href="https://fonts.googleapis.com/css?family=Arvo|Lato" rel="stylesheet">
          <style>
            .email {font-family: "Lato", sans-serif; font-size: 15px;}
            .logo {font-family: "Arvo", serif; font-size: 35px; letter-spacing: -3px; margin-left: 10px;}
            .banner {width: 100%, height: 100px; background-color: #dcd0c0;}
          </style>
        </head>

      <div class="banner"><h1 class=logo>family.mash<h1></div>
      <p class="email">
        Hey ${member.user.firstName}, <br><br>
        ${
          type === "birthday"
            ? generateBirthdayMessage(member)
            : generateAnniversaryMessage(member)
        },
        Love, <br><br>
        The Family.Mash Team
      </p>
      </html>
            `
  };
  return msg;
}

function generateAnniversaryMessage(member) {
  return `  It's ${member.name}'s anniversary with ${
    member.significant_other
  } today! Make sure to call ${
    member.name
  } and let them know how much you care.<br><br>`;
}

function generateBirthdayMessage(member) {
  return `   It's your ${member.relation} ${
    member.name
  }'s birthday today and they are turning ${member.age}! Make sure to call ${
    member.name
  } and give them your best wishes.<br><br>`;
}

//
// //router for sending automated birthday emails
// app.get("/api/mail-birthday", (req, res) => {
//   var current_date = moment(new Date()).format("MM-DD");
//
//   FamilyMember.find({ simpleBirthdayDate: current_date })
//     .populate("user")
//     .then(familyMembers => {
//       res.json(familyMembers);
//       familyMembers.forEach(member => {
//         generateBirthdayEmail(member.user.email, "birthday");
//         sgMail.send(msg);
//       });
//     })
//     .catch(err => console.log(err));
// });
//
// //router for sending automated anniversary emails
// app.get("/api/mail-anniversary", (req, res) => {
//   var current_date = moment(new Date()).format("MM-DD");
//   console.log(current_date);
//   FamilyMember.find({ simpleAnniversary: current_date })
//     .populate("user")
//     .then(familyMembers => {
//       res.json(familyMembers);
//       familyMembers.forEach(member => {
//         generateEmail(member.user.email, "anniversary");
//         sgMail.send(msg);
//       });
//     })
//     .catch(err => console.log(err));
// });
//
