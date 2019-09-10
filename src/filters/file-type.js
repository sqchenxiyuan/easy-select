const FileTypeFilterItemTarget = {
  NAME: 'name',
  TYPE: 'type'
}

// 文件类型过滤器
class FileTypeFilter {
  constructor (typeString = '') {
    const accepts = typeString.toLowerCase().split(',').map(type => type.trim()).filter(type => !!type)
    // 文本类型数组  支持后缀模式(.xxx), MIME模式(xxx/yyyy)
    this.accepts = accepts

    // 构建过滤元素数组
    // 类型过滤元素
    this.filterItems = accepts.map(type => {
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

  filter (files) {
    if (this.filterItems.length === 0) return files

    return files.filter(file => {
      return this.filterItems.some(test => {
        return test.regExp.test(file[test.target].toLowerCase())
      })
    })
  }

  getInputAccept () {
    return this.accepts.join(', ')
  }
}

export default FileTypeFilter
