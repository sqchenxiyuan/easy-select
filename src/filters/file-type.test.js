import FileTypeFilter from './file-type'

const files = []
files.push({ name: '测试.pdf', type: 'application/pdf' })
files.push({ name: '测试.png', type: 'images/png' })

test('FileTypeFilter .pdf 过滤', function () {
  const filter = new FileTypeFilter('.pdf')
  const result = filter.filter(files)
  expect(result.length).toEqual(1)
  expect(filter.getInputAccept()).toEqual('.pdf')
})

test('FileTypeFilter application/* 过滤', function () {
  const filter = new FileTypeFilter('application/*')
  const result = filter.filter(files)
  expect(result.length).toEqual(1)
  expect(filter.getInputAccept()).toEqual('application/*')
})

test('FileTypeFilter application/pdf 过滤', function () {
  const filter = new FileTypeFilter('application/pdf')
  const result = filter.filter(files)
  expect(result.length).toEqual(1)
  expect(filter.getInputAccept()).toEqual('application/pdf')
})

test('FileTypeFilter .pdf,application/*,application/pdf 过滤', function () {
  const filter = new FileTypeFilter('.pdf,application/*,application/pdf,images/*')
  const result = filter.filter(files)
  expect(result.length).toEqual(2)
  expect(filter.getInputAccept()).toEqual('.pdf, application/*, application/pdf, images/*')
})

test('FileTypeFilter 过滤', function () {
  const filter = new FileTypeFilter()
  const result = filter.filter(files)
  expect(result.length).toEqual(2)
  expect(filter.getInputAccept()).toEqual('')
})

test('FileTypeFilter build typeString 类型报错', function () {
  expect(_ => new FileTypeFilter([])).toThrowError(new TypeError('typeString must be a string'))
})

test('FileTypeFilter filter 类型报错', function () {
  expect(_ => new FileTypeFilter().filter({ length: 0 })).toThrowError(new TypeError('files must be a Array'))
})
