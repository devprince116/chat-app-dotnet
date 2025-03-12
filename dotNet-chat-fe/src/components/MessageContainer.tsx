const MessageContainer = ({ messages }) => {
  return (
    <div>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message, index) => (
            <tr key={index}>
              <td>{message.username}</td>
              <td>{message.msg}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MessageContainer;
