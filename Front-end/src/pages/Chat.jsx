import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import AppLayout from "../components/layout/AppLayout";
import { IconButton, Skeleton, Stack } from "@mui/material";
import { grayColor, orange } from "../constants/color";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../components/styles/StyledComponents";
import FileMenu from "../components/dialogs/FileMenu";
import MessageComponent from "../components/shared/MessageComponent";
import { useSocket } from "../socket";
import {
  ALERT,
  CHAT_JOINED,
  CHAT_LEAVED,
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
} from "../constants/events";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { useErrors, useSocketEvents } from "../hooks/hook";
import { useInfiniteScrollTop } from "6pp";
import { useDispatch } from "react-redux";
import { setIsFileMenu } from "../redux/reducers/misc";
import { removeNewMessagesAlert } from "../redux/reducers/chat";
import { TypingLoader } from "../components/layout/Loaders";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

const Chat = ({ chatId, user }) => {
  const socket = useSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const containerRef = useRef(null);
  const bottomRef = useRef(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null);

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  );

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];

  const members = chatDetails?.data?.chat?.members;

  // typing
  const messageOnChange = (e) => {
    setMessage(e.target.value);
    

    if (!IamTyping) {
      
      socket.emit(START_TYPING, { members, chatId });
      setIamTyping(true);
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
     
      socket.emit(STOP_TYPING, { members, chatId });
      setIamTyping(false);
    }, 2000);
  };

  // open file
  const handleFileOpen = (e) => {
    
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

  // send message
const submitHandler = (e) => {
  e.preventDefault();
  if (!message.trim()) return;
  if (!members || members.length === 0) {
    
    return;
  }
 
  socket.emit(NEW_MESSAGE, { chatId, members, message });
  setMessage("");
};

  // lifecycle
 useEffect(() => {
  if (!members || members.length === 0) return; 

 
  socket.emit(CHAT_JOINED, { userId: user._id, members });
  dispatch(removeNewMessagesAlert(chatId));

  return () => {
    
    setMessages([]);
    setMessage("");
    setOldMessages([]);
    setPage(1);
    socket.emit(CHAT_LEAVED, { userId: user._id, members });
  };
  }, [chatId, members]); 

  useEffect(() => {
    if (bottomRef.current) {
     
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (chatDetails.isError) {
      
      return navigate("/");
    }
  }, [chatDetails.isError, navigate]);

 
const newMessagesListener = useCallback(
  (data) => {
    if (data.chatId !== chatId) return;
    setMessages((prev) => {
      const exists = prev.some((m) => m._id === data.message._id);
      if (exists) return prev;
      return [...prev, data.message];
    });
  },
  [chatId]
);

const startTypingListener = useCallback(() => {
  
  setUserTyping(true);
}, []);

const stopTypingListener = useCallback(() => {
  
  setUserTyping(false);
}, []);

const alertListener = useCallback((data) => {
  
  const messageForAlert = {
    content: data.message || JSON.stringify(data),
    sender: { _id: "system-admin", name: "Admin" },
    chat: chatId,
    createdAt: new Date().toISOString(),
  };
  setMessages((prev) => [...prev, messageForAlert]);
}, [chatId]);

  const presenceListener = useCallback(() => {
    
  }, []);

const eventHandler = {
  [ALERT]: alertListener,
  [NEW_MESSAGE]: newMessagesListener,
  [START_TYPING]: startTypingListener,
  [STOP_TYPING]: stopTypingListener,
  [CHAT_JOINED]: presenceListener,
  [CHAT_LEAVED]: presenceListener,
};
  useSocketEvents(socket, eventHandler);
  useErrors(errors);

  const allMessages = [...oldMessages, ...messages];

  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <Fragment>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {allMessages.map((i) => (
          <MessageComponent key={i._id} message={i} user={user} />
        ))}

        {userTyping && <TypingLoader />}

        <div ref={bottomRef} />
      </Stack>

      <form
        style={{
          height: "10%",
        }}
        onSubmit={submitHandler}
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
            onClick={handleFileOpen}
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

      <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />
    </Fragment>
  );
};

const ChatWithLayout = AppLayout(Chat);
export default ChatWithLayout;
