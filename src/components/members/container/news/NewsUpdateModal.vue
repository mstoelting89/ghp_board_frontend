<template>
  <div class="modal fade" id="updateNews" tabindex="-1" aria-labelledby="updateNews" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addNewsLabel">Newseintrag bearbeiten</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>

            <div class="mb-3 d-flex row">
              <div class="col-xs-12 col-lg-5" ref="newsTitle">
                <input type="text" placeholder="Titel" class="form-control"  id="newsDetailTitle" @keydown="removeErrorMessage" v-model="title">
                <div class="errorMsg"></div>
              </div>
              <div class="col-2"></div>
              <div class="col-xs-12 col-lg-5" ref="newsDate">
                <input type="date" class="form-control" id="newsDetailDate" @keydown="removeErrorMessage" v-model="date">
                <div class="errorMsg"></div>
              </div>
            </div>

            <div class="mb-3 d-flex row">
              <div class="col-xs-12 col-lg-5" ref="newsAuthor">
                <input type="text" placeholder="Autor" class="form-control" id="newsDetailAuthor" @keydown="removeErrorMessage" v-model="author">
                <div class="errorMsg"></div>
              </div>
            </div>

            <div class="mb-3">
              <div class="col-12 justify-content-start" ref="newsText">
                <ckeditor :editor="newsEditor" :config="editorConfig" class="form-control" v-model="text"></ckeditor>
                <div class="errorMsg"></div>
              </div>
            </div>

            <div class="row mb-3" v-show="showPreviewImage">
              <div class="col-md-3 d-flex justify-content-start">
                <label class="col-form-label">Bisheriges Bild</label>
              </div>
              <div class="col-md-5 d-flex justify-content-start" ref="previousNewsImage">
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
          <button type="button" class="btn btn-default" data-bs-dismiss="modal">Schließen</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="updateNews">Speichern</button>
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
  name: "NewsUpdateModal",
  props: ['newsDetail', 'newsUpdateId'],
  data() {
    return  {
      newsEditor: Editor,
      editorData: '',
      editorConfig: {},
      date: '',
      author: '',
      text: '',
      title: '',
      image: '',
      formData: null,
      updateId: null,
      updateNewsArray: [],
      showPreviewImage: false,
      deleteNewsImage: false,
    }
  },
  computed: {
    ...mapGetters(['getUpdateNews'])
  },
  watch: {
    newsDetail: function(newVal) {
      let dateStr = newVal.detailDate.split('.');
      let date = new Date(dateStr[2] + "-" + dateStr[1] + "-" + dateStr[0]);

      this.showPreviewImage = false;
      this.title = newVal.detailTitle;
      this.author = newVal.detailAuthor;
      this.text = newVal.detailText;
      this.date = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" +("0" + date.getDate()).slice(-2);
      this.image = "data:image/jpg;base64," + newVal.detailImage;
      if (newVal.detailImage !== '') {
        this.showPreviewImage = true;
        this.$refs.previousNewsImage.querySelector('.previousImage').setAttribute('src', this.image);
      }
    },
    getUpdateNews() {
      this.$parent.loadNews();
      this.$parent.hideSpinner();
      this.file = null;
    }
  },
  methods: {
    ...mapActions(['updateNewsEntry']),
    handleFile() {
      this.file = this.$refs.newsImage.files[0];
      this.deleteNewsImage = false;
    },
    checkField(input, inputWrapper) {
      if (input.length <= 0) {
        inputWrapper.querySelector('.errorMsg').innerHTML = "Dieses Feld muss ausgefüllt sein";
        return false;
      } else {
        inputWrapper.querySelector('.errorMsg').innerHTML = "";
        return true;
      }
    },
    removeErrorMessage(event) {
      if (event.target.parentNode.querySelector('.errorMsg').innerHTML.length > 0) {
        event.target.parentNode.querySelector('.errorMsg').innerHTML = "";
      }
    },
    updateNews() {
      this.$parent.showSpinner();
      let checkTitle = this.checkField(this.title, this.$refs.newsTitle);
      let checkDate = this.checkField(this.date, this.$refs.newsDate);
      let checkAuthor = this.checkField(this.author, this.$refs.newsAuthor);
      let checkText = this.checkField(this.text, this.$refs.newsText);

      if (
          checkTitle ||
          checkDate ||
          checkAuthor ||
          checkText
      ) {
        this.formData = new FormData();
        this.formData.append('newsUpdateId', this.newsUpdateId);
        let data = {
          newsTitle: this.title,
          newsDate: this.date + "T00:00:00",
          newsAuthor: this.author,
          newsText: this.text,
        }

        if (typeof this.file !== 'undefined') {
          this.formData.append('file', this.file);
        }

        this.formData.append('newsData', JSON.stringify(data));
        this.formData.append('newsImageDelete', this.deleteNewsImage);

        this.updateNewsEntry(this.formData);
      }
    },
    deleteImage() {
      this.$refs.previousNewsImage.querySelector('.previousImage').setAttribute('src', '');
      this.showPreviewImage = false;
      this.deleteNewsImage = true;
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
.btn-primary:focus, .btn-primary:active {
  background-color: #a21d21;
  border-color: #a21d21;
  box-shadow: none;
}
.btn-secondary {
  padding: 5px;
  font-size: 12px;
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
.previousImage {
  max-height: 100px;
}
.delete-icon {
  cursor: pointer;
}
</style>