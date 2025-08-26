import React from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { Grid } from "@mui/material";
import Profile from "../specific/Profile";
import ChatList from "../specific/ChatList";
import { samepleChats } from "../../constants/sampleData";
import { useParams } from "react-router-dom";

const user = {
  name: "Hafiz Fahad Iqbal",
  username: "hafiz_fahad",
  bio: "Just a developer who loves coding and coffee.",
  createdAt: "2022-01-01T00:00:00Z",
  avatar: {
    url: "https://example.com/avatar.jpg",
  },
};



const handleDeleteChat = (id) => {
  console.log("Deleting chat with id:", id);
};
const newMessagesAlert = [
  { chatId: "1", count: 2 },
  { chatId: "2", count: 3 },
];
const onlineUsers = ["1", "2", "user3"];
const AppLayout = (WrappedContent) => {
  const HOC = (props) => {
      const params = useParams();
          const chatId = params.chatId;
    return (
      <>
        <Title />
        <Header />
        <Grid container height={"calc(100vh - 4rem)"}>
          {/* Left sidebar */}
          <Grid
            size={{ sm: 4, md: 3 }}
            sx={{
              display: { xs: "none", sm: "block" },
              borderRight: "1px solid #ccc",
            }}
            height="100%">
          <ChatList
                chats={samepleChats}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
                newMessagesAlert={newMessagesAlert}
                onlineUsers={onlineUsers}
              />
            </Grid>

                    {/* Main content */}
          <Grid size={{ xs: 12, sm: 8, md: 5, lg: 6 }} height="100%">
            <WrappedContent {...props} />
          </Grid>

          {/* Right sidebar */}
          <Grid
            size={{ md: 4, lg: 3 }}
            height="100%"
            sx={{
              display: { xs: "none", md: "block" },
              bgcolor: "rgba(0,0,0,0.85)",
              borderLeft: "1px solid #ccc",
              color: "#fff", 
            }}>
              <Profile user={user} />
          </Grid>
        </Grid>
      </>
    );
  };

  HOC.displayName = `AppLayout(${
    WrappedContent.displayName || WrappedContent.name || "Component"
  })`;

  return HOC;
};

export default AppLayout;
