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
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "UserMenu",
  data() {
    return {
      userEmailAdresse: localStorage.getItem('userEmail'),
      userLoggedIn: !!localStorage.getItem('userEmail'),
      userLevel: localStorage.getItem('userRole'),
      newUserEmail: '',
      newUserRole: ''
    }
  },
  computed: {
    ...mapGetters(['loggedIn', 'userEmail'])
  },
  watch: {
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