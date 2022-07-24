<template>
  <div class="modal fade" id="addDemand" tabindex="-1" aria-labelledby="addDemand" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addDemandLabel">Neue Anfrage</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3 d-flex">
              <div class="col-1 justify-content-start">
                <label for="requestTitle" class="col-form-label">Titel</label>
              </div>
              <div class="col-5">
                <input type="text" class="form-control" id="requestTitle" v-model="title">
              </div>
              <div class="col-1 justify-content-start">
                <label for="requestDate" class="col-form-label">Datum</label>
              </div>
              <div class="col-5">
                <input type="date" class="form-control" id="requestDate" v-model="date">
              </div>
            </div>
            <div class="mb-3 d-flex">
              <div class="col-1 justify-content-start">
                <label for="requestName" class="col-form-label">Name</label>
              </div>
              <div class="col-5">
                <input type="text" class="form-control" id="requestName" v-model="name">
              </div>
            </div>
            <div class="mb-3">
              <div class="col-1 justify-content-start">
                <label class="col-form-label">Text:</label>
              </div>
              <ckeditor :editor="requestEditor" :config="editorConfig" v-model="text"></ckeditor>
            </div>
            <div class="col-12" ref="demandImages" id="demandImages">
              <div v-for="item in images" v-bind:key="item" @change="addNewImageItem" class="imageItem">
                <div class="inputField">
                  <input type="file" class="form-control upload-file-demand">
                </div>
                <div class="icon">
                  <font-awesome-icon class="delete-icon" icon="trash" @click="deleteImage(item)" />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer justify-content-between">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Schließen</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="insertDemand">Speichern</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "DemandAddModal",
  data() {
    return {
      requestEditor: ClassicEditor,
      editorConfig: {},
      images: [
        {
          'id': 0
        }
      ],
      title: null,
      name: null,
      date: null,
      text: ''
    };
  },
  computed: {
    ...mapGetters(['getDemandInsert', 'getDemandMessage'])
  },
  watch: {
    getDemandMessage(newVal) {
      if (newVal) {
        this.$parent.modalMessage = newVal.message;
        this.$parent.errorValue = newVal.error;
        this.$parent.successValue = newVal.success;
        this.$parent.showModalValue = true;
        setTimeout(() => {
          this.$parent.showModalValue = false;
          if (newVal.redirect) {
            this.$router.push(newVal.redirect);
          }
        }, 3000);
      }
    },
    getDemandInsert() {
      this.$parent.loadDemand();
      this.$parent.hideSpinner();
    }
  },
  methods: {
    ...mapActions(['insertNewDemandEntry']),
    checkField(input, inputWrapper) {
      if (input.length <= 0) {
        inputWrapper.querySelector('.errorMsg').innerHTML = "Dieses Feld muss ausgefüllt sein";
        return false;
      } else {
        inputWrapper.querySelector('.errorMsg').innerHTML = "";
        return true;
      }
    },
    addNewImageItem() {
      const element = {
        'id' : this.images.length
      }
      this.images.push(element);
    },
    deleteImage(item) {
      if (this.images.length !== 1) {
        this.images = this.images.filter((value) => {
          return item.id !== value.id;
        });
      } else {
        this.images = [{'id': 0}]
      }
    },
    insertDemand() {
      this.$parent.showSpinner();
      let formData = new FormData();
      let data = [];
      let fileItems = document.querySelectorAll('.upload-file-demand');

      fileItems.forEach((item) => {
        if (typeof item.files[0] !== "undefined") {
          formData.append('files', item.files[0]);
        }
      });

      data = {
        'demandName': this.name,
        'demandDate': this.date + "T00:00:00",
        'demandTitle': this.title,
        'demandText': this.text
      }
      formData.append('demandData', JSON.stringify(data));

      this.insertNewDemandEntry(formData);

    }
  },
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
</style>