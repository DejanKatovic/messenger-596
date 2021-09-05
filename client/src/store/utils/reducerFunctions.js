export const addMessageToStore = (state, payload) => {
  const { message, sender, isSent } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
      unreadCount: isSent ? 0 : 1,
    };
    newConvo.latestMessageText = message.text;
    return [newConvo, ...state];
  }

  let changedConvo = {};
  const newState = state.map(convo => {
    if (convo.id === message.conversationId) {
      convo.messages.push(message);
      convo.latestMessageText = message.text;
      if (!isSent)
        convo.unreadCount++;
      changedConvo = convo;
      return convo;
    } else {
      return convo;
    }
  });

  return [changedConvo, ...newState.filter(convo => convo.id !== message.conversationId)];
};

export const markMessageRead = (state, payload) => {
  const {recipientId, conversationId, isSent} = payload;

  return state.map(convo => {
    if (convo.id === conversationId) {
      const convoCopy = { ...convo };
      let newMessages = convoCopy.messages.map((msg) => {
        if (msg.senderId === recipientId) {
          msg.read = true;
          return msg;
        }
        else
          return msg;
      });
      convoCopy.messages = newMessages;
      if (isSent)
      convoCopy.unreadCount = 0;
      else {
        const readMessages = newMessages.filter((message) => message.senderId === recipientId && message.read === true);
        convoCopy.readId = readMessages.length > 0 ? readMessages[readMessages.length - 1].id : -1;
      }
      return convoCopy;
    } else {
      return convo;
    }
  })
}

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  let changedConvo = {};
  const newState = state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      convo.id = message.conversationId;
      convo.messages.push(message);
      convo.latestMessageText = message.text;
      changedConvo = convo;
      return convo;
    } else {
      return convo;
    }
  });

  return [changedConvo, ...newState.filter(convo => convo.otherUser.id !== recipientId)];
};
