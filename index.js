(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["TR"] = factory();
	else
		root["TR"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/tabularrasa.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/data/array.js":
/*!***************************!*\
  !*** ./src/data/array.js ***!
  \***************************/
/*! exports provided: array_map */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "array_map", function() { return array_map; });
/* Tabular Rasa JS Data Array Functions
** Copyright (c) 2018-2020 Benjamin Benno Falkner
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

/** 
* @module tabularrasa/data/array
*/
function array_map(Fun, Arr) {
  var i,
      R = [];

  for (i = 0; i < Arr.length; i++) {
    R[i] = Fun(Arr[i], i);
  }

  return R;
}
;

/***/ }),

/***/ "./src/data/index.js":
/*!***************************!*\
  !*** ./src/data/index.js ***!
  \***************************/
/*! exports provided: table, array_map */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _table__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./table */ "./src/data/table.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "table", function() { return _table__WEBPACK_IMPORTED_MODULE_0__; });
/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./array */ "./src/data/array.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "array_map", function() { return _array__WEBPACK_IMPORTED_MODULE_1__["array_map"]; });

/* Tabular Rasa JS Data Functions
** Copyright (c) 2018-2020 Benjamin Benno Falkner
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

/** 
* @module tabularrasa/data
*/




/***/ }),

/***/ "./src/data/table.js":
/*!***************************!*\
  !*** ./src/data/table.js ***!
  \***************************/
/*! exports provided: cmp, Table */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cmp", function() { return cmp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Table", function() { return Table; });
/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./array.js */ "./src/data/array.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* Tabular Rasa JS Data Table
** Copyright (c) 2018-2020 Benjamin Benno Falkner
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

/** 
* @module tabularrasa/data/table
*/

