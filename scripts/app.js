const chatListHtml = document.querySelector(".list-group");
const chatForm = document.querySelector(".chat-form");
const nameForm = document.querySelector(".name-form");
const infoMessage = document.querySelector(".update-message");
const ui = new ChatUI(chatListHtml);
const username = localStorage.username ? localStorage.username : "DoE";
const room = localStorage.room ? localStorage.room : "general";
const chatRoom = new ChatRoom(room, username);

// get chats and render
chatRoom.getChat((data) => {
  ui.render(data);
});

// submit chatform
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = chatForm.message.value.trim();
  chatRoom
    .addDocument(message)
    .then(() => chatForm.reset())
    .catch((err) => console.log(err));
});

// update username
nameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = nameForm.username.value.trim();
  if (username) {
    chatRoom.updateUsername(username);
  }
  nameForm.reset();
  infoMessage.innerHTML = `<p class="lead"> Name is update to ${username}</p>`;

  setTimeout(() => {
    infoMessage.innerHTML = "";
  }, 3000);
});

// add channel change event to buttons
document.querySelectorAll("button").forEach((b) => {
  b.addEventListener("click", () => {
    switch (b.id) {
      case "general":
        chatListHtml.innerHTML = "";

        chatRoom.updateChatRoom(b.id);
        chatRoom.getChat((data) => {
          ui.render(data);
        });
        break;
      case "coding":
        chatListHtml.innerHTML = "";

        chatRoom.updateChatRoom(b.id);
        chatRoom.getChat((data) => {
          ui.render(data);
        });
        break;
      case "photography":
        chatListHtml.innerHTML = "";
        chatRoom.updateChatRoom(b.id);
        chatRoom.getChat((data) => {
          ui.render(data);
        });
        break;
    }
  });
});
