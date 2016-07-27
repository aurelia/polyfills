'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _aureliaPolyfills = require('./aurelia-polyfills');

Object.keys(_aureliaPolyfills).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _aureliaPolyfills[key];
    }
  });
});