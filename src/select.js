import FileTypeFilter from './filters/file-type.js'
import FileSizeFilter from './filters/file-size.js'
import { SELECT_CANCEL, isCancel } from './cancel.js'

function fileArrayFrom (files) {
  const arr = []
  for (let i = 0; i < files.length; i++) {
    arr.push(files[i] || null)
  }
  return arr
}

// 核心选取文件函数
// 后缀格式为 .xxx类型
// MIME为  xxxx/yy 或者 xxxx/*
// 逗号分隔
function select (options, cb) {
  const {
    accept = '',
    size = Infinity,
    multiple = false
  } = options

  const typeFilter = new FileTypeFilter(accept)
  const sizeFilter = new FileSizeFilter(size)

  const input = document.createElement('input')
  input.type = 'file'
  input.style.opacity = '0'
  input.style.position = 'absolute'
  input.value = ''
  input.accept = typeFilter.getInputAccept()
  input.multiple = multiple

  let flag = false
  function callback (err, res) {
    if (flag) return
    flag = true
    cb(err, res)
  }

  input.onchange = function () {
    if (input.files === null) {
      callback(null, {
        files: [],
        raws: []
      })
      return
    }
    let files = fileArrayFrom(input.files)
    const rawFiles = files

    // 啥都没有
    if (files.length === 0) cancel()

    files = typeFilter.filter(files)
    files = sizeFilter.filter(files)

    unbindEvents()
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
    callback(SELECT_CANCEL, null)
  }

  // 绑定事件
  function bindEvents () {
    document.addEventListener('wheel', cancel, true)
    document.addEventListener('mousemove', cancel, true)
    document.addEventListener('keydown', cancel, true)
    window.addEventListener('focus', focusCancel, true) // chrome 会触发
  }

  // 解绑事件
  function unbindEvents () {
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

export { select, isCancel }