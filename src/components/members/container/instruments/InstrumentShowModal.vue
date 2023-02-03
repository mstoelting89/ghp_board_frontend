<template>
  <div class="modal fade" id="showInstrument" tabindex="-1" aria-labelledby="showInstrument" aria-hidden="true">
    <div class="modal-dialog">
      <div class="col-md-5 d-flex justify-content-start" ref="instrumentImageData">
        <img src="" class="image">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InstrumentShowModal",
  props: ['instrumentDetail'],
  data() {
    return {
      image: ''
    }
  },
  watch: {
    instrumentDetail(newVal) {
      if (newVal.instrumentImage) {
        this.showPreviewImage = true;
        this.$refs.instrumentImageData.querySelector('.image').setAttribute('src', "data:image/jpg;base64," + newVal.instrumentImage);
      }
    }
  }
}
</script>

<style scoped>
.image {
  width: 50vw;
  height: auto;
}
.modal-dialog {
  margin-left: 25vw;
  margin-right: 25vw;
}
/*mobile*/
@media only screen and (max-width: 992px) {
  .image {
    width: 90vw;
  }
  .modal-dialog {
    margin-left: 5vw;
    margin-right: 5vw;
    margin-top: 30vw;
  }
}
</style>