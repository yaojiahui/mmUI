<template>
	<div class="koi-city-more">
		<div class="koi-city-more-title">{{selectedLetter}}</div>
		<ul class="koi-city-more-list">
			<li v-for="item in cityList" :key="item.ID" :class="selectCid == item.ID || selectCid == item.Name? 'selected' : ''" @click="cityClick(item.ID,item.Name,item.JPY,item.QPY,item.CityName)">{{item.Name}}</li>
		</ul>
	</div>
</template>

<script>
import cityUtil from './cityUtil.js'
export default {
	name: 'koi-city-more',
	mixins: [cityUtil],
	data: function() {
		return {
			selectedLetter: '',
			cityList: [],
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
		letterClick: function(letter) {
			this.selectedLetter = letter,
				this.getCityList(letter)
		},
		getCityList: function(letter) {
			this.selectedLetter = letter
//			AAAAAAAAAAAAAAAAAAAAAAAAAAAAA
            this.$model.transfer.cityList({
                allCity:"0",
                letter:letter,
                requestFrom:1
			},(res)=>{
                this.cityList = ((res.result.data || {}).TrainStation).StationList || [];
                this.$nextTick(() => {
                    this.$parent.scrollByLatter()
                })
			})
//			AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
		},
		cityClick: function(id, name, jpy, qpy,city) {
			this.selectCid = id;
			this.cityItemAction(id, [name,city], jpy, qpy, true)
			this.$nextTick(() => {
				this.$parent.scrollByLatter()
			})
		}
	},
	mounted() {
		this.selectCid = this.$parent.getCityId()
	}
}
</script>

<style lang="less">
.koi-city-more {
	&-title {
		color: #999;
		height: 35px;
		line-height: 35px;
		font-weight: 400;
		padding: 0 15px;
		background: #FFFFFF;
	}

	&-list {
		box-sizing: border-box;
		padding-bottom: 20px;
		background-color: #FFF;
		li {
			// width: 100%;
			// background: #fff;
			// background-color: #fff;
			// height: 35px;
			// line-height: 35px;
			// font-size: 14px;
			// padding: 0 15px;
			// float: left;
			// box-sizing: border-box;
			// &.selected {
			// 	color: #3c6!important;
			// }

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
		&:after {
            content: '';
            display: table;
            line-height: 0;
            clear: both;
        }
	}
}
</style>
