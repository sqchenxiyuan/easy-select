# easy-select

这个库将提供便捷的方式来触发用户选取文件的功能

## API

## selectFiles(options) ==> Promise

调用选取文件函数

### 参数

#### options

选取文件对象

|属性名|类型|默认值|备注|
|---|---|---|---|
|accept|string|""|选取文件接收的过滤,支持.xyz的后缀形式和xxxx/yy 或者 xxxx/*的MIMIE形式,多种形式逗号分隔|
|size|number|Infinity|选取文件的大小的限制|
|multiple|boolean|false|是否可以选取批量文件|

### 响应

返回一个Promise对象,成功后返回一个对象

|属性名|类型|备注|
|---|---|---|
|files|array\<file\>|符合条件的文件列表|
|raws|array\<file\>|用户原始选择的文件列表|

如果用户取消可以使用catch捕获一个"cancle"的字符串