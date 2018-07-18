"use strict";

require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const sgMail = require("@sendgrid/mail");
const moment = require("moment");

mongoose.Promise = global.Promise;
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
moment().format();

const { PORT, DATABASE_URL } = require("./config");
const app = express();

const {
  router: familyMembersRouter,
  FamilyMember: FamilyMember
} = require("./familyMembers");
const { router: usersRouter } = require("./users");
const { router: authRouter, localStrategy, jwtStrategy } = require("./auth");

// logging
app.use(morgan("common"));
app.use(express.json());
app.use(express.static("public"));

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  if (req.method === "OPTIONS") {
    return res.send(204);
  }
  next();
});

app.use(passport.initialize());
passport.use("local", localStrategy);
passport.use(jwtStrategy);

app.use("/api/users/", usersRouter);
app.use("/api/auth/", authRouter);
app.use("/api/family-members", familyMembersRouter);

//router for sending automated birthday emails
app.get("/api/mail-birthday", (req, res) => {
  var current_date = moment(new Date()).format("MM-DD");

  FamilyMember.find({
    "simpleBirthdayDate": current_date
  })
    .populate("user")
    .then(familyMembers => {
      res.json(familyMembers);
      familyMembers.forEach(member => {
        const msg = {
          to: member.user.email,
          from: "reminders@familymash.com",
          subject: `It\'s ${member.name}\'s birthday!`,
          html: `
          <html>
          <head>
          <link href="https://fonts.googleapis.com/css?family=Arvo|Lato" rel="stylesheet">
          <style>.email {font-family: "Lato", sans-serif; font-size: 15px;} .logo {font-family: "Arvo", serif; font-size: 35px; letter-spacing: -3px; margin-left: 10px;} .banner {width: 100%, height: 100px; background-color: #dcd0c0;}
          </style>
          </head>
          <div class="banner"> <h1 class=logo>family.mash<h1></div>

          <p class="email">Hey ${member.user.firstName},<br><br>
          It's ${member.name}'s birthday today and is turning ${member.age}! Make sure to call ${member.name} and give them your best wishes.<br><br>
          Love, <br><br> The Family.Mash Team</p>
          </html>

                `
        };
        sgMail.send(msg);
      });
    })
    .catch(err => console.log(err));
  });

//router for sending automated anniversary emails
  app.get("/api/mail-anniversary", (req, res) => {
    var current_date = moment(new Date()).format("MM-DD");
    console.log(current_date);
    FamilyMember.find({
      "simpleAnniversary": current_date
    })
      .populate("user")
      .then(familyMembers => {
        res.json(familyMembers);
        familyMembers.forEach(member => {
          const msg = {
            to: member.user.email,
            from: "reminders@familymash.com",
            subject: `It\'s ${member.name}\'s anniversary!`,
            html: `
            <head>
            <link href="https://fonts.googleapis.com/css?family=Arvo|Lato" rel="stylesheet">
            <style>.email {font-family: "Lato", sans-serif; font-size: 15px;} .logo {font-family: "Arvo", serif; font-size: 35px; letter-spacing: -3px; margin-left: 10px;} .banner {width: 100%, height: 100px; background-color: #dcd0c0;}
            </style>
            </head>
            <div class="banner"> <h1 class=logo>family.mash<h1></div>

            <p class="email">Hey ${member.user.firstName},<br><br>
            It's ${member.name}'s anniversary today! Make sure to call ${member.name} and let them know how much you care.<br><br>
            Love, <br><br> The Family.Mash Team</p>
            </html>

                  `
          };
          sgMail.send(msg);
        });
      })
      .catch(err => console.log(err));
    });

// start server
let server;

function runServer(DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      DATABASE_URL,
      err => {
        if (err) {
          return reject(err);
        }

        server = app
          .listen(port, () => {
            console.log(`Your app is listening on port ${port}`);
            resolve();
          })
          .on("error", err => {
            mongoose.disconnect();
            reject(err);
          });
      }
    );
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log("Closing server");
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { runServer, app, closeServer };
