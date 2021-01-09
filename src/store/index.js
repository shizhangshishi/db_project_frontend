import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 从本地存取，防止页面刷新时数据丢失
    token: localStorage.getItem('token') || null,
    // profile: null,
    profile: JSON.parse(localStorage.getItem('profile')) || null,
    themeIsDark: localStorage.getItem('theme') === 'dark'
  },
  mutations: {
    // updateToken(state, data) {
    //   localStorage.removeItem('token');
    //   localStorage.setItem('token', data.token);
    //   state.token = data.token;
    // },
    login(state, token) {
      localStorage.setItem('token', token);
      state.token = token;
    },
    logout(state) {
      // 移除token
      localStorage.removeItem('token');
      state.token = null;
      // 移除profile
      localStorage.removeItem('profile');
      state.profile = null;
    },
    changeTheme(state, dark) {
      // 将当前主题储存起来
      const theme = dark ? 'dark' : 'light';
      localStorage.removeItem('theme');
      localStorage.setItem('theme', theme);
      state.themeIsDark = dark;
    },
    setProfile(state, profile){
      // console.log("setProfile");
      localStorage.setItem('profile', JSON.stringify(profile));
      state.profile = profile;
      // console.log(state.profile);
    }
  },
  actions: {},
  modules: {}
});
