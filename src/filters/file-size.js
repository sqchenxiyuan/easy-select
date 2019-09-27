function fileSizeStringParse (size) {
  if (typeof size === 'number') return size
  if ((typeof size) !== 'string') throw new TypeError(`size must be a string, but is a ${typeof size}`)
  const unit = size.slice(-1).toLowerCase()
  const sizeNum = parseFloat(size.slice(0, -1))
  switch (unit) {
    case 'k': return sizeNum * 1024
    case 'm': return sizeNum * 1024 * 1024
    case 'g': return sizeNum * 1024 * 1024 * 1024
    default:
      return parseFloat(size)
  }
}

// FileSizeStringParse()
// FileSizeStringParse(maxSize)
// FileSizeStringParse(maxSize, minSize)
// FileSizeStringParse(minSize, maxSize)
class FileSizeStringParse {
  constructor (maxSize = Infinity, minSize = 0) {
    maxSize = fileSizeStringParse(maxSize)
    minSize = fileSizeStringParse(minSize)
    if (maxSize < minSize) {
      [maxSize, minSize] = [minSize, maxSize]
    }

    this.maxSize = maxSize
    this.minSize = minSize
  }

  filter (files) {
    if (!Array.isArray(files)) throw new TypeError('files must be a Array')
    const maxSize = this.maxSize
    const minSize = this.minSize

    return files.filter(file => minSize <= file.size && file.size <= maxSize)
  }
}

export default FileSizeStringParse
