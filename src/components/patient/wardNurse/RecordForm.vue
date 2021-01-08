<template>
    <v-form v-model="form" ref="form">
        <v-text-field v-model="temperature" label="temperature" append-icon="mdi-earth"
                      ref="temperature" outlined
                      :rules="[() => !!temperature || 'temperature is required']"></v-text-field>

        <v-text-field v-model="symptom" label="symptom" append-icon="mdi-earth"
                      ref="symptom" outlined
                      :rules="[() => !!symptom || 'symptom is required']"></v-text-field>

        <v-autocomplete v-model="state" label="state" append-icon="mdi-earth"
                        ref="state" outlined :items="states"
                        :rules="[() => !!state || 'state is required']"></v-autocomplete>

        <v-autocomplete v-model="result" label="result" append-icon="mdi-earth"
                        ref="result" outlined :items="results"
                        :rules="[() => !!result || 'result is required']"></v-autocomplete>

        <v-text-field v-model="date" label="date" ref="date" @click="show=true"
                      append-icon="mdi-calendar-alert" outlined readonly
                      :rules="[() => !!date || 'date is required']"
        ></v-text-field>
        <v-date-picker v-model="date" @input="show = false" v-if="show"></v-date-picker>
        <v-row justify="center" align="center">
            <v-btn color="primary" @click="test" style="margin: 0 30px">Make</v-btn>
            <v-btn color="red lighten-2"  @click="reset" style="margin: 0 30px">Reset</v-btn>
        </v-row>
    </v-form>
</template>

<script>
    import constant from "../../../config/constant"
    export default {
        name: "RecordForm",
        props:{
            showRecordDialog:{
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
                date: '',
                temperature: '',
                symptom: '',
                state: '',
                result: '',

                states:[constant.TREATED, constant.CURED, constant.DIED],
                results:[constant.POSITIVE, constant.NEGATIVE],

                show:false,
            }
        },
        methods:{
            test()
            {
                if (this.form){
                    this.app.overlay = true;
                    this.$axios.post('/user/medic/wardnurse/patient/register',
                        {
                            id : this.patient.id,
                            date: this.date,
                            temperature: this.temperature,
                            symptom: this.symptom,
                            state: this.state,
                            result: this.result,
                        }
                    ).then(res => {
                        if (res.status === 200) {
                            this.app.message("Make daily record for patient successfully", 'success');
                            this.$emit("update:showRecordDialog",false);
                        }
                        else {
                            this.app.message('Fail to make record.There is something wrong', 'warning');
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
                this.date = '';
                this.temperature='';
                this.symptom='';
                this.state='';
                this.result = '';
            }
        }
    }
</script>
