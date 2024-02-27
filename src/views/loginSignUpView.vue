<!-- <script>
export default {
  data() {
    return {
      sign_up_mode: false,
    };
  },
};
</script> -->

<template>
  <div class="panelContainer" :class="{ 'sign-up-mode': sign_up_mode }">
    <div class="forms-container">
      <div class="signin-signup">
        <Form
          @submit="handleLogin"
          :validation-schema="loginschema"
          class="sign-in-form"
        >
          <h2 class="title">Sign in</h2>
          <div class="input-field">
            <i class="fas fa-user"></i>
            <Field name="username" type="text" placeholder="Username" />
          </div>
          <ErrorMessage name="username" className="ErrorMessage" />

          <div class="input-field">
            <i class="material-icons">lock</i>
            <Field name="password" type="password" placeholder="Password" />
          </div>
          <ErrorMessage name="password" className="ErrorMessage" />

          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              <span>Login</span>
            </button>
          </div>

          <div class="form-group">
            <div v-if="signinmessage" class="ErrorMessage">
              {{ signinmessage }}
            </div>
          </div>
        </Form>

        <Form
          @submit="handleRegister"
          :validation-schema="signupschema"
          class="sign-up-form"
        >
          <div v-if="!successful">
            <h2 class="title">Sign up</h2>
            <div class="input-field">
              <i class="fas fa-user"></i>
              <Field name="username" type="text" placeholder="Username" />
            </div>
            <ErrorMessage name="username" className="ErrorMessage" />

            <div class="input-field">
              <i class="fas fa-envelope"></i>
              <Field name="email" type="email" placeholder="Email" />
            </div>
            <ErrorMessage name="email" className="ErrorMessage" />

            <div class="input-field">
              <i class="material-icons">lock</i>
              <Field name="password" type="password" placeholder="Password" />
            </div>
            <ErrorMessage name="password" className="ErrorMessage" />
            <div class="form-group">
              <button class="btn btn-primary btn-block" :disabled="loading">
                <span
                  v-show="loading"
                  class="spinner-border spinner-border-sm"
                ></span>
                Sign Up
              </button>
            </div>
          </div>
        </Form>
        <div
          v-if="message"
          class="alert"
          :class="successful ? 'SuccessMessage' : 'ErrorMessage2'"
         
        >
          {{ message }}
          <div v-if="successful" ><h3>Hurray Now let's Signin to Tekhive</h3></div>
        </div>
      </div>
    </div>

    <div class="panels-container">
      <div class="panel left-panel">
        <div class="content">
          <h3>New here ?</h3>
          <p>
            Chatting made simple, connecting made easy.<br />
            Start chatting with like-minded individuals, sign up now.
          </p>
          <button
            class="btn transparent"
            id="sign-up-btn"
            @click="
              sign_up_mode = true;
              signinmessage = '';
            "
          >
            Sign up
          </button>
          <img src="../assets/logo3.png" class="image" alt="" />
        </div>
      </div>
      <div class="panel right-panel">
        <div class="content">
          <h3>One of us ?</h3>
          <p>
            Stay connected, stay creative.<br />
            Don't miss a beat, sign in and join the conversation.
          </p>
          <button
            class="btn transparent"
            id="sign-in-btn"
            @click="
              sign_up_mode = false;
              message = '';
            "
          >
            Sign in
          </button>
          <img src="../assets/logo3.png" class="image" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.SuccessMessage {
  padding-left: 10%;
  color: var(--blue);
  font-weight: 600;
  font-size:xx-large
}
.ErrorMessage {
  color: #d8000c;
  font-weight: 500;
}

.ErrorMessage2 {
  padding-left: 33%;

  color: #d8000c;
  font-weight: 500;
}
.navBar {
  height: 8vh;
  background-color: #4481eb;
  display: flex;
  align-items: center;
}

.logo {
  margin-left: 5vh;
  font-size: 1.5rem;
  color: #ffffff;
}

body,
input {
  font-family: "Poppins", sans-serif;
}

.panelContainer {
  position: relative;
  width: 100%;
  background-color: #fff;
  min-height: 100vh;
  overflow: hidden;
  margin-left: 0;
}

.forms-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.signin-signup {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 75%;
  width: 50%;
  transition: 1s 0.7s ease-in-out;
  display: grid;
  grid-template-columns: 1fr;
  z-index: 5;
}

form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0rem 5rem;
  transition: all 0.2s 0.7s;
  overflow: hidden;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}

form.sign-up-form {
  opacity: 0;
  z-index: 1;
}

form.sign-in-form {
  z-index: 2;
}

.title {
  font-size: 2.2rem;
  color: #444;
  margin-bottom: 10px;
}

.input-field {
  max-width: 380px;
  width: 100%;
  background-color: #f0f0f0;
  margin: 10px 0;
  height: 55px;
  border-radius: 55px;
  display: grid;
  grid-template-columns: 15% 85%;
  padding: 0 0.4rem;
  position: relative;
}

.input-field i {
  text-align: center;
  line-height: 55px;
  color: #acacac;
  transition: 0.5s;
  font-size: 1.1rem;
}

.input-field input {
  background: none;
  outline: none;
  border: none;
  line-height: 1;
  font-weight: 600;
  font-size: 1.1rem;
  color: #333;
}

.input-field input::placeholder {
  color: #aaa;
  font-weight: 500;
}

.social-text {
  padding: 0.7rem 0;
  font-size: 1rem;
}

.social-media {
  display: flex;
  justify-content: center;
}

.social-icon {
  height: 46px;
  width: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.45rem;
  color: #333;
  border-radius: 50%;
  border: 1px solid #333;
  text-decoration: none;
  font-size: 1.1rem;
  transition: 0.3s;
}

