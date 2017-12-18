<template>
	<div class="koi-city-hot">
		<div class="koi-city-hot-title">热门城市</div>
		<ul class="koi-city-hot-main">
			<li v-for="item in hotlist" :key="item.id" :class="selectCid == item.ID || selectCid == item.Name ? 'selected' : ''" @click="cityClick(item.ID,item.Name,item.JPY,item.QPY,item.city)">{{item.Name}}</li>
		</ul>
	</div>
</template>

<script>
import cityUtil from './cityUtil.js'

export default {
	name: 'koi-city-hot',
	mixins: [cityUtil],
	data: function() {
		return {
			hotlist: [
				{ "ID": 15, "Name": "北京", "QPY": "beijing", "JPY": "bj","city":"北京" },
				{ "ID": 42, "Name": "广州", "QPY": "guangzhou", "JPY": "gz" ,"city":"广州"},
				{ "ID": 21, "Name": "上海", "QPY": "shanghai", "JPY": "sh" ,"city":"上海"},
				{ "ID": 388, "Name": "深圳", "QPY": "shenzhen", "JPY": "sz","city":"深圳" },
				{ "ID": 53, "Name": "杭州", "QPY": "hangzhou", "JPY": "hz","city":"杭州" },
				{ "ID": 80, "Name": "西安", "QPY": "xian", "JPY": "xa","city":"西安" },
				{ "ID": 84, "Name": "郑州", "QPY": "zhengzhou", "JPY": "zz" ,"city":"郑州"},
				{ "ID": 34, "Name": "成都", "QPY": "chengdu", "JPY": "cdu","city":"成都" },
				{ "ID": 35, "Name": "长沙", "QPY": "changsha", "JPY": "cs" ,"city":"长沙"},
				{ "ID": 44, "Name": "哈尔滨", "QPY": "haerbin", "JPY": "heb" ,"city":"哈尔滨"},
				{ "ID": 76, "Name": "武汉", "QPY": "wuhan", "JPY": "wh","city":"武汉" },
				{ "ID": 65, "Name": "南京", "QPY": "nanjing", "JPY": "nj" ,"city":"南京"},
				{ "ID": 26, "Name": "天津", "QPY": "tianjin", "JPY": "tj" ,"city":"天津"},
				{ "ID": 389, "Name": "苏州", "QPY": "suzhou", "JPY": "sz" ,"city":"苏州"},
				{ "ID": 43, "Name": "广州南", "QPY": "guangzhounan", "JPY": "gzn","city":"广州" }
			],
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
		cityClick: function(id, name, jpy, qpy,city) {
			this.selectCid = id
			this.cityItemAction(id, [name,city], jpy, qpy, true)
		}
	},
	mounted() {
		this.selectCid = this.$parent.getCityId()
		//			this.selectCid = this.$route.query.id;
	}
}
</script>

<style lang="less">
.koi-city-hot {
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