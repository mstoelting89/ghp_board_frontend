<template>
  <div class="col-12 col-md-12 col-lg-5 ghp-container">
    <div class="page-header">
      <h2>Guitar Hearts Anfragen</h2>
      <font-awesome-icon class="add-icon" icon="circle-plus" data-bs-toggle="modal" data-bs-target="#addDemand" />
    </div>
    <div class="demandEntry" v-for="demandEntry in demandArray" v-bind:key="demandEntry">
      <div class="demandEntryHeader">
        <div class="demandEntryDate">{{ demandEntry.demandDate }}</div>
      </div>
      <div class="demandEntryMain">
        <div class="demandEntryTitle">{{ demandEntry.demandTitle }}</div>
        <div class="buttons">
          <div class="show-demand">
            <button class="btn btn-secondary" @click="getDemandDetail(demandEntry.id)" data-bs-toggle="modal" data-bs-target="#showDemand">mehr lesen</button>
          </div>
          <div class="update-demand">
            <font-awesome-icon class="update-icon"   icon="pen" data-bs-toggle="modal" data-bs-target="#updateDemand" />
          </div>
          <div class="delete-demand">
            <font-awesome-icon class="delete-icon" icon="trash" data-bs-toggle="modal" data-bs-target="#deleteDemand" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <DemandAddModal />
  <DemandShowModal
      :demandDetail="demandDetail"
  />
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DemandAddModal from "@/components/members/container/demand/DemandAddModal";
import DemandShowModal from "@/components/members/container/demand/DemandShowModal";

export default {
  name: "Demand",
  components: {DemandShowModal, DemandAddModal},
  data() {
    return {
      requestEditor: ClassicEditor,
      editorConfig: {},
      demandArray: '',
      demandDetail: {}
    };
  },
  async created() {
    await this.$store.dispatch('getDemand').then(response => {
      this.demandArray = this.loadDemands(response);
    })
  },
  methods: {
    loadDemands(response) {
      let data = [];
      response.data.forEach((item) => {
        let date = new Date(item.demandDate);
        let demandDate = ("0" + date.getDate()).slice(-2) + "." + ("0" + (date.getMonth() + 1)).slice(-2) + "." + date.getFullYear();
        let demandElement = {
          id: item.id,
          demandDate: demandDate,
          demandText: item.demandText,
          demandTitle: item.demandTitle
        }
        data.push(demandElement);
      });
      this.demandArray = data;
      return data;
    },
    getDemandDetail(id) {
      this.$store.dispatch('getDemandDetail', id).then(response => {
        let date = new Date(response.data.demandDate);
        let demandDate = ("0" + date.getDate()).slice(-2) + "." + ("0" + (date.getMonth() + 1)).slice(-2) + "." + date.getFullYear();

        this.demandDetail.detailTitle = response.data.demandTitle;
        this.demandDetail.detailText = response.data.demandText;
        this.demandDetail.detailDate = demandDate;
      });
    }
  }
}
</script>

<style scoped>
.ghp-container {
  background-color: #fff;
  height: 50vh;
  border-radius: 5px;
  overflow: scroll;
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
.demandEntry {
  border-bottom: 1px solid #454545;
  padding-bottom: 5px;
}
.demandEntryHeader {
  display: flex;
  font-size: 12px;
  opacity: .8;
  justify-content: space-between;
}

.demandEntryMain {
  display: flex;
  font-size: 18px;
  justify-content: space-between;
  margin-top: 5px;
}
.demandEntryMain .buttons {
  display: flex;
}
.demandEntryMain .btn {
  padding: 5px;
  font-size: 12px;
  background-color: #a21d21;
}
.demandEntryMain .buttons .update-icon, .demandEntryMain .buttons .delete-icon {
  background-color: #a21d21;
  color: #fff;
  padding:7px;
  font-size:28px;
  border-radius: 5px;
  margin-left: 5px;
  margin-top: 1px;
  cursor: pointer;
}
</style>