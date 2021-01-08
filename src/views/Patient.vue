<template>
    <v-app id="patient">
        <Navigation :show-drawer="false"></Navigation>
        <v-content>
            <v-container fluid>
                <v-row justify="center" align="center">
                    <v-col cols="12" sm="10">
                        <!--病人详细信息-->
                        <MyCard>
                            <v-card-title>
                                Patient Information
                            </v-card-title>
                            <v-divider></v-divider>
                            <PatientInfo :patient="patient"></PatientInfo>
                        </MyCard>

                        <MyCard>
                            <!-- 不同职业的事务处理页 -->
                            <template v-if="profession === DOCTOR">
                                <v-card-title>Patient Operations</v-card-title>
                                <v-divider></v-divider>
                                <DoctorControl :patient.sync="patient"></DoctorControl>
                            </template>

                            <template v-if="profession === WARD_NURSE">
                                <v-card-title>Patient Operations</v-card-title>
                                <v-divider></v-divider>
                                <WardControl :patient.sync="patient"></WardControl>
                            </template>
                        </MyCard>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import Navigation from "../components/Navigation";
    import MyCard from "../components/MyCard"
    import PatientInfo from "../components/patient/PatientInfo";
    import DoctorControl from "../components/patient/doctor/DoctorControl";

    import patients_fake from "../data/workspace/patients"
    import constant from "../config/constant"
    import WardControl from "../components/patient/wardNurse/WardControl";

    export default {
        name: "Patient",
        components: {WardControl, DoctorControl, PatientInfo, Navigation, MyCard},
        data(){
            return{
                app: this.$root.$children[0],
                patient:'',
                profession:'',
                DOCTOR: constant.DOCTOR,
                WARD_NURSE: constant.WARD_NURSE
            }
        },
        mounted() {
            this.setPatient();
            this.setProfession();
        },
        methods:{
            setPatient(){
                // this.patient = patients_fake.PATIENT;
                let id = this.$route.params.id;
                this.app.overlay = true;
                this.$axios.get('/user/medic/patient?id='+id)
                    .then(res => {
                        if (res.status === 200) {
                            this.patient = res.data;
                        } else {
                            this.app.message('Fail to get patient', 'error');
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
            setProfession(){
                this.app.overlay = true;
                this.$axios.get('/user/profession')
                    .then(res => {
                        if (res.status === 200) {
                            this.profession = res.data.profession;
                            // this.app.message('Get my profession successfully', 'success');
                        } else {
                            this.app.message('Fail to get my profession', 'error');
                        }
                    })
                    .catch(error => {
                        this.app.message(error.message ? error.message :
                            'operation fail, please check your network connection', 'error');
                    })
                    .finally(() => {
                        this.app.overlay = false;
                    });
            }
        }
    }
</script>

<style scoped>

</style>