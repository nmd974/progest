const express = require("express");
const router = express.Router();

const createUser = require("../controllers/users/creation/signup");
const login = require("../controllers/users/connexion/login");

router.post('/signup', createUser.signup);
router.post('/login', login.login);

module.exports = router;