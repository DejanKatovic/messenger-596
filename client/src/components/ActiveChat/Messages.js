import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble, MarkAvatar } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId, readId } = props;

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        if (message.senderId === userId) {
          if (message.id === readId) {
            return (
              <Box key={message.id}>
                <SenderBubble text={message.text} time={time} />
                <MarkAvatar otherUser={otherUser} />
              </Box>
            )
          }
          else
            return <SenderBubble key={message.id} text={message.text} time={time} />
        }
        else
          return <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
      })}
    </Box>
  );
};

export default Messages;
