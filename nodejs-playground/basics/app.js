const http = require("http");

// creating server
const server = http.createServer((request, response) => {
  response.end("Hello from Server");
  console.log(`A new request recieved!`);
});

//starting server
server.listen(8000, "127.0.0.1", () => {
  console.log("Server has Started!");
});
