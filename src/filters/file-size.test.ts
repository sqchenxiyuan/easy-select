import FileSizeFilter from './file-size'

test('FileSizeFilter 512 过滤', function (): void{
  const filter = new FileSizeFilter(512)

  const files = []
  files.push({ size: 512 })
  files.push({ size: 512 * 1024 })
  files.push({ size: 256 * 1024 * 1024 })
  files.push({ size: 256 * 1024 * 1024 * 1024 })

  const result = filter.filter(files)

  expect(result.length).toEqual(1)
})

test('FileSizeFilter default(2m) 过滤', function (): void{
  const filter = new FileSizeFilter()

  const files = []
  files.push({ size: 512 })
  files.push({ size: 512 * 1024 })
  files.push({ size: 256 * 1024 * 1024 })
  files.push({ size: 256 * 1024 * 1024 * 1024 })

  const result = filter.filter(files)

  expect(result.length).toEqual(2)
})

test('FileSizeFilter 600k 过滤', function (): void{
  const filter = new FileSizeFilter('600k')

  const files = []
  files.push({ size: 512 })
  files.push({ size: 512 * 1024 })
  files.push({ size: 256 * 1024 * 1024 })
  files.push({ size: 256 * 1024 * 1024 * 1024 })

  const result = filter.filter(files)

  expect(result.length).toEqual(2)
})

test('FileSizeFilter 500M 过滤', function (): void{
  const filter = new FileSizeFilter('500M')

  const files = []
  files.push({ size: 512 })
  files.push({ size: 512 * 1024 })
  files.push({ size: 256 * 1024 * 1024 })
  files.push({ size: 256 * 1024 * 1024 * 1024 })

  const result = filter.filter(files)

  expect(result.length).toEqual(3)
})

test('FileSizeFilter 3G 过滤', function (): void{
  const filter = new FileSizeFilter('3G')

  const files = []
  files.push({ size: 512 })
  files.push({ size: 512 * 1024 })
  files.push({ size: 256 * 1024 * 1024 })
  files.push({ size: 2 * 1024 * 1024 * 1024 })

  const result = filter.filter(files)

  expect(result.length).toEqual(4)
})

test('FileSizeFilter 6666 过滤', function (): void{
  const filter = new FileSizeFilter('6666')

  const files = []
  files.push({ size: 512 })
  files.push({ size: 512 * 1024 })
  files.push({ size: 256 * 1024 * 1024 })
  files.push({ size: 2 * 1024 * 1024 * 1024 })

  const result = filter.filter(files)

  expect(result.length).toEqual(1)
})
