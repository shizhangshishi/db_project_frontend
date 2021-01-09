<template>
  <v-app>
    <!-- 全局 overlay 以及 snackbar，用来跨页面为用户提示消息 -->
    <!-- 使用的方法：通过 this.$root.$children[0] 在其它组件中获得 App.vue 组件的对象 -->
    <v-overlay :value="overlay" z-index="500">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-snackbar v-model="showSnackbar" :timeout="3000" :color="snackbarType" top>
      {{ snackbarMessage }}
      <v-btn color="white" text @click="showSnackbar = false">
        Close
      </v-btn>
    </v-snackbar>

    <router-view/>
  </v-app>
</template>

<script>
  export default {
    name: 'App',

    data: () => ({
      overlay: false,
      showSnackbar: false,
      snackbarMessage: '',
      snackbarType: ''
    }),
    methods: {
      message(message, type) {
        this.showSnackbar = true;
        this.snackbarMessage = message;
        this.snackbarType = type;
      },
      // updateToken() {
      //   if (this.$store.state.token) {
      //     this.$axios.post('/update')
      //       .then(res => {
      //         if (res.status === 200 && res.data.token) {
      //           this.$store.commit('updateToken', res.data);
      //         }
      //       })
      //       .catch(error => {
      //         if (error.message === 'expired') {
      //           this.message("login status has expired", 'warning');
      //         }
      //       });
      //   }
      //   setTimeout(() => {
      //     this.updateToken();
      //   }, 10000000)
      // }
    },
    mounted() {
      // this.updateToken();
    }
  };
</script>