var cmp = {
  number: function number(A, B) {
    return A - B;
  },
  string: function string(A, B) {
    return A.localeCompare(B);
  },
  any: function any(A, B) {
    return A.toString().localeCompare(B.toString());
  }
};
var Table = /*#__PURE__*/function () {
  function Table(Name, Header) {
    _classCallCheck(this, Table);

    this.name = Name;
    this.header = Header || [];
    this.data = [];
    this.sorted = -1; // sorted column
  }

  _createClass(Table, [{
    key: "clear",
    value: function clear() {
      this.data = [];
      this.sorted = -1;
    }
  }, {
    key: "length",
    value: function length() {
      return this.data.length;
    }
  }, {
    key: "add_colum",
    value: function add_colum(Name, Data) {
      this.header.push(Name);
      var Pos = this.header.length - 1;

      for (var i = 0; i < this.data.length; i++) {
        if (Data && Data[i]) {
          this.data[i][Pos] = Data[i];
        } else {
          this.data[i][Pos] = undefined;
        }
      }
    }
  }, {
    key: "get_colum",
    value: function get_colum(name) {
      var i,
          r = new Array(this.data.length),
          col = typeof name == "string" ? this.header.indexOf(name) : name;

      for (i = 0; i < this.data.length; i++) {
        r[i] = this.data[i][col];
      }

      return r;
    }
  }, {
    key: "map",
    value: function map(Fun, offset, length) {
      if (length == undefined || length > this.data.length || length < 0) length = this.data.length;
      if (offset == undefined) offset = 0;
      var Data = this.data,
          i;

      for (i = offset; i < length; i++) {
        Data[i] = Fun(Data[i], i);
      }
    }
  }, {
    key: "map2",
    value: function map2(Fun, Target, offset, length) {
      if (length == undefined || length > this.data.length) length = this.data.length;
      if (offset == undefined) offset = 0;
      var i,
          Data = this.data,
          col = typeof Target == "string" ? this.header.indexOf(Target) : Target;

      for (i = offset; i < length; i++) {
        Data[i][col] = Fun(Data[i], i);
      }
    }
  }, {
    key: "map3",
    value: function map3(Fun, Target, Inputs, offset, length) {
      if (length == undefined || length > this.data.length) length = this.data.length;
      if (offset == undefined) offset = 0;
      var Data = this.data,
          i,
          B,
          In = Object(_array_js__WEBPACK_IMPORTED_MODULE_0__["array_map"])(function (D) {
        return typeof D == "string" ? this.header.indexOf(D) : D;
      }, Inputs),
          col = typeof D == "string" ? this.header.indexOf(Target) : Target;

      for (i = offset; i < length; i++) {
        B = Object(_array_js__WEBPACK_IMPORTED_MODULE_0__["array_map"])(function (I) {
          return this[I];
        }.bind(Data[i]), In);
        Data[i][col] = Fun.apply(null, [Data[i]].concat(B));
      }
    }
  }, {
    key: "fold",
    value: function fold(Fun, Acc) {
      var Data = this.data,
          i;

      for (i = 0; i < Keys.length; i++) {
        Acc = Fun(Data[i], Acc);
      }

      return Acc;
    }
  }, {
    key: "fold3",
    value: function fold3(Fun, Acc, Inputs) {
      var Data = this.data,
          i,
          B,
          In = Object(_array_js__WEBPACK_IMPORTED_MODULE_0__["array_map"])(function (D) {
        return typeof D == "string" ? this.header.indexOf(D) : D;
      }, Inputs);

      for (i = 0; i < Data.length; i++) {
        B = Object(_array_js__WEBPACK_IMPORTED_MODULE_0__["array_map"])(function (I) {
          return this[I];
        }.bind(Data[i]), In);
        B.push(Acc);
        Acc = Fun.apply(null, B);
      }

      return Acc;
    }
  }, {
    key: "filter",
    value: function filter(Fun, Colum, Query) {
      var Cidx = typeof Colum === "string" ? this.header.indexOf(Colum) : Colum;
      var Out = new Table(this.name + " filter", this.header.slice(0));
      var Data = this.data,
          i;

      if (Colum) {
        for (i = 0; i < Data.length; i++) {
          if (0 == Fun(Data[i][Cidx], Query)) Out.data.push(Data[i]);
        }
      } else {
        for (i = 0; i < Data.length; i++) {
          if (0 == Fun(Data[i], Query)) Out.data.push(Data[i]);
        }
      }

      return Out;
    }
  }, {
    key: "select",
    value: function select(Fun, Select, Query) {
      var Data = this.data,
          i,
          B,
          R,
          In = Object(_array_js__WEBPACK_IMPORTED_MODULE_0__["array_map"])(function (D) {
        return typeof D == "string" ? header.indexOf(D) : D;
      }, Select);
      var Out = init(this.name + " filter", Object(_array_js__WEBPACK_IMPORTED_MODULE_0__["array_map"])(function (I) {
        return this.header[I];
      }, In));

      for (i = 0; i < Data.length; i++) {
        B = Object(_array_js__WEBPACK_IMPORTED_MODULE_0__["array_map"])(function (I) {
          return this[I];
        }.bind(Data[i]), In);
        B.push(Query);
        R = Fun.apply(null, B);
        if (R) Out.data.push(R);
      }

      return Out;
    }
  }, {
    key: "reduce",
    value: function reduce(Fun, Colum) {
      var Cidx = typeof Colum === "string" ? this.header.indexOf(Colum) : Colum;
      if (!this.sorted || this.sorted != Cidx) this.sort(Fun, Cidx);
      var Data = this.data,
          i;
      var Last = Data[0][Cidx],
          Out = new Table(this.name + " reduce " + Colum, this.header.slice(0));
      Out.data.push(Data[0]);

      for (i = 1; i < Data.length; i++) {
        if (0 != Fun(Data[i][Cidx], Last)) Out.data.push(Data[i]);
        Last = Data[i][Cidx];
      }

      return Out;
    }
  }, {
    key: "sort",
    value: function sort(Fun, Colum) {
      var Cidx = typeof Colum === "string" ? this.header.indexOf(Colum) : Colum;

      var Cmp = function Cmp(A, B) {
        return this.cmp(A[this.idx], B[this.idx]);
      };

      this.data = this.data.sort(Cmp.bind({
        idx: Cidx,
        cmp: Fun
      }));
      this.sorted = Cidx;
      return Cidx;
    }
  }, {
    key: "search_and_get",
    value: function search_and_get(Fun, Value, Colum, Key) {
      var Idx = this.search(Fun, Value, Colum);

      if (Idx >= 0) {
        var Cidx = typeof Key === "string" ? this.header.indexOf(Key) : Key;
        return this.data[Idx][Cidx];
      }
    }
  }, {
    key: "search",
    value: function search(Fun, Value, Colum) {
      var Cidx;
      if (typeof Colum === "string") Cidx = this.header.indexOf(Colum);else Cidx = Colum;

      if (this.sorted && this.sorted == Cidx) {
        //binary binsearch
        return this.binsearch(Fun, Value, Cidx);
      } else {
        var i,
            Data = this.data;

        for (i = 0; i < Data.length; i++) {
          if (0 == Fun(Data[i][Cidx], Value)) {
            return i;
          }
        }
      }

      return -1;
    }
  }, {
    key: "binary_search",
    value: function binary_search(Fun, Value, Colum) {
      var Cidx = typeof Colum === "string" ? this.header.indexOf(Colum) : Colum;
      if (!this.sorted || this.sorted != Cidx) sort(Fun, Cidx, this);
      return this.binsearch(Fun, Value, Cidx);
    }
  }, {
    key: "binsearch",
    value: function binsearch(Fun, Value, Cidx) {
      var Left = 0,
          Right = this.data.length - 1,
          Mid,
          R,
          Data = this.data;

      while (Left <= Right) {
        // Interval
        Mid = Left + (Right - Left) / 2; // half interval
        //console.log(Value,Data[Mid]);

        R = Fun(Value, Data[Mid][Cidx]);
        if (R == 0) // success
          return Mid;else if (R < 0) // lower interval
          Right = Mid - 1;else // higher interval
          Left = Mid + 1;
      }

      return -1;
    }
  }, {
    key: "get_row_obj",
    value: function get_row_obj(Row) {
      var Obj = {};

      for (var i = 0; i < this.header.length; i++) {
        Obj[this.header[i]] = this.data[Row][i];
      }

      return Obj;
    }
  }, {
    key: "add_row_obj",
    value: function add_row_obj(Obj) {
      var Idx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
      var Keys = Object.keys(Obj);

      if (Idx < 0) {
        Idx = this.data.length;
        this.data.push(new Array(this.header.length));
      }

      for (var i = 0; i < Keys.length; i++) {
        var Pos = this.header.indexOf(Keys[i]);

        if (Pos == -1) {
          console.log("TR_Table: Missing key: " + Keys[i]);
        } else {
          this.data[Idx][Pos] = Obj[Keys[i]];
        }
      }
    }
  }, {
    key: "add_obj_array",
    value: function add_obj_array(Obj) {
      var i, j, L, Keys, Idx;

      for (i = 0; i < Obj.length; i++) {
        L = new Array(this.header.length);
        Keys = Object.keys(Obj[i]);

        for (j = 0; j < Keys.length; j++) {
          Idx = this.header.indexOf(Keys[j]);

          if (Idx >= 0) {
            L[Idx] = Obj[i][Keys[j]];
          }
        }

        this.data.push(L);
      }
    }
  }, {
    key: "read_json",
    value: function read_json(text) {
      var l,
          i,
          j,
          json = JSON.parse(text);

      for (i = 0; i < json.length; i++) {
        l = new Array(this.header.length);

        for (j = 0; j < this.header.length; j++) {
          l[j] = json[i][this.header[j]];
        }

        this.data.push(l);
      }
    }
  }, {
    key: "read_csv",
    value: function read_csv(Text, FS, No_Header) {
      var Last_Char = "",
          Field = "",
          Obj = [""],
          Col = 0,
          Row = 0,
          No_Quote = !0,
          C,
          j,
          First_Row = No_Header ? 0 : !0;
      this.data = [];
      this.header = [];
      this.sorted = -1;
      this.data.push(Obj);

      for (j = 0; j < Text.length; j++) {
        C = Text[j]; //get current char

        if ("\"" === C) {
          // if quote
          if (No_Quote && C === Last_Char) Field += C; // if previous was a quote add quote to field string

          No_Quote = !No_Quote; // switch boolean
        } else if (FS === C && No_Quote) {
          // if not quoted FS
          if (First_Row) {
            this.header[Col++] = Field;
          } else {
            Obj[Col++] = Field;
          }

          C = Field = "";
        } else if ("\n" === C && No_Quote) {
          // if not quoted line end
          if ("\r" === Last_Char) Field = Field.slice(0, -1); //remove carriage return

          if (First_Row) {
            First_Row = !First_Row;
            this.header[Col] = Field;
            C = Field = "";
          } else {
            Obj[Col] = Field;
            this.data[++Row] = Obj = [];
          }

          C = Field = "";
          Col = 0;
        } else {
          Field += C;
        }

        Last_Char = C;
      }

      if (Col != 0) {
        Obj[Col] = Field;
      }

      if (Obj.length != this.header.length) this.data.pop();
    }
  }, {
    key: "write_csv",
    value: function write_csv(FS) {
      var text = "",
          row;

      if (this.header) {
        for (var i = 0; i < this.header.length; i++) {
          if (i > 0) text += FS;
          text += escape_csv(this.header[i], FS);
        }

        text += "\r\n";
      }

      for (var i = 0; i < this.data.length; i++) {
        row = this.data[i];

        for (var j = 0; j < row.length; j++) {
          if (j > 0) text += FS;
          text += escape_csv(str(row[j]), FS);
        }

        text += "\r\n";
      }

      return text;
    }
  }]);

  return Table;
}();
;

