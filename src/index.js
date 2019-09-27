import { isCancel } from './cancel.js'
import selectFilesCore from './core.js'

// 是否启用返回promise
let G_USE_PROMISE = false
if (window.Promise) {
  G_USE_PROMISE = true
}

console.log(G_USE_PROMISE)

function usePromise (usePromise = true) {
  G_USE_PROMISE = true
}

// 兼容promise
function promiseFunctionBuilder (fun) {
  return function () {
    if (G_USE_PROMISE) {
      const that = this
      const args = Array.from(arguments)
      return new Promise(function (resolve, reject) {
        const cb = args.pop()
        args.push(function (err, data) {
          cb(err, data)
          if (err) {
            reject(err)
          } else {
            resolve(data)
          }
        })
        return fun.apply(that, args)
      })
    } else {
      return fun.apply(this, arguments)
    }
  }
}

// 选择单个文件
function baseSelectFile (accept, size, cb) {
  return selectFilesCore({
    accept,
    size,
    multiple: false
  }, function (err, data) {
    if (err) cb(err, data)
    if (data.files.length > 0) cb(err, data.files[0])
    cb(new Error('文件类型或大小错误'), null)
  })
}

// 选择多个文件
function baseSelectFiles (accept, size, cb) {
  return selectFilesCore({
    accept,
    size,
    multiple: true
  }, function (err, data) {
    if (err) cb(err, data)
    if (data.files.length > 0) cb(err, data.files[0])
    cb(new Error('文件类型或大小错误'), null)
  })
}

const easySelect = promiseFunctionBuilder(selectFilesCore)
const selectFile = promiseFunctionBuilder(baseSelectFile)
const selectFiles = promiseFunctionBuilder(baseSelectFiles)

easySelect.isCancel = isCancel
easySelect.usePromise = usePromise
easySelect.selectFile = selectFile
easySelect.selectFiles = selectFiles

export default easySelect
