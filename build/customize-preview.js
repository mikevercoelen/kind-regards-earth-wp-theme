/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/customize-preview.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/customize-preview.js":
/*!**********************************!*\
  !*** ./src/customize-preview.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* global _, jQuery, wp */
(function ($, api) {
  /**
   * Override the handler for clicking links in preview to allow history.pushState() to do its thing.
   *
   * @param {jQuery.Event} event Event.
   */
  api.Preview.prototype.handleLinkClick = function handleLinkClick(event) {
    var link = $(event.target);

    // No-op if the anchor is not a link.
    if (_.isUndefined(link.attr('href'))) {
      return;
    }

    var isInternalJumpLink = link.attr('href').substr(0, 1) === '#';

    // Allow internal jump links to behave normally without preventing default.
    if (isInternalJumpLink) {
      return;
    }

    // If the link is not previewable, prevent the browser from navigating to it.
    if (!api.isLinkPreviewable(link[0])) {
      wp.a11y.speak(api.settings.l10n.linkUnpreviewable);
      event.preventDefault();
    }
  };
})(jQuery, wp.customize);

/***/ })

/******/ });
//# sourceMappingURL=customize-preview.js.map