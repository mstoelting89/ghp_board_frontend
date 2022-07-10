<template>
  <div class="col-12 col-md-12 col-lg-12 ghp-container">
    <div class="page-header">
      <h2>Guitar Hearts Blog</h2>
      <font-awesome-icon class="add-icon" icon="circle-plus" data-bs-toggle="modal" data-bs-target="#addBlog" />
    </div>
    <div class="blog-list">
      <div class="blog-item" v-for="blogItem in blogArray" v-bind:key="blogItem">
        <div class="blog-teaser-image">
          <img src="http://www.guitarheartsproject.de/fileadmin/_processed_/e/3/csm_FB_IMG_1591514892321_632344ed4b.jpg" />
        </div>
        <div class="blog-teaser-content col-md-12">
          <div class="blog-teaser-header">
            {{ blogItem.blogTitle }}
          </div>
          <div class="blog-teaser-date">
            {{ blogItem.blogDate }}
          </div>
          <div class="blog-teaser-text">
            {{ blogItem.blogText }}
          </div>
        </div>
        <div class="blog-teaser-further-link">
          <span @click="getDetailBlog(blogItem.id)" data-bs-toggle="modal" data-bs-target="#showBlog">Weiterlesen</span>
        </div>
      </div>
    </div>
  </div>
  <BlogAddModal />
  <BlogShowModal
    :blogDetail="blogDetail"
  />
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import BlogAddModal from "@/components/members/container/blog/BlogAddModal";
import {mapActions, mapGetters} from "vuex";
import BlogShowModal from "@/components/members/container/blog/BlogShowModal";


export default {
  name: "Blog",
  components: {BlogShowModal, BlogAddModal},
  data() {
    return {
      blogEditor: ClassicEditor,
      editorConfig: {

      },
      blogArray: '',
      blogDetail: {},
      blodId: null
    };
  },
  computed: {
    ...mapGetters(['getBlogPosts', 'getBlogUpdate'])
  },
  watch: {
    getBlogPosts(newValue) {
      this.blogArray = this.setBlogArray(newValue)
    }
  },
  async created() {
    await this.getBlogFromService();
  },
  methods: {
    ...mapActions(['getBlogFromService']),
    loadBlogPosts() {
      this.getBlogFromService();
    },
    getDetailBlog(id) {
      this.blodId = id;
      const blog = this.blogArray.filter(item => item.id === id);
      this.blogDetail = blog[0];
    },
    setBlogArray(data) {
      let blogData = [];
      data.data.forEach((item) => {
        let date = new Date(item.blogDate);
        let blogDate = ("0" + date.getDate()).slice(-2) + "." + ("0" + (date.getMonth() + 1)).slice(-2) + "." + date.getFullYear();

        let blogElement = {
          id: item.id,
          blogDate: blogDate,
          blogText: item.blogText,
          blogTitle: item.blogTitle,
          blogAuthor: item.blogAuthor,
          blogImages: item.blogImages
        }
        blogData.push(blogElement);
      });
      return blogData;
    }
  },

}
</script>

<style scoped>
.ghp-container {
  background-color: #fff;
  height: 80vh;
  border-radius: 5px;
}
.page-header {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
.add-icon {
  font-size: 35px;
  color: #a21d21;
  cursor: pointer;
}
.blog-list {
  display: flex;
  scrollbar-color:#a21d21 #000;
  margin: 0;
  overflow-x: scroll;
  overflow-y: hidden;
  padding-top: 3rem;
  padding-bottom: 3rem;
  color: #000;
}
.blog-item {
  min-width: 20rem;
  max-width: 20rem;
  min-height: 35rem;
  max-height: 35rem;
  box-shadow: -5px 1px 5px 0px #000;
  padding: 1rem;
  border-radius: 16px;
  background-color: #fff;
  transition: .2s;
  margin-bottom: 0.5rem;
  margin-left: 8px;
}
.blog-item:hover {
  margin-right: 40px;
  margin-left: 40px;
  transform: scale(1.1);
}
.blog-teaser-image img {
  border-radius: 6px;
}
.blog-teaser-header {
  text-align: center;
  height: 5rem;
  font-size: 18px;
  color: #a21d21;
  font-weight: bold;
}
.blog-teaser-date {
  font-size: 12px;
  text-align: left;
}
.blog-teaser-text {
  text-align: left;
}
.blog-teaser-further-link {
  cursor: pointer;
  text-align: left;
  font-size: 16px;
  font-weight: bold;
  color: #a21d21;
}
</style>