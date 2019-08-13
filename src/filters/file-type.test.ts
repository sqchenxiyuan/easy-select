import FileTypeFilter from './file-type'

test('FileTypeFilter .pdf 过滤', function (): void{
  const filter = new FileTypeFilter('.pdf')

  const files = []
  files.push({ name: '测试.pdf', type: 'application/pdf' })

  const result = filter.filter(files)

  expect(result.length).toEqual(1)
  expect(filter.getInputAccept()).toEqual('.pdf')
})

test('FileTypeFilter application/* 过滤', function (): void{
  const filter = new FileTypeFilter('application/*')

  const files = []
  files.push({ name: '测试.pdf', type: 'application/pdf' })

  const result = filter.filter(files)

  expect(result.length).toEqual(1)
  expect(filter.getInputAccept()).toEqual('application/*')
})

test('FileTypeFilter application/pdf 过滤', function (): void{
  const filter = new FileTypeFilter('application/pdf')

  const files = []
  files.push({ name: '测试.pdf', type: 'application/pdf' })

  const result = filter.filter(files)

  expect(result.length).toEqual(1)
  expect(filter.getInputAccept()).toEqual('application/pdf')
})

test('FileTypeFilter .pdf,application/*,application/pdf 过滤', function (): void{
  const filter = new FileTypeFilter('.pdf,application/*,application/pdf,images/*')

  const files = []
  files.push({ name: '测试.pdf', type: 'application/pdf' })
  files.push({ name: '测试.png', type: 'application/png' })

  const result = filter.filter(files)

  expect(result.length).toEqual(2)
  expect(filter.getInputAccept()).toEqual('.pdf, application/*, application/pdf, images/*')
})

test('FileTypeFilter 过滤', function (): void{
  const filter = new FileTypeFilter()

  const files = []
  files.push({ name: '测试.pdf', type: 'application/pdf' })
  files.push({ name: '测试.png', type: 'application/png' })

  const result = filter.filter(files)

  expect(result.length).toEqual(2)
  expect(filter.getInputAccept()).toEqual('')
})
