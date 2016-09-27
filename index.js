(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("ActionBuffer", [], factory);
	else if(typeof exports === 'object')
		exports["ActionBuffer"] = factory();
	else
		root["ActionBuffer"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * ActionBuffer accumulate objects and by the time it reaches it's full copacity or enrich it's timeout a function is being applied on the accumulated object
	 * @param {function}    action      - action to apply on the buffered elements
	 * @param {number}      maxElements - maximum elements to buffer
	 * @param {number}      timeout     - maximum time to accumulate
	 */
	var ActionBuffer = function () {
	    function ActionBuffer(action, maxElements, timeout) {
	        var _this = this;

	        _classCallCheck(this, ActionBuffer);

	        Object.assign(this, {
	            action: action,
	            maxElements: maxElements,
	            timeout: timeout,
	            accumulating: true,
	            buffered: [],
	            listeners: {
	                fulfill: [],
	                error: []
	            }
	        });
	        setTimeout(function () {
	            if (_this.accumulating) {
	                _this.accumulating = false;
	                _this.act();
	            }
	        }, timeout);
	    }

	    _createClass(ActionBuffer, [{
	        key: "act",
	        value: function act() {
	            var _this2 = this;

	            Promise.resolve(this.action(this.buffered)).then(function (res) {
	                var _iteratorNormalCompletion = true;
	                var _didIteratorError = false;
	                var _iteratorError = undefined;

	                try {
	                    for (var _iterator = _this2.listeners.fulfill[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                        var callback = _step.value;

	                        callback(res);
	                    }
	                } catch (err) {
	                    _didIteratorError = true;
	                    _iteratorError = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion && _iterator.return) {
	                            _iterator.return();
	                        }
	                    } finally {
	                        if (_didIteratorError) {
	                            throw _iteratorError;
	                        }
	                    }
	                }
	            }).catch(function (err) {
	                var _iteratorNormalCompletion2 = true;
	                var _didIteratorError2 = false;
	                var _iteratorError2 = undefined;

	                try {
	                    for (var _iterator2 = _this2.listeners.error[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                        var callback = _step2.value;

	                        callback(err);
	                    }
	                } catch (err) {
	                    _didIteratorError2 = true;
	                    _iteratorError2 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                            _iterator2.return();
	                        }
	                    } finally {
	                        if (_didIteratorError2) {
	                            throw _iteratorError2;
	                        }
	                    }
	                }
	            });
	        }
	        /**
	         * Append element to buffer
	         * @param {object} element - element to buffer
	         */

	    }, {
	        key: "append",
	        value: function append(element) {
	            this.buffered.push(element);
	            if (this.accumulating) {
	                this.accumulating = this.buffered.length < this.maxElements;
	            }
	            if (!this.accumulating) {
	                this.act();
	            }
	        }
	        /**
	         * Add event listener
	         * @param {string}   eventName  - Event to listen to
	         * @param {function} callback   - Callback to apply on the event
	         */

	    }, {
	        key: "on",
	        value: function on(event_name, callback) {
	            this.listeners[event_name].push(callback);
	        }
	    }]);

	    return ActionBuffer;
	}();

	exports.default = ActionBuffer;
	module.exports = exports["default"];

/***/ }
/******/ ])
});
;