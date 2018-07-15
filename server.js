"use strict";

require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const sgMail = require('@sendgrid/mail');

mongoose.Promise = global.Promise;
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const { PORT, DATABASE_URL } = require("./config");
const app = express();

const { router: familyMembersRouter } = require("./familyMembers");
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




// //router for sending automated emails
// app.get("/api/mail", (req, res) => {
//
//   // var startOfToday = new Date();
//   //   start.setHours(0,0,0,0);
//   //
//   // var endOfToday = new Date();
//   //   end.setHours(23,59,59,999);
//   //
//   // FamilyMember.find({
//   //     "birthday": {
//   //       "$gte": startOfToday,
//   //       "$lt": endOfToday
//   //     }
//   // }).then(familyMembers =>{
//   //
//   //   res.json(familyMembers)
//
//
//     const msg = {
//       to: 'ericacjohnson@gmail.com',
//       from: 'reminders@familymash.com',
//       subject: 'REMINDERS R COOL',
//       html: '<strong>BIRTHDAYS YAY</strong>',
//     };
//
//     sgMail.send(msg);
//
//     res.send('hi');
//
//   }).catch(err=> console.log(err))

app.get("/api/mail", (req, res) => {
  const msg = {
    to: 'ericacjohnson@gmail.com',
    from: 'reminders@familymash.com',
    subject: 'REMINDERS R COOL',
    html: '<strong>BIRTHDAYS YAY</strong>',
  };
  sgMail.send(msg);

  res.send('hi');
});





app.use("*", function(req, res) {
  res.status(404).json({ message: "Not Found" });
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
