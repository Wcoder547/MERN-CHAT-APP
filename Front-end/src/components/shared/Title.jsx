import React from "react";
const Title = ({
  title = "Chat App",
  description = "this is the Chat App",
}) => {
  return (

    <>
      <title>{title}</title>
      <meta name="description" content={description} />

    </>
  );
};

export default Title;