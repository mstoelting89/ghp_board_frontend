<template>
  <div class="col-12 col-md-12 col-lg-12 ghp-container">
    <MessageModal
        :showModalValue=showModalValue
        :message=modalMessage
        :error=errorValue
        :success=successValue
    />
    <div class="page-header">
      <h2><span class="first-word">Guitar</span> Hearts Instrumente</h2>
      <font-awesome-icon class="add-icon" v-if="userLevel === 'ADMIN' && currentRouteName === 'Dashboard'" icon="circle-plus" data-bs-toggle="modal" data-bs-target="#addInstrument" />
    </div>
    <div class="instrument-list">

      <div class="loadingSpinner">
        <font-awesome-icon class="spinner-icon" icon="circle-notch" />
      </div>

      <div class="instrument-item" v-for="instrument in instrumentsArray" v-bind:key="instrument">
        <div class="admin-buttons">
          <div class="buttons">
            <div class="update-instrument">
              <font-awesome-icon class="update-icon" v-if="userLevel === 'ADMIN' && currentRouteName === 'Dashboard'" icon="pen" @click="getDetailInstrument(instrument.id)" data-bs-toggle="modal" data-bs-target="#updateInstrument" />
            </div>
            <div class="delete-instrument">
              <font-awesome-icon class="delete-icon" v-if="userLevel === 'ADMIN' && currentRouteName === 'Dashboard'" icon="trash" @click="setInstrumentId(instrument.id)" data-bs-toggle="modal" data-bs-target="#deleteInstrument" />
            </div>
          </div>
        </div>
        <div class="donator">
          <div class="donator-text">Gespendet von: </div><div class="donator-name">{{ instrument.donator }}</div>
        </div>
        <div class="instrument-teaser-image">
          <img src="@/assets/stempel.png" v-if="setImagePath(instrument.instrumentImage) !== false && instrument.taken === true" class="takenInstrument" />
          <img v-if="setImagePath(instrument.instrumentImage) !== false" class="previewImage" :src="setImagePath(instrument.instrumentImage)" />
          <img v-else src="@/assets/images/BilderLars/1428062250527.png" />
        </div>
        <div class="instrument-teaser-content col-md-12">
          <div class="instrument-teaser-header">
            {{ instrument.instrumentTitle }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <InstrumentsAddModal />
  <InstrumentDeleteModal
    :instrumentDeleteId="instrumentId"
  />
  <InstrumentsUpdateModal
      :instrumentUpdateId="instrumentId"
      :instrumentDetail="instrumentDetail"
  />
</template>

<script>
import InstrumentsAddModal from "@/components/members/container/instruments/InstrumentsAddModal";
import {mapActions, mapGetters} from "vuex";
import InstrumentDeleteModal from "@/components/members/container/instruments/InstrumentDeleteModal";
import InstrumentsUpdateModal from "@/components/members/container/instruments/InstrumentsUpdateModal";
import MessageModal from "@/components/members/container/MessageModal";
export default {
  name: "Instruments",
  components: {MessageModal, InstrumentsUpdateModal, InstrumentDeleteModal, InstrumentsAddModal},
  data() {
    return {
      instrumentsArray: [],
      instrumentId: null,
      instrumentDetail: [],
      userLevel: localStorage.getItem('userRole'),
      modalMessage: '',
      showModalValue: false,
      successValue: false,
      errorValue: false
    }
  },
  computed: {
    ...mapGetters(['getInstruments']),
    currentRouteName() {
      return this.$route.name;
    }
  },
  watch: {
    getInstruments(newVal) {
      this.instrumentsArray = this.setInstrumentsArray(newVal);
      this.hideLoadingSpinner();
    }
  },
  async created() {
    await this.getInstrumentsFromService();
  },
  methods: {
    ...mapActions(['getInstrumentsFromService']),
    loadInstruments() {
      this.getInstrumentsFromService()
    },
    setInstrumentsArray(data) {
      let results = [];
      data.data.forEach(instrument => {
        results.push(Object.assign({}, instrument));
      })
      return results;
    },
    setImagePath(image) {
      if (image === null) {
        return false;
      }
      return "data:image/jpg;base64," + image;
    },
    setInstrumentId(id) {
      this.instrumentId = id;
    },
    getDetailInstrument(id) {
      this.instrumentId = id;
      const blog = this.instrumentsArray.filter(item => item.id === id);
      this.instrumentDetail = blog[0];
    },
    showSpinner() {
      this.$parent.showSpinner();
    },
    hideSpinner() {
      this.$parent.hideSpinner();
    },
    showLoadingSpinner() {
      //let spinner = document.querySelector('.loadingSpinner');
    },
    hideLoadingSpinner() {
      let spinner = document.querySelector('.loadingSpinner');
      spinner.classList.add('hidden');
    }
  }
}
</script>

<style scoped>
.first-word {
  font-weight: 600;
  color: #a21d21;
}
.ghp-container {
  background-color: #fff;
  height: 55vh;
  min-height: 55vh;
  border-radius: 5px;
}
.page-header {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
.add-icon {
  font-size: 35px;
  color: #a21d21;
  cursor: pointer;
}
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
.instrument-list {
  display: flex;
  scrollbar-color:#a21d21 #000;
  margin: 0;
  overflow-x: scroll;
  overflow-y: hidden;
  padding-top: 3rem;
  padding-bottom: 3rem;
  color: #000;
  position: relative;
  height: 100%;
}
.instrument-item {
  min-width: 20rem;
  max-width: 20rem;
  min-height: 24rem;
  max-height: 24rem;
  box-shadow: -5px 1px 5px 0px #000;
  padding: 1rem;
  border-radius: 16px;
  background-color: #fff;
  transition: .2s;
  margin-bottom: 0.5rem;
  margin-left: 8px;
}
.instrument-item:hover {
  margin-right: 40px;
  margin-left: 40px;
  transform: scale(1.1);
}
.donator {
  display: flex;
  font-size: 14px;
  margin-bottom: 10px;
  height: 45px;
}
.donator-name {
  margin-left: 5px;
}
.instrument-teaser-image {
  max-height: 200px;
  min-height: 200px;
  position: relative;
  display: flex;
  justify-content: center;
}
.instrument-teaser-image img {
  border-radius: 6px;
  max-width: 250px;
  max-height: 200px;
}
.instrument-teaser-header {
  text-align: center;
  height: 5rem;
  font-size: 18px;
  color: #a21d21;
  font-weight: bold;
  margin-top: 10px;
}
.instrument-teaser-date {
  font-size: 12px;
  text-align: left;
}
.instrument-teaser-text {
  text-align: left;
  min-height: 150px;
  max-height: 150px;
}
.instrument-teaser-further-link {
  cursor: pointer;
  text-align: left;
  font-size: 16px;
  font-weight: bold;
  color: #a21d21;
}
.admin-buttons {
  display: flex;
  justify-content: space-between;
}
.admin-buttons .buttons {
  display: flex;
}
.admin-buttons .blog-public {
  background-color: #fff;
  color: #a21d21;
  font-size:18px;
  border-radius: 5px;
  margin-left: 5px;
  margin-top: 1px;
}
.admin-buttons .blog-public .public, .admin-buttons .blog-public .not-public {
  margin-left:10px;
}
.admin-buttons .update-icon,
.admin-buttons .delete-icon {
  background-color: #fff;
  color: #a21d21;
  padding:7px;
  font-size:28px;
  border-radius: 5px;
  margin-left: 5px;
  margin-top: 1px;
  cursor: pointer;
}
.hidden {
  display: none;
}
.takenInstrument {
  position:absolute;
  transform: rotate(-25deg);
}

.loadingSpinner {
  position: absolute;
  width:150px;
  height:150px;
  top: 40%;
  left: 50%;
  background-color: #fff;
  z-index:51000;
}

.spinner-icon {
  font-size: 50px;
  color: #a21d21;
  margin-top: 30%;
  animation: loader 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
}
@keyframes loader {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/*mobile*/
@media only screen and (max-width: 992px) {
  .ghp-container {
    height: 60vh;
  }
}
</style>