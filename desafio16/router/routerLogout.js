const express = require("express");

const { getLogout } = require("../controllers/logout");

const { Router } = express;

const RouterLO = Router();

RouterLO.get('/' , getLogout)

module.exports = RouterLO;