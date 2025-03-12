import { useState } from "react";
import { Form, FormControl, FormGroup, Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const ChatRoom = ({
  joinChatRoom,
}: {
  joinChatRoom: (Username: string, ChatRoom: string) => void;
}) => {
  const [userName, setUserName] = useState("");
  const [chatRoom, setChatRoom] = useState("");

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        joinChatRoom(userName, chatRoom);
      }}
    >
      <Row className="px-5 my-5">
        <Col sm={12}>
          <FormGroup>
            <FormControl
              style={{ marginBottom: 10 }}
              placeholder="Username"
              onChange={(e) =>
                setUserName((e.target as HTMLInputElement).value)
              }
            />
            <FormControl
              placeholder="Chatroom"
              onChange={(e) =>
                setChatRoom((e.target as HTMLInputElement).value)
              }
            />
          </FormGroup>
        </Col>

        {/*  add button */}
        <Col sm={12}>
          <Button variant="success" type="submit" style={{ marginTop: 10 }}>
            Join
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ChatRoom;
