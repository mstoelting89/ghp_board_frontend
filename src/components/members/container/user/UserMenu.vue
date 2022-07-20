<template>
  <div class="dropdown" v-if="userLoggedIn && currentRouteName === 'Dashboard'">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="userMenu" data-bs-toggle="dropdown" aria-expanded="false">
      Hallo {{ userEmailAdresse }}
    </button>
    <ul class="dropdown-menu" aria-labelledby="userMenu">
      <li v-if="userLevel === 'ADMIN'" data-bs-toggle="modal" data-bs-target="#userAdministration"><span class="dropdown-item">Nutzerverwaltung</span></li>
      <li><span class="dropdown-item" @click="logoutUser">Logout</span></li>
    </ul>

    <MessageModal
        :showModalValue=showModalValue
        :message=modalMessage
        :error=errorValue
        :success=successValue
    />
    <UserMenuModal
        :allUsers=allUsers
        :userRoles=userRoles
    />
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import MessageModal from "@/components/members/container/MessageModal";
import UserMenuModal from "@/components/members/container/user/UserAdministrationModal";

export default {
  name: "UserMenu",
  components: {UserMenuModal, MessageModal},
  data() {
    return {
      userEmailAdresse: localStorage.getItem('userEmail'),
      userLoggedIn: !!localStorage.getItem('userEmail'),
      userLevel: localStorage.getItem('userRole'),
      modalMessage: '',
      errorValue: '',
      successValue: '',
      showModalValue: false,
      allUsers: [],
      userRoles: []
    }
  },
  created() {
    this.getAllUser();
    this.getUserRolesFromService();
  },
  computed: {
    ...mapGetters(['loggedIn', 'userEmail', 'getUserMessageArray', 'getUserArray', 'getUserRoles']),
    currentRouteName() {
      return this.$route.name;
    }
  },
  watch: {
    getUserArray(newVal) {
      this.allUsers = newVal;
    },
    getUserRoles(newVal) {
      this.userRoles = newVal;
    },
    getUserMessageArray(newVal) {
      this.getAllUser();
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
    ...mapActions(['logout', 'insertNewUser', 'getAllUser', 'getUserRolesFromService']),
    logoutUser() {
      this.logout();
    },
    reloadUser() {
      this.getAllUser();
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