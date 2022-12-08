const express = require("express");
const passport = require("passport")


const { login , getLogin, getErrorLogIn } = require("../controllers/login");

const { Router } = express;

const RouterL = Router();

RouterL.get('/' , getLogin);

RouterL.post('/' , passport.authenticate('login', {failureRedirect:'/login/errorLogIn'}),  login); 

RouterL.get('/errorLogIn', getErrorLogIn)

module.exports = RouterL;