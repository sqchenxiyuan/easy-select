import FileSizeStringParse from './file-size.js'

const files = []
files.push({ size: 512 }) // 512B
files.push({ size: 512 * 1024 }) // 512K
files.push({ size: 256 * 1024 * 1024 }) // 256M
files.push({ size: 256 * 1024 * 1024 * 1024 })// 256g

test('fileSizeFilter 默认过滤(不塞选)', function () {
  const result = (new FileSizeStringParse()).filter(files)
  expect(result.length).toEqual(4)
})

test('fileSizeFilter 0-512 过滤', function () {
  const result = (new FileSizeStringParse(512)).filter(files)
  expect(result.length).toEqual(1)
})

test('fileSizeFilter 0-Infinity 过滤', function () {
  const result = (new FileSizeStringParse(0, Infinity)).filter(files)
  expect(result.length).toEqual(4)
})

test('fileSizeFilter 0-600k 过滤', function () {
  const result = (new FileSizeStringParse('600k')).filter(files)
  expect(result.length).toEqual(2)
})

test('fileSizeFilter 500M 过滤', function () {
  const result = (new FileSizeStringParse('500M')).filter(files)
  expect(result.length).toEqual(3)
})

test('fileSizeFilter 3G 过滤', function () {
  const result = (new FileSizeStringParse('3G')).filter(files)
  expect(result.length).toEqual(3)
})

test('fileSizeFilter 1G-3G 过滤', function () {
  const result = (new FileSizeStringParse('1G', '3G')).filter(files)
  expect(result.length).toEqual(0)
})

test('fileSizeFilter "6666" 过滤', function () {
  const result = (new FileSizeStringParse('6666')).filter(files)
  expect(result.length).toEqual(1)
})

test('fileSizeFilter object 过滤-报错', function () {
  expect(_ => new FileSizeStringParse(null)).toThrowError(new TypeError(`size must be a string, but is a object`))
})

test('fileSizeFilter boolean 过滤-报错', function () {
  expect(_ => new FileSizeStringParse(true)).toThrowError(new TypeError(`size must be a string, but is a boolean`))
})

test('fileSizeFilter 过滤 null-报错', function () {
  expect(_ => new FileSizeStringParse().filter(null)).toThrowError(new TypeError('files must be a Array'))
})
