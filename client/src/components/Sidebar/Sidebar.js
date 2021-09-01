import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Search, Chat, CurrentUser } from "./index.js";

const useStyles = makeStyles(() => ({
  root: {
    paddingLeft: 21,
    paddingRight: 21,
    width: '400px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flex: '1 auto',
  },
  title: {
    fontSize: 20,
    letterSpacing: -0.29,
    fontWeight: "bold",
    marginTop: 32,
    marginBottom: 15
  },
  main: {
    height: '100%',
    overflowY: 'scroll',

    '&::-webkit-scrollbar': {
        display: 'none',
    },
  }
}));

const Sidebar = (props) => {
  const classes = useStyles();
  const conversations = props.conversations || [];
  const { handleChange, searchTerm } = props;

  return (
    <Box className={classes.root}>
      <Box>
        <CurrentUser />
        <Typography className={classes.title}>Chats</Typography>
        <Search handleChange={handleChange} />
      </Box>
      <Box className={classes.main}>
        {conversations
          .filter((conversation) => conversation.otherUser.username.includes(searchTerm))
          .map((conversation) => {
            return <Chat latestMessageText={conversation.latestMessageText} otherUser={conversation.otherUser} key={conversation.otherUser.username} />;
          })}
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    conversations: state.conversations
  };
};

export default connect(mapStateToProps)(Sidebar);
