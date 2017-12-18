<template>
  <div class="cityBar">
    <div class="fromCity cityName" v-bind:style="{ color: citydata.fontColor}">
      <transition name="fromcityshow" v-on:after-leave="fromCityleave">
        <span class="fold-item" v-show="translateFlag">{{fromCity}}</span>
      </transition>
    </div>
    <em class="exchangelogo"
        v-bind:style="{
            backgroundImage:citydata.logo,
            backgroundSize:citydata.backgroundSize,
            width:citydata.logowidth,
            height:citydata.logoheight}"
        :class="{exchangeActive:exchangeActiveFlag,exchangeActiveReverse:!exchangeActiveFlag}"
        @click="exchange"></em>
    <div class="toCity cityName" v-bind:style="{ color: citydata.fontColor}">
      <transition name="tocityshow">
        <span class="fold-item" v-show="translateFlag">{{toCity}}</span>
      </transition>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['citydata'],
    //citydata---> {
    // from:'南京',fromCity值
    // to:'上海',toCity值
    // logo:"url('imgurl')", exchange图标的背景图
    // fontColor:'pink' fromCity toCity字体颜色
    // }
    created(){
      this.fromCity=this.citydata.from;
      this.toCity=this.citydata.to
    },
    data() {
      return {
        translateFlag: true,
        exchangeActiveFlag: false,
        fromCity:'',
        toCity:''
      }
    },
    methods: {
      fromCityleave() {
        this.translateFlag = !this.translateFlag;
        let exchange = this.fromCity;
        this.fromCity = this.toCity;
        this.toCity = exchange;
        let exchangeParam = this.paramTocity;
        this.paramTocity = this.paramFromcity;
        this.paramFromcity = exchangeParam;
      },
      exchange() {
        this.exchangeActiveFlag = !this.exchangeActiveFlag;
        this.translateFlag = !this.translateFlag;
      }
    }
  }

</script>
<style lang="less">
  .-text-ellipsis() {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .cityBar {
    display: flex;
    margin: 0 35px;
    padding: 12px;
    em.exchangelogo {
      width: 24px;
      height: 21px;
      text-align: center;
      display: inline-block;
      background-repeat: no-repeat;
      background-size: 24px 21px;
      margin: auto;
      transition: All 0.4s ease;
    }
    em.exchangeActive {
      transform: rotate(180deg);
    }
    em.exchangeActiveReverse {
      transform: rotate(-180deg);
    }
    .cityName {
      font-size: 22px;
      flex: 3;
      width: 40%;
      span {
        display: block;
        .-text-ellipsis();
      }
    }
    .fromCity {
      .fromcityshow-leave-active {
        transition: all .3s ease;
      }
      .fromcityshow-enter-active {
        transition: all .3s ease;
      }
      .fromcityshow-leave-to, .fromcityshow-enter {
        transform: translateX(60%);
        opacity: 0;
      }
    }
    .toCity {
      text-align: right;
      .tocityshow-leave-active {
        transition: all .3s ease;
      }
      .tocityshow-enter-active {
        transition: all .3s ease;
      }
      .tocityshow-leave-to, .tocityshow-enter {
        transform: translateX(-60%);
        opacity: 0;
      }
      .fold-item {
        right: 0;
      }
    }
  }
</style>
