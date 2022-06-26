import { createStore } from 'vuex'
import auth from '@/store/auth/index'
import news from '@/store/news/index'
import demand from "@/store/demand/index";

export default createStore({
  modules: {
    auth,
    news,
    demand
  }
})
