<template>
  <div v-if="show" class="notification" @click="goToNotifications">
    <div class="notification-body">
      
      <div class="notification-text">
        You have {{ count }} friend requests.
      </div>
      
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      show: false,
      count: 0,
      interval: null
    }
  },

  mounted() {
    // this.interval = setInterval(this.checkFriendRequests, 30000);
    this.interval = setInterval(() => {
      if (this.loggedIn) {
        this.checkFriendRequests();
      }
    }, 30000);
  

  },

  beforeUnmount() {
    clearInterval(this.interval);
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },

  methods: {
//    checkFriendRequests() {
//       axios.get("https://tekhive-server.onrender.com/api/auth/friendship/pending-requests")
//         .then((response) => {
//           this.count = response.data.length;
//           this.show = this.count > 0;

//           if (this.show) {
//             setTimeout(this.hideNotification, 4000);
//           }
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     },

  checkFriendRequests() {
    const userData = JSON.parse(localStorage.getItem("user"));
    const accessTokens = userData.accessToken;

    if (!accessTokens) {
      // handle case where access token is missing
      console.error("Access token not found");
      return;
    }

    axios.get("https://tekhive-server.onrender.com/api/auth/friendship/pending-requests", {
      headers: {
        Authorization: `Bearer ${accessTokens}`,
      },
    })
      .then((response) => {
        this.count = response.data.length;
        this.show = this.count > 0;

        if (this.show) {
          setTimeout(this.hideNotification, 4000);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          // handle case where access token is invalid or expired
          console.error("Access token is invalid or expired");
          // attempt to refresh access token here
        } else {
          console.error(error);
        }
      });
  },

    goToNotifications() {
      this.$router.push('/notifications');
      this.hideNotification();
    },
    hideNotification() {
      this.show = false;
    }
  }
}
</script>

<style scoped>
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

</style>
