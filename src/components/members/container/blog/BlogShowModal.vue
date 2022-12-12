<template>
  <div class="modal fade" id="showBlog" tabindex="-1" aria-labelledby="showBlog" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <div class="row">
            <div class="blogDetailHeader">
              <div class="blogDetailTitle" v-html="blogDetail.blogTitle"></div>
            </div>
          </div>
          <div class="row">
            <div class="blogDetailInfo">
              <div class="blogDetailInfoEnd">
                <div class="blogDetailDate" v-html="blogDetail.blogDate"></div>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-body">

          <div id="blogCarousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="false">
            <div class="carousel-inner">
              <div class="carousel-item" :class="i === 0 ? 'active':''" v-for="(image, i) in blogDetail.blogImages" v-bind:key="image">
                <div class="d-flex justify-content-center">
                  <img :src="setImageSrc(image.base64)" class="d-block w-100" alt="...">
                </div>
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#blogCarousel" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#blogCarousel" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>

          <div class="body-text" v-html="blogDetail.blogText"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlogShowModal",
  props: ['blogDetail'],
  methods: {
    setImageSrc(data) {
      return "data:image/jpg;base64," + data;
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
  margin-top: -5px;
}
.btn-primary:focus, .btn-primary:active {
  background-color: #a21d21;
  border-color: #a21d21;
  box-shadow: none;
}
.blogDetailInfo {
  display: flex;
  font-size: 12px;
  opacity: .8;
  justify-content: space-between;
}
.blogDetailHeader {
  display: flex;
  font-size: 18px;
  justify-content: space-between;
  margin-top: 5px;
}
.blogDetailInfoEnd {
  display: flex;
}
.newsDetailInfoEnd .btn-close {
  padding-top: 14px;
}
.errorMsg {
  display: flex;
  font-size: 12px;
  font-weight: bold;
  color: #a21d21;
}
.detailImage {
  width:50%;
  height:auto;
}
.body-text {
  text-align: left;
}
.carousel-item {
  background-color: #000;
}
.carousel-item img {
  max-height: 400px;
  width: auto!important;
}
</style>