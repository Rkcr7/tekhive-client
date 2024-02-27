<template>
  <section>
    <div class="main-body">
              <div class="notification " v-if="notification">{{ notification }}</div>

                  <div class="notification" v-if="notification">{{ notification }}</div>

      <div class="row">

        <div id="one" class="col-6">
          <div class="img1"><img src="../assets/bg.png" alt="" /></div>
          <!-- <div class="img2"><img src="../assets/background2.jpg" alt="" /></div> -->
  <div class="img2">
           <label
  for="image-upload"
  class="image-label"
  :style="`background-image: url(${profileImageUrl || 'https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg'})`"
>
  <input
    id="image-upload"
    type="file"
    @change="uploadProfileImage"
    accept="image/*"
  />
</label>

          </div>


          <div class="d-flex flex-column align-items-center text-center">
            <div class="mt-3">
              <h4>{{ userData.fullName }}</h4>
              <p class="text-secondary mb-1">{{userData.bio}}</p>
              <p class="text-muted font-size-sm">
                {{ userData.location }}
              </p>
            </div>
          </div>
          <hr class="my-4" />
          <div>
            <!-- Navbar -->
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <div class="container-fluid">
                <button
                  class="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                  <ul class="navbar-nav">
                    <li class="nav-link btn mr-7">
                      <button class="nav-link btn" @click="activeTab = 'about'">
                        <strong>About</strong>
                      </button>
                    </li>
                    <li class="nav-link btn mr-7">
                      <button
                        class="nav-link btn"
                        @click="activeTab = 'friends'"
                      >
                        <strong>Friends</strong>
                      </button>
                    </li>
                    <li class="nav-link btn mr-7">
                      <button
                        class="nav-link btn"
                        @click="activeTab = 'photos'"
                      >
                        <strong>Photos</strong>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

            <!-- Content -->
            <div class="container mt-3">
              <div v-if="activeTab === 'about'">
                <h1>About</h1>
                <p>
                  I believe that true strength comes from kindness and
                  compassion, and that these qualities should be celebrated and
                  encouraged in all men. It takes courage to be vulnerable and
                  to show empathy, but I believe that it is worth it to create a
                  world that is more loving and connected.
                </p>
              </div>
              <div v-else-if="activeTab === 'friends'">
                <h1>Friends</h1>
                <div class="row">
                  <div
                    class="col-md-4 mb-3"
                    v-for="(friend, index) in friends"
                    :key="index"
                  >
                    <div class="card">
                      <img :src="friend.image" class="card-img-top" alt="..." />
                      <div class="card-body">
                        <h5 class="card-title">{{ friend.name }}</h5>
                        <p class="card-text">{{ friend.bio }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else-if="activeTab === 'photos'">
                <h1>Photos</h1>
                <div class="row">
                  <div class="col-md-4 mb-3">
                    <div
                      class="card"
                      id="image"
                      style="width: 180px; height: 180px"
                    >
                      <img
                        src="https://images.unsplash.com/photo-1670148570351-601dd7bebcd6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8Nzk0NjI3fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=420&q=60"
                        class="card-img-top img-thumbnail"
                        alt="..."
                      />
                      <div class="card-img-overlay"></div>
                    </div>
                  </div>
                  <div class="col-md-4 mb-3">
                    <div
                      class="card position-relative"
                      id="image"
                      style="width: 180px; height: 180px"
                    >
                      <img
                        src="https://t4.ftcdn.net/jpg/01/65/83/61/360_F_165836170_HDkbbLo1d8LnlT8EMkvwD58keRpkdqbk.jpg"
                        class="card-img-top img-thumbnail"
                        style="width: 180px; height: 180px"
                        alt="..."
                      />
                      <div class="card-img-overlay"></div>
                    </div>
                  </div>
                  <div class="col-md-4 mb-3">
                    <div
                      class="card"
                      id="image"
                      style="width: 180px; height: 180px"
                    >
                      <img
                        src="https://media.istockphoto.com/id/1255328634/photo/cricket-leather-ball-resting-on-bat-on-the-stadium-pitch.jpg?s=612x612&w=0&k=20&c=e2yHkZt3DISv6e1dpkZgABgC9fxfY93cB1H4MdY9sJs="
                        style="width: 180px; height: 180px"
                        class="card-img-top img-thumbnail"
                        alt="..."
                      />
                      <div class="card-img-overlay"></div>
                    </div>
                  </div>
                  <div class="col-md-4 mb-3">
                    <div class="card" id="image">
                      <img
                        src="https://images.freeimages.com/images/previews/7b4/grey-catbird-in-profile-1641861.jpg"
                        style="width: 180px; height: 180px"
                        class="card-img-top img-thumbnail"
                        alt="..."
                      />
                      <div class="card-img-overlay"></div>
                    </div>
                  </div>
                  <div class="col-md-4 mb-3">
                    <div class="card" id="image">
                      <img
                        src="https://images.pexels.com/photos/2577706/pexels-photo-2577706.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                        style="width: 180px; height: 180px"
                        class="card-img-top img-thumbnail"
                        alt="..."
                      />
                      <div class="card-img-overlay"></div>
                    </div>
                  </div>
                  <div class="col-md-4 mb-3">
                    <div class="card" id="image">
                      <img
                        src="https://images.unsplash.com/photo-1579081968981-80a6a969ad5a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bW9udGFnbmV8ZW58MHx8MHx8&w=1000&q=80"
                        style="width: 180px; height: 180px"
                        class="card-img-top img-thumbnail"
                        alt="..."
                      />
                      <div class="card-img-overlay"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card">
            <div class="card-body">
              <h5 class="d-flex align-items-center mb-3">
                Personal Information
                <i
                  id="editicon"
                  class="bi bi-pencil-square"
                  @click="enableEditing"
                ></i>
              </h5>
              <form ref="myForm" v-if="!editing">
                <div class="row mb-3">
                  <div class="col-sm-6 text-secondary">
                    <h6 for="name">Full Name</h6>
                    <input
                      :disabled="true"
                      v-model="userData.fullName"
                      type="text"
                      class="form-control"
                      id="name"
                      placeholder="Enter fullname"
                    />
                  </div>

                  <div class="col-sm-6 text-secondary">
                    <h6 for="username">Username</h6>
                    <input
                      :disabled="true"
                      v-model="userData.username"
                      type="text"
                      class="form-control"
                      id="username"
                      placeholder="Enter username"
                    />
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-sm-6 text-secondary">
                    <h6 for="email">Email</h6>
                    <input
                      :disabled="true"
                      v-model="userData.email"
                      type="text"
                      class="form-control"
                      id="email"
                      placeholder="Enter email"
                    />
                  </div>
                  <div class="col-sm-6 text-secondary">
                    <h6 for="mobile">Mobile</h6>
                    <input
                      :disabled="true"
                      v-model="userData.phoneNumber"
                      type="text"
                      class="form-control"
                      id="mobile"
                      placeholder="Enter mobile"
                    />
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-sm-6 text-secondary">
                    <h6 for="address">Address</h6>
                    <input
                      :disabled="true"
                      v-model="userData.location"
                      type="text"
                      class="form-control"
                      id="address"
                      placeholder="Enter address"
                    />
                  </div>
                  <div class="col-sm-6 text-secondary">
                    <h6 for="bio">Bio</h6>
                    <input
                      :disabled="true"
                      v-model="userData.bio"
                      type="text"
                      class="form-control"
                      id="bio"
                      placeholder="Enter Bio"
                    />
                  </div>
                </div>
                <div class="row mb-3">
                  <h6 for="hobbies">Gender</h6>
                  <div class="col-sm-12 text-secondary">
                    <select
                      :disabled="true"
                      class="form-control"
                      v-model="userData.gender"
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
              </form>
              <form ref="myForm" v-else @submit.prevent="updateUser">
                <div class="row mb-3">
                  <div class="col-sm-6 text-secondary">
                    <h6 for="name">Full Name</h6>
                    <input
                      v-model="userData.fullName"
                      type="text"
                      class="form-control"
                      id="name"
                      placeholder="Enter fullname"
                      required
                    />
                    <div class="invalid-feedback">
                      Please enter a valid name.
                    </div>
                  </div>

                  <div class="col-sm-6 text-secondary">
                    <h6 for="username">Username</h6>
                    <input
                      v-model="userData.username"
                      type="text"
                      class="form-control"
                      id="username"
                      placeholder="Enter username"
                      required
                    />
                    <div class="invalid-feedback">
                      Please enter a valid username.
                    </div>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-sm-6 text-secondary">
                    <h6 for="email">Email</h6>
                    <input
                      v-model="userData.email"
                      type="text"
                      class="form-control"
                      id="email"
                      placeholder="Enter email"
                      required
                    />
                    <div class="invalid-feedback">
                      Please enter a valid email.
                    </div>
                  </div>
                  <div class="col-sm-6 text-secondary">
                    <h6 for="mobile">Mobile</h6>
                    <input
                      v-model="userData.phoneNumber"
                      type="text"
                      class="form-control"
                      id="mobile"
                      placeholder="Enter mobile"
                      required
                    />
                    <div class="invalid-feedback">
                      Please enter a valid mobile number.
                    </div>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-sm-6 text-secondary">
                    <h6 for="address">Address</h6>
                    <input
                      v-model="userData.location"
                      type="text"
                      class="form-control"
                      id="address"
                      placeholder="Enter address"
                      required
                    />
                    <div class="invalid-feedback">
                      Please enter a valid address.
                    </div>
                  </div>
                  <div class="col-sm-6 text-secondary">
                    <h6 for="bio">Bio</h6>
                    <input
                      v-model="userData.bio"
                      type="text"
                      class="form-control"
                      id="bio"
                      placeholder="Enter Bio"
                      required
                    />
                    <div class="invalid-feedback">
                      Please enter a valid bio.
                    </div>
                  </div>
                </div>
                <div class="row mb-3">
                  <h6 for="Gender">Gender</h6>
                  <div class="col-sm-12 text-secondary">
                    <select class="form-control" v-model="userData.gender">
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    <div class="invalid-feedback">Invalid Input</div>
                  </div>
                </div>
                <button
                  class="btn btn-primary"
                  @click="saveChanges"
                  style="margin-left: 15rem"
                >
                  <i class="fa fa-save"></i> Save Changes
                </button>
              </form>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <div class="card" style="width: 642px; margin-left: -19px">
                <div class="card-body">
                  <h5 class="d-flex align-items-center mb-3">
                    Recent Activity
                    <i id="recenticon" class="bi bi-clock-history"></i>
                  </h5>

                  <ul
                    v-for="(activities, day) in groupedActivities"
                    :key="day"
                    class="list-group mb-4"
                  >
                    <li
                      v-for="(activity, index) in activities"
                      :key="index"
                      class="list-group-item"
                      style="margin-bottom: 0px; padding: 5px; cursor: pointer"
                    >
                      <div
                        class="d-flex justify-content-between align-items-center"
                      >
                        <div class="activity d-flex align-items-center">
                          <img
                            :src="activity.icon"
                            alt="Activity icon"
                            class="me-3 rounded-circle"
                            style="width: 40px; height: 40px"
                          />
                          <div>
                            <p
                              class="mb-1"
                              style="
                                color: #001514;
                                font-size: 14px;
                                margin-bottom: 2px;
                              "
                            >
                              {{ getActivityTitle(activity) }}
                            </p>
                            <p class="text-muted" style="font-size: 12px">
                              {{ activity.timestamp }}
                            </p>
                          </div>
                        </div>
                        <div
                          class="badge bg-primary"
                          style="background-color: #00bbff; font-size: 12px"
                        >
                          {{ activity.type }}
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div></div>
</template>

<script>
import axios from "axios";
import { Buffer } from 'buffer-es6';


export default {
  name: "profileNew",

  data() {
    return {
      notification: null, // new property for notification message

      profileImageUrl: null,
      userData: {
        fullName: "",
        email: "",
        phoneNumber: "",
        location: "",
        gender: "",
        bio: "",
        username: "",
        // profileImageUrl:null
      },
      editing: false,

      activeTab: "about",
      imageUrl: null,

      activities: [
        {
          title: "John Smith added a new photo",
          timestamp: "2023-03-02 10:30:00",
          type: "Photo",
          icon: "https://picsum.photos/id/1015/50/50",
        },
        {
          title: "Jane Doe commented on your post",
          timestamp: "2023-03-01 15:25:00",
          type: "Comment",
          icon: "https://picsum.photos/id/1018/50/50",
        },
        {
          title: "Alex Johnson shared a post",
          timestamp: "2023-02-28 08:45:00",
          type: "Post",
          icon: "https://picsum.photos/id/1020/50/50",
        },
      ],
      friends: [
        {
          name: "John Doe",
          bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          image:
            "https://expertphotography.b-cdn.net/wp-content/uploads/2018/10/cool-profile-pictures-fake-smile.jpg",
        },
        {
          name: "Jane Smith",
          bio: "Sed nec feugiat leo, quis placerat ex.",
          image:
            "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
        },
        {
          name: "Bob Johnson",
          bio: "Donec quis tortor fermentum, fermentum turpis at, vestibulum felis.",
          image:
            "https://images.unsplash.com/photo-1532519232192-fb284a889fd8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHZpZXxlbnwwfHwwfHw%3D&w=1000&q=80",
        },
      ],
    };
  },
  mounted() {
        this.getProfileImage();
        

    const imageUrl = localStorage.getItem("profileImage");
    if (imageUrl) {
      this.imageUrl = imageUrl;
    }
    this.loadForm();

    const user = JSON.parse(localStorage.getItem("user"));
    const id = user.id;
    // const userId = this.currentUser.id;

    // Fetch user data using API
    axios
      .get(`https://tekhive-server.onrender.com/api/auth/user/${id}`)
      .then((response) => {
        this.userData = response.data;
      })
      .catch((error) => {

        console.error(error);
      });
  },

  computed: {
    groupedActivities() {
      return this.activities.reduce((groups, activity) => {
        const date = activity.timestamp.split(" ")[0];
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(activity);
        return groups;
      }, {});
    },
  },
  filters: {
    formatDate(date) {
      return new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date);
    },
  },
   created() {
     this.getProfileImage();
    document.title='Profile'
    
  
    
  },
  methods: {
    uploadProfileImage(event) {
         const userData = JSON.parse(localStorage.getItem("user"));
    const accessTokens = userData.accessToken;

    if (!accessTokens) {
      // handle case where access token is missing
      console.error("Access token not found");
      return;
    }

      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("image", file);

      axios
        .post("https://tekhive-server.onrender.com/api/auth/upload-profile-image", formData,{  headers: {
        Authorization: `Bearer ${accessTokens}`,
      },})
        .then(() => {
          this.getProfileImage();
          this.notification = "Profile image updated";
          setTimeout(() => {
        this.notification = null;
      }, 3000); 
        })
        .catch((error) => {
          console.log(error);
          this.notification = "Error image size exceeds limit ";
           setTimeout(() => {
        this.notification = null;
      }, 4000); 
        });
    },

    getProfileImage() {
      const userData = JSON.parse(localStorage.getItem("user"));
    const accessTokens = userData.accessToken;

    if (!accessTokens) {
      // handle case where access token is missing
      console.error("Access token not found");
      return;
    }
      axios
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

    updateUser() {
      console.log(this.userData);
      const user = JSON.parse(localStorage.getItem("user"));
      const id = user.id;
      // Get user ID from local storage
      //   const userId = localStorage.getItem('user');

      // Send API request to update user data
      axios
        .put(`https://tekhive-server.onrender.com/api/auth/update/${id}`, this.userData)
        .then((response) => {
          console.log(response.data); // Handle response data here
          this.notification = "Profile details updated";
          setTimeout(() => {
        this.notification = null;
      }, 3000); 
        })
        .catch((error) => {
          console.error(error); // Handle error here
          this.notification = "Error in updating profile";
          setTimeout(() => {
        this.notification = null;
      }, 3000); 
        });
    },

    getActivityTitle(activity) {
      switch (activity.type) {
        case "Photo":
          return `${activity.title} to their album.`;
        case "Comment":
          return `${activity.title} on one of your posts.`;
        case "Post":
          return `${activity.title} on their timeline.`;
        default:
          return activity.title;
      }
    },
    onImageUpload(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
        localStorage.setItem("profileImage", reader.result);
      };
      reader.readAsDataURL(file);
    },
    enableEditing() {
      this.editing = true;
    },
    saveChanges() {
      // Save the changes here
      this.$refs.myForm.classList.add("was-validated");
      if (this.$refs.myForm.checkValidity()) {
        // localStorage.setItem("name", this.name);
        // localStorage.setItem("username", this.username);
        // localStorage.setItem("email", this.email);
        // localStorage.setItem("mobile", this.mobile);
        // localStorage.setItem("address", this.address);
        // localStorage.setItem("bio", this.bio);
        // localStorage.setItem("hobbies", this.hobbies);
        this.editing = false;
        this.updateUser();
      }
    },
    loadForm() {
      const name = localStorage.getItem("name");
      const username = localStorage.getItem("username");
      const email = localStorage.getItem("email");
      const mobile = localStorage.getItem("mobile");
      const address = localStorage.getItem("address");
      const bio = localStorage.getItem("bio");
      const hobbies = localStorage.getItem("hobbies");
      if (name && username && email && mobile && address && bio && hobbies) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.mobile = mobile;
        this.address = address;
        this.bio = bio;
        this.hobbies = hobbies;
      }
    },
  },
};
</script>

