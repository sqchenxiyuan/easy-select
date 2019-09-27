const rollup = require('rollup')
const babel = require('rollup-plugin-babel')
const path = require('path')
const fs = require('fs-extra')
const Terser = require('terser')
const zlib = require('zlib')

const inputOption = {
  input: path.resolve(__dirname, '../src/index.js'),
  plugins: [
    // babel()
  ]
}
const outputOption = {
  format: 'umd',
  name: 'easySelectFile'
}

rollup.rollup(inputOption).then(bundle => bundle.generate(outputOption)).then(({ output }) => {
  const rollupChunck = output[0]
  fs.outputFileSync(path.resolve(__dirname, '../dist/easy-select-file.esm.js'), rollupChunck.code)
  // const result = Terser.minify(rollupChunck.code, {
  //   sourceMap: {
  //     filename: 'easy-select-file.min.js',
  //     url: 'easy-select-file.min.js.map'
  //   }
  // })
  // fs.outputFileSync(path.resolve(__dirname, '../dist/easy-select-file.min.js'), result.code)
  // fs.outputFileSync(path.resolve(__dirname, '../dist/easy-select-file.min.js.map'), result.map)
})