function escape_csv(Value, FS) {
  var R = "",
      C,
      Esc = false;
  if (!Value) return "";

  for (var j = 0; j < Value.length; j++) {
    C = Value[j];

    if (C == "\"") {
      R += C;
      R += C;
      Esc = true;
    } else if (C == "\n" || C == "\r" || C == FS) {
      R += C;
      Esc = true;
    } else {
      R += C;
    }
  }

  if (Esc) {
    return "\"" + R + "\"";
  } else {
    return R;
  }
}

function str(o) {
  switch (o) {
    case null:
      return "null";

    case undefined:
      return "undefined";

    default:
      return o.toString();
  }
}

/***/ }),

/***/ "./src/dox/file.js":
/*!*************************!*\
  !*** ./src/dox/file.js ***!
  \*************************/
/*! exports provided: read, save */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "read", function() { return read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "save", function() { return save; });
/* Tabular Rasa JS DOX File
** Copyright (c) 2018-2020 Benjamin Benno Falkner
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

/** 
* @module tabularrasa/dox/file
*/

/**
* read a file
* @param {Function} Fun Callback function (State,Data)
* @param {File} Filen a file object
* @param {String} Type optional datatype
*/
function read(Fun, Filen, Type) {
  var Reader = new FileReader();
  Reader.cb = Fun;

  Reader.onload = function (Event) {
    this.cb(200, Event.target.result);
  };

  Reader.onerror = function (Event) {
    this.cb(404, Event.target.error.code);
  };

  if (Type == "DataURL") Reader.readAsDataURL(Filen);else Reader.readAsText(Filen);
}
;
/**
* save file as download
* @param Filen Filename
* @param Mime  Mimetype
* @param Data  data string or blob
**/

function save(Filen, Mime, Data) {
  // Mime text/csv;charset=utf-8
  var FileLink = document.createElement('a');
  if (Mime.startsWith('text')) FileLink.setAttribute('href', 'data:' + Mime + ',' + encodeURIComponent(Data));else FileLink.setAttribute('href', 'data:' + Mime + ',' + btoa(Data));
  FileLink.setAttribute('download', Filen);

  if (document.createEvent) {
    var Event = document.createEvent('MouseEvents');
    Event.initEvent('click', true, true);
    FileLink.dispatchEvent(Event);
  } else {
    FileLink.click();
  }
}

/***/ }),

/***/ "./src/dox/index.js":
/*!**************************!*\
  !*** ./src/dox/index.js ***!
  \**************************/
/*! exports provided: Router, TagLoader, CodeView, CalcValues, url, file */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return Router; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TagLoader", function() { return TagLoader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CodeView", function() { return CodeView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CalcValues", function() { return CalcValues; });
/* harmony import */ var _url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./url */ "./src/dox/url.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "url", function() { return _url__WEBPACK_IMPORTED_MODULE_0__; });
/* harmony import */ var _file__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./file */ "./src/dox/file.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "file", function() { return _file__WEBPACK_IMPORTED_MODULE_1__; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* Tabular Rasa JS DOX
** Copyright (c) 2018-2020 Benjamin Benno Falkner
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

/** 
* @module tabularrasa/dox
*/

 // load html from url and insert to target

function load_inner_html(uri, target) {
  load_data(uri, function (e) {
    target.innerHTML = e;
    exec_js(target);
    cTagLoader.forEach(function (l) {
      return l.load(target);
    });
    cCodeView.forEach(function (l) {
      return l.update(target);
    });
    cCalcValues.forEach(function (l) {
      return l.update(target);
    });
    if (typeof MathJax != "undefined") MathJax.typeset();
  });
}

;

function exec_js(Elem) {
  var elem = Elem.querySelectorAll('SCRIPT');
  elem.forEach(function (e) {
    if (e.src != "") {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", e.src, false); // synchronous request

      xhr.send(null);
      e.innerText = xhr.responseText;
    }

    eval.call(window, e.innerText);
  });
} // load data from url and pass to callback


function load_data(uri, Cb) {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function (e) {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        Cb(xhr.responseText);
      } else {
        console.log("Error: (" + xhr.status + ")");
      }
    }
  };

  xhr.open('GET', uri, true);
  xhr.send();
}

;

var Router = /*#__PURE__*/function () {
  function Router() {
    var tag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "hash-router";

    _classCallCheck(this, Router);

    this.tag = tag;
    this.target = document.querySelector('[' + tag + ']');
    this.get_url();
    window.onhashchange = this.get_url.bind(this);
  }

  _createClass(Router, [{
    key: "get_url",
    value: function get_url() {
      var map = _url__WEBPACK_IMPORTED_MODULE_0__["hash_map"](window.location);
      var uri = map[this.tag] ? map[this.tag] : this.target.getAttribute(this.tag);
      console.log("URL:" + uri);
      load_inner_html(uri, this.target);
    }
  }]);

  return Router;
}();

var cTagLoader = [];

var TagLoader = /*#__PURE__*/function () {
  function TagLoader() {
    var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    var tag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "html-data";

    _classCallCheck(this, TagLoader);

    this.tag = tag;
    cTagLoader.push(this);
    this.load(target);
  }

  _createClass(TagLoader, [{
    key: "load",
    value: function load() {
      var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
      var i,
          elem,
          uri,
          elems = target.querySelectorAll('[' + this.tag + ']');

      for (i = 0; i < elems.length; i++) {
        elem = elems[i];
        uri = elem.getAttribute(this.tag);
        load_inner_html(uri, elem);
      }
    }
  }]);

  return TagLoader;
}();

