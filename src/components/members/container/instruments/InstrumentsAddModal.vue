<template>
  <div class="modal fade" id="addInstrument" tabindex="-1" aria-labelledby="addInstrument" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addInstrumentLabel">Neues Instrument</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3 d-flex">
              <div class="col-1 d-flex justify-content-start">
                <label for="instrumentTitle" class="col-form-label">Titel</label>
              </div>
              <div class="col-5">
                <input type="text" class="form-control" id="instrumentTitle" v-model="instrumentTitle">
              </div>
              <div class="col-1 justify-content-start">
                <label for="instrumentDate" class="col-form-label">Datum</label>
              </div>
              <div class="col-5">
                <input type="date" class="form-control" id="instrumentDate" v-model="instrumentDate">
              </div>
            </div>
            <div class="mb-3 d-flex">
              <div class="col-1 d-flex justify-content-start">
                <label for="instrumentImage" class="col-form-label">Bild</label>
              </div>
              <div class="col-5">
                <input type="file" class="form-control" ref="instrumentImage" id="instrumentImage" @change="handleFile">
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer justify-content-between">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Schließen</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="insertNewInstrument">Speichern</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "InstrumentsAddModal",
  data() {
    return {
      instrumentTitle: '',
      instrumentDate: '',
      file: null
    }
  },
  computed: {
    ...mapGetters(['getInstrumentInsert'])
  },
  watch: {
    getInstrumentInsert() {
      this.$parent.loadInstruments();
    }
  },
  methods: {
    ...mapActions(['insertInstrument']),
    insertNewInstrument() {
      this.formData = new FormData();
      console.log(this.file);
      this.formData.append('file', this.file);
      let data = {
        instrumentTitle: this.instrumentTitle,
        instrumentDate: this.instrumentDate + "T00:00:00",
      }
      this.formData.append('instrumentData', JSON.stringify(data));
      this.insertInstrument(this.formData);
    },
    handleFile() {
      this.file = this.$refs.instrumentImage.files[0];
    },
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
</style>