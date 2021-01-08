<template>
    <v-card>
        <v-card-text>
            <v-data-table :headers="headers" :items="patients" disable-sort>
                <template v-slot:item.detail="{ item }">
                    <v-icon @click="checkPatient(item.id)">mdi-eye</v-icon>
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "Patients",
        props:{
            patients:{
              required: true
            }
        },
        data() {
            return {
                app: this.$root.$children[0],
                headers: [
                    {text: 'ID', align: 'center', value: 'id'},
                    {text: 'Name', align: 'center', value: 'name'},
                    {text: 'Region', value: 'region'},
                    {text: 'Condition', value: 'condition'},
                    {text: 'Detail', value: 'detail'}
                ],
            }
        },
        methods: {
            checkPatient(id){
                let url = '/patient/' + id;
                window.open(url, '_blank');
            }
        },
    }
</script>

<style scoped>

</style>