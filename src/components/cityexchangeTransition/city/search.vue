<template>
    <div :class="['koi-city-search', show?'show':'']" >
        <div class="koi-city-search-bar">
            <div class="koi-city-search-bar-inner">
                <i class="koi-city-search-icon"></i>
                <input ref="input" @focus="show = true" type="text" debounce="100" v-model="currValue" @input="getCity" :placeholder="placeholder" class="koi-city-search-bar-core box-sizing">
            </div>
            <a class="koi-city-search-bar-cancel" @click="show = false, currValue = '', citylist = []"></a>
        </div>
        <div class="koi-city-search-list">
            <div class="koi-city-search-tip">输入中文/拼音/首字母</div>
			<div class="koi-city-search-box">
				<div class="koi-city-search-item" v-for="item in citylist" :key="item.ID" :class="selectCid == item.ID ? 'selected' : ''" @click="cityClick(item.ID,item.Name,item.JPY,item.QPY,item.CityName)" :data-id="item.ID" :data-name="item.Name" :data-jpy="item.JPY" :data-qpy="item.QPY">{{item.Name}}</div>
			</div>
		</div>
    </div>
</template>

<script>
import cityUtil from './cityUtil.js'
export default {
    name: 'koi-city-search',
    mixins: [cityUtil],
    data: function() {
        return {
            show: false,
            currValue: '',
            citylist: [],
            selectCid: 0
        };
    },
    props: {
        placeholder: {
            default: '请输入(北京/beijing/bj)'
        },
        cityInfo: {
            type: [String, Object],
            default() {
                return ''
            }
        }
    },
    watch : {
        show (val, oval){
            if(val != oval){
                // 通知 已经改变显示状态
                this.$emit('toggle', val)
                setTimeout(() => {
                    window.scrollTo(0, 0)
                }, 0)
            }
        }
    },
    methods: {
        getCity: function() {
            if(!this.currValue){
                return 
            }
            this.$model.transfer.cityList({
                allCity:"0",
                letter:this.currValue,
                requestFrom:1
            },(res)=>{
                this.citylist = ((res.result.data || {}).TrainStation).StationList || [];
            })
        },
        cityClick: function(id, name, jpy, qpy, city) {
            this.selectCid = id
            this.cityItemAction(id, [name, city], jpy, qpy, true)
        }
    },
    mounted() {
        this.selectCid = this.$parent.getCityId()
    }
}
</script>

<style lang="less">
.koi-city-search {
    background: #fff;
	position: relative;
	z-index: 20;
	
    // 搜索输入框部分
    //position: relative;
    // &-fixed {
    //     position: fixed;
    //     top: 56px;
    //     left: 0;
    //     right: 0;
    //     bottom: 0;
    //     z-index: 9;
    //     background: #f3f4f8;
    // }

    &-bar {
        background: #fff;
		z-index: 2;
		box-shadow: 0 0 8px rgba(0, 0, 0, .1);
		padding: 10px 12px;
		position: fixed;
		left: 0;
		right: 0;
        
        //display: flex;
        align-items: center;
        
        
        background-color: #FFF;
        //border-radius: 100px;

        &-core {
            -webkit-appearance: none;
            border: 0;
            outline: 0;
            width: 100%;
			box-sizing: border-box;
            height: 40px;
            padding-left: 38px;
            background-color: #F4F5FA;
			border-radius: 100px;
            font-size: 14px;

            
            
            &::-webkit-input-placeholder{
                color:#ccc;
            }
        }

        &-inner {
            position: relative;
            width: 100%;
        }

        &-cancel {
            color: #666;
            text-decoration: none;
            width: 50px;
            text-align: center;
            display: none;
            font-size: 20px;
            height: 40px;
            line-height: 40px;
            //background-color: red;
            position: relative;
            z-index: 9;
			position: absolute;
			right: 12px;
			top: 10px;
            &:before{
                content: '×'
            }
        }
    }

    &-icon {
        position: absolute;
        left: 12px;
        top: 11px;
        width: 12px;
        height: 12px;
        border: 2px solid #D2D2D2;
        border-radius: 50%;
        &:after {
            content: '';
            position: absolute;
            width: 2px;
            height: 8px;
            left: 13px;
            top: 10px;
            background: #D2D2D2;
            transform: rotate(-45deg);
        }
    }

    &-list {
        overflow: visible;
        top: 56px;
        right: 0;
        left: 0;
        bottom: 0;
        position: absolute;
        display: none;
        background-color: #FFFFFF;
    }
	
	&-box{
		padding-bottom: 20px;
		background-color: #FFFFFF;
	}

    &-tip {
        border-bottom: 1px solid #ccc;
        font-size: 12px;
        line-height: 16px;
        color: #999;
        padding: 5px 10px 4px;
        background: #fff;
        padding: 12px;
    }

    &-item {
        // border-bottom: 1px solid #eee;
        // height: 40px;
        // padding-left: 15px;
        // line-height: 40px;
        // background: #fff;
        text-align: center;
        height: 35px;
        width: 26.2%;
        line-height: 35px;
        border: 1px solid #dedfe0;
        margin: 5.3% 0 0 5%;
        display: inline-block;
        border-radius: 2px;
        transition: color .1s ease-in;
        font-size: 14px;
        //float: left;
        &.selected {
			border-color: #3c6;
            color: #3c6;
        }
    }

    &.show{
		.koi-city-search-bar-core{
			padding-right: 50px;
		}
        .koi-city-search-bar-cancel{
            display: block;
        }
        .koi-city-search-list{
            display: block;
        }
    }
}
</style>
