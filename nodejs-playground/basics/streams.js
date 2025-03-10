import * as http from "node:http";
import * as fs from "node:fs";

const server = http.createServer();

// first, run this to create a large file
// let a = "";
// for (let i = 0; i < 1000000; i++) {
//   a += "Hello World \n";
// }
// fs.writeFileSync("./files/large-file.txt", a, "utf-8");

server.on("request", (req, res) => {
  // ----- conventional way -----
  //   fs.readFile("./files/large-file.txt", "utf-8", (error, data) => {
  //     // res.write(JSON.stringify(data));
  //     res.end(data)
  //   });
  // ------- using readable stream ------
  //   const rs = fs.createReadStream("./files/large-file.txt");
  //   let count = 0;
  //   rs.on("data", (chunk) => {
  //     res.write(chunk);
  //     count++;
  //   });
  //   rs.on("end", () => {
  //     res.end("Write done");
  //     console.log("chunk count: ", count);
  //   });
  // ------ using pipes -------
  const rs = fs.createReadStream("./files/large-file.txt");
  rs.pipe(res);
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server has Started!");
});
