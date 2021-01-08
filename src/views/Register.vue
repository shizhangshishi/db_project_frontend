<template>
  <v-app id="register" :class="bgStlye">
    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="5">
            <v-card shaped :color="whiteOpacity" id="registerBase">
              <v-card-text>
                <v-toolbar flat color="rgba(255,255,255,0)">
                  <v-toolbar-title class="display-1">Register</v-toolbar-title>
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
                      <v-btn icon large v-on="on" @click="openLogin">
                        <v-icon>mdi-login</v-icon>
                      </v-btn>
                    </template>
                    <span>Login</span>
                  </v-tooltip>
                </v-toolbar>
                <v-form ref="form" class="ma-7 mb-n5">
                  <v-text-field v-model="username" label="username" append-icon="mdi-account"
                                ref="username" outlined
                                :rules="[() => !!username || 'username is required']"
                                :error-messages="messages.username"></v-text-field>
                  <v-text-field v-model="realname" label="realname" append-icon="mdi-file-account"
                                ref="realname" outlined
                                :rules="[() => !!realname || 'realname is required']"></v-text-field>
                  <v-text-field v-model="password" label="password" append-icon="mdi-lock"
                                ref="password" outlined type="password"
                                :rules="[() => !!password || 'password is required']"
                                :error-messages="messages.password"></v-text-field>
                  <v-text-field v-model="confirmPassword" label="confirm password" append-icon="mdi-lock-question"
                                ref="confirmPassword" outlined type="password"
                                :rules="[() => !!confirmPassword || 'please input your password again']"
                                :error-messages="messages.confirmPassword"></v-text-field>
                  <v-autocomplete v-model="gender" label="gender" append-icon="mdi-earth"
                                  ref="gender" outlined :items="genders"
                                  :rules="[() => !!gender || 'gender is required']"></v-autocomplete>
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
                <v-btn color="primary" text @click="register" class="title">Register</v-btn>
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
    name: 'Register',
    data() {
      return {
        username: '',
        realname:'',
        password: '',
        confirmPassword: '',
        gender: '',
        genders: ['male','female'],
        errors: {
          username: false,
          password: false,
          confirmPassword: false,
        },
        messages: {
          username: '',
          password: '',
          confirmPassword: '',
        },
        formHasErrors: false,
        app: this.$root.$children[0]
      }
    },
    computed: {
      form: function () {
        return {
          username: this.username,
          realname: this.realname,
          password: this.password,
          confirmPassword: this.confirmPassword,
          gender: this.gender
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
    watch: {
      username() {
        const usernamePattern = /^([a-z]|-)+([a-z]|[0-9]|-|_)*$/i;
        if (this.username) {
          if (this.username.length < 5 || this.username.length > 32) {
            this.errors.username = true;
            this.messages.username = 'should be 5~32 characters';
          } else if (!usernamePattern.test(this.username)) {
            this.errors.username = true;
            this.messages.username = 'only support letters/numbers/-/_ and should begin with letter/-';
          } else {
            this.errors.username = false;
            this.messages.username = '';
          }
        } else {
          this.errors.username = false;
          this.messages.username = '';
        }
      },
      password() {
        if (this.password) {
          if (this.password.length < 6 || this.password.length > 32) {
            this.errors.password = true;
            this.messages.password = 'should be 6~32 characters';
          } else {
            const patterns = [/[a-z]/i, /[0-9]/, /-/, /_/];
            let kinds = 0;
            // 遍历字符串，计算字符种类
            for (let i = 0; i < patterns.length; i++) {
              if (patterns[i].test(this.password)) {
                kinds++;
              }
            }
            if (kinds < 2) {
              this.errors.password = true;
              this.messages.password = 'should contain at least 2 kinds in letter/number/-/_';
            } else if (this.password.search(this.username) !== -1) {
              this.errors.password = true;
              this.messages.password = 'shouldn\'t contain username';
            } else {
              this.errors.password = false;
              this.messages.password = '';
            }
          }
        } else {
          this.errors.password = false;
          this.messages.password = '';
        }
        // 最后检查一下确认密码是否出现问题
        if (this.confirmPassword) {
          if (this.confirmPassword !== this.password) {
            this.errors.confirmPassword = true;
            this.messages.confirmPassword = 'two inputs don\'t match'
          } else {
            this.errors.confirmPassword = false;
            this.messages.confirmPassword = '';
          }
        } else {
          this.errors.confirmPassword = false;
          this.messages.confirmPassword = '';
        }
      },
      confirmPassword() {
        if (this.confirmPassword) {
          if (this.confirmPassword !== this.password) {
            this.errors.confirmPassword = true;
            this.messages.confirmPassword = 'two inputs don\'t match'
          } else {
            this.errors.confirmPassword = false;
            this.messages.confirmPassword = '';
          }
        } else {
          this.errors.confirmPassword = false;
          this.messages.confirmPassword = '';
        }
      },
    },
    methods: {
      openStart: function () {
        this.$router.push({path: '/'});
      },
      openLogin: function () {
        this.$router.push({path: '/login'});
      },
      resetForm() {
        if (this.app.overlay === true) {
          return;
        }

        this.formHasErrors = false;
        Object.keys(this.form).forEach(f => {
          this.$refs[f].reset();
        });
      },
      register() {
        this.formHasErrors = false;
        Object.keys(this.form).forEach(f => {
          this.$refs[f].validate(true);
          if (!this.$refs[f].valid) {
            this.formHasErrors = true;
          }
        });
        if (this.errors.username || this.errors.password
                || this.errors.confirmPassword) {
          this.formHasErrors = true;
        }
        if (!this.formHasErrors) {
          // 验证成功,显示 overlay
          this.app.overlay = true;
          this.$axios.post('/signUp', {
                    username: this.username,
                    name: this.realname,
                    password: this.password,
                    gender: this.gender
                  }
          )
                  .then(resp => {
                    // 根据后端的返回数据修改
                    if (resp.status === 200) {
                      this.app.message(resp.data.message, 'success');
                      this.app.overlay = false;
                      // 跳转到 login
                      this.$router.replace({path: '/login'});
                    } else {
                      this.app.message('register error', 'error');
                      this.app.overlay = false;
                    }
                  })
                  .catch(error => {
                    this.app.message(error.message ? error.message :
                            'register fail, please check your network connection', 'error');
                    this.app.overlay = false;
                  })
        }
      }
    },
    beforeRouteEnter: (to, from, next) => {
      // 如果在已登录情况下使用url进入注册界面，则将url转到 Welcome 页面
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
</style>
