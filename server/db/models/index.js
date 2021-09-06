const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const Channel = require("./channel");
const ChannelUser = require("./channelUser");

// associations

User.hasMany(Conversation);
Conversation.belongsTo(User, { as: "user1" });
Conversation.belongsTo(User, { as: "user2" });
Message.belongsTo(Conversation);
Conversation.hasMany(Message);
Message.belongsTo(Channel);
Channel.hasMany(Message);
Message.belongsTo(Channel);
Channel.hasMany(ChannelUser);
ChannelUser.belongsTo(Channel);
User.hasMany(ChannelUser);
ChannelUser.belongsTo(User);

module.exports = {
  User,
  Conversation,
  Message,
  Channel,
  ChannelUser
};