var cCodeView = [];

var CodeView = /*#__PURE__*/function () {
  function CodeView() {
    var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    var tag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "script";

    _classCallCheck(this, CodeView);

    this.tag = tag;
    cCodeView.push(this);
    this.update(target);
  }

  _createClass(CodeView, [{
    key: "update",
    value: function update() {
      var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
      var i,
          elem,
          id,
          elems = target.querySelectorAll('code[' + this.tag + ']');

      for (i = 0; i < elems.length; i++) {
        elem = elems[i];
        id = elem.getAttribute(this.tag);
        elem.innerText = document.getElementById(id).innerText;
      }
    }
  }]);

  return CodeView;
}();

;
var cCalcValues = [];

var CalcValues = /*#__PURE__*/function () {
  function CalcValues() {
    var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    var tag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "calc";

    _classCallCheck(this, CalcValues);

    this.tag = tag;
    cCalcValues.push(this);
    this.update(target);
  }

  _createClass(CalcValues, [{
    key: "update",
    value: function update() {
      var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
      var i,
          elem,
          val,
          elems = target.querySelectorAll('code[' + this.tag + ']');

      for (i = 0; i < elems.length; i++) {
        elem = elems[i];
        val = elem.getAttribute(this.tag);
        elem.innerHTML = eval.call(window, val);
      }
    }
  }]);

  return CalcValues;
}();



/***/ }),

/***/ "./src/dox/url.js":
/*!************************!*\
  !*** ./src/dox/url.js ***!
  \************************/
/*! exports provided: header_map, hash_map, query_map */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "header_map", function() { return header_map; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hash_map", function() { return hash_map; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "query_map", function() { return query_map; });
/* Tabular Rasa JS DOX URL
** Copyright (c) 2018-2020 Benjamin Benno Falkner
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

/** 
* @module tabularrasa/dox/url
*/
// scan header
function header_map(Xhttp) {
  var i,
      Elem,
      Key,
      Value,
      R = {},
      HL = Xhttp.getAllResponseHeaders().trim().split(/[\r\n]+/);

  for (i = 0; i < HL.length; i++) {
    Elem = HL[i].split(': ');
    Key = Elem.shift();
    Value = Elem.join(': ');
    R[Key] = Value;
  }

  return R;
}
function hash_map(URL) {
  var i,
      R1,
      Res = {},
      Hash = URL.hash.substr(1).split("&");

  for (i = 0; i < Hash.length; i++) {
    R1 = Hash[i].split("=");
    Res[R1[0]] = decodeURIComponent(R1[1]) || R1[0];
  }

  return Res;
} // window.location

function query_map(URL) {
  var i,
      R1,
      Res = {},
      Query = URL.search.substr(1).split("&");

  for (i = 0; i < Query.length; i++) {
    R1 = Query[i].split("=");
    Res[R1[0]] = R1[1] || R1[0];
  }

  return Res;
}

/***/ }),

/***/ "./src/io/file.js":
/*!************************!*\
  !*** ./src/io/file.js ***!
  \************************/
/*! exports provided: read, save */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "read", function() { return read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "save", function() { return save; });
/* Tabular Rasa JS IO File
** Copyright (c) 2018-2020 Benjamin Benno Falkner
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

/** 
* @module tabularrasa/io/file
*/

/**
* read a file
* @param {Function} Fun Callback function (State,Data)
* @param {File} Filen a file object
* @param {String} Type optional datatype
*/
function read(Fun, Filen, Type) {
  var Reader = new FileReader();
  Reader.cb = Fun;

  Reader.onload = function (Event) {
    this.cb(200, Event.target.result);
  };

  Reader.onerror = function (Event) {
    this.cb(404, Event.target.error.code);
  };

  if (Type == "DataURL") Reader.readAsDataURL(Filen);else Reader.readAsText(Filen);
}
;
/**
* save file as download
* @param Filen Filename
* @param Mime  Mimetype
* @param Data  data string or blob
**/

function save(Filen, Mime, Data) {
  // Mime text/csv;charset=utf-8
  var FileLink = document.createElement('a');
  if (Mime.startsWith('text')) FileLink.setAttribute('href', 'data:' + Mime + ',' + encodeURIComponent(Data));else FileLink.setAttribute('href', 'data:' + Mime + ',' + btoa(Data));
  FileLink.setAttribute('download', Filen);

  if (document.createEvent) {
    var Event = document.createEvent('MouseEvents');
    Event.initEvent('click', true, true);
    FileLink.dispatchEvent(Event);
  } else {
    FileLink.click();
  }
}

/***/ }),

/***/ "./src/io/index.js":
/*!*************************!*\
  !*** ./src/io/index.js ***!
  \*************************/
/*! exports provided: file, loader, url */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _file__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./file */ "./src/io/file.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "file", function() { return _file__WEBPACK_IMPORTED_MODULE_0__; });
/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loader */ "./src/io/loader.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "loader", function() { return _loader__WEBPACK_IMPORTED_MODULE_1__; });
/* harmony import */ var _url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./url */ "./src/io/url.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "url", function() { return _url__WEBPACK_IMPORTED_MODULE_2__; });
/* Tabular Rasa JS IO Functions
** Copyright (c) 2018-2020 Benjamin Benno Falkner
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

/** 
* @module tabularrasa/io
*/





/***/ }),

/***/ "./src/io/loader.js":
/*!**************************!*\
  !*** ./src/io/loader.js ***!
  \**************************/
