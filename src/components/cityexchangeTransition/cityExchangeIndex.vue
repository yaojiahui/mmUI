<template>
  <div style="background: #ffffff;">
    <Citycom :citydata="citydata"></Citycom>
  </div>
</template>
<script>
  import Citycom from './cityexchange'
    export default {
        data() {
            return {
              citydata:{
                from:'北京',
                to:'上海',
                logo:'url("../src/components/cityexchangeTransition/img/exchangelogo.png")',
                fontColor:'#333',
                backgroundSize: '32px 32px',
                logowidth:'32px',
                logoheight:'32px'
              }
            }
        },
      components:{
        Citycom
      },
        methods: {}
    }

</script>
<style lang="less">
</style>
