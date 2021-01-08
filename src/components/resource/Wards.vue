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
        name: "Wards",
        props:{
            wards:{
                required: true
            }
        },
        data(){
            return{
                headers: [
                    {text: 'ID', align: 'center', value: 'id'},
                    {text: 'Region', value: 'region'},
                ],
            }
        },
        mounted() {
            console.log("wards:");
            console.log(this.wards);
        }
    }
</script>

<style scoped>

</style>