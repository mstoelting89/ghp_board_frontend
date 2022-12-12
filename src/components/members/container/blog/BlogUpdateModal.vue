<template>
  <div class="modal fade" id="updateBlog" tabindex="-1" aria-labelledby="updateBlog" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="updateBlogLabel">Blogartikel bearbeiten</h5>
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
                <input type="text" placeholder="Autor" class="form-control" id="blogName" v-model="author">
              </div>
            </div>
            <div class="mb-3">
              <ckeditor :editor="blogEditor" :config="editorConfig" v-model="text"></ckeditor>
            </div>
            <div class="col-12 imageAdministration" ref="blogImages" v-for="item in image" v-bind:key="item">
              <div class="col-md-6 imagePreviewWrapper">
                <img :src="setImagePath(item.base64)" :data-image-id="item.id" class="imagePreview-blog">
              </div>
              <div class="col-md-3 icon">
                <font-awesome-icon class="delete-icon" icon="trash" @click="deleteImage(item.id, true)" />
              </div>
            </div>
            <div class="furtherImage" v-for="(item) in imagesItems" v-bind:key="item" @change="addNewImageItem">
              <div class="col-md-6 inputField">
                <input type="file" class="form-control upload-new-file-blog">
              </div>
              <div class="icon col-md-3">
                <font-awesome-icon class="delete-icon" icon="trash" @click="deleteImage(item.id, false)" />
              </div>
            </div>
            <div class="mb-3 d-flex row">
              <div class="col-lg-2 col-xs-6 d-flex justify-content-start">
                <label for="blogIsPublic-update" class="col-form-label">Veröffentlichen</label>
              </div>
              <div class="col-1">
                <input type="checkbox" id="blogIsPublic-update">
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer justify-content-between">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Schließen</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="updateBlog">Speichern</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import {mapActions, mapGetters} from "vuex";

export default {
  name: "BlogUpdateModal",
  props: ['blogDetail', 'blogUpdateId'],
  data() {
    return  {
      blogEditor: Editor,
      editorData: '',
      editorConfig: {},
      date: '',
      author: '',
      text: '',
      title: '',
      image: '',
      imagesItems: [{'id': 0}]
    }
  },
  computed: {
    ...mapGetters(['getBlogUpdate'])
  },
  watch: {
    blogDetail(newVal) {
      let dateStr = newVal.blogDate.split('.');
      let date = new Date(dateStr[2] + "-" + dateStr[1] + "-" + dateStr[0]);

      this.title = newVal.blogTitle;
      this.author = newVal.blogAuthor;
      this.text = newVal.blogText;
      this.date = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" +("0" + date.getDate()).slice(-2);
      this.image = newVal.blogImages
      document.querySelector('#blogIsPublic-update').checked = newVal.blogIsPublic;

    },
    getBlogUpdate() {
      this.$parent.loadBlogPosts();
      this.$parent.hideSpinner();
      this.clearFields();
    }
  },
  methods: {
    ...mapActions(['updateBlogEntry']),
    setImagePath(image) {
      return "data:image/jpg;base64," + image;
    },
    clearFields() {
      this.name = '';
      this.date = '';
      this.title = '';
      this.text = '';
      this.imagesItems = [
        {
          'id': 0
        }
      ];
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
    },
    updateBlog() {
      this.$parent.showSpinner();
      let formData = new FormData();

      let blogPreviousData = [];
      let blogPreviousElements = document.querySelectorAll('.imagePreview-blog');
      blogPreviousElements.forEach((item) => {
        let attachment = {
          'id': parseInt(item.getAttribute('data-image-id')),
          'base64': ''
        }
        blogPreviousData.push(attachment);
      });

      let fileItems = document.querySelectorAll('.upload-new-file-blog');

      fileItems.forEach((item) => {
        if (typeof item.files[0] !== "undefined") {
          formData.append('files', item.files[0]);
        }
      });

      let data = {
        'blogAuthor': this.author,
        'blogDate': this.date + "T00:00:00",
        'blogTitle': this.title,
        'blogText': this.text,
        'blogImages': blogPreviousData,
        'isPublic': document.querySelector('#blogIsPublic-update').checked
      }
      formData.append('blogData', JSON.stringify(data));
      formData.append('blogId', this.blogUpdateId);
      this.updateBlogEntry(formData);
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
.imagePreview-blog {
  height:100px;
  width: auto;
}
</style>