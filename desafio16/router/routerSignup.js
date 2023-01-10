const express = require("express");
const passport = require("passport")


const { signup, getSignup, getErrorSignup } = require("../controllers/signup");

const { Router } = express;

const RouterS = Router();

RouterS.get('/', getSignup);

RouterS.post('/', passport.authenticate('signup', {failureRedirect:'/signup/errorSignUp'}), signup);

RouterS.get('/errorSignUp', getErrorSignup )

module.exports = RouterS