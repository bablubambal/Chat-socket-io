//Connection with the server on localhost
const socket = io("http://localhost:8000");
//Getting the data from the dom
const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");
///Audio file to be played on msg recieve
var audio = new Audio("audio.mp3");

//append funtion
const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  if (position == "left") {
    audio.play();
  }
};

//form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`You: ${message}`, "right");
  socket.emit("send", message);
  messageInput.value = "";
});

//let name = "Bablu";
let name = prompt("Enter name");
if (name == null) name = "Anonamus";

////Sending data to server a new user joined..
socket.emit("new-user-joined", name);
///Sending  the upadte in the dom about the user joined
socket.on("user-joined", (name) => {
  append(`${name} Joined the Chat`, "right");
});
//Listininng to server to get the data from the server with event when we have any recieve will get the update
socket.on("recieve", (data) => {
  append(`${data.name}: ${data.message}`, "left");
});
///When a user left the chat notifing that the user left the chat by listing to left event from the server
socket.on("left", (name) => {
  append(`${name} left the Chat`, "right");
});