.social-icon:hover {
  color: #4481eb;
  border-color: #4481eb;
}

.btn {
  width: 150px;
  background-color: #5995fd;
  border: none;
  outline: none;
  height: 49px;
  border-radius: 49px;
  color: #fff;
  text-transform: uppercase;
  font-weight: 600;
  margin: 10px 0;
  cursor: pointer;
  transition: 0.5s;
}

.btn:hover {
  background-color: #4d84e2;
}
.panels-container {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.panelContainer:before {
  content: "";
  position: absolute;
  height: 2000px;
  width: 2000px;
  top: -10%;
  right: 48%;
  transform: translateY(-50%);
  background-image: linear-gradient(-45deg, #4481eb 0%, #04befe 100%);
  transition: 1.8s ease-in-out;
  border-radius: 50%;
  z-index: 6;
}

.image {
  width: 100%;
  transition: transform 1.1s ease-in-out;
  transition-delay: 0.4s;
  margin-right: 4rem;
}

.panel {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  text-align: center;
  z-index: 6;
}

.left-panel {
  pointer-events: all;
  padding: 3rem 17% 2rem 12%;
}

.right-panel {
  pointer-events: none;
  padding: 3rem 12% 2rem 17%;
}

.panel .content {
  color: #fff;
  transition: transform 0.9s ease-in-out;
  transition-delay: 0.6s;
}

.panel h3 {
  font-weight: 600;
  line-height: 1;
  font-size: 1.5rem;
}

.panel p {
  font-size: 0.95rem;
  padding: 0.7rem 0;
}

.btn.transparent {
  margin: 0;
  background: none;
  border: 2px solid #fff;
  width: 130px;
  height: 41px;
  font-weight: 600;
  font-size: 0.8rem;
}

.right-panel .image,
.right-panel .content {
  transform: translateX(800px);
}

/* ANIMATION */

.panelContainer.sign-up-mode:before {
  transform: translate(100%, -50%);
  right: 52%;
}

.panelContainer.sign-up-mode .left-panel .image,
.panelContainer.sign-up-mode .left-panel .content {
  transform: translateX(-800px);
}

.panelContainer.sign-up-mode .signin-signup {
  left: 25%;
}

.panelContainer.sign-up-mode form.sign-up-form {
  opacity: 1;
  z-index: 2;
}

.panelContainer.sign-up-mode form.sign-in-form {
  opacity: 0;
  z-index: 1;
}

.panelContainer.sign-up-mode .right-panel .image,
.panelContainer.sign-up-mode .right-panel .content {
  transform: translateX(0%);
}

.panelContainer.sign-up-mode .left-panel {
  pointer-events: none;
}

.panelContainer.sign-up-mode .right-panel {
  pointer-events: all;
}

@media (max-width: 870px) {
  .panelContainer {
    min-height: 800px;
    height: 100vh;
  }
  .signin-signup {
    width: 100%;
    top: 95%;
    transform: translate(-50%, -100%);
    transition: 1s 0.8s ease-in-out;
  }

  .signin-signup,
  .container.sign-up-mode .signin-signup {
    left: 50%;
  }

  .panels-container {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2fr 1fr;
  }

  .panel {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 2.5rem 8%;
    grid-column: 1 / 2;
  }

  .right-panel {
    grid-row: 3 / 4;
  }

  .left-panel {
    grid-row: 1 / 2;
  }

  .image {
    width: 200px;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.6s;
  }

  .panel .content {
    padding-right: 15%;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.8s;
  }

  .panel h3 {
    font-size: 1.2rem;
  }

  .panel p {
    font-size: 0.7rem;
    padding: 0.5rem 0;
  }

  .btn.transparent {
    width: 110px;
    height: 35px;
    font-size: 0.7rem;
  }

  .panelContainer:before {
    width: 1500px;
    height: 1500px;
    transform: translateX(-50%);
    left: 30%;
    bottom: 68%;
    right: initial;
    top: initial;
    transition: 2s ease-in-out;
  }

  .panelContainer.sign-up-mode:before {
    transform: translate(-50%, 100%);
    bottom: 32%;
    right: initial;
  }

  .panelContainer.sign-up-mode .left-panel .image,
  .panelContainer.sign-up-mode .left-panel .content {
    transform: translateY(-300px);
  }

  .panelContainer.sign-up-mode .right-panel .image,
  .panelContainer.sign-up-mode .right-panel .content {
    transform: translateY(0px);
  }

  .right-panel .image,
  .right-panel .content {
    transform: translateY(300px);
  }

  .panelContainer.sign-up-mode .signin-signup {
    top: 5%;
    transform: translate(-50%, 0);
  }
}

@media (max-width: 570px) {
  form {
    padding: 0 1.5rem;
  }

  .image {
    display: none;
  }
  .panel .content {
    padding: 0.5rem 1rem;
  }
  .panelContainer {
    padding: 1.5rem;
  }

  .panelContainer:before {
    bottom: 72%;
    left: 50%;
  }

  .panelContainer.sign-up-mode:before {
    bottom: 28%;
    left: 50%;
  }
}
</style>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const loginschema = yup.object().shape({
      username: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
    });
    const signupschema = yup.object().shape({
      username: yup
        .string()
        .required("Username is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!"),
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
    });

    return {
      successful: false,
      loading: false,
      signinmessage: "",
      message: "",
      signupschema,
      loginschema,
      sign_up_mode: false,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  
  created() {
    document.title='Tekhive'
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true;

      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/profile");
        },
        (error) => {
          this.loading = false;
          this.signinmessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
    handleRegister(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;

      this.$store.dispatch("auth/register", user).then(
        (data) => {
          this.message = `Registration successful for ${user.username}`;
          this.successful = true;
          this.loading = false;
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
        }
      );
    },
  },
};
</script>
