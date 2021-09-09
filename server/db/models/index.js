const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const Channel = require("./channel");

// associations

User.belongsToMany(Conversation, {through: Channel});
Conversation.belongsToMany(User, {through: Channel});
Message.belongsTo(Conversation);
Conversation.hasMany(Message);
Message.belongsTo(Channel);
Channel.hasMany(Message);
Message.belongsTo(Channel);

module.exports = {
  User,
  Conversation,
  Message,
  Channel
};
