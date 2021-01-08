<template>
    <v-row justify="center" align="center">
        <v-col cols="10">
            <!-- 病人基本信息 -->
            <v-row v-for="(title, index) in titles" :key="index">
                <v-col cols="1">
                    <v-icon>{{icons[index]}}</v-icon>
                </v-col>
                <v-col cols="11" md="4">{{title}}:</v-col>
                <v-col cols="6" offset="6" md="5" offset-md="2" lg="4" offset-lg="3">{{patient[attributes[index]]}}
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
    import constant from "../../config/constant";

    export default {
        name: 'PatientInfo',
        props: {
            patient:{
                required: true
            }
        },
        data() {
            return {
                attributes: ['name', 'gender', 'address', 'region',
                    'condition', 'state'
                ],
                titles: [
                    'Name', 'Gender', 'Address','Region',
                    'Condition', 'State'
                 ],
                icons: [
                    'mdi-file-document', 'mdi-human-male-female', 'mdi-map-marker', 'mdi-calendar-alert',
                    'mdi-calendar-check', 'mdi-calendar'
                ],
            }
        },
        mounted(){

        },
        methods:{

        },
        computed: {

        }
    }
</script>