<style scoped>
.notification {
  border:2px solid var(--blue);

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
}

.upload-image {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.header {
  display: inline;
  justify-content: flex-end;
  top: -25px;
  right: 50px;
}
.headermenu {
  list-style: none;
  display: flex;
  gap: 2rem;
  color: white;
  float: right;
}
.headermenu > li:hover {
  transition: width 1s;
  color: #001514;
  cursor: pointer;
}
.image-label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: #ccc;
}

.image-label:hover {
  background-color: #f7f7f7;
}

.image-label i {
  font-size: 72px;
  color: #fff;
}

input[type="file"] {
  display: none;
}
.navBar {
  height: 8vh;
  background-color: #4481eb;
  align-items: center;
  position: fixed;
  width: 100vw;
  z-index: 200;
}

.logo {
  margin-left: 5vh;
  font-size: 1.5rem;
  color: #ffffff;
}
.nav {
  float: left;
}
.nav-item {
  float: right;
}
.row {
  padding: 15px;
  padding-left: 20px;
}
.main-body {
  
  padding-top: 0% !important;
}
#one {
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 0 solid transparent;
  border-radius: 0.25rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 6px 0 rgb(218 218 253 / 65%),
    0 2px 6px 0 rgb(206 206 238 / 54%);
}

#row1 {
  height: 50vh;
  border-radius: 5%;
  margin: auto;
  margin-bottom: 5px;
}

