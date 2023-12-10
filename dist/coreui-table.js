(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.CoreUI = global.CoreUI || {}, global.CoreUI.table = factory());
}(this, (function () { 'use strict';

function _AsyncGenerator(e) {
  var r, t;
  function resume(r, t) {
    try {
      var n = e[r](t),
        o = n.value,
        u = o instanceof _OverloadYield;
      Promise.resolve(u ? o.v : o).then(function (t) {
        if (u) {
          var i = "return" === r ? "return" : "next";
          if (!o.k || t.done) return resume(i, t);
          t = e[i](t).value;
        }
        settle(n.done ? "return" : "normal", t);
      }, function (e) {
        resume("throw", e);
      });
    } catch (e) {
      settle("throw", e);
    }
  }
  function settle(e, n) {
    switch (e) {
      case "return":
        r.resolve({
          value: n,
          done: !0
        });
        break;
      case "throw":
        r.reject(n);
        break;
      default:
        r.resolve({
          value: n,
          done: !1
        });
    }
    (r = r.next) ? resume(r.key, r.arg) : t = null;
  }
  this._invoke = function (e, n) {
    return new Promise(function (o, u) {
      var i = {
        key: e,
        arg: n,
        resolve: o,
        reject: u,
        next: null
      };
      t ? t = t.next = i : (r = t = i, resume(e, n));
    });
  }, "function" != typeof e.return && (this.return = void 0);
}
_AsyncGenerator.prototype["function" == typeof Symbol && Symbol.asyncIterator || "@@asyncIterator"] = function () {
  return this;
}, _AsyncGenerator.prototype.next = function (e) {
  return this._invoke("next", e);
}, _AsyncGenerator.prototype.throw = function (e) {
  return this._invoke("throw", e);
}, _AsyncGenerator.prototype.return = function (e) {
  return this._invoke("return", e);
};
function _OverloadYield(t, e) {
  this.v = t, this.k = e;
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

(function (f) {
  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (typeof define === "function" && define.amd) {
    define([], f);
  } else {
    var g;
    if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }
    g.ejs = f();
  }
})(function () {
  return function () {
    function r(e, n, t) {
      function o(i, f) {
        if (!n[i]) {
          if (!e[i]) {
            var c = "function" == typeof require && require;
            if (!f && c) return c(i, !0);
            if (u) return u(i, !0);
            var a = new Error("Cannot find module '" + i + "'");
            throw a.code = "MODULE_NOT_FOUND", a;
          }
          var p = n[i] = {
            exports: {}
          };
          e[i][0].call(p.exports, function (r) {
            var n = e[i][1][r];
            return o(n || r);
          }, p, p.exports, r, e, n, t);
        }
        return n[i].exports;
      }
      for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
      return o;
    }
    return r;
  }()({
    1: [function (require, module, exports) {
      "use strict";

      var fs = require("fs");
      var path = require("path");
      var utils = require("./utils");
      var scopeOptionWarned = false;
      var _VERSION_STRING = require("../package.json").version;
      var _DEFAULT_OPEN_DELIMITER = "<";
      var _DEFAULT_CLOSE_DELIMITER = ">";
      var _DEFAULT_DELIMITER = "%";
      var _DEFAULT_LOCALS_NAME = "locals";
      var _NAME = "ejs";
      var _REGEX_STRING = "(<%%|%%>|<%=|<%-|<%_|<%#|<%|%>|-%>|_%>)";
      var _OPTS_PASSABLE_WITH_DATA = ["delimiter", "scope", "context", "debug", "compileDebug", "client", "_with", "rmWhitespace", "strict", "filename", "async"];
      var _OPTS_PASSABLE_WITH_DATA_EXPRESS = _OPTS_PASSABLE_WITH_DATA.concat("cache");
      var _BOM = /^\uFEFF/;
      var _JS_IDENTIFIER = /^[a-zA-Z_$][0-9a-zA-Z_$]*$/;
      exports.cache = utils.cache;
      exports.fileLoader = fs.readFileSync;
      exports.localsName = _DEFAULT_LOCALS_NAME;
      exports.promiseImpl = new Function("return this;")().Promise;
      exports.resolveInclude = function (name, filename, isDir) {
        var dirname = path.dirname;
        var extname = path.extname;
        var resolve = path.resolve;
        var includePath = resolve(isDir ? filename : dirname(filename), name);
        var ext = extname(name);
        if (!ext) {
          includePath += ".ejs";
        }
        return includePath;
      };
      function resolvePaths(name, paths) {
        var filePath;
        if (paths.some(function (v) {
          filePath = exports.resolveInclude(name, v, true);
          return fs.existsSync(filePath);
        })) {
          return filePath;
        }
      }
      function getIncludePath(path, options) {
        var includePath;
        var filePath;
        var views = options.views;
        var match = /^[A-Za-z]+:\\|^\//.exec(path);
        if (match && match.length) {
          path = path.replace(/^\/*/, "");
          if (Array.isArray(options.root)) {
            includePath = resolvePaths(path, options.root);
          } else {
            includePath = exports.resolveInclude(path, options.root || "/", true);
          }
        } else {
          if (options.filename) {
            filePath = exports.resolveInclude(path, options.filename);
            if (fs.existsSync(filePath)) {
              includePath = filePath;
            }
          }
          if (!includePath && Array.isArray(views)) {
            includePath = resolvePaths(path, views);
          }
          if (!includePath && typeof options.includer !== "function") {
            throw new Error('Could not find the include file "' + options.escapeFunction(path) + '"');
          }
        }
        return includePath;
      }
      function handleCache(options, template) {
        var func;
        var filename = options.filename;
        var hasTemplate = arguments.length > 1;
        if (options.cache) {
          if (!filename) {
            throw new Error("cache option requires a filename");
          }
          func = exports.cache.get(filename);
          if (func) {
            return func;
          }
          if (!hasTemplate) {
            template = fileLoader(filename).toString().replace(_BOM, "");
          }
        } else if (!hasTemplate) {
          if (!filename) {
            throw new Error("Internal EJS error: no file name or template " + "provided");
          }
          template = fileLoader(filename).toString().replace(_BOM, "");
        }
        func = exports.compile(template, options);
        if (options.cache) {
          exports.cache.set(filename, func);
        }
        return func;
      }
      function tryHandleCache(options, data, cb) {
        var result;
        if (!cb) {
          if (typeof exports.promiseImpl == "function") {
            return new exports.promiseImpl(function (resolve, reject) {
              try {
                result = handleCache(options)(data);
                resolve(result);
              } catch (err) {
                reject(err);
              }
            });
          } else {
            throw new Error("Please provide a callback function");
          }
        } else {
          try {
            result = handleCache(options)(data);
          } catch (err) {
            return cb(err);
          }
          cb(null, result);
        }
      }
      function fileLoader(filePath) {
        return exports.fileLoader(filePath);
      }
      function includeFile(path, options) {
        var opts = utils.shallowCopy(utils.createNullProtoObjWherePossible(), options);
        opts.filename = getIncludePath(path, opts);
        if (typeof options.includer === "function") {
          var includerResult = options.includer(path, opts.filename);
          if (includerResult) {
            if (includerResult.filename) {
              opts.filename = includerResult.filename;
            }
            if (includerResult.template) {
              return handleCache(opts, includerResult.template);
            }
          }
        }
        return handleCache(opts);
      }
      function rethrow(err, str, flnm, lineno, esc) {
        var lines = str.split("\n");
        var start = Math.max(lineno - 3, 0);
        var end = Math.min(lines.length, lineno + 3);
        var filename = esc(flnm);
        var context = lines.slice(start, end).map(function (line, i) {
          var curr = i + start + 1;
          return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
        }).join("\n");
        err.path = filename;
        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
        throw err;
      }
      function stripSemi(str) {
        return str.replace(/;(\s*$)/, "$1");
      }
      exports.compile = function compile(template, opts) {
        var templ;
        if (opts && opts.scope) {
          if (!scopeOptionWarned) {
            console.warn("`scope` option is deprecated and will be removed in EJS 3");
            scopeOptionWarned = true;
          }
          if (!opts.context) {
            opts.context = opts.scope;
          }
          delete opts.scope;
        }
        templ = new Template(template, opts);
        return templ.compile();
      };
      exports.render = function (template, d, o) {
        var data = d || utils.createNullProtoObjWherePossible();
        var opts = o || utils.createNullProtoObjWherePossible();
        if (arguments.length == 2) {
          utils.shallowCopyFromList(opts, data, _OPTS_PASSABLE_WITH_DATA);
        }
        return handleCache(opts, template)(data);
      };
      exports.renderFile = function () {
        var args = Array.prototype.slice.call(arguments);
        var filename = args.shift();
        var cb;
        var opts = {
          filename: filename
        };
        var data;
        var viewOpts;
        if (typeof arguments[arguments.length - 1] == "function") {
          cb = args.pop();
        }
        if (args.length) {
          data = args.shift();
          if (args.length) {
            utils.shallowCopy(opts, args.pop());
          } else {
            if (data.settings) {
              if (data.settings.views) {
                opts.views = data.settings.views;
              }
              if (data.settings["view cache"]) {
                opts.cache = true;
              }
              viewOpts = data.settings["view options"];
              if (viewOpts) {
                utils.shallowCopy(opts, viewOpts);
              }
            }
            utils.shallowCopyFromList(opts, data, _OPTS_PASSABLE_WITH_DATA_EXPRESS);
          }
          opts.filename = filename;
        } else {
          data = utils.createNullProtoObjWherePossible();
        }
        return tryHandleCache(opts, data, cb);
      };
      exports.Template = Template;
      exports.clearCache = function () {
        exports.cache.reset();
      };
      function Template(text, opts) {
        opts = opts || utils.createNullProtoObjWherePossible();
        var options = utils.createNullProtoObjWherePossible();
        this.templateText = text;
        this.mode = null;
        this.truncate = false;
        this.currentLine = 1;
        this.source = "";
        options.client = opts.client || false;
        options.escapeFunction = opts.escape || opts.escapeFunction || utils.escapeXML;
        options.compileDebug = opts.compileDebug !== false;
        options.debug = !!opts.debug;
        options.filename = opts.filename;
        options.openDelimiter = opts.openDelimiter || exports.openDelimiter || _DEFAULT_OPEN_DELIMITER;
        options.closeDelimiter = opts.closeDelimiter || exports.closeDelimiter || _DEFAULT_CLOSE_DELIMITER;
        options.delimiter = opts.delimiter || exports.delimiter || _DEFAULT_DELIMITER;
        options.strict = opts.strict || false;
        options.context = opts.context;
        options.cache = opts.cache || false;
        options.rmWhitespace = opts.rmWhitespace;
        options.root = opts.root;
        options.includer = opts.includer;
        options.outputFunctionName = opts.outputFunctionName;
        options.localsName = opts.localsName || exports.localsName || _DEFAULT_LOCALS_NAME;
        options.views = opts.views;
        options.async = opts.async;
        options.destructuredLocals = opts.destructuredLocals;
        options.legacyInclude = typeof opts.legacyInclude != "undefined" ? !!opts.legacyInclude : true;
        if (options.strict) {
          options._with = false;
        } else {
          options._with = typeof opts._with != "undefined" ? opts._with : true;
        }
        this.opts = options;
        this.regex = this.createRegex();
      }
      Template.modes = {
        EVAL: "eval",
        ESCAPED: "escaped",
        RAW: "raw",
        COMMENT: "comment",
        LITERAL: "literal"
      };
      Template.prototype = {
        createRegex: function () {
          var str = _REGEX_STRING;
          var delim = utils.escapeRegExpChars(this.opts.delimiter);
          var open = utils.escapeRegExpChars(this.opts.openDelimiter);
          var close = utils.escapeRegExpChars(this.opts.closeDelimiter);
          str = str.replace(/%/g, delim).replace(/</g, open).replace(/>/g, close);
          return new RegExp(str);
        },
        compile: function () {
          var src;
          var fn;
          var opts = this.opts;
          var prepended = "";
          var appended = "";
          var escapeFn = opts.escapeFunction;
          var ctor;
          var sanitizedFilename = opts.filename ? JSON.stringify(opts.filename) : "undefined";
          if (!this.source) {
            this.generateSource();
            prepended += '  var __output = "";\n' + "  function __append(s) { if (s !== undefined && s !== null) __output += s }\n";
            if (opts.outputFunctionName) {
              if (!_JS_IDENTIFIER.test(opts.outputFunctionName)) {
                throw new Error("outputFunctionName is not a valid JS identifier.");
              }
              prepended += "  var " + opts.outputFunctionName + " = __append;" + "\n";
            }
            if (opts.localsName && !_JS_IDENTIFIER.test(opts.localsName)) {
              throw new Error("localsName is not a valid JS identifier.");
            }
            if (opts.destructuredLocals && opts.destructuredLocals.length) {
              var destructuring = "  var __locals = (" + opts.localsName + " || {}),\n";
              for (var i = 0; i < opts.destructuredLocals.length; i++) {
                var name = opts.destructuredLocals[i];
                if (!_JS_IDENTIFIER.test(name)) {
                  throw new Error("destructuredLocals[" + i + "] is not a valid JS identifier.");
                }
                if (i > 0) {
                  destructuring += ",\n  ";
                }
                destructuring += name + " = __locals." + name;
              }
              prepended += destructuring + ";\n";
            }
            if (opts._with !== false) {
              prepended += "  with (" + opts.localsName + " || {}) {" + "\n";
              appended += "  }" + "\n";
            }
            appended += "  return __output;" + "\n";
            this.source = prepended + this.source + appended;
          }
          if (opts.compileDebug) {
            src = "var __line = 1" + "\n" + "  , __lines = " + JSON.stringify(this.templateText) + "\n" + "  , __filename = " + sanitizedFilename + ";" + "\n" + "try {" + "\n" + this.source + "} catch (e) {" + "\n" + "  rethrow(e, __lines, __filename, __line, escapeFn);" + "\n" + "}" + "\n";
          } else {
            src = this.source;
          }
          if (opts.client) {
            src = "escapeFn = escapeFn || " + escapeFn.toString() + ";" + "\n" + src;
            if (opts.compileDebug) {
              src = "rethrow = rethrow || " + rethrow.toString() + ";" + "\n" + src;
            }
          }
          if (opts.strict) {
            src = '"use strict";\n' + src;
          }
          if (opts.debug) {
            console.log(src);
          }
          if (opts.compileDebug && opts.filename) {
            src = src + "\n" + "//# sourceURL=" + sanitizedFilename + "\n";
          }
          try {
            if (opts.async) {
              try {
                ctor = new Function("return (async function(){}).constructor;")();
              } catch (e) {
                if (e instanceof SyntaxError) {
                  throw new Error("This environment does not support async/await");
                } else {
                  throw e;
                }
              }
            } else {
              ctor = Function;
            }
            fn = new ctor(opts.localsName + ", escapeFn, include, rethrow", src);
          } catch (e) {
            if (e instanceof SyntaxError) {
              if (opts.filename) {
                e.message += " in " + opts.filename;
              }
              e.message += " while compiling ejs\n\n";
              e.message += "If the above error is not helpful, you may want to try EJS-Lint:\n";
              e.message += "https://github.com/RyanZim/EJS-Lint";
              if (!opts.async) {
                e.message += "\n";
                e.message += "Or, if you meant to create an async function, pass `async: true` as an option.";
              }
            }
            throw e;
          }
          var returnedFn = opts.client ? fn : function anonymous(data) {
            var include = function (path, includeData) {
              var d = utils.shallowCopy(utils.createNullProtoObjWherePossible(), data);
              if (includeData) {
                d = utils.shallowCopy(d, includeData);
              }
              return includeFile(path, opts)(d);
            };
            return fn.apply(opts.context, [data || utils.createNullProtoObjWherePossible(), escapeFn, include, rethrow]);
          };
          if (opts.filename && typeof Object.defineProperty === "function") {
            var filename = opts.filename;
            var basename = path.basename(filename, path.extname(filename));
            try {
              Object.defineProperty(returnedFn, "name", {
                value: basename,
                writable: false,
                enumerable: false,
                configurable: true
              });
            } catch (e) {}
          }
          return returnedFn;
        },
        generateSource: function () {
          var opts = this.opts;
          if (opts.rmWhitespace) {
            this.templateText = this.templateText.replace(/[\r\n]+/g, "\n").replace(/^\s+|\s+$/gm, "");
          }
          this.templateText = this.templateText.replace(/[ \t]*<%_/gm, "<%_").replace(/_%>[ \t]*/gm, "_%>");
          var self = this;
          var matches = this.parseTemplateText();
          var d = this.opts.delimiter;
          var o = this.opts.openDelimiter;
          var c = this.opts.closeDelimiter;
          if (matches && matches.length) {
            matches.forEach(function (line, index) {
              var closing;
              if (line.indexOf(o + d) === 0 && line.indexOf(o + d + d) !== 0) {
                closing = matches[index + 2];
                if (!(closing == d + c || closing == "-" + d + c || closing == "_" + d + c)) {
                  throw new Error('Could not find matching close tag for "' + line + '".');
                }
              }
              self.scanLine(line);
            });
          }
        },
        parseTemplateText: function () {
          var str = this.templateText;
          var pat = this.regex;
          var result = pat.exec(str);
          var arr = [];
          var firstPos;
          while (result) {
            firstPos = result.index;
            if (firstPos !== 0) {
              arr.push(str.substring(0, firstPos));
              str = str.slice(firstPos);
            }
            arr.push(result[0]);
            str = str.slice(result[0].length);
            result = pat.exec(str);
          }
          if (str) {
            arr.push(str);
          }
          return arr;
        },
        _addOutput: function (line) {
          if (this.truncate) {
            line = line.replace(/^(?:\r\n|\r|\n)/, "");
            this.truncate = false;
          }
          if (!line) {
            return line;
          }
          line = line.replace(/\\/g, "\\\\");
          line = line.replace(/\n/g, "\\n");
          line = line.replace(/\r/g, "\\r");
          line = line.replace(/"/g, '\\"');
          this.source += '    ; __append("' + line + '")' + "\n";
        },
        scanLine: function (line) {
          var self = this;
          var d = this.opts.delimiter;
          var o = this.opts.openDelimiter;
          var c = this.opts.closeDelimiter;
          var newLineCount = 0;
          newLineCount = line.split("\n").length - 1;
          switch (line) {
            case o + d:
            case o + d + "_":
              this.mode = Template.modes.EVAL;
              break;
            case o + d + "=":
              this.mode = Template.modes.ESCAPED;
              break;
            case o + d + "-":
              this.mode = Template.modes.RAW;
              break;
            case o + d + "#":
              this.mode = Template.modes.COMMENT;
              break;
            case o + d + d:
              this.mode = Template.modes.LITERAL;
              this.source += '    ; __append("' + line.replace(o + d + d, o + d) + '")' + "\n";
              break;
            case d + d + c:
              this.mode = Template.modes.LITERAL;
              this.source += '    ; __append("' + line.replace(d + d + c, d + c) + '")' + "\n";
              break;
            case d + c:
            case "-" + d + c:
            case "_" + d + c:
              if (this.mode == Template.modes.LITERAL) {
                this._addOutput(line);
              }
              this.mode = null;
              this.truncate = line.indexOf("-") === 0 || line.indexOf("_") === 0;
              break;
            default:
              if (this.mode) {
                switch (this.mode) {
                  case Template.modes.EVAL:
                  case Template.modes.ESCAPED:
                  case Template.modes.RAW:
                    if (line.lastIndexOf("//") > line.lastIndexOf("\n")) {
                      line += "\n";
                    }
                }
                switch (this.mode) {
                  case Template.modes.EVAL:
                    this.source += "    ; " + line + "\n";
                    break;
                  case Template.modes.ESCAPED:
                    this.source += "    ; __append(escapeFn(" + stripSemi(line) + "))" + "\n";
                    break;
                  case Template.modes.RAW:
                    this.source += "    ; __append(" + stripSemi(line) + ")" + "\n";
                    break;
                  case Template.modes.COMMENT:
                    break;
                  case Template.modes.LITERAL:
                    this._addOutput(line);
                    break;
                }
              } else {
                this._addOutput(line);
              }
          }
          if (self.opts.compileDebug && newLineCount) {
            this.currentLine += newLineCount;
            this.source += "    ; __line = " + this.currentLine + "\n";
          }
        }
      };
      exports.escapeXML = utils.escapeXML;
      exports.__express = exports.renderFile;
      exports.VERSION = _VERSION_STRING;
      exports.name = _NAME;
      if (typeof window != "undefined") {
        window.ejs = exports;
      }
    }, {
      "../package.json": 6,
      "./utils": 2,
      fs: 3,
      path: 4
    }],
    2: [function (require, module, exports) {
      "use strict";

      var regExpChars = /[|\\{}()[\]^$+*?.]/g;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var hasOwn = function (obj, key) {
        return hasOwnProperty.apply(obj, [key]);
      };
      exports.escapeRegExpChars = function (string) {
        if (!string) {
          return "";
        }
        return String(string).replace(regExpChars, "\\$&");
      };
      var _ENCODE_HTML_RULES = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&#34;",
        "'": "&#39;"
      };
      var _MATCH_HTML = /[&<>'"]/g;
      function encode_char(c) {
        return _ENCODE_HTML_RULES[c] || c;
      }
      var escapeFuncStr = "var _ENCODE_HTML_RULES = {\n" + '      "&": "&amp;"\n' + '    , "<": "&lt;"\n' + '    , ">": "&gt;"\n' + '    , \'"\': "&#34;"\n' + '    , "\'": "&#39;"\n' + "    }\n" + "  , _MATCH_HTML = /[&<>'\"]/g;\n" + "function encode_char(c) {\n" + "  return _ENCODE_HTML_RULES[c] || c;\n" + "};\n";
      exports.escapeXML = function (markup) {
        return markup == undefined ? "" : String(markup).replace(_MATCH_HTML, encode_char);
      };
      function escapeXMLToString() {
        return Function.prototype.toString.call(this) + ";\n" + escapeFuncStr;
      }
      try {
        if (typeof Object.defineProperty === "function") {
          Object.defineProperty(exports.escapeXML, "toString", {
            value: escapeXMLToString
          });
        } else {
          exports.escapeXML.toString = escapeXMLToString;
        }
      } catch (err) {
        console.warn("Unable to set escapeXML.toString (is the Function prototype frozen?)");
      }
      exports.shallowCopy = function (to, from) {
        from = from || {};
        if (to !== null && to !== undefined) {
          for (var p in from) {
            if (!hasOwn(from, p)) {
              continue;
            }
            if (p === "__proto__" || p === "constructor") {
              continue;
            }
            to[p] = from[p];
          }
        }
        return to;
      };
      exports.shallowCopyFromList = function (to, from, list) {
        list = list || [];
        from = from || {};
        if (to !== null && to !== undefined) {
          for (var i = 0; i < list.length; i++) {
            var p = list[i];
            if (typeof from[p] != "undefined") {
              if (!hasOwn(from, p)) {
                continue;
              }
              if (p === "__proto__" || p === "constructor") {
                continue;
              }
              to[p] = from[p];
            }
          }
        }
        return to;
      };
      exports.cache = {
        _data: {},
        set: function (key, val) {
          this._data[key] = val;
        },
        get: function (key) {
          return this._data[key];
        },
        remove: function (key) {
          delete this._data[key];
        },
        reset: function () {
          this._data = {};
        }
      };
      exports.hyphenToCamel = function (str) {
        return str.replace(/-[a-z]/g, function (match) {
          return match[1].toUpperCase();
        });
      };
      exports.createNullProtoObjWherePossible = function () {
        if (typeof Object.create == "function") {
          return function () {
            return Object.create(null);
          };
        }
        if (!({
          __proto__: null
        } instanceof Object)) {
          return function () {
            return {
              __proto__: null
            };
          };
        }
        return function () {
          return {};
        };
      }();
    }, {}],
    3: [function (require, module, exports) {}, {}],
    4: [function (require, module, exports) {
      (function (process) {
        function normalizeArray(parts, allowAboveRoot) {
          var up = 0;
          for (var i = parts.length - 1; i >= 0; i--) {
            var last = parts[i];
            if (last === ".") {
              parts.splice(i, 1);
            } else if (last === "..") {
              parts.splice(i, 1);
              up++;
            } else if (up) {
              parts.splice(i, 1);
              up--;
            }
          }
          if (allowAboveRoot) {
            for (; up--; up) {
              parts.unshift("..");
            }
          }
          return parts;
        }
        exports.resolve = function () {
          var resolvedPath = "",
            resolvedAbsolute = false;
          for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
            var path = i >= 0 ? arguments[i] : process.cwd();
            if (typeof path !== "string") {
              throw new TypeError("Arguments to path.resolve must be strings");
            } else if (!path) {
              continue;
            }
            resolvedPath = path + "/" + resolvedPath;
            resolvedAbsolute = path.charAt(0) === "/";
          }
          resolvedPath = normalizeArray(filter(resolvedPath.split("/"), function (p) {
            return !!p;
          }), !resolvedAbsolute).join("/");
          return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
        };
        exports.normalize = function (path) {
          var isAbsolute = exports.isAbsolute(path),
            trailingSlash = substr(path, -1) === "/";
          path = normalizeArray(filter(path.split("/"), function (p) {
            return !!p;
          }), !isAbsolute).join("/");
          if (!path && !isAbsolute) {
            path = ".";
          }
          if (path && trailingSlash) {
            path += "/";
          }
          return (isAbsolute ? "/" : "") + path;
        };
        exports.isAbsolute = function (path) {
          return path.charAt(0) === "/";
        };
        exports.join = function () {
          var paths = Array.prototype.slice.call(arguments, 0);
          return exports.normalize(filter(paths, function (p, index) {
            if (typeof p !== "string") {
              throw new TypeError("Arguments to path.join must be strings");
            }
            return p;
          }).join("/"));
        };
        exports.relative = function (from, to) {
          from = exports.resolve(from).substr(1);
          to = exports.resolve(to).substr(1);
          function trim(arr) {
            var start = 0;
            for (; start < arr.length; start++) {
              if (arr[start] !== "") break;
            }
            var end = arr.length - 1;
            for (; end >= 0; end--) {
              if (arr[end] !== "") break;
            }
            if (start > end) return [];
            return arr.slice(start, end - start + 1);
          }
          var fromParts = trim(from.split("/"));
          var toParts = trim(to.split("/"));
          var length = Math.min(fromParts.length, toParts.length);
          var samePartsLength = length;
          for (var i = 0; i < length; i++) {
            if (fromParts[i] !== toParts[i]) {
              samePartsLength = i;
              break;
            }
          }
          var outputParts = [];
          for (var i = samePartsLength; i < fromParts.length; i++) {
            outputParts.push("..");
          }
          outputParts = outputParts.concat(toParts.slice(samePartsLength));
          return outputParts.join("/");
        };
        exports.sep = "/";
        exports.delimiter = ":";
        exports.dirname = function (path) {
          if (typeof path !== "string") path = path + "";
          if (path.length === 0) return ".";
          var code = path.charCodeAt(0);
          var hasRoot = code === 47;
          var end = -1;
          var matchedSlash = true;
          for (var i = path.length - 1; i >= 1; --i) {
            code = path.charCodeAt(i);
            if (code === 47) {
              if (!matchedSlash) {
                end = i;
                break;
              }
            } else {
              matchedSlash = false;
            }
          }
          if (end === -1) return hasRoot ? "/" : ".";
          if (hasRoot && end === 1) {
            return "/";
          }
          return path.slice(0, end);
        };
        function basename(path) {
          if (typeof path !== "string") path = path + "";
          var start = 0;
          var end = -1;
          var matchedSlash = true;
          var i;
          for (i = path.length - 1; i >= 0; --i) {
            if (path.charCodeAt(i) === 47) {
              if (!matchedSlash) {
                start = i + 1;
                break;
              }
            } else if (end === -1) {
              matchedSlash = false;
              end = i + 1;
            }
          }
          if (end === -1) return "";
          return path.slice(start, end);
        }
        exports.basename = function (path, ext) {
          var f = basename(path);
          if (ext && f.substr(-1 * ext.length) === ext) {
            f = f.substr(0, f.length - ext.length);
          }
          return f;
        };
        exports.extname = function (path) {
          if (typeof path !== "string") path = path + "";
          var startDot = -1;
          var startPart = 0;
          var end = -1;
          var matchedSlash = true;
          var preDotState = 0;
          for (var i = path.length - 1; i >= 0; --i) {
            var code = path.charCodeAt(i);
            if (code === 47) {
              if (!matchedSlash) {
                startPart = i + 1;
                break;
              }
              continue;
            }
            if (end === -1) {
              matchedSlash = false;
              end = i + 1;
            }
            if (code === 46) {
              if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
            } else if (startDot !== -1) {
              preDotState = -1;
            }
          }
          if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
            return "";
          }
          return path.slice(startDot, end);
        };
        function filter(xs, f) {
          if (xs.filter) return xs.filter(f);
          var res = [];
          for (var i = 0; i < xs.length; i++) {
            if (f(xs[i], i, xs)) res.push(xs[i]);
          }
          return res;
        }
        var substr = "ab".substr(-1) === "b" ? function (str, start, len) {
          return str.substr(start, len);
        } : function (str, start, len) {
          if (start < 0) start = str.length + start;
          return str.substr(start, len);
        };
      }).call(this, require("_process"));
    }, {
      _process: 5
    }],
    5: [function (require, module, exports) {
      var process = module.exports = {};
      var cachedSetTimeout;
      var cachedClearTimeout;
      function defaultSetTimout() {
        throw new Error("setTimeout has not been defined");
      }
      function defaultClearTimeout() {
        throw new Error("clearTimeout has not been defined");
      }
      (function () {
        try {
          if (typeof setTimeout === "function") {
            cachedSetTimeout = setTimeout;
          } else {
            cachedSetTimeout = defaultSetTimout;
          }
        } catch (e) {
          cachedSetTimeout = defaultSetTimout;
        }
        try {
          if (typeof clearTimeout === "function") {
            cachedClearTimeout = clearTimeout;
          } else {
            cachedClearTimeout = defaultClearTimeout;
          }
        } catch (e) {
          cachedClearTimeout = defaultClearTimeout;
        }
      })();
      function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
          return setTimeout(fun, 0);
        }
        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
          cachedSetTimeout = setTimeout;
          return setTimeout(fun, 0);
        }
        try {
          return cachedSetTimeout(fun, 0);
        } catch (e) {
          try {
            return cachedSetTimeout.call(null, fun, 0);
          } catch (e) {
            return cachedSetTimeout.call(this, fun, 0);
          }
        }
      }
      function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
          return clearTimeout(marker);
        }
        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
          cachedClearTimeout = clearTimeout;
          return clearTimeout(marker);
        }
        try {
          return cachedClearTimeout(marker);
        } catch (e) {
          try {
            return cachedClearTimeout.call(null, marker);
          } catch (e) {
            return cachedClearTimeout.call(this, marker);
          }
        }
      }
      var queue = [];
      var draining = false;
      var currentQueue;
      var queueIndex = -1;
      function cleanUpNextTick() {
        if (!draining || !currentQueue) {
          return;
        }
        draining = false;
        if (currentQueue.length) {
          queue = currentQueue.concat(queue);
        } else {
          queueIndex = -1;
        }
        if (queue.length) {
          drainQueue();
        }
      }
      function drainQueue() {
        if (draining) {
          return;
        }
        var timeout = runTimeout(cleanUpNextTick);
        draining = true;
        var len = queue.length;
        while (len) {
          currentQueue = queue;
          queue = [];
          while (++queueIndex < len) {
            if (currentQueue) {
              currentQueue[queueIndex].run();
            }
          }
          queueIndex = -1;
          len = queue.length;
        }
        currentQueue = null;
        draining = false;
        runClearTimeout(timeout);
      }
      process.nextTick = function (fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
          }
        }
        queue.push(new Item(fun, args));
        if (queue.length === 1 && !draining) {
          runTimeout(drainQueue);
        }
      };
      function Item(fun, array) {
        this.fun = fun;
        this.array = array;
      }
      Item.prototype.run = function () {
        this.fun.apply(null, this.array);
      };
      process.title = "browser";
      process.browser = true;
      process.env = {};
      process.argv = [];
      process.version = "";
      process.versions = {};
      function noop() {}
      process.on = noop;
      process.addListener = noop;
      process.once = noop;
      process.off = noop;
      process.removeListener = noop;
      process.removeAllListeners = noop;
      process.emit = noop;
      process.prependListener = noop;
      process.prependOnceListener = noop;
      process.listeners = function (name) {
        return [];
      };
      process.binding = function (name) {
        throw new Error("process.binding is not supported");
      };
      process.cwd = function () {
        return "/";
      };
      process.chdir = function (dir) {
        throw new Error("process.chdir is not supported");
      };
      process.umask = function () {
        return 0;
      };
    }, {}],
    6: [function (require, module, exports) {
      module.exports = {
        name: "ejs",
        description: "Embedded JavaScript templates",
        keywords: ["template", "engine", "ejs"],
        version: "3.1.8",
        author: "Matthew Eernisse <mde@fleegix.org> (http://fleegix.org)",
        license: "Apache-2.0",
        bin: {
          ejs: "./bin/cli.js"
        },
        main: "./lib/ejs.js",
        jsdelivr: "ejs.min.js",
        unpkg: "ejs.min.js",
        repository: {
          type: "git",
          url: "git://github.com/mde/ejs.git"
        },
        bugs: "https://github.com/mde/ejs/issues",
        homepage: "https://github.com/mde/ejs",
        dependencies: {
          jake: "^10.8.5"
        },
        devDependencies: {
          browserify: "^16.5.1",
          eslint: "^6.8.0",
          "git-directory-deploy": "^1.5.1",
          jsdoc: "^4.0.2",
          "lru-cache": "^4.0.1",
          mocha: "^10.2.0",
          "uglify-js": "^3.3.16"
        },
        engines: {
          node: ">=0.10.0"
        },
        scripts: {
          test: "mocha -u tdd"
        }
      };
    }, {}]
  }, {}, [1])(1);
});

var coreuiTableUtils = {
  /**
   * Объединение атрибутов
   * @param attr1
   * @param attr2
   * @returns {object}
   */
  mergeAttr: function mergeAttr(attr1, attr2) {
    var mergeAttr = Object.assign({}, attr1);
    if (_typeof(attr2) === 'object') {
      $.each(attr2, function (name, value) {
        if (mergeAttr.hasOwnProperty(name)) {
          if (name === 'class') {
            mergeAttr[name] += ' ' + value;
          } else if (name === 'style') {
            mergeAttr[name] += ';' + value;
          } else {
            mergeAttr[name] = value;
          }
        } else {
          mergeAttr[name] = value;
        }
      });
    }
    return mergeAttr;
  },
  /**
   * Проверка на число
   * @param num
   * @returns {boolean}
   * @private
   */
  isNumeric: function isNumeric(num) {
    return (typeof num === 'number' || typeof num === "string" && num.trim() !== '') && !isNaN(num);
  },
  /**
   * @returns {string}
   * @private
   */
  hashCode: function hashCode() {
    return this.crc32((new Date().getTime() + Math.random()).toString()).toString(16);
  },
  /**
   * @param str
   * @returns {number}
   * @private
   */
  crc32: function crc32(str) {
    for (var a, o = [], c = 0; c < 256; c++) {
      a = c;
      for (var f = 0; f < 8; f++) {
        a = 1 & a ? 3988292384 ^ a >>> 1 : a >>> 1;
      }
      o[c] = a;
    }
    for (var n = -1, t = 0; t < str.length; t++) {
      n = n >>> 8 ^ o[255 & (n ^ str.charCodeAt(t))];
    }
    return (-1 ^ n) >>> 0;
  }
};

var tpl = Object.create(null);
tpl['table-columns-footer.html'] = '<tr class="bg-white"> <% $.each(columns, function(key, column) { %> <td<%- column.attr%>><%- column.label %></td> <% }); %> </tr>';
tpl['table-columns.html'] = '<tr class="fw-medium bg-white"> <% $.each(columns, function(key, column) { %> <td<%- column.attr%>><%- column.label %></td> <% }); %> </tr>';
tpl['table-loader.html'] = '<div class="coreui-table-lock position-absolute w-100 top-0 bottom-0"> <div class="coreui-table-block bg-secondary-subtle position-absolute opacity-50 w-100 top-0 bottom-0"></div> <div class="coreui-table-message position-relative d-flex align-content-center justify-content-start gap-2 mt-3 py-1 px-2 m-auto border border-secondary-subtle rounded-3 bg-body-secondary"> <div class="spinner-border text-secondary align-self-center"></div> <span class="lh-lg"><%= lang.loading %></span> </div> </div>';
tpl['table-pages.html'] = '<tr class="bg-white"> <td colspan="<%= columnsCount %>"> <div class="d-flex justify-content-between"> <% if (table.show.pagesJump) { %> <div class="coreui-table__page_go_container float-start"> <div class="input-group"> <input type="number" class="form-control form-control-sm" min="1"> <button class="coreui-table__page_go btn btn-sm btn-outline-secondary border-secondary-subtle" type="button"> <i class="bi bi-chevron-compact-right"></i> </button> </div> </div> <% } %> <% if (table.show.pages) { %> <div class="coreui-table__pages_container text-center"> <button type="button" class="btn btn-sm btn-outline-secondary coreui-table__page_prev"<% if ( ! prevPage) { %> disabled<% } %>> <i class="bi bi-chevron-compact-left"></i> </button> <small> <span class="coreui-table__page_current"><%= currentPage %></span> <%= lang.of %> <span class="coreui-table__pages_total"><%= pagesTotal %></span> </small> <button type="button" class="btn btn-sm btn-outline-secondary coreui-table__page_next"<% if ( ! nextPage) { %> disabled<% } %>> <i class="bi bi-chevron-compact-right"></i> </button> </div> <% } %> <% if (table.show.prePageList) { %> <div class="coreui-table__pages_list_container float-end"> <select class="form-select form-select-sm"> <% $.each(recordsPerPageList, function(key, count) { %> <option value="<%= count %>"<% if (recordsPerPage == count) { %>selected<% } %>> <% if (count == \'0\') { %><%= lang.all %><% } else { %><%= count %><% } %> </option> <% }); %> </select> </div> <% } %> </div> </td> </tr>';
tpl['table-records-empty.html'] = '<tr> <td class="text-center" colspan="<%= columnsCount %>"><%= lang.emptyRecords %></td> </tr>';
tpl['table-records.html'] = '<% $.each(records, function(key, record) { %> <tr<%- record.attr %> data-record-key="<%= key %>"> <% $.each(record.fields, function(key2, field) { %> <td<%- field.attr %>><%- field.content %></td> <% }); %> </tr> <% }); %>';
tpl['table.html'] = ' <div id="coreui-table-<%= table.id %>" class="coreui-table"<%- render.attr %> <% if (widthSizes) { %>style="<%= widthSizes.join(\';\') %>"<% } %>> <% if (render.controls.length > 0) { %> <div class="coreui-table__controls d-flex justify-content-start gap-2 flex-wrap mb-3 align-items-center"> <% $.each(render.controls, function(key, control) { %> <div id="coreui-table-control-<%= control.id %>" class="coreui-table__control"> <%- control.content %> </div> <% }); %> </div> <% } %> <div class="coreui-table__container bg-white position-relative rounded-1 border border-1"> <% if (table.show.total) { %> <div class="ps-2 lh-lg border-bottom"> <small><%= lang.total %>: <span class="coreui-table__count-total"><%= recordsTotal %></span></small> </div> <% } %> <div class="coreui-table__wrapper table-responsive overflow-x-auto" <% if (heightSizes) { %>style="<%= heightSizes.join(\';\') %>"<% } %>> <table class="table <% if (table.size) { %>table-<%= table.size %><% } %> <% if (table.hover) { %>table-hover<% } %> <% if (table.striped) { %>table-striped<% } %> mb-0 <%= table.class %>"> <colgroup> <% $.each(render.columnGroups, function(key, columnGroup) { %> <col<% if (columnGroup.width) { %> style="width: <%= (columnGroup.width.toString() + columnGroup.unit) %>"<% } %>/> <% }); %> </colgroup> <% if (table.show.columnHeaders) { %> <thead> <%- render.columnsHeader %> <%- render.columns %> </thead> <% } %> <tbody class="border-secondary-subtle"> <%- render.records %> </tbody> <% if (render.footer != \'\' || render.pages != \'\') { %> <tfoot> <%- render.footer %> <%- render.pages %> </tfoot> <% } %> </table> </div> </div> </div>';
tpl['controls/button.html'] = '<button type="button"<%- render.attr %>> <%- control.content %> </button>';
tpl['controls/link.html'] = '<a href="<%- control.href %>"<%- render.attr %>><%- control.content %></a>';

