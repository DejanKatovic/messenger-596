import React, { useState } from "react";
import { FormControl, FilledInput, InputAdornment, IconButton, Popover, withStyles } from "@material-ui/core";
import { InsertEmoticon } from '@material-ui/icons';
import { makeStyles } from "@material-ui/core/styles";
import Picker from 'emoji-picker-react';
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";

const useStyles = makeStyles(() => ({
  root: {
    justifySelf: "flex-end",
    marginTop: 15,
  },
  input: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginBottom: 20,
    marginLeft: 41,
    marginRight: 41,
    paddingLeft: 20
  }
}));

const CustomPopper = withStyles({
  root: {
    '& .MuiPaper-root': {
      top: 'unset !important',
      bottom: "100px !important",
      left: 'unset !important',
      right: "40px !important"
    }
  }
})(Popover);

const Input = (props) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const { postMessage, otherUser, conversationId, user } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const emojiClick = (event, emojiObject) => {
    setText(`${text}${emojiObject.emoji}`);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: event.target.text.value,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user
    };
    await postMessage(reqBody);
    setText("");
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-controls="emoji-picker" aria-haspopup="true" onClick={handleMenu}>
                <InsertEmoticon />
              </IconButton>
            </InputAdornment>
          }
        />
        <CustomPopper
          id="emoji-picker"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Picker onEmojiClick={emojiClick} />
        </CustomPopper>
      </FormControl>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
  };
};

export default connect(null, mapDispatchToProps)(Input);
