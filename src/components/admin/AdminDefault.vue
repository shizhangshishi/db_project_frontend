<template>
  <BaseDefault :welcome-message="welcome"></BaseDefault>
</template>

<script>
    import BaseDefault from "../BaseDefault";

    export default {
        name: 'AdminDefault',
        data() {
            return {
                welcome: 'Work hard and stay sharp~'
            }
        },
        components: {
            BaseDefault
        }
    }
</script>
