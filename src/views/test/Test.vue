<template>
  <v-app id="test">
    This is Test.vue!
    <ChairControl></ChairControl>

  </v-app>

</template>

<script>
    import ChairControl from "../../components/conference/chair/ChairControl"
    export default{
        name:"Test",
        components:{
          ChairControl
        },

    }
</script>
