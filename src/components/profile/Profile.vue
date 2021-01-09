<template>
    <v-container>
        <!--修改个人信息弹框-->
        <v-dialog max-width="600px" overlay-opacity="0.9" v-model="showChangeDialog">
            <v-card>
                <v-card-title>
                    Change My Profile
                    <v-spacer></v-spacer>
                    <v-icon @click="showChangeDialog=false" size="35px" color="red">mdi-close-box</v-icon>
                </v-card-title>

                <v-card-text style="padding: 25px">
                    <ChangeForm :showChangeDialog.sync="showChangeDialog"></ChangeForm>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-card shaped>
            <v-card-title class="headline">My Profile</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-container fluid>
                    <v-row>
                        <v-col cols="12" md="4"><b>Username:</b></v-col>
                        <v-col>{{profile.username}}</v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="4"><b>Realname:</b></v-col>
                        <v-col>{{profile.name}}</v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="4"><b>Gender:</b></v-col>
                        <v-col>{{profile.gender}}</v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="4"><b>Profession:</b></v-col>
                        <v-col>{{profession}}</v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="4"><b>Region:</b></v-col>
                        <v-col>{{region}}</v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-btn text color="primary" @click="change">change</v-btn>
                <v-btn text color="red" @click="close">close</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
    import ChangeForm from "./ChangeForm";
    export default {
        name: "profile",
        components: {ChangeForm},
        props:{
          showProfile:{
              required: true
          }
        },
        data(){
            return{
                app:this.$root.$children[0],
                showChangeDialog:false,
                profile:{}
            }
        },
        computed:{
            profession(){
                  return this.profile.medic ? this.profile.medic.profession : '';
              },
            region(){
                return this.profile.medic ? this.profile.medic.region : '';
            }
        },
        mounted(){
            this.setProfile();
        },
        methods:{
            setProfile(){
                this.profile = this.$store.state.profile;
            },
            change(){
                this.showChangeDialog = true;
            },
            close(){
                this.$emit("update:showProfile",false);
            }
        }
    }
</script>

<style scoped>

</style>