import {PLATFORM} from 'aurelia-pal';

if (typeof FEATURE_NO_ES2015 === 'undefined') {

(function (Object, GOPS) {'use strict';

  // (C) Andrea Giammarchi - Mit Style

  if (GOPS in Object) return;

  var
    setDescriptor,
    G = PLATFORM.global,
    id = 0,
    random = '' + Math.random(),
    prefix = '__\x01symbol:',
    prefixLength = prefix.length,
    internalSymbol = '__\x01symbol@@' + random,
    DP = 'defineProperty',
    DPies = 'defineProperties',
    GOPN = 'getOwnPropertyNames',
    GOPD = 'getOwnPropertyDescriptor',
    PIE = 'propertyIsEnumerable',
    gOPN = Object[GOPN],
    gOPD = Object[GOPD],
    create = Object.create,
    keys = Object.keys,
    defineProperty = Object[DP],
    $defineProperties = Object[DPies],
    descriptor = gOPD(Object, GOPN),
    ObjectProto = Object.prototype,
    hOP = ObjectProto.hasOwnProperty,
    pIE = ObjectProto[PIE],
    toString = ObjectProto.toString,
    indexOf = Array.prototype.indexOf || function (v) {
      for (var i = this.length; i-- && this[i] !== v;) {}
      return i;
    },
    addInternalIfNeeded = function (o, uid, enumerable) {
      if (!hOP.call(o, internalSymbol)) {
        defineProperty(o, internalSymbol, {
          enumerable: false,
          configurable: false,
          writable: false,
          value: {}
        });
      }
      o[internalSymbol]['@@' + uid] = enumerable;
    },
    createWithSymbols = function (proto, descriptors) {
      var self = create(proto);
      if (descriptors !== null && typeof descriptors === 'object') {
        gOPN(descriptors).forEach(function (key) {
          if (propertyIsEnumerable.call(descriptors, key)) {
            $defineProperty(self, key, descriptors[key]);
          }
        });
      }
      return self;
    },
    copyAsNonEnumerable = function (descriptor) {
      var newDescriptor = create(descriptor);
      newDescriptor.enumerable = false;
      return newDescriptor;
    },
    get = function get(){},
    onlyNonSymbols = function (name) {
      return  name != internalSymbol &&
              !hOP.call(source, name);
    },
    onlySymbols = function (name) {
      return  name != internalSymbol &&
              hOP.call(source, name);
    },
    propertyIsEnumerable = function propertyIsEnumerable(key) {
      var uid = '' + key;
      return onlySymbols(uid) ? (
        hOP.call(this, uid) &&
        this[internalSymbol] &&
        this[internalSymbol]['@@' + uid]
      ) : pIE.call(this, key);
    },
    setAndGetSymbol = function (uid) {
      var descriptor = {
        enumerable: false,
        configurable: true,
        get: get,
        set: function (value) {
          setDescriptor(this, uid, {
            enumerable: false,
            configurable: true,
            writable: true,
            value: value
          });
          addInternalIfNeeded(this, uid, true);
        }
      };
      defineProperty(ObjectProto, uid, descriptor);
      return (source[uid] = defineProperty(
        Object(uid),
        'constructor',
        sourceConstructor
      ));
    },
    Symbol = function Symbol(description) {
      if (this && this !== G) {
        throw new TypeError('Symbol is not a constructor');
      }
      return setAndGetSymbol(
        prefix.concat(description || '', random, ++id)
      );
    },
    source = create(null),
    sourceConstructor = {value: Symbol},
    sourceMap = function (uid) {
      return source[uid];
    },
    $defineProperty = function defineProp(o, key, descriptor) {
      var uid = '' + key;
      if (onlySymbols(uid)) {
        setDescriptor(o, uid, descriptor.enumerable ?
            copyAsNonEnumerable(descriptor) : descriptor);
        addInternalIfNeeded(o, uid, !!descriptor.enumerable);
      } else {
        defineProperty(o, key, descriptor);
      }
      return o;
    },
    $getOwnPropertySymbols = function getOwnPropertySymbols(o) {
      var cof = toString.call(o);
      o = (cof === '[object String]') ? o.split('') : Object(o);
      return gOPN(o).filter(onlySymbols).map(sourceMap);
    }
  ;

  descriptor.value = $defineProperty;
  defineProperty(Object, DP, descriptor);

  descriptor.value = $getOwnPropertySymbols;
  defineProperty(Object, GOPS, descriptor);

  var cachedWindowNames = typeof window === 'object' ? Object.getOwnPropertyNames(window) : [];
  var originalObjectGetOwnPropertyNames = Object.getOwnPropertyNames;
  descriptor.value = function getOwnPropertyNames(o) {
    if (toString.call(o) === '[object Window]') {
      try {
        return originalObjectGetOwnPropertyNames(o);
      } catch (e) {
        // IE bug where layout engine calls userland gOPN for cross-domain "window" objects 
        return [].concat([], cachedWindowNames);
      }
    }
    return gOPN(o).filter(onlyNonSymbols);
  };
  defineProperty(Object, GOPN, descriptor);

  descriptor.value = function defineProperties(o, descriptors) {
    var symbols = $getOwnPropertySymbols(descriptors);
    if (symbols.length) {
      keys(descriptors).concat(symbols).forEach(function (uid) {
        if (propertyIsEnumerable.call(descriptors, uid)) {
          $defineProperty(o, uid, descriptors[uid]);
        }
      });
    } else {
      $defineProperties(o, descriptors);
    }
    return o;
  };
  defineProperty(Object, DPies, descriptor);

  descriptor.value = propertyIsEnumerable;
  defineProperty(ObjectProto, PIE, descriptor);

  descriptor.value = Symbol;
  defineProperty(G, 'Symbol', descriptor);

  // defining `Symbol.for(key)`
  descriptor.value = function (key) {
    var uid = prefix.concat(prefix, key, random);
    return uid in ObjectProto ? source[uid] : setAndGetSymbol(uid);
  };
  defineProperty(Symbol, 'for', descriptor);

  // defining `Symbol.keyFor(symbol)`
  descriptor.value = function (symbol) {
    return hOP.call(source, symbol) ?
      symbol.slice(prefixLength * 2, -random.length) :
      void 0
    ;
  };
  defineProperty(Symbol, 'keyFor', descriptor);

  descriptor.value = function getOwnPropertyDescriptor(o, key) {
    var descriptor = gOPD(o, key);
    if (descriptor && onlySymbols(key)) {
      descriptor.enumerable = propertyIsEnumerable.call(o, key);
    }
    return descriptor;
  };
  defineProperty(Object, GOPD, descriptor);

  descriptor.value = function (proto, descriptors) {
    return arguments.length === 1 ?
      create(proto) :
      createWithSymbols(proto, descriptors);
  };
  defineProperty(Object, 'create', descriptor);

  descriptor.value = function () {
    var str = toString.call(this);
    return (str === '[object String]' && onlySymbols(this)) ? '[object Symbol]' : str;
  };
  defineProperty(ObjectProto, 'toString', descriptor);

  try { // fails in few pre ES 5.1 engines
    setDescriptor = create(
      defineProperty(
        {},
        prefix,
        {
          get: function () {
            return defineProperty(this, prefix, {value: false})[prefix];
          }
        }
      )
    )[prefix] || defineProperty;
  } catch(o_O) {
    setDescriptor = function (o, key, descriptor) {
      var protoDescriptor = gOPD(ObjectProto, key);
      delete ObjectProto[key];
      defineProperty(o, key, descriptor);
      defineProperty(ObjectProto, key, protoDescriptor);
    };
  }

}(Object, 'getOwnPropertySymbols'));

(function (O, S) {
  var
    dP = O.defineProperty,
    ObjectProto = O.prototype,
    toString = ObjectProto.toString,
    toStringTag = 'toStringTag',
    descriptor
  ;
  [
    'iterator',           // A method returning the default iterator for an object. Used by for...of.
    'match',              // A method that matches against a string, also used to determine if an object may be used as a regular expression. Used by String.prototype.match().
    'replace',            // A method that replaces matched substrings of a string. Used by String.prototype.replace().
    'search',             // A method that returns the index within a string that matches the regular expression. Used by String.prototype.search().
    'split',              // A method that splits a string at the indices that match a regular expression. Used by String.prototype.split().
    'hasInstance',        // A method determining if a constructor object recognizes an object as its instance. Used by instanceof.
    'isConcatSpreadable', // A Boolean value indicating if an object should be flattened to its array elements. Used by Array.prototype.concat().
    'unscopables',        // An Array of string values that are property values. These are excluded from the with environment bindings of the associated objects.
    'species',            // A constructor function that is used to create derived objects.
    'toPrimitive',        // A method converting an object to a primitive value.
    toStringTag           // A string value used for the default description of an object. Used by Object.prototype.toString().
  ].forEach(function (name) {
    if (!(name in Symbol)) {
      dP(Symbol, name, {value: Symbol(name)});
      switch (name) {
        case toStringTag:
          descriptor = O.getOwnPropertyDescriptor(ObjectProto, 'toString');
          descriptor.value = function () {
            var
              str = toString.call(this),
              tst = typeof this === 'undefined' || this === null ? undefined : this[Symbol.toStringTag]
            ;
            return typeof tst === 'undefined' ? str : ('[object ' + tst + ']');
          };
          dP(ObjectProto, 'toString', descriptor);
          break;
      }
    }
  });
}(Object, Symbol));

(function (Si, AP, SP) {

  function returnThis() { return this; }

  // make Arrays usable as iterators
  // so that other iterables can copy same logic
  if (!AP[Si]) AP[Si] = function () {
    var
      i = 0,
      self = this,
      iterator = {
        next: function next() {
          var done = self.length <= i;
          return done ?
            {done: done} :
            {done: done, value: self[i++]};
        }
      }
    ;
    iterator[Si] = returnThis;
    return iterator;
  };

  // make Strings usable as iterators
  // to simplify Array.from and
  if (!SP[Si]) SP[Si] = function () {
    var
      fromCodePoint = String.fromCodePoint,
      self = this,
      i = 0,
      length = self.length,
      iterator = {
        next: function next() {
          var
            done = length <= i,
            c = done ? '' : fromCodePoint(self.codePointAt(i))
          ;
          i += c.length;
          return done ?
            {done: done} :
            {done: done, value: c};
        }
      }
    ;
    iterator[Si] = returnThis;
    return iterator;
  };

}(Symbol.iterator, Array.prototype, String.prototype));


} // endif FEATURE_NO_ES2015

