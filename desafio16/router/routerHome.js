const express = require("express");

const checkAuthentication = require("../servicios/auth/auth");
const { getHome, getInfo, getRandoms } = require("../controllers/home");


const { Router } = express;

const RouterH = Router();

RouterH.get('/' , checkAuthentication , getHome );

RouterH.get('/info', getInfo);

RouterH.get('/api/randoms', getRandoms);

module.exports = RouterH;