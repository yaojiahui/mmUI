# 城市组件

## 参数
cancelText: 取消按钮文字
placeholder: 搜索框 placeholder
cusKey:     自定义Key,当一个页面有多个地方有筛选的时候使用
currCity:   当前城市信息 字符串或者Object

## 事件
choose: 选择一个城市 第一个参数为当前选中的城市信息，第二个参数为 cusKey
```html
<city @choose="setCity"></city>
```
```javascript
import city from 'koi/components/city/city'
```