<template>
  <div class="dropdown" v-if="userLoggedIn">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="userMenu" data-bs-toggle="dropdown" aria-expanded="false">
      Hallo {{ userEmailAdresse }}
    </button>
    <ul class="dropdown-menu" aria-labelledby="userMenu">
      <li v-if="userLevel === 'ADMIN'"><a class="dropdown-item" href="#">Nutzerverwaltung</a></li>
      <li><span class="dropdown-item" @click="logoutUser">Logout</span></li>
    </ul>

    <div class="newUser">
      <input type="text" class="form-control" id="userEmail" v-model="newUserEmail">
      <input type="text" class="form-control" id="userRole" v-model="newUserRole">
      <button class="btn btn-secondary" @click="newUser">Enter new User</button>
    </div>

    <MessageModal
        :showModalValue=showModalValue
        :message=modalMessage
        :error=errorValue
        :success=successValue
    />
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import MessageModal from "@/components/members/container/MessageModal";

export default {
  name: "UserMenu",
  components: {MessageModal},
  data() {
    return {
      userEmailAdresse: localStorage.getItem('userEmail'),
      userLoggedIn: !!localStorage.getItem('userEmail'),
      userLevel: localStorage.getItem('userRole'),
      newUserEmail: '',
      newUserRole: '',
      modalMessage: '',
      errorValue: '',
      successValue: '',
      showModalValue: false
    }
  },
  computed: {
    ...mapGetters(['loggedIn', 'userEmail', 'getUserMessageArray'])
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
          }
        }, 3000);
      }
    },
    loggedIn(newVal) {
      if (newVal === true) {
        this.userLoggedIn = true;
        this.$router.push("/dashboard");
      } else {
        this.userLoggedIn = false;
        this.$router.push("/login");
      }
      this.userLevel = localStorage.getItem('userRole');
    },
    userEmail(newVal) {
      this.userEmailAdresse = newVal
    }
  },
  methods: {
    ...mapActions(['logout', 'insertNewUser']),
    logoutUser() {
      this.logout();
    },
    newUser() {
      const email = this.newUserEmail;
      const userRole = this.newUserRole;

      this.insertNewUser({email, userRole});
    }
  }
}
</script>

<style scoped>
.dropdown-item {
  cursor: pointer;
}
.btn-secondary:focus, .btn-secondary:active {
  box-shadow: none;
}
#userMenu {
  background-color: #a21d21;
  border-radius: 5px;
  border-color: transparent;
}
.dropdown-menu.show {
  width: 100%;
  top:75%;
  background-color: #a21d21;
  border-radius: 5px;
  border-color: #a21d21;
}
.dropdown-item {
  color: #fff;
}
</style>