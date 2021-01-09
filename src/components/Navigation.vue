<template>
  <div id="navigation">
    <v-dialog v-model="showProfile" overlay-opacity="0.9" max-width="500px" v-if="isUser">
      <profile :showProfile.sync="showProfile"></profile>
    </v-dialog>
    <v-dialog v-model="confirmLogout" overlay-opacity="0.9" width="300px">
      <v-card shaped :color="whiteOpacity">
        <v-card-title class="headline">Logout</v-card-title>
        <v-card-text class="title">Are you sure to logout?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :color="whiteOpacity" rounded @click="confirmLogout = false">No</v-btn>
          <v-btn :color="whiteOpacity" rounded @click="logout">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-navigation-drawer app clipped v-model="drawer" v-if="showDrawer" :color="drawerColor">
      <v-list rounded>
        <v-subheader class="title">Navigation</v-subheader>

        <v-list-item link v-for="(item, index) in shownItems" @click="item.click" :key="index">
          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{item.name}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left flat color="rgba(255,255,255, 0)">
      <v-app-bar-nav-icon class="d-lg-none" v-if="showDrawer" @click.stop="drawer = !drawer"/>
      <v-img src="../assets/MyChair_logo.png" alt="MyChair Logo" max-height="50px" max-width="50px"></v-img>
      <v-btn text class="d-none d-md-flex" @click="openHome">
        <v-toolbar-title class="headline">
          MyHospital
        </v-toolbar-title>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn text v-if="hasLoggedIn" @click="openHome">
        <v-icon>mdi-home-outline</v-icon>
        <div class="d-none d-md-flex">Home</div>
      </v-btn>
      <v-btn text @click="changeTheme">
        <v-icon>mdi-image-multiple</v-icon>
        <div class="d-none d-md-flex">{{isDark ? 'Light' : 'Dark'}}</div>
      </v-btn>
      <v-btn text v-if="hasLoggedIn" @click="openMessageCenter">
        <v-icon>mdi-card-text-outline</v-icon>
        <div class="d-none d-md-flex">Message</div>
      </v-btn>

      <v-menu open-on-hover bottom offset-y v-if="hasLoggedIn">
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">
            <v-icon>mdi-account-circle-outline</v-icon>
            <div class="d-none d-md-flex">Account</div>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="showProfile = true">
            <v-list-item-title>{{username}}</v-list-item-title>
          </v-list-item>
          <v-list-item @click="confirmLogout = true">
            <v-list-item-title>logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn text v-if="!hasLoggedIn" @click="openLogin">
        <v-icon>mdi-login</v-icon>
        <div class="d-none d-md-flex">Login</div>
      </v-btn>
      <v-btn text v-if="!hasLoggedIn" @click="openRegister">
        <v-icon>mdi-account-arrow-right-outline</v-icon>
        <div class="d-none d-md-flex">Register</div>
      </v-btn>

    </v-app-bar>
  </div>
</template>

<script>
  import Profile from "./profile/Profile";
  export default {
    name: 'Navigation',
    components: {Profile},
    props: {
      items: {},
      showDrawer: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        drawer: null,
        confirmLogout: false,
        showProfile: false
      }
    },
    computed: {
      username: function () {
        return this.$store.state.profile ? this.$store.state.profile.username : 'Medic';
      },
      isUser: function () {
        return this.$store.state.profile &&
          this.$store.state.profile.role === 'USER';
      },
      hasLoggedIn: function () {
        return this.$store.state.token;
      },
      isDark: function () {
        // 当前页面是否是深色主题
        return this.$vuetify.theme.dark;
      },
      whiteOpacity: function () {
        // 用来调整组件在不同主题下的透明度
        return this.isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)';
      },
      drawerColor: function () {
        return (this.$vuetify.breakpoint.name === 'lg' || this.$vuetify.breakpoint.name === 'xl') ?
          'rgba(255, 255, 255, 0)' : '';
      },
      shownItems: function () {
        let result = [];
        let auth = this.$store.state.profile.role === 'ADMIN' ?
          'requireUserAuth' : 'requireAdminAuth';
        let num = this.items.length;
        for (let i = 0; i < num; i++) {
          let thisItem = this.items[i];
          if (!thisItem[auth]) {
            result.push(thisItem);
          }
        }
        return result;
      }
    },
    methods: {
      openHome: function () {
        if (this.hasLoggedIn) {
          if (this.$route.path !== '/home' && this.$route.path !== '/admin') {
            if (this.$store.state.profile.role === 'ADMIN') {
                this.$router.push({path: '/admin'});
              } else {
                this.$router.push({path: '/home'});
            }
          }
        } else {
          if (this.$route.path !== '/') {
            this.$router.push({path: '/'});
          }
        }
      },
      openMessageCenter: function () {
        if (this.$route.path !== '/messagecenter') {
          this.$router.push({path: '/messagecenter'});
        }
      },
      openLogin: function () {
        this.$router.push({path: '/login'});
      },
      openRegister: function () {
        this.$router.push({path: '/register'});
      },
      logout: function () {
        this.$store.commit('logout');
        this.$router.push({path: '/login'});
      },
      changeTheme: function () {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        this.$store.commit('changeTheme', this.$vuetify.theme.dark);
      }
    }
  }
</script>
