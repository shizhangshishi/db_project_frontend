<template>
    <v-form v-model="form" ref="form">
        <v-autocomplete v-model="region" label="region" append-icon="mdi-earth"
                        ref="region" outlined :items="regions"
                        ></v-autocomplete>
        <v-autocomplete v-model="condition" label="condition" append-icon="mdi-earth"
                        ref="condition" outlined :items="conditions"
                        ></v-autocomplete>
        <v-autocomplete v-model="state" label="condition" append-icon="mdi-earth"
                        ref="state" outlined :items="states"
                        ></v-autocomplete>
        <v-row justify="center" align="center">
            <v-btn color="primary" @click="check" style="margin: 0 30px">Select</v-btn>
            <v-btn color="red lighten-2"  @click="reset" style="margin: 0 30px">Reset</v-btn>
        </v-row>
    </v-form>
</template>

<script>
    import patients_fake from "../../../data/workspace/patients"

    import constant from "../../../config/constant"

    export default {
        name: "SelectForm",
        props:{
            showSelectDialog:{
                required:true
            },
            patients:{
                required: true
            }
        },
        data()
        {
            return{
                form:'',
                app: this.$root.$children[0],
                region:'',
                condition:'',
                state:'',

                regions:[constant.MILD, constant.SEVERE, constant.CRITICAL],
                conditions:[constant.MILD, constant.SEVERE, constant.CRITICAL],
                states:[constant.CURED, constant.TREATED, constant.DIED],

                testTag:true,
            }
        },
        mounted(){

        },
        methods:{
            check()
            {
                if (this.form){
                    this.getPatients();
                }
                else {
                    this.app.message('Fail to get patients', 'error');
                }
            },
            reset()
            {
                this.region = '';
                this.state = '';
                this.condition = '';
            },
            getPatients(){
                this.app.overlay = true;
                this.$axios.post('/user/medic/emergencynurse/patients',
                    {
                        region: this.region,
                        state: this.state,
                        condition: this.condition
                    }
                ).then(res => {
                    if (res.status === 200) {
                        this.app.message("Check patients successfully", 'success');
                        this.$emit("update:showSelectDialog",false);
                        this.$emit("update:patients",res.data.patients);
                    } else {
                        this.app.message('Fail to check', 'error');
                    }
                }).catch(error => {
                    this.app.message(error.message ? error.message :
                        'Operation fail, please check your network connection', 'error');
                }).finally(() => {
                    this.app.overlay = false;
                });
            },
        }
    }
</script>