var coreuiTableInstance = {
  _options: {
    id: null,
    "class": '',
    primaryKey: 'id',
    lang: 'ru',
    size: 'sm',
    striped: true,
    hover: true,
    width: null,
    minWidth: null,
    maxWidth: null,
    height: null,
    minHeight: null,
    naxHeight: null,
    page: 1,
    recordsPerPage: 25,
    recordsPerPageList: [25, 50, 100, 1000],
    // 0 - all
    pageParam: 'page',
    recordsPerPageParam: 'count',
    method: 'GET',
    url: null,
    // '/mod/index/orders/?page=[page]'
    show: {
      total: false,
      columnHeaders: true,
      pages: false,
      pagesJump: false,
      prePageList: false
    },
    onClick: null,
    onClickUrl: null,
    controls: [],
    columnGroups: [],
    columns: [],
    footer: [],
    records: []
  },
  _page: 1,
  _recordsPerPage: 25,
  _recordsTotal: 0,
  _recordsNumber: 1,
  _columns: [],
  _search: [],
  _filter: [],
  _events: {},
  /**
   * Инициализация
   * @param {object} options
   * @private
   */
  _init: function _init(options) {
    this._options = $.extend(true, {}, this._options, options);
    this._events = {};
    if (!this._options.id) {
      this._options.id = coreuiTableUtils.hashCode();
    }
    if (this._options.page > 0) {
      this._page = this._options.page;
    }
    if (this._options.recordsPerPage > 0) {
      this._recordsPerPage = this._options.recordsPerPage;
    }
    var that = this;

    // Инициализация колонок
    if (_typeof(this._options.columns) === 'object' && Array.isArray(this._options.columns) && this._options.columns.length > 0) {
      $.each(this._options.columns, function (key, column) {
        if (typeof column.type === 'undefined' || !CoreUI.table.columns.hasOwnProperty(column.type)) {
          column.type = 'text';
        }
        var columnInstance = $.extend(true, {}, CoreUI.table.columns[column.type]);
        columnInstance.init(that, column);
        that._columns.push(columnInstance);
      });
    }
  },
  /**
   *
   */
  initEvents: function initEvents() {
    var that = this;
    var tableWrapper = '#coreui-table-' + this._options.id + ' > .coreui-table__container > .coreui-table__wrapper';

    // Показ строк
    this.on('show-records.coreui.table', function () {
      // Переход по ссылке
      if (typeof that._options.onClickUrl === 'string' && that._options.onClickUrl) {
        $(tableWrapper + ' > table > tbody > tr.coreui-table__record').click(function () {
          var recordKey = $(this).data('record-key');
          var record = that._getRecordByKey(recordKey);
          if (!record) {
            return;
          }
          var url = that._options.onClickUrl;
          $.each(record, function (field, value) {
            var fieldQuote = field.replace(/([^\w\d])/g, '\\$1');
            url = url.replace(new RegExp('\\[' + fieldQuote + '\\]', 'g'), value);
          });
          if (url && url !== '#') {
            location.href = url;
          }
        });
      }

      // Событие нажатия на строку
      if (typeof that._options.onClick === 'function') {
        $(tableWrapper + ' > table > tbody > tr.coreui-table__record').click(function (event) {
          var recordKey = $(this).data('record-key');
          var record = that._getRecordByKey(recordKey);
          if (!record) {
            return;
          }
          that._options.onClick(event, record);
        });
      }

      // Фиксация колонок
      var colOffset = 0;
      $(tableWrapper + ' > table > thead > tr:last-child > td.coreui-table__fixed_left').each(function () {
        var index = $(this).index() + 1;
        if (index !== 1) {
          $(tableWrapper + ' > table > thead > tr:last-child > td:nth-child(' + index + ')').css('left', colOffset + 'px');
          $(tableWrapper + ' > table > tbody > tr > td:nth-child(' + index + ')').css('left', colOffset + 'px');
        }
        colOffset += $(this).outerWidth();
      });
      colOffset = 0;
      $($(tableWrapper + ' > table > thead > tr:last-child > td.coreui-table__fixed_right').get().reverse()).each(function () {
        var index = $(this).index() + 1;
        if (index !== 1) {
          $(tableWrapper + ' > table > thead > tr:last-child > td:nth-child(' + index + ')').css('right', colOffset + 'px');
          $(tableWrapper + ' > table > tbody > tr > td:nth-child(' + index + ')').css('right', colOffset + 'px');
        }
        colOffset += $(this).outerWidth();
      });
    });

    // Страницы
    var btnPrev = $(tableWrapper + ' > table > tfoot > tr > td .coreui-table__page_prev');
    if (btnPrev[0]) {
      btnPrev.click(function () {
        if (that._page > 1) {
          that.prevPage();
        }
      });
    }
    var btnNext = $(tableWrapper + ' > table > tfoot > tr > td .coreui-table__page_next');
    if (btnNext[0]) {
      btnNext.click(function () {
        that.nextPage();
      });
    }
    var inputGoPage = $(tableWrapper + ' > table > tfoot > tr > td .coreui-table__page_go_container input');
    var btnGoPage = $(tableWrapper + ' > table > tfoot > tr > td .coreui-table__page_go');
    if (btnGoPage[0]) {
      btnGoPage.click(function () {
        that.goPage(inputGoPage.val());
      });
      inputGoPage.keyup(function (event) {
        
      });
    }
    var selectPerPage = $(tableWrapper + ' > table > tfoot > tr > td .coreui-table__pages_list_container select');
    if (selectPerPage[0]) {
      selectPerPage.change(function () {
        that._page = 1;
        that._recordsPerPage = selectPerPage.val();
        that.reload();
      });
    }
    this._trigger('shown.coreui.table');

    // Вызов события показа строк
    if ((!this._options.url || this._options.url === '#') && _typeof(this._options.records) === 'object' && Array.isArray(this._options.records) && this._options.records.length > 0) {
      this._trigger('show-records.coreui.table', this, [this]);
    }
  },
  /**
   *
   * @returns {*}
   */
  getId: function getId() {
    return this._options.id;
  },
  /**
   *
   * @param element
   * @returns {*}
   */
  render: function render(element) {
    var that = this;
    var widthSizes = [];
    var heightSizes = [];
    var htmlRecords = '';
    var render = {
      controls: [],
      columnsHeader: [],
      columns: [],
      columnGroups: [],
      records: [],
      footer: '',
      pages: ''
    };
    this._recordsTotal = this._options.records.length;
    if (this._options.width > 0) {
      var unit = typeof this._options.width === 'number' ? 'px' : '';
      widthSizes.push('width:' + this._options.width + unit);
    }
    if (this._options.minWidth > 0) {
      var _unit = typeof this._options.minWidth === 'number' ? 'px' : '';
      widthSizes.push('min-width:' + this._options.minWidth + _unit);
    }
    if (this._options.maxWidth > 0) {
      var _unit2 = typeof this._options.maxWidth === 'number' ? 'px' : '';
      widthSizes.push('max-width:' + this._options.maxWidth + _unit2);
    }
    if (this._options.height > 0) {
      var _unit3 = typeof this._options.height === 'number' ? 'px' : '';
      heightSizes.push('height:' + this._options.height + _unit3);
    }
    if (this._options.minHeight > 0) {
      var _unit4 = typeof this._options.minHeight === 'number' ? 'px' : '';
      heightSizes.push('min-height:' + this._options.minHeight + _unit4);
    }
    if (this._options.maxHeight > 0) {
      var _unit5 = typeof this._options.maxHeight === 'number' ? 'px' : '';
      heightSizes.push('max-height:' + this._options.maxHeight + _unit5);
    }

    // Элементы управления
    if (_typeof(this._options.controls) === 'object' && Array.isArray(this._options.controls) && this._options.controls.length > 0) {
      $.each(this._options.controls, function (key, control) {
        if (CoreUI.table.controls.hasOwnProperty(control.type)) {
          var controlInstance = $.extend(true, {}, CoreUI.table.controls[control.type]);
          controlInstance.init(that, control);
          render.controls.push({
            id: controlInstance.getId(),
            content: controlInstance.render()
          });
          that.on('shown.coreui.table', function () {
            controlInstance.initEvents();
          });
        }
      });
    }

    // Колонки
    if (this._columns.length > 0) {
      $.each(this._columns, function (key, column) {
        var columnOptions = column.getOptions();
        var attributes = [];
        if (columnOptions.fixed && typeof columnOptions.fixed === 'string') {
          columnOptions.attrHeader = coreuiTableUtils.mergeAttr(columnOptions.attrHeader, {
            "class": 'coreui-table__fixed_' + columnOptions.fixed
          });
          columnOptions.attr = coreuiTableUtils.mergeAttr(columnOptions.attr, {
            "class": 'coreui-table__fixed_' + columnOptions.fixed
          });
        }
        if (columnOptions.attrHeader && _typeof(columnOptions.attrHeader) === 'object') {
          $.each(columnOptions.attrHeader, function (name, value) {
            attributes.push(name + '="' + value + '"');
          });
        }
        render.columnGroups.push({
          width: columnOptions.hasOwnProperty('width') ? columnOptions.width : '',
          unit: typeof columnOptions.width === 'number' ? 'px' : ''
        });
        render.columns.push({
          attr: attributes.length > 0 ? ' ' + attributes.join(' ') : '',
          label: columnOptions.hasOwnProperty('label') ? columnOptions.label : ""
        });
      });
    }

    // Строки
    if (this._options.url && this._options.url !== '#') {
      this.on('shown.coreui.table', function () {
        that.load(this._options.url);
      });
    } else {
      if (_typeof(this._options.records) === 'object' && Array.isArray(this._options.records) && this._options.records.length > 0) {
        that._recordsTotal = this._options.records.length;
        $.each(this._options.records, function (key, record) {
          render.records.push(that._renderRecord(record, key));
          that._recordsNumber++;
        });
        htmlRecords = ejs.render(tpl['table-records.html'], {
          records: render.records
        });
      } else {
        htmlRecords = ejs.render(tpl['table-records-empty.html'], {
          columnsCount: this._columns.length ? this._columns.length : 1,
          lang: this._getLang()
        });
      }
    }

    // Страницы
    if (_typeof(this._options.show) === 'object' && (this._options.show.pages || this._options.show.pagesJump || this._options.show.prePageList)) {
      var totalPages = this._recordsTotal > 0 && this._recordsPerPage > 0 ? Math.ceil(this._recordsTotal / this._recordsPerPage) : 1;
      if (this._options.recordsPerPageList.indexOf(this._recordsPerPage) < 0) {
        this._options.recordsPerPageList.unshift(this._recordsPerPage);
      }
      render.pages = ejs.render(tpl['table-pages.html'], {
        columnsCount: this._columns.length ? this._columns.length : 1,
        table: this._options,
        lang: this._getLang(),
        currentPage: this._page,
        pagesTotal: totalPages,
        prevPage: this._page > 1,
        nextPage: this._page < totalPages,
        recordsPerPage: this._recordsPerPage,
        recordsPerPageList: this._options.recordsPerPageList
      });
    }
    if (_typeof(this._options.columnGroups) === 'object' && Array.isArray(this._options.columnGroups) && this._options.columnGroups.length > 0) {
      var rows = [];
      $.each(this._options.columnGroups, function (key, headerRow) {
        if (_typeof(headerRow) === 'object' && Array.isArray(headerRow)) {
          var cells = [];
          $.each(headerRow, function (key, headerColumn) {
            if (_typeof(headerColumn) === 'object' && !Array.isArray(headerColumn)) {
              var attributes = [];
              if (headerColumn.attr && _typeof(headerColumn.attr) === 'object') {
                $.each(headerColumn.attr, function (name, value) {
                  attributes.push(name + '="' + value + '"');
                });
              }
              cells.push({
                label: headerColumn.hasOwnProperty('label') ? headerColumn.label : '',
                attr: attributes.length > 0 ? ' ' + attributes.join(' ') : ''
              });
            }
          });
          rows.push(ejs.render(tpl['table-columns.html'], {
            columns: cells
          }));
        }
      });
      render.columnsHeader = rows.join('');
    }
    if (_typeof(this._options.footer) === 'object' && Array.isArray(this._options.footer) && this._options.footer.length > 0) {
      var _rows = [];
      $.each(this._options.footer, function (key, footerRow) {
        if (_typeof(footerRow) === 'object' && Array.isArray(footerRow)) {
          var cells = [];
          $.each(footerRow, function (key, footerColumn) {
            if (_typeof(footerColumn) === 'object' && !Array.isArray(footerColumn)) {
              var attributes = [];
              if (footerColumn.attr && _typeof(footerColumn.attr) === 'object') {
                $.each(footerColumn.attr, function (name, value) {
                  attributes.push(name + '="' + value + '"');
                });
              }
              cells.push({
                label: footerColumn.hasOwnProperty('label') ? footerColumn.label : '',
                attr: attributes.length > 0 ? ' ' + attributes.join(' ') : ''
              });
            }
          });
          _rows.push(ejs.render(tpl['table-columns-footer.html'], {
            columns: cells
          }));
        }
      });
      render.footer = _rows.join('');
    }
    var htmlColumns = ejs.render(tpl['table-columns.html'], {
      columns: render.columns
    });
    var html = ejs.render(tpl['table.html'], {
      table: this._options,
      lang: this._getLang(),
      widthSizes: widthSizes,
      heightSizes: heightSizes,
      recordsTotal: this._recordsTotal,
      render: {
        columnGroups: render.columnGroups,
        columnsHeader: render.columnsHeader,
        controls: render.controls,
        columns: htmlColumns,
        records: htmlRecords,
        footer: render.footer,
        pages: render.pages
      }
    });
    if (element === undefined) {
      return html;
    }

    // Dom element
    var domElement = {};
    if (typeof element === 'string') {
      domElement = document.getElementById(element);
      if (!domElement) {
        return '';
      }
    } else if (element instanceof HTMLElement) {
      domElement = element;
    }
    domElement.innerHTML = html;
    this.initEvents();
  },
  /**
   *
   */
  lock: function lock() {
    var container = $('#coreui-table-' + this._options.id + ' > .coreui-table__container');
    if (container[0] && !container.find('.coreui-table-lock')[0]) {
      var html = ejs.render(tpl['table-loader.html'], {
        lang: this._getLang()
      });
      container.prepend(html);
    }
  },
  /**
   *
   */
  unlock: function unlock() {
    $('#coreui-table-' + this._options.id + ' > .coreui-table__container > .coreui-table-lock').hide(50, function () {
      $(this).remove();
    });
  },
  /**
   * Загрузка строк
   * @param {string} url
   * @param {string} method
   */
  load: function load(url, method) {
    this.lock();
    var that = this;
    var params = {};
    if (url.match(/\[page\]/)) {
      url = url.replace(/\[page\]/, this._page);
    } else {
      params[this._options.pageParam] = this._page;
    }
    if (url.match(/\[per_page\]/)) {
      url = url.replace(/\[per_page\]/, this._recordsPerPage);
    } else {
      params[this._options.recordsPerPageParam] = this._recordsPerPage;
    }
    if (Object.keys(params).length > 0) {
      url += url.match(/\?/) ? '&' + $.param(params) : '?' + $.param(params);
    }
    $.ajax({
      url: url,
      method: method || 'GET',
      dataType: "json",
      beforeSend: function beforeSend(xhr) {
        that._trigger('start-load-records.coreui.table', that, [that, xhr]);
      },
      success: function success(result) {
        if (result.hasOwnProperty('records') && _typeof(result.records) === 'object' && Array.isArray(result.records)) {
          var total = result.hasOwnProperty('total') && coreuiTableUtils.isNumeric(result.total) ? result.total : null;
          that._viewRecords(result.records, total);
        } else {
          that._viewRecords([]);
        }
      },
      error: function error(xhr, textStatus, errorThrown) {
        that._viewRecords([]);
        that._trigger('error-load-records.coreui.table', that, [that, xhr, textStatus, errorThrown]);
      },
      complete: function complete(xhr, textStatus) {
        that.unlock();
        that._trigger('end-load-records.coreui.table', that, [that, xhr, textStatus]);
      }
    });
  },
  /**
   * Перезагрузка записей в таблице
   */
  reload: function reload() {
    if (this._options.url && this._options.url !== '#') {
      this.load(this._options.url, this._options.method);
    }
  },
  /**
   * Выбор всех записей в таблице
   */
  selectAll: function selectAll() {
    var tableContainer = '#coreui-table-' + this._options.id + ' > .coreui-table__container > .coreui-table__wrapper > table';
    $(tableContainer + ' > thead > tr > td > .coreui-table__select-all').prop('checked', true);
    $(tableContainer + ' > tbody > tr.coreui-table__record').addClass('table-primary');
    $(tableContainer + ' > tbody > tr.coreui-table__record > td > .coreui-table__select').prop('checked', true);
    this._trigger('select-all.coreui.table', this);
  },
  /**
   * Отмена выбор всех записей в таблице
   */
  unselectAll: function unselectAll() {
    var tableContainer = '#coreui-table-' + this._options.id + ' > .coreui-table__container > .coreui-table__wrapper > table';
    $(tableContainer + ' > thead > tr > td > .coreui-table__select-all').prop('checked', false);
    $(tableContainer + ' > tbody > tr.coreui-table__record').removeClass('table-primary');
    $(tableContainer + ' > tbody > tr.coreui-table__record > td.coreui-table__select_container > .coreui-table__select').prop('checked', false);
    this._trigger('unselect-all.coreui.table', this);
  },
  /**
   * Выбор записи в таблице
   * @param {string} primaryKey
   */
  selectRecord: function selectRecord(primaryKey) {
    var recordItem = this._getRecordByPrimaryKey(primaryKey);
    if (!recordItem) {
      return;
    }
    var row = this._getRowByKey(recordItem.key);
    if (!row) {
      return;
    }
    $(row).addClass('table-primary');
    $('.coreui-table__select', row).prop('checked', true);
    this._trigger('select.coreui.table', this, [recordItem.record]);
  },
  /**
   * Отмена выбора записи в таблице
   * @param {string} primaryKey
   */
  unselectRecord: function unselectRecord(primaryKey) {
    var recordItem = this._getRecordByPrimaryKey(primaryKey);
    if (!recordItem) {
      return;
    }
    var row = this._getRowByKey(recordItem.key);
    if (!row) {
      return;
    }
    $(row).removeClass('table-primary');
    $('.coreui-table__select', row).prop('checked', false);
    this._trigger('unselect.coreui.table', this, [recordItem.record]);
  },
  /**
   * Получение выбранных id
   * @return {array}
   */
  getSelected: function getSelected() {
    var primaryKeys = [];
    var that = this;
    var field = this._options.primaryKey;
    $('#coreui-table-' + this._options.id + ' > .coreui-table__container > .coreui-table__wrapper > table > tbody > tr.coreui-table__record > td.coreui-table__select_container > .coreui-table__select:checked').each(function (key, element) {
      var record = that._getRecordByKey($(element).val());
      if (!record || !record.hasOwnProperty(field)) {
        return;
      }
      primaryKeys.push(record[field]);
    });
    return primaryKeys;
  },
  /**
   * Получение выбранных записей
   * @return {array}
   */
  getSelectedRecords: function getSelectedRecords() {
    var records = [];
    var that = this;
    $('#coreui-table-' + this._options.id + ' > .coreui-table__container > .coreui-table__wrapper > table > tbody > tr.coreui-table__record > td.coreui-table__select_container > .coreui-table__select:checked').each(function (key, element) {
      var record = that._getRecordByKey($(element).val());
      if (!record) {
        return;
      }
      records.push(record);
    });
    return records;
  },
  /**
   * Получение записи по id
   * @param primaryKey
   * @return {object|null}
   */
  getRecord: function getRecord(primaryKey) {
    var recordItem = this._getRecordByPrimaryKey(primaryKey);
    if (!recordItem) {
      return null;
    }
    return recordItem.record;
  },
  /**
   * Получение записей
   */
  getRecords: function getRecords() {
    return this._options.records;
  },
  /**
   * Переход к предыдущей странице
   */
  prevPage: function prevPage() {
    if (this._page > 1) {
      this._page--;
      this.reload();
    }
  },
  /**
   * Переход к следующей странице
   * @return {array}
   */
  nextPage: function nextPage() {
    var totalPages = this._recordsTotal > 0 && this._recordsPerPage > 0 ? Math.ceil(this._recordsTotal / this._recordsPerPage) : 1;
    if (this._page < totalPages) {
      this._page++;
      this.reload();
    }
  },
  /**
   * Переход к указанной странице
   */
  goPage: function goPage(page) {
    if (page >= 1) {
      this._page = page;
      this.reload();
    }
  },
  /**
   * @param eventName
   * @param callback
   * @param context
   * @param singleExec
   */
  on: function on(eventName, callback, context, singleExec) {
    if (_typeof(this._events[eventName]) !== 'object') {
      this._events[eventName] = [];
    }
    this._events[eventName].push({
      context: context || this,
      callback: callback,
      singleExec: !!singleExec
    });
  },
  /**
   * @param name
   * @param context
   * @param params
   * @private
   */
  _trigger: function _trigger(name, context, params) {
    params = params || [];
    if (this._events[name] instanceof Object && this._events[name].length > 0) {
      for (var i = 0; i < this._events[name].length; i++) {
        var callback = this._events[name][i].callback;
        context = context || this._events[name][i].context;
        callback.apply(context, params);
        if (this._events[name][i].singleExec) {
          this._events[name].splice(i, 1);
        }
      }
    }
  },
  /**
   * Получение настроек языка
   * @private
   */
  _getLang: function _getLang() {
    return CoreUI.table.lang.hasOwnProperty(this._options.lang) ? CoreUI.table.lang[this._options.lang] : CoreUI.table.lang['ru'];
  },
  /**
   * Получение записи по ключу
   * @param recordKey
   * @return {object|null}
   * @private
   */
  _getRecordByKey: function _getRecordByKey(recordKey) {
    if (typeof recordKey === 'undefined' || recordKey === '') {
      return null;
    }
    var record = this._options.records.hasOwnProperty(recordKey) ? this._options.records[recordKey] : null;
    if (!record) {
      return null;
    }
    return record;
  },
  /**
   * Получение записи по id
   * @param {string} primaryKey
   * @return {object|null}
   * @private
   */
  _getRecordByPrimaryKey: function _getRecordByPrimaryKey(primaryKey) {
    if (typeof primaryKey === 'undefined' || primaryKey === '') {
      return null;
    }
    var record = null;
    var recordKey = null;
    var field = this._options.primaryKey;
    $.each(this._options.records, function (key, recordItem) {
      if (recordItem.hasOwnProperty(field) && recordItem[field] === primaryKey) {
        recordKey = key;
        record = recordItem;
        return false;
      }
    });
    if (!record) {
      return null;
    }
    return {
      key: recordKey,
      record: record
    };
  },
  /**
   * Получение элемента строки по ключу
   * @param {int} recordKey
   * @private
   */
  _getRowByKey: function _getRowByKey(recordKey) {
    return $('#coreui-table-' + this._options.id + ' > .coreui-table__container > .coreui-table__wrapper > table > tbody > tr[data-record-key="' + recordKey + '"]');
  },
  /**
   * Показ указанных записей в таблице
   * @param records
   * @param total
   * @private
   */
  _viewRecords: function _viewRecords(records, total) {
    this._recordsTotal = coreuiTableUtils.isNumeric(total) ? parseInt(total) : records.length;
    var that = this;
    var htmlRecords = '';
    var totalPages = this._recordsTotal > 0 && this._recordsPerPage > 0 ? Math.ceil(this._recordsTotal / this._recordsPerPage) : 1;
    this._options.records = records;
    that._recordsNumber = this._page === 1 ? 1 : (this._page - 1) * this._recordsPerPage + 1;
    if (records.length > 0) {
      var renderRecorders = [];
      $.each(records, function (key, record) {
        renderRecorders.push(that._renderRecord(record, key));
        that._recordsNumber++;
      });
      htmlRecords = ejs.render(tpl['table-records.html'], {
        records: renderRecorders
      });
    } else {
      htmlRecords = ejs.render(tpl['table-records-empty.html'], {
        columnsCount: this._columns.length > 0 ? this._columns.length : 1,
        lang: this._getLang()
      });
    }
    var tableContainer = '#coreui-table-' + this._options.id + ' > .coreui-table__container > .coreui-table__wrapper > table';
    $(tableContainer + ' > tfoot > tr > td .coreui-table__page_current').text(this._page);
    $(tableContainer + ' > tfoot > tr > td .coreui-table__pages_total').text(totalPages);
    $(tableContainer + ' > tfoot > tr > td .coreui-table__page_prev').attr('disabled', this._page <= 1);
    $(tableContainer + ' > tfoot > tr > td .coreui-table__page_next').attr('disabled', this._page >= totalPages);
    $(tableContainer + ' > tbody').html(htmlRecords);
    $('#coreui-table-' + this._options.id + ' .coreui-table__count-total').text(this._recordsTotal);
    this._trigger('show-records.coreui.table', this, [this]);
  },
  /**
   * @param {object} record
   * @param {int}    recordKey
   * @returns {{ attr: (string), fields: (object) }}}
   * @private
   */
  _renderRecord: function _renderRecord(record, recordKey) {
    var that = this;
    var fields = [];
    var recordProps = _typeof(record.coreui) === 'object' && !Array.isArray(record.coreui) ? record.coreui : null;
    var recordAttr = {
      "class": 'coreui-table__record'
    };
    $.each(this._columns, function (key, column) {
      fields.push(that._renderField(column, record, recordKey));
    });
    if (typeof this._options.onClickUrl === 'string' && this._options.onClickUrl) {
      recordAttr["class"] += ' coreui-table_pointer';
    }
    if (recordProps) {
      recordAttr = coreuiTableUtils.mergeAttr(recordAttr, recordProps.attr);
    }
    var recordAttrResult = [];
    $.each(recordAttr, function (name, value) {
      recordAttrResult.push(name + '="' + value + '"');
    });
    return {
      attr: recordAttrResult.length > 0 ? ' ' + recordAttrResult.join(' ') : '',
      fields: fields
    };
  },
  /**
   *
   * @param {object} column
   * @param {object} record
   * @param {int} recordKey
   * @returns {{ attr: (string), content: (string) }}
   * @private
   */
  _renderField: function _renderField(column, record, recordKey) {
    var columnOptions = column.getOptions();
    var columnField = typeof columnOptions.field === 'string' ? columnOptions.field : null;
    var content = '';
    var recordProps = _typeof(record.coreui) === 'object' && !Array.isArray(record.coreui) ? record.coreui : null;
    var fieldProps = recordProps && recordProps.hasOwnProperty('fields') && recordProps.fields.hasOwnProperty(columnField) ? recordProps.fields[columnField] : null;
    var fieldAttr = _typeof(columnOptions.attr) === 'object' && !Array.isArray(columnOptions.attr) ? columnOptions.attr : {};
    if (fieldProps && _typeof(fieldProps.attr) === 'object' && !Array.isArray(fieldProps.attr)) {
      fieldAttr = coreuiTableUtils.mergeAttr(fieldAttr, fieldProps.attr);
    }
    if (typeof columnOptions.render === 'function') {
      content = columnOptions.render(record);
    } else {
      content = columnField && record.hasOwnProperty(columnField) ? record[columnField] : '';
    }
    content = column.render(content, record, recordKey);
    var fieldAttrResult = [];
    $.each(fieldAttr, function (name, value) {
      fieldAttrResult.push(name + '="' + value + '"');
    });
    return {
      attr: fieldAttrResult.length > 0 ? ' ' + fieldAttrResult.join(' ') : '',
      content: content
    };
  }
};

var coreuiTable$1 = {
  columns: {},
  controls: {},
  filters: {},
  search: {},
  lang: {},
  _instances: {},
  /**
   * @param {object} options
   * @returns {CoreUI.table.instance}
   */
  create: function create(options) {
    var instance = $.extend(true, {}, coreuiTableInstance);
    instance._init(options instanceof Object ? options : {});
    var tableId = instance.getId();
    this._instances[tableId] = instance;
    return instance;
  },
  /**
   * @param {string} id
   * @returns {CoreUI.table.instance|null}
   */
  get: function get(id) {
    if (!this._instances.hasOwnProperty(id)) {
      return null;
    }
    if (!$('#coreui-table-' + id)[0]) {
      delete this._instances[id];
      return null;
    }
    return this._instances[id];
  }
};

coreuiTable$1.lang.ru = {
  "emptyRecords": "Нет записей",
  "loading": "Загрузка...",
  "total": "Всего",
  "of": "из",
  "all": "Все"
};

coreuiTable$1.lang.ru = {
  "emptyRecords": "No records",
  "loading": "Loading...",
  "total": "Total",
  "of": "of",
  "all": "All"
};

coreuiTable$1.controls.button = {
  _table: null,
  _options: {
    id: null,
    type: 'button',
    href: null,
    content: null,
    onClick: null,
    attr: null
  },
  _render: {
    attr: ''
  },
  /**
   * Инициализация
   * @param {CoreUI.table.instance} table
   * @param {object} options
   */
  init: function init(table, options) {
    this._options = $.extend({}, this._options, options);
    this._table = table;
    if (!this._options.id) {
      this._options.id = coreuiTableUtils.hashCode();
    }
  },
  /**
   * Инициализация событий связанных с элементом управления
   */
  initEvents: function initEvents() {
    var that = this;
    if (typeof this._options.onClick === 'function' || typeof this._options.onClick === 'string') {
      $('#coreui-table-' + this._table._options.id + ' #coreui-table-control-' + this._options.id + ' > button').click(function (event) {
        if (typeof that._options.onClick === 'function') {
          that._options.onClick(event, that._table);
        } else if (typeof that._options.onClick === 'string') {
          new Function(that._options.onClick)();
        }
      });
    }
  },
  /**
   * Получение ID элемента управления
   * @returns {string}
   */
  getId: function getId() {
    return this._options.id;
  },
  /**
   * Формирование контента для размещения на странице
   * @returns {string}
   */
  render: function render() {
    if (_typeof(this._options.attr) === 'object') {
      var attributes = [];
      $.each(this._options.attr, function (name, value) {
        attributes.push(name + '="' + value + '"');
      });
      this._render.attr = ' ' + attributes.join(' ');
    }
    return ejs.render(tpl['controls/button.html'], {
      control: this._options,
      render: this._render
    });
  }
};

coreuiTable$1.controls.custom = {
  _table: null,
  _options: {
    id: null,
    type: 'custom',
    content: null
  },
  /**
   * Инициализация
   * @param {CoreUI.table.instance} table
   * @param {object} options
   */
  init: function init(table, options) {
    this._options = $.extend({}, this._options, options);
    this._table = table;
    if (!this._options.id) {
      this._options.id = coreuiTableUtils.hashCode();
    }
  },
  /**
   * Инициализация событий связанных с элементом управления
   */
  initEvents: function initEvents() {},
  /**
   * Получение ID элемента управления
   * @returns {string}
   */
  getId: function getId() {
    return this._options.id;
  },
  /**
   * Формирование контента для размещения на странице
   * @returns {string}
   */
  render: function render() {
    return this._options.content;
  }
};

coreuiTable$1.controls.link = {
  _table: null,
  _options: {
    id: null,
    type: 'link',
    href: null,
    content: null,
    attr: null
  },
  _render: {
    attr: ''
  },
  /**
   * Инициализация
   * @param {CoreUI.table.instance} table
   * @param {object} options
   */
  init: function init(table, options) {
    this._options = $.extend({}, this._options, options);
    this._table = table;
    if (!this._options.id) {
      this._options.id = coreuiTableUtils.hashCode();
    }
  },
  /**
   * Инициализация событий связанных с элементом управления
   */
  initEvents: function initEvents() {},
  /**
   * Получение ID элемента управления
   * @returns {string}
   */
  getId: function getId() {
    return this._options.id;
  },
  /**
   * Формирование контента для размещения на странице
   * @returns {string}
   */
  render: function render() {
    if (_typeof(this._options.attr) === 'object') {
      var attributes = [];
      $.each(this._options.attr, function (name, value) {
        attributes.push(name + '="' + value + '"');
      });
      this._render.attr = ' ' + attributes.join(' ');
    }
    return ejs.render(tpl['controls/link.html'], {
      control: this._options,
      render: this._render
    });
  }
};

coreuiTable$1.columns.date = {
  _table: null,
  _options: {
    type: 'date',
    field: null,
    label: null,
    width: null,
    format: 'DD.MM.YYYY',
    attr: {},
    attrHeader: {},
    render: null
  },
  /**
   * Инициализация
   * @param {CoreUI.table.instance} table
   * @param {object}                options
   */
  init: function init(table, options) {
    this._table = table;
    this._options = $.extend({}, this._options, options);
  },
  /**
   * Получение параметров
   */
  getOptions: function getOptions() {
    return this._options;
  },
  /**
   * Формирование контента
   * @param {string} content
   * @param {object} record
   * @param {string} recordKey
   * @returns {string}
   */
  render: function render(content, record, recordKey) {
    if (typeof content !== 'string') {
      return '';
    }
    try {
      var date = new Date(content);
      content = this._options.format.replace(/YYYY/g, this._strPadLeft(date.getFullYear(), 4)).replace(/MM/g, this._strPadLeft(date.getMonth() + 1, 2)).replace(/M/g, date.getMonth() + 1).replace(/DD/g, this._strPadLeft(date.getDate(), 2)).replace(/D/g, date.getDate());
    } catch (e) {
      content = '';
    }
    return content;
  },
  /**
   * Размерность строки
   * @param {string} str
   * @param {int}    count
   * @param {string} repeat
   * @returns {string}
   */
  _strPadLeft: function _strPadLeft(str, count, repeat) {
    str = String(str);
    if (str.length >= count) {
      return str;
    }
    repeat = repeat ? repeat : '0';
    return (repeat.repeat(count) + str).slice(-count);
  }
};

coreuiTable$1.columns.datetime = {
  _table: null,
  _options: {
    type: 'datetime',
    field: null,
    label: null,
    width: null,
    format: 'DD.MM.YYYY hh:mm:ss',
    attr: {},
    attrHeader: {},
    render: null
  },
  /**
   * Инициализация
   * @param {CoreUI.table.instance} table
   * @param {object}                options
   */
  init: function init(table, options) {
    this._table = table;
    this._options = $.extend({}, this._options, options);
  },
  /**
   * Получение параметров
   */
  getOptions: function getOptions() {
    return this._options;
  },
  /**
   * Формирование контента
   * @param {string} content
   * @param {object} record
   * @param {string} recordKey
   * @returns {string}
   */
  render: function render(content, record, recordKey) {
    if (typeof content !== 'string') {
      return '';
    }
    try {
      var date = new Date(content);
      content = this._options.format.replace(/YYYY/g, this._strPadLeft(date.getFullYear(), 4)).replace(/MM/g, this._strPadLeft(date.getMonth() + 1, 2)).replace(/M/g, date.getMonth() + 1).replace(/DD/g, this._strPadLeft(date.getDate(), 2)).replace(/D/g, date.getDate()).replace(/hh/g, this._strPadLeft(date.getHours(), 2)).replace(/mm/g, this._strPadLeft(date.getMinutes(), 2)).replace(/m/g, date.getMinutes()).replace(/ss/g, this._strPadLeft(date.getSeconds(), 2)).replace(/s/g, date.getSeconds());
    } catch (e) {
      content = '';
    }
    return content;
  },
  /**
   * Размерность строки
   * @param {string} str
   * @param {int}    count
   * @param {string} repeat
   * @returns {string}
   */
  _strPadLeft: function _strPadLeft(str, count, repeat) {
    str = String(str);
    if (str.length >= count) {
      return str;
    }
    repeat = repeat ? repeat : '0';
    return (repeat.repeat(count) + str).slice(-count);
  }
};

coreuiTable$1.columns.html = {
  _table: null,
  _options: {
    type: 'html',
    field: null,
    label: null,
    width: null,
    attr: {},
    attrHeader: {},
    render: null
  },
  /**
   * Инициализация
   * @param {CoreUI.table.instance} table
   * @param {object}                options
   */
  init: function init(table, options) {
    this._table = table;
    this._options = $.extend({}, this._options, options);
  },
  /**
   * Получение параметров
   */
  getOptions: function getOptions() {
    return this._options;
  },
  /**
   * Формирование контента
   * @param {string} content
   * @param {object} record
   * @param {string} recordKey
   * @returns {string}
   */
  render: function render(content, record, recordKey) {
    if (['string', 'bigint', 'symbol', 'number'].indexOf(_typeof(content)) < 0) {
      return '';
    }
    return String(content);
  }
};

coreuiTable$1.columns.number = {
  _table: null,
  _options: {
    type: 'number',
    field: null,
    label: null,
    width: null,
    attr: {},
    attrHeader: {},
    render: null
  },
  /**
   * Инициализация
   * @param {CoreUI.table.instance} table
   * @param {object}                options
   */
  init: function init(table, options) {
    this._table = table;
    this._options = $.extend({}, this._options, options);
  },
  /**
   * Получение параметров
   */
  getOptions: function getOptions() {
    return this._options;
  },
  /**
   * Формирование контента
   * @param {string} content
   * @param {object} record
   * @param {string} recordKey
   * @returns {string}
   */
  render: function render(content, record, recordKey) {
    if (['string', 'bigint', 'symbol', 'number'].indexOf(_typeof(content)) < 0) {
      return '';
    }
    content = String(content).replace(/,/g, '.').replace(/[^0-9\-\.]/g, '').replace(/[\s]{2,}/g, ' ');
    content = content.replace(/(?<!(\.\d*|^.{0}))(?=(\d{3})+(?!\d))/g, '$1 ').replace(/\- /g, '-');
    return content;
  }
};

