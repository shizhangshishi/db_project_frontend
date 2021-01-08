<template>
    <v-form v-model="form" ref="form">
        <v-text-field v-model="name" label="name" append-icon="mdi-account"
                      ref="name" outlined
                      :rules="[() => !!name || 'name is required']"
        ></v-text-field>
        <v-text-field v-model="address" label="address" append-icon="mdi-lock"
                      ref="address" outlined
                      :rules="[() => !!address || 'address is required']"
        ></v-text-field>
        <v-autocomplete v-model="gender" label="gender" append-icon="mdi-earth"
                        ref="gender" outlined :items="genders"
                        :rules="[() => !!gender || 'gender is required']"></v-autocomplete>


        <v-autocomplete v-model="result" label="result" append-icon="mdi-earth"
                        ref="result" outlined :items="results"
                        :rules="[() => !!result || 'result is required']"></v-autocomplete>
        <v-autocomplete v-model="condition" label="condition" append-icon="mdi-earth"
                        ref="condition" outlined :items="conditions"
                        :rules="[() => !!condition || 'condition is required']"></v-autocomplete>
        <v-text-field v-model="date" label="date" ref="date" @click="show=true"
                      append-icon="mdi-calendar-alert" outlined readonly
                      :rules="[() => !!date || 'date is required']"
        ></v-text-field>
        <v-date-picker v-model="date" @input="show = false" v-if="show"></v-date-picker>
        <v-row justify="center" align="center">
            <v-btn color="primary" @click="enroll" style="margin: 0 30px">Enroll</v-btn>
            <v-btn color="red lighten-2"  @click="reset" style="margin: 0 30px">Reset</v-btn>
        </v-row>
    </v-form>
</template>

<script>
    import constant from "../../../config/constant"
    export default {
        name: "EnrollForm",
        props:{
            showEnrollDialog:{
                required:true
            }
        },
        data()
        {
            return{
                form:'',
                app: this.$root.$children[0],
                name:'',
                address:'',
                gender:'',
                date:'',
                result:'',
                condition:'',

                genders:[constant.MALE,constant.FEMALE],
                conditions:[constant.MILD, constant.SEVERE, constant.CRITICAL],
                results:[constant.POSITIVE, constant.NEGATIVE],

                show:false,
            }
        },
        mounted(){

        },
        methods:{
            enroll()
            {
                if (this.form){
                    let params =  {
                        patientInfo: {
                            name: this.name,
                            address: this.address,
                            gender: this.gender
                        },
                        testInfo: {
                            date: this.date,
                            result: this.result,
                            condition: this.condition
                        }
                    };
                    // console.log(params);
                    this.app.overlay = true;
                    this.$axios.post('/user/medic/emergencynurse/patient/enroll',
                       params
                    ).then(res => {
                        if (res.status === 200) {
                            this.app.message("Enroll patient successfully", 'success');
                            this.$emit("update:showEnrollDialog",false);
                        }
                        else {
                            this.app.message('Fail to enroll.There is no bed or ward nurse', 'warning');
                        }
                    }).catch(error => {
                        this.app.message(error.message ? error.message :
                            'Operation fail, please check your network connection', 'error');
                    }).finally(() => {
                        this.app.overlay = false;
                    });
                }
                else {
                    this.app.message('Please complete the form', 'error');
                }
            },
            reset()
            {
                this.name = '';
                this.gender = '';
                this.address = '';
                this.result = '';
                this.condition = '';
                this.date = '';
            }
        }
    }
</script>
