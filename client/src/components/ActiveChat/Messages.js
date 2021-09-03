import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble, MarkAvatar } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  let mark = false;

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        if (message.senderId === userId){
          if (!mark && !message.readed) {
            mark = true;
            return (
              <Box key={message.id}>
                <MarkAvatar otherUser={otherUser} />
                <SenderBubble text={message.text} time={time} />
              </Box>
            )
          }
          else
            return <SenderBubble key={message.id} text={message.text} time={time} />
        }
        else
          return <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
      })}
      {
        !mark ? <MarkAvatar otherUser={otherUser} /> : ''
      }
    </Box>
  );
};

export default Messages;
