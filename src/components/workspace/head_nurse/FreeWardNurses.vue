<template>
    <v-container>
        <v-card>
            <v-card-text>
                <v-data-table :headers="headers" :items="wardNurses" disable-sort>
                    <template v-slot:item.add="{ item }" >
                        <v-icon @click="addNurse(item.id)">mdi-plus</v-icon>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: "FreeWardNurses",
        data() {
            return {
                app: this.$root.$children[0],
                wardNurses:[],
                headers:[
                    {text: 'ID', align: 'center', value: 'id'},
                    {text: 'Username', align: 'center', value: 'username'},
                    {text: 'Add Nurse', value: 'add'},
                ]
            }
        },
        mounted(){
            this.setWardNurses();
        },
        methods: {
            setWardNurses(){
                this.app.overlay = true;
                this.$axios.get('/user/medic/headnurse/wardnurses/spare')
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
            addNurse(id){
                this.app.overlay = true;
                this.$axios.post('/user/medic/headnurse/wardnurse/add',
                    {
                        id : id
                    }
                ).then(res => {
                    if (res.status === 200) {
                        this.app.message("Add wardNurse successfully", 'success');
                        this.setWardNurses();
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