<template>
  <div class="modal fade" id="deleteBlog" tabindex="-1" aria-labelledby="deleteBlog" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Möchtest du den Eintrag wirklich löschen?
        </div>
        <div class="modal-footer justify-content-between">
          <button type="button" class="btn btn-default" data-bs-dismiss="modal">Schließen</button>
          <button type="button" class="btn btn-primary" @click="deleteBlog(blogId)" data-bs-dismiss="modal">Löschen</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "BlogDeleteModal",
  props:['blogDeleteId'],
  data() {
    return {
      blogId: this.blogDeleteId
    }
  },
  computed: {
    ...mapGetters(['getBlogDelete'])
  },
  watch: {
    blogDeleteId: function (id) {
      this.blogId = id;
    },
    getBlogDelete() {
      this.$parent.loadBlogPosts();
      this.$parent.hideSpinner();
    }
  },
  methods: {
    ...mapActions(['deleteBlogEntry']),
    deleteBlog(id) {
      this.$parent.showSpinner();
      this.deleteBlogEntry(id);
    }
  }
}
</script>

<style scoped>
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