<template>
  <div class="modal fade" id="showDemand" tabindex="-1" aria-labelledby="showDemand" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <div class="row">
            <div class="demandDetailHeader">
              <div class="demandDetailTitle" v-html="demandDetail.detailTitle"></div>
            </div>
          </div>
          <div class="demandDecision">
            <div class="accept-modal" :data-demand-id="demandDetail.detailId" @click="setDetailDemandLike(1, demandDetail.detailId)" :class="demandDetail.detailPersonalVote === 1 ? 'active' : ''">
              <font-awesome-icon class="accept-icon" icon="thumbs-up" />
              <div class="like-counter" >
                {{ demandDetail.detailLike }}
              </div>
            </div>
            <div class="delicine-modal" :data-demand-id="demandDetail.detailId" @click="setDetailDemandLike(0, demandDetail.detailId)" :class="demandDetail.detailPersonalVote === 0 ? 'active' : ''">
              <font-awesome-icon class="delicine-icon"  icon="thumbs-down" />
              <div class="like-counter" >
                {{ demandDetail.detailDislike }}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="demandDetailInfo">
              <div class="demandDetailInfoEnd">
                <div class="demandDetailDate" v-html="demandDetail.detailDate"></div>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
            </div>

          </div>
        </div>
        <div class="modal-body">

          <div id="demandCarousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="false">
            <div class="carousel-inner">
              <div class="carousel-item" :class="i === 0 ? 'active':''" v-for="(image, i) in demandDetail.detailImages" v-bind:key="image">
                <div class="d-flex justify-content-center">
                  <img :src="setImageSrc(image.base64)" class="d-block w-100" alt="...">
                </div>
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#demandCarousel" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#demandCarousel" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>

          <div class="body-text" v-html="demandDetail.detailText"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "DemandShowModal",
  props: ['demandDetail'],
  computed: {
    ...mapGetters(['getDemandDetail' ,'setDemandVotes'])
  },
  watch: {
    setDemandVotes(newValue) {
      this.$parent.getDetailDemand(newValue.data.demandId);
    }
  },
  methods: {
    setImageSrc(data) {
      return "data:image/jpg;base64," + data;
    },
    setDetailDemandLike(value, demandId) {

      let accept = document.querySelector('.accept-modal[data-demand-id="' + demandId + '"]');
      let delicine = document.querySelector('.delicine-modal[data-demand-id="' + demandId + '"]');

      if (value === 1) {
        accept.classList.add('active');
        delicine.classList.remove('active');
      } else {
        delicine.classList.add('active');
        accept.classList.remove('active');
      }

      this.$parent.setDemandLike(value, demandId);

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
  margin-top: -5px;
}

#demandNews .modal-header {
  flex-direction: column;
}

#demandNews .modal-header .row {
  width: 100%;
}

.demandDetailInfo {
  display: flex;
  font-size: 12px;
  opacity: .8;
  justify-content: space-between;
}
.demandDetailHeader {
  display: flex;
  font-size: 18px;
  justify-content: space-between;
  margin-top: 5px;
}
.demandDetailInfoEnd {
  display: flex;
}
.newsDetailInfoEnd .btn-close {
  padding-top: 14px;
}
.errorMsg {
  display: flex;
  font-size: 12px;
  font-weight: bold;
  color: #a21d21;
}
.detailImage {
  width:50%;
  height:auto;
}
.body-text {
  text-align: left;
}
.carousel-item {
  background-color: #000;
}
.carousel-item img {
  max-height: 400px;
  width: auto!important;
}
.demandDecision {
  display: flex;
}
.like-counter {
  font-size: 12px;
  margin-left: 5px;
}
.accept-modal, .delicine-modal {
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

.accept-modal.active, .delicine-modal.active {
  background-color: #a21d21;
  color: #fff;
}
</style>