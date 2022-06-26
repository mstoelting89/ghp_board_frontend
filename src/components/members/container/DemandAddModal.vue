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
                <input type="text" class="form-control" id="requestTitle">
              </div>
              <div class="col-1 justify-content-start">
                <label for="requestDate" class="col-form-label">Datum</label>
              </div>
              <div class="col-5">
                <input type="date" class="form-control" id="requestDate">
              </div>
            </div>
            <div class="mb-3 d-flex">
              <div class="col-1 justify-content-start">
                <label for="requestName" class="col-form-label">Name</label>
              </div>
              <div class="col-5">
                <input type="text" class="form-control" id="requestName">
              </div>
            </div>
            <div class="mb-3">
              <div class="col-1 justify-content-start">
                <label class="col-form-label">Text:</label>
              </div>
              <ckeditor :editor="requestEditor" :config="editorConfig"></ckeditor>
            </div>
            <div class="col-5" ref="demandImages" id="demandImages">
              <input type="file" class="form-control" @change="handleFile">
            </div>
            <div class="col-5">
              <font-awesome-icon class="hidden" id="add-icon" @click="addNewImageEntry" icon="circle-plus" />
            </div>
          </form>
        </div>
        <div class="modal-footer justify-content-between">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Schließen</button>
          <button type="button" class="btn btn-primary">Speichern</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  name: "DemandAddModal",
  data() {
    return {
      requestEditor: ClassicEditor,
      editorConfig: {}
    };
  },
  methods: {
    checkField(input, inputWrapper) {
      if (input.length <= 0) {
        inputWrapper.querySelector('.errorMsg').innerHTML = "Dieses Feld muss ausgefüllt sein";
        return false;
      } else {
        inputWrapper.querySelector('.errorMsg').innerHTML = "";
        return true;
      }
    },
    showAddNewImageBtn() {
      let imageEntries = this.$refs.demandImages.childNodes;
      let showAddImage = true;
      let addImageIcon = document.querySelector('#add-icon');

      imageEntries.forEach(item => {
        console.log(item);
        if (item.files.length === 0) {
          showAddImage = false;
        }
      });
      console.log(showAddImage);
      if (showAddImage === true) {
        addImageIcon.classList.remove('hidden');
      } else {
        addImageIcon.classList.add('hidden');
      }
    },
    handleFile() {
      this.showAddNewImageBtn();
    },
    addNewImageEntry() {
      let demandImages = document.querySelector('#demandImages');
      // TODO: Make Image Upload work
      this.showAddNewImageBtn();
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

.hidden {
  display: none;
}
</style>