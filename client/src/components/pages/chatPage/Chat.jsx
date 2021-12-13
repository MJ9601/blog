import React from "react";
import "./Chat.css";
import { FaPaperPlane, FaTelegramPlane } from "react-icons/fa";
import { Message } from "../../message/Message";
import sendIcon from "./send.svg";

export const Chat = () => {
  return (
    <section className="w-100">
      <div className="container wrapper bg-light">
        <div className="container msg-wrapper-owner px-5">
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
        </div>
        <div className="writting-wrapper">
          <input type="text" />
          <img src={sendIcon} className="sendIcon" alt="" />
        </div>
      </div>
    </section>
  );
};
