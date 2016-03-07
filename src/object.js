(function (O) {
  if ('assign' in O) return;
  O.defineProperty(
    O,
    'assign',
    {
      configurable: true,
      writable: true,
      value: (function () {
        var
          gOPS = O.getOwnPropertySymbols,
          // shortcut without explicitly passing through prototype
          pIE = O.propertyIsEnumerable,
          filterOS = gOPS ?
            function (self) {
              return gOPS(self).filter(pIE, self);
            } :
            function () {
              // just empty Array won't do much within a .concat(...)
              return Array.prototype;
            }
        ;
        return function assign(where) {
          // Object.create(null) and null objects in general
          // might not be fully compatible with Symbols libraries
          // it is important to know this, in case you assign Symbols
          // to null object ... but it should NOT be a show-stopper
          // if you know what you are doing ... so ....
          if (gOPS && !(where instanceof O)) {
            console.warn('problematic Symbols', where);
            // ... now this script does its bloody business !!!
          }
          // avoid JSHint "don't make function in loop"
          function set(keyOrSymbol) {
            where[keyOrSymbol] = arg[keyOrSymbol];
          }
          // the loop
          for (var
            arg,
            i = 1; i < arguments.length; i++
          ) {
            arg = arguments[i];
            O
              .keys(arg)
              .concat(filterOS(arg))
              .forEach(set)
            ;
          }
          return where;
        };
      }())
    }
  );
}(Object));
