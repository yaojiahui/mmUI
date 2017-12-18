<template>
  <div>
    <overlay v-show="overlayShow" @overlayShow="getoverlayHide"></overlay>
    <ChooseSeat v-show="ChooseSeatShow" :resData="ChooseSeatInfo" :passengerNum="passengerNum"
                :tsSeats="paramSeats" :switchBtnData="isChooseSeat"
                @ChooseSeatShow="getChooseSeatShow"
                @chooseResult="getchooseResult"
                @switchBtn="getswitchBtn"
                @paramChooseSeat="getparamChooseSeat"></ChooseSeat>
    <div class="chooseSeatItem" @click="chooseSeatClick">
      <div class="chooseItemTop">
        <p>在线选座
          <span v-if="seatsData.length==0">可选择连号和靠窗</span>
          <span></span>
        </p>
        <div class="switchBtn">
          <switchbutton v-model="isChooseSeat"></switchbutton>
        </div>
      </div>

      <div v-if="seatsData.length!==0" class="chooseItemBottom">
        <p>{{seatsData[0]}}</p>
        <p>{{seatsData[1]}}</p>
      </div>
    </div>
  </div>
</template>
<script>
  let paramChooseSeat = [];
  import Switchbutton from '../common/Switchbutton';
  import Overlay from '../common/Overlay';
  import ChooseSeat from './ChooseSeat';
  import mockajax from '../../mock/index';

  export default {
    data() {
      return {
        seatsData: [],
        isChooseSeat: 0,
        ChooseSeatShow: false,
        passengerNum: 2,
        paramSeats: [],
        ChooseSeatInfo: [],
        overlayShow: false,
      }
    },
    components: {
      Switchbutton,
      Overlay,
      ChooseSeat
    },
    created() {
      mockajax();
      this.getSeatPromise()
    },
    methods: {
      getSeatPromise() {
        let trainArr = ['D3126', 'G24'];
        var a = new Promise((resolve, reject) => {
          this.$ajax.get('/api/getChooseSeatInfo').then((res) => {
            resolve(res)
          })
        });
        var b = new Promise((resolve, reject) => {
          this.$ajax.get('/api/getChooseSeatInfo2').then((res) => {
            resolve(res)
          })
        });
        var p = Promise.all([a, b]);
        p.then((val)=> {
          let filter = val.filter((item, idx) => {
            item.ts = idx;
            return item.data.code == '0000'&&(item.data.result.seatInfo.indexOf(item.data.result.seats)!==-1)
          })
          if (filter.length !== 0) {
            this.ChooseSeatInfo = filter.map((item) => {
              this.paramSeats.push(item.data.result.seats);
              let i = {
                ts: item.ts,
                data: item.data
              }
              return i
            })
          }
        });//结果：['aaa','bbb']
      },
      getoverlayHide(val) {
        if (!val) {
          this.ChooseSeatShow = this.overlayShow = val;
        }
      },
      chooseSeatClick() {
        if (this.isChooseSeat == 1) {
          this.overlayShow = this.ChooseSeatShow = true;
        }
      },
      getchooseResult(val) {
        this.seatsData = [].concat(val);
      },
      getChooseSeatShow(val) {
        this.overlayShow = this.ChooseSeatShow = val;
      },
      getswitchBtn(val) {
        this.isChooseSeat = val
      },
      getparamChooseSeat(val) {
        paramChooseSeat = val;
        paramChooseSeat.map((item, idx) => {
          this.byTrain[idx].transitSegments[0].chooseSeats = item
        })
      }
    }
  }

</script>
<style lang="less">
  .chooseSeatItem {
    margin: 10px;
    padding: 10px 10px 14px;
    background: #FFFFFF;
    border-radius: 5px;
    font-size: 16px;
    .chooseItemTop {
      display: flex;
      p {
        margin: auto;
        /*line-height: 1.5;*/
        flex: 2;
        span {
          color: #999;
          font-size: 14px;
          margin-left: 18px;
          i {
            display: block;
          }
        }
      }
      .switchBtn {
        margin: auto;
      }
    }
    .chooseItemBottom {
      margin-top: 10px;
      p {
        color: #33cc66;
        font-size: 12px;
        margin-top: 7px;
      }
    }

  }
</style>
