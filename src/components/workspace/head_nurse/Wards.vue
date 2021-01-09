<template>
    <v-container>
        <v-dialog max-width="600px" overlay-opacity="0.9" v-model="showBeds">
            <v-card>
                <v-card-title>
                    Beds
                    <v-spacer></v-spacer>
                    <v-icon @click="showBeds=false" size="35px" color="red">mdi-close-box</v-icon>
                </v-card-title>

                <v-card-text style="padding: 25px">
                    <v-data-table :headers="bed_headers" :items="beds" disable-sort>
                        <template v-slot:item.detail="{ item }">
                            <v-icon @click="checkPatient(item.patient)">mdi-eye</v-icon>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-card>
            <v-card-text>
                <v-data-table :headers="headers" :items="wards" disable-sort>
                    <template v-slot:item.beds="{ item }">
                        <v-icon @click="checkBeds(item.id)">mdi-sofa</v-icon>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: "Wards",
        data() {
            return {
                app: this.$root.$children[0],
                wards:[],
                headers:[
                    {text: 'ID', align: 'center', value: 'id'},
                    {text: 'Region', value: 'region'},
                    {text: 'Beds', value: 'beds'},
                ],
                bed_headers:[
                    {text: 'ID', align: 'center', value: 'id'},
                    // {text: 'Region', value: 'patient.region'},
                    {text: 'Patient', value: 'patient.name'},
                    {text: 'Patient\' Detail', value: 'detail'}
                ],
                showBeds:false,
                beds:[]
            }
        },
        mounted(){
            this.setWards();
        },
        methods: {
            hasPatient(item){
                return item.patient != null;
            },
            setWards(){
                this.app.overlay = true;
                this.$axios.get('/user/medic/headnurse/wards')
                    .then(res => {
                        if (res.status === 200) {
                            this.wards = res.data.wards;
                        } else {
                            this.app.message('Fail to get wards', 'error');
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
            checkBeds(ward_id){
                this.showBeds = true;
                this.app.overlay = true;
                this.$axios.get('/user/medic/headnurse/ward/wardbeds?id='+ward_id)
                    .then(res => {
                        if (res.status === 200) {
                            this.beds = res.data.wardBeds;
                            this.app.message('Get beds successfully', 'success');
                        } else {
                            this.app.message('Fail to get beds', 'error');
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
            checkPatient(patient){
                if (patient){
                    let url = '/patient/' + patient.id;
                    window.open(url, '_blank');
                }
            }
        }
    }
</script>

<style scoped>

</style>