.card-title {
  padding-bottom: 10px;
}
.recent-title {
  padding-bottom: 10px;
  padding-left: 10px;
  padding-top: 10px;
  margin-top: 5px;
}
.form-control {
  width: auto;
}
.form-inline .form-group {
  display: inline-block;
  padding-bottom: 15px;
  padding-right: 7px;
}
.form-inline .form-control {
  display: inline-block;
  margin-bottom: 0;
  vertical-align: middle;
}

#three {
  height: 50vh;
  border-radius: 5%;
  width: auto;
}
.profile-area {
  padding: 80px 0;
}
.card {
  /* box-shadow: 0 0 30px rgba(0, 0, 0, 0.5); */
  /* box-shadow: 0 0 30px #00BBFF; */
  overflow: hidden;
  border-radius: 15px;
  border-color: #001514;
}

#image {
  border: none;
}
.hidden {
  display: none;
}
.img1 img {
  height: 300px;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  width: 100%;
  flex-direction: column;

  word-wrap: break-word;
}
.img2 label {
  position: relative;
  display: block;
  margin-left: auto;
  margin-right: auto;
  z-index: 1;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  border: 7px solid #fff;
  margin-top: -80px;
}
.img2:hover img {
  border-color: darkcyan;
  transition: 0.7s;
}
.main-text {
  padding: 30px 0;
  text-align: center;
}
.main-text h2 {
  text-transform: uppercase;
  font-weight: 900;
  font-size: 20px;
  margin: 0 0 20px;
}
.main-text p {
  font-size: 16px;
  padding: 0 35px;
}
.field {
  font-style: italic;
}
#editimage {
  position: absolute;
  bottom: 0;
  right: 0px;
  font-size: 30px;
  color: #001514;
  cursor: pointer;
}
#editicon {
  padding-left: 370px;
  top: 10px;
  left: 20px;
  cursor: pointer;
}
#recenticon {
  padding-left: 450px;

  size: 5px;
}
.list-group {
  margin-top: 30px;
}
.list-group-item {
  border: none;
  padding: 15px 0;
}
.list-group-item:not(:last-child) {
  border-bottom: 1px solid #e9ecef;
}

.activity {
  margin-bottom: 10px;
}
.fw-bold {
  font-weight: bold;
}
.text-muted {
  color: #ececec;
}
.primary-bg {
  background-color: #007bff;
  color: #fff;
}
.secondary-bg {
  background-color: #6c757d;
  color: #fff;
}
li:hover {
  border-color: #5ed4ff;
}
#email2 {
  background: transparent;
  border: none;
  /* border-bottom: 1px solid #000000; */
  -webkit-box-shadow: none;
  box-shadow: none;
  border-radius: 0;
}
</style>
