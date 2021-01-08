<template>
  <v-container>
    <EmerControl v-if="profession === EMERGENCY_NURSE"></EmerControl>
    <DoctorControl v-else-if="profession === DOCTOR"></DoctorControl>
    <HeadControl v-else-if="profession === HEAD_NURSE"></HeadControl>
    <WardControl v-else-if="profession === WARD_NURSE"></WardControl>
    <v-container v-else>
      <v-card>
        <v-card-title class="title">No Authority</v-card-title>
        <v-card-text>You have no authority for this system.</v-card-text>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
    import EmerControl from "../workspace/emergency_nurse/EmerControl";
    import DoctorControl from "../workspace/doctor/DoctorControl";
    import HeadControl from "../workspace/head_nurse/HeadControl";
    import WardControl from "../workspace/ward_nurse/WardControl";

    import constant from "../../config/constant"

    export default {
      name: 'Workspace',
      components: {WardControl, HeadControl, DoctorControl, EmerControl},
      data(){
        return{
          app:this.$root.$children[0],
          profession:'',
          DOCTOR:constant.DOCTOR,
          HEAD_NURSE:constant.HEAD_NURSE,
          WARD_NURSE:constant.WARD_NURSE,
          EMERGENCY_NURSE:constant.EMERGENCY_NURSE
        }
      },
      mounted(){
        this.setProfession();
      },
      methods:{
        setProfession(){
          this.app.overlay = true;
          this.$axios.get('/user/profession')
                  .then(res => {
                    if (res.status === 200) {
                      this.profession = res.data.profession;
                      // this.app.message('Get my profession successfully', 'success');
                    } else {
                      this.app.message('Fail to get my profession', 'error');
                    }
                  })
                  .catch(error => {
                    this.app.message(error.message ? error.message :
                            'operation fail, please check your network connection', 'error');
                  })
                  .finally(() => {
                    this.app.overlay = false;
                  });
        }
      },
      computed: {
            whiteOpacity: function () {
                // 用来调整组件在不同主题下的透明度
                return this.$vuetify.theme.dark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)';
            }
        }
    }
</script>
