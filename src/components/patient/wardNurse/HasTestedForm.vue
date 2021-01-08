<template>
    <v-form v-model="form" ref="form">
        <v-text-field v-model="date" label="date" ref="date" @click="show=true"
                      append-icon="mdi-calendar-alert" outlined readonly
                      :rules="[() => !!date || 'date is required']"
        ></v-text-field>
        <v-date-picker v-model="date" @input="show = false" v-if="show"
                       :rules="[() => !!data || 'data is required']"></v-date-picker>
        <v-row justify="center" align="center">
            <v-btn color="primary" @click="hasTested" style="margin: 0 30px">Ask</v-btn>
            <v-btn color="red lighten-2"  @click="reset" style="margin: 0 30px">Reset</v-btn>
        </v-row>
    </v-form>
</template>

<script>
    export default {
        name: "HasTestedForm",
        props:{
            showHasTestedDialog:{
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
                show:false,
            }
        },
        methods:{
            hasTested()
            {
                if (this.form){
                    this.app.overlay = true;
                    let params = "id="+ this.patient.id+"&&date="+this.date;
                    this.$axios.get('/user/medic/wardnurse/patient/test?'+params).
                    then(res => {
                        if (res.status === 200) {
                            this.app.message("Patient has been tested on "+this.date, 'success');
                        }
                        else {
                            this.app.message("Patient has not been tested on "+this.date, 'warning');
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
            }
        }
    }
</script>
