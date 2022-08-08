import { createStore } from 'vuex'
import auth from '@/store/auth/index'
import news from '@/store/news/index'
import demand from '@/store/demand/index';
import blog from '@/store/blog/index';
import instruments from '@/store/instruments/index';
import user from '@/store/user/index';
import contact from "@/store/contact";

export default createStore({
  modules: {
    auth,
    news,
    demand,
    blog,
    instruments,
    user,
    contact
  }
})
