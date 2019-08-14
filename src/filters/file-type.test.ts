import FileTypeFilter from './file-type'

class TestBlob implements Blob {
  public readonly size: number = 0

  public readonly type: string = ''

  public constructor () {
    this.size = 0
    this.type = ''
  }

  public slice (): Blob {
    return this
  }
}

class TestFile implements File {
  public readonly lastModified: number = Date.now()

  public readonly name: string

  public readonly size: number = 0

  public readonly type: string

  public constructor (name: string, type: string) {
    this.name = name
    this.type = type
  }

  public slice (): Blob {
    return new TestBlob()
  }
}

test('FileTypeFilter .pdf 过滤', function (): void{
  const filter = new FileTypeFilter('.pdf')

  const files = []
  files.push(new TestFile('测试.pdf', 'application/pdf'))

  const result = filter.filter(files)

  expect(result.length).toEqual(1)
  expect(filter.getInputAccept()).toEqual('.pdf')
})

test('FileTypeFilter application/* 过滤', function (): void{
  const filter = new FileTypeFilter('application/*')

  const files = []
  files.push(new TestFile('测试.pdf', 'application/pdf'))

  const result = filter.filter(files)

  expect(result.length).toEqual(1)
  expect(filter.getInputAccept()).toEqual('application/*')
})

test('FileTypeFilter application/pdf 过滤', function (): void{
  const filter = new FileTypeFilter('application/pdf')

  const files = []
  files.push(new TestFile('测试.pdf', 'application/pdf'))

  const result = filter.filter(files)

  expect(result.length).toEqual(1)
  expect(filter.getInputAccept()).toEqual('application/pdf')
})

test('FileTypeFilter .pdf,application/*,application/pdf 过滤', function (): void{
  const filter = new FileTypeFilter('.pdf,application/*,application/pdf,images/*')

  const files = []
  files.push(new TestFile('测试.pdf', 'application/pdf'))
  files.push(new TestFile('测试.png', 'application/png'))

  const result = filter.filter(files)

  expect(result.length).toEqual(2)
  expect(filter.getInputAccept()).toEqual('.pdf, application/*, application/pdf, images/*')
})

test('FileTypeFilter 过滤', function (): void{
  const filter = new FileTypeFilter()

  const files = []
  files.push(new TestFile('测试.pdf', 'application/pdf'))
  files.push(new TestFile('测试.png', 'application/png'))

  const result = filter.filter(files)

  expect(result.length).toEqual(2)
  expect(filter.getInputAccept()).toEqual('')
})
