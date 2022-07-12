<template>
  <div class="slider">
    <div class="row header-title align-items-center">
      <div class="col-4 col-md-4 col-lg-4 logo-align">
        <img :src="require('@/assets/images/BilderLars/1548x1026.png')">
      </div>
      <div class="col-12 col-md-12 col-lg-8">
        <div v-if="showResetPassword" class="page-header">
          <div class="login-title">
            <h1>Neues Passwort setzen</h1>
          </div>
          <div class="row">
            <input type="password" name="password" placeholder="Passwort" v-model="passwordValue">
          </div>
          <div class="row">
            <input type="password" name="passwordConfirm" placeholder="Passwort bestätigen" v-model="passwordConfirmValue">
          </div>
          <div class="row">
            <button class="btn btn-primary" @click="setNewPassword(passwordValue, passwordConfirmValue)">Passwort ändern</button>
            <span class="errorMsg">{{ errorMessage }}</span>
          </div>
        </div>
        <div v-else class="page-header">
          <div class="login-title">
            <h1>Login</h1>
          </div>
          <div class="row">
            <input type="text" name="username" placeholder="E-Mail-Adresse" v-model="emailValue">
          </div>
          <div class="row">
            <input type="password" name="password" placeholder="Passwort" v-model="passwordValue">
          </div>
          <div class="row">
            <button class="btn btn-primary" @click="signIn(emailValue, passwordValue)">Einloggen</button>
            <span class="errorMsg">{{ errorMessage }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";

export default {
  name: "Login",
  data() {
    return {
      emailValue: '',
      passwordValue: '',
      passwordConfirmValue: '',
      errorMessage: '',
      showResetPassword: false,
      confirmToken: ''
    }
  },
  created() {
    if (typeof this.$route.query.confirmToken !== "undefined") {
      this.showResetPassword = true;
      this.confirmToken = this.$route.query.confirmToken;
    }
  },
  computed: {
    ...mapGetters(['loginErrorMessage', 'loggedIn'])
  },
  watch: {
    loginErrorMessage(newVal) {
      this.errorMessage = newVal;
    },
    loggedIn(newVal) {
      if (newVal === true) {
        this.$router.push("/dashboard");
      } else {
        this.$router.push("/login");
      }
    }
  },
  methods: {
    ...mapActions(['login', 'resetPassword']),
    signIn(email, password) {
      this.login({email, password});
    },
    setNewPassword(password, passwordConfirm) {
      //TODO: check if passwords are equal
      if (password === passwordConfirm) {
        this.resetPassword({password, passwordConfirm})
      } else {
        this.errorMessage = "Die Passwörter stimmen nicht überein";
      }
    }
  }
}
</script>

<style scoped>
.slider {
  height: 100vh;
  background-image: url("~@/assets/images/background-img-min-min(1).jpeg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center 50%;
  position: relative;
}
.header-title {
  position: absolute;
  left: 6vw;
  background-color: rgba(255,255,255,.8);
  padding: 1rem 3rem 3rem 1rem;
  min-width: 60vw;
  max-width: 60vw;
  display: flex;
  border-radius: 5px;
  text-align: left;
  top: 30vh;
}
.logo-align {
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
.logo-align img {
  height: 20vh;
}
.page-header {
  margin-left: 20px;
}
.row {
  width: 50%;
  margin-top:10px;
}

.row input, .row button {
  margin-left: 10px;
}

button {
  background-color: #a21d21;
  border: 1px solid #a21d21;
}

button:hover {
  opacity: 0.8;
  background-color: #a21d21;
  border: 1px solid #a21d21;
}

.errorMsg {
  font-size: 13px;
  font-weight: bold;
  color: #ff0000;
  margin-top: 10px;
}
</style>