if (typeof FEATURE_NO_ES2015 === 'undefined') {

Number.isNaN = Number.isNaN || function(value) {     
  return value !== value;
};

Number.isFinite = Number.isFinite || function(value) {
  return typeof value === "number" && isFinite(value);
};

} // endif FEATURE_NO_ES2015

if ((!String.prototype.endsWith) || ((function() { try { return !("ab".endsWith("a",1)); } catch (e) { return true; } } )())) {
  String.prototype.endsWith = function(searchString, position) {
    let subjectString = this.toString();
    if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
      position = subjectString.length;
    }
    position -= searchString.length;
    let lastIndex = subjectString.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
  };
}

if ((!String.prototype.startsWith) || ((function() { try { return !("ab".startsWith("b", 1)); } catch (e) { return true; } } )())) {
  String.prototype.startsWith = function(searchString, position){
    position = position || 0;
    return this.substr(position, searchString.length) === searchString;
  };
}

if (typeof FEATURE_NO_ES2015 === 'undefined') {

if (!Array.from) {
  Array.from = (function () {
    var toInteger = function(it) {
      return isNaN(it = +it) ? 0 : (it > 0 ? Math.floor : Math.ceil)(it);
    };
    var toLength = function(it) {
      return it > 0 ? Math.min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
    };
    var iterCall = function(iter, fn, val, index) {
      try {
        return fn(val, index)
      }
      catch (E) {
        if (typeof iter.return == 'function') iter.return();
        throw E;
      }
    };

    // The length property of the from method is 1.
    return function from(arrayLike/*, mapFn, thisArg */) {
      var O = Object(arrayLike)
        , C = typeof this == 'function' ? this : Array
        , aLen = arguments.length
        , mapfn = aLen > 1 ? arguments[1] : undefined
        , mapping = mapfn !== undefined
        , index = 0
        , iterFn = O[Symbol.iterator]
        , length, result, step, iterator;
      if (mapping) mapfn = mapfn.bind(aLen > 2 ? arguments[2] : undefined);
      if (iterFn != undefined && !Array.isArray(arrayLike)) {
        for (iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++) {
          result[index] = mapping ? iterCall(iterator, mapfn, step.value, index) : step.value;
        }
      } else {
        length = toLength(O.length);
        for (result = new C(length); length > index; index++) {
          result[index] = mapping ? mapfn(O[index], index) : O[index];
        }
      }
      result.length = index;
      return result;
    };
  }());
}

if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    configurable: true,
    writable: true,
    enumerable: false,
    value: function(predicate) {
      if (this === null) {
        throw new TypeError('Array.prototype.find called on null or undefined');
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }
      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      var value;

      for (var i = 0; i < length; i++) {
        value = list[i];
        if (predicate.call(thisArg, value, i, list)) {
          return value;
        }
      }
      return undefined;
    }
  });
}

