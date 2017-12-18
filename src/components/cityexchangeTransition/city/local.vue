<template>
	<div class="koi-city-local">
		<!-- <div class="koi-city-local-title">当前城市</div> -->
		<div class="koi-city-local-main" :class="locSuc ? 'local-tag' : ''" @click="tapLocation()" v-html="cityLoc"></div>
	</div>
</template>

<script>
import cityUtil from './cityUtil.js'
let cityLocTxt = {
	0 : '<i class="open"></i><span>开启定位当前城市</span>',
	1 : '<i class="loading"></i><span>正在为您定位...</span>',
	2 : '<i class="success"></i><span>{#city}</span>'
}
export default {
	name: 'koi-city-local',
	mixins: [cityUtil],
	data: function() {
		return {
			_location: {},
			locationObj: {},
			config: {
				fn: false, //方法localtionFn中详细阐述f
				noAddress: false, //true表示只获取经纬度 false表示获取定位地址
				time: false,  //缓存地址信息时间，false则为不缓存
				useLocal: false, //是否使用缓存定位信息
				options: '' //h5定位用到的参数 超时时间等等
			},
			provinceInfo: [{ id: 2, name: "安徽" }, { id: 3, name: "北京" }, { id: 4, name: "福建" }, { id: 5, name: "甘肃" }, { id: 6, name: "广东" }, { id: 7, name: "广西" }, { id: 8, name: "贵州" }, { id: 9, name: "海南" }, { id: 10, name: "河北" }, { id: 11, name: "河南" }, { id: 12, name: "黑龙江" }, { id: 13, name: "湖北" }, { id: 14, name: "湖南" }, { id: 15, name: "吉林" }, { id: 16, name: "江苏" }, { id: 17, name: "江西" }, { id: 18, name: "辽宁" }, { id: 19, name: "内蒙古" }, { id: 20, name: "宁夏" }, { id: 21, name: "青海" }, { id: 22, name: "山东" }, { id: 23, name: "山西" }, { id: 24, name: "陕西" }, { id: 25, name: "上海" }, { id: 26, name: "四川" }, { id: 27, name: "天津" }, { id: 28, name: "西藏" }, { id: 29, name: "新疆" }, { id: 30, name: "云南" }, { id: 31, name: "浙江" }, { id: 32, name: "重庆" }, { id: 33, name: "香港" }, { id: 34, name: "澳门" }, { id: 35, name: "台湾" }],
			cityListTable: { 33: 66, 34: 67, 35: 63, 36: 69, 37: 68, 39: 172, 40: 180, 41: 177, 42: 174, 43: 171, 44: 179, 45: 178, 46: 173, 47: 176, 48: 170, 49: 175, 50: 168, 51: 212, 52: 218, 53: 214, 55: 215, 56: 217, 57: 213, 58: 256, 59: 251, 60: 257, 61: 265, 62: 270, 64: 266, 66: 281, 74: 326, 75: 324, 76: 338, 77: 332, 78: 341, 79: 330, 81: 336, 92: 364, 95: 359, 97: 350, 98: 347, 100: 346, 104: 373, 106: 381, 108: 378, 110: 375, 112: 367, 114: 374, 117: 76, 118: 75, 119: 78, 121: 133, 122: 181, 123: 267, 124: 289, 125: 127, 126: 37, 127: 42, 128: 41, 129: 50, 130: 36, 131: 53, 132: 394, 133: 56, 134: 59, 135: 73, 136: 64, 137: 90, 138: 79, 139: 85, 140: 97, 141: 86, 142: 102, 143: 104, 144: 100, 145: 109, 146: 114, 147: 115, 148: 145, 149: 140, 150: 146, 151: 142, 152: 160, 153: 155, 154: 159, 155: 162, 157: 186, 158: 199, 159: 201, 160: 233, 161: 225, 162: 222, 163: 239, 164: 242, 165: 219, 166: 253, 167: 248, 168: 268, 169: 260, 170: 316, 171: 312, 172: 298, 173: 293, 174: 285, 175: 295, 176: 307, 178: 391, 179: 383, 180: 388, 181: 3105, 183: 216, 184: 250, 186: 339, 187: 96, 188: 52, 189: 40, 190: 51, 191: 144, 192: 57, 193: 55, 194: 61, 195: 58, 196: 74, 197: 87, 198: 94, 199: 92, 200: 81, 201: 77, 202: 106, 203: 98, 204: 101, 207: 141, 208: 143, 209: 167, 210: 154, 211: 153, 212: 158, 213: 157, 214: 161, 215: 151, 216: 189, 217: 185, 218: 192, 219: 198, 220: 209, 221: 203, 222: 211, 223: 231, 224: 226, 225: 237, 226: 234, 227: 246, 228: 255, 229: 261, 230: 259, 231: 320, 232: 315, 233: 317, 234: 291, 235: 283, 236: 292, 237: 306, 238: 303, 239: 323, 240: 333, 241: 328, 242: 340, 243: 393, 244: 390, 245: 392, 246: 271, 248: 335, 249: 377, 250: 44, 251: 38, 252: 45, 253: 43, 254: 60, 255: 62, 256: 71, 257: 80, 258: 93, 259: 84, 260: 105, 261: 108, 262: 120, 263: 112, 264: 149, 265: 147, 266: 148, 267: 150, 268: 163, 269: 165, 270: 197, 271: 183, 272: 207, 273: 204, 275: 200, 276: 228, 277: 227, 278: 243, 279: 244, 280: 247, 281: 258, 282: 249, 283: 263, 284: 319, 285: 314, 286: 288, 287: 296, 288: 287, 289: 321, 290: 302, 291: 334, 292: 387, 293: 389, 294: 384, 295: 99, 297: 262, 298: 46, 299: 39, 300: 54, 301: 82, 302: 83, 303: 88, 304: 110, 305: 107, 307: 139, 308: 164, 309: 156, 310: 196, 311: 184, 312: 210, 313: 205, 314: 208, 315: 224, 316: 230, 317: 229, 318: 236, 319: 252, 320: 245, 321: 264, 322: 273, 323: 318, 324: 311, 325: 294, 326: 297, 327: 305, 328: 310, 329: 329, 330: 337, 331: 342, 332: 343, 333: 386, 334: 385, 335: 272, 336: 382, 337: 49, 338: 95, 339: 89, 340: 91, 341: 103, 342: 116, 344: 166, 346: 232, 347: 223, 348: 221, 349: 238, 350: 240, 351: 254, 352: 313, 353: 286, 354: 299, 355: 301, 356: 300, 357: 309, 358: 47, 359: 72, 360: 274, 361: 111, 362: 194, 363: 202, 364: 241, 365: 235, 366: 290, 367: 308, 368: 304, 369: 325, 370: 48, 371: 190, 372: 284, 373: 182, 1277: 152 },
			
			locFlag: false,
			locSuc: false, //定位成功
			cityLoc: cityLocTxt[0],
			locInfo: { "id": "", "name": "", "jpy": "", "qpy": "" } //定位成功
		}
	},
	methods: {
		/*
		 * 初次点击：调用定位方法，并定义定位之后的回调信息
		 * 点击后定位失败：弹框提示错误信息
		 * 定位失败后点击：无操作
		 * 定位成功后点击：执行选中定位城市
		 */
		tapLocation: function() {
			if(this.locFlag){
				return
			}
			// locInfo.id,locInfo.name,locInfo.jpy,locInfo.qpy
			let { id, name, jpy, qpy } = this.locInfo
			//console.log(this.locSuc)
			if (this.locSuc) {
				this.cityItemAction(id, name, jpy, qpy, true)
			} else {
				this.locFlag = true
				this.localtionFn({
					fn: (data) => {
						if (data.tips) { //定位失败
							alert(data.tips)
							// 重置提示
							this.cityLoc = cityLocTxt[0]
							this.locFlag = false
						} else {  //定位成功
							var str = JSON.stringify(data.city),
								cityName = str.replace(/"/g, '').replace(/市/, '')

							this.cityLoc = cityLocTxt[2].replace('{#city}', cityName)
							this.locSuc = true

							//测试打开
							/*this.cityLoc = cityLocTxt[2].replace('{#city}', cityName);
							this.locSuc = true;
							this.locInfo = {
								"id":"15",
								"name":"北京",
								"jpy":"bj",
								"qpy":"beijing"
							}*/

							//获取城市名对应的城市所有站点的详细信息
                            this.$model.transfer.cityList({
                                allCity:"0",
                                letter:cityName,
                                requestFrom:1
                            }, (res) => {
								let infoData = ((res.result.data || {}).TrainStation).StationList || [];
								let arr = []
								infoData.forEach((val, index) => {
									val.Name == cityName ? arr.push(val) : ''
								})
								if (arr.length) {
									this.locInfo = {
										"id": arr[0].ID,
										"name": arr[0].Name,
										"jpy": arr[0].JPY,
										"qpy": arr[0].QPY
									}
								} else {
									alert('当前城市暂时没有火车站！')
								}
								this.locFlag = false
							})
						}
					},
					noAddress: false,
					time: false,
					options: {
						timeout: 2000,
					},
					useLocal: true
				})
			}
		},
		//定位开始
		localtionFn: function(param) {
			if (navigator.geolocation) {
				/**param
				 * gps定位，如果需要获得地址信息的话，需要引入baidu map的API，默认是获取城市地址的，
				 * 如果不需要地址信息，noAddress参数传递true，表示只获取经纬度
				 * fn {function} 回调函数，接受location参数，location是个对象，有如下属性
				 *  latitude  {number}  纬度
				 *  longitude  {number}  经度
				 *  province  {string}  省份
				 *  city  {string}  市
				 *  district  {string}  区
				 *  street  {string}  街道
				 *  streetNumber  {string}  号
				 *
				 * noAddress  {boolean}  可选，不需要地址，只要经纬度
				 *
				 * options  {object}  可选，定位用到的参数，默认为
				 *  {
				 *      enableHighAccuracy: true,
				 *      maximumAge: 30000,
				 *      timeout: 12000
				 *  }
				 **/
				var locOptions = {
					// 高精度
					enableHighAccuracy: true,
					// 响应对打时间 毫秒
					maximumAge: 30000,
					// 缓存最大时间 毫秒
					timeout: 12000
				}
				if (typeof param === "function") {
					this.config.options = locOptions
					this.config.fn = param
				} else if (Object.prototype.toString.call(param) === "[object Object]" && param.fn) {
					Object.assign(this.config, param)
					this.config.options = Object.assign(locOptions, param.options)
					var locinfo = this.getLocationInfo(this.config); //获取本地缓存定位信息
					if (locinfo !== false && locinfo !== undefined) {
						this.config.fn && this.config.fn(locinfo)
						return
					}
				} else {
					return
				}
				
				if(window.location.search == '?test'){
					//测试打开
					setTimeout(() => {
						this.showPosition({
							coords: {
								latitude: '31.257563116042391',
								longitude: '120.7365051452685'
							}
						})
					}, 5000)
				}
				else{
					navigator.geolocation.getCurrentPosition(this.showPosition, this.showError, this.config.options);
				}
				this.cityLoc = cityLocTxt[1]
				
				/*this.showPosition({
					coords: {
						latitude: '42.397048',
						longitude: '111.99259'
					}
				})*/
				//                    /*this.showError({
				//                        code: 3,
				//                        PERMISSION_DENIED: 1,
				//                        POSITION_UNAVAILABLE: 2,
				//                        TIMEOUT: 3,
				//	                    UNKNOWN_ERROR: 4
				//                    })*/

				
				//
			} else {
				this._location = {
					tips: "浏览器不支持定位"
				}
				if (typeof param === "function") {
					param(this._location)
				} else if (Object.prototype.toString.call(param) === "[object Object]" && param.fn) {
					param.fn(this._location)
				}
			}
		},
		//成功获取gps坐标回调
		showPosition: function(position) {
			if(arguments.length > 1){
				// 本地存储, 定位成功，下次继续定位
				this.localSave(true)
			}
			var _location = {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			}

			if (this.config.noAddress) { // 只需要经纬度的情况直接返回
				this.config.fn && this.config.fn(_location);
				// setHistoryLocation(_location);
				return
			}

			let getBack = (res) => {
				let data = res.result
				if (data.status == 0) {
					Object.assign(_location, data.result.addressComponent, {
						latitude: data.result.location.lat,
						longitude: data.result.location.lng,
						business: data.result.business,
						cityCode: data.result.cityCode
					})

					for (var i = 0; i < this.provinceInfo.length; i++) { //将百度省份id 替换成同程id
						if (_location.province.indexOf(this.provinceInfo[i].name) === 0) {
							_location.provinceId = this.provinceInfo[i].id;
							break;
						}
					}
					var tcCityCode = this.cityListTable[_location.cityCode]; //通过百度cityid获取同程体系id
					if (tcCityCode) {
						_location.cityCode = tcCityCode;
						this.locationObj.gpsInfo = Object.assign({ time: new Date() }, _location); //缓存数据
						this.setHistoryLocation(_location);
						this.config.fn && this.config.fn(_location);
					} else {
						/*$.ajax({ //通过经纬度+城市名请求接口获取同程体系城市id
							url: 'http://appnew.ly.com/fed/AjaxHelper/GetLocation.ashx'+  "&lat=" + _location.latitude + "&lng=" + _location.longitude + '&cityName=' + _location.city,
							dataType: "jsonp",
							success: function (data) {
								if(data && data.CBData && data.CBData.response && data.CBData.response.body && data.CBData.response.body.cityId){
									_location.cityCode = data.CBData.response.body.cityId
									_location.city = data.CBData.response.body.cityName || _location.city;

									locationObj.gpsInfo = Object.assign({time:new Date()},_location);
									setHistoryLocation(_location);
								}
								config.fn && config.fn(_location);
							}
						})*/
						//通过经纬度+城市名请求接口获取同程体系城市id
						this.getData('//appnew.ly.com/fed/AjaxHelper/GetLocation.ashx', (res) => {
							let data = res.result
							if (data && data.CBData && data.CBData.response && data.CBData.response.body && data.CBData.response.body.cityId) {
								_location.cityCode = data.CBData.response.body.cityId
								_location.city = data.CBData.response.body.cityName || _location.city;

								this.locationObj.gpsInfo = Object.assign({ time: new Date() }, _location);
								this.setHistoryLocation(_location);
							}
							this.config.fn && this.config.fn(_location);
						}, {
							lat: _location.latitude,
							lng: _location.longitude,
							cityName: _location.city
						})
					}
				} else {
					_location.tips = "获取地址信息失败"
					this.config.fn && this.config.fn(_location)
				}
			}

			var geocoderUrl = "&location=" + _location.latitude + "," + _location.longitude
			if (location.protocol.substring(0, 5) === "https") {
				this.getData('//passport.ly.com/member/mapservice.ashx?action=geocoding&coordtype=wgs84ll&output=json&pois=0' + geocoderUrl, getBack, null, 'post')
			} else {
				//					geocoderUrl = "http://api.map.baidu.com/geocoder/v2/?ak=PD2S3XRIIyteF1GcLIRvolpw5RN2qS9h&coordtype=wgs84ll&output=json&pois=0";
				this.getData('//api.map.baidu.com/geocoder/v2/?ak=PD2S3XRIIyteF1GcLIRvolpw5RN2qS9h&coordtype=wgs84ll&output=json&pois=0' + geocoderUrl, getBack, null, 'jsonp')
			}
		},
		//失败获取gps坐标回调
		showError: function(error) {
			// 取消保存的记录
			this.localSave(false)
			
			var _location = {};
			switch (error.code) {
				case error.PERMISSION_DENIED:
					_location.tips = "用户拒绝获取地理位置";
					_location.reject = true;
					break;
				case error.POSITION_UNAVAILABLE:
					_location.tips = "位置信息不可用";
					break;
				case error.TIMEOUT:
					_location.tips = "获取用户位置请求超时";
					break;
				case error.UNKNOWN_ERROR: //出现位置错误
					_location.tips = "获取位置失败，请重试";
					break;
			}
			this.config.fn && this.config.fn(_location);
		},
		//缓存定位数据
		setHistoryLocation: function(data, type) {
			if (!data) {
				return;
			}
			// var lName = (type === 'ip' ? 'locationInfoIp' : 'locationInfoGps');
			try {
				var hData = Object.assign({ time: new Date() }, data)
				window.localStorage.setItem('koi-local-gps', JSON.stringify(hData));
			} catch (e) {
			}
		},

		timeCompare: function(time, milliSeconds) {
			if (time === true) {
				return true;
			}
			if (new Date().getTime() - time.getTime() < milliSeconds) {
				return true;
			} else {
				return false;
			}
		},
		//获取本地缓存定位信息
		getLocationInfo: function(configs) {
			if (configs.time) {
				if (Object.prototype.toString.call(this.locationObj.gpsInfo) === "[object Object]") {
					if (!this.timeCompare(this.locationObj.gpsInfo.time, configs.time * 1000)) {
						return false;
					}
					if (!configs.noAddress && this.locationObj.gpsInfo.city) {
						return this.locationObj.gpsInfo;
					} else if (configs.noAddress) {
						return this.locationObj.gpsInfo;
					} else {
						return false;
					}

				} else if (configs.useLocal) {
					var locInfo = {};
					try {
						locInfo = JSON.parse(localStorage.getItem('koi-local-gps'));
					} catch (e) {

					}
					if (!locInfo || (!locInfo.time || !this.timeCompare(new Date(locInfo.time), configs.time * 1000))) {
						return false;
					}
					if (Object.prototype.toString.call(locInfo) === "[object Object]") {
						if (!configs.noAddress && locInfo.city && locInfo.cityCode) {
							locInfo.localCache = true;
							return locInfo;
						} else {
							return false;
						}
					}
				} else {
					return false;
				}
			} else {
				return false;
			}
		}
	},
	mounted() {
		//            console.log(storage)
		if(this.localSave()){
			// 定位成功，默认开启
			this.tapLocation()
		}
	}
}
</script>

<style lang="less">
.koi-city-local {
	&-title {
		color: #999;
		height: 35px;
		line-height: 35px;
		font-weight: 400;
		padding: 0 15px;
	}
	&-main {
		color: #999;
		background: #fff;
		font-size: 14px;
		padding: 12px 20px;
		line-height: 20px;
		position: relative;
		&.local-tag {
			color: #3c6;
		}
		i,span{
			vertical-align: middle;
		}
	}
}
</style>