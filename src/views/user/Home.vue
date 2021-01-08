<template>
  <v-app id="home">
    <Navigation :items="items"></Navigation>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
  import Navigation from "../../components/Navigation";

  export default {
    name: 'Home',
    data() {
      return {
        items: [
          {
              name: 'Workspace',
              icon: 'mdi-view-grid',
              click: this.openWorkspace
          },
        ]
      }
    },
    components: {
      Navigation
    },
    methods: {
      openWorkspace: function () {
          if (this.$route.path !== '/home/workspace') {
              this.$router.push({path: '/home/workspace'});
          }
      },
    }
  }
</script>
