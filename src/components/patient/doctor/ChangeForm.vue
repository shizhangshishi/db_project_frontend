<template>
    <v-card>
        <v-card-text>
            <v-form v-model="form" ref="form">
                <v-radio-group v-model="condition" ref="condition" label="condition" prepend-icon="mdi-heart">
                    <v-radio label="mild" :value="MILD"></v-radio>
                    <v-radio label="server" :value="SEVERE"></v-radio>
                    <v-radio label="critical" :value="CRITICAL"></v-radio>
                </v-radio-group>

                <v-radio-group v-model="state" ref="state" label="state" prepend-icon="mdi-heart">
                    <v-radio label="treated" :value="TREATED"></v-radio>
                    <v-radio label="cured" :value="CURED"></v-radio>
                    <v-radio label="died" :value="DIED"></v-radio>
                </v-radio-group>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" text @click="change">Change</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import constant from "../../../config/constant"
    export default {
        name: "ChangeForm",
        props:{
            showChangeDialog:{
                required: true
            },
            patient:{
                required: true
            }
        },
        data(){
            return{
                app:this.$root.$children[0],
                form:'',
                condition:'',
                state:'',

                MILD:constant.MILD,
                SEVERE:constant.SEVERE,
                CRITICAL:constant.CRITICAL,

                CURED: constant.CURED,
                TREATED: constant.TREATED,
                DIED: constant.DIED
            }
        },
        methods:{
            change(){
               this.app.overlay = true;
               this.$axios.post('/user/medic/doctor/patient/change',{
                   id: this.patient.id,
                   condition:this.condition,
                   state: this.state
               })
                   .then(res =>{
                       if (res.status === 200){
                           this.app.message("Change patient successfully","success");
                           this.$emit("update:showChangeDialog", false);
                           let tmp = this.patient;
                           if (this.condition)
                               tmp.condition = this.condition;
                           if (this.state)
                               tmp.state = this.state;
                           this.$emit("update:patient",tmp);
                       }
                   })
                   .catch(error => {
                       this.app.message(error.message ? error.message :
                           'Operation fail, please check your network connection', 'error');
                   }).finally(() => {
                   this.app.overlay = false;
               });
            }
        }
    }
</script>

<style scoped>

</style>