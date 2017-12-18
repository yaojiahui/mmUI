<template>
  <div class="chooseSeat">
    <div class="chooseSeat-top">
      <div class="chooseSeat-cancel" @click="cancel();">
        取消
      </div>
      <div class="chooseSeat-title">请选择 <span>{{seatNum}}</span>个座位</div>
      <div class="chooseSeat-confirm" @click="confirm()">
        确定
      </div>
    </div>
    <div class="chooseSeat-bottom-tip">
      <i class="iconfont"></i>
      优先按指定坐席出票，若指定坐席无票，将分配有票坐席
    </div>
    <!--<div class="errTip" v-show="errTipShow">-->
    <!--<p>请按照乘车人数选择对应行程的席位！</p>-->
    <!--</div>-->
    <div class="seats" v-for="train in trains">
      <div class="seatTitle">
        第{{train.ts == 0 ? '一' : '二'}}程：{{train.data.result.trainNo}}
        <p class="chosedNum" v-if="train.ts == 0">已选择<span>{{firstselectNum}}</span>/{{seatNum}}个</p>
        <p class="chosedNum" v-if="train.ts == 1">已选择<span>{{secondselectNum}}</span>/{{seatNum}}个</p>
      </div>
      <!--二等座-->
      <div class="seatIcons-wrap">
        <div class="seatIcons" v-if="firFrontRow.length!==0&&train.ts == 0">
                   <span v-for="(item,idx) in firFrontRow"
                         :class="{'color-999':item.seat=='靠窗'||item.seat=='过道','singleSeat':item.seatRole,'singleSeatActive':item.selectFlag&&item.seat!=='靠窗'&&item.seat!=='过道','singleSeatDisabled':item.disabled&&!item.selectFlag&&item.seat!=='靠窗'&&item.seat!=='过道'}"
                         @click="seatCheckedFun(item,idx,train.ts)">{{item.seat}}</span>
        </div>
        <div class="seatIcons" v-if="firBackRow.length!==0&&train.ts == 0">
                    <span v-for="(item,idx) in firBackRow"
                          :class="{'color-999':item.seat=='靠窗'||item.seat=='过道','singleSeat':item.seatRole,'singleSeatActive':item.selectFlag&&item.seat!=='靠窗'&&item.seat!=='过道','singleSeatDisabled':item.disabled&&!item.selectFlag&&item.seat!=='靠窗'&&item.seat!=='过道'}"
                          @click="seatCheckedFun(item,idx,train.ts)">{{item.seat}}</span>
        </div>

        <div class="seatIcons" v-if="secFrontRow.length!==0&&train.ts == 1">
                    <span v-for="(item,idx) in secFrontRow"
                          :class="{'color-999':item.seat=='靠窗'||item.seat=='过道','singleSeat':item.seatRole,'singleSeatActive':item.selectFlag&&item.seat!=='靠窗'&&item.seat!=='过道','singleSeatDisabled':item.disabled&&!item.selectFlag&&item.seat!=='靠窗'&&item.seat!=='过道'}"
                          @click="seatCheckedFun(item,idx,train.ts)">{{item.seat}}</span>
        </div>
        <div class="seatIcons" v-if="secBackRow.length!==0&&train.ts == 1">
                    <span v-for="(item,idx) in secBackRow"
                          :class="{'color-999':item.seat=='靠窗'||item.seat=='过道','singleSeat':item.seatRole,'singleSeatActive':item.selectFlag&&item.seat!=='靠窗'&&item.seat!=='过道','singleSeatDisabled':item.disabled&&!item.selectFlag&&item.seat!=='靠窗'&&item.seat!=='过道'}"
                          @click="seatCheckedFun(item,idx,train.ts)">{{item.seat}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  let chooseSeat = {
    '前排A': '1A', '前排B': '1B', '前排C': '1C', '前排D': '1D', '前排F': '1F',
    '后排A': '2A', '后排B': '2B', '后排C': '2C', '后排D': '2D', '后排F': '2F'
  }
  let configSeat = {
    '硬座': '1', '软座': '2', '一等座': '3', '二等座': '4', '无座': '10', '商务座': '11', '特等座': '12',
    '高级软卧': '14', '一等软座': '33', '二等软座': '44', '硬卧': '5', '软卧': '8', '动卧': '15', '高级动卧': '17'
  }
  export default {
    props: ['resData', 'passengerNum', 'tsSeats', 'switchBtnData'],
    created(){
      // console.log('resData',this.resData)
      // console.log('passengerNum',this.passengerNum)
      // console.log('tsSeats',this.tsSeats)
      // console.log('switchBtnData',this.switchBtnData)
    },
    data() {
      return {
        errTipShow: false,
        seatData: [
          {
            trainName: 'G7146'
          }
        ],
        firstClassSeatfrontRow: [
          {
            seat: '靠窗'
          },
          {
            seat: 'A',
            seatRole: '前排A',
            selectFlag: false,
            disabled: false
          },
          {
            seat: 'C',
            seatRole: '前排C',
            selectFlag: false,
            disabled: false
          },
          {
            seat: '过道'
          },
          {
            seat: 'D',
            seatRole: '前排D',
            selectFlag: false,
            disabled: false
          },
          {
            seat: 'F',
            seatRole: '前排F',
            selectFlag: false,
            disabled: false
          },
          {
            seat: '靠窗'
          }
        ],
        firstClassSeatbackRow: [
          {
            seat: '靠窗'
          },
          {
            seat: 'A',
            seatRole: '后排A',
            selectFlag: false,
            disabled: false
          },
          {
            seat: 'C',
            seatRole: '后排C',
            selectFlag: false,
            disabled: false
          },
          {
            seat: '过道'
          },
          {
            seat: 'D',
            seatRole: '后排D',
            selectFlag: false,
            disabled: false
          },
          {
            seat: 'F',
            seatRole: '后排F',
            selectFlag: false,
            disabled: false
          },
          {
            seat: '靠窗'
          }
        ],
        secondClassSeatfrontRow: [
          {
            seat: '靠窗'
          },
          {
            seat: 'A',
            seatRole: '前排A',
            selectFlag: false,
            disabled: false
          },
          {
            seat: 'B',
            seatRole: '前排B',
            selectFlag: false,
            disabled: false
          },
          {
            seat: 'C',
            seatRole: '前排C',
            selectFlag: false,
            disabled: false
          },
          {
            seat: '过道'
          },
          {
            seat: 'D',
            seatRole: '前排D',
            selectFlag: false,
            disabled: false
          },
          {
            seat: 'F',
            seatRole: '前排F',
            selectFlag: false,
            disabled: false
          },
          {
            seat: '靠窗'
          }
        ],
        secondClassSeatbackRow: [
          {
            seat: '靠窗'
          },
          {
            seat: 'A',
            seatRole: '后排A',
            selectFlag: false,
            disabled: false
          },
          {
            seat: 'B',
            seatRole: '后排B',
            selectFlag: false,
            disabled: false
          },
          {
            seat: 'C',
            seatRole: '后排C',
            selectFlag: false,
            disabled: false
          },
          {
            seat: '过道'
          },
          {
            seat: 'D',
            seatRole: '后排D',
            selectFlag: false,
            disabled: false
          },
          {
            seat: 'F',
            seatRole: '后排F',
            selectFlag: false,
            disabled: false
          },
          {
            seat: '靠窗'
          }
        ],
        businessClassSeatfrontRow: [
          {
            seat: '靠窗'
          },
          {
            seat: 'A',
            seatRole: '前排A',
            selectFlag: false,
            disabled: false
          },
          {
            seat: 'C',
            seatRole: '前排C',
            selectFlag: false,
            disabled: false
          },
          {
            seat: '过道'
          },
          {
            seat: 'F',
            seatRole: '前排F',
            selectFlag: false,
            disabled: false
          },
          {
            seat: '靠窗'
          }
        ],
        businessClassSeatbackRow: [
          {
            seat: '靠窗'
          },
          {
            seat: 'A',
            seatRole: '后排A',
            selectFlag: false,
            disabled: false
          },
          {
            seat: 'C',
            seatRole: '后排C',
            selectFlag: false,
            disabled: false
          },
          {
            seat: '过道'
          },
          {
            seat: 'F',
            seatRole: '后排F',
            selectFlag: false,
            disabled: false
          },
          {
            seat: '靠窗'
          }
        ],
        selectedIdx: [],
        firstselectNum: 0,
        secondselectNum: 0,
        firFrontRow: [],
        secFrontRow: [],
        firBackRow: [],
        secBackRow: [],
        seatInfo: [],
        seatTypeArr: [],
        trackFlg: 1//埋点label标记1火火，2火汽，3火空
      }
    },
    methods: {
      initRowData() {
        let seatType = [].concat(this.tsSeats);
        if (this.trains.length == 1) {
          if (this.trains[0].ts == 0) {
            switch (seatType[0]) {
              case '3'://一等座
                this.firFrontRow = [].concat(JSON.parse(JSON.stringify(this.firstClassSeatfrontRow)))
                break;
              case '4'://二等座
                this.firFrontRow = [].concat(JSON.parse(JSON.stringify(this.secondClassSeatfrontRow)))
                break;
              case '11':
              case '12'://特等座
                this.firFrontRow = [].concat(JSON.parse(JSON.stringify(this.businessClassSeatfrontRow)))
                break;

            }
            if (this.seatNum !== 1) {//乘客两人以上则出现两排
              switch (seatType[0]) {
                case '3'://一等座
                  this.firBackRow = [].concat(JSON.parse(JSON.stringify(this.firstClassSeatbackRow)))
                  break;
                case '4'://二等座
                  this.firBackRow = [].concat(JSON.parse(JSON.stringify(this.secondClassSeatbackRow)))
                  break;
                case '11'://商务座
                case '12'://特等座
                  this.firBackRow = [].concat(JSON.parse(JSON.stringify(this.businessClassSeatbackRow)))
                  break;

              }
            }
          } else if (this.trains[0].ts == 1) {
            switch (seatType[0]) {
              case '3'://一等座
                this.secFrontRow = [].concat(JSON.parse(JSON.stringify(this.firstClassSeatfrontRow)))
                break;
              case '4'://二等座
                this.secFrontRow = [].concat(JSON.parse(JSON.stringify(this.secondClassSeatfrontRow)))
                break;
              case '11'://商务座
              case '12'://特等座
                this.secFrontRow = [].concat(JSON.parse(JSON.stringify(this.businessClassSeatfrontRow)))
                break;

            }
            if (this.seatNum !== 1) {
              switch (seatType[0]) {
                case '3'://一等座
                  this.secBackRow = [].concat(JSON.parse(JSON.stringify(this.firstClassSeatbackRow)))
                  break;
                case '4'://二等座
                  this.secBackRow = [].concat(JSON.parse(JSON.stringify(this.secondClassSeatbackRow)))
                  break;
                case '11'://商务座
                case '12'://特等座
                  this.secBackRow = [].concat(JSON.parse(JSON.stringify(this.businessClassSeatbackRow)))
                  break;

              }
            }
          }


        } else if (this.trains.length == 2) {
          if (this.trains[0].ts == 0) {
            switch (seatType[0]) {
              case '3':
                this.firFrontRow = [].concat(JSON.parse(JSON.stringify(this.firstClassSeatfrontRow)))
                break;
              case '4':
                this.firFrontRow = [].concat(JSON.parse(JSON.stringify(this.secondClassSeatfrontRow)))
                break;
              case '11':
              case '12'://特等座
                this.firFrontRow = [].concat(JSON.parse(JSON.stringify(this.businessClassSeatfrontRow)))
                break;

            }
            if (this.seatNum !== 1) {
              switch (seatType[0]) {
                case '3':
                  this.firBackRow = [].concat(JSON.parse(JSON.stringify(this.firstClassSeatbackRow)))
                  break;
                case '4':
                  this.firBackRow = [].concat(JSON.parse(JSON.stringify(this.secondClassSeatbackRow)))
                  break;
                case '11':
                case '12'://特等座
                  this.firBackRow = [].concat(JSON.parse(JSON.stringify(this.businessClassSeatbackRow)))
                  break;
              }
            }
          }
          if (this.trains[1].ts == 1) {
            switch (seatType[1]) {
              case '3':
                this.secFrontRow = [].concat(JSON.parse(JSON.stringify(this.firstClassSeatfrontRow)))
                break;
              case '4':
                this.secFrontRow = [].concat(JSON.parse(JSON.stringify(this.secondClassSeatfrontRow)))
                break;
              case '11':
              case '12'://特等座
                this.secFrontRow = [].concat(JSON.parse(JSON.stringify(this.businessClassSeatfrontRow)))
                break;

            }
            if (this.seatNum !== 1) {
              switch (seatType[1]) {
                case '3':
                  this.secBackRow = [].concat(JSON.parse(JSON.stringify(this.firstClassSeatbackRow)))
                  break;
                case '4':
                  this.secBackRow = [].concat(JSON.parse(JSON.stringify(this.secondClassSeatbackRow)))
                  break;
                case '11':
                case '12'://特等座
                  this.secBackRow = [].concat(JSON.parse(JSON.stringify(this.businessClassSeatbackRow)))
                  break;
              }
            }
          }

        }

      },
      seatCheckedFun(item, idx, tsNum) {
        if (tsNum == 0 && (this.firstselectNum < this.seatNum || item.selectFlag) && item.seat !== '过道' && item.seat !== '靠窗') {
          item.selectFlag = !item.selectFlag
          if (item.selectFlag) {
            this.firstselectNum += 1;
          } else {
            this.firstselectNum -= 1;
          }
        } else if (tsNum == 1 && (this.secondselectNum < this.seatNum || item.selectFlag) && item.seat !== '过道' && item.seat !== '靠窗') {
          item.selectFlag = !item.selectFlag
          if (item.selectFlag) {
            this.secondselectNum += 1;
          } else {
            this.secondselectNum -= 1;
          }
        }
      },
      confirm() {
        if (!((this.firstselectNum == this.seatNum && this.secondselectNum == 0) || (this.secondselectNum == this.seatNum && this.firstselectNum == 0) || (this.secondselectNum == this.seatNum && this.firstselectNum == this.seatNum))) {
//                    this.errTipShow = true;
          this.$toast('请按乘客数选择对应行程的座位');
          return
        }
        let firstResult = this.showChooseResult(this.firFrontRow, this.firBackRow).length == 0 ? '' : `第一程座位号：${this.formatSeat(this.showChooseResult(this.firFrontRow, this.firBackRow))}`
        let secondResult = this.showChooseResult(this.secFrontRow, this.secBackRow).length == 0 ? '' : `第二程座位号：${this.formatSeat(this.showChooseResult(this.secFrontRow, this.secBackRow))}`

        this.$emit('chooseResult', [firstResult, secondResult])
        this.$emit('ChooseSeatShow', false)
        let firTrain = this.showChooseResult(this.firFrontRow, this.firBackRow);
        let secTrain = this.showChooseResult(this.secFrontRow, this.secBackRow);


        let firTrainStr = '', secTrainStr = '';
        if (firTrain.length !== 0) {
          firTrain.map((item, idx) => {
            firTrainStr += chooseSeat[item];
            secTrain.length !== 0 ? secTrainStr += chooseSeat[secTrain[idx]] : secTrainStr = ''
          })
          this.$emit('paramChooseSeat', [firTrainStr, secTrainStr])
        } else if (secTrain.length !== 0) {
          secTrain.map((item, idx) => {
            secTrainStr += chooseSeat[item];
            firTrain.length !== 0 ? firTrainStr += chooseSeat[firTrain[idx]] : firTrainStr = ''
          })
          this.$emit('paramChooseSeat', [firTrainStr, secTrainStr])
        }
      },
      cancel() {
        this.deleteChooseResult(this.firFrontRow, this.firBackRow);
        this.deleteChooseResult(this.secFrontRow, this.secBackRow);
        this.errTipShow = false;
        this.$emit('ChooseSeatShow', false)
        this.$emit('switchBtn', 0)
      },
      formatSeat(result) {
        let frontR = [];
        let backR = [];
        let front = result.filter((item) => {
          return item.indexOf('前') !== -1
        })
        let back = result.filter((item) => {
          return item.indexOf('后') !== -1
        })
        front.map((item, idx) => {
          if (idx == 0) {
            frontR.push(item)
          } else {
            frontR.push(item.replace(/前排/g, ''))
          }
        })
        back.map((item, idx) => {
          if (idx == 0) {
            backR.push(item)
          } else {
            backR.push(item.replace(/后排/g, ''))
          }
        })
        let r = frontR.concat(backR)
        console.log(r)
        return r
      },
      showChooseResult(frontRow, backRow) {
        let result = [];
        frontRow.concat(backRow).map((item) => {
          if (item.selectFlag) {
            result.push(item.seatRole)
          }
        })
        return result
      },
      deleteChooseResult(frontRow, backRow) {
        this.firstselectNum = 0;
        this.secondselectNum = 0;
        frontRow.concat(backRow).map((item) => {
          item.selectFlag = false;
          item.disabled = false;
        })
      },
      setDisabled(frontRow, backRow) {
        frontRow.concat(backRow).map((item) => {
          if (!item.selectFlag) {
            item.disabled = true
          }
        })
      },
      cancelDisabled(frontRow, backRow) {
        frontRow.concat(backRow).map((item) => {
          item.disabled = false
        })
      }
    },
    watch: {
      seatNum(val) {
        this.initRowData();
        this.firstselectNum = this.secondselectNum = 0;
        if (val == 1) {
          this.firBackRow = [];
          this.secBackRow = [];
        }
        this.$emit('paramChooseSeat', [])
        this.$emit('chooseResult', [])
      },
      resData(val) {
        this.seatInfo = val.map((item) => {
          return item.data.seatInfo
        })
      },
      trains() {
        this.initRowData()
      },
      switchBtnData(val) {
        if (val == 0) {
          this.cancel()
        }
      },
      firstselectNum(val) {
//                console.log(this.seatNum)
        if (val >= this.seatNum) {
          this.errTipShow = false;
          this.setDisabled(this.firFrontRow, this.firBackRow)
        } else {
          this.cancelDisabled(this.firFrontRow, this.firBackRow)
        }
      },
      secondselectNum(val) {
        if (val >= this.seatNum) {
          this.errTipShow = false;
          this.setDisabled(this.secFrontRow, this.secBackRow)
        } else {
          this.cancelDisabled(this.secFrontRow, this.secBackRow)
        }
      },
    },
    computed: {
      seatNum() {
        return this.passengerNum;
      },
      trains() {
        let r = this.resData.map((item) => {
          return item
//                    return item.data.trainNo
        })
        return r
      }
    }
  }

</script>
<style scoped lang="less">
  @green: rgb(51, 204, 102);
  @smallFont: 12px;
  @lightgrey: rgb(204, 204, 204);
  .chooseSeat {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 9010;
    padding-bottom: 20px;
    background: #FFFFFF;
    .color-999 {
      color: #999;
    }
    .errTip {
      height: 35px;
      background: #fff4e1;
      p {
        font-size: 12px;
        color: #ff6540;
        margin-left: 15px;
        line-height: 35px;
      }
    }
    .chooseSeat-top {
      padding: 15px;
      display: flex;
      text-align: center;
      color: #FFFFFF;
      background: rgb(46, 52, 59);
      font-size: 16px;
      .chooseSeat-cancel, .chooseSeat-confirm {
        flex: 1;
      }
      .chooseSeat-cancel {
        text-align: left;
      }
      .chooseSeat-confirm {
        text-align: right;
      }
      .chooseSeat-title {
        flex: 3;
        span {
          color: @green;
          margin: 0 2px;
        }
      }
    }
    .seats {
      .seatTitle {
        font-size: 14px;
        text-align: center;
        padding: 8px 15px 5px 15px;
        position: relative;
        p.chosedNum {
          font-size: 12px;
          position: absolute;
          right: 5px;
          top: 0;
          padding: 8px 15px 5px 15px;
          span {
            color: @green;
          }
        }
      }
      .seatIcons-wrap {
        .seatIcons {
          margin: 10px;
          display: flex;
          span {
            margin: auto;
            font-size: 14px;
          }

          input {
            display: none;
          }

          span.singleSeatActive {
            color: #FFFFFF;
            background: url("./img/onlineSeat.png") no-repeat -30px 0;
            background-size: 90px 27px;
          }
          span.singleSeatDisabled {
            color: #CCCCCC;
            background: url("./img/onlineSeat.png") no-repeat -60px 0;
            background-size: 90px 27px;
          }
          .singleSeat {
            width: 30px;
            height: 27px;
            color: @lightgrey;
            display: inline-block;
            position: relative;
            /*margin-left: 10px;*/
            font-size: 14px;
            text-align: center;
            line-height: 27px;
            background: url("./img/onlineSeat.png") no-repeat 0 0;
            background-size: 90px 27px;
          }

        }
      }

    }
  ;
    .chooseSeat-bottom-tip {
      font-size: @smallFont;
      color: @green;
      padding: 10px;
      i.iconfont:before {
        content: '\e61a'
      }
      i {
        vertical-align: middle;
      }
    }
  }
</style>
