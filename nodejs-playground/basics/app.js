// Core Modules
import * as http from "node:http";
import * as fs from "node:fs";
import * as url from "node:url";
// User Defined Modules
import { replaceHTML } from "./modules/replaceHTML.js";

//Read the html page
const html = fs.readFileSync("./index.html", "utf-8");

// Reading the data if any instead of reading each time per request
const products = JSON.parse(fs.readFileSync("./data/products.json", "utf-8"));

const productDetails = fs.readFileSync(
  "./templates/product-details.html",
  "utf-8"
);

const productList = fs.readFileSync("./templates/product-list.html", "utf-8");

// creating server
const server = http.createServer((request, response) => {
  const { pathname, query } = url.parse(request.url, true);

  const headers = new Headers({ "Content-Type": "text/html" });
  response.setHeaders(headers);

  if (pathname.toLocaleLowerCase() === "/home" || pathname == "/") {
    response.end(html.replace("{{%CONTENT%}}", "You are in Home Page"));
  } else if (pathname.toLocaleLowerCase() === "/products") {
    // This is used for Web APIs, response is JSON data
    // response.setHeaders(new Map([["Content-Type", "application/json"]]));
    // fs.readFile("./data/products.json", "utf-8", (err, data) => {
    //     response.write(data);
    //     response.end();
    // });

    // This is for Web app, response is HTML
    let productHTMLArray;
    if (query?.id) {
      productHTMLArray = replaceHTML(productList, [products[query.id]]);
    } else {
      productHTMLArray = replaceHTML(productDetails, products);
    }

    response.end(html.replace("{{%CONTENT%}}", productHTMLArray));
  } else if (pathname.toLocaleLowerCase() === "/about") {
    response.end(html.replace("{{%CONTENT%}}", "You are in About Page"));
  } else {
    response.writeHead(404, headers);
    response.end(html.replace("{{%CONTENT%}}", "Error 404: Page Not Found"));
  }

  console.log(`A new request recieved!`);
});

//starting server
server.listen(8000, "127.0.0.1", () => {
  console.log("Server has Started!");
});
