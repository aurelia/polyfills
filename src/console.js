import {PLATFORM} from 'aurelia-pal';

(function(global) {
  global.console = global.console || {};
  let con = global.console;
  let prop;
  let method;
  let empty = {};
  let dummy = function() {};
  let properties = 'memory'.split(',');
  let methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
     'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' +
     'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',');
  while (prop = properties.pop()) if (!con[prop]) con[prop] = empty;
  while (method = methods.pop()) if (!con[method]) con[method] = dummy;
})(PLATFORM.global);

if (PLATFORM.global.console && typeof console.log === 'object') {
  ['log', 'info', 'warn', 'error', 'assert', 'dir', 'clear', 'profile', 'profileEnd'].forEach(function(method) {
    console[method] = this.bind(console[method], console);
  }, Function.prototype.call);
}
