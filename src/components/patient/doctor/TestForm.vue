<template>
    <v-form v-model="form" ref="form">
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
            <v-btn color="primary" @click="test" style="margin: 0 30px">Test</v-btn>
            <v-btn color="red lighten-2"  @click="reset" style="margin: 0 30px">Reset</v-btn>
        </v-row>
    </v-form>
</template>

<script>
    import constant from "../../../config/constant"
    export default {
        name: "TestForm",
        props:{
            showTestDialog:{
                required:true
            },
            patient:{
                required:true
            }
        },
        data()
        {
            return{
                form:'',
                app: this.$root.$children[0],
                date:'',
                result:'',
                condition:'',

                conditions:[constant.MILD, constant.SEVERE, constant.CRITICAL],
                results:[constant.POSITIVE, constant.NEGATIVE],

                show:false,
            }
        },
        methods:{
            test()
            {
                if (this.form){
                    this.app.overlay = true;
                    this.$axios.post('/user/medic/doctor/patient/test',
                        {
                            id : this.patient.id,
                            date: this.date,
                            result: this.result,
                            condition: this.condition
                        }
                    ).then(res => {
                        if (res.status === 200) {
                            this.app.message("Test patient successfully", 'success');
                            this.$emit("update:showTestDialog",false);
                        }
                        else {
                            this.app.message('Fail to test.There is no bed or ward nurse', 'warning');
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
                this.result = '';
                this.condition = '';
                this.date = '';
            }
        }
    }
</script>