if (!Array.prototype.findIndex) {
  Object.defineProperty(Array.prototype, 'findIndex', {
    configurable: true,
    writable: true,
    enumerable: false,
    value: function(predicate) {
      if (this === null) {
        throw new TypeError('Array.prototype.findIndex called on null or undefined');
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }
      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      var value;

      for (var i = 0; i < length; i++) {
        value = list[i];
        if (predicate.call(thisArg, value, i, list)) {
          return i;
        }
      }
      return -1;
    }
  });
}

} // endif FEATURE_NO_ES2015

if (typeof FEATURE_NO_ES2016 === 'undefined' && !Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    configurable: true,
    writable: true,
    enumerable: false,
    value: function(searchElement /*, fromIndex*/ ) {
      var O = Object(this);
      var len = parseInt(O.length) || 0;
      if (len === 0) {
        return false;
      }
      var n = parseInt(arguments[1]) || 0;
      var k;
      if (n >= 0) {
        k = n;
      } else {
        k = len + n;
        if (k < 0) {k = 0;}
      }
      var currentElement;
      while (k < len) {
        currentElement = O[k];
        if (searchElement === currentElement ||
           (searchElement !== searchElement && currentElement !== currentElement)) { // NaN !== NaN
          return true;
        }
        k++;
      }
      return false;
    }
  });
}

