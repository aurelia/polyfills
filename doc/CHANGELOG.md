<a name="1.3.3"></a>
## [1.3.3](https://github.com/aurelia/polyfills/compare/1.3.1...1.3.3) (2019-02-04)


### Bug Fixes

* **all:** change es2015 back to native-modules ([2a9d9e3](https://github.com/aurelia/polyfills/commit/2a9d9e3))



<a name="1.3.2"></a>
## [1.3.2](https://github.com/aurelia/polyfills/compare/1.3.1...1.3.2) (2019-02-03)


### Bug Fixes

* **all:** change es2015 back to native-modules ([2a9d9e3](https://github.com/aurelia/polyfills/commit/2a9d9e3))



<a name="1.3.0"></a>
# [1.3.0](https://github.com/aurelia/polyfills/compare/1.2.2...v1.3.0) (2018-01-25)


### Features

* **Object:** add Object.is() ([#58](https://github.com/aurelia/polyfills/issues/58)) ([3cf3410](https://github.com/aurelia/polyfills/commit/3cf3410))



<a name="1.2.2"></a>
## [1.2.2](https://github.com/aurelia/polyfills/compare/1.2.1...v1.2.2) (2017-06-30)


### Bug Fixes

* **symbols:** propertyIsEnumerable null reference ([b7c59e5](https://github.com/aurelia/polyfills/commit/b7c59e5))
* IE 11 access denied fix



<a name="1.2.1"></a>
## [1.2.1](https://github.com/aurelia/polyfills/compare/1.2.0...v1.2.1) (2017-03-23)


### Bug Fixes

* **symbols:** check that descriptors is an object ([e181ff7](https://github.com/aurelia/polyfills/commit/e181ff7))



<a name="1.2.0"></a>
# [1.2.0](https://github.com/aurelia/polyfills/compare/1.1.1...v1.2.0) (2017-02-21)

### Features

* opt-out for polyfills

<a name="1.1.1"></a>
## [1.1.1](https://github.com/aurelia/polyfills/compare/1.1.0...v1.1.1) (2016-09-13)


### Bug Fixes

* **array:** make Array.from work with mapping functions ([c425a49](https://github.com/aurelia/polyfills/commit/c425a49))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/aurelia/polyfills/compare/1.0.0-rc.1.0.0...v1.0.0) (2016-07-27)



<a name="1.0.0-rc.1.0.0"></a>
# [1.0.0-rc.1.0.0](https://github.com/aurelia/polyfills/compare/1.0.0-beta.2.0.1...v1.0.0-rc.1.0.0) (2016-06-22)



### 1.0.0-beta.1.1.6 (2016-05-24)


#### Bug Fixes

* **console:** remove in order to move to pal ([80f0c7b5](http://github.com/aurelia/polyfills/commit/80f0c7b5c2e3c1abf290b1ed42fb84f1c340d31d))


### 1.0.0-beta.1.1.5 (2016-05-24)


#### Features

* **console:** moved console fix from logging-console to polyfills ([6db2334a](http://github.com/aurelia/polyfills/commit/6db2334a31e5d36f30e2dbda47bfaa2162f279bf))


### 1.0.0-beta.1.1.4 (2016-05-10)


### 1.0.0-beta.1.1.3 (2016-05-03)


#### Bug Fixes

* **reflect:** fix target-is-object check ([841a64b5](http://github.com/aurelia/polyfills/commit/841a64b597d320425773b393dfe4366ca0fc22bb))


#### Features

* **reflect:** add polyfill for defineProperty ([c6fbc900](http://github.com/aurelia/polyfills/commit/c6fbc900e8e62bbf6dd3730e3557de12e10d4f4b))


### 1.0.0-beta.1.1.2 (2016-04-13)

* fix: Object.getOwnPropertyNames: argument is not an Object error in symbol.js


### 1.0.0-beta.1.1.1 (2016-03-29)


#### Bug Fixes

* **symbol:** fix Object.defineProperties ([f548033d](http://github.com/aurelia/polyfills/commit/f548033d486a26770195daf95a94e905510106f1))


### 1.0.0-beta.1.1.0 (2016-03-22)


#### Features

* **all:** add iterator support to Array.from ([5f237887](http://github.com/aurelia/polyfills/commit/5f237887f5f750c365ba71c292f3427ae5301a8b))


### 1.0.0-beta.1.0.6 (2016-03-09)


#### Bug Fixes

* **symbol:** treat `null` value the same as `undefined` ([4b705bb1](http://github.com/aurelia/polyfills/commit/4b705bb1c4886e197d0e8dfcc291fb3308238372), closes [#13](http://github.com/aurelia/polyfills/issues/13))


### 1.0.0-beta.1.0.5 (2016-03-08)


#### Bug Fixes

* **array:** make proto methods non enumerable ([6ed412fd](http://github.com/aurelia/polyfills/commit/6ed412fd206c2b987658e205470c496630a0dd6f), closes [#12](http://github.com/aurelia/polyfills/issues/12))
* **symbol:** remove window global ([14916c10](http://github.com/aurelia/polyfills/commit/14916c10efa17a6f2a109beb4979fbe038879649))


### 1.0.0-beta.1.0.4 (2016-03-08)


#### Bug Fixes

* **object:** assign ignores null or undefined ([941a892f](http://github.com/aurelia/polyfills/commit/941a892f8a63bce8dea3566c97e911ee31622359))


### 1.0.0-beta.1.0.3 (2016-03-07)


#### Bug Fixes

* **object:** correct es6 Object.keys behavior for primitives ([11852935](http://github.com/aurelia/polyfills/commit/11852935d02a451f2ea13c48dd0dd6877d890c8e))


### 1.0.0-beta.1.0.2 (2016-03-06)


#### Features

* **all:** add symbols ([f11b8f42](http://github.com/aurelia/polyfills/commit/f11b8f422cb512c3e4aba377278ab0a33375a96d))


### 1.0.0-beta.1.0.1 (2016-03-02)


#### Features

* **collections:** add weak map and set ([59d58dc6](http://github.com/aurelia/polyfills/commit/59d58dc6a571718a3b70329d6c54d3a5c00a063b))


### 1.0.0-beta.1.0.0 (2016-03-01)


#### Bug Fixes

* **reflect:**
  * incorrect arg casing ([52f06db5](http://github.com/aurelia/polyfills/commit/52f06db5682042ee1b3c4601a4133b10e446e7b4))
  * missing bind reference ([89964a16](http://github.com/aurelia/polyfills/commit/89964a1602ad216ef1db0f04823f62dd04a67dca))


### 0.1.2 (2016-02-17)


#### Bug Fixes

* **reflect:** missed constants for implementation internals ([36e7a3e6](http://github.com/aurelia/polyfills/commit/36e7a3e6b8f7327af65e01fc98e04352998b0abc))


### 0.1.1 (2016-02-17)


#### Features

* **all:**
  * fix dependencies and build ([913b2d74](http://github.com/aurelia/polyfills/commit/913b2d746f317102904346af30051140a9e50bf2))
  * add remaining known polyfills ([c0391592](http://github.com/aurelia/polyfills/commit/c03915926a3c531ce67d0156d16729def2482b14))
  * add object.assign and collection polyfills ([2ff683d6](http://github.com/aurelia/polyfills/commit/2ff683d6fdd6a36857d30a14f2b80c5e57815a54))
