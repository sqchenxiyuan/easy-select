const rollup = require('rollup')
const babel = require('rollup-plugin-babel')
const path = require('path')
const fs = require('fs-extra')
const Terser = require('terser')
const zlib = require('zlib')
const { watch } = require('gulp')
const liveServer = require('live-server')

function build (cb) {
  const inputOption = {
    input: path.resolve(__dirname, './src/index.js'),
    plugins: [
      babel()
    ]
  }
  const outputOption = {
    format: 'iife',
    name: 'easySelectFile'
  }

  rollup.rollup(inputOption).then(bundle => bundle.generate(outputOption)).then(({ output }) => {
    const rollupChunck = output[0]
    fs.outputFileSync(path.resolve(__dirname, './dist/easy-select-file.browser.js'), rollupChunck.code)
    const result = Terser.minify(rollupChunck.code, {
      sourceMap: {
        filename: 'easy-select-file.browser.min.js',
        url: 'easy-select-file.browser.min.js.map'
      }
    })
    fs.outputFileSync(path.resolve(__dirname, './dist/easy-select-file.browser.min.js'), result.code)
    fs.outputFileSync(path.resolve(__dirname, './dist/easy-select-file.browser.min.js.map'), result.map)
    cb()
  })
}

function dev () {
  build(_ => {
    liveServer.start({
      port: 8080,
      host: '0.0.0.0',
      root: __dirname, // 设置跟目录
      open: false, // 是否自动打开浏览器
      wait: 0,
      mount: [['/src', './src'], ['/dist', './dist'], ['/example', '/example']],
      logLevel: 1
    })

    watch(['src/**/*.js'], function (cb) {
      build(cb)
    })
  })
}

exports.dev = dev
exports.build = build
exports.default = build
