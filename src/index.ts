import FileTypeFilter from './filters/file-type'
import FileSizeFilter from './filters/file-size'

// 核心选取文件函数
function selectFiles (options) {
  const {
    accept = '',
    size = Infinity,
    multiple = false
  } = options

  return new Promise((resolve, reject) => {
    // 后缀格式为 .xxx类型
    // MIME为  xxxx/yy 或者 xxxx/*
    // 逗号分隔
    const input = document.createElement('input')
    input.type = 'file'
    input.style.opacity = '0'
    input.value = ''

    const typeFilter = new FileTypeFilter(accept)

    input.accept = typeFilter.getInputAccept()
    input.multiple = multiple

    input.onchange = function (e) {
      let files = Array.from(input.files)
      const rawFiles = files

      // 啥都没有
      if (files.length === 0) cancle()

      files = typeFilter.filter(files)
      if (size) {
        const sizeFilter = new FileSizeFilter(size)
        files = sizeFilter.filter(files)
      }

      unbindEvents()
      input.onchange = null

      resolve({
        files,
        raws: rawFiles
      })
    }

    // focus事件会比change事件提前发生
    function focusCancel (e) {
      setTimeout(_ => {
        cancel(e)
      }, 1000)
    }

    function cancel (e) {
      unbindEvents()
      reject('cancel')
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
  })
}

export {
  selectFiles
}
