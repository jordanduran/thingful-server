const express = require("express");
const UserService = require("./users-service")
const usersRouter = express.Router();
const jsonBodyParser = express.json();

usersRouter.post("/", jsonBodyParser, (req, res) => {
  for (const field of ["full_name", "user_name", "password"])
    if (!req.body[field])
      return res.status(400).json({
        error: `Missing '${field}' in request body`
      });
  const passwordError = UserService.validatePassword(req.body.password)
  console.log(passwordError)
  if (passwordError) {
    return res.status(400).json({
      error: passwordError
    })
  }
  res.send("okay");
});

module.exports = usersRouter;
