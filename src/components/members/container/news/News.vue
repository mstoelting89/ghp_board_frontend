<template>
  <div class="col-12 col-md-12 col-lg-5 ghp-container">
    <MessageModal
        :showModalValue=showModalValue
        :message=modalMessage
        :error=errorValue
        :success=successValue
    />
    <div class="page-header">
      <h2><span class="first-word">Guitar</span> Hearts News</h2>
      <font-awesome-icon v-if="userLevel === 'ADMIN'" class="add-icon" icon="circle-plus" data-bs-toggle="modal" data-bs-target="#addNews" />
    </div>
    <div class="newsEntry" v-for="newsEntry in newsArray" v-bind:key="newsEntry">
      <div class="newsEntryHeader">
        <div class="newsEntryAuthor">{{ newsEntry.newsAuthor }}</div>
        <div class="newsEntryDate">{{ newsEntry.newsDate }}</div>
      </div>
      <div class="newsEntryMain">
        <div class="newsEntryTitle">{{ newsEntry.newsTitle }}</div>
        <div class="buttons">
          <div class="show-news">
            <button class="btn btn-secondary" @click="getNewsDetail(newsEntry.id)" data-bs-toggle="modal" data-bs-target="#showNews">mehr lesen</button>
          </div>
          <div class="update-news">
            <font-awesome-icon class="update-icon"  v-if="userLevel === 'ADMIN' || userLevel === 'REDAKTEUR'" @click="getNewsDetail(newsEntry.id)"  icon="pen" data-bs-toggle="modal" data-bs-target="#updateNews" />
          </div>
          <div class="delete-news">
            <font-awesome-icon class="delete-icon" v-if="userLevel === 'ADMIN'" @click="setDeleteNewsId(newsEntry.id)" icon="trash" data-bs-toggle="modal" data-bs-target="#deleteNews" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <NewsAddModal />
  <NewsUpdateModal
      :newsDetail="newsDetail"
      :newsUpdateId="newsId"
  />
  <NewsShowModal
      :newsDetail="newsDetail"
  />
  <NewsDeleteModal
      :newsDeleteId="newsDeleteId"
  />

</template>

<script>
import NewsAddModal from "@/components/members/container/news/NewsAddModal";
import NewsShowModal from "@/components/members/container/news/NewsShowModal";
import NewsUpdateModal from "@/components/members/container/news/NewsUpdateModal";
import NewsDeleteModal from "@/components/members/container/news/NewsDeleteModal";
import {mapActions, mapGetters} from "vuex";
import MessageModal from "@/components/members/container/MessageModal";

export default {
  name: "News",
  components: {MessageModal, NewsDeleteModal, NewsUpdateModal, NewsShowModal, NewsAddModal},
  data() {
    return {
      newsArray: [],
      newsUpdate: false,
      newsUpdateId: '',
      newsDeleteId: '',
      newsDetail: [],
      newsId: null,
      userLevel: localStorage.getItem('userRole'),
      modalMessage: '',
      showModalValue: false,
      successValue: false,
      errorValue: false
    }
  },
  computed: {
    ...mapGetters(['getNews', 'getDetailNews'])
  },
  async created() {
    await this.getNewsFromService();
  },
  watch: {
    getNews(newValue) {
      this.newsArray = this.setNewsArray(newValue);
    },
    getDetailNews(newValue) {
      this.newsDetail = this.setNewsDetailArray(newValue);
    }
  },
  methods: {
    ...mapActions(['getNewsFromService', 'getNewsDetailFromService']),
    loadNews() {
      this.getNewsFromService();
    },
    setNewsArray(data) {
      let newsData = [];
      data.data.forEach((item) => {
        let date = new Date(item.newsDate);
        let newsDate = ("0" + date.getDate()).slice(-2) + "." + ("0" + (date.getMonth() + 1)).slice(-2) + "." + date.getFullYear();
        let newsElement = {
          id: item.id,
          newsAuthor: item.newsAuthor,
          newsDate: newsDate,
          newsImage: item.newsImage,
          newsTitle: item.newsTitle,
          newsText: item.newsText
        }
        newsData.push(newsElement);
      });
      return newsData;
    },
    getNewsDetail(id) {
      this.newsId = id;
      this.getNewsDetailFromService(id);
    },
    setNewsDetailArray(data) {

      let date = new Date(data.data.newsDate);
      let newsDate = ("0" + date.getDate()).slice(-2) + "." + ("0" + (date.getMonth() + 1)).slice(-2) + "." + date.getFullYear();

      return {
        'detailTitle': data.data.newsTitle,
        'detailAuthor': data.data.newsAuthor,
        'detailText': data.data.newsText,
        'detailDate': newsDate,
        'detailImage': data.data.newsImage
      }
    },
    setDeleteNewsId(id) {
      this.newsDeleteId = id;
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
  height: 50vh;
  border-radius: 5px;
  overflow: scroll;
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
.newsEntry {
  border-bottom: 1px solid #454545;
  padding-bottom: 5px;
}
.newsEntryHeader {
  display: flex;
  font-size: 12px;
  opacity: .8;
  justify-content: space-between;
}

.newsEntryMain {
  display: flex;
  font-size: 18px;
  justify-content: space-between;
  margin-top: 5px;
}
.newsEntryMain .buttons {
  display: flex;
}
.newsEntryMain .btn {
  padding: 5px;
  font-size: 12px;
  background-color: #a21d21;
}
.newsEntryMain .buttons .update-icon, .newsEntryMain .buttons .delete-icon {
  background-color: #a21d21;
  color: #fff;
  padding:7px;
  font-size:28px;
  border-radius: 5px;
  margin-left: 5px;
  margin-top: 1px;
  cursor: pointer;
}
</style>