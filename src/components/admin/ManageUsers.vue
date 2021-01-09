<template>
    <div id="manageUsers">
        <v-dialog v-model="showDialog" overlay-opacity="0.9" width="500px">
            <v-card shaped>
                <v-card-title class="headline">Allocate Role</v-card-title>
                <v-card-text class="title">
                    <v-form v-model="form" ref="form">
                        <v-radio-group v-model="selectedProfession" prepend-icon="mdi-account"
                                       :rules="[() => !!selectedProfession || 'profession is required']">
                            <v-label>select profession</v-label>
                            <v-radio label="doctor" :value="DOCTOR" selected></v-radio>
                            <v-radio label="emergency_nurse" :value="EMERGENCY_NURSE"></v-radio>
                            <v-radio label="head_nurse" :value="HEAD_NURSE"></v-radio>
                            <v-radio label="ward_nurse" :value="WARD_NURSE"></v-radio>
                        </v-radio-group>
                        <v-radio-group v-model="selectedRegion" prepend-icon="mdi-hospital">
                            <v-label>select region</v-label>
                            <v-radio label="mild" :value="MILD" selected></v-radio>
                            <v-radio label="serve" :value="SERVER"></v-radio>
                            <v-radio label="critical" :value="CRITICAL"></v-radio>
                        </v-radio-group>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn rounded @click="cancel()">Cancel</v-btn>
                    <v-btn rounded @click="allocateProfession()">Allocate</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-container fluid>
            <v-card>
                <v-card-title>
                    Manage Users
                </v-card-title>
                <v-card-text>
                    <v-data-table :headers="headers" :items="users" :loading="loading" disable-sort>
                        <template v-slot:item.actions="{ item }">
                            <v-btn @click="selectProfession(item.id)" v-if="canAllocate(item)">Allocate</v-btn>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
        </v-container>
    </div>
</template>

<script>
    import medic_config from "../../config/medic"
    import fakeUsers from "../../data/admin/users"
    import constant from "../../config/constant"
    export default {
        name: 'ManageUsers',
        data() {
            return {
                app: this.$root.$children[0],
                totalUsers: 0,
                loading: false,
                headers: [
                    {text: 'ID', align: 'center', value: 'id'},
                    {text: 'Username', align: 'center', value: 'username'},
                    {text: 'Gender', value: 'gender'},
                    {text: 'Profession', value: 'medic.profession'},
                    {text: 'Region', value: 'medic.region'},
                    {text: 'Allocate Profession', value: 'actions'}
                ],
                users: [],
                showDialog: false,
                form:'',
                selectedUserId:'',
                selectedProfession:'',
                selectedRegion:'',

                DOCTOR: constant.DOCTOR,
                EMERGENCY_NURSE: constant.EMERGENCY_NURSE,
                HEAD_NURSE: constant.HEAD_NURSE,
                WARD_NURSE: constant.WARD_NURSE,

                MILD: constant.MILD,
                SERVER: constant.SEVERE,
                CRITICAL:constant.CRITICAL,
            }
        },
        methods: {
            canAllocate(item){
                return item.username !== constant.ADMIN && item.medic === null;
            },
            getUsers(){
                // this.users = fakeUsers.USERS;
                // this.totalUsers = 60;
                this.app.overlay = true;
                this.$axios.get('/admin/users')
                    .then(res => {
                        if (res.status === 200) {
                            this.users = res.data.users;
                            // this.app.message("Get users successfully", 'success');
                        } else {
                            this.app.message('operation error', 'error');
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
            selectProfession(userId){
                this.showDialog=true;
                this.selectedUserId = userId;
            },
            allocateProfession(){
                if (this.form){
                    this.showDialog = false;
                    this.app.overlay = true;
                    this.$axios.post('/admin/user/assign', {
                        id: this.selectedUserId,
                        region:this.selectedRegion,
                        profession: this.selectedProfession
                    })
                        .then(res => {
                            if (res.status === 200) {
                                this.app.message("Allocate successfully", 'success');
                                this.getUsers();
                            } else {
                                this.app.message('Fail to allocate', 'error');
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
                else{
                    this.app.message("Please complete the form", 'error');
                }
            },
            cancel(){
                this.selectedUserId = '';
                this.selectedProfession = '';
                this.showDialog = false;
            }
        },
        watch: {

        },
        mounted() {
            this.getUsers();
        }
    }
</script>

<style>
    .v-data-table td {
        height: 60px !important;
        font-size: 18px !important;
    }
</style>