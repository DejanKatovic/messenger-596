import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
		display: "flex",
		justifyContent: "flex-end"
  },
  avatar: {
    height: 20,
	width: 20,
	margin: "10px 0",
  },
}));

const MarkAvatar = (props) => {
	const classes = useStyles();

	const { otherUser } = props;

	return (
		<Box className={classes.root}>
      <Avatar alt={otherUser.username} src={otherUser.photoUrl} className={classes.avatar}></Avatar>
		</Box>
	)
}

export default MarkAvatar;