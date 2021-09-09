const Sequelize = require("sequelize");
const db = require("../db");

const Channel = db.define("conversation", {});

module.exports = Channel;