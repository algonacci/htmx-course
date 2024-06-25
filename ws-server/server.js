const { WebSocketServer } = require("ws");
const server = new WebSocketServer({
  port: 5001,
});

console.log(`App running on http://127.0.0.1:5001`);

server.on("connection", (socket) => {
  console.log("Client connected");
  socket.on("message", (data) => {
    const sent_data = JSON.parse(data);
    console.log(sent_data.chat_message);
    setInterval(() => {
      socket.send(`
            <div id="chat_box" hx-swap-oob="beforeend">
                <h3>${sent_data.chat_message}</h3>
            </div>
        `);
    }, 1000);
  });
});
