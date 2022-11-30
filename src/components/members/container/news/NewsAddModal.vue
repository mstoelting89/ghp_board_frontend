<template>
  <div class="modal fade" id="addNews" tabindex="-1" aria-labelledby="addNews" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addNewsLabel">Neuer Newseintrag</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3 d-flex row">
              <div class="col-xs-12 col-lg-5" ref="newsTitle">
                <input type="text" placeholder="Titel" class="form-control"  id="newsTitle" @keydown="removeErrorMessage" v-model="newsTitle">
                <div class="errorMsg"></div>
              </div>
              <div class="col-xs-12 col-lg-2"></div>
              <div class="col-xs-12 col-lg-5" ref="newsDate">
                <input type="date" class="form-control" id="newsDate" @keydown="removeErrorMessage" v-model="newsDate">
                <div class="errorMsg"></div>
              </div>
            </div>

            <div class="mb-3 d-flex row">
              <div class="col-xs-12 col-lg-5" ref="newsAuthor">
                <input type="text" placeholder="Autor" class="form-control" id="newsAuthor" @keydown="removeErrorMessage" v-model="newsAuthor">
                <div class="errorMsg"></div>
              </div>
            </div>

            <div class="mb-3">
              <div class="col-12 justify-content-start" ref="newsText">
                <ckeditor :editor="newsEditor" :config="editorConfig" v-model="newsText" class="form-control" id="newsEditor"></ckeditor>
                <div class="errorMsg"></div>
              </div>
            </div>

            <div class="mb-3 d-flex">
              <div class="col-1 d-flex justify-content-start">
                <label for="newsImage" class="col-form-label">Bild</label>
              </div>
              <div class="col-5">
                <input type="file" class="form-control" ref="newsImage" id="newsImage" @change="handleFile()">
              </div>
            </div>

          </form>
        </div>
        <div class="modal-footer justify-content-between">
          <button type="button" class="btn btn-default" data-bs-dismiss="modal">Schließen</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="insertNewNews">Speichern</button>
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
  name: "NewsAddModal",
  data() {
    return {
      newsEditor: Editor,
      editorConfig: {},
      newsTitle: '',
      newsDate: '',
      newsAuthor: '',
      newsText: '',
      formData: null,
      newsInsertArray: [],
      showModalValue: false,
      modalMessage: '',
      errorValue: '',
      successValue: '',
      file: null
    }
  },
  computed: {
    ...mapGetters(['getInsertNews', 'getNewsMessage'])
  },
  watch: {
    getNewsMessage(newVal) {
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
    getInsertNews() {
      this.$parent.loadNews();
      this.$parent.hideSpinner();
      this.clearFields();
      this.file = null;
    }
  },
  methods: {
    ...mapActions(['insertNewNewsEntry']),
    handleFile() {
      this.file = this.$refs.newsImage.files[0];
    },
    clearFields() {
      this.newsTitle = '';
      this.newsDate = '';
      this.newsAuthor = '';
      this.newsText = '';
      this.file = null;
    },
    insertNewNews() {
      this.$parent.showSpinner();
      let checkTitle = this.checkField(this.newsTitle, this.$refs.newsTitle);
      let checkDate = this.checkField(this.newsDate, this.$refs.newsDate);
      let checkAuthor = this.checkField(this.newsAuthor, this.$refs.newsAuthor);
      let checkText = this.checkField(this.newsText, this.$refs.newsText);

      if (
          checkTitle ||
          checkDate ||
          checkAuthor ||
          checkText
      ) {
        this.formData = new FormData();
        this.formData.append('file', this.file);

        let data = {
          newsTitle: this.newsTitle,
          newsDate: this.newsDate + "T00:00:00",
          newsAuthor: this.newsAuthor,
          newsText: this.newsText,
        }
        this.formData.append('newsData', JSON.stringify(data));

        this.insertNewNewsEntry(this.formData);
        document.querySelector('#showNews .btn-close').click();
      }
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

</style>