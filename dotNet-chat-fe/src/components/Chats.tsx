import React from "react";
import { Col, Row } from "react-bootstrap";
import MessageContainer from "./MessageContainer";
import SendMessage from "./SendMessage";

const Chats = ({ messages, sendMessage }) => {
  return (
    <div>
      <Row className="px-5 py-5">
        <Col sm={10}>
          <h1>Chat Room</h1>
        </Col>

        <Col></Col>
      </Row>

      <Row className="px-5 py-5">
        <Col sm={12}>
          <MessageContainer messages={messages} />
        </Col>
        <Col sm={12}>
          <SendMessage sendMessage={sendMessage} />
        </Col>
      </Row>
    </div>
  );
};

export default Chats;
