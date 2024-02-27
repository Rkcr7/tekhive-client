<template>
  <div class="column">
    <div class="notification" style="background-color:var(--black-trans)" v-if="notification">{{ notification }}</div>
        <div class="notification" v-if="notification">{{ notification }}</div>

     <div class="box-heading">
    <div class="control heading-search">
       <input
        type="text"
        class="input is-rounded"
        placeholder="Search New Friends..."
        v-model="searchQuery"
        @input="searchFriends"
         @keydown.enter="searchFriends"
      />
      <div class="search-icon" @click="searchFriends"></div>
    </div>
 
  </div>

    <div class="friends-grid">
      <div class="columns is-multiline">
        <div class="column is-3" v-for="friend in friends" :key="friend.id" >
          <a class="friend-item has-text-centered">
    <i v-if="loadingFriends || searchQuery === ''" class="material-icons unfriend-icon">person_remove</i>
                  <i v-else class="material-icons addfriend-icon" @click="addFriend(friend.id)">person_add</i>

            <div class="avatar-wrap">
              <div class="circle"></div>
                  <div  v-if="searchQuery === ''" class="chat-button" @click="goToChatView(friend)">
                    <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-message-circle"
                >
                  <path
                    d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                  ></path>
                </svg>
                  </div>

              <img
                :src="
                  
                  'https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg'
                "
                :data-demo-src="
                   'assets/img/avatars/milly.jpg'
                "
                :data-user-popover="friend.id"
                alt=""
              />
            </div>
            <h3>{{ friend.fullName }}</h3>
            <p>{{ friend.location }}</p>
          </a>
        </div>
      </div>
    </div>
    <!-- <div class="load-more-wrap has-text-centered">
      <a href="#" class="load-more-button">Load More</a>
    </div> -->
  </div>

</template>

<script>
import axios from "axios";



export default {
  data() {
    return {
      friends: [],
      searchQuery: "",
      loadingFriends: true,
    notification: null, // new property for notification message

    
    };
  },
  mounted() {

const userdata = JSON.parse(localStorage.getItem("user"));
let token = null;
if (userdata !== null) {
  token = userdata.accessToken;
}
  this.token=null;

axios.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    console.log(token)
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
    
    
      this.loadFriends();
    
  },

  methods: {

  goToChatView(friend) {
     this.$router.push({ name: 'chat', params: { friendId: friend.id } });
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

    searchFriends() {
            this.loadingFriends = false; // added

      if (!this.searchQuery) {
        this.loadFriends(); // retrieve all friends
        return;
      }
      try {
        axios
          .get(
            `https://tekhive-server.onrender.com/api/auth/users/search?query=${this.searchQuery}`
          )
          .then((response) => {
            this.friends = response.data;
            console.log(response.data);
          });
      } catch (error) {
        console.log(error);
      }
    },
  addFriend(id) {
  axios
    .post(`https://tekhive-server.onrender.com/api/auth/add-friend/${id}`)
    .then((response) => {
      console.log(response.data);
      this.notification = "Friend request sent!";
      setTimeout(() => {
        this.notification = null;
      }, 3000); 
    })
    .catch((error) => {
      console.log(error);
      if (error.response.status === 500) {
        this.notification = "Friend request was Already sent to this user!";
      } else if (error.response.status === 409) {
        this.notification = "You already have pending friendship request from this user!";
      } else {
        this.notification = "An error occurred! Please try again later.";
      }
      setTimeout(() => {
        this.notification = null;
      }, 3000); 
    });
},


  },
  
  
  watch: {
    searchQuery: function (newSearchQuery) {
      if (newSearchQuery === "") {
        this.loadFriends();
      }
    },
  },
};

  // loadFriends() {

  //      // Clear friends array

  //     this.loadingFriends = true; 
      
  //     axios
  //       .get(`https://tekhive-server.onrender.com/api/auth/users/friends`)
  //       .then((response) => {
  //         this.friends = response.data;
  //         console.log(response)
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       })
       
  //   },

    // handle success response here, e.g. show a notification
      //     const notification = document.createElement('div');
      // notification.classList.add('notification');
      // notification.textContent = 'Friend request sent!';
      // document.body.appendChild(notification);
      // // hide the notification after 2 seconds
      // setTimeout(() => {
      //   notification.remove();
      // }, 2000);

