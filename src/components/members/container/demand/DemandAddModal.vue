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
            <div class="mb-3 d-flex row">
              <div class="col-xs-12 col-lg-5">
                <input type="text" placeholder="Titel" class="form-control" id="requestTitle" v-model="title">
              </div>
              <div class="col-2"></div>
              <div class="col-xs-12 col-lg-5">
                <input type="date" class="form-control" id="requestDate" v-model="date">
              </div>
            </div>
            <div class="mb-3 d-flex row">
              <div class="col-xs-12 col-lg-5">
                <input type="text" placeholder="Name" class="form-control" id="requestName" v-model="name">
              </div>
            </div>
            <div class="mb-3">
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
//import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Editor from 'ckeditor5-custom-build/build/ckeditor'
import {mapActions, mapGetters} from "vuex";

export default {
  name: "DemandAddModal",
  data() {
    return {
      requestEditor: Editor,
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
        this.$parent.hideSpinner();
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
      this.clearFields();
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
    clearFields() {
      this.images = [
        {
          'id': 0
        }
      ];
      this.title = null;
      this.name = null;
      this.date = null;
      this.text = '';
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
</style>