coreuiTable$1.columns.numbers = {
  _table: null,
  _options: {
    type: 'numbers',
    label: '№',
    width: 20,
    attr: {
      "class": 'text-end'
    },
    attrHeader: null
  },
  /**
   * Инициализация
   * @param {CoreUI.table.instance} table
   * @param {object}                options
   */
  init: function init(table, options) {
    this._table = table;
    this._options = $.extend(true, {}, this._options, options);
  },
  /**
   * Получение параметров
   */
  getOptions: function getOptions() {
    return this._options;
  },
  /**
   * Формирование контента
   * @param {string} content
   * @param {object} record
   * @param {string} recordKey
   * @returns {string}
   */
  render: function render(content, record, recordKey) {
    return this._table._recordsNumber;
  }
};

coreuiTable$1.columns.select = {
  _table: null,
  _options: {
    type: 'select',
    label: '',
    width: 35,
    attr: {
      "class": 'coreui-table__select_container text-center'
    },
    attrHeader: {
      "class": 'text-center'
    }
  },
  /**
   * Инициализация
   * @param {CoreUI.table.instance} table
   * @param {object}                options
   */
  init: function init(table, options) {
    if (options.hasOwnProperty('attr')) {
      options.attr = CoreUI.table._mergeAttr(this._options.attr, options.attr);
    }
    if (options.hasOwnProperty('attrHeader')) {
      options.attrHeader = CoreUI.table._mergeAttr(this._options.attrHeader, options.attrHeader);
    }
    this._table = table;
    this._options = $.extend(true, {}, this._options, options);
    this._options.label = '<input class="coreui-table__select-all form-check-input" type="checkbox" value="">';
    var tableWrapper = '#coreui-table-' + table._options.id + ' > .coreui-table__container > .coreui-table__wrapper';
    var containers = tableWrapper + ' > table > tbody > tr.coreui-table__record > td.coreui-table__select_container';

    // Показ строк
    this._table.on('show-records.coreui.table', function () {
      // Отмена обработки нажатия в select колонках
      $(containers).click(function (event) {
        event.stopPropagation();
      });

      // Выбор строки
      $(containers + ' > .coreui-table__select').click(function (event) {
        var recordKey = $(this).val();
        var record = table._getRecordByKey(recordKey);
        var row = table._getRowByKey(recordKey);
        if (!record || !row) {
          return;
        }
        if ($(this).is(':checked')) {
          $(row).addClass('table-primary');
          table._trigger('select.coreui.table', table, [record]);
        } else {
          $(row).removeClass('table-primary');
          table._trigger('unselect.coreui.table', table, [record]);
        }
      });

      // Выбор всех строк
      $(tableWrapper + ' > table > thead > tr > td > .coreui-table__select-all').click(function (event) {
        if ($(this).is(':checked')) {
          table.selectAll();
        } else {
          table.unselectAll();
        }
      });
    });
  },
  /**
   * Получение параметров
   */
  getOptions: function getOptions() {
    return this._options;
  },
  /**
   * Формирование контента
   * @param {string} content
   * @param {object} record
   * @param {string} recordKey
   * @returns {string}
   */
  render: function render(content, record, recordKey) {
    return '<input class="coreui-table__select form-check-input" type="checkbox" value="' + recordKey + '">';
  }
};

coreuiTable$1.columns["switch"] = {
  _table: null,
  _options: {
    type: 'switch',
    label: '',
    field: '',
    width: 5,
    valueY: 'Y',
    valueN: 'N',
    attr: {
      "class": 'coreui-table__switch_container'
    },
    attrHeader: {},
    onChange: null
  },
  /**
   * Инициализация
   * @param {CoreUI.table.instance} table
   * @param {object}                options
   */
  init: function init(table, options) {
    this._table = table;
    this._options = $.extend(true, {}, this._options, options);
    var that = this;
    var containers = '#coreui-table-' + table._options.id + ' > .coreui-table__container > .coreui-table__wrapper > table > tbody > tr.coreui-table__record > td.coreui-table__switch_container';

    // Показ строк
    this._table.on('show-records.coreui.table', function () {
      // Отмена обработки нажатия в switch колонках
      $(containers).click(function (event) {
        event.stopPropagation();
      });

      // События нажатия на переключатель
      if (that._options.hasOwnProperty('onChange') && (typeof that._options.onChange === 'function' || typeof that._options.onChange === 'string')) {
        $(containers + ' .coreui-table__switch[data-field="' + that._options.field + '"]').change(function (event) {
          var recordKey = $(this).val();
          var isChecked = $(this).is(':checked');
          var record = table._getRecordByKey(recordKey);
          if (typeof that._options.onChange === 'function') {
            that._options.onChange(record, isChecked, this);
          } else if (typeof that._options.onChange === 'string') {
            var id = '';
            if (record.hasOwnProperty(table._options.primaryKey)) {
              id = record[table._options.primaryKey];
            }
            var func = new Function('record', 'checked', 'id', that._options.onChange);
            func(record, this, id);
          }
          return false;
        });
      }
    });
  },
  /**
   * Получение параметров
   */
  getOptions: function getOptions() {
    return this._options;
  },
  /**
   * Формирование контента
   * @param {string} content
   * @param {object} record
   * @param {string} recordKey
   * @returns {string}
   */
  render: function render(content, record, recordKey) {
    var checked = record.hasOwnProperty(this._options.field) && record[this._options.field] === this._options.valueY ? ' checked="checked"' : '';
    return '<div class="form-switch">' + '<input class="coreui-table__switch form-check-input" type="checkbox" value="' + recordKey + '"' + checked + ' data-field="' + this._options.field + '" data-field="' + this._options.field + '">' + '</div>';
  }
};

