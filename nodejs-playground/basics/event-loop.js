import * as fs from "node:fs";

//direct main thread
console.log("hi");

//Stored in first phase
setTimeout(() => {
  console.log("Hi from timeout");
}, 0);

//store in second phase
fs.readFile("./files/input.txt", (e, data) => {
  console.log("Read file");
});

//store in third phase
setImmediate(() => {
  console.log("Hi from immediate"); // sometimes it may be executed before too , a known bug!
});

//complex second phase
fs.readFile("./files/input.txt", (e, data) => {
  console.log("Read file ----- ");

  console.log("hi");

  //Stored in first phase
  setTimeout(() => {
    console.log("Hi from timeout");
  }, 0);

  //store in third phase
  setImmediate(() => {
    console.log("Hi from immediate"); // sometimes it may be executed before too , a known bug!
  });

  process.nextTick(() => console.log("next tick"));
});
