const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const dbConnect = require("./db/dbConnect");
dbConnect();

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require('./db/userModel');
const auth = require('./auth.js');

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

app.post("/register", (request, response) => {
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      const user = new User({
        email: request.body.email,
        password: hashedPassword,
      });
      user
        .save()
        .then((result) => {
          response.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        .catch((error) => {
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

app.post("/login", async (request, response) => {
  try {
    const user = await User.findOne({ email: request.body.email });

    if (!user) {
      return response.status(404).send({
        message: "Email not found",
      });
    }

    const passwordCheck = await bcrypt.compare(
      request.body.password,
      user.password
    );

    if (!passwordCheck) {
      return response.status(400).send({
        message: "Passwords do not match",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        userEmail: user.email,
      },
      'RANDOM-TOKEN', 
      { expiresIn: "24h" }
    );

    response.status(200).send({
      message: "Login Successful",
      email: user.email,
      token,
    });
  } catch (error) {
    response.status(500).send({
      message: "Error during login",
      error,
    });
  }
});

app.get("/free-endpoint", (request, response) => {
  response.json({ message: "You are free to access me anytime" });
});

app.get("/auth-endpoint", auth, (request, response) => {
  response.json({ message: "You are authorized to access me" });
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

module.exports = app;