/*! exports provided: json, html, data, router, tag, clean_code */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "json", function() { return json; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "html", function() { return html; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "data", function() { return data; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "router", function() { return router; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tag", function() { return tag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clean_code", function() { return clean_code; });
/* harmony import */ var _url_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./url.js */ "./src/io/url.js");
/* Tabular Rasa JS IO Loader
** Copyright (c) 2018-2020 Benjamin Benno Falkner
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

/** 
* @module tabularrasa/io/loader
*/
 // load json from url and pass to callback

function json(Url, Cb) {
  data(Url, function (e) {
    Cb(JSON.parse(e));
  });
}
; // load html from url and insert to target

function html(Url, Target) {
  data(Url, function (e) {
    Target.innerHTML = e;
    clean_code(Target, 'clean-code');
    exec_js(Target);
    if (TagStore) tag(TagStore, Target);
  });
}
;

function exec_js(Elem) {
  var elem = Elem.querySelectorAll('SCRIPT');
  elem.forEach(function (e) {
    eval.call(window, e.innerText);
  });
} // load data from url and pass to callback


function data(Url, Cb) {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function (e) {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        Cb(xhr.responseText);
      } else {
        console.log("Error: (" + xhr.status + ")");
      }
    }
  };

  xhr.open('GET', Url, true);
  xhr.send();
}
;
function router(Tag) {
  // Tag: 'tr-router'
  var Elem = document.querySelector('[' + Tag + ']');
  var Map = Object(_url_js__WEBPACK_IMPORTED_MODULE_0__["hash_map"])(window.location);
  var Src = Map[Tag] ? Map[Tag] + ".html" : Elem.getAttribute(Tag); // load default

  html(Src, Elem); // listen for changes

  window.onhashchange = function () {
    var Map = Object(_url_js__WEBPACK_IMPORTED_MODULE_0__["hash_map"])(window.location);
    var Src = Map[Tag] ? Map[Tag] + ".html" : Elem.getAttribute(Tag);
    html(Src, Elem);
  };
}
; // load data once

var TagStore = null;
function tag(Tag) {
  var Root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  var i,
      Elem,
      Url,
      Elems = Root.querySelectorAll('[' + Tag + ']');
  TagStore = Tag;

  for (i = 0; i < Elems.length; i++) {
    Elem = Elems[i];
    Url = Elem.getAttribute(Tag);
    html(Url, Elem);
  }
}
; // Create clean code

var EntityMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': '&quot;',
  "'": '&#39;',
  "/": '&#x2F;'
};

function escape_html(string) {
  return String(string).replace(/[&<>"'\/]/g, function (s) {
    return EntityMap[s];
  });
}

;
function clean_code(Target) {
  var i,
      Elem,
      New,
      CodeElems = Target.querySelectorAll('[clean-code]');

  for (i = 0; i < CodeElems.length; i++) {
    Elem = CodeElems[i];
    New = escape_html(Elem.innerHTML);
    Elem.innerHTML = New;
  }
}
;

/***/ }),

/***/ "./src/io/url.js":
/*!***********************!*\
  !*** ./src/io/url.js ***!
  \***********************/
/*! exports provided: header_map, hash_map, query_map */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "header_map", function() { return header_map; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hash_map", function() { return hash_map; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "query_map", function() { return query_map; });
/* Tabular Rasa JS IO URL
** Copyright (c) 2018-2020 Benjamin Benno Falkner
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

/** 
* @module tabularrasa/io/url
*/
// scan header
function header_map(Xhttp) {
  var i,
      Elem,
      Key,
      Value,
      R = {},
      HL = Xhttp.getAllResponseHeaders().trim().split(/[\r\n]+/);

  for (i = 0; i < HL.length; i++) {
    Elem = HL[i].split(': ');
    Key = Elem.shift();
    Value = Elem.join(': ');
    R[Key] = Value;
  }

  return R;
}
function hash_map(URL) {
  var i,
      R1,
      Res = {},
      Hash = URL.hash.substr(1).split("&");

  for (i = 0; i < Hash.length; i++) {
    R1 = Hash[i].split("=");
    Res[R1[0]] = decodeURIComponent(R1[1]) || R1[0];
  }

  return Res;
} // window.location

function query_map(URL) {
  var i,
      R1,
      Res = {},
      Query = URL.search.substr(1).split("&");

  for (i = 0; i < Query.length; i++) {
    R1 = Query[i].split("=");
    Res[R1[0]] = R1[1] || R1[0];
  }

  return Res;
}

/***/ }),

/***/ "./src/math/filter/index.js":
/*!**********************************!*\
  !*** ./src/math/filter/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* Tabular Rasa JS Math Filter
** Copyright (c) 2018-2020 Benjamin Benno Falkner
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

/** 
* @module math/filter
*/
var RFFT = /*#__PURE__*/function () {
  function RFFT(size) {
    _classCallCheck(this, RFFT);

    this.size = size;

    if ((size & size - 1) == 0) {
      this.mode = 'Cooley-Tukey';
      this.p_radix2(size);
    } else {
      this.mode = 'Bluestein';
      this.p_bluestein(size);
    }
  }

  _createClass(RFFT, [{
    key: "fft",
    value: function fft() {}
  }, {
    key: "ifft",
    value: function ifft() {} //prepare radix-2

  }, {
    key: "p_radix2",
    value: function p_radix2(size) {
      // Trigonometric tables
      this.cosTable = new Array(size / 2);
      this.sinTable = new Array(size / 2);

      for (var i = 0; i < size / 2; i++) {
        this.cosTable[i] = Math.cos(2 * Math.PI * i / size);
        this.sinTable[i] = Math.sin(2 * Math.PI * i / size);
      }
    } //prepare bluestein

  }, {
    key: "p_bluestein",
    value: function p_bluestein(size) {
      this.cosTable = new Array(size);
      this.sinTable = new Array(size);

      for (var i = 0; i < size; i++) {
        var j = i * i % (size * 2);
        this.cosTable[i] = Math.cos(Math.PI * j / size);
        this.sinTable[i] = Math.sin(Math.PI * j / size);
      }
    } //perform radix 2 Cooley-Tukey DFT

  }, {
    key: "radix2",
    value: function radix2(data) {
      //radix 2
      for (var i = 0; i < this.size; i++) {
        var j = reverse_bits(i, levels);

        if (j > i) {
          var temp = real[i];
          real[i] = real[j];
          real[j] = temp;
          temp = imag[i];
          imag[i] = imag[j];
          imag[j] = temp;
        }
      } // Cooley-Tukey DFT


      for (var size = 2; size <= this.size; size *= 2) {
        var halfsize = size / 2;
        var tablestep = this.size / size;

        for (var i = 0; i < this.size; i += size) {
          for (var j = i, k = 0; j < i + halfsize; j++, k += tablestep) {
            var l = j + halfsize;
            var tpre = real[l] * this.cosTable[k] + imag[l] * this.sinTable[k];
            var tpim = -real[l] * this.sinTable[k] + imag[l] * this.cosTable[k];
            real[l] = real[j] - tpre;
            imag[l] = imag[j] - tpim;
            real[j] += tpre;
            imag[j] += tpim;
          }
        }
      }
    }
  }]);

  return RFFT;
}(); // Helper
// reverse helper


