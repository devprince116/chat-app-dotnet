import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import "./App.css";
import { Col, Row } from "react-bootstrap";
import ChatRoom from "./components/ChatRoom";
import { useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import Chats from "./components/Chats";

function App() {
  const [connect, setConnection] = useState<signalR.HubConnection | null>(null);
  const [message, setMessage] = useState<{ username: string; msg: string }[]>(
    []
  );

  const joinChatRoom = async (userName: string, chatRoom: string) => {
    try {
      // initiate connection
      const connection = new HubConnectionBuilder()
        .withUrl(" http://localhost:5182/chat-room", {
          withCredentials: true,
        })
        .configureLogging(LogLevel.Information)
        .build();

      // recieve functions
      connection.on("JoinGroup", (username, msg) => {
        setMessage((messages) => [...messages, { username, msg }]);
      });

      connection.on("ReceiveSpecificMessage", (username, msg) => {
        setMessage((messages) => [...messages, { username, msg }]);
      });

      await connection.start();
      await connection.invoke("JoinGroup", { userName, chatRoom });
      setConnection(connection);
    } catch (err) {
      console.error(err);
    }
  };

  // function to send message;
  const sendMessage = async (msg: string) => {
    try {
      if (connect) {
        await connect.invoke("SendMessage", msg);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <main>
        <Container>
          <Row className="px-5 my-5">
            <Col sm={12}>
              <h1 className="font-weight-light text-center">
                Welcome to the Chat-App
              </h1>
            </Col>
          </Row>
          {!connect ? (
            <ChatRoom joinChatRoom={joinChatRoom}></ChatRoom>
          ) : (
            <Chats messages={message} sendMessage={sendMessage} />
          )}
        </Container>
      </main>
    </div>
  );
}

export default App;
