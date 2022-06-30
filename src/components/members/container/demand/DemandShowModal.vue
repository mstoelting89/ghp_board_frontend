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
          <div class="body-image">
            <img class="detailImage" src="{{ demandDetail.detailImage }}" id="detailImage">
          </div>
          <div class="body-text" v-html="demandDetail.detailText"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DemandShowModal",
  props: ['demandDetail'],
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
</style>