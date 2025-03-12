import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";

const SendMessage = ({ sendMessage }) => {
  const [message, setMessage] = useState("");
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage(message);
        setMessage("");
      }}
    >
      <InputGroup className="mb-3">
        <InputGroup.Text>Chat</InputGroup.Text>
        <Form.Control
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder="Type your message here"
        ></Form.Control>
        <Button type="submit" variant="success" disabled={!message}>
          Send
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SendMessage;
