const Sequelize = require("sequelize");
const db = require("../db");

const ChannelUser = db.define("channelUser", {});

module.exports = ChannelUser;