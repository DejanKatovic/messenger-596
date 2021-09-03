import React from "react";
import { Box, Badge, withStyles } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { connect } from "react-redux";
import { conversationRead } from "../../store/utils/thunkCreators";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab"
    }
  },
  selected: {
    background: 'white'
  }
}));

const CustomBadge = withStyles(() => ({
  badge: {
    right: -10,
    top: 20,
    padding: '0 4px'
  }
}))(Badge);

const Chat = (props) => {
  const classes = useStyles();
  const { conversationId, latestMessageText, otherUser, online, activeConversation, unreadCount } = props;
  const handleClick = async (otherUser) => {
    await props.setActiveChat(otherUser.username);

    if (unreadCount > 0) {
      const reqBody = {
        recipientId: otherUser.id,
        conversationId,
      };
      await props.conversationRead(reqBody);
    }
  };

  return (
    <Box onClick={() => handleClick(otherUser)} className={`${classes.root} ${classes[otherUser.username === activeConversation && "selected"]}`}>
      <CustomBadge badgeContent={unreadCount} color={"primary"}>
        <BadgeAvatar
          photoUrl={otherUser.photoUrl}
          username={otherUser.username}
          online={online}
          sidebar={true}
        />
        <ChatContent latestMessageText={latestMessageText} otherUser={otherUser} />
      </CustomBadge>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    activeConversation: state.activeConversation
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    conversationRead: (data) => {
      dispatch(conversationRead(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
