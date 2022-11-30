<template>
  <div class="slider">
    <div class="row header-title align-items-center">
      <div class="col-4 col-md-4 col-lg-4 logo-align">
        <img :src="require('@/assets/images/BilderLars/1548x1026.png')">
      </div>
      <div class="col-12 col-md-12 col-lg-8">
        <MessageModal
            :showModalValue=showModalValue
            :message=modalMessage
            :error=errorValue
            :success=successValue
        />

        <div v-if="showSetPassword" class="page-header">
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
          </div>
        </div>

        <div v-else-if="showResetPassword" class="page-header">
          <div class="login-title">
            <h1>Passwort zurücksetzen</h1>
          </div>
          <div class="row">
            <input type="text" name="username" placeholder="E-Mail-Adresse" v-model="emailValue">
          </div>
          <div class="row">
            <button class="btn btn-primary" @click="replaceOldPassword(emailValue)">Passwort zurücksetzen</button>
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
          </div>
          <div class="row password-forgot">
            <small @click="showResetPasswordWrapper()">Passwort vergessen?</small>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>

import {mapActions, mapGetters} from "vuex";
import MessageModal from "@/components/members/container/MessageModal";
import Footer from "@/components/Footer";

export default {
  name: "Login",
  components: {Footer, MessageModal},
  data() {
    return {
      emailValue: '',
      passwordValue: '',
      passwordConfirmValue: '',
      modalMessage: '',
      showSetPassword: false,
      showResetPassword: false,
      confirmToken: '',
      showModalValue: false,
      successValue: false,
      errorValue: false
    }
  },
  created() {
    if (typeof this.$route.query.confirmToken !== "undefined") {
      this.showSetPassword = true;
      this.confirmToken = this.$route.query.confirmToken;
    }
  },
  computed: {
    ...mapGetters(['loginErrorMessage', 'loggedIn', 'getUserMessageArray'])
  },
  watch: {
    getUserMessageArray(newVal) {
      if (newVal) {
        this.modalMessage = newVal.message;
        this.errorValue = newVal.error;
        this.successValue = newVal.success;
        this.showModalValue = true;
        setTimeout(() => {
          this.showModalValue = false;
          if (newVal.redirect) {
            this.$router.push(newVal.redirect);
            this.showSetPassword = false;
            this.showResetPassword = false;
          }
        }, 3000);
      }
    },
    loginErrorMessage(newVal) {
      if (newVal !== '') {
        this.modalMessage = newVal;
        this.errorValue = true;
        this.successValue = false;
        this.showModalValue = true;

        setTimeout(() => {
          this.showModalValue = false;
        }, 3000);
      }
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
    ...mapActions(['login', 'resetPassword', 'requestNewPassword']),
    signIn(email, password) {
      this.login({email, password});
    },
    replaceOldPassword(email) {
      this.requestNewPassword(email);
    },
    showResetPasswordWrapper() {
      this.showSetPassword = false;
      this.showResetPassword = true;
    },
    setNewPassword(password, passwordConfirm) {
      if (password === passwordConfirm) {
        const confirmToken = this.confirmToken;
        this.resetPassword({password, confirmToken});
      } else {
        this.modalMessage = "Die Passwörter stimmen nicht überein";
        this.errorValue = true;
        this.successValue = false;
        this.showModalValue = true;
        setTimeout(() => {
          this.showModalValue = false;
        }, 3000);
      }
    }
  }
}
</script>

<style scoped>
.password-forgot {
  cursor: pointer;
}
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
.footer.row {
  width: inherit;
  margin-top: 0px;
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

/*mobile*/
@media only screen and (max-width: 428px) {
  .row {
    width: initial;
  }
  .header-title {
    max-width: none;
    right: 6vw;
  }
}
</style>