if (typeof FEATURE_NO_ES2015 === 'undefined') {

(function() {
  let needsFix = false;

  //ES5 did not accept primitives, but ES6 does
  try {
    let s = Object.keys('a');
    needsFix = (s.length !== 1 || s[0] !== '0');
  } catch(e) {
    needsFix = true;
  }

  if (needsFix) {
    Object.keys = (function() {
      var hasOwnProperty = Object.prototype.hasOwnProperty,
          hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
          dontEnums = [
            'toString',
            'toLocaleString',
            'valueOf',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'constructor'
          ],
          dontEnumsLength = dontEnums.length;

      return function(obj) {
        if (obj === undefined || obj === null){
          throw TypeError(`Cannot convert undefined or null to object`);
        }

        obj = Object(obj);

        var result = [], prop, i;

        for (prop in obj) {
          if (hasOwnProperty.call(obj, prop)) {
            result.push(prop);
          }
        }

        if (hasDontEnumBug) {
          for (i = 0; i < dontEnumsLength; i++) {
            if (hasOwnProperty.call(obj, dontEnums[i])) {
              result.push(dontEnums[i]);
            }
          }
        }

        return result;
      };
    }());
  }
}());

(function (O) {
  if ('assign' in O) {
    return;
  }

  O.defineProperty(O, 'assign', {
      configurable: true,
      writable: true,
      value: (function() {
        var gOPS = O.getOwnPropertySymbols,
            // shortcut without explicitly passing through prototype
            pIE = O.propertyIsEnumerable,
            filterOS = gOPS ?
              function (self) {
                return gOPS(self).filter(pIE, self);
              } : function () {
                // just empty Array won't do much within a .concat(...)
                return Array.prototype;
              };

        return function assign(where) {
          // Object.create(null) and null objects in general
          // might not be fully compatible with Symbols libraries
          // it is important to know this, in case you assign Symbols
          // to null object ... but it should NOT be a show-stopper
          // if you know what you are doing ... so ....
          if (gOPS && !(where instanceof O)) {
            console.warn('problematic Symbols', where);
            // ... now this script does its business !!!
          }
          // avoid JSHint "don't make function in loop"
          function set(keyOrSymbol) {
            where[keyOrSymbol] = arg[keyOrSymbol];
          }
          // the loop
          for (var i = 1, ii = arguments.length; i < ii; ++i) {
            var arg = arguments[i];

            if (arg === null || arg === undefined) {
              continue;
            }

            O.keys(arg).concat(filterOS(arg)).forEach(set);
          }

          return where;
        };
      }())
    });
}(Object));

/**
 * Object.is() polyfill
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
if (!Object.is) {
  Object.is = function(x, y) {
    // SameValue algorithm
    if (x === y) { // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
     // Step 6.a: NaN == NaN
     return x !== x && y !== y;
    }
  };
}

} // endif FEATURE_NO_ES2015

if (typeof FEATURE_NO_ES2015 === 'undefined') {
  
(function (global) {
  //shared pointer
  var i;
  //shortcuts
  var defineProperty = Object.defineProperty, is = function(a,b) { return (a === b) || (a !== a && b !== b) };

  //Polyfill global objects
  if (typeof WeakMap == 'undefined') {
    global.WeakMap = createCollection({
      // WeakMap#delete(key:void*):boolean
      'delete': sharedDelete,
      // WeakMap#clear():
      clear: sharedClear,
      // WeakMap#get(key:void*):void*
      get: sharedGet,
      // WeakMap#has(key:void*):boolean
      has: mapHas,
      // WeakMap#set(key:void*, value:void*):void
      set: sharedSet
    }, true);
  }

  if (typeof Map == 'undefined' || typeof ((new Map).values) !== 'function' || !(new Map).values().next) {
    global.Map = createCollection({
      // WeakMap#delete(key:void*):boolean
      'delete': sharedDelete,
      //:was Map#get(key:void*[, d3fault:void*]):void*
      // Map#has(key:void*):boolean
      has: mapHas,
      // Map#get(key:void*):boolean
      get: sharedGet,
      // Map#set(key:void*, value:void*):void
      set: sharedSet,
      // Map#keys(void):Iterator
      keys: sharedKeys,
      // Map#values(void):Iterator
      values: sharedValues,
      // Map#entries(void):Iterator
      entries: mapEntries,
      // Map#forEach(callback:Function, context:void*):void ==> callback.call(context, key, value, mapObject) === not in specs`
      forEach: sharedForEach,
      // Map#clear():
      clear: sharedClear,
      //iterator
      [Symbol.iterator]: mapEntries
    });
  }

  if (typeof Set == 'undefined' || typeof ((new Set).values) !== 'function' || !(new Set).values().next) {
    global.Set = createCollection({
      // Set#has(value:void*):boolean
      has: setHas,
      // Set#add(value:void*):boolean
      add: sharedAdd,
      // Set#delete(key:void*):boolean
      'delete': sharedDelete,
      // Set#clear():
      clear: sharedClear,
      // Set#keys(void):Iterator
      keys: sharedValues, // specs actually say "the same function object as the initial value of the values property"
      // Set#values(void):Iterator
      values: sharedValues,
      // Set#entries(void):Iterator
      entries: setEntries,
      // Set#forEach(callback:Function, context:void*):void ==> callback.call(context, value, index) === not in specs
      forEach: sharedForEach,
      //iterator
      [Symbol.iterator]: sharedValues
    });
  }

  if (typeof WeakSet == 'undefined') {
    global.WeakSet = createCollection({
      // WeakSet#delete(key:void*):boolean
      'delete': sharedDelete,
      // WeakSet#add(value:void*):boolean
      add: sharedAdd,
      // WeakSet#clear():
      clear: sharedClear,
      // WeakSet#has(value:void*):boolean
      has: setHas
    }, true);
  }

  /**
   * ES6 collection constructor
   * @return {Function} a collection class
   */
  function createCollection(proto, objectOnly){
    function Collection(a){
      if (!this || this.constructor !== Collection) return new Collection(a);
      this._keys = [];
      this._values = [];
      this._itp = []; // iteration pointers
      this.objectOnly = objectOnly;

      //parse initial iterable argument passed
      if (a) init.call(this, a);
    }

    //define size for non object-only collections
    if (!objectOnly) {
      defineProperty(proto, 'size', {
        get: sharedSize
      });
    }

    //set prototype
    proto.constructor = Collection;
    Collection.prototype = proto;

    return Collection;
  }


  /** parse initial iterable argument passed */
  function init(a){
    var i;
    //init Set argument, like `[1,2,3,{}]`
    if (this.add)
      a.forEach(this.add, this);
    //init Map argument like `[[1,2], [{}, 4]]`
    else
      a.forEach(function(a){this.set(a[0],a[1])}, this);
  }


  /** delete */
  function sharedDelete(key) {
    if (this.has(key)) {
      this._keys.splice(i, 1);
      this._values.splice(i, 1);
      // update iteration pointers
      this._itp.forEach(function(p) { if (i < p[0]) p[0]--; });
    }
    // Aurora here does it while Canary doesn't
    return -1 < i;
  };

  function sharedGet(key) {
    return this.has(key) ? this._values[i] : undefined;
  }

  function has(list, key) {
    if (this.objectOnly && key !== Object(key))
      throw new TypeError("Invalid value used as weak collection key");
    //NaN or 0 passed
    if (key != key || key === 0) for (i = list.length; i-- && !is(list[i], key);){}
    else i = list.indexOf(key);
    return -1 < i;
  }

  function setHas(value) {
    return has.call(this, this._values, value);
  }

  function mapHas(value) {
    return has.call(this, this._keys, value);
  }

  /** @chainable */
  function sharedSet(key, value) {
    this.has(key) ?
      this._values[i] = value
      :
      this._values[this._keys.push(key) - 1] = value
    ;
    return this;
  }

  /** @chainable */
  function sharedAdd(value) {
    if (!this.has(value)) this._values.push(value);
    return this;
  }

  function sharedClear() {
    (this._keys || 0).length =
    this._values.length = 0;
  }

  /** keys, values, and iterate related methods */
  function sharedKeys() {
    return sharedIterator(this._itp, this._keys);
  }

  function sharedValues() {
    return sharedIterator(this._itp, this._values);
  }

  function mapEntries() {
    return sharedIterator(this._itp, this._keys, this._values);
  }

  function setEntries() {
    return sharedIterator(this._itp, this._values, this._values);
  }

  function sharedIterator(itp, array, array2) {
    var p = [0], done = false;
    itp.push(p);
    return {
      [Symbol.iterator]: function () {
        return this;
      },
      next: function() {
        var v, k = p[0];
        if (!done && k < array.length) {
          v = array2 ? [array[k], array2[k]]: array[k];
          p[0]++;
        } else {
          done = true;
          itp.splice(itp.indexOf(p), 1);
        }
        return { done: done, value: v };
      }
    };
  }

  function sharedSize() {
    return this._values.length;
  }

  function sharedForEach(callback, context) {
    var it = this.entries();
    for (;;) {
      var r = it.next();
      if (r.done) break;
      callback.call(context, r.value[1], r.value[0], this);
    }
  }

})(PLATFORM.global);

} // endif (FEATURE_NO_ES2015)

