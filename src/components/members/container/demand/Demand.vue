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
            <button class="btn btn-secondary" @click="getDetailDemand(demandEntry.id)" data-bs-toggle="modal" data-bs-target="#showDemand">mehr lesen</button>
          </div>
          <div class="update-demand">
            <font-awesome-icon class="update-icon" @click="getDetailDemand(demandEntry.id)" icon="pen" data-bs-toggle="modal" data-bs-target="#updateDemand" />
          </div>
          <div class="delete-demand">
            <font-awesome-icon class="delete-icon" @click="setDemandId(demandEntry.id)" icon="trash" data-bs-toggle="modal" data-bs-target="#deleteDemand" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <DemandAddModal />
  <DemandShowModal
      :demandDetail="demandDetail"
  />
  <DemandUpdateModal
      :demandDetail="demandDetail"
      :demandUpdateId="demandId"
  />
  <DemandDeleteModal
      :demandDeleteId="demandId"
  />
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DemandAddModal from "@/components/members/container/demand/DemandAddModal";
import DemandShowModal from "@/components/members/container/demand/DemandShowModal";
import {mapActions, mapGetters} from "vuex";
import DemandUpdateModal from "@/components/members/container/demand/DemandUpdateModal";
import DemandDeleteModal from "@/components/members/container/demand/DemandDeleteModal";

export default {
  name: "Demand",
  components: {DemandDeleteModal, DemandUpdateModal, DemandShowModal, DemandAddModal},
  data() {
    return {
      requestEditor: ClassicEditor,
      editorConfig: {},
      demandArray: '',
      demandDetail: {},
      demandId: null
    };
  },
  computed: {
    ...mapGetters(['getDemand', 'getDemandDetail'])
  },
  async created() {
    await this.getDemandFromService();
  },
  watch: {
    getDemand(newValue) {
      this.demandArray = this.setDemandArray(newValue);
    },
    getDemandDetail(newValue) {
      this.demandDetail = this.setDemandDetailArray(newValue);
    }
  },
  methods: {
    ...mapActions(['getDemandFromService', 'getDemandDetailFromService']),
    loadDemand() {
      this.getDemandFromService();
    },
    getDetailDemand(id) {
      this.demandId = id;
      this.getDemandDetailFromService(id);
    },
    setDemandArray(data) {
      let demandData = []
      data.data.forEach((item) => {
        let date = new Date(item.demandDate);
        let demandDate = ("0" + date.getDate()).slice(-2) + "." + ("0" + (date.getMonth() + 1)).slice(-2) + "." + date.getFullYear();
        let demandElement = {
          id: item.id,
          demandDate: demandDate,
          demandText: item.demandText,
          demandTitle: item.demandTitle
        }
        demandData.push(demandElement);
      });
      return demandData;
    },
    setDemandDetailArray(data) {
      let date = new Date(data.data.demandDate);
      let demandDate = ("0" + date.getDate()).slice(-2) + "." + ("0" + (date.getMonth() + 1)).slice(-2) + "." + date.getFullYear();

      return  {
        'detailTitle': data.data.demandTitle,
        'detailText': data.data.demandText,
        'detailDate': demandDate,
        'detailName': data.data.demandName,
        'detailImages': data.data.demandImages
      }
    },
    setDemandId(id) {
      this.demandId = id;
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