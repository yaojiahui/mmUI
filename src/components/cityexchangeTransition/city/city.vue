<template>
    <div class="koi-city-container">
        <!-- search组件 -->
        <search v-model="value" :placeholder="placeholder" :cityInfo="currCity" @elect="setCity" @toggle="searchToggle"></search>
		<div v-show="isShow" class="koi-city-container-box">
			<!-- bar -->
			<ul class="koi-city-container-bar">
				<li></li>
				<li @click="scrollByHistroy" v-show="historyFlag">历史</li>
				<li @click="scrollByHot">热门</li>
				<li v-for="lt in letters" :key="lt" @click="getCityByLetter(lt)">{{lt}}</li>
			</ul>
			<div ref="x1">
				<!-- localtion组件 -->
				<local @elect="setCity"></local>
				<!-- cityhistroy组件 -->
				<cityhistroy :cityInfo="currCity" @elect="setCity"></cityhistroy>
			</div>
			<!-- cityhot组件 -->
			<cityhot ref="hot" :cityInfo="currCity" @elect="setCity"></cityhot>
			<!-- citymore组件 -->
			<citymore ref="more" :cityInfo="currCity" @elect="setCity"></citymore>
		</div>
    </div>
</template>

<script>
	import search from './search'
	import local from './local'
	import cityhistroy from './cityhistroy'
	import cityhot from './cityhot'
	import citymore from './citymore'
	import cityUtil from './cityUtil.js'
	export default {
		name: 'koi-city',
		mixins: [cityUtil],
		data(){
			return {
				letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'],
				isShow: true,
				value: '',
				historyFlag: !!this.getHisCity().length
			}
		},
		props: {
			// 搜索框 提示
			placeholder: {
				type: String
			},
			// 防止页面 多个地方有选择
			cusKey: {
				default: '',
				type: String
			},
			// 当前 城市的id或者object
			currCity: {
				default: '',
				type: [Object, String]
			}
		},
		components: {
			search,
			local,
			cityhistroy,
			cityhot,
			citymore
		},
		methods: {
			// 返回顶部
			scrollByHistroy (){
				window.scrollTo(0, 0)
			},
			// 热门
			scrollByHot () {
				window.scrollTo(0, this.$refs.x1.offsetHeight)
			},
			// 字母
			scrollByLatter () {
				window.scrollTo(0, this.$refs.x1.offsetHeight + this.$refs.hot.$el.offsetHeight)
			},
			getCityByLetter (letter){
				this.$refs.more.getCityList(letter)
			},
			searchToggle (val) {
				this.isShow = !val
			},
			setCity (cityInfo){
                this.$parent.getChooseCity(cityInfo);
                this.$router.back();
//				this.$emit('choose', cityInfo, this.cusKey);
			},
			getCityId () {
				return typeof this.currCity == 'string' ? this.currCity : this.currCity.id
			}
        },
		created () {
		    this.$parent.searchShow=false
		},
		destroyed(){
            this.$parent.searchShow=true
		}
	}
</script>

<style lang="less">

    .koi-city-container {
        /*position: relative;*/
        /*height: 100%;*/
        /*height: 100vh;*/
		background: #F4F5FA;
		&-box{
			padding-top: 60px;
			padding-right: 20px;
		}
		&-bar{
			position: fixed;
			z-index: 11;
			width: 30px;
			right: 0;
			bottom: 0;
			height: 100%;
			padding-top: 60px;
			box-sizing: border-box;
			background: #fff;
			li{
				height: 4%;
				text-align: center;
				color: #3c6;
				font-size: 14px;
				&:after{
					display: inline-block;
					width: 0; height: 100%;
					content: '';
					vertical-align: middle;
				}
				// &:first-child{
				// 	height: 2%;
				// }
			}
		}
    }
</style>
