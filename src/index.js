import { isCancel } from './cancel.js'
import selectFilesCore from './core.js'

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
    if (err) return cb(err)
    if (data.files.length > 0) return cb(null, data.files[0])
    return cb(new FileSizeOrTypeError('文件类型或大小错误'))
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
    if (err) return cb(err)
    if (data.files.length > 0) return cb(null, data.files)
    return cb(new FileSizeOrTypeError('文件类型或大小错误'))
  })
}

const easySelect = {}
easySelect.isCancel = isCancel
easySelect.selectFile = selectFile
easySelect.selectFiles = selectFiles
easySelect.errors = {
  FileSizeOrTypeError: FileSizeOrTypeError
}

export default easySelect
