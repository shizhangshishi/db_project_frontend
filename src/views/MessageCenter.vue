<template>
  <v-app id="messageCenter" :class="bgStyle">
    <Navigation :items="items"></Navigation>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
  import Navigation from "../components/Navigation";

  export default {
    name: 'MessageCenter',
    data() {
      return {
        items: [
          {
            name: 'System messages.js',
            icon: 'mdi-note-text',
            click: this.openSystemMessages,
          }
        ]
      }
    },
    components: {
      Navigation
    },
    methods: {
      openSystemMessages: function () {
        if (this.$route.path !== '/messagecenter') {
          this.$router.push({path: '/messagecenter'});
        }
      },
    },
    computed: {
      bgStyle: function () {
        return this.$vuetify.theme.dark ? 'darkBg' : 'lightBg';
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
