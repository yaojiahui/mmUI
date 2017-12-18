<template>
  <div style="background: #ffffff;">
    <Citycom :citydata="citydata" :from="fromCity" :to="toCity"></Citycom>
  </div>
</template>
<script>
  import Citycom from './cityexchange'
    export default {
        data() {
            return {
              citydata:{
                logo:'url("../src/components/cityexchangeTransition/img/exchangelogo.png")',
                fontColor:'#333',
                backgroundSize: '32px 32px',
                logowidth:'32px',
                logoheight:'32px'
              },
              fromCity:'北京',
              toCity:'上海',
            }
        },
      components:{
        Citycom
      },
        methods: {
          fromCityClick(){
            console.log('日历组件敬请期待')
          },
          toCityClick(){
            console.log('跳转日历组件路由')
          }
        }
    }

</script>
<style lang="less">
</style>
