<template>
  <div class="col-12 col-md-12 col-lg-12 ghp-container">
    <div class="page-header">
      <h2>Guitar Hearts Instrumente</h2>
      <font-awesome-icon class="add-icon" icon="circle-plus" data-bs-toggle="modal" data-bs-target="#addInstrument" />
    </div>
    <div class="instrument-list">
      <div class="instrument-item" v-for="instrument in instrumentsArray" v-bind:key="instrument">
        <div class="admin-buttons">
          <div class="buttons">
            <div class="update-instrument">
              <font-awesome-icon class="update-icon" icon="pen" data-bs-toggle="modal" data-bs-target="#updateInstrument" />
            </div>
            <div class="delete-instrument">
              <font-awesome-icon class="delete-icon" icon="trash" @click="setInstrumentId(instrument.id)" data-bs-toggle="modal" data-bs-target="#deleteInstrument" />
            </div>
          </div>
        </div>
        <div class="instrument-teaser-image">
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

</template>

<script>
import InstrumentsAddModal from "@/components/members/container/instruments/InstrumentsAddModal";
import {mapActions, mapGetters} from "vuex";
import InstrumentDeleteModal from "@/components/members/container/instruments/InstrumentDeleteModal";
export default {
  name: "Instruments",
  components: {InstrumentDeleteModal, InstrumentsAddModal},
  data() {
    return {
      instrumentsArray: [],
      instrumentId: null
    }
  },
  computed: {
    ...mapGetters(['getInstruments'])
  },
  watch: {
    getInstruments(newVal) {
      this.instrumentsArray = this.setInstrumentsArray(newVal);
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
      console.log(this.instrumentId);
    }
  }
}
</script>

<style scoped>
.ghp-container {
  background-color: #fff;
  height: 60vh;
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
}
.instrument-item {
  min-width: 20rem;
  max-width: 20rem;
  min-height: 25rem;
  max-height: 25rem;
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
.instrument-teaser-image {
  max-height: 200px;
  min-height: 200px;
}
.instrument-teaser-image img {
  border-radius: 6px;
  max-width: 250px;
}
.instrument-teaser-header {
  text-align: center;
  height: 5rem;
  font-size: 18px;
  color: #a21d21;
  font-weight: bold;
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
</style>