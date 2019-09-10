class FileSizeFilter {
  constructor (size = '2m') {
    this.size = FileSizeFilter.fileSize(size)
  }

  static fileSize (size) {
    if (typeof size === 'number') return size
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

  filter (files) {
    const maxSize = this.size
    return files.filter(file => {
      return file.size <= maxSize
    })
  }
}

export default FileSizeFilter
