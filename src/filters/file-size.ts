interface File{
  size: number
}

class FileSizeFilter {
  public readonly size: number

  public constructor (size: string | number = '2m') {
    this.size = FileSizeFilter.fileSize(size)
  }

  private static fileSize (size: string | number): number {
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

  public filter (files: File[]): File[] {
    const maxSize = this.size
    return files.filter((file): boolean => {
      return file.size <= maxSize
    })
  }
}

export default FileSizeFilter
