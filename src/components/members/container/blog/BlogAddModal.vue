<template>
  <div class="modal fade" id="addBlog" tabindex="-1" aria-labelledby="addBlog" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addBlogLabel">Neuer Blogartikel</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3 d-flex row">
              <div class="col-xs-12 col-lg-5">
                <input type="text" placeholder="Titel" class="form-control" id="blogTitle" v-model="title">
              </div>
              <div class="col-2"></div>
              <div class="col-xs-12 col-lg-5">
                <input type="date" class="form-control" id="blogDate" v-model="date">
              </div>
            </div>
            <div class="mb-3 d-flex row">
              <div class="col-xs-12 col-lg-5">
                <input type="text" placeholder="Autor" class="form-control" id="blogName" v-model="name">
              </div>
            </div>
            <div class="mb-3">
              <ckeditor :editor="blogEditor" :config="editorConfig" v-model="text"></ckeditor>
            </div>
            <div class="col-12" ref="blogImages" id="blogImages">
              <div v-for="item in images" v-bind:key="item" @change="addNewImageItem" class="imageItem">
                <div class="inputField">
                  <input type="file" class="form-control upload-file-blog">
                </div>
                <div class="icon">
                  <font-awesome-icon class="delete-icon" icon="trash" @click="deleteImage(item)" />
                </div>
              </div>
            </div>
            <div class="mb-3 d-flex">
              <div class="col-lg-2 col-xs-6 d-flex justify-content-start">
                <label for="blogIsPublic" class="col-form-label">Veröffentlichen</label>
              </div>
              <div class="col-1">
                <input type="checkbox" id="blogIsPublic">
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer justify-content-between">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Schließen</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="insertBlog">Speichern</button>
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
  name: "BlogAddModal",
  data() {
    return {
      blogEditor: Editor,
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
    ...mapGetters(['getBlogInsert', 'getBlogMessage'])
  },
  watch: {
    getBlogMessage(newVal) {
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
    getBlogInsert() {
      this.$parent.loadBlogPosts();
      this.$parent.hideSpinner();
      this.clearFields();
    }
  },
  methods: {
    ...mapActions(['insertNewBlogEntry']),
    addNewImageItem() {
      const element = {
        'id' : this.images.length
      }
      this.images.push(element);
    },
    clearFields() {
      this.name = '';
      this.date = '';
      this.title = '';
      this.text = '';
      this.images = [
        {
          'id': 0
        }
      ];
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
    checkField(input, inputWrapper) {
      if (input.length <= 0) {
        inputWrapper.querySelector('.errorMsg').innerHTML = "Dieses Feld muss ausgefüllt sein";
        return false;
      } else {
        inputWrapper.querySelector('.errorMsg').innerHTML = "";
        return true;
      }
    },
    insertBlog() {
      this.$parent.showSpinner();
      let formData = new FormData();
      let data = [];
      let fileItems = document.querySelectorAll('.upload-file-blog');
      let isPublic = document.querySelector('#blogIsPublic').checked;

      if (this.name === '' || this.date === '' || this.title === '' || this.text === '') {
        this.$parent.hideSpinner();
        this.$parent.modalMessage = 'Bitte fülle alle Pflichtfelder aus';
        this.$parent.errorValue = true;
        this.$parent.successValue = false;
        this.$parent.showModalValue = true;
        setTimeout(() => {
          this.$parent.showModalValue = false;
        }, 3000);
      } else {
        fileItems.forEach((item) => {
          if (typeof item.files[0] !== "undefined") {
            formData.append('files', item.files[0]);
          }
        });

        data = {
          'blogAuthor': this.name,
          'blogDate': this.date + "T00:00:00",
          'blogTitle': this.title,
          'blogText': this.text,
          'isPublic': isPublic
        }
        formData.append('blogData', JSON.stringify(data));

        this.insertNewBlogEntry(formData);
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
.btn-primary:focus, .btn-primary:active {
  background-color: #a21d21;
  border-color: #a21d21;
  box-shadow: none;
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