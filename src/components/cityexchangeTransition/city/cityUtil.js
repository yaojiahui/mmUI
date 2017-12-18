import * as storage from 'koi/util/storage.js'
import {
	isEqual
} from 'koi/util/misc.js'

//import ajax from 'koi/util/ajax'

// 参数的简单扩展
function extra(...arg) {
	if (arg.length < 2) {
		return;
	}
	let opt = arg.shift()
	while (arg.length) {
		let x = arg.shift()
		for (let n in x) {
			if (x.hasOwnProperty(n)) {
				opt[n] = x[n]
			}
		}
	}
}

export default {
	methods: {
		/*
		 * 点击城市的本地缓存和回调
		 * id: 城市id
		 * name: 城市的名字
		 * jpy: 城市的简拼 eg: 北京-> bj
		 * qpy: 城市的全拼 rg：北京->beijing
		 * fn: 方法的回调
		 */
		cityItemAction(id, name, jpy, qpy, flag) {
			//缓存查询历史，判断缓存超过8个，则移除最早一个
			let hisCity = storage.getItem('koi-city-history') || []
			let city = name
			
			if(typeof name != 'string'){
				city = name[1]
				name = name[0]
			}
			let obj = {
				id,
				name,
				jpy,
				qpy,
				city
			}
			let sameIndex = ''

			let hasObj = hisCity.map(function (value, index) {
				if (isEqual(value, obj)) {
					sameIndex = index;
					return true
				} else {
					return false
				}
			})
			if (eval(hasObj.join('||'))) { //有相同
				hisCity.splice(sameIndex, 1)
			} else if(hisCity.length > 5) {
				hisCity.length = 5
			}
			hisCity.unshift(obj);
			storage.setItem('koi-city-history', hisCity.slice(0, 6), -1)

			//点击之后的回调
			flag && this.$emit('elect', obj)
			//fn && fn()
			return obj
			//this.$router.back()
		},
		// 本地定位成功，就设置
		localSave (flg){
			if(flg == null){
				return storage.setItem('koi-city-local')
			}
			flg = !!flg
			storage.setItem('koi-city-local', flg, -1)
			return flg
		},
		//获取城市的本地缓存
		// Train_cityHistoryName
		getHisCity: function () {
			return storage.getItem('koi-city-history') || [];
		},
		getCityByLetter (param, callback){
			return this.getData('/uniontrain/webapi/getcitylistbyletter.html', callback, param)
		},
		getData(url, callback, param, method = 'get') {
			let j = new this.$ajax(url, method)
			//console.log(url, /^(?:https?:)?\/\//.test(url))
			if(/^(?:https?:)?\/\//.test(url)){
				j.stopPara = true
			}
			if(callback){
				j.on('callback', callback)
			}
			j.send(param)
			return j
		}
	}
}