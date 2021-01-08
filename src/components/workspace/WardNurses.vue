<template>
    <v-container>
        <v-dialog max-width="600px" overlay-opacity="0.9" v-model="showPatients">
            <v-card>
                <v-card-title>
                    Patients
                    <v-spacer></v-spacer>
                    <v-icon @click="showPatients=false" size="35px" color="red">mdi-close-box</v-icon>
                </v-card-title>

                <v-card-text style="padding: 25px">
                    <v-data-table :headers="patient_headers" :items="patients" disable-sort>
                        <template v-slot:item.detail="{ item }">
                            <v-icon @click="checkPatient(item.id)">mdi-eye</v-icon>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-card>
            <v-card-text>
                <v-data-table :headers="headers" :items="wardNurses" disable-sort>
                    <template v-slot:item.patients="{ item }">
                        <v-icon @click="checkPatients(item.id)">mdi-face</v-icon>
                    </template>
                    <template v-slot:item.delete="{ item }" v-if="this.profession === HEAD_NURSE">
                        <v-icon @click="deleteNurse(item.id)">mdi-delete</v-icon>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    import wardNurses_fake from "../../data/workspace/wardNurses"
    import patients_fake from "../../data/workspace/patients"
    import constant from "../../config/constant"
    export default {
        name: "WardNurses",
        props:{
            profession:{
                required: true
            }
        },
        data() {
            return {
                app: this.$root.$children[0],
                wardNurses:[],
                HEAD_NURSE:constant.HEAD_NURSE,
                headers:[],

                patient_headers: [
                    {text: 'ID', align: 'center', value: 'id'},
                    {text: 'Name', align: 'center', value: 'name'},
                    {text: 'Region', value: 'region'},
                    {text: 'Condition', value: 'condition'},
                    {text: 'Detail', value: 'detail'}
                ],
                showPatients:false,
                patients:[]
            }
        },
        mounted(){
          this.setWardNurses();
          this.setHeaders();
        },
        methods: {
            setWardNurses(){
                // this.wardNurses = wardNurses_fake.WARD_NURSE;
                this.app.overlay = true;
                this.$axios.get('/user/medic/wardnurses')
                    .then(res => {
                        if (res.status === 200) {
                            this.wardNurses = res.data.users;
                        } else {
                            this.app.message('Fail to get wardNurses', 'error');
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
            setHeaders(){
                let headers1 = [
                    {text: 'ID', align: 'center', value: 'id'},
                    {text: 'Username', align: 'center', value: 'username'},
                    {text: 'Region', value: 'medic.region'},
                    {text: 'Patients', value: 'patients'},
                ];
                let headers2 = [
                    {text: 'ID', align: 'center', value: 'id'},
                    {text: 'Username', align: 'center', value: 'username'},
                    {text: 'Region', value: 'medic.region'},
                    {text: 'Patients', value: 'patients'},
                    {text: 'Delete', value: 'delete'},
                ];
                this.headers = (this.profession === constant.DOCTOR) ? headers1 : headers2;
            },
            checkPatient(patient_id){
                let url = '/patient/' + patient_id;
                window.open(url, '_blank');
            },
            checkPatients(wardNurse_id){
                this.showPatients = true;
                // this.patients = patients_fake.PATIENTS1;
                this.app.overlay = true;
                this.$axios.get('/user/medic/wardnurse/patients?id='+wardNurse_id)
                    .then(res => {
                        if (res.status === 200) {
                            this.patients = res.data.patients;
                        } else {
                            this.app.message('Fail to get wardNurse\'s patients', 'error');
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
            deleteNurse(id){
                this.app.overlay = true;
                this.$axios.post('/user/medic/headnurse/wardnurse/delete',
                    {
                        id : id
                    }
                ).then(res => {
                    if (res.status === 200) {
                        this.app.message("Delete wardNurse successfully", 'success');
                        this.setWardNurses();
                    }
                    else{
                        this.app.message("Fail to delete. This wardNurse has patients.", 'warning');
                    }
                }).catch(error => {
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