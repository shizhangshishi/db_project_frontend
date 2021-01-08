<template>
    <v-app>
        <DoctorControl></DoctorControl>
    </v-app>

</template>

<script>

    import DoctorControl from "../components/workspace/doctor/DoctorControl";
    export default {
        name: "Test",
        components: {DoctorControl},
    }
</script>

<style scoped>

</style>