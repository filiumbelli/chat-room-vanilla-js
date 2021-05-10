// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "api-key",
  authDomain: "auth-link",
  projectId: "project-id",
  storageBucket: "auth-link",
  messagingSenderId: "sender-id",
  appId: "app-id",
  measurementId: "measurement-id",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();

// add document | done
// set up listener | done
// update username | done
// update room | done

class ChatRoom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chat = db.collection("chat-app");
    this.unsub;
  }

  async addDocument(message) {
    const chatMessage = {
      username: this.username !== undefined ? this.username : "anon",
      message,
      chat_room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(new Date()),
    };

    return this.chat.add(chatMessage).then(() => console.log("Data is added"));
  }

  // return specific message for selected channel
  getChat(callback) {
    this.unsub = this.chat
      .where("chat_room", "==", this.room)
      .orderBy("created_at")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            callback(change.doc.data());
          } else if (change.type === "removed") {
          }
        });
      });
  }
  updateUsername(username) {
    this.username = username;
    localStorage.setItem("username", username);
    console.log("Updated username");
  }

  updateChatRoom(chatRoom) {
    this.room = chatRoom;
    localStorage.setItem("room", chatRoom);

    console.log("Updated chat room");
    if (this.unsub) {
      this.unsub();
    }
  }
}
