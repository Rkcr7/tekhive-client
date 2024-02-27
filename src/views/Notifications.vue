<template>
  <div class="container">
    <h2>Friend Requests ({{ requests.length }})</h2>
    <div v-if="requests.length === 0" class="empty-state">No pending friend requests.</div>
    <div v-else>
      <div class="card mb-3" v-for="request in requests" :key="request.id">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center">
            <h5 class="card-title">{{ request.fullName }}</h5>
            <div class="button-group">
              <button class="btn btn-primary mr-3" style="margin-right: 20px; background-color:var(--blue)" @click="acceptRequest(request.id)">Accept</button>
              <button class="btn btn-secondary" style="margin-right: 20px; background-color:var(--dark)">Decline</button>
            </div>
          </div>
          <h6 class="card-subtitle text-muted">{{ request.location }}</h6>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  padding: 2rem;
}

.card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  overflow: hidden;
}

.card-body {
  padding: 1rem;
}

.card-title {
  margin-bottom: 0;
}

.card-subtitle {
  font-size: 14px;
}

.empty-state {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-top: 2rem;
}

.button-group {
  display: flex;
  align-items: center;
}
</style>

<script>
import axios from 'axios';

const userdata = JSON.parse(localStorage.getItem("user"));
let token = null;
if (userdata && userdata.accessToken) {
  token = userdata.accessToken;
}

axios.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default {
  data() {
    return {
      requests: [],
    };
  },
  mounted() {
    // Fetch pending friend requests from API
    axios.get("https://tekhive-server.onrender.com/api/auth/friendship/pending-requests")
      .then((response) => {
        this.requests = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    acceptRequest(id) {
      // Send accept request to API
      axios.post(`https://tekhive-server.onrender.com/api/auth/friendship/accept/${id}`)
        .then(() => {
          // Remove accepted request from list
          this.requests = this.requests.filter((request) => request.id !== id);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