function reverse_bits(x, bits) {
  var y = 0;

  for (var i = 0; i < bits; i++) {
    y = y << 1 | x & 1, x >>>= 1;
  }

  return y;
} //Array of zeros


function new_array_0(n) {
  var r = new Array(n);

  for (var i = 0; i < n; i++) {
    r[i] = 0.0;
  }

  return r;
} //////////////////////////// END


function fft_radix2(real, imag) {
  // Length variables
  var n = real.length;
  if (n != imag.length) throw "Mismatched lengths";
  if (n == 1) // Trivial transform
    return;
  var levels = -1;

  for (var i = 0; i < 32; i++) {
    if (1 << i == n) levels = i; // Equal to log2(n)
  }

  if (levels == -1) throw "Length is not a power of 2"; // Trigonometric tables

  var cosTable = new Array(n / 2);
  var sinTable = new Array(n / 2);

  for (var i = 0; i < n / 2; i++) {
    cosTable[i] = Math.cos(2 * Math.PI * i / n);
    sinTable[i] = Math.sin(2 * Math.PI * i / n);
  } // Bit-reversed addressing permutation


  for (var i = 0; i < n; i++) {
    var j = reverseBits(i, levels);

    if (j > i) {
      var temp = real[i];
      real[i] = real[j];
      real[j] = temp;
      temp = imag[i];
      imag[i] = imag[j];
      imag[j] = temp;
    }
  } // Cooley-Tukey decimation-in-time radix-2 FFT


  for (var size = 2; size <= n; size *= 2) {
    var halfsize = size / 2;
    var tablestep = n / size;

    for (var i = 0; i < n; i += size) {
      for (var j = i, k = 0; j < i + halfsize; j++, k += tablestep) {
        var l = j + halfsize;
        var tpre = real[l] * cosTable[k] + imag[l] * sinTable[k];
        var tpim = -real[l] * sinTable[k] + imag[l] * cosTable[k];
        real[l] = real[j] - tpre;
        imag[l] = imag[j] - tpim;
        real[j] += tpre;
        imag[j] += tpim;
      }
    }
  }
}

function transformBluestein(real, imag) {
  // Find a power-of-2 convolution length m such that m >= n * 2 + 1
  var n = real.length;
  if (n != imag.length) throw "Mismatched lengths";
  var m = 1;

  while (m < n * 2 + 1) {
    m *= 2;
  } // Trignometric tables


  var cosTable = new Array(n);
  var sinTable = new Array(n);

  for (var i = 0; i < n; i++) {
    var j = i * i % (n * 2); // This is more accurate than j = i * i

    cosTable[i] = Math.cos(Math.PI * j / n);
    sinTable[i] = Math.sin(Math.PI * j / n);
  } // Temporary vectors and preprocessing


  var areal = newArrayOfZeros(m);
  var aimag = newArrayOfZeros(m);

  for (var i = 0; i < n; i++) {
    areal[i] = real[i] * cosTable[i] + imag[i] * sinTable[i];
    aimag[i] = -real[i] * sinTable[i] + imag[i] * cosTable[i];
  }

  var breal = newArrayOfZeros(m);
  var bimag = newArrayOfZeros(m);
  breal[0] = cosTable[0];
  bimag[0] = sinTable[0];

  for (var i = 1; i < n; i++) {
    breal[i] = breal[m - i] = cosTable[i];
    bimag[i] = bimag[m - i] = sinTable[i];
  } // Convolution


  var creal = new Array(m);
  var cimag = new Array(m);
  convolveComplex(areal, aimag, breal, bimag, creal, cimag); // Postprocessing

  for (var i = 0; i < n; i++) {
    real[i] = creal[i] * cosTable[i] + cimag[i] * sinTable[i];
    imag[i] = -creal[i] * sinTable[i] + cimag[i] * cosTable[i];
  }
}
/* 
 * Computes the circular convolution of the given real vectors. Each vector's length must be the same.
 */


function convolveReal(x, y, out) {
  var n = x.length;
  if (n != y.length || n != out.length) throw "Mismatched lengths";
  convolveComplex(x, newArrayOfZeros(n), y, newArrayOfZeros(n), out, newArrayOfZeros(n));
}
/* 
 * Computes the circular convolution of the given complex vectors. Each vector's length must be the same.
 */


function convolveComplex(xreal, ximag, yreal, yimag, outreal, outimag) {
  var n = xreal.length;
  if (n != ximag.length || n != yreal.length || n != yimag.length || n != outreal.length || n != outimag.length) throw "Mismatched lengths";
  xreal = xreal.slice();
  ximag = ximag.slice();
  yreal = yreal.slice();
  yimag = yimag.slice();
  transform(xreal, ximag);
  transform(yreal, yimag);

  for (var i = 0; i < n; i++) {
    var temp = xreal[i] * yreal[i] - ximag[i] * yimag[i];
    ximag[i] = ximag[i] * yreal[i] + xreal[i] * yimag[i];
    xreal[i] = temp;
  }

  inverseTransform(xreal, ximag);

  for (var i = 0; i < n; i++) {
    // Scaling (because this FFT implementation omits it)
    outreal[i] = xreal[i] / n;
    outimag[i] = ximag[i] / n;
  }
}

function newArrayOfZeros(n) {
  var result = [];

  for (var i = 0; i < n; i++) {
    result.push(0);
  }

  return result;
}

/***/ }),

/***/ "./src/math/index.js":
/*!***************************!*\
  !*** ./src/math/index.js ***!
  \***************************/
/*! exports provided: Func, seq, stat, filter, plot */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Func", function() { return Func; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "seq", function() { return seq; });
/* harmony import */ var _stat_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stat/index */ "./src/math/stat/index.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "stat", function() { return _stat_index__WEBPACK_IMPORTED_MODULE_0__; });
/* harmony import */ var _filter_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./filter/index */ "./src/math/filter/index.js");
/* harmony import */ var _filter_index__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_filter_index__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "filter", function() { return _filter_index__WEBPACK_IMPORTED_MODULE_1__; });
/* harmony import */ var _plot__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./plot */ "./src/math/plot.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "plot", function() { return _plot__WEBPACK_IMPORTED_MODULE_2__; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* Tabular Rasa JS Data Functions
** Copyright (c) 2018-2020 Benjamin Benno Falkner
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

