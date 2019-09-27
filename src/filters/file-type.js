// 文件类型过滤器
class FileTypeFilter {
  constructor (typeString = '') {
    if ((typeof typeString) !== 'string') throw new TypeError('typeString must be a string')
    // 文本类型数组  支持后缀模式(.xxx), MIME模式(xxx/yyyy)
    const accepts = typeString.toLowerCase().split(',').map(type => type.trim()).filter(type => !!type)

    // 构建过滤元素数组
    // 类型过滤元素
    this.filterItems = accepts.map(type => {
      if (/^\./.test(type)) { // 为后缀
        return {
          target: 'name', // 检查名称
          regExp: new RegExp(`${type.replace('.', '\\.')}$`, 'i')
        }
      } else if (/^[a-z-]+\/\*/.test(type)) { // 为MIME类型  xxx/*
        return {
          target: 'type', // 检查名称
          regExp: new RegExp(`^${type.replace('*', '[a-z0-9]+')}$`, 'i')
        }
      } else { // 固定
        return {
          target: 'type', // 检查名称
          regExp: new RegExp(`^${type}$`, 'i')
        }
      }
    })
    this.accepts = accepts
  }

  filter (files) {
    if (!Array.isArray(files)) throw new TypeError('files must be a Array')
    const filterItems = this.filterItems
    if (filterItems.length === 0) return files

    return files.filter(file => this.filterItems.some(test => test.regExp.test(file[test.target].toLowerCase())))
  }

  getInputAccept () {
    return this.accepts.join(', ')
  }
}

export default FileTypeFilter