coreuiTable$1.columns.text = {
  _table: null,
  _options: {
    type: 'text',
    field: null,
    label: null,
    width: null,
    attr: null,
    attrHeader: null,
    render: null
  },
  /**
   * Инициализация
   * @param {CoreUI.table.instance} table
   * @param {object}                options
   */
  init: function init(table, options) {
    this._table = table;
    this._options = $.extend({}, this._options, options);
  },
  /**
   * Получение параметров
   * @returns {object}
   */
  getOptions: function getOptions() {
    return this._options;
  },
  /**
   * Формирование контента
   * @param {string} content
   * @param {object} record
   * @param {string} recordKey
   * @returns {string}
   */
  render: function render(content, record, recordKey) {
    if (['string', 'bigint', 'symbol', 'number'].indexOf(_typeof(content)) < 0) {
      return '';
    }
    return String(content).replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
};

return coreuiTable$1;

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIkM6L1VzZXJzL2FkbWluL3Byb2plY3RzL2NvcmV1aS9jb3JldWktdGFibGUvbm9kZV9tb2R1bGVzL2Vqcy9lanMubWluLmpzIiwiQzovVXNlcnMvYWRtaW4vcHJvamVjdHMvY29yZXVpL2NvcmV1aS10YWJsZS9zcmMvanMvY29yZXVpLnRhYmxlLnV0aWxzLmpzIiwiQzovVXNlcnMvYWRtaW4vcHJvamVjdHMvY29yZXVpL2NvcmV1aS10YWJsZS9zcmMvanMvY29yZXVpLnRhYmxlLnRlbXBsYXRlcy5qcyIsIkM6L1VzZXJzL2FkbWluL3Byb2plY3RzL2NvcmV1aS9jb3JldWktdGFibGUvc3JjL2pzL2NvcmV1aS50YWJsZS5pbnN0YW5jZS5qcyIsIkM6L1VzZXJzL2FkbWluL3Byb2plY3RzL2NvcmV1aS9jb3JldWktdGFibGUvc3JjL2pzL2NvcmV1aS50YWJsZS5qcyIsIkM6L1VzZXJzL2FkbWluL3Byb2plY3RzL2NvcmV1aS9jb3JldWktdGFibGUvc3JjL2pzL2xhbmcvcnUuanMiLCJDOi9Vc2Vycy9hZG1pbi9wcm9qZWN0cy9jb3JldWkvY29yZXVpLXRhYmxlL3NyYy9qcy9sYW5nL2VuLmpzIiwiQzovVXNlcnMvYWRtaW4vcHJvamVjdHMvY29yZXVpL2NvcmV1aS10YWJsZS9zcmMvanMvY29udHJvbHMvYnV0dG9uLmpzIiwiQzovVXNlcnMvYWRtaW4vcHJvamVjdHMvY29yZXVpL2NvcmV1aS10YWJsZS9zcmMvanMvY29udHJvbHMvY3VzdG9tLmpzIiwiQzovVXNlcnMvYWRtaW4vcHJvamVjdHMvY29yZXVpL2NvcmV1aS10YWJsZS9zcmMvanMvY29udHJvbHMvbGluay5qcyIsIkM6L1VzZXJzL2FkbWluL3Byb2plY3RzL2NvcmV1aS9jb3JldWktdGFibGUvc3JjL2pzL2NvbHVtbnMvZGF0ZS5qcyIsIkM6L1VzZXJzL2FkbWluL3Byb2plY3RzL2NvcmV1aS9jb3JldWktdGFibGUvc3JjL2pzL2NvbHVtbnMvZGF0ZXRpbWUuanMiLCJDOi9Vc2Vycy9hZG1pbi9wcm9qZWN0cy9jb3JldWkvY29yZXVpLXRhYmxlL3NyYy9qcy9jb2x1bW5zL2h0bWwuanMiLCJDOi9Vc2Vycy9hZG1pbi9wcm9qZWN0cy9jb3JldWkvY29yZXVpLXRhYmxlL3NyYy9qcy9jb2x1bW5zL251bWJlci5qcyIsIkM6L1VzZXJzL2FkbWluL3Byb2plY3RzL2NvcmV1aS9jb3JldWktdGFibGUvc3JjL2pzL2NvbHVtbnMvbnVtYmVycy5qcyIsIkM6L1VzZXJzL2FkbWluL3Byb2plY3RzL2NvcmV1aS9jb3JldWktdGFibGUvc3JjL2pzL2NvbHVtbnMvc2VsZWN0LmpzIiwiQzovVXNlcnMvYWRtaW4vcHJvamVjdHMvY29yZXVpL2NvcmV1aS10YWJsZS9zcmMvanMvY29sdW1ucy9zd2l0Y2guanMiLCJDOi9Vc2Vycy9hZG1pbi9wcm9qZWN0cy9jb3JldWkvY29yZXVpLXRhYmxlL3NyYy9qcy9jb2x1bW5zL3RleHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKGYpe2lmKHR5cGVvZiBleHBvcnRzPT09XCJvYmplY3RcIiYmdHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCIpe21vZHVsZS5leHBvcnRzPWYoKX1lbHNlIGlmKHR5cGVvZiBkZWZpbmU9PT1cImZ1bmN0aW9uXCImJmRlZmluZS5hbWQpe2RlZmluZShbXSxmKX1lbHNle3ZhciBnO2lmKHR5cGVvZiB3aW5kb3chPT1cInVuZGVmaW5lZFwiKXtnPXdpbmRvd31lbHNlIGlmKHR5cGVvZiBnbG9iYWwhPT1cInVuZGVmaW5lZFwiKXtnPWdsb2JhbH1lbHNlIGlmKHR5cGVvZiBzZWxmIT09XCJ1bmRlZmluZWRcIil7Zz1zZWxmfWVsc2V7Zz10aGlzfWcuZWpzPWYoKX19KShmdW5jdGlvbigpe3ZhciBkZWZpbmUsbW9kdWxlLGV4cG9ydHM7cmV0dXJuIGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSgpKHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcInVzZSBzdHJpY3RcIjt2YXIgZnM9cmVxdWlyZShcImZzXCIpO3ZhciBwYXRoPXJlcXVpcmUoXCJwYXRoXCIpO3ZhciB1dGlscz1yZXF1aXJlKFwiLi91dGlsc1wiKTt2YXIgc2NvcGVPcHRpb25XYXJuZWQ9ZmFsc2U7dmFyIF9WRVJTSU9OX1NUUklORz1yZXF1aXJlKFwiLi4vcGFja2FnZS5qc29uXCIpLnZlcnNpb247dmFyIF9ERUZBVUxUX09QRU5fREVMSU1JVEVSPVwiPFwiO3ZhciBfREVGQVVMVF9DTE9TRV9ERUxJTUlURVI9XCI+XCI7dmFyIF9ERUZBVUxUX0RFTElNSVRFUj1cIiVcIjt2YXIgX0RFRkFVTFRfTE9DQUxTX05BTUU9XCJsb2NhbHNcIjt2YXIgX05BTUU9XCJlanNcIjt2YXIgX1JFR0VYX1NUUklORz1cIig8JSV8JSU+fDwlPXw8JS18PCVffDwlI3w8JXwlPnwtJT58XyU+KVwiO3ZhciBfT1BUU19QQVNTQUJMRV9XSVRIX0RBVEE9W1wiZGVsaW1pdGVyXCIsXCJzY29wZVwiLFwiY29udGV4dFwiLFwiZGVidWdcIixcImNvbXBpbGVEZWJ1Z1wiLFwiY2xpZW50XCIsXCJfd2l0aFwiLFwicm1XaGl0ZXNwYWNlXCIsXCJzdHJpY3RcIixcImZpbGVuYW1lXCIsXCJhc3luY1wiXTt2YXIgX09QVFNfUEFTU0FCTEVfV0lUSF9EQVRBX0VYUFJFU1M9X09QVFNfUEFTU0FCTEVfV0lUSF9EQVRBLmNvbmNhdChcImNhY2hlXCIpO3ZhciBfQk9NPS9eXFx1RkVGRi87dmFyIF9KU19JREVOVElGSUVSPS9eW2EtekEtWl8kXVswLTlhLXpBLVpfJF0qJC87ZXhwb3J0cy5jYWNoZT11dGlscy5jYWNoZTtleHBvcnRzLmZpbGVMb2FkZXI9ZnMucmVhZEZpbGVTeW5jO2V4cG9ydHMubG9jYWxzTmFtZT1fREVGQVVMVF9MT0NBTFNfTkFNRTtleHBvcnRzLnByb21pc2VJbXBsPW5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzO1wiKSgpLlByb21pc2U7ZXhwb3J0cy5yZXNvbHZlSW5jbHVkZT1mdW5jdGlvbihuYW1lLGZpbGVuYW1lLGlzRGlyKXt2YXIgZGlybmFtZT1wYXRoLmRpcm5hbWU7dmFyIGV4dG5hbWU9cGF0aC5leHRuYW1lO3ZhciByZXNvbHZlPXBhdGgucmVzb2x2ZTt2YXIgaW5jbHVkZVBhdGg9cmVzb2x2ZShpc0Rpcj9maWxlbmFtZTpkaXJuYW1lKGZpbGVuYW1lKSxuYW1lKTt2YXIgZXh0PWV4dG5hbWUobmFtZSk7aWYoIWV4dCl7aW5jbHVkZVBhdGgrPVwiLmVqc1wifXJldHVybiBpbmNsdWRlUGF0aH07ZnVuY3Rpb24gcmVzb2x2ZVBhdGhzKG5hbWUscGF0aHMpe3ZhciBmaWxlUGF0aDtpZihwYXRocy5zb21lKGZ1bmN0aW9uKHYpe2ZpbGVQYXRoPWV4cG9ydHMucmVzb2x2ZUluY2x1ZGUobmFtZSx2LHRydWUpO3JldHVybiBmcy5leGlzdHNTeW5jKGZpbGVQYXRoKX0pKXtyZXR1cm4gZmlsZVBhdGh9fWZ1bmN0aW9uIGdldEluY2x1ZGVQYXRoKHBhdGgsb3B0aW9ucyl7dmFyIGluY2x1ZGVQYXRoO3ZhciBmaWxlUGF0aDt2YXIgdmlld3M9b3B0aW9ucy52aWV3czt2YXIgbWF0Y2g9L15bQS1aYS16XSs6XFxcXHxeXFwvLy5leGVjKHBhdGgpO2lmKG1hdGNoJiZtYXRjaC5sZW5ndGgpe3BhdGg9cGF0aC5yZXBsYWNlKC9eXFwvKi8sXCJcIik7aWYoQXJyYXkuaXNBcnJheShvcHRpb25zLnJvb3QpKXtpbmNsdWRlUGF0aD1yZXNvbHZlUGF0aHMocGF0aCxvcHRpb25zLnJvb3QpfWVsc2V7aW5jbHVkZVBhdGg9ZXhwb3J0cy5yZXNvbHZlSW5jbHVkZShwYXRoLG9wdGlvbnMucm9vdHx8XCIvXCIsdHJ1ZSl9fWVsc2V7aWYob3B0aW9ucy5maWxlbmFtZSl7ZmlsZVBhdGg9ZXhwb3J0cy5yZXNvbHZlSW5jbHVkZShwYXRoLG9wdGlvbnMuZmlsZW5hbWUpO2lmKGZzLmV4aXN0c1N5bmMoZmlsZVBhdGgpKXtpbmNsdWRlUGF0aD1maWxlUGF0aH19aWYoIWluY2x1ZGVQYXRoJiZBcnJheS5pc0FycmF5KHZpZXdzKSl7aW5jbHVkZVBhdGg9cmVzb2x2ZVBhdGhzKHBhdGgsdmlld3MpfWlmKCFpbmNsdWRlUGF0aCYmdHlwZW9mIG9wdGlvbnMuaW5jbHVkZXIhPT1cImZ1bmN0aW9uXCIpe3Rocm93IG5ldyBFcnJvcignQ291bGQgbm90IGZpbmQgdGhlIGluY2x1ZGUgZmlsZSBcIicrb3B0aW9ucy5lc2NhcGVGdW5jdGlvbihwYXRoKSsnXCInKX19cmV0dXJuIGluY2x1ZGVQYXRofWZ1bmN0aW9uIGhhbmRsZUNhY2hlKG9wdGlvbnMsdGVtcGxhdGUpe3ZhciBmdW5jO3ZhciBmaWxlbmFtZT1vcHRpb25zLmZpbGVuYW1lO3ZhciBoYXNUZW1wbGF0ZT1hcmd1bWVudHMubGVuZ3RoPjE7aWYob3B0aW9ucy5jYWNoZSl7aWYoIWZpbGVuYW1lKXt0aHJvdyBuZXcgRXJyb3IoXCJjYWNoZSBvcHRpb24gcmVxdWlyZXMgYSBmaWxlbmFtZVwiKX1mdW5jPWV4cG9ydHMuY2FjaGUuZ2V0KGZpbGVuYW1lKTtpZihmdW5jKXtyZXR1cm4gZnVuY31pZighaGFzVGVtcGxhdGUpe3RlbXBsYXRlPWZpbGVMb2FkZXIoZmlsZW5hbWUpLnRvU3RyaW5nKCkucmVwbGFjZShfQk9NLFwiXCIpfX1lbHNlIGlmKCFoYXNUZW1wbGF0ZSl7aWYoIWZpbGVuYW1lKXt0aHJvdyBuZXcgRXJyb3IoXCJJbnRlcm5hbCBFSlMgZXJyb3I6IG5vIGZpbGUgbmFtZSBvciB0ZW1wbGF0ZSBcIitcInByb3ZpZGVkXCIpfXRlbXBsYXRlPWZpbGVMb2FkZXIoZmlsZW5hbWUpLnRvU3RyaW5nKCkucmVwbGFjZShfQk9NLFwiXCIpfWZ1bmM9ZXhwb3J0cy5jb21waWxlKHRlbXBsYXRlLG9wdGlvbnMpO2lmKG9wdGlvbnMuY2FjaGUpe2V4cG9ydHMuY2FjaGUuc2V0KGZpbGVuYW1lLGZ1bmMpfXJldHVybiBmdW5jfWZ1bmN0aW9uIHRyeUhhbmRsZUNhY2hlKG9wdGlvbnMsZGF0YSxjYil7dmFyIHJlc3VsdDtpZighY2Ipe2lmKHR5cGVvZiBleHBvcnRzLnByb21pc2VJbXBsPT1cImZ1bmN0aW9uXCIpe3JldHVybiBuZXcgZXhwb3J0cy5wcm9taXNlSW1wbChmdW5jdGlvbihyZXNvbHZlLHJlamVjdCl7dHJ5e3Jlc3VsdD1oYW5kbGVDYWNoZShvcHRpb25zKShkYXRhKTtyZXNvbHZlKHJlc3VsdCl9Y2F0Y2goZXJyKXtyZWplY3QoZXJyKX19KX1lbHNle3Rocm93IG5ldyBFcnJvcihcIlBsZWFzZSBwcm92aWRlIGEgY2FsbGJhY2sgZnVuY3Rpb25cIil9fWVsc2V7dHJ5e3Jlc3VsdD1oYW5kbGVDYWNoZShvcHRpb25zKShkYXRhKX1jYXRjaChlcnIpe3JldHVybiBjYihlcnIpfWNiKG51bGwscmVzdWx0KX19ZnVuY3Rpb24gZmlsZUxvYWRlcihmaWxlUGF0aCl7cmV0dXJuIGV4cG9ydHMuZmlsZUxvYWRlcihmaWxlUGF0aCl9ZnVuY3Rpb24gaW5jbHVkZUZpbGUocGF0aCxvcHRpb25zKXt2YXIgb3B0cz11dGlscy5zaGFsbG93Q29weSh1dGlscy5jcmVhdGVOdWxsUHJvdG9PYmpXaGVyZVBvc3NpYmxlKCksb3B0aW9ucyk7b3B0cy5maWxlbmFtZT1nZXRJbmNsdWRlUGF0aChwYXRoLG9wdHMpO2lmKHR5cGVvZiBvcHRpb25zLmluY2x1ZGVyPT09XCJmdW5jdGlvblwiKXt2YXIgaW5jbHVkZXJSZXN1bHQ9b3B0aW9ucy5pbmNsdWRlcihwYXRoLG9wdHMuZmlsZW5hbWUpO2lmKGluY2x1ZGVyUmVzdWx0KXtpZihpbmNsdWRlclJlc3VsdC5maWxlbmFtZSl7b3B0cy5maWxlbmFtZT1pbmNsdWRlclJlc3VsdC5maWxlbmFtZX1pZihpbmNsdWRlclJlc3VsdC50ZW1wbGF0ZSl7cmV0dXJuIGhhbmRsZUNhY2hlKG9wdHMsaW5jbHVkZXJSZXN1bHQudGVtcGxhdGUpfX19cmV0dXJuIGhhbmRsZUNhY2hlKG9wdHMpfWZ1bmN0aW9uIHJldGhyb3coZXJyLHN0cixmbG5tLGxpbmVubyxlc2Mpe3ZhciBsaW5lcz1zdHIuc3BsaXQoXCJcXG5cIik7dmFyIHN0YXJ0PU1hdGgubWF4KGxpbmVuby0zLDApO3ZhciBlbmQ9TWF0aC5taW4obGluZXMubGVuZ3RoLGxpbmVubyszKTt2YXIgZmlsZW5hbWU9ZXNjKGZsbm0pO3ZhciBjb250ZXh0PWxpbmVzLnNsaWNlKHN0YXJ0LGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsaSl7dmFyIGN1cnI9aStzdGFydCsxO3JldHVybihjdXJyPT1saW5lbm8/XCIgPj4gXCI6XCIgICAgXCIpK2N1cnIrXCJ8IFwiK2xpbmV9KS5qb2luKFwiXFxuXCIpO2Vyci5wYXRoPWZpbGVuYW1lO2Vyci5tZXNzYWdlPShmaWxlbmFtZXx8XCJlanNcIikrXCI6XCIrbGluZW5vK1wiXFxuXCIrY29udGV4dCtcIlxcblxcblwiK2Vyci5tZXNzYWdlO3Rocm93IGVycn1mdW5jdGlvbiBzdHJpcFNlbWkoc3RyKXtyZXR1cm4gc3RyLnJlcGxhY2UoLzsoXFxzKiQpLyxcIiQxXCIpfWV4cG9ydHMuY29tcGlsZT1mdW5jdGlvbiBjb21waWxlKHRlbXBsYXRlLG9wdHMpe3ZhciB0ZW1wbDtpZihvcHRzJiZvcHRzLnNjb3BlKXtpZighc2NvcGVPcHRpb25XYXJuZWQpe2NvbnNvbGUud2FybihcImBzY29wZWAgb3B0aW9uIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBFSlMgM1wiKTtzY29wZU9wdGlvbldhcm5lZD10cnVlfWlmKCFvcHRzLmNvbnRleHQpe29wdHMuY29udGV4dD1vcHRzLnNjb3BlfWRlbGV0ZSBvcHRzLnNjb3BlfXRlbXBsPW5ldyBUZW1wbGF0ZSh0ZW1wbGF0ZSxvcHRzKTtyZXR1cm4gdGVtcGwuY29tcGlsZSgpfTtleHBvcnRzLnJlbmRlcj1mdW5jdGlvbih0ZW1wbGF0ZSxkLG8pe3ZhciBkYXRhPWR8fHV0aWxzLmNyZWF0ZU51bGxQcm90b09ialdoZXJlUG9zc2libGUoKTt2YXIgb3B0cz1vfHx1dGlscy5jcmVhdGVOdWxsUHJvdG9PYmpXaGVyZVBvc3NpYmxlKCk7aWYoYXJndW1lbnRzLmxlbmd0aD09Mil7dXRpbHMuc2hhbGxvd0NvcHlGcm9tTGlzdChvcHRzLGRhdGEsX09QVFNfUEFTU0FCTEVfV0lUSF9EQVRBKX1yZXR1cm4gaGFuZGxlQ2FjaGUob3B0cyx0ZW1wbGF0ZSkoZGF0YSl9O2V4cG9ydHMucmVuZGVyRmlsZT1mdW5jdGlvbigpe3ZhciBhcmdzPUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7dmFyIGZpbGVuYW1lPWFyZ3Muc2hpZnQoKTt2YXIgY2I7dmFyIG9wdHM9e2ZpbGVuYW1lOmZpbGVuYW1lfTt2YXIgZGF0YTt2YXIgdmlld09wdHM7aWYodHlwZW9mIGFyZ3VtZW50c1thcmd1bWVudHMubGVuZ3RoLTFdPT1cImZ1bmN0aW9uXCIpe2NiPWFyZ3MucG9wKCl9aWYoYXJncy5sZW5ndGgpe2RhdGE9YXJncy5zaGlmdCgpO2lmKGFyZ3MubGVuZ3RoKXt1dGlscy5zaGFsbG93Q29weShvcHRzLGFyZ3MucG9wKCkpfWVsc2V7aWYoZGF0YS5zZXR0aW5ncyl7aWYoZGF0YS5zZXR0aW5ncy52aWV3cyl7b3B0cy52aWV3cz1kYXRhLnNldHRpbmdzLnZpZXdzfWlmKGRhdGEuc2V0dGluZ3NbXCJ2aWV3IGNhY2hlXCJdKXtvcHRzLmNhY2hlPXRydWV9dmlld09wdHM9ZGF0YS5zZXR0aW5nc1tcInZpZXcgb3B0aW9uc1wiXTtpZih2aWV3T3B0cyl7dXRpbHMuc2hhbGxvd0NvcHkob3B0cyx2aWV3T3B0cyl9fXV0aWxzLnNoYWxsb3dDb3B5RnJvbUxpc3Qob3B0cyxkYXRhLF9PUFRTX1BBU1NBQkxFX1dJVEhfREFUQV9FWFBSRVNTKX1vcHRzLmZpbGVuYW1lPWZpbGVuYW1lfWVsc2V7ZGF0YT11dGlscy5jcmVhdGVOdWxsUHJvdG9PYmpXaGVyZVBvc3NpYmxlKCl9cmV0dXJuIHRyeUhhbmRsZUNhY2hlKG9wdHMsZGF0YSxjYil9O2V4cG9ydHMuVGVtcGxhdGU9VGVtcGxhdGU7ZXhwb3J0cy5jbGVhckNhY2hlPWZ1bmN0aW9uKCl7ZXhwb3J0cy5jYWNoZS5yZXNldCgpfTtmdW5jdGlvbiBUZW1wbGF0ZSh0ZXh0LG9wdHMpe29wdHM9b3B0c3x8dXRpbHMuY3JlYXRlTnVsbFByb3RvT2JqV2hlcmVQb3NzaWJsZSgpO3ZhciBvcHRpb25zPXV0aWxzLmNyZWF0ZU51bGxQcm90b09ialdoZXJlUG9zc2libGUoKTt0aGlzLnRlbXBsYXRlVGV4dD10ZXh0O3RoaXMubW9kZT1udWxsO3RoaXMudHJ1bmNhdGU9ZmFsc2U7dGhpcy5jdXJyZW50TGluZT0xO3RoaXMuc291cmNlPVwiXCI7b3B0aW9ucy5jbGllbnQ9b3B0cy5jbGllbnR8fGZhbHNlO29wdGlvbnMuZXNjYXBlRnVuY3Rpb249b3B0cy5lc2NhcGV8fG9wdHMuZXNjYXBlRnVuY3Rpb258fHV0aWxzLmVzY2FwZVhNTDtvcHRpb25zLmNvbXBpbGVEZWJ1Zz1vcHRzLmNvbXBpbGVEZWJ1ZyE9PWZhbHNlO29wdGlvbnMuZGVidWc9ISFvcHRzLmRlYnVnO29wdGlvbnMuZmlsZW5hbWU9b3B0cy5maWxlbmFtZTtvcHRpb25zLm9wZW5EZWxpbWl0ZXI9b3B0cy5vcGVuRGVsaW1pdGVyfHxleHBvcnRzLm9wZW5EZWxpbWl0ZXJ8fF9ERUZBVUxUX09QRU5fREVMSU1JVEVSO29wdGlvbnMuY2xvc2VEZWxpbWl0ZXI9b3B0cy5jbG9zZURlbGltaXRlcnx8ZXhwb3J0cy5jbG9zZURlbGltaXRlcnx8X0RFRkFVTFRfQ0xPU0VfREVMSU1JVEVSO29wdGlvbnMuZGVsaW1pdGVyPW9wdHMuZGVsaW1pdGVyfHxleHBvcnRzLmRlbGltaXRlcnx8X0RFRkFVTFRfREVMSU1JVEVSO29wdGlvbnMuc3RyaWN0PW9wdHMuc3RyaWN0fHxmYWxzZTtvcHRpb25zLmNvbnRleHQ9b3B0cy5jb250ZXh0O29wdGlvbnMuY2FjaGU9b3B0cy5jYWNoZXx8ZmFsc2U7b3B0aW9ucy5ybVdoaXRlc3BhY2U9b3B0cy5ybVdoaXRlc3BhY2U7b3B0aW9ucy5yb290PW9wdHMucm9vdDtvcHRpb25zLmluY2x1ZGVyPW9wdHMuaW5jbHVkZXI7b3B0aW9ucy5vdXRwdXRGdW5jdGlvbk5hbWU9b3B0cy5vdXRwdXRGdW5jdGlvbk5hbWU7b3B0aW9ucy5sb2NhbHNOYW1lPW9wdHMubG9jYWxzTmFtZXx8ZXhwb3J0cy5sb2NhbHNOYW1lfHxfREVGQVVMVF9MT0NBTFNfTkFNRTtvcHRpb25zLnZpZXdzPW9wdHMudmlld3M7b3B0aW9ucy5hc3luYz1vcHRzLmFzeW5jO29wdGlvbnMuZGVzdHJ1Y3R1cmVkTG9jYWxzPW9wdHMuZGVzdHJ1Y3R1cmVkTG9jYWxzO29wdGlvbnMubGVnYWN5SW5jbHVkZT10eXBlb2Ygb3B0cy5sZWdhY3lJbmNsdWRlIT1cInVuZGVmaW5lZFwiPyEhb3B0cy5sZWdhY3lJbmNsdWRlOnRydWU7aWYob3B0aW9ucy5zdHJpY3Qpe29wdGlvbnMuX3dpdGg9ZmFsc2V9ZWxzZXtvcHRpb25zLl93aXRoPXR5cGVvZiBvcHRzLl93aXRoIT1cInVuZGVmaW5lZFwiP29wdHMuX3dpdGg6dHJ1ZX10aGlzLm9wdHM9b3B0aW9uczt0aGlzLnJlZ2V4PXRoaXMuY3JlYXRlUmVnZXgoKX1UZW1wbGF0ZS5tb2Rlcz17RVZBTDpcImV2YWxcIixFU0NBUEVEOlwiZXNjYXBlZFwiLFJBVzpcInJhd1wiLENPTU1FTlQ6XCJjb21tZW50XCIsTElURVJBTDpcImxpdGVyYWxcIn07VGVtcGxhdGUucHJvdG90eXBlPXtjcmVhdGVSZWdleDpmdW5jdGlvbigpe3ZhciBzdHI9X1JFR0VYX1NUUklORzt2YXIgZGVsaW09dXRpbHMuZXNjYXBlUmVnRXhwQ2hhcnModGhpcy5vcHRzLmRlbGltaXRlcik7dmFyIG9wZW49dXRpbHMuZXNjYXBlUmVnRXhwQ2hhcnModGhpcy5vcHRzLm9wZW5EZWxpbWl0ZXIpO3ZhciBjbG9zZT11dGlscy5lc2NhcGVSZWdFeHBDaGFycyh0aGlzLm9wdHMuY2xvc2VEZWxpbWl0ZXIpO3N0cj1zdHIucmVwbGFjZSgvJS9nLGRlbGltKS5yZXBsYWNlKC88L2csb3BlbikucmVwbGFjZSgvPi9nLGNsb3NlKTtyZXR1cm4gbmV3IFJlZ0V4cChzdHIpfSxjb21waWxlOmZ1bmN0aW9uKCl7dmFyIHNyYzt2YXIgZm47dmFyIG9wdHM9dGhpcy5vcHRzO3ZhciBwcmVwZW5kZWQ9XCJcIjt2YXIgYXBwZW5kZWQ9XCJcIjt2YXIgZXNjYXBlRm49b3B0cy5lc2NhcGVGdW5jdGlvbjt2YXIgY3Rvcjt2YXIgc2FuaXRpemVkRmlsZW5hbWU9b3B0cy5maWxlbmFtZT9KU09OLnN0cmluZ2lmeShvcHRzLmZpbGVuYW1lKTpcInVuZGVmaW5lZFwiO2lmKCF0aGlzLnNvdXJjZSl7dGhpcy5nZW5lcmF0ZVNvdXJjZSgpO3ByZXBlbmRlZCs9JyAgdmFyIF9fb3V0cHV0ID0gXCJcIjtcXG4nK1wiICBmdW5jdGlvbiBfX2FwcGVuZChzKSB7IGlmIChzICE9PSB1bmRlZmluZWQgJiYgcyAhPT0gbnVsbCkgX19vdXRwdXQgKz0gcyB9XFxuXCI7aWYob3B0cy5vdXRwdXRGdW5jdGlvbk5hbWUpe2lmKCFfSlNfSURFTlRJRklFUi50ZXN0KG9wdHMub3V0cHV0RnVuY3Rpb25OYW1lKSl7dGhyb3cgbmV3IEVycm9yKFwib3V0cHV0RnVuY3Rpb25OYW1lIGlzIG5vdCBhIHZhbGlkIEpTIGlkZW50aWZpZXIuXCIpfXByZXBlbmRlZCs9XCIgIHZhciBcIitvcHRzLm91dHB1dEZ1bmN0aW9uTmFtZStcIiA9IF9fYXBwZW5kO1wiK1wiXFxuXCJ9aWYob3B0cy5sb2NhbHNOYW1lJiYhX0pTX0lERU5USUZJRVIudGVzdChvcHRzLmxvY2Fsc05hbWUpKXt0aHJvdyBuZXcgRXJyb3IoXCJsb2NhbHNOYW1lIGlzIG5vdCBhIHZhbGlkIEpTIGlkZW50aWZpZXIuXCIpfWlmKG9wdHMuZGVzdHJ1Y3R1cmVkTG9jYWxzJiZvcHRzLmRlc3RydWN0dXJlZExvY2Fscy5sZW5ndGgpe3ZhciBkZXN0cnVjdHVyaW5nPVwiICB2YXIgX19sb2NhbHMgPSAoXCIrb3B0cy5sb2NhbHNOYW1lK1wiIHx8IHt9KSxcXG5cIjtmb3IodmFyIGk9MDtpPG9wdHMuZGVzdHJ1Y3R1cmVkTG9jYWxzLmxlbmd0aDtpKyspe3ZhciBuYW1lPW9wdHMuZGVzdHJ1Y3R1cmVkTG9jYWxzW2ldO2lmKCFfSlNfSURFTlRJRklFUi50ZXN0KG5hbWUpKXt0aHJvdyBuZXcgRXJyb3IoXCJkZXN0cnVjdHVyZWRMb2NhbHNbXCIraStcIl0gaXMgbm90IGEgdmFsaWQgSlMgaWRlbnRpZmllci5cIil9aWYoaT4wKXtkZXN0cnVjdHVyaW5nKz1cIixcXG4gIFwifWRlc3RydWN0dXJpbmcrPW5hbWUrXCIgPSBfX2xvY2Fscy5cIituYW1lfXByZXBlbmRlZCs9ZGVzdHJ1Y3R1cmluZytcIjtcXG5cIn1pZihvcHRzLl93aXRoIT09ZmFsc2Upe3ByZXBlbmRlZCs9XCIgIHdpdGggKFwiK29wdHMubG9jYWxzTmFtZStcIiB8fCB7fSkge1wiK1wiXFxuXCI7YXBwZW5kZWQrPVwiICB9XCIrXCJcXG5cIn1hcHBlbmRlZCs9XCIgIHJldHVybiBfX291dHB1dDtcIitcIlxcblwiO3RoaXMuc291cmNlPXByZXBlbmRlZCt0aGlzLnNvdXJjZSthcHBlbmRlZH1pZihvcHRzLmNvbXBpbGVEZWJ1Zyl7c3JjPVwidmFyIF9fbGluZSA9IDFcIitcIlxcblwiK1wiICAsIF9fbGluZXMgPSBcIitKU09OLnN0cmluZ2lmeSh0aGlzLnRlbXBsYXRlVGV4dCkrXCJcXG5cIitcIiAgLCBfX2ZpbGVuYW1lID0gXCIrc2FuaXRpemVkRmlsZW5hbWUrXCI7XCIrXCJcXG5cIitcInRyeSB7XCIrXCJcXG5cIit0aGlzLnNvdXJjZStcIn0gY2F0Y2ggKGUpIHtcIitcIlxcblwiK1wiICByZXRocm93KGUsIF9fbGluZXMsIF9fZmlsZW5hbWUsIF9fbGluZSwgZXNjYXBlRm4pO1wiK1wiXFxuXCIrXCJ9XCIrXCJcXG5cIn1lbHNle3NyYz10aGlzLnNvdXJjZX1pZihvcHRzLmNsaWVudCl7c3JjPVwiZXNjYXBlRm4gPSBlc2NhcGVGbiB8fCBcIitlc2NhcGVGbi50b1N0cmluZygpK1wiO1wiK1wiXFxuXCIrc3JjO2lmKG9wdHMuY29tcGlsZURlYnVnKXtzcmM9XCJyZXRocm93ID0gcmV0aHJvdyB8fCBcIityZXRocm93LnRvU3RyaW5nKCkrXCI7XCIrXCJcXG5cIitzcmN9fWlmKG9wdHMuc3RyaWN0KXtzcmM9J1widXNlIHN0cmljdFwiO1xcbicrc3JjfWlmKG9wdHMuZGVidWcpe2NvbnNvbGUubG9nKHNyYyl9aWYob3B0cy5jb21waWxlRGVidWcmJm9wdHMuZmlsZW5hbWUpe3NyYz1zcmMrXCJcXG5cIitcIi8vIyBzb3VyY2VVUkw9XCIrc2FuaXRpemVkRmlsZW5hbWUrXCJcXG5cIn10cnl7aWYob3B0cy5hc3luYyl7dHJ5e2N0b3I9bmV3IEZ1bmN0aW9uKFwicmV0dXJuIChhc3luYyBmdW5jdGlvbigpe30pLmNvbnN0cnVjdG9yO1wiKSgpfWNhdGNoKGUpe2lmKGUgaW5zdGFuY2VvZiBTeW50YXhFcnJvcil7dGhyb3cgbmV3IEVycm9yKFwiVGhpcyBlbnZpcm9ubWVudCBkb2VzIG5vdCBzdXBwb3J0IGFzeW5jL2F3YWl0XCIpfWVsc2V7dGhyb3cgZX19fWVsc2V7Y3Rvcj1GdW5jdGlvbn1mbj1uZXcgY3RvcihvcHRzLmxvY2Fsc05hbWUrXCIsIGVzY2FwZUZuLCBpbmNsdWRlLCByZXRocm93XCIsc3JjKX1jYXRjaChlKXtpZihlIGluc3RhbmNlb2YgU3ludGF4RXJyb3Ipe2lmKG9wdHMuZmlsZW5hbWUpe2UubWVzc2FnZSs9XCIgaW4gXCIrb3B0cy5maWxlbmFtZX1lLm1lc3NhZ2UrPVwiIHdoaWxlIGNvbXBpbGluZyBlanNcXG5cXG5cIjtlLm1lc3NhZ2UrPVwiSWYgdGhlIGFib3ZlIGVycm9yIGlzIG5vdCBoZWxwZnVsLCB5b3UgbWF5IHdhbnQgdG8gdHJ5IEVKUy1MaW50OlxcblwiO2UubWVzc2FnZSs9XCJodHRwczovL2dpdGh1Yi5jb20vUnlhblppbS9FSlMtTGludFwiO2lmKCFvcHRzLmFzeW5jKXtlLm1lc3NhZ2UrPVwiXFxuXCI7ZS5tZXNzYWdlKz1cIk9yLCBpZiB5b3UgbWVhbnQgdG8gY3JlYXRlIGFuIGFzeW5jIGZ1bmN0aW9uLCBwYXNzIGBhc3luYzogdHJ1ZWAgYXMgYW4gb3B0aW9uLlwifX10aHJvdyBlfXZhciByZXR1cm5lZEZuPW9wdHMuY2xpZW50P2ZuOmZ1bmN0aW9uIGFub255bW91cyhkYXRhKXt2YXIgaW5jbHVkZT1mdW5jdGlvbihwYXRoLGluY2x1ZGVEYXRhKXt2YXIgZD11dGlscy5zaGFsbG93Q29weSh1dGlscy5jcmVhdGVOdWxsUHJvdG9PYmpXaGVyZVBvc3NpYmxlKCksZGF0YSk7aWYoaW5jbHVkZURhdGEpe2Q9dXRpbHMuc2hhbGxvd0NvcHkoZCxpbmNsdWRlRGF0YSl9cmV0dXJuIGluY2x1ZGVGaWxlKHBhdGgsb3B0cykoZCl9O3JldHVybiBmbi5hcHBseShvcHRzLmNvbnRleHQsW2RhdGF8fHV0aWxzLmNyZWF0ZU51bGxQcm90b09ialdoZXJlUG9zc2libGUoKSxlc2NhcGVGbixpbmNsdWRlLHJldGhyb3ddKX07aWYob3B0cy5maWxlbmFtZSYmdHlwZW9mIE9iamVjdC5kZWZpbmVQcm9wZXJ0eT09PVwiZnVuY3Rpb25cIil7dmFyIGZpbGVuYW1lPW9wdHMuZmlsZW5hbWU7dmFyIGJhc2VuYW1lPXBhdGguYmFzZW5hbWUoZmlsZW5hbWUscGF0aC5leHRuYW1lKGZpbGVuYW1lKSk7dHJ5e09iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXR1cm5lZEZuLFwibmFtZVwiLHt2YWx1ZTpiYXNlbmFtZSx3cml0YWJsZTpmYWxzZSxlbnVtZXJhYmxlOmZhbHNlLGNvbmZpZ3VyYWJsZTp0cnVlfSl9Y2F0Y2goZSl7fX1yZXR1cm4gcmV0dXJuZWRGbn0sZ2VuZXJhdGVTb3VyY2U6ZnVuY3Rpb24oKXt2YXIgb3B0cz10aGlzLm9wdHM7aWYob3B0cy5ybVdoaXRlc3BhY2Upe3RoaXMudGVtcGxhdGVUZXh0PXRoaXMudGVtcGxhdGVUZXh0LnJlcGxhY2UoL1tcXHJcXG5dKy9nLFwiXFxuXCIpLnJlcGxhY2UoL15cXHMrfFxccyskL2dtLFwiXCIpfXRoaXMudGVtcGxhdGVUZXh0PXRoaXMudGVtcGxhdGVUZXh0LnJlcGxhY2UoL1sgXFx0XSo8JV8vZ20sXCI8JV9cIikucmVwbGFjZSgvXyU+WyBcXHRdKi9nbSxcIl8lPlwiKTt2YXIgc2VsZj10aGlzO3ZhciBtYXRjaGVzPXRoaXMucGFyc2VUZW1wbGF0ZVRleHQoKTt2YXIgZD10aGlzLm9wdHMuZGVsaW1pdGVyO3ZhciBvPXRoaXMub3B0cy5vcGVuRGVsaW1pdGVyO3ZhciBjPXRoaXMub3B0cy5jbG9zZURlbGltaXRlcjtpZihtYXRjaGVzJiZtYXRjaGVzLmxlbmd0aCl7bWF0Y2hlcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUsaW5kZXgpe3ZhciBjbG9zaW5nO2lmKGxpbmUuaW5kZXhPZihvK2QpPT09MCYmbGluZS5pbmRleE9mKG8rZCtkKSE9PTApe2Nsb3Npbmc9bWF0Y2hlc1tpbmRleCsyXTtpZighKGNsb3Npbmc9PWQrY3x8Y2xvc2luZz09XCItXCIrZCtjfHxjbG9zaW5nPT1cIl9cIitkK2MpKXt0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBmaW5kIG1hdGNoaW5nIGNsb3NlIHRhZyBmb3IgXCInK2xpbmUrJ1wiLicpfX1zZWxmLnNjYW5MaW5lKGxpbmUpfSl9fSxwYXJzZVRlbXBsYXRlVGV4dDpmdW5jdGlvbigpe3ZhciBzdHI9dGhpcy50ZW1wbGF0ZVRleHQ7dmFyIHBhdD10aGlzLnJlZ2V4O3ZhciByZXN1bHQ9cGF0LmV4ZWMoc3RyKTt2YXIgYXJyPVtdO3ZhciBmaXJzdFBvczt3aGlsZShyZXN1bHQpe2ZpcnN0UG9zPXJlc3VsdC5pbmRleDtpZihmaXJzdFBvcyE9PTApe2Fyci5wdXNoKHN0ci5zdWJzdHJpbmcoMCxmaXJzdFBvcykpO3N0cj1zdHIuc2xpY2UoZmlyc3RQb3MpfWFyci5wdXNoKHJlc3VsdFswXSk7c3RyPXN0ci5zbGljZShyZXN1bHRbMF0ubGVuZ3RoKTtyZXN1bHQ9cGF0LmV4ZWMoc3RyKX1pZihzdHIpe2Fyci5wdXNoKHN0cil9cmV0dXJuIGFycn0sX2FkZE91dHB1dDpmdW5jdGlvbihsaW5lKXtpZih0aGlzLnRydW5jYXRlKXtsaW5lPWxpbmUucmVwbGFjZSgvXig/OlxcclxcbnxcXHJ8XFxuKS8sXCJcIik7dGhpcy50cnVuY2F0ZT1mYWxzZX1pZighbGluZSl7cmV0dXJuIGxpbmV9bGluZT1saW5lLnJlcGxhY2UoL1xcXFwvZyxcIlxcXFxcXFxcXCIpO2xpbmU9bGluZS5yZXBsYWNlKC9cXG4vZyxcIlxcXFxuXCIpO2xpbmU9bGluZS5yZXBsYWNlKC9cXHIvZyxcIlxcXFxyXCIpO2xpbmU9bGluZS5yZXBsYWNlKC9cIi9nLCdcXFxcXCInKTt0aGlzLnNvdXJjZSs9JyAgICA7IF9fYXBwZW5kKFwiJytsaW5lKydcIiknK1wiXFxuXCJ9LHNjYW5MaW5lOmZ1bmN0aW9uKGxpbmUpe3ZhciBzZWxmPXRoaXM7dmFyIGQ9dGhpcy5vcHRzLmRlbGltaXRlcjt2YXIgbz10aGlzLm9wdHMub3BlbkRlbGltaXRlcjt2YXIgYz10aGlzLm9wdHMuY2xvc2VEZWxpbWl0ZXI7dmFyIG5ld0xpbmVDb3VudD0wO25ld0xpbmVDb3VudD1saW5lLnNwbGl0KFwiXFxuXCIpLmxlbmd0aC0xO3N3aXRjaChsaW5lKXtjYXNlIG8rZDpjYXNlIG8rZCtcIl9cIjp0aGlzLm1vZGU9VGVtcGxhdGUubW9kZXMuRVZBTDticmVhaztjYXNlIG8rZCtcIj1cIjp0aGlzLm1vZGU9VGVtcGxhdGUubW9kZXMuRVNDQVBFRDticmVhaztjYXNlIG8rZCtcIi1cIjp0aGlzLm1vZGU9VGVtcGxhdGUubW9kZXMuUkFXO2JyZWFrO2Nhc2UgbytkK1wiI1wiOnRoaXMubW9kZT1UZW1wbGF0ZS5tb2Rlcy5DT01NRU5UO2JyZWFrO2Nhc2UgbytkK2Q6dGhpcy5tb2RlPVRlbXBsYXRlLm1vZGVzLkxJVEVSQUw7dGhpcy5zb3VyY2UrPScgICAgOyBfX2FwcGVuZChcIicrbGluZS5yZXBsYWNlKG8rZCtkLG8rZCkrJ1wiKScrXCJcXG5cIjticmVhaztjYXNlIGQrZCtjOnRoaXMubW9kZT1UZW1wbGF0ZS5tb2Rlcy5MSVRFUkFMO3RoaXMuc291cmNlKz0nICAgIDsgX19hcHBlbmQoXCInK2xpbmUucmVwbGFjZShkK2QrYyxkK2MpKydcIiknK1wiXFxuXCI7YnJlYWs7Y2FzZSBkK2M6Y2FzZVwiLVwiK2QrYzpjYXNlXCJfXCIrZCtjOmlmKHRoaXMubW9kZT09VGVtcGxhdGUubW9kZXMuTElURVJBTCl7dGhpcy5fYWRkT3V0cHV0KGxpbmUpfXRoaXMubW9kZT1udWxsO3RoaXMudHJ1bmNhdGU9bGluZS5pbmRleE9mKFwiLVwiKT09PTB8fGxpbmUuaW5kZXhPZihcIl9cIik9PT0wO2JyZWFrO2RlZmF1bHQ6aWYodGhpcy5tb2RlKXtzd2l0Y2godGhpcy5tb2RlKXtjYXNlIFRlbXBsYXRlLm1vZGVzLkVWQUw6Y2FzZSBUZW1wbGF0ZS5tb2Rlcy5FU0NBUEVEOmNhc2UgVGVtcGxhdGUubW9kZXMuUkFXOmlmKGxpbmUubGFzdEluZGV4T2YoXCIvL1wiKT5saW5lLmxhc3RJbmRleE9mKFwiXFxuXCIpKXtsaW5lKz1cIlxcblwifX1zd2l0Y2godGhpcy5tb2RlKXtjYXNlIFRlbXBsYXRlLm1vZGVzLkVWQUw6dGhpcy5zb3VyY2UrPVwiICAgIDsgXCIrbGluZStcIlxcblwiO2JyZWFrO2Nhc2UgVGVtcGxhdGUubW9kZXMuRVNDQVBFRDp0aGlzLnNvdXJjZSs9XCIgICAgOyBfX2FwcGVuZChlc2NhcGVGbihcIitzdHJpcFNlbWkobGluZSkrXCIpKVwiK1wiXFxuXCI7YnJlYWs7Y2FzZSBUZW1wbGF0ZS5tb2Rlcy5SQVc6dGhpcy5zb3VyY2UrPVwiICAgIDsgX19hcHBlbmQoXCIrc3RyaXBTZW1pKGxpbmUpK1wiKVwiK1wiXFxuXCI7YnJlYWs7Y2FzZSBUZW1wbGF0ZS5tb2Rlcy5DT01NRU5UOmJyZWFrO2Nhc2UgVGVtcGxhdGUubW9kZXMuTElURVJBTDp0aGlzLl9hZGRPdXRwdXQobGluZSk7YnJlYWt9fWVsc2V7dGhpcy5fYWRkT3V0cHV0KGxpbmUpfX1pZihzZWxmLm9wdHMuY29tcGlsZURlYnVnJiZuZXdMaW5lQ291bnQpe3RoaXMuY3VycmVudExpbmUrPW5ld0xpbmVDb3VudDt0aGlzLnNvdXJjZSs9XCIgICAgOyBfX2xpbmUgPSBcIit0aGlzLmN1cnJlbnRMaW5lK1wiXFxuXCJ9fX07ZXhwb3J0cy5lc2NhcGVYTUw9dXRpbHMuZXNjYXBlWE1MO2V4cG9ydHMuX19leHByZXNzPWV4cG9ydHMucmVuZGVyRmlsZTtleHBvcnRzLlZFUlNJT049X1ZFUlNJT05fU1RSSU5HO2V4cG9ydHMubmFtZT1fTkFNRTtpZih0eXBlb2Ygd2luZG93IT1cInVuZGVmaW5lZFwiKXt3aW5kb3cuZWpzPWV4cG9ydHN9fSx7XCIuLi9wYWNrYWdlLmpzb25cIjo2LFwiLi91dGlsc1wiOjIsZnM6MyxwYXRoOjR9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcInVzZSBzdHJpY3RcIjt2YXIgcmVnRXhwQ2hhcnM9L1t8XFxcXHt9KClbXFxdXiQrKj8uXS9nO3ZhciBoYXNPd25Qcm9wZXJ0eT1PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O3ZhciBoYXNPd249ZnVuY3Rpb24ob2JqLGtleSl7cmV0dXJuIGhhc093blByb3BlcnR5LmFwcGx5KG9iaixba2V5XSl9O2V4cG9ydHMuZXNjYXBlUmVnRXhwQ2hhcnM9ZnVuY3Rpb24oc3RyaW5nKXtpZighc3RyaW5nKXtyZXR1cm5cIlwifXJldHVybiBTdHJpbmcoc3RyaW5nKS5yZXBsYWNlKHJlZ0V4cENoYXJzLFwiXFxcXCQmXCIpfTt2YXIgX0VOQ09ERV9IVE1MX1JVTEVTPXtcIiZcIjpcIiZhbXA7XCIsXCI8XCI6XCImbHQ7XCIsXCI+XCI6XCImZ3Q7XCIsJ1wiJzpcIiYjMzQ7XCIsXCInXCI6XCImIzM5O1wifTt2YXIgX01BVENIX0hUTUw9L1smPD4nXCJdL2c7ZnVuY3Rpb24gZW5jb2RlX2NoYXIoYyl7cmV0dXJuIF9FTkNPREVfSFRNTF9SVUxFU1tjXXx8Y312YXIgZXNjYXBlRnVuY1N0cj1cInZhciBfRU5DT0RFX0hUTUxfUlVMRVMgPSB7XFxuXCIrJyAgICAgIFwiJlwiOiBcIiZhbXA7XCJcXG4nKycgICAgLCBcIjxcIjogXCImbHQ7XCJcXG4nKycgICAgLCBcIj5cIjogXCImZ3Q7XCJcXG4nKycgICAgLCBcXCdcIlxcJzogXCImIzM0O1wiXFxuJysnICAgICwgXCJcXCdcIjogXCImIzM5O1wiXFxuJytcIiAgICB9XFxuXCIrXCIgICwgX01BVENIX0hUTUwgPSAvWyY8PidcXFwiXS9nO1xcblwiK1wiZnVuY3Rpb24gZW5jb2RlX2NoYXIoYykge1xcblwiK1wiICByZXR1cm4gX0VOQ09ERV9IVE1MX1JVTEVTW2NdIHx8IGM7XFxuXCIrXCJ9O1xcblwiO2V4cG9ydHMuZXNjYXBlWE1MPWZ1bmN0aW9uKG1hcmt1cCl7cmV0dXJuIG1hcmt1cD09dW5kZWZpbmVkP1wiXCI6U3RyaW5nKG1hcmt1cCkucmVwbGFjZShfTUFUQ0hfSFRNTCxlbmNvZGVfY2hhcil9O2Z1bmN0aW9uIGVzY2FwZVhNTFRvU3RyaW5nKCl7cmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRoaXMpK1wiO1xcblwiK2VzY2FwZUZ1bmNTdHJ9dHJ5e2lmKHR5cGVvZiBPYmplY3QuZGVmaW5lUHJvcGVydHk9PT1cImZ1bmN0aW9uXCIpe09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLmVzY2FwZVhNTCxcInRvU3RyaW5nXCIse3ZhbHVlOmVzY2FwZVhNTFRvU3RyaW5nfSl9ZWxzZXtleHBvcnRzLmVzY2FwZVhNTC50b1N0cmluZz1lc2NhcGVYTUxUb1N0cmluZ319Y2F0Y2goZXJyKXtjb25zb2xlLndhcm4oXCJVbmFibGUgdG8gc2V0IGVzY2FwZVhNTC50b1N0cmluZyAoaXMgdGhlIEZ1bmN0aW9uIHByb3RvdHlwZSBmcm96ZW4/KVwiKX1leHBvcnRzLnNoYWxsb3dDb3B5PWZ1bmN0aW9uKHRvLGZyb20pe2Zyb209ZnJvbXx8e307aWYodG8hPT1udWxsJiZ0byE9PXVuZGVmaW5lZCl7Zm9yKHZhciBwIGluIGZyb20pe2lmKCFoYXNPd24oZnJvbSxwKSl7Y29udGludWV9aWYocD09PVwiX19wcm90b19fXCJ8fHA9PT1cImNvbnN0cnVjdG9yXCIpe2NvbnRpbnVlfXRvW3BdPWZyb21bcF19fXJldHVybiB0b307ZXhwb3J0cy5zaGFsbG93Q29weUZyb21MaXN0PWZ1bmN0aW9uKHRvLGZyb20sbGlzdCl7bGlzdD1saXN0fHxbXTtmcm9tPWZyb218fHt9O2lmKHRvIT09bnVsbCYmdG8hPT11bmRlZmluZWQpe2Zvcih2YXIgaT0wO2k8bGlzdC5sZW5ndGg7aSsrKXt2YXIgcD1saXN0W2ldO2lmKHR5cGVvZiBmcm9tW3BdIT1cInVuZGVmaW5lZFwiKXtpZighaGFzT3duKGZyb20scCkpe2NvbnRpbnVlfWlmKHA9PT1cIl9fcHJvdG9fX1wifHxwPT09XCJjb25zdHJ1Y3RvclwiKXtjb250aW51ZX10b1twXT1mcm9tW3BdfX19cmV0dXJuIHRvfTtleHBvcnRzLmNhY2hlPXtfZGF0YTp7fSxzZXQ6ZnVuY3Rpb24oa2V5LHZhbCl7dGhpcy5fZGF0YVtrZXldPXZhbH0sZ2V0OmZ1bmN0aW9uKGtleSl7cmV0dXJuIHRoaXMuX2RhdGFba2V5XX0scmVtb3ZlOmZ1bmN0aW9uKGtleSl7ZGVsZXRlIHRoaXMuX2RhdGFba2V5XX0scmVzZXQ6ZnVuY3Rpb24oKXt0aGlzLl9kYXRhPXt9fX07ZXhwb3J0cy5oeXBoZW5Ub0NhbWVsPWZ1bmN0aW9uKHN0cil7cmV0dXJuIHN0ci5yZXBsYWNlKC8tW2Etel0vZyxmdW5jdGlvbihtYXRjaCl7cmV0dXJuIG1hdGNoWzFdLnRvVXBwZXJDYXNlKCl9KX07ZXhwb3J0cy5jcmVhdGVOdWxsUHJvdG9PYmpXaGVyZVBvc3NpYmxlPWZ1bmN0aW9uKCl7aWYodHlwZW9mIE9iamVjdC5jcmVhdGU9PVwiZnVuY3Rpb25cIil7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIE9iamVjdC5jcmVhdGUobnVsbCl9fWlmKCEoe19fcHJvdG9fXzpudWxsfWluc3RhbmNlb2YgT2JqZWN0KSl7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJue19fcHJvdG9fXzpudWxsfX19cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJue319fSgpfSx7fV0sMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7fSx7fV0sNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7KGZ1bmN0aW9uKHByb2Nlc3Mpe2Z1bmN0aW9uIG5vcm1hbGl6ZUFycmF5KHBhcnRzLGFsbG93QWJvdmVSb290KXt2YXIgdXA9MDtmb3IodmFyIGk9cGFydHMubGVuZ3RoLTE7aT49MDtpLS0pe3ZhciBsYXN0PXBhcnRzW2ldO2lmKGxhc3Q9PT1cIi5cIil7cGFydHMuc3BsaWNlKGksMSl9ZWxzZSBpZihsYXN0PT09XCIuLlwiKXtwYXJ0cy5zcGxpY2UoaSwxKTt1cCsrfWVsc2UgaWYodXApe3BhcnRzLnNwbGljZShpLDEpO3VwLS19fWlmKGFsbG93QWJvdmVSb290KXtmb3IoO3VwLS07dXApe3BhcnRzLnVuc2hpZnQoXCIuLlwiKX19cmV0dXJuIHBhcnRzfWV4cG9ydHMucmVzb2x2ZT1mdW5jdGlvbigpe3ZhciByZXNvbHZlZFBhdGg9XCJcIixyZXNvbHZlZEFic29sdXRlPWZhbHNlO2Zvcih2YXIgaT1hcmd1bWVudHMubGVuZ3RoLTE7aT49LTEmJiFyZXNvbHZlZEFic29sdXRlO2ktLSl7dmFyIHBhdGg9aT49MD9hcmd1bWVudHNbaV06cHJvY2Vzcy5jd2QoKTtpZih0eXBlb2YgcGF0aCE9PVwic3RyaW5nXCIpe3Rocm93IG5ldyBUeXBlRXJyb3IoXCJBcmd1bWVudHMgdG8gcGF0aC5yZXNvbHZlIG11c3QgYmUgc3RyaW5nc1wiKX1lbHNlIGlmKCFwYXRoKXtjb250aW51ZX1yZXNvbHZlZFBhdGg9cGF0aCtcIi9cIityZXNvbHZlZFBhdGg7cmVzb2x2ZWRBYnNvbHV0ZT1wYXRoLmNoYXJBdCgwKT09PVwiL1wifXJlc29sdmVkUGF0aD1ub3JtYWxpemVBcnJheShmaWx0ZXIocmVzb2x2ZWRQYXRoLnNwbGl0KFwiL1wiKSxmdW5jdGlvbihwKXtyZXR1cm4hIXB9KSwhcmVzb2x2ZWRBYnNvbHV0ZSkuam9pbihcIi9cIik7cmV0dXJuKHJlc29sdmVkQWJzb2x1dGU/XCIvXCI6XCJcIikrcmVzb2x2ZWRQYXRofHxcIi5cIn07ZXhwb3J0cy5ub3JtYWxpemU9ZnVuY3Rpb24ocGF0aCl7dmFyIGlzQWJzb2x1dGU9ZXhwb3J0cy5pc0Fic29sdXRlKHBhdGgpLHRyYWlsaW5nU2xhc2g9c3Vic3RyKHBhdGgsLTEpPT09XCIvXCI7cGF0aD1ub3JtYWxpemVBcnJheShmaWx0ZXIocGF0aC5zcGxpdChcIi9cIiksZnVuY3Rpb24ocCl7cmV0dXJuISFwfSksIWlzQWJzb2x1dGUpLmpvaW4oXCIvXCIpO2lmKCFwYXRoJiYhaXNBYnNvbHV0ZSl7cGF0aD1cIi5cIn1pZihwYXRoJiZ0cmFpbGluZ1NsYXNoKXtwYXRoKz1cIi9cIn1yZXR1cm4oaXNBYnNvbHV0ZT9cIi9cIjpcIlwiKStwYXRofTtleHBvcnRzLmlzQWJzb2x1dGU9ZnVuY3Rpb24ocGF0aCl7cmV0dXJuIHBhdGguY2hhckF0KDApPT09XCIvXCJ9O2V4cG9ydHMuam9pbj1mdW5jdGlvbigpe3ZhciBwYXRocz1BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsMCk7cmV0dXJuIGV4cG9ydHMubm9ybWFsaXplKGZpbHRlcihwYXRocyxmdW5jdGlvbihwLGluZGV4KXtpZih0eXBlb2YgcCE9PVwic3RyaW5nXCIpe3Rocm93IG5ldyBUeXBlRXJyb3IoXCJBcmd1bWVudHMgdG8gcGF0aC5qb2luIG11c3QgYmUgc3RyaW5nc1wiKX1yZXR1cm4gcH0pLmpvaW4oXCIvXCIpKX07ZXhwb3J0cy5yZWxhdGl2ZT1mdW5jdGlvbihmcm9tLHRvKXtmcm9tPWV4cG9ydHMucmVzb2x2ZShmcm9tKS5zdWJzdHIoMSk7dG89ZXhwb3J0cy5yZXNvbHZlKHRvKS5zdWJzdHIoMSk7ZnVuY3Rpb24gdHJpbShhcnIpe3ZhciBzdGFydD0wO2Zvcig7c3RhcnQ8YXJyLmxlbmd0aDtzdGFydCsrKXtpZihhcnJbc3RhcnRdIT09XCJcIilicmVha312YXIgZW5kPWFyci5sZW5ndGgtMTtmb3IoO2VuZD49MDtlbmQtLSl7aWYoYXJyW2VuZF0hPT1cIlwiKWJyZWFrfWlmKHN0YXJ0PmVuZClyZXR1cm5bXTtyZXR1cm4gYXJyLnNsaWNlKHN0YXJ0LGVuZC1zdGFydCsxKX12YXIgZnJvbVBhcnRzPXRyaW0oZnJvbS5zcGxpdChcIi9cIikpO3ZhciB0b1BhcnRzPXRyaW0odG8uc3BsaXQoXCIvXCIpKTt2YXIgbGVuZ3RoPU1hdGgubWluKGZyb21QYXJ0cy5sZW5ndGgsdG9QYXJ0cy5sZW5ndGgpO3ZhciBzYW1lUGFydHNMZW5ndGg9bGVuZ3RoO2Zvcih2YXIgaT0wO2k8bGVuZ3RoO2krKyl7aWYoZnJvbVBhcnRzW2ldIT09dG9QYXJ0c1tpXSl7c2FtZVBhcnRzTGVuZ3RoPWk7YnJlYWt9fXZhciBvdXRwdXRQYXJ0cz1bXTtmb3IodmFyIGk9c2FtZVBhcnRzTGVuZ3RoO2k8ZnJvbVBhcnRzLmxlbmd0aDtpKyspe291dHB1dFBhcnRzLnB1c2goXCIuLlwiKX1vdXRwdXRQYXJ0cz1vdXRwdXRQYXJ0cy5jb25jYXQodG9QYXJ0cy5zbGljZShzYW1lUGFydHNMZW5ndGgpKTtyZXR1cm4gb3V0cHV0UGFydHMuam9pbihcIi9cIil9O2V4cG9ydHMuc2VwPVwiL1wiO2V4cG9ydHMuZGVsaW1pdGVyPVwiOlwiO2V4cG9ydHMuZGlybmFtZT1mdW5jdGlvbihwYXRoKXtpZih0eXBlb2YgcGF0aCE9PVwic3RyaW5nXCIpcGF0aD1wYXRoK1wiXCI7aWYocGF0aC5sZW5ndGg9PT0wKXJldHVyblwiLlwiO3ZhciBjb2RlPXBhdGguY2hhckNvZGVBdCgwKTt2YXIgaGFzUm9vdD1jb2RlPT09NDc7dmFyIGVuZD0tMTt2YXIgbWF0Y2hlZFNsYXNoPXRydWU7Zm9yKHZhciBpPXBhdGgubGVuZ3RoLTE7aT49MTstLWkpe2NvZGU9cGF0aC5jaGFyQ29kZUF0KGkpO2lmKGNvZGU9PT00Nyl7aWYoIW1hdGNoZWRTbGFzaCl7ZW5kPWk7YnJlYWt9fWVsc2V7bWF0Y2hlZFNsYXNoPWZhbHNlfX1pZihlbmQ9PT0tMSlyZXR1cm4gaGFzUm9vdD9cIi9cIjpcIi5cIjtpZihoYXNSb290JiZlbmQ9PT0xKXtyZXR1cm5cIi9cIn1yZXR1cm4gcGF0aC5zbGljZSgwLGVuZCl9O2Z1bmN0aW9uIGJhc2VuYW1lKHBhdGgpe2lmKHR5cGVvZiBwYXRoIT09XCJzdHJpbmdcIilwYXRoPXBhdGgrXCJcIjt2YXIgc3RhcnQ9MDt2YXIgZW5kPS0xO3ZhciBtYXRjaGVkU2xhc2g9dHJ1ZTt2YXIgaTtmb3IoaT1wYXRoLmxlbmd0aC0xO2k+PTA7LS1pKXtpZihwYXRoLmNoYXJDb2RlQXQoaSk9PT00Nyl7aWYoIW1hdGNoZWRTbGFzaCl7c3RhcnQ9aSsxO2JyZWFrfX1lbHNlIGlmKGVuZD09PS0xKXttYXRjaGVkU2xhc2g9ZmFsc2U7ZW5kPWkrMX19aWYoZW5kPT09LTEpcmV0dXJuXCJcIjtyZXR1cm4gcGF0aC5zbGljZShzdGFydCxlbmQpfWV4cG9ydHMuYmFzZW5hbWU9ZnVuY3Rpb24ocGF0aCxleHQpe3ZhciBmPWJhc2VuYW1lKHBhdGgpO2lmKGV4dCYmZi5zdWJzdHIoLTEqZXh0Lmxlbmd0aCk9PT1leHQpe2Y9Zi5zdWJzdHIoMCxmLmxlbmd0aC1leHQubGVuZ3RoKX1yZXR1cm4gZn07ZXhwb3J0cy5leHRuYW1lPWZ1bmN0aW9uKHBhdGgpe2lmKHR5cGVvZiBwYXRoIT09XCJzdHJpbmdcIilwYXRoPXBhdGgrXCJcIjt2YXIgc3RhcnREb3Q9LTE7dmFyIHN0YXJ0UGFydD0wO3ZhciBlbmQ9LTE7dmFyIG1hdGNoZWRTbGFzaD10cnVlO3ZhciBwcmVEb3RTdGF0ZT0wO2Zvcih2YXIgaT1wYXRoLmxlbmd0aC0xO2k+PTA7LS1pKXt2YXIgY29kZT1wYXRoLmNoYXJDb2RlQXQoaSk7aWYoY29kZT09PTQ3KXtpZighbWF0Y2hlZFNsYXNoKXtzdGFydFBhcnQ9aSsxO2JyZWFrfWNvbnRpbnVlfWlmKGVuZD09PS0xKXttYXRjaGVkU2xhc2g9ZmFsc2U7ZW5kPWkrMX1pZihjb2RlPT09NDYpe2lmKHN0YXJ0RG90PT09LTEpc3RhcnREb3Q9aTtlbHNlIGlmKHByZURvdFN0YXRlIT09MSlwcmVEb3RTdGF0ZT0xfWVsc2UgaWYoc3RhcnREb3QhPT0tMSl7cHJlRG90U3RhdGU9LTF9fWlmKHN0YXJ0RG90PT09LTF8fGVuZD09PS0xfHxwcmVEb3RTdGF0ZT09PTB8fHByZURvdFN0YXRlPT09MSYmc3RhcnREb3Q9PT1lbmQtMSYmc3RhcnREb3Q9PT1zdGFydFBhcnQrMSl7cmV0dXJuXCJcIn1yZXR1cm4gcGF0aC5zbGljZShzdGFydERvdCxlbmQpfTtmdW5jdGlvbiBmaWx0ZXIoeHMsZil7aWYoeHMuZmlsdGVyKXJldHVybiB4cy5maWx0ZXIoZik7dmFyIHJlcz1bXTtmb3IodmFyIGk9MDtpPHhzLmxlbmd0aDtpKyspe2lmKGYoeHNbaV0saSx4cykpcmVzLnB1c2goeHNbaV0pfXJldHVybiByZXN9dmFyIHN1YnN0cj1cImFiXCIuc3Vic3RyKC0xKT09PVwiYlwiP2Z1bmN0aW9uKHN0cixzdGFydCxsZW4pe3JldHVybiBzdHIuc3Vic3RyKHN0YXJ0LGxlbil9OmZ1bmN0aW9uKHN0cixzdGFydCxsZW4pe2lmKHN0YXJ0PDApc3RhcnQ9c3RyLmxlbmd0aCtzdGFydDtyZXR1cm4gc3RyLnN1YnN0cihzdGFydCxsZW4pfX0pLmNhbGwodGhpcyxyZXF1aXJlKFwiX3Byb2Nlc3NcIikpfSx7X3Byb2Nlc3M6NX1dLDU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe3ZhciBwcm9jZXNzPW1vZHVsZS5leHBvcnRzPXt9O3ZhciBjYWNoZWRTZXRUaW1lb3V0O3ZhciBjYWNoZWRDbGVhclRpbWVvdXQ7ZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpe3Rocm93IG5ldyBFcnJvcihcInNldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWRcIil9ZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCgpe3Rocm93IG5ldyBFcnJvcihcImNsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZFwiKX0oZnVuY3Rpb24oKXt0cnl7aWYodHlwZW9mIHNldFRpbWVvdXQ9PT1cImZ1bmN0aW9uXCIpe2NhY2hlZFNldFRpbWVvdXQ9c2V0VGltZW91dH1lbHNle2NhY2hlZFNldFRpbWVvdXQ9ZGVmYXVsdFNldFRpbW91dH19Y2F0Y2goZSl7Y2FjaGVkU2V0VGltZW91dD1kZWZhdWx0U2V0VGltb3V0fXRyeXtpZih0eXBlb2YgY2xlYXJUaW1lb3V0PT09XCJmdW5jdGlvblwiKXtjYWNoZWRDbGVhclRpbWVvdXQ9Y2xlYXJUaW1lb3V0fWVsc2V7Y2FjaGVkQ2xlYXJUaW1lb3V0PWRlZmF1bHRDbGVhclRpbWVvdXR9fWNhdGNoKGUpe2NhY2hlZENsZWFyVGltZW91dD1kZWZhdWx0Q2xlYXJUaW1lb3V0fX0pKCk7ZnVuY3Rpb24gcnVuVGltZW91dChmdW4pe2lmKGNhY2hlZFNldFRpbWVvdXQ9PT1zZXRUaW1lb3V0KXtyZXR1cm4gc2V0VGltZW91dChmdW4sMCl9aWYoKGNhY2hlZFNldFRpbWVvdXQ9PT1kZWZhdWx0U2V0VGltb3V0fHwhY2FjaGVkU2V0VGltZW91dCkmJnNldFRpbWVvdXQpe2NhY2hlZFNldFRpbWVvdXQ9c2V0VGltZW91dDtyZXR1cm4gc2V0VGltZW91dChmdW4sMCl9dHJ5e3JldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwwKX1jYXRjaChlKXt0cnl7cmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLGZ1biwwKX1jYXRjaChlKXtyZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsZnVuLDApfX19ZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcil7aWYoY2FjaGVkQ2xlYXJUaW1lb3V0PT09Y2xlYXJUaW1lb3V0KXtyZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcil9aWYoKGNhY2hlZENsZWFyVGltZW91dD09PWRlZmF1bHRDbGVhclRpbWVvdXR8fCFjYWNoZWRDbGVhclRpbWVvdXQpJiZjbGVhclRpbWVvdXQpe2NhY2hlZENsZWFyVGltZW91dD1jbGVhclRpbWVvdXQ7cmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpfXRyeXtyZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcil9Y2F0Y2goZSl7dHJ5e3JldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLG1hcmtlcil9Y2F0Y2goZSl7cmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsbWFya2VyKX19fXZhciBxdWV1ZT1bXTt2YXIgZHJhaW5pbmc9ZmFsc2U7dmFyIGN1cnJlbnRRdWV1ZTt2YXIgcXVldWVJbmRleD0tMTtmdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKXtpZighZHJhaW5pbmd8fCFjdXJyZW50UXVldWUpe3JldHVybn1kcmFpbmluZz1mYWxzZTtpZihjdXJyZW50UXVldWUubGVuZ3RoKXtxdWV1ZT1jdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKX1lbHNle3F1ZXVlSW5kZXg9LTF9aWYocXVldWUubGVuZ3RoKXtkcmFpblF1ZXVlKCl9fWZ1bmN0aW9uIGRyYWluUXVldWUoKXtpZihkcmFpbmluZyl7cmV0dXJufXZhciB0aW1lb3V0PXJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtkcmFpbmluZz10cnVlO3ZhciBsZW49cXVldWUubGVuZ3RoO3doaWxlKGxlbil7Y3VycmVudFF1ZXVlPXF1ZXVlO3F1ZXVlPVtdO3doaWxlKCsrcXVldWVJbmRleDxsZW4pe2lmKGN1cnJlbnRRdWV1ZSl7Y3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpfX1xdWV1ZUluZGV4PS0xO2xlbj1xdWV1ZS5sZW5ndGh9Y3VycmVudFF1ZXVlPW51bGw7ZHJhaW5pbmc9ZmFsc2U7cnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpfXByb2Nlc3MubmV4dFRpY2s9ZnVuY3Rpb24oZnVuKXt2YXIgYXJncz1uZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aC0xKTtpZihhcmd1bWVudHMubGVuZ3RoPjEpe2Zvcih2YXIgaT0xO2k8YXJndW1lbnRzLmxlbmd0aDtpKyspe2FyZ3NbaS0xXT1hcmd1bWVudHNbaV19fXF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLGFyZ3MpKTtpZihxdWV1ZS5sZW5ndGg9PT0xJiYhZHJhaW5pbmcpe3J1blRpbWVvdXQoZHJhaW5RdWV1ZSl9fTtmdW5jdGlvbiBJdGVtKGZ1bixhcnJheSl7dGhpcy5mdW49ZnVuO3RoaXMuYXJyYXk9YXJyYXl9SXRlbS5wcm90b3R5cGUucnVuPWZ1bmN0aW9uKCl7dGhpcy5mdW4uYXBwbHkobnVsbCx0aGlzLmFycmF5KX07cHJvY2Vzcy50aXRsZT1cImJyb3dzZXJcIjtwcm9jZXNzLmJyb3dzZXI9dHJ1ZTtwcm9jZXNzLmVudj17fTtwcm9jZXNzLmFyZ3Y9W107cHJvY2Vzcy52ZXJzaW9uPVwiXCI7cHJvY2Vzcy52ZXJzaW9ucz17fTtmdW5jdGlvbiBub29wKCl7fXByb2Nlc3Mub249bm9vcDtwcm9jZXNzLmFkZExpc3RlbmVyPW5vb3A7cHJvY2Vzcy5vbmNlPW5vb3A7cHJvY2Vzcy5vZmY9bm9vcDtwcm9jZXNzLnJlbW92ZUxpc3RlbmVyPW5vb3A7cHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnM9bm9vcDtwcm9jZXNzLmVtaXQ9bm9vcDtwcm9jZXNzLnByZXBlbmRMaXN0ZW5lcj1ub29wO3Byb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lcj1ub29wO3Byb2Nlc3MubGlzdGVuZXJzPWZ1bmN0aW9uKG5hbWUpe3JldHVybltdfTtwcm9jZXNzLmJpbmRpbmc9ZnVuY3Rpb24obmFtZSl7dGhyb3cgbmV3IEVycm9yKFwicHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWRcIil9O3Byb2Nlc3MuY3dkPWZ1bmN0aW9uKCl7cmV0dXJuXCIvXCJ9O3Byb2Nlc3MuY2hkaXI9ZnVuY3Rpb24oZGlyKXt0aHJvdyBuZXcgRXJyb3IoXCJwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWRcIil9O3Byb2Nlc3MudW1hc2s9ZnVuY3Rpb24oKXtyZXR1cm4gMH19LHt9XSw2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXttb2R1bGUuZXhwb3J0cz17bmFtZTpcImVqc1wiLGRlc2NyaXB0aW9uOlwiRW1iZWRkZWQgSmF2YVNjcmlwdCB0ZW1wbGF0ZXNcIixrZXl3b3JkczpbXCJ0ZW1wbGF0ZVwiLFwiZW5naW5lXCIsXCJlanNcIl0sdmVyc2lvbjpcIjMuMS44XCIsYXV0aG9yOlwiTWF0dGhldyBFZXJuaXNzZSA8bWRlQGZsZWVnaXgub3JnPiAoaHR0cDovL2ZsZWVnaXgub3JnKVwiLGxpY2Vuc2U6XCJBcGFjaGUtMi4wXCIsYmluOntlanM6XCIuL2Jpbi9jbGkuanNcIn0sbWFpbjpcIi4vbGliL2Vqcy5qc1wiLGpzZGVsaXZyOlwiZWpzLm1pbi5qc1wiLHVucGtnOlwiZWpzLm1pbi5qc1wiLHJlcG9zaXRvcnk6e3R5cGU6XCJnaXRcIix1cmw6XCJnaXQ6Ly9naXRodWIuY29tL21kZS9lanMuZ2l0XCJ9LGJ1Z3M6XCJodHRwczovL2dpdGh1Yi5jb20vbWRlL2Vqcy9pc3N1ZXNcIixob21lcGFnZTpcImh0dHBzOi8vZ2l0aHViLmNvbS9tZGUvZWpzXCIsZGVwZW5kZW5jaWVzOntqYWtlOlwiXjEwLjguNVwifSxkZXZEZXBlbmRlbmNpZXM6e2Jyb3dzZXJpZnk6XCJeMTYuNS4xXCIsZXNsaW50OlwiXjYuOC4wXCIsXCJnaXQtZGlyZWN0b3J5LWRlcGxveVwiOlwiXjEuNS4xXCIsanNkb2M6XCJeNC4wLjJcIixcImxydS1jYWNoZVwiOlwiXjQuMC4xXCIsbW9jaGE6XCJeMTAuMi4wXCIsXCJ1Z2xpZnktanNcIjpcIl4zLjMuMTZcIn0sZW5naW5lczp7bm9kZTpcIj49MC4xMC4wXCJ9LHNjcmlwdHM6e3Rlc3Q6XCJtb2NoYSAtdSB0ZGRcIn19fSx7fV19LHt9LFsxXSkoMSl9KTtcbiIsIlxyXG52YXIgY29yZXVpVGFibGVVdGlscyA9IHtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQntCx0YrQtdC00LjQvdC10L3QuNC1INCw0YLRgNC40LHRg9GC0L7QslxyXG4gICAgICogQHBhcmFtIGF0dHIxXHJcbiAgICAgKiBAcGFyYW0gYXR0cjJcclxuICAgICAqIEByZXR1cm5zIHtvYmplY3R9XHJcbiAgICAgKi9cclxuICAgIG1lcmdlQXR0cjogZnVuY3Rpb24gKGF0dHIxLCBhdHRyMikge1xyXG5cclxuICAgICAgICBsZXQgbWVyZ2VBdHRyID0gT2JqZWN0LmFzc2lnbih7fSwgYXR0cjEpO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGF0dHIyID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAkLmVhY2goYXR0cjIsIGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1lcmdlQXR0ci5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuYW1lID09PSAnY2xhc3MnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lcmdlQXR0cltuYW1lXSArPSAnICcgKyB2YWx1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChuYW1lID09PSAnc3R5bGUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lcmdlQXR0cltuYW1lXSArPSAnOycgKyB2YWx1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVyZ2VBdHRyW25hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVyZ2VBdHRyW25hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1lcmdlQXR0cjtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/RgNC+0LLQtdGA0LrQsCDQvdCwINGH0LjRgdC70L5cclxuICAgICAqIEBwYXJhbSBudW1cclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgaXNOdW1lcmljOiBmdW5jdGlvbihudW0pIHtcclxuICAgICAgICByZXR1cm4gKHR5cGVvZihudW0pID09PSAnbnVtYmVyJyB8fCB0eXBlb2YobnVtKSA9PT0gXCJzdHJpbmdcIiAmJiBudW0udHJpbSgpICE9PSAnJykgJiYgISBpc05hTihudW0pO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgaGFzaENvZGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNyYzMyKChuZXcgRGF0ZSgpLmdldFRpbWUoKSArIE1hdGgucmFuZG9tKCkpLnRvU3RyaW5nKCkpLnRvU3RyaW5nKDE2KTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHN0clxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIGNyYzMyOiBmdW5jdGlvbiAoc3RyKSB7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGEsIG8gPSBbXSwgYyA9IDA7IGMgPCAyNTY7IGMrKykge1xyXG4gICAgICAgICAgICBhID0gYztcclxuICAgICAgICAgICAgZm9yICh2YXIgZiA9IDA7IGYgPCA4OyBmKyspIHtcclxuICAgICAgICAgICAgICAgIGEgPSAxICYgYSA/IDM5ODgyOTIzODQgXiBhID4+PiAxIDogYSA+Pj4gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9bY10gPSBhXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKHZhciBuID0gLTEsIHQgPSAwOyB0IDwgc3RyLmxlbmd0aDsgdCsrKSB7XHJcbiAgICAgICAgICAgIG4gPSBuID4+PiA4IF4gb1syNTUgJiAobiBeIHN0ci5jaGFyQ29kZUF0KHQpKV1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAoLTEgXiBuKSA+Pj4gMDtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvcmV1aVRhYmxlVXRpbHM7IiwibGV0IHRwbCA9IE9iamVjdC5jcmVhdGUobnVsbClcbnRwbFsndGFibGUtY29sdW1ucy1mb290ZXIuaHRtbCddID0gJzx0ciBjbGFzcz1cImJnLXdoaXRlXCI+IDwlICQuZWFjaChjb2x1bW5zLCBmdW5jdGlvbihrZXksIGNvbHVtbikgeyAlPiA8dGQ8JS0gY29sdW1uLmF0dHIlPj48JS0gY29sdW1uLmxhYmVsICU+PC90ZD4gPCUgfSk7ICU+IDwvdHI+J1xudHBsWyd0YWJsZS1jb2x1bW5zLmh0bWwnXSA9ICc8dHIgY2xhc3M9XCJmdy1tZWRpdW0gYmctd2hpdGVcIj4gPCUgJC5lYWNoKGNvbHVtbnMsIGZ1bmN0aW9uKGtleSwgY29sdW1uKSB7ICU+IDx0ZDwlLSBjb2x1bW4uYXR0ciU+PjwlLSBjb2x1bW4ubGFiZWwgJT48L3RkPiA8JSB9KTsgJT4gPC90cj4nXG50cGxbJ3RhYmxlLWxvYWRlci5odG1sJ10gPSAnPGRpdiBjbGFzcz1cImNvcmV1aS10YWJsZS1sb2NrIHBvc2l0aW9uLWFic29sdXRlIHctMTAwIHRvcC0wIGJvdHRvbS0wXCI+IDxkaXYgY2xhc3M9XCJjb3JldWktdGFibGUtYmxvY2sgYmctc2Vjb25kYXJ5LXN1YnRsZSBwb3NpdGlvbi1hYnNvbHV0ZSBvcGFjaXR5LTUwIHctMTAwIHRvcC0wIGJvdHRvbS0wXCI+PC9kaXY+IDxkaXYgY2xhc3M9XCJjb3JldWktdGFibGUtbWVzc2FnZSBwb3NpdGlvbi1yZWxhdGl2ZSBkLWZsZXggYWxpZ24tY29udGVudC1jZW50ZXIganVzdGlmeS1jb250ZW50LXN0YXJ0IGdhcC0yIG10LTMgcHktMSBweC0yIG0tYXV0byBib3JkZXIgYm9yZGVyLXNlY29uZGFyeS1zdWJ0bGUgcm91bmRlZC0zIGJnLWJvZHktc2Vjb25kYXJ5XCI+IDxkaXYgY2xhc3M9XCJzcGlubmVyLWJvcmRlciB0ZXh0LXNlY29uZGFyeSBhbGlnbi1zZWxmLWNlbnRlclwiPjwvZGl2PiA8c3BhbiBjbGFzcz1cImxoLWxnXCI+PCU9IGxhbmcubG9hZGluZyAlPjwvc3Bhbj4gPC9kaXY+IDwvZGl2PidcbnRwbFsndGFibGUtcGFnZXMuaHRtbCddID0gJzx0ciBjbGFzcz1cImJnLXdoaXRlXCI+IDx0ZCBjb2xzcGFuPVwiPCU9IGNvbHVtbnNDb3VudCAlPlwiPiA8ZGl2IGNsYXNzPVwiZC1mbGV4IGp1c3RpZnktY29udGVudC1iZXR3ZWVuXCI+IDwlIGlmICh0YWJsZS5zaG93LnBhZ2VzSnVtcCkgeyAlPiA8ZGl2IGNsYXNzPVwiY29yZXVpLXRhYmxlX19wYWdlX2dvX2NvbnRhaW5lciBmbG9hdC1zdGFydFwiPiA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj4gPGlucHV0IHR5cGU9XCJudW1iZXJcIiBjbGFzcz1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtc21cIiBtaW49XCIxXCI+IDxidXR0b24gY2xhc3M9XCJjb3JldWktdGFibGVfX3BhZ2VfZ28gYnRuIGJ0bi1zbSBidG4tb3V0bGluZS1zZWNvbmRhcnkgYm9yZGVyLXNlY29uZGFyeS1zdWJ0bGVcIiB0eXBlPVwiYnV0dG9uXCI+IDxpIGNsYXNzPVwiYmkgYmktY2hldnJvbi1jb21wYWN0LXJpZ2h0XCI+PC9pPiA8L2J1dHRvbj4gPC9kaXY+IDwvZGl2PiA8JSB9ICU+IDwlIGlmICh0YWJsZS5zaG93LnBhZ2VzKSB7ICU+IDxkaXYgY2xhc3M9XCJjb3JldWktdGFibGVfX3BhZ2VzX2NvbnRhaW5lciB0ZXh0LWNlbnRlclwiPiA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc20gYnRuLW91dGxpbmUtc2Vjb25kYXJ5IGNvcmV1aS10YWJsZV9fcGFnZV9wcmV2XCI8JSBpZiAoICEgcHJldlBhZ2UpIHsgJT4gZGlzYWJsZWQ8JSB9ICU+PiA8aSBjbGFzcz1cImJpIGJpLWNoZXZyb24tY29tcGFjdC1sZWZ0XCI+PC9pPiA8L2J1dHRvbj4gPHNtYWxsPiA8c3BhbiBjbGFzcz1cImNvcmV1aS10YWJsZV9fcGFnZV9jdXJyZW50XCI+PCU9IGN1cnJlbnRQYWdlICU+PC9zcGFuPiA8JT0gbGFuZy5vZiAlPiA8c3BhbiBjbGFzcz1cImNvcmV1aS10YWJsZV9fcGFnZXNfdG90YWxcIj48JT0gcGFnZXNUb3RhbCAlPjwvc3Bhbj4gPC9zbWFsbD4gPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXNtIGJ0bi1vdXRsaW5lLXNlY29uZGFyeSBjb3JldWktdGFibGVfX3BhZ2VfbmV4dFwiPCUgaWYgKCAhIG5leHRQYWdlKSB7ICU+IGRpc2FibGVkPCUgfSAlPj4gPGkgY2xhc3M9XCJiaSBiaS1jaGV2cm9uLWNvbXBhY3QtcmlnaHRcIj48L2k+IDwvYnV0dG9uPiA8L2Rpdj4gPCUgfSAlPiA8JSBpZiAodGFibGUuc2hvdy5wcmVQYWdlTGlzdCkgeyAlPiA8ZGl2IGNsYXNzPVwiY29yZXVpLXRhYmxlX19wYWdlc19saXN0X2NvbnRhaW5lciBmbG9hdC1lbmRcIj4gPHNlbGVjdCBjbGFzcz1cImZvcm0tc2VsZWN0IGZvcm0tc2VsZWN0LXNtXCI+IDwlICQuZWFjaChyZWNvcmRzUGVyUGFnZUxpc3QsIGZ1bmN0aW9uKGtleSwgY291bnQpIHsgJT4gPG9wdGlvbiB2YWx1ZT1cIjwlPSBjb3VudCAlPlwiPCUgaWYgKHJlY29yZHNQZXJQYWdlID09IGNvdW50KSB7ICU+c2VsZWN0ZWQ8JSB9ICU+PiA8JSBpZiAoY291bnQgPT0gXFwnMFxcJykgeyAlPjwlPSBsYW5nLmFsbCAlPjwlIH0gZWxzZSB7ICU+PCU9IGNvdW50ICU+PCUgfSAlPiA8L29wdGlvbj4gPCUgfSk7ICU+IDwvc2VsZWN0PiA8L2Rpdj4gPCUgfSAlPiA8L2Rpdj4gPC90ZD4gPC90cj4nXG50cGxbJ3RhYmxlLXJlY29yZHMtZW1wdHkuaHRtbCddID0gJzx0cj4gPHRkIGNsYXNzPVwidGV4dC1jZW50ZXJcIiBjb2xzcGFuPVwiPCU9IGNvbHVtbnNDb3VudCAlPlwiPjwlPSBsYW5nLmVtcHR5UmVjb3JkcyAlPjwvdGQ+IDwvdHI+J1xudHBsWyd0YWJsZS1yZWNvcmRzLmh0bWwnXSA9ICc8JSAkLmVhY2gocmVjb3JkcywgZnVuY3Rpb24oa2V5LCByZWNvcmQpIHsgJT4gPHRyPCUtIHJlY29yZC5hdHRyICU+IGRhdGEtcmVjb3JkLWtleT1cIjwlPSBrZXkgJT5cIj4gPCUgJC5lYWNoKHJlY29yZC5maWVsZHMsIGZ1bmN0aW9uKGtleTIsIGZpZWxkKSB7ICU+IDx0ZDwlLSBmaWVsZC5hdHRyICU+PjwlLSBmaWVsZC5jb250ZW50ICU+PC90ZD4gPCUgfSk7ICU+IDwvdHI+IDwlIH0pOyAlPidcbnRwbFsndGFibGUuaHRtbCddID0gJyA8ZGl2IGlkPVwiY29yZXVpLXRhYmxlLTwlPSB0YWJsZS5pZCAlPlwiIGNsYXNzPVwiY29yZXVpLXRhYmxlXCI8JS0gcmVuZGVyLmF0dHIgJT4gPCUgaWYgKHdpZHRoU2l6ZXMpIHsgJT5zdHlsZT1cIjwlPSB3aWR0aFNpemVzLmpvaW4oXFwnO1xcJykgJT5cIjwlIH0gJT4+IDwlIGlmIChyZW5kZXIuY29udHJvbHMubGVuZ3RoID4gMCkgeyAlPiA8ZGl2IGNsYXNzPVwiY29yZXVpLXRhYmxlX19jb250cm9scyBkLWZsZXgganVzdGlmeS1jb250ZW50LXN0YXJ0IGdhcC0yIGZsZXgtd3JhcCBtYi0zIGFsaWduLWl0ZW1zLWNlbnRlclwiPiA8JSAkLmVhY2gocmVuZGVyLmNvbnRyb2xzLCBmdW5jdGlvbihrZXksIGNvbnRyb2wpIHsgJT4gPGRpdiBpZD1cImNvcmV1aS10YWJsZS1jb250cm9sLTwlPSBjb250cm9sLmlkICU+XCIgY2xhc3M9XCJjb3JldWktdGFibGVfX2NvbnRyb2xcIj4gPCUtIGNvbnRyb2wuY29udGVudCAlPiA8L2Rpdj4gPCUgfSk7ICU+IDwvZGl2PiA8JSB9ICU+IDxkaXYgY2xhc3M9XCJjb3JldWktdGFibGVfX2NvbnRhaW5lciBiZy13aGl0ZSBwb3NpdGlvbi1yZWxhdGl2ZSByb3VuZGVkLTEgYm9yZGVyIGJvcmRlci0xXCI+IDwlIGlmICh0YWJsZS5zaG93LnRvdGFsKSB7ICU+IDxkaXYgY2xhc3M9XCJwcy0yIGxoLWxnIGJvcmRlci1ib3R0b21cIj4gPHNtYWxsPjwlPSBsYW5nLnRvdGFsICU+OiA8c3BhbiBjbGFzcz1cImNvcmV1aS10YWJsZV9fY291bnQtdG90YWxcIj48JT0gcmVjb3Jkc1RvdGFsICU+PC9zcGFuPjwvc21hbGw+IDwvZGl2PiA8JSB9ICU+IDxkaXYgY2xhc3M9XCJjb3JldWktdGFibGVfX3dyYXBwZXIgdGFibGUtcmVzcG9uc2l2ZSBvdmVyZmxvdy14LWF1dG9cIiA8JSBpZiAoaGVpZ2h0U2l6ZXMpIHsgJT5zdHlsZT1cIjwlPSBoZWlnaHRTaXplcy5qb2luKFxcJztcXCcpICU+XCI8JSB9ICU+PiA8dGFibGUgY2xhc3M9XCJ0YWJsZSA8JSBpZiAodGFibGUuc2l6ZSkgeyAlPnRhYmxlLTwlPSB0YWJsZS5zaXplICU+PCUgfSAlPiA8JSBpZiAodGFibGUuaG92ZXIpIHsgJT50YWJsZS1ob3ZlcjwlIH0gJT4gPCUgaWYgKHRhYmxlLnN0cmlwZWQpIHsgJT50YWJsZS1zdHJpcGVkPCUgfSAlPiBtYi0wIDwlPSB0YWJsZS5jbGFzcyAlPlwiPiA8Y29sZ3JvdXA+IDwlICQuZWFjaChyZW5kZXIuY29sdW1uR3JvdXBzLCBmdW5jdGlvbihrZXksIGNvbHVtbkdyb3VwKSB7ICU+IDxjb2w8JSBpZiAoY29sdW1uR3JvdXAud2lkdGgpIHsgJT4gc3R5bGU9XCJ3aWR0aDogPCU9IChjb2x1bW5Hcm91cC53aWR0aC50b1N0cmluZygpICsgY29sdW1uR3JvdXAudW5pdCkgJT5cIjwlIH0gJT4vPiA8JSB9KTsgJT4gPC9jb2xncm91cD4gPCUgaWYgKHRhYmxlLnNob3cuY29sdW1uSGVhZGVycykgeyAlPiA8dGhlYWQ+IDwlLSByZW5kZXIuY29sdW1uc0hlYWRlciAlPiA8JS0gcmVuZGVyLmNvbHVtbnMgJT4gPC90aGVhZD4gPCUgfSAlPiA8dGJvZHkgY2xhc3M9XCJib3JkZXItc2Vjb25kYXJ5LXN1YnRsZVwiPiA8JS0gcmVuZGVyLnJlY29yZHMgJT4gPC90Ym9keT4gPCUgaWYgKHJlbmRlci5mb290ZXIgIT0gXFwnXFwnIHx8IHJlbmRlci5wYWdlcyAhPSBcXCdcXCcpIHsgJT4gPHRmb290PiA8JS0gcmVuZGVyLmZvb3RlciAlPiA8JS0gcmVuZGVyLnBhZ2VzICU+IDwvdGZvb3Q+IDwlIH0gJT4gPC90YWJsZT4gPC9kaXY+IDwvZGl2PiA8L2Rpdj4nXG50cGxbJ2NvbnRyb2xzL2J1dHRvbi5odG1sJ10gPSAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCI8JS0gcmVuZGVyLmF0dHIgJT4+IDwlLSBjb250cm9sLmNvbnRlbnQgJT4gPC9idXR0b24+J1xudHBsWydjb250cm9scy9saW5rLmh0bWwnXSA9ICc8YSBocmVmPVwiPCUtIGNvbnRyb2wuaHJlZiAlPlwiPCUtIHJlbmRlci5hdHRyICU+PjwlLSBjb250cm9sLmNvbnRlbnQgJT48L2E+JztcbmV4cG9ydCBkZWZhdWx0IHRwbDsiLCJcclxuaW1wb3J0ICcuLi8uLi9ub2RlX21vZHVsZXMvZWpzL2Vqcy5taW4nO1xyXG5pbXBvcnQgY29yZXVpRm9ybVV0aWxzIGZyb20gJy4vY29yZXVpLnRhYmxlLnV0aWxzJztcclxuaW1wb3J0IGNvcmV1aUZvcm1UcGwgICBmcm9tICcuL2NvcmV1aS50YWJsZS50ZW1wbGF0ZXMnO1xyXG5cclxuXHJcbnZhciBjb3JldWlUYWJsZUluc3RhbmNlID0ge1xyXG5cclxuICAgIF9vcHRpb25zOiB7XHJcbiAgICAgICAgaWQ6IG51bGwsXHJcbiAgICAgICAgY2xhc3M6ICcnLFxyXG4gICAgICAgIHByaW1hcnlLZXk6ICdpZCcsXHJcbiAgICAgICAgbGFuZzogJ3J1JyxcclxuICAgICAgICBzaXplOiAnc20nLFxyXG4gICAgICAgIHN0cmlwZWQ6IHRydWUsXHJcbiAgICAgICAgaG92ZXI6IHRydWUsXHJcbiAgICAgICAgd2lkdGg6IG51bGwsXHJcbiAgICAgICAgbWluV2lkdGg6IG51bGwsXHJcbiAgICAgICAgbWF4V2lkdGg6IG51bGwsXHJcbiAgICAgICAgaGVpZ2h0OiBudWxsLFxyXG4gICAgICAgIG1pbkhlaWdodDogbnVsbCxcclxuICAgICAgICBuYXhIZWlnaHQ6IG51bGwsXHJcbiAgICAgICAgcGFnZTogMSxcclxuICAgICAgICByZWNvcmRzUGVyUGFnZTogMjUsXHJcbiAgICAgICAgcmVjb3Jkc1BlclBhZ2VMaXN0OiBbIDI1LCA1MCwgMTAwLCAxMDAwIF0sIC8vIDAgLSBhbGxcclxuICAgICAgICBwYWdlUGFyYW06ICdwYWdlJyxcclxuICAgICAgICByZWNvcmRzUGVyUGFnZVBhcmFtOiAnY291bnQnLFxyXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgdXJsOiBudWxsLCAgLy8gJy9tb2QvaW5kZXgvb3JkZXJzLz9wYWdlPVtwYWdlXSdcclxuICAgICAgICBzaG93OiB7XHJcbiAgICAgICAgICAgIHRvdGFsOiBmYWxzZSxcclxuICAgICAgICAgICAgY29sdW1uSGVhZGVyczogdHJ1ZSxcclxuICAgICAgICAgICAgcGFnZXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBwYWdlc0p1bXA6IGZhbHNlLFxyXG4gICAgICAgICAgICBwcmVQYWdlTGlzdDogZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uQ2xpY2s6IG51bGwsXHJcbiAgICAgICAgb25DbGlja1VybDogbnVsbCxcclxuICAgICAgICBjb250cm9sczogW10sXHJcbiAgICAgICAgY29sdW1uR3JvdXBzOiBbXSxcclxuICAgICAgICBjb2x1bW5zOiBbXSxcclxuICAgICAgICBmb290ZXI6IFtdLFxyXG4gICAgICAgIHJlY29yZHM6IFtdXHJcbiAgICB9LFxyXG5cclxuICAgIF9wYWdlOiAxLFxyXG4gICAgX3JlY29yZHNQZXJQYWdlOiAyNSxcclxuICAgIF9yZWNvcmRzVG90YWw6IDAsXHJcbiAgICBfcmVjb3Jkc051bWJlcjogMSxcclxuXHJcbiAgICBfY29sdW1uczogW10sXHJcbiAgICBfc2VhcmNoOiBbXSxcclxuICAgIF9maWx0ZXI6IFtdLFxyXG4gICAgX2V2ZW50czoge30sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y9cclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBfaW5pdDogZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuXHJcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9ICQuZXh0ZW5kKHRydWUsIHt9LCB0aGlzLl9vcHRpb25zLCBvcHRpb25zKTtcclxuICAgICAgICB0aGlzLl9ldmVudHMgID0ge307XHJcblxyXG5cclxuICAgICAgICBpZiAoICEgdGhpcy5fb3B0aW9ucy5pZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLmlkID0gY29yZXVpRm9ybVV0aWxzLmhhc2hDb2RlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5wYWdlID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9wYWdlID0gdGhpcy5fb3B0aW9ucy5wYWdlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5yZWNvcmRzUGVyUGFnZSA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVjb3Jkc1BlclBhZ2UgPSB0aGlzLl9vcHRpb25zLnJlY29yZHNQZXJQYWdlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuXHJcbiAgICAgICAgLy8g0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0LrQvtC70L7QvdC+0LpcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuX29wdGlvbnMuY29sdW1ucyA9PT0gJ29iamVjdCcgJiZcclxuICAgICAgICAgICAgQXJyYXkuaXNBcnJheSh0aGlzLl9vcHRpb25zLmNvbHVtbnMpICYmXHJcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuY29sdW1ucy5sZW5ndGggPiAwXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICQuZWFjaCh0aGlzLl9vcHRpb25zLmNvbHVtbnMsIGZ1bmN0aW9uIChrZXksIGNvbHVtbikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjb2x1bW4udHlwZSA9PT0gJ3VuZGVmaW5lZCcgfHxcclxuICAgICAgICAgICAgICAgICAgICAhIENvcmVVSS50YWJsZS5jb2x1bW5zLmhhc093blByb3BlcnR5KGNvbHVtbi50eXBlKVxyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uLnR5cGUgPSAndGV4dCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGNvbHVtbkluc3RhbmNlID0gJC5leHRlbmQodHJ1ZSwge30sIENvcmVVSS50YWJsZS5jb2x1bW5zW2NvbHVtbi50eXBlXSk7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW5JbnN0YW5jZS5pbml0KHRoYXQsIGNvbHVtbik7XHJcbiAgICAgICAgICAgICAgICB0aGF0Ll9jb2x1bW5zLnB1c2goY29sdW1uSW5zdGFuY2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKi9cclxuICAgIGluaXRFdmVudHM6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgbGV0IHRoYXQgICAgICAgICA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHRhYmxlV3JhcHBlciA9ICcjY29yZXVpLXRhYmxlLScgKyB0aGlzLl9vcHRpb25zLmlkICsgJyA+IC5jb3JldWktdGFibGVfX2NvbnRhaW5lciA+IC5jb3JldWktdGFibGVfX3dyYXBwZXInO1xyXG5cclxuICAgICAgICAvLyDQn9C+0LrQsNC3INGB0YLRgNC+0LpcclxuICAgICAgICB0aGlzLm9uKCdzaG93LXJlY29yZHMuY29yZXVpLnRhYmxlJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgLy8g0J/QtdGA0LXRhdC+0LQg0L/QviDRgdGB0YvQu9C60LVcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGF0Ll9vcHRpb25zLm9uQ2xpY2tVcmwgPT09ICdzdHJpbmcnICYmIHRoYXQuX29wdGlvbnMub25DbGlja1VybCkge1xyXG4gICAgICAgICAgICAgICAgJCh0YWJsZVdyYXBwZXIgKyAnID4gdGFibGUgPiB0Ym9keSA+IHRyLmNvcmV1aS10YWJsZV9fcmVjb3JkJykuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZWNvcmRLZXkgPSAkKHRoaXMpLmRhdGEoJ3JlY29yZC1rZXknKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVjb3JkICAgID0gdGhhdC5fZ2V0UmVjb3JkQnlLZXkocmVjb3JkS2V5KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhIHJlY29yZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgdXJsID0gdGhhdC5fb3B0aW9ucy5vbkNsaWNrVXJsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkLmVhY2gocmVjb3JkLCBmdW5jdGlvbiAoZmllbGQsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWVsZFF1b3RlID0gZmllbGQucmVwbGFjZSgvKFteXFx3XFxkXSkvZywgJ1xcXFwkMScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSB1cmwucmVwbGFjZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBSZWdFeHAoJ1xcXFxbJyArIGZpZWxkUXVvdGUgKyAnXFxcXF0nLCAnZycpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVybCAmJiB1cmwgIT09ICcjJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gdXJsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyDQodC+0LHRi9GC0LjQtSDQvdCw0LbQsNGC0LjRjyDQvdCwINGB0YLRgNC+0LrRg1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoYXQuX29wdGlvbnMub25DbGljayA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgJCh0YWJsZVdyYXBwZXIgKyAnID4gdGFibGUgPiB0Ym9keSA+IHRyLmNvcmV1aS10YWJsZV9fcmVjb3JkJykuY2xpY2soZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlY29yZEtleSA9ICQodGhpcykuZGF0YSgncmVjb3JkLWtleScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZWNvcmQgICAgPSB0aGF0Ll9nZXRSZWNvcmRCeUtleShyZWNvcmRLZXkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoICEgcmVjb3JkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuX29wdGlvbnMub25DbGljayhldmVudCwgcmVjb3JkKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyDQpNC40LrRgdCw0YbQuNGPINC60L7Qu9C+0L3QvtC6XHJcbiAgICAgICAgICAgIGxldCBjb2xPZmZzZXQgPSAwO1xyXG4gICAgICAgICAgICAkKHRhYmxlV3JhcHBlciArICcgPiB0YWJsZSA+IHRoZWFkID4gdHI6bGFzdC1jaGlsZCA+IHRkLmNvcmV1aS10YWJsZV9fZml4ZWRfbGVmdCcpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ICA9ICQodGhpcykuaW5kZXgoKSArIDE7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0YWJsZVdyYXBwZXIgKyAnID4gdGFibGUgPiB0aGVhZCA+IHRyOmxhc3QtY2hpbGQgPiB0ZDpudGgtY2hpbGQoJyArIGluZGV4ICsgJyknKS5jc3MoJ2xlZnQnLCBjb2xPZmZzZXQgKyAncHgnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKHRhYmxlV3JhcHBlciArICcgPiB0YWJsZSA+IHRib2R5ID4gdHIgPiB0ZDpudGgtY2hpbGQoJyArIGluZGV4ICsgJyknKS5jc3MoJ2xlZnQnLCBjb2xPZmZzZXQgKyAncHgnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb2xPZmZzZXQgKz0gJCh0aGlzKS5vdXRlcldpZHRoKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY29sT2Zmc2V0ID0gMDtcclxuICAgICAgICAgICAgJCgkKHRhYmxlV3JhcHBlciArICcgPiB0YWJsZSA+IHRoZWFkID4gdHI6bGFzdC1jaGlsZCA+IHRkLmNvcmV1aS10YWJsZV9fZml4ZWRfcmlnaHQnKS5nZXQoKS5yZXZlcnNlKCkpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ICA9ICQodGhpcykuaW5kZXgoKSArIDE7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0YWJsZVdyYXBwZXIgKyAnID4gdGFibGUgPiB0aGVhZCA+IHRyOmxhc3QtY2hpbGQgPiB0ZDpudGgtY2hpbGQoJyArIGluZGV4ICsgJyknKS5jc3MoJ3JpZ2h0JywgY29sT2Zmc2V0ICsgJ3B4Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0YWJsZVdyYXBwZXIgKyAnID4gdGFibGUgPiB0Ym9keSA+IHRyID4gdGQ6bnRoLWNoaWxkKCcgKyBpbmRleCArICcpJykuY3NzKCdyaWdodCcsIGNvbE9mZnNldCArICdweCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbE9mZnNldCArPSAkKHRoaXMpLm91dGVyV2lkdGgoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy8g0KHRgtGA0LDQvdC40YbRi1xyXG4gICAgICAgIGxldCBidG5QcmV2ID0gJCh0YWJsZVdyYXBwZXIgKyAnID4gdGFibGUgPiB0Zm9vdCA+IHRyID4gdGQgLmNvcmV1aS10YWJsZV9fcGFnZV9wcmV2JylcclxuICAgICAgICBpZiAoYnRuUHJldlswXSkge1xyXG4gICAgICAgICAgICBidG5QcmV2LmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGF0Ll9wYWdlID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQucHJldlBhZ2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBidG5OZXh0ID0gJCh0YWJsZVdyYXBwZXIgKyAnID4gdGFibGUgPiB0Zm9vdCA+IHRyID4gdGQgLmNvcmV1aS10YWJsZV9fcGFnZV9uZXh0JylcclxuICAgICAgICBpZiAoYnRuTmV4dFswXSkge1xyXG4gICAgICAgICAgICBidG5OZXh0LmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQubmV4dFBhZ2UoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBpbnB1dEdvUGFnZSA9ICQodGFibGVXcmFwcGVyICsgJyA+IHRhYmxlID4gdGZvb3QgPiB0ciA+IHRkIC5jb3JldWktdGFibGVfX3BhZ2VfZ29fY29udGFpbmVyIGlucHV0Jyk7XHJcbiAgICAgICAgbGV0IGJ0bkdvUGFnZSAgID0gJCh0YWJsZVdyYXBwZXIgKyAnID4gdGFibGUgPiB0Zm9vdCA+IHRyID4gdGQgLmNvcmV1aS10YWJsZV9fcGFnZV9nbycpXHJcbiAgICAgICAgaWYgKGJ0bkdvUGFnZVswXSkge1xyXG4gICAgICAgICAgICBidG5Hb1BhZ2UuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5nb1BhZ2UoaW5wdXRHb1BhZ2UudmFsKCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaW5wdXRHb1BhZ2Uua2V5dXAoZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBldmVudDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc2VsZWN0UGVyUGFnZSA9ICQodGFibGVXcmFwcGVyICsgJyA+IHRhYmxlID4gdGZvb3QgPiB0ciA+IHRkIC5jb3JldWktdGFibGVfX3BhZ2VzX2xpc3RfY29udGFpbmVyIHNlbGVjdCcpO1xyXG4gICAgICAgIGlmIChzZWxlY3RQZXJQYWdlWzBdKSB7XHJcbiAgICAgICAgICAgIHNlbGVjdFBlclBhZ2UuY2hhbmdlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuX3BhZ2UgICAgICAgICAgID0gMTtcclxuICAgICAgICAgICAgICAgIHRoYXQuX3JlY29yZHNQZXJQYWdlID0gc2VsZWN0UGVyUGFnZS52YWwoKTtcclxuICAgICAgICAgICAgICAgIHRoYXQucmVsb2FkKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICB0aGlzLl90cmlnZ2VyKCdzaG93bi5jb3JldWkudGFibGUnKTtcclxuXHJcbiAgICAgICAgLy8g0JLRi9C30L7QsiDRgdC+0LHRi9GC0LjRjyDQv9C+0LrQsNC30LAg0YHRgtGA0L7QulxyXG4gICAgICAgIGlmICgoICEgdGhpcy5fb3B0aW9ucy51cmwgfHwgdGhpcy5fb3B0aW9ucy51cmwgPT09ICcjJykgJiZcclxuICAgICAgICAgICAgdHlwZW9mIHRoaXMuX29wdGlvbnMucmVjb3JkcyA9PT0gJ29iamVjdCcgJiZcclxuICAgICAgICAgICAgQXJyYXkuaXNBcnJheSh0aGlzLl9vcHRpb25zLnJlY29yZHMpICYmXHJcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMucmVjb3Jkcy5sZW5ndGggPiAwXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RyaWdnZXIoJ3Nob3ctcmVjb3Jkcy5jb3JldWkudGFibGUnLCB0aGlzLCBbIHRoaXMgXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKi9cclxuICAgIGdldElkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wdGlvbnMuaWQ7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudFxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKi9cclxuICAgIHJlbmRlcjogZnVuY3Rpb24oZWxlbWVudCkge1xyXG5cclxuICAgICAgICBsZXQgdGhhdCAgICAgICAgPSB0aGlzO1xyXG4gICAgICAgIGxldCB3aWR0aFNpemVzICA9IFtdO1xyXG4gICAgICAgIGxldCBoZWlnaHRTaXplcyA9IFtdO1xyXG4gICAgICAgIGxldCBodG1sUmVjb3JkcyA9ICcnO1xyXG4gICAgICAgIGxldCByZW5kZXIgICAgICA9IHtcclxuICAgICAgICAgICAgY29udHJvbHM6IFtdLFxyXG4gICAgICAgICAgICBjb2x1bW5zSGVhZGVyOiBbXSxcclxuICAgICAgICAgICAgY29sdW1uczogW10sXHJcbiAgICAgICAgICAgIGNvbHVtbkdyb3VwczogW10sXHJcbiAgICAgICAgICAgIHJlY29yZHM6IFtdLFxyXG4gICAgICAgICAgICBmb290ZXI6ICcnLFxyXG4gICAgICAgICAgICBwYWdlczogJycsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5fcmVjb3Jkc1RvdGFsID0gdGhpcy5fb3B0aW9ucy5yZWNvcmRzLmxlbmd0aDtcclxuXHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLndpZHRoID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgdW5pdCA9IHR5cGVvZiB0aGlzLl9vcHRpb25zLndpZHRoID09PSAnbnVtYmVyJyA/ICdweCcgOiAnJztcclxuICAgICAgICAgICAgd2lkdGhTaXplcy5wdXNoKCd3aWR0aDonICsgdGhpcy5fb3B0aW9ucy53aWR0aCArIHVuaXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMubWluV2lkdGggPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCB1bml0ID0gdHlwZW9mIHRoaXMuX29wdGlvbnMubWluV2lkdGggPT09ICdudW1iZXInID8gJ3B4JyA6ICcnO1xyXG4gICAgICAgICAgICB3aWR0aFNpemVzLnB1c2goJ21pbi13aWR0aDonICsgdGhpcy5fb3B0aW9ucy5taW5XaWR0aCArIHVuaXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMubWF4V2lkdGggPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCB1bml0ID0gdHlwZW9mIHRoaXMuX29wdGlvbnMubWF4V2lkdGggPT09ICdudW1iZXInID8gJ3B4JyA6ICcnO1xyXG4gICAgICAgICAgICB3aWR0aFNpemVzLnB1c2goJ21heC13aWR0aDonICsgdGhpcy5fb3B0aW9ucy5tYXhXaWR0aCArIHVuaXQpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLmhlaWdodCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IHVuaXQgPSB0eXBlb2YgdGhpcy5fb3B0aW9ucy5oZWlnaHQgPT09ICdudW1iZXInID8gJ3B4JyA6ICcnO1xyXG4gICAgICAgICAgICBoZWlnaHRTaXplcy5wdXNoKCdoZWlnaHQ6JyArIHRoaXMuX29wdGlvbnMuaGVpZ2h0ICsgdW5pdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5taW5IZWlnaHQgPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCB1bml0ID0gdHlwZW9mIHRoaXMuX29wdGlvbnMubWluSGVpZ2h0ID09PSAnbnVtYmVyJyA/ICdweCcgOiAnJztcclxuICAgICAgICAgICAgaGVpZ2h0U2l6ZXMucHVzaCgnbWluLWhlaWdodDonICsgdGhpcy5fb3B0aW9ucy5taW5IZWlnaHQgKyB1bml0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLm1heEhlaWdodCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IHVuaXQgPSB0eXBlb2YgdGhpcy5fb3B0aW9ucy5tYXhIZWlnaHQgPT09ICdudW1iZXInID8gJ3B4JyA6ICcnO1xyXG4gICAgICAgICAgICBoZWlnaHRTaXplcy5wdXNoKCdtYXgtaGVpZ2h0OicgKyB0aGlzLl9vcHRpb25zLm1heEhlaWdodCArIHVuaXQpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAvLyDQrdC70LXQvNC10L3RgtGLINGD0L/RgNCw0LLQu9C10L3QuNGPXHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9vcHRpb25zLmNvbnRyb2xzID09PSAnb2JqZWN0JyAmJlxyXG4gICAgICAgICAgICBBcnJheS5pc0FycmF5KHRoaXMuX29wdGlvbnMuY29udHJvbHMpICYmXHJcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuY29udHJvbHMubGVuZ3RoID4gMFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICAkLmVhY2godGhpcy5fb3B0aW9ucy5jb250cm9scywgZnVuY3Rpb24gKGtleSwgY29udHJvbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKENvcmVVSS50YWJsZS5jb250cm9scy5oYXNPd25Qcm9wZXJ0eShjb250cm9sLnR5cGUpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb250cm9sSW5zdGFuY2UgPSAkLmV4dGVuZCh0cnVlLCB7fSwgQ29yZVVJLnRhYmxlLmNvbnRyb2xzW2NvbnRyb2wudHlwZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xJbnN0YW5jZS5pbml0KHRoYXQsIGNvbnRyb2wpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZW5kZXIuY29udHJvbHMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBjb250cm9sSW5zdGFuY2UuZ2V0SWQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogY29udHJvbEluc3RhbmNlLnJlbmRlcigpLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGF0Lm9uKCdzaG93bi5jb3JldWkudGFibGUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xJbnN0YW5jZS5pbml0RXZlbnRzKClcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy8g0JrQvtC70L7QvdC60LhcclxuICAgICAgICBpZiAodGhpcy5fY29sdW1ucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICQuZWFjaCh0aGlzLl9jb2x1bW5zLCBmdW5jdGlvbiAoa2V5LCBjb2x1bW4pIHtcclxuICAgICAgICAgICAgICAgIGxldCBjb2x1bW5PcHRpb25zID0gY29sdW1uLmdldE9wdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgIGxldCBhdHRyaWJ1dGVzICAgID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbHVtbk9wdGlvbnMuZml4ZWQgJiYgdHlwZW9mIGNvbHVtbk9wdGlvbnMuZml4ZWQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uT3B0aW9ucy5hdHRySGVhZGVyID0gY29yZXVpRm9ybVV0aWxzLm1lcmdlQXR0cihjb2x1bW5PcHRpb25zLmF0dHJIZWFkZXIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6ICdjb3JldWktdGFibGVfX2ZpeGVkXycgKyBjb2x1bW5PcHRpb25zLmZpeGVkXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk9wdGlvbnMuYXR0ciA9IGNvcmV1aUZvcm1VdGlscy5tZXJnZUF0dHIoY29sdW1uT3B0aW9ucy5hdHRyLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnY29yZXVpLXRhYmxlX19maXhlZF8nICsgY29sdW1uT3B0aW9ucy5maXhlZFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjb2x1bW5PcHRpb25zLmF0dHJIZWFkZXIgJiYgdHlwZW9mIGNvbHVtbk9wdGlvbnMuYXR0ckhlYWRlciA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAkLmVhY2goY29sdW1uT3B0aW9ucy5hdHRySGVhZGVyLCBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlcy5wdXNoKG5hbWUgKyAnPVwiJyArIHZhbHVlICsgJ1wiJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmVuZGVyLmNvbHVtbkdyb3Vwcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogY29sdW1uT3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnd2lkdGgnKSA/IGNvbHVtbk9wdGlvbnMud2lkdGggOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICB1bml0OiB0eXBlb2YgY29sdW1uT3B0aW9ucy53aWR0aCA9PT0gJ251bWJlcicgPyAncHgnIDogJydcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJlbmRlci5jb2x1bW5zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIGF0dHI6IGF0dHJpYnV0ZXMubGVuZ3RoID4gMCA/ICgnICcgKyBhdHRyaWJ1dGVzLmpvaW4oJyAnKSkgOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogY29sdW1uT3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnbGFiZWwnKSA/IGNvbHVtbk9wdGlvbnMubGFiZWwgOiBcIlwiXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy8g0KHRgtGA0L7QutC4XHJcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMudXJsICYmIHRoaXMuX29wdGlvbnMudXJsICE9PSAnIycpIHtcclxuICAgICAgICAgICAgdGhpcy5vbignc2hvd24uY29yZXVpLnRhYmxlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5sb2FkKHRoaXMuX29wdGlvbnMudXJsKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5fb3B0aW9ucy5yZWNvcmRzID09PSAnb2JqZWN0JyAmJlxyXG4gICAgICAgICAgICAgICAgQXJyYXkuaXNBcnJheSh0aGlzLl9vcHRpb25zLnJlY29yZHMpICYmXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vcHRpb25zLnJlY29yZHMubGVuZ3RoID4gMFxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuX3JlY29yZHNUb3RhbCA9IHRoaXMuX29wdGlvbnMucmVjb3Jkcy5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICAgICAgJC5lYWNoKHRoaXMuX29wdGlvbnMucmVjb3JkcywgZnVuY3Rpb24gKGtleSwgcmVjb3JkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyLnJlY29yZHMucHVzaCh0aGF0Ll9yZW5kZXJSZWNvcmQocmVjb3JkLCBrZXkpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Ll9yZWNvcmRzTnVtYmVyKys7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBodG1sUmVjb3JkcyA9IGVqcy5yZW5kZXIoY29yZXVpRm9ybVRwbFsndGFibGUtcmVjb3Jkcy5odG1sJ10sIHtcclxuICAgICAgICAgICAgICAgICAgICByZWNvcmRzOiByZW5kZXIucmVjb3JkcyxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGh0bWxSZWNvcmRzID0gZWpzLnJlbmRlcihjb3JldWlGb3JtVHBsWyd0YWJsZS1yZWNvcmRzLWVtcHR5Lmh0bWwnXSwge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnNDb3VudDogdGhpcy5fY29sdW1ucy5sZW5ndGggPyB0aGlzLl9jb2x1bW5zLmxlbmd0aCA6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFuZzogdGhpcy5fZ2V0TGFuZygpLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvLyDQodGC0YDQsNC90LjRhtGLXHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9vcHRpb25zLnNob3cgPT09ICdvYmplY3QnICYmXHJcbiAgICAgICAgICAgICh0aGlzLl9vcHRpb25zLnNob3cucGFnZXMgfHxcclxuICAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuc2hvdy5wYWdlc0p1bXAgfHxcclxuICAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuc2hvdy5wcmVQYWdlTGlzdClcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgbGV0IHRvdGFsUGFnZXMgPSB0aGlzLl9yZWNvcmRzVG90YWwgPiAwICYmIHRoaXMuX3JlY29yZHNQZXJQYWdlID4gMFxyXG4gICAgICAgICAgICAgICAgPyBNYXRoLmNlaWwodGhpcy5fcmVjb3Jkc1RvdGFsIC8gdGhpcy5fcmVjb3Jkc1BlclBhZ2UpXHJcbiAgICAgICAgICAgICAgICA6IDE7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5yZWNvcmRzUGVyUGFnZUxpc3QuaW5kZXhPZih0aGlzLl9yZWNvcmRzUGVyUGFnZSkgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vcHRpb25zLnJlY29yZHNQZXJQYWdlTGlzdC51bnNoaWZ0KHRoaXMuX3JlY29yZHNQZXJQYWdlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmVuZGVyLnBhZ2VzID0gZWpzLnJlbmRlcihjb3JldWlGb3JtVHBsWyd0YWJsZS1wYWdlcy5odG1sJ10sIHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbnNDb3VudDogdGhpcy5fY29sdW1ucy5sZW5ndGggPyB0aGlzLl9jb2x1bW5zLmxlbmd0aCA6IDEsXHJcbiAgICAgICAgICAgICAgICB0YWJsZTogdGhpcy5fb3B0aW9ucyxcclxuICAgICAgICAgICAgICAgIGxhbmc6IHRoaXMuX2dldExhbmcoKSxcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRQYWdlOiB0aGlzLl9wYWdlLFxyXG4gICAgICAgICAgICAgICAgcGFnZXNUb3RhbDogdG90YWxQYWdlcyxcclxuICAgICAgICAgICAgICAgIHByZXZQYWdlOiB0aGlzLl9wYWdlID4gMSxcclxuICAgICAgICAgICAgICAgIG5leHRQYWdlOiB0aGlzLl9wYWdlIDwgdG90YWxQYWdlcyxcclxuICAgICAgICAgICAgICAgIHJlY29yZHNQZXJQYWdlOiB0aGlzLl9yZWNvcmRzUGVyUGFnZSxcclxuICAgICAgICAgICAgICAgIHJlY29yZHNQZXJQYWdlTGlzdDogdGhpcy5fb3B0aW9ucy5yZWNvcmRzUGVyUGFnZUxpc3RcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuX29wdGlvbnMuY29sdW1uR3JvdXBzID09PSAnb2JqZWN0JyAmJlxyXG4gICAgICAgICAgICBBcnJheS5pc0FycmF5KHRoaXMuX29wdGlvbnMuY29sdW1uR3JvdXBzKSAmJlxyXG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLmNvbHVtbkdyb3Vwcy5sZW5ndGggPiAwXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIGxldCByb3dzID0gW107XHJcblxyXG4gICAgICAgICAgICAkLmVhY2godGhpcy5fb3B0aW9ucy5jb2x1bW5Hcm91cHMsIGZ1bmN0aW9uIChrZXksIGhlYWRlclJvdykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBoZWFkZXJSb3cgPT09ICdvYmplY3QnICYmIEFycmF5LmlzQXJyYXkoaGVhZGVyUm93KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjZWxscyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkLmVhY2goaGVhZGVyUm93LCBmdW5jdGlvbiAoa2V5LCBoZWFkZXJDb2x1bW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBoZWFkZXJDb2x1bW4gPT09ICdvYmplY3QnICYmICEgQXJyYXkuaXNBcnJheShoZWFkZXJDb2x1bW4pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXR0cmlidXRlcyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoZWFkZXJDb2x1bW4uYXR0ciAmJiB0eXBlb2YgaGVhZGVyQ29sdW1uLmF0dHIgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKGhlYWRlckNvbHVtbi5hdHRyLCBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlcy5wdXNoKG5hbWUgKyAnPVwiJyArIHZhbHVlICsgJ1wiJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VsbHMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGhlYWRlckNvbHVtbi5oYXNPd25Qcm9wZXJ0eSgnbGFiZWwnKSA/IGhlYWRlckNvbHVtbi5sYWJlbCA6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHI6IGF0dHJpYnV0ZXMubGVuZ3RoID4gMCA/ICcgJyArIGF0dHJpYnV0ZXMuam9pbignICcpIDogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByb3dzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVqcy5yZW5kZXIoY29yZXVpRm9ybVRwbFsndGFibGUtY29sdW1ucy5odG1sJ10sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IGNlbGxzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmVuZGVyLmNvbHVtbnNIZWFkZXIgPSByb3dzLmpvaW4oJycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9vcHRpb25zLmZvb3RlciA9PT0gJ29iamVjdCcgJiZcclxuICAgICAgICAgICAgQXJyYXkuaXNBcnJheSh0aGlzLl9vcHRpb25zLmZvb3RlcikgJiZcclxuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5mb290ZXIubGVuZ3RoID4gMFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBsZXQgcm93cyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgJC5lYWNoKHRoaXMuX29wdGlvbnMuZm9vdGVyLCBmdW5jdGlvbiAoa2V5LCBmb290ZXJSb3cpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZm9vdGVyUm93ID09PSAnb2JqZWN0JyAmJiBBcnJheS5pc0FycmF5KGZvb3RlclJvdykpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2VsbHMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKGZvb3RlclJvdywgZnVuY3Rpb24gKGtleSwgZm9vdGVyQ29sdW1uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZm9vdGVyQ29sdW1uID09PSAnb2JqZWN0JyAmJiAhIEFycmF5LmlzQXJyYXkoZm9vdGVyQ29sdW1uKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGF0dHJpYnV0ZXMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9vdGVyQ29sdW1uLmF0dHIgJiYgdHlwZW9mIGZvb3RlckNvbHVtbi5hdHRyID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChmb290ZXJDb2x1bW4uYXR0ciwgZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXMucHVzaChuYW1lICsgJz1cIicgKyB2YWx1ZSArICdcIicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBmb290ZXJDb2x1bW4uaGFzT3duUHJvcGVydHkoJ2xhYmVsJykgPyBmb290ZXJDb2x1bW4ubGFiZWwgOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyOiBhdHRyaWJ1dGVzLmxlbmd0aCA+IDAgPyAnICcgKyBhdHRyaWJ1dGVzLmpvaW4oJyAnKSA6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcm93cy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlanMucmVuZGVyKGNvcmV1aUZvcm1UcGxbJ3RhYmxlLWNvbHVtbnMtZm9vdGVyLmh0bWwnXSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczogY2VsbHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZW5kZXIuZm9vdGVyID0gcm93cy5qb2luKCcnKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBsZXQgaHRtbENvbHVtbnMgPSBlanMucmVuZGVyKGNvcmV1aUZvcm1UcGxbJ3RhYmxlLWNvbHVtbnMuaHRtbCddLCB7XHJcbiAgICAgICAgICAgIGNvbHVtbnM6IHJlbmRlci5jb2x1bW5zLFxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgbGV0IGh0bWwgPSBlanMucmVuZGVyKGNvcmV1aUZvcm1UcGxbJ3RhYmxlLmh0bWwnXSwge1xyXG4gICAgICAgICAgICB0YWJsZTogdGhpcy5fb3B0aW9ucyxcclxuICAgICAgICAgICAgbGFuZzogdGhpcy5fZ2V0TGFuZygpLFxyXG4gICAgICAgICAgICB3aWR0aFNpemVzOiB3aWR0aFNpemVzLFxyXG4gICAgICAgICAgICBoZWlnaHRTaXplczogaGVpZ2h0U2l6ZXMsXHJcbiAgICAgICAgICAgIHJlY29yZHNUb3RhbDogdGhpcy5fcmVjb3Jkc1RvdGFsLFxyXG4gICAgICAgICAgICByZW5kZXI6IHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbkdyb3VwcyA6IHJlbmRlci5jb2x1bW5Hcm91cHMsXHJcbiAgICAgICAgICAgICAgICBjb2x1bW5zSGVhZGVyIDogcmVuZGVyLmNvbHVtbnNIZWFkZXIsXHJcbiAgICAgICAgICAgICAgICBjb250cm9scyA6IHJlbmRlci5jb250cm9scyxcclxuICAgICAgICAgICAgICAgIGNvbHVtbnMgIDogaHRtbENvbHVtbnMsXHJcbiAgICAgICAgICAgICAgICByZWNvcmRzICA6IGh0bWxSZWNvcmRzLFxyXG4gICAgICAgICAgICAgICAgZm9vdGVyICAgOiByZW5kZXIuZm9vdGVyLFxyXG4gICAgICAgICAgICAgICAgcGFnZXMgICA6IHJlbmRlci5wYWdlcyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGVsZW1lbnQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gaHRtbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIERvbSBlbGVtZW50XHJcbiAgICAgICAgbGV0IGRvbUVsZW1lbnQgPSB7fTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBkb21FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoICEgZG9tRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGRvbUVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGRvbUVsZW1lbnQuaW5uZXJIVE1MID0gaHRtbDtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0RXZlbnRzKCk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKi9cclxuICAgIGxvY2s6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9ICQoJyNjb3JldWktdGFibGUtJyArIHRoaXMuX29wdGlvbnMuaWQgKyAnID4gLmNvcmV1aS10YWJsZV9fY29udGFpbmVyJyk7XHJcblxyXG4gICAgICAgIGlmIChjb250YWluZXJbMF0gJiYgISBjb250YWluZXIuZmluZCgnLmNvcmV1aS10YWJsZS1sb2NrJylbMF0pIHtcclxuICAgICAgICAgICAgbGV0IGh0bWwgPSAgZWpzLnJlbmRlcihjb3JldWlGb3JtVHBsWyd0YWJsZS1sb2FkZXIuaHRtbCddLCB7XHJcbiAgICAgICAgICAgICAgICBsYW5nOiB0aGlzLl9nZXRMYW5nKClcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIucHJlcGVuZChodG1sKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKi9cclxuICAgIHVubG9jazogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAkKCcjY29yZXVpLXRhYmxlLScgKyB0aGlzLl9vcHRpb25zLmlkICsgJyA+IC5jb3JldWktdGFibGVfX2NvbnRhaW5lciA+IC5jb3JldWktdGFibGUtbG9jaycpLmhpZGUoNTAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQl9Cw0LPRgNGD0LfQutCwINGB0YLRgNC+0LpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2RcclxuICAgICAqL1xyXG4gICAgbG9hZDogZnVuY3Rpb24gKHVybCwgbWV0aG9kKSB7XHJcblxyXG4gICAgICAgIHRoaXMubG9jaygpO1xyXG5cclxuICAgICAgICBsZXQgdGhhdCAgID0gdGhpcztcclxuICAgICAgICBsZXQgcGFyYW1zID0ge307XHJcblxyXG4gICAgICAgIGlmICh1cmwubWF0Y2goL1xcW3BhZ2VcXF0vKSkge1xyXG4gICAgICAgICAgICB1cmwgPSB1cmwucmVwbGFjZSgvXFxbcGFnZVxcXS8sIHRoaXMuX3BhZ2UpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHBhcmFtc1t0aGlzLl9vcHRpb25zLnBhZ2VQYXJhbV0gPSB0aGlzLl9wYWdlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHVybC5tYXRjaCgvXFxbcGVyX3BhZ2VcXF0vKSkge1xyXG4gICAgICAgICAgICB1cmwgPSB1cmwucmVwbGFjZSgvXFxbcGVyX3BhZ2VcXF0vLCB0aGlzLl9yZWNvcmRzUGVyUGFnZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcGFyYW1zW3RoaXMuX29wdGlvbnMucmVjb3Jkc1BlclBhZ2VQYXJhbV0gPSB0aGlzLl9yZWNvcmRzUGVyUGFnZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhwYXJhbXMpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdXJsICs9IHVybC5tYXRjaCgvXFw/LylcclxuICAgICAgICAgICAgICAgID8gJyYnICsgJC5wYXJhbShwYXJhbXMpXHJcbiAgICAgICAgICAgICAgICA6ICc/JyArICQucGFyYW0ocGFyYW1zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCB8fCAnR0VUJyxcclxuICAgICAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgICAgICAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbih4aHIpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuX3RyaWdnZXIoJ3N0YXJ0LWxvYWQtcmVjb3Jkcy5jb3JldWkudGFibGUnLCB0aGF0LCBbIHRoYXQsIHhociBdKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3VsdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuaGFzT3duUHJvcGVydHkoJ3JlY29yZHMnKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGVvZiByZXN1bHQucmVjb3JkcyA9PT0gJ29iamVjdCcgJiZcclxuICAgICAgICAgICAgICAgICAgICBBcnJheS5pc0FycmF5KHJlc3VsdC5yZWNvcmRzKVxyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRvdGFsID0gcmVzdWx0Lmhhc093blByb3BlcnR5KCd0b3RhbCcpICYmIGNvcmV1aUZvcm1VdGlscy5pc051bWVyaWMocmVzdWx0LnRvdGFsKSA/IHJlc3VsdC50b3RhbCA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5fdmlld1JlY29yZHMocmVzdWx0LnJlY29yZHMsIHRvdGFsKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuX3ZpZXdSZWNvcmRzKFtdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKHhociwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuX3ZpZXdSZWNvcmRzKFtdKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuX3RyaWdnZXIoJ2Vycm9yLWxvYWQtcmVjb3Jkcy5jb3JldWkudGFibGUnLCB0aGF0LCBbIHRoYXQsIHhociwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24gXSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbih4aHIsIHRleHRTdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQudW5sb2NrKCk7XHJcbiAgICAgICAgICAgICAgICB0aGF0Ll90cmlnZ2VyKCdlbmQtbG9hZC1yZWNvcmRzLmNvcmV1aS50YWJsZScsIHRoYXQsIFsgdGhhdCwgeGhyLCB0ZXh0U3RhdHVzIF0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C10YDQtdC30LDQs9GA0YPQt9C60LAg0LfQsNC/0LjRgdC10Lkg0LIg0YLQsNCx0LvQuNGG0LVcclxuICAgICAqL1xyXG4gICAgcmVsb2FkOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnVybCAmJiB0aGlzLl9vcHRpb25zLnVybCAhPT0gJyMnKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZCh0aGlzLl9vcHRpb25zLnVybCwgdGhpcy5fb3B0aW9ucy5tZXRob2QpXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQktGL0LHQvtGAINCy0YHQtdGFINC30LDQv9C40YHQtdC5INCyINGC0LDQsdC70LjRhtC1XHJcbiAgICAgKi9cclxuICAgIHNlbGVjdEFsbDogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBsZXQgdGFibGVDb250YWluZXIgPSAnI2NvcmV1aS10YWJsZS0nICsgdGhpcy5fb3B0aW9ucy5pZCArICcgPiAuY29yZXVpLXRhYmxlX19jb250YWluZXIgPiAuY29yZXVpLXRhYmxlX193cmFwcGVyID4gdGFibGUnO1xyXG5cclxuICAgICAgICAkKHRhYmxlQ29udGFpbmVyICsgJyA+IHRoZWFkID4gdHIgPiB0ZCA+IC5jb3JldWktdGFibGVfX3NlbGVjdC1hbGwnKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAgICAgJCh0YWJsZUNvbnRhaW5lciArICcgPiB0Ym9keSA+IHRyLmNvcmV1aS10YWJsZV9fcmVjb3JkJykuYWRkQ2xhc3MoJ3RhYmxlLXByaW1hcnknKTtcclxuICAgICAgICAkKHRhYmxlQ29udGFpbmVyICsgJyA+IHRib2R5ID4gdHIuY29yZXVpLXRhYmxlX19yZWNvcmQgPiB0ZCA+IC5jb3JldWktdGFibGVfX3NlbGVjdCcpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuXHJcbiAgICAgICAgdGhpcy5fdHJpZ2dlcignc2VsZWN0LWFsbC5jb3JldWkudGFibGUnLCB0aGlzKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J7RgtC80LXQvdCwINCy0YvQsdC+0YAg0LLRgdC10YUg0LfQsNC/0LjRgdC10Lkg0LIg0YLQsNCx0LvQuNGG0LVcclxuICAgICAqL1xyXG4gICAgdW5zZWxlY3RBbGw6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgbGV0IHRhYmxlQ29udGFpbmVyID0gJyNjb3JldWktdGFibGUtJyArIHRoaXMuX29wdGlvbnMuaWQgKyAnID4gLmNvcmV1aS10YWJsZV9fY29udGFpbmVyID4gLmNvcmV1aS10YWJsZV9fd3JhcHBlciA+IHRhYmxlJztcclxuXHJcbiAgICAgICAgJCh0YWJsZUNvbnRhaW5lciArICcgPiB0aGVhZCA+IHRyID4gdGQgPiAuY29yZXVpLXRhYmxlX19zZWxlY3QtYWxsJykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAkKHRhYmxlQ29udGFpbmVyICsgJyA+IHRib2R5ID4gdHIuY29yZXVpLXRhYmxlX19yZWNvcmQnKS5yZW1vdmVDbGFzcygndGFibGUtcHJpbWFyeScpO1xyXG4gICAgICAgICQodGFibGVDb250YWluZXIgKyAnID4gdGJvZHkgPiB0ci5jb3JldWktdGFibGVfX3JlY29yZCA+IHRkLmNvcmV1aS10YWJsZV9fc2VsZWN0X2NvbnRhaW5lciA+IC5jb3JldWktdGFibGVfX3NlbGVjdCcpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3RyaWdnZXIoJ3Vuc2VsZWN0LWFsbC5jb3JldWkudGFibGUnLCB0aGlzKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JLRi9Cx0L7RgCDQt9Cw0L/QuNGB0Lgg0LIg0YLQsNCx0LvQuNGG0LVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcmltYXJ5S2V5XHJcbiAgICAgKi9cclxuICAgIHNlbGVjdFJlY29yZDogZnVuY3Rpb24gKHByaW1hcnlLZXkpIHtcclxuXHJcbiAgICAgICAgbGV0IHJlY29yZEl0ZW0gPSB0aGlzLl9nZXRSZWNvcmRCeVByaW1hcnlLZXkocHJpbWFyeUtleSk7XHJcblxyXG4gICAgICAgIGlmICggISByZWNvcmRJdGVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCByb3cgPSB0aGlzLl9nZXRSb3dCeUtleShyZWNvcmRJdGVtLmtleSk7XHJcblxyXG4gICAgICAgIGlmICggISByb3cpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJChyb3cpLmFkZENsYXNzKCd0YWJsZS1wcmltYXJ5Jyk7XHJcbiAgICAgICAgJCgnLmNvcmV1aS10YWJsZV9fc2VsZWN0Jywgcm93KS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3RyaWdnZXIoJ3NlbGVjdC5jb3JldWkudGFibGUnLCB0aGlzLCBbIHJlY29yZEl0ZW0ucmVjb3JkIF0pO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQntGC0LzQtdC90LAg0LLRi9Cx0L7RgNCwINC30LDQv9C40YHQuCDQsiDRgtCw0LHQu9C40YbQtVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByaW1hcnlLZXlcclxuICAgICAqL1xyXG4gICAgdW5zZWxlY3RSZWNvcmQ6IGZ1bmN0aW9uIChwcmltYXJ5S2V5KSB7XHJcblxyXG4gICAgICAgIGxldCByZWNvcmRJdGVtID0gdGhpcy5fZ2V0UmVjb3JkQnlQcmltYXJ5S2V5KHByaW1hcnlLZXkpO1xyXG5cclxuICAgICAgICBpZiAoICEgcmVjb3JkSXRlbSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcm93ID0gdGhpcy5fZ2V0Um93QnlLZXkocmVjb3JkSXRlbS5rZXkpO1xyXG5cclxuICAgICAgICBpZiAoICEgcm93KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQocm93KS5yZW1vdmVDbGFzcygndGFibGUtcHJpbWFyeScpO1xyXG4gICAgICAgICQoJy5jb3JldWktdGFibGVfX3NlbGVjdCcsIHJvdykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgdGhpcy5fdHJpZ2dlcigndW5zZWxlY3QuY29yZXVpLnRhYmxlJywgdGhpcywgWyByZWNvcmRJdGVtLnJlY29yZCBdKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QvtC70YPRh9C10L3QuNC1INCy0YvQsdGA0LDQvdC90YvRhSBpZFxyXG4gICAgICogQHJldHVybiB7YXJyYXl9XHJcbiAgICAgKi9cclxuICAgIGdldFNlbGVjdGVkOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGxldCBwcmltYXJ5S2V5cyA9IFtdO1xyXG4gICAgICAgIGxldCB0aGF0ICAgICAgICA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGZpZWxkICAgICAgID0gdGhpcy5fb3B0aW9ucy5wcmltYXJ5S2V5O1xyXG5cclxuICAgICAgICAkKCcjY29yZXVpLXRhYmxlLScgKyB0aGlzLl9vcHRpb25zLmlkICsgJyA+IC5jb3JldWktdGFibGVfX2NvbnRhaW5lciA+IC5jb3JldWktdGFibGVfX3dyYXBwZXIgPiB0YWJsZSA+IHRib2R5ID4gdHIuY29yZXVpLXRhYmxlX19yZWNvcmQgPiB0ZC5jb3JldWktdGFibGVfX3NlbGVjdF9jb250YWluZXIgPiAuY29yZXVpLXRhYmxlX19zZWxlY3Q6Y2hlY2tlZCcpXHJcbiAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uIChrZXksIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGxldCByZWNvcmQgPSB0aGF0Ll9nZXRSZWNvcmRCeUtleSgkKGVsZW1lbnQpLnZhbCgpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoICEgcmVjb3JkIHx8ICEgcmVjb3JkLmhhc093blByb3BlcnR5KGZpZWxkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwcmltYXJ5S2V5cy5wdXNoKHJlY29yZFtmaWVsZF0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICByZXR1cm4gcHJpbWFyeUtleXM7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSDQstGL0LHRgNCw0L3QvdGL0YUg0LfQsNC/0LjRgdC10LlcclxuICAgICAqIEByZXR1cm4ge2FycmF5fVxyXG4gICAgICovXHJcbiAgICBnZXRTZWxlY3RlZFJlY29yZHM6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgbGV0IHJlY29yZHMgPSBbXTtcclxuICAgICAgICBsZXQgdGhhdCAgICA9IHRoaXM7XHJcblxyXG4gICAgICAgICQoJyNjb3JldWktdGFibGUtJyArIHRoaXMuX29wdGlvbnMuaWQgKyAnID4gLmNvcmV1aS10YWJsZV9fY29udGFpbmVyID4gLmNvcmV1aS10YWJsZV9fd3JhcHBlciA+IHRhYmxlID4gdGJvZHkgPiB0ci5jb3JldWktdGFibGVfX3JlY29yZCA+IHRkLmNvcmV1aS10YWJsZV9fc2VsZWN0X2NvbnRhaW5lciA+IC5jb3JldWktdGFibGVfX3NlbGVjdDpjaGVja2VkJylcclxuICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24gKGtleSwgZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlY29yZCA9IHRoYXQuX2dldFJlY29yZEJ5S2V5KCQoZWxlbWVudCkudmFsKCkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICggISByZWNvcmQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmVjb3Jkcy5wdXNoKHJlY29yZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgIHJldHVybiByZWNvcmRzO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUg0LfQsNC/0LjRgdC4INC/0L4gaWRcclxuICAgICAqIEBwYXJhbSBwcmltYXJ5S2V5XHJcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R8bnVsbH1cclxuICAgICAqL1xyXG4gICAgZ2V0UmVjb3JkOiBmdW5jdGlvbiAocHJpbWFyeUtleSkge1xyXG5cclxuICAgICAgICBsZXQgcmVjb3JkSXRlbSA9IHRoaXMuX2dldFJlY29yZEJ5UHJpbWFyeUtleShwcmltYXJ5S2V5KTtcclxuXHJcbiAgICAgICAgaWYgKCAhIHJlY29yZEl0ZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVjb3JkSXRlbS5yZWNvcmQ7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSDQt9Cw0L/QuNGB0LXQuVxyXG4gICAgICovXHJcbiAgICBnZXRSZWNvcmRzOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9vcHRpb25zLnJlY29yZHNcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QtdGA0LXRhdC+0LQg0Log0L/RgNC10LTRi9C00YPRidC10Lkg0YHRgtGA0LDQvdC40YbQtVxyXG4gICAgICovXHJcbiAgICBwcmV2UGFnZTogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fcGFnZSA+IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5fcGFnZS0tO1xyXG4gICAgICAgICAgICB0aGlzLnJlbG9hZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QtdGA0LXRhdC+0LQg0Log0YHQu9C10LTRg9GO0YnQtdC5INGB0YLRgNCw0L3QuNGG0LVcclxuICAgICAqIEByZXR1cm4ge2FycmF5fVxyXG4gICAgICovXHJcbiAgICBuZXh0UGFnZTogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBsZXQgdG90YWxQYWdlcyA9IHRoaXMuX3JlY29yZHNUb3RhbCA+IDAgJiYgdGhpcy5fcmVjb3Jkc1BlclBhZ2UgPiAwXHJcbiAgICAgICAgICAgID8gTWF0aC5jZWlsKHRoaXMuX3JlY29yZHNUb3RhbCAvIHRoaXMuX3JlY29yZHNQZXJQYWdlKVxyXG4gICAgICAgICAgICA6IDE7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9wYWdlIDwgdG90YWxQYWdlcykge1xyXG4gICAgICAgICAgICB0aGlzLl9wYWdlKys7XHJcbiAgICAgICAgICAgIHRoaXMucmVsb2FkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C10YDQtdGF0L7QtCDQuiDRg9C60LDQt9Cw0L3QvdC+0Lkg0YHRgtGA0LDQvdC40YbQtVxyXG4gICAgICovXHJcbiAgICBnb1BhZ2U6IGZ1bmN0aW9uIChwYWdlKSB7XHJcblxyXG4gICAgICAgIGlmIChwYWdlID49IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5fcGFnZSA9IHBhZ2U7XHJcbiAgICAgICAgICAgIHRoaXMucmVsb2FkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gZXZlbnROYW1lXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tcclxuICAgICAqIEBwYXJhbSBjb250ZXh0XHJcbiAgICAgKiBAcGFyYW0gc2luZ2xlRXhlY1xyXG4gICAgICovXHJcbiAgICBvbjogZnVuY3Rpb24oZXZlbnROYW1lLCBjYWxsYmFjaywgY29udGV4dCwgc2luZ2xlRXhlYykge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5fZXZlbnRzW2V2ZW50TmFtZV0gIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50c1tldmVudE5hbWVdID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2V2ZW50c1tldmVudE5hbWVdLnB1c2goe1xyXG4gICAgICAgICAgICBjb250ZXh0IDogY29udGV4dCB8fCB0aGlzLFxyXG4gICAgICAgICAgICBjYWxsYmFjazogY2FsbGJhY2ssXHJcbiAgICAgICAgICAgIHNpbmdsZUV4ZWM6ICEhIHNpbmdsZUV4ZWMsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSBuYW1lXHJcbiAgICAgKiBAcGFyYW0gY29udGV4dFxyXG4gICAgICogQHBhcmFtIHBhcmFtc1xyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgX3RyaWdnZXI6IGZ1bmN0aW9uKG5hbWUsIGNvbnRleHQsIHBhcmFtcykge1xyXG5cclxuICAgICAgICBwYXJhbXMgPSBwYXJhbXMgfHwgW107XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9ldmVudHNbbmFtZV0gaW5zdGFuY2VvZiBPYmplY3QgJiYgdGhpcy5fZXZlbnRzW25hbWVdLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9ldmVudHNbbmFtZV0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBjYWxsYmFjayA9IHRoaXMuX2V2ZW50c1tuYW1lXVtpXS5jYWxsYmFjaztcclxuXHJcbiAgICAgICAgICAgICAgICBjb250ZXh0ID0gY29udGV4dCB8fCB0aGlzLl9ldmVudHNbbmFtZV1baV0uY29udGV4dDtcclxuXHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5hcHBseShjb250ZXh0LCBwYXJhbXMpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9ldmVudHNbbmFtZV1baV0uc2luZ2xlRXhlYykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50c1tuYW1lXS5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSDQvdCw0YHRgtGA0L7QtdC6INGP0LfRi9C60LBcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIF9nZXRMYW5nOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIHJldHVybiBDb3JlVUkudGFibGUubGFuZy5oYXNPd25Qcm9wZXJ0eSh0aGlzLl9vcHRpb25zLmxhbmcpXHJcbiAgICAgICAgICAgID8gQ29yZVVJLnRhYmxlLmxhbmdbdGhpcy5fb3B0aW9ucy5sYW5nXVxyXG4gICAgICAgICAgICA6IENvcmVVSS50YWJsZS5sYW5nWydydSddO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUg0LfQsNC/0LjRgdC4INC/0L4g0LrQu9GO0YfRg1xyXG4gICAgICogQHBhcmFtIHJlY29yZEtleVxyXG4gICAgICogQHJldHVybiB7b2JqZWN0fG51bGx9XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBfZ2V0UmVjb3JkQnlLZXk6IGZ1bmN0aW9uIChyZWNvcmRLZXkpIHtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiByZWNvcmRLZXkgPT09ICd1bmRlZmluZWQnIHx8IHJlY29yZEtleSA9PT0gJycpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcmVjb3JkID0gdGhpcy5fb3B0aW9ucy5yZWNvcmRzLmhhc093blByb3BlcnR5KHJlY29yZEtleSlcclxuICAgICAgICAgICAgPyB0aGlzLl9vcHRpb25zLnJlY29yZHNbcmVjb3JkS2V5XVxyXG4gICAgICAgICAgICA6IG51bGw7XHJcblxyXG4gICAgICAgIGlmICggISByZWNvcmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVjb3JkO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUg0LfQsNC/0LjRgdC4INC/0L4gaWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcmltYXJ5S2V5XHJcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R8bnVsbH1cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIF9nZXRSZWNvcmRCeVByaW1hcnlLZXk6IGZ1bmN0aW9uIChwcmltYXJ5S2V5KSB7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgcHJpbWFyeUtleSA9PT0gJ3VuZGVmaW5lZCcgfHwgcHJpbWFyeUtleSA9PT0gJycpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcmVjb3JkICAgID0gbnVsbDtcclxuICAgICAgICBsZXQgcmVjb3JkS2V5ID0gbnVsbDtcclxuICAgICAgICBsZXQgZmllbGQgICAgID0gdGhpcy5fb3B0aW9ucy5wcmltYXJ5S2V5O1xyXG5cclxuICAgICAgICAkLmVhY2godGhpcy5fb3B0aW9ucy5yZWNvcmRzLCBmdW5jdGlvbiAoa2V5LCByZWNvcmRJdGVtKSB7XHJcbiAgICAgICAgICAgIGlmIChyZWNvcmRJdGVtLmhhc093blByb3BlcnR5KGZpZWxkKSAmJiByZWNvcmRJdGVtW2ZpZWxkXSA9PT0gcHJpbWFyeUtleSkge1xyXG4gICAgICAgICAgICAgICAgcmVjb3JkS2V5ID0ga2V5O1xyXG4gICAgICAgICAgICAgICAgcmVjb3JkICAgID0gcmVjb3JkSXRlbTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoICEgcmVjb3JkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAga2V5OiByZWNvcmRLZXksXHJcbiAgICAgICAgICAgIHJlY29yZDogcmVjb3JkLFxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSDRjdC70LXQvNC10L3RgtCwINGB0YLRgNC+0LrQuCDQv9C+INC60LvRjtGH0YNcclxuICAgICAqIEBwYXJhbSB7aW50fSByZWNvcmRLZXlcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIF9nZXRSb3dCeUtleTogZnVuY3Rpb24gKHJlY29yZEtleSkge1xyXG5cclxuICAgICAgICByZXR1cm4gJCgnI2NvcmV1aS10YWJsZS0nICsgdGhpcy5fb3B0aW9ucy5pZCArICcgPiAuY29yZXVpLXRhYmxlX19jb250YWluZXIgPiAuY29yZXVpLXRhYmxlX193cmFwcGVyID4gdGFibGUgPiB0Ym9keSA+IHRyW2RhdGEtcmVjb3JkLWtleT1cIicgKyByZWNvcmRLZXkgKyAnXCJdJyk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7QutCw0Lcg0YPQutCw0LfQsNC90L3Ri9GFINC30LDQv9C40YHQtdC5INCyINGC0LDQsdC70LjRhtC1XHJcbiAgICAgKiBAcGFyYW0gcmVjb3Jkc1xyXG4gICAgICogQHBhcmFtIHRvdGFsXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBfdmlld1JlY29yZHM6IGZ1bmN0aW9uIChyZWNvcmRzLCB0b3RhbCkge1xyXG5cclxuICAgICAgICB0aGlzLl9yZWNvcmRzVG90YWwgPSBjb3JldWlGb3JtVXRpbHMuaXNOdW1lcmljKHRvdGFsKSA/IHBhcnNlSW50KHRvdGFsKSA6IHJlY29yZHMubGVuZ3RoO1xyXG4gICAgICAgIGxldCB0aGF0ICAgICAgICAgICA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGh0bWxSZWNvcmRzICAgID0gJyc7XHJcbiAgICAgICAgbGV0IHRvdGFsUGFnZXMgICAgID0gdGhpcy5fcmVjb3Jkc1RvdGFsID4gMCAmJiB0aGlzLl9yZWNvcmRzUGVyUGFnZSA+IDBcclxuICAgICAgICAgICAgPyBNYXRoLmNlaWwodGhpcy5fcmVjb3Jkc1RvdGFsIC8gdGhpcy5fcmVjb3Jkc1BlclBhZ2UpXHJcbiAgICAgICAgICAgIDogMTtcclxuXHJcbiAgICAgICAgdGhpcy5fb3B0aW9ucy5yZWNvcmRzID0gcmVjb3JkcztcclxuXHJcbiAgICAgICAgdGhhdC5fcmVjb3Jkc051bWJlciA9IHRoaXMuX3BhZ2UgPT09IDEgPyAxIDogKCh0aGlzLl9wYWdlIC0gMSkgKiB0aGlzLl9yZWNvcmRzUGVyUGFnZSkgKyAxO1xyXG5cclxuICAgICAgICBpZiAocmVjb3Jkcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCByZW5kZXJSZWNvcmRlcnMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICQuZWFjaChyZWNvcmRzLCBmdW5jdGlvbiAoa2V5LCByZWNvcmQpIHtcclxuICAgICAgICAgICAgICAgIHJlbmRlclJlY29yZGVycy5wdXNoKHRoYXQuX3JlbmRlclJlY29yZChyZWNvcmQsIGtleSkpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5fcmVjb3Jkc051bWJlcisrO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGh0bWxSZWNvcmRzID0gZWpzLnJlbmRlcihjb3JldWlGb3JtVHBsWyd0YWJsZS1yZWNvcmRzLmh0bWwnXSwge1xyXG4gICAgICAgICAgICAgICAgcmVjb3JkczogcmVuZGVyUmVjb3JkZXJzLFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaHRtbFJlY29yZHMgPSBlanMucmVuZGVyKGNvcmV1aUZvcm1UcGxbJ3RhYmxlLXJlY29yZHMtZW1wdHkuaHRtbCddLCB7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW5zQ291bnQ6IHRoaXMuX2NvbHVtbnMubGVuZ3RoID4gMCA/IHRoaXMuX2NvbHVtbnMubGVuZ3RoIDogMSxcclxuICAgICAgICAgICAgICAgIGxhbmc6IHRoaXMuX2dldExhbmcoKSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgbGV0IHRhYmxlQ29udGFpbmVyID0gJyNjb3JldWktdGFibGUtJyArIHRoaXMuX29wdGlvbnMuaWQgKyAnID4gLmNvcmV1aS10YWJsZV9fY29udGFpbmVyID4gLmNvcmV1aS10YWJsZV9fd3JhcHBlciA+IHRhYmxlJztcclxuXHJcbiAgICAgICAgJCh0YWJsZUNvbnRhaW5lciArICcgPiB0Zm9vdCA+IHRyID4gdGQgLmNvcmV1aS10YWJsZV9fcGFnZV9jdXJyZW50JykudGV4dCh0aGlzLl9wYWdlKTtcclxuICAgICAgICAkKHRhYmxlQ29udGFpbmVyICsgJyA+IHRmb290ID4gdHIgPiB0ZCAuY29yZXVpLXRhYmxlX19wYWdlc190b3RhbCcpLnRleHQodG90YWxQYWdlcyk7XHJcbiAgICAgICAgJCh0YWJsZUNvbnRhaW5lciArICcgPiB0Zm9vdCA+IHRyID4gdGQgLmNvcmV1aS10YWJsZV9fcGFnZV9wcmV2JykuYXR0cignZGlzYWJsZWQnLCB0aGlzLl9wYWdlIDw9IDEpO1xyXG4gICAgICAgICQodGFibGVDb250YWluZXIgKyAnID4gdGZvb3QgPiB0ciA+IHRkIC5jb3JldWktdGFibGVfX3BhZ2VfbmV4dCcpLmF0dHIoJ2Rpc2FibGVkJywgdGhpcy5fcGFnZSA+PSB0b3RhbFBhZ2VzKTtcclxuXHJcbiAgICAgICAgJCh0YWJsZUNvbnRhaW5lciArICcgPiB0Ym9keScpLmh0bWwoaHRtbFJlY29yZHMpO1xyXG4gICAgICAgICQoJyNjb3JldWktdGFibGUtJyArIHRoaXMuX29wdGlvbnMuaWQgKyAnIC5jb3JldWktdGFibGVfX2NvdW50LXRvdGFsJykudGV4dCh0aGlzLl9yZWNvcmRzVG90YWwpO1xyXG5cclxuICAgICAgICB0aGlzLl90cmlnZ2VyKCdzaG93LXJlY29yZHMuY29yZXVpLnRhYmxlJywgdGhpcywgWyB0aGlzIF0pO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcmVjb3JkXHJcbiAgICAgKiBAcGFyYW0ge2ludH0gICAgcmVjb3JkS2V5XHJcbiAgICAgKiBAcmV0dXJucyB7eyBhdHRyOiAoc3RyaW5nKSwgZmllbGRzOiAob2JqZWN0KSB9fX1cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIF9yZW5kZXJSZWNvcmQ6IGZ1bmN0aW9uIChyZWNvcmQsIHJlY29yZEtleSkge1xyXG5cclxuICAgICAgICBsZXQgdGhhdCAgICAgICAgPSB0aGlzO1xyXG4gICAgICAgIGxldCBmaWVsZHMgICAgICA9IFtdO1xyXG4gICAgICAgIGxldCByZWNvcmRQcm9wcyA9IHR5cGVvZiByZWNvcmQuY29yZXVpID09PSAnb2JqZWN0JyAmJiAhIEFycmF5LmlzQXJyYXkocmVjb3JkLmNvcmV1aSkgPyByZWNvcmQuY29yZXVpIDogbnVsbDtcclxuICAgICAgICBsZXQgcmVjb3JkQXR0ciAgPSB7XHJcbiAgICAgICAgICAgIGNsYXNzOiAnY29yZXVpLXRhYmxlX19yZWNvcmQnXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJC5lYWNoKHRoaXMuX2NvbHVtbnMsIGZ1bmN0aW9uIChrZXksIGNvbHVtbikge1xyXG4gICAgICAgICAgICBmaWVsZHMucHVzaCh0aGF0Ll9yZW5kZXJGaWVsZChjb2x1bW4sIHJlY29yZCwgcmVjb3JkS2V5KSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5fb3B0aW9ucy5vbkNsaWNrVXJsID09PSAnc3RyaW5nJyAmJiB0aGlzLl9vcHRpb25zLm9uQ2xpY2tVcmwpIHtcclxuICAgICAgICAgICAgcmVjb3JkQXR0ci5jbGFzcyArPSAnIGNvcmV1aS10YWJsZV9wb2ludGVyJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChyZWNvcmRQcm9wcykge1xyXG4gICAgICAgICAgICByZWNvcmRBdHRyID0gY29yZXVpRm9ybVV0aWxzLm1lcmdlQXR0cihyZWNvcmRBdHRyLCByZWNvcmRQcm9wcy5hdHRyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCByZWNvcmRBdHRyUmVzdWx0ID0gW107XHJcblxyXG4gICAgICAgICQuZWFjaChyZWNvcmRBdHRyLCBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgcmVjb3JkQXR0clJlc3VsdC5wdXNoKG5hbWUgKyAnPVwiJyArIHZhbHVlICsgJ1wiJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGF0dHI6IHJlY29yZEF0dHJSZXN1bHQubGVuZ3RoID4gMCA/ICgnICcgKyByZWNvcmRBdHRyUmVzdWx0LmpvaW4oJyAnKSkgOiAnJyxcclxuICAgICAgICAgICAgZmllbGRzOiBmaWVsZHNcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGNvbHVtblxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHJlY29yZFxyXG4gICAgICogQHBhcmFtIHtpbnR9IHJlY29yZEtleVxyXG4gICAgICogQHJldHVybnMge3sgYXR0cjogKHN0cmluZyksIGNvbnRlbnQ6IChzdHJpbmcpIH19XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBfcmVuZGVyRmllbGQ6IGZ1bmN0aW9uIChjb2x1bW4sIHJlY29yZCwgcmVjb3JkS2V5KSB7XHJcblxyXG4gICAgICAgIGxldCBjb2x1bW5PcHRpb25zID0gY29sdW1uLmdldE9wdGlvbnMoKTtcclxuICAgICAgICBsZXQgY29sdW1uRmllbGQgICA9IHR5cGVvZiBjb2x1bW5PcHRpb25zLmZpZWxkID09PSAnc3RyaW5nJyA/IGNvbHVtbk9wdGlvbnMuZmllbGQgOiBudWxsO1xyXG4gICAgICAgIGxldCBjb250ZW50ICAgICAgID0gJyc7XHJcbiAgICAgICAgbGV0IHJlY29yZFByb3BzICAgPSB0eXBlb2YgcmVjb3JkLmNvcmV1aSA9PT0gJ29iamVjdCcgJiYgISBBcnJheS5pc0FycmF5KHJlY29yZC5jb3JldWkpID8gcmVjb3JkLmNvcmV1aSA6IG51bGw7XHJcbiAgICAgICAgbGV0IGZpZWxkUHJvcHMgICAgPSByZWNvcmRQcm9wcyAmJiByZWNvcmRQcm9wcy5oYXNPd25Qcm9wZXJ0eSgnZmllbGRzJykgJiYgcmVjb3JkUHJvcHMuZmllbGRzLmhhc093blByb3BlcnR5KGNvbHVtbkZpZWxkKVxyXG4gICAgICAgICAgICA/IHJlY29yZFByb3BzLmZpZWxkc1tjb2x1bW5GaWVsZF1cclxuICAgICAgICAgICAgOiBudWxsO1xyXG4gICAgICAgIGxldCBmaWVsZEF0dHIgPSB0eXBlb2YgY29sdW1uT3B0aW9ucy5hdHRyID09PSAnb2JqZWN0JyAmJiAhIEFycmF5LmlzQXJyYXkoY29sdW1uT3B0aW9ucy5hdHRyKVxyXG4gICAgICAgICAgICA/IGNvbHVtbk9wdGlvbnMuYXR0clxyXG4gICAgICAgICAgICA6IHt9O1xyXG5cclxuICAgICAgICBpZiAoZmllbGRQcm9wcyAmJiB0eXBlb2YgZmllbGRQcm9wcy5hdHRyID09PSAnb2JqZWN0JyAmJiAhIEFycmF5LmlzQXJyYXkoZmllbGRQcm9wcy5hdHRyKSkge1xyXG4gICAgICAgICAgICBmaWVsZEF0dHIgPSBjb3JldWlGb3JtVXRpbHMubWVyZ2VBdHRyKGZpZWxkQXR0ciwgZmllbGRQcm9wcy5hdHRyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgY29sdW1uT3B0aW9ucy5yZW5kZXIgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgY29udGVudCA9IGNvbHVtbk9wdGlvbnMucmVuZGVyKHJlY29yZCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29udGVudCA9IGNvbHVtbkZpZWxkICYmIHJlY29yZC5oYXNPd25Qcm9wZXJ0eShjb2x1bW5GaWVsZClcclxuICAgICAgICAgICAgICAgID8gcmVjb3JkW2NvbHVtbkZpZWxkXVxyXG4gICAgICAgICAgICAgICAgOiAnJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnRlbnQgPSBjb2x1bW4ucmVuZGVyKGNvbnRlbnQsIHJlY29yZCwgcmVjb3JkS2V5KTtcclxuXHJcbiAgICAgICAgbGV0IGZpZWxkQXR0clJlc3VsdCA9IFtdO1xyXG5cclxuICAgICAgICAkLmVhY2goZmllbGRBdHRyLCBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgZmllbGRBdHRyUmVzdWx0LnB1c2gobmFtZSArICc9XCInICsgdmFsdWUgKyAnXCInKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYXR0cjogICAgZmllbGRBdHRyUmVzdWx0Lmxlbmd0aCA+IDAgPyAoJyAnICsgZmllbGRBdHRyUmVzdWx0LmpvaW4oJyAnKSkgOiAnJyxcclxuICAgICAgICAgICAgY29udGVudDogY29udGVudCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29yZXVpVGFibGVJbnN0YW5jZTsiLCJcclxuaW1wb3J0IGNvcmV1aUZvcm1JbnN0YW5jZSBmcm9tICcuL2NvcmV1aS50YWJsZS5pbnN0YW5jZSc7XHJcblxyXG52YXIgY29yZXVpVGFibGUgPSB7XHJcblxyXG4gICAgY29sdW1uczoge30sXHJcbiAgICBjb250cm9sczoge30sXHJcbiAgICBmaWx0ZXJzOiB7fSxcclxuICAgIHNlYXJjaDoge30sXHJcbiAgICBsYW5nOiB7fSxcclxuXHJcbiAgICBfaW5zdGFuY2VzOiB7fSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXHJcbiAgICAgKiBAcmV0dXJucyB7Q29yZVVJLnRhYmxlLmluc3RhbmNlfVxyXG4gICAgICovXHJcbiAgICBjcmVhdGU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcblxyXG4gICAgICAgIGxldCBpbnN0YW5jZSA9ICQuZXh0ZW5kKHRydWUsIHt9LCBjb3JldWlGb3JtSW5zdGFuY2UpO1xyXG4gICAgICAgIGluc3RhbmNlLl9pbml0KG9wdGlvbnMgaW5zdGFuY2VvZiBPYmplY3QgPyBvcHRpb25zIDoge30pO1xyXG5cclxuICAgICAgICBsZXQgdGFibGVJZCA9IGluc3RhbmNlLmdldElkKCk7XHJcbiAgICAgICAgdGhpcy5faW5zdGFuY2VzW3RhYmxlSWRdID0gaW5zdGFuY2U7XHJcblxyXG4gICAgICAgIHJldHVybiBpbnN0YW5jZTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICAgKiBAcmV0dXJucyB7Q29yZVVJLnRhYmxlLmluc3RhbmNlfG51bGx9XHJcbiAgICAgKi9cclxuICAgIGdldDogZnVuY3Rpb24gKGlkKSB7XHJcblxyXG4gICAgICAgIGlmICggISB0aGlzLl9pbnN0YW5jZXMuaGFzT3duUHJvcGVydHkoaWQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCAhICQoJyNjb3JldWktdGFibGUtJyArIGlkKVswXSkge1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5faW5zdGFuY2VzW2lkXTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2VzW2lkXTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29yZXVpVGFibGU7IiwiXHJcbmltcG9ydCBjb3JldWlUYWJsZSBmcm9tIFwiLi4vY29yZXVpLnRhYmxlXCI7XHJcblxyXG5jb3JldWlUYWJsZS5sYW5nLnJ1ID0ge1xyXG4gICAgXCJlbXB0eVJlY29yZHNcIjogXCLQndC10YIg0LfQsNC/0LjRgdC10LlcIixcclxuICAgIFwibG9hZGluZ1wiOiBcItCX0LDQs9GA0YPQt9C60LAuLi5cIixcclxuICAgIFwidG90YWxcIjogXCLQktGB0LXQs9C+XCIsXHJcbiAgICBcIm9mXCI6IFwi0LjQt1wiLFxyXG4gICAgXCJhbGxcIjogXCLQktGB0LVcIixcclxufSIsIlxyXG5pbXBvcnQgY29yZXVpVGFibGUgZnJvbSBcIi4uL2NvcmV1aS50YWJsZVwiO1xyXG5cclxuY29yZXVpVGFibGUubGFuZy5ydSA9IHtcclxuICAgIFwiZW1wdHlSZWNvcmRzXCI6IFwiTm8gcmVjb3Jkc1wiLFxyXG4gICAgXCJsb2FkaW5nXCI6IFwiTG9hZGluZy4uLlwiLFxyXG4gICAgXCJ0b3RhbFwiOiBcIlRvdGFsXCIsXHJcbiAgICBcIm9mXCI6IFwib2ZcIixcclxuICAgIFwiYWxsXCI6IFwiQWxsXCIsXHJcbn0iLCJcclxuaW1wb3J0ICcuLi8uLi8uLi9ub2RlX21vZHVsZXMvZWpzL2Vqcy5taW4nO1xyXG5pbXBvcnQgY29yZXVpVGFibGVUcGwgICBmcm9tICcuLi9jb3JldWkudGFibGUudGVtcGxhdGVzJztcclxuaW1wb3J0IGNvcmV1aVRhYmxlVXRpbHMgZnJvbSAnLi4vY29yZXVpLnRhYmxlLnV0aWxzJztcclxuaW1wb3J0IGNvcmV1aVRhYmxlICAgICAgZnJvbSBcIi4uL2NvcmV1aS50YWJsZVwiO1xyXG5cclxuY29yZXVpVGFibGUuY29udHJvbHMuYnV0dG9uID0ge1xyXG5cclxuICAgIF90YWJsZTogbnVsbCxcclxuICAgIF9vcHRpb25zOiB7XHJcbiAgICAgICAgaWQ6IG51bGwsXHJcbiAgICAgICAgdHlwZTogJ2J1dHRvbicsXHJcbiAgICAgICAgaHJlZjogbnVsbCxcclxuICAgICAgICBjb250ZW50OiBudWxsLFxyXG4gICAgICAgIG9uQ2xpY2s6IG51bGwsXHJcbiAgICAgICAgYXR0cjogbnVsbFxyXG4gICAgfSxcclxuICAgIF9yZW5kZXI6IHtcclxuICAgICAgICBhdHRyOiAnJ1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRj1xyXG4gICAgICogQHBhcmFtIHtDb3JlVUkudGFibGUuaW5zdGFuY2V9IHRhYmxlXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uc1xyXG4gICAgICovXHJcbiAgICBpbml0OiBmdW5jdGlvbiAodGFibGUsIG9wdGlvbnMpIHtcclxuXHJcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCB0aGlzLl9vcHRpb25zLCBvcHRpb25zKTtcclxuICAgICAgICB0aGlzLl90YWJsZSAgID0gdGFibGU7XHJcblxyXG4gICAgICAgIGlmICggISB0aGlzLl9vcHRpb25zLmlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuaWQgPSBjb3JldWlUYWJsZVV0aWxzLmhhc2hDb2RlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDRgdC+0LHRi9GC0LjQuSDRgdCy0Y/Qt9Cw0L3QvdGL0YUg0YEg0Y3Qu9C10LzQtdC90YLQvtC8INGD0L/RgNCw0LLQu9C10L3QuNGPXHJcbiAgICAgKi9cclxuICAgIGluaXRFdmVudHM6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuX29wdGlvbnMub25DbGljayA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgdGhpcy5fb3B0aW9ucy5vbkNsaWNrID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAkKCcjY29yZXVpLXRhYmxlLScgKyB0aGlzLl90YWJsZS5fb3B0aW9ucy5pZCArICcgI2NvcmV1aS10YWJsZS1jb250cm9sLScgKyB0aGlzLl9vcHRpb25zLmlkICsgJyA+IGJ1dHRvbicpXHJcbiAgICAgICAgICAgICAgICAuY2xpY2soZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGF0Ll9vcHRpb25zLm9uQ2xpY2sgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5fb3B0aW9ucy5vbkNsaWNrKGV2ZW50LCB0aGF0Ll90YWJsZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoYXQuX29wdGlvbnMub25DbGljayA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKG5ldyBGdW5jdGlvbih0aGF0Ll9vcHRpb25zLm9uQ2xpY2spKSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QvtC70YPRh9C10L3QuNC1IElEINGN0LvQtdC80LXQvdGC0LAg0YPQv9GA0LDQstC70LXQvdC40Y9cclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldElkOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9vcHRpb25zLmlkO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQpNC+0YDQvNC40YDQvtCy0LDQvdC40LUg0LrQvtC90YLQtdC90YLQsCDQtNC70Y8g0YDQsNC30LzQtdGJ0LXQvdC40Y8g0L3QsCDRgdGC0YDQsNC90LjRhtC1XHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuX29wdGlvbnMuYXR0ciA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgbGV0IGF0dHJpYnV0ZXMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICQuZWFjaCh0aGlzLl9vcHRpb25zLmF0dHIsIGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlcy5wdXNoKG5hbWUgKyAnPVwiJyArIHZhbHVlICsgJ1wiJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fcmVuZGVyLmF0dHIgPSAnICcgKyBhdHRyaWJ1dGVzLmpvaW4oJyAnKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gZWpzLnJlbmRlcihjb3JldWlUYWJsZVRwbFsnY29udHJvbHMvYnV0dG9uLmh0bWwnXSwge1xyXG4gICAgICAgICAgICBjb250cm9sOiB0aGlzLl9vcHRpb25zLFxyXG4gICAgICAgICAgICByZW5kZXI6IHRoaXMuX3JlbmRlcixcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSIsIlxyXG5pbXBvcnQgY29yZXVpVGFibGVVdGlscyBmcm9tICcuLi9jb3JldWkudGFibGUudXRpbHMnO1xyXG5pbXBvcnQgY29yZXVpVGFibGUgICAgICBmcm9tIFwiLi4vY29yZXVpLnRhYmxlXCI7XHJcblxyXG5jb3JldWlUYWJsZS5jb250cm9scy5jdXN0b20gPSB7XHJcblxyXG4gICAgX3RhYmxlOiBudWxsLFxyXG4gICAgX29wdGlvbnM6IHtcclxuICAgICAgICBpZDogbnVsbCxcclxuICAgICAgICB0eXBlOiAnY3VzdG9tJyxcclxuICAgICAgICBjb250ZW50OiBudWxsXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPXHJcbiAgICAgKiBAcGFyYW0ge0NvcmVVSS50YWJsZS5pbnN0YW5jZX0gdGFibGVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXHJcbiAgICAgKi9cclxuICAgIGluaXQ6IGZ1bmN0aW9uICh0YWJsZSwgb3B0aW9ucykge1xyXG5cclxuICAgICAgICB0aGlzLl9vcHRpb25zID0gJC5leHRlbmQoe30sIHRoaXMuX29wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuX3RhYmxlICAgPSB0YWJsZTtcclxuXHJcbiAgICAgICAgaWYgKCAhIHRoaXMuX29wdGlvbnMuaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5pZCA9IGNvcmV1aVRhYmxlVXRpbHMuaGFzaENvZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGB0L7QsdGL0YLQuNC5INGB0LLRj9C30LDQvdC90YvRhSDRgSDRjdC70LXQvNC10L3RgtC+0Lwg0YPQv9GA0LDQstC70LXQvdC40Y9cclxuICAgICAqL1xyXG4gICAgaW5pdEV2ZW50czogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QvtC70YPRh9C10L3QuNC1IElEINGN0LvQtdC80LXQvdGC0LAg0YPQv9GA0LDQstC70LXQvdC40Y9cclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldElkOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9vcHRpb25zLmlkO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQpNC+0YDQvNC40YDQvtCy0LDQvdC40LUg0LrQvtC90YLQtdC90YLQsCDQtNC70Y8g0YDQsNC30LzQtdGJ0LXQvdC40Y8g0L3QsCDRgdGC0YDQsNC90LjRhtC1XHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW9ucy5jb250ZW50O1xyXG4gICAgfVxyXG59IiwiXHJcbmltcG9ydCAnLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Vqcy9lanMubWluJztcclxuaW1wb3J0IGNvcmV1aVRhYmxlVHBsICAgZnJvbSAnLi4vY29yZXVpLnRhYmxlLnRlbXBsYXRlcyc7XHJcbmltcG9ydCBjb3JldWlUYWJsZVV0aWxzIGZyb20gJy4uL2NvcmV1aS50YWJsZS51dGlscyc7XHJcbmltcG9ydCBjb3JldWlUYWJsZSAgICAgIGZyb20gXCIuLi9jb3JldWkudGFibGVcIjtcclxuXHJcbmNvcmV1aVRhYmxlLmNvbnRyb2xzLmxpbmsgPSB7XHJcblxyXG4gICAgX3RhYmxlOiBudWxsLFxyXG4gICAgX29wdGlvbnM6IHtcclxuICAgICAgICBpZDogbnVsbCxcclxuICAgICAgICB0eXBlOiAnbGluaycsXHJcbiAgICAgICAgaHJlZjogbnVsbCxcclxuICAgICAgICBjb250ZW50OiBudWxsLFxyXG4gICAgICAgIGF0dHI6IG51bGxcclxuICAgIH0sXHJcbiAgICBfcmVuZGVyOiB7XHJcbiAgICAgICAgYXR0cjogJydcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y9cclxuICAgICAqIEBwYXJhbSB7Q29yZVVJLnRhYmxlLmluc3RhbmNlfSB0YWJsZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnNcclxuICAgICAqL1xyXG4gICAgaW5pdDogZnVuY3Rpb24gKHRhYmxlLCBvcHRpb25zKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSAkLmV4dGVuZCh7fSwgdGhpcy5fb3B0aW9ucywgb3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5fdGFibGUgICA9IHRhYmxlO1xyXG5cclxuICAgICAgICBpZiAoICEgdGhpcy5fb3B0aW9ucy5pZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLmlkID0gY29yZXVpVGFibGVVdGlscy5oYXNoQ29kZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0YHQvtCx0YvRgtC40Lkg0YHQstGP0LfQsNC90L3Ri9GFINGBINGN0LvQtdC80LXQvdGC0L7QvCDRg9C/0YDQsNCy0LvQtdC90LjRj1xyXG4gICAgICovXHJcbiAgICBpbml0RXZlbnRzOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUgSUQg0Y3Qu9C10LzQtdC90YLQsCDRg9C/0YDQsNCy0LvQtdC90LjRj1xyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0SWQ6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wdGlvbnMuaWQ7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCk0L7RgNC80LjRgNC+0LLQsNC90LjQtSDQutC+0L3RgtC10L3RgtCwINC00LvRjyDRgNCw0LfQvNC10YnQtdC90LjRjyDQvdCwINGB0YLRgNCw0L3QuNGG0LVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5fb3B0aW9ucy5hdHRyID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICBsZXQgYXR0cmlidXRlcyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgJC5lYWNoKHRoaXMuX29wdGlvbnMuYXR0ciwgZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzLnB1c2gobmFtZSArICc9XCInICsgdmFsdWUgKyAnXCInKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9yZW5kZXIuYXR0ciA9ICcgJyArIGF0dHJpYnV0ZXMuam9pbignICcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGVqcy5yZW5kZXIoY29yZXVpVGFibGVUcGxbJ2NvbnRyb2xzL2xpbmsuaHRtbCddLCB7XHJcbiAgICAgICAgICAgIGNvbnRyb2w6IHRoaXMuX29wdGlvbnMsXHJcbiAgICAgICAgICAgIHJlbmRlcjogdGhpcy5fcmVuZGVyLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59IiwiXHJcbmltcG9ydCBjb3JldWlUYWJsZSBmcm9tIFwiLi4vY29yZXVpLnRhYmxlXCI7XHJcblxyXG5jb3JldWlUYWJsZS5jb2x1bW5zLmRhdGUgPSB7XHJcblxyXG4gICAgX3RhYmxlOiBudWxsLFxyXG4gICAgX29wdGlvbnM6IHtcclxuICAgICAgICB0eXBlOiAnZGF0ZScsXHJcbiAgICAgICAgZmllbGQ6IG51bGwsXHJcbiAgICAgICAgbGFiZWw6IG51bGwsXHJcbiAgICAgICAgd2lkdGg6IG51bGwsXHJcbiAgICAgICAgZm9ybWF0OiAnREQuTU0uWVlZWScsXHJcbiAgICAgICAgYXR0cjoge30sXHJcbiAgICAgICAgYXR0ckhlYWRlcjoge30sXHJcbiAgICAgICAgcmVuZGVyOiBudWxsXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPXHJcbiAgICAgKiBAcGFyYW0ge0NvcmVVSS50YWJsZS5pbnN0YW5jZX0gdGFibGVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICBvcHRpb25zXHJcbiAgICAgKi9cclxuICAgIGluaXQ6IGZ1bmN0aW9uICh0YWJsZSwgb3B0aW9ucykge1xyXG5cclxuICAgICAgICB0aGlzLl90YWJsZSAgID0gdGFibGU7XHJcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCB0aGlzLl9vcHRpb25zLCBvcHRpb25zKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QvtC70YPRh9C10L3QuNC1INC/0LDRgNCw0LzQtdGC0YDQvtCyXHJcbiAgICAgKi9cclxuICAgIGdldE9wdGlvbnM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW9ucztcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0KTQvtGA0LzQuNGA0L7QstCw0L3QuNC1INC60L7QvdGC0LXQvdGC0LBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50XHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcmVjb3JkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVjb3JkS2V5XHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKGNvbnRlbnQsIHJlY29yZCwgcmVjb3JkS2V5KSB7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoY29udGVudCk7XHJcblxyXG4gICAgICAgICAgICBjb250ZW50ID0gdGhpcy5fb3B0aW9ucy5mb3JtYXRcclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9ZWVlZL2csIHRoaXMuX3N0clBhZExlZnQoZGF0ZS5nZXRGdWxsWWVhcigpLCA0KSlcclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9NTS9nLCAgIHRoaXMuX3N0clBhZExlZnQoZGF0ZS5nZXRNb250aCgpICsgMSwgMikpXHJcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvTS9nLCAgICBkYXRlLmdldE1vbnRoKCkgKyAxKVxyXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL0REL2csICAgdGhpcy5fc3RyUGFkTGVmdChkYXRlLmdldERhdGUoKSwgMikpXHJcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvRC9nLCAgICBkYXRlLmdldERhdGUoKSk7XHJcblxyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29udGVudCA9ICcnO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHJldHVybiBjb250ZW50O1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQoNCw0LfQvNC10YDQvdC+0YHRgtGMINGB0YLRgNC+0LrQuFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0clxyXG4gICAgICogQHBhcmFtIHtpbnR9ICAgIGNvdW50XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVwZWF0XHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBfc3RyUGFkTGVmdDogZnVuY3Rpb24gKHN0ciwgY291bnQsIHJlcGVhdCkge1xyXG5cclxuICAgICAgICBzdHIgPSBTdHJpbmcoc3RyKTtcclxuXHJcbiAgICAgICAgaWYgKHN0ci5sZW5ndGggPj0gY291bnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlcGVhdCA9IHJlcGVhdCA/IHJlcGVhdCA6ICcwJztcclxuXHJcbiAgICAgICAgcmV0dXJuIChyZXBlYXQucmVwZWF0KGNvdW50KSArIHN0cikuc2xpY2UoLShjb3VudCkpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IGNvcmV1aVRhYmxlIGZyb20gXCIuLi9jb3JldWkudGFibGVcIjtcclxuXHJcbmNvcmV1aVRhYmxlLmNvbHVtbnMuZGF0ZXRpbWUgPSB7XHJcblxyXG4gICAgX3RhYmxlOiBudWxsLFxyXG4gICAgX29wdGlvbnM6IHtcclxuICAgICAgICB0eXBlOiAnZGF0ZXRpbWUnLFxyXG4gICAgICAgIGZpZWxkOiBudWxsLFxyXG4gICAgICAgIGxhYmVsOiBudWxsLFxyXG4gICAgICAgIHdpZHRoOiBudWxsLFxyXG4gICAgICAgIGZvcm1hdDogJ0RELk1NLllZWVkgaGg6bW06c3MnLFxyXG4gICAgICAgIGF0dHI6IHt9LFxyXG4gICAgICAgIGF0dHJIZWFkZXI6IHt9LFxyXG4gICAgICAgIHJlbmRlcjogbnVsbFxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRj1xyXG4gICAgICogQHBhcmFtIHtDb3JlVUkudGFibGUuaW5zdGFuY2V9IHRhYmxlXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgb3B0aW9uc1xyXG4gICAgICovXHJcbiAgICBpbml0OiBmdW5jdGlvbiAodGFibGUsIG9wdGlvbnMpIHtcclxuXHJcbiAgICAgICAgdGhpcy5fdGFibGUgICA9IHRhYmxlO1xyXG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSAkLmV4dGVuZCh7fSwgdGhpcy5fb3B0aW9ucywgb3B0aW9ucyk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSDQv9Cw0YDQsNC80LXRgtGA0L7QslxyXG4gICAgICovXHJcbiAgICBnZXRPcHRpb25zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wdGlvbnM7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCk0L7RgNC80LjRgNC+0LLQsNC90LjQtSDQutC+0L3RgtC10L3RgtCwXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGVudFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHJlY29yZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHJlY29yZEtleVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgcmVuZGVyOiBmdW5jdGlvbihjb250ZW50LCByZWNvcmQsIHJlY29yZEtleSkge1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoY29udGVudCk7XHJcblxyXG4gICAgICAgICAgICBjb250ZW50ID0gdGhpcy5fb3B0aW9ucy5mb3JtYXRcclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9ZWVlZL2csIHRoaXMuX3N0clBhZExlZnQoZGF0ZS5nZXRGdWxsWWVhcigpLCA0KSlcclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9NTS9nLCAgIHRoaXMuX3N0clBhZExlZnQoZGF0ZS5nZXRNb250aCgpICsgMSwgMikpXHJcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvTS9nLCAgICBkYXRlLmdldE1vbnRoKCkgKyAxKVxyXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL0REL2csICAgdGhpcy5fc3RyUGFkTGVmdChkYXRlLmdldERhdGUoKSwgMikpXHJcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvRC9nLCAgICBkYXRlLmdldERhdGUoKSlcclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9oaC9nLCAgIHRoaXMuX3N0clBhZExlZnQoZGF0ZS5nZXRIb3VycygpLCAyKSlcclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9tbS9nLCAgIHRoaXMuX3N0clBhZExlZnQoZGF0ZS5nZXRNaW51dGVzKCksIDIpKVxyXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL20vZywgICAgZGF0ZS5nZXRNaW51dGVzKCkpXHJcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvc3MvZywgICB0aGlzLl9zdHJQYWRMZWZ0KGRhdGUuZ2V0U2Vjb25kcygpLCAyKSlcclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9zL2csICAgIGRhdGUuZ2V0U2Vjb25kcygpKTtcclxuXHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb250ZW50ID0gJyc7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCg0LDQt9C80LXRgNC90L7RgdGC0Ywg0YHRgtGA0L7QutC4XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyXHJcbiAgICAgKiBAcGFyYW0ge2ludH0gICAgY291bnRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXBlYXRcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIF9zdHJQYWRMZWZ0OiBmdW5jdGlvbiAoc3RyLCBjb3VudCwgcmVwZWF0KSB7XHJcblxyXG4gICAgICAgIHN0ciA9IFN0cmluZyhzdHIpO1xyXG5cclxuICAgICAgICBpZiAoc3RyLmxlbmd0aCA+PSBjb3VudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVwZWF0ID0gcmVwZWF0ID8gcmVwZWF0IDogJzAnO1xyXG5cclxuICAgICAgICByZXR1cm4gKHJlcGVhdC5yZXBlYXQoY291bnQpICsgc3RyKS5zbGljZSgtKGNvdW50KSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgY29yZXVpVGFibGUgZnJvbSBcIi4uL2NvcmV1aS50YWJsZVwiO1xyXG5cclxuY29yZXVpVGFibGUuY29sdW1ucy5odG1sID0ge1xyXG5cclxuICAgIF90YWJsZTogbnVsbCxcclxuICAgIF9vcHRpb25zOiB7XHJcbiAgICAgICAgdHlwZTogJ2h0bWwnLFxyXG4gICAgICAgIGZpZWxkOiBudWxsLFxyXG4gICAgICAgIGxhYmVsOiBudWxsLFxyXG4gICAgICAgIHdpZHRoOiBudWxsLFxyXG4gICAgICAgIGF0dHI6IHt9LFxyXG4gICAgICAgIGF0dHJIZWFkZXI6IHt9LFxyXG4gICAgICAgIHJlbmRlcjogbnVsbFxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRj1xyXG4gICAgICogQHBhcmFtIHtDb3JlVUkudGFibGUuaW5zdGFuY2V9IHRhYmxlXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgb3B0aW9uc1xyXG4gICAgICovXHJcbiAgICBpbml0OiBmdW5jdGlvbiAodGFibGUsIG9wdGlvbnMpIHtcclxuXHJcbiAgICAgICAgdGhpcy5fdGFibGUgICA9IHRhYmxlO1xyXG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSAkLmV4dGVuZCh7fSwgdGhpcy5fb3B0aW9ucywgb3B0aW9ucyk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSDQv9Cw0YDQsNC80LXRgtGA0L7QslxyXG4gICAgICovXHJcbiAgICBnZXRPcHRpb25zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wdGlvbnM7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCk0L7RgNC80LjRgNC+0LLQsNC90LjQtSDQutC+0L3RgtC10L3RgtCwXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGVudFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHJlY29yZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHJlY29yZEtleVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgcmVuZGVyOiBmdW5jdGlvbihjb250ZW50LCByZWNvcmQsIHJlY29yZEtleSkge1xyXG5cclxuICAgICAgICBpZiAoWydzdHJpbmcnLCAnYmlnaW50JywgJ3N5bWJvbCcsICdudW1iZXInXS5pbmRleE9mKHR5cGVvZiBjb250ZW50KSA8IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIFN0cmluZyhjb250ZW50KTtcclxuICAgIH1cclxufSIsImltcG9ydCBjb3JldWlUYWJsZSBmcm9tIFwiLi4vY29yZXVpLnRhYmxlXCI7XHJcblxyXG5jb3JldWlUYWJsZS5jb2x1bW5zLm51bWJlciA9IHtcclxuXHJcbiAgICBfdGFibGU6IG51bGwsXHJcbiAgICBfb3B0aW9uczoge1xyXG4gICAgICAgIHR5cGU6ICdudW1iZXInLFxyXG4gICAgICAgIGZpZWxkOiBudWxsLFxyXG4gICAgICAgIGxhYmVsOiBudWxsLFxyXG4gICAgICAgIHdpZHRoOiBudWxsLFxyXG4gICAgICAgIGF0dHI6IHt9LFxyXG4gICAgICAgIGF0dHJIZWFkZXI6IHt9LFxyXG4gICAgICAgIHJlbmRlcjogbnVsbFxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRj1xyXG4gICAgICogQHBhcmFtIHtDb3JlVUkudGFibGUuaW5zdGFuY2V9IHRhYmxlXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgb3B0aW9uc1xyXG4gICAgICovXHJcbiAgICBpbml0OiBmdW5jdGlvbiAodGFibGUsIG9wdGlvbnMpIHtcclxuXHJcbiAgICAgICAgdGhpcy5fdGFibGUgICA9IHRhYmxlO1xyXG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSAkLmV4dGVuZCh7fSwgdGhpcy5fb3B0aW9ucywgb3B0aW9ucyk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSDQv9Cw0YDQsNC80LXRgtGA0L7QslxyXG4gICAgICovXHJcbiAgICBnZXRPcHRpb25zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wdGlvbnM7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCk0L7RgNC80LjRgNC+0LLQsNC90LjQtSDQutC+0L3RgtC10L3RgtCwXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGVudFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHJlY29yZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHJlY29yZEtleVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgcmVuZGVyOiBmdW5jdGlvbihjb250ZW50LCByZWNvcmQsIHJlY29yZEtleSkge1xyXG5cclxuICAgICAgICBpZiAoWydzdHJpbmcnLCAnYmlnaW50JywgJ3N5bWJvbCcsICdudW1iZXInXS5pbmRleE9mKHR5cGVvZiBjb250ZW50KSA8IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29udGVudCA9IFN0cmluZyhjb250ZW50KVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvLC9nLCAnLicpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9bXjAtOVxcLVxcLl0vZywgJycpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9bXFxzXXsyLH0vZywgJyAnKTtcclxuXHJcbiAgICAgICAgY29udGVudCA9IGNvbnRlbnQucmVwbGFjZSgvKD88IShcXC5cXGQqfF4uezB9KSkoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCAnJDEgJylcclxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcLSAvZywgJy0nKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgY29yZXVpVGFibGUgZnJvbSBcIi4uL2NvcmV1aS50YWJsZVwiO1xyXG5cclxuY29yZXVpVGFibGUuY29sdW1ucy5udW1iZXJzID0ge1xyXG5cclxuICAgIF90YWJsZTogbnVsbCxcclxuICAgIF9vcHRpb25zOiB7XHJcbiAgICAgICAgdHlwZTogJ251bWJlcnMnLFxyXG4gICAgICAgIGxhYmVsOiAn4oSWJyxcclxuICAgICAgICB3aWR0aDogMjAsXHJcbiAgICAgICAgYXR0cjogeyBjbGFzczogJ3RleHQtZW5kJyB9LFxyXG4gICAgICAgIGF0dHJIZWFkZXI6IG51bGxcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y9cclxuICAgICAqIEBwYXJhbSB7Q29yZVVJLnRhYmxlLmluc3RhbmNlfSB0YWJsZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgIG9wdGlvbnNcclxuICAgICAqL1xyXG4gICAgaW5pdDogZnVuY3Rpb24gKHRhYmxlLCBvcHRpb25zKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX3RhYmxlICAgID0gdGFibGU7XHJcbiAgICAgICAgdGhpcy5fb3B0aW9ucyAgPSAkLmV4dGVuZCh0cnVlLCB7fSwgdGhpcy5fb3B0aW9ucywgb3B0aW9ucyk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSDQv9Cw0YDQsNC80LXRgtGA0L7QslxyXG4gICAgICovXHJcbiAgICBnZXRPcHRpb25zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wdGlvbnM7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCk0L7RgNC80LjRgNC+0LLQsNC90LjQtSDQutC+0L3RgtC10L3RgtCwXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGVudFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHJlY29yZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHJlY29yZEtleVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgcmVuZGVyOiBmdW5jdGlvbihjb250ZW50LCByZWNvcmQsIHJlY29yZEtleSkge1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fdGFibGUuX3JlY29yZHNOdW1iZXI7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgY29yZXVpVGFibGUgZnJvbSBcIi4uL2NvcmV1aS50YWJsZVwiO1xyXG5cclxuY29yZXVpVGFibGUuY29sdW1ucy5zZWxlY3QgPSB7XHJcblxyXG4gICAgX3RhYmxlOiBudWxsLFxyXG4gICAgX29wdGlvbnM6IHtcclxuICAgICAgICB0eXBlOiAnc2VsZWN0JyxcclxuICAgICAgICBsYWJlbDogJycsXHJcbiAgICAgICAgd2lkdGg6IDM1LFxyXG4gICAgICAgIGF0dHI6IHsgY2xhc3M6ICdjb3JldWktdGFibGVfX3NlbGVjdF9jb250YWluZXIgdGV4dC1jZW50ZXInIH0sXHJcbiAgICAgICAgYXR0ckhlYWRlcjogeyBjbGFzczogJ3RleHQtY2VudGVyJyB9XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPXHJcbiAgICAgKiBAcGFyYW0ge0NvcmVVSS50YWJsZS5pbnN0YW5jZX0gdGFibGVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICBvcHRpb25zXHJcbiAgICAgKi9cclxuICAgIGluaXQ6IGZ1bmN0aW9uICh0YWJsZSwgb3B0aW9ucykge1xyXG5cclxuICAgICAgICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnYXR0cicpKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuYXR0ciA9IENvcmVVSS50YWJsZS5fbWVyZ2VBdHRyKHRoaXMuX29wdGlvbnMuYXR0ciwgb3B0aW9ucy5hdHRyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2F0dHJIZWFkZXInKSkge1xyXG4gICAgICAgICAgICBvcHRpb25zLmF0dHJIZWFkZXIgPSBDb3JlVUkudGFibGUuX21lcmdlQXR0cih0aGlzLl9vcHRpb25zLmF0dHJIZWFkZXIsIG9wdGlvbnMuYXR0ckhlYWRlcik7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5fdGFibGUgICA9IHRhYmxlO1xyXG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgdGhpcy5fb3B0aW9ucywgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgIHRoaXMuX29wdGlvbnMubGFiZWwgPSAnPGlucHV0IGNsYXNzPVwiY29yZXVpLXRhYmxlX19zZWxlY3QtYWxsIGZvcm0tY2hlY2staW5wdXRcIiB0eXBlPVwiY2hlY2tib3hcIiB2YWx1ZT1cIlwiPic7XHJcbiAgICAgICAgbGV0IHRhYmxlV3JhcHBlciAgICA9ICcjY29yZXVpLXRhYmxlLScgKyB0YWJsZS5fb3B0aW9ucy5pZCArICcgPiAuY29yZXVpLXRhYmxlX19jb250YWluZXIgPiAuY29yZXVpLXRhYmxlX193cmFwcGVyJztcclxuICAgICAgICBsZXQgY29udGFpbmVycyAgICAgID0gdGFibGVXcmFwcGVyICsgJyA+IHRhYmxlID4gdGJvZHkgPiB0ci5jb3JldWktdGFibGVfX3JlY29yZCA+IHRkLmNvcmV1aS10YWJsZV9fc2VsZWN0X2NvbnRhaW5lcic7XHJcblxyXG5cclxuICAgICAgICAvLyDQn9C+0LrQsNC3INGB0YLRgNC+0LpcclxuICAgICAgICB0aGlzLl90YWJsZS5vbignc2hvdy1yZWNvcmRzLmNvcmV1aS50YWJsZScsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIC8vINCe0YLQvNC10L3QsCDQvtCx0YDQsNCx0L7RgtC60Lgg0L3QsNC20LDRgtC40Y8g0LIgc2VsZWN0INC60L7Qu9C+0L3QutCw0YVcclxuICAgICAgICAgICAgJChjb250YWluZXJzKS5jbGljayhmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vINCS0YvQsdC+0YAg0YHRgtGA0L7QutC4XHJcbiAgICAgICAgICAgICQoY29udGFpbmVycyArICcgPiAuY29yZXVpLXRhYmxlX19zZWxlY3QnKS5jbGljayhmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGxldCByZWNvcmRLZXkgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlY29yZCAgICA9IHRhYmxlLl9nZXRSZWNvcmRCeUtleShyZWNvcmRLZXkpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJvdyAgICAgICA9IHRhYmxlLl9nZXRSb3dCeUtleShyZWNvcmRLZXkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICggISByZWNvcmQgfHwgISByb3cpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHJvdykuYWRkQ2xhc3MoJ3RhYmxlLXByaW1hcnknKTtcclxuICAgICAgICAgICAgICAgICAgICB0YWJsZS5fdHJpZ2dlcignc2VsZWN0LmNvcmV1aS50YWJsZScsIHRhYmxlLCBbIHJlY29yZCBdKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChyb3cpLnJlbW92ZUNsYXNzKCd0YWJsZS1wcmltYXJ5Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFibGUuX3RyaWdnZXIoJ3Vuc2VsZWN0LmNvcmV1aS50YWJsZScsIHRhYmxlLCBbIHJlY29yZCBdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyDQktGL0LHQvtGAINCy0YHQtdGFINGB0YLRgNC+0LpcclxuICAgICAgICAgICAgJCh0YWJsZVdyYXBwZXIgKyAnID4gdGFibGUgPiB0aGVhZCA+IHRyID4gdGQgPiAuY29yZXVpLXRhYmxlX19zZWxlY3QtYWxsJykuY2xpY2soZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhYmxlLnNlbGVjdEFsbCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0YWJsZS51bnNlbGVjdEFsbCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QvtC70YPRh9C10L3QuNC1INC/0LDRgNCw0LzQtdGC0YDQvtCyXHJcbiAgICAgKi9cclxuICAgIGdldE9wdGlvbnM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW9ucztcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0KTQvtGA0LzQuNGA0L7QstCw0L3QuNC1INC60L7QvdGC0LXQvdGC0LBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50XHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcmVjb3JkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVjb3JkS2V5XHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKGNvbnRlbnQsIHJlY29yZCwgcmVjb3JkS2V5KSB7XHJcblxyXG4gICAgICAgIHJldHVybiAnPGlucHV0IGNsYXNzPVwiY29yZXVpLXRhYmxlX19zZWxlY3QgZm9ybS1jaGVjay1pbnB1dFwiIHR5cGU9XCJjaGVja2JveFwiIHZhbHVlPVwiJyArIHJlY29yZEtleSArICdcIj4nO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IGNvcmV1aVRhYmxlIGZyb20gXCIuLi9jb3JldWkudGFibGVcIjtcclxuXHJcbmNvcmV1aVRhYmxlLmNvbHVtbnMuc3dpdGNoID0ge1xyXG5cclxuICAgIF90YWJsZTogbnVsbCxcclxuICAgIF9vcHRpb25zOiB7XHJcbiAgICAgICAgdHlwZTogJ3N3aXRjaCcsXHJcbiAgICAgICAgbGFiZWw6ICcnLFxyXG4gICAgICAgIGZpZWxkOiAnJyxcclxuICAgICAgICB3aWR0aDogNSxcclxuICAgICAgICB2YWx1ZVk6ICdZJyxcclxuICAgICAgICB2YWx1ZU46ICdOJyxcclxuICAgICAgICBhdHRyOiB7IGNsYXNzOiAnY29yZXVpLXRhYmxlX19zd2l0Y2hfY29udGFpbmVyJyB9LFxyXG4gICAgICAgIGF0dHJIZWFkZXI6IHsgfSxcclxuICAgICAgICBvbkNoYW5nZTogbnVsbFxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRj1xyXG4gICAgICogQHBhcmFtIHtDb3JlVUkudGFibGUuaW5zdGFuY2V9IHRhYmxlXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgb3B0aW9uc1xyXG4gICAgICovXHJcbiAgICBpbml0OiBmdW5jdGlvbiAodGFibGUsIG9wdGlvbnMpIHtcclxuXHJcbiAgICAgICAgdGhpcy5fdGFibGUgICAgPSB0YWJsZTtcclxuICAgICAgICB0aGlzLl9vcHRpb25zICA9ICQuZXh0ZW5kKHRydWUsIHt9LCB0aGlzLl9vcHRpb25zLCBvcHRpb25zKTtcclxuICAgICAgICBsZXQgdGhhdCAgICAgICA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGNvbnRhaW5lcnMgPSAnI2NvcmV1aS10YWJsZS0nICsgdGFibGUuX29wdGlvbnMuaWQgKyAnID4gLmNvcmV1aS10YWJsZV9fY29udGFpbmVyID4gLmNvcmV1aS10YWJsZV9fd3JhcHBlciA+IHRhYmxlID4gdGJvZHkgPiB0ci5jb3JldWktdGFibGVfX3JlY29yZCA+IHRkLmNvcmV1aS10YWJsZV9fc3dpdGNoX2NvbnRhaW5lcic7XHJcblxyXG4gICAgICAgIC8vINCf0L7QutCw0Lcg0YHRgtGA0L7QulxyXG4gICAgICAgIHRoaXMuX3RhYmxlLm9uKCdzaG93LXJlY29yZHMuY29yZXVpLnRhYmxlJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgLy8g0J7RgtC80LXQvdCwINC+0LHRgNCw0LHQvtGC0LrQuCDQvdCw0LbQsNGC0LjRjyDQsiBzd2l0Y2gg0LrQvtC70L7QvdC60LDRhVxyXG4gICAgICAgICAgICAkKGNvbnRhaW5lcnMpLmNsaWNrKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8g0KHQvtCx0YvRgtC40Y8g0L3QsNC20LDRgtC40Y8g0L3QsCDQv9C10YDQtdC60LvRjtGH0LDRgtC10LvRjFxyXG4gICAgICAgICAgICBpZiAodGhhdC5fb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnb25DaGFuZ2UnKSAmJlxyXG4gICAgICAgICAgICAgICAgKHR5cGVvZiB0aGF0Ll9vcHRpb25zLm9uQ2hhbmdlID09PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiB0aGF0Ll9vcHRpb25zLm9uQ2hhbmdlID09PSAnc3RyaW5nJylcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAkKGNvbnRhaW5lcnMgKyAnIC5jb3JldWktdGFibGVfX3N3aXRjaFtkYXRhLWZpZWxkPVwiJyArIHRoYXQuX29wdGlvbnMuZmllbGQgKyAnXCJdJykuY2hhbmdlKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZWNvcmRLZXkgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpc0NoZWNrZWQgPSAkKHRoaXMpLmlzKCc6Y2hlY2tlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZWNvcmQgICAgPSB0YWJsZS5fZ2V0UmVjb3JkQnlLZXkocmVjb3JkS2V5KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGF0Ll9vcHRpb25zLm9uQ2hhbmdlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuX29wdGlvbnMub25DaGFuZ2UocmVjb3JkLCBpc0NoZWNrZWQsIHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGF0Ll9vcHRpb25zLm9uQ2hhbmdlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaWQgPSAnJztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWNvcmQuaGFzT3duUHJvcGVydHkodGFibGUuX29wdGlvbnMucHJpbWFyeUtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkID0gcmVjb3JkW3RhYmxlLl9vcHRpb25zLnByaW1hcnlLZXldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZnVuYyA9IG5ldyBGdW5jdGlvbigncmVjb3JkJywgJ2NoZWNrZWQnLCAnaWQnLCB0aGF0Ll9vcHRpb25zLm9uQ2hhbmdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuYyhyZWNvcmQsIHRoaXMsIGlkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSDQv9Cw0YDQsNC80LXRgtGA0L7QslxyXG4gICAgICovXHJcbiAgICBnZXRPcHRpb25zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wdGlvbnM7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCk0L7RgNC80LjRgNC+0LLQsNC90LjQtSDQutC+0L3RgtC10L3RgtCwXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGVudFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHJlY29yZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHJlY29yZEtleVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgcmVuZGVyOiBmdW5jdGlvbihjb250ZW50LCByZWNvcmQsIHJlY29yZEtleSkge1xyXG5cclxuICAgICAgICBsZXQgY2hlY2tlZCA9IHJlY29yZC5oYXNPd25Qcm9wZXJ0eSh0aGlzLl9vcHRpb25zLmZpZWxkKSAmJiByZWNvcmRbdGhpcy5fb3B0aW9ucy5maWVsZF0gPT09IHRoaXMuX29wdGlvbnMudmFsdWVZXHJcbiAgICAgICAgICAgID8gJyBjaGVja2VkPVwiY2hlY2tlZFwiJ1xyXG4gICAgICAgICAgICA6ICcnO1xyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiZm9ybS1zd2l0Y2hcIj4nICtcclxuICAgICAgICAgICAgICAgICAgICc8aW5wdXQgY2xhc3M9XCJjb3JldWktdGFibGVfX3N3aXRjaCBmb3JtLWNoZWNrLWlucHV0XCIgdHlwZT1cImNoZWNrYm94XCIgdmFsdWU9XCInICsgcmVjb3JkS2V5ICsgJ1wiJyArIGNoZWNrZWQgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgJyBkYXRhLWZpZWxkPVwiJyArIHRoaXMuX29wdGlvbnMuZmllbGQgKyAnXCIgZGF0YS1maWVsZD1cIicgKyB0aGlzLl9vcHRpb25zLmZpZWxkICsgJ1wiPicgK1xyXG4gICAgICAgICAgICAgICAnPC9kaXY+JztcclxuICAgIH1cclxufSIsImltcG9ydCBjb3JldWlUYWJsZSBmcm9tIFwiLi4vY29yZXVpLnRhYmxlXCI7XHJcblxyXG5jb3JldWlUYWJsZS5jb2x1bW5zLnRleHQgPSB7XHJcblxyXG4gICAgX3RhYmxlOiBudWxsLFxyXG4gICAgX29wdGlvbnM6IHtcclxuICAgICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgICAgZmllbGQ6IG51bGwsXHJcbiAgICAgICAgbGFiZWw6IG51bGwsXHJcbiAgICAgICAgd2lkdGg6IG51bGwsXHJcbiAgICAgICAgYXR0cjogbnVsbCxcclxuICAgICAgICBhdHRySGVhZGVyOiBudWxsLFxyXG4gICAgICAgIHJlbmRlcjogbnVsbFxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRj1xyXG4gICAgICogQHBhcmFtIHtDb3JlVUkudGFibGUuaW5zdGFuY2V9IHRhYmxlXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgb3B0aW9uc1xyXG4gICAgICovXHJcbiAgICBpbml0OiBmdW5jdGlvbiAodGFibGUsIG9wdGlvbnMpIHtcclxuXHJcbiAgICAgICAgdGhpcy5fdGFibGUgICA9IHRhYmxlO1xyXG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSAkLmV4dGVuZCh7fSwgdGhpcy5fb3B0aW9ucywgb3B0aW9ucyk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSDQv9Cw0YDQsNC80LXRgtGA0L7QslxyXG4gICAgICogQHJldHVybnMge29iamVjdH1cclxuICAgICAqL1xyXG4gICAgZ2V0T3B0aW9uczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9vcHRpb25zO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQpNC+0YDQvNC40YDQvtCy0LDQvdC40LUg0LrQvtC90YLQtdC90YLQsFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnRcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSByZWNvcmRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByZWNvcmRLZXlcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHJlbmRlcjogZnVuY3Rpb24oY29udGVudCwgcmVjb3JkLCByZWNvcmRLZXkpIHtcclxuXHJcbiAgICAgICAgaWYgKFsnc3RyaW5nJywgJ2JpZ2ludCcsICdzeW1ib2wnLCAnbnVtYmVyJ10uaW5kZXhPZih0eXBlb2YgY29udGVudCkgPCAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBTdHJpbmcoY29udGVudClcclxuICAgICAgICAgICAgLnJlcGxhY2UoLzwvZywgJyZsdDsnKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvPi9nLCAnJmd0OycpO1xyXG4gICAgfVxyXG59Il0sIm5hbWVzIjpbImYiLCJleHBvcnRzIiwibW9kdWxlIiwiZGVmaW5lIiwiYW1kIiwiZyIsIndpbmRvdyIsImdsb2JhbCIsInNlbGYiLCJlanMiLCJyIiwiZSIsIm4iLCJ0IiwibyIsImkiLCJjIiwicmVxdWlyZSIsInUiLCJhIiwiRXJyb3IiLCJjb2RlIiwicCIsImNhbGwiLCJsZW5ndGgiLCJmcyIsInBhdGgiLCJ1dGlscyIsInNjb3BlT3B0aW9uV2FybmVkIiwiX1ZFUlNJT05fU1RSSU5HIiwidmVyc2lvbiIsIl9ERUZBVUxUX09QRU5fREVMSU1JVEVSIiwiX0RFRkFVTFRfQ0xPU0VfREVMSU1JVEVSIiwiX0RFRkFVTFRfREVMSU1JVEVSIiwiX0RFRkFVTFRfTE9DQUxTX05BTUUiLCJfTkFNRSIsIl9SRUdFWF9TVFJJTkciLCJfT1BUU19QQVNTQUJMRV9XSVRIX0RBVEEiLCJfT1BUU19QQVNTQUJMRV9XSVRIX0RBVEFfRVhQUkVTUyIsImNvbmNhdCIsIl9CT00iLCJfSlNfSURFTlRJRklFUiIsImNhY2hlIiwiZmlsZUxvYWRlciIsInJlYWRGaWxlU3luYyIsImxvY2Fsc05hbWUiLCJwcm9taXNlSW1wbCIsIkZ1bmN0aW9uIiwiUHJvbWlzZSIsInJlc29sdmVJbmNsdWRlIiwibmFtZSIsImZpbGVuYW1lIiwiaXNEaXIiLCJkaXJuYW1lIiwiZXh0bmFtZSIsInJlc29sdmUiLCJpbmNsdWRlUGF0aCIsImV4dCIsInJlc29sdmVQYXRocyIsInBhdGhzIiwiZmlsZVBhdGgiLCJzb21lIiwidiIsImV4aXN0c1N5bmMiLCJnZXRJbmNsdWRlUGF0aCIsIm9wdGlvbnMiLCJ2aWV3cyIsIm1hdGNoIiwiZXhlYyIsInJlcGxhY2UiLCJBcnJheSIsImlzQXJyYXkiLCJyb290IiwiaW5jbHVkZXIiLCJlc2NhcGVGdW5jdGlvbiIsImhhbmRsZUNhY2hlIiwidGVtcGxhdGUiLCJmdW5jIiwiaGFzVGVtcGxhdGUiLCJhcmd1bWVudHMiLCJnZXQiLCJ0b1N0cmluZyIsImNvbXBpbGUiLCJzZXQiLCJ0cnlIYW5kbGVDYWNoZSIsImRhdGEiLCJjYiIsInJlc3VsdCIsInJlamVjdCIsImVyciIsImluY2x1ZGVGaWxlIiwib3B0cyIsInNoYWxsb3dDb3B5IiwiY3JlYXRlTnVsbFByb3RvT2JqV2hlcmVQb3NzaWJsZSIsImluY2x1ZGVyUmVzdWx0IiwicmV0aHJvdyIsInN0ciIsImZsbm0iLCJsaW5lbm8iLCJlc2MiLCJsaW5lcyIsInNwbGl0Iiwic3RhcnQiLCJNYXRoIiwibWF4IiwiZW5kIiwibWluIiwiY29udGV4dCIsInNsaWNlIiwibWFwIiwibGluZSIsImN1cnIiLCJqb2luIiwibWVzc2FnZSIsInN0cmlwU2VtaSIsInRlbXBsIiwic2NvcGUiLCJjb25zb2xlIiwid2FybiIsIlRlbXBsYXRlIiwicmVuZGVyIiwiZCIsInNoYWxsb3dDb3B5RnJvbUxpc3QiLCJyZW5kZXJGaWxlIiwiYXJncyIsInByb3RvdHlwZSIsInNoaWZ0Iiwidmlld09wdHMiLCJwb3AiLCJzZXR0aW5ncyIsImNsZWFyQ2FjaGUiLCJyZXNldCIsInRleHQiLCJ0ZW1wbGF0ZVRleHQiLCJtb2RlIiwidHJ1bmNhdGUiLCJjdXJyZW50TGluZSIsInNvdXJjZSIsImNsaWVudCIsImVzY2FwZSIsImVzY2FwZVhNTCIsImNvbXBpbGVEZWJ1ZyIsImRlYnVnIiwib3BlbkRlbGltaXRlciIsImNsb3NlRGVsaW1pdGVyIiwiZGVsaW1pdGVyIiwic3RyaWN0Iiwicm1XaGl0ZXNwYWNlIiwib3V0cHV0RnVuY3Rpb25OYW1lIiwiYXN5bmMiLCJkZXN0cnVjdHVyZWRMb2NhbHMiLCJsZWdhY3lJbmNsdWRlIiwiX3dpdGgiLCJyZWdleCIsImNyZWF0ZVJlZ2V4IiwibW9kZXMiLCJFVkFMIiwiRVNDQVBFRCIsIlJBVyIsIkNPTU1FTlQiLCJMSVRFUkFMIiwiZGVsaW0iLCJlc2NhcGVSZWdFeHBDaGFycyIsIm9wZW4iLCJjbG9zZSIsIlJlZ0V4cCIsInNyYyIsImZuIiwicHJlcGVuZGVkIiwiYXBwZW5kZWQiLCJlc2NhcGVGbiIsImN0b3IiLCJzYW5pdGl6ZWRGaWxlbmFtZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJnZW5lcmF0ZVNvdXJjZSIsInRlc3QiLCJkZXN0cnVjdHVyaW5nIiwibG9nIiwiU3ludGF4RXJyb3IiLCJyZXR1cm5lZEZuIiwiYW5vbnltb3VzIiwiaW5jbHVkZSIsImluY2x1ZGVEYXRhIiwiYXBwbHkiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImJhc2VuYW1lIiwidmFsdWUiLCJ3cml0YWJsZSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJtYXRjaGVzIiwicGFyc2VUZW1wbGF0ZVRleHQiLCJmb3JFYWNoIiwiaW5kZXgiLCJjbG9zaW5nIiwiaW5kZXhPZiIsInNjYW5MaW5lIiwicGF0IiwiYXJyIiwiZmlyc3RQb3MiLCJwdXNoIiwic3Vic3RyaW5nIiwiX2FkZE91dHB1dCIsIm5ld0xpbmVDb3VudCIsImxhc3RJbmRleE9mIiwiX19leHByZXNzIiwiVkVSU0lPTiIsInJlZ0V4cENoYXJzIiwiaGFzT3duUHJvcGVydHkiLCJoYXNPd24iLCJvYmoiLCJrZXkiLCJzdHJpbmciLCJTdHJpbmciLCJfRU5DT0RFX0hUTUxfUlVMRVMiLCJfTUFUQ0hfSFRNTCIsImVuY29kZV9jaGFyIiwiZXNjYXBlRnVuY1N0ciIsIm1hcmt1cCIsInVuZGVmaW5lZCIsImVzY2FwZVhNTFRvU3RyaW5nIiwidG8iLCJmcm9tIiwibGlzdCIsIl9kYXRhIiwidmFsIiwicmVtb3ZlIiwiaHlwaGVuVG9DYW1lbCIsInRvVXBwZXJDYXNlIiwiY3JlYXRlIiwiX19wcm90b19fIiwicHJvY2VzcyIsIm5vcm1hbGl6ZUFycmF5IiwicGFydHMiLCJhbGxvd0Fib3ZlUm9vdCIsInVwIiwibGFzdCIsInNwbGljZSIsInVuc2hpZnQiLCJyZXNvbHZlZFBhdGgiLCJyZXNvbHZlZEFic29sdXRlIiwiY3dkIiwiVHlwZUVycm9yIiwiY2hhckF0IiwiZmlsdGVyIiwibm9ybWFsaXplIiwiaXNBYnNvbHV0ZSIsInRyYWlsaW5nU2xhc2giLCJzdWJzdHIiLCJyZWxhdGl2ZSIsInRyaW0iLCJmcm9tUGFydHMiLCJ0b1BhcnRzIiwic2FtZVBhcnRzTGVuZ3RoIiwib3V0cHV0UGFydHMiLCJzZXAiLCJjaGFyQ29kZUF0IiwiaGFzUm9vdCIsIm1hdGNoZWRTbGFzaCIsInN0YXJ0RG90Iiwic3RhcnRQYXJ0IiwicHJlRG90U3RhdGUiLCJ4cyIsInJlcyIsImxlbiIsIl9wcm9jZXNzIiwiY2FjaGVkU2V0VGltZW91dCIsImNhY2hlZENsZWFyVGltZW91dCIsImRlZmF1bHRTZXRUaW1vdXQiLCJkZWZhdWx0Q2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsImNsZWFyVGltZW91dCIsInJ1blRpbWVvdXQiLCJmdW4iLCJydW5DbGVhclRpbWVvdXQiLCJtYXJrZXIiLCJxdWV1ZSIsImRyYWluaW5nIiwiY3VycmVudFF1ZXVlIiwicXVldWVJbmRleCIsImNsZWFuVXBOZXh0VGljayIsImRyYWluUXVldWUiLCJ0aW1lb3V0IiwicnVuIiwibmV4dFRpY2siLCJJdGVtIiwiYXJyYXkiLCJ0aXRsZSIsImJyb3dzZXIiLCJlbnYiLCJhcmd2IiwidmVyc2lvbnMiLCJub29wIiwib24iLCJhZGRMaXN0ZW5lciIsIm9uY2UiLCJvZmYiLCJyZW1vdmVMaXN0ZW5lciIsInJlbW92ZUFsbExpc3RlbmVycyIsImVtaXQiLCJwcmVwZW5kTGlzdGVuZXIiLCJwcmVwZW5kT25jZUxpc3RlbmVyIiwibGlzdGVuZXJzIiwiYmluZGluZyIsImNoZGlyIiwiZGlyIiwidW1hc2siLCJkZXNjcmlwdGlvbiIsImtleXdvcmRzIiwiYXV0aG9yIiwibGljZW5zZSIsImJpbiIsIm1haW4iLCJqc2RlbGl2ciIsInVucGtnIiwicmVwb3NpdG9yeSIsInR5cGUiLCJ1cmwiLCJidWdzIiwiaG9tZXBhZ2UiLCJkZXBlbmRlbmNpZXMiLCJqYWtlIiwiZGV2RGVwZW5kZW5jaWVzIiwiYnJvd3NlcmlmeSIsImVzbGludCIsImpzZG9jIiwibW9jaGEiLCJlbmdpbmVzIiwibm9kZSIsInNjcmlwdHMiLCJjb3JldWlUYWJsZVV0aWxzIiwibWVyZ2VBdHRyIiwiYXR0cjEiLCJhdHRyMiIsImFzc2lnbiIsIl90eXBlb2YiLCIkIiwiZWFjaCIsImlzTnVtZXJpYyIsIm51bSIsImlzTmFOIiwiaGFzaENvZGUiLCJjcmMzMiIsIkRhdGUiLCJnZXRUaW1lIiwicmFuZG9tIiwidHBsIiwiY29yZXVpVGFibGVJbnN0YW5jZSIsIl9vcHRpb25zIiwiaWQiLCJwcmltYXJ5S2V5IiwibGFuZyIsInNpemUiLCJzdHJpcGVkIiwiaG92ZXIiLCJ3aWR0aCIsIm1pbldpZHRoIiwibWF4V2lkdGgiLCJoZWlnaHQiLCJtaW5IZWlnaHQiLCJuYXhIZWlnaHQiLCJwYWdlIiwicmVjb3Jkc1BlclBhZ2UiLCJyZWNvcmRzUGVyUGFnZUxpc3QiLCJwYWdlUGFyYW0iLCJyZWNvcmRzUGVyUGFnZVBhcmFtIiwibWV0aG9kIiwic2hvdyIsInRvdGFsIiwiY29sdW1uSGVhZGVycyIsInBhZ2VzIiwicGFnZXNKdW1wIiwicHJlUGFnZUxpc3QiLCJvbkNsaWNrIiwib25DbGlja1VybCIsImNvbnRyb2xzIiwiY29sdW1uR3JvdXBzIiwiY29sdW1ucyIsImZvb3RlciIsInJlY29yZHMiLCJfcGFnZSIsIl9yZWNvcmRzUGVyUGFnZSIsIl9yZWNvcmRzVG90YWwiLCJfcmVjb3Jkc051bWJlciIsIl9jb2x1bW5zIiwiX3NlYXJjaCIsIl9maWx0ZXIiLCJfZXZlbnRzIiwiX2luaXQiLCJleHRlbmQiLCJjb3JldWlGb3JtVXRpbHMiLCJ0aGF0IiwiY29sdW1uIiwiQ29yZVVJIiwidGFibGUiLCJjb2x1bW5JbnN0YW5jZSIsImluaXQiLCJpbml0RXZlbnRzIiwidGFibGVXcmFwcGVyIiwiY2xpY2siLCJyZWNvcmRLZXkiLCJyZWNvcmQiLCJfZ2V0UmVjb3JkQnlLZXkiLCJmaWVsZCIsImZpZWxkUXVvdGUiLCJsb2NhdGlvbiIsImhyZWYiLCJldmVudCIsImNvbE9mZnNldCIsImNzcyIsIm91dGVyV2lkdGgiLCJyZXZlcnNlIiwiYnRuUHJldiIsInByZXZQYWdlIiwiYnRuTmV4dCIsIm5leHRQYWdlIiwiaW5wdXRHb1BhZ2UiLCJidG5Hb1BhZ2UiLCJnb1BhZ2UiLCJrZXl1cCIsInNlbGVjdFBlclBhZ2UiLCJjaGFuZ2UiLCJyZWxvYWQiLCJfdHJpZ2dlciIsImdldElkIiwiZWxlbWVudCIsIndpZHRoU2l6ZXMiLCJoZWlnaHRTaXplcyIsImh0bWxSZWNvcmRzIiwiY29sdW1uc0hlYWRlciIsInVuaXQiLCJtYXhIZWlnaHQiLCJjb250cm9sIiwiY29udHJvbEluc3RhbmNlIiwiY29udGVudCIsImNvbHVtbk9wdGlvbnMiLCJnZXRPcHRpb25zIiwiYXR0cmlidXRlcyIsImZpeGVkIiwiYXR0ckhlYWRlciIsImF0dHIiLCJsYWJlbCIsImxvYWQiLCJfcmVuZGVyUmVjb3JkIiwiY29yZXVpRm9ybVRwbCIsImNvbHVtbnNDb3VudCIsIl9nZXRMYW5nIiwidG90YWxQYWdlcyIsImNlaWwiLCJjdXJyZW50UGFnZSIsInBhZ2VzVG90YWwiLCJyb3dzIiwiaGVhZGVyUm93IiwiY2VsbHMiLCJoZWFkZXJDb2x1bW4iLCJmb290ZXJSb3ciLCJmb290ZXJDb2x1bW4iLCJodG1sQ29sdW1ucyIsImh0bWwiLCJyZWNvcmRzVG90YWwiLCJkb21FbGVtZW50IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIkhUTUxFbGVtZW50IiwiaW5uZXJIVE1MIiwibG9jayIsImNvbnRhaW5lciIsImZpbmQiLCJwcmVwZW5kIiwidW5sb2NrIiwiaGlkZSIsInBhcmFtcyIsImtleXMiLCJwYXJhbSIsImFqYXgiLCJkYXRhVHlwZSIsImJlZm9yZVNlbmQiLCJ4aHIiLCJzdWNjZXNzIiwiX3ZpZXdSZWNvcmRzIiwiZXJyb3IiLCJ0ZXh0U3RhdHVzIiwiZXJyb3JUaHJvd24iLCJjb21wbGV0ZSIsInNlbGVjdEFsbCIsInRhYmxlQ29udGFpbmVyIiwicHJvcCIsImFkZENsYXNzIiwidW5zZWxlY3RBbGwiLCJyZW1vdmVDbGFzcyIsInNlbGVjdFJlY29yZCIsInJlY29yZEl0ZW0iLCJfZ2V0UmVjb3JkQnlQcmltYXJ5S2V5Iiwicm93IiwiX2dldFJvd0J5S2V5IiwidW5zZWxlY3RSZWNvcmQiLCJnZXRTZWxlY3RlZCIsInByaW1hcnlLZXlzIiwiZ2V0U2VsZWN0ZWRSZWNvcmRzIiwiZ2V0UmVjb3JkIiwiZ2V0UmVjb3JkcyIsImV2ZW50TmFtZSIsImNhbGxiYWNrIiwic2luZ2xlRXhlYyIsInBhcnNlSW50IiwicmVuZGVyUmVjb3JkZXJzIiwiZmllbGRzIiwicmVjb3JkUHJvcHMiLCJjb3JldWkiLCJyZWNvcmRBdHRyIiwiX3JlbmRlckZpZWxkIiwicmVjb3JkQXR0clJlc3VsdCIsImNvbHVtbkZpZWxkIiwiZmllbGRQcm9wcyIsImZpZWxkQXR0ciIsImZpZWxkQXR0clJlc3VsdCIsImNvcmV1aVRhYmxlIiwiZmlsdGVycyIsInNlYXJjaCIsIl9pbnN0YW5jZXMiLCJpbnN0YW5jZSIsImNvcmV1aUZvcm1JbnN0YW5jZSIsInRhYmxlSWQiLCJydSIsImJ1dHRvbiIsIl90YWJsZSIsIl9yZW5kZXIiLCJjb3JldWlUYWJsZVRwbCIsImN1c3RvbSIsImxpbmsiLCJkYXRlIiwiZm9ybWF0IiwiX3N0clBhZExlZnQiLCJnZXRGdWxsWWVhciIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsImNvdW50IiwicmVwZWF0IiwiZGF0ZXRpbWUiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJnZXRTZWNvbmRzIiwibnVtYmVyIiwibnVtYmVycyIsInNlbGVjdCIsIl9tZXJnZUF0dHIiLCJjb250YWluZXJzIiwic3RvcFByb3BhZ2F0aW9uIiwiaXMiLCJ2YWx1ZVkiLCJ2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