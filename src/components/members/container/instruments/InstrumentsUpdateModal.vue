<template>
  <div class="modal fade" id="updateInstrument" tabindex="-1" aria-labelledby="updateInstrument" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="updateInstrumentLabel">Instrument bearbeiten</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3 d-flex row">
              <div class="col-xs-12 col-lg-5">
                <input type="text" placeholder="Titel" class="form-control" id="instrumentTitle" v-model="instrumentTitle">
              </div>
              <div class="col-2"></div>
              <div class="col-xs-12 col-lg-5">
                <input type="date" class="form-control" id="instrumentDate" v-model="instrumentDate">
              </div>
            </div>
            <div class="mb-3 d-flex row">
              <div class="col-xs-12 col-lg-5">
                <input type="text" placeholder="Spender" class="form-control" id="instrumentDonator" v-model="instrumentDonator">
              </div>
              <div class="col-2"></div>
              <div class="col-lg-2 col-xs-6 d-flex justify-content-start">
                <label for="instrumentIsTaken-update" class="col-form-label">Vergeben</label>
              </div>
              <div class="col-1 d-flex">
                <input type="checkbox" id="instrumentIsTaken-update">
              </div>
            </div>
            <div class="row mb-3" v-show="showPreviewImage">
              <div class="col-md-3 d-flex justify-content-start">
                <label class="col-form-label">Bisheriges Bild</label>
              </div>
              <div class="col-md-5 d-flex justify-content-start" ref="previousInstrumentImage">
                <img src="" class="previousImage">
              </div>
              <div class="col-md-1">
                <div class="icon">
                  <font-awesome-icon class="delete-icon" icon="trash" @click="deleteImage()" />
                </div>
              </div>
            </div>

            <div class="row mb-3" v-show="!showPreviewImage">
              <div class="col-md-3 d-flex justify-content-start">
                <label class="col-form-label">Neues Bild</label>
              </div>
              <div class="col-md-5">
                <input type="file" class="form-control" ref="newsImage" id="newsImage" @change="handleFile()">
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer justify-content-between">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Schließen</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="updateInstrument">Speichern</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "InstrumentsUpdateModal",
  props: ['instrumentDetail', 'instrumentUpdateId'],
  data() {
    return {
      instrumentDate: '',
      instrumentTitle: '',
      instrumentDonator: '',
      image: '',
      showPreviewImage: false,
      file: '',
      formData: null,
      instrumentImageDelete: false,
    }
  },
  computed: {
    ...mapGetters(['getInstrumentUpdate'])
  },
  watch: {
    instrumentDetail(newVal) {
      let date = new Date(newVal.instrumentDate);

      this.instrumentDate = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
      this.instrumentTitle = newVal.instrumentTitle;
      this.instrumentDonator = newVal.donator;
      document.querySelector('#instrumentIsTaken-update').checked = newVal.taken;

      this.image = newVal.instrumentImage;

      if (newVal.instrumentImage) {
        this.showPreviewImage = true;
        this.$refs.previousInstrumentImage.querySelector('.previousImage').setAttribute('src', "data:image/jpg;base64," + this.image);
      }
    },
    getInstrumentUpdate() {
      this.$parent.loadInstruments();
      this.$parent.hideSpinner();
      this.file = null;
    }
  },
  methods: {
    ...mapActions(['updateInstrumentEntry']),
    deleteImage() {
      this.$refs.previousInstrumentImage.querySelector('.previousImage').setAttribute('src', '');
      this.showPreviewImage = false;
      this.instrumentImageDelete = true;
    },
    handleFile() {
      this.file = this.$refs.newsImage.files[0];
      this.instrumentImageDelete = false;
    },
    updateInstrument() {
      let isTaken = document.querySelector('#instrumentIsTaken-update').checked;
      this.$parent.showSpinner();
      this.formData = new FormData();
      this.formData.append('instrumentUpdateId', this.instrumentUpdateId);
      if (typeof this.file !== 'undefined') {
        this.formData.append('file', this.file);
      }

      let data = {
        instrumentTitle: this.instrumentTitle,
        instrumentDate: this.instrumentDate + "T00:00:00",
        donator: this.instrumentDonator,
        taken: isTaken
      }

      this.formData.append('instrumentData', JSON.stringify(data));
      this.formData.append('instrumentImageDelete', this.instrumentImageDelete);
      this.updateInstrumentEntry(this.formData);
    }
  }
}
</script>

<style scoped>
.modal-dialog {
  min-width: 70vw;
}
.modal-content {
  min-height: 20vh;
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
.btn-primary:focus, .btn-primary:active {
  background-color: #a21d21;
  border-color: #a21d21;
  box-shadow: none;
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

.hidden {
  display: none;
}

.imageItem {
  display: flex;
  margin-bottom: 10px;
}
.icon {
  display: flex;
  align-items: center;
  margin-left: 5rem;
}
.delete-icon {
  font-size: 1.5rem;
  cursor: pointer;
  color: #a21d21;
}
#blogIsPublic {
  margin-top:10px;
}
.previousImage {
  max-height: 100px;
}
</style>