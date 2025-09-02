import React from "react";

const Title = ({
  title = "Chat App",
  description = "this is the Chat App called Chattu",
}) => {
  return (
    <>
      <meta title={title} />
      <meta name="description" content={description} />
   
 </>
  );
};

export default Title;