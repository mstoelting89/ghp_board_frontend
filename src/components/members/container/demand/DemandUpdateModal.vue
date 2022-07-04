<template>
  <div class="modal fade" id="updateDemand" tabindex="-1" aria-labelledby="updateDemand" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="updateDemandLabel">Neue Anfrage</h5>
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
              <ckeditor :editor="demandEditor" :config="editorConfig" v-model="text"></ckeditor>
            </div>
            <div class="col-12 imageAdministration" ref="demandImages" v-for="item in image" v-bind:key="item">
              <div class="col-md-6 imagePreviewWrapper">
                <img :src="setImagePath(item.base64)" :data-image-id="item.id" class="imagePreview">
              </div>
              <div class="col-md-3 icon">
                <font-awesome-icon class="delete-icon" icon="trash" @click="deleteImage(item.id, true)" />
              </div>
            </div>
            <div class="furtherImage" v-for="(item) in imagesItems" v-bind:key="item" @change="addNewImageItem">
              <div class="col-md-6 inputField">
                <input type="file" class="form-control upload-file">
              </div>
              <div class="icon col-md-3">
                <font-awesome-icon class="delete-icon" icon="trash" @click="deleteImage(item.id, false)" />
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer justify-content-between">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Schließen</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="updateDemand">Speichern</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "DemandUpdateModal",
  props: ['demandDetail', 'demandUpdateId'],
  data() {
    return  {
      demandEditor: ClassicEditor,
      editorData: '',
      editorConfig: {},
      date: '',
      name: '',
      text: '',
      title: '',
      image: '',
      imagesItems: [{'id': 0}]
    }
  },
  computed: {
    ...mapGetters(['getDemandUpdate'])
  },
  watch: {
    demandDetail(newVal) {
      let dateStr = newVal.detailDate.split('.');
      let date = new Date(dateStr[2] + "-" + dateStr[1] + "-" + dateStr[0]);

      this.title = newVal.detailTitle;
      this.name = newVal.detailName;
      this.text = newVal.detailText;
      this.date = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" +("0" + date.getDate()).slice(-2);
      this.image = newVal.detailImages

    },
    getDemandUpdate() {
      this.$parent.loadDemand();
    }
  },
  methods: {
    ...mapActions(['updateDemandEntry']),
    updateDemand() {
      let formData = new FormData();

      let demandPreviousData = [];
      let demandPreviousElements = document.querySelectorAll('.imagePreview');
      demandPreviousElements.forEach((item) => {
        let attachment = {
          'id': parseInt(item.getAttribute('data-image-id')),
          'base64': ''
        }
        demandPreviousData.push(attachment);
      });

      let fileItems = document.querySelectorAll('.upload-file');

      fileItems.forEach((item) => {
        if (typeof item.files[0] !== "undefined") {
          formData.append('files', item.files[0]);
        }
      });

      let data = {
        'demandName': this.name,
        'demandDate': this.date + "T00:00:00",
        'demandTitle': this.title,
        'demandText': this.text,
        'demandImages': demandPreviousData
      }
      formData.append('demandData', JSON.stringify(data));
      formData.append('demandId', this.demandUpdateId);
      this.updateDemandEntry(formData);
    },
    setImagePath(image) {
      return "data:image/jpg;base64," + image;
    },
    deleteImage(id, existingImage) {
      if (existingImage) {
        document.querySelector('.imageAdministration [data-image-id="' + id + '"]').parentElement.parentElement.remove();
      } else {
        if (this.imagesItems.length !== 1) {
          this.imagesItems = this.imagesItems.filter((value) => {
            return id !== value.id;
          });
        } else {
          this.imagesItems = [{'id': 0}]
        }
      }
    },
    addNewImageItem() {
      const element = {
        'id' : this.imagesItems.length
      }
      this.imagesItems.push(element);
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
.imageAdministration {
  display: flex;
}
.furtherImage {
  display: flex;
  margin-bottom: 10px;
}
.imagePreviewWrapper {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
}
.imagePreview {
  height:100px;
  width: auto;
}
</style>