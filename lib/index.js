'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _deepmerge = require('deepmerge');

var _deepmerge2 = _interopRequireDefault(_deepmerge);

var _localforage = require('localforage');

var _localforage2 = _interopRequireDefault(_localforage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Localstorage = function () {
  function Localstorage(parent) {
    _classCallCheck(this, Localstorage);

    var driver = 'driver' in parent.config ? parent.config.driver.toUpperCase() : 'LOCALSTORAGE';

    this.local = _localforage2.default;

    this.local.config({
      driver: _localforage2.default[driver],
      name: parent.database
    });

    return this;
  }

  _createClass(Localstorage, [{
    key: 'removeItem',
    value: function removeItem(item, callback) {
      return this.local.removeItem(item, callback);
    }
  }, {
    key: 'getItem',
    value: function getItem(item, callback) {
      return this.local.getItem(item, callback);
    }
  }, {
    key: 'setItem',
    value: function setItem(item, value, callback) {
      return this.local.setItem(item, value, callback);
    }
  }, {
    key: 'mergeItem',
    value: function mergeItem(item, value, callback) {
      var that = this;

      this.local.getItem(item).then(function (data) {
        var result = (0, _deepmerge2.default)(data, value);
        that.local.setItem(item, result, callback);
      });
    }
  }, {
    key: 'clear',
    value: function clear(callback) {
      return this.local.clear(callback);
    }
  }]);

  return Localstorage;
}();

exports.default = Localstorage;