/** 
* @module tabularrasa/math
*/

 //import * as func from "./func"



var Func = /*#__PURE__*/function () {
  function Func(Str, _Func) {
    _classCallCheck(this, Func);

    this.str = Str;
    this.func = _Func;
  }

  _createClass(Func, [{
    key: "toString",
    value: function toString() {
      return this.str;
    }
  }, {
    key: "calc",
    value: function calc(args) {
      this.func.apply(this, args);
    }
  }, {
    key: "seq",
    value: function seq(start, end) {
      var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var offset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      if (end == undefined) end = start, start = 0;
      var a = new Array(end - start + offset);

      for (var i = 0; i < offset; i++) {
        a[i] = undefined;
      }

      for (; i < end - start + offset; i++) {
        a[i] = this.func(start + i * step);
      }

      return a;
    }
  }]);

  return Func;
}();

;

function seq(start, end) {
  var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  if (end == undefined) end = start, start = 0;
  var a = new Array(end - start);

  for (var i = 0; i < end - start; i++) {
    a[i] = start + i * step;
  }

  return a;
}



/***/ }),

/***/ "./src/math/plot.js":
/*!**************************!*\
  !*** ./src/math/plot.js ***!
  \**************************/
/*! exports provided: Plot */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Plot", function() { return Plot; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* Tabular Rasa JS Math Statistics
** Copyright (c) 2018-2020 Benjamin Benno Falkner
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

/** 
* @module math/plot
*/
if (Chart) {
  var xMarkerPlugin = {
    get_x_pos: function get_x_pos(chart, idx) {
      var meta = chart.getDatasetMeta(0);
      var data = meta.data;
      return data[idx]._model.x;
    },
    draw_line: function draw_line(chart, marker) {
      var xoffset = this.get_x_pos(chart, marker.idx);
      var scale = chart.scales['y-axis-0'];
      var context = chart.chart.ctx; // render vertical line

      context.beginPath();
      context.strokeStyle = marker.color;
      context.lineWidth = 2.0;
      context.moveTo(xoffset, scale.top + 20);
      context.lineTo(xoffset, scale.bottom);
      context.stroke(); // write label

      context.fillStyle = marker.color;
      context.textAlign = 'center';
      context.fillText(marker.title, xoffset, scale.top + 10);
    },
    afterDatasetsDraw: function afterDatasetsDraw(chart, easing) {
      var _this = this;

      if (chart.config.xMarker) {
        chart.config.xMarker.forEach(function (marker) {
          return _this.draw_line(chart, marker);
        });
      }
    }
  };
  var yMarkerPlugin = {
    draw_line: function draw_line(chart, marker) {
      var xscale = chart.scales['x-axis-0'];
      var yscale = chart.scales["y-axis-0"];
      var context = chart.chart.ctx;
      var y_value = yscale.getPixelForValue(marker.value); // render vertical line

      context.beginPath();
      context.strokeStyle = marker.color;
      context.moveTo(xscale.left, y_value);
      context.lineTo(xscale.right, y_value);
      context.stroke(); // write label

      context.fillStyle = marker.color;
      context.textAlign = 'left';
      context.fillText(marker.title, xscale.left + 5, y_value + 10);
    },
    afterDatasetsDraw: function afterDatasetsDraw(chart, easing) {
      var _this2 = this;

      if (chart.config.yMarker) {
        chart.config.yMarker.forEach(function (marker) {
          return _this2.draw_line(chart, marker);
        });
      }
    }
  };
  Chart.plugins.register(xMarkerPlugin);
  Chart.plugins.register(yMarkerPlugin);
}

var Plot = /*#__PURE__*/function () {
  function Plot(name, args) {
    _classCallCheck(this, Plot);

    this.name = name;
    this.data = {
      labels: [],
      datasets: []
    };
    this.xmarker = [];
    this.ymarker = [];
  }

  _createClass(Plot, [{
    key: "x",
    value: function x(data) {
      this.data.labels = data;
    }
  }, {
    key: "fline",
    value: function fline(data, label) {
      var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "#af5431";
      var fcolor = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "#c45850";
      if (label == undefined) label = "Plot " + this.data.datasets.length;
      this.data.datasets.push({
        type: 'line',
        label: label,
        data: data,
        color: fcolor,
        borderColor: color,
        fill: true
      });
    }
  }, {
    key: "line",
    value: function line(data, label) {
      var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "#af5431";
      if (label == undefined) label = "Plot " + this.data.datasets.length;
      this.data.datasets.push({
        type: 'line',
        label: label,
        data: data,
        borderColor: color,
        fill: false
      });
    }
  }, {
    key: "draw",
    value: function draw(target) {
      var ctx = document.getElementById(target);
      return new Chart(ctx, {
        type: 'line',
        data: this.data,
        options: {
          responsive: false
        },
        xMarker: this.xmarker,
        yMarker: this.ymarker
      });
    }
  }, {
    key: "x_marker",
    value: function x_marker(idx, title) {
      var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "#c45850";
      this.xmarker.push({
        idx: idx,
        title: title,
        color: color
      });
    }
  }, {
    key: "y_marker",
    value: function y_marker(value, title) {
      var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "#c45850";
      this.ymarker.push({
        value: value,
        title: title,
        color: color
      });
    }
  }]);

  return Plot;
}();



/***/ }),

/***/ "./src/math/stat/index.js":
/*!********************************!*\
  !*** ./src/math/stat/index.js ***!
  \********************************/
