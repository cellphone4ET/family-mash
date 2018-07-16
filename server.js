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

//router for sending automated emails
app.get("/api/mail", (req, res) => {
  var beginning = new Date().setHours(0, 0, 0, 0);
  var end = new Date().setHours(23, 59, 59, 999);

  var startOfToday = moment(beginning).format();
  var endOfToday = moment(end).format();

  console.log(startOfToday);
  console.log(endOfToday);

  var today = moment().startOf("day");
  var tomorrow = moment(today).endOf("day");
  //
  // FamilyMember.find({
  //   // birthday: {
  //   //   $gte: new Date(startOfToday),
  //   //   $lte: new Date(endOfToday)
  //   // }
  //
  //   birthday: {
  //     $gte: new Date(2018, 7, 15),
  //     $lte: new Date(2018, 7, 17)
  //   }
  // })
  FamilyMember.find({
    // birthday: {
    //   $gte: new Date(Date.UTC(2018, 7, 16, 0, 0, 0)),
    //   $lt: new Date(Date.UTC(2018, 7, 17, 0, 0, 0))
    // }
  })
    .populate("user")
    .then(familyMembers => {
      res.json(familyMembers);
      familyMembers.forEach(member => {
        const msg = {
          to: member.user.email,
          from: "reminders@familymash.com",
          subject: "REMINDERS R COOL",
          html: `
                  <style>.email{color:gray}</style>
                  <strong class="email">BIRTHDAYS YAY</strong>

                `
        };
        // sgMail.send(msg); UNCOMMENT WHEN GETTING THE RIGHT STUFF ON POSTMAN
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
