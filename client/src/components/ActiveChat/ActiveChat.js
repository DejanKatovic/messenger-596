import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Input, Header, Messages } from "./index";
import { connect } from "react-redux";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    width: 'calc(100% - 400px)',
    flexGrow: 1,
    flexDirection: "column",
    flex: '1 auto 1',
    height: '100%'
  },
  chatContainer: {
    paddingLeft: 41,
    paddingRight: 41,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    overflowY: 'auto',
  },
}));

const ActiveChat = (props) => {
  const classes = useStyles();
  const { user } = props;
  const conversations = props.conversations;
  const conversation = conversations.find(
      (convo) => convo.otherUser.username === props.activeConversation
    ) || {};

  return (
    <Box className={classes.root}>
      {conversation.otherUser && (
        <>
          <Header
            username={conversation.otherUser.username}
            online={conversation.otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            <Messages
              messages={conversation.messages}
              otherUser={conversation.otherUser}
              userId={user.id}
              readId={conversation.readId}
            />
          </Box>
          <Input
            otherUser={conversation.otherUser}
            conversationId={conversation.id}
            user={user}
          />
        </>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversations: state.conversations,
    activeConversation: state.activeConversation
  };
};

export default connect(mapStateToProps, null)(ActiveChat);
