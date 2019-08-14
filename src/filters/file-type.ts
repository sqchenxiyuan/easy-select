enum FileTypeFilterItemTarget{
  NAME = 'name',
  TYPE = 'type'
}

interface FileTypeFilterItem{
  target: FileTypeFilterItemTarget
  regExp: RegExp
}

// 文件类型过滤器
class FileTypeFilter {
  private accepts: string[] // 文本类型数组  支持后缀模式(.xxx), MIME模式(xxx/yyyy)

  private filterItems: FileTypeFilterItem[] // 类型过滤元素

  public constructor (typeString: string = '') {
    const accepts = typeString.toLowerCase().split(',').map((type): string => type.trim()).filter((type): boolean => !!type)
    this.accepts = accepts

    // 构建过滤元素数组
    this.filterItems = accepts.map((type): FileTypeFilterItem => {
      if (/^\./.test(type)) { // 为后缀
        return {
          target: FileTypeFilterItemTarget.NAME, // 检查名称
          regExp: new RegExp(`${type.replace('.', '\\.')}$`, 'i')
        }
      } else if (/\/\*/.test(type)) { // 为MIME类型
        return {
          target: FileTypeFilterItemTarget.TYPE, // 检查名称
          regExp: new RegExp(`^${type.replace('*', '[a-z0-9]+')}$`, 'i')
        }
      } else { // 固定
        return {
          target: FileTypeFilterItemTarget.TYPE, // 检查名称
          regExp: new RegExp(`^${type}$`, 'i')
        }
      }
    })
  }

  public filter (files: File[]): File[] {
    if (this.filterItems.length === 0) return files

    return files.filter((file: File): boolean => {
      return this.filterItems.some((test): boolean => {
        return test.regExp.test(file[test.target].toLowerCase())
      })
    })
  }

  public getInputAccept (): string {
    return this.accepts.join(', ')
  }
}

export default FileTypeFilter
