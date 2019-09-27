import FileTypeFilter from './filters/file-type.js'
import FileSizeFilter from './filters/file-size.js'
import { buildCancel } from './cancel.js'

// 核心选取文件函数
// 后缀格式为 .xxx类型
// MIME为  xxxx/yy 或者 xxxx/*
// 逗号分隔
function selectFilesCore (options, cb) {
  const {
    accept = '',
    size,
    minSize = 0,
    maxSize = Infinity,
    multiple = false
  } = options

  const typeFilter = new FileTypeFilter(accept)
  const sizeFilter = new FileSizeFilter(size || maxSize, minSize)

  const input = document.createElement('input')
  input.type = 'file'
  input.style.opacity = '0' // 不被看到
  input.style.position = 'absolute' // 不影响样式
  input.value = ''
  input.accept = typeFilter.getInputAccept() // 设置accept
  input.multiple = multiple // 是否多选

  // 是否已经返回结果
  let returned = false
  function callback (err, result) {
    if (returned) return
    returned = true
    if (cb) cb(err, result)
  }

  function onChange () {
    // 没有选择文件, 取消
    if (input.files === null || input.files.length === 0) {
      cancel()
      return
    }

    // 解绑
    unbindEvents()

    let files = Array.from(input.files) // 从伪数组转换为数组
    const rawFiles = files

    files = typeFilter.filter(files)
    files = sizeFilter.filter(files)

    input.onchange = null

    callback(null, {
      files,
      raws: rawFiles
    })
  }

  // focus事件会比change事件提前发生
  function focusCancel () {
    setTimeout(function () {
      cancel()
    }, 233)
  }

  function cancel () {
    unbindEvents()
    callback(buildCancel(), null)
  }

  // 绑定事件
  function bindEvents () {
    input.onchange = onChange
    document.addEventListener('wheel', cancel, true)
    document.addEventListener('mousemove', cancel, true)
    document.addEventListener('keydown', cancel, true)
    window.addEventListener('focus', focusCancel, true) // chrome 会触发
  }

  // 解绑事件
  function unbindEvents () {
    input.onchange = null
    document.removeEventListener('wheel', cancel, true)
    document.removeEventListener('mousemove', cancel, true)
    document.removeEventListener('keydown', cancel, true)
    window.removeEventListener('focus', focusCancel, true) // chrome 会触发
  }

  bindEvents()

  // 兼容IE Input不在DOM树上无法触发选择的问题
  document.body.appendChild(input)
  input.click()
  document.body.removeChild(input)
}

export default selectFilesCore
