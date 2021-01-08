<template>
    <v-card>
        <v-card-text>
            <v-data-table :headers="headers" :items="wards" disable-sort>
            </v-data-table>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "Beds",
        props:{
            beds:{
                required: true
            }
        },
        data(){
            return{
                headers: [
                    {text: 'Bed ID', align: 'center', value: 'id'},
                    {text: 'Ward ID', align: 'center', value: 'ward.id'},
                    {text: 'Region', value: 'ward.region'},
                    {text: 'Patient Name', value: 'patient.name'},
                ],
            }
        }
    }
</script>

<style scoped>

</style>