// const userdata = JSON.parse(localStorage.getItem("user"));
// let token = null;
// if (userdata !== null) {
//   token = userdata.accessToken;
// }

// axios.interceptors.request.use(
//   (config) => {
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   }
// );

</script>

<!-- <script setup>


const  loadFriends = async() => {

       // Clear friends array

      this.loadingFriends = true; 
      
      axios
        .get(`https://tekhive-server.onrender.com/api/auth/users/friends`)
        .then((response) => {
          this.friends = response.data;
          console.log(response)
        })
        .catch((error) => {
          console.log(error);
        })
       
    }



</script> -->


<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto:400,500");
* {
  box-sizing: inherit;
}

.notification {
position: fixed;
top: 5px;
left: 50%;
transform: translateX(-50%);
background-color: var(--black-trans);
box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
padding: 10px;
border-radius: 20px;
font-size: 14px;
font-weight: bold;
z-index: 999;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
color: var(--white);
border:2px solid var(--blue);
}
.unfriend-icon {
  position: absolute;
  top: 0px;
  right: 3px;
  color: #ff6060;
  font-size: 20px;
  background-color: #fff;
  border-radius: 50%;
  padding: 5px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.addfriend-icon {
  position: absolute;
  top: 0px;
  right: 3px;
  color: #10d02d;
  font-size: 20px;
  background-color: #fff;
  border-radius: 50%;
  padding: 5px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
.columns {
  margin-left: -0.75rem;
  margin-right: -0.75rem;
  margin-top: -0.75rem;
}

.columns:last-child {
  margin-bottom: -0.75rem;
}

@media screen and (min-width: 769px), print {
  .columns:not(.is-desktop) {
    display: flex;
  }
}

.view-wrapper .view-wrap {
  padding: 20px 0;
}

.view-wrapper .view-wrap.is-headless {
  padding-top: 10px;
}

.container {
  flex-grow: 1;
  margin: 0 auto;
  position: relative;
  width: auto;
}

@media screen and (min-width: 1024px) {
  .container {
    max-width: 960px;
  }
}

@media screen and (min-width: 1216px) {
  .container:not(.is-max-desktop) {
    max-width: 1152px;
  }
}

@media screen and (min-width: 1297px) {
  .container.is-custom {
    max-width: 1240px;
    width: 1240px;
  }
}

@media screen and (min-width: 1088px) {
  .container.is-custom {
    max-width: 1140px;
    width: 1140px;
  }
}

@media screen and (min-width: 1408px) {
  .container:not(.is-max-desktop):not(.is-max-widescreen) {
    max-width: 1344px;
  }
}

.view-wrapper {
  padding: 60px 12px;
  transition: all 0.3s;
}

body {
  transition: opacity ease-in 0.2s;
  margin: 0;
  padding: 0;
  font-family: Roboto, -apple-system, system-ui, BlinkMacSystemFont, segoe ui,
    helvetica neue, Arial, sans-serif;
  color: #344258;
  font-size: 1em;
  font-weight: 400;
  line-height: 1.5;
  background: #f4f4f4;
  height: 100%;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
}

html {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #fff;
  font-size: 16px;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  min-width: 300px;
  overflow-x: hidden;
  overflow-y: scroll;
  text-rendering: optimizeLegibility;
  -webkit-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  text-size-adjust: 100%;
}

.column {
  display: block;
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 1;
  padding: 0.75rem;
}

*,
:before,
:after {
  box-sizing: inherit;
}

.box-heading {
  width: 100%;
  padding: 8px;
  border-radius: 0.75rem;
  border: 1px solid #e8e8e8;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.friends-grid {
  padding: 20px 0;
}

.has-text-centered {
  text-align: center !important;
}

.load-more-wrap {
  padding: 40px 0;
}

.dropdown {
  display: inline-flex;
  position: relative;
  vertical-align: top;
}

.control {
  box-sizing: border-box;
  clear: both;
  font-size: 1rem;
  position: relative;
  text-align: inherit;
}

.box-heading .heading-search {
  position: relative;
  margin-left: 10px;
}

.columns.is-multiline {
  flex-wrap: wrap;
}

a {
  color: #3f88e3;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s;
}

.load-more-button {
  box-sizing: border-box;
  display: inline-block;
  width: 9em;
  height: 2.75em;
  padding: 0.5em 1em;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
  color: #757a91 !important;
  white-space: nowrap;
  line-height: 1.5;
  font-size: 1em;
  text-decoration: none;
  transition: width 0.1s ease, height 0.4s ease, border-width 0.4s ease,
    border-radius 0.4s ease, border-color 0.4s ease, padding 0.4s ease;
}

a:hover {
  color: #3f88e3;
}

.load-more-button:hover {
  background: #fafafa;
}

.dropdown-menu {
  display: none;
  left: 0;
  min-width: 12rem;
  padding-top: 4px;
  position: absolute;
  top: 100%;
  z-index: 20;
}

.dropdown.is-spaced .dropdown-menu {
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.05);
  border-color: #e8e8e8;
  padding-top: 0;
  min-width: 280px;
  border-radius: 0.65rem;
}

.box-heading .dropdown.friends-dropdown .dropdown-menu {
  margin-top: 6px;
}

input {
  margin: 0;
  font-family: BlinkMacSystemFont, -apple-system, segoe ui, roboto, oxygen,
    ubuntu, cantarell, fira sans, droid sans, helvetica neue, helvetica, arial,
    sans-serif;
}

.input {
  display: inline-flex;
  -moz-appearance: none;
  -webkit-appearance: none;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 0.65rem;
  box-shadow: none !important;
  font-size: 0.9rem;
  height: 36px;
  justify-content: flex-start;
  line-height: 1.5;
  padding-bottom: calc(0.5em - 1px);
  padding-left: calc(0.75em - 1px);
  padding-right: calc(0.75em - 1px);
  padding-top: calc(0.5em - 1px);
  position: relative;
  vertical-align: top;
  background-color: #fff;
  border-color: #dbdbdb;
  color: #363636;
  max-width: 100%;
  width: 100%;
  transition: all 0.3s;
}

.input.is-rounded {
  border-radius: 9999px;
  padding-left: calc(calc(0.75em - 1px) + 0.375em);
  padding-right: calc(calc(0.75em - 1px) + 0.375em);
}

.box-heading .heading-search input {
  padding-left: 38px;
}

.box-heading .heading-search .search-icon {
  position: absolute;
  top: 0;
  left: 2px;
  height: 36px;
  width: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (min-width: 769px), print {
  .column.is-3 {
    flex: none;
    width: 25%;
  }
}

.friends-grid .columns .column {
  padding: 0.5rem;
}

.button {
  display: inline-flex;
  -moz-appearance: none;
  -webkit-appearance: none;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 0.65rem;
  box-shadow: none;
  font-size: 0.8rem;
  height: 2.5em;
  justify-content: center;
  line-height: 1.5;
  padding-bottom: calc(0.5em - 1px);
  padding-left: 1em;
  padding-right: 1em;
  padding-top: calc(0.5em - 1px);
  position: relative;
  vertical-align: top;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  background-color: #fff;
  border-color: #dbdbdb;
  border-width: 1px;
  color: #363636;
  cursor: pointer;
  text-align: center;
  white-space: nowrap;
  font-weight: 500;
  padding: 18px 22px;
  transition: all 0.3s;
}

.box-heading .dropdown .button {
  width: 38px !important;
  height: 38px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-color: transparent;
}

.box-heading .dropdown.friends-dropdown div > .button {
  width: auto !important;
  padding: 0 8px 0 12px;
  height: 34px;
  min-width: 110px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 100px;
}

.button:hover {
  border-color: #b5b5b5;
  color: #363636;
}

.dropdown-content {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.02);
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
}

.dropdown.is-spaced .dropdown-menu .dropdown-content {
  border: 1px solid #e8e8e8;
  box-shadow: none;
  border-radius: 0.65rem;
}

.box-heading .heading-search .search-icon svg {
  height: 16px;
  width: 16px;
  stroke: #cecece;
  transition: stroke 0.3s;
}

.friends-grid .friend-item {
  min-height: 201.5px;
  display: block;
  width: 100%;
  padding: 30px;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  background: #fff;
  transition: all 0.3s;
}

.friends-grid .friend-item:hover {
  box-shadow: -1px 3px 10px 0 rgba(0, 0, 0, 0.06);
}

span {
  font-style: inherit;
  font-weight: inherit;
}

.box-heading .dropdown .button svg {
  height: 20px;
  width: 20px;
  stroke: #888da8;
}

.box-heading .dropdown.friends-dropdown div > .button svg {
  height: 16px;
  width: 16px;
  stroke: #393a4f;
  transition: all 0.3s;
}

.dropdown-item {
  color: #4a4a4a;
  display: block;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 0.375rem 1rem;
  position: relative;
}

a.dropdown-item {
  padding-right: 3rem;
  text-align: inherit;
  white-space: nowrap;
  width: 100%;
}

.dropdown.is-spaced .dropdown-item {
  padding-right: 1rem !important;
  padding: 0.5rem 1rem;
}

a.dropdown-item:hover {
  background-color: #f5f5f5;
  color: #0a0a0a;
}

.dropdown.is-spaced .dropdown-item:hover {
  background: #fafafa;
}

.dropdown.is-spaced.is-neutral .dropdown-item:hover {
  background: #fafafa;
}

hr {
  display: block;
  margin: 1.5rem 0;
  padding: 0;
  background-color: #f5f5f5;
  border: none;
  height: 2px;
}

.dropdown-divider {
  display: block;
  background-color: #e8e8e8;
  border: none;
  height: 1px;
  margin: 0.5rem 0;
}

.avatar-wrap {
  position: relative;
  display: inline-block;
  vertical-align: bottom;
}

.friends-grid .friend-item .avatar-wrap {
  position: relative;
  height: 96px;
  width: 96px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

h3 {
  margin: 0;
  padding: 0;
  font-size: 100%;
  font-weight: 400;
}

.friends-grid .friend-item h3 {
  font-family: montserrat, sans-serif;
  color: #393a4f;
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.2;
  margin-top: 6px;
}

p {
  margin: 0;
  padding: 0;
}

.friends-grid .friend-item p {
  color: #999;
  font-size: 0.8rem;
}

.media {
  align-items: flex-start;
  display: flex;
  text-align: inherit;
}

.dropdown.is-spaced .dropdown-item .media {
  align-items: center;
}

.friends-grid .friend-item .avatar-wrap .circle {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-radius: 50%;
  border: 1.4px solid #cecece;
  transform: scale(0.4);
  transition: all 0.3s;
  z-index: 1;
}

.friends-grid .friend-item:hover .avatar-wrap .circle {
  transform: scale(1);
}

.friends-grid .friend-item .avatar-wrap .chat-button {
  position: absolute;
  bottom: 0;
  right: 0;
  height: 36px;
  width: 36px;
  border-radius: 50%;
  border: 3px solid #fff;
  background: #5596e6;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(0);
  opacity: 0;
  transition: all 0.3s;
  z-index: 3;
}

.friends-grid .friend-item:hover .avatar-wrap .chat-button {
  transform: scale(1);
  opacity: 1;
}

img {
  height: auto;
  max-width: 100%;
}

.friends-grid .friend-item .avatar-wrap img {
  position: relative;
  display: block;
  height: 80px;
  width: 80px;
  border-radius: 50%;
  z-index: 2;
}

.dropdown.is-spaced .dropdown-item .media svg {
  width: 18px;
  height: 18px;
  margin-right: 10px;
  stroke-width: 1px;
  stroke: #757a91;
  transition: all 0.3s;
}

.media-content {
  flex-basis: auto;
  flex-grow: 1;
  flex-shrink: 1;
  text-align: inherit;
}

.dropdown.is-spaced .dropdown-item .media .media-content {
  line-height: 1.2;
}

.friends-grid .friend-item .avatar-wrap .chat-button svg {
  height: 14px;
  width: 14px;
  stroke: #fff;
  fill: #fff;
}

.dropdown.is-spaced .dropdown-item .media h3 {
  font-weight: 500;
  font-size: 0.85rem;
  color: #393a4f;
  transition: all 0.3s;
  line-height: 1.2;
}

small {
  font-size: 0.875em;
}

.dropdown.is-spaced .dropdown-item .media small {
  color: #a2a5b9;
}
</style>
