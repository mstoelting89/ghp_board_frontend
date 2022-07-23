<template>
  <div class="modal fade" id="userAdministration" tabindex="-1" aria-labelledby="userAdministration" aria-hidden="true">
    <div class="modal-dialog">
      <MessageModal
          :showModalValue=showModalValue
          :message=modalMessage
          :error=errorValue
          :success=successValue
      />
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addNewsLabel">Mitgliederverwaltung</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="newUser">
            <div class="userform col-md-5">
              <input type="text" class="form-control" id="userEmail" placeholder="E-Mail-Adresse" v-model="newUserEmail">
            </div>
            <div class="userform col-md-5 d-flex justify-content-start">
              <select ref="newUserRole" v-model="newUserRole" class="form-control">
                <option selected :data-role-value="role" v-for="role in rolesValues" v-bind:key="role"> {{ this.roles[role] }}</option>
              </select>
            </div>
            <div class="userform col-md-5 d-flex justify-content-start">
              <button class="btn btn-secondary" @click="newUser">Neues Mitglied hinzufügen</button>
            </div>
          </div>

          <div class="user-list">
            <div class="user-item row" v-for="user in userData" v-bind:key="user">
              <div class="col-2 col-lg-1">
                {{ user.id }}
              </div>
              <div class="col-10 col-lg-5">
                {{ user.email }}
              </div>
              <div class="col-6 col-lg-3">
                <select @change="changeUserLevel($event)" :data-user-email="user.email">
                  <option :data-role-value="role" :selected="user.userRole === this.roles[role]" v-for="role in rolesValues" v-bind:key="role"> {{ this.roles[role] }}</option>
                </select>
              </div>
              <div v-if="user.isEnabled" class="col-5 col-lg-2">Aktiv</div>
              <div v-else class="col-5 col-lg-2">Nicht Aktiv</div>
              <div class="col-1 col-lg-1">
                <font-awesome-icon :data-user-id="user.id" @click="setUserDeleteMail($event)" data-bs-toggle="modal" data-bs-target="#deleteUser" class="delete-icon" icon="trash" />
              </div>
            </div>
          </div>
          <!--
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Email</th>
                <th scope="col">UserLevel</th>
                <th scope="col">Status</th>
                <th scope="col">Löschen</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in userData" v-bind:key="user">
                <td>{{ user.id }}</td>
                <td class="email">{{ user.email }}</td>
                <td>
                  <select @change="changeUserLevel($event)" :data-user-email="user.email">
                    <option :data-role-value="role" :selected="user.userRole === this.roles[role]" v-for="role in rolesValues" v-bind:key="role"> {{ this.roles[role] }}</option>
                  </select>
                </td>
                <td v-if="user.isEnabled">Aktiv</td>
                <td v-else>Nicht Aktiv</td>
                <td><font-awesome-icon :data-user-id="user.id" @click="setUserDeleteMail($event)" data-bs-toggle="modal" data-bs-target="#deleteUser" class="delete-icon" icon="trash" /></td>
              </tr>
            </tbody>
          </table>
          -->

        </div>
        <div class="modal-footer justify-content-between">
          <button type="button" class="btn btn-default" data-bs-dismiss="modal">Schließen</button>
        </div>
      </div>
    </div>
  </div>
  <UserDeleteModal
    :userDeleteId=userDeleteId
  />
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import MessageModal from "@/components/members/container/MessageModal";
import UserDeleteModal from "@/components/members/container/user/UserDeleteModal";

export default {
  name: "UserMenuModal",
  components: {UserDeleteModal, MessageModal},
  props: ['allUsers', 'userRoles'],
  data() {
    return {
      userData: [],
      roles: [],
      rolesValues: [],
      modalMessage: '',
      errorValue: '',
      successValue: '',
      showModalValue: false,
      userDeleteId: '',
      newUserEmail: '',
      newUserRole: '',
    }
  },
  computed: {
    ...mapGetters(['getUserMessageArray'])
  },
  watch: {
    getUserMessageArray(newVal) {
      this.$parent.reloadUser();
      if (newVal) {
        this.modalMessage = newVal.message;
        this.errorValue = newVal.error;
        this.successValue = newVal.success;
        this.showModalValue = true;
        setTimeout(() => {
          this.showModalValue = false;
        }, 3000);
      }
    },
    allUsers(newVal) {
      this.userData = newVal.data;
    },
    userRoles(newVal) {
      this.roles = newVal.data;
      this.rolesValues = Object.keys(newVal.data);
    }
  },
  methods: {
    ...mapActions(['changeUserLevelOnService', 'getAllUser', 'insertNewUser',]),
    changeUserLevel(event) {
      const email = event.target.getAttribute('data-user-email');
      const userRole = parseInt(event.target.options[event.target.options.selectedIndex].getAttribute('data-role-value'));

      this.changeUserLevelOnService({email, userRole});
    },
    setUserDeleteMail(event) {
      this.userDeleteId = event.target.parentNode.getAttribute('data-user-id');
    },
    newUser() {
      const email = this.newUserEmail;
      const userRole = this.$refs.newUserRole.selectedOptions[0].dataset.roleValue;

      this.insertNewUser({email, userRole});
    }
  }
}
</script>

<style scoped>
.modal-dialog {
  min-width: 70vw;
}
.modal-content {
  min-height: 90vh;
}
.btn-close {
  background-color: transparent;
  border: none;
}
.btn {
  font-weight: bold;
  border-radius: 5px;
  border: none;
  padding: 15px 40px;
}
.btn-default {
  border: 1px solid #a21d21;
}
.email {
  text-align: left;
}
.delete-icon {
  color: #a21d21;
  cursor: pointer;
}
.btn {
  font-weight: bold;
  border-radius: 5px;
  border: none;
  padding: 15px 40px;
}
.btn-secondary {
  padding: 5px;
  font-size: 12px;
  background-color: #a21d21;
}
.userform {
  margin-bottom: 10px;
}
.user-item {
  margin-bottom: 5px;
  padding-bottom: 5px;
  border-bottom: 1px solid lightgrey;
}
</style>