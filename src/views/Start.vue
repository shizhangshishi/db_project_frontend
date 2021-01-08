<template>
  <v-app id="start" :class="bgStyle">
    <Navigation :show-drawer="false"></Navigation>
    <v-content data-test="content">
      <v-container class="mb-12 pb-12">
        <v-row justify="center" data-test="row">
          <v-img :src="require('../assets/MyChair_logo.png')" max-width="300px" max-height="300px"
                 data-test="logo"></v-img>
        </v-row>
        <v-row align="center" data-test="row">
          <v-col cols="12" md="7">
            <v-card :color="whiteOpacity" class="mt-3" data-test="welcome">
              <v-card-title class="display-1 font-weight-light" data-test="header">Welcome to MyHospital</v-card-title>
              <v-card-subtitle class="title font-weight-thin">Easy or hard, it depends</v-card-subtitle>
              <v-card-text class="headline font-weight-light mt-5">MyHospital is a magical website.
                It is growing every day and every night, but nobody exactly knows how it will be like...
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="5">
            <v-row justify="center" data-test="row">
              <v-btn rounded :color="whiteOpacity" width="270px" height="90px"
                     @click="startNow" data-test="startBtn">
                <div class="display-1 font-weight-thin">START NOW</div>
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-container fluid style="z-index: 5;opacity: 0">
      <v-row><a href="/easteregg" target="_blank">Easter egg</a></v-row>
    </v-container>
    <Footer></Footer>
  </v-app>
</template>

<script>
  import Navigation from '../components/Navigation'
  import Footer from "../components/Footer";

  export default {
    name: 'Start',
    components: {
      Navigation, Footer
    },
    data(){
      return{
        app: this.$root.$children[0]
      }
    },
    mounted(){
      if (this.$store.state.profile == null){
        this.setProfile();
      }
      console.log(this.$store.state.profile);
    },
    methods: {
      startNow: function () {
        if (this.$store.state.token) {
          this.$router.push({path: '/home'});
          // if (this.$store.state.userDetails.authorities[0].authority === 'ADMIN') {
          //   this.$router.push({path: '/admin'});
          // } else {
          //   this.$router.push({path: '/home'});
          //}
        } else {
          this.$router.push({path: '/login'});
        }
      },
      setProfile(){
        this.$axios.get("/user/profile")
                .then(res =>{
                  if (res.status === 200){
                    this.$store.commit('setProfile', res.data);
                    console.log("res profile:");
                    console.log(res.data);
                  }
                  else{
                    this.app.message('Fail to get profile', 'error');
                  }
                })
                .catch(error => {
                  this.app.message('Something wrong,please check your network connection', 'error');
                  this.app.overlay = false;
                })
      }
    },
    computed: {
      isDark: function () {
        return this.$vuetify.theme.dark;
      },
      whiteOpacity: function () {
        // 用来调整组件在不同主题下的透明度
        return this.isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)';
      },
      bgStyle: function () {
        return this.isDark ? 'darkBg' : 'lightBg';
      }
    }
  }
</script>

<style>
  .lightBg {
    background: url("/img/light_bg.jpg") center fixed !important;
  }

  .darkBg {
    background: url("/img/dark_bg.jpg") center fixed !important;
  }
</style>
