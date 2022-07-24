<template>
  <div class="navigation">
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container-fluid">
        <MessageModal
            :showModalValue=showModalValue
            :message=modalMessage
            :error=errorValue
            :success=successValue
        />
        <UserMenu />
        <div class="sidebar-buttons">
          <ul class="navbar-nav">
            <li @click="handleToggle('apply')" class="nav-item">
              Bewerben
            </li>
            <li @click="handleToggle('donate')" class="nav-item">
              Spenden
            </li>
          </ul>
        </div>

        <Transition name="content-fade">
          <div v-if="applyIsActive" class="sidebar-content">
            <h2>Bewerben</h2>
            <div class="content-text">
              Du möchtest dich für ein Instrument bewerben?<br>
              Dann schreib uns einfach eine Nachricht.
            </div>
            <div class="contact-form">
              <input class="form-control" placeholder="Name" v-model="firstName">
              <input class="form-control" placeholder="Vorname" v-model="lastName">
              <input class="form-control" placeholder="E-Mail Adresse" v-model="email">
              <textarea placeholder="Nachricht" cols="30" rows="8" v-model="applyText"></textarea>
              <button class="btn btn-primary" @click="sendApplyForm">Absenden</button>
            </div>
          </div>
        </Transition>
        <Transition name="content-fade">
          <div v-if="donateIsActive" class="sidebar-content">
            <h2><span class="highlight">Unterstütze</span> uns mit deiner Spende!</h2>

            <h3>Spendenkonto</h3>

            <h4>The Guitar Hearts Project e.V</h4>
            <h4>IBAN: DE81510500150688153089</h4>
            <h4>Nassauische Sparkasse</h4>
            <br>
            <div class="dontate-description">
              Spendenquittungen können über die E-Mail Adresse guitarheartsproject@outlook.de angefordert werden.
            </div>
          </div>
        </Transition>

      </div>
    </nav>
  </div>
</template>

<script>
import UserMenu from "@/components/members/container/user/UserMenu";
import {mapActions, mapGetters} from "vuex";
import MessageModal from "@/components/members/container/MessageModal";
export default {
  name: "Navigation",
  data() {
    return {
      applyIsActive: false,
      donateIsActive: false,
      show: false,
      firstName: '',
      lastName: '',
      email: '',
      applyText: '',
      showModalValue: false,
      modalMessage: '',
      errorValue: false,
      successValue: false
    }
  },
  components: {MessageModal, UserMenu} ,
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
    handleToggle(value) {

      if(value === 'apply') {
        this.applyIsActive = !this.applyIsActive;
        if (this.donateIsActive) {
          this.donateIsActive = false;
        }
      }

      if(value === 'donate') {
        this.donateIsActive = !this.donateIsActive;
        if(this.applyIsActive) {
          this.applyIsActive = false;
        }
      }
    },
    sendApplyForm() {
      if (this.firstName !== '' && this.lastName !== '' && this.email !== '' && this.applyText !== '') {
        let data = {
          'firstName': this.firstName,
          'lastName': this.lastName,
          'email': this.email,
          'message': this.applyText
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
  .navbar {
    width: 100%;
    background-color: transparent;
  }
  #navbarSupportedContent {
    justify-content: flex-end;
  }
  .nav-link {
    font-size: 20px;
    font-weight: bold;
    margin-top: auto;
    margin-bottom: auto;
  }
  .navbar-nav {
    margin-right: 5vw;
  }
  .navigation {
    position: fixed;
    z-index: 1000;
    width:100%;
  }
  .nav-item {
    padding: 10px;
    cursor: pointer;
  }

  .sidebar-buttons li {
    margin: 15px;
    font-weight: bold;
    font-size: 20px;
    color: #fff;
    background-color: #a21d21;
    padding: 10px;
    border-radius: 5px;
  }

  .sidebar-content {
    width: 40vw;
    height: 65vh;
    background-color: #fff;
    position: fixed;
    right: 0;
    top: 80px;
    border-radius: 5px;
    border: 2px solid #a21d21;
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: 15px;
  }

  .sidebar-content h2 {
    font-weight: bold;
    color: #a21d21;
    text-align: left;
  }

  .sidebar-content h3 {
    font-weight: bold;
    margin-top: 30px;
    margin-bottom: 20px;
  }

  .sidebar-content .content-text {
    text-align: left;
    margin-bottom: 30px;
  }

  .sidebar-content .contact-form {
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  .sidebar-content .contact-form input {
    margin-bottom: 10px;
  }

  .content-fade-enter-active,
  .content-fade-leave-active {
    transition: height 0.3s ease;
  }

  .content-fade-enter-from,
  .content-fade-leave-to {
    height: 0;
  }

  .btn {
    font-weight: bold;
    border-radius: 5px;
    border: none;
    margin-top: 20px;
  }

  .btn-primary {
    padding: 15px 40px;
    font-size: 16px;
    background-color: #a21d21;
  }

  .dontate-description {
    text-align: left;
    margin-top: 40px;
  }

  /*mobile*/
  @media only screen and (max-width: 992px) {
    .navbar-nav {
      flex-direction: row;
    }

    .sidebar-content {
      width: 100vw;
    }
  }
</style>