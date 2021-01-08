<template>
  <v-app id="admin">
    <Navigation :items="items"></Navigation>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
  import Navigation from "../../components/Navigation";

  export default {
    name: "Admin",
    data() {
      return {
        items: [
          {
            name: 'ManageUsers',
            icon: 'mdi-note-text',
            click: this.openManageUsers
          },
          {
            name: 'ManageResources',
            icon: 'mdi-note-text',
            click: this.openManageResources
          },
        ]
      }
    },
    components: {
      Navigation
    },
    methods: {
      openManageUsers() {
        if (this.$route.path !== '/admin/manageusers') {
          this.$router.push({path: '/admin/manageusers'});
        }
      },
      openManageResources() {
        if (this.$route.path !== '/admin/manageresources') {
          this.$router.push({path: '/admin/manageresources'});
        }
      }
    }
  }
</script>
