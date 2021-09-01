import React from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { connect } from "react-redux";

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

const Chat = (props) => {
  const classes = useStyles();
  const { latestMessageText, otherUser, activeConversation } = props;
  const handleClick = async (otherUser) => {
    await props.setActiveChat(otherUser.username);
  };

  return (
    <Box onClick={() => handleClick(otherUser)} className={`${classes.root} ${classes[otherUser.username === activeConversation && "selected"]}`}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent latestMessageText={latestMessageText} otherUser={otherUser} />
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
