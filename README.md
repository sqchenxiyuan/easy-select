# easy-select

这个库将提供便捷的方式来触发用户选取文件的功能

## API

## easySelect(options, callback) => void

调用选取文件函数

### 参数

### options

选取文件对象

|属性名|类型|默认值|备注|
|---|---|---|---|
|accept|string|""|选取文件接收的过滤,支持.xyz的后缀形式和xxxx/yy 或者 xxxx/*的MIMIE形式,多种形式逗号分隔|
|size|number|Infinity|选取文件的大小的限制|
|multiple|boolean|false|是否可以选取批量文件|

### callback: (err, res) => void

回调函数, err为回调函数结果可以用`isCancel`判断是否为取消响应,res为结果

``` javascript
{
    files: [],
    raws: []
}
```

files数组表示最终结果的文件数组,raws数组表示为用户最初选择的文件数组,可以用于判断用户是否选择了有效的文件

## easySelect.isCancel(err) => boolean

判断返回是否表示为取消(目前只有取消才有错误的返回)
