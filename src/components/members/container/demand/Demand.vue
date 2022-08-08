<template>
  <div class="col-12 col-md-12 col-lg-5 ghp-container">
    <MessageModal
        :showModalValue=showModalValue
        :message=modalMessage
        :error=errorValue
        :success=successValue
    />
    <div class="page-header">
      <h2><span class="first-word">Guitar</span> Hearts Anfragen</h2>
      <font-awesome-icon v-if="userLevel === 'ADMIN'" class="add-icon" icon="circle-plus" data-bs-toggle="modal" data-bs-target="#addDemand" />
    </div>
    <div class="demandEntry" v-for="demandEntry in demandArray" v-bind:key="demandEntry">
      <div class="demandEntryHeader row">
        <div class="demandEntryDate">{{ demandEntry.demandDate }}</div>
      </div>
      <div class="demandEntryMain row">
        <div class="demandEntryTitle col-lg-5">{{ demandEntry.demandTitle }}</div>
        <div class="buttons col-lg-7">
          <div class="accept" :data-demand-id="demandEntry.id" @click="setDemandLike(1, demandEntry.id)" :class="demandEntry.personalVote === 1 ? 'active' : ''">
            <font-awesome-icon class="accept-icon" icon="thumbs-up" />
            <div class="like-counter" >
              {{ demandEntry.likes }}
            </div>
          </div>
          <div class="delicine" :data-demand-id="demandEntry.id" @click="setDemandLike(0, demandEntry.id)" :class="demandEntry.personalVote === 0 ? 'active' : ''">
            <font-awesome-icon class="delicine-icon"  icon="thumbs-down" />
            <div class="like-counter" >
              {{ demandEntry.dislikes }}
            </div>
          </div>
          <div class="show-demand">
            <button class="btn btn-secondary" @click="getDetailDemand(demandEntry.id)" data-bs-toggle="modal" data-bs-target="#showDemand">mehr lesen</button>
          </div>
          <div class="update-demand">
            <font-awesome-icon class="update-icon" v-if="userLevel === 'ADMIN' || userLevel === 'REDAKTEUR'" @click="getDetailDemand(demandEntry.id)" icon="pen" data-bs-toggle="modal" data-bs-target="#updateDemand" />
          </div>
          <div class="delete-demand">
            <font-awesome-icon class="delete-icon" v-if="userLevel === 'ADMIN'" @click="setDemandId(demandEntry.id)" icon="trash" data-bs-toggle="modal" data-bs-target="#deleteDemand" />
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
import MessageModal from "@/components/members/container/MessageModal";

export default {
  name: "Demand",
  components: {MessageModal, DemandDeleteModal, DemandUpdateModal, DemandShowModal, DemandAddModal},
  data() {
    return {
      requestEditor: ClassicEditor,
      editorConfig: {},
      demandArray: '',
      demandDetail: {},
      demandId: null,
      likes: '',
      dislikes: '',
      userLevel: localStorage.getItem('userRole'),
      modalMessage: '',
      showModalValue: false,
      successValue: false,
      errorValue: false
    };
  },
  computed: {
    ...mapGetters(['getDemand', 'getDemandDetail', 'setDemandVotes'])
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
    },
    setDemandVotes() {
      this.loadDemand();
    }
  },
  methods: {
    ...mapActions(['getDemandFromService', 'getDemandDetailFromService', 'setDemandVote']),
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
        let personalVote = '';
        let demandDate = ("0" + date.getDate()).slice(-2) + "." + ("0" + (date.getMonth() + 1)).slice(-2) + "." + date.getFullYear();

        if (item.personalVote === true) {
          personalVote = 1;
        } else if (item.personalVote === false) {
          personalVote = 0;
        }

        let demandElement = {
          id: item.id,
          demandDate: demandDate,
          demandText: item.demandText,
          demandTitle: item.demandTitle,
          likes: item.likes,
          dislikes: item.dislikes,
          personalVote: personalVote
        }
        demandData.push(demandElement);
      });
      return demandData;
    },
    setDemandDetailArray(data) {
      let date = new Date(data.data.demandDate);
      let personalVote = '';
      let demandDate = ("0" + date.getDate()).slice(-2) + "." + ("0" + (date.getMonth() + 1)).slice(-2) + "." + date.getFullYear();

      if (data.data.personalVote === true) {
        personalVote = 1;
      } else if (data.data.personalVote === false) {
        personalVote = 0;
      }

      return  {
        'detailId': data.data.id,
        'detailTitle': data.data.demandTitle,
        'detailText': data.data.demandText,
        'detailDate': demandDate,
        'detailName': data.data.demandName,
        'detailImages': data.data.demandImages,
        'detailLike': data.data.likes,
        'detailDislike': data.data.dislikes,
        'detailPersonalVote': personalVote
      }
    },
    setDemandId(id) {
      this.demandId = id;
    },
    setDemandLike(voteValue, demandId) {
      let data = {
        'demandId': demandId,
        'voteValue': voteValue
      }
      let accept = document.querySelector('.accept[data-demand-id="' + demandId + '"]');
      let delicine = document.querySelector('.delicine[data-demand-id="' + demandId + '"]');

      if (voteValue === 1) {
        accept.classList.add('active');
        delicine.classList.remove('active');
      } else {
        delicine.classList.add('active');
        accept.classList.remove('active');
      }

      this.setDemandVote(data);
    },
    showSpinner() {
      this.$parent.showSpinner();
    },
    hideSpinner() {
      this.$parent.hideSpinner();
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
  text-align: right;
}
.demandEntryTitle {
  text-align: start;
}
.demandEntryMain {
  display: flex;
  font-size: 18px;
  justify-content: space-between;
  margin-top: 5px;
}
.demandEntryMain .buttons {
  display: flex;
  justify-content: right;
}
.demandEntryMain .btn {
  padding: 5px;
  font-size: 12px;
  background-color: #a21d21;
}

.demandEntryMain .buttons .update-icon,
.demandEntryMain .buttons .delete-icon {
  background-color: #a21d21;
  color: #fff;
  padding:7px;
  font-size:28px;
  border-radius: 5px;
  margin-left: 5px;
  margin-top: 1px;
  cursor: pointer;
}
.like-counter {
  font-size: 12px;
  margin-left: 5px;
}
.accept, .delicine {
  background-color: #fff;
  color: #a21d21;
  border-radius: 5px;
  display: flex;
  padding: 7px 10px;
  font-size:13px;
  margin-right:5px;
  height: 30px;
  cursor: pointer;
  border: 1px solid #a21d21;
}

.accept.active, .delicine.active {
  background-color: #a21d21;
  color: #fff;
}

/*mobile*/
@media only screen and (max-width: 992px) {
  .demandEntryMain .buttons {
    justify-content: left;
  }
}
</style>