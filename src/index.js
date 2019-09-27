import { isCancel } from './cancel.js'
import selectFilesCore from './core.js'

// 是否启用返回promise
let G_USE_PROMISE = false
if (window.Promise) {
  G_USE_PROMISE = true
}

class FileSizeOrTypeError extends Error {
  constructor (message = '文件类型或大小错误') {
    super(message)
  }
}

class ParametersNumberError extends Error {
  constructor (message = '接口参数数目错误') {
    super(message)
  }
}

function usePromise (usePromise = true) {
  G_USE_PROMISE = true
}

// 选择单个文件
// baseSelectFiles(cb)
// baseSelectFiles(options, cb)
function selectFile () {
  let options = {}
  let cb = null

  if (arguments.length === 0) {
    throw new ParametersNumberError()
  } else if (arguments.length === 1) {
    cb = arguments[0]
  } else if (arguments.length >= 2) {
    options = arguments[0]
    cb = arguments[1]
  }

  options.multiple = false

  return selectFilesCore(options, function (err, data) {
    if (err) return cb(err, data)
    if (data.files.length > 0) return cb(err, data.files[0])
    return cb(new FileSizeOrTypeError('文件类型或大小错误'), null)
  })
}

// 选择多个文件
// baseSelectFiles(cb)
// baseSelectFiles(options, cb)
function selectFiles () {
  let options = {}
  let cb = null

  if (arguments.length === 0) {
    throw new ParametersNumberError()
  } else if (arguments.length === 1) {
    cb = arguments[0]
  } else if (arguments.length >= 2) {
    options = arguments[0]
    cb = arguments[1]
  }

  options.multiple = true

  return selectFilesCore(options, function (err, data) {
    if (err) cb(err, data)
    if (data.files.length > 0) cb(err, data.files)
    cb(new FileSizeOrTypeError('文件类型或大小错误'), null)
  })
}

const easySelect = selectFilesCore
easySelect.isCancel = isCancel
easySelect.usePromise = usePromise
easySelect.selectFile = selectFile
easySelect.selectFiles = selectFiles
easySelect.errors = {
  FileSizeOrTypeError: FileSizeOrTypeError
}

export default easySelect
