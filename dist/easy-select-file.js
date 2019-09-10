(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.easySelectFile = {}));
}(this, function (exports) { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var FileTypeFilterItemTarget = {
    NAME: 'name',
    TYPE: 'type' // 文件类型过滤器

  };

  var FileTypeFilter =
  /*#__PURE__*/
  function () {
    function FileTypeFilter() {
      var typeString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      _classCallCheck(this, FileTypeFilter);

      var accepts = typeString.toLowerCase().split(',').map(function (type) {
        return type.trim();
      }).filter(function (type) {
        return !!type;
      }); // 文本类型数组  支持后缀模式(.xxx), MIME模式(xxx/yyyy)

      this.accepts = accepts; // 构建过滤元素数组
      // 类型过滤元素

      this.filterItems = accepts.map(function (type) {
        if (/^\./.test(type)) {
          // 为后缀
          return {
            target: FileTypeFilterItemTarget.NAME,
            // 检查名称
            regExp: new RegExp("".concat(type.replace('.', '\\.'), "$"), 'i')
          };
        } else if (/\/\*/.test(type)) {
          // 为MIME类型
          return {
            target: FileTypeFilterItemTarget.TYPE,
            // 检查名称
            regExp: new RegExp("^".concat(type.replace('*', '[a-z0-9]+'), "$"), 'i')
          };
        } else {
          // 固定
          return {
            target: FileTypeFilterItemTarget.TYPE,
            // 检查名称
            regExp: new RegExp("^".concat(type, "$"), 'i')
          };
        }
      });
    }

    _createClass(FileTypeFilter, [{
      key: "filter",
      value: function filter(files) {
        var _this = this;

        if (this.filterItems.length === 0) return files;
        return files.filter(function (file) {
          return _this.filterItems.some(function (test) {
            return test.regExp.test(file[test.target].toLowerCase());
          });
        });
      }
    }, {
      key: "getInputAccept",
      value: function getInputAccept() {
        return this.accepts.join(', ');
      }
    }]);

    return FileTypeFilter;
  }();

  var FileSizeFilter =
  /*#__PURE__*/
  function () {
    function FileSizeFilter() {
      var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '2m';

      _classCallCheck(this, FileSizeFilter);

      this.size = FileSizeFilter.fileSize(size);
    }

    _createClass(FileSizeFilter, [{
      key: "filter",
      value: function filter(files) {
        var maxSize = this.size;
        return files.filter(function (file) {
          return file.size <= maxSize;
        });
      }
    }], [{
      key: "fileSize",
      value: function fileSize(size) {
        if (typeof size === 'number') return size;
        var unit = size.slice(-1).toLowerCase();
        var sizeNum = parseFloat(size.slice(0, -1));

        switch (unit) {
          case 'k':
            return sizeNum * 1024;

          case 'm':
            return sizeNum * 1024 * 1024;

          case 'g':
            return sizeNum * 1024 * 1024 * 1024;

          default:
            return parseFloat(size);
        }
      }
    }]);

    return FileSizeFilter;
  }();

  var SELECT_CANCEL = 'SELECT_CANCEL';

  function isCancel(err) {
    return err === SELECT_CANCEL;
  }

  function fileArrayFrom(files) {
    var arr = [];

    for (var i = 0; i < files.length; i++) {
      arr.push(files[i] || null);
    }

    return arr;
  } // 核心选取文件函数
  // 后缀格式为 .xxx类型
  // MIME为  xxxx/yy 或者 xxxx/*
  // 逗号分隔


  function select(options, cb) {
    var _options$accept = options.accept,
        accept = _options$accept === void 0 ? '' : _options$accept,
        _options$size = options.size,
        size = _options$size === void 0 ? Infinity : _options$size,
        _options$multiple = options.multiple,
        multiple = _options$multiple === void 0 ? false : _options$multiple;
    var typeFilter = new FileTypeFilter(accept);
    var sizeFilter = new FileSizeFilter(size);
    var input = document.createElement('input');
    input.type = 'file';
    input.style.opacity = '0';
    input.style.position = 'absolute';
    input.value = '';
    input.accept = typeFilter.getInputAccept();
    input.multiple = multiple;
    var flag = false;

    function callback(err, res) {
      if (flag) return;
      flag = true;
      cb(err, res);
    }

    input.onchange = function () {
      if (input.files === null) {
        callback(null, {
          files: [],
          raws: []
        });
        return;
      }

      var files = fileArrayFrom(input.files);
      var rawFiles = files; // 啥都没有

      if (files.length === 0) cancel();
      files = typeFilter.filter(files);
      files = sizeFilter.filter(files);
      unbindEvents();
      input.onchange = null;
      callback(null, {
        files: files,
        raws: rawFiles
      });
    }; // focus事件会比change事件提前发生


    function focusCancel() {
      setTimeout(function () {
        cancel();
      }, 233);
    }

    function cancel() {
      unbindEvents();
      callback(SELECT_CANCEL, null);
    } // 绑定事件


    function bindEvents() {
      document.addEventListener('wheel', cancel, true);
      document.addEventListener('mousemove', cancel, true);
      document.addEventListener('keydown', cancel, true);
      window.addEventListener('focus', focusCancel, true); // chrome 会触发
    } // 解绑事件


    function unbindEvents() {
      document.removeEventListener('wheel', cancel, true);
      document.removeEventListener('mousemove', cancel, true);
      document.removeEventListener('keydown', cancel, true);
      window.removeEventListener('focus', focusCancel, true); // chrome 会触发
    }

    bindEvents(); // 兼容IE Input不在DOM树上无法触发选择的问题

    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  }

  exports.isCancel = isCancel;
  exports.select = select;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
