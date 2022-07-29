<template>
  <div class="modal fade" id="contact" tabindex="-1" aria-labelledby="contact" aria-hidden="true">
    <MessageModal
        :showModalValue=showModalValue
        :message=modalMessage
        :error=errorValue
        :success=successValue
    />

    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Kontakt</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="sidebar-content">
            <div class="content-text">
              Hier kannst du uns kontaktieren:<br>
            </div>
            <div class="contact-form">
              <input class="form-control" placeholder="Name" v-model="lastName">
              <input class="form-control" placeholder="Vorname" v-model="firstName">
              <input class="form-control" placeholder="E-Mail Adresse" v-model="email">
              <textarea class="form-control" placeholder="Nachricht" cols="30" rows="8" v-model="contactText"></textarea>
              <button class="btn btn-primary" @click="sendContactMessage">Absenden</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {mapActions, mapGetters} from "vuex";
import MessageModal from "@/components/members/container/MessageModal";

export default {
  name: "ContactModal",
  components: {MessageModal},
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      contactText: '',
      showModalValue: false,
      modalMessage: '',
      errorValue: false,
      successValue: false
    }
  },
  computed: {
    ...mapGetters(['getContactMessage']),
  },
  watch: {
    getContactMessage(newVal) {
      this.showModalValue = true;
      this.modalMessage = newVal;
      this.errorValue = false;
      this.successValue = true;

      setTimeout(() => {
        this.showModalValue = false;
      }, 3000);
    }
  },
  methods: {
    ...mapActions(['sendContactMail']),
    sendContactMessage() {
      if (this.firstName !== '' && this.lastName !== '' && this.email !== '' && this.contactText !== '') {
        let data = {
          'firstName': this.firstName,
          'lastName': this.lastName,
          'email': this.email,
          'message': this.contactText
        }

        this.sendContactMail(data)
      } else {

        this.showModalValue = true;
        this.modalMessage = 'Bitte fülle alle Felder aus';
        this.errorValue = true;
        this.successValue = false;

        setTimeout(() => {
          this.showModalValue = false;
        }, 3000);
      }
    }
  }
}
</script>

<style scoped>
#contact {
  color: #000;
}
.modal-dialog {
  min-width: 45vw;
}
.modal-content {
  min-height: 70vh;
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
.btn-secondary {
  padding: 15px 40px;
  font-size: 16px;
  background-color: #a21d21;
}

.btn-default {
  border: 1px solid #a21d21;
}

.btn-primary {
  padding: 15px 40px;
  font-size: 16px;
  background-color: #a21d21;
}
.modal-header h5 {
  color: #000;
}
.form-control {
  margin-bottom: 20px;
}
.contact-form {
  display: flex;
  flex-direction: column;
}
.content-text {
  color:#000;
  margin-bottom: 20px;
  display: flex;
  align-content: flex-start;
}
</style>