<template>
  <div id="systemMessages">
    <template>
      <v-card class="mx-auto" max-width="90%">
        <v-card dark flat>
          <v-card-title class="pa-2 blue lighten-1">
            <h3 class="title font-weight-light text-center grow">
              Timeline
            </h3>
          </v-card-title>
        </v-card>
        <v-card-text class="py-0">
          <v-timeline
                  align-top
                  dense
          >
            <v-timeline-item v-for="msg in messages" :key="msg.time"
                    color="blue"
                    small
            >
              <v-row class="pt-1">
                <v-col cols="3">
                  <strong>{{msg.time}}</strong>
                </v-col>
                <v-col>
                  <strong>Title</strong>
                  <div class="caption">
                    {{msg.content}}
                  </div>
                  <v-btn text color="primary" @click="checkPatient(msg.patientId)">Check Patient</v-btn>
                </v-col>
              </v-row>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </template>
  </div>
</template>

<script>
  import messages_fake from "../../data/message/messages"
  export default {
    name: 'MessageCenterDefault',
    data() {
      return {
        app:this.$root.$children[0],
        loading: false,
        messages: []
      }
    },
    mounted(){
      this.setMessages();
    },
    methods:{
      setMessages(){
        this.app.overlay = true;
        this.$axios.get('/user/medic/messages')
                .then(res => {
                  if (res.status === 200) {
                    this.messages = res.data.messages;
                    this.app.message('Get my messages successfully', 'success');
                  } else {
                    this.app.message('Fail to get my messages', 'error');
                  }
                })
                .catch(error => {
                  this.app.message(error.message ? error.message :
                          'operation fail, please check your network connection', 'error');
                })
                .finally(() => {
                  this.app.overlay = false;
                });
      },
      checkPatient(id){
        let url = '/patient/' + id;
        window.open(url, '_blank');
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
    },
  }
</script>
