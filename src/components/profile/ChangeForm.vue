<template>
    <v-card>
        <v-card-text>
            <v-form v-model="form" ref="form">
                <v-text-field v-model="name" ref="name" label="realname"
                              prepend-inner-icon="mdi-account"
                              :rules="[() => !!name || 'name is required!']">
                </v-text-field>
                <v-text-field v-model="password" ref="password" label="password"
                              prepend-inner-icon="mdi-fingerprint" type="password"
                              :rules="[() => !!password || 'password is required!']"></v-text-field>
                <v-radio-group v-model="gender" ref="gender" label="gender"
                               prepend-inner-icon="mdi-human"
                               :rules="[() => !!gender || 'gender is required!']">
                    <v-radio label="male" :value="MALE"></v-radio>
                    <v-radio label="female" :value="FEMALE"></v-radio>
                </v-radio-group>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" text @click="change">Change</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import constant from "../../config/constant"
    export default {
        name: "ChangeForm",
        props:{
            showChangeDialog:{
                required: true
            },
        },
        data(){
            return{
                app:this.$root.$children[0],
                form:'',
                name:'',
                password:'',
                gender:'',

                MALE: constant.MALE,
                FEMALE: constant.FEMALE
            }
        },
        methods:{
            change(){
                if (this.form){
                    this.app.overlay = true;
                    this.$axios.post('/user/profile/change',{
                        password: this.password,
                        gender:this.gender,
                        name: this.name
                    })
                        .then(res =>{
                            if (res.status === 200){
                                let tmp = this.$store.state.profile;
                                tmp.name = this.name;
                                tmp.gender = this.gender;
                                this.$store.commit('setProfile', tmp);
                                this.app.message("Change profile successfully","success");
                                this.$emit("update:showChangeDialog", false);
                            }
                        })
                        .catch(error => {
                            this.app.message(error.message ? error.message :
                                'Operation fail, please check your network connection', 'error');
                        }).finally(() => {
                        this.app.overlay = false;
                    });
                }
               else {
                   this.app.message("Please complete the form.","error");
                }
            }
        }
    }
</script>

<style scoped>

</style>