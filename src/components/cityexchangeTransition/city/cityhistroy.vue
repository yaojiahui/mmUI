<template>
    <div class="koi-city-histroy" v-if="cityhistory.length">
        <div class="koi-city-histroy-title">历史城市</div>
        <ul class="koi-city-histroy-main">
            <li v-for="item in cityhistory" :key="item.id" :class="selectCid == item.id || selectCid == item.name ? 'selected' : ''" @click="cityClick(item.id,item.name,item.jpy,item.qpy,item.city)">{{item.name}}</li>
        </ul>
    </div>
</template>

<script>
import cityUtil from './cityUtil.js'
export default {
    name: 'koi-city-histroy',
    mixins: [cityUtil],
    data: function() {
        return {
            cityhistory: [],
            selectCid: 0
        };
    },
    props: {
        cityInfo: {
            type: [String, Object],
            default() {
                return ''
            }
        }
    },
    methods: {
        //城市点击
        cityClick: function(id, name, jpy, qpy, city) {
            this.selectCid = id
            this.cityItemAction(id, [name, city], jpy, qpy, true)
        }
    },
    mounted() {
        //this.selectCid = this.$route.query.id;
        this.selectCid = this.$parent.getCityId()
        this.cityhistory = this.getHisCity()
    }
}
</script>

<style lang="less">
.koi-city-histroy {
    &-title {
        color: #999;
        height: 35px;
        line-height: 35px;
        font-weight: 400;
        padding: 0 15px;
    }
    &-main {
        padding-bottom: 5.3%;
        background: #fff;
        box-sizing: border-box;
        &:after {
            content: '';
            display: table;
            line-height: 0;
            clear: both;
        }
    }
    &-main li {
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
        float: left;
        &.selected {
            border-color: #3c6;
			color: #3c6;
        }
    }
}
</style>
