const http = require("http");
const fs = require("fs");

//Read the html page
const html = fs.readFileSync("./index.html", "utf-8");

// creating server
const server = http.createServer((request, response) => {
  const path = request.url;
  if (path.toLocaleLowerCase() === "/home" || path == "/") {
    response.end(html.replace("{{%CONTENT%}}", "You are in Home Page"));
  } else if (path.toLocaleLowerCase() === "/about") {
    response.end(html.replace("{{%CONTENT%}}", "You are in About Page"));
  } else if (path.toLocaleLowerCase() === "/contact") {
    response.end(html.replace("{{%CONTENT%}}", "You are in Contact Page"));
  } else {
    response.end(html.replace("{{%CONTENT%}}", "Error 404: Page Not Found"));
  }

  console.log(`A new request recieved!`);
});

//starting server
server.listen(8000, "127.0.0.1", () => {
  console.log("Server has Started!");
});
