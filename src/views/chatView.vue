<script>

import axios from 'axios';
import SockJS from "sockjs-client";
import Stomp from "stompjs";

export default {
  data() {
    return {
    friends:[],
    messages: [],
      messageInput: "",
      stompClient: null,
      currentUser: {
        id: "",
        name: "",
      },
      activeContact: null,  

      ///
    isCollapse : false,
    selectedFriendId: null,
    selectedFriend: null,
        searchTerm: "",

    }
  },

  methods: {
///methods for chat


    // fetchUsers() {
    //   axios.get("https://tekhive-server.onrender.com/api/auth/users").then((response) => {
    //     this.users = response.data.filter(user => user.id !== this.currentUser.id);
    //   });
    // },
   setActiveContact() {
  if (this.activeContact) {
    // Unsubscribe from the previous contact's topic
    this.stompClient.unsubscribe(`/user/${this.currentUser.id}/queue/messages/${this.activeContact.id}`);
  }
  this.activeContact = this.selectedFriend;
  this.fetchMessages();

  // Subscribe to the new contact's topic
  this.stompClient.subscribe(`/user/${this.currentUser.id}/queue/messages/${this.activeContact.id}`, this.onMessageReceived.bind(this));
    
        

  
},
  fetchMessages() {
  const senderId = this.currentUser.id;
  const recipientId = this.activeContact.id;
  axios.get(`https://tekhive-server.onrender.com/api/auth/messages/${senderId}/${recipientId}`).then((response) => {
    this.messages = response.data;
    this.$nextTick(() => {
      this.scrollToBottom();
    });

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
   this.$nextTick(() => {
        this.scrollToBottom();
      });
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
     this.$nextTick(() => {
          this.scrollToBottom();
        });


  }
},
  
scrollToBottom() {
    
  // scroll to bottom of the chat container
  const chattingContainer = this.$refs.chattingContainer;
  const bottomMessage = chattingContainer.lastElementChild;
  bottomMessage.scrollIntoView({ behavior: 'smooth' });
},



///Methods for chat

    toggleFriendSelected(friend) {
      if (friend.id === this.selectedFriendId) {
        this.selectedFriendId = null; 
        this.messages = [];
// unselect the friend if already selected
      } else {
        this.selectedFriendId = friend.id;
        // select the clicked friend
        this.getSelectedFriend();
        this.messages = [];
        if (this.stompClient) {
  this.stompClient.unsubscribe("/user/" + this.currentUser.id + "/queue/messages");
}


      }
    },
    close() {
      this.isCollapse = false;
    },
    getSelectedFriend() {
      this.selectedFriend = this.friends.find((friend) => friend.id === this.selectedFriendId);
      this.setActiveContact();
      //console.log(this.selectedFriend.fullName);
    },
    isCollapsed() {
      this.isCollapse = !this.isCollapse;
    },

 loadFriends() {
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user.id;
  axios
    .get(`https://tekhive-server.onrender.com/api/auth/users/${id}/friends`)
    .then((response) => {
      this.friends = response.data.filter((friend) => friend.fullName.toLowerCase().includes(this.searchTerm.toLowerCase()));
    })
    .catch((error) => {
      console.log(error);
    });
},

loadSelectedFriend() {
      const friendId = this.$route.params.friendId;
      console.log("id recieved from friends component",friendId)
      
      return friendId
    },


  },
  mounted() {
  this.loadFriends(); 
   const user = JSON.parse(localStorage.getItem("user"));
    this.currentUser.id = user.id;
    this.currentUser.name = user.username;
    this.connect();
  },
  
  created() {
     this.loadSelectedFriend();
    document.title='TekHive-Chat'
    
  
    
  }
}

  // computed: {
  //   messageGroups() {
  //     const groups = [];
  //     let currentDate = null;
  //     this.messages.forEach(message => {
  //       const messageDate = new Date(message.timestamp).toLocaleDateString();
  //       if (messageDate !== currentDate) {
  //         groups.push({ date: messageDate, messages: [] });
  //         currentDate = messageDate;
  //       }
  //       groups[groups.length - 1].messages.push(message);
        
  //     });
  //     return groups;
      
  //   }
  // },


    //Loadfriend with last message

//     loadFriends() {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const id = user.id;
//   axios
//     .get(`https://tekhive-server.onrender.com/api/auth/users/${id}/friends`)
//     .then(async (response) => {
//       this.friends = response.data;
//       for (let i = 0; i < this.friends.length; i++) {
//         const friend = this.friends[i];
//         const senderId = user.id;
//         const recipientId = friend.id;
//         const messageResponse = await axios.get(`https://tekhive-server.onrender.com/api/auth/messages/${senderId}/${recipientId}`);
//         if (messageResponse.data.length > 0) {
//           const lastMessage = messageResponse.data[messageResponse.data.length - 1];
//           friend.lastMessage = lastMessage.content;
//           friend.lastMessageTime = lastMessage.timestamp;
//         }
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

</script>

<template>
    <div class="parentContainer">
      <section class="friendsContainer">
          <!-- <div class="numberOfFriends">Friend List ({{ friends.length }})</div> -->

        <div class="search">
          <div class="input-icon icon-right icon icon-lg icon-color-primary">
            <input
  id="input-group-icon-text"
  type="text"
  class="form-control"
  placeholder="Search"
  v-model="searchTerm"
  @input="loadFriends()"
/>

            <span class="icon-addon">
              <span class="la la-search"></span>
            </span>
          </div>
        </div>
        <div class="recentFriends">
          <div class="friend" v-for="friend in friends" :key="friend.id" :class="{ 'activeFriend': friend.id === selectedFriendId }"
      @click="toggleFriendSelected(friend), close()">
            <div class="friendImg">
              <img
                class="rounded-circle"
                src="https://bootdey.com/img/Content/avatar/avatar2.png"
                width="50"
                height="50"
                alt=""
              />
            </div>
            <div class="friendInfo" :class="friend.id === selectedFriendId ?'selectedFriend' : 'notSelectedFriend'">
              <span class="friendName" style="font-weight:bold" >{{ friend.fullName }}</span
              ><br />
              <span class="bio">{{friend.bio}}</span>
            </div>
          </div>
         
        </div>
      </section>
      <section v-if="selectedFriendId!==null" class="chatContainer" :class="{chatWidth: !isCollapse}">
        <div class="chatUser">
          <div class="friendImg" @click="isCollapsed()">
            <img
              class="rounded-circle"
              src="https://bootdey.com/img/Content/avatar/avatar2.png"
              width="50"
              height="50"
              alt=""
            />
          </div>
          <div style="font-size: xx-large">{{ selectedFriend.fullName }}</div>
          <!-- <div class="callIcons">
            <span class="voiceCall" style="color: var(--blue)"></span>
            <span class="videoCall" style="margin-left: 10px; color:var(--blue)">Video</span>
          </div> -->
        </div>
<!-- <div class="chatting">
  <div v-for="message in messages" :key="message.id">
    <div v-if="message.senderId !== currentUser.id" class="userMsg">
      <div class="status" style="font-size: large;display: flex;margin-bottom: 4%;justify-content: flex-end;">
        <div class="msg-body userMsgBody" :style="{'max-width': message.content.length > 30 ? '80%' : 'auto'}">
          <span class="usertext">{{ message.content }}</span>
        </div>
        <div class="friendImg" style="padding-right: 0">
          <img class="rounded-circle" src="https://bootdey.com/img/Content/avatar/avatar2.png" width="40" height="40" alt="" />
        </div>
      </div>
      <div class="timeStamp" style="font-size: x-small;text-align: right;margin-right: 5%">{{ new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}</div>
    </div>
    <div v-else class="friendMsg">
      <div class="status" style="font-size: large; display: flex; margin-bottom: 4%">
        <div class="friendImg" style="padding-right: 0">
          <img class="rounded-circle" src="https://bootdey.com/img/Content/avatar/avatar2.png" width="40" height="40" alt="" />
        </div>
        <div class="msg-body friendMsgBody" :style="{'max-width': message.content.length > 30 ? '80%' : 'auto'}">
          <span class="friendtext">{{ message.content }}</span>
        </div>
      </div>
      <div class="timeStamp" style="font-size: x-small;text-align: left;margin-left: 5%">{{ new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}</div>
    </div>
  </div>
</div> -->


<div class="chatting" ref="chattingContainer">
  <!-- <div v-for="(group, index) in messageGroups" :key="index">
      <div class="dateHeader">{{ group.date }}</div> -->
  <div v-for="message in messages" :key="message.id">
    <div v-if="message.senderId === currentUser.id" class="userMsg">
      <div class="status" style="font-size: large;display: flex;margin-bottom: 4%;justify-content: flex-end;">
                          <span class="timeStamp" style="font-size: x-small;text-align: left; align-self:center; margin-right:1% ">{{ new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}</span>

        <div class="msg-body userMsgBody">
          <span class="usertext">{{ message.content }}</span>
        </div>

        <div class="friendImg" style="padding-right: 0">
          <img class="rounded-circle" src="https://bootdey.com/img/Content/avatar/avatar2.png" width="40" height="40" alt="" />
        </div>
      </div>
    </div>
    <div v-else class="friendMsg">
      <div class="status" style="font-size: large; display: flex; margin-bottom: 4%">
  <div class="friendImg" style="padding-right: 0">
    <img class="rounded-circle" src="https://bootdey.com/img/Content/avatar/avatar2.png" width="40" height="40" alt="" />
  </div>
  <div class="msg-body friendMsgBody">
    <span class="friendtext">{{ message.content }}</span>
  </div>
  <span class="timeStamp" style="font-size: x-small; text-align: left; margin-left: 1%; align-self: center;">{{ new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}) }}</span>
</div>

    </div>
  </div>
  <!-- </div> -->
</div>


<div class="sendMessage">
  <input type="text" class="no-outline" id="messageBody" name="message" placeholder="Type your message here..." v-model="messageInput" @keydown.enter="sendMessage" style="font-size: 20px; border: none; border-radius: 25px; padding: 10px 20px; box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);" />
  <button  @click="sendMessage" name="send" style="color:var(--blue); background-color: #ffffff; border: none; border-radius: 25px; padding: 10px 10px 1px 10px; box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1); border:0.2px solid var(--blue);"><span class="material-icons" style="font-size: 30px;">send</span></button>
</div>
  </section>
      <section class="userInfoContainer" v-if="isCollapse">
      <div style="margin-left:auto">
      <button @click="isCollapsed()">
      <img height="10" width="10" src="../assets/cross.png">
      </button>
      </div>
      
        <div class="friendProfile">
          <img
            class="rounded-circle"
            src="https://bootdey.com/img/Content/avatar/avatar2.png"
            width="150"
            height="150"
            alt=""
          />
          <div style="font-size: x-large">{{ selectedFriend.fullName }}</div>
          <div class="phoneNo" style="font-size: large">+91 {{ selectedFriend.phoneNumber }}</div>
        </div>
        <div class="basicDetails">
          <div class="status" style="font-size: large; display: flex; align-items: center">
            <div>{{ selectedFriend.bio }}</div>
          </div>
          <div class="status" style="font-size: large; display: flex; align-items: center">
            <div id="edit"><img width="25" height="20"  src="../assets/email.png"></div>
            <div style="padding-left: 5%;">{{ selectedFriend.email }}</div>
          </div>
          <div class="status" style="font-size: large; display: flex; align-items: center">
            <div id="edit" style="color: var(--blue);"><img width="30" height="30"  src="../assets/profile-location.png"></div>
            <div style="padding-left: 5%;">{{ selectedFriend.location }}</div>
          </div>
        </div>
        <div class="media">
          <h3>Media</h3>
          <div class="mediaWrap">
            <img
              class="rounded-circle"
              src="https://bootdey.com/img/Content/avatar/avatar2.png"
              width="50"
              height="50"
              alt=""
            />
            <img
              class="rounded-circle"
              src="https://bootdey.com/img/Content/avatar/avatar2.png"
              width="50"
              height="50"
              alt=""
            />
            <img
              class="rounded-circle"
              src="https://bootdey.com/img/Content/avatar/avatar2.png"
              width="50"
              height="50"
              alt=""
            />
            <img
              class="rounded-circle"
              src="https://bootdey.com/img/Content/avatar/avatar2.png"
              width="50"
              height="50"
              alt=""
            />
            <img
              class="rounded-circle"
              src="https://bootdey.com/img/Content/avatar/avatar2.png"
              width="50"
              height="50"
              alt=""
            />
            <img
              class="rounded-circle"
              src="https://bootdey.com/img/Content/avatar/avatar2.png"
              width="50"
              height="50"
              alt=""
            />
            <img
              class="rounded-circle"
              src="https://bootdey.com/img/Content/avatar/avatar2.png"
              width="50"
              height="50"
              alt=""
            /><img
              class="rounded-circle"
              src="https://bootdey.com/img/Content/avatar/avatar2.png"
              width="50"
              height="50"
              alt=""
            />
            <img
              class="rounded-circle"
              src="https://bootdey.com/img/Content/avatar/avatar2.png"
              width="50"
              height="50"
              alt=""
            />
            <img
              class="rounded-circle"
              src="https://bootdey.com/img/Content/avatar/avatar2.png"
              width="50"
              height="50"
              alt=""
            />
            <img
              class="rounded-circle"
              src="https://bootdey.com/img/Content/avatar/avatar2.png"
              width="50"
              height="50"
              alt=""
            />
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <style scoped>


.dateHeader {
  font-size: medium;
  text-align: center;
  margin: 8px 0;
}


  
   .friend {
    cursor: grab;
  }

  .bio{
     display: -webkit-box;
  -webkit-line-clamp: 2; /* adjust this value to limit the number of lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 3em; 
  }

.friendMsgBody, .userMsgBody {
    width: auto;
    padding:8px 10px !important;
    border-radius: 3%;
}

 .message {
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
  }
  
  .message .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }
  
  .message .msg-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 60%;
    word-wrap: break-word;
    padding:8px 10px !important;
    border-radius: 20px;
    color: #fff;
    font-size: 18px;
  }
  
  .message .friendmsgbody {
    background-color: #0084ff;
    align-self: flex-start;
  }
  
  .message .usermsgbody {
    background-color: #4cd964;
    align-self: flex-end;
  }
  
  @media (max-width: 767px) {
    .message .msg-body {
      max-width: 80%;
      font-size: 16px;
    }
  }


  .parentContainer {
    padding-left: 0.1%;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    background-color: #fff;
  }
  .selectedFriend {
    color: black;
 }
 .notSelectedFriend {
    color: white;
 }
  .friendsContainer {
    border-top-right-radius: 10%;
	
    background-color: var(--blue-alt);
    /*  border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    padding: 2%;
    */
    padding-right: 0.1%;
    height: 100vh;
    width: 27%;
  }
  
  .search {
    padding: 8%;
  }

  .numberOfFriends{
    padding-top: 2%;
padding-left:25% ;
    font-size:xx-large;
    color: whitesmoke;
  }
  
  .recentFriends {
    height: 86%;
    overflow-y: auto;
  }
  
  .activeFriend {
    background-color: rgba(255, 255, 255);
  }
  
  .chatContainer {
      transition: 0.2s ease-in-out;

    height: 100vh;
    width: 48%;
  }
  
  .chatUser {
    background-color: white;
    height: 10%;
    width: 100%;
    display: flex;
    align-items: center;
    padding-left: 3%;
    padding-right: 3%;
  }
  
  .callIcons {
    margin-left: auto;
    justify-content: space-between;
  }
  
  .chatting {
    height: 82%;
    background-color: #f5f5f5;
    overflow-y: auto;
    padding: 4%;
    box-shadow: 0 5px 15px #d3d3d3 inset;
  }
  
  .friendMsgBody,
  .userMsgBody {
    padding:8px 10px !important;
    border-radius: 20px;
    max-width: 50%;
    word-wrap: break-word;
  }

  .friendMsgBody::before {
  content: "";
  position: absolute;
  top: 50%;
  left: -20px;
  transform: translateY(-50%);
  border-top: 15px solid transparent;
  border-right: 15px solid #c2c0c02a; /* change color as needed */
  border-bottom: 15px solid transparent;
}

.userMsgBody::after {
  content: "";
  position: absolute;
  top: 50%;
  right: -20px;
  transform: translateY(-50%);
  border-top: 15px solid transparent;
  border-left: 15px solid #5ed4ff31; /* change color as needed */
  border-bottom: 15px solid transparent;
}
  
  .friendMsgBody {
    
    margin-left: 3%;
    background-color: #d3d3d3;
    color: var(--dark);;
    
  }


  
  
  .userMsgBody {
    
        margin-right: 3%;

    text-align: left;
     color: white;
    background-color: var(--blue);
  }
  


  .sendMessage {
    padding-top: 2px;
    background-color: var(--white);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 3%;
    padding-right: 3%;
    box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.1);
  }
  
  #messageBody {
    width: 90%;
    background-color: #d3d3d3;
    border-style: hidden;
  }
  
  #messageBody:focus {
    outline: none;
  }
  
  .friendImg {
    padding-right: 5%;
  }
  
  .friend {
    display: flex;
    padding: 8%;
    padding-top: 2%;
    margin-top: 2%;
    padding-bottom: 2%;
    margin-bottom: 2%;
        border-radius: 10px;

  }

  .friend:hover {
    background-color: rgba(245, 245, 245, 0.3);
    border-radius: 10px;
  }
  
  .userInfoContainer {
    height: 100vh;
    width: 25%;
    padding: 2%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.2);
      transition: 0.2s ease-in-out;

  }
  .chatWidth {
      transition: 0.2s ease-in-out;

    width:73%;
  }
  
  .friendProfile {
    display: flex;
    height: 40%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .basicDetails,
  .media {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  
  .basicDetails {
    height: 25%;
  }
  
  .media {
    height: 25%;
  }
  
  .mediaWrap {
    overflow-y: auto;
  }
  
  .mediaWrap > * {
    margin: 2%;
  }
  
  ::-webkit-scrollbar {
    width: 5px;
  }
  
  ::-webkit-scrollbar-track {
    background: rgba(245, 245, 245, 0.3);
    border-radius: 10px;
  }
  
  ::-webkit-scrollbar-thumb {
    background-color: rgba(245, 245, 245, 0.3);
    border-radius: 10px;
  }
  </style>
  