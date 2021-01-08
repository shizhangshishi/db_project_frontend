<template>
  <v-card width="100%" height="100%" color="black">
    <v-container>
      <v-row>
        <v-btn fab small href="/" color="#ff7036">
          <v-icon large>mdi-arrow-left-bold</v-icon>
        </v-btn>
      </v-row>
      <v-row justify="center" class="mt-10">
        <v-card-title class="display-3 font-weight-bold white--text text-no-wrap">{{errorMessage}}</v-card-title>
      </v-row>
      <v-row justify="center">
        <v-card-subtitle class="title white--text">This page has jumped to another world line</v-card-subtitle>
      </v-row>
      <v-row justify="center">
        <v-img src="../assets/NotFound.jpg"></v-img>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
    export default {
        name: 'NotFound',
        data() {
            return {
                statusCode: {
                    400: '400 Bad Request',
                    403: '403 Forbidden',
                    404: '404 Not Found',
                    406: '406 Not Acceptable'
                }
            }
        },
        computed: {
            errorMessage: function () {
                if (/^\/error\/40[0346]$/.test(this.$route.path)) {
                    return this.statusCode[this.$route.params.id];
                } else {
                    return this.statusCode[404];
                }
            }
        }
    }
</script>
