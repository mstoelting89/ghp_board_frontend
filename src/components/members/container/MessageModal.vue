<template>
  <Transition name="modal">
    <div v-if="showModalValue" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container d-flex">
          <div class="icon">
            <font-awesome-icon v-if="success" class="success" icon="circle-check" />
            <font-awesome-icon v-if="error" class="error" icon="circle-xmark" />
          </div>
          <div class="modal-body">
            {{ this.message }}
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  name: "MessageModal",
  props: ['showModalValue', 'message', 'error', 'success'],
  watch: {
    showModalValue(newVal) {
      this.showModal = newVal;
    }
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-container {
  width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.4s ease;
  margin-top: 20%;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}
.modal-default-button {
  float: right;
}
.icon {
  padding: 0.5rem;
  font-size: 28px;
}
.success {
  color: green;
}
.error {
  color: red;
}


.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  margin-top:0%;
}
</style>