<script setup>
  var global = window; // fix global is undefined in socketjs-client
</script>

<template>
  <div class="contents">
  <div v-if="activeContact">
  <h2>Chatting with {{ activeContact.fullName }}</h2>
  <div class="message-container">
   <button v-if="activeContact" class="delete-button" @click="deleteMessages()">Delete All Messages</button>

    <ul>
      <li v-for="message in messages" :key="message.id">
        <div :class="['message', message.senderId === currentUser.id ? 'sent' : 'received']">
          <span class="sender">{{ message.senderName }}: &nbsp;</span>
          <span class="content">{{ message.content }}</span>
        </div>
      </li>
    </ul>
  </div>
  <form @submit.prevent="sendMessage">
    <input v-model="messageInput" type="text" placeholder="Type a message">
    <button type="submit">Send</button>
  </form>
</div>

    <div v-else>
      <h2>Select a contact to chat with</h2>
      <ul>
        <li v-for="user in users" :key="user.id">
          <button @click="setActiveContact(user)">{{ user.fullName }}</button>
        </li>
      </ul>
    </div>
  </div>
</template>



<script>
import axios from "axios";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

export default {
  data() {
    return {
      messages: [],
      messageInput: "",
      stompClient: null,
      currentUser: {
        id: "",
        name: "",
      },
      activeContact: null,
      users: [],
    };
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.currentUser.id = user.id;
    this.currentUser.name = user.username;
    this.fetchUsers();
    this.connect();
  },
  methods: {
    fetchUsers() {
      axios.get("https://tekhive-server.onrender.com/api/auth/users").then((response) => {
        this.users = response.data.filter(user => user.id !== this.currentUser.id);
      });
    },
    setActiveContact(user) {
      this.activeContact = user;
      this.fetchMessages();
    },
    fetchMessages() {
      const senderId = this.currentUser.id;
      const recipientId = this.activeContact.id;
      axios.get(`https://tekhive-server.onrender.com/api/auth/messages/${senderId}/${recipientId}`).then((response) => {
        this.messages = response.data;
      });
    },
    connect() {
      const socket = new SockJS("https://tekhive-server.onrender.com/ws");
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect({}, this.onConnected, this.onError);
    },
    onConnected() {
      console.log("connected");

     this.stompClient.subscribe(
  "/user/" + this.currentUser.id + "/queue/messages",
  this.onMessageReceived.bind(this)
);
    },
    onError(error) {
      console.error("Error:", error);
    },
async onMessageReceived(payload) {
  const message = JSON.parse(payload.body);
  const messageId = message.id;
  console.log("Message id is",messageId)
  const response = await axios.get(`https://tekhive-server.onrender.com/api/auth/messages/${messageId}`);
  const messageDetails = response.data;
  this.messages.push(messageDetails);
  console.log("Message is", messageDetails);
},

async deleteMessages() {
  try {
    const senderId = this.currentUser.id;
    const recipientId = this.activeContact.id;
    await axios.delete(`https://tekhive-server.onrender.com/api/auth/messages/${senderId}/${recipientId}`);
    // Clear all messages
    this.messages = [];
  } catch (error) {
    console.error(error);
  }
},


  sendMessage() {
  if (this.messageInput.trim() !== "") {
    const message = {
      senderId: this.currentUser.id,
      recipientId: this.activeContact.id,
      senderName: this.currentUser.name,
      recipientName: this.activeContact.fullName,
      content: this.messageInput,
      timestamp: new Date(),
    };

    // Add the sent message to the messages array
    this.messages.push(message);

    this.stompClient.send("/app/chat", {}, JSON.stringify(message));
    this.messageInput = "";
  }
},
  },
};
</script>

<style>
.message {

}

.sent {
  
}

.sender {
  font-weight: bold;
  
}

.delete-button {
  
}
.contents{
  padding-left: 10%;
}


</style>