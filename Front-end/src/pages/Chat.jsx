import React, { Fragment, useRef, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import { IconButton, Stack } from "@mui/material";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { grayColor, orange } from "../constants/color";
import { InputBox } from "../components/styles/StyledComponents";
import FileMenu from "../components/dialogs/FileMenu";
import { sampleMessage } from "../constants/sampleData";
import MessageComponent from "../components/shared/MessageComponent";

const user = { _id: "sdfsdfsdf", name: "John Doe" };
const Chat = () => {
    const [message, setMessage] = useState("");

    const containerRef = useRef(null);
    const messageOnChange = (event) => {
      setMessage(event.target.value);
    };
  return (
    <Fragment>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={"90%"}
         alignItems="flex-start" 
        sx={{
          overflowX: "hidden",
          overflowY: "auto"
        }}
      >
        {sampleMessage.map((i,index) => (
          <MessageComponent key={index} message={i} user={user} />
        ))}

      </Stack>

  
      <form
        style={{
          height: "10%",
        }}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
              rotate: "30deg",
            }}
           
            
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox
            placeholder="Type Message Here..."
            value={message}
            onChange={messageOnChange}
          />

          <IconButton
            type="submit"
            sx={{
              rotate: "-30deg",
              bgcolor: orange,
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
      <FileMenu  />
    </Fragment>
  );
};

const ChatWithLayout = AppLayout(Chat);

export default ChatWithLayout;
