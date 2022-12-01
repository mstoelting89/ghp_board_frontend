<template>
  <div class="slider">
  </div>
  <div class="ghp-dashboard">
    <div class="row container-wrapper justify-content-between">
      <News />
      <Demand />
    </div>
    <div class="row container-wrapper">
      <Blog />
    </div>
    <div class="row container-wrapper">
      <Instruments />
    </div>
  </div>
  <div class="spinner-overlay hidden">
  </div>
  <div class="spinner hidden">
    <font-awesome-icon class="spinner-icon" icon="circle-notch" />
  </div>
  <Footer />
</template>

<script>
//import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Editor from 'ckeditor5-custom-build/build/ckeditor'
import News from "@/components/members/container/news/News";
import Demand from "@/components/members/container/demand/Demand";
import Blog from "@/components/members/container/blog/Blog";
import Instruments from "@/components/members/container/instruments/Instruments";
import Footer from "@/components/Footer";

export default {
  name: "Dashboard",
  components: {Footer, Instruments, Blog, Demand, News},
  data() {
    return {
      editor: Editor,
      editorConfig: {

      },
      userLevel: localStorage.getItem('userRole')
    };
  },
  methods: {
    showSpinner() {
      let spinner = document.querySelector('.spinner');
      let spinnerOverlay = document.querySelector('.spinner-overlay');

      spinner.classList.remove('hidden');
      spinnerOverlay.classList.remove('hidden');
    },
    hideSpinner() {
      let spinner = document.querySelector('.spinner');
      let spinnerOverlay = document.querySelector('.spinner-overlay');

      spinner.classList.add('hidden');
      spinnerOverlay.classList.add('hidden');
    }
  }
}
</script>

<style scoped>
.logout {

}
.slider {
  height: 100vh;
  background-image: url("~@/assets/images/background-img-min-min(1).jpeg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: fixed;
  width: 100vw;
  z-index: -1;
}
.header-title {
  position: absolute;
  left: 6vw;
  background-color: rgba(255,255,255,1);
  padding: 1rem 3rem 3rem 1rem;
  min-width: 60vw;
  max-width: 60vw;
  display: flex;
  border-radius: 5px;
  text-align: left;
  top: 30vh;
}
.logo-align {
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
.logo-align img {
  height: 20vh;
}

.btn:focus {
  box-shadow: none;
}

button, button:focus {
  background-color: #a21d21;
  border: 1px solid #a21d21;
  box-shadow: none;
}

button:hover {
  opacity: 0.8;
  background-color: #a21d21;
  border: 1px solid #a21d21;
}

.ghp-container {
  background-color: #fff;
  height: 50vh;
  border-radius: 5px;
}

.ghp-dashboard {
  padding-top: 125px;
}

.container-wrapper {
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
}


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
.spinner-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #000;
  opacity: .4;
  z-index: 10000;
}
.spinner {
  position: fixed;
  width:150px;
  height:150px;
  top: 40%;
  left: 50%;
  background-color: #fff;
  z-index:51000;
}

.spinner-icon {
  font-size: 50px;
  color: #a21d21;
  margin-top: 30%;
  animation: loader 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
}
@keyframes loader {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.hidden {
  display: none;
}

/*mobile*/
@media only screen and (max-width: 428px) {
  .ghp-container {
    margin-bottom: 50px;
  }
}
</style>