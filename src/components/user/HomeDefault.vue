<template>
  <BaseDefault :welcome-message="welcome"></BaseDefault>
</template>

<script>
    import BaseDefault from "../BaseDefault";

    export default {
        name: 'HomeDefault',
        data() {
            return {
                welcome: 'Best wishes to you~'
            }
        },
        components: {
            BaseDefault
        }
    }
</script>