if (typeof FEATURE_NO_ES2015 === 'undefined') {

const bind = Function.prototype.bind;

if (typeof PLATFORM.global.Reflect === 'undefined') {
  PLATFORM.global.Reflect = {};
}

if (typeof Reflect.defineProperty !== 'function') {
  Reflect.defineProperty = function(target, propertyKey, descriptor) {
    if (typeof target === 'object' ? target === null : typeof target !== 'function') {
      throw new TypeError('Reflect.defineProperty called on non-object');
    }
    try {
      Object.defineProperty(target, propertyKey, descriptor);
      return true;
    } catch (e) {
      return false;
    }
  };
}

if (typeof Reflect.construct !== 'function') {
  Reflect.construct = function(Target, args) {
    if (args) {
      switch (args.length){
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
    }

    var a = [null];
    a.push.apply(a, args);
    return new (bind.apply(Target, a));
  };
}

if (typeof Reflect.ownKeys !== 'function') {
  Reflect.ownKeys = function(o) { return (Object.getOwnPropertyNames(o).concat(Object.getOwnPropertySymbols(o))); }
}

} // endif FEATURE_NO_ES2015

if (typeof FEATURE_NO_ESNEXT === 'undefined') {

const emptyMetadata = Object.freeze({});
const metadataContainerKey = '__metadata__';

if (typeof Reflect.getOwnMetadata !== 'function') {
  Reflect.getOwnMetadata = function(metadataKey, target, targetKey) {
    if (target.hasOwnProperty(metadataContainerKey)) {
      return (target[metadataContainerKey][targetKey] || emptyMetadata)[metadataKey];
    }
  };
}

if (typeof Reflect.defineMetadata !== 'function') {
  Reflect.defineMetadata = function(metadataKey, metadataValue, target, targetKey) {
    let metadataContainer = target.hasOwnProperty(metadataContainerKey) ? target[metadataContainerKey] : (target[metadataContainerKey] = {});
    let targetContainer = metadataContainer[targetKey] || (metadataContainer[targetKey] = {});
    targetContainer[metadataKey] = metadataValue;
  };
}

if (typeof Reflect.metadata !== 'function') {
  Reflect.metadata = function(metadataKey, metadataValue) {
    return function(target, targetKey) {
      Reflect.defineMetadata(metadataKey, metadataValue, target, targetKey);
    };
  };
}

} // endif FEATURE_NO_ESNEXT
