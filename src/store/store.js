import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    domain:'http://192.168.31.31:9214', //后台请求的地址
    userInfo: sessionStorage.getItem('user-info'),
    userMoney: sessionStorage.getItem('user-money'),
    tipsInfo:'',
    loadingShow:false

  },
  mutations: {
    //设置用户信息
    setUserInfo(state, info) {
      state.userInfo = info;
      sessionStorage.setItem('user-info', info);
    },
    setMoney(state, info) {
      state.userMoney = info;
      sessionStorage.setItem('user-money', info);
    },
    tips(state, tips){
      state.tipsInfo = tips;
      setTimeout(()=>{
        state.tipsInfo='';
      },1500)
    },
    loading(state, loading){
      state.loadingShow = loading;
    }
  }
})
