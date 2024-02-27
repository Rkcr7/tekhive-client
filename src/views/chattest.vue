<script>
import axios from 'axios';
export default {
  data() {
    return {
    friends:[],  
    isCollapse : false,
    selectedFriendId: null,
    selectedFriend: null,
    }
  },
  methods: {
    toggleFriendSelected(friend) {
      if (friend.id === this.selectedFriendId) {
        this.selectedFriendId = null; // unselect the friend if already selected
      } else {
        this.selectedFriendId = friend.id;
        // select the clicked friend
        this.getSelectedFriend();
      }
    },
    close() {
      this.isCollapse = false;
    },
    getSelectedFriend() {
      this.selectedFriend = this.friends.find((friend) => friend.id === this.selectedFriendId);
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
          this.friends = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
  this.loadFriends(); 
  },
  created() {
    document.title='TekHive-Chat'
  }
}

</script>

<template>
    <div class="parentContainer">
      <section class="friendsContainer">
        <div class="search">
          <div class="input-icon icon-right icon icon-lg icon-color-primary">
            <input
              id="input-group-icon-text"
              type="text"
              class="form-control"
              placeholder="Search"
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
              <span class="friendName" >{{ friend.fullName }}</span
              ><br />
              <span class="friendMsg">{{friend.bio}}</span>
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
        <div class="chatting">
          <div class="friendMsg">
            <div class="status" style="font-size: large; display: flex; margin-bottom: 4%">
              <div class="friendImg" style="padding-right: 0">
                <img
                  class="rounded-circle"
                  src="https://bootdey.com/img/Content/avatar/avatar2.png"
                  width="40"
                  height="40"
                  alt=""
                />
              </div>
              <div class="friendMsgBody">
                Allah doesn't burden a sould beyond that it can bear.
              </div>
            </div>
          </div>
          <div class="userMsg">
            <div
              class="status"
              style="font-size: large;display: flex;margin-bottom: 4%;justify-content: flex-end;">
              <div class="userMsgBody">
                Allah doesn't burden a sould beyond that it can bear.
              </div>
              <div class="friendImg" style="padding-right: 0">
                <img
                  class="rounded-circle"
                  src="https://bootdey.com/img/Content/avatar/avatar2.png"
                  width="40"
                  height="40"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div class="sendMessage">
          <input
            type="text"
            class="no-outline"
            id="messageBody"
            name="message"
            placeholder="Type your message here..."
          />
          <button name="send" style="color:var(--blue)"><span class="material-icons">send</span></button>
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
    padding-right: 1%;
    height: 100vh;
    width: 27%;
  }
  
  .search {
    height: 14%;
    padding: 8%;
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
    width: 45%;
    padding: 1.5%;
    border-radius: 3%;
  }
  
  .friendMsgBody {
    margin-left: 3%;
    background-color: #d3d3d3;
  }
  
  .userMsgBody {
    margin-right: 3%;
    color: white;
    background-color: var(--blue);
  }
  
  .sendMessage {
    background-color: #d3d3d3;
    height: 8%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 3%;
    padding-right: 3%;
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
  }

  .friend:hover {
    background-color: rgba(245, 245, 245, 0.3);
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
  