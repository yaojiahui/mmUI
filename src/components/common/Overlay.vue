<style>
    #overlay {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 100;
        background: rgba(0,0,0,.5);
        /*display: none;*/
    }
</style>
<template>
    <div id="overlay" @click="overlayHide"></div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        methods: {
            overlayHide(){
                this.$emit('overlayShow',false)
            }
        }
    }

</script>