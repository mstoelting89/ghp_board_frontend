<template>
  <div class="col-12 col-md-12 col-lg-12 ghp-container">
    <MessageModal
        :showModalValue=showModalValue
        :message=modalMessage
        :error=errorValue
        :success=successValue
    />
    <div class="page-header">
      <h2><span class="first-word">Guitar</span> Hearts Blog</h2>
      <font-awesome-icon class="add-icon" v-if="(userLevel === 'ADMIN' || userLevel === 'REDAKTEUR') && currentRouteName === 'Dashboard'" icon="circle-plus" data-bs-toggle="modal" data-bs-target="#addBlog" />
    </div>
    <div class="blog-list">
      <div class="blog-item" v-for="blogItem in blogArray" v-bind:key="blogItem">
        <div class="admin-buttons">
          <div class="buttons">
            <div class="update-blog">
              <font-awesome-icon class="update-icon" v-if="(userLevel === 'ADMIN' || userLevel === 'REDAKTEUR')  && currentRouteName === 'Dashboard'" @click="setBlogId(blogItem.id); getDetailBlog(blogItem.id)" icon="pen" data-bs-toggle="modal" data-bs-target="#updateBlog" />
            </div>
            <div class="delete-blog">
              <font-awesome-icon class="delete-icon" v-if="userLevel === 'ADMIN' && currentRouteName === 'Dashboard'" @click="setBlogId(blogItem.id)" icon="trash" data-bs-toggle="modal" data-bs-target="#deleteBlog" />
            </div>
          </div>
          <div class="blog-public" v-if="currentRouteName === 'Dashboard'">
            <font-awesome-icon v-if="blogItem.blogIsPublic === true" class="public" icon="circle-check" />
            <font-awesome-icon v-else class="not-public" icon="circle-xmark" />
          </div>
        </div>
        <div class="blog-teaser-image">
          <img v-if="setImagePath(blogItem.blogImages) !== false" class="previewImage" :src="setImagePath(blogItem.blogImages)" />
          <img v-else src="@/assets/images/BilderLars/1428062250527.png" />
        </div>
        <div class="blog-teaser-content col-md-12">
          <div class="blog-teaser-header" v-html="blogItem.blogTitle">
          </div>
          <div class="blog-teaser-date" v-html="blogItem.blogDate">
          </div>
          <div class="blog-teaser-text" v-html="blogItem.blogText">
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
  <BlogUpdateModal
    :blogDetail="blogDetail"
    :blogUpdateId="blogId"
  />
  <BlogDeleteModal
    :blogDeleteId="blogId"
  />
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import BlogAddModal from "@/components/members/container/blog/BlogAddModal";
import {mapActions, mapGetters} from "vuex";
import BlogShowModal from "@/components/members/container/blog/BlogShowModal";
import BlogDeleteModal from "@/components/members/container/blog/BlogDeleteModal";
import BlogUpdateModal from "@/components/members/container/blog/BlogUpdateModal";
import MessageModal from "@/components/members/container/MessageModal";


export default {
  name: "Blog",
  components: {MessageModal, BlogUpdateModal, BlogDeleteModal, BlogShowModal, BlogAddModal},
  data() {
    return {
      blogEditor: ClassicEditor,
      editorConfig: {

      },
      blogArray: '',
      blogDetail: {},
      blogId: null,
      userLevel: localStorage.getItem('userRole'),
      modalMessage: '',
      showModalValue: false,
      successValue: false,
      errorValue: false
    };
  },
  computed: {
    ...mapGetters(['getBlogPosts', 'getBlogUpdate']),
    currentRouteName() {
      return this.$route.name;
    }
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
          blogImages: item.blogImages,
          blogIsPublic: item.isPublic
        }

        if(this.currentRouteName === 'Home') {
          if (item.isPublic) {
            blogData.push(blogElement);
          }
        } else {
          blogData.push(blogElement);
        }
      });
      return blogData;
    },
    setBlogId(id) {
      this.blogId = id;
    },
    setImagePath(image) {
      const base64Data = Object.assign({}, image[0]);
      if (base64Data.base64 === undefined) {
        return false;
      }
      return "data:image/jpg;base64," + base64Data.base64;
    }
  }
}
</script>

<style scoped>
.first-word {
  font-weight: 600;
  color: #a21d21;
}
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
.blog-teaser-image {
  max-height: 200px;
  min-height: 200px;
}
.blog-teaser-image img {
  border-radius: 6px;
  max-width: 250px;
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
  min-height: 150px;
  max-height: 150px;
}
.blog-teaser-further-link {
  cursor: pointer;
  text-align: left;
  font-size: 16px;
  font-weight: bold;
  color: #a21d21;
}
.admin-buttons {
  display: flex;
  justify-content: space-between;
}
.admin-buttons .buttons {
  display: flex;
}
.admin-buttons .blog-public {
  background-color: #fff;
  color: #a21d21;
  font-size:18px;
  border-radius: 5px;
  margin-left: 5px;
  margin-top: 1px;
}
.admin-buttons .blog-public .public, .admin-buttons .blog-public .not-public {
  margin-left:10px;
}
.admin-buttons .update-icon,
.admin-buttons .delete-icon {
  background-color: #fff;
  color: #a21d21;
  padding:7px;
  font-size:28px;
  border-radius: 5px;
  margin-left: 5px;
  margin-top: 1px;
  cursor: pointer;
}
.hidden {
  display: none;
}
/*mobile*/
@media only screen and (max-width: 992px) {
  .ghp-container {
    height: 90vh;
  }
}
</style>