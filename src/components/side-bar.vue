<script setup>

import { ref } from "vue";
import logoURL from "../assets/logo2.png";
import logo2URL from "../assets/logo3.png";

const is_expanded = ref(localStorage.getItem("is_expanded") === "true");

const ToggleMenu = () => {
  is_expanded.value = !is_expanded.value;
  localStorage.setItem("is_expanded", is_expanded.value);
};

</script>
<script>
import axios from "axios";
import { Buffer } from "buffer-es6";
export default {
  data() {
    return {
            profileImageUrl: null,

      pendingRequestsCount: 0,
    };
  },

  mounted() {
    this.getProfileImage();
    
  },
  methods: {
   async getProfileImage() {

         const userData = JSON.parse(localStorage.getItem("user"));
    const accessTokens = userData.accessToken;

    if (!accessTokens) {
      // handle case where access token is missing
      console.error("Access token not found");
      return;
    }


      await axios
        .get("https://tekhive-server.onrender.com/api/auth/profile-image", { responseType: "arraybuffer", headers: {
        Authorization: `Bearer ${accessTokens}`,
      }, })
        .then((response) => {
          const imageData = Buffer.from(response.data, "binary").toString(
            "base64"
          );
          this.profileImageUrl = `data:image/jpeg;base64,${imageData}`;
          
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async getPendingRequestsCount() {
      try {
        const response = await axios.get('https://tekhive-server.onrender.com/api/auth/friendship/pending-requests');
        const pendingRequests = response.data;
        this.pendingRequestsCount = pendingRequests.length;
      } catch (error) {
        console.log(error);
      }
    },

    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
    refreshComponent() {
      // Define the actions you want to take to refresh the component
      location.reload(); // Reload the page to refresh the component
    }
  },
  beforeRouteLeave(to, from, next) {
    // Call the method to refresh the component
    this.refreshComponent();
    next();
  }
  
};
</script>


<template>
  <div class="sidebar">
    <aside :class="`${is_expanded ? 'is-expanded' : ''}`">
      <div class="logo">
        <img v-if="!is_expanded" :src="logoURL" alt="Vue" />
		<img  v-if="is_expanded" :src="logo2URL" alt="Expanded logo" />
      </div>

      <div class="menu-toggle-wrap">
        <button class="menu-toggle" @click="ToggleMenu">
          <span class="material-icons">keyboard_double_arrow_right</span>
        </button>
      </div>

      <h3>Menu</h3>
      <div class="menu">
        <router-link to="/" class="button">
          <span class="material-icons">home</span>
          <span class="text">Home</span>
        </router-link>
        <router-link to="/chat" class="button">
          <span class="material-icons">forum</span>
          <span class="text">Chat</span>
        </router-link>
        <router-link to="/friends" class="button">
          <span class="material-icons">diversity_1</span>
          <span class="text">Friends</span>
        </router-link>
        <router-link to="/notifications" class="button">
          <span class="material-icons">notifications</span>
          <span class="text">Notifications</span>
        </router-link>
		
      </div>

      <div class="flex"></div>
	<div class="profile-wrap">
        <router-link to="/profile">
          <div class="profile-image">
<img :src="profileImageUrl || 'https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg'" />
         </div>
        </router-link>
      </div>

      <div class="menu">
		<button  class="button" @click.prevent="logOut">
          <span class="material-icons">logout</span>
          <span class="text">Logout</span>
        </button>
       
      </div>
    </aside>
  </div>
</template>





<style lang="scss" scoped>


.count {
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
  margin-left: 5px;
}
.logo img {
    transition: all 0.3s ease-out; /* add transition property */

  max-width: 100%;
  height: auto;
}

.logo img.expanded {
  max-width: 80%;
}


.profile-wrap {
	transition: 0.2s ease-in-out;
	display: flex;
	justify-content: center;
	margin-bottom: 1rem;
}
.profile-image {
	transition: 0.2s ease-in-out;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 3rem;
	height: 3rem;
	border-radius: 50%;
	border: 2px solid var(--white);
	overflow: hidden;
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
}


aside {
	border-top-right-radius: 10%;
  
	border-bottom-right-radius: 10%;
//	margin-right: 5px;

  -webkit-box-shadow: 7px 3px 15px -7px rgba(0,0,0,0.75);
  -moz-box-shadow: 7px 3px 15px -7px rgba(0,0,0,0.75);
  box-shadow: 7px 3px 15px -7px rgba(0,0,0,0.75);
	
  display: flex;
  flex-direction: column;
  background-color: var(--blacks);
  color: var(--white);
  width: calc(2rem + 35px);
  overflow: hidden;
  min-height: 100vh;
  height: 100%;
	
  padding: 1rem;
  transition: 0.2s ease-in-out;

  .flex {
    flex: 0.6 1 0%;
  }

  .logo {
		transition: 0.3s ease-in-out;
		

    margin-bottom: 0rem;

    img {
			transition: 0.2s ease-in-out;

      width: 3rem;
    }
  }

  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;

    position: relative;
    top: 0;
    transition: 0.2s ease-in-out;

    .menu-toggle {
      transition: 0.2s ease-in-out;
      .material-icons {
        font-size: 2rem;
        color: var(--white);
        transition: 0.2s ease-out;
      }

      &:hover {
        .material-icons {
          color: var(--blue);
          transform: translateX(0.5rem);
        }
      }
    }
  }

  h3,
  .button .text {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  h3 {
    color: var(--grey2);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }

  .menu {
    margin: 0 -1rem;

    .button {
      display: flex;
      align-items: center;
      text-decoration: none;

      transition: 0.2s ease-in-out;
      padding: 0.5rem 1rem;

      .material-icons {
        font-size: 2.5rem;
        color: var(--white);
        transition: 0.2s ease-in-out;
      }
      .text {
        color: var(--white);
        transition: 0.2s ease-in-out;
      }

      &:hover {
        background-color: var(--grey1);

        .material-icons,
        .text {
          color: var(--blue);
        }
      }

      &.router-link-exact-active {
        background-color: var(--grey1);
        border-right: 5px solid var(--blue);

        .material-icons,
        .text {
          color: var(--blue);
        }
      }
    }
  }


  &.is-expanded {
	

	.logo {
          transition: all 0.3s ease-out; /* add transition property */

    margin-bottom: 0rem;

    img {
		src:"../assets/logo3.png";
      width: 10rem;
        max-width: 80%;

          transition: all 0.3s ease-out; /* add transition property */

    }
  }
	.profile-image {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 6rem;
	height: 6rem;
	border-radius: 50%;
	border: 2px solid var(--white);
	overflow: hidden;
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
}

    width: var(--sidebar-width);

    .menu-toggle-wrap {
      top: -3rem;

      .menu-toggle {
        transform: rotate(-180deg);
      }
    }

    h3,
    .button .text {
      opacity: 1;
    }

    .button {
      .material-icons {
        margin-right: 1rem;
      }
    }

   
  }

  @media (max-width: 1024px) {
    position: absolute;
    z-index: 99;
  }
}
</style>
