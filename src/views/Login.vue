<template>
  <v-app id="login" :class="bgStlye">
    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="5">
            <v-card shaped :color="whiteOpacity" id="loginBase">
              <v-card-text>
                <v-toolbar flat color="rgba(255,255,255,0)">
                  <v-toolbar-title class="display-1">Login</v-toolbar-title>
                  <v-spacer/>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn icon large v-on="on" @click="openStart">
                        <v-icon>mdi-home-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>Start</span>
                  </v-tooltip>
                  <v-tooltip right>
                    <template v-slot:activator="{ on }">
                      <v-btn icon large v-on="on" @click="openRegister">
                        <v-icon>mdi-account-arrow-right-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>Register</span>
                  </v-tooltip>
                </v-toolbar>
                <v-form ref="form" class="ma-7 mb-n5">
                  <v-text-field v-model="username" label="username" append-icon="mdi-account"
                                ref="username" outlined
                                :rules="[() => !!username || 'username is required']"></v-text-field>
                  <v-text-field v-model="password" label="password" append-icon="mdi-fingerprint"
                                ref="password" outlined type="password" @keyup.enter="login"
                                :rules="[() => !!password || 'password is required']"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions class="mr-7">
                <v-spacer></v-spacer>
                <v-slide-x-reverse-transition>
                  <v-tooltip v-if="formHasErrors" left>
                    <template v-slot:activator="{ on }">
                      <v-btn icon class="my-0" @click="resetForm" v-on="on">
                        <v-icon>mdi-refresh</v-icon>
                      </v-btn>
                    </template>
                    <span>Reset form</span>
                  </v-tooltip>
                </v-slide-x-reverse-transition>
                <v-btn color="primary" text @click="login" class="title">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        username: '',
        password: '',
        formHasErrors: false,
        app: this.$root.$children[0]
      }
    },
    computed: {
      form: function () {
        return {
          username: this.username,
          password: this.password
        }
      },
      whiteOpacity: function () {
        // 用来调整组件在不同主题下的透明度
        return this.$vuetify.theme.dark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)';
      },
      bgStlye: function () {
        return this.$vuetify.theme.dark ? 'darkBg' : 'lightBg';
      }
    },
    methods: {
      openStart: function () {
        this.$router.push({path: '/'});
      },
      openRegister: function () {
        this.$router.push({path: '/register'});
      },
      resetForm() {
        this.formHasErrors = false;

        Object.keys(this.form).forEach(f => {
          this.$refs[f].reset();
        });
      },
      login() {
        if (this.app.overlay === true) {
          return;
        }

        this.formHasErrors = false;

        Object.keys(this.form).forEach(f => {
          this.$refs[f].validate(true);
          if (!this.$refs[f].valid) {
            this.formHasErrors = true;
          }
        });

        if (!this.formHasErrors) {
          // 验证成功,显示 overlay
          this.app.overlay = true;
          this.$axios.post('/signIn', {
            username: this.username,
            password: this.password
          })
            .then(resp => {
              if (resp.status === 200) {
                this.app.message("Login Successfully", 'success');
                this.$store.commit('login', resp.data.token);
                this.app.overlay = false;
                this.$router.replace({path: '/'});
              }
              else {
                this.app.message('login error', 'error');
                this.app.overlay = false;
              }
            })
            .catch(error => {
              this.app.message((error.message === 'password mismatch' || error.message === 'username not found') ?
                'wrong username or password' : 'login fail, please check your network connection', 'error');
              this.app.overlay = false;
            })
        }
      }
    },
    beforeRouteEnter: (to, from, next) => {
      // 如果在已登录情况下使用url进入登录界面，则将url转到 Welcome 页面
      next(vm => {
        if (vm.$store.state.token) {
          vm.$router.push('/');
          vm.app.message('please logout first', 'warning');
        }
      });
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

  #loginBase {
    margin-top: 100px;
  }
</style>