/*! exports provided: erf, cnorm, norm, boxmullerrand, dnorm, pnorm, rnorm, floating_mean, linear_regression, exponential_regression */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "erf", function() { return erf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cnorm", function() { return cnorm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "norm", function() { return norm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "boxmullerrand", function() { return boxmullerrand; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dnorm", function() { return dnorm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pnorm", function() { return pnorm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rnorm", function() { return rnorm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "floating_mean", function() { return floating_mean; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "linear_regression", function() { return linear_regression; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exponential_regression", function() { return exponential_regression; });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ "./src/math/index.js");
/* Tabular Rasa JS Math Statistics
** Copyright (c) 2018-2020 Benjamin Benno Falkner
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

/** 
* @module math/stat
*/

var tau = 2.0 * Math.PI;
var sqrt2 = Math.sqrt(2.0);
var s2pi = Math.sqrt(tau);
var is2pi = 1.0 / s2pi;
function erf(x) {
  if (x > 0) return 1 - 1 / (1 + 0.278393 * x + 0.230389 * x ^ 2 + 0.000972 * x ^ 3 + 0.078108 * x ^ 4) ^ 4;else if (x < 0) return -1 + 1 / (1 - 0.278393 * x + 0.230389 * x ^ 2 - 0.000972 * x ^ 3 + 0.078108 * x ^ 4) ^ 4;else return 0.0;
}
;
function cnorm(x) {
  var mu = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.0;
  var sig = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1.0;
  return 0.5 * (1 + erf((x - mu) / sig / sqrt2));
}
function norm(x) {
  var mu = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.0;
  var sig = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1.0;
  return is2pi / sig * Math.exp(-0.5 * ((x - mu) / sig) ^ 2);
}
function boxmullerrand() {
  var u = 0,
      v = 0;

  while (u === 0) {
    u = Math.random();
  }

  while (v === 0) {
    v = Math.random();
  }

  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(tau * v);
}
var dnorm = norm;
var pnorm = cnorm;
function rnorm() {
  var mu = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.0;
  var sig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1.0;
  return mu + sig * boxmullerrand();
} //export qnorm() = //quartile function

function floating_mean(Data, n) {
  var r = new Array(Data.length);
  var t = Math.floor((n - 1) / 2);

  for (var i = 0; i < t; i++) {
    r[i] = undefined;
  }

  for (; i < Data.length - t; i++) {
    //calc mean
    var m = 0;

    for (var j = i - t; j < i + n - t; j++) {
      m += Data[j];
    }

    r[i] = m / n;
  }

  return r;
}
function linear_regression(X, Y) {
  var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var length = arguments.length > 3 ? arguments[3] : undefined;
  var xm = 0,
      ym = 0,
      sx = 0,
      sx2,
      sy = 0,
      sxy = 0,
      h,
      g,
      n = 0;
  if (!length) length = X.length;

  for (var i = offset; i < length; i++) {
    if (X[i] && Y[i]) {
      g = X[i];
      xm += g;
      sx += g * g;
      h = Y[i];
      ym += h;
      sy += h * h;
      sxy += h * g;
      n++;
    }
  }

  xm /= n;
  ym /= n;
  sx2 = sx;
  sx = sx / n - xm * xm;
  sy = sy / n - ym * ym;
  sxy = sxy / n - xm * ym;
  var a = sxy / sx,
      b = ym - sxy / sx * xm;
  var err = 0.0,
      hh;

  for (var i = offset; i < length; i++) {
    if (X[i] && Y[i]) {
      g = X[i];
      h = Y[i];
      hh = b + g * a;
      h = h - hh;
      err += h * h;
    }
  }

  err = Math.sqrt(err / (n - 2));
  var f = new _index__WEBPACK_IMPORTED_MODULE_0__["Func"]("f(x)=" + a.toFixed(2) + "*x+" + b.toFixed(2), function (x) {
    return a * x + b;
  });
  f.a = a;
  f.b = b;
  f.err = err;
  f.err_a = err * err / sx * n;
  f.err_b = err * err * sx2 / (n * n * sx);
  return f;
}
function exponential_regression(X, Y) {
  var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var length = arguments.length > 3 ? arguments[3] : undefined;
  var xm = 0,
      ym = 0,
      sx = 0,
      sx2,
      sy = 0,
      sxy = 0,
      h,
      g,
      n = 0;
  if (!length) length = X.length;

  for (var i = offset; i < length; i++) {
    if (typeof X[i] == "number" && Y[i]) {
      g = X[i];
      xm += g;
      sx += g * g;
      h = Y[i];
      h = 0.0 == h ? 0.0 : Math.log(h);
      ym += h;
      sy += h * h;
      sxy += h * g;
      n++;
    }
  }

  xm /= n;
  ym /= n;
  sx2 = sx;
  sx = sx / n - xm * xm;
  sy = sy / n - ym * ym;
  sxy = sxy / n - xm * ym;
  var a = sxy / sx,
      b = ym - sxy / sx * xm;
  var err = 0.0,
      hh;

  for (var i = offset; i < length; i++) {
    if (X[i] && Y[i]) {
      g = X[i];
      h = Y[i];
      h = 0.0 == h ? 0.0 : Math.log(h);
      hh = b + g * a;
      h = h - hh;
      err += h * h;
    }
  }

  err = Math.sqrt(err / (n - 2));
  a = Math.exp(a), b = Math.exp(b);
  var f = new _index__WEBPACK_IMPORTED_MODULE_0__["Func"]("f(x)=(" + b.toFixed(2) + ")*(" + a.toFixed(2) + ")^x", function (x) {
    return b * Math.pow(a, x);
  });
  f.a = a;
  f.b = b;
  f.err = err;
  f.err_a = f.a * (err * err / sx * n);
  f.err_b = f.b * (err * err * sx2 / (n * n * sx));
  return f;
}

/***/ }),

/***/ "./src/scss/simple.scss":
/*!******************************!*\
  !*** ./src/scss/simple.scss ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/tabularrasa.js":
/*!****************************!*\
  !*** ./src/tabularrasa.js ***!
  \****************************/
/*! exports provided: dox, data, io, math */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_simple_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss/simple.scss */ "./src/scss/simple.scss");
/* harmony import */ var _scss_simple_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_simple_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _dox_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dox/index */ "./src/dox/index.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "dox", function() { return _dox_index__WEBPACK_IMPORTED_MODULE_1__; });
/* harmony import */ var _data_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data/index */ "./src/data/index.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "data", function() { return _data_index__WEBPACK_IMPORTED_MODULE_2__; });
/* harmony import */ var _io_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./io/index */ "./src/io/index.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "io", function() { return _io_index__WEBPACK_IMPORTED_MODULE_3__; });
/* harmony import */ var _math_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./math/index */ "./src/math/index.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "math", function() { return _math_index__WEBPACK_IMPORTED_MODULE_4__; });
/* Tabular Rasa JS
** Copyright (c) 2018-2020 Benjamin Benno Falkner
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

/** 
* @module tabularrasa
*/







/***/ })

/******/ });
});
//# sourceMappingURL=index.js.map