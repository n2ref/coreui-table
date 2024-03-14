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

var tpl = Object.create(null);
tpl['table-columns-footer.html'] = '<tr> <% $.each(columns, function(key, column) { %> <td<%- column.attr%>><%- column.label %></td> <% }); %> </tr>';
tpl['table-columns.html'] = '<tr class="fw-medium bg-white"> <% $.each(columns, function(key, column) { %> <td<%- column.attr%>><%- column.label %></td> <% }); %> </tr>';
tpl['table-control.html'] = ' <div id="coreui-table-control-<%= control.id %>" class="coreui-table__control"> <%- control.content %> </div>';
tpl['table-controls-footer-out.html'] = ' <div class="coreui-table__footer d-flex justify-content-between"> <% if (controlsLeft.length) { %> <div class="coreui-table__controls d-flex justify-content-start gap-2 flex-wrap flex-fill mb-1 mt-2 align-items-center"> <%- controlsLeft.join(\'\') %> </div> <% } %> <% if (controlsCenter.length) { %> <div class="coreui-table__controls d-flex justify-content-center gap-2 flex-wrap flex-fill mb-1 mt-2 align-items-center"> <%- controlsCenter.join(\'\') %> </div> <% } %> <% if (controlsRight.length) { %> <div class="coreui-table__controls d-flex justify-content-end gap-2 flex-wrap flex-fill mb-1 mt-2 align-items-center"> <%- controlsRight.join(\'\') %> </div> <% } %> </div>';
tpl['table-controls-footer.html'] = ' <div class="coreui-table__footer ps-1 pe-1 d-flex justify-content-between border-top border-secondary-subtle"> <% if (controlsLeft.length) { %> <div class="coreui-table__controls d-flex justify-content-start gap-2 flex-wrap flex-fill mb-1 mt-1 align-items-center"> <%- controlsLeft.join(\'\') %> </div> <% } %> <% if (controlsCenter.length) { %> <div class="coreui-table__controls d-flex justify-content-center gap-2 flex-wrap flex-fill mb-1 mt-1 align-items-center"> <%- controlsCenter.join(\'\') %> </div> <% } %> <% if (controlsRight.length) { %> <div class="coreui-table__controls d-flex justify-content-end gap-2 flex-wrap flex-fill mb-1 mt-1 align-items-center"> <%- controlsRight.join(\'\') %> </div> <% } %> </div>';
tpl['table-controls-header-out.html'] = ' <div class="coreui-table__header d-flex justify-content-between"> <% if (controlsLeft.length) { %> <div class="coreui-table__controls d-flex justify-content-start gap-2 flex-wrap flex-fill mb-2 mt-1 align-items-center"> <%- controlsLeft.join(\'\') %> </div> <% } %> <% if (controlsCenter.length) { %> <div class="coreui-table__controls d-flex justify-content-center gap-2 flex-wrap flex-fill mb-2 mt-1 align-items-center"> <%- controlsCenter.join(\'\') %> </div> <% } %> <% if (controlsRight.length) { %> <div class="coreui-table__controls d-flex justify-content-end gap-2 flex-wrap flex-fill mb-2 mt-1 align-items-center"> <%- controlsRight.join(\'\') %> </div> <% } %> </div>';
tpl['table-controls-header.html'] = ' <div class="coreui-table__header ps-1 pe-1 d-flex justify-content-between border-bottom border-secondary-subtle"> <% if (controlsLeft.length) { %> <div class="coreui-table__controls d-flex justify-content-start gap-2 flex-wrap flex-fill my-1 align-items-center"> <%- controlsLeft.join(\'\') %> </div> <% } %> <% if (controlsCenter.length) { %> <div class="coreui-table__controls d-flex justify-content-center gap-2 flex-wrap flex-fill my-1 align-items-center"> <%- controlsCenter.join(\'\') %> </div> <% } %> <% if (controlsRight.length) { %> <div class="coreui-table__controls d-flex justify-content-end gap-2 flex-wrap flex-fill my-1 align-items-center"> <%- controlsRight.join(\'\') %> </div> <% } %> </div>';
tpl['table-loader.html'] = '<div class="coreui-table-lock position-absolute w-100 top-0 bottom-0"> <div class="coreui-table-block bg-secondary-subtle position-absolute opacity-50 w-100 top-0 bottom-0"></div> <div class="coreui-table-message position-relative d-flex align-content-center justify-content-start gap-2 mt-3 py-1 px-2 m-auto border border-secondary-subtle rounded-3 bg-body-secondary"> <div class="spinner-border text-secondary align-self-center"></div> <span class="lh-lg"><%= lang.loading %></span> </div> </div>';
tpl['table-records-empty.html'] = '<tr> <td class="text-center" colspan="<%= columnsCount %>"><%= lang.emptyRecords %></td> </tr>';
tpl['table-records.html'] = '<% $.each(records, function(index, record) { %> <tr<%- record.attr %> data-record-index="<%= index %>"> <% $.each(record.fields, function(key2, field) { %> <td<%- field.attr %>><%- field.content %></td> <% }); %> </tr> <% }); %>';
tpl['table-wrapper.html'] = ' <div id="coreui-table-<%= id %>" class="coreui-table"<%- render.attr %> <% if (widthSizes) { %>style="<%= widthSizes.join(\';\') %>"<% } %>> <%- render.headersOut.join(\'\') %> <div class="coreui-table__container position-relative"> <%- render.headersIn.join(\'\') %> <div class="coreui-table__wrapper table-responsive overflow-x-auto" <% if (heightSizes) { %>style="<%= heightSizes.join(\';\') %>"<% } %>> <%- render.table %> </div> <%- render.footersIn.join(\'\') %> </div> <%- render.footersOut.join(\'\') %> </div>';
tpl['table.html'] = ' <table class="table <%= classes %> mb-0"> <colgroup> <% $.each(colGroups, function(key, columnGroup) { %> <col<% if (columnGroup.width) { %> style="width: <%= (columnGroup.width.toString() + columnGroup.unit) %>"<% } %>/> <% }); %> </colgroup> <% if (show.columnHeaders) { %> <thead> <%- columnGroupsHeader %> <%- columns %> </thead> <% } %> <tbody> <%- records %> </tbody> <% if (columnGroupsFooter != \'\') { %> <tfoot> <%- columnGroupsFooter %> </tfoot> <% } %> </table>';
tpl['controls/button.html'] = '<button type="button"<%- attr %>><%- content %></button>';
tpl['controls/button_group.html'] = ' <div class="btn-group" role="group"> <% $.each(buttons, function(key, button) { %> <% if (button.type === \'link\') { %> <a href="<%= button.link %>"<%- button.attr %>><%= button.content %></a> <% } else if (button.type === \'button\') { %> <button type="button" id="btn-<%= button.id %>"<%- button.attr %>> <%= button.content %> </button> <% } else if (button.type === \'dropdown\') { %> <div class="btn-group" role="group"> <button type="button" data-bs-toggle="dropdown"<%- button.attr %>> <%- button.content %> </button> <ul class="dropdown-menu"> <% $.each(button.items, function(key, item) { %> <% if (item.type === \'link\') { %> <li><a class="dropdown-item" href="<%= item.link %>"><%= item.content %></a></li> <% } else if (item.type === \'button\') { %> <li> <button type="button" class="dropdown-item" id="btn-dropdown-<%= item.id %>"> <%= item.content %> </button> </li> <% } else if (item.type === \'divider\') { %> <li><hr class="dropdown-divider"></li> <% } %> <% }) %> </ul> </div> <% } %> <% }) %> </div>';
tpl['controls/columns-container.html'] = ' <div class="coreui-table__columns px-3 pt-3 pb-4"> <div class="mb-3"> <div class="form-check coreui-table__check_all"> <label class="form-check-label"> <input class="form-check-input" type="checkbox" <% if (showAll === true) { %>checked<% } %>> <%= lang.all %> </label> </div> <% $.each(columns, function(key, column) { %> <div class="form-check coreui-table_check-column"> <label class="form-check-label"> <input class="form-check-input" type="checkbox" value="<%= column.field %>" <% if (column.show === true) { %>checked<% } %>> <%= column.label %> </label> </div> <% }); %> </div> <button type="button" <%- btnCompleteAttr %>> <%- btnCompleteContent %> </button> </div>';
tpl['controls/columns.html'] = '<button type="button"<%- btnAttr %>><%-btnContent%></button>';
tpl['controls/dropdown.html'] = ' <div class="btn-group" role="group"> <button type="button" data-bs-toggle="dropdown"<%- attr %>> <%- content %> </button> <ul class="dropdown-menu"> <% $.each(items, function(key, item) { %> <% if (item.type === \'link\') { %> <li><a class="dropdown-item" href="<%= item.link %>"><%= item.content %></a></li> <% } else if (item.type === \'button\') { %> <li> <button type="button" class="dropdown-item" id="btn-dropdown-<%= item.id %>"> <%= item.content %> </button> </li> <% } else if (item.type === \'divider\') { %> <li><hr class="dropdown-divider"></li> <% } %> <% }) %> </ul> </div>';
tpl['controls/link.html'] = '<a href="<%- href %>"<%- attr %>><%- content %></a>';
tpl['controls/page-jump.html'] = ' <div class="coreui-table__page_jump_container"> <div <%- attr %>> <input type="number" class="form-control border-secondary-subtle" min="1"> <button class="btn btn-outline-secondary border-secondary-subtle" type="button"> <i class="bi bi-chevron-compact-right"></i> </button> </div> </div>';
tpl['controls/page-size.html'] = ' <select <%- attr %>> <% $.each(recordsPerPageList, function(key, count) { %> <option value="<%= count %>"<% if (recordsPerPage == count) { %>selected<% } %>> <% if (count == \'0\') { %><%= lang.all %><% } else { %><%= count %><% } %> </option> <% }); %> </select>';
tpl['controls/pages.html'] = ' <nav> <ul <%- attr %>> <% if (showPrev) { %> <li class="page-item coreui-table__page_prev <% if ( ! isActivePrev) { %> disabled<% } %>"> <button type="button" class="page-link text-secondary"> <i class="bi bi-chevron-left"></i> </button> </li> <% } %> <% if (showPageFirst) { %> <li class="page-item"> <button type="button" class="page-link text-secondary coreui-table__page"> 1 </button> </li> <% } %> <% if (showDividerStart) { %> <li class="page-item disabled"> <span class="page-link text-secondary px-1">...</span> </li> <% } %> <% $.each(pages, function(key, page) { %> <% if (page == currentPage) { %> <li class="page-item"> <span class="page-link"><%= page %></span> </li> <% } else { %> <li class="page-item"> <button type="button" class="page-link text-secondary coreui-table__page"> <%= page %> </button> </li> <% } %> <% }); %> <% if (showDividerEnd) { %> <li class="page-item disabled"> <span class="page-link text-secondary px-1">...</span> </li> <% } %> <% if (showPageLast) { %> <li class="page-item"> <button type="button" class="page-link text-secondary coreui-table__page"> <%= pagesTotal %> </button> </li> <% } %> <% if (showNext) { %> <li class="page-item coreui-table__page_next<% if ( ! isActiveNext) { %> disabled<% } %>"> <button type="button" class="page-link text-secondary"> <i class="bi bi-chevron-right"></i> </button> </li> <% } %> </ul> </nav>';
tpl['controls/search-container.html'] = ' <div class="coreui-table__search px-3 pt-3 pb-4"> <div class="mb-3"> <% $.each(controls, function(key, control) { %> <div class="mb-2 row"> <label class="col-12 col-md-2 col-form-label fw-medium text-start text-md-end pe-2"> <%= control.label %> <% if (control.description) { %> <div class="text-muted fw-normal"> <small><%= control.description %></small> </div> <% } %> </label> <div class="col-12 col-md-10 search-control-<%= control.id %>"> <%- control.content %> <% if (control.prefix) { %> <%= control.prefix %> <% } %> </div> </div> <% }); %> </div> <div class="row"> <div class="col-12 col-md-10 offset-0 offset-md-2"> <button type="button" <%- btnCompleteAttr %>> <%- btnCompleteContent %> </button> </div> </div> </div>';
tpl['controls/search.html'] = '<div class="btn-group"> <button type="button"<%- btnAttr %>><%- btnContent %></button> <% if (showClear) { %> <button type="button" <%- clearAttr %>> <%- clearContent %> </button> <% } %> </div> ';
tpl['controls/total.html'] = '<div <%- attr %>> <small><%= lang.total %>: <span class="coreui-table__count-total"><%= recordsTotal %></span></small> </div>';
tpl['filters/checkbox.html'] = ' <div class="btn-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <% $.each(items, function(key, item) { %> <input type="checkbox" class="btn-check" autocomplete="off" id="<%= (field + key) %>" name="<%= field %>" value="<%= item.value %>" <%= item.checked ? \' checked\' : \'\' %>> <label class="<%= item.class %>" for="<%= (field + key) %>"><%= item.text %></label> <% }); %> </div>';
tpl['filters/clear.html'] = ' <button type="button" <%- attr %>><%- content %></button>';
tpl['filters/date.html'] = ' <div class="input-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <input type="date" <%- attr %>> </div>';
tpl['filters/datetime.html'] = ' <div class="input-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <input type="datetime-local" <%- attr %>> </div>';
tpl['filters/datetime_range.html'] = ' <div class="input-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <input type="datetime-local" <%- startAttr %>> <input type="datetime-local" <%- endAttr %>> </div>';
tpl['filters/date_month.html'] = ' <div class="input-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <input type="month" <%- attr %>> </div>';
tpl['filters/date_range.html'] = ' <div class="input-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <input type="date" <%- startAttr %>> <input type="date" <%- endAttr %>> </div>';
tpl['filters/number.html'] = ' <div class="input-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <input type="number" <%- attrStart %>> <input type="number" <%- attrEnd %>> <button type="button" <%- btnAttr %>> <%- btnContent %> </button> </div>';
tpl['filters/radio.html'] = ' <div class="btn-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <% $.each(items, function(key, item) { %> <input type="radio" class="btn-check" autocomplete="off" id="<%= (field + key) %>" name="<%= field %>" value="<%= item.value %>" <%= item.checked ? \' checked\' : \'\' %>> <label class="<%= item.class %>" for="<%= (field + key) %>"><%= item.text %></label> <% }); %> </div>';
tpl['filters/select.html'] = '<div class="input-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <select <%- attr %>> <option>--</option> <% $.each(options, function(key, option) { %> <% if (option.type === \'group\') { %> <optgroup<%- option.attr %>/> <% $.each(option.options, function(key, groupOption) { %> <option <%- groupOption.attr %>/><%= groupOption.text %></option> <% }); %> </optgroup> <% } else { %> <option <%- option.attr %>/><%= option.text %></option> <% } %> <% }); %> </select> </div>';
tpl['filters/switch.html'] = '<div class="form-check form-switch"> <input class="form-check-input" type="checkbox" id="<%= (field + id) %>" name="<%= field %>" value="<%= valueY %>" <%= checked ? \' checked\' : \'\' %>> <% if (label != \'\') { %> <label class="form-check-label" for="<%= (field + id) %>"><%= label %></label> <% } %> </div>';
tpl['filters/text.html'] = ' <div class="input-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <input type="text" <%- attr %>> <button type="button" <%- btnAttr %>> <%- btnContent %> </button> </div>';
tpl['search/checkbox.html'] = ' <% $.each(options, function(key, option) { %> <div class="form-check"> <label class="form-check-label"> <input class="form-check-input" type="checkbox" name="<%= field %>" value="<%- option.value %>" <%= option.checked ? \' checked\' : \'\' %>> <%= option.text %> </label> </div> <% }); %>';
tpl['search/date.html'] = ' <input type="date" <%- attr %>>';
tpl['search/datetime.html'] = ' <input type="datetime-local" <%- attr %>>';
tpl['search/datetime_range.html'] = ' <input type="datetime-local" <%- startAttr %>> <input type="datetime-local" <%- endAttr %>>';
tpl['search/date_month.html'] = ' <input type="month" <%- attr %>>';
tpl['search/date_range.html'] = ' <input type="date" <%- startAttr %>> <input type="date" <%- endAttr %>>';
tpl['search/number.html'] = ' <input type="number" <%- startAttr %>> <input type="number" <%- endAttr %>>';
tpl['search/radio.html'] = '<div class="form-check"> <label class="form-check-label"> <input class="form-check-input" type="radio" name="<%= field %>" value=""<%= checkedAll ? \' checked\' : \'\' %>> <%= lang.all %> </label> </div> <% $.each(options, function(key, option) { %> <div class="form-check"> <label class="form-check-label"> <input class="form-check-input" type="radio" name="<%= field %>" value="<%- option.value %>" <%= option.checked ? \' checked\' : \'\' %>> <%= option.text %> </label> </div> <% }); %>';
tpl['search/select.html'] = ' <select <%- attr %>> <option>--</option> <% $.each(options, function(key, option) { %> <% if (option.type === \'group\') { %> <optgroup<%- option.attr %>/> <% $.each(option.options, function(key, groupOption) { %> <option <%- groupOption.attr %>/><%= groupOption.text %></option> <% }); %> </optgroup> <% } else { %> <option <%- option.attr %>/><%= option.text %></option> <% } %> <% }); %> </select>';
tpl['search/text.html'] = ' <input type="text" <%- attr %>>';

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
   * Проверка на объект
   * @param value
   */
  isObject: function isObject(value) {
    return _typeof(value) === 'object' && !Array.isArray(value) && value !== null;
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

var coreuiTableRender = {
  /**
   * Сборка таблицы
   * @param {object} table
   * @private
   */
  renderTable: function renderTable(table) {
    var that = this;
    var options = table.getOptions();
    var htmlRecords = '';
    var columnGroupsHeader = '';
    var columnGroupsFooter = '';
    var colGroups = [];
    var columns = [];

    // Колонки
    if (table._columns.length > 0) {
      $.each(table._columns, function (key, column) {
        if (!column.isShow()) {
          return;
        }
        var columnOptions = column.getOptions();
        var attributes = [];
        if (columnOptions.hasOwnProperty('fixed') && typeof columnOptions.fixed === 'string') {
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
        colGroups.push({
          width: columnOptions.hasOwnProperty('width') ? columnOptions.width : '',
          unit: typeof columnOptions.width === 'number' ? 'px' : ''
        });
        columns.push({
          attr: attributes.length > 0 ? ' ' + attributes.join(' ') : '',
          label: columnOptions.hasOwnProperty('label') ? columnOptions.label : ""
        });
      });
    }

    // Строки
    if (_typeof(options.records) === 'object' && Array.isArray(options.records) && options.records.length > 0) {
      table._recordsTotal = options.records.length;
      var records = [];
      table._recordsNumber = table._page === 1 ? 1 : (table._page - 1) * table._recordsPerPage + 1;
      $.each(options.records, function (key, record) {
        records.push(that.renderRecord(table, record, key));
        table._recordsNumber++;
      });
      htmlRecords = ejs.render(tpl['table-records.html'], {
        records: records
      });
    } else {
      var isRemote = options.hasOwnProperty('recordsRequest') && coreuiTableUtils.isObject(options.recordsRequest) && typeof options.recordsRequest.url === 'string' && options.recordsRequest.url !== '#';
      if (!isRemote) {
        htmlRecords = ejs.render(tpl['table-records-empty.html'], {
          columnsCount: table._columns.length ? table._columns.length : 1,
          lang: table.getLang()
        });
      }
    }
    if (_typeof(options.columnGroupsHeader) === 'object' && Array.isArray(options.columnGroupsHeader) && options.columnGroupsHeader.length > 0) {
      var rows = [];
      $.each(options.columnGroupsHeader, function (key, headerRow) {
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
      columnGroupsHeader = rows.join('');
    }
    if (_typeof(options.columnGroupsFooter) === 'object' && Array.isArray(options.columnGroupsFooter) && options.columnGroupsFooter.length > 0) {
      var _rows = [];
      $.each(options.columnGroupsFooter, function (key, footerRow) {
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
      columnGroupsFooter = _rows.join('');
    }
    var classes = [];
    if (typeof options["class"] === 'string' && options["class"]) {
      classes.push(options["class"]);
    }
    if (typeof options.size === 'string' && options.size) {
      classes.push('table-' + options.size);
    }
    if (typeof options.hover === 'boolean' && options.hover) {
      classes.push('table-hover');
    }
    if (typeof options.striped === 'boolean' && options.striped) {
      classes.push('table-striped');
    }
    if (!columnGroupsFooter || !render.pages) {
      classes.push('empty-tfoot');
    }
    var htmlColumns = ejs.render(tpl['table-columns.html'], {
      columns: columns
    });
    return ejs.render(tpl['table.html'], {
      classes: classes.join(' '),
      show: options.show,
      columnGroupsHeader: columnGroupsHeader,
      colGroups: colGroups,
      columns: htmlColumns,
      columnGroupsFooter: columnGroupsFooter,
      records: htmlRecords
    });
  },
  /**
   * Сборка записи таблицы
   * @param {object} table
   * @param {object} record
   * @param {int}    recordKey
   * @returns {{ attr: (string), fields: (object) }}}
   * @private
   */
  renderRecord: function renderRecord(table, record, recordKey) {
    var that = this;
    var options = table.getOptions();
    var fields = [];
    var recordMeta = _typeof(record._meta) === 'object' && !Array.isArray(record._meta) ? record._meta : null;
    var recordAttr = {
      "class": 'coreui-table__record'
    };
    $.each(table._columns, function (key, column) {
      if (!column.isShow()) {
        return;
      }
      fields.push(that.renderField(column, record, recordKey));
    });
    if (typeof options.onClickUrl === 'string' && options.onClickUrl) {
      recordAttr["class"] += ' coreui-table_pointer';
    }
    if (recordMeta) {
      recordAttr = coreuiTableUtils.mergeAttr(recordAttr, recordMeta.attr);
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
   * Сборка ячейки таблицы
   * @param {object} column
   * @param {object} record
   * @param {int} recordKey
   * @returns {{ attr: (string), content: (string) }}
   * @private
   */
  renderField: function renderField(column, record, recordKey) {
    var columnOptions = column.getOptions();
    var columnField = typeof columnOptions.field === 'string' ? columnOptions.field : null;
    var content = '';
    var recordMeta = _typeof(record._meta) === 'object' && !Array.isArray(record._meta) ? record._meta : null;
    var fieldProps = recordMeta && recordMeta.hasOwnProperty('fields') && recordMeta.fields.hasOwnProperty(columnField) ? recordMeta.fields[columnField] : null;
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
  },
  /**
   * Сборка элемента управления
   * @param {object} table
   * @param {object} control
   * @private
   */
  renderControl: function renderControl(table, control) {
    if (typeof control.type === 'string') {
      var controlInstance = null;
      if (coreuiTable$1.controls.hasOwnProperty(control.type)) {
        controlInstance = $.extend(true, {}, coreuiTable$1.controls[control.type]);
      } else if (control.type.indexOf('filter:') === 0) {
        var filterName = control.type.substring(7);
        if (coreuiTable$1.filters.hasOwnProperty(filterName)) {
          controlInstance = $.extend(true, {}, coreuiTable$1.filters[filterName]);
        }
      }
      if (controlInstance !== null) {
        controlInstance.init(table, control);
        var controlRender = ejs.render(tpl['table-control.html'], {
          control: {
            id: controlInstance.getId(),
            content: controlInstance.render()
          }
        });
        if (controlInstance.hasOwnProperty('initEvents') && typeof controlInstance.initEvents === 'function') {
          table.on('shown', function () {
            controlInstance.initEvents();
          });
        }
        return controlRender;
      }
    }
  }
};

var coreuiTableElements = {
  /**
   * Получение контейнера таблицы
   * @param {string} tableId
   * @return {jQuery}
   */
  getContainer: function getContainer(tableId) {
    return $('#coreui-table-' + tableId + ' > .coreui-table__container');
  },
  /**
   * Получение обертки таблицы
   * @param {string} tableId
   * @return {jQuery}
   */
  getLock: function getLock(tableId) {
    return $('#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table-lock');
  },
  /**
   * Получение обертки таблицы
   * @param {string} tableId
   * @return {jQuery}
   */
  getWrapper: function getWrapper(tableId) {
    return $('#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper');
  },
  /**
   * Получение поискового контейнера
   * @param {string} tableId
   * @return {jQuery}
   */
  getSearchContainer: function getSearchContainer(tableId) {
    return $('#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper > .coreui-table__search');
  },
  /**
   * Получение поискового контейнера
   * @param {string} tableId
   * @return {jQuery}
   */
  getColumnsContainer: function getColumnsContainer(tableId) {
    return $('#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper > .coreui-table__columns');
  },
  /**
   * Получение контейнера поискового контрола
   * @param {string} tableId
   * @param {string} controlId
   * @return {jQuery}
   */
  getSearchControl: function getSearchControl(tableId, controlId) {
    return $('#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper > .coreui-table__search .search-control-' + controlId);
  },
  /**
   * Получение контейнера контрола
   * @param {string} tableId
   * @param {string} controlId
   * @return {jQuery}
   */
  getControl: function getControl(tableId, controlId) {
    return $('#coreui-table-' + tableId + ' > .coreui-table__container #coreui-table-control-' + controlId);
  },
  /**
   * Получение таблицы
   * @param {string} tableId
   * @return {jQuery}
   */
  getTable: function getTable(tableId) {
    return $('#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper > table');
  },
  /**
   * Получение тела таблицы
   * @param {string} tableId
   * @return {jQuery}
   */
  getTableTbody: function getTableTbody(tableId) {
    return $('#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper > table > tbody');
  },
  /**
   * Получение строк записей
   * @param {string} tableId
   * @return {jQuery}
   */
  getTrRecords: function getTrRecords(tableId) {
    return $('#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper > table > tbody > tr.coreui-table__record');
  },
  /**
   * Получение элемента строки по ключу
   * @param {string} tableId
   * @param {int}    index
   * @return {jQuery}
   */
  getTrByIndex: function getTrByIndex(tableId, index) {
    return $('#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper > table > tbody > tr[data-record-index="' + index + '"]');
  },
  /**
   * Получение выбранных на таблице элементов
   * @param {string} tableId
   * @return {Array}
   */
  getSelectedIndexes: function getSelectedIndexes(tableId) {
    var indexes = [];
    $('#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper > table > tbody > tr.coreui-table__record > td.coreui-table__select_container > .coreui-table__select:checked').each(function (key, element) {
      indexes.push($(element).val());
    });
    return indexes;
  },
  /**
   * Получение выбранных на таблице элементов
   * @param {string} tableId
   * @return {Array}
   */
  getRowsSwitches: function getRowsSwitches(tableId) {
    var indexes = [];
    $('#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper > table > tbody > tr.coreui-table__record > td.coreui-table__switch_container').each(function (key, element) {
      indexes.push($(element).val());
    });
    return indexes;
  },
  /**
   * Получение элементов выбора строк
   * @param {string} tableId
   * @return {Array}
   */
  getRowsSelects: function getRowsSelects(tableId) {
    return $('#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper  > table > tbody > tr.coreui-table__record > td.coreui-table__select_container');
  },
  /**
   * Получение элемента для выбора всех строк
   * @param {string} tableId
   * @return {Array}
   */
  getRowsSelectAll: function getRowsSelectAll(tableId) {
    return $('#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper  > table > thead > tr > td > .coreui-table__select-all');
  },
  /**
   * Выделение строки в таблице
   * @param {jQuery} tr
   */
  selectTr: function selectTr(tr) {
    tr.addClass('table-primary');
    $('.coreui-table__select', tr).prop('checked', true);
  },
  /**
   * Выделение всех строк в таблице
   * @param {string} tableId
   */
  selectTrAll: function selectTrAll(tableId) {
    var tableContainer = '#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper > table';
    $(tableContainer + ' > thead > tr > td > .coreui-table__select-all').prop('checked', true);
    $(tableContainer + ' > tbody > tr.coreui-table__record').addClass('table-primary');
    $(tableContainer + ' > tbody > tr.coreui-table__record > td > .coreui-table__select').prop('checked', true);
  },
  /**
   * Снятие выделение строки в таблице
   * @param {jQuery} tr
   */
  unselectTr: function unselectTr(tr) {
    $(tr).removeClass('table-primary');
    $('.coreui-table__select', tr).prop('checked', false);
  },
  /**
   * Снятие выделение со всех строк в таблице
   * @param {string} tableId
   */
  unselectTrAll: function unselectTrAll(tableId) {
    var tableContainer = '#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper > table';
    $(tableContainer + ' > thead > tr > td > .coreui-table__select-all').prop('checked', false);
    $(tableContainer + ' > tbody > tr.coreui-table__record').removeClass('table-primary');
    $(tableContainer + ' > tbody > tr.coreui-table__record > td.coreui-table__select_container > .coreui-table__select').prop('checked', false);
  },
  /**
   * Фиксация колонок слева
   * @param {string} tableId
   */
  fixedColsLeft: function fixedColsLeft(tableId) {
    var tableWrapper = '#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper';
    var colOffset = 0;
    $(tableWrapper + ' > table > thead > tr:last-child > td.coreui-table__fixed_left').each(function () {
      var index = $(this).index() + 1;
      if (index !== 1) {
        $(tableWrapper + ' > table > thead > tr:last-child > td:nth-child(' + index + ')').css('left', colOffset + 'px');
        $(tableWrapper + ' > table > tbody > tr > td:nth-child(' + index + ')').css('left', colOffset + 'px');
      }
      colOffset += $(this).outerWidth();
    });
  },
  /**
   * Фиксация колонок справа
   * @param {string} tableId
   */
  fixedColsRight: function fixedColsRight(tableId) {
    var tableWrapper = '#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper';
    var colOffset = 0;
    $($(tableWrapper + ' > table > thead > tr:last-child > td.coreui-table__fixed_right').get().reverse()).each(function () {
      var index = $(this).index() + 1;
      if (index !== 1) {
        $(tableWrapper + ' > table > thead > tr:last-child > td:nth-child(' + index + ')').css('right', colOffset + 'px');
        $(tableWrapper + ' > table > tbody > tr > td:nth-child(' + index + ')').css('right', colOffset + 'px');
      }
      colOffset += $(this).outerWidth();
    });
  }
};

var coreuiTableInstance = {
  _options: {
    id: null,
    "class": '',
    primaryKey: 'id',
    lang: 'ru',
    size: '',
    striped: false,
    hover: false,
    width: null,
    minWidth: null,
    maxWidth: null,
    height: null,
    minHeight: null,
    naxHeight: null,
    page: 1,
    recordsPerPage: 25,
    recordsRequest: {
      method: 'GET',
      url: null,
      // '/mod/index/orders/?page=[page]'
      pageParam: 'page',
      recordsPerPageParam: 'count'
    },
    show: {
      columnHeaders: true
    },
    onClick: null,
    onClickUrl: null,
    controls: [],
    columnGroupsHeader: [],
    columns: [],
    columnGroupsFooter: [],
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
        if (typeof column.type === 'undefined' || !coreuiTable$1.columns.hasOwnProperty(column.type)) {
          column.type = 'text';
        }
        if (!column.hasOwnProperty('show') || typeof column.show !== 'boolean') {
          column.show = true;
        }
        var columnInstance = $.extend(true, {}, coreuiTable$1.columns[column.type]);
        columnInstance.init(that, column);
        that._columns.push(columnInstance);
      });
    }

    // Инициализация поисковых полей
    if (_typeof(this._options.search) === 'object' && Array.isArray(this._options.search) && this._options.search.length > 0) {
      $.each(this._options.search, function (key, control) {
        if (!coreuiTableUtils.isObject(control)) {
          control = {};
        }
        if (!control.hasOwnProperty('type') || typeof control.type !== 'string' || !coreuiTable$1.search.hasOwnProperty(control.type)) {
          control.type = 'text';
        }
        var controlInstance = $.extend(true, {}, coreuiTable$1.search[control.type]);
        controlInstance.init(that, control);
        that._search.push(controlInstance);
      });
    }
  },
  /**
   *
   */
  initEvents: function initEvents() {
    var that = this;
    this.on('show-records', function () {
      // Переход по ссылке
      if (typeof that._options.onClickUrl === 'string' && that._options.onClickUrl) {
        coreuiTableElements.getTrRecords(that.getId()).click(function () {
          var recordKey = $(this).data('record-index');
          var record = that.getRecordByIndex(recordKey);
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
        coreuiTableElements.getTrRecords(that.getId()).click(function (event) {
          var recordKey = $(this).data('record-index');
          var record = that.getRecordByIndex(recordKey);
          if (!record) {
            return;
          }
          that._options.onClick(event, record);
        });
      }

      // Фиксация колонок
      coreuiTableElements.fixedColsLeft(that.getId());
      coreuiTableElements.fixedColsRight(that.getId());
    });
    this._trigger('shown');

    // Вызов события показа строк
    if ((!this._options.hasOwnProperty('recordsRequest') || !coreuiTableUtils.isObject(this._options.recordsRequest) || !this._options.recordsRequest.url || this._options.recordsRequest.url === '#') && _typeof(this._options.records) === 'object' && Array.isArray(this._options.records) && this._options.records.length > 0) {
      this._trigger('show-records', this, [this]);
    }
  },
  /**
   * Получение идентификатора таблицы
   * @returns {string}
   */
  getId: function getId() {
    return this._options.id;
  },
  /**
   * Получение опций таблицы
   * @returns {*}
   */
  getOptions: function getOptions() {
    return $.extend(true, {}, this._options);
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
    var render = {
      headersOut: [],
      headersIn: [],
      footersIn: [],
      footersOut: []
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

    // Верхние элементы управления
    if (Array.isArray(this._options.header) && this._options.header.length > 0) {
      $.each(this._options.header, function (key, header) {
        var type = 'in';
        var controlsLeft = [];
        var controlsCenter = [];
        var controlsRight = [];
        if (typeof header.type === 'string' && ['in', 'out'].indexOf(header.type.toLowerCase()) >= 0) {
          type = header.type.toLowerCase();
        }
        if (Array.isArray(header.left) && header.left.length > 0) {
          $.each(header.left, function (key, control) {
            if (coreuiTableUtils.isObject(control)) {
              var controlRender = coreuiTableRender.renderControl(that, control);
              if (controlRender) {
                controlsLeft.push(controlRender);
              }
            }
          });
        }
        if (Array.isArray(header.center) && header.center.length > 0) {
          $.each(header.center, function (key, control) {
            if (coreuiTableUtils.isObject(control)) {
              var controlRender = coreuiTableRender.renderControl(that, control);
              if (controlRender) {
                controlsCenter.push(controlRender);
              }
            }
          });
        }
        if (Array.isArray(header.right) && header.right.length > 0) {
          $.each(header.right, function (key, control) {
            if (coreuiTableUtils.isObject(control)) {
              var controlRender = coreuiTableRender.renderControl(that, control);
              if (controlRender) {
                controlsRight.push(controlRender);
              }
            }
          });
        }
        if (controlsLeft.length > 0 || controlsCenter.length > 0 || controlsRight.length > 0) {
          if (type === 'in') {
            var headerControls = ejs.render(tpl['table-controls-header.html'], {
              controlsLeft: controlsLeft,
              controlsCenter: controlsCenter,
              controlsRight: controlsRight
            });
            render.headersIn.push(headerControls);
          } else {
            var _headerControls = ejs.render(tpl['table-controls-header-out.html'], {
              controlsLeft: controlsLeft,
              controlsCenter: controlsCenter,
              controlsRight: controlsRight
            });
            render.headersOut.push(_headerControls);
          }
        }
      });
    }

    // Нижние элементы управления
    if (Array.isArray(this._options.footer) && this._options.footer.length > 0) {
      $.each(this._options.footer, function (key, footer) {
        var type = 'in';
        var controlsLeft = [];
        var controlsCenter = [];
        var controlsRight = [];
        if (typeof footer.type === 'string' && ['in', 'out'].indexOf(footer.type.toLowerCase()) >= 0) {
          type = footer.type.toLowerCase();
        }
        if (Array.isArray(footer.left) && footer.left.length > 0) {
          $.each(footer.left, function (key, control) {
            if (coreuiTableUtils.isObject(control)) {
              var controlRender = coreuiTableRender.renderControl(that, control);
              if (controlRender) {
                controlsLeft.push(controlRender);
              }
            }
          });
        }
        if (Array.isArray(footer.center) && footer.center.length > 0) {
          $.each(footer.center, function (key, control) {
            if (coreuiTableUtils.isObject(control)) {
              var controlRender = coreuiTableRender.renderControl(that, control);
              if (controlRender) {
                controlsCenter.push(controlRender);
              }
            }
          });
        }
        if (Array.isArray(footer.right) && footer.right.length > 0) {
          $.each(footer.right, function (key, control) {
            if (coreuiTableUtils.isObject(control)) {
              var controlRender = coreuiTableRender.renderControl(that, control);
              if (controlRender) {
                controlsRight.push(controlRender);
              }
            }
          });
        }
        if (controlsLeft.length > 0 || controlsCenter.length > 0 || controlsRight.length > 0) {
          if (type === 'in') {
            var footerControls = ejs.render(tpl['table-controls-footer.html'], {
              controlsLeft: controlsLeft,
              controlsCenter: controlsCenter,
              controlsRight: controlsRight
            });
            render.footersIn.push(footerControls);
          } else {
            var _footerControls = ejs.render(tpl['table-controls-footer-out.html'], {
              controlsLeft: controlsLeft,
              controlsCenter: controlsCenter,
              controlsRight: controlsRight
            });
            render.footersOut.push(_footerControls);
          }
        }
      });
    }

    // Загрузка записей
    if (coreuiTableUtils.isObject(this._options.recordsRequest) && typeof this._options.recordsRequest.url === 'string' && this._options.recordsRequest.url !== '#') {
      this.on('shown', function () {
        that.load(that._options.recordsRequest.url);
      });
    }
    var table = coreuiTableRender.renderTable(this);
    var html = ejs.render(tpl['table-wrapper.html'], {
      id: this._options.id,
      lang: this.getLang(),
      widthSizes: widthSizes,
      heightSizes: heightSizes,
      recordsTotal: this._recordsTotal,
      render: {
        headersOut: render.headersOut,
        headersIn: render.headersIn,
        footersIn: render.footersIn,
        footersOut: render.footersOut,
        table: table
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
   * Блокировка таблицы
   */
  lock: function lock() {
    var container = coreuiTableElements.getContainer(this.getId());
    if (container[0] && !container.find('.coreui-table-lock')[0]) {
      var html = ejs.render(tpl['table-loader.html'], {
        lang: this.getLang()
      });
      container.prepend(html);
    }
  },
  /**
   * Разблокировка таблицы
   */
  unlock: function unlock() {
    coreuiTableElements.getLock().hide(50, function () {
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
    if (url.match(/\[page\]/)) {
      url = url.replace(/\[page\]/g, this._page);
    }
    if (url.match(/\[count\]/)) {
      url = url.replace(/\[count\]/g, this._recordsPerPage);
    }
    if (url.match(/\[start\]/)) {
      url = url.replace(/\[start\]/g, (this._page - 1) * this._recordsPerPage + 1);
    }
    if (url.match(/\[end\]/)) {
      url = url.replace(/\[end\]/g, (this._page - 1) * this._recordsPerPage + Number(this._recordsPerPage));
    }
    $.ajax({
      url: url,
      method: method || 'GET',
      dataType: "json",
      beforeSend: function beforeSend(xhr) {
        that._trigger('start-load-records', that, [that, xhr]);
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
        that._trigger('error-load-records', that, [that, xhr, textStatus, errorThrown]);
      },
      complete: function complete(xhr, textStatus) {
        that.unlock();
        that._trigger('end-load-records', that, [that, xhr, textStatus]);
      }
    });
  },
  /**
   * Перезагрузка записей в таблице
   */
  reload: function reload() {
    if (coreuiTableUtils.isObject(this._options.recordsRequest) && typeof this._options.recordsRequest.url === 'string' && this._options.recordsRequest.url !== '#') {
      this.load(this._options.recordsRequest.url, this._options.recordsRequest.method);
    }
  },
  /**
   * Пересоздание тела таблицы
   */
  refresh: function refresh() {
    var table = coreuiTableRender.renderTable(this);
    coreuiTableElements.getTable(this.getId()).replaceWith(table);
    this._trigger('show-records', this, [this]);
  },
  /**
   * Установка общего количества записей на странице
   * @param recordsPerPage
   */
  setPageSize: function setPageSize(recordsPerPage) {
    this._recordsPerPage = recordsPerPage;
    this._trigger('update-page-size', this);
  },
  /**
   * Выбор всех записей в таблице
   */
  selectAll: function selectAll() {
    coreuiTableElements.selectTrAll(this.getId());
    this._trigger('select-all', this);
  },
  /**
   * Отмена выбор всех записей в таблице
   */
  unselectAll: function unselectAll() {
    coreuiTableElements.unselectTrAll(this.getId());
    this._trigger('unselect-all', this);
  },
  /**
   * Выбор записи в таблице
   * @param {string} id
   */
  selectRecord: function selectRecord(id) {
    var row = this.getRowById(id);
    if (!row) {
      return;
    }
    var tr = coreuiTableElements.getTrByIndex(this.getId(), row.index);
    if (tr.length === 0) {
      return;
    }
    coreuiTableElements.selectTr(tr);
    this._trigger('select', this, [row.record]);
  },
  /**
   * Отмена выбора записи в таблице
   * @param {string} id
   */
  unselectRecord: function unselectRecord(id) {
    var row = this.getRowById(id);
    if (!row) {
      return;
    }
    var tr = coreuiTableElements.getTrByIndex(this.getId(), row.index);
    if (!tr) {
      return;
    }
    coreuiTableElements.unselectTr(tr);
    this._trigger('unselect', this, [row.record]);
  },
  /**
   * Получение выбранных id
   * @return {array}
   */
  getSelectedRecordsId: function getSelectedRecordsId() {
    var records = [];
    var that = this;
    var field = this._options.primaryKey;
    $.each(coreuiTableElements.getSelectedIndexes(this.getId()), function (key, index) {
      var record = that.getRecordByIndex(index);
      if (!record || !record.hasOwnProperty(field)) {
        return;
      }
      records.push(record[field]);
    });
    return records;
  },
  /**
   * Получение выбранных записей
   * @return {array}
   */
  getSelectedRecords: function getSelectedRecords() {
    var records = [];
    var that = this;
    $.each(coreuiTableElements.getSelectedIndexes(this.getId()), function (key, index) {
      var record = that.getRecordByIndex(index);
      if (!record) {
        return;
      }
      records.push(record);
    });
    return records;
  },
  /**
   * Получение записи по id
   * @param id
   * @return {object|null}
   */
  getRecord: function getRecord(id) {
    var row = this.getRowById(id);
    if (!row) {
      return null;
    }
    return $.extend(true, {}, row.record);
  },
  /**
   * Получение записей
   */
  getRecords: function getRecords() {
    return $.extend(true, {}, this._options.records);
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
   * Регистрация функции на событие
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
   * Получение переводов
   * @return {object}
   */
  getLang: function getLang() {
    var result = {};
    if (this._options.lang && coreuiTable$1.lang.hasOwnProperty(this._options.lang)) {
      result = coreuiTable$1.lang[this._options.lang];
    } else {
      var lang = coreuiTable$1.getSetting('lang');
      if (lang && coreuiTable$1.lang.hasOwnProperty(lang)) {
        result = coreuiTable$1.lang[lang];
      } else if (Object.keys(coreuiTable$1.lang).length > 0) {
        result = coreuiTable$1.lang[Object.keys(coreuiTable$1.lang)[0]];
      }
    }
    return $.extend(true, {}, result);
  },
  /**
   * Установка видимых колонок, не указанные колонки будут скрыты
   * @param {Array} columns
   */
  setColumnsShow: function setColumnsShow(columns) {
    if (!Array.isArray(columns)) {
      return;
    }
    $.each(this._columns, function (key, column) {
      var options = column.getOptions();
      if (options.hasOwnProperty('field') && typeof options.field === 'string') {
        column.setShow(columns.indexOf(options.field) >= 0);
      }
    });
  },
  /**
   * Поиск по таблице
   */
  searchRecords: function searchRecords() {
    if (this._search.length === 0) {
      return;
    }
    var controlsSearch = [];
    $.each(this._search, function (key, control) {
      var options = control.getOptions();
      if (options.hasOwnProperty('field') && typeof options.field === 'string' && options.field) {
        var value = control.getValue();
        if (value !== null) {
          controlsSearch.push({
            field: options.field,
            value: value
          });
        }
      }
    });
    
  },
  /**
   * Фильтрация по таблице
   */
  filterRecords: function filterRecords() {
    if (this._filter.length === 0) {
      return;
    }
    var controlsFilters = [];
    $.each(this._filter, function (key, control) {
      var options = control.getOptions();
      if (options.hasOwnProperty('field') && typeof options.field === 'string' && options.field) {
        var value = control.getValue();
        if (value !== null) {
          controlsFilters.push({
            field: options.field,
            value: value
          });
        }
      }
    });
    
  },
  /**
   * Получение записи по индексу
   * @param {string|number} index
   * @return {object|null}
   */
  getRecordByIndex: function getRecordByIndex(index) {
    if (['string', 'number'].indexOf(_typeof(index)) < 0 || index === '') {
      return null;
    }
    return this._options.records.hasOwnProperty(index) ? this._options.records[index] : null;
  },
  /**
   * Получение записи по id
   * @param {string} id
   * @return {object|null}
   */
  getRowById: function getRowById(id) {
    return this.getRowByField(this._options.primaryKey, id);
  },
  /**
   * Получение записи по полю
   * @param {string}        field
   * @param {string|number} value
   * @return {object|null}
   */
  getRowByField: function getRowByField(field, value) {
    if (['string', 'number'].indexOf(_typeof(field)) < 0 || field === '') {
      return null;
    }
    var index = null;
    var record = null;
    $.each(this._options.records, function (key, recordItem) {
      if (recordItem.hasOwnProperty(field) && recordItem[field] === value) {
        index = key;
        record = recordItem;
        return false;
      }
    });
    if (!record) {
      return null;
    }
    return {
      index: index,
      record: record
    };
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
    this._options.records = records;
    that._recordsNumber = this._page === 1 ? 1 : (this._page - 1) * this._recordsPerPage + 1;
    if (records.length > 0) {
      var renderRecorders = [];
      $.each(records, function (key, record) {
        renderRecorders.push(coreuiTableRender.renderRecord(that, record, key));
        that._recordsNumber++;
      });
      htmlRecords = ejs.render(tpl['table-records.html'], {
        records: renderRecorders
      });
    } else {
      htmlRecords = ejs.render(tpl['table-records-empty.html'], {
        columnsCount: this._columns.length > 0 ? this._columns.length : 1,
        lang: this.getLang()
      });
    }
    coreuiTableElements.getTableTbody(this.getId()).html(htmlRecords);
    this._trigger('show-records', this, [this]);
  },
  /**
   * Выполнения зарегистрированных функций в указанном событии
   * @param {string}      name
   * @param {object|null} context
   * @param {Array}       params
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
  }
};

var coreuiTable$1 = {
  columns: {},
  controls: {},
  filters: {},
  search: {},
  lang: {},
  _instances: {},
  _settings: {
    lang: 'ru'
  },
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
  },
  /**
   * Установка настроек
   * @param {object} settings
   */
  setSettings: function setSettings(settings) {
    this._settings = $.extend(true, {}, this._settings, settings);
  },
  /**
   * Получение значения настройки
   * @param {string} name
   */
  getSetting: function getSetting(name) {
    var value = null;
    if (this._settings.hasOwnProperty(name)) {
      value = this._settings[name];
    }
    return value;
  }
};

coreuiTable$1.lang.ru = {
  "emptyRecords": "Нет записей",
  "loading": "Загрузка...",
  "total": "Всего",
  "all": "Все",
  "complete": "Применить",
  "search": "Искать",
  "clear": "Очистить"
};

coreuiTable$1.lang.ru = {
  "emptyRecords": "No records",
  "loading": "Loading...",
  "total": "Total",
  "all": "All",
  "complete": "Complete",
  "search": "Search",
  "clear": "Clear"
};

coreuiTable$1.controls.link = {
  _id: null,
  _table: null,
  _options: {
    href: null,
    content: null,
    attr: null
  },
  /**
   * Инициализация
   * @param {CoreUI.table.instance} table
   * @param {object} options
   */
  init: function init(table, options) {
    this._options = $.extend({}, this._options, options);
    this._table = table;
    this._id = coreuiTableUtils.hashCode();
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
    return this._id;
  },
  /**
   * Формирование контента для размещения на странице
   * @returns {string}
   */
  render: function render() {
    var attributes = [];
    if (_typeof(this._options.attr) === 'object') {
      $.each(this._options.attr, function (name, value) {
        attributes.push(name + '="' + value + '"');
      });
    }
    return ejs.render(tpl['controls/link.html'], {
      href: this._options.href,
      content: this._options.content,
      attr: attributes.length > 0 ? ' ' + attributes.join(' ') : ''
    });
  }
};

coreuiTable$1.controls.button = {
  _id: null,
  _table: null,
  _options: {
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
    this._id = coreuiTableUtils.hashCode();
  },
  /**
   * Инициализация событий связанных с элементом управления
   */
  initEvents: function initEvents() {
    var that = this;
    if (typeof this._options.onClick === 'function' || typeof this._options.onClick === 'string') {
      var control = coreuiTableElements.getControl(this._table.getId(), this._id);
      $('button', control).click(function (event) {
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
    return this._id;
  },
  /**
   * Формирование контента для размещения на странице
   * @returns {string}
   */
  render: function render() {
    var attributes = [];
    if (coreuiTableUtils.isObject(this._options.attr)) {
      $.each(this._options.attr, function (name, value) {
        attributes.push(name + '="' + value + '"');
      });
    }
    return ejs.render(tpl['controls/button.html'], {
      content: this._options.content,
      attr: attributes.length > 0 ? ' ' + attributes.join(' ') : ''
    });
  }
};

coreuiTable$1.controls.dropdown = {
  _id: null,
  _table: null,
  _options: {
    type: 'dropdown',
    content: null,
    items: null,
    attr: {
      "class": 'btn btn-primary'
    }
  },
  /**
   * Инициализация
   * @param {CoreUI.table.instance} table
   * @param {object} options
   */
  init: function init(table, options) {
    this._options = $.extend({}, this._options, options);
    this._table = table;
    this._id = coreuiTableUtils.hashCode();
    if (Array.isArray(this._options.items)) {
      $.each(this._options.items, function (key, item) {
        if (coreuiTableUtils.isObject(item) && typeof item.type === 'string') {
          item.id = coreuiTableUtils.hashCode();
        }
      });
    }
  },
  /**
   * Получение параметров
   * @returns {object}
   */
  getOptions: function getOptions() {
    return $.extend(true, {}, this._options);
  },
  /**
   * Инициализация событий связанных с элементом управления
   */
  initEvents: function initEvents() {
    var that = this;
    var options = this.getOptions();
    if (Array.isArray(options.items)) {
      $.each(options.items, function (key, item) {
        if (coreuiTableUtils.isObject(item) && typeof item.type === 'string') {
          if (item.type === 'button') {
            if (item.hasOwnProperty('content') && item.hasOwnProperty('onClick') && ['string', 'function'].indexOf(_typeof(item.onClick)) >= 0 && typeof item.content === 'string') {
              var control = coreuiTableElements.getControl(that._table.getId(), that.getId());
              $('button#btn-dropdown-' + item.id, control).click(function (event) {
                if (typeof item.onClick === 'function') {
                  item.onClick(event, that._table);
                } else if (typeof item.onClick === 'string') {
                  new Function(item.onClick)();
                }
              });
            }
          }
        }
      });
    }
  },
  /**
   * Получение ID элемента управления
   * @returns {string}
   */
  getId: function getId() {
    return this._id;
  },
  /**
   * Формирование контента для размещения на странице
   * @returns {string}
   */
  render: function render() {
    var options = this.getOptions();
    var items = [];
    var attributes = [];
    if (Array.isArray(options.items)) {
      $.each(options.items, function (key, item) {
        if (coreuiTableUtils.isObject(item) && typeof item.type === 'string') {
          if (item.type === 'link') {
            if (item.hasOwnProperty('link') && item.hasOwnProperty('content') && typeof item.link === 'string' && typeof item.content === 'string') {
              items.push({
                type: 'link',
                link: item.link,
                content: item.content
              });
            }
          } else if (item.type === 'button') {
            if (item.hasOwnProperty('content') && item.hasOwnProperty('onClick') && typeof item.content === 'string' && ['string', 'function'].indexOf(_typeof(item.onClick)) >= 0) {
              items.push({
                type: 'button',
                id: item.id,
                content: item.content
              });
            }
          } else if (item.type === 'divider') {
            items.push({
              type: 'divider'
            });
          }
        }
      });
    }
    if (coreuiTableUtils.isObject(options.attr)) {
      if (options.attr.hasOwnProperty('class') && ['string', 'number'].indexOf(_typeof(options.attr["class"])) >= 0) {
        options.attr["class"] += ' dropdown-toggle';
      }
      if (options.attr.hasOwnProperty('type')) {
        delete options.attr.type;
      }
      if (options.attr.hasOwnProperty('id')) {
        delete options.attr.id;
      }
      if (options.attr.hasOwnProperty('data-bs-toggle')) {
        delete options.attr['data-bs-toggle'];
      }
      $.each(options.attr, function (name, value) {
        attributes.push(name + '="' + value + '"');
      });
    }
    return ejs.render(tpl['controls/dropdown.html'], {
      content: options.content,
      attr: attributes.length > 0 ? ' ' + attributes.join(' ') : '',
      items: items
    });
  }
};

coreuiTable$1.controls.button_group = {
  _id: null,
  _table: null,
  _options: {
    content: null,
    onClick: null,
    attr: null
  },
  _link: {
    attr: {
      "class": 'btn btn-secondary'
    }
  },
  _button: {
    attr: {
      "class": 'btn btn-secondary'
    }
  },
  _dropdown: {
    attr: {
      "class": 'btn btn-secondary'
    }
  },
  /**
   * Инициализация
   * @param {CoreUI.table.instance} table
   * @param {object} options
   */
  init: function init(table, options) {
    this._options = $.extend({}, this._options, options);
    this._table = table;
    this._id = coreuiTableUtils.hashCode();
    if (Array.isArray(this._options.buttons)) {
      $.each(this._options.buttons, function (key, button) {
        if (coreuiTableUtils.isObject(button) && typeof button.type === 'string') {
          button.id = coreuiTableUtils.hashCode();
          if (button.type === 'dropdown' && Array.isArray(button.items)) {
            $.each(button.items, function (key, item) {
              if (coreuiTableUtils.isObject(item) && typeof item.type === 'string') {
                item.id = coreuiTableUtils.hashCode();
              }
            });
          }
        }
      });
    }
  },
  /**
   * Получение параметров
   * @returns {object}
   */
  getOptions: function getOptions() {
    return $.extend(true, {}, this._options);
  },
  /**
   * Инициализация событий связанных с элементом управления
   */
  initEvents: function initEvents() {
    var that = this;
    var options = this.getOptions();
    if (Array.isArray(options.buttons)) {
      var control = coreuiTableElements.getControl(this._table.getId(), this._id);
      $.each(options.buttons, function (key, button) {
        if (coreuiTableUtils.isObject(button) && typeof button.type === 'string') {
          if (button.type === 'button') {
            if (button.hasOwnProperty('content') && button.hasOwnProperty('onClick') && ['string', 'function'].indexOf(_typeof(button.onClick)) >= 0 && typeof button.content === 'string') {
              $('button#btn-' + button.id, control).click(function (event) {
                if (typeof button.onClick === 'function') {
                  button.onClick(event, that._table);
                } else if (typeof button.onClick === 'string') {
                  new Function(button.onClick)();
                }
              });
            }
          } else if (button.type === 'dropdown' && Array.isArray(button.items)) {
            $.each(button.items, function (key, item) {
              if (coreuiTableUtils.isObject(item) && typeof item.type === 'string') {
                if (item.hasOwnProperty('content') && item.hasOwnProperty('onClick') && ['string', 'function'].indexOf(_typeof(item.onClick)) >= 0 && typeof item.content === 'string') {
                  $('button#btn-dropdown-' + item.id, control).click(function (event) {
                    if (typeof item.onClick === 'function') {
                      item.onClick(event, that._table);
                    } else if (typeof item.onClick === 'string') {
                      new Function(item.onClick)();
                    }
                  });
                }
              }
            });
          }
        }
      });
    }
  },
  /**
   * Получение ID элемента управления
   * @returns {string}
   */
  getId: function getId() {
    return this._id;
  },
  /**
   * Формирование контента для размещения на странице
   * @returns {string}
   */
  render: function render() {
    var options = this.getOptions();
    var buttons = [];
    var that = this;
    if (Array.isArray(options.buttons)) {
      $.each(options.buttons, function (key, button) {
        if (coreuiTableUtils.isObject(button) && typeof button.type === 'string') {
          if (button.type === 'link') {
            if (button.hasOwnProperty('link') && button.hasOwnProperty('content') && typeof button.link === 'string' && typeof button.content === 'string') {
              var attributes = [];
              if (coreuiTableUtils.isObject(button.attr)) {
                button.attr = {};
              }
              if (button.attr.hasOwnProperty('href')) {
                delete button.attr.href;
              }
              if (!button.attr.hasOwnProperty('class')) {
                button.attr["class"] = that._link.attr["class"];
              }
              $.each(button.attr, function (name, value) {
                attributes.push(name + '="' + value + '"');
              });
              buttons.push({
                type: 'link',
                link: button.link,
                content: button.content,
                attr: attributes
              });
            }
          } else if (button.type === 'button') {
            if (button.hasOwnProperty('content') && button.hasOwnProperty('onClick') && typeof button.content === 'string' && ['string', 'function'].indexOf(_typeof(button.onClick)) >= 0) {
              var _attributes = [];
              if (coreuiTableUtils.isObject(button.attr)) {
                button.attr = {};
              }
              if (button.attr.hasOwnProperty('type')) {
                delete button.attr.type;
              }
              if (button.attr.hasOwnProperty('id')) {
                delete button.attr.id;
              }
              if (!button.attr.hasOwnProperty('class')) {
                button.attr["class"] = that._button.attr["class"];
              }
              $.each(button.attr, function (name, value) {
                _attributes.push(name + '="' + value + '"');
              });
              buttons.push({
                type: 'button',
                link: button.link,
                id: button.id,
                content: button.content,
                attr: _attributes
              });
            }
          } else if (button.type === 'dropdown') {
            if (Array.isArray(button.items)) {
              var _attributes2 = [];
              var items = [];
              $.each(button.items, function (key, item) {
                if (coreuiTableUtils.isObject(item) && typeof item.type === 'string') {
                  if (item.type === 'link') {
                    if (item.hasOwnProperty('link') && item.hasOwnProperty('content') && typeof item.link === 'string' && typeof item.content === 'string') {
                      items.push({
                        type: 'link',
                        link: item.link,
                        content: item.content
                      });
                    }
                  } else if (item.type === 'button') {
                    if (item.hasOwnProperty('content') && item.hasOwnProperty('onClick') && typeof item.content === 'string' && ['string', 'function'].indexOf(_typeof(item.onClick)) >= 0) {
                      items.push({
                        type: 'button',
                        id: item.id,
                        content: item.content
                      });
                    }
                  } else if (item.type === 'divider') {
                    items.push({
                      type: 'divider'
                    });
                  }
                }
              });
              if (coreuiTableUtils.isObject(button.attr)) {
                button.attr = {};
              }
              if (button.attr.hasOwnProperty('type')) {
                delete button.attr.type;
              }
              if (button.attr.hasOwnProperty('id')) {
                delete button.attr.id;
              }
              if (!button.attr.hasOwnProperty('class')) {
                button.attr["class"] = that._dropdown.attr["class"];
              }
              if (button.attr.hasOwnProperty('class') && ['string', 'number'].indexOf(_typeof(button.attr["class"])) >= 0) {
                button.attr["class"] += ' dropdown-toggle';
              }
              $.each(button.attr, function (name, value) {
                _attributes2.push(name + '="' + value + '"');
              });
              buttons.push({
                type: 'dropdown',
                content: button.content,
                attr: _attributes2,
                items: items
              });
            }
          }
        }
      });
    }
    return ejs.render(tpl['controls/button_group.html'], {
      buttons: buttons
    });
  }
};

coreuiTable$1.controls.custom = {
  _id: null,
  _table: null,
  _options: {
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
    this._id = coreuiTableUtils.hashCode();
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
    return this._id;
  },
  /**
   * Формирование контента для размещения на странице
   * @returns {string}
   */
  render: function render() {
    return this._options.content;
  }
};

coreuiTable$1.controls.page_size = {
  _id: null,
  _table: null,
  _options: {
    attr: {
      "class": 'form-select'
    },
    list: [25, 50, 100, 1000]
  },
  /**
   * Инициализация
   * @param {CoreUI.table.instance} table
   * @param {object}                options
   */
  init: function init(table, options) {
    if (options.hasOwnProperty('attr') && coreuiTableUtils.isObject(options.attr)) {
      options.attr = coreuiTableUtils.mergeAttr(this._options.attr, options.attr);
    }
    this._options = $.extend({}, this._options, options);
    this._table = table;
    this._id = coreuiTableUtils.hashCode();
    if (!Array.isArray(this._options.list)) {
      this._options.list = [];
    }
    if (this._options.list.indexOf(this._table._recordsPerPage) < 0) {
      this._options.list.unshift(this._table._recordsPerPage);
    }
  },
  /**
   * Инициализация событий связанных с элементом управления
   */
  initEvents: function initEvents() {
    var that = this;
    var control = coreuiTableElements.getControl(this._table.getId(), this.getId());
    var selectPageSize = $('select', control);
    selectPageSize.change(function () {
      that._table._page = 1;
      that._table.setPageSize(Number(selectPageSize.val()));
      that._table.reload();
    });
    this._table.on('update-page-size', function () {
      selectPageSize.val(that._table._recordsPerPage);
    });
  },
  /**
   * Получение ID элемента управления
   * @returns {string}
   */
  getId: function getId() {
    return this._id;
  },
  /**
   * Формирование контента для размещения на странице
   * @returns {string}
   */
  render: function render() {
    var attributes = [];
    if (coreuiTableUtils.isObject(this._options.attr)) {
      $.each(this._options.attr, function (name, value) {
        attributes.push(name + '="' + value + '"');
      });
    }
    return ejs.render(tpl['controls/page-size.html'], {
      recordsPerPageList: this._options.list,
      recordsPerPage: this._table._recordsPerPage,
      attr: attributes.length > 0 ? ' ' + attributes.join(' ') : '',
      lang: this._table.getLang()
    });
  }
};

coreuiTable$1.controls.page_jump = {
  _id: null,
  _table: null,
  _options: {
    attr: {
      "class": 'input-group'
    }
  },
  /**
   * Инициализация
   * @param {CoreUI.table.instance} table
   * @param {object} options
   */
  init: function init(table, options) {
    if (options.hasOwnProperty('attr') && coreuiTableUtils.isObject(options.attr)) {
      options.attr = coreuiTableUtils.mergeAttr(this._options.attr, options.attr);
    }
    this._options = $.extend({}, this._options, options);
    this._table = table;
    this._id = coreuiTableUtils.hashCode();
  },
  /**
   * Инициализация событий связанных с элементом управления
   */
  initEvents: function initEvents() {
    var that = this;
    var control = coreuiTableElements.getControl(this._table.getId(), this.getId());
    var input = $('input', control);
    var button = $('button', control);
    if (button[0]) {
      button.click(function () {
        that._table.goPage(input.val());
      });
      input.keyup(function (event) {
        if (event.key === 'Enter' || event.keyCode === 13) {
          that._table.goPage(input.val());
        }
      });
    }
  },
  /**
   * Получение ID элемента управления
   * @returns {string}
   */
  getId: function getId() {
    return this._id;
  },
  /**
   * Формирование контента для размещения на странице
   * @returns {string}
   */
  render: function render() {
    var attributes = [];
    if (coreuiTableUtils.isObject(this._options.attr)) {
      $.each(this._options.attr, function (name, value) {
        attributes.push(name + '="' + value + '"');
      });
    }
    return ejs.render(tpl['controls/page-jump.html'], {
      recordsPerPageList: this._options.list,
      recordsPerPage: this._table._recordsPerPage,
      attr: attributes.length > 0 ? ' ' + attributes.join(' ') : '',
      lang: this._table.getLang()
    });
  }
};

coreuiTable$1.controls.pages = {
  _id: null,
  _table: null,
  _options: {
    show: {
      prev: true,
      next: true
    },
    count: 3,
    attr: {
      "class": 'pagination mb-0'
    }
  },
  /**
   * Инициализация
   * @param {CoreUI.table.instance} table
   * @param {object} options
   */
  init: function init(table, options) {
    if (options.hasOwnProperty('attr') && coreuiTableUtils.isObject(options.attr)) {
      options.attr = coreuiTableUtils.mergeAttr(this._options.attr, options.attr);
    }
    this._options = $.extend({}, this._options, options);
    this._table = table;
    this._id = coreuiTableUtils.hashCode();
  },
  /**
   * Инициализация событий связанных с элементом управления
   */
  initEvents: function initEvents() {
    var that = this;
    var control = coreuiTableElements.getControl(this._table.getId(), this.getId());
    this._initEvents();
    this._table.on('show-records', function () {
      control.html(that.render());
      that._initEvents();
    });
  },
  /**
   * Получение ID элемента управления
   * @returns {string}
   */
  getId: function getId() {
    return this._id;
  },
  /**
   * Формирование контента для размещения на странице
   * @returns {string}
   */
  render: function render() {
    var attributes = [];
    var showPrev = !!this._options.show.prev;
    var showNext = !!this._options.show.next;
    var showDividerStart = false;
    var showDividerEnd = false;
    var showPageFirst = false;
    var showPageLast = false;
    var pages = [];
    var pagesTotal = this._table._recordsTotal > 0 && this._table._recordsPerPage > 0 ? Math.ceil(this._table._recordsTotal / this._table._recordsPerPage) : 1;
    if (this._table._recordsTotal > 0 && this._options.count > 0 && coreuiTableUtils.isNumeric(this._options.count)) {
      var count = Math.min(this._options.count, pagesTotal);
      var countHalf = Math.max(0, Math.floor(count / 2));
      if (count % 2 === 0) {
        countHalf -= 1;
      }
      var start = this._table._page > 1 ? Math.max(1, this._table._page - countHalf) : this._table._page;
      if (start + count > pagesTotal) {
        start = pagesTotal - (count - 1);
      }
      for (var i = 0; i < count; i++) {
        pages.push(start + i);
      }
    } else {
      if (this._options.count > 0 && this._table._page > 1) {
        pages.push(this._table._page);
      }
    }
    if (pages.length > 0) {
      if (pages[0] >= 2) {
        showPageFirst = true;
      }
      if (pages[0] >= 3) {
        showDividerStart = true;
      }
      if (pages[pages.length - 1] + 1 < pagesTotal) {
        showDividerEnd = true;
      }
      if (pages[pages.length - 1] < pagesTotal) {
        showPageLast = true;
      }
    }
    if (coreuiTableUtils.isObject(this._options.attr)) {
      $.each(this._options.attr, function (name, value) {
        attributes.push(name + '="' + value + '"');
      });
    }
    return ejs.render(tpl['controls/pages.html'], {
      currentPage: this._table._page,
      isActivePrev: this._table._page > 1,
      isActiveNext: this._table._page < pagesTotal,
      pagesTotal: pagesTotal,
      showPrev: showPrev,
      showPageFirst: showPageFirst,
      showDividerStart: showDividerStart,
      pages: pages,
      showDividerEnd: showDividerEnd,
      showPageLast: showPageLast,
      showNext: showNext,
      attr: attributes.length > 0 ? ' ' + attributes.join(' ') : '',
      lang: this._table.getLang()
    });
  },
  /**
   * Инициализация событий на элементах
   * @private
   */
  _initEvents: function _initEvents() {
    var that = this;
    var control = coreuiTableElements.getControl(this._table.getId(), this.getId());
    var btnPrev = $('.coreui-table__page_prev', control);
    if (btnPrev[0]) {
      if (that._table._page <= 1) {
        btnPrev.addClass('disabled');
      }
      btnPrev.click(function () {
        if (that._table._page > 1) {
          that._table.prevPage();
        }
      });
    }
    var btnNext = $('.coreui-table__page_next', control);
    if (btnNext[0]) {
      btnNext.click(function () {
        that._table.nextPage();
      });
    }
    var pages = $('.coreui-table__page', control);
    if (pages[0]) {
      pages.click(function () {
        var page = Number($.trim($(this).text()));
        if (page > 0) {
          that._table.goPage(page);
        }
      });
    }
  }
};

coreuiTable$1.controls.total = {
  _id: null,
  _table: null,
  _options: {
    attr: {
      "class": 'px-1'
    }
  },
  /**
   * Инициализация
   * @param {CoreUI.table.instance} table
   * @param {object}                options
   */
  init: function init(table, options) {
    if (options.hasOwnProperty('attr') && coreuiTableUtils.isObject(options.attr)) {
      options.attr = coreuiTableUtils.mergeAttr(this._options.attr, options.attr);
    }
    this._options = $.extend({}, this._options, options);
    this._table = table;
    this._id = coreuiTableUtils.hashCode();
  },
  /**
   * Инициализация событий связанных с элементом управления
   */
  initEvents: function initEvents() {
    var that = this;
    var control = coreuiTableElements.getControl(this._table.getId(), this.getId());
    this._table.on('show-records', function () {
      control.html(that.render());
    });
  },
  /**
   * Получение ID элемента управления
   * @returns {string}
   */
  getId: function getId() {
    return this._id;
  },
  /**
   * Формирование контента для размещения на странице
   * @returns {string}
   */
  render: function render() {
    var attributes = [];
    if (coreuiTableUtils.isObject(this._options.attr)) {
      $.each(this._options.attr, function (name, value) {
        attributes.push(name + '="' + value + '"');
      });
    }
    return ejs.render(tpl['controls/total.html'], {
      recordsTotal: this._table._recordsTotal,
      attr: attributes.length > 0 ? ' ' + attributes.join(' ') : '',
      lang: this._table.getLang()
    });
  }
};

coreuiTable$1.controls.search = {
  _id: null,
  _table: null,
  _options: {
    btn: {
      attr: {
        "class": 'btn btn-secondary'
      },
      content: null
    },
    btnClear: {
      content: "<i class=\"bi bi-x\"></i>",
      attr: {
        "class": 'btn btn-outline-secondary'
      }
    },
    btnComplete: {
      attr: {
        "class": 'btn btn-primary'
      },
      content: null
    }
  },
  /**
   * Инициализация
   * @param {CoreUI.table.instance} table
   * @param {object} options
   */
  init: function init(table, options) {
    this._options = $.extend(true, {}, this._options, options);
    this._table = table;
    this._id = coreuiTableUtils.hashCode();
    if (!coreuiTableUtils.isObject(this._options.btn)) {
      this._options.btn = {};
    }
    if (!this._options.btn.hasOwnProperty('content') || typeof this._options.btn.content !== 'string') {
      this._options.btn.content = table.getLang().search;
    }
    if (!coreuiTableUtils.isObject(this._options.btnClear)) {
      this._options.btnClear = {};
    }
    if (!this._options.btnClear.hasOwnProperty('content') || typeof this._options.btnClear.content !== 'string') {
      this._options.btnClear.content = table.getLang().clear;
    }
    if (!coreuiTableUtils.isObject(this._options.btnComplete)) {
      this._options.btnComplete = {};
    }
    if (!this._options.btnComplete.hasOwnProperty('content') || typeof this._options.btnComplete.content !== 'string') {
      this._options.btnComplete.content = table.getLang().search;
    }
  },
  /**
   * Инициализация событий связанных с элементом управления
   */
  initEvents: function initEvents() {
    var that = this;
    var control = coreuiTableElements.getControl(this._table.getId(), this.getId());
    var buttonToggle = $('button.btn-search-toggle', control);
    var buttonClear = $('button.btn-clear', control);
    buttonToggle.click(function () {
      var container = coreuiTableElements.getSearchContainer(that._table.getId());
      if (container[0]) {
        container.fadeToggle('fast');
      } else {
        var controls = [];
        var controlsEvents = [];
        var btnCompleteAttr = [];
        var btnCompleteContent = '';
        var wrapper = coreuiTableElements.getWrapper(that._table.getId());
        $.each(that._table._search, function (key, control) {
          var options = control.getOptions();
          if (options.hasOwnProperty('field') && typeof options.field === 'string' && options.field) {
            controls.push({
              label: options.hasOwnProperty('label') && typeof options.label === 'string' ? options.label : '',
              description: options.hasOwnProperty('description') && typeof options.description === 'string' ? options.description : '',
              prefix: options.hasOwnProperty('prefix') && typeof options.prefix === 'string' ? options.prefix : '',
              id: control.getId(),
              content: control.render()
            });
            if (control.hasOwnProperty('initEvents') && typeof control.initEvents === 'function') {
              controlsEvents.push(control.initEvents);
            }
          }
        });
        if (!coreuiTableUtils.isObject(that._options.btnComplete)) {
          that._options.btnComplete = {};
        }
        if (!coreuiTableUtils.isObject(that._options.btnComplete.attr)) {
          that._options.btnComplete.attr = {};
        }
        if (that._options.btnComplete.attr.hasOwnProperty('type')) {
          delete that._options.btnComplete.attr.type;
        }
        if (!that._options.btnComplete.attr.hasOwnProperty('class') || typeof that._options.btnComplete.attr["class"] !== 'string') {
          that._options.btnComplete.attr["class"] = 'btn-complete';
        } else {
          that._options.btnComplete.attr["class"] += ' btn-complete';
        }
        if (coreuiTableUtils.isObject(that._options.btnComplete.attr)) {
          $.each(that._options.btnComplete.attr, function (name, value) {
            btnCompleteAttr.push(name + '="' + value + '"');
          });
        }
        if (typeof that._options.btnComplete.content === 'string') {
          btnCompleteContent = that._options.btnComplete.content;
        }
        var content = ejs.render(tpl['controls/search-container.html'], {
          controls: controls,
          btnCompleteAttr: btnCompleteAttr.length > 0 ? ' ' + btnCompleteAttr.join(' ') : '',
          btnCompleteContent: btnCompleteContent
        });
        wrapper.prepend(content);
        if (controlsEvents.length > 0) {
          $.each(controlsEvents, function (key, event) {
            event();
          });
        }
        container = $('> .coreui-table__search', wrapper);
        $('.btn-complete', container).click(function () {
          that._table.searchRecords();
          container.fadeOut('fast');
        });
      }
    });
    if (buttonClear[0]) {
      buttonClear.click(function () {});
    }
  },
  /**
   * Получение ID элемента управления
   * @returns {string}
   */
  getId: function getId() {
    return this._id;
  },
  /**
   * Формирование контента для размещения на странице
   * @returns {string}
   */
  render: function render() {
    var btnAttr = [];
    var btnContent = '';
    var showClear = false; // TODO проверка наличия поиска
    var btnClearAttr = [];
    var btnClearContent = '';
    if (!coreuiTableUtils.isObject(this._options.btn)) {
      this._options.btn = {};
    }
    if (!coreuiTableUtils.isObject(this._options.btn.attr)) {
      this._options.btn.attr = {};
    }
    if (!this._options.btn.attr.hasOwnProperty('class') || typeof this._options.btn.attr["class"] !== 'string') {
      this._options.btn.attr["class"] = 'btn-search-toggle';
    } else {
      this._options.btn.attr["class"] += ' btn-search-toggle';
    }
    $.each(this._options.btn.attr, function (name, value) {
      btnAttr.push(name + '="' + value + '"');
    });
    if (typeof this._options.btn.content === 'string') {
      btnContent = this._options.btn.content;
    }
    if (showClear) {
      if (!coreuiTableUtils.isObject(this._options.btnClear)) {
        this._options.btnClear = {};
      }
      if (!coreuiTableUtils.isObject(this._options.btnClear.attr)) {
        this._options.btnClear.attr = {};
      }
      if (!this._options.btnClear.attr.hasOwnProperty('class') || typeof this._options.btnClear.attr["class"] !== 'string') {
        this._options.btnClear.attr["class"] = 'btn-clear';
      } else {
        this._options.btnClear.attr["class"] += ' btn-clear';
      }
      $.each(this._options.btnClear.attr, function (name, value) {
        btnClearAttr.push(name + '="' + value + '"');
      });
      if (typeof this._options.btnClear.content === 'string') {
        btnClearContent = this._options.btnClear.content;
      }
    }
    return ejs.render(tpl['controls/search.html'], {
      btnContent: btnContent,
      btnAttr: btnAttr.length > 0 ? ' ' + btnAttr.join(' ') : '',
      showClear: showClear,
      clearContent: btnClearContent,
      clearAttr: btnClearAttr.length > 0 ? ' ' + btnClearAttr.join(' ') : ''
    });
  }
};

coreuiTable$1.controls.columns = {
  _id: null,
  _table: null,
  _options: {
    btn: {
      content: '<i class="bi bi-layout-three-columns"></i>',
      attr: {
        "class": 'btn btn-outline-secondary'
      }
    },
    btnComplete: {
      content: null,
      attr: {
        "class": 'btn btn-primary'
      }
    }
  },
  /**
   * Инициализация
   * @param {CoreUI.table.instance} table
   * @param {object} options
   */
  init: function init(table, options) {
    this._options = $.extend({}, this._options, options);
    this._table = table;
    this._id = coreuiTableUtils.hashCode();
    if (!coreuiTableUtils.isObject(this._options.btn)) {
      this._options.btn = {};
    }
    if (!coreuiTableUtils.isObject(this._options.btnComplete)) {
      this._options.btnComplete = {};
    }
    if (coreuiTableUtils.isObject(this._options.btnComplete) && typeof this._options.btnComplete.content !== 'string') {
      this._options.btnComplete.content = table.getLang().complete;
    }
  },
  /**
   * Получение параметров
   * @returns {object}
   */
  getOptions: function getOptions() {
    return $.extend(true, {}, this._options);
  },
  /**
   * Инициализация событий связанных с элементом управления
   */
  initEvents: function initEvents() {
    var that = this;
    var options = this.getOptions();
    var control = coreuiTableElements.getControl(this._table.getId(), this._id);
    var button = $('button', control);
    button.click(function () {
      var container = coreuiTableElements.getColumnsContainer(that._table.getId());
      if (container[0]) {
        container.fadeToggle('fast');
      } else {
        var columns = [];
        var showAll = true;
        var btnCompleteAttr = [];
        var btnCompleteContent = '';
        var wrapper = coreuiTableElements.getWrapper(that._table.getId());
        $.each(that._table._columns, function (key, column) {
          var options = column.getOptions();
          if (options.hasOwnProperty('field') && typeof options.field === 'string' && options.field) {
            var isShow = column.isShow();
            columns.push({
              field: options.field,
              label: options.hasOwnProperty('label') && typeof options.label === 'string' ? options.label : '',
              show: isShow
            });
            if (!isShow) {
              showAll = false;
            }
          }
        });
        if (!coreuiTableUtils.isObject(options.btnComplete)) {
          options.btnComplete = {};
        }
        if (!coreuiTableUtils.isObject(options.btnComplete.attr)) {
          options.btnComplete.attr = {};
        }
        if (options.btnComplete.attr.hasOwnProperty('type')) {
          delete options.btnComplete.attr.type;
        }
        if (!options.btnComplete.attr.hasOwnProperty('class') || typeof options.btnComplete.attr["class"] !== 'string') {
          options.btnComplete.attr["class"] = 'btn-complete';
        } else {
          options.btnComplete.attr["class"] += ' btn-complete';
        }
        if (coreuiTableUtils.isObject(options.btnComplete.attr)) {
          $.each(options.btnComplete.attr, function (name, value) {
            btnCompleteAttr.push(name + '="' + value + '"');
          });
        }
        if (typeof options.btnComplete.content === 'string') {
          btnCompleteContent = options.btnComplete.content;
        }
        var content = ejs.render(tpl['controls/columns-container.html'], {
          showAll: showAll,
          columns: columns,
          btnCompleteAttr: btnCompleteAttr.length > 0 ? ' ' + btnCompleteAttr.join(' ') : '',
          btnCompleteContent: btnCompleteContent,
          lang: that._table.getLang()
        });
        wrapper.prepend(content);
        container = $('> .coreui-table__columns', wrapper);
        $('.coreui-table__check_all input', container).change(function () {
          $('.coreui-table_check-column input', container).prop('checked', $(this).is(":checked"));
        });
        $('.btn-complete', container).click(function () {
          var columns = [];
          $('.coreui-table_check-column input:checked', container).each(function (key, input) {
            columns.push($(input).val());
          });
          that._table.setColumnsShow(columns);
          that._table.refresh();
          container.fadeOut('fast');
        });
      }
    });
  },
  /**
   * Получение ID элемента управления
   * @returns {string}
   */
  getId: function getId() {
    return this._id;
  },
  /**
   * Формирование контента для размещения на странице
   * @returns {string}
   */
  render: function render() {
    var attributes = [];
    if (coreuiTableUtils.isObject(this._options.btn.attr)) {
      $.each(this._options.btn.attr, function (name, value) {
        attributes.push(name + '="' + value + '"');
      });
    }
    return ejs.render(tpl['controls/columns.html'], {
      btnContent: this._options.btn.content,
      btnAttr: attributes.length > 0 ? ' ' + attributes.join(' ') : ''
    });
  }
};

coreuiTable$1.filters.clear = {
  _id: null,
  _table: null,
  _options: {
    type: 'clear',
    content: null,
    attr: {
      "class": 'btn btn-secondary'
    }
  },
  /**
   * Инициализация
   * @param {CoreUI.table.instance} table
   * @param {object}                options
   */
  init: function init(table, options) {
    this._options = $.extend(true, {}, this._options, options);
    this._table = table;
    this._id = coreuiTableUtils.hashCode();
    if (!this._options.hasOwnProperty('content') || typeof this._options.content !== 'string') {
      this._options.content = table.getLang().clear;
    }
  },
  /**
   * Получение параметров
   * @returns {object}
   */
  getOptions: function getOptions() {
    return $.extend(true, {}, this._options);
  },
  /**
   * Получение id
   * @returns {string}
   */
  getId: function getId() {
    return this._id;
  },
  /**
   * Установка значения
   * @param {string} value
   */
  setValue: function setValue(value) {},
  /**
   * Получение значения
   * @returns {string}
   */
  getValue: function getValue() {},
  /**
   * Инициализация событий
   * @returns {object}
   */
  initEvents: function initEvents() {},
  /**
   * Формирование контента
   * @returns {string}
   */
  render: function render() {
    var options = this.getOptions();
    if (!coreuiTableUtils.isObject(options.attr)) {
      options.attr = {};
    }
    if (options.attr.hasOwnProperty('type')) {
      delete options.attr.type;
    }
    var attr = [];
    $.each(options.attr, function (name, value) {
      attr.push(name + '="' + value + '"');
    });
    return ejs.render(tpl['filters/clear.html'], {
      attr: attr.length > 0 ? ' ' + attr.join(' ') : '',
      content: options.content ? options.content : ''
    });
  }
};

coreuiTable$1.filters.text = {
  _id: null,
  _table: null,
  _value: null,
  _options: {
    type: 'text',
    field: null,
    label: null,
    width: 200,
    attr: {
      "class": "form-control"
    },
    btn: {
      attr: {
        "class": "btn btn-outline-secondary border-secondary-subtle"
      },
      content: '<i class="bi bi-search"></i>'
    }
  },
  /**
   * Инициализация
   * @param {CoreUI.table.instance} table
   * @param {object}                options
   */
  init: function init(table, options) {
    this._options = $.extend(true, {}, this._options, options);
    this._table = table;
    this._id = coreuiTableUtils.hashCode();
  },
  /**
   * Получение параметров
   * @returns {object}
   */
  getOptions: function getOptions() {
    return $.extend(true, {}, this._options);
  },
  /**
   * Получение id
   * @returns {string}
   */
  getId: function getId() {
    return this._id;
  },
  /**
   * Установка значения
   * @param {string} value
   */
  setValue: function setValue(value) {
    if (typeof value !== 'string' && typeof value !== 'number') {
      return '';
    }
    this._value = value;
  },
  /**
   * Получение значения
   * @returns {string|null}
   */
  getValue: function getValue() {
    var control = coreuiTableElements.getControl(this._table.getId(), this._id);
    var input = $('input', control);
    if (input[0]) {
      var value = input.val();
      if (typeof value === 'string' && value !== '') {
        return value;
      }
    }
    return null;
  },
  /**
   * Инициализация событий
   * @returns {object}
   */
  initEvents: function initEvents() {

    // TODO кнопка поиска + enter
  },
  /**
   * Формирование контента
   * @returns {string}
   */
  render: function render() {
    var options = this.getOptions();
    var label = typeof options.label === 'string' || typeof options.label === 'number' ? options.label : '';
    if (!coreuiTableUtils.isObject(options.attr)) {
      options.attr = {};
    }
    if (options.hasOwnProperty('width') && coreuiTableUtils.isNumeric(options.width)) {
      if (options.attr.hasOwnProperty('style')) {
        options.attr['style'] += ';width:' + options.width + 'px';
      } else {
        options.attr['style'] = 'width:' + options.width + 'px';
      }
    }
    options.attr['name'] = typeof options.field === 'string' ? options.field : '';
    options.attr['value'] = typeof this._value === 'string' || typeof this._value === 'number' ? this._value : '';
    if (options.attr.hasOwnProperty('type')) {
      delete options.attr.type;
    }
    if (!coreuiTableUtils.isObject(options.btn)) {
      options.btn = {};
    }
    if (!coreuiTableUtils.isObject(options.btn.attr)) {
      options.btn.attr = {};
    }
    if (options.btn.attr.hasOwnProperty('type')) {
      delete options.btn.attr.type;
    }
    var attr = [];
    var attrBtn = [];
    $.each(options.attr, function (name, value) {
      attr.push(name + '="' + value + '"');
    });
    $.each(options.btn.attr, function (name, value) {
      attrBtn.push(name + '="' + value + '"');
    });
    return ejs.render(tpl['filters/text.html'], {
      attr: attr.length > 0 ? ' ' + attr.join(' ') : '',
      label: label,
      btnAttr: attrBtn.length > 0 ? ' ' + attrBtn.join(' ') : '',
      btnContent: options.btn.content ? options.btn.content : ''
    });
  }
};

coreuiTable$1.filters.number = {
  _id: null,
  _table: null,
  _value: null,
  _options: {
    type: 'number',
    field: null,
    label: null,
    width: 90,
    attr: {
      "class": "form-control"
    },
    btn: {
      attr: {
        "class": "btn btn-outline-secondary border-secondary-subtle"
      },
      content: '<i class="bi bi-search"></i>'
    }
  },
  /**
   * Инициализация
   * @param {CoreUI.table.instance} table
   * @param {object}                options
   */
  init: function init(table, options) {
    this._options = $.extend(true, {}, this._options, options);
    this._table = table;
    this._id = coreuiTableUtils.hashCode();
  },
  /**
   * Получение параметров
   * @returns {object}
   */
  getOptions: function getOptions() {
    return $.extend(true, {}, this._options);
  },
  /**
   * Получение id
   * @returns {string}
   */
  getId: function getId() {
    return this._id;
  },
  /**
   * Установка значения
   * @param {string} value
   */
  setValue: function setValue(value) {
    if (value) {
      if (!coreuiTableUtils.isObject(value)) {
        return;
      }
      var numberStart = null;
      var numberEnd = null;
      if (value.hasOwnProperty('start') && (typeof value.start === 'string' || typeof value.start !== 'number')) {
        numberStart = value.start;
      }
      if (value.hasOwnProperty('end') && (typeof value.end === 'string' || typeof value.end !== 'number')) {
        numberEnd = value.end;
      }
      if (numberStart === null && numberEnd === null) {
        this._value = null;
      } else {
        this._value = {
          start: numberStart,
          end: numberEnd
        };
      }
    } else {
      this._value = null;
    }
  },
  /**
   * Получение значения
   * @returns {string}
   */
  getValue: function getValue() {
    var control = coreuiTableElements.getControl(this._table.getId(), this._id);
    var inputStart = $('input.number-start', control);
    var inputEnd = $('input.number-end', control);
    if (inputStart[0] && inputEnd[0]) {
      return {
        start: inputStart.val(),
        end: inputEnd.val()
      };
    } else {
      return this._value;
    }
  },
  /**
   * Инициализация событий
   * @returns {object}
   */
  initEvents: function initEvents() {

    // TODO кнопка поиска + enter
  },
  /**
   * Формирование контента
   * @returns {string}
   */
  render: function render() {
    var options = this.getOptions();
    var label = typeof options.label === 'string' || typeof options.label === 'number' ? options.label : '';
    if (!coreuiTableUtils.isObject(options.attr)) {
      options.attr = {};
    }
    if (options.hasOwnProperty('width') && coreuiTableUtils.isNumeric(options.width)) {
      if (options.attr.hasOwnProperty('style')) {
        options.attr['style'] += ';width:' + options.width + 'px';
      } else {
        options.attr['style'] = 'width:' + options.width + 'px';
      }
    }
    if (options.attr.hasOwnProperty('type')) {
      delete options.attr.type;
    }
    if (options.attr.hasOwnProperty('value')) {
      delete options.attr.value;
    }
    var field = typeof options.field === 'string' ? options.field : '';
    var startAttr = [];
    var endAttr = [];
    var attrBtn = [];
    $.each(options.attr, function (name, value) {
      if (['name', 'value', 'class'].indexOf(name) >= 0 || ['string', 'number'].indexOf(_typeof(value)) < 0) {
        return;
      }
      startAttr.push(name + '="' + value + '"');
      endAttr.push(name + '="' + value + '"');
    });
    if (options.attr.hasOwnProperty('class') && ['string', 'number'].indexOf(_typeof(options.attr["class"])) >= 0) {
      startAttr.push('class="' + options.attr["class"] + ' date-start"');
      endAttr.push('class="' + options.attr["class"] + ' date-end"');
    } else {
      startAttr.push('class="date-start"');
      endAttr.push('class="date-end"');
    }
    if (field) {
      startAttr.push('name="' + field + '[start]"');
      endAttr.push('name="' + field + '[end]"');
    }
    startAttr.push('value="' + (this._value ? this._value.start : '') + '"');
    endAttr.push('value="' + (this._value ? this._value.end : '') + '"');
    if (!coreuiTableUtils.isObject(options.btn)) {
      options.btn = {};
    }
    if (!coreuiTableUtils.isObject(options.btn.attr)) {
      options.btn.attr = {};
    }
    if (options.btn.attr.hasOwnProperty('type')) {
      delete options.btn.attr.type;
    }
    $.each(options.btn.attr, function (name, value) {
      attrBtn.push(name + '="' + value + '"');
    });
    return ejs.render(tpl['filters/number.html'], {
      attrStart: startAttr.length > 0 ? ' ' + startAttr.join(' ') : '',
      attrEnd: endAttr.length > 0 ? ' ' + endAttr.join(' ') : '',
      label: label,
      btnAttr: attrBtn.length > 0 ? ' ' + attrBtn.join(' ') : '',
      btnContent: options.btn.content ? options.btn.content : ''
    });
  }
};

coreuiTable$1.filters.date = {
  _id: null,
  _table: null,
  _value: null,
  _options: {
    type: 'date',
    field: null,
    label: null,
    width: 200,
    attr: {
      "class": "form-control"
    }
  },
  /**
   * Инициализация
   * @param {CoreUI.table.instance} table
   * @param {object}                options
   */
  init: function init(table, options) {
    this._options = $.extend(true, {}, this._options, options);
    this._table = table;
    this._id = coreuiTableUtils.hashCode();
  },
  /**
   * Получение параметров
   * @returns {object}
   */
  getOptions: function getOptions() {
    return $.extend(true, {}, this._options);
  },
  /**
   * Получение id
   * @returns {string}
   */
  getId: function getId() {
    return this._id;
  },
  /**
   * Установка значения
   * @param {string} value
   */
  setValue: function setValue(value) {
    if (value && (typeof value !== 'string' || value.match(/^\d{4}\-\d{2}\-\d{2}$/) === null || isNaN(new Date(value)))) {
      return;
    }
    this._value = value;
  },
  /**
   * Получение значения
   * @returns {string}
   */
  getValue: function getValue() {
    var control = coreuiTableElements.getControl(this._table.getId(), this._id);
    var input = $('input', control);
    if (input[0]) {
      var value = input.val();
      if (typeof value === 'string' && value !== '') {
        return value;
      }
    }
    return null;
  },
  /**
   * Инициализация событий
   * @returns {object}
   */
  initEvents: function initEvents() {

    // TODO кнопка поиска + enter
  },
  /**
   * Формирование контента
   * @returns {string}
   */
  render: function render() {
    var options = this.getOptions();
    var label = typeof options.label === 'string' || typeof options.label === 'number' ? options.label : '';
    if (!coreuiTableUtils.isObject(options.attr)) {
      options.attr = {};
    }
    if (options.hasOwnProperty('width') && coreuiTableUtils.isNumeric(options.width)) {
      if (options.attr.hasOwnProperty('style')) {
        options.attr['style'] += ';width:' + options.width + 'px';
      } else {
        options.attr['style'] = 'width:' + options.width + 'px';
      }
    }
    options.attr['name'] = typeof options.field === 'string' ? options.field : '';
    options.attr['value'] = typeof this._value === 'string' || typeof this._value === 'number' ? this._value : '';
    if (options.attr.hasOwnProperty('type')) {
      delete options.attr.type;
    }
    var attr = [];
    $.each(options.attr, function (name, value) {
      attr.push(name + '="' + value + '"');
    });
    return ejs.render(tpl['filters/date.html'], {
      attr: attr.length > 0 ? ' ' + attr.join(' ') : '',
      label: label
    });
  }
};

coreuiTable$1.filters.datetime = {
  _id: null,
  _table: null,
  _value: null,
  _options: {
    type: 'datetime',
    field: null,
    label: null,
    width: 200,
    attr: {
      "class": "form-control"
    }
  },
  /**
   * Инициализация
   * @param {CoreUI.table.instance} table
   * @param {object}                options
   */
  init: function init(table, options) {
    this._options = $.extend(true, {}, this._options, options);
    this._table = table;
    this._id = coreuiTableUtils.hashCode();
  },
  /**
   * Получение параметров
   * @returns {object}
   */
  getOptions: function getOptions() {
    return $.extend(true, {}, this._options);
  },
  /**
   * Получение id
   * @returns {string}
   */
  getId: function getId() {
    return this._id;
  },
  /**
   * Установка значения
   * @param {string} value
   */
  setValue: function setValue(value) {
    if (value && (typeof value !== 'string' || value.match(/^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}$/) === null || isNaN(new Date(value)))) {
      return;
    }
    this._value = value;
  },
  /**
   * Получение значения
   * @returns {string|null}
   */
  getValue: function getValue() {
    var control = coreuiTableElements.getControl(this._table.getId(), this._id);
    var input = $('input', control);
    if (input[0]) {
      var value = input.val();
      if (typeof value === 'string' && value !== '') {
        return value;
      }
    }
    return null;
  },
  /**
   * Инициализация событий
   * @returns {object}
   */
  initEvents: function initEvents() {

    // TODO кнопка поиска + enter
  },
  /**
   * Формирование контента
   * @returns {string}
   */
  render: function render() {
    var options = this.getOptions();
    var label = typeof options.label === 'string' || typeof options.label === 'number' ? options.label : '';
    if (!coreuiTableUtils.isObject(options.attr)) {
      options.attr = {};
    }
    if (options.hasOwnProperty('width') && coreuiTableUtils.isNumeric(options.width)) {
      if (options.attr.hasOwnProperty('style')) {
        options.attr['style'] += ';width:' + options.width + 'px';
      } else {
        options.attr['style'] = 'width:' + options.width + 'px';
      }
    }
    options.attr['name'] = typeof options.field === 'string' ? options.field : '';
    options.attr['value'] = typeof this._value === 'string' || typeof this._value === 'number' ? this._value : '';
    if (options.attr.hasOwnProperty('type')) {
      delete options.attr.type;
    }
    var attr = [];
    $.each(options.attr, function (name, value) {
      attr.push(name + '="' + value + '"');
    });
    return ejs.render(tpl['filters/datetime.html'], {
      attr: attr.length > 0 ? ' ' + attr.join(' ') : '',
      label: label
    });
  }
};

coreuiTable$1.filters.date_month = {
  _id: null,
  _table: null,
  _value: null,
  _options: {
    type: 'date_month',
    field: null,
    label: null,
    width: 200,
    attr: {
      "class": "form-control"
    }
  },
  /**
   * Инициализация
   * @param {CoreUI.table.instance} table
   * @param {object}                options
   */
  init: function init(table, options) {
    this._options = $.extend(true, {}, this._options, options);
    this._table = table;
    this._id = coreuiTableUtils.hashCode();
  },
  /**
   * Получение параметров
   * @returns {object}
   */
  getOptions: function getOptions() {
    return $.extend(true, {}, this._options);
  },
  /**
   * Получение id
   * @returns {string}
   */
  getId: function getId() {
    return this._id;
  },
  /**
   * Установка значения
   * @param {string} value
   */
  setValue: function setValue(value) {
    if (value && (typeof value !== 'string' || value.match(/^\d{4}\-\d{2}$/) === null || isNaN(new Date(value)))) {
      return;
    }
    this._value = value;
  },
  /**
   * Получение значения
   * @returns {string}
   */
  getValue: function getValue() {
    var control = coreuiTableElements.getControl(this._table.getId(), this._id);
    var input = $('input', control);
    if (input[0]) {
      var value = input.val();
      if (typeof value === 'string' && value !== '') {
        return value;
      }
    }
    return null;
  },
  /**
   * Инициализация событий
   * @returns {object}
   */
  initEvents: function initEvents() {

    // TODO кнопка поиска + enter
  },
  /**
   * Формирование контента
   * @returns {string}
   */
  render: function render() {
    var options = this.getOptions();
    var label = typeof options.label === 'string' || typeof options.label === 'number' ? options.label : '';
    if (!coreuiTableUtils.isObject(options.attr)) {
      options.attr = {};
    }
    if (options.hasOwnProperty('width') && coreuiTableUtils.isNumeric(options.width)) {
      if (options.attr.hasOwnProperty('style')) {
        options.attr['style'] += ';width:' + options.width + 'px';
      } else {
        options.attr['style'] = 'width:' + options.width + 'px';
      }
    }
    options.attr['name'] = typeof options.field === 'string' ? options.field : '';
    options.attr['value'] = typeof this._value === 'string' || typeof this._value === 'number' ? this._value : '';
    if (options.attr.hasOwnProperty('type')) {
      delete options.attr.type;
    }
    var attr = [];
    $.each(options.attr, function (name, value) {
      attr.push(name + '="' + value + '"');
    });
    return ejs.render(tpl['filters/date_month.html'], {
      attr: attr.length > 0 ? ' ' + attr.join(' ') : '',
      label: label
    });
  }
};

coreuiTable$1.filters.date_range = {
  _id: null,
  _table: null,
  _value: null,
  _options: {
    type: 'date_range',
    field: null,
    label: null,
    width: 200,
    attr: {
      "class": "form-control d-inline-block"
    }
  },
  /**
   * Инициализация
   * @param {CoreUI.table.instance} table
   * @param {object}                options
   */
  init: function init(table, options) {
    this._options = $.extend(true, {}, this._options, options);
    this._table = table;
    this._id = coreuiTableUtils.hashCode();
  },
  /**
   * Получение параметров
   * @returns {object}
   */
  getOptions: function getOptions() {
    return $.extend(true, {}, this._options);
  },
  /**
   * Получение id
   * @returns {string}
   */
  getId: function getId() {
    return this._id;
  },
  /**
   * Установка значения
   * @param {Object} value
   */
  setValue: function setValue(value) {
    if (value) {
      if (!coreuiTableUtils.isObject(value)) {
        return;
      }
      var dateStart = null;
      var dateEnd = null;
      if (value.hasOwnProperty('start') && typeof value.start === 'string' && value.start.match(/^\d{4}\-\d{2}\-\d{2}$/) === null && isNaN(new Date(value.start))) {
        dateStart = value.start;
      }
      if (value.hasOwnProperty('end') && typeof value.end === 'string' && value.end.match(/^\d{4}\-\d{2}\-\d{2}$/) === null && isNaN(new Date(value.end))) {
        dateEnd = value.end;
      }
      if (dateStart === null && dateEnd === null) {
        this._value = null;
      } else {
        this._value = {
          start: dateStart,
          end: dateEnd
        };
      }
    } else {
      this._value = null;
    }
  },
  /**
   * Получение значения
   * @returns {Object|null}
   */
  getValue: function getValue() {
    var control = coreuiTableElements.getControl(this._table.getId(), this._id);
    var inputStart = $('input.date-start', control);
    var inputEnd = $('input.date-end', control);
    if (inputStart[0] && inputEnd[0]) {
      return {
        start: inputStart.val(),
        end: inputEnd.val()
      };
    } else {
      return this._value;
    }
  },
  /**
   * Инициализация событий
   * @returns {object}
   */
  initEvents: function initEvents() {},
  /**
   * Формирование контента
   * @returns {string}
   */
  render: function render() {
    var options = this.getOptions();
    var label = typeof options.label === 'string' || typeof options.label === 'number' ? options.label : '';
    if (!coreuiTableUtils.isObject(options.attr)) {
      options.attr = {};
    }
    if (options.hasOwnProperty('width') && coreuiTableUtils.isNumeric(options.width)) {
      if (options.attr.hasOwnProperty('style')) {
        options.attr['style'] += ';width:' + options.width + 'px';
      } else {
        options.attr['style'] = 'width:' + options.width + 'px';
      }
    }
    if (options.attr.hasOwnProperty('type')) {
      delete options.attr.type;
    }
    if (options.attr.hasOwnProperty('value')) {
      delete options.attr.value;
    }
    var field = typeof options.field === 'string' ? options.field : '';
    var startAttr = [];
    var startEnd = [];
    $.each(options.attr, function (name, value) {
      if (['name', 'value', 'class'].indexOf(name) >= 0 || ['string', 'number'].indexOf(_typeof(value)) < 0) {
        return;
      }
      startAttr.push(name + '="' + value + '"');
      startEnd.push(name + '="' + value + '"');
    });
    if (options.attr.hasOwnProperty('class') && ['string', 'number'].indexOf(_typeof(options.attr["class"])) >= 0) {
      startAttr.push('class="' + options.attr["class"] + ' date-start"');
      startEnd.push('class="' + options.attr["class"] + ' date-end"');
    } else {
      startAttr.push('class="date-start"');
      startEnd.push('class="date-end"');
    }
    if (field) {
      startAttr.push('name="' + field + '[start]"');
      startEnd.push('name="' + field + '[end]"');
    }
    startAttr.push('value="' + (this._value ? this._value.start : '') + '"');
    startEnd.push('value="' + (this._value ? this._value.end : '') + '"');
    return ejs.render(tpl['filters/date_range.html'], {
      label: label,
      startAttr: startAttr.length > 0 ? ' ' + startAttr.join(' ') : '',
      endAttr: startEnd.length > 0 ? ' ' + startEnd.join(' ') : ''
    });
  }
};

coreuiTable$1.filters.datetime_range = {
  _id: null,
  _table: null,
  _value: null,
  _options: {
    type: 'datetime_range',
    field: null,
    label: null,
    width: 200,
    attr: {
      "class": "form-control d-inline-block"
    }
  },
  /**
   * Инициализация
   * @param {CoreUI.table.instance} table
   * @param {object}                options
   */
  init: function init(table, options) {
    this._options = $.extend(true, {}, this._options, options);
    this._table = table;
    this._id = coreuiTableUtils.hashCode();
  },
  /**
   * Получение параметров
   * @returns {object}
   */
  getOptions: function getOptions() {
    return $.extend(true, {}, this._options);
  },
  /**
   * Получение id
   * @returns {string}
   */
  getId: function getId() {
    return this._id;
  },
  /**
   * Установка значения
   * @param {Object} value
   */
  setValue: function setValue(value) {
    if (value) {
      if (!coreuiTableUtils.isObject(value)) {
        return;
      }
      var dateStart = null;
      var dateEnd = null;
      if (value.hasOwnProperty('start') && typeof value.start === 'string' && value.start.match(/^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}$/) === null && isNaN(new Date(value.start))) {
        dateStart = value.start;
      }
      if (value.hasOwnProperty('end') && typeof value.end === 'string' && value.end.match(/^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}$/) === null && isNaN(new Date(value.end))) {
        dateEnd = value.end;
      }
      if (dateStart === null && dateEnd === null) {
        this._value = null;
      } else {
        this._value = {
          start: dateStart,
          end: dateEnd
        };
      }
    } else {
      this._value = null;
    }
  },
  /**
   * Получение значения
   * @returns {Object|null}
   */
  getValue: function getValue() {
    var control = coreuiTableElements.getControl(this._table.getId(), this._id);
    var inputStart = $('input.date-start', control);
    var inputEnd = $('input.date-end', control);
    if (inputStart[0] && inputEnd[0]) {
      return {
        start: inputStart.val(),
        end: inputEnd.val()
      };
    } else {
      return this._value;
    }
  },
  /**
   * Инициализация событий
   * @returns {object}
   */
  initEvents: function initEvents() {},
  /**
   * Формирование контента
   * @returns {string}
   */
  render: function render() {
    var options = this.getOptions();
    var label = typeof options.label === 'string' || typeof options.label === 'number' ? options.label : '';
    if (!coreuiTableUtils.isObject(options.attr)) {
      options.attr = {};
    }
    if (options.hasOwnProperty('width') && coreuiTableUtils.isNumeric(options.width)) {
      if (options.attr.hasOwnProperty('style')) {
        options.attr['style'] += ';width:' + options.width + 'px';
      } else {
        options.attr['style'] = 'width:' + options.width + 'px';
      }
    }
    if (options.attr.hasOwnProperty('type')) {
      delete options.attr.type;
    }
    if (options.attr.hasOwnProperty('value')) {
      delete options.attr.value;
    }
    var field = typeof options.field === 'string' ? options.field : '';
    var startAttr = [];
    var startEnd = [];
    $.each(options.attr, function (name, value) {
      if (['name', 'value', 'class'].indexOf(name) >= 0 || ['string', 'number'].indexOf(_typeof(value)) < 0) {
        return;
      }
      startAttr.push(name + '="' + value + '"');
      startEnd.push(name + '="' + value + '"');
    });
    if (options.attr.hasOwnProperty('class') && ['string', 'number'].indexOf(_typeof(options.attr["class"])) >= 0) {
      startAttr.push('class="' + options.attr["class"] + ' date-start"');
      startEnd.push('class="' + options.attr["class"] + ' date-end"');
    } else {
      startAttr.push('class="date-start"');
      startEnd.push('class="date-end"');
    }
    if (field) {
      startAttr.push('name="' + field + '[start]"');
      startEnd.push('name="' + field + '[end]"');
    }
    startAttr.push('value="' + (this._value ? this._value.start : '') + '"');
    startEnd.push('value="' + (this._value ? this._value.end : '') + '"');
    return ejs.render(tpl['filters/datetime_range.html'], {
      label: label,
      startAttr: startAttr.length > 0 ? ' ' + startAttr.join(' ') : '',
      endAttr: startEnd.length > 0 ? ' ' + startEnd.join(' ') : ''
    });
  }
};

coreuiTable$1.filters.checkbox = {
  _id: null,
  _table: null,
  _value: null,
  _class: 'btn btn-outline-secondary',
  _options: {
    type: 'checkbox',
    field: null,
    label: null,
    options: []
  },
  /**
   * Инициализация
   * @param {CoreUI.table.instance} table
   * @param {object}                options
   */
  init: function init(table, options) {
    this._options = $.extend(true, {}, this._options, options);
    this._table = table;
    this._id = coreuiTableUtils.hashCode();
  },
  /**
   * Получение параметров
   * @returns {object}
   */
  getOptions: function getOptions() {
    return $.extend(true, {}, this._options);
  },
  /**
   * Получение id
   * @returns {string}
   */
  getId: function getId() {
    return this._id;
  },
  /**
   * Установка значения
   * @param {string} value
   */
  setValue: function setValue(value) {
    if (!Array.isArray(value)) {
      return;
    }
    var items = [];
    $.each(value, function (key, item) {
      if (typeof value !== 'string' && typeof value !== 'number') {
        return;
      }
      items.push(item);
    });
    this._value = items;
  },
  /**
   * Получение значения
   * @returns {string|null}
   */
  getValue: function getValue() {
    var control = coreuiTableElements.getControl(this._table.getId(), this._id);
    var inputs = $('input:checked', control);
    if (inputs[0]) {
      var items = [];
      $.each(inputs, function (key, input) {
        items.push(input.val());
      });
      return items;
    } else {
      return null;
    }
  },
  /**
   * Инициализация событий
   * @returns {object}
   */
  initEvents: function initEvents() {},
  /**
   * Формирование контента
   * @returns {string}
   */
  render: function render() {
    var that = this;
    var options = this.getOptions();
    var field = typeof options.field === 'string' ? options.field : '';
    var items = [];
    var label = typeof options.label === 'string' || typeof options.label === 'number' ? options.label : '';
    $.each(options.options, function (key, option) {
      if (!coreuiTableUtils.isObject(option) || !option.hasOwnProperty('value') || ['string', 'numeric'].indexOf(_typeof(option.value)) === -1) {
        return;
      }
      var checked = Array.isArray(that._value) ? that._value.indexOf(option.value) >= 0 : false;
      var text = option.hasOwnProperty('text') ? option.text : option.value;
      items.push({
        text: text,
        value: option.value,
        "class": option.hasOwnProperty('class') && typeof option["class"] === 'string' ? option["class"] : that._class,
        checked: checked
      });
    });
    return ejs.render(tpl['filters/checkbox.html'], {
      label: label,
      items: items,
      field: field + this.getId(),
      lang: this._table.getLang()
    });
  }
};

coreuiTable$1.filters.radio = {
  _id: null,
  _table: null,
  _value: null,
  _class: 'btn btn-outline-secondary',
  _options: {
    type: 'radio',
    field: null,
    label: null,
    options: []
  },
  /**
   * Инициализация
   * @param {CoreUI.table.instance} table
   * @param {object}                options
   */
  init: function init(table, options) {
    this._options = $.extend(true, {}, this._options, options);
    this._table = table;
    this._id = coreuiTableUtils.hashCode();
  },
  /**
   * Получение параметров
   * @returns {object}
   */
  getOptions: function getOptions() {
    return $.extend(true, {}, this._options);
  },
  /**
   * Получение id
   * @returns {string}
   */
  getId: function getId() {
    return this._id;
  },
  /**
   * Установка значения
   * @param {string} value
   */
  setValue: function setValue(value) {
    if (typeof value !== 'string' && typeof value !== 'number') {
      return '';
    }
    this._value = value;
  },
  /**
   * Получение значения
   * @returns {string|null}
   */
  getValue: function getValue() {
    var control = coreuiTableElements.getControl(this._table.getId(), this._id);
    var input = $('input:checked', control);
    if (input[0]) {
      var value = input.val();
      return value === '' ? null : value;
    } else {
      return this._value;
    }
  },
  /**
   * Инициализация событий
   * @returns {object}
   */
  initEvents: function initEvents() {},
  /**
   * Формирование контента
   * @returns {string}
   */
  render: function render() {
    var that = this;
    var options = this.getOptions();
    var field = typeof options.field === 'string' ? options.field : '';
    var items = [];
    var label = typeof options.label === 'string' || typeof options.label === 'number' ? options.label : '';
    $.each(options.options, function (key, option) {
      if (!coreuiTableUtils.isObject(option) || !option.hasOwnProperty('value') || ['string', 'numeric'].indexOf(_typeof(option.value)) === -1) {
        return;
      }
      var text = option.hasOwnProperty('text') ? option.text : option.value;
      items.push({
        text: text,
        value: option.value,
        "class": option.hasOwnProperty('class') && typeof option["class"] === 'string' ? option["class"] : that._class,
        checked: option.value == that._value
      });
    });
    return ejs.render(tpl['filters/radio.html'], {
      label: label,
      items: items,
      field: field + this.getId(),
      lang: this._table.getLang()
    });
  }
};

coreuiTable$1.filters.select = {
  _id: null,
  _table: null,
  _value: null,
  _options: {
    type: 'select',
    field: null,
    label: null,
    width: null,
    attr: {
      "class": 'form-select d-inline-block'
    },
    options: []
  },
  /**
   * Инициализация
   * @param {CoreUI.table.instance} table
   * @param {object}                options
   */
  init: function init(table, options) {
    this._options = $.extend(true, {}, this._options, options);
    this._table = table;
    this._id = coreuiTableUtils.hashCode();
  },
  /**
   * Получение параметров
   * @returns {object}
   */
  getOptions: function getOptions() {
    return $.extend(true, {}, this._options);
  },
  /**
   * Получение id
   * @returns {string}
   */
  getId: function getId() {
    return this._id;
  },
  /**
   * Установка значения
   * @param {Array} value
   */
  setValue: function setValue(value) {
    if (['string', 'number', 'object'].indexOf(_typeof(value)) < 0) {
      return;
    }
    if (_typeof(value) === 'object') {
      if (Array.isArray(value)) {
        var items = [];
        $.each(value, function (key, item) {
          if (typeof value !== 'string' && typeof value !== 'number') {
            return;
          }
          items.push(item);
        });
        this._value = items;
      } else {
        this._value = null;
      }
    } else {
      this._value = value;
    }
  },
  /**
   * Получение значения
   * @returns {Array|null}
   */
  getValue: function getValue() {
    var control = coreuiTableElements.getControl(this._table.getId(), this._id);
    if (control[0]) {
      var options = $('select option:checked', control);
      var items = [];
      $.each(options, function (key, option) {
        var value = option.val();
        if (value !== '') {
          items.push(value);
        }
      });
      return items;
    } else {
      return this._value;
    }
  },
  /**
   * Инициализация событий
   * @returns {object}
   */
  initEvents: function initEvents() {},
  /**
   * Формирование контента
   * @returns {string}
   */
  render: function render() {
    var that = this;
    var options = this.getOptions();
    var selectOptions = [];
    var attributes = [];
    var label = typeof options.label === 'string' || typeof options.label === 'number' ? options.label : '';
    if (!options.hasOwnProperty('attr') || !coreuiTableUtils.isObject(options.attr)) {
      options.attr = {};
    }
    if (options.field) {
      options.attr.name = this._options.field;
    }
    if (options.width) {
      options.attr = coreuiTableUtils.mergeAttr({
        style: 'width:' + options.width + 'px'
      }, options.attr);
    }
    if (options.hasOwnProperty('options') && _typeof(options.options) === 'object' && options.options !== null) {
      $.each(options.options, function (key, option) {
        if (typeof option === 'string' || typeof option === 'number') {
          selectOptions.push(that._buildOption({
            type: 'option',
            value: key,
            text: option
          }));
        } else if (coreuiTableUtils.isObject(option)) {
          var type = option.hasOwnProperty('type') && typeof option.type === 'string' ? option.type : 'option';
          if (type === 'group') {
            var renderAttr = [];
            var groupAttr = {};
            var groupOptions = [];
            if (option.hasOwnProperty('attr') && coreuiTableUtils.isObject(option.attr)) {
              groupAttr = option.attr;
            }
            if (option.hasOwnProperty('label') && ['string', 'number'].indexOf(_typeof(option.label)) >= 0) {
              groupAttr.label = option.label;
            }
            $.each(groupAttr, function (name, value) {
              renderAttr.push(name + '="' + value + '"');
            });
            if (Array.isArray(option.options)) {
              $.each(option.options, function (key, groupOption) {
                groupOptions.push(that._buildOption(groupOption));
              });
            }
            selectOptions.push({
              type: 'group',
              attr: renderAttr.length > 0 ? ' ' + renderAttr.join(' ') : '',
              options: groupOptions
            });
          } else {
            selectOptions.push(that._buildOption(option));
          }
        }
      });
    }
    $.each(options.attr, function (name, value) {
      attributes.push(name + '="' + value + '"');
    });
    return ejs.render(tpl['filters/select.html'], {
      label: label,
      attr: attributes.length > 0 ? ' ' + attributes.join(' ') : '',
      options: selectOptions
    });
  },
  /**
   * Сборка опции
   * @param option
   * @return {object}
   * @private
   */
  _buildOption: function _buildOption(option) {
    var optionAttr = [];
    var optionText = option.hasOwnProperty('text') && ['string', 'number'].indexOf(_typeof(option.text)) >= 0 ? option.text : '';
    $.each(option, function (name, value) {
      if (name !== 'text') {
        optionAttr.push(name + '="' + value + '"');
      }
    });
    if (Array.isArray(this._value)) {
      $.each(this._value, function (key, itemValue) {
        if (itemValue == option.value) {
          optionAttr.push('selected="selected"');
          return false;
        }
      });
    } else if (this._value == option.value) {
      optionAttr.push('selected="selected"');
    }
    return {
      type: 'option',
      text: optionText,
      attr: optionAttr.length > 0 ? ' ' + optionAttr.join(' ') : ''
    };
  }
};

coreuiTable$1.filters["switch"] = {
  _id: null,
  _table: null,
  _value: null,
  _options: {
    type: 'switch',
    field: null,
    label: null,
    valueY: 'Y'
  },
  /**
   * Инициализация
   * @param {CoreUI.table.instance} table
   * @param {object}                options
   */
  init: function init(table, options) {
    this._options = $.extend(true, {}, this._options, options);
    this._table = table;
    this._id = coreuiTableUtils.hashCode();
  },
  /**
   * Получение параметров
   * @returns {object}
   */
  getOptions: function getOptions() {
    return $.extend(true, {}, this._options);
  },
  /**
   * Получение id
   * @returns {string}
   */
  getId: function getId() {
    return this._id;
  },
  /**
   * Установка значения
   * @param {string} value
   */
  setValue: function setValue(value) {
    if (typeof value !== 'string' && typeof value !== 'number') {
      return '';
    }
    this._value = value;
  },
  /**
   * Получение значения
   * @returns {string}
   */
  getValue: function getValue() {
    var control = coreuiTableElements.getControl(this._table.getId(), this._id);
    var input = $('input:checked', control);
    return input[0] ? input.val() : null;
  },
  /**
   * Инициализация событий
   * @returns {object}
   */
  initEvents: function initEvents() {},
  /**
   * Формирование контента
   * @returns {string}
   */
  render: function render() {
    var options = this.getOptions();
    var valueY = typeof options.valueY === 'string' || typeof options.label === 'number' ? options.valueY : '';
    var label = typeof options.label === 'string' || typeof options.label === 'number' ? options.label : '';
    var checked = this._value == valueY;
    return ejs.render(tpl['filters/switch.html'], {
      id: this._id,
      valueY: valueY,
      field: typeof options.field === 'string' ? options.field : '',
      checked: checked,
      label: label
    });
  }
};

coreuiTable$1.search.text = {
  _id: null,
  _table: null,
  _value: null,
  _options: {
    type: 'text',
    field: null,
    label: null,
    width: 200,
    attr: {
      "class": "form-control d-inline-block"
    }
  },
  /**
   * Инициализация
   * @param {CoreUI.table.instance} table
   * @param {object}                options
   */
  init: function init(table, options) {
    this._options = $.extend(true, {}, this._options, options);
    this._table = table;
    this._id = coreuiTableUtils.hashCode();
  },
  /**
   * Получение параметров
   * @returns {object}
   */
  getOptions: function getOptions() {
    return $.extend(true, {}, this._options);
  },
  /**
   * Получение id
   * @returns {string}
   */
  getId: function getId() {
    return this._id;
  },
  /**
   * Установка значения
   * @param {string} value
   */
  setValue: function setValue(value) {
    if (typeof value !== 'string' && typeof value !== 'number') {
      return '';
    }
    this._value = value;
  },
  /**
   * Получение значения
   * @returns {string|null}
   */
  getValue: function getValue() {
    var control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
    var input = $('input', control);
    if (input[0]) {
      var value = input.val();
      if (typeof value === 'string' && value !== '') {
        return value;
      }
    }
    return null;
  },
  /**
   * Инициализация событий
   * @returns {object}
   */
  initEvents: function initEvents() {},
  /**
   * Формирование контента
   * @returns {string}
   */
  render: function render() {
    if (!coreuiTableUtils.isObject(this._options.attr)) {
      this._options.attr = {};
    }
    if (this._options.hasOwnProperty('width') && coreuiTableUtils.isNumeric(this._options.width)) {
      if (this._options.attr.hasOwnProperty('style')) {
        this._options.attr['style'] += ';width:' + this._options.width + 'px';
      } else {
        this._options.attr['style'] = 'width:' + this._options.width + 'px';
      }
    }
    this._options.attr['name'] = typeof this._options.field === 'string' ? this._options.field : '';
    this._options.attr['value'] = typeof this._value === 'string' || typeof this._value === 'number' ? this._value : '';
    if (this._options.attr.hasOwnProperty('type')) {
      delete this._options.attr.type;
    }
    var attributes = [];
    $.each(this._options.attr, function (name, value) {
      attributes.push(name + '="' + value + '"');
    });
    return ejs.render(tpl['search/text.html'], {
      attr: attributes.length > 0 ? ' ' + attributes.join(' ') : ''
    });
  }
};

coreuiTable$1.search.number = {
  _id: null,
  _table: null,
  _value: null,
  _options: {
    type: 'number',
    field: null,
    label: null,
    width: 200,
    attr: {
      "class": "form-control d-inline-block"
    }
  },
  /**
   * Инициализация
   * @param {CoreUI.table.instance} table
   * @param {object}                options
   */
  init: function init(table, options) {
    this._options = $.extend(true, {}, this._options, options);
    this._table = table;
    this._id = coreuiTableUtils.hashCode();
  },
  /**
   * Получение параметров
   * @returns {object}
   */
  getOptions: function getOptions() {
    return $.extend(true, {}, this._options);
  },
  /**
   * Получение id
   * @returns {string}
   */
  getId: function getId() {
    return this._id;
  },
  /**
   * Установка значения
   * @param {Object} value
   */
  setValue: function setValue(value) {
    if (value) {
      if (!coreuiTableUtils.isObject(value)) {
        return;
      }
      var numberStart = null;
      var numberEnd = null;
      if (value.hasOwnProperty('start') && ['string', 'number'].indexOf(_typeof(value.start)) >= 0) {
        numberStart = value.start;
      }
      if (value.hasOwnProperty('end') && ['string', 'number'].indexOf(_typeof(value.end)) >= 0) {
        numberEnd = value.end;
      }
      if (numberStart === null && numberEnd === null) {
        this._value = null;
      } else {
        this._value = {
          start: numberStart,
          end: numberEnd
        };
      }
    } else {
      this._value = null;
    }
  },
  /**
   * Получение значения
   * @returns {string|null}
   */
  getValue: function getValue() {
    var control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
    var inputStart = $('input.number-start', control);
    var inputEnd = $('input.number-end', control);
    if (inputStart[0] && inputEnd[0]) {
      var valueStart = inputStart.val();
      var valueEnd = inputEnd.val();
      if (typeof valueStart === 'string' && valueStart !== '' || typeof valueEnd === 'string' && valueEnd !== '') {
        return {
          start: valueStart,
          end: valueEnd
        };
      }
    }
    return null;
  },
  /**
   * Инициализация событий
   * @returns {object}
   */
  initEvents: function initEvents() {},
  /**
   * Формирование контента
   * @returns {string}
   */
  render: function render() {
    if (!coreuiTableUtils.isObject(this._options.attr)) {
      this._options.attr = {};
    }
    if (this._options.hasOwnProperty('width') && coreuiTableUtils.isNumeric(this._options.width)) {
      if (this._options.attr.hasOwnProperty('style')) {
        this._options.attr['style'] += ';width:' + this._options.width + 'px';
      } else {
        this._options.attr['style'] = 'width:' + this._options.width + 'px';
      }
    }
    if (this._options.attr.hasOwnProperty('type')) {
      delete this._options.attr.type;
    }
    if (this._options.attr.hasOwnProperty('value')) {
      delete this._options.attr.value;
    }
    var field = typeof this._options.field === 'string' ? this._options.field : '';
    var startAttr = [];
    var startEnd = [];
    $.each(this._options.attr, function (name, value) {
      if (['name', 'value', 'class'].indexOf(name) >= 0 || ['string', 'number'].indexOf(_typeof(value)) < 0) {
        return;
      }
      startAttr.push(name + '="' + value + '"');
      startEnd.push(name + '="' + value + '"');
    });
    if (this._options.attr.hasOwnProperty('class') && ['string', 'number'].indexOf(_typeof(this._options.attr["class"])) >= 0) {
      startAttr.push('class="' + this._options.attr["class"] + ' number-start"');
      startEnd.push('class="' + this._options.attr["class"] + ' number-end"');
    } else {
      startAttr.push('class="number-start"');
      startEnd.push('class="number-end"');
    }
    if (field) {
      startAttr.push('name="' + field + '[start]"');
      startEnd.push('name="' + field + '[end]"');
    }
    startAttr.push('value="' + (this._value ? this._value.start : '') + '"');
    startEnd.push('value="' + (this._value ? this._value.end : '') + '"');
    return ejs.render(tpl['search/number.html'], {
      startAttr: startAttr.length > 0 ? ' ' + startAttr.join(' ') : '',
      endAttr: startEnd.length > 0 ? ' ' + startEnd.join(' ') : ''
    });
  }
};

coreuiTable$1.search.date = {
  _id: null,
  _table: null,
  _value: null,
  _options: {
    type: 'date',
    field: null,
    label: null,
    width: 200,
    attr: {
      "class": "form-control d-inline-block"
    }
  },
  /**
   * Инициализация
   * @param {CoreUI.table.instance} table
   * @param {object}                options
   */
  init: function init(table, options) {
    this._options = $.extend(true, {}, this._options, options);
    this._table = table;
    this._id = coreuiTableUtils.hashCode();
  },
  /**
   * Получение параметров
   * @returns {object}
   */
  getOptions: function getOptions() {
    return $.extend(true, {}, this._options);
  },
  /**
   * Получение id
   * @returns {string}
   */
  getId: function getId() {
    return this._id;
  },
  /**
   * Установка значения
   * @param {string} value
   */
  setValue: function setValue(value) {
    if (value && (typeof value !== 'string' || value.match(/^\d{4}\-\d{2}\-\d{2}$/) === null || isNaN(new Date(value)))) {
      return;
    }
    this._value = value;
  },
  /**
   * Получение значения
   * @returns {string|null}
   */
  getValue: function getValue() {
    var searchContainer = $('#coreui-table-' + this._table.getId() + ' > .coreui-table__container > .coreui-table__wrapper > .coreui-table__search');
    var input = $('.search-control-' + this._id + ' input', searchContainer);
    if (input[0]) {
      var value = input.val();
      if (typeof value === 'string' && value !== '') {
        return value;
      }
    }
    return null;
  },
  /**
   * Инициализация событий
   * @returns {object}
   */
  initEvents: function initEvents() {},
  /**
   * Формирование контента
   * @returns {string}
   */
  render: function render() {
    if (!coreuiTableUtils.isObject(this._options.attr)) {
      this._options.attr = {};
    }
    if (this._options.hasOwnProperty('width') && coreuiTableUtils.isNumeric(this._options.width)) {
      if (this._options.attr.hasOwnProperty('style')) {
        this._options.attr['style'] += ';width:' + this._options.width + 'px';
      } else {
        this._options.attr['style'] = 'width:' + this._options.width + 'px';
      }
    }
    this._options.attr['name'] = typeof this._options.field === 'string' ? this._options.field : '';
    this._options.attr['value'] = typeof this._value === 'string' || typeof this._value === 'number' ? this._value : '';
    if (this._options.attr.hasOwnProperty('type')) {
      delete this._options.attr.type;
    }
    var attributes = [];
    $.each(this._options.attr, function (name, value) {
      attributes.push(name + '="' + value + '"');
    });
    return ejs.render(tpl['search/date.html'], {
      attr: attributes.length > 0 ? ' ' + attributes.join(' ') : ''
    });
  }
};

coreuiTable$1.search.date_month = {
  _id: null,
  _table: null,
  _value: null,
  _options: {
    type: 'date_month',
    field: null,
    label: null,
    width: 200,
    attr: {
      "class": "form-control d-inline-block"
    }
  },
  /**
   * Инициализация
   * @param {CoreUI.table.instance} table
   * @param {object}                options
   */
  init: function init(table, options) {
    this._options = $.extend(true, {}, this._options, options);
    this._table = table;
    this._id = coreuiTableUtils.hashCode();
  },
  /**
   * Получение параметров
   * @returns {object}
   */
  getOptions: function getOptions() {
    return $.extend(true, {}, this._options);
  },
  /**
   * Получение id
   * @returns {string}
   */
  getId: function getId() {
    return this._id;
  },
  /**
   * Установка значения
   * @param {string} value
   */
  setValue: function setValue(value) {
    if (value && (typeof value !== 'string' || value.match(/^\d{4}\-\d{2}$/) === null || isNaN(new Date(value)))) {
      return;
    }
    this._value = value;
  },
  /**
   * Получение значения
   * @returns {string|null}
   */
  getValue: function getValue() {
    var control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
    var input = $('input', control);
    if (input[0]) {
      var value = input.val();
      if (typeof value === 'string' && value !== '') {
        return value;
      }
    }
    return null;
  },
  /**
   * Инициализация событий
   * @returns {object}
   */
  initEvents: function initEvents() {},
  /**
   * Формирование контента
   * @returns {string}
   */
  render: function render() {
    if (!coreuiTableUtils.isObject(this._options.attr)) {
      this._options.attr = {};
    }
    if (this._options.hasOwnProperty('width') && coreuiTableUtils.isNumeric(this._options.width)) {
      if (this._options.attr.hasOwnProperty('style')) {
        this._options.attr['style'] += ';width:' + this._options.width + 'px';
      } else {
        this._options.attr['style'] = 'width:' + this._options.width + 'px';
      }
    }
    this._options.attr['name'] = typeof this._options.field === 'string' ? this._options.field : '';
    this._options.attr['value'] = typeof this._value === 'string' || typeof this._value === 'number' ? this._value : '';
    if (this._options.attr.hasOwnProperty('type')) {
      delete this._options.attr.type;
    }
    var attributes = [];
    $.each(this._options.attr, function (name, value) {
      attributes.push(name + '="' + value + '"');
    });
    return ejs.render(tpl['search/date_month.html'], {
      attr: attributes.length > 0 ? ' ' + attributes.join(' ') : ''
    });
  }
};

coreuiTable$1.search.datetime = {
  _id: null,
  _table: null,
  _value: null,
  _options: {
    type: 'datetime',
    field: null,
    label: null,
    width: 200,
    attr: {
      "class": "form-control d-inline-block"
    }
  },
  /**
   * Инициализация
   * @param {CoreUI.table.instance} table
   * @param {object}                options
   */
  init: function init(table, options) {
    this._options = $.extend(true, {}, this._options, options);
    this._table = table;
    this._id = coreuiTableUtils.hashCode();
  },
  /**
   * Получение параметров
   * @returns {object}
   */
  getOptions: function getOptions() {
    return $.extend(true, {}, this._options);
  },
  /**
   * Получение id
   * @returns {string}
   */
  getId: function getId() {
    return this._id;
  },
  /**
   * Установка значения
   * @param {string} value
   */
  setValue: function setValue(value) {
    if (value && (typeof value !== 'string' || value.match(/^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}$/) === null || isNaN(new Date(value)))) {
      return;
    }
    this._value = value;
  },
  /**
   * Получение значения
   * @returns {string}
   */
  getValue: function getValue() {
    var control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
    var input = $('input', control);
    if (input[0]) {
      var value = input.val();
      if (typeof value === 'string' && value !== '') {
        return value;
      }
    }
    return null;
  },
  /**
   * Инициализация событий
   * @returns {object}
   */
  initEvents: function initEvents() {},
  /**
   * Формирование контента
   * @returns {string}
   */
  render: function render() {
    if (!coreuiTableUtils.isObject(this._options.attr)) {
      this._options.attr = {};
    }
    if (this._options.hasOwnProperty('width') && coreuiTableUtils.isNumeric(this._options.width)) {
      if (this._options.attr.hasOwnProperty('style')) {
        this._options.attr['style'] += ';width:' + this._options.width + 'px';
      } else {
        this._options.attr['style'] = 'width:' + this._options.width + 'px';
      }
    }
    this._options.attr['name'] = typeof this._options.field === 'string' ? this._options.field : '';
    this._options.attr['value'] = typeof this._value === 'string' || typeof this._value === 'number' ? this._value : '';
    if (this._options.attr.hasOwnProperty('type')) {
      delete this._options.attr.type;
    }
    var attributes = [];
    $.each(this._options.attr, function (name, value) {
      attributes.push(name + '="' + value + '"');
    });
    return ejs.render(tpl['search/datetime.html'], {
      attr: attributes.length > 0 ? ' ' + attributes.join(' ') : ''
    });
  }
};

coreuiTable$1.search.date_range = {
  _id: null,
  _table: null,
  _value: null,
  _options: {
    type: 'date_range',
    field: null,
    label: null,
    width: 200,
    attr: {
      "class": "form-control d-inline-block"
    }
  },
  /**
   * Инициализация
   * @param {CoreUI.table.instance} table
   * @param {object}                options
   */
  init: function init(table, options) {
    this._options = $.extend(true, {}, this._options, options);
    this._table = table;
    this._id = coreuiTableUtils.hashCode();
  },
  /**
   * Получение параметров
   * @returns {object}
   */
  getOptions: function getOptions() {
    return $.extend(true, {}, this._options);
  },
  /**
   * Получение id
   * @returns {string}
   */
  getId: function getId() {
    return this._id;
  },
  /**
   * Установка значения
   * @param {Object} value
   */
  setValue: function setValue(value) {
    if (value) {
      if (!coreuiTableUtils.isObject(value)) {
        return;
      }
      var dateStart = null;
      var dateEnd = null;
      if (value.hasOwnProperty('start') && typeof value.start === 'string' && value.start.match(/^\d{4}\-\d{2}\-\d{2}$/) === null && isNaN(new Date(value.start))) {
        dateStart = value.start;
      }
      if (value.hasOwnProperty('end') && typeof value.end === 'string' && value.end.match(/^\d{4}\-\d{2}\-\d{2}$/) === null && isNaN(new Date(value.end))) {
        dateEnd = value.end;
      }
      if (dateStart === null && dateEnd === null) {
        this._value = null;
      } else {
        this._value = {
          start: dateStart,
          end: dateEnd
        };
      }
    } else {
      this._value = null;
    }
  },
  /**
   * Получение значения
   * @returns {Object|null}
   */
  getValue: function getValue() {
    var control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
    var inputStart = $('input.date-start', control);
    var inputEnd = $('input.date-end', control);
    if (inputStart[0] && inputEnd[0]) {
      var valueStart = inputStart.val();
      var valueEnd = inputEnd.val();
      if (typeof valueStart === 'string' && valueStart !== '' || typeof valueEnd === 'string' && valueEnd !== '') {
        return {
          start: valueStart,
          end: valueEnd
        };
      }
    }
    return null;
  },
  /**
   * Инициализация событий
   * @returns {object}
   */
  initEvents: function initEvents() {},
  /**
   * Формирование контента
   * @returns {string}
   */
  render: function render() {
    var options = this.getOptions();
    if (!coreuiTableUtils.isObject(options.attr)) {
      options.attr = {};
    }
    if (options.hasOwnProperty('width') && coreuiTableUtils.isNumeric(options.width)) {
      if (options.attr.hasOwnProperty('style')) {
        options.attr['style'] += ';width:' + options.width + 'px';
      } else {
        options.attr['style'] = 'width:' + options.width + 'px';
      }
    }
    if (options.attr.hasOwnProperty('type')) {
      delete options.attr.type;
    }
    if (options.attr.hasOwnProperty('value')) {
      delete options.attr.value;
    }
    var field = typeof options.field === 'string' ? options.field : '';
    var startAttr = [];
    var startEnd = [];
    $.each(options.attr, function (name, value) {
      if (['name', 'value', 'class'].indexOf(name) >= 0 || ['string', 'number'].indexOf(_typeof(value)) < 0) {
        return;
      }
      startAttr.push(name + '="' + value + '"');
      startEnd.push(name + '="' + value + '"');
    });
    if (options.attr.hasOwnProperty('class') && ['string', 'number'].indexOf(_typeof(options.attr["class"])) >= 0) {
      startAttr.push('class="' + options.attr["class"] + ' date-start"');
      startEnd.push('class="' + options.attr["class"] + ' date-end"');
    } else {
      startAttr.push('class="date-start"');
      startEnd.push('class="date-end"');
    }
    if (field) {
      startAttr.push('name="' + field + '[start]"');
      startEnd.push('name="' + field + '[end]"');
    }
    startAttr.push('value="' + (this._value ? this._value.start : '') + '"');
    startEnd.push('value="' + (this._value ? this._value.end : '') + '"');
    return ejs.render(tpl['search/date_range.html'], {
      startAttr: startAttr.length > 0 ? ' ' + startAttr.join(' ') : '',
      endAttr: startEnd.length > 0 ? ' ' + startEnd.join(' ') : ''
    });
  }
};

coreuiTable$1.search.datetime_range = {
  _id: null,
  _table: null,
  _value: null,
  _options: {
    type: 'datetime_range',
    field: null,
    label: null,
    width: 200,
    attr: {
      "class": "form-control d-inline-block"
    }
  },
  /**
   * Инициализация
   * @param {CoreUI.table.instance} table
   * @param {object}                options
   */
  init: function init(table, options) {
    this._options = $.extend(true, {}, this._options, options);
    this._table = table;
    this._id = coreuiTableUtils.hashCode();
  },
  /**
   * Получение параметров
   * @returns {object}
   */
  getOptions: function getOptions() {
    return $.extend(true, {}, this._options);
  },
  /**
   * Получение id
   * @returns {string}
   */
  getId: function getId() {
    return this._id;
  },
  /**
   * Установка значения
   * @param {Object} value
   */
  setValue: function setValue(value) {
    if (value) {
      if (!coreuiTableUtils.isObject(value)) {
        return;
      }
      var dateStart = null;
      var dateEnd = null;
      if (value.hasOwnProperty('start') && typeof value.start === 'string' && value.start.match(/^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}$/) === null && isNaN(new Date(value.start))) {
        dateStart = value.start;
      }
      if (value.hasOwnProperty('end') && typeof value.end === 'string' && value.end.match(/^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}$/) === null && isNaN(new Date(value.end))) {
        dateEnd = value.end;
      }
      if (dateStart === null && dateEnd === null) {
        this._value = null;
      } else {
        this._value = {
          start: dateStart,
          end: dateEnd
        };
      }
    } else {
      this._value = null;
    }
  },
  /**
   * Получение значения
   * @returns {Object|null}
   */
  getValue: function getValue() {
    var control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
    var inputStart = $('input.date-start', control);
    var inputEnd = $('input.date-end', control);
    if (inputStart[0] && inputEnd[0]) {
      var valueStart = inputStart.val();
      var valueEnd = inputEnd.val();
      if (typeof valueStart === 'string' && valueStart !== '' || typeof valueEnd === 'string' && valueEnd !== '') {
        return {
          start: valueStart,
          end: valueEnd
        };
      }
    }
    return null;
  },
  /**
   * Инициализация событий
   * @returns {object}
   */
  initEvents: function initEvents() {},
  /**
   * Формирование контента
   * @returns {string}
   */
  render: function render() {
    if (!coreuiTableUtils.isObject(this._options.attr)) {
      this._options.attr = {};
    }
    if (this._options.hasOwnProperty('width') && coreuiTableUtils.isNumeric(this._options.width)) {
      if (this._options.attr.hasOwnProperty('style')) {
        this._options.attr['style'] += ';width:' + this._options.width + 'px';
      } else {
        this._options.attr['style'] = 'width:' + this._options.width + 'px';
      }
    }
    if (this._options.attr.hasOwnProperty('type')) {
      delete this._options.attr.type;
    }
    if (this._options.attr.hasOwnProperty('value')) {
      delete this._options.attr.value;
    }
    var field = typeof this._options.field === 'string' ? this._options.field : '';
    var startAttr = [];
    var startEnd = [];
    $.each(this._options.attr, function (name, value) {
      if (['name', 'value', 'class'].indexOf(name) >= 0 || ['string', 'number'].indexOf(_typeof(value)) < 0) {
        return;
      }
      startAttr.push(name + '="' + value + '"');
      startEnd.push(name + '="' + value + '"');
    });
    if (this._options.attr.hasOwnProperty('class') && ['string', 'number'].indexOf(_typeof(this._options.attr["class"])) >= 0) {
      startAttr.push('class="' + this._options.attr["class"] + ' date-start"');
      startEnd.push('class="' + this._options.attr["class"] + ' date-end"');
    } else {
      startAttr.push('class="date-start"');
      startEnd.push('class="date-end"');
    }
    if (field) {
      startAttr.push('name="' + field + '[start]"');
      startEnd.push('name="' + field + '[end]"');
    }
    startAttr.push('value="' + (this._value ? this._value.start : '') + '"');
    startEnd.push('value="' + (this._value ? this._value.end : '') + '"');
    return ejs.render(tpl['search/datetime_range.html'], {
      startAttr: startAttr.length > 0 ? ' ' + startAttr.join(' ') : '',
      endAttr: startEnd.length > 0 ? ' ' + startEnd.join(' ') : ''
    });
  }
};

coreuiTable$1.search.checkbox = {
  _id: null,
  _table: null,
  _value: null,
  _options: {
    type: 'checkbox',
    field: null,
    label: null,
    options: []
  },
  /**
   * Инициализация
   * @param {CoreUI.table.instance} table
   * @param {object}                options
   */
  init: function init(table, options) {
    this._options = $.extend(true, {}, this._options, options);
    this._table = table;
    this._id = coreuiTableUtils.hashCode();
  },
  /**
   * Получение параметров
   * @returns {object}
   */
  getOptions: function getOptions() {
    return $.extend(true, {}, this._options);
  },
  /**
   * Получение id
   * @returns {string}
   */
  getId: function getId() {
    return this._id;
  },
  /**
   * Установка значения
   * @param {Array|null} value
   */
  setValue: function setValue(value) {
    if (!Array.isArray(value)) {
      return;
    }
    var items = [];
    $.each(value, function (key, item) {
      if (typeof value !== 'string' && typeof value !== 'number') {
        return;
      }
      items.push(item);
    });
    this._value = items;
  },
  /**
   * Получение значения
   * @returns {Array|null}
   */
  getValue: function getValue() {
    var control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
    if (control[0]) {
      var inputs = $('input:checked', control);
      var items = [];
      $.each(inputs, function (key, input) {
        var value = $(input).attr('value');
        if (['string', 'number'].indexOf(_typeof(value)) >= 0 && value !== '') {
          items.push(value);
        }
      });
      return items.length > 0 ? items : null;
    } else {
      return this._value;
    }
  },
  /**
   * Инициализация событий
   * @returns {object}
   */
  initEvents: function initEvents() {},
  /**
   * Формирование контента
   * @returns {string}
   */
  render: function render() {
    var that = this;
    var options = [];
    $.each(this._options.options, function (key, option) {
      if (!coreuiTableUtils.isObject(option) || !option.hasOwnProperty('value') || ['string', 'numeric'].indexOf(_typeof(option.value)) === -1) {
        return;
      }
      var checked = Array.isArray(that._value) ? that._value.indexOf(option.value) >= 0 : false;
      var text = option.hasOwnProperty('text') ? option.text : option.value;
      options.push({
        text: text,
        value: option.value,
        checked: checked
      });
    });
    return ejs.render(tpl['search/checkbox.html'], {
      options: options,
      field: typeof this._options.field === 'string' ? this._options.field : ''
    });
  }
};

coreuiTable$1.search.radio = {
  _id: null,
  _table: null,
  _value: null,
  _options: {
    type: 'radio',
    field: null,
    label: null,
    options: []
  },
  /**
   * Инициализация
   * @param {CoreUI.table.instance} table
   * @param {object}                options
   */
  init: function init(table, options) {
    this._options = $.extend(true, {}, this._options, options);
    this._table = table;
    this._id = coreuiTableUtils.hashCode();
  },
  /**
   * Получение параметров
   * @returns {object}
   */
  getOptions: function getOptions() {
    return $.extend(true, {}, this._options);
  },
  /**
   * Получение id
   * @returns {string}
   */
  getId: function getId() {
    return this._id;
  },
  /**
   * Установка значения
   * @param {string} value
   */
  setValue: function setValue(value) {
    if (typeof value !== 'string' && typeof value !== 'number') {
      return '';
    }
    this._value = value;
  },
  /**
   * Получение значения
   * @returns {string|null}
   */
  getValue: function getValue() {
    var control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
    var input = $('input:checked', control);
    if (input[0]) {
      var value = input.val();
      return value === '' ? null : value;
    } else {
      return this._value;
    }
  },
  /**
   * Инициализация событий
   * @returns {object}
   */
  initEvents: function initEvents() {},
  /**
   * Формирование контента
   * @returns {string}
   */
  render: function render() {
    var that = this;
    var checkedAll = true;
    var options = [];
    $.each(this._options.options, function (key, option) {
      if (!coreuiTableUtils.isObject(option) || !option.hasOwnProperty('value') || ['string', 'numeric'].indexOf(_typeof(option.value)) === -1) {
        return;
      }
      var checked = option.value == that._value;
      var text = option.hasOwnProperty('text') ? option.text : option.value;
      if (checked) {
        checkedAll = false;
      }
      options.push({
        text: text,
        value: option.value,
        checked: checked
      });
    });
    return ejs.render(tpl['search/radio.html'], {
      options: options,
      checkedAll: checkedAll,
      field: typeof this._options.field === 'string' ? this._options.field : '',
      lang: this._table.getLang()
    });
  }
};

coreuiTable$1.search.select = {
  _id: null,
  _table: null,
  _value: null,
  _options: {
    type: 'select',
    field: null,
    label: null,
    width: null,
    attr: {
      "class": 'form-select d-inline-block'
    },
    options: []
  },
  /**
   * Инициализация
   * @param {CoreUI.table.instance} table
   * @param {object}                options
   */
  init: function init(table, options) {
    this._options = $.extend(true, {}, this._options, options);
    this._table = table;
    this._id = coreuiTableUtils.hashCode();
  },
  /**
   * Получение параметров
   * @returns {object}
   */
  getOptions: function getOptions() {
    return $.extend(true, {}, this._options);
  },
  /**
   * Получение id
   * @returns {string}
   */
  getId: function getId() {
    return this._id;
  },
  /**
   * Установка значения
   * @param {Array} value
   */
  setValue: function setValue(value) {
    if (['string', 'number', 'object'].indexOf(_typeof(value)) < 0) {
      return;
    }
    if (_typeof(value) === 'object') {
      if (Array.isArray(value)) {
        var items = [];
        $.each(value, function (key, item) {
          if (typeof value !== 'string' && typeof value !== 'number') {
            return;
          }
          items.push(item);
        });
        this._value = items;
      } else {
        this._value = null;
      }
    } else {
      this._value = value;
    }
  },
  /**
   * Получение значения
   * @returns {Array|null}
   */
  getValue: function getValue() {
    var control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
    if (control[0]) {
      var options = $('select option:checked', control);
      var items = [];
      $.each(options, function (key, option) {
        var value = $(option).attr('value');
        if (['string', 'number'].indexOf(_typeof(value)) >= 0 && value !== '') {
          items.push(value);
        }
      });
      return items.length > 0 ? items : null;
    } else {
      return this._value;
    }
  },
  /**
   * Инициализация событий
   * @returns {object}
   */
  initEvents: function initEvents() {},
  /**
   * Формирование контента
   * @returns {string}
   */
  render: function render() {
    var that = this;
    var options = this.getOptions();
    var selectOptions = [];
    var attributes = [];
    if (!options.hasOwnProperty('attr') || !coreuiTableUtils.isObject(options.attr)) {
      options.attr = {};
    }
    if (options.field) {
      options.attr.name = this._options.field;
    }
    if (options.width) {
      options.attr = coreuiTableUtils.mergeAttr({
        style: 'width:' + options.width + 'px'
      }, options.attr);
    }
    if (options.hasOwnProperty('options') && _typeof(options.options) === 'object' && options.options !== null) {
      $.each(options.options, function (key, option) {
        if (typeof option === 'string' || typeof option === 'number') {
          selectOptions.push(that._buildOption({
            type: 'option',
            value: key,
            text: option
          }));
        } else if (coreuiTableUtils.isObject(option)) {
          var type = option.hasOwnProperty('type') && typeof option.type === 'string' ? option.type : 'option';
          if (type === 'group') {
            var renderAttr = [];
            var groupAttr = {};
            var groupOptions = [];
            if (option.hasOwnProperty('attr') && coreuiTableUtils.isObject(option.attr)) {
              groupAttr = option.attr;
            }
            if (option.hasOwnProperty('label') && ['string', 'number'].indexOf(_typeof(option.label)) >= 0) {
              groupAttr.label = option.label;
            }
            $.each(groupAttr, function (name, value) {
              renderAttr.push(name + '="' + value + '"');
            });
            if (Array.isArray(option.options)) {
              $.each(option.options, function (key, groupOption) {
                groupOptions.push(that._buildOption(groupOption));
              });
            }
            selectOptions.push({
              type: 'group',
              attr: renderAttr.length > 0 ? ' ' + renderAttr.join(' ') : '',
              options: groupOptions
            });
          } else {
            selectOptions.push(that._buildOption(option));
          }
        }
      });
    }
    $.each(options.attr, function (name, value) {
      attributes.push(name + '="' + value + '"');
    });
    return ejs.render(tpl['search/select.html'], {
      field: options,
      value: this._value,
      attr: attributes.length > 0 ? ' ' + attributes.join(' ') : '',
      options: selectOptions
    });
  },
  /**
   * Сборка опции
   * @param option
   * @return {object}
   * @private
   */
  _buildOption: function _buildOption(option) {
    var optionAttr = [];
    var optionText = option.hasOwnProperty('text') && ['string', 'number'].indexOf(_typeof(option.text)) >= 0 ? option.text : '';
    $.each(option, function (name, value) {
      if (name !== 'text') {
        optionAttr.push(name + '="' + value + '"');
      }
    });
    if (Array.isArray(this._value)) {
      $.each(this._value, function (key, itemValue) {
        if (itemValue == option.value) {
          optionAttr.push('selected="selected"');
          return false;
        }
      });
    } else if (this._value == option.value) {
      optionAttr.push('selected="selected"');
    }
    return {
      type: 'option',
      text: optionText,
      attr: optionAttr.length > 0 ? ' ' + optionAttr.join(' ') : ''
    };
  }
};

coreuiTable$1.columns.date = {
  _table: null,
  _options: {
    type: 'date',
    field: null,
    label: null,
    show: true,
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
   * Установка видимости колонки
   * @param {boolean} isShow
   */
  setShow: function setShow(isShow) {
    this._options.show = !!isShow;
  },
  /**
   * Видимости колонки
   */
  isShow: function isShow() {
    return !!this._options.show;
  },
  /**
   * Получение параметров
   * @returns {object}
   */
  getOptions: function getOptions() {
    return $.extend({}, this._options);
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
    show: true,
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
   * Установка видимости колонки
   * @param {boolean} isShow
   */
  setShow: function setShow(isShow) {
    this._options.show = !!isShow;
  },
  /**
   * Видимости колонки
   */
  isShow: function isShow() {
    return !!this._options.show;
  },
  /**
   * Получение параметров
   * @returns {object}
   */
  getOptions: function getOptions() {
    return $.extend({}, this._options);
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
    show: true,
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
   * Установка видимости колонки
   * @param {boolean} isShow
   */
  setShow: function setShow(isShow) {
    this._options.show = !!isShow;
  },
  /**
   * Видимости колонки
   */
  isShow: function isShow() {
    return !!this._options.show;
  },
  /**
   * Получение параметров
   * @returns {object}
   */
  getOptions: function getOptions() {
    return $.extend({}, this._options);
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
    show: true,
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
   * Установка видимости колонки
   * @param {boolean} isShow
   */
  setShow: function setShow(isShow) {
    this._options.show = !!isShow;
  },
  /**
   * Видимости колонки
   */
  isShow: function isShow() {
    return !!this._options.show;
  },
  /**
   * Получение параметров
   * @returns {object}
   */
  getOptions: function getOptions() {
    return $.extend({}, this._options);
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
   * Видимости колонки
   */
  isShow: function isShow() {
    return true;
  },
  /**
   * Получение параметров
   * @returns {object}
   */
  getOptions: function getOptions() {
    return $.extend({}, this._options);
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
    field: null,
    label: '',
    show: true,
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

    // Показ строк
    this._table.on('show-records', function () {
      var selects = coreuiTableElements.getRowsSelects(table.getId());
      var selectAll = coreuiTableElements.getRowsSelectAll(table.getId());

      // Отмена обработки нажатия в select колонках
      $(selects).click(function (event) {
        event.stopPropagation();
      });

      // Выбор строки
      $(' > .coreui-table__select', selects).click(function (event) {
        var recordIndex = $(this).val();
        var record = table.getRecordByIndex(recordIndex);
        var tr = coreuiTableElements.getTrByIndex(table.getId(), recordIndex);
        if (!record || !row) {
          return;
        }
        if ($(this).is(':checked')) {
          $(tr).addClass('table-primary');
          table._trigger('select', table, [record]);
        } else {
          $(tr).removeClass('table-primary');
          table._trigger('unselect', table, [record]);
        }
      });

      // Выбор всех строк
      selectAll.click(function (event) {
        if ($(this).is(':checked')) {
          table.selectAll();
        } else {
          table.unselectAll();
        }
      });
    });
  },
  /**
   * Установка видимости колонки
   * @param {boolean} isShow
   */
  setShow: function setShow(isShow) {
    this._options.show = !!isShow;
  },
  /**
   * Видимости колонки
   */
  isShow: function isShow() {
    return !!this._options.show;
  },
  /**
   * Получение параметров
   * @returns {object}
   */
  getOptions: function getOptions() {
    return $.extend({}, this._options);
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
    show: true,
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
    var that = this;
    this._table = table;
    this._options = $.extend(true, {}, this._options, options);

    // Показ строк
    this._table.on('show-records', function () {
      var containers = coreuiTableElements.getRowsSwitches(that._table.getId());

      // Отмена обработки нажатия в switch колонках
      containers.click(function (event) {
        event.stopPropagation();
      });

      // События нажатия на переключатель
      if (that._options.hasOwnProperty('onChange') && (typeof that._options.onChange === 'function' || typeof that._options.onChange === 'string')) {
        $('.coreui-table__switch[data-field="' + that._options.field + '"]', containers).change(function (event) {
          var recordIndex = $(this).val();
          var isChecked = $(this).is(':checked');
          var record = table.getRecordByIndex(recordIndex);
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
   * Установка видимости колонки
   * @param {boolean} isShow
   */
  setShow: function setShow(isShow) {
    this._options.show = !!isShow;
  },
  /**
   * Видимости колонки
   */
  isShow: function isShow() {
    return !!this._options.show;
  },
  /**
   * Получение параметров
   * @returns {object}
   */
  getOptions: function getOptions() {
    return $.extend(true, {}, this._options);
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
    show: true,
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
   * Установка видимости колонки
   * @param {boolean} isShow
   */
  setShow: function setShow(isShow) {
    this._options.show = !!isShow;
  },
  /**
   * Видимости колонки
   */
  isShow: function isShow() {
    return !!this._options.show;
  },
  /**
   * Получение параметров
   * @returns {object}
   */
  getOptions: function getOptions() {
    return $.extend({}, this._options);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIkM6L1VzZXJzL2FkbWluL3Byb2plY3RzL2NvcmV1aS9jb3JldWktdGFibGUvbm9kZV9tb2R1bGVzL2Vqcy9lanMubWluLmpzIiwiQzovVXNlcnMvYWRtaW4vcHJvamVjdHMvY29yZXVpL2NvcmV1aS10YWJsZS9zcmMvanMvY29yZXVpLnRhYmxlLnRlbXBsYXRlcy5qcyIsIkM6L1VzZXJzL2FkbWluL3Byb2plY3RzL2NvcmV1aS9jb3JldWktdGFibGUvc3JjL2pzL2NvcmV1aS50YWJsZS51dGlscy5qcyIsIkM6L1VzZXJzL2FkbWluL3Byb2plY3RzL2NvcmV1aS9jb3JldWktdGFibGUvc3JjL2pzL2NvcmV1aS50YWJsZS5yZW5kZXIuanMiLCJDOi9Vc2Vycy9hZG1pbi9wcm9qZWN0cy9jb3JldWkvY29yZXVpLXRhYmxlL3NyYy9qcy9jb3JldWkudGFibGUuZWxlbWVudHMuanMiLCJDOi9Vc2Vycy9hZG1pbi9wcm9qZWN0cy9jb3JldWkvY29yZXVpLXRhYmxlL3NyYy9qcy9jb3JldWkudGFibGUuaW5zdGFuY2UuanMiLCJDOi9Vc2Vycy9hZG1pbi9wcm9qZWN0cy9jb3JldWkvY29yZXVpLXRhYmxlL3NyYy9qcy9jb3JldWkudGFibGUuanMiLCJDOi9Vc2Vycy9hZG1pbi9wcm9qZWN0cy9jb3JldWkvY29yZXVpLXRhYmxlL3NyYy9qcy9sYW5nL3J1LmpzIiwiQzovVXNlcnMvYWRtaW4vcHJvamVjdHMvY29yZXVpL2NvcmV1aS10YWJsZS9zcmMvanMvbGFuZy9lbi5qcyIsIkM6L1VzZXJzL2FkbWluL3Byb2plY3RzL2NvcmV1aS9jb3JldWktdGFibGUvc3JjL2pzL2NvbnRyb2xzL2xpbmsuanMiLCJDOi9Vc2Vycy9hZG1pbi9wcm9qZWN0cy9jb3JldWkvY29yZXVpLXRhYmxlL3NyYy9qcy9jb250cm9scy9idXR0b24uanMiLCJDOi9Vc2Vycy9hZG1pbi9wcm9qZWN0cy9jb3JldWkvY29yZXVpLXRhYmxlL3NyYy9qcy9jb250cm9scy9kcm9wZG93bi5qcyIsIkM6L1VzZXJzL2FkbWluL3Byb2plY3RzL2NvcmV1aS9jb3JldWktdGFibGUvc3JjL2pzL2NvbnRyb2xzL2J1dHRvbl9ncm91cC5qcyIsIkM6L1VzZXJzL2FkbWluL3Byb2plY3RzL2NvcmV1aS9jb3JldWktdGFibGUvc3JjL2pzL2NvbnRyb2xzL2N1c3RvbS5qcyIsIkM6L1VzZXJzL2FkbWluL3Byb2plY3RzL2NvcmV1aS9jb3JldWktdGFibGUvc3JjL2pzL2NvbnRyb2xzL3BhZ2Vfc2l6ZS5qcyIsIkM6L1VzZXJzL2FkbWluL3Byb2plY3RzL2NvcmV1aS9jb3JldWktdGFibGUvc3JjL2pzL2NvbnRyb2xzL3BhZ2VfanVtcC5qcyIsIkM6L1VzZXJzL2FkbWluL3Byb2plY3RzL2NvcmV1aS9jb3JldWktdGFibGUvc3JjL2pzL2NvbnRyb2xzL3BhZ2VzLmpzIiwiQzovVXNlcnMvYWRtaW4vcHJvamVjdHMvY29yZXVpL2NvcmV1aS10YWJsZS9zcmMvanMvY29udHJvbHMvdG90YWwuanMiLCJDOi9Vc2Vycy9hZG1pbi9wcm9qZWN0cy9jb3JldWkvY29yZXVpLXRhYmxlL3NyYy9qcy9jb250cm9scy9zZWFyY2guanMiLCJDOi9Vc2Vycy9hZG1pbi9wcm9qZWN0cy9jb3JldWkvY29yZXVpLXRhYmxlL3NyYy9qcy9jb250cm9scy9jb2x1bW5zLmpzIiwiQzovVXNlcnMvYWRtaW4vcHJvamVjdHMvY29yZXVpL2NvcmV1aS10YWJsZS9zcmMvanMvZmlsdGVycy9jbGVhci5qcyIsIkM6L1VzZXJzL2FkbWluL3Byb2plY3RzL2NvcmV1aS9jb3JldWktdGFibGUvc3JjL2pzL2ZpbHRlcnMvdGV4dC5qcyIsIkM6L1VzZXJzL2FkbWluL3Byb2plY3RzL2NvcmV1aS9jb3JldWktdGFibGUvc3JjL2pzL2ZpbHRlcnMvbnVtYmVyLmpzIiwiQzovVXNlcnMvYWRtaW4vcHJvamVjdHMvY29yZXVpL2NvcmV1aS10YWJsZS9zcmMvanMvZmlsdGVycy9kYXRlLmpzIiwiQzovVXNlcnMvYWRtaW4vcHJvamVjdHMvY29yZXVpL2NvcmV1aS10YWJsZS9zcmMvanMvZmlsdGVycy9kYXRldGltZS5qcyIsIkM6L1VzZXJzL2FkbWluL3Byb2plY3RzL2NvcmV1aS9jb3JldWktdGFibGUvc3JjL2pzL2ZpbHRlcnMvZGF0ZV9tb250aC5qcyIsIkM6L1VzZXJzL2FkbWluL3Byb2plY3RzL2NvcmV1aS9jb3JldWktdGFibGUvc3JjL2pzL2ZpbHRlcnMvZGF0ZV9yYW5nZS5qcyIsIkM6L1VzZXJzL2FkbWluL3Byb2plY3RzL2NvcmV1aS9jb3JldWktdGFibGUvc3JjL2pzL2ZpbHRlcnMvZGF0ZXRpbWVfcmFuZ2UuanMiLCJDOi9Vc2Vycy9hZG1pbi9wcm9qZWN0cy9jb3JldWkvY29yZXVpLXRhYmxlL3NyYy9qcy9maWx0ZXJzL2NoZWNrYm94LmpzIiwiQzovVXNlcnMvYWRtaW4vcHJvamVjdHMvY29yZXVpL2NvcmV1aS10YWJsZS9zcmMvanMvZmlsdGVycy9yYWRpby5qcyIsIkM6L1VzZXJzL2FkbWluL3Byb2plY3RzL2NvcmV1aS9jb3JldWktdGFibGUvc3JjL2pzL2ZpbHRlcnMvc2VsZWN0LmpzIiwiQzovVXNlcnMvYWRtaW4vcHJvamVjdHMvY29yZXVpL2NvcmV1aS10YWJsZS9zcmMvanMvZmlsdGVycy9zd2l0Y2guanMiLCJDOi9Vc2Vycy9hZG1pbi9wcm9qZWN0cy9jb3JldWkvY29yZXVpLXRhYmxlL3NyYy9qcy9zZWFyY2gvdGV4dC5qcyIsIkM6L1VzZXJzL2FkbWluL3Byb2plY3RzL2NvcmV1aS9jb3JldWktdGFibGUvc3JjL2pzL3NlYXJjaC9udW1iZXIuanMiLCJDOi9Vc2Vycy9hZG1pbi9wcm9qZWN0cy9jb3JldWkvY29yZXVpLXRhYmxlL3NyYy9qcy9zZWFyY2gvZGF0ZS5qcyIsIkM6L1VzZXJzL2FkbWluL3Byb2plY3RzL2NvcmV1aS9jb3JldWktdGFibGUvc3JjL2pzL3NlYXJjaC9kYXRlX21vbnRoLmpzIiwiQzovVXNlcnMvYWRtaW4vcHJvamVjdHMvY29yZXVpL2NvcmV1aS10YWJsZS9zcmMvanMvc2VhcmNoL2RhdGV0aW1lLmpzIiwiQzovVXNlcnMvYWRtaW4vcHJvamVjdHMvY29yZXVpL2NvcmV1aS10YWJsZS9zcmMvanMvc2VhcmNoL2RhdGVfcmFuZ2UuanMiLCJDOi9Vc2Vycy9hZG1pbi9wcm9qZWN0cy9jb3JldWkvY29yZXVpLXRhYmxlL3NyYy9qcy9zZWFyY2gvZGF0ZXRpbWVfcmFuZ2UuanMiLCJDOi9Vc2Vycy9hZG1pbi9wcm9qZWN0cy9jb3JldWkvY29yZXVpLXRhYmxlL3NyYy9qcy9zZWFyY2gvY2hlY2tib3guanMiLCJDOi9Vc2Vycy9hZG1pbi9wcm9qZWN0cy9jb3JldWkvY29yZXVpLXRhYmxlL3NyYy9qcy9zZWFyY2gvcmFkaW8uanMiLCJDOi9Vc2Vycy9hZG1pbi9wcm9qZWN0cy9jb3JldWkvY29yZXVpLXRhYmxlL3NyYy9qcy9zZWFyY2gvc2VsZWN0LmpzIiwiQzovVXNlcnMvYWRtaW4vcHJvamVjdHMvY29yZXVpL2NvcmV1aS10YWJsZS9zcmMvanMvY29sdW1ucy9kYXRlLmpzIiwiQzovVXNlcnMvYWRtaW4vcHJvamVjdHMvY29yZXVpL2NvcmV1aS10YWJsZS9zcmMvanMvY29sdW1ucy9kYXRldGltZS5qcyIsIkM6L1VzZXJzL2FkbWluL3Byb2plY3RzL2NvcmV1aS9jb3JldWktdGFibGUvc3JjL2pzL2NvbHVtbnMvaHRtbC5qcyIsIkM6L1VzZXJzL2FkbWluL3Byb2plY3RzL2NvcmV1aS9jb3JldWktdGFibGUvc3JjL2pzL2NvbHVtbnMvbnVtYmVyLmpzIiwiQzovVXNlcnMvYWRtaW4vcHJvamVjdHMvY29yZXVpL2NvcmV1aS10YWJsZS9zcmMvanMvY29sdW1ucy9udW1iZXJzLmpzIiwiQzovVXNlcnMvYWRtaW4vcHJvamVjdHMvY29yZXVpL2NvcmV1aS10YWJsZS9zcmMvanMvY29sdW1ucy9zZWxlY3QuanMiLCJDOi9Vc2Vycy9hZG1pbi9wcm9qZWN0cy9jb3JldWkvY29yZXVpLXRhYmxlL3NyYy9qcy9jb2x1bW5zL3N3aXRjaC5qcyIsIkM6L1VzZXJzL2FkbWluL3Byb2plY3RzL2NvcmV1aS9jb3JldWktdGFibGUvc3JjL2pzL2NvbHVtbnMvdGV4dC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oZil7aWYodHlwZW9mIGV4cG9ydHM9PT1cIm9iamVjdFwiJiZ0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIil7bW9kdWxlLmV4cG9ydHM9ZigpfWVsc2UgaWYodHlwZW9mIGRlZmluZT09PVwiZnVuY3Rpb25cIiYmZGVmaW5lLmFtZCl7ZGVmaW5lKFtdLGYpfWVsc2V7dmFyIGc7aWYodHlwZW9mIHdpbmRvdyE9PVwidW5kZWZpbmVkXCIpe2c9d2luZG93fWVsc2UgaWYodHlwZW9mIGdsb2JhbCE9PVwidW5kZWZpbmVkXCIpe2c9Z2xvYmFsfWVsc2UgaWYodHlwZW9mIHNlbGYhPT1cInVuZGVmaW5lZFwiKXtnPXNlbGZ9ZWxzZXtnPXRoaXN9Zy5lanM9ZigpfX0pKGZ1bmN0aW9uKCl7dmFyIGRlZmluZSxtb2R1bGUsZXhwb3J0cztyZXR1cm4gZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KCkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1widXNlIHN0cmljdFwiO3ZhciBmcz1yZXF1aXJlKFwiZnNcIik7dmFyIHBhdGg9cmVxdWlyZShcInBhdGhcIik7dmFyIHV0aWxzPXJlcXVpcmUoXCIuL3V0aWxzXCIpO3ZhciBzY29wZU9wdGlvbldhcm5lZD1mYWxzZTt2YXIgX1ZFUlNJT05fU1RSSU5HPXJlcXVpcmUoXCIuLi9wYWNrYWdlLmpzb25cIikudmVyc2lvbjt2YXIgX0RFRkFVTFRfT1BFTl9ERUxJTUlURVI9XCI8XCI7dmFyIF9ERUZBVUxUX0NMT1NFX0RFTElNSVRFUj1cIj5cIjt2YXIgX0RFRkFVTFRfREVMSU1JVEVSPVwiJVwiO3ZhciBfREVGQVVMVF9MT0NBTFNfTkFNRT1cImxvY2Fsc1wiO3ZhciBfTkFNRT1cImVqc1wiO3ZhciBfUkVHRVhfU1RSSU5HPVwiKDwlJXwlJT58PCU9fDwlLXw8JV98PCUjfDwlfCU+fC0lPnxfJT4pXCI7dmFyIF9PUFRTX1BBU1NBQkxFX1dJVEhfREFUQT1bXCJkZWxpbWl0ZXJcIixcInNjb3BlXCIsXCJjb250ZXh0XCIsXCJkZWJ1Z1wiLFwiY29tcGlsZURlYnVnXCIsXCJjbGllbnRcIixcIl93aXRoXCIsXCJybVdoaXRlc3BhY2VcIixcInN0cmljdFwiLFwiZmlsZW5hbWVcIixcImFzeW5jXCJdO3ZhciBfT1BUU19QQVNTQUJMRV9XSVRIX0RBVEFfRVhQUkVTUz1fT1BUU19QQVNTQUJMRV9XSVRIX0RBVEEuY29uY2F0KFwiY2FjaGVcIik7dmFyIF9CT009L15cXHVGRUZGLzt2YXIgX0pTX0lERU5USUZJRVI9L15bYS16QS1aXyRdWzAtOWEtekEtWl8kXSokLztleHBvcnRzLmNhY2hlPXV0aWxzLmNhY2hlO2V4cG9ydHMuZmlsZUxvYWRlcj1mcy5yZWFkRmlsZVN5bmM7ZXhwb3J0cy5sb2NhbHNOYW1lPV9ERUZBVUxUX0xPQ0FMU19OQU1FO2V4cG9ydHMucHJvbWlzZUltcGw9bmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXM7XCIpKCkuUHJvbWlzZTtleHBvcnRzLnJlc29sdmVJbmNsdWRlPWZ1bmN0aW9uKG5hbWUsZmlsZW5hbWUsaXNEaXIpe3ZhciBkaXJuYW1lPXBhdGguZGlybmFtZTt2YXIgZXh0bmFtZT1wYXRoLmV4dG5hbWU7dmFyIHJlc29sdmU9cGF0aC5yZXNvbHZlO3ZhciBpbmNsdWRlUGF0aD1yZXNvbHZlKGlzRGlyP2ZpbGVuYW1lOmRpcm5hbWUoZmlsZW5hbWUpLG5hbWUpO3ZhciBleHQ9ZXh0bmFtZShuYW1lKTtpZighZXh0KXtpbmNsdWRlUGF0aCs9XCIuZWpzXCJ9cmV0dXJuIGluY2x1ZGVQYXRofTtmdW5jdGlvbiByZXNvbHZlUGF0aHMobmFtZSxwYXRocyl7dmFyIGZpbGVQYXRoO2lmKHBhdGhzLnNvbWUoZnVuY3Rpb24odil7ZmlsZVBhdGg9ZXhwb3J0cy5yZXNvbHZlSW5jbHVkZShuYW1lLHYsdHJ1ZSk7cmV0dXJuIGZzLmV4aXN0c1N5bmMoZmlsZVBhdGgpfSkpe3JldHVybiBmaWxlUGF0aH19ZnVuY3Rpb24gZ2V0SW5jbHVkZVBhdGgocGF0aCxvcHRpb25zKXt2YXIgaW5jbHVkZVBhdGg7dmFyIGZpbGVQYXRoO3ZhciB2aWV3cz1vcHRpb25zLnZpZXdzO3ZhciBtYXRjaD0vXltBLVphLXpdKzpcXFxcfF5cXC8vLmV4ZWMocGF0aCk7aWYobWF0Y2gmJm1hdGNoLmxlbmd0aCl7cGF0aD1wYXRoLnJlcGxhY2UoL15cXC8qLyxcIlwiKTtpZihBcnJheS5pc0FycmF5KG9wdGlvbnMucm9vdCkpe2luY2x1ZGVQYXRoPXJlc29sdmVQYXRocyhwYXRoLG9wdGlvbnMucm9vdCl9ZWxzZXtpbmNsdWRlUGF0aD1leHBvcnRzLnJlc29sdmVJbmNsdWRlKHBhdGgsb3B0aW9ucy5yb290fHxcIi9cIix0cnVlKX19ZWxzZXtpZihvcHRpb25zLmZpbGVuYW1lKXtmaWxlUGF0aD1leHBvcnRzLnJlc29sdmVJbmNsdWRlKHBhdGgsb3B0aW9ucy5maWxlbmFtZSk7aWYoZnMuZXhpc3RzU3luYyhmaWxlUGF0aCkpe2luY2x1ZGVQYXRoPWZpbGVQYXRofX1pZighaW5jbHVkZVBhdGgmJkFycmF5LmlzQXJyYXkodmlld3MpKXtpbmNsdWRlUGF0aD1yZXNvbHZlUGF0aHMocGF0aCx2aWV3cyl9aWYoIWluY2x1ZGVQYXRoJiZ0eXBlb2Ygb3B0aW9ucy5pbmNsdWRlciE9PVwiZnVuY3Rpb25cIil7dGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgZmluZCB0aGUgaW5jbHVkZSBmaWxlIFwiJytvcHRpb25zLmVzY2FwZUZ1bmN0aW9uKHBhdGgpKydcIicpfX1yZXR1cm4gaW5jbHVkZVBhdGh9ZnVuY3Rpb24gaGFuZGxlQ2FjaGUob3B0aW9ucyx0ZW1wbGF0ZSl7dmFyIGZ1bmM7dmFyIGZpbGVuYW1lPW9wdGlvbnMuZmlsZW5hbWU7dmFyIGhhc1RlbXBsYXRlPWFyZ3VtZW50cy5sZW5ndGg+MTtpZihvcHRpb25zLmNhY2hlKXtpZighZmlsZW5hbWUpe3Rocm93IG5ldyBFcnJvcihcImNhY2hlIG9wdGlvbiByZXF1aXJlcyBhIGZpbGVuYW1lXCIpfWZ1bmM9ZXhwb3J0cy5jYWNoZS5nZXQoZmlsZW5hbWUpO2lmKGZ1bmMpe3JldHVybiBmdW5jfWlmKCFoYXNUZW1wbGF0ZSl7dGVtcGxhdGU9ZmlsZUxvYWRlcihmaWxlbmFtZSkudG9TdHJpbmcoKS5yZXBsYWNlKF9CT00sXCJcIil9fWVsc2UgaWYoIWhhc1RlbXBsYXRlKXtpZighZmlsZW5hbWUpe3Rocm93IG5ldyBFcnJvcihcIkludGVybmFsIEVKUyBlcnJvcjogbm8gZmlsZSBuYW1lIG9yIHRlbXBsYXRlIFwiK1wicHJvdmlkZWRcIil9dGVtcGxhdGU9ZmlsZUxvYWRlcihmaWxlbmFtZSkudG9TdHJpbmcoKS5yZXBsYWNlKF9CT00sXCJcIil9ZnVuYz1leHBvcnRzLmNvbXBpbGUodGVtcGxhdGUsb3B0aW9ucyk7aWYob3B0aW9ucy5jYWNoZSl7ZXhwb3J0cy5jYWNoZS5zZXQoZmlsZW5hbWUsZnVuYyl9cmV0dXJuIGZ1bmN9ZnVuY3Rpb24gdHJ5SGFuZGxlQ2FjaGUob3B0aW9ucyxkYXRhLGNiKXt2YXIgcmVzdWx0O2lmKCFjYil7aWYodHlwZW9mIGV4cG9ydHMucHJvbWlzZUltcGw9PVwiZnVuY3Rpb25cIil7cmV0dXJuIG5ldyBleHBvcnRzLnByb21pc2VJbXBsKGZ1bmN0aW9uKHJlc29sdmUscmVqZWN0KXt0cnl7cmVzdWx0PWhhbmRsZUNhY2hlKG9wdGlvbnMpKGRhdGEpO3Jlc29sdmUocmVzdWx0KX1jYXRjaChlcnIpe3JlamVjdChlcnIpfX0pfWVsc2V7dGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIHByb3ZpZGUgYSBjYWxsYmFjayBmdW5jdGlvblwiKX19ZWxzZXt0cnl7cmVzdWx0PWhhbmRsZUNhY2hlKG9wdGlvbnMpKGRhdGEpfWNhdGNoKGVycil7cmV0dXJuIGNiKGVycil9Y2IobnVsbCxyZXN1bHQpfX1mdW5jdGlvbiBmaWxlTG9hZGVyKGZpbGVQYXRoKXtyZXR1cm4gZXhwb3J0cy5maWxlTG9hZGVyKGZpbGVQYXRoKX1mdW5jdGlvbiBpbmNsdWRlRmlsZShwYXRoLG9wdGlvbnMpe3ZhciBvcHRzPXV0aWxzLnNoYWxsb3dDb3B5KHV0aWxzLmNyZWF0ZU51bGxQcm90b09ialdoZXJlUG9zc2libGUoKSxvcHRpb25zKTtvcHRzLmZpbGVuYW1lPWdldEluY2x1ZGVQYXRoKHBhdGgsb3B0cyk7aWYodHlwZW9mIG9wdGlvbnMuaW5jbHVkZXI9PT1cImZ1bmN0aW9uXCIpe3ZhciBpbmNsdWRlclJlc3VsdD1vcHRpb25zLmluY2x1ZGVyKHBhdGgsb3B0cy5maWxlbmFtZSk7aWYoaW5jbHVkZXJSZXN1bHQpe2lmKGluY2x1ZGVyUmVzdWx0LmZpbGVuYW1lKXtvcHRzLmZpbGVuYW1lPWluY2x1ZGVyUmVzdWx0LmZpbGVuYW1lfWlmKGluY2x1ZGVyUmVzdWx0LnRlbXBsYXRlKXtyZXR1cm4gaGFuZGxlQ2FjaGUob3B0cyxpbmNsdWRlclJlc3VsdC50ZW1wbGF0ZSl9fX1yZXR1cm4gaGFuZGxlQ2FjaGUob3B0cyl9ZnVuY3Rpb24gcmV0aHJvdyhlcnIsc3RyLGZsbm0sbGluZW5vLGVzYyl7dmFyIGxpbmVzPXN0ci5zcGxpdChcIlxcblwiKTt2YXIgc3RhcnQ9TWF0aC5tYXgobGluZW5vLTMsMCk7dmFyIGVuZD1NYXRoLm1pbihsaW5lcy5sZW5ndGgsbGluZW5vKzMpO3ZhciBmaWxlbmFtZT1lc2MoZmxubSk7dmFyIGNvbnRleHQ9bGluZXMuc2xpY2Uoc3RhcnQsZW5kKS5tYXAoZnVuY3Rpb24obGluZSxpKXt2YXIgY3Vycj1pK3N0YXJ0KzE7cmV0dXJuKGN1cnI9PWxpbmVubz9cIiA+PiBcIjpcIiAgICBcIikrY3VycitcInwgXCIrbGluZX0pLmpvaW4oXCJcXG5cIik7ZXJyLnBhdGg9ZmlsZW5hbWU7ZXJyLm1lc3NhZ2U9KGZpbGVuYW1lfHxcImVqc1wiKStcIjpcIitsaW5lbm8rXCJcXG5cIitjb250ZXh0K1wiXFxuXFxuXCIrZXJyLm1lc3NhZ2U7dGhyb3cgZXJyfWZ1bmN0aW9uIHN0cmlwU2VtaShzdHIpe3JldHVybiBzdHIucmVwbGFjZSgvOyhcXHMqJCkvLFwiJDFcIil9ZXhwb3J0cy5jb21waWxlPWZ1bmN0aW9uIGNvbXBpbGUodGVtcGxhdGUsb3B0cyl7dmFyIHRlbXBsO2lmKG9wdHMmJm9wdHMuc2NvcGUpe2lmKCFzY29wZU9wdGlvbldhcm5lZCl7Y29uc29sZS53YXJuKFwiYHNjb3BlYCBvcHRpb24gaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIEVKUyAzXCIpO3Njb3BlT3B0aW9uV2FybmVkPXRydWV9aWYoIW9wdHMuY29udGV4dCl7b3B0cy5jb250ZXh0PW9wdHMuc2NvcGV9ZGVsZXRlIG9wdHMuc2NvcGV9dGVtcGw9bmV3IFRlbXBsYXRlKHRlbXBsYXRlLG9wdHMpO3JldHVybiB0ZW1wbC5jb21waWxlKCl9O2V4cG9ydHMucmVuZGVyPWZ1bmN0aW9uKHRlbXBsYXRlLGQsbyl7dmFyIGRhdGE9ZHx8dXRpbHMuY3JlYXRlTnVsbFByb3RvT2JqV2hlcmVQb3NzaWJsZSgpO3ZhciBvcHRzPW98fHV0aWxzLmNyZWF0ZU51bGxQcm90b09ialdoZXJlUG9zc2libGUoKTtpZihhcmd1bWVudHMubGVuZ3RoPT0yKXt1dGlscy5zaGFsbG93Q29weUZyb21MaXN0KG9wdHMsZGF0YSxfT1BUU19QQVNTQUJMRV9XSVRIX0RBVEEpfXJldHVybiBoYW5kbGVDYWNoZShvcHRzLHRlbXBsYXRlKShkYXRhKX07ZXhwb3J0cy5yZW5kZXJGaWxlPWZ1bmN0aW9uKCl7dmFyIGFyZ3M9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTt2YXIgZmlsZW5hbWU9YXJncy5zaGlmdCgpO3ZhciBjYjt2YXIgb3B0cz17ZmlsZW5hbWU6ZmlsZW5hbWV9O3ZhciBkYXRhO3ZhciB2aWV3T3B0cztpZih0eXBlb2YgYXJndW1lbnRzW2FyZ3VtZW50cy5sZW5ndGgtMV09PVwiZnVuY3Rpb25cIil7Y2I9YXJncy5wb3AoKX1pZihhcmdzLmxlbmd0aCl7ZGF0YT1hcmdzLnNoaWZ0KCk7aWYoYXJncy5sZW5ndGgpe3V0aWxzLnNoYWxsb3dDb3B5KG9wdHMsYXJncy5wb3AoKSl9ZWxzZXtpZihkYXRhLnNldHRpbmdzKXtpZihkYXRhLnNldHRpbmdzLnZpZXdzKXtvcHRzLnZpZXdzPWRhdGEuc2V0dGluZ3Mudmlld3N9aWYoZGF0YS5zZXR0aW5nc1tcInZpZXcgY2FjaGVcIl0pe29wdHMuY2FjaGU9dHJ1ZX12aWV3T3B0cz1kYXRhLnNldHRpbmdzW1widmlldyBvcHRpb25zXCJdO2lmKHZpZXdPcHRzKXt1dGlscy5zaGFsbG93Q29weShvcHRzLHZpZXdPcHRzKX19dXRpbHMuc2hhbGxvd0NvcHlGcm9tTGlzdChvcHRzLGRhdGEsX09QVFNfUEFTU0FCTEVfV0lUSF9EQVRBX0VYUFJFU1MpfW9wdHMuZmlsZW5hbWU9ZmlsZW5hbWV9ZWxzZXtkYXRhPXV0aWxzLmNyZWF0ZU51bGxQcm90b09ialdoZXJlUG9zc2libGUoKX1yZXR1cm4gdHJ5SGFuZGxlQ2FjaGUob3B0cyxkYXRhLGNiKX07ZXhwb3J0cy5UZW1wbGF0ZT1UZW1wbGF0ZTtleHBvcnRzLmNsZWFyQ2FjaGU9ZnVuY3Rpb24oKXtleHBvcnRzLmNhY2hlLnJlc2V0KCl9O2Z1bmN0aW9uIFRlbXBsYXRlKHRleHQsb3B0cyl7b3B0cz1vcHRzfHx1dGlscy5jcmVhdGVOdWxsUHJvdG9PYmpXaGVyZVBvc3NpYmxlKCk7dmFyIG9wdGlvbnM9dXRpbHMuY3JlYXRlTnVsbFByb3RvT2JqV2hlcmVQb3NzaWJsZSgpO3RoaXMudGVtcGxhdGVUZXh0PXRleHQ7dGhpcy5tb2RlPW51bGw7dGhpcy50cnVuY2F0ZT1mYWxzZTt0aGlzLmN1cnJlbnRMaW5lPTE7dGhpcy5zb3VyY2U9XCJcIjtvcHRpb25zLmNsaWVudD1vcHRzLmNsaWVudHx8ZmFsc2U7b3B0aW9ucy5lc2NhcGVGdW5jdGlvbj1vcHRzLmVzY2FwZXx8b3B0cy5lc2NhcGVGdW5jdGlvbnx8dXRpbHMuZXNjYXBlWE1MO29wdGlvbnMuY29tcGlsZURlYnVnPW9wdHMuY29tcGlsZURlYnVnIT09ZmFsc2U7b3B0aW9ucy5kZWJ1Zz0hIW9wdHMuZGVidWc7b3B0aW9ucy5maWxlbmFtZT1vcHRzLmZpbGVuYW1lO29wdGlvbnMub3BlbkRlbGltaXRlcj1vcHRzLm9wZW5EZWxpbWl0ZXJ8fGV4cG9ydHMub3BlbkRlbGltaXRlcnx8X0RFRkFVTFRfT1BFTl9ERUxJTUlURVI7b3B0aW9ucy5jbG9zZURlbGltaXRlcj1vcHRzLmNsb3NlRGVsaW1pdGVyfHxleHBvcnRzLmNsb3NlRGVsaW1pdGVyfHxfREVGQVVMVF9DTE9TRV9ERUxJTUlURVI7b3B0aW9ucy5kZWxpbWl0ZXI9b3B0cy5kZWxpbWl0ZXJ8fGV4cG9ydHMuZGVsaW1pdGVyfHxfREVGQVVMVF9ERUxJTUlURVI7b3B0aW9ucy5zdHJpY3Q9b3B0cy5zdHJpY3R8fGZhbHNlO29wdGlvbnMuY29udGV4dD1vcHRzLmNvbnRleHQ7b3B0aW9ucy5jYWNoZT1vcHRzLmNhY2hlfHxmYWxzZTtvcHRpb25zLnJtV2hpdGVzcGFjZT1vcHRzLnJtV2hpdGVzcGFjZTtvcHRpb25zLnJvb3Q9b3B0cy5yb290O29wdGlvbnMuaW5jbHVkZXI9b3B0cy5pbmNsdWRlcjtvcHRpb25zLm91dHB1dEZ1bmN0aW9uTmFtZT1vcHRzLm91dHB1dEZ1bmN0aW9uTmFtZTtvcHRpb25zLmxvY2Fsc05hbWU9b3B0cy5sb2NhbHNOYW1lfHxleHBvcnRzLmxvY2Fsc05hbWV8fF9ERUZBVUxUX0xPQ0FMU19OQU1FO29wdGlvbnMudmlld3M9b3B0cy52aWV3cztvcHRpb25zLmFzeW5jPW9wdHMuYXN5bmM7b3B0aW9ucy5kZXN0cnVjdHVyZWRMb2NhbHM9b3B0cy5kZXN0cnVjdHVyZWRMb2NhbHM7b3B0aW9ucy5sZWdhY3lJbmNsdWRlPXR5cGVvZiBvcHRzLmxlZ2FjeUluY2x1ZGUhPVwidW5kZWZpbmVkXCI/ISFvcHRzLmxlZ2FjeUluY2x1ZGU6dHJ1ZTtpZihvcHRpb25zLnN0cmljdCl7b3B0aW9ucy5fd2l0aD1mYWxzZX1lbHNle29wdGlvbnMuX3dpdGg9dHlwZW9mIG9wdHMuX3dpdGghPVwidW5kZWZpbmVkXCI/b3B0cy5fd2l0aDp0cnVlfXRoaXMub3B0cz1vcHRpb25zO3RoaXMucmVnZXg9dGhpcy5jcmVhdGVSZWdleCgpfVRlbXBsYXRlLm1vZGVzPXtFVkFMOlwiZXZhbFwiLEVTQ0FQRUQ6XCJlc2NhcGVkXCIsUkFXOlwicmF3XCIsQ09NTUVOVDpcImNvbW1lbnRcIixMSVRFUkFMOlwibGl0ZXJhbFwifTtUZW1wbGF0ZS5wcm90b3R5cGU9e2NyZWF0ZVJlZ2V4OmZ1bmN0aW9uKCl7dmFyIHN0cj1fUkVHRVhfU1RSSU5HO3ZhciBkZWxpbT11dGlscy5lc2NhcGVSZWdFeHBDaGFycyh0aGlzLm9wdHMuZGVsaW1pdGVyKTt2YXIgb3Blbj11dGlscy5lc2NhcGVSZWdFeHBDaGFycyh0aGlzLm9wdHMub3BlbkRlbGltaXRlcik7dmFyIGNsb3NlPXV0aWxzLmVzY2FwZVJlZ0V4cENoYXJzKHRoaXMub3B0cy5jbG9zZURlbGltaXRlcik7c3RyPXN0ci5yZXBsYWNlKC8lL2csZGVsaW0pLnJlcGxhY2UoLzwvZyxvcGVuKS5yZXBsYWNlKC8+L2csY2xvc2UpO3JldHVybiBuZXcgUmVnRXhwKHN0cil9LGNvbXBpbGU6ZnVuY3Rpb24oKXt2YXIgc3JjO3ZhciBmbjt2YXIgb3B0cz10aGlzLm9wdHM7dmFyIHByZXBlbmRlZD1cIlwiO3ZhciBhcHBlbmRlZD1cIlwiO3ZhciBlc2NhcGVGbj1vcHRzLmVzY2FwZUZ1bmN0aW9uO3ZhciBjdG9yO3ZhciBzYW5pdGl6ZWRGaWxlbmFtZT1vcHRzLmZpbGVuYW1lP0pTT04uc3RyaW5naWZ5KG9wdHMuZmlsZW5hbWUpOlwidW5kZWZpbmVkXCI7aWYoIXRoaXMuc291cmNlKXt0aGlzLmdlbmVyYXRlU291cmNlKCk7cHJlcGVuZGVkKz0nICB2YXIgX19vdXRwdXQgPSBcIlwiO1xcbicrXCIgIGZ1bmN0aW9uIF9fYXBwZW5kKHMpIHsgaWYgKHMgIT09IHVuZGVmaW5lZCAmJiBzICE9PSBudWxsKSBfX291dHB1dCArPSBzIH1cXG5cIjtpZihvcHRzLm91dHB1dEZ1bmN0aW9uTmFtZSl7aWYoIV9KU19JREVOVElGSUVSLnRlc3Qob3B0cy5vdXRwdXRGdW5jdGlvbk5hbWUpKXt0aHJvdyBuZXcgRXJyb3IoXCJvdXRwdXRGdW5jdGlvbk5hbWUgaXMgbm90IGEgdmFsaWQgSlMgaWRlbnRpZmllci5cIil9cHJlcGVuZGVkKz1cIiAgdmFyIFwiK29wdHMub3V0cHV0RnVuY3Rpb25OYW1lK1wiID0gX19hcHBlbmQ7XCIrXCJcXG5cIn1pZihvcHRzLmxvY2Fsc05hbWUmJiFfSlNfSURFTlRJRklFUi50ZXN0KG9wdHMubG9jYWxzTmFtZSkpe3Rocm93IG5ldyBFcnJvcihcImxvY2Fsc05hbWUgaXMgbm90IGEgdmFsaWQgSlMgaWRlbnRpZmllci5cIil9aWYob3B0cy5kZXN0cnVjdHVyZWRMb2NhbHMmJm9wdHMuZGVzdHJ1Y3R1cmVkTG9jYWxzLmxlbmd0aCl7dmFyIGRlc3RydWN0dXJpbmc9XCIgIHZhciBfX2xvY2FscyA9IChcIitvcHRzLmxvY2Fsc05hbWUrXCIgfHwge30pLFxcblwiO2Zvcih2YXIgaT0wO2k8b3B0cy5kZXN0cnVjdHVyZWRMb2NhbHMubGVuZ3RoO2krKyl7dmFyIG5hbWU9b3B0cy5kZXN0cnVjdHVyZWRMb2NhbHNbaV07aWYoIV9KU19JREVOVElGSUVSLnRlc3QobmFtZSkpe3Rocm93IG5ldyBFcnJvcihcImRlc3RydWN0dXJlZExvY2Fsc1tcIitpK1wiXSBpcyBub3QgYSB2YWxpZCBKUyBpZGVudGlmaWVyLlwiKX1pZihpPjApe2Rlc3RydWN0dXJpbmcrPVwiLFxcbiAgXCJ9ZGVzdHJ1Y3R1cmluZys9bmFtZStcIiA9IF9fbG9jYWxzLlwiK25hbWV9cHJlcGVuZGVkKz1kZXN0cnVjdHVyaW5nK1wiO1xcblwifWlmKG9wdHMuX3dpdGghPT1mYWxzZSl7cHJlcGVuZGVkKz1cIiAgd2l0aCAoXCIrb3B0cy5sb2NhbHNOYW1lK1wiIHx8IHt9KSB7XCIrXCJcXG5cIjthcHBlbmRlZCs9XCIgIH1cIitcIlxcblwifWFwcGVuZGVkKz1cIiAgcmV0dXJuIF9fb3V0cHV0O1wiK1wiXFxuXCI7dGhpcy5zb3VyY2U9cHJlcGVuZGVkK3RoaXMuc291cmNlK2FwcGVuZGVkfWlmKG9wdHMuY29tcGlsZURlYnVnKXtzcmM9XCJ2YXIgX19saW5lID0gMVwiK1wiXFxuXCIrXCIgICwgX19saW5lcyA9IFwiK0pTT04uc3RyaW5naWZ5KHRoaXMudGVtcGxhdGVUZXh0KStcIlxcblwiK1wiICAsIF9fZmlsZW5hbWUgPSBcIitzYW5pdGl6ZWRGaWxlbmFtZStcIjtcIitcIlxcblwiK1widHJ5IHtcIitcIlxcblwiK3RoaXMuc291cmNlK1wifSBjYXRjaCAoZSkge1wiK1wiXFxuXCIrXCIgIHJldGhyb3coZSwgX19saW5lcywgX19maWxlbmFtZSwgX19saW5lLCBlc2NhcGVGbik7XCIrXCJcXG5cIitcIn1cIitcIlxcblwifWVsc2V7c3JjPXRoaXMuc291cmNlfWlmKG9wdHMuY2xpZW50KXtzcmM9XCJlc2NhcGVGbiA9IGVzY2FwZUZuIHx8IFwiK2VzY2FwZUZuLnRvU3RyaW5nKCkrXCI7XCIrXCJcXG5cIitzcmM7aWYob3B0cy5jb21waWxlRGVidWcpe3NyYz1cInJldGhyb3cgPSByZXRocm93IHx8IFwiK3JldGhyb3cudG9TdHJpbmcoKStcIjtcIitcIlxcblwiK3NyY319aWYob3B0cy5zdHJpY3Qpe3NyYz0nXCJ1c2Ugc3RyaWN0XCI7XFxuJytzcmN9aWYob3B0cy5kZWJ1Zyl7Y29uc29sZS5sb2coc3JjKX1pZihvcHRzLmNvbXBpbGVEZWJ1ZyYmb3B0cy5maWxlbmFtZSl7c3JjPXNyYytcIlxcblwiK1wiLy8jIHNvdXJjZVVSTD1cIitzYW5pdGl6ZWRGaWxlbmFtZStcIlxcblwifXRyeXtpZihvcHRzLmFzeW5jKXt0cnl7Y3Rvcj1uZXcgRnVuY3Rpb24oXCJyZXR1cm4gKGFzeW5jIGZ1bmN0aW9uKCl7fSkuY29uc3RydWN0b3I7XCIpKCl9Y2F0Y2goZSl7aWYoZSBpbnN0YW5jZW9mIFN5bnRheEVycm9yKXt0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIGVudmlyb25tZW50IGRvZXMgbm90IHN1cHBvcnQgYXN5bmMvYXdhaXRcIil9ZWxzZXt0aHJvdyBlfX19ZWxzZXtjdG9yPUZ1bmN0aW9ufWZuPW5ldyBjdG9yKG9wdHMubG9jYWxzTmFtZStcIiwgZXNjYXBlRm4sIGluY2x1ZGUsIHJldGhyb3dcIixzcmMpfWNhdGNoKGUpe2lmKGUgaW5zdGFuY2VvZiBTeW50YXhFcnJvcil7aWYob3B0cy5maWxlbmFtZSl7ZS5tZXNzYWdlKz1cIiBpbiBcIitvcHRzLmZpbGVuYW1lfWUubWVzc2FnZSs9XCIgd2hpbGUgY29tcGlsaW5nIGVqc1xcblxcblwiO2UubWVzc2FnZSs9XCJJZiB0aGUgYWJvdmUgZXJyb3IgaXMgbm90IGhlbHBmdWwsIHlvdSBtYXkgd2FudCB0byB0cnkgRUpTLUxpbnQ6XFxuXCI7ZS5tZXNzYWdlKz1cImh0dHBzOi8vZ2l0aHViLmNvbS9SeWFuWmltL0VKUy1MaW50XCI7aWYoIW9wdHMuYXN5bmMpe2UubWVzc2FnZSs9XCJcXG5cIjtlLm1lc3NhZ2UrPVwiT3IsIGlmIHlvdSBtZWFudCB0byBjcmVhdGUgYW4gYXN5bmMgZnVuY3Rpb24sIHBhc3MgYGFzeW5jOiB0cnVlYCBhcyBhbiBvcHRpb24uXCJ9fXRocm93IGV9dmFyIHJldHVybmVkRm49b3B0cy5jbGllbnQ/Zm46ZnVuY3Rpb24gYW5vbnltb3VzKGRhdGEpe3ZhciBpbmNsdWRlPWZ1bmN0aW9uKHBhdGgsaW5jbHVkZURhdGEpe3ZhciBkPXV0aWxzLnNoYWxsb3dDb3B5KHV0aWxzLmNyZWF0ZU51bGxQcm90b09ialdoZXJlUG9zc2libGUoKSxkYXRhKTtpZihpbmNsdWRlRGF0YSl7ZD11dGlscy5zaGFsbG93Q29weShkLGluY2x1ZGVEYXRhKX1yZXR1cm4gaW5jbHVkZUZpbGUocGF0aCxvcHRzKShkKX07cmV0dXJuIGZuLmFwcGx5KG9wdHMuY29udGV4dCxbZGF0YXx8dXRpbHMuY3JlYXRlTnVsbFByb3RvT2JqV2hlcmVQb3NzaWJsZSgpLGVzY2FwZUZuLGluY2x1ZGUscmV0aHJvd10pfTtpZihvcHRzLmZpbGVuYW1lJiZ0eXBlb2YgT2JqZWN0LmRlZmluZVByb3BlcnR5PT09XCJmdW5jdGlvblwiKXt2YXIgZmlsZW5hbWU9b3B0cy5maWxlbmFtZTt2YXIgYmFzZW5hbWU9cGF0aC5iYXNlbmFtZShmaWxlbmFtZSxwYXRoLmV4dG5hbWUoZmlsZW5hbWUpKTt0cnl7T2JqZWN0LmRlZmluZVByb3BlcnR5KHJldHVybmVkRm4sXCJuYW1lXCIse3ZhbHVlOmJhc2VuYW1lLHdyaXRhYmxlOmZhbHNlLGVudW1lcmFibGU6ZmFsc2UsY29uZmlndXJhYmxlOnRydWV9KX1jYXRjaChlKXt9fXJldHVybiByZXR1cm5lZEZufSxnZW5lcmF0ZVNvdXJjZTpmdW5jdGlvbigpe3ZhciBvcHRzPXRoaXMub3B0cztpZihvcHRzLnJtV2hpdGVzcGFjZSl7dGhpcy50ZW1wbGF0ZVRleHQ9dGhpcy50ZW1wbGF0ZVRleHQucmVwbGFjZSgvW1xcclxcbl0rL2csXCJcXG5cIikucmVwbGFjZSgvXlxccyt8XFxzKyQvZ20sXCJcIil9dGhpcy50ZW1wbGF0ZVRleHQ9dGhpcy50ZW1wbGF0ZVRleHQucmVwbGFjZSgvWyBcXHRdKjwlXy9nbSxcIjwlX1wiKS5yZXBsYWNlKC9fJT5bIFxcdF0qL2dtLFwiXyU+XCIpO3ZhciBzZWxmPXRoaXM7dmFyIG1hdGNoZXM9dGhpcy5wYXJzZVRlbXBsYXRlVGV4dCgpO3ZhciBkPXRoaXMub3B0cy5kZWxpbWl0ZXI7dmFyIG89dGhpcy5vcHRzLm9wZW5EZWxpbWl0ZXI7dmFyIGM9dGhpcy5vcHRzLmNsb3NlRGVsaW1pdGVyO2lmKG1hdGNoZXMmJm1hdGNoZXMubGVuZ3RoKXttYXRjaGVzLmZvckVhY2goZnVuY3Rpb24obGluZSxpbmRleCl7dmFyIGNsb3Npbmc7aWYobGluZS5pbmRleE9mKG8rZCk9PT0wJiZsaW5lLmluZGV4T2YobytkK2QpIT09MCl7Y2xvc2luZz1tYXRjaGVzW2luZGV4KzJdO2lmKCEoY2xvc2luZz09ZCtjfHxjbG9zaW5nPT1cIi1cIitkK2N8fGNsb3Npbmc9PVwiX1wiK2QrYykpe3Rocm93IG5ldyBFcnJvcignQ291bGQgbm90IGZpbmQgbWF0Y2hpbmcgY2xvc2UgdGFnIGZvciBcIicrbGluZSsnXCIuJyl9fXNlbGYuc2NhbkxpbmUobGluZSl9KX19LHBhcnNlVGVtcGxhdGVUZXh0OmZ1bmN0aW9uKCl7dmFyIHN0cj10aGlzLnRlbXBsYXRlVGV4dDt2YXIgcGF0PXRoaXMucmVnZXg7dmFyIHJlc3VsdD1wYXQuZXhlYyhzdHIpO3ZhciBhcnI9W107dmFyIGZpcnN0UG9zO3doaWxlKHJlc3VsdCl7Zmlyc3RQb3M9cmVzdWx0LmluZGV4O2lmKGZpcnN0UG9zIT09MCl7YXJyLnB1c2goc3RyLnN1YnN0cmluZygwLGZpcnN0UG9zKSk7c3RyPXN0ci5zbGljZShmaXJzdFBvcyl9YXJyLnB1c2gocmVzdWx0WzBdKTtzdHI9c3RyLnNsaWNlKHJlc3VsdFswXS5sZW5ndGgpO3Jlc3VsdD1wYXQuZXhlYyhzdHIpfWlmKHN0cil7YXJyLnB1c2goc3RyKX1yZXR1cm4gYXJyfSxfYWRkT3V0cHV0OmZ1bmN0aW9uKGxpbmUpe2lmKHRoaXMudHJ1bmNhdGUpe2xpbmU9bGluZS5yZXBsYWNlKC9eKD86XFxyXFxufFxccnxcXG4pLyxcIlwiKTt0aGlzLnRydW5jYXRlPWZhbHNlfWlmKCFsaW5lKXtyZXR1cm4gbGluZX1saW5lPWxpbmUucmVwbGFjZSgvXFxcXC9nLFwiXFxcXFxcXFxcIik7bGluZT1saW5lLnJlcGxhY2UoL1xcbi9nLFwiXFxcXG5cIik7bGluZT1saW5lLnJlcGxhY2UoL1xcci9nLFwiXFxcXHJcIik7bGluZT1saW5lLnJlcGxhY2UoL1wiL2csJ1xcXFxcIicpO3RoaXMuc291cmNlKz0nICAgIDsgX19hcHBlbmQoXCInK2xpbmUrJ1wiKScrXCJcXG5cIn0sc2NhbkxpbmU6ZnVuY3Rpb24obGluZSl7dmFyIHNlbGY9dGhpczt2YXIgZD10aGlzLm9wdHMuZGVsaW1pdGVyO3ZhciBvPXRoaXMub3B0cy5vcGVuRGVsaW1pdGVyO3ZhciBjPXRoaXMub3B0cy5jbG9zZURlbGltaXRlcjt2YXIgbmV3TGluZUNvdW50PTA7bmV3TGluZUNvdW50PWxpbmUuc3BsaXQoXCJcXG5cIikubGVuZ3RoLTE7c3dpdGNoKGxpbmUpe2Nhc2UgbytkOmNhc2UgbytkK1wiX1wiOnRoaXMubW9kZT1UZW1wbGF0ZS5tb2Rlcy5FVkFMO2JyZWFrO2Nhc2UgbytkK1wiPVwiOnRoaXMubW9kZT1UZW1wbGF0ZS5tb2Rlcy5FU0NBUEVEO2JyZWFrO2Nhc2UgbytkK1wiLVwiOnRoaXMubW9kZT1UZW1wbGF0ZS5tb2Rlcy5SQVc7YnJlYWs7Y2FzZSBvK2QrXCIjXCI6dGhpcy5tb2RlPVRlbXBsYXRlLm1vZGVzLkNPTU1FTlQ7YnJlYWs7Y2FzZSBvK2QrZDp0aGlzLm1vZGU9VGVtcGxhdGUubW9kZXMuTElURVJBTDt0aGlzLnNvdXJjZSs9JyAgICA7IF9fYXBwZW5kKFwiJytsaW5lLnJlcGxhY2UobytkK2QsbytkKSsnXCIpJytcIlxcblwiO2JyZWFrO2Nhc2UgZCtkK2M6dGhpcy5tb2RlPVRlbXBsYXRlLm1vZGVzLkxJVEVSQUw7dGhpcy5zb3VyY2UrPScgICAgOyBfX2FwcGVuZChcIicrbGluZS5yZXBsYWNlKGQrZCtjLGQrYykrJ1wiKScrXCJcXG5cIjticmVhaztjYXNlIGQrYzpjYXNlXCItXCIrZCtjOmNhc2VcIl9cIitkK2M6aWYodGhpcy5tb2RlPT1UZW1wbGF0ZS5tb2Rlcy5MSVRFUkFMKXt0aGlzLl9hZGRPdXRwdXQobGluZSl9dGhpcy5tb2RlPW51bGw7dGhpcy50cnVuY2F0ZT1saW5lLmluZGV4T2YoXCItXCIpPT09MHx8bGluZS5pbmRleE9mKFwiX1wiKT09PTA7YnJlYWs7ZGVmYXVsdDppZih0aGlzLm1vZGUpe3N3aXRjaCh0aGlzLm1vZGUpe2Nhc2UgVGVtcGxhdGUubW9kZXMuRVZBTDpjYXNlIFRlbXBsYXRlLm1vZGVzLkVTQ0FQRUQ6Y2FzZSBUZW1wbGF0ZS5tb2Rlcy5SQVc6aWYobGluZS5sYXN0SW5kZXhPZihcIi8vXCIpPmxpbmUubGFzdEluZGV4T2YoXCJcXG5cIikpe2xpbmUrPVwiXFxuXCJ9fXN3aXRjaCh0aGlzLm1vZGUpe2Nhc2UgVGVtcGxhdGUubW9kZXMuRVZBTDp0aGlzLnNvdXJjZSs9XCIgICAgOyBcIitsaW5lK1wiXFxuXCI7YnJlYWs7Y2FzZSBUZW1wbGF0ZS5tb2Rlcy5FU0NBUEVEOnRoaXMuc291cmNlKz1cIiAgICA7IF9fYXBwZW5kKGVzY2FwZUZuKFwiK3N0cmlwU2VtaShsaW5lKStcIikpXCIrXCJcXG5cIjticmVhaztjYXNlIFRlbXBsYXRlLm1vZGVzLlJBVzp0aGlzLnNvdXJjZSs9XCIgICAgOyBfX2FwcGVuZChcIitzdHJpcFNlbWkobGluZSkrXCIpXCIrXCJcXG5cIjticmVhaztjYXNlIFRlbXBsYXRlLm1vZGVzLkNPTU1FTlQ6YnJlYWs7Y2FzZSBUZW1wbGF0ZS5tb2Rlcy5MSVRFUkFMOnRoaXMuX2FkZE91dHB1dChsaW5lKTticmVha319ZWxzZXt0aGlzLl9hZGRPdXRwdXQobGluZSl9fWlmKHNlbGYub3B0cy5jb21waWxlRGVidWcmJm5ld0xpbmVDb3VudCl7dGhpcy5jdXJyZW50TGluZSs9bmV3TGluZUNvdW50O3RoaXMuc291cmNlKz1cIiAgICA7IF9fbGluZSA9IFwiK3RoaXMuY3VycmVudExpbmUrXCJcXG5cIn19fTtleHBvcnRzLmVzY2FwZVhNTD11dGlscy5lc2NhcGVYTUw7ZXhwb3J0cy5fX2V4cHJlc3M9ZXhwb3J0cy5yZW5kZXJGaWxlO2V4cG9ydHMuVkVSU0lPTj1fVkVSU0lPTl9TVFJJTkc7ZXhwb3J0cy5uYW1lPV9OQU1FO2lmKHR5cGVvZiB3aW5kb3chPVwidW5kZWZpbmVkXCIpe3dpbmRvdy5lanM9ZXhwb3J0c319LHtcIi4uL3BhY2thZ2UuanNvblwiOjYsXCIuL3V0aWxzXCI6MixmczozLHBhdGg6NH1dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1widXNlIHN0cmljdFwiO3ZhciByZWdFeHBDaGFycz0vW3xcXFxce30oKVtcXF1eJCsqPy5dL2c7dmFyIGhhc093blByb3BlcnR5PU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7dmFyIGhhc093bj1mdW5jdGlvbihvYmosa2V5KXtyZXR1cm4gaGFzT3duUHJvcGVydHkuYXBwbHkob2JqLFtrZXldKX07ZXhwb3J0cy5lc2NhcGVSZWdFeHBDaGFycz1mdW5jdGlvbihzdHJpbmcpe2lmKCFzdHJpbmcpe3JldHVyblwiXCJ9cmV0dXJuIFN0cmluZyhzdHJpbmcpLnJlcGxhY2UocmVnRXhwQ2hhcnMsXCJcXFxcJCZcIil9O3ZhciBfRU5DT0RFX0hUTUxfUlVMRVM9e1wiJlwiOlwiJmFtcDtcIixcIjxcIjpcIiZsdDtcIixcIj5cIjpcIiZndDtcIiwnXCInOlwiJiMzNDtcIixcIidcIjpcIiYjMzk7XCJ9O3ZhciBfTUFUQ0hfSFRNTD0vWyY8PidcIl0vZztmdW5jdGlvbiBlbmNvZGVfY2hhcihjKXtyZXR1cm4gX0VOQ09ERV9IVE1MX1JVTEVTW2NdfHxjfXZhciBlc2NhcGVGdW5jU3RyPVwidmFyIF9FTkNPREVfSFRNTF9SVUxFUyA9IHtcXG5cIisnICAgICAgXCImXCI6IFwiJmFtcDtcIlxcbicrJyAgICAsIFwiPFwiOiBcIiZsdDtcIlxcbicrJyAgICAsIFwiPlwiOiBcIiZndDtcIlxcbicrJyAgICAsIFxcJ1wiXFwnOiBcIiYjMzQ7XCJcXG4nKycgICAgLCBcIlxcJ1wiOiBcIiYjMzk7XCJcXG4nK1wiICAgIH1cXG5cIitcIiAgLCBfTUFUQ0hfSFRNTCA9IC9bJjw+J1xcXCJdL2c7XFxuXCIrXCJmdW5jdGlvbiBlbmNvZGVfY2hhcihjKSB7XFxuXCIrXCIgIHJldHVybiBfRU5DT0RFX0hUTUxfUlVMRVNbY10gfHwgYztcXG5cIitcIn07XFxuXCI7ZXhwb3J0cy5lc2NhcGVYTUw9ZnVuY3Rpb24obWFya3VwKXtyZXR1cm4gbWFya3VwPT11bmRlZmluZWQ/XCJcIjpTdHJpbmcobWFya3VwKS5yZXBsYWNlKF9NQVRDSF9IVE1MLGVuY29kZV9jaGFyKX07ZnVuY3Rpb24gZXNjYXBlWE1MVG9TdHJpbmcoKXtyZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodGhpcykrXCI7XFxuXCIrZXNjYXBlRnVuY1N0cn10cnl7aWYodHlwZW9mIE9iamVjdC5kZWZpbmVQcm9wZXJ0eT09PVwiZnVuY3Rpb25cIil7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMuZXNjYXBlWE1MLFwidG9TdHJpbmdcIix7dmFsdWU6ZXNjYXBlWE1MVG9TdHJpbmd9KX1lbHNle2V4cG9ydHMuZXNjYXBlWE1MLnRvU3RyaW5nPWVzY2FwZVhNTFRvU3RyaW5nfX1jYXRjaChlcnIpe2NvbnNvbGUud2FybihcIlVuYWJsZSB0byBzZXQgZXNjYXBlWE1MLnRvU3RyaW5nIChpcyB0aGUgRnVuY3Rpb24gcHJvdG90eXBlIGZyb3plbj8pXCIpfWV4cG9ydHMuc2hhbGxvd0NvcHk9ZnVuY3Rpb24odG8sZnJvbSl7ZnJvbT1mcm9tfHx7fTtpZih0byE9PW51bGwmJnRvIT09dW5kZWZpbmVkKXtmb3IodmFyIHAgaW4gZnJvbSl7aWYoIWhhc093bihmcm9tLHApKXtjb250aW51ZX1pZihwPT09XCJfX3Byb3RvX19cInx8cD09PVwiY29uc3RydWN0b3JcIil7Y29udGludWV9dG9bcF09ZnJvbVtwXX19cmV0dXJuIHRvfTtleHBvcnRzLnNoYWxsb3dDb3B5RnJvbUxpc3Q9ZnVuY3Rpb24odG8sZnJvbSxsaXN0KXtsaXN0PWxpc3R8fFtdO2Zyb209ZnJvbXx8e307aWYodG8hPT1udWxsJiZ0byE9PXVuZGVmaW5lZCl7Zm9yKHZhciBpPTA7aTxsaXN0Lmxlbmd0aDtpKyspe3ZhciBwPWxpc3RbaV07aWYodHlwZW9mIGZyb21bcF0hPVwidW5kZWZpbmVkXCIpe2lmKCFoYXNPd24oZnJvbSxwKSl7Y29udGludWV9aWYocD09PVwiX19wcm90b19fXCJ8fHA9PT1cImNvbnN0cnVjdG9yXCIpe2NvbnRpbnVlfXRvW3BdPWZyb21bcF19fX1yZXR1cm4gdG99O2V4cG9ydHMuY2FjaGU9e19kYXRhOnt9LHNldDpmdW5jdGlvbihrZXksdmFsKXt0aGlzLl9kYXRhW2tleV09dmFsfSxnZXQ6ZnVuY3Rpb24oa2V5KXtyZXR1cm4gdGhpcy5fZGF0YVtrZXldfSxyZW1vdmU6ZnVuY3Rpb24oa2V5KXtkZWxldGUgdGhpcy5fZGF0YVtrZXldfSxyZXNldDpmdW5jdGlvbigpe3RoaXMuX2RhdGE9e319fTtleHBvcnRzLmh5cGhlblRvQ2FtZWw9ZnVuY3Rpb24oc3RyKXtyZXR1cm4gc3RyLnJlcGxhY2UoLy1bYS16XS9nLGZ1bmN0aW9uKG1hdGNoKXtyZXR1cm4gbWF0Y2hbMV0udG9VcHBlckNhc2UoKX0pfTtleHBvcnRzLmNyZWF0ZU51bGxQcm90b09ialdoZXJlUG9zc2libGU9ZnVuY3Rpb24oKXtpZih0eXBlb2YgT2JqZWN0LmNyZWF0ZT09XCJmdW5jdGlvblwiKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gT2JqZWN0LmNyZWF0ZShudWxsKX19aWYoISh7X19wcm90b19fOm51bGx9aW5zdGFuY2VvZiBPYmplY3QpKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm57X19wcm90b19fOm51bGx9fX1yZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm57fX19KCl9LHt9XSwzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXt9LHt9XSw0OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXsoZnVuY3Rpb24ocHJvY2Vzcyl7ZnVuY3Rpb24gbm9ybWFsaXplQXJyYXkocGFydHMsYWxsb3dBYm92ZVJvb3Qpe3ZhciB1cD0wO2Zvcih2YXIgaT1wYXJ0cy5sZW5ndGgtMTtpPj0wO2ktLSl7dmFyIGxhc3Q9cGFydHNbaV07aWYobGFzdD09PVwiLlwiKXtwYXJ0cy5zcGxpY2UoaSwxKX1lbHNlIGlmKGxhc3Q9PT1cIi4uXCIpe3BhcnRzLnNwbGljZShpLDEpO3VwKyt9ZWxzZSBpZih1cCl7cGFydHMuc3BsaWNlKGksMSk7dXAtLX19aWYoYWxsb3dBYm92ZVJvb3Qpe2Zvcig7dXAtLTt1cCl7cGFydHMudW5zaGlmdChcIi4uXCIpfX1yZXR1cm4gcGFydHN9ZXhwb3J0cy5yZXNvbHZlPWZ1bmN0aW9uKCl7dmFyIHJlc29sdmVkUGF0aD1cIlwiLHJlc29sdmVkQWJzb2x1dGU9ZmFsc2U7Zm9yKHZhciBpPWFyZ3VtZW50cy5sZW5ndGgtMTtpPj0tMSYmIXJlc29sdmVkQWJzb2x1dGU7aS0tKXt2YXIgcGF0aD1pPj0wP2FyZ3VtZW50c1tpXTpwcm9jZXNzLmN3ZCgpO2lmKHR5cGVvZiBwYXRoIT09XCJzdHJpbmdcIil7dGhyb3cgbmV3IFR5cGVFcnJvcihcIkFyZ3VtZW50cyB0byBwYXRoLnJlc29sdmUgbXVzdCBiZSBzdHJpbmdzXCIpfWVsc2UgaWYoIXBhdGgpe2NvbnRpbnVlfXJlc29sdmVkUGF0aD1wYXRoK1wiL1wiK3Jlc29sdmVkUGF0aDtyZXNvbHZlZEFic29sdXRlPXBhdGguY2hhckF0KDApPT09XCIvXCJ9cmVzb2x2ZWRQYXRoPW5vcm1hbGl6ZUFycmF5KGZpbHRlcihyZXNvbHZlZFBhdGguc3BsaXQoXCIvXCIpLGZ1bmN0aW9uKHApe3JldHVybiEhcH0pLCFyZXNvbHZlZEFic29sdXRlKS5qb2luKFwiL1wiKTtyZXR1cm4ocmVzb2x2ZWRBYnNvbHV0ZT9cIi9cIjpcIlwiKStyZXNvbHZlZFBhdGh8fFwiLlwifTtleHBvcnRzLm5vcm1hbGl6ZT1mdW5jdGlvbihwYXRoKXt2YXIgaXNBYnNvbHV0ZT1leHBvcnRzLmlzQWJzb2x1dGUocGF0aCksdHJhaWxpbmdTbGFzaD1zdWJzdHIocGF0aCwtMSk9PT1cIi9cIjtwYXRoPW5vcm1hbGl6ZUFycmF5KGZpbHRlcihwYXRoLnNwbGl0KFwiL1wiKSxmdW5jdGlvbihwKXtyZXR1cm4hIXB9KSwhaXNBYnNvbHV0ZSkuam9pbihcIi9cIik7aWYoIXBhdGgmJiFpc0Fic29sdXRlKXtwYXRoPVwiLlwifWlmKHBhdGgmJnRyYWlsaW5nU2xhc2gpe3BhdGgrPVwiL1wifXJldHVybihpc0Fic29sdXRlP1wiL1wiOlwiXCIpK3BhdGh9O2V4cG9ydHMuaXNBYnNvbHV0ZT1mdW5jdGlvbihwYXRoKXtyZXR1cm4gcGF0aC5jaGFyQXQoMCk9PT1cIi9cIn07ZXhwb3J0cy5qb2luPWZ1bmN0aW9uKCl7dmFyIHBhdGhzPUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywwKTtyZXR1cm4gZXhwb3J0cy5ub3JtYWxpemUoZmlsdGVyKHBhdGhzLGZ1bmN0aW9uKHAsaW5kZXgpe2lmKHR5cGVvZiBwIT09XCJzdHJpbmdcIil7dGhyb3cgbmV3IFR5cGVFcnJvcihcIkFyZ3VtZW50cyB0byBwYXRoLmpvaW4gbXVzdCBiZSBzdHJpbmdzXCIpfXJldHVybiBwfSkuam9pbihcIi9cIikpfTtleHBvcnRzLnJlbGF0aXZlPWZ1bmN0aW9uKGZyb20sdG8pe2Zyb209ZXhwb3J0cy5yZXNvbHZlKGZyb20pLnN1YnN0cigxKTt0bz1leHBvcnRzLnJlc29sdmUodG8pLnN1YnN0cigxKTtmdW5jdGlvbiB0cmltKGFycil7dmFyIHN0YXJ0PTA7Zm9yKDtzdGFydDxhcnIubGVuZ3RoO3N0YXJ0Kyspe2lmKGFycltzdGFydF0hPT1cIlwiKWJyZWFrfXZhciBlbmQ9YXJyLmxlbmd0aC0xO2Zvcig7ZW5kPj0wO2VuZC0tKXtpZihhcnJbZW5kXSE9PVwiXCIpYnJlYWt9aWYoc3RhcnQ+ZW5kKXJldHVybltdO3JldHVybiBhcnIuc2xpY2Uoc3RhcnQsZW5kLXN0YXJ0KzEpfXZhciBmcm9tUGFydHM9dHJpbShmcm9tLnNwbGl0KFwiL1wiKSk7dmFyIHRvUGFydHM9dHJpbSh0by5zcGxpdChcIi9cIikpO3ZhciBsZW5ndGg9TWF0aC5taW4oZnJvbVBhcnRzLmxlbmd0aCx0b1BhcnRzLmxlbmd0aCk7dmFyIHNhbWVQYXJ0c0xlbmd0aD1sZW5ndGg7Zm9yKHZhciBpPTA7aTxsZW5ndGg7aSsrKXtpZihmcm9tUGFydHNbaV0hPT10b1BhcnRzW2ldKXtzYW1lUGFydHNMZW5ndGg9aTticmVha319dmFyIG91dHB1dFBhcnRzPVtdO2Zvcih2YXIgaT1zYW1lUGFydHNMZW5ndGg7aTxmcm9tUGFydHMubGVuZ3RoO2krKyl7b3V0cHV0UGFydHMucHVzaChcIi4uXCIpfW91dHB1dFBhcnRzPW91dHB1dFBhcnRzLmNvbmNhdCh0b1BhcnRzLnNsaWNlKHNhbWVQYXJ0c0xlbmd0aCkpO3JldHVybiBvdXRwdXRQYXJ0cy5qb2luKFwiL1wiKX07ZXhwb3J0cy5zZXA9XCIvXCI7ZXhwb3J0cy5kZWxpbWl0ZXI9XCI6XCI7ZXhwb3J0cy5kaXJuYW1lPWZ1bmN0aW9uKHBhdGgpe2lmKHR5cGVvZiBwYXRoIT09XCJzdHJpbmdcIilwYXRoPXBhdGgrXCJcIjtpZihwYXRoLmxlbmd0aD09PTApcmV0dXJuXCIuXCI7dmFyIGNvZGU9cGF0aC5jaGFyQ29kZUF0KDApO3ZhciBoYXNSb290PWNvZGU9PT00Nzt2YXIgZW5kPS0xO3ZhciBtYXRjaGVkU2xhc2g9dHJ1ZTtmb3IodmFyIGk9cGF0aC5sZW5ndGgtMTtpPj0xOy0taSl7Y29kZT1wYXRoLmNoYXJDb2RlQXQoaSk7aWYoY29kZT09PTQ3KXtpZighbWF0Y2hlZFNsYXNoKXtlbmQ9aTticmVha319ZWxzZXttYXRjaGVkU2xhc2g9ZmFsc2V9fWlmKGVuZD09PS0xKXJldHVybiBoYXNSb290P1wiL1wiOlwiLlwiO2lmKGhhc1Jvb3QmJmVuZD09PTEpe3JldHVyblwiL1wifXJldHVybiBwYXRoLnNsaWNlKDAsZW5kKX07ZnVuY3Rpb24gYmFzZW5hbWUocGF0aCl7aWYodHlwZW9mIHBhdGghPT1cInN0cmluZ1wiKXBhdGg9cGF0aCtcIlwiO3ZhciBzdGFydD0wO3ZhciBlbmQ9LTE7dmFyIG1hdGNoZWRTbGFzaD10cnVlO3ZhciBpO2ZvcihpPXBhdGgubGVuZ3RoLTE7aT49MDstLWkpe2lmKHBhdGguY2hhckNvZGVBdChpKT09PTQ3KXtpZighbWF0Y2hlZFNsYXNoKXtzdGFydD1pKzE7YnJlYWt9fWVsc2UgaWYoZW5kPT09LTEpe21hdGNoZWRTbGFzaD1mYWxzZTtlbmQ9aSsxfX1pZihlbmQ9PT0tMSlyZXR1cm5cIlwiO3JldHVybiBwYXRoLnNsaWNlKHN0YXJ0LGVuZCl9ZXhwb3J0cy5iYXNlbmFtZT1mdW5jdGlvbihwYXRoLGV4dCl7dmFyIGY9YmFzZW5hbWUocGF0aCk7aWYoZXh0JiZmLnN1YnN0cigtMSpleHQubGVuZ3RoKT09PWV4dCl7Zj1mLnN1YnN0cigwLGYubGVuZ3RoLWV4dC5sZW5ndGgpfXJldHVybiBmfTtleHBvcnRzLmV4dG5hbWU9ZnVuY3Rpb24ocGF0aCl7aWYodHlwZW9mIHBhdGghPT1cInN0cmluZ1wiKXBhdGg9cGF0aCtcIlwiO3ZhciBzdGFydERvdD0tMTt2YXIgc3RhcnRQYXJ0PTA7dmFyIGVuZD0tMTt2YXIgbWF0Y2hlZFNsYXNoPXRydWU7dmFyIHByZURvdFN0YXRlPTA7Zm9yKHZhciBpPXBhdGgubGVuZ3RoLTE7aT49MDstLWkpe3ZhciBjb2RlPXBhdGguY2hhckNvZGVBdChpKTtpZihjb2RlPT09NDcpe2lmKCFtYXRjaGVkU2xhc2gpe3N0YXJ0UGFydD1pKzE7YnJlYWt9Y29udGludWV9aWYoZW5kPT09LTEpe21hdGNoZWRTbGFzaD1mYWxzZTtlbmQ9aSsxfWlmKGNvZGU9PT00Nil7aWYoc3RhcnREb3Q9PT0tMSlzdGFydERvdD1pO2Vsc2UgaWYocHJlRG90U3RhdGUhPT0xKXByZURvdFN0YXRlPTF9ZWxzZSBpZihzdGFydERvdCE9PS0xKXtwcmVEb3RTdGF0ZT0tMX19aWYoc3RhcnREb3Q9PT0tMXx8ZW5kPT09LTF8fHByZURvdFN0YXRlPT09MHx8cHJlRG90U3RhdGU9PT0xJiZzdGFydERvdD09PWVuZC0xJiZzdGFydERvdD09PXN0YXJ0UGFydCsxKXtyZXR1cm5cIlwifXJldHVybiBwYXRoLnNsaWNlKHN0YXJ0RG90LGVuZCl9O2Z1bmN0aW9uIGZpbHRlcih4cyxmKXtpZih4cy5maWx0ZXIpcmV0dXJuIHhzLmZpbHRlcihmKTt2YXIgcmVzPVtdO2Zvcih2YXIgaT0wO2k8eHMubGVuZ3RoO2krKyl7aWYoZih4c1tpXSxpLHhzKSlyZXMucHVzaCh4c1tpXSl9cmV0dXJuIHJlc312YXIgc3Vic3RyPVwiYWJcIi5zdWJzdHIoLTEpPT09XCJiXCI/ZnVuY3Rpb24oc3RyLHN0YXJ0LGxlbil7cmV0dXJuIHN0ci5zdWJzdHIoc3RhcnQsbGVuKX06ZnVuY3Rpb24oc3RyLHN0YXJ0LGxlbil7aWYoc3RhcnQ8MClzdGFydD1zdHIubGVuZ3RoK3N0YXJ0O3JldHVybiBzdHIuc3Vic3RyKHN0YXJ0LGxlbil9fSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJfcHJvY2Vzc1wiKSl9LHtfcHJvY2Vzczo1fV0sNTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7dmFyIHByb2Nlc3M9bW9kdWxlLmV4cG9ydHM9e307dmFyIGNhY2hlZFNldFRpbWVvdXQ7dmFyIGNhY2hlZENsZWFyVGltZW91dDtmdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCl7dGhyb3cgbmV3IEVycm9yKFwic2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZFwiKX1mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0KCl7dGhyb3cgbmV3IEVycm9yKFwiY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkXCIpfShmdW5jdGlvbigpe3RyeXtpZih0eXBlb2Ygc2V0VGltZW91dD09PVwiZnVuY3Rpb25cIil7Y2FjaGVkU2V0VGltZW91dD1zZXRUaW1lb3V0fWVsc2V7Y2FjaGVkU2V0VGltZW91dD1kZWZhdWx0U2V0VGltb3V0fX1jYXRjaChlKXtjYWNoZWRTZXRUaW1lb3V0PWRlZmF1bHRTZXRUaW1vdXR9dHJ5e2lmKHR5cGVvZiBjbGVhclRpbWVvdXQ9PT1cImZ1bmN0aW9uXCIpe2NhY2hlZENsZWFyVGltZW91dD1jbGVhclRpbWVvdXR9ZWxzZXtjYWNoZWRDbGVhclRpbWVvdXQ9ZGVmYXVsdENsZWFyVGltZW91dH19Y2F0Y2goZSl7Y2FjaGVkQ2xlYXJUaW1lb3V0PWRlZmF1bHRDbGVhclRpbWVvdXR9fSkoKTtmdW5jdGlvbiBydW5UaW1lb3V0KGZ1bil7aWYoY2FjaGVkU2V0VGltZW91dD09PXNldFRpbWVvdXQpe3JldHVybiBzZXRUaW1lb3V0KGZ1biwwKX1pZigoY2FjaGVkU2V0VGltZW91dD09PWRlZmF1bHRTZXRUaW1vdXR8fCFjYWNoZWRTZXRUaW1lb3V0KSYmc2V0VGltZW91dCl7Y2FjaGVkU2V0VGltZW91dD1zZXRUaW1lb3V0O3JldHVybiBzZXRUaW1lb3V0KGZ1biwwKX10cnl7cmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLDApfWNhdGNoKGUpe3RyeXtyZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsZnVuLDApfWNhdGNoKGUpe3JldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcyxmdW4sMCl9fX1mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKXtpZihjYWNoZWRDbGVhclRpbWVvdXQ9PT1jbGVhclRpbWVvdXQpe3JldHVybiBjbGVhclRpbWVvdXQobWFya2VyKX1pZigoY2FjaGVkQ2xlYXJUaW1lb3V0PT09ZGVmYXVsdENsZWFyVGltZW91dHx8IWNhY2hlZENsZWFyVGltZW91dCkmJmNsZWFyVGltZW91dCl7Y2FjaGVkQ2xlYXJUaW1lb3V0PWNsZWFyVGltZW91dDtyZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcil9dHJ5e3JldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKX1jYXRjaChlKXt0cnl7cmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsbWFya2VyKX1jYXRjaChlKXtyZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcyxtYXJrZXIpfX19dmFyIHF1ZXVlPVtdO3ZhciBkcmFpbmluZz1mYWxzZTt2YXIgY3VycmVudFF1ZXVlO3ZhciBxdWV1ZUluZGV4PS0xO2Z1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpe2lmKCFkcmFpbmluZ3x8IWN1cnJlbnRRdWV1ZSl7cmV0dXJufWRyYWluaW5nPWZhbHNlO2lmKGN1cnJlbnRRdWV1ZS5sZW5ndGgpe3F1ZXVlPWN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpfWVsc2V7cXVldWVJbmRleD0tMX1pZihxdWV1ZS5sZW5ndGgpe2RyYWluUXVldWUoKX19ZnVuY3Rpb24gZHJhaW5RdWV1ZSgpe2lmKGRyYWluaW5nKXtyZXR1cm59dmFyIHRpbWVvdXQ9cnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO2RyYWluaW5nPXRydWU7dmFyIGxlbj1xdWV1ZS5sZW5ndGg7d2hpbGUobGVuKXtjdXJyZW50UXVldWU9cXVldWU7cXVldWU9W107d2hpbGUoKytxdWV1ZUluZGV4PGxlbil7aWYoY3VycmVudFF1ZXVlKXtjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCl9fXF1ZXVlSW5kZXg9LTE7bGVuPXF1ZXVlLmxlbmd0aH1jdXJyZW50UXVldWU9bnVsbDtkcmFpbmluZz1mYWxzZTtydW5DbGVhclRpbWVvdXQodGltZW91dCl9cHJvY2Vzcy5uZXh0VGljaz1mdW5jdGlvbihmdW4pe3ZhciBhcmdzPW5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoLTEpO2lmKGFyZ3VtZW50cy5sZW5ndGg+MSl7Zm9yKHZhciBpPTE7aTxhcmd1bWVudHMubGVuZ3RoO2krKyl7YXJnc1tpLTFdPWFyZ3VtZW50c1tpXX19cXVldWUucHVzaChuZXcgSXRlbShmdW4sYXJncykpO2lmKHF1ZXVlLmxlbmd0aD09PTEmJiFkcmFpbmluZyl7cnVuVGltZW91dChkcmFpblF1ZXVlKX19O2Z1bmN0aW9uIEl0ZW0oZnVuLGFycmF5KXt0aGlzLmZ1bj1mdW47dGhpcy5hcnJheT1hcnJheX1JdGVtLnByb3RvdHlwZS5ydW49ZnVuY3Rpb24oKXt0aGlzLmZ1bi5hcHBseShudWxsLHRoaXMuYXJyYXkpfTtwcm9jZXNzLnRpdGxlPVwiYnJvd3NlclwiO3Byb2Nlc3MuYnJvd3Nlcj10cnVlO3Byb2Nlc3MuZW52PXt9O3Byb2Nlc3MuYXJndj1bXTtwcm9jZXNzLnZlcnNpb249XCJcIjtwcm9jZXNzLnZlcnNpb25zPXt9O2Z1bmN0aW9uIG5vb3AoKXt9cHJvY2Vzcy5vbj1ub29wO3Byb2Nlc3MuYWRkTGlzdGVuZXI9bm9vcDtwcm9jZXNzLm9uY2U9bm9vcDtwcm9jZXNzLm9mZj1ub29wO3Byb2Nlc3MucmVtb3ZlTGlzdGVuZXI9bm9vcDtwcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycz1ub29wO3Byb2Nlc3MuZW1pdD1ub29wO3Byb2Nlc3MucHJlcGVuZExpc3RlbmVyPW5vb3A7cHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyPW5vb3A7cHJvY2Vzcy5saXN0ZW5lcnM9ZnVuY3Rpb24obmFtZSl7cmV0dXJuW119O3Byb2Nlc3MuYmluZGluZz1mdW5jdGlvbihuYW1lKXt0aHJvdyBuZXcgRXJyb3IoXCJwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZFwiKX07cHJvY2Vzcy5jd2Q9ZnVuY3Rpb24oKXtyZXR1cm5cIi9cIn07cHJvY2Vzcy5jaGRpcj1mdW5jdGlvbihkaXIpe3Rocm93IG5ldyBFcnJvcihcInByb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZFwiKX07cHJvY2Vzcy51bWFzaz1mdW5jdGlvbigpe3JldHVybiAwfX0se31dLDY6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe21vZHVsZS5leHBvcnRzPXtuYW1lOlwiZWpzXCIsZGVzY3JpcHRpb246XCJFbWJlZGRlZCBKYXZhU2NyaXB0IHRlbXBsYXRlc1wiLGtleXdvcmRzOltcInRlbXBsYXRlXCIsXCJlbmdpbmVcIixcImVqc1wiXSx2ZXJzaW9uOlwiMy4xLjhcIixhdXRob3I6XCJNYXR0aGV3IEVlcm5pc3NlIDxtZGVAZmxlZWdpeC5vcmc+IChodHRwOi8vZmxlZWdpeC5vcmcpXCIsbGljZW5zZTpcIkFwYWNoZS0yLjBcIixiaW46e2VqczpcIi4vYmluL2NsaS5qc1wifSxtYWluOlwiLi9saWIvZWpzLmpzXCIsanNkZWxpdnI6XCJlanMubWluLmpzXCIsdW5wa2c6XCJlanMubWluLmpzXCIscmVwb3NpdG9yeTp7dHlwZTpcImdpdFwiLHVybDpcImdpdDovL2dpdGh1Yi5jb20vbWRlL2Vqcy5naXRcIn0sYnVnczpcImh0dHBzOi8vZ2l0aHViLmNvbS9tZGUvZWpzL2lzc3Vlc1wiLGhvbWVwYWdlOlwiaHR0cHM6Ly9naXRodWIuY29tL21kZS9lanNcIixkZXBlbmRlbmNpZXM6e2pha2U6XCJeMTAuOC41XCJ9LGRldkRlcGVuZGVuY2llczp7YnJvd3NlcmlmeTpcIl4xNi41LjFcIixlc2xpbnQ6XCJeNi44LjBcIixcImdpdC1kaXJlY3RvcnktZGVwbG95XCI6XCJeMS41LjFcIixqc2RvYzpcIl40LjAuMlwiLFwibHJ1LWNhY2hlXCI6XCJeNC4wLjFcIixtb2NoYTpcIl4xMC4yLjBcIixcInVnbGlmeS1qc1wiOlwiXjMuMy4xNlwifSxlbmdpbmVzOntub2RlOlwiPj0wLjEwLjBcIn0sc2NyaXB0czp7dGVzdDpcIm1vY2hhIC11IHRkZFwifX19LHt9XX0se30sWzFdKSgxKX0pO1xuIiwibGV0IHRwbCA9IE9iamVjdC5jcmVhdGUobnVsbClcbnRwbFsndGFibGUtY29sdW1ucy1mb290ZXIuaHRtbCddID0gJzx0cj4gPCUgJC5lYWNoKGNvbHVtbnMsIGZ1bmN0aW9uKGtleSwgY29sdW1uKSB7ICU+IDx0ZDwlLSBjb2x1bW4uYXR0ciU+PjwlLSBjb2x1bW4ubGFiZWwgJT48L3RkPiA8JSB9KTsgJT4gPC90cj4nXG50cGxbJ3RhYmxlLWNvbHVtbnMuaHRtbCddID0gJzx0ciBjbGFzcz1cImZ3LW1lZGl1bSBiZy13aGl0ZVwiPiA8JSAkLmVhY2goY29sdW1ucywgZnVuY3Rpb24oa2V5LCBjb2x1bW4pIHsgJT4gPHRkPCUtIGNvbHVtbi5hdHRyJT4+PCUtIGNvbHVtbi5sYWJlbCAlPjwvdGQ+IDwlIH0pOyAlPiA8L3RyPidcbnRwbFsndGFibGUtY29udHJvbC5odG1sJ10gPSAnIDxkaXYgaWQ9XCJjb3JldWktdGFibGUtY29udHJvbC08JT0gY29udHJvbC5pZCAlPlwiIGNsYXNzPVwiY29yZXVpLXRhYmxlX19jb250cm9sXCI+IDwlLSBjb250cm9sLmNvbnRlbnQgJT4gPC9kaXY+J1xudHBsWyd0YWJsZS1jb250cm9scy1mb290ZXItb3V0Lmh0bWwnXSA9ICcgPGRpdiBjbGFzcz1cImNvcmV1aS10YWJsZV9fZm9vdGVyIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtYmV0d2VlblwiPiA8JSBpZiAoY29udHJvbHNMZWZ0Lmxlbmd0aCkgeyAlPiA8ZGl2IGNsYXNzPVwiY29yZXVpLXRhYmxlX19jb250cm9scyBkLWZsZXgganVzdGlmeS1jb250ZW50LXN0YXJ0IGdhcC0yIGZsZXgtd3JhcCBmbGV4LWZpbGwgbWItMSBtdC0yIGFsaWduLWl0ZW1zLWNlbnRlclwiPiA8JS0gY29udHJvbHNMZWZ0LmpvaW4oXFwnXFwnKSAlPiA8L2Rpdj4gPCUgfSAlPiA8JSBpZiAoY29udHJvbHNDZW50ZXIubGVuZ3RoKSB7ICU+IDxkaXYgY2xhc3M9XCJjb3JldWktdGFibGVfX2NvbnRyb2xzIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGdhcC0yIGZsZXgtd3JhcCBmbGV4LWZpbGwgbWItMSBtdC0yIGFsaWduLWl0ZW1zLWNlbnRlclwiPiA8JS0gY29udHJvbHNDZW50ZXIuam9pbihcXCdcXCcpICU+IDwvZGl2PiA8JSB9ICU+IDwlIGlmIChjb250cm9sc1JpZ2h0Lmxlbmd0aCkgeyAlPiA8ZGl2IGNsYXNzPVwiY29yZXVpLXRhYmxlX19jb250cm9scyBkLWZsZXgganVzdGlmeS1jb250ZW50LWVuZCBnYXAtMiBmbGV4LXdyYXAgZmxleC1maWxsIG1iLTEgbXQtMiBhbGlnbi1pdGVtcy1jZW50ZXJcIj4gPCUtIGNvbnRyb2xzUmlnaHQuam9pbihcXCdcXCcpICU+IDwvZGl2PiA8JSB9ICU+IDwvZGl2PidcbnRwbFsndGFibGUtY29udHJvbHMtZm9vdGVyLmh0bWwnXSA9ICcgPGRpdiBjbGFzcz1cImNvcmV1aS10YWJsZV9fZm9vdGVyIHBzLTEgcGUtMSBkLWZsZXgganVzdGlmeS1jb250ZW50LWJldHdlZW4gYm9yZGVyLXRvcCBib3JkZXItc2Vjb25kYXJ5LXN1YnRsZVwiPiA8JSBpZiAoY29udHJvbHNMZWZ0Lmxlbmd0aCkgeyAlPiA8ZGl2IGNsYXNzPVwiY29yZXVpLXRhYmxlX19jb250cm9scyBkLWZsZXgganVzdGlmeS1jb250ZW50LXN0YXJ0IGdhcC0yIGZsZXgtd3JhcCBmbGV4LWZpbGwgbWItMSBtdC0xIGFsaWduLWl0ZW1zLWNlbnRlclwiPiA8JS0gY29udHJvbHNMZWZ0LmpvaW4oXFwnXFwnKSAlPiA8L2Rpdj4gPCUgfSAlPiA8JSBpZiAoY29udHJvbHNDZW50ZXIubGVuZ3RoKSB7ICU+IDxkaXYgY2xhc3M9XCJjb3JldWktdGFibGVfX2NvbnRyb2xzIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGdhcC0yIGZsZXgtd3JhcCBmbGV4LWZpbGwgbWItMSBtdC0xIGFsaWduLWl0ZW1zLWNlbnRlclwiPiA8JS0gY29udHJvbHNDZW50ZXIuam9pbihcXCdcXCcpICU+IDwvZGl2PiA8JSB9ICU+IDwlIGlmIChjb250cm9sc1JpZ2h0Lmxlbmd0aCkgeyAlPiA8ZGl2IGNsYXNzPVwiY29yZXVpLXRhYmxlX19jb250cm9scyBkLWZsZXgganVzdGlmeS1jb250ZW50LWVuZCBnYXAtMiBmbGV4LXdyYXAgZmxleC1maWxsIG1iLTEgbXQtMSBhbGlnbi1pdGVtcy1jZW50ZXJcIj4gPCUtIGNvbnRyb2xzUmlnaHQuam9pbihcXCdcXCcpICU+IDwvZGl2PiA8JSB9ICU+IDwvZGl2PidcbnRwbFsndGFibGUtY29udHJvbHMtaGVhZGVyLW91dC5odG1sJ10gPSAnIDxkaXYgY2xhc3M9XCJjb3JldWktdGFibGVfX2hlYWRlciBkLWZsZXgganVzdGlmeS1jb250ZW50LWJldHdlZW5cIj4gPCUgaWYgKGNvbnRyb2xzTGVmdC5sZW5ndGgpIHsgJT4gPGRpdiBjbGFzcz1cImNvcmV1aS10YWJsZV9fY29udHJvbHMgZC1mbGV4IGp1c3RpZnktY29udGVudC1zdGFydCBnYXAtMiBmbGV4LXdyYXAgZmxleC1maWxsIG1iLTIgbXQtMSBhbGlnbi1pdGVtcy1jZW50ZXJcIj4gPCUtIGNvbnRyb2xzTGVmdC5qb2luKFxcJ1xcJykgJT4gPC9kaXY+IDwlIH0gJT4gPCUgaWYgKGNvbnRyb2xzQ2VudGVyLmxlbmd0aCkgeyAlPiA8ZGl2IGNsYXNzPVwiY29yZXVpLXRhYmxlX19jb250cm9scyBkLWZsZXgganVzdGlmeS1jb250ZW50LWNlbnRlciBnYXAtMiBmbGV4LXdyYXAgZmxleC1maWxsIG1iLTIgbXQtMSBhbGlnbi1pdGVtcy1jZW50ZXJcIj4gPCUtIGNvbnRyb2xzQ2VudGVyLmpvaW4oXFwnXFwnKSAlPiA8L2Rpdj4gPCUgfSAlPiA8JSBpZiAoY29udHJvbHNSaWdodC5sZW5ndGgpIHsgJT4gPGRpdiBjbGFzcz1cImNvcmV1aS10YWJsZV9fY29udHJvbHMgZC1mbGV4IGp1c3RpZnktY29udGVudC1lbmQgZ2FwLTIgZmxleC13cmFwIGZsZXgtZmlsbCBtYi0yIG10LTEgYWxpZ24taXRlbXMtY2VudGVyXCI+IDwlLSBjb250cm9sc1JpZ2h0LmpvaW4oXFwnXFwnKSAlPiA8L2Rpdj4gPCUgfSAlPiA8L2Rpdj4nXG50cGxbJ3RhYmxlLWNvbnRyb2xzLWhlYWRlci5odG1sJ10gPSAnIDxkaXYgY2xhc3M9XCJjb3JldWktdGFibGVfX2hlYWRlciBwcy0xIHBlLTEgZC1mbGV4IGp1c3RpZnktY29udGVudC1iZXR3ZWVuIGJvcmRlci1ib3R0b20gYm9yZGVyLXNlY29uZGFyeS1zdWJ0bGVcIj4gPCUgaWYgKGNvbnRyb2xzTGVmdC5sZW5ndGgpIHsgJT4gPGRpdiBjbGFzcz1cImNvcmV1aS10YWJsZV9fY29udHJvbHMgZC1mbGV4IGp1c3RpZnktY29udGVudC1zdGFydCBnYXAtMiBmbGV4LXdyYXAgZmxleC1maWxsIG15LTEgYWxpZ24taXRlbXMtY2VudGVyXCI+IDwlLSBjb250cm9sc0xlZnQuam9pbihcXCdcXCcpICU+IDwvZGl2PiA8JSB9ICU+IDwlIGlmIChjb250cm9sc0NlbnRlci5sZW5ndGgpIHsgJT4gPGRpdiBjbGFzcz1cImNvcmV1aS10YWJsZV9fY29udHJvbHMgZC1mbGV4IGp1c3RpZnktY29udGVudC1jZW50ZXIgZ2FwLTIgZmxleC13cmFwIGZsZXgtZmlsbCBteS0xIGFsaWduLWl0ZW1zLWNlbnRlclwiPiA8JS0gY29udHJvbHNDZW50ZXIuam9pbihcXCdcXCcpICU+IDwvZGl2PiA8JSB9ICU+IDwlIGlmIChjb250cm9sc1JpZ2h0Lmxlbmd0aCkgeyAlPiA8ZGl2IGNsYXNzPVwiY29yZXVpLXRhYmxlX19jb250cm9scyBkLWZsZXgganVzdGlmeS1jb250ZW50LWVuZCBnYXAtMiBmbGV4LXdyYXAgZmxleC1maWxsIG15LTEgYWxpZ24taXRlbXMtY2VudGVyXCI+IDwlLSBjb250cm9sc1JpZ2h0LmpvaW4oXFwnXFwnKSAlPiA8L2Rpdj4gPCUgfSAlPiA8L2Rpdj4nXG50cGxbJ3RhYmxlLWxvYWRlci5odG1sJ10gPSAnPGRpdiBjbGFzcz1cImNvcmV1aS10YWJsZS1sb2NrIHBvc2l0aW9uLWFic29sdXRlIHctMTAwIHRvcC0wIGJvdHRvbS0wXCI+IDxkaXYgY2xhc3M9XCJjb3JldWktdGFibGUtYmxvY2sgYmctc2Vjb25kYXJ5LXN1YnRsZSBwb3NpdGlvbi1hYnNvbHV0ZSBvcGFjaXR5LTUwIHctMTAwIHRvcC0wIGJvdHRvbS0wXCI+PC9kaXY+IDxkaXYgY2xhc3M9XCJjb3JldWktdGFibGUtbWVzc2FnZSBwb3NpdGlvbi1yZWxhdGl2ZSBkLWZsZXggYWxpZ24tY29udGVudC1jZW50ZXIganVzdGlmeS1jb250ZW50LXN0YXJ0IGdhcC0yIG10LTMgcHktMSBweC0yIG0tYXV0byBib3JkZXIgYm9yZGVyLXNlY29uZGFyeS1zdWJ0bGUgcm91bmRlZC0zIGJnLWJvZHktc2Vjb25kYXJ5XCI+IDxkaXYgY2xhc3M9XCJzcGlubmVyLWJvcmRlciB0ZXh0LXNlY29uZGFyeSBhbGlnbi1zZWxmLWNlbnRlclwiPjwvZGl2PiA8c3BhbiBjbGFzcz1cImxoLWxnXCI+PCU9IGxhbmcubG9hZGluZyAlPjwvc3Bhbj4gPC9kaXY+IDwvZGl2PidcbnRwbFsndGFibGUtcmVjb3Jkcy1lbXB0eS5odG1sJ10gPSAnPHRyPiA8dGQgY2xhc3M9XCJ0ZXh0LWNlbnRlclwiIGNvbHNwYW49XCI8JT0gY29sdW1uc0NvdW50ICU+XCI+PCU9IGxhbmcuZW1wdHlSZWNvcmRzICU+PC90ZD4gPC90cj4nXG50cGxbJ3RhYmxlLXJlY29yZHMuaHRtbCddID0gJzwlICQuZWFjaChyZWNvcmRzLCBmdW5jdGlvbihpbmRleCwgcmVjb3JkKSB7ICU+IDx0cjwlLSByZWNvcmQuYXR0ciAlPiBkYXRhLXJlY29yZC1pbmRleD1cIjwlPSBpbmRleCAlPlwiPiA8JSAkLmVhY2gocmVjb3JkLmZpZWxkcywgZnVuY3Rpb24oa2V5MiwgZmllbGQpIHsgJT4gPHRkPCUtIGZpZWxkLmF0dHIgJT4+PCUtIGZpZWxkLmNvbnRlbnQgJT48L3RkPiA8JSB9KTsgJT4gPC90cj4gPCUgfSk7ICU+J1xudHBsWyd0YWJsZS13cmFwcGVyLmh0bWwnXSA9ICcgPGRpdiBpZD1cImNvcmV1aS10YWJsZS08JT0gaWQgJT5cIiBjbGFzcz1cImNvcmV1aS10YWJsZVwiPCUtIHJlbmRlci5hdHRyICU+IDwlIGlmICh3aWR0aFNpemVzKSB7ICU+c3R5bGU9XCI8JT0gd2lkdGhTaXplcy5qb2luKFxcJztcXCcpICU+XCI8JSB9ICU+PiA8JS0gcmVuZGVyLmhlYWRlcnNPdXQuam9pbihcXCdcXCcpICU+IDxkaXYgY2xhc3M9XCJjb3JldWktdGFibGVfX2NvbnRhaW5lciBwb3NpdGlvbi1yZWxhdGl2ZVwiPiA8JS0gcmVuZGVyLmhlYWRlcnNJbi5qb2luKFxcJ1xcJykgJT4gPGRpdiBjbGFzcz1cImNvcmV1aS10YWJsZV9fd3JhcHBlciB0YWJsZS1yZXNwb25zaXZlIG92ZXJmbG93LXgtYXV0b1wiIDwlIGlmIChoZWlnaHRTaXplcykgeyAlPnN0eWxlPVwiPCU9IGhlaWdodFNpemVzLmpvaW4oXFwnO1xcJykgJT5cIjwlIH0gJT4+IDwlLSByZW5kZXIudGFibGUgJT4gPC9kaXY+IDwlLSByZW5kZXIuZm9vdGVyc0luLmpvaW4oXFwnXFwnKSAlPiA8L2Rpdj4gPCUtIHJlbmRlci5mb290ZXJzT3V0LmpvaW4oXFwnXFwnKSAlPiA8L2Rpdj4nXG50cGxbJ3RhYmxlLmh0bWwnXSA9ICcgPHRhYmxlIGNsYXNzPVwidGFibGUgPCU9IGNsYXNzZXMgJT4gbWItMFwiPiA8Y29sZ3JvdXA+IDwlICQuZWFjaChjb2xHcm91cHMsIGZ1bmN0aW9uKGtleSwgY29sdW1uR3JvdXApIHsgJT4gPGNvbDwlIGlmIChjb2x1bW5Hcm91cC53aWR0aCkgeyAlPiBzdHlsZT1cIndpZHRoOiA8JT0gKGNvbHVtbkdyb3VwLndpZHRoLnRvU3RyaW5nKCkgKyBjb2x1bW5Hcm91cC51bml0KSAlPlwiPCUgfSAlPi8+IDwlIH0pOyAlPiA8L2NvbGdyb3VwPiA8JSBpZiAoc2hvdy5jb2x1bW5IZWFkZXJzKSB7ICU+IDx0aGVhZD4gPCUtIGNvbHVtbkdyb3Vwc0hlYWRlciAlPiA8JS0gY29sdW1ucyAlPiA8L3RoZWFkPiA8JSB9ICU+IDx0Ym9keT4gPCUtIHJlY29yZHMgJT4gPC90Ym9keT4gPCUgaWYgKGNvbHVtbkdyb3Vwc0Zvb3RlciAhPSBcXCdcXCcpIHsgJT4gPHRmb290PiA8JS0gY29sdW1uR3JvdXBzRm9vdGVyICU+IDwvdGZvb3Q+IDwlIH0gJT4gPC90YWJsZT4nXG50cGxbJ2NvbnRyb2xzL2J1dHRvbi5odG1sJ10gPSAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCI8JS0gYXR0ciAlPj48JS0gY29udGVudCAlPjwvYnV0dG9uPidcbnRwbFsnY29udHJvbHMvYnV0dG9uX2dyb3VwLmh0bWwnXSA9ICcgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiIHJvbGU9XCJncm91cFwiPiA8JSAkLmVhY2goYnV0dG9ucywgZnVuY3Rpb24oa2V5LCBidXR0b24pIHsgJT4gPCUgaWYgKGJ1dHRvbi50eXBlID09PSBcXCdsaW5rXFwnKSB7ICU+IDxhIGhyZWY9XCI8JT0gYnV0dG9uLmxpbmsgJT5cIjwlLSBidXR0b24uYXR0ciAlPj48JT0gYnV0dG9uLmNvbnRlbnQgJT48L2E+IDwlIH0gZWxzZSBpZiAoYnV0dG9uLnR5cGUgPT09IFxcJ2J1dHRvblxcJykgeyAlPiA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBpZD1cImJ0bi08JT0gYnV0dG9uLmlkICU+XCI8JS0gYnV0dG9uLmF0dHIgJT4+IDwlPSBidXR0b24uY29udGVudCAlPiA8L2J1dHRvbj4gPCUgfSBlbHNlIGlmIChidXR0b24udHlwZSA9PT0gXFwnZHJvcGRvd25cXCcpIHsgJT4gPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiIHJvbGU9XCJncm91cFwiPiA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBkYXRhLWJzLXRvZ2dsZT1cImRyb3Bkb3duXCI8JS0gYnV0dG9uLmF0dHIgJT4+IDwlLSBidXR0b24uY29udGVudCAlPiA8L2J1dHRvbj4gPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiPiA8JSAkLmVhY2goYnV0dG9uLml0ZW1zLCBmdW5jdGlvbihrZXksIGl0ZW0pIHsgJT4gPCUgaWYgKGl0ZW0udHlwZSA9PT0gXFwnbGlua1xcJykgeyAlPiA8bGk+PGEgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgaHJlZj1cIjwlPSBpdGVtLmxpbmsgJT5cIj48JT0gaXRlbS5jb250ZW50ICU+PC9hPjwvbGk+IDwlIH0gZWxzZSBpZiAoaXRlbS50eXBlID09PSBcXCdidXR0b25cXCcpIHsgJT4gPGxpPiA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiBpZD1cImJ0bi1kcm9wZG93bi08JT0gaXRlbS5pZCAlPlwiPiA8JT0gaXRlbS5jb250ZW50ICU+IDwvYnV0dG9uPiA8L2xpPiA8JSB9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gXFwnZGl2aWRlclxcJykgeyAlPiA8bGk+PGhyIGNsYXNzPVwiZHJvcGRvd24tZGl2aWRlclwiPjwvbGk+IDwlIH0gJT4gPCUgfSkgJT4gPC91bD4gPC9kaXY+IDwlIH0gJT4gPCUgfSkgJT4gPC9kaXY+J1xudHBsWydjb250cm9scy9jb2x1bW5zLWNvbnRhaW5lci5odG1sJ10gPSAnIDxkaXYgY2xhc3M9XCJjb3JldWktdGFibGVfX2NvbHVtbnMgcHgtMyBwdC0zIHBiLTRcIj4gPGRpdiBjbGFzcz1cIm1iLTNcIj4gPGRpdiBjbGFzcz1cImZvcm0tY2hlY2sgY29yZXVpLXRhYmxlX19jaGVja19hbGxcIj4gPGxhYmVsIGNsYXNzPVwiZm9ybS1jaGVjay1sYWJlbFwiPiA8aW5wdXQgY2xhc3M9XCJmb3JtLWNoZWNrLWlucHV0XCIgdHlwZT1cImNoZWNrYm94XCIgPCUgaWYgKHNob3dBbGwgPT09IHRydWUpIHsgJT5jaGVja2VkPCUgfSAlPj4gPCU9IGxhbmcuYWxsICU+IDwvbGFiZWw+IDwvZGl2PiA8JSAkLmVhY2goY29sdW1ucywgZnVuY3Rpb24oa2V5LCBjb2x1bW4pIHsgJT4gPGRpdiBjbGFzcz1cImZvcm0tY2hlY2sgY29yZXVpLXRhYmxlX2NoZWNrLWNvbHVtblwiPiA8bGFiZWwgY2xhc3M9XCJmb3JtLWNoZWNrLWxhYmVsXCI+IDxpbnB1dCBjbGFzcz1cImZvcm0tY2hlY2staW5wdXRcIiB0eXBlPVwiY2hlY2tib3hcIiB2YWx1ZT1cIjwlPSBjb2x1bW4uZmllbGQgJT5cIiA8JSBpZiAoY29sdW1uLnNob3cgPT09IHRydWUpIHsgJT5jaGVja2VkPCUgfSAlPj4gPCU9IGNvbHVtbi5sYWJlbCAlPiA8L2xhYmVsPiA8L2Rpdj4gPCUgfSk7ICU+IDwvZGl2PiA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiA8JS0gYnRuQ29tcGxldGVBdHRyICU+PiA8JS0gYnRuQ29tcGxldGVDb250ZW50ICU+IDwvYnV0dG9uPiA8L2Rpdj4nXG50cGxbJ2NvbnRyb2xzL2NvbHVtbnMuaHRtbCddID0gJzxidXR0b24gdHlwZT1cImJ1dHRvblwiPCUtIGJ0bkF0dHIgJT4+PCUtYnRuQ29udGVudCU+PC9idXR0b24+J1xudHBsWydjb250cm9scy9kcm9wZG93bi5odG1sJ10gPSAnIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIiByb2xlPVwiZ3JvdXBcIj4gPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgZGF0YS1icy10b2dnbGU9XCJkcm9wZG93blwiPCUtIGF0dHIgJT4+IDwlLSBjb250ZW50ICU+IDwvYnV0dG9uPiA8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCI+IDwlICQuZWFjaChpdGVtcywgZnVuY3Rpb24oa2V5LCBpdGVtKSB7ICU+IDwlIGlmIChpdGVtLnR5cGUgPT09IFxcJ2xpbmtcXCcpIHsgJT4gPGxpPjxhIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIGhyZWY9XCI8JT0gaXRlbS5saW5rICU+XCI+PCU9IGl0ZW0uY29udGVudCAlPjwvYT48L2xpPiA8JSB9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gXFwnYnV0dG9uXFwnKSB7ICU+IDxsaT4gPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgaWQ9XCJidG4tZHJvcGRvd24tPCU9IGl0ZW0uaWQgJT5cIj4gPCU9IGl0ZW0uY29udGVudCAlPiA8L2J1dHRvbj4gPC9saT4gPCUgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT09IFxcJ2RpdmlkZXJcXCcpIHsgJT4gPGxpPjxociBjbGFzcz1cImRyb3Bkb3duLWRpdmlkZXJcIj48L2xpPiA8JSB9ICU+IDwlIH0pICU+IDwvdWw+IDwvZGl2PidcbnRwbFsnY29udHJvbHMvbGluay5odG1sJ10gPSAnPGEgaHJlZj1cIjwlLSBocmVmICU+XCI8JS0gYXR0ciAlPj48JS0gY29udGVudCAlPjwvYT4nXG50cGxbJ2NvbnRyb2xzL3BhZ2UtanVtcC5odG1sJ10gPSAnIDxkaXYgY2xhc3M9XCJjb3JldWktdGFibGVfX3BhZ2VfanVtcF9jb250YWluZXJcIj4gPGRpdiA8JS0gYXR0ciAlPj4gPGlucHV0IHR5cGU9XCJudW1iZXJcIiBjbGFzcz1cImZvcm0tY29udHJvbCBib3JkZXItc2Vjb25kYXJ5LXN1YnRsZVwiIG1pbj1cIjFcIj4gPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tb3V0bGluZS1zZWNvbmRhcnkgYm9yZGVyLXNlY29uZGFyeS1zdWJ0bGVcIiB0eXBlPVwiYnV0dG9uXCI+IDxpIGNsYXNzPVwiYmkgYmktY2hldnJvbi1jb21wYWN0LXJpZ2h0XCI+PC9pPiA8L2J1dHRvbj4gPC9kaXY+IDwvZGl2PidcbnRwbFsnY29udHJvbHMvcGFnZS1zaXplLmh0bWwnXSA9ICcgPHNlbGVjdCA8JS0gYXR0ciAlPj4gPCUgJC5lYWNoKHJlY29yZHNQZXJQYWdlTGlzdCwgZnVuY3Rpb24oa2V5LCBjb3VudCkgeyAlPiA8b3B0aW9uIHZhbHVlPVwiPCU9IGNvdW50ICU+XCI8JSBpZiAocmVjb3Jkc1BlclBhZ2UgPT0gY291bnQpIHsgJT5zZWxlY3RlZDwlIH0gJT4+IDwlIGlmIChjb3VudCA9PSBcXCcwXFwnKSB7ICU+PCU9IGxhbmcuYWxsICU+PCUgfSBlbHNlIHsgJT48JT0gY291bnQgJT48JSB9ICU+IDwvb3B0aW9uPiA8JSB9KTsgJT4gPC9zZWxlY3Q+J1xudHBsWydjb250cm9scy9wYWdlcy5odG1sJ10gPSAnIDxuYXY+IDx1bCA8JS0gYXR0ciAlPj4gPCUgaWYgKHNob3dQcmV2KSB7ICU+IDxsaSBjbGFzcz1cInBhZ2UtaXRlbSBjb3JldWktdGFibGVfX3BhZ2VfcHJldiA8JSBpZiAoICEgaXNBY3RpdmVQcmV2KSB7ICU+IGRpc2FibGVkPCUgfSAlPlwiPiA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInBhZ2UtbGluayB0ZXh0LXNlY29uZGFyeVwiPiA8aSBjbGFzcz1cImJpIGJpLWNoZXZyb24tbGVmdFwiPjwvaT4gPC9idXR0b24+IDwvbGk+IDwlIH0gJT4gPCUgaWYgKHNob3dQYWdlRmlyc3QpIHsgJT4gPGxpIGNsYXNzPVwicGFnZS1pdGVtXCI+IDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwicGFnZS1saW5rIHRleHQtc2Vjb25kYXJ5IGNvcmV1aS10YWJsZV9fcGFnZVwiPiAxIDwvYnV0dG9uPiA8L2xpPiA8JSB9ICU+IDwlIGlmIChzaG93RGl2aWRlclN0YXJ0KSB7ICU+IDxsaSBjbGFzcz1cInBhZ2UtaXRlbSBkaXNhYmxlZFwiPiA8c3BhbiBjbGFzcz1cInBhZ2UtbGluayB0ZXh0LXNlY29uZGFyeSBweC0xXCI+Li4uPC9zcGFuPiA8L2xpPiA8JSB9ICU+IDwlICQuZWFjaChwYWdlcywgZnVuY3Rpb24oa2V5LCBwYWdlKSB7ICU+IDwlIGlmIChwYWdlID09IGN1cnJlbnRQYWdlKSB7ICU+IDxsaSBjbGFzcz1cInBhZ2UtaXRlbVwiPiA8c3BhbiBjbGFzcz1cInBhZ2UtbGlua1wiPjwlPSBwYWdlICU+PC9zcGFuPiA8L2xpPiA8JSB9IGVsc2UgeyAlPiA8bGkgY2xhc3M9XCJwYWdlLWl0ZW1cIj4gPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJwYWdlLWxpbmsgdGV4dC1zZWNvbmRhcnkgY29yZXVpLXRhYmxlX19wYWdlXCI+IDwlPSBwYWdlICU+IDwvYnV0dG9uPiA8L2xpPiA8JSB9ICU+IDwlIH0pOyAlPiA8JSBpZiAoc2hvd0RpdmlkZXJFbmQpIHsgJT4gPGxpIGNsYXNzPVwicGFnZS1pdGVtIGRpc2FibGVkXCI+IDxzcGFuIGNsYXNzPVwicGFnZS1saW5rIHRleHQtc2Vjb25kYXJ5IHB4LTFcIj4uLi48L3NwYW4+IDwvbGk+IDwlIH0gJT4gPCUgaWYgKHNob3dQYWdlTGFzdCkgeyAlPiA8bGkgY2xhc3M9XCJwYWdlLWl0ZW1cIj4gPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJwYWdlLWxpbmsgdGV4dC1zZWNvbmRhcnkgY29yZXVpLXRhYmxlX19wYWdlXCI+IDwlPSBwYWdlc1RvdGFsICU+IDwvYnV0dG9uPiA8L2xpPiA8JSB9ICU+IDwlIGlmIChzaG93TmV4dCkgeyAlPiA8bGkgY2xhc3M9XCJwYWdlLWl0ZW0gY29yZXVpLXRhYmxlX19wYWdlX25leHQ8JSBpZiAoICEgaXNBY3RpdmVOZXh0KSB7ICU+IGRpc2FibGVkPCUgfSAlPlwiPiA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInBhZ2UtbGluayB0ZXh0LXNlY29uZGFyeVwiPiA8aSBjbGFzcz1cImJpIGJpLWNoZXZyb24tcmlnaHRcIj48L2k+IDwvYnV0dG9uPiA8L2xpPiA8JSB9ICU+IDwvdWw+IDwvbmF2PidcbnRwbFsnY29udHJvbHMvc2VhcmNoLWNvbnRhaW5lci5odG1sJ10gPSAnIDxkaXYgY2xhc3M9XCJjb3JldWktdGFibGVfX3NlYXJjaCBweC0zIHB0LTMgcGItNFwiPiA8ZGl2IGNsYXNzPVwibWItM1wiPiA8JSAkLmVhY2goY29udHJvbHMsIGZ1bmN0aW9uKGtleSwgY29udHJvbCkgeyAlPiA8ZGl2IGNsYXNzPVwibWItMiByb3dcIj4gPGxhYmVsIGNsYXNzPVwiY29sLTEyIGNvbC1tZC0yIGNvbC1mb3JtLWxhYmVsIGZ3LW1lZGl1bSB0ZXh0LXN0YXJ0IHRleHQtbWQtZW5kIHBlLTJcIj4gPCU9IGNvbnRyb2wubGFiZWwgJT4gPCUgaWYgKGNvbnRyb2wuZGVzY3JpcHRpb24pIHsgJT4gPGRpdiBjbGFzcz1cInRleHQtbXV0ZWQgZnctbm9ybWFsXCI+IDxzbWFsbD48JT0gY29udHJvbC5kZXNjcmlwdGlvbiAlPjwvc21hbGw+IDwvZGl2PiA8JSB9ICU+IDwvbGFiZWw+IDxkaXYgY2xhc3M9XCJjb2wtMTIgY29sLW1kLTEwIHNlYXJjaC1jb250cm9sLTwlPSBjb250cm9sLmlkICU+XCI+IDwlLSBjb250cm9sLmNvbnRlbnQgJT4gPCUgaWYgKGNvbnRyb2wucHJlZml4KSB7ICU+IDwlPSBjb250cm9sLnByZWZpeCAlPiA8JSB9ICU+IDwvZGl2PiA8L2Rpdj4gPCUgfSk7ICU+IDwvZGl2PiA8ZGl2IGNsYXNzPVwicm93XCI+IDxkaXYgY2xhc3M9XCJjb2wtMTIgY29sLW1kLTEwIG9mZnNldC0wIG9mZnNldC1tZC0yXCI+IDxidXR0b24gdHlwZT1cImJ1dHRvblwiIDwlLSBidG5Db21wbGV0ZUF0dHIgJT4+IDwlLSBidG5Db21wbGV0ZUNvbnRlbnQgJT4gPC9idXR0b24+IDwvZGl2PiA8L2Rpdj4gPC9kaXY+J1xudHBsWydjb250cm9scy9zZWFyY2guaHRtbCddID0gJzxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj4gPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCI8JS0gYnRuQXR0ciAlPj48JS0gYnRuQ29udGVudCAlPjwvYnV0dG9uPiA8JSBpZiAoc2hvd0NsZWFyKSB7ICU+IDxidXR0b24gdHlwZT1cImJ1dHRvblwiIDwlLSBjbGVhckF0dHIgJT4+IDwlLSBjbGVhckNvbnRlbnQgJT4gPC9idXR0b24+IDwlIH0gJT4gPC9kaXY+ICdcbnRwbFsnY29udHJvbHMvdG90YWwuaHRtbCddID0gJzxkaXYgPCUtIGF0dHIgJT4+IDxzbWFsbD48JT0gbGFuZy50b3RhbCAlPjogPHNwYW4gY2xhc3M9XCJjb3JldWktdGFibGVfX2NvdW50LXRvdGFsXCI+PCU9IHJlY29yZHNUb3RhbCAlPjwvc3Bhbj48L3NtYWxsPiA8L2Rpdj4nXG50cGxbJ2ZpbHRlcnMvY2hlY2tib3guaHRtbCddID0gJyA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCI+IDwlIGlmIChsYWJlbCkgeyAlPiA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLXRleHRcIj48JT0gbGFiZWwgJT48L3NwYW4+IDwlIH0gJT4gPCUgJC5lYWNoKGl0ZW1zLCBmdW5jdGlvbihrZXksIGl0ZW0pIHsgJT4gPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzPVwiYnRuLWNoZWNrXCIgYXV0b2NvbXBsZXRlPVwib2ZmXCIgaWQ9XCI8JT0gKGZpZWxkICsga2V5KSAlPlwiIG5hbWU9XCI8JT0gZmllbGQgJT5cIiB2YWx1ZT1cIjwlPSBpdGVtLnZhbHVlICU+XCIgPCU9IGl0ZW0uY2hlY2tlZCA/IFxcJyBjaGVja2VkXFwnIDogXFwnXFwnICU+PiA8bGFiZWwgY2xhc3M9XCI8JT0gaXRlbS5jbGFzcyAlPlwiIGZvcj1cIjwlPSAoZmllbGQgKyBrZXkpICU+XCI+PCU9IGl0ZW0udGV4dCAlPjwvbGFiZWw+IDwlIH0pOyAlPiA8L2Rpdj4nXG50cGxbJ2ZpbHRlcnMvY2xlYXIuaHRtbCddID0gJyA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiA8JS0gYXR0ciAlPj48JS0gY29udGVudCAlPjwvYnV0dG9uPidcbnRwbFsnZmlsdGVycy9kYXRlLmh0bWwnXSA9ICcgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+IDwlIGlmIChsYWJlbCkgeyAlPiA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLXRleHRcIj48JT0gbGFiZWwgJT48L3NwYW4+IDwlIH0gJT4gPGlucHV0IHR5cGU9XCJkYXRlXCIgPCUtIGF0dHIgJT4+IDwvZGl2PidcbnRwbFsnZmlsdGVycy9kYXRldGltZS5odG1sJ10gPSAnIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPiA8JSBpZiAobGFiZWwpIHsgJT4gPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0XCI+PCU9IGxhYmVsICU+PC9zcGFuPiA8JSB9ICU+IDxpbnB1dCB0eXBlPVwiZGF0ZXRpbWUtbG9jYWxcIiA8JS0gYXR0ciAlPj4gPC9kaXY+J1xudHBsWydmaWx0ZXJzL2RhdGV0aW1lX3JhbmdlLmh0bWwnXSA9ICcgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+IDwlIGlmIChsYWJlbCkgeyAlPiA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLXRleHRcIj48JT0gbGFiZWwgJT48L3NwYW4+IDwlIH0gJT4gPGlucHV0IHR5cGU9XCJkYXRldGltZS1sb2NhbFwiIDwlLSBzdGFydEF0dHIgJT4+IDxpbnB1dCB0eXBlPVwiZGF0ZXRpbWUtbG9jYWxcIiA8JS0gZW5kQXR0ciAlPj4gPC9kaXY+J1xudHBsWydmaWx0ZXJzL2RhdGVfbW9udGguaHRtbCddID0gJyA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj4gPCUgaWYgKGxhYmVsKSB7ICU+IDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dFwiPjwlPSBsYWJlbCAlPjwvc3Bhbj4gPCUgfSAlPiA8aW5wdXQgdHlwZT1cIm1vbnRoXCIgPCUtIGF0dHIgJT4+IDwvZGl2PidcbnRwbFsnZmlsdGVycy9kYXRlX3JhbmdlLmh0bWwnXSA9ICcgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+IDwlIGlmIChsYWJlbCkgeyAlPiA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLXRleHRcIj48JT0gbGFiZWwgJT48L3NwYW4+IDwlIH0gJT4gPGlucHV0IHR5cGU9XCJkYXRlXCIgPCUtIHN0YXJ0QXR0ciAlPj4gPGlucHV0IHR5cGU9XCJkYXRlXCIgPCUtIGVuZEF0dHIgJT4+IDwvZGl2PidcbnRwbFsnZmlsdGVycy9udW1iZXIuaHRtbCddID0gJyA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj4gPCUgaWYgKGxhYmVsKSB7ICU+IDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dFwiPjwlPSBsYWJlbCAlPjwvc3Bhbj4gPCUgfSAlPiA8aW5wdXQgdHlwZT1cIm51bWJlclwiIDwlLSBhdHRyU3RhcnQgJT4+IDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgPCUtIGF0dHJFbmQgJT4+IDxidXR0b24gdHlwZT1cImJ1dHRvblwiIDwlLSBidG5BdHRyICU+PiA8JS0gYnRuQ29udGVudCAlPiA8L2J1dHRvbj4gPC9kaXY+J1xudHBsWydmaWx0ZXJzL3JhZGlvLmh0bWwnXSA9ICcgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPiA8JSBpZiAobGFiZWwpIHsgJT4gPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0XCI+PCU9IGxhYmVsICU+PC9zcGFuPiA8JSB9ICU+IDwlICQuZWFjaChpdGVtcywgZnVuY3Rpb24oa2V5LCBpdGVtKSB7ICU+IDxpbnB1dCB0eXBlPVwicmFkaW9cIiBjbGFzcz1cImJ0bi1jaGVja1wiIGF1dG9jb21wbGV0ZT1cIm9mZlwiIGlkPVwiPCU9IChmaWVsZCArIGtleSkgJT5cIiBuYW1lPVwiPCU9IGZpZWxkICU+XCIgdmFsdWU9XCI8JT0gaXRlbS52YWx1ZSAlPlwiIDwlPSBpdGVtLmNoZWNrZWQgPyBcXCcgY2hlY2tlZFxcJyA6IFxcJ1xcJyAlPj4gPGxhYmVsIGNsYXNzPVwiPCU9IGl0ZW0uY2xhc3MgJT5cIiBmb3I9XCI8JT0gKGZpZWxkICsga2V5KSAlPlwiPjwlPSBpdGVtLnRleHQgJT48L2xhYmVsPiA8JSB9KTsgJT4gPC9kaXY+J1xudHBsWydmaWx0ZXJzL3NlbGVjdC5odG1sJ10gPSAnPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+IDwlIGlmIChsYWJlbCkgeyAlPiA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLXRleHRcIj48JT0gbGFiZWwgJT48L3NwYW4+IDwlIH0gJT4gPHNlbGVjdCA8JS0gYXR0ciAlPj4gPG9wdGlvbj4tLTwvb3B0aW9uPiA8JSAkLmVhY2gob3B0aW9ucywgZnVuY3Rpb24oa2V5LCBvcHRpb24pIHsgJT4gPCUgaWYgKG9wdGlvbi50eXBlID09PSBcXCdncm91cFxcJykgeyAlPiA8b3B0Z3JvdXA8JS0gb3B0aW9uLmF0dHIgJT4vPiA8JSAkLmVhY2gob3B0aW9uLm9wdGlvbnMsIGZ1bmN0aW9uKGtleSwgZ3JvdXBPcHRpb24pIHsgJT4gPG9wdGlvbiA8JS0gZ3JvdXBPcHRpb24uYXR0ciAlPi8+PCU9IGdyb3VwT3B0aW9uLnRleHQgJT48L29wdGlvbj4gPCUgfSk7ICU+IDwvb3B0Z3JvdXA+IDwlIH0gZWxzZSB7ICU+IDxvcHRpb24gPCUtIG9wdGlvbi5hdHRyICU+Lz48JT0gb3B0aW9uLnRleHQgJT48L29wdGlvbj4gPCUgfSAlPiA8JSB9KTsgJT4gPC9zZWxlY3Q+IDwvZGl2PidcbnRwbFsnZmlsdGVycy9zd2l0Y2guaHRtbCddID0gJzxkaXYgY2xhc3M9XCJmb3JtLWNoZWNrIGZvcm0tc3dpdGNoXCI+IDxpbnB1dCBjbGFzcz1cImZvcm0tY2hlY2staW5wdXRcIiB0eXBlPVwiY2hlY2tib3hcIiBpZD1cIjwlPSAoZmllbGQgKyBpZCkgJT5cIiBuYW1lPVwiPCU9IGZpZWxkICU+XCIgdmFsdWU9XCI8JT0gdmFsdWVZICU+XCIgPCU9IGNoZWNrZWQgPyBcXCcgY2hlY2tlZFxcJyA6IFxcJ1xcJyAlPj4gPCUgaWYgKGxhYmVsICE9IFxcJ1xcJykgeyAlPiA8bGFiZWwgY2xhc3M9XCJmb3JtLWNoZWNrLWxhYmVsXCIgZm9yPVwiPCU9IChmaWVsZCArIGlkKSAlPlwiPjwlPSBsYWJlbCAlPjwvbGFiZWw+IDwlIH0gJT4gPC9kaXY+J1xudHBsWydmaWx0ZXJzL3RleHQuaHRtbCddID0gJyA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj4gPCUgaWYgKGxhYmVsKSB7ICU+IDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dFwiPjwlPSBsYWJlbCAlPjwvc3Bhbj4gPCUgfSAlPiA8aW5wdXQgdHlwZT1cInRleHRcIiA8JS0gYXR0ciAlPj4gPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgPCUtIGJ0bkF0dHIgJT4+IDwlLSBidG5Db250ZW50ICU+IDwvYnV0dG9uPiA8L2Rpdj4nXG50cGxbJ3NlYXJjaC9jaGVja2JveC5odG1sJ10gPSAnIDwlICQuZWFjaChvcHRpb25zLCBmdW5jdGlvbihrZXksIG9wdGlvbikgeyAlPiA8ZGl2IGNsYXNzPVwiZm9ybS1jaGVja1wiPiA8bGFiZWwgY2xhc3M9XCJmb3JtLWNoZWNrLWxhYmVsXCI+IDxpbnB1dCBjbGFzcz1cImZvcm0tY2hlY2staW5wdXRcIiB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwiPCU9IGZpZWxkICU+XCIgdmFsdWU9XCI8JS0gb3B0aW9uLnZhbHVlICU+XCIgPCU9IG9wdGlvbi5jaGVja2VkID8gXFwnIGNoZWNrZWRcXCcgOiBcXCdcXCcgJT4+IDwlPSBvcHRpb24udGV4dCAlPiA8L2xhYmVsPiA8L2Rpdj4gPCUgfSk7ICU+J1xudHBsWydzZWFyY2gvZGF0ZS5odG1sJ10gPSAnIDxpbnB1dCB0eXBlPVwiZGF0ZVwiIDwlLSBhdHRyICU+PidcbnRwbFsnc2VhcmNoL2RhdGV0aW1lLmh0bWwnXSA9ICcgPGlucHV0IHR5cGU9XCJkYXRldGltZS1sb2NhbFwiIDwlLSBhdHRyICU+PidcbnRwbFsnc2VhcmNoL2RhdGV0aW1lX3JhbmdlLmh0bWwnXSA9ICcgPGlucHV0IHR5cGU9XCJkYXRldGltZS1sb2NhbFwiIDwlLSBzdGFydEF0dHIgJT4+IDxpbnB1dCB0eXBlPVwiZGF0ZXRpbWUtbG9jYWxcIiA8JS0gZW5kQXR0ciAlPj4nXG50cGxbJ3NlYXJjaC9kYXRlX21vbnRoLmh0bWwnXSA9ICcgPGlucHV0IHR5cGU9XCJtb250aFwiIDwlLSBhdHRyICU+PidcbnRwbFsnc2VhcmNoL2RhdGVfcmFuZ2UuaHRtbCddID0gJyA8aW5wdXQgdHlwZT1cImRhdGVcIiA8JS0gc3RhcnRBdHRyICU+PiA8aW5wdXQgdHlwZT1cImRhdGVcIiA8JS0gZW5kQXR0ciAlPj4nXG50cGxbJ3NlYXJjaC9udW1iZXIuaHRtbCddID0gJyA8aW5wdXQgdHlwZT1cIm51bWJlclwiIDwlLSBzdGFydEF0dHIgJT4+IDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgPCUtIGVuZEF0dHIgJT4+J1xudHBsWydzZWFyY2gvcmFkaW8uaHRtbCddID0gJzxkaXYgY2xhc3M9XCJmb3JtLWNoZWNrXCI+IDxsYWJlbCBjbGFzcz1cImZvcm0tY2hlY2stbGFiZWxcIj4gPGlucHV0IGNsYXNzPVwiZm9ybS1jaGVjay1pbnB1dFwiIHR5cGU9XCJyYWRpb1wiIG5hbWU9XCI8JT0gZmllbGQgJT5cIiB2YWx1ZT1cIlwiPCU9IGNoZWNrZWRBbGwgPyBcXCcgY2hlY2tlZFxcJyA6IFxcJ1xcJyAlPj4gPCU9IGxhbmcuYWxsICU+IDwvbGFiZWw+IDwvZGl2PiA8JSAkLmVhY2gob3B0aW9ucywgZnVuY3Rpb24oa2V5LCBvcHRpb24pIHsgJT4gPGRpdiBjbGFzcz1cImZvcm0tY2hlY2tcIj4gPGxhYmVsIGNsYXNzPVwiZm9ybS1jaGVjay1sYWJlbFwiPiA8aW5wdXQgY2xhc3M9XCJmb3JtLWNoZWNrLWlucHV0XCIgdHlwZT1cInJhZGlvXCIgbmFtZT1cIjwlPSBmaWVsZCAlPlwiIHZhbHVlPVwiPCUtIG9wdGlvbi52YWx1ZSAlPlwiIDwlPSBvcHRpb24uY2hlY2tlZCA/IFxcJyBjaGVja2VkXFwnIDogXFwnXFwnICU+PiA8JT0gb3B0aW9uLnRleHQgJT4gPC9sYWJlbD4gPC9kaXY+IDwlIH0pOyAlPidcbnRwbFsnc2VhcmNoL3NlbGVjdC5odG1sJ10gPSAnIDxzZWxlY3QgPCUtIGF0dHIgJT4+IDxvcHRpb24+LS08L29wdGlvbj4gPCUgJC5lYWNoKG9wdGlvbnMsIGZ1bmN0aW9uKGtleSwgb3B0aW9uKSB7ICU+IDwlIGlmIChvcHRpb24udHlwZSA9PT0gXFwnZ3JvdXBcXCcpIHsgJT4gPG9wdGdyb3VwPCUtIG9wdGlvbi5hdHRyICU+Lz4gPCUgJC5lYWNoKG9wdGlvbi5vcHRpb25zLCBmdW5jdGlvbihrZXksIGdyb3VwT3B0aW9uKSB7ICU+IDxvcHRpb24gPCUtIGdyb3VwT3B0aW9uLmF0dHIgJT4vPjwlPSBncm91cE9wdGlvbi50ZXh0ICU+PC9vcHRpb24+IDwlIH0pOyAlPiA8L29wdGdyb3VwPiA8JSB9IGVsc2UgeyAlPiA8b3B0aW9uIDwlLSBvcHRpb24uYXR0ciAlPi8+PCU9IG9wdGlvbi50ZXh0ICU+PC9vcHRpb24+IDwlIH0gJT4gPCUgfSk7ICU+IDwvc2VsZWN0PidcbnRwbFsnc2VhcmNoL3RleHQuaHRtbCddID0gJyA8aW5wdXQgdHlwZT1cInRleHRcIiA8JS0gYXR0ciAlPj4nO1xuZXhwb3J0IGRlZmF1bHQgdHBsOyIsIlxyXG5sZXQgY29yZXVpVGFibGVVdGlscyA9IHtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQntCx0YrQtdC00LjQvdC10L3QuNC1INCw0YLRgNC40LHRg9GC0L7QslxyXG4gICAgICogQHBhcmFtIGF0dHIxXHJcbiAgICAgKiBAcGFyYW0gYXR0cjJcclxuICAgICAqIEByZXR1cm5zIHtvYmplY3R9XHJcbiAgICAgKi9cclxuICAgIG1lcmdlQXR0cjogZnVuY3Rpb24gKGF0dHIxLCBhdHRyMikge1xyXG5cclxuICAgICAgICBsZXQgbWVyZ2VBdHRyID0gT2JqZWN0LmFzc2lnbih7fSwgYXR0cjEpO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGF0dHIyID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAkLmVhY2goYXR0cjIsIGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1lcmdlQXR0ci5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuYW1lID09PSAnY2xhc3MnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lcmdlQXR0cltuYW1lXSArPSAnICcgKyB2YWx1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChuYW1lID09PSAnc3R5bGUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lcmdlQXR0cltuYW1lXSArPSAnOycgKyB2YWx1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVyZ2VBdHRyW25hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVyZ2VBdHRyW25hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1lcmdlQXR0cjtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/RgNC+0LLQtdGA0LrQsCDQvdCwINGH0LjRgdC70L5cclxuICAgICAqIEBwYXJhbSBudW1cclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgaXNOdW1lcmljOiBmdW5jdGlvbihudW0pIHtcclxuICAgICAgICByZXR1cm4gKHR5cGVvZihudW0pID09PSAnbnVtYmVyJyB8fCB0eXBlb2YobnVtKSA9PT0gXCJzdHJpbmdcIiAmJiBudW0udHJpbSgpICE9PSAnJykgJiYgISBpc05hTihudW0pO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgaGFzaENvZGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNyYzMyKChuZXcgRGF0ZSgpLmdldFRpbWUoKSArIE1hdGgucmFuZG9tKCkpLnRvU3RyaW5nKCkpLnRvU3RyaW5nKDE2KTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/RgNC+0LLQtdGA0LrQsCDQvdCwINC+0LHRitC10LrRglxyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKi9cclxuICAgIGlzT2JqZWN0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiZcclxuICAgICAgICAgICAgISBBcnJheS5pc0FycmF5KHZhbHVlKSAmJlxyXG4gICAgICAgICAgICB2YWx1ZSAhPT0gbnVsbDtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHN0clxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIGNyYzMyOiBmdW5jdGlvbiAoc3RyKSB7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGEsIG8gPSBbXSwgYyA9IDA7IGMgPCAyNTY7IGMrKykge1xyXG4gICAgICAgICAgICBhID0gYztcclxuICAgICAgICAgICAgZm9yICh2YXIgZiA9IDA7IGYgPCA4OyBmKyspIHtcclxuICAgICAgICAgICAgICAgIGEgPSAxICYgYSA/IDM5ODgyOTIzODQgXiBhID4+PiAxIDogYSA+Pj4gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9bY10gPSBhXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKHZhciBuID0gLTEsIHQgPSAwOyB0IDwgc3RyLmxlbmd0aDsgdCsrKSB7XHJcbiAgICAgICAgICAgIG4gPSBuID4+PiA4IF4gb1syNTUgJiAobiBeIHN0ci5jaGFyQ29kZUF0KHQpKV1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAoLTEgXiBuKSA+Pj4gMDtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvcmV1aVRhYmxlVXRpbHM7IiwiXHJcblxyXG5pbXBvcnQgJy4uLy4uL25vZGVfbW9kdWxlcy9lanMvZWpzLm1pbic7XHJcbmltcG9ydCBjb3JldWlUYWJsZSAgICAgIGZyb20gJy4vY29yZXVpLnRhYmxlJztcclxuaW1wb3J0IGNvcmV1aVRhYmxlVHBsICAgZnJvbSAnLi9jb3JldWkudGFibGUudGVtcGxhdGVzJztcclxuaW1wb3J0IGNvcmV1aVRhYmxlVXRpbHMgZnJvbSBcIi4vY29yZXVpLnRhYmxlLnV0aWxzXCI7XHJcblxyXG5cclxubGV0IGNvcmV1aVRhYmxlUmVuZGVyID0ge1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCh0LHQvtGA0LrQsCDRgtCw0LHQu9C40YbRi1xyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHRhYmxlXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICByZW5kZXJUYWJsZTogZnVuY3Rpb24gKHRhYmxlKSB7XHJcblxyXG4gICAgICAgIGxldCB0aGF0ICAgICAgICAgICAgICAgPSB0aGlzO1xyXG4gICAgICAgIGxldCBvcHRpb25zICAgICAgICAgICAgPSB0YWJsZS5nZXRPcHRpb25zKCk7XHJcbiAgICAgICAgbGV0IGh0bWxSZWNvcmRzICAgICAgICA9ICcnO1xyXG4gICAgICAgIGxldCBjb2x1bW5Hcm91cHNIZWFkZXIgPSAnJztcclxuICAgICAgICBsZXQgY29sdW1uR3JvdXBzRm9vdGVyID0gJyc7XHJcbiAgICAgICAgbGV0IGNvbEdyb3VwcyAgICAgICAgICA9IFtdO1xyXG4gICAgICAgIGxldCBjb2x1bW5zICAgICAgICAgICAgPSBbXTtcclxuXHJcbiAgICAgICAgLy8g0JrQvtC70L7QvdC60LhcclxuICAgICAgICBpZiAodGFibGUuX2NvbHVtbnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAkLmVhY2godGFibGUuX2NvbHVtbnMsIGZ1bmN0aW9uIChrZXksIGNvbHVtbikge1xyXG4gICAgICAgICAgICAgICAgaWYgKCAhIGNvbHVtbi5pc1Nob3coKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgY29sdW1uT3B0aW9ucyA9IGNvbHVtbi5nZXRPcHRpb25zKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXR0cmlidXRlcyAgICA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjb2x1bW5PcHRpb25zLmhhc093blByb3BlcnR5KCdmaXhlZCcpICYmIHR5cGVvZiBjb2x1bW5PcHRpb25zLmZpeGVkID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk9wdGlvbnMuYXR0ckhlYWRlciA9IGNvcmV1aVRhYmxlVXRpbHMubWVyZ2VBdHRyKGNvbHVtbk9wdGlvbnMuYXR0ckhlYWRlciwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogJ2NvcmV1aS10YWJsZV9fZml4ZWRfJyArIGNvbHVtbk9wdGlvbnMuZml4ZWRcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uT3B0aW9ucy5hdHRyID0gY29yZXVpVGFibGVVdGlscy5tZXJnZUF0dHIoY29sdW1uT3B0aW9ucy5hdHRyLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnY29yZXVpLXRhYmxlX19maXhlZF8nICsgY29sdW1uT3B0aW9ucy5maXhlZFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjb2x1bW5PcHRpb25zLmF0dHJIZWFkZXIgJiYgdHlwZW9mIGNvbHVtbk9wdGlvbnMuYXR0ckhlYWRlciA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAkLmVhY2goY29sdW1uT3B0aW9ucy5hdHRySGVhZGVyLCBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlcy5wdXNoKG5hbWUgKyAnPVwiJyArIHZhbHVlICsgJ1wiJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29sR3JvdXBzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBjb2x1bW5PcHRpb25zLmhhc093blByb3BlcnR5KCd3aWR0aCcpID8gY29sdW1uT3B0aW9ucy53aWR0aCA6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgIHVuaXQ6IHR5cGVvZiBjb2x1bW5PcHRpb25zLndpZHRoID09PSAnbnVtYmVyJyA/ICdweCcgOiAnJ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29sdW1ucy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBhdHRyOiBhdHRyaWJ1dGVzLmxlbmd0aCA+IDAgPyAoJyAnICsgYXR0cmlidXRlcy5qb2luKCcgJykpIDogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGNvbHVtbk9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2xhYmVsJykgPyBjb2x1bW5PcHRpb25zLmxhYmVsIDogXCJcIlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vINCh0YLRgNC+0LrQuFxyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5yZWNvcmRzID09PSAnb2JqZWN0JyAmJlxyXG4gICAgICAgICAgICBBcnJheS5pc0FycmF5KG9wdGlvbnMucmVjb3JkcykgJiZcclxuICAgICAgICAgICAgb3B0aW9ucy5yZWNvcmRzLmxlbmd0aCA+IDBcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgdGFibGUuX3JlY29yZHNUb3RhbCA9IG9wdGlvbnMucmVjb3Jkcy5sZW5ndGg7XHJcbiAgICAgICAgICAgIGxldCByZWNvcmRzID0gW107XHJcblxyXG4gICAgICAgICAgICB0YWJsZS5fcmVjb3Jkc051bWJlciA9IHRhYmxlLl9wYWdlID09PSAxID8gMSA6ICgodGFibGUuX3BhZ2UgLSAxKSAqIHRhYmxlLl9yZWNvcmRzUGVyUGFnZSkgKyAxO1xyXG5cclxuICAgICAgICAgICAgJC5lYWNoKG9wdGlvbnMucmVjb3JkcywgZnVuY3Rpb24gKGtleSwgcmVjb3JkKSB7XHJcbiAgICAgICAgICAgICAgICByZWNvcmRzLnB1c2godGhhdC5yZW5kZXJSZWNvcmQodGFibGUsIHJlY29yZCwga2V5KSk7XHJcbiAgICAgICAgICAgICAgICB0YWJsZS5fcmVjb3Jkc051bWJlcisrO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGh0bWxSZWNvcmRzID0gZWpzLnJlbmRlcihjb3JldWlUYWJsZVRwbFsndGFibGUtcmVjb3Jkcy5odG1sJ10sIHtcclxuICAgICAgICAgICAgICAgIHJlY29yZHM6IHJlY29yZHMsXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgaXNSZW1vdGUgPSBvcHRpb25zLmhhc093blByb3BlcnR5KCdyZWNvcmRzUmVxdWVzdCcpICYmXHJcbiAgICAgICAgICAgICAgICBjb3JldWlUYWJsZVV0aWxzLmlzT2JqZWN0KG9wdGlvbnMucmVjb3Jkc1JlcXVlc3QpICYmXHJcbiAgICAgICAgICAgICAgICB0eXBlb2Ygb3B0aW9ucy5yZWNvcmRzUmVxdWVzdC51cmwgPT09ICdzdHJpbmcnICYmXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLnJlY29yZHNSZXF1ZXN0LnVybCAhPT0gJyMnO1xyXG5cclxuICAgICAgICAgICAgaWYgKCAhIGlzUmVtb3RlKSB7XHJcbiAgICAgICAgICAgICAgICBodG1sUmVjb3JkcyA9IGVqcy5yZW5kZXIoY29yZXVpVGFibGVUcGxbJ3RhYmxlLXJlY29yZHMtZW1wdHkuaHRtbCddLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uc0NvdW50OiB0YWJsZS5fY29sdW1ucy5sZW5ndGggPyB0YWJsZS5fY29sdW1ucy5sZW5ndGggOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhbmc6IHRhYmxlLmdldExhbmcoKSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmNvbHVtbkdyb3Vwc0hlYWRlciA9PT0gJ29iamVjdCcgJiZcclxuICAgICAgICAgICAgQXJyYXkuaXNBcnJheShvcHRpb25zLmNvbHVtbkdyb3Vwc0hlYWRlcikgJiZcclxuICAgICAgICAgICAgb3B0aW9ucy5jb2x1bW5Hcm91cHNIZWFkZXIubGVuZ3RoID4gMFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBsZXQgcm93cyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgJC5lYWNoKG9wdGlvbnMuY29sdW1uR3JvdXBzSGVhZGVyLCBmdW5jdGlvbiAoa2V5LCBoZWFkZXJSb3cpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaGVhZGVyUm93ID09PSAnb2JqZWN0JyAmJiBBcnJheS5pc0FycmF5KGhlYWRlclJvdykpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2VsbHMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKGhlYWRlclJvdywgZnVuY3Rpb24gKGtleSwgaGVhZGVyQ29sdW1uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaGVhZGVyQ29sdW1uID09PSAnb2JqZWN0JyAmJiAhIEFycmF5LmlzQXJyYXkoaGVhZGVyQ29sdW1uKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGF0dHJpYnV0ZXMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGVhZGVyQ29sdW1uLmF0dHIgJiYgdHlwZW9mIGhlYWRlckNvbHVtbi5hdHRyID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChoZWFkZXJDb2x1bW4uYXR0ciwgZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXMucHVzaChuYW1lICsgJz1cIicgKyB2YWx1ZSArICdcIicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBoZWFkZXJDb2x1bW4uaGFzT3duUHJvcGVydHkoJ2xhYmVsJykgPyBoZWFkZXJDb2x1bW4ubGFiZWwgOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyOiBhdHRyaWJ1dGVzLmxlbmd0aCA+IDAgPyAnICcgKyBhdHRyaWJ1dGVzLmpvaW4oJyAnKSA6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcm93cy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlanMucmVuZGVyKGNvcmV1aVRhYmxlVHBsWyd0YWJsZS1jb2x1bW5zLmh0bWwnXSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczogY2VsbHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb2x1bW5Hcm91cHNIZWFkZXIgPSByb3dzLmpvaW4oJycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmNvbHVtbkdyb3Vwc0Zvb3RlciA9PT0gJ29iamVjdCcgJiZcclxuICAgICAgICAgICAgQXJyYXkuaXNBcnJheShvcHRpb25zLmNvbHVtbkdyb3Vwc0Zvb3RlcikgJiZcclxuICAgICAgICAgICAgb3B0aW9ucy5jb2x1bW5Hcm91cHNGb290ZXIubGVuZ3RoID4gMFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBsZXQgcm93cyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgJC5lYWNoKG9wdGlvbnMuY29sdW1uR3JvdXBzRm9vdGVyLCBmdW5jdGlvbiAoa2V5LCBmb290ZXJSb3cpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZm9vdGVyUm93ID09PSAnb2JqZWN0JyAmJiBBcnJheS5pc0FycmF5KGZvb3RlclJvdykpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2VsbHMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKGZvb3RlclJvdywgZnVuY3Rpb24gKGtleSwgZm9vdGVyQ29sdW1uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZm9vdGVyQ29sdW1uID09PSAnb2JqZWN0JyAmJiAhIEFycmF5LmlzQXJyYXkoZm9vdGVyQ29sdW1uKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGF0dHJpYnV0ZXMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9vdGVyQ29sdW1uLmF0dHIgJiYgdHlwZW9mIGZvb3RlckNvbHVtbi5hdHRyID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChmb290ZXJDb2x1bW4uYXR0ciwgZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXMucHVzaChuYW1lICsgJz1cIicgKyB2YWx1ZSArICdcIicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBmb290ZXJDb2x1bW4uaGFzT3duUHJvcGVydHkoJ2xhYmVsJykgPyBmb290ZXJDb2x1bW4ubGFiZWwgOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyOiBhdHRyaWJ1dGVzLmxlbmd0aCA+IDAgPyAnICcgKyBhdHRyaWJ1dGVzLmpvaW4oJyAnKSA6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcm93cy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlanMucmVuZGVyKGNvcmV1aVRhYmxlVHBsWyd0YWJsZS1jb2x1bW5zLWZvb3Rlci5odG1sJ10sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IGNlbGxzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY29sdW1uR3JvdXBzRm9vdGVyID0gcm93cy5qb2luKCcnKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgbGV0IGNsYXNzZXMgPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmNsYXNzID09PSAnc3RyaW5nJyAmJiBvcHRpb25zLmNsYXNzKSB7XHJcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaChvcHRpb25zLmNsYXNzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5zaXplID09PSAnc3RyaW5nJyAmJiBvcHRpb25zLnNpemUpIHtcclxuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKCd0YWJsZS0nICsgb3B0aW9ucy5zaXplKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5ob3ZlciA9PT0gJ2Jvb2xlYW4nICYmIG9wdGlvbnMuaG92ZXIpIHtcclxuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKCd0YWJsZS1ob3ZlcicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLnN0cmlwZWQgPT09ICdib29sZWFuJyAmJiBvcHRpb25zLnN0cmlwZWQpIHtcclxuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKCd0YWJsZS1zdHJpcGVkJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoICEgY29sdW1uR3JvdXBzRm9vdGVyIHx8ICEgcmVuZGVyLnBhZ2VzKSB7XHJcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaCgnZW1wdHktdGZvb3QnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBodG1sQ29sdW1ucyA9IGVqcy5yZW5kZXIoY29yZXVpVGFibGVUcGxbJ3RhYmxlLWNvbHVtbnMuaHRtbCddLCB7XHJcbiAgICAgICAgICAgIGNvbHVtbnM6IGNvbHVtbnMsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBlanMucmVuZGVyKGNvcmV1aVRhYmxlVHBsWyd0YWJsZS5odG1sJ10sIHtcclxuICAgICAgICAgICAgY2xhc3NlczogY2xhc3Nlcy5qb2luKCcgJyksXHJcbiAgICAgICAgICAgIHNob3c6IG9wdGlvbnMuc2hvdyxcclxuICAgICAgICAgICAgY29sdW1uR3JvdXBzSGVhZGVyIDogY29sdW1uR3JvdXBzSGVhZGVyLFxyXG4gICAgICAgICAgICBjb2xHcm91cHMgOiBjb2xHcm91cHMsXHJcbiAgICAgICAgICAgIGNvbHVtbnMgOiBodG1sQ29sdW1ucyxcclxuICAgICAgICAgICAgY29sdW1uR3JvdXBzRm9vdGVyIDogY29sdW1uR3JvdXBzRm9vdGVyLFxyXG4gICAgICAgICAgICByZWNvcmRzIDogaHRtbFJlY29yZHMsXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0KHQsdC+0YDQutCwINC30LDQv9C40YHQuCDRgtCw0LHQu9C40YbRi1xyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHRhYmxlXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcmVjb3JkXHJcbiAgICAgKiBAcGFyYW0ge2ludH0gICAgcmVjb3JkS2V5XHJcbiAgICAgKiBAcmV0dXJucyB7eyBhdHRyOiAoc3RyaW5nKSwgZmllbGRzOiAob2JqZWN0KSB9fX1cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIHJlbmRlclJlY29yZDogZnVuY3Rpb24gKHRhYmxlLCByZWNvcmQsIHJlY29yZEtleSkge1xyXG5cclxuICAgICAgICBsZXQgdGhhdCAgICAgICA9IHRoaXM7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgICAgPSB0YWJsZS5nZXRPcHRpb25zKCk7XHJcbiAgICAgICAgbGV0IGZpZWxkcyAgICAgPSBbXTtcclxuICAgICAgICBsZXQgcmVjb3JkTWV0YSA9IHR5cGVvZiByZWNvcmQuX21ldGEgPT09ICdvYmplY3QnICYmICEgQXJyYXkuaXNBcnJheShyZWNvcmQuX21ldGEpID8gcmVjb3JkLl9tZXRhIDogbnVsbDtcclxuICAgICAgICBsZXQgcmVjb3JkQXR0ciA9IHtcclxuICAgICAgICAgICAgY2xhc3M6ICdjb3JldWktdGFibGVfX3JlY29yZCdcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkLmVhY2godGFibGUuX2NvbHVtbnMsIGZ1bmN0aW9uIChrZXksIGNvbHVtbikge1xyXG4gICAgICAgICAgICBpZiAoICEgY29sdW1uLmlzU2hvdygpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZpZWxkcy5wdXNoKHRoYXQucmVuZGVyRmllbGQoY29sdW1uLCByZWNvcmQsIHJlY29yZEtleSkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMub25DbGlja1VybCA9PT0gJ3N0cmluZycgJiYgb3B0aW9ucy5vbkNsaWNrVXJsKSB7XHJcbiAgICAgICAgICAgIHJlY29yZEF0dHIuY2xhc3MgKz0gJyBjb3JldWktdGFibGVfcG9pbnRlcic7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocmVjb3JkTWV0YSkge1xyXG4gICAgICAgICAgICByZWNvcmRBdHRyID0gY29yZXVpVGFibGVVdGlscy5tZXJnZUF0dHIocmVjb3JkQXR0ciwgcmVjb3JkTWV0YS5hdHRyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCByZWNvcmRBdHRyUmVzdWx0ID0gW107XHJcblxyXG4gICAgICAgICQuZWFjaChyZWNvcmRBdHRyLCBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgcmVjb3JkQXR0clJlc3VsdC5wdXNoKG5hbWUgKyAnPVwiJyArIHZhbHVlICsgJ1wiJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGF0dHI6IHJlY29yZEF0dHJSZXN1bHQubGVuZ3RoID4gMCA/ICgnICcgKyByZWNvcmRBdHRyUmVzdWx0LmpvaW4oJyAnKSkgOiAnJyxcclxuICAgICAgICAgICAgZmllbGRzOiBmaWVsZHNcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQodCx0L7RgNC60LAg0Y/Rh9C10LnQutC4INGC0LDQsdC70LjRhtGLXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gY29sdW1uXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcmVjb3JkXHJcbiAgICAgKiBAcGFyYW0ge2ludH0gcmVjb3JkS2V5XHJcbiAgICAgKiBAcmV0dXJucyB7eyBhdHRyOiAoc3RyaW5nKSwgY29udGVudDogKHN0cmluZykgfX1cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIHJlbmRlckZpZWxkOiBmdW5jdGlvbiAoY29sdW1uLCByZWNvcmQsIHJlY29yZEtleSkge1xyXG5cclxuICAgICAgICBsZXQgY29sdW1uT3B0aW9ucyA9IGNvbHVtbi5nZXRPcHRpb25zKCk7XHJcbiAgICAgICAgbGV0IGNvbHVtbkZpZWxkICAgPSB0eXBlb2YgY29sdW1uT3B0aW9ucy5maWVsZCA9PT0gJ3N0cmluZycgPyBjb2x1bW5PcHRpb25zLmZpZWxkIDogbnVsbDtcclxuICAgICAgICBsZXQgY29udGVudCAgICAgICA9ICcnO1xyXG4gICAgICAgIGxldCByZWNvcmRNZXRhICAgID0gdHlwZW9mIHJlY29yZC5fbWV0YSA9PT0gJ29iamVjdCcgJiYgISBBcnJheS5pc0FycmF5KHJlY29yZC5fbWV0YSkgPyByZWNvcmQuX21ldGEgOiBudWxsO1xyXG4gICAgICAgIGxldCBmaWVsZFByb3BzICAgID0gcmVjb3JkTWV0YSAmJiByZWNvcmRNZXRhLmhhc093blByb3BlcnR5KCdmaWVsZHMnKSAmJiByZWNvcmRNZXRhLmZpZWxkcy5oYXNPd25Qcm9wZXJ0eShjb2x1bW5GaWVsZClcclxuICAgICAgICAgICAgPyByZWNvcmRNZXRhLmZpZWxkc1tjb2x1bW5GaWVsZF1cclxuICAgICAgICAgICAgOiBudWxsO1xyXG4gICAgICAgIGxldCBmaWVsZEF0dHIgPSB0eXBlb2YgY29sdW1uT3B0aW9ucy5hdHRyID09PSAnb2JqZWN0JyAmJiAhIEFycmF5LmlzQXJyYXkoY29sdW1uT3B0aW9ucy5hdHRyKVxyXG4gICAgICAgICAgICA/IGNvbHVtbk9wdGlvbnMuYXR0clxyXG4gICAgICAgICAgICA6IHt9O1xyXG5cclxuICAgICAgICBpZiAoZmllbGRQcm9wcyAmJiB0eXBlb2YgZmllbGRQcm9wcy5hdHRyID09PSAnb2JqZWN0JyAmJiAhIEFycmF5LmlzQXJyYXkoZmllbGRQcm9wcy5hdHRyKSkge1xyXG4gICAgICAgICAgICBmaWVsZEF0dHIgPSBjb3JldWlUYWJsZVV0aWxzLm1lcmdlQXR0cihmaWVsZEF0dHIsIGZpZWxkUHJvcHMuYXR0cik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGNvbHVtbk9wdGlvbnMucmVuZGVyID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQgPSBjb2x1bW5PcHRpb25zLnJlbmRlcihyZWNvcmQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQgPSBjb2x1bW5GaWVsZCAmJiByZWNvcmQuaGFzT3duUHJvcGVydHkoY29sdW1uRmllbGQpXHJcbiAgICAgICAgICAgICAgICA/IHJlY29yZFtjb2x1bW5GaWVsZF1cclxuICAgICAgICAgICAgICAgIDogJyc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb250ZW50ID0gY29sdW1uLnJlbmRlcihjb250ZW50LCByZWNvcmQsIHJlY29yZEtleSk7XHJcblxyXG4gICAgICAgIGxldCBmaWVsZEF0dHJSZXN1bHQgPSBbXTtcclxuXHJcbiAgICAgICAgJC5lYWNoKGZpZWxkQXR0ciwgZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGZpZWxkQXR0clJlc3VsdC5wdXNoKG5hbWUgKyAnPVwiJyArIHZhbHVlICsgJ1wiJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGF0dHI6ICAgIGZpZWxkQXR0clJlc3VsdC5sZW5ndGggPiAwID8gKCcgJyArIGZpZWxkQXR0clJlc3VsdC5qb2luKCcgJykpIDogJycsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IGNvbnRlbnQsXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0KHQsdC+0YDQutCwINGN0LvQtdC80LXQvdGC0LAg0YPQv9GA0LDQstC70LXQvdC40Y9cclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSB0YWJsZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGNvbnRyb2xcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIHJlbmRlckNvbnRyb2w6IGZ1bmN0aW9uICh0YWJsZSwgY29udHJvbCkge1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGNvbnRyb2wudHlwZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgbGV0IGNvbnRyb2xJbnN0YW5jZSA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICBpZiAoY29yZXVpVGFibGUuY29udHJvbHMuaGFzT3duUHJvcGVydHkoY29udHJvbC50eXBlKSkge1xyXG4gICAgICAgICAgICAgICAgY29udHJvbEluc3RhbmNlID0gJC5leHRlbmQodHJ1ZSwge30sIGNvcmV1aVRhYmxlLmNvbnRyb2xzW2NvbnRyb2wudHlwZV0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29udHJvbC50eXBlLmluZGV4T2YoJ2ZpbHRlcjonKSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZpbHRlck5hbWUgPSBjb250cm9sLnR5cGUuc3Vic3RyaW5nKDcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjb3JldWlUYWJsZS5maWx0ZXJzLmhhc093blByb3BlcnR5KGZpbHRlck5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbEluc3RhbmNlID0gJC5leHRlbmQodHJ1ZSwge30sIGNvcmV1aVRhYmxlLmZpbHRlcnNbZmlsdGVyTmFtZV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKGNvbnRyb2xJbnN0YW5jZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgY29udHJvbEluc3RhbmNlLmluaXQodGFibGUsIGNvbnRyb2wpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBjb250cm9sUmVuZGVyID0gZWpzLnJlbmRlcihjb3JldWlUYWJsZVRwbFsndGFibGUtY29udHJvbC5odG1sJ10sIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250cm9sOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBjb250cm9sSW5zdGFuY2UuZ2V0SWQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogY29udHJvbEluc3RhbmNlLnJlbmRlcigpLFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjb250cm9sSW5zdGFuY2UuaGFzT3duUHJvcGVydHkoJ2luaXRFdmVudHMnKSAmJiB0eXBlb2YgY29udHJvbEluc3RhbmNlLmluaXRFdmVudHMgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICB0YWJsZS5vbignc2hvd24nLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xJbnN0YW5jZS5pbml0RXZlbnRzKClcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udHJvbFJlbmRlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29yZXVpVGFibGVSZW5kZXI7IiwiXHJcblxyXG5sZXQgY29yZXVpVGFibGVFbGVtZW50cyA9IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSDQutC+0L3RgtC10LnQvdC10YDQsCDRgtCw0LHQu9C40YbRi1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRhYmxlSWRcclxuICAgICAqIEByZXR1cm4ge2pRdWVyeX1cclxuICAgICAqL1xyXG4gICAgZ2V0Q29udGFpbmVyOiBmdW5jdGlvbiAodGFibGVJZCkge1xyXG5cclxuICAgICAgICByZXR1cm4gJCgnI2NvcmV1aS10YWJsZS0nICsgdGFibGVJZCArICcgPiAuY29yZXVpLXRhYmxlX19jb250YWluZXInKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QvtC70YPRh9C10L3QuNC1INC+0LHQtdGA0YLQutC4INGC0LDQsdC70LjRhtGLXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGFibGVJZFxyXG4gICAgICogQHJldHVybiB7alF1ZXJ5fVxyXG4gICAgICovXHJcbiAgICBnZXRMb2NrOiBmdW5jdGlvbiAodGFibGVJZCkge1xyXG5cclxuICAgICAgICByZXR1cm4gJCgnI2NvcmV1aS10YWJsZS0nICsgdGFibGVJZCArICcgPiAuY29yZXVpLXRhYmxlX19jb250YWluZXIgPiAuY29yZXVpLXRhYmxlLWxvY2snKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QvtC70YPRh9C10L3QuNC1INC+0LHQtdGA0YLQutC4INGC0LDQsdC70LjRhtGLXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGFibGVJZFxyXG4gICAgICogQHJldHVybiB7alF1ZXJ5fVxyXG4gICAgICovXHJcbiAgICBnZXRXcmFwcGVyOiBmdW5jdGlvbiAodGFibGVJZCkge1xyXG5cclxuICAgICAgICByZXR1cm4gJCgnI2NvcmV1aS10YWJsZS0nICsgdGFibGVJZCArICcgPiAuY29yZXVpLXRhYmxlX19jb250YWluZXIgPiAuY29yZXVpLXRhYmxlX193cmFwcGVyJyk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSDQv9C+0LjRgdC60L7QstC+0LPQviDQutC+0L3RgtC10LnQvdC10YDQsFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRhYmxlSWRcclxuICAgICAqIEByZXR1cm4ge2pRdWVyeX1cclxuICAgICAqL1xyXG4gICAgZ2V0U2VhcmNoQ29udGFpbmVyOiBmdW5jdGlvbiAodGFibGVJZCkge1xyXG5cclxuICAgICAgICByZXR1cm4gJCgnI2NvcmV1aS10YWJsZS0nICsgdGFibGVJZCArICcgPiAuY29yZXVpLXRhYmxlX19jb250YWluZXIgPiAuY29yZXVpLXRhYmxlX193cmFwcGVyID4gLmNvcmV1aS10YWJsZV9fc2VhcmNoJyk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSDQv9C+0LjRgdC60L7QstC+0LPQviDQutC+0L3RgtC10LnQvdC10YDQsFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRhYmxlSWRcclxuICAgICAqIEByZXR1cm4ge2pRdWVyeX1cclxuICAgICAqL1xyXG4gICAgZ2V0Q29sdW1uc0NvbnRhaW5lcjogZnVuY3Rpb24gKHRhYmxlSWQpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuICQoJyNjb3JldWktdGFibGUtJyArIHRhYmxlSWQgKyAnID4gLmNvcmV1aS10YWJsZV9fY29udGFpbmVyID4gLmNvcmV1aS10YWJsZV9fd3JhcHBlciA+IC5jb3JldWktdGFibGVfX2NvbHVtbnMnKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QvtC70YPRh9C10L3QuNC1INC60L7QvdGC0LXQudC90LXRgNCwINC/0L7QuNGB0LrQvtCy0L7Qs9C+INC60L7QvdGC0YDQvtC70LBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0YWJsZUlkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29udHJvbElkXHJcbiAgICAgKiBAcmV0dXJuIHtqUXVlcnl9XHJcbiAgICAgKi9cclxuICAgIGdldFNlYXJjaENvbnRyb2w6IGZ1bmN0aW9uICh0YWJsZUlkLCBjb250cm9sSWQpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuICQoJyNjb3JldWktdGFibGUtJyArIHRhYmxlSWQgKyAnID4gLmNvcmV1aS10YWJsZV9fY29udGFpbmVyID4gLmNvcmV1aS10YWJsZV9fd3JhcHBlciA+IC5jb3JldWktdGFibGVfX3NlYXJjaCAuc2VhcmNoLWNvbnRyb2wtJyArIGNvbnRyb2xJZCk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSDQutC+0L3RgtC10LnQvdC10YDQsCDQutC+0L3RgtGA0L7Qu9CwXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGFibGVJZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnRyb2xJZFxyXG4gICAgICogQHJldHVybiB7alF1ZXJ5fVxyXG4gICAgICovXHJcbiAgICBnZXRDb250cm9sOiBmdW5jdGlvbiAodGFibGVJZCwgY29udHJvbElkKSB7XHJcblxyXG4gICAgICAgIHJldHVybiAkKCcjY29yZXVpLXRhYmxlLScgKyB0YWJsZUlkICsgJyA+IC5jb3JldWktdGFibGVfX2NvbnRhaW5lciAjY29yZXVpLXRhYmxlLWNvbnRyb2wtJyArIGNvbnRyb2xJZCk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSDRgtCw0LHQu9C40YbRi1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRhYmxlSWRcclxuICAgICAqIEByZXR1cm4ge2pRdWVyeX1cclxuICAgICAqL1xyXG4gICAgZ2V0VGFibGU6IGZ1bmN0aW9uICh0YWJsZUlkKSB7XHJcblxyXG4gICAgICAgIHJldHVybiAkKCcjY29yZXVpLXRhYmxlLScgKyB0YWJsZUlkICsgJyA+IC5jb3JldWktdGFibGVfX2NvbnRhaW5lciA+IC5jb3JldWktdGFibGVfX3dyYXBwZXIgPiB0YWJsZScpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUg0YLQtdC70LAg0YLQsNCx0LvQuNGG0YtcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0YWJsZUlkXHJcbiAgICAgKiBAcmV0dXJuIHtqUXVlcnl9XHJcbiAgICAgKi9cclxuICAgIGdldFRhYmxlVGJvZHk6IGZ1bmN0aW9uICh0YWJsZUlkKSB7XHJcblxyXG4gICAgICAgIHJldHVybiAkKCcjY29yZXVpLXRhYmxlLScgKyB0YWJsZUlkICsgJyA+IC5jb3JldWktdGFibGVfX2NvbnRhaW5lciA+IC5jb3JldWktdGFibGVfX3dyYXBwZXIgPiB0YWJsZSA+IHRib2R5Jyk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSDRgdGC0YDQvtC6INC30LDQv9C40YHQtdC5XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGFibGVJZFxyXG4gICAgICogQHJldHVybiB7alF1ZXJ5fVxyXG4gICAgICovXHJcbiAgICBnZXRUclJlY29yZHM6IGZ1bmN0aW9uICh0YWJsZUlkKSB7XHJcblxyXG4gICAgICAgIHJldHVybiAkKCcjY29yZXVpLXRhYmxlLScgKyB0YWJsZUlkICsgJyA+IC5jb3JldWktdGFibGVfX2NvbnRhaW5lciA+IC5jb3JldWktdGFibGVfX3dyYXBwZXIgPiB0YWJsZSA+IHRib2R5ID4gdHIuY29yZXVpLXRhYmxlX19yZWNvcmQnKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QvtC70YPRh9C10L3QuNC1INGN0LvQtdC80LXQvdGC0LAg0YHRgtGA0L7QutC4INC/0L4g0LrQu9GO0YfRg1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRhYmxlSWRcclxuICAgICAqIEBwYXJhbSB7aW50fSAgICBpbmRleFxyXG4gICAgICogQHJldHVybiB7alF1ZXJ5fVxyXG4gICAgICovXHJcbiAgICBnZXRUckJ5SW5kZXg6IGZ1bmN0aW9uICh0YWJsZUlkLCBpbmRleCkge1xyXG5cclxuICAgICAgICByZXR1cm4gJCgnI2NvcmV1aS10YWJsZS0nICsgdGFibGVJZCArICcgPiAuY29yZXVpLXRhYmxlX19jb250YWluZXIgPiAuY29yZXVpLXRhYmxlX193cmFwcGVyID4gdGFibGUgPiB0Ym9keSA+IHRyW2RhdGEtcmVjb3JkLWluZGV4PVwiJyArIGluZGV4ICsgJ1wiXScpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUg0LLRi9Cx0YDQsNC90L3Ri9GFINC90LAg0YLQsNCx0LvQuNGG0LUg0Y3Qu9C10LzQtdC90YLQvtCyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGFibGVJZFxyXG4gICAgICogQHJldHVybiB7QXJyYXl9XHJcbiAgICAgKi9cclxuICAgIGdldFNlbGVjdGVkSW5kZXhlczogZnVuY3Rpb24gKHRhYmxlSWQpIHtcclxuXHJcbiAgICAgICAgbGV0IGluZGV4ZXMgPSBbXTtcclxuXHJcbiAgICAgICAgJCgnI2NvcmV1aS10YWJsZS0nICsgdGFibGVJZCArICcgPiAuY29yZXVpLXRhYmxlX19jb250YWluZXIgPiAuY29yZXVpLXRhYmxlX193cmFwcGVyID4gdGFibGUgPiB0Ym9keSA+IHRyLmNvcmV1aS10YWJsZV9fcmVjb3JkID4gdGQuY29yZXVpLXRhYmxlX19zZWxlY3RfY29udGFpbmVyID4gLmNvcmV1aS10YWJsZV9fc2VsZWN0OmNoZWNrZWQnKVxyXG4gICAgICAgICAgICAuZWFjaChmdW5jdGlvbiAoa2V5LCBlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBpbmRleGVzLnB1c2goJChlbGVtZW50KS52YWwoKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gaW5kZXhlcztcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QvtC70YPRh9C10L3QuNC1INCy0YvQsdGA0LDQvdC90YvRhSDQvdCwINGC0LDQsdC70LjRhtC1INGN0LvQtdC80LXQvdGC0L7QslxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRhYmxlSWRcclxuICAgICAqIEByZXR1cm4ge0FycmF5fVxyXG4gICAgICovXHJcbiAgICBnZXRSb3dzU3dpdGNoZXM6IGZ1bmN0aW9uICh0YWJsZUlkKSB7XHJcblxyXG4gICAgICAgIGxldCBpbmRleGVzID0gW107XHJcblxyXG4gICAgICAgICQoJyNjb3JldWktdGFibGUtJyArIHRhYmxlSWQgKyAnID4gLmNvcmV1aS10YWJsZV9fY29udGFpbmVyID4gLmNvcmV1aS10YWJsZV9fd3JhcHBlciA+IHRhYmxlID4gdGJvZHkgPiB0ci5jb3JldWktdGFibGVfX3JlY29yZCA+IHRkLmNvcmV1aS10YWJsZV9fc3dpdGNoX2NvbnRhaW5lcicpXHJcbiAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uIChrZXksIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGluZGV4ZXMucHVzaCgkKGVsZW1lbnQpLnZhbCgpKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBpbmRleGVzO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUg0Y3Qu9C10LzQtdC90YLQvtCyINCy0YvQsdC+0YDQsCDRgdGC0YDQvtC6XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGFibGVJZFxyXG4gICAgICogQHJldHVybiB7QXJyYXl9XHJcbiAgICAgKi9cclxuICAgIGdldFJvd3NTZWxlY3RzOiBmdW5jdGlvbiAodGFibGVJZCkge1xyXG5cclxuICAgICAgICByZXR1cm4gJCgnI2NvcmV1aS10YWJsZS0nICsgdGFibGVJZCArICcgPiAuY29yZXVpLXRhYmxlX19jb250YWluZXIgPiAuY29yZXVpLXRhYmxlX193cmFwcGVyICA+IHRhYmxlID4gdGJvZHkgPiB0ci5jb3JldWktdGFibGVfX3JlY29yZCA+IHRkLmNvcmV1aS10YWJsZV9fc2VsZWN0X2NvbnRhaW5lcicpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUg0Y3Qu9C10LzQtdC90YLQsCDQtNC70Y8g0LLRi9Cx0L7RgNCwINCy0YHQtdGFINGB0YLRgNC+0LpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0YWJsZUlkXHJcbiAgICAgKiBAcmV0dXJuIHtBcnJheX1cclxuICAgICAqL1xyXG4gICAgZ2V0Um93c1NlbGVjdEFsbDogZnVuY3Rpb24gKHRhYmxlSWQpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuICQoJyNjb3JldWktdGFibGUtJyArIHRhYmxlSWQgKyAnID4gLmNvcmV1aS10YWJsZV9fY29udGFpbmVyID4gLmNvcmV1aS10YWJsZV9fd3JhcHBlciAgPiB0YWJsZSA+IHRoZWFkID4gdHIgPiB0ZCA+IC5jb3JldWktdGFibGVfX3NlbGVjdC1hbGwnKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JLRi9C00LXQu9C10L3QuNC1INGB0YLRgNC+0LrQuCDQsiDRgtCw0LHQu9C40YbQtVxyXG4gICAgICogQHBhcmFtIHtqUXVlcnl9IHRyXHJcbiAgICAgKi9cclxuICAgIHNlbGVjdFRyKHRyKSB7XHJcblxyXG4gICAgICAgIHRyLmFkZENsYXNzKCd0YWJsZS1wcmltYXJ5Jyk7XHJcbiAgICAgICAgJCgnLmNvcmV1aS10YWJsZV9fc2VsZWN0JywgdHIpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JLRi9C00LXQu9C10L3QuNC1INCy0YHQtdGFINGB0YLRgNC+0Log0LIg0YLQsNCx0LvQuNGG0LVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0YWJsZUlkXHJcbiAgICAgKi9cclxuICAgIHNlbGVjdFRyQWxsKHRhYmxlSWQpIHtcclxuXHJcbiAgICAgICAgbGV0IHRhYmxlQ29udGFpbmVyID0gJyNjb3JldWktdGFibGUtJyArIHRhYmxlSWQgKyAnID4gLmNvcmV1aS10YWJsZV9fY29udGFpbmVyID4gLmNvcmV1aS10YWJsZV9fd3JhcHBlciA+IHRhYmxlJztcclxuXHJcbiAgICAgICAgJCh0YWJsZUNvbnRhaW5lciArICcgPiB0aGVhZCA+IHRyID4gdGQgPiAuY29yZXVpLXRhYmxlX19zZWxlY3QtYWxsJykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgICAgICQodGFibGVDb250YWluZXIgKyAnID4gdGJvZHkgPiB0ci5jb3JldWktdGFibGVfX3JlY29yZCcpLmFkZENsYXNzKCd0YWJsZS1wcmltYXJ5Jyk7XHJcbiAgICAgICAgJCh0YWJsZUNvbnRhaW5lciArICcgPiB0Ym9keSA+IHRyLmNvcmV1aS10YWJsZV9fcmVjb3JkID4gdGQgPiAuY29yZXVpLXRhYmxlX19zZWxlY3QnKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCh0L3Rj9GC0LjQtSDQstGL0LTQtdC70LXQvdC40LUg0YHRgtGA0L7QutC4INCyINGC0LDQsdC70LjRhtC1XHJcbiAgICAgKiBAcGFyYW0ge2pRdWVyeX0gdHJcclxuICAgICAqL1xyXG4gICAgdW5zZWxlY3RUcih0cikge1xyXG5cclxuICAgICAgICAkKHRyKS5yZW1vdmVDbGFzcygndGFibGUtcHJpbWFyeScpO1xyXG4gICAgICAgICQoJy5jb3JldWktdGFibGVfX3NlbGVjdCcsIHRyKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQodC90Y/RgtC40LUg0LLRi9C00LXQu9C10L3QuNC1INGB0L4g0LLRgdC10YUg0YHRgtGA0L7QuiDQsiDRgtCw0LHQu9C40YbQtVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRhYmxlSWRcclxuICAgICAqL1xyXG4gICAgdW5zZWxlY3RUckFsbCh0YWJsZUlkKSB7XHJcblxyXG4gICAgICAgIGxldCB0YWJsZUNvbnRhaW5lciA9ICcjY29yZXVpLXRhYmxlLScgKyB0YWJsZUlkICsgJyA+IC5jb3JldWktdGFibGVfX2NvbnRhaW5lciA+IC5jb3JldWktdGFibGVfX3dyYXBwZXIgPiB0YWJsZSc7XHJcblxyXG4gICAgICAgICQodGFibGVDb250YWluZXIgKyAnID4gdGhlYWQgPiB0ciA+IHRkID4gLmNvcmV1aS10YWJsZV9fc2VsZWN0LWFsbCcpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgJCh0YWJsZUNvbnRhaW5lciArICcgPiB0Ym9keSA+IHRyLmNvcmV1aS10YWJsZV9fcmVjb3JkJykucmVtb3ZlQ2xhc3MoJ3RhYmxlLXByaW1hcnknKTtcclxuICAgICAgICAkKHRhYmxlQ29udGFpbmVyICsgJyA+IHRib2R5ID4gdHIuY29yZXVpLXRhYmxlX19yZWNvcmQgPiB0ZC5jb3JldWktdGFibGVfX3NlbGVjdF9jb250YWluZXIgPiAuY29yZXVpLXRhYmxlX19zZWxlY3QnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQpNC40LrRgdCw0YbQuNGPINC60L7Qu9C+0L3QvtC6INGB0LvQtdCy0LBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0YWJsZUlkXHJcbiAgICAgKi9cclxuICAgIGZpeGVkQ29sc0xlZnQ6IGZ1bmN0aW9uICh0YWJsZUlkKSB7XHJcblxyXG4gICAgICAgIGxldCB0YWJsZVdyYXBwZXIgPSAnI2NvcmV1aS10YWJsZS0nICsgdGFibGVJZCArICcgPiAuY29yZXVpLXRhYmxlX19jb250YWluZXIgPiAuY29yZXVpLXRhYmxlX193cmFwcGVyJztcclxuICAgICAgICBsZXQgY29sT2Zmc2V0ICAgID0gMDtcclxuXHJcbiAgICAgICAgJCh0YWJsZVdyYXBwZXIgKyAnID4gdGFibGUgPiB0aGVhZCA+IHRyOmxhc3QtY2hpbGQgPiB0ZC5jb3JldWktdGFibGVfX2ZpeGVkX2xlZnQnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gJCh0aGlzKS5pbmRleCgpICsgMTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgJCh0YWJsZVdyYXBwZXIgKyAnID4gdGFibGUgPiB0aGVhZCA+IHRyOmxhc3QtY2hpbGQgPiB0ZDpudGgtY2hpbGQoJyArIGluZGV4ICsgJyknKS5jc3MoJ2xlZnQnLCBjb2xPZmZzZXQgKyAncHgnKTtcclxuICAgICAgICAgICAgICAgICQodGFibGVXcmFwcGVyICsgJyA+IHRhYmxlID4gdGJvZHkgPiB0ciA+IHRkOm50aC1jaGlsZCgnICsgaW5kZXggKyAnKScpLmNzcygnbGVmdCcsIGNvbE9mZnNldCArICdweCcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb2xPZmZzZXQgKz0gJCh0aGlzKS5vdXRlcldpZHRoKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCk0LjQutGB0LDRhtC40Y8g0LrQvtC70L7QvdC+0Log0YHQv9GA0LDQstCwXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGFibGVJZFxyXG4gICAgICovXHJcbiAgICBmaXhlZENvbHNSaWdodDogZnVuY3Rpb24gKHRhYmxlSWQpIHtcclxuXHJcbiAgICAgICAgbGV0IHRhYmxlV3JhcHBlciA9ICcjY29yZXVpLXRhYmxlLScgKyB0YWJsZUlkICsgJyA+IC5jb3JldWktdGFibGVfX2NvbnRhaW5lciA+IC5jb3JldWktdGFibGVfX3dyYXBwZXInO1xyXG4gICAgICAgIGxldCBjb2xPZmZzZXQgICAgPSAwO1xyXG5cclxuICAgICAgICAkKCQodGFibGVXcmFwcGVyICsgJyA+IHRhYmxlID4gdGhlYWQgPiB0cjpsYXN0LWNoaWxkID4gdGQuY29yZXVpLXRhYmxlX19maXhlZF9yaWdodCcpLmdldCgpLnJldmVyc2UoKSkuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBpbmRleCAgPSAkKHRoaXMpLmluZGV4KCkgKyAxO1xyXG5cclxuICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRhYmxlV3JhcHBlciArICcgPiB0YWJsZSA+IHRoZWFkID4gdHI6bGFzdC1jaGlsZCA+IHRkOm50aC1jaGlsZCgnICsgaW5kZXggKyAnKScpLmNzcygncmlnaHQnLCBjb2xPZmZzZXQgKyAncHgnKTtcclxuICAgICAgICAgICAgICAgICQodGFibGVXcmFwcGVyICsgJyA+IHRhYmxlID4gdGJvZHkgPiB0ciA+IHRkOm50aC1jaGlsZCgnICsgaW5kZXggKyAnKScpLmNzcygncmlnaHQnLCBjb2xPZmZzZXQgKyAncHgnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29sT2Zmc2V0ICs9ICQodGhpcykub3V0ZXJXaWR0aCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb3JldWlUYWJsZUVsZW1lbnRzOyIsIlxyXG5pbXBvcnQgJy4uLy4uL25vZGVfbW9kdWxlcy9lanMvZWpzLm1pbic7XHJcbmltcG9ydCBjb3JldWlUYWJsZSAgICAgICAgIGZyb20gJy4vY29yZXVpLnRhYmxlJztcclxuaW1wb3J0IGNvcmV1aVRhYmxlVHBsICAgICAgZnJvbSAnLi9jb3JldWkudGFibGUudGVtcGxhdGVzJztcclxuaW1wb3J0IGNvcmV1aVRhYmxlVXRpbHMgICAgZnJvbSBcIi4vY29yZXVpLnRhYmxlLnV0aWxzXCI7XHJcbmltcG9ydCBjb3JldWlUYWJsZVJlbmRlciAgIGZyb20gXCIuL2NvcmV1aS50YWJsZS5yZW5kZXJcIjtcclxuaW1wb3J0IGNvcmV1aVRhYmxlRWxlbWVudHMgZnJvbSBcIi4vY29yZXVpLnRhYmxlLmVsZW1lbnRzXCI7XHJcblxyXG5cclxubGV0IGNvcmV1aVRhYmxlSW5zdGFuY2UgPSB7XHJcblxyXG4gICAgX29wdGlvbnM6IHtcclxuICAgICAgICBpZDogbnVsbCxcclxuICAgICAgICBjbGFzczogJycsXHJcbiAgICAgICAgcHJpbWFyeUtleTogJ2lkJyxcclxuICAgICAgICBsYW5nOiAncnUnLFxyXG4gICAgICAgIHNpemU6ICcnLFxyXG4gICAgICAgIHN0cmlwZWQ6IGZhbHNlLFxyXG4gICAgICAgIGhvdmVyOiBmYWxzZSxcclxuICAgICAgICB3aWR0aDogbnVsbCxcclxuICAgICAgICBtaW5XaWR0aDogbnVsbCxcclxuICAgICAgICBtYXhXaWR0aDogbnVsbCxcclxuICAgICAgICBoZWlnaHQ6IG51bGwsXHJcbiAgICAgICAgbWluSGVpZ2h0OiBudWxsLFxyXG4gICAgICAgIG5heEhlaWdodDogbnVsbCxcclxuICAgICAgICBwYWdlOiAxLFxyXG4gICAgICAgIHJlY29yZHNQZXJQYWdlOiAyNSxcclxuXHJcbiAgICAgICAgcmVjb3Jkc1JlcXVlc3Q6IHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICAgICAgdXJsOiBudWxsLCAgLy8gJy9tb2QvaW5kZXgvb3JkZXJzLz9wYWdlPVtwYWdlXSdcclxuICAgICAgICAgICAgcGFnZVBhcmFtOiAncGFnZScsXHJcbiAgICAgICAgICAgIHJlY29yZHNQZXJQYWdlUGFyYW06ICdjb3VudCcsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2hvdzoge1xyXG4gICAgICAgICAgICBjb2x1bW5IZWFkZXJzOiB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkNsaWNrOiBudWxsLFxyXG4gICAgICAgIG9uQ2xpY2tVcmw6IG51bGwsXHJcbiAgICAgICAgY29udHJvbHM6IFtdLFxyXG4gICAgICAgIGNvbHVtbkdyb3Vwc0hlYWRlcjogW10sXHJcbiAgICAgICAgY29sdW1uczogW10sXHJcbiAgICAgICAgY29sdW1uR3JvdXBzRm9vdGVyOiBbXSxcclxuICAgICAgICByZWNvcmRzOiBbXVxyXG4gICAgfSxcclxuXHJcbiAgICBfcGFnZTogMSxcclxuICAgIF9yZWNvcmRzUGVyUGFnZTogMjUsXHJcbiAgICBfcmVjb3Jkc1RvdGFsOiAwLFxyXG4gICAgX3JlY29yZHNOdW1iZXI6IDEsXHJcblxyXG4gICAgX2NvbHVtbnM6IFtdLFxyXG4gICAgX3NlYXJjaDogW10sXHJcbiAgICBfZmlsdGVyOiBbXSxcclxuICAgIF9ldmVudHM6IHt9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uc1xyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgX2luaXQ6IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgdGhpcy5fb3B0aW9ucywgb3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRzICA9IHt9O1xyXG5cclxuXHJcbiAgICAgICAgaWYgKCAhIHRoaXMuX29wdGlvbnMuaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5pZCA9IGNvcmV1aVRhYmxlVXRpbHMuaGFzaENvZGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnBhZ2UgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BhZ2UgPSB0aGlzLl9vcHRpb25zLnBhZ2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnJlY29yZHNQZXJQYWdlID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9yZWNvcmRzUGVyUGFnZSA9IHRoaXMuX29wdGlvbnMucmVjb3Jkc1BlclBhZ2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG5cclxuICAgICAgICAvLyDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDQutC+0LvQvtC90L7QulxyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5fb3B0aW9ucy5jb2x1bW5zID09PSAnb2JqZWN0JyAmJlxyXG4gICAgICAgICAgICBBcnJheS5pc0FycmF5KHRoaXMuX29wdGlvbnMuY29sdW1ucykgJiZcclxuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5jb2x1bW5zLmxlbmd0aCA+IDBcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgJC5lYWNoKHRoaXMuX29wdGlvbnMuY29sdW1ucywgZnVuY3Rpb24gKGtleSwgY29sdW1uKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNvbHVtbi50eXBlID09PSAndW5kZWZpbmVkJyB8fFxyXG4gICAgICAgICAgICAgICAgICAgICEgY29yZXVpVGFibGUuY29sdW1ucy5oYXNPd25Qcm9wZXJ0eShjb2x1bW4udHlwZSlcclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbi50eXBlID0gJ3RleHQnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICggISBjb2x1bW4uaGFzT3duUHJvcGVydHkoJ3Nob3cnKSB8fCB0eXBlb2YgY29sdW1uLnNob3cgIT09ICdib29sZWFuJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbi5zaG93ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgY29sdW1uSW5zdGFuY2UgPSAkLmV4dGVuZCh0cnVlLCB7fSwgY29yZXVpVGFibGUuY29sdW1uc1tjb2x1bW4udHlwZV0pO1xyXG4gICAgICAgICAgICAgICAgY29sdW1uSW5zdGFuY2UuaW5pdCh0aGF0LCBjb2x1bW4pO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5fY29sdW1ucy5wdXNoKGNvbHVtbkluc3RhbmNlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy8g0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0L/QvtC40YHQutC+0LLRi9GFINC/0L7Qu9C10LlcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuX29wdGlvbnMuc2VhcmNoID09PSAnb2JqZWN0JyAmJlxyXG4gICAgICAgICAgICBBcnJheS5pc0FycmF5KHRoaXMuX29wdGlvbnMuc2VhcmNoKSAmJlxyXG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLnNlYXJjaC5sZW5ndGggPiAwXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICQuZWFjaCh0aGlzLl9vcHRpb25zLnNlYXJjaCwgZnVuY3Rpb24gKGtleSwgY29udHJvbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCAhIGNvcmV1aVRhYmxlVXRpbHMuaXNPYmplY3QoY29udHJvbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250cm9sID0ge307XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCAhIGNvbnRyb2wuaGFzT3duUHJvcGVydHkoJ3R5cGUnKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGVvZiBjb250cm9sLnR5cGUgIT09ICdzdHJpbmcnIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICEgY29yZXVpVGFibGUuc2VhcmNoLmhhc093blByb3BlcnR5KGNvbnRyb2wudHlwZSlcclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2wudHlwZSA9ICd0ZXh0JztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgY29udHJvbEluc3RhbmNlID0gJC5leHRlbmQodHJ1ZSwge30sIGNvcmV1aVRhYmxlLnNlYXJjaFtjb250cm9sLnR5cGVdKTtcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xJbnN0YW5jZS5pbml0KHRoYXQsIGNvbnRyb2wpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5fc2VhcmNoLnB1c2goY29udHJvbEluc3RhbmNlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICovXHJcbiAgICBpbml0RXZlbnRzOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGxldCB0aGF0ICAgICAgICAgPSB0aGlzO1xyXG4gICAgICAgIGxldCB0YWJsZVdyYXBwZXIgPSAnI2NvcmV1aS10YWJsZS0nICsgdGhpcy5fb3B0aW9ucy5pZCArICcgPiAuY29yZXVpLXRhYmxlX19jb250YWluZXIgPiAuY29yZXVpLXRhYmxlX193cmFwcGVyJztcclxuXHJcbiAgICAgICAgLy8g0J/QvtC60LDQtyDRgdGC0YDQvtC6XHJcbiAgICAgICAgdGhpcy5vbignc2hvdy1yZWNvcmRzJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgLy8g0J/QtdGA0LXRhdC+0LQg0L/QviDRgdGB0YvQu9C60LVcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGF0Ll9vcHRpb25zLm9uQ2xpY2tVcmwgPT09ICdzdHJpbmcnICYmIHRoYXQuX29wdGlvbnMub25DbGlja1VybCkge1xyXG4gICAgICAgICAgICAgICAgY29yZXVpVGFibGVFbGVtZW50cy5nZXRUclJlY29yZHModGhhdC5nZXRJZCgpKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlY29yZEtleSA9ICQodGhpcykuZGF0YSgncmVjb3JkLWluZGV4Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlY29yZCAgICA9IHRoYXQuZ2V0UmVjb3JkQnlJbmRleChyZWNvcmRLZXkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoICEgcmVjb3JkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB1cmwgPSB0aGF0Ll9vcHRpb25zLm9uQ2xpY2tVcmw7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQuZWFjaChyZWNvcmQsIGZ1bmN0aW9uIChmaWVsZCwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpZWxkUXVvdGUgPSBmaWVsZC5yZXBsYWNlKC8oW15cXHdcXGRdKS9nLCAnXFxcXCQxJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9IHVybC5yZXBsYWNlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFJlZ0V4cCgnXFxcXFsnICsgZmllbGRRdW90ZSArICdcXFxcXScsICdnJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodXJsICYmIHVybCAhPT0gJyMnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSB1cmw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vINCh0L7QsdGL0YLQuNC1INC90LDQttCw0YLQuNGPINC90LAg0YHRgtGA0L7QutGDXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhhdC5fb3B0aW9ucy5vbkNsaWNrID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICBjb3JldWlUYWJsZUVsZW1lbnRzLmdldFRyUmVjb3Jkcyh0aGF0LmdldElkKCkpLmNsaWNrKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZWNvcmRLZXkgPSAkKHRoaXMpLmRhdGEoJ3JlY29yZC1pbmRleCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZWNvcmQgICAgPSB0aGF0LmdldFJlY29yZEJ5SW5kZXgocmVjb3JkS2V5KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhIHJlY29yZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGF0Ll9vcHRpb25zLm9uQ2xpY2soZXZlbnQsIHJlY29yZCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8g0KTQuNC60YHQsNGG0LjRjyDQutC+0LvQvtC90L7QulxyXG4gICAgICAgICAgICBjb3JldWlUYWJsZUVsZW1lbnRzLmZpeGVkQ29sc0xlZnQodGhhdC5nZXRJZCgpKVxyXG4gICAgICAgICAgICBjb3JldWlUYWJsZUVsZW1lbnRzLmZpeGVkQ29sc1JpZ2h0KHRoYXQuZ2V0SWQoKSlcclxuICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICB0aGlzLl90cmlnZ2VyKCdzaG93bicpO1xyXG5cclxuICAgICAgICAvLyDQktGL0LfQvtCyINGB0L7QsdGL0YLQuNGPINC/0L7QutCw0LfQsCDRgdGC0YDQvtC6XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAoXHJcbiAgICAgICAgICAgICAgICAhIHRoaXMuX29wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3JlY29yZHNSZXF1ZXN0JykgfHxcclxuICAgICAgICAgICAgICAgICEgY29yZXVpVGFibGVVdGlscy5pc09iamVjdCh0aGlzLl9vcHRpb25zLnJlY29yZHNSZXF1ZXN0KSB8fFxyXG4gICAgICAgICAgICAgICAgISB0aGlzLl9vcHRpb25zLnJlY29yZHNSZXF1ZXN0LnVybCB8fFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5yZWNvcmRzUmVxdWVzdC51cmwgPT09ICcjJ1xyXG4gICAgICAgICAgICApICYmXHJcbiAgICAgICAgICAgIHR5cGVvZiB0aGlzLl9vcHRpb25zLnJlY29yZHMgPT09ICdvYmplY3QnICYmXHJcbiAgICAgICAgICAgIEFycmF5LmlzQXJyYXkodGhpcy5fb3B0aW9ucy5yZWNvcmRzKSAmJlxyXG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLnJlY29yZHMubGVuZ3RoID4gMFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICB0aGlzLl90cmlnZ2VyKCdzaG93LXJlY29yZHMnLCB0aGlzLCBbIHRoaXMgXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUg0LjQtNC10L3RgtC40YTQuNC60LDRgtC+0YDQsCDRgtCw0LHQu9C40YbRi1xyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0SWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW9ucy5pZDtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QvtC70YPRh9C10L3QuNC1INC+0L/RhtC40Lkg0YLQsNCx0LvQuNGG0YtcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICovXHJcbiAgICBnZXRPcHRpb25zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICQuZXh0ZW5kKHRydWUsIHt9LCB0aGlzLl9vcHRpb25zKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBlbGVtZW50XHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqL1xyXG4gICAgcmVuZGVyOiBmdW5jdGlvbihlbGVtZW50KSB7XHJcblxyXG4gICAgICAgIGxldCB0aGF0ICAgICAgICA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHdpZHRoU2l6ZXMgID0gW107XHJcbiAgICAgICAgbGV0IGhlaWdodFNpemVzID0gW107XHJcbiAgICAgICAgbGV0IHJlbmRlciAgICAgID0ge1xyXG4gICAgICAgICAgICBoZWFkZXJzT3V0OiBbXSxcclxuICAgICAgICAgICAgaGVhZGVyc0luOiBbXSxcclxuICAgICAgICAgICAgZm9vdGVyc0luOiBbXSxcclxuICAgICAgICAgICAgZm9vdGVyc091dDogW11cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLl9yZWNvcmRzVG90YWwgPSB0aGlzLl9vcHRpb25zLnJlY29yZHMubGVuZ3RoO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMud2lkdGggPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCB1bml0ID0gdHlwZW9mIHRoaXMuX29wdGlvbnMud2lkdGggPT09ICdudW1iZXInID8gJ3B4JyA6ICcnO1xyXG4gICAgICAgICAgICB3aWR0aFNpemVzLnB1c2goJ3dpZHRoOicgKyB0aGlzLl9vcHRpb25zLndpZHRoICsgdW5pdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5taW5XaWR0aCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IHVuaXQgPSB0eXBlb2YgdGhpcy5fb3B0aW9ucy5taW5XaWR0aCA9PT0gJ251bWJlcicgPyAncHgnIDogJyc7XHJcbiAgICAgICAgICAgIHdpZHRoU2l6ZXMucHVzaCgnbWluLXdpZHRoOicgKyB0aGlzLl9vcHRpb25zLm1pbldpZHRoICsgdW5pdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5tYXhXaWR0aCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IHVuaXQgPSB0eXBlb2YgdGhpcy5fb3B0aW9ucy5tYXhXaWR0aCA9PT0gJ251bWJlcicgPyAncHgnIDogJyc7XHJcbiAgICAgICAgICAgIHdpZHRoU2l6ZXMucHVzaCgnbWF4LXdpZHRoOicgKyB0aGlzLl9vcHRpb25zLm1heFdpZHRoICsgdW5pdCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuaGVpZ2h0ID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgdW5pdCA9IHR5cGVvZiB0aGlzLl9vcHRpb25zLmhlaWdodCA9PT0gJ251bWJlcicgPyAncHgnIDogJyc7XHJcbiAgICAgICAgICAgIGhlaWdodFNpemVzLnB1c2goJ2hlaWdodDonICsgdGhpcy5fb3B0aW9ucy5oZWlnaHQgKyB1bml0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLm1pbkhlaWdodCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IHVuaXQgPSB0eXBlb2YgdGhpcy5fb3B0aW9ucy5taW5IZWlnaHQgPT09ICdudW1iZXInID8gJ3B4JyA6ICcnO1xyXG4gICAgICAgICAgICBoZWlnaHRTaXplcy5wdXNoKCdtaW4taGVpZ2h0OicgKyB0aGlzLl9vcHRpb25zLm1pbkhlaWdodCArIHVuaXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMubWF4SGVpZ2h0ID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgdW5pdCA9IHR5cGVvZiB0aGlzLl9vcHRpb25zLm1heEhlaWdodCA9PT0gJ251bWJlcicgPyAncHgnIDogJyc7XHJcbiAgICAgICAgICAgIGhlaWdodFNpemVzLnB1c2goJ21heC1oZWlnaHQ6JyArIHRoaXMuX29wdGlvbnMubWF4SGVpZ2h0ICsgdW5pdCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIC8vINCS0LXRgNGF0L3QuNC1INGN0LvQtdC80LXQvdGC0Ysg0YPQv9GA0LDQstC70LXQvdC40Y9cclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLl9vcHRpb25zLmhlYWRlcikgJiZcclxuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5oZWFkZXIubGVuZ3RoID4gMFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICAkLmVhY2godGhpcy5fb3B0aW9ucy5oZWFkZXIsIGZ1bmN0aW9uIChrZXksIGhlYWRlcikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHR5cGUgICAgICAgICAgID0gJ2luJztcclxuICAgICAgICAgICAgICAgIGxldCBjb250cm9sc0xlZnQgICA9IFtdO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbnRyb2xzQ2VudGVyID0gW107XHJcbiAgICAgICAgICAgICAgICBsZXQgY29udHJvbHNSaWdodCAgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGhlYWRlci50eXBlID09PSAnc3RyaW5nJyAmJlxyXG4gICAgICAgICAgICAgICAgICAgIFsnaW4nLCAnb3V0J10uaW5kZXhPZihoZWFkZXIudHlwZS50b0xvd2VyQ2FzZSgpKSA+PSAwXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlID0gaGVhZGVyLnR5cGUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShoZWFkZXIubGVmdCkgJiYgaGVhZGVyLmxlZnQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQuZWFjaChoZWFkZXIubGVmdCwgZnVuY3Rpb24gKGtleSwgY29udHJvbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29yZXVpVGFibGVVdGlscy5pc09iamVjdChjb250cm9sKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRyb2xSZW5kZXIgPSBjb3JldWlUYWJsZVJlbmRlci5yZW5kZXJDb250cm9sKHRoYXQsIGNvbnRyb2wpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250cm9sUmVuZGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbHNMZWZ0LnB1c2goY29udHJvbFJlbmRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShoZWFkZXIuY2VudGVyKSAmJiBoZWFkZXIuY2VudGVyLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAkLmVhY2goaGVhZGVyLmNlbnRlciwgZnVuY3Rpb24gKGtleSwgY29udHJvbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29yZXVpVGFibGVVdGlscy5pc09iamVjdChjb250cm9sKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRyb2xSZW5kZXIgPSBjb3JldWlUYWJsZVJlbmRlci5yZW5kZXJDb250cm9sKHRoYXQsIGNvbnRyb2wpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250cm9sUmVuZGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbHNDZW50ZXIucHVzaChjb250cm9sUmVuZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGhlYWRlci5yaWdodCkgJiYgaGVhZGVyLnJpZ2h0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAkLmVhY2goaGVhZGVyLnJpZ2h0LCBmdW5jdGlvbiAoa2V5LCBjb250cm9sKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb3JldWlUYWJsZVV0aWxzLmlzT2JqZWN0KGNvbnRyb2wpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udHJvbFJlbmRlciA9IGNvcmV1aVRhYmxlUmVuZGVyLnJlbmRlckNvbnRyb2wodGhhdCwgY29udHJvbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRyb2xSZW5kZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sc1JpZ2h0LnB1c2goY29udHJvbFJlbmRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY29udHJvbHNMZWZ0Lmxlbmd0aCA+IDAgfHxcclxuICAgICAgICAgICAgICAgICAgICBjb250cm9sc0NlbnRlci5sZW5ndGggPiAwIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbHNSaWdodC5sZW5ndGggPiAwXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2luJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGVhZGVyQ29udHJvbHMgPSBlanMucmVuZGVyKGNvcmV1aVRhYmxlVHBsWyd0YWJsZS1jb250cm9scy1oZWFkZXIuaHRtbCddLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sc0xlZnQ6IGNvbnRyb2xzTGVmdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xzQ2VudGVyOiBjb250cm9sc0NlbnRlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xzUmlnaHQ6IGNvbnRyb2xzUmlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyLmhlYWRlcnNJbi5wdXNoKGhlYWRlckNvbnRyb2xzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhlYWRlckNvbnRyb2xzID0gZWpzLnJlbmRlcihjb3JldWlUYWJsZVRwbFsndGFibGUtY29udHJvbHMtaGVhZGVyLW91dC5odG1sJ10sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xzTGVmdDogY29udHJvbHNMZWZ0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbHNDZW50ZXI6IGNvbnRyb2xzQ2VudGVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbHNSaWdodDogY29udHJvbHNSaWdodCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZW5kZXIuaGVhZGVyc091dC5wdXNoKGhlYWRlckNvbnRyb2xzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g0J3QuNC20L3QuNC1INGN0LvQtdC80LXQvdGC0Ysg0YPQv9GA0LDQstC70LXQvdC40Y9cclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLl9vcHRpb25zLmZvb3RlcikgJiZcclxuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5mb290ZXIubGVuZ3RoID4gMFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICAkLmVhY2godGhpcy5fb3B0aW9ucy5mb290ZXIsIGZ1bmN0aW9uIChrZXksIGZvb3Rlcikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHR5cGUgICAgICAgICAgID0gJ2luJztcclxuICAgICAgICAgICAgICAgIGxldCBjb250cm9sc0xlZnQgICA9IFtdO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbnRyb2xzQ2VudGVyID0gW107XHJcbiAgICAgICAgICAgICAgICBsZXQgY29udHJvbHNSaWdodCAgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGZvb3Rlci50eXBlID09PSAnc3RyaW5nJyAmJlxyXG4gICAgICAgICAgICAgICAgICAgIFsnaW4nLCAnb3V0J10uaW5kZXhPZihmb290ZXIudHlwZS50b0xvd2VyQ2FzZSgpKSA+PSAwXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlID0gZm9vdGVyLnR5cGUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShmb290ZXIubGVmdCkgJiYgZm9vdGVyLmxlZnQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQuZWFjaChmb290ZXIubGVmdCwgZnVuY3Rpb24gKGtleSwgY29udHJvbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29yZXVpVGFibGVVdGlscy5pc09iamVjdChjb250cm9sKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRyb2xSZW5kZXIgPSBjb3JldWlUYWJsZVJlbmRlci5yZW5kZXJDb250cm9sKHRoYXQsIGNvbnRyb2wpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250cm9sUmVuZGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbHNMZWZ0LnB1c2goY29udHJvbFJlbmRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShmb290ZXIuY2VudGVyKSAmJiBmb290ZXIuY2VudGVyLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAkLmVhY2goZm9vdGVyLmNlbnRlciwgZnVuY3Rpb24gKGtleSwgY29udHJvbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29yZXVpVGFibGVVdGlscy5pc09iamVjdChjb250cm9sKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRyb2xSZW5kZXIgPSBjb3JldWlUYWJsZVJlbmRlci5yZW5kZXJDb250cm9sKHRoYXQsIGNvbnRyb2wpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250cm9sUmVuZGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbHNDZW50ZXIucHVzaChjb250cm9sUmVuZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGZvb3Rlci5yaWdodCkgJiYgZm9vdGVyLnJpZ2h0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAkLmVhY2goZm9vdGVyLnJpZ2h0LCBmdW5jdGlvbiAoa2V5LCBjb250cm9sKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb3JldWlUYWJsZVV0aWxzLmlzT2JqZWN0KGNvbnRyb2wpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udHJvbFJlbmRlciA9IGNvcmV1aVRhYmxlUmVuZGVyLnJlbmRlckNvbnRyb2wodGhhdCwgY29udHJvbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRyb2xSZW5kZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sc1JpZ2h0LnB1c2goY29udHJvbFJlbmRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY29udHJvbHNMZWZ0Lmxlbmd0aCA+IDAgfHxcclxuICAgICAgICAgICAgICAgICAgICBjb250cm9sc0NlbnRlci5sZW5ndGggPiAwIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbHNSaWdodC5sZW5ndGggPiAwXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2luJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZm9vdGVyQ29udHJvbHMgPSBlanMucmVuZGVyKGNvcmV1aVRhYmxlVHBsWyd0YWJsZS1jb250cm9scy1mb290ZXIuaHRtbCddLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sc0xlZnQ6IGNvbnRyb2xzTGVmdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xzQ2VudGVyOiBjb250cm9sc0NlbnRlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xzUmlnaHQ6IGNvbnRyb2xzUmlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyLmZvb3RlcnNJbi5wdXNoKGZvb3RlckNvbnRyb2xzKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZm9vdGVyQ29udHJvbHMgPSBlanMucmVuZGVyKGNvcmV1aVRhYmxlVHBsWyd0YWJsZS1jb250cm9scy1mb290ZXItb3V0Lmh0bWwnXSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbHNMZWZ0OiBjb250cm9sc0xlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sc0NlbnRlcjogY29udHJvbHNDZW50ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sc1JpZ2h0OiBjb250cm9sc1JpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlci5mb290ZXJzT3V0LnB1c2goZm9vdGVyQ29udHJvbHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy8g0JfQsNCz0YDRg9C30LrQsCDQt9Cw0L/QuNGB0LXQuVxyXG4gICAgICAgIGlmIChjb3JldWlUYWJsZVV0aWxzLmlzT2JqZWN0KHRoaXMuX29wdGlvbnMucmVjb3Jkc1JlcXVlc3QpICYmXHJcbiAgICAgICAgICAgIHR5cGVvZiB0aGlzLl9vcHRpb25zLnJlY29yZHNSZXF1ZXN0LnVybCA9PT0gJ3N0cmluZycgJiZcclxuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5yZWNvcmRzUmVxdWVzdC51cmwgIT09ICcjJ1xyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICB0aGlzLm9uKCdzaG93bicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQubG9hZCh0aGF0Ll9vcHRpb25zLnJlY29yZHNSZXF1ZXN0LnVybCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHRhYmxlID0gY29yZXVpVGFibGVSZW5kZXIucmVuZGVyVGFibGUodGhpcyk7XHJcblxyXG5cclxuICAgICAgICBsZXQgaHRtbCA9IGVqcy5yZW5kZXIoY29yZXVpVGFibGVUcGxbJ3RhYmxlLXdyYXBwZXIuaHRtbCddLCB7XHJcbiAgICAgICAgICAgIGlkOiB0aGlzLl9vcHRpb25zLmlkLFxyXG4gICAgICAgICAgICBsYW5nOiB0aGlzLmdldExhbmcoKSxcclxuICAgICAgICAgICAgd2lkdGhTaXplczogd2lkdGhTaXplcyxcclxuICAgICAgICAgICAgaGVpZ2h0U2l6ZXM6IGhlaWdodFNpemVzLFxyXG4gICAgICAgICAgICByZWNvcmRzVG90YWw6IHRoaXMuX3JlY29yZHNUb3RhbCxcclxuICAgICAgICAgICAgcmVuZGVyOiB7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzT3V0IDogcmVuZGVyLmhlYWRlcnNPdXQsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzSW4gOiByZW5kZXIuaGVhZGVyc0luLFxyXG4gICAgICAgICAgICAgICAgZm9vdGVyc0luIDogcmVuZGVyLmZvb3RlcnNJbixcclxuICAgICAgICAgICAgICAgIGZvb3RlcnNPdXQgOiByZW5kZXIuZm9vdGVyc091dCxcclxuICAgICAgICAgICAgICAgIHRhYmxlIDogdGFibGVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGVsZW1lbnQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gaHRtbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIERvbSBlbGVtZW50XHJcbiAgICAgICAgbGV0IGRvbUVsZW1lbnQgPSB7fTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBkb21FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoICEgZG9tRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGRvbUVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGRvbUVsZW1lbnQuaW5uZXJIVE1MID0gaHRtbDtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0RXZlbnRzKCk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCR0LvQvtC60LjRgNC+0LLQutCwINGC0LDQsdC70LjRhtGLXHJcbiAgICAgKi9cclxuICAgIGxvY2s6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IGNvcmV1aVRhYmxlRWxlbWVudHMuZ2V0Q29udGFpbmVyKHRoaXMuZ2V0SWQoKSk7XHJcblxyXG4gICAgICAgIGlmIChjb250YWluZXJbMF0gJiYgISBjb250YWluZXIuZmluZCgnLmNvcmV1aS10YWJsZS1sb2NrJylbMF0pIHtcclxuICAgICAgICAgICAgbGV0IGh0bWwgPSAgZWpzLnJlbmRlcihjb3JldWlUYWJsZVRwbFsndGFibGUtbG9hZGVyLmh0bWwnXSwge1xyXG4gICAgICAgICAgICAgICAgbGFuZzogdGhpcy5nZXRMYW5nKClcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIucHJlcGVuZChodG1sKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCg0LDQt9Cx0LvQvtC60LjRgNC+0LLQutCwINGC0LDQsdC70LjRhtGLXHJcbiAgICAgKi9cclxuICAgIHVubG9jazogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBjb3JldWlUYWJsZUVsZW1lbnRzLmdldExvY2soKS5oaWRlKDUwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlKClcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JfQsNCz0YDRg9C30LrQsCDRgdGC0YDQvtC6XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kXHJcbiAgICAgKi9cclxuICAgIGxvYWQ6IGZ1bmN0aW9uICh1cmwsIG1ldGhvZCkge1xyXG5cclxuICAgICAgICB0aGlzLmxvY2soKTtcclxuXHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICBpZiAodXJsLm1hdGNoKC9cXFtwYWdlXFxdLykpIHtcclxuICAgICAgICAgICAgdXJsID0gdXJsLnJlcGxhY2UoL1xcW3BhZ2VcXF0vZywgdGhpcy5fcGFnZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodXJsLm1hdGNoKC9cXFtjb3VudFxcXS8pKSB7XHJcbiAgICAgICAgICAgIHVybCA9IHVybC5yZXBsYWNlKC9cXFtjb3VudFxcXS9nLCB0aGlzLl9yZWNvcmRzUGVyUGFnZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodXJsLm1hdGNoKC9cXFtzdGFydFxcXS8pKSB7XHJcbiAgICAgICAgICAgIHVybCA9IHVybC5yZXBsYWNlKC9cXFtzdGFydFxcXS9nLCAoKHRoaXMuX3BhZ2UgLSAxKSAqIHRoaXMuX3JlY29yZHNQZXJQYWdlKSArIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHVybC5tYXRjaCgvXFxbZW5kXFxdLykpIHtcclxuICAgICAgICAgICAgdXJsID0gdXJsLnJlcGxhY2UoL1xcW2VuZFxcXS9nLCAoKHRoaXMuX3BhZ2UgLSAxKSAqIHRoaXMuX3JlY29yZHNQZXJQYWdlKSArIE51bWJlcih0aGlzLl9yZWNvcmRzUGVyUGFnZSkpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCB8fCAnR0VUJyxcclxuICAgICAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgICAgICAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbih4aHIpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuX3RyaWdnZXIoJ3N0YXJ0LWxvYWQtcmVjb3JkcycsIHRoYXQsIFsgdGhhdCwgeGhyIF0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5oYXNPd25Qcm9wZXJ0eSgncmVjb3JkcycpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZW9mIHJlc3VsdC5yZWNvcmRzID09PSAnb2JqZWN0JyAmJlxyXG4gICAgICAgICAgICAgICAgICAgIEFycmF5LmlzQXJyYXkocmVzdWx0LnJlY29yZHMpXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdG90YWwgPSByZXN1bHQuaGFzT3duUHJvcGVydHkoJ3RvdGFsJykgJiYgY29yZXVpVGFibGVVdGlscy5pc051bWVyaWMocmVzdWx0LnRvdGFsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHJlc3VsdC50b3RhbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5fdmlld1JlY29yZHMocmVzdWx0LnJlY29yZHMsIHRvdGFsKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuX3ZpZXdSZWNvcmRzKFtdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKHhociwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuX3ZpZXdSZWNvcmRzKFtdKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuX3RyaWdnZXIoJ2Vycm9yLWxvYWQtcmVjb3JkcycsIHRoYXQsIFsgdGhhdCwgeGhyLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93biBdKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKHhociwgdGV4dFN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgdGhhdC51bmxvY2soKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuX3RyaWdnZXIoJ2VuZC1sb2FkLXJlY29yZHMnLCB0aGF0LCBbIHRoYXQsIHhociwgdGV4dFN0YXR1cyBdKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QtdGA0LXQt9Cw0LPRgNGD0LfQutCwINC30LDQv9C40YHQtdC5INCyINGC0LDQsdC70LjRhtC1XHJcbiAgICAgKi9cclxuICAgIHJlbG9hZDogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBpZiAoY29yZXVpVGFibGVVdGlscy5pc09iamVjdCh0aGlzLl9vcHRpb25zLnJlY29yZHNSZXF1ZXN0KSAmJlxyXG4gICAgICAgICAgICB0eXBlb2YgdGhpcy5fb3B0aW9ucy5yZWNvcmRzUmVxdWVzdC51cmwgPT09ICdzdHJpbmcnICYmXHJcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMucmVjb3Jkc1JlcXVlc3QudXJsICE9PSAnIydcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkKHRoaXMuX29wdGlvbnMucmVjb3Jkc1JlcXVlc3QudXJsLCB0aGlzLl9vcHRpb25zLnJlY29yZHNSZXF1ZXN0Lm1ldGhvZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C10YDQtdGB0L7Qt9C00LDQvdC40LUg0YLQtdC70LAg0YLQsNCx0LvQuNGG0YtcclxuICAgICAqL1xyXG4gICAgcmVmcmVzaDogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBsZXQgdGFibGUgPSBjb3JldWlUYWJsZVJlbmRlci5yZW5kZXJUYWJsZSh0aGlzKTtcclxuXHJcbiAgICAgICAgY29yZXVpVGFibGVFbGVtZW50cy5nZXRUYWJsZSh0aGlzLmdldElkKCkpLnJlcGxhY2VXaXRoKHRhYmxlKTtcclxuXHJcbiAgICAgICAgdGhpcy5fdHJpZ2dlcignc2hvdy1yZWNvcmRzJywgdGhpcywgWyB0aGlzIF0pO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQo9GB0YLQsNC90L7QstC60LAg0L7QsdGJ0LXQs9C+INC60L7Qu9C40YfQtdGB0YLQstCwINC30LDQv9C40YHQtdC5INC90LAg0YHRgtGA0LDQvdC40YbQtVxyXG4gICAgICogQHBhcmFtIHJlY29yZHNQZXJQYWdlXHJcbiAgICAgKi9cclxuICAgIHNldFBhZ2VTaXplOiBmdW5jdGlvbiAocmVjb3Jkc1BlclBhZ2UpIHtcclxuXHJcbiAgICAgICAgdGhpcy5fcmVjb3Jkc1BlclBhZ2UgPSByZWNvcmRzUGVyUGFnZTtcclxuXHJcbiAgICAgICAgdGhpcy5fdHJpZ2dlcigndXBkYXRlLXBhZ2Utc2l6ZScsIHRoaXMpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQktGL0LHQvtGAINCy0YHQtdGFINC30LDQv9C40YHQtdC5INCyINGC0LDQsdC70LjRhtC1XHJcbiAgICAgKi9cclxuICAgIHNlbGVjdEFsbDogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBjb3JldWlUYWJsZUVsZW1lbnRzLnNlbGVjdFRyQWxsKHRoaXMuZ2V0SWQoKSlcclxuXHJcbiAgICAgICAgdGhpcy5fdHJpZ2dlcignc2VsZWN0LWFsbCcsIHRoaXMpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQntGC0LzQtdC90LAg0LLRi9Cx0L7RgCDQstGB0LXRhSDQt9Cw0L/QuNGB0LXQuSDQsiDRgtCw0LHQu9C40YbQtVxyXG4gICAgICovXHJcbiAgICB1bnNlbGVjdEFsbDogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBjb3JldWlUYWJsZUVsZW1lbnRzLnVuc2VsZWN0VHJBbGwodGhpcy5nZXRJZCgpKVxyXG5cclxuICAgICAgICB0aGlzLl90cmlnZ2VyKCd1bnNlbGVjdC1hbGwnLCB0aGlzKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JLRi9Cx0L7RgCDQt9Cw0L/QuNGB0Lgg0LIg0YLQsNCx0LvQuNGG0LVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICovXHJcbiAgICBzZWxlY3RSZWNvcmQ6IGZ1bmN0aW9uIChpZCkge1xyXG5cclxuICAgICAgICBsZXQgcm93ID0gdGhpcy5nZXRSb3dCeUlkKGlkKTtcclxuXHJcbiAgICAgICAgaWYgKCAhIHJvdykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdHIgPSBjb3JldWlUYWJsZUVsZW1lbnRzLmdldFRyQnlJbmRleCh0aGlzLmdldElkKCksIHJvdy5pbmRleCk7XHJcblxyXG4gICAgICAgIGlmICh0ci5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29yZXVpVGFibGVFbGVtZW50cy5zZWxlY3RUcih0cilcclxuXHJcbiAgICAgICAgdGhpcy5fdHJpZ2dlcignc2VsZWN0JywgdGhpcywgWyByb3cucmVjb3JkIF0pO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQntGC0LzQtdC90LAg0LLRi9Cx0L7RgNCwINC30LDQv9C40YHQuCDQsiDRgtCw0LHQu9C40YbQtVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICAgKi9cclxuICAgIHVuc2VsZWN0UmVjb3JkOiBmdW5jdGlvbiAoaWQpIHtcclxuXHJcbiAgICAgICAgbGV0IHJvdyA9IHRoaXMuZ2V0Um93QnlJZChpZCk7XHJcblxyXG4gICAgICAgIGlmICggISByb3cpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHRyID0gY29yZXVpVGFibGVFbGVtZW50cy5nZXRUckJ5SW5kZXgodGhpcy5nZXRJZCgpLCByb3cuaW5kZXgpO1xyXG5cclxuICAgICAgICBpZiAoICEgdHIpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29yZXVpVGFibGVFbGVtZW50cy51bnNlbGVjdFRyKHRyKVxyXG5cclxuICAgICAgICB0aGlzLl90cmlnZ2VyKCd1bnNlbGVjdCcsIHRoaXMsIFsgcm93LnJlY29yZCBdKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QvtC70YPRh9C10L3QuNC1INCy0YvQsdGA0LDQvdC90YvRhSBpZFxyXG4gICAgICogQHJldHVybiB7YXJyYXl9XHJcbiAgICAgKi9cclxuICAgIGdldFNlbGVjdGVkUmVjb3Jkc0lkOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGxldCByZWNvcmRzID0gW107XHJcbiAgICAgICAgbGV0IHRoYXQgICAgPSB0aGlzO1xyXG4gICAgICAgIGxldCBmaWVsZCAgID0gdGhpcy5fb3B0aW9ucy5wcmltYXJ5S2V5O1xyXG5cclxuICAgICAgICAkLmVhY2goY29yZXVpVGFibGVFbGVtZW50cy5nZXRTZWxlY3RlZEluZGV4ZXModGhpcy5nZXRJZCgpKSwgZnVuY3Rpb24gKGtleSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIGxldCByZWNvcmQgPSB0aGF0LmdldFJlY29yZEJ5SW5kZXgoaW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCAhIHJlY29yZCB8fCAhIHJlY29yZC5oYXNPd25Qcm9wZXJ0eShmaWVsZCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmVjb3Jkcy5wdXNoKHJlY29yZFtmaWVsZF0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gcmVjb3JkcztcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QvtC70YPRh9C10L3QuNC1INCy0YvQsdGA0LDQvdC90YvRhSDQt9Cw0L/QuNGB0LXQuVxyXG4gICAgICogQHJldHVybiB7YXJyYXl9XHJcbiAgICAgKi9cclxuICAgIGdldFNlbGVjdGVkUmVjb3JkczogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBsZXQgcmVjb3JkcyA9IFtdO1xyXG4gICAgICAgIGxldCB0aGF0ICAgID0gdGhpcztcclxuXHJcbiAgICAgICAgJC5lYWNoKGNvcmV1aVRhYmxlRWxlbWVudHMuZ2V0U2VsZWN0ZWRJbmRleGVzKHRoaXMuZ2V0SWQoKSksIGZ1bmN0aW9uIChrZXksIGluZGV4KSB7XHJcbiAgICAgICAgICAgIGxldCByZWNvcmQgPSB0aGF0LmdldFJlY29yZEJ5SW5kZXgoaW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCAhIHJlY29yZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZWNvcmRzLnB1c2gocmVjb3JkKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlY29yZHM7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSDQt9Cw0L/QuNGB0Lgg0L/QviBpZFxyXG4gICAgICogQHBhcmFtIGlkXHJcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R8bnVsbH1cclxuICAgICAqL1xyXG4gICAgZ2V0UmVjb3JkOiBmdW5jdGlvbiAoaWQpIHtcclxuXHJcbiAgICAgICAgbGV0IHJvdyA9IHRoaXMuZ2V0Um93QnlJZChpZCk7XHJcblxyXG4gICAgICAgIGlmICggISByb3cpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gJC5leHRlbmQodHJ1ZSwge30sIHJvdy5yZWNvcmQpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUg0LfQsNC/0LjRgdC10LlcclxuICAgICAqL1xyXG4gICAgZ2V0UmVjb3JkczogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICByZXR1cm4gJC5leHRlbmQodHJ1ZSwge30sIHRoaXMuX29wdGlvbnMucmVjb3Jkcyk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0LXRgNC10YXQvtC0INC6INC/0YDQtdC00YvQtNGD0YnQtdC5INGB0YLRgNCw0L3QuNGG0LVcclxuICAgICAqL1xyXG4gICAgcHJldlBhZ2U6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3BhZ2UgPiAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BhZ2UtLTtcclxuICAgICAgICAgICAgdGhpcy5yZWxvYWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0LXRgNC10YXQvtC0INC6INGB0LvQtdC00YPRjtGJ0LXQuSDRgdGC0YDQsNC90LjRhtC1XHJcbiAgICAgKiBAcmV0dXJuIHthcnJheX1cclxuICAgICAqL1xyXG4gICAgbmV4dFBhZ2U6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgbGV0IHRvdGFsUGFnZXMgPSB0aGlzLl9yZWNvcmRzVG90YWwgPiAwICYmIHRoaXMuX3JlY29yZHNQZXJQYWdlID4gMFxyXG4gICAgICAgICAgICA/IE1hdGguY2VpbCh0aGlzLl9yZWNvcmRzVG90YWwgLyB0aGlzLl9yZWNvcmRzUGVyUGFnZSlcclxuICAgICAgICAgICAgOiAxO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fcGFnZSA8IHRvdGFsUGFnZXMpIHtcclxuICAgICAgICAgICAgdGhpcy5fcGFnZSsrO1xyXG4gICAgICAgICAgICB0aGlzLnJlbG9hZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QtdGA0LXRhdC+0LQg0Log0YPQutCw0LfQsNC90L3QvtC5INGB0YLRgNCw0L3QuNGG0LVcclxuICAgICAqL1xyXG4gICAgZ29QYWdlOiBmdW5jdGlvbiAocGFnZSkge1xyXG5cclxuICAgICAgICBpZiAocGFnZSA+PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BhZ2UgPSBwYWdlO1xyXG4gICAgICAgICAgICB0aGlzLnJlbG9hZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0KDQtdCz0LjRgdGC0YDQsNGG0LjRjyDRhNGD0L3QutGG0LjQuCDQvdCwINGB0L7QsdGL0YLQuNC1XHJcbiAgICAgKiBAcGFyYW0gZXZlbnROYW1lXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tcclxuICAgICAqIEBwYXJhbSBjb250ZXh0XHJcbiAgICAgKiBAcGFyYW0gc2luZ2xlRXhlY1xyXG4gICAgICovXHJcbiAgICBvbjogZnVuY3Rpb24oZXZlbnROYW1lLCBjYWxsYmFjaywgY29udGV4dCwgc2luZ2xlRXhlYykge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5fZXZlbnRzW2V2ZW50TmFtZV0gIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50c1tldmVudE5hbWVdID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2V2ZW50c1tldmVudE5hbWVdLnB1c2goe1xyXG4gICAgICAgICAgICBjb250ZXh0IDogY29udGV4dCB8fCB0aGlzLFxyXG4gICAgICAgICAgICBjYWxsYmFjazogY2FsbGJhY2ssXHJcbiAgICAgICAgICAgIHNpbmdsZUV4ZWM6ICEhIHNpbmdsZUV4ZWMsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSDQv9C10YDQtdCy0L7QtNC+0LJcclxuICAgICAqIEByZXR1cm4ge29iamVjdH1cclxuICAgICAqL1xyXG4gICAgZ2V0TGFuZzogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBsZXQgcmVzdWx0ID0ge307XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLmxhbmcgJiYgY29yZXVpVGFibGUubGFuZy5oYXNPd25Qcm9wZXJ0eSh0aGlzLl9vcHRpb25zLmxhbmcpKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IGNvcmV1aVRhYmxlLmxhbmdbdGhpcy5fb3B0aW9ucy5sYW5nXTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IGxhbmcgPSBjb3JldWlUYWJsZS5nZXRTZXR0aW5nKCdsYW5nJylcclxuXHJcbiAgICAgICAgICAgIGlmIChsYW5nICYmIGNvcmV1aVRhYmxlLmxhbmcuaGFzT3duUHJvcGVydHkobGFuZykpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGNvcmV1aVRhYmxlLmxhbmdbbGFuZ107XHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKE9iamVjdC5rZXlzKGNvcmV1aVRhYmxlLmxhbmcpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGNvcmV1aVRhYmxlLmxhbmdbT2JqZWN0LmtleXMoY29yZXVpVGFibGUubGFuZylbMF1dO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gJC5leHRlbmQodHJ1ZSwge30sIHJlc3VsdCk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCj0YHRgtCw0L3QvtCy0LrQsCDQstC40LTQuNC80YvRhSDQutC+0LvQvtC90L7Quiwg0L3QtSDRg9C60LDQt9Cw0L3QvdGL0LUg0LrQvtC70L7QvdC60Lgg0LHRg9C00YPRgiDRgdC60YDRi9GC0YtcclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGNvbHVtbnNcclxuICAgICAqL1xyXG4gICAgc2V0Q29sdW1uc1Nob3c6IGZ1bmN0aW9uIChjb2x1bW5zKSB7XHJcblxyXG4gICAgICAgIGlmICggISBBcnJheS5pc0FycmF5KGNvbHVtbnMpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQuZWFjaCh0aGlzLl9jb2x1bW5zLCBmdW5jdGlvbiAoa2V5LCBjb2x1bW4pIHtcclxuICAgICAgICAgICAgbGV0IG9wdGlvbnMgPSBjb2x1bW4uZ2V0T3B0aW9ucygpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2ZpZWxkJykgJiYgdHlwZW9mIG9wdGlvbnMuZmllbGQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW4uc2V0U2hvdyhjb2x1bW5zLmluZGV4T2Yob3B0aW9ucy5maWVsZCkgPj0gMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QvtC40YHQuiDQv9C+INGC0LDQsdC70LjRhtC1XHJcbiAgICAgKi9cclxuICAgIHNlYXJjaFJlY29yZHM6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3NlYXJjaC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGNvbnRyb2xzU2VhcmNoID0gW107XHJcblxyXG4gICAgICAgICQuZWFjaCh0aGlzLl9zZWFyY2gsIGZ1bmN0aW9uIChrZXksIGNvbnRyb2wpIHtcclxuICAgICAgICAgICAgbGV0IG9wdGlvbnMgPSBjb250cm9sLmdldE9wdGlvbnMoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KCdmaWVsZCcpICYmXHJcbiAgICAgICAgICAgICAgICB0eXBlb2Ygb3B0aW9ucy5maWVsZCA9PT0gJ3N0cmluZycgJiZcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMuZmllbGRcclxuICAgICAgICAgICAgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gY29udHJvbC5nZXRWYWx1ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xzU2VhcmNoLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZDogb3B0aW9ucy5maWVsZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIGlmIChjb250cm9sc1NlYXJjaC5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0KTQuNC70YzRgtGA0LDRhtC40Y8g0L/QviDRgtCw0LHQu9C40YbQtVxyXG4gICAgICovXHJcbiAgICBmaWx0ZXJSZWNvcmRzOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9maWx0ZXIubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjb250cm9sc0ZpbHRlcnMgPSBbXTtcclxuXHJcbiAgICAgICAgJC5lYWNoKHRoaXMuX2ZpbHRlciwgZnVuY3Rpb24gKGtleSwgY29udHJvbCkge1xyXG4gICAgICAgICAgICBsZXQgb3B0aW9ucyA9IGNvbnRyb2wuZ2V0T3B0aW9ucygpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2ZpZWxkJykgJiZcclxuICAgICAgICAgICAgICAgIHR5cGVvZiBvcHRpb25zLmZpZWxkID09PSAnc3RyaW5nJyAmJlxyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5maWVsZFxyXG4gICAgICAgICAgICApIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBjb250cm9sLmdldFZhbHVlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbHNGaWx0ZXJzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZDogb3B0aW9ucy5maWVsZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIGlmIChjb250cm9sc0ZpbHRlcnMubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSDQt9Cw0L/QuNGB0Lgg0L/QviDQuNC90LTQtdC60YHRg1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBpbmRleFxyXG4gICAgICogQHJldHVybiB7b2JqZWN0fG51bGx9XHJcbiAgICAgKi9cclxuICAgIGdldFJlY29yZEJ5SW5kZXg6IGZ1bmN0aW9uIChpbmRleCkge1xyXG5cclxuICAgICAgICBpZiAoWydzdHJpbmcnLCAnbnVtYmVyJ10uaW5kZXhPZih0eXBlb2YgaW5kZXgpIDwgMCB8fCBpbmRleCA9PT0gJycpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW9ucy5yZWNvcmRzLmhhc093blByb3BlcnR5KGluZGV4KVxyXG4gICAgICAgICAgICA/IHRoaXMuX29wdGlvbnMucmVjb3Jkc1tpbmRleF1cclxuICAgICAgICAgICAgOiBudWxsO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUg0LfQsNC/0LjRgdC4INC/0L4gaWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICogQHJldHVybiB7b2JqZWN0fG51bGx9XHJcbiAgICAgKi9cclxuICAgIGdldFJvd0J5SWQ6IGZ1bmN0aW9uIChpZCkge1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRSb3dCeUZpZWxkKHRoaXMuX29wdGlvbnMucHJpbWFyeUtleSwgaWQpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUg0LfQsNC/0LjRgdC4INC/0L4g0L/QvtC70Y5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSAgICAgICAgZmllbGRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gdmFsdWVcclxuICAgICAqIEByZXR1cm4ge29iamVjdHxudWxsfVxyXG4gICAgICovXHJcbiAgICBnZXRSb3dCeUZpZWxkOiBmdW5jdGlvbiAoZmllbGQsIHZhbHVlKSB7XHJcblxyXG4gICAgICAgIGlmIChbJ3N0cmluZycsICdudW1iZXInXS5pbmRleE9mKHR5cGVvZiBmaWVsZCkgPCAwIHx8IGZpZWxkID09PSAnJykge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBpbmRleCAgPSBudWxsO1xyXG4gICAgICAgIGxldCByZWNvcmQgPSBudWxsO1xyXG5cclxuICAgICAgICAkLmVhY2godGhpcy5fb3B0aW9ucy5yZWNvcmRzLCBmdW5jdGlvbiAoa2V5LCByZWNvcmRJdGVtKSB7XHJcbiAgICAgICAgICAgIGlmIChyZWNvcmRJdGVtLmhhc093blByb3BlcnR5KGZpZWxkKSAmJiByZWNvcmRJdGVtW2ZpZWxkXSA9PT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGluZGV4ICA9IGtleTtcclxuICAgICAgICAgICAgICAgIHJlY29yZCA9IHJlY29yZEl0ZW07XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKCAhIHJlY29yZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcclxuICAgICAgICAgICAgcmVjb3JkOiByZWNvcmQsXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QvtC60LDQtyDRg9C60LDQt9Cw0L3QvdGL0YUg0LfQsNC/0LjRgdC10Lkg0LIg0YLQsNCx0LvQuNGG0LVcclxuICAgICAqIEBwYXJhbSByZWNvcmRzXHJcbiAgICAgKiBAcGFyYW0gdG90YWxcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIF92aWV3UmVjb3JkczogZnVuY3Rpb24gKHJlY29yZHMsIHRvdGFsKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX3JlY29yZHNUb3RhbCA9IGNvcmV1aVRhYmxlVXRpbHMuaXNOdW1lcmljKHRvdGFsKSA/IHBhcnNlSW50KHRvdGFsKSA6IHJlY29yZHMubGVuZ3RoO1xyXG4gICAgICAgIGxldCB0aGF0ICAgICAgICAgICA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGh0bWxSZWNvcmRzICAgID0gJyc7XHJcblxyXG4gICAgICAgIHRoaXMuX29wdGlvbnMucmVjb3JkcyA9IHJlY29yZHM7XHJcblxyXG4gICAgICAgIHRoYXQuX3JlY29yZHNOdW1iZXIgPSB0aGlzLl9wYWdlID09PSAxID8gMSA6ICgodGhpcy5fcGFnZSAtIDEpICogdGhpcy5fcmVjb3Jkc1BlclBhZ2UpICsgMTtcclxuXHJcbiAgICAgICAgaWYgKHJlY29yZHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgcmVuZGVyUmVjb3JkZXJzID0gW107XHJcblxyXG4gICAgICAgICAgICAkLmVhY2gocmVjb3JkcywgZnVuY3Rpb24gKGtleSwgcmVjb3JkKSB7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJSZWNvcmRlcnMucHVzaChjb3JldWlUYWJsZVJlbmRlci5yZW5kZXJSZWNvcmQodGhhdCwgcmVjb3JkLCBrZXkpKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuX3JlY29yZHNOdW1iZXIrKztcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBodG1sUmVjb3JkcyA9IGVqcy5yZW5kZXIoY29yZXVpVGFibGVUcGxbJ3RhYmxlLXJlY29yZHMuaHRtbCddLCB7XHJcbiAgICAgICAgICAgICAgICByZWNvcmRzOiByZW5kZXJSZWNvcmRlcnMsXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBodG1sUmVjb3JkcyA9IGVqcy5yZW5kZXIoY29yZXVpVGFibGVUcGxbJ3RhYmxlLXJlY29yZHMtZW1wdHkuaHRtbCddLCB7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW5zQ291bnQ6IHRoaXMuX2NvbHVtbnMubGVuZ3RoID4gMCA/IHRoaXMuX2NvbHVtbnMubGVuZ3RoIDogMSxcclxuICAgICAgICAgICAgICAgIGxhbmc6IHRoaXMuZ2V0TGFuZygpLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvcmV1aVRhYmxlRWxlbWVudHMuZ2V0VGFibGVUYm9keSh0aGlzLmdldElkKCkpLmh0bWwoaHRtbFJlY29yZHMpO1xyXG5cclxuICAgICAgICB0aGlzLl90cmlnZ2VyKCdzaG93LXJlY29yZHMnLCB0aGlzLCBbIHRoaXMgXSk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCS0YvQv9C+0LvQvdC10L3QuNGPINC30LDRgNC10LPQuNGB0YLRgNC40YDQvtCy0LDQvdC90YvRhSDRhNGD0L3QutGG0LjQuSDQsiDRg9C60LDQt9Cw0L3QvdC+0Lwg0YHQvtCx0YvRgtC40LhcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSAgICAgIG5hbWVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fG51bGx9IGNvbnRleHRcclxuICAgICAqIEBwYXJhbSB7QXJyYXl9ICAgICAgIHBhcmFtc1xyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgX3RyaWdnZXI6IGZ1bmN0aW9uKG5hbWUsIGNvbnRleHQsIHBhcmFtcykge1xyXG5cclxuICAgICAgICBwYXJhbXMgPSBwYXJhbXMgfHwgW107XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9ldmVudHNbbmFtZV0gaW5zdGFuY2VvZiBPYmplY3QgJiYgdGhpcy5fZXZlbnRzW25hbWVdLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9ldmVudHNbbmFtZV0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBjYWxsYmFjayA9IHRoaXMuX2V2ZW50c1tuYW1lXVtpXS5jYWxsYmFjaztcclxuXHJcbiAgICAgICAgICAgICAgICBjb250ZXh0ID0gY29udGV4dCB8fCB0aGlzLl9ldmVudHNbbmFtZV1baV0uY29udGV4dDtcclxuXHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5hcHBseShjb250ZXh0LCBwYXJhbXMpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9ldmVudHNbbmFtZV1baV0uc2luZ2xlRXhlYykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50c1tuYW1lXS5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb3JldWlUYWJsZUluc3RhbmNlOyIsIlxyXG5pbXBvcnQgY29yZXVpRm9ybUluc3RhbmNlIGZyb20gJy4vY29yZXVpLnRhYmxlLmluc3RhbmNlJztcclxuXHJcbmxldCBjb3JldWlUYWJsZSA9IHtcclxuXHJcbiAgICBjb2x1bW5zOiB7fSxcclxuICAgIGNvbnRyb2xzOiB7fSxcclxuICAgIGZpbHRlcnM6IHt9LFxyXG4gICAgc2VhcmNoOiB7fSxcclxuICAgIGxhbmc6IHt9LFxyXG5cclxuICAgIF9pbnN0YW5jZXM6IHt9LFxyXG4gICAgX3NldHRpbmdzOiB7XHJcbiAgICAgICAgbGFuZzogJ3J1JyxcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uc1xyXG4gICAgICogQHJldHVybnMge0NvcmVVSS50YWJsZS5pbnN0YW5jZX1cclxuICAgICAqL1xyXG4gICAgY3JlYXRlOiBmdW5jdGlvbiAob3B0aW9ucykge1xyXG5cclxuICAgICAgICBsZXQgaW5zdGFuY2UgPSAkLmV4dGVuZCh0cnVlLCB7fSwgY29yZXVpRm9ybUluc3RhbmNlKTtcclxuICAgICAgICBpbnN0YW5jZS5faW5pdChvcHRpb25zIGluc3RhbmNlb2YgT2JqZWN0ID8gb3B0aW9ucyA6IHt9KTtcclxuXHJcbiAgICAgICAgbGV0IHRhYmxlSWQgPSBpbnN0YW5jZS5nZXRJZCgpO1xyXG4gICAgICAgIHRoaXMuX2luc3RhbmNlc1t0YWJsZUlkXSA9IGluc3RhbmNlO1xyXG5cclxuICAgICAgICByZXR1cm4gaW5zdGFuY2U7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICogQHJldHVybnMge0NvcmVVSS50YWJsZS5pbnN0YW5jZXxudWxsfVxyXG4gICAgICovXHJcbiAgICBnZXQ6IGZ1bmN0aW9uIChpZCkge1xyXG5cclxuICAgICAgICBpZiAoICEgdGhpcy5faW5zdGFuY2VzLmhhc093blByb3BlcnR5KGlkKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggISAkKCcjY29yZXVpLXRhYmxlLScgKyBpZClbMF0pIHtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2luc3RhbmNlc1tpZF07XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlc1tpZF07XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCj0YHRgtCw0L3QvtCy0LrQsCDQvdCw0YHRgtGA0L7QtdC6XHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gc2V0dGluZ3NcclxuICAgICAqL1xyXG4gICAgc2V0U2V0dGluZ3M6IGZ1bmN0aW9uKHNldHRpbmdzKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX3NldHRpbmdzID0gJC5leHRlbmQodHJ1ZSwge30sIHRoaXMuX3NldHRpbmdzLCBzZXR0aW5ncyk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSDQt9C90LDRh9C10L3QuNGPINC90LDRgdGC0YDQvtC50LrQuFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqL1xyXG4gICAgZ2V0U2V0dGluZzogZnVuY3Rpb24obmFtZSkge1xyXG5cclxuICAgICAgICBsZXQgdmFsdWUgPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fc2V0dGluZ3MuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcclxuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLl9zZXR0aW5nc1tuYW1lXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29yZXVpVGFibGU7IiwiXHJcbmltcG9ydCBjb3JldWlUYWJsZSBmcm9tIFwiLi4vY29yZXVpLnRhYmxlXCI7XHJcblxyXG5jb3JldWlUYWJsZS5sYW5nLnJ1ID0ge1xyXG4gICAgXCJlbXB0eVJlY29yZHNcIjogXCLQndC10YIg0LfQsNC/0LjRgdC10LlcIixcclxuICAgIFwibG9hZGluZ1wiOiBcItCX0LDQs9GA0YPQt9C60LAuLi5cIixcclxuICAgIFwidG90YWxcIjogXCLQktGB0LXQs9C+XCIsXHJcbiAgICBcImFsbFwiOiBcItCS0YHQtVwiLFxyXG4gICAgXCJjb21wbGV0ZVwiOiBcItCf0YDQuNC80LXQvdC40YLRjFwiLFxyXG4gICAgXCJzZWFyY2hcIjogXCLQmNGB0LrQsNGC0YxcIixcclxuICAgIFwiY2xlYXJcIjogXCLQntGH0LjRgdGC0LjRgtGMXCIsXHJcbn0iLCJcclxuaW1wb3J0IGNvcmV1aVRhYmxlIGZyb20gXCIuLi9jb3JldWkudGFibGVcIjtcclxuXHJcbmNvcmV1aVRhYmxlLmxhbmcucnUgPSB7XHJcbiAgICBcImVtcHR5UmVjb3Jkc1wiOiBcIk5vIHJlY29yZHNcIixcclxuICAgIFwibG9hZGluZ1wiOiBcIkxvYWRpbmcuLi5cIixcclxuICAgIFwidG90YWxcIjogXCJUb3RhbFwiLFxyXG4gICAgXCJhbGxcIjogXCJBbGxcIixcclxuICAgIFwiY29tcGxldGVcIjogXCJDb21wbGV0ZVwiLFxyXG4gICAgXCJzZWFyY2hcIjogXCJTZWFyY2hcIixcclxuICAgIFwiY2xlYXJcIjogXCJDbGVhclwiLFxyXG59IiwiXHJcbmltcG9ydCAnLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Vqcy9lanMubWluJztcclxuaW1wb3J0IGNvcmV1aVRhYmxlVHBsICAgZnJvbSAnLi4vY29yZXVpLnRhYmxlLnRlbXBsYXRlcyc7XHJcbmltcG9ydCBjb3JldWlUYWJsZVV0aWxzIGZyb20gJy4uL2NvcmV1aS50YWJsZS51dGlscyc7XHJcbmltcG9ydCBjb3JldWlUYWJsZSAgICAgIGZyb20gXCIuLi9jb3JldWkudGFibGVcIjtcclxuXHJcbmNvcmV1aVRhYmxlLmNvbnRyb2xzLmxpbmsgPSB7XHJcblxyXG4gICAgX2lkOiBudWxsLFxyXG4gICAgX3RhYmxlOiBudWxsLFxyXG4gICAgX29wdGlvbnM6IHtcclxuICAgICAgICBocmVmOiBudWxsLFxyXG4gICAgICAgIGNvbnRlbnQ6IG51bGwsXHJcbiAgICAgICAgYXR0cjogbnVsbFxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRj1xyXG4gICAgICogQHBhcmFtIHtDb3JlVUkudGFibGUuaW5zdGFuY2V9IHRhYmxlXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uc1xyXG4gICAgICovXHJcbiAgICBpbml0OiBmdW5jdGlvbiAodGFibGUsIG9wdGlvbnMpIHtcclxuXHJcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCB0aGlzLl9vcHRpb25zLCBvcHRpb25zKTtcclxuICAgICAgICB0aGlzLl90YWJsZSAgID0gdGFibGU7XHJcbiAgICAgICAgdGhpcy5faWQgICAgICA9IGNvcmV1aVRhYmxlVXRpbHMuaGFzaENvZGUoKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0YHQvtCx0YvRgtC40Lkg0YHQstGP0LfQsNC90L3Ri9GFINGBINGN0LvQtdC80LXQvdGC0L7QvCDRg9C/0YDQsNCy0LvQtdC90LjRj1xyXG4gICAgICovXHJcbiAgICBpbml0RXZlbnRzOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUgSUQg0Y3Qu9C10LzQtdC90YLQsCDRg9C/0YDQsNCy0LvQtdC90LjRj1xyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0SWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCk0L7RgNC80LjRgNC+0LLQsNC90LjQtSDQutC+0L3RgtC10L3RgtCwINC00LvRjyDRgNCw0LfQvNC10YnQtdC90LjRjyDQvdCwINGB0YLRgNCw0L3QuNGG0LVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCBhdHRyaWJ1dGVzID0gW107XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5fb3B0aW9ucy5hdHRyID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAkLmVhY2godGhpcy5fb3B0aW9ucy5hdHRyLCBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXMucHVzaChuYW1lICsgJz1cIicgKyB2YWx1ZSArICdcIicpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBlanMucmVuZGVyKGNvcmV1aVRhYmxlVHBsWydjb250cm9scy9saW5rLmh0bWwnXSwge1xyXG4gICAgICAgICAgICBocmVmOiB0aGlzLl9vcHRpb25zLmhyZWYsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMuX29wdGlvbnMuY29udGVudCxcclxuICAgICAgICAgICAgYXR0cjogYXR0cmlidXRlcy5sZW5ndGggPiAwID8gKCcgJyArIGF0dHJpYnV0ZXMuam9pbignICcpKSA6ICcnLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59IiwiXHJcbmltcG9ydCAnLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Vqcy9lanMubWluJztcclxuaW1wb3J0IGNvcmV1aVRhYmxlVHBsICAgICAgZnJvbSAnLi4vY29yZXVpLnRhYmxlLnRlbXBsYXRlcyc7XHJcbmltcG9ydCBjb3JldWlUYWJsZVV0aWxzICAgIGZyb20gJy4uL2NvcmV1aS50YWJsZS51dGlscyc7XHJcbmltcG9ydCBjb3JldWlUYWJsZSAgICAgICAgIGZyb20gXCIuLi9jb3JldWkudGFibGVcIjtcclxuaW1wb3J0IGNvcmV1aVRhYmxlRWxlbWVudHMgZnJvbSBcIi4uL2NvcmV1aS50YWJsZS5lbGVtZW50c1wiO1xyXG5cclxuY29yZXVpVGFibGUuY29udHJvbHMuYnV0dG9uID0ge1xyXG5cclxuICAgIF9pZDogbnVsbCxcclxuICAgIF90YWJsZTogbnVsbCxcclxuICAgIF9vcHRpb25zOiB7XHJcbiAgICAgICAgY29udGVudDogbnVsbCxcclxuICAgICAgICBvbkNsaWNrOiBudWxsLFxyXG4gICAgICAgIGF0dHI6IG51bGxcclxuICAgIH0sXHJcbiAgICBfcmVuZGVyOiB7XHJcbiAgICAgICAgYXR0cjogJydcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y9cclxuICAgICAqIEBwYXJhbSB7Q29yZVVJLnRhYmxlLmluc3RhbmNlfSB0YWJsZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnNcclxuICAgICAqL1xyXG4gICAgaW5pdDogZnVuY3Rpb24gKHRhYmxlLCBvcHRpb25zKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSAkLmV4dGVuZCh7fSwgdGhpcy5fb3B0aW9ucywgb3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5fdGFibGUgICA9IHRhYmxlO1xyXG4gICAgICAgIHRoaXMuX2lkICAgICAgPSBjb3JldWlUYWJsZVV0aWxzLmhhc2hDb2RlKCk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGB0L7QsdGL0YLQuNC5INGB0LLRj9C30LDQvdC90YvRhSDRgSDRjdC70LXQvNC10L3RgtC+0Lwg0YPQv9GA0LDQstC70LXQvdC40Y9cclxuICAgICAqL1xyXG4gICAgaW5pdEV2ZW50czogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5fb3B0aW9ucy5vbkNsaWNrID09PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiB0aGlzLl9vcHRpb25zLm9uQ2xpY2sgPT09ICdzdHJpbmcnKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgY29udHJvbCA9IGNvcmV1aVRhYmxlRWxlbWVudHMuZ2V0Q29udHJvbCh0aGlzLl90YWJsZS5nZXRJZCgpLCB0aGlzLl9pZCk7XHJcbiAgICAgICAgICAgICQoJ2J1dHRvbicsIGNvbnRyb2wpXHJcbiAgICAgICAgICAgICAgICAuY2xpY2soZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGF0Ll9vcHRpb25zLm9uQ2xpY2sgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5fb3B0aW9ucy5vbkNsaWNrKGV2ZW50LCB0aGF0Ll90YWJsZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoYXQuX29wdGlvbnMub25DbGljayA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKG5ldyBGdW5jdGlvbih0aGF0Ll9vcHRpb25zLm9uQ2xpY2spKSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QvtC70YPRh9C10L3QuNC1IElEINGN0LvQtdC80LXQvdGC0LAg0YPQv9GA0LDQstC70LXQvdC40Y9cclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldElkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQpNC+0YDQvNC40YDQvtCy0LDQvdC40LUg0LrQvtC90YLQtdC90YLQsCDQtNC70Y8g0YDQsNC30LzQtdGJ0LXQvdC40Y8g0L3QsCDRgdGC0YDQsNC90LjRhtC1XHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBsZXQgYXR0cmlidXRlcyA9IFtdO1xyXG5cclxuICAgICAgICBpZiAoY29yZXVpVGFibGVVdGlscy5pc09iamVjdCh0aGlzLl9vcHRpb25zLmF0dHIpKSB7XHJcbiAgICAgICAgICAgICQuZWFjaCh0aGlzLl9vcHRpb25zLmF0dHIsIGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlcy5wdXNoKG5hbWUgKyAnPVwiJyArIHZhbHVlICsgJ1wiJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHJldHVybiBlanMucmVuZGVyKGNvcmV1aVRhYmxlVHBsWydjb250cm9scy9idXR0b24uaHRtbCddLCB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMuX29wdGlvbnMuY29udGVudCxcclxuICAgICAgICAgICAgYXR0cjogYXR0cmlidXRlcy5sZW5ndGggPiAwID8gKCcgJyArIGF0dHJpYnV0ZXMuam9pbignICcpKSA6ICcnLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59IiwiXHJcbmltcG9ydCAnLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Vqcy9lanMubWluJztcclxuaW1wb3J0IGNvcmV1aVRhYmxlVHBsICAgZnJvbSAnLi4vY29yZXVpLnRhYmxlLnRlbXBsYXRlcyc7XHJcbmltcG9ydCBjb3JldWlUYWJsZVV0aWxzIGZyb20gJy4uL2NvcmV1aS50YWJsZS51dGlscyc7XHJcbmltcG9ydCBjb3JldWlUYWJsZSAgICAgIGZyb20gXCIuLi9jb3JldWkudGFibGVcIjtcclxuaW1wb3J0IENvcmV1aVRhYmxlVXRpbHMgZnJvbSBcIi4uL2NvcmV1aS50YWJsZS51dGlsc1wiO1xyXG5pbXBvcnQgY29yZXVpVGFibGVFbGVtZW50cyBmcm9tIFwiLi4vY29yZXVpLnRhYmxlLmVsZW1lbnRzXCI7XHJcblxyXG5jb3JldWlUYWJsZS5jb250cm9scy5kcm9wZG93biA9IHtcclxuXHJcbiAgICBfaWQ6IG51bGwsXHJcbiAgICBfdGFibGU6IG51bGwsXHJcbiAgICBfb3B0aW9uczoge1xyXG4gICAgICAgIHR5cGU6ICdkcm9wZG93bicsXHJcbiAgICAgICAgY29udGVudDogbnVsbCxcclxuICAgICAgICBpdGVtczogbnVsbCxcclxuICAgICAgICBhdHRyOiB7XHJcbiAgICAgICAgICAgIGNsYXNzOiAnYnRuIGJ0bi1wcmltYXJ5JyxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPXHJcbiAgICAgKiBAcGFyYW0ge0NvcmVVSS50YWJsZS5pbnN0YW5jZX0gdGFibGVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXHJcbiAgICAgKi9cclxuICAgIGluaXQ6IGZ1bmN0aW9uICh0YWJsZSwgb3B0aW9ucykge1xyXG5cclxuICAgICAgICB0aGlzLl9vcHRpb25zID0gJC5leHRlbmQoe30sIHRoaXMuX29wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuX3RhYmxlICAgPSB0YWJsZTtcclxuICAgICAgICB0aGlzLl9pZCAgICAgID0gY29yZXVpVGFibGVVdGlscy5oYXNoQ29kZSgpO1xyXG5cclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLl9vcHRpb25zLml0ZW1zKSkge1xyXG4gICAgICAgICAgICAkLmVhY2godGhpcy5fb3B0aW9ucy5pdGVtcywgZnVuY3Rpb24gKGtleSwgaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKENvcmV1aVRhYmxlVXRpbHMuaXNPYmplY3QoaXRlbSkgJiYgdHlwZW9mIGl0ZW0udHlwZSA9PT0gJ3N0cmluZycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5pZCA9IGNvcmV1aVRhYmxlVXRpbHMuaGFzaENvZGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUg0L/QsNGA0LDQvNC10YLRgNC+0LJcclxuICAgICAqIEByZXR1cm5zIHtvYmplY3R9XHJcbiAgICAgKi9cclxuICAgIGdldE9wdGlvbnM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gJC5leHRlbmQodHJ1ZSwge30sIHRoaXMuX29wdGlvbnMpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDRgdC+0LHRi9GC0LjQuSDRgdCy0Y/Qt9Cw0L3QvdGL0YUg0YEg0Y3Qu9C10LzQtdC90YLQvtC8INGD0L/RgNCw0LLQu9C10L3QuNGPXHJcbiAgICAgKi9cclxuICAgIGluaXRFdmVudHM6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgbGV0IHRoYXQgICAgPSB0aGlzO1xyXG4gICAgICAgIGxldCBvcHRpb25zID0gdGhpcy5nZXRPcHRpb25zKCk7XHJcblxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9wdGlvbnMuaXRlbXMpKSB7XHJcbiAgICAgICAgICAgICQuZWFjaChvcHRpb25zLml0ZW1zLCBmdW5jdGlvbiAoa2V5LCBpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoQ29yZXVpVGFibGVVdGlscy5pc09iamVjdChpdGVtKSAmJiB0eXBlb2YgaXRlbS50eXBlID09PSAnc3RyaW5nJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS50eXBlID09PSAnYnV0dG9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5oYXNPd25Qcm9wZXJ0eSgnY29udGVudCcpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmhhc093blByb3BlcnR5KCdvbkNsaWNrJykgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFsnc3RyaW5nJywgJ2Z1bmN0aW9uJ10uaW5kZXhPZih0eXBlb2YgaXRlbS5vbkNsaWNrKSA+PSAwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2YgaXRlbS5jb250ZW50ID09PSAnc3RyaW5nJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udHJvbCA9IGNvcmV1aVRhYmxlRWxlbWVudHMuZ2V0Q29udHJvbCh0aGF0Ll90YWJsZS5nZXRJZCgpLCB0aGF0LmdldElkKCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJ2J1dHRvbiNidG4tZHJvcGRvd24tJyArIGl0ZW0uaWQsIGNvbnRyb2wpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsaWNrKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0ub25DbGljayA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5vbkNsaWNrKGV2ZW50LCB0aGF0Ll90YWJsZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtLm9uQ2xpY2sgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobmV3IEZ1bmN0aW9uKGl0ZW0ub25DbGljaykpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUgSUQg0Y3Qu9C10LzQtdC90YLQsCDRg9C/0YDQsNCy0LvQtdC90LjRj1xyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0SWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCk0L7RgNC80LjRgNC+0LLQsNC90LjQtSDQutC+0L3RgtC10L3RgtCwINC00LvRjyDRgNCw0LfQvNC10YnQtdC90LjRjyDQvdCwINGB0YLRgNCw0L3QuNGG0LVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCBvcHRpb25zICAgID0gdGhpcy5nZXRPcHRpb25zKCk7XHJcbiAgICAgICAgbGV0IGl0ZW1zICAgICAgPSBbXTtcclxuICAgICAgICBsZXQgYXR0cmlidXRlcyA9IFtdO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob3B0aW9ucy5pdGVtcykpIHtcclxuICAgICAgICAgICAgJC5lYWNoKG9wdGlvbnMuaXRlbXMsIGZ1bmN0aW9uIChrZXksIGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChDb3JldWlUYWJsZVV0aWxzLmlzT2JqZWN0KGl0ZW0pICYmIHR5cGVvZiBpdGVtLnR5cGUgPT09ICdzdHJpbmcnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLnR5cGUgPT09ICdsaW5rJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5oYXNPd25Qcm9wZXJ0eSgnbGluaycpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmhhc093blByb3BlcnR5KCdjb250ZW50JykgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZiBpdGVtLmxpbmsgPT09ICdzdHJpbmcnICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2YgaXRlbS5jb250ZW50ID09PSAnc3RyaW5nJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdsaW5rJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5rOiBpdGVtLmxpbmssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogaXRlbS5jb250ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT09ICdidXR0b24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmhhc093blByb3BlcnR5KCdjb250ZW50JykgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uaGFzT3duUHJvcGVydHkoJ29uQ2xpY2snKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mIGl0ZW0uY29udGVudCA9PT0gJ3N0cmluZycgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFsnc3RyaW5nJywgJ2Z1bmN0aW9uJ10uaW5kZXhPZih0eXBlb2YgaXRlbS5vbkNsaWNrKSA+PSAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2J1dHRvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGl0ZW0uaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogaXRlbS5jb250ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS50eXBlID09PSAnZGl2aWRlcicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZGl2aWRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY29yZXVpVGFibGVVdGlscy5pc09iamVjdChvcHRpb25zLmF0dHIpKSB7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmF0dHIuaGFzT3duUHJvcGVydHkoJ2NsYXNzJykgJiZcclxuICAgICAgICAgICAgICAgIFsnc3RyaW5nJywgJ251bWJlciddLmluZGV4T2YodHlwZW9mIG9wdGlvbnMuYXR0ci5jbGFzcykgPj0gMFxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMuYXR0ci5jbGFzcyArPSAnIGRyb3Bkb3duLXRvZ2dsZSc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmF0dHIuaGFzT3duUHJvcGVydHkoJ3R5cGUnKSkge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIG9wdGlvbnMuYXR0ci50eXBlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmF0dHIuaGFzT3duUHJvcGVydHkoJ2lkJykpIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBvcHRpb25zLmF0dHIuaWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuYXR0ci5oYXNPd25Qcm9wZXJ0eSgnZGF0YS1icy10b2dnbGUnKSkge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIG9wdGlvbnMuYXR0clsnZGF0YS1icy10b2dnbGUnXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJC5lYWNoKG9wdGlvbnMuYXR0ciwgZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzLnB1c2gobmFtZSArICc9XCInICsgdmFsdWUgKyAnXCInKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZWpzLnJlbmRlcihjb3JldWlUYWJsZVRwbFsnY29udHJvbHMvZHJvcGRvd24uaHRtbCddLCB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IG9wdGlvbnMuY29udGVudCxcclxuICAgICAgICAgICAgYXR0cjogYXR0cmlidXRlcy5sZW5ndGggPiAwID8gKCcgJyArIGF0dHJpYnV0ZXMuam9pbignICcpKSA6ICcnLFxyXG4gICAgICAgICAgICBpdGVtczogaXRlbXMsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iLCJcclxuaW1wb3J0ICcuLi8uLi8uLi9ub2RlX21vZHVsZXMvZWpzL2Vqcy5taW4nO1xyXG5pbXBvcnQgY29yZXVpVGFibGVUcGwgICBmcm9tICcuLi9jb3JldWkudGFibGUudGVtcGxhdGVzJztcclxuaW1wb3J0IGNvcmV1aVRhYmxlVXRpbHMgZnJvbSAnLi4vY29yZXVpLnRhYmxlLnV0aWxzJztcclxuaW1wb3J0IGNvcmV1aVRhYmxlICAgICAgZnJvbSBcIi4uL2NvcmV1aS50YWJsZVwiO1xyXG5pbXBvcnQgQ29yZXVpVGFibGVVdGlscyBmcm9tIFwiLi4vY29yZXVpLnRhYmxlLnV0aWxzXCI7XHJcbmltcG9ydCBjb3JldWlUYWJsZUVsZW1lbnRzIGZyb20gXCIuLi9jb3JldWkudGFibGUuZWxlbWVudHNcIjtcclxuXHJcbmNvcmV1aVRhYmxlLmNvbnRyb2xzLmJ1dHRvbl9ncm91cCA9IHtcclxuXHJcbiAgICBfaWQ6IG51bGwsXHJcbiAgICBfdGFibGU6IG51bGwsXHJcbiAgICBfb3B0aW9uczoge1xyXG4gICAgICAgIGNvbnRlbnQ6IG51bGwsXHJcbiAgICAgICAgb25DbGljazogbnVsbCxcclxuICAgICAgICBhdHRyOiBudWxsXHJcbiAgICB9LFxyXG4gICAgX2xpbms6IHtcclxuICAgICAgICBhdHRyOiB7XHJcbiAgICAgICAgICAgIGNsYXNzOiAnYnRuIGJ0bi1zZWNvbmRhcnknXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIF9idXR0b246IHtcclxuICAgICAgICBhdHRyOiB7XHJcbiAgICAgICAgICAgIGNsYXNzOiAnYnRuIGJ0bi1zZWNvbmRhcnknXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIF9kcm9wZG93bjoge1xyXG4gICAgICAgIGF0dHI6IHtcclxuICAgICAgICAgICAgY2xhc3M6ICdidG4gYnRuLXNlY29uZGFyeSdcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPXHJcbiAgICAgKiBAcGFyYW0ge0NvcmVVSS50YWJsZS5pbnN0YW5jZX0gdGFibGVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXHJcbiAgICAgKi9cclxuICAgIGluaXQ6IGZ1bmN0aW9uICh0YWJsZSwgb3B0aW9ucykge1xyXG5cclxuICAgICAgICB0aGlzLl9vcHRpb25zID0gJC5leHRlbmQoe30sIHRoaXMuX29wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuX3RhYmxlICAgPSB0YWJsZTtcclxuICAgICAgICB0aGlzLl9pZCAgICAgID0gY29yZXVpVGFibGVVdGlscy5oYXNoQ29kZSgpO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5fb3B0aW9ucy5idXR0b25zKSkge1xyXG4gICAgICAgICAgICAkLmVhY2godGhpcy5fb3B0aW9ucy5idXR0b25zLCBmdW5jdGlvbiAoa2V5LCBidXR0b24pIHtcclxuICAgICAgICAgICAgICAgIGlmIChDb3JldWlUYWJsZVV0aWxzLmlzT2JqZWN0KGJ1dHRvbikgJiYgdHlwZW9mIGJ1dHRvbi50eXBlID09PSAnc3RyaW5nJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBidXR0b24uaWQgPSBjb3JldWlUYWJsZVV0aWxzLmhhc2hDb2RlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChidXR0b24udHlwZSA9PT0gJ2Ryb3Bkb3duJyAmJiBBcnJheS5pc0FycmF5KGJ1dHRvbi5pdGVtcykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKGJ1dHRvbi5pdGVtcywgZnVuY3Rpb24gKGtleSwgaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKENvcmV1aVRhYmxlVXRpbHMuaXNPYmplY3QoaXRlbSkgJiYgdHlwZW9mIGl0ZW0udHlwZSA9PT0gJ3N0cmluZycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5pZCA9IGNvcmV1aVRhYmxlVXRpbHMuaGFzaENvZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSDQv9Cw0YDQsNC80LXRgtGA0L7QslxyXG4gICAgICogQHJldHVybnMge29iamVjdH1cclxuICAgICAqL1xyXG4gICAgZ2V0T3B0aW9uczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAkLmV4dGVuZCh0cnVlLCB7fSwgdGhpcy5fb3B0aW9ucyk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGB0L7QsdGL0YLQuNC5INGB0LLRj9C30LDQvdC90YvRhSDRgSDRjdC70LXQvNC10L3RgtC+0Lwg0YPQv9GA0LDQstC70LXQvdC40Y9cclxuICAgICAqL1xyXG4gICAgaW5pdEV2ZW50czogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBsZXQgdGhhdCAgICA9IHRoaXM7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB0aGlzLmdldE9wdGlvbnMoKTtcclxuXHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob3B0aW9ucy5idXR0b25zKSkge1xyXG5cclxuICAgICAgICAgICAgbGV0IGNvbnRyb2wgPSBjb3JldWlUYWJsZUVsZW1lbnRzLmdldENvbnRyb2wodGhpcy5fdGFibGUuZ2V0SWQoKSwgdGhpcy5faWQpO1xyXG5cclxuICAgICAgICAgICAgJC5lYWNoKG9wdGlvbnMuYnV0dG9ucywgZnVuY3Rpb24gKGtleSwgYnV0dG9uKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoQ29yZXVpVGFibGVVdGlscy5pc09iamVjdChidXR0b24pICYmIHR5cGVvZiBidXR0b24udHlwZSA9PT0gJ3N0cmluZycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJ1dHRvbi50eXBlID09PSAnYnV0dG9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYnV0dG9uLmhhc093blByb3BlcnR5KCdjb250ZW50JykgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5oYXNPd25Qcm9wZXJ0eSgnb25DbGljaycpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbJ3N0cmluZycsICdmdW5jdGlvbiddLmluZGV4T2YodHlwZW9mIGJ1dHRvbi5vbkNsaWNrKSA+PSAwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2YgYnV0dG9uLmNvbnRlbnQgPT09ICdzdHJpbmcnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJ2J1dHRvbiNidG4tJyArIGJ1dHRvbi5pZCwgY29udHJvbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xpY2soZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYnV0dG9uLm9uQ2xpY2sgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5vbkNsaWNrKGV2ZW50LCB0aGF0Ll90YWJsZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBidXR0b24ub25DbGljayA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChuZXcgRnVuY3Rpb24oYnV0dG9uLm9uQ2xpY2spKSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChidXR0b24udHlwZSA9PT0gJ2Ryb3Bkb3duJyAmJiBBcnJheS5pc0FycmF5KGJ1dHRvbi5pdGVtcykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKGJ1dHRvbi5pdGVtcywgZnVuY3Rpb24gKGtleSwgaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKENvcmV1aVRhYmxlVXRpbHMuaXNPYmplY3QoaXRlbSkgJiYgdHlwZW9mIGl0ZW0udHlwZSA9PT0gJ3N0cmluZycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uaGFzT3duUHJvcGVydHkoJ2NvbnRlbnQnKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmhhc093blByb3BlcnR5KCdvbkNsaWNrJykgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWydzdHJpbmcnLCAnZnVuY3Rpb24nXS5pbmRleE9mKHR5cGVvZiBpdGVtLm9uQ2xpY2spID49IDAgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mIGl0ZW0uY29udGVudCA9PT0gJ3N0cmluZydcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJ2J1dHRvbiNidG4tZHJvcGRvd24tJyArIGl0ZW0uaWQsIGNvbnRyb2wpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xpY2soZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpdGVtLm9uQ2xpY2sgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5vbkNsaWNrKGV2ZW50LCB0aGF0Ll90YWJsZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGl0ZW0ub25DbGljayA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG5ldyBGdW5jdGlvbihpdGVtLm9uQ2xpY2spKSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSBJRCDRjdC70LXQvNC10L3RgtCwINGD0L/RgNCw0LLQu9C10L3QuNGPXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXRJZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0KTQvtGA0LzQuNGA0L7QstCw0L3QuNC1INC60L7QvdGC0LXQvdGC0LAg0LTQu9GPINGA0LDQt9C80LXRidC10L3QuNGPINC90LAg0YHRgtGA0LDQvdC40YbQtVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB0aGlzLmdldE9wdGlvbnMoKTtcclxuICAgICAgICBsZXQgYnV0dG9ucyA9IFtdO1xyXG4gICAgICAgIGxldCB0aGF0ICAgID0gdGhpcztcclxuXHJcblxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9wdGlvbnMuYnV0dG9ucykpIHtcclxuICAgICAgICAgICAgJC5lYWNoKG9wdGlvbnMuYnV0dG9ucywgZnVuY3Rpb24gKGtleSwgYnV0dG9uKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoQ29yZXVpVGFibGVVdGlscy5pc09iamVjdChidXR0b24pICYmIHR5cGVvZiBidXR0b24udHlwZSA9PT0gJ3N0cmluZycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJ1dHRvbi50eXBlID09PSAnbGluaycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJ1dHRvbi5oYXNPd25Qcm9wZXJ0eSgnbGluaycpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidXR0b24uaGFzT3duUHJvcGVydHkoJ2NvbnRlbnQnKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mIGJ1dHRvbi5saW5rID09PSAnc3RyaW5nJyAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mIGJ1dHRvbi5jb250ZW50ID09PSAnc3RyaW5nJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhdHRyaWJ1dGVzID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvcmV1aVRhYmxlVXRpbHMuaXNPYmplY3QoYnV0dG9uLmF0dHIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uLmF0dHIgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYnV0dG9uLmF0dHIuaGFzT3duUHJvcGVydHkoJ2hyZWYnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBidXR0b24uYXR0ci5ocmVmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggISBidXR0b24uYXR0ci5oYXNPd25Qcm9wZXJ0eSgnY2xhc3MnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5hdHRyLmNsYXNzID0gdGhhdC5fbGluay5hdHRyLmNsYXNzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChidXR0b24uYXR0ciwgZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlcy5wdXNoKG5hbWUgKyAnPVwiJyArIHZhbHVlICsgJ1wiJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidXR0b25zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdsaW5rJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5rOiBidXR0b24ubGluayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBidXR0b24uY29udGVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyOiBhdHRyaWJ1dGVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGJ1dHRvbi50eXBlID09PSAnYnV0dG9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYnV0dG9uLmhhc093blByb3BlcnR5KCdjb250ZW50JykgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5oYXNPd25Qcm9wZXJ0eSgnb25DbGljaycpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2YgYnV0dG9uLmNvbnRlbnQgPT09ICdzdHJpbmcnICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbJ3N0cmluZycsICdmdW5jdGlvbiddLmluZGV4T2YodHlwZW9mIGJ1dHRvbi5vbkNsaWNrKSA+PSAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGF0dHJpYnV0ZXMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29yZXVpVGFibGVVdGlscy5pc09iamVjdChidXR0b24uYXR0cikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidXR0b24uYXR0ciA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChidXR0b24uYXR0ci5oYXNPd25Qcm9wZXJ0eSgndHlwZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGJ1dHRvbi5hdHRyLnR5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJ1dHRvbi5hdHRyLmhhc093blByb3BlcnR5KCdpZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGJ1dHRvbi5hdHRyLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggISBidXR0b24uYXR0ci5oYXNPd25Qcm9wZXJ0eSgnY2xhc3MnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5hdHRyLmNsYXNzID0gdGhhdC5fYnV0dG9uLmF0dHIuY2xhc3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKGJ1dHRvbi5hdHRyLCBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzLnB1c2gobmFtZSArICc9XCInICsgdmFsdWUgKyAnXCInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2J1dHRvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluazogYnV0dG9uLmxpbmssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGJ1dHRvbi5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBidXR0b24uY29udGVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyOiBhdHRyaWJ1dGVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChidXR0b24udHlwZSA9PT0gJ2Ryb3Bkb3duJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYnV0dG9uLml0ZW1zKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGF0dHJpYnV0ZXMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtcyAgICAgID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKGJ1dHRvbi5pdGVtcywgZnVuY3Rpb24gKGtleSwgaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChDb3JldWlUYWJsZVV0aWxzLmlzT2JqZWN0KGl0ZW0pICYmIHR5cGVvZiBpdGVtLnR5cGUgPT09ICdzdHJpbmcnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS50eXBlID09PSAnbGluaycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmhhc093blByb3BlcnR5KCdsaW5rJykgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmhhc093blByb3BlcnR5KCdjb250ZW50JykgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2YgaXRlbS5saW5rID09PSAnc3RyaW5nJyAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZiBpdGVtLmNvbnRlbnQgPT09ICdzdHJpbmcnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2xpbmsnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5rOiBpdGVtLmxpbmssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGl0ZW0uY29udGVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS50eXBlID09PSAnYnV0dG9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uaGFzT3duUHJvcGVydHkoJ2NvbnRlbnQnKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uaGFzT3duUHJvcGVydHkoJ29uQ2xpY2snKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZiBpdGVtLmNvbnRlbnQgPT09ICdzdHJpbmcnICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWydzdHJpbmcnLCAnZnVuY3Rpb24nXS5pbmRleE9mKHR5cGVvZiBpdGVtLm9uQ2xpY2spID49IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnYnV0dG9uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGl0ZW0uaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGl0ZW0uY29udGVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gJ2RpdmlkZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZGl2aWRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29yZXVpVGFibGVVdGlscy5pc09iamVjdChidXR0b24uYXR0cikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidXR0b24uYXR0ciA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChidXR0b24uYXR0ci5oYXNPd25Qcm9wZXJ0eSgndHlwZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGJ1dHRvbi5hdHRyLnR5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJ1dHRvbi5hdHRyLmhhc093blByb3BlcnR5KCdpZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGJ1dHRvbi5hdHRyLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggISBidXR0b24uYXR0ci5oYXNPd25Qcm9wZXJ0eSgnY2xhc3MnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5hdHRyLmNsYXNzID0gdGhhdC5fZHJvcGRvd24uYXR0ci5jbGFzcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYnV0dG9uLmF0dHIuaGFzT3duUHJvcGVydHkoJ2NsYXNzJykgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbJ3N0cmluZycsICdudW1iZXInXS5pbmRleE9mKHR5cGVvZiBidXR0b24uYXR0ci5jbGFzcykgPj0gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uLmF0dHIuY2xhc3MgKz0gJyBkcm9wZG93bi10b2dnbGUnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2goYnV0dG9uLmF0dHIsIGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXMucHVzaChuYW1lICsgJz1cIicgKyB2YWx1ZSArICdcIicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9ucy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZHJvcGRvd24nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGJ1dHRvbi5jb250ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHI6IGF0dHJpYnV0ZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IGl0ZW1zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIGVqcy5yZW5kZXIoY29yZXVpVGFibGVUcGxbJ2NvbnRyb2xzL2J1dHRvbl9ncm91cC5odG1sJ10sIHtcclxuICAgICAgICAgICAgYnV0dG9uczogYnV0dG9ucyxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSIsIlxyXG5pbXBvcnQgY29yZXVpVGFibGVVdGlscyBmcm9tICcuLi9jb3JldWkudGFibGUudXRpbHMnO1xyXG5pbXBvcnQgY29yZXVpVGFibGUgICAgICBmcm9tIFwiLi4vY29yZXVpLnRhYmxlXCI7XHJcblxyXG5jb3JldWlUYWJsZS5jb250cm9scy5jdXN0b20gPSB7XHJcblxyXG4gICAgX2lkOiBudWxsLFxyXG4gICAgX3RhYmxlOiBudWxsLFxyXG4gICAgX29wdGlvbnM6IHtcclxuICAgICAgICBjb250ZW50OiBudWxsXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPXHJcbiAgICAgKiBAcGFyYW0ge0NvcmVVSS50YWJsZS5pbnN0YW5jZX0gdGFibGVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXHJcbiAgICAgKi9cclxuICAgIGluaXQ6IGZ1bmN0aW9uICh0YWJsZSwgb3B0aW9ucykge1xyXG5cclxuICAgICAgICB0aGlzLl9vcHRpb25zID0gJC5leHRlbmQoe30sIHRoaXMuX29wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuX3RhYmxlICAgPSB0YWJsZTtcclxuICAgICAgICB0aGlzLl9pZCAgICAgID0gY29yZXVpVGFibGVVdGlscy5oYXNoQ29kZSgpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDRgdC+0LHRi9GC0LjQuSDRgdCy0Y/Qt9Cw0L3QvdGL0YUg0YEg0Y3Qu9C10LzQtdC90YLQvtC8INGD0L/RgNCw0LLQu9C10L3QuNGPXHJcbiAgICAgKi9cclxuICAgIGluaXRFdmVudHM6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSBJRCDRjdC70LXQvNC10L3RgtCwINGD0L/RgNCw0LLQu9C10L3QuNGPXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXRJZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0KTQvtGA0LzQuNGA0L7QstCw0L3QuNC1INC60L7QvdGC0LXQvdGC0LAg0LTQu9GPINGA0LDQt9C80LXRidC10L3QuNGPINC90LAg0YHRgtGA0LDQvdC40YbQtVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW9ucy5jb250ZW50O1xyXG4gICAgfVxyXG59IiwiXHJcbmltcG9ydCAnLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Vqcy9lanMubWluJztcclxuaW1wb3J0IGNvcmV1aVRhYmxlICAgICAgZnJvbSBcIi4uL2NvcmV1aS50YWJsZVwiO1xyXG5pbXBvcnQgY29yZXVpVGFibGVUcGwgICBmcm9tIFwiLi4vY29yZXVpLnRhYmxlLnRlbXBsYXRlc1wiO1xyXG5pbXBvcnQgY29yZXVpVGFibGVVdGlscyBmcm9tICcuLi9jb3JldWkudGFibGUudXRpbHMnO1xyXG5pbXBvcnQgY29yZXVpVGFibGVFbGVtZW50cyBmcm9tIFwiLi4vY29yZXVpLnRhYmxlLmVsZW1lbnRzXCI7XHJcblxyXG5jb3JldWlUYWJsZS5jb250cm9scy5wYWdlX3NpemUgPSB7XHJcblxyXG4gICAgX2lkOiBudWxsLFxyXG4gICAgX3RhYmxlOiBudWxsLFxyXG4gICAgX29wdGlvbnM6IHtcclxuICAgICAgICBhdHRyOiB7XHJcbiAgICAgICAgICAgIGNsYXNzOiAnZm9ybS1zZWxlY3QnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsaXN0OiBbIDI1LCA1MCwgMTAwLCAxMDAwIF1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y9cclxuICAgICAqIEBwYXJhbSB7Q29yZVVJLnRhYmxlLmluc3RhbmNlfSB0YWJsZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgIG9wdGlvbnNcclxuICAgICAqL1xyXG4gICAgaW5pdDogZnVuY3Rpb24gKHRhYmxlLCBvcHRpb25zKSB7XHJcblxyXG4gICAgICAgIGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KCdhdHRyJykgJiYgY29yZXVpVGFibGVVdGlscy5pc09iamVjdChvcHRpb25zLmF0dHIpKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuYXR0ciA9IGNvcmV1aVRhYmxlVXRpbHMubWVyZ2VBdHRyKHRoaXMuX29wdGlvbnMuYXR0ciwgb3B0aW9ucy5hdHRyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSAkLmV4dGVuZCh7fSwgdGhpcy5fb3B0aW9ucywgb3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5fdGFibGUgICA9IHRhYmxlO1xyXG4gICAgICAgIHRoaXMuX2lkICAgICAgPSBjb3JldWlUYWJsZVV0aWxzLmhhc2hDb2RlKCk7XHJcblxyXG4gICAgICAgIGlmICggISBBcnJheS5pc0FycmF5KHRoaXMuX29wdGlvbnMubGlzdCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5saXN0ID0gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5saXN0LmluZGV4T2YodGhpcy5fdGFibGUuX3JlY29yZHNQZXJQYWdlKSA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5saXN0LnVuc2hpZnQodGhpcy5fdGFibGUuX3JlY29yZHNQZXJQYWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGB0L7QsdGL0YLQuNC5INGB0LLRj9C30LDQvdC90YvRhSDRgSDRjdC70LXQvNC10L3RgtC+0Lwg0YPQv9GA0LDQstC70LXQvdC40Y9cclxuICAgICAqL1xyXG4gICAgaW5pdEV2ZW50czogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBsZXQgdGhhdCAgICAgICAgICAgPSB0aGlzO1xyXG4gICAgICAgIGxldCBjb250cm9sICAgICAgICA9IGNvcmV1aVRhYmxlRWxlbWVudHMuZ2V0Q29udHJvbCh0aGlzLl90YWJsZS5nZXRJZCgpLCB0aGlzLmdldElkKCkpO1xyXG4gICAgICAgIGxldCBzZWxlY3RQYWdlU2l6ZSA9ICQoJ3NlbGVjdCcsIGNvbnRyb2wpO1xyXG5cclxuICAgICAgICBzZWxlY3RQYWdlU2l6ZS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGF0Ll90YWJsZS5fcGFnZSA9IDE7XHJcbiAgICAgICAgICAgIHRoYXQuX3RhYmxlLnNldFBhZ2VTaXplKE51bWJlcihzZWxlY3RQYWdlU2l6ZS52YWwoKSkpO1xyXG4gICAgICAgICAgICB0aGF0Ll90YWJsZS5yZWxvYWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fdGFibGUub24oJ3VwZGF0ZS1wYWdlLXNpemUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNlbGVjdFBhZ2VTaXplLnZhbCh0aGF0Ll90YWJsZS5fcmVjb3Jkc1BlclBhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUgSUQg0Y3Qu9C10LzQtdC90YLQsCDRg9C/0YDQsNCy0LvQtdC90LjRj1xyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0SWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCk0L7RgNC80LjRgNC+0LLQsNC90LjQtSDQutC+0L3RgtC10L3RgtCwINC00LvRjyDRgNCw0LfQvNC10YnQtdC90LjRjyDQvdCwINGB0YLRgNCw0L3QuNGG0LVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCBhdHRyaWJ1dGVzID0gW107XHJcblxyXG4gICAgICAgIGlmIChjb3JldWlUYWJsZVV0aWxzLmlzT2JqZWN0KHRoaXMuX29wdGlvbnMuYXR0cikpIHtcclxuICAgICAgICAgICAgJC5lYWNoKHRoaXMuX29wdGlvbnMuYXR0ciwgZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzLnB1c2gobmFtZSArICc9XCInICsgdmFsdWUgKyAnXCInKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZWpzLnJlbmRlcihjb3JldWlUYWJsZVRwbFsnY29udHJvbHMvcGFnZS1zaXplLmh0bWwnXSwge1xyXG4gICAgICAgICAgICByZWNvcmRzUGVyUGFnZUxpc3Q6IHRoaXMuX29wdGlvbnMubGlzdCxcclxuICAgICAgICAgICAgcmVjb3Jkc1BlclBhZ2U6IHRoaXMuX3RhYmxlLl9yZWNvcmRzUGVyUGFnZSxcclxuICAgICAgICAgICAgYXR0cjogYXR0cmlidXRlcy5sZW5ndGggPiAwID8gKCcgJyArIGF0dHJpYnV0ZXMuam9pbignICcpKSA6ICcnLFxyXG4gICAgICAgICAgICBsYW5nOiB0aGlzLl90YWJsZS5nZXRMYW5nKCksXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iLCJcclxuaW1wb3J0IGNvcmV1aVRhYmxlVXRpbHMgZnJvbSAnLi4vY29yZXVpLnRhYmxlLnV0aWxzJztcclxuaW1wb3J0IGNvcmV1aVRhYmxlICAgICAgZnJvbSBcIi4uL2NvcmV1aS50YWJsZVwiO1xyXG5pbXBvcnQgY29yZXVpVGFibGVUcGwgZnJvbSBcIi4uL2NvcmV1aS50YWJsZS50ZW1wbGF0ZXNcIjtcclxuaW1wb3J0IGNvcmV1aVRhYmxlRWxlbWVudHMgZnJvbSBcIi4uL2NvcmV1aS50YWJsZS5lbGVtZW50c1wiO1xyXG5cclxuY29yZXVpVGFibGUuY29udHJvbHMucGFnZV9qdW1wID0ge1xyXG5cclxuICAgIF9pZDogbnVsbCxcclxuICAgIF90YWJsZTogbnVsbCxcclxuICAgIF9vcHRpb25zOiB7XHJcbiAgICAgICAgYXR0cjoge1xyXG4gICAgICAgICAgICBjbGFzczogJ2lucHV0LWdyb3VwJ1xyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPXHJcbiAgICAgKiBAcGFyYW0ge0NvcmVVSS50YWJsZS5pbnN0YW5jZX0gdGFibGVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXHJcbiAgICAgKi9cclxuICAgIGluaXQ6IGZ1bmN0aW9uICh0YWJsZSwgb3B0aW9ucykge1xyXG5cclxuICAgICAgICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnYXR0cicpICYmIGNvcmV1aVRhYmxlVXRpbHMuaXNPYmplY3Qob3B0aW9ucy5hdHRyKSkge1xyXG4gICAgICAgICAgICBvcHRpb25zLmF0dHIgPSBjb3JldWlUYWJsZVV0aWxzLm1lcmdlQXR0cih0aGlzLl9vcHRpb25zLmF0dHIsIG9wdGlvbnMuYXR0cik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9vcHRpb25zID0gJC5leHRlbmQoe30sIHRoaXMuX29wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuX3RhYmxlICAgPSB0YWJsZTtcclxuICAgICAgICB0aGlzLl9pZCAgICAgID0gY29yZXVpVGFibGVVdGlscy5oYXNoQ29kZSgpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDRgdC+0LHRi9GC0LjQuSDRgdCy0Y/Qt9Cw0L3QvdGL0YUg0YEg0Y3Qu9C10LzQtdC90YLQvtC8INGD0L/RgNCw0LLQu9C10L3QuNGPXHJcbiAgICAgKi9cclxuICAgIGluaXRFdmVudHM6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgbGV0IHRoYXQgICAgPSB0aGlzO1xyXG4gICAgICAgIGxldCBjb250cm9sID0gY29yZXVpVGFibGVFbGVtZW50cy5nZXRDb250cm9sKHRoaXMuX3RhYmxlLmdldElkKCksIHRoaXMuZ2V0SWQoKSk7XHJcbiAgICAgICAgbGV0IGlucHV0ICAgPSAkKCdpbnB1dCcsIGNvbnRyb2wpO1xyXG4gICAgICAgIGxldCBidXR0b24gID0gJCgnYnV0dG9uJywgY29udHJvbCk7XHJcblxyXG4gICAgICAgIGlmIChidXR0b25bMF0pIHtcclxuICAgICAgICAgICAgYnV0dG9uLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuX3RhYmxlLmdvUGFnZShpbnB1dC52YWwoKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpbnB1dC5rZXl1cChmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09ICdFbnRlcicgfHwgZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Ll90YWJsZS5nb1BhZ2UoaW5wdXQudmFsKCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSBJRCDRjdC70LXQvNC10L3RgtCwINGD0L/RgNCw0LLQu9C10L3QuNGPXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXRJZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0KTQvtGA0LzQuNGA0L7QstCw0L3QuNC1INC60L7QvdGC0LXQvdGC0LAg0LTQu9GPINGA0LDQt9C80LXRidC10L3QuNGPINC90LAg0YHRgtGA0LDQvdC40YbQtVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgbGV0IGF0dHJpYnV0ZXMgPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKGNvcmV1aVRhYmxlVXRpbHMuaXNPYmplY3QodGhpcy5fb3B0aW9ucy5hdHRyKSkge1xyXG4gICAgICAgICAgICAkLmVhY2godGhpcy5fb3B0aW9ucy5hdHRyLCBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXMucHVzaChuYW1lICsgJz1cIicgKyB2YWx1ZSArICdcIicpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBlanMucmVuZGVyKGNvcmV1aVRhYmxlVHBsWydjb250cm9scy9wYWdlLWp1bXAuaHRtbCddLCB7XHJcbiAgICAgICAgICAgIHJlY29yZHNQZXJQYWdlTGlzdDogdGhpcy5fb3B0aW9ucy5saXN0LFxyXG4gICAgICAgICAgICByZWNvcmRzUGVyUGFnZTogdGhpcy5fdGFibGUuX3JlY29yZHNQZXJQYWdlLFxyXG4gICAgICAgICAgICBhdHRyOiBhdHRyaWJ1dGVzLmxlbmd0aCA+IDAgPyAoJyAnICsgYXR0cmlidXRlcy5qb2luKCcgJykpIDogJycsXHJcbiAgICAgICAgICAgIGxhbmc6IHRoaXMuX3RhYmxlLmdldExhbmcoKSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSIsIlxyXG5pbXBvcnQgY29yZXVpVGFibGVVdGlscyBmcm9tICcuLi9jb3JldWkudGFibGUudXRpbHMnO1xyXG5pbXBvcnQgY29yZXVpVGFibGUgICAgICBmcm9tIFwiLi4vY29yZXVpLnRhYmxlXCI7XHJcbmltcG9ydCBjb3JldWlUYWJsZVRwbCBmcm9tIFwiLi4vY29yZXVpLnRhYmxlLnRlbXBsYXRlc1wiO1xyXG5pbXBvcnQgY29yZXVpVGFibGVFbGVtZW50cyBmcm9tIFwiLi4vY29yZXVpLnRhYmxlLmVsZW1lbnRzXCI7XHJcblxyXG5jb3JldWlUYWJsZS5jb250cm9scy5wYWdlcyA9IHtcclxuXHJcbiAgICBfaWQ6IG51bGwsXHJcbiAgICBfdGFibGU6IG51bGwsXHJcbiAgICBfb3B0aW9uczoge1xyXG4gICAgICAgIHNob3c6IHtcclxuICAgICAgICAgICAgcHJldjogdHJ1ZSxcclxuICAgICAgICAgICAgbmV4dDogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvdW50OiAzLFxyXG4gICAgICAgIGF0dHI6IHtcclxuICAgICAgICAgICAgY2xhc3M6ICdwYWdpbmF0aW9uIG1iLTAnXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRj1xyXG4gICAgICogQHBhcmFtIHtDb3JlVUkudGFibGUuaW5zdGFuY2V9IHRhYmxlXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uc1xyXG4gICAgICovXHJcbiAgICBpbml0OiBmdW5jdGlvbiAodGFibGUsIG9wdGlvbnMpIHtcclxuXHJcbiAgICAgICAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2F0dHInKSAmJiBjb3JldWlUYWJsZVV0aWxzLmlzT2JqZWN0KG9wdGlvbnMuYXR0cikpIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5hdHRyID0gY29yZXVpVGFibGVVdGlscy5tZXJnZUF0dHIodGhpcy5fb3B0aW9ucy5hdHRyLCBvcHRpb25zLmF0dHIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCB0aGlzLl9vcHRpb25zLCBvcHRpb25zKTtcclxuICAgICAgICB0aGlzLl90YWJsZSAgID0gdGFibGU7XHJcbiAgICAgICAgdGhpcy5faWQgICAgICA9IGNvcmV1aVRhYmxlVXRpbHMuaGFzaENvZGUoKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0YHQvtCx0YvRgtC40Lkg0YHQstGP0LfQsNC90L3Ri9GFINGBINGN0LvQtdC80LXQvdGC0L7QvCDRg9C/0YDQsNCy0LvQtdC90LjRj1xyXG4gICAgICovXHJcbiAgICBpbml0RXZlbnRzOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGxldCB0aGF0ICAgID0gdGhpcztcclxuICAgICAgICBsZXQgY29udHJvbCA9IGNvcmV1aVRhYmxlRWxlbWVudHMuZ2V0Q29udHJvbCh0aGlzLl90YWJsZS5nZXRJZCgpLCB0aGlzLmdldElkKCkpO1xyXG5cclxuICAgICAgICB0aGlzLl9pbml0RXZlbnRzKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX3RhYmxlLm9uKCdzaG93LXJlY29yZHMnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnRyb2wuaHRtbCh0aGF0LnJlbmRlcigpKTtcclxuICAgICAgICAgICAgdGhhdC5faW5pdEV2ZW50cygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUgSUQg0Y3Qu9C10LzQtdC90YLQsCDRg9C/0YDQsNCy0LvQtdC90LjRj1xyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0SWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCk0L7RgNC80LjRgNC+0LLQsNC90LjQtSDQutC+0L3RgtC10L3RgtCwINC00LvRjyDRgNCw0LfQvNC10YnQtdC90LjRjyDQvdCwINGB0YLRgNCw0L3QuNGG0LVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCBhdHRyaWJ1dGVzICAgICAgID0gW107XHJcbiAgICAgICAgbGV0IHNob3dQcmV2ICAgICAgICAgPSAhISB0aGlzLl9vcHRpb25zLnNob3cucHJldjtcclxuICAgICAgICBsZXQgc2hvd05leHQgICAgICAgICA9ICEhIHRoaXMuX29wdGlvbnMuc2hvdy5uZXh0O1xyXG4gICAgICAgIGxldCBzaG93RGl2aWRlclN0YXJ0ID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHNob3dEaXZpZGVyRW5kICAgPSBmYWxzZTtcclxuICAgICAgICBsZXQgc2hvd1BhZ2VGaXJzdCAgICA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBzaG93UGFnZUxhc3QgICAgID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHBhZ2VzICAgICAgICAgICAgPSBbXTtcclxuICAgICAgICBsZXQgcGFnZXNUb3RhbCAgICAgICA9IHRoaXMuX3RhYmxlLl9yZWNvcmRzVG90YWwgPiAwICYmIHRoaXMuX3RhYmxlLl9yZWNvcmRzUGVyUGFnZSA+IDBcclxuICAgICAgICAgICAgPyBNYXRoLmNlaWwodGhpcy5fdGFibGUuX3JlY29yZHNUb3RhbCAvIHRoaXMuX3RhYmxlLl9yZWNvcmRzUGVyUGFnZSlcclxuICAgICAgICAgICAgOiAxO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fdGFibGUuX3JlY29yZHNUb3RhbCA+IDAgJiZcclxuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5jb3VudCA+IDAgJiZcclxuICAgICAgICAgICAgY29yZXVpVGFibGVVdGlscy5pc051bWVyaWModGhpcy5fb3B0aW9ucy5jb3VudClcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgbGV0IGNvdW50ICAgICA9IE1hdGgubWluKHRoaXMuX29wdGlvbnMuY291bnQsIHBhZ2VzVG90YWwpO1xyXG4gICAgICAgICAgICBsZXQgY291bnRIYWxmID0gTWF0aC5tYXgoMCwgTWF0aC5mbG9vcihjb3VudCAvIDIpKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb3VudCAlIDIgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGNvdW50SGFsZiAtPSAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgc3RhcnQgPSB0aGlzLl90YWJsZS5fcGFnZSA+IDFcclxuICAgICAgICAgICAgICAgID8gTWF0aC5tYXgoMSwgdGhpcy5fdGFibGUuX3BhZ2UgLSBjb3VudEhhbGYpXHJcbiAgICAgICAgICAgICAgICA6IHRoaXMuX3RhYmxlLl9wYWdlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHN0YXJ0ICsgY291bnQgPiBwYWdlc1RvdGFsKSB7XHJcbiAgICAgICAgICAgICAgICBzdGFydCA9IHBhZ2VzVG90YWwgLSAoY291bnQgLSAxKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBwYWdlcy5wdXNoKHN0YXJ0ICsgaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5jb3VudCA+IDAgJiZcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RhYmxlLl9wYWdlID4gMVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIHBhZ2VzLnB1c2godGhpcy5fdGFibGUuX3BhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocGFnZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBpZiAocGFnZXNbMF0gPj0gMikge1xyXG4gICAgICAgICAgICAgICAgc2hvd1BhZ2VGaXJzdCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHBhZ2VzWzBdID49IDMpIHtcclxuICAgICAgICAgICAgICAgIHNob3dEaXZpZGVyU3RhcnQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocGFnZXNbcGFnZXMubGVuZ3RoIC0gMV0gKyAxIDwgcGFnZXNUb3RhbCkge1xyXG4gICAgICAgICAgICAgICAgc2hvd0RpdmlkZXJFbmQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwYWdlc1twYWdlcy5sZW5ndGggLSAxXSA8IHBhZ2VzVG90YWwpIHtcclxuICAgICAgICAgICAgICAgIHNob3dQYWdlTGFzdCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjb3JldWlUYWJsZVV0aWxzLmlzT2JqZWN0KHRoaXMuX29wdGlvbnMuYXR0cikpIHtcclxuICAgICAgICAgICAgJC5lYWNoKHRoaXMuX29wdGlvbnMuYXR0ciwgZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzLnB1c2gobmFtZSArICc9XCInICsgdmFsdWUgKyAnXCInKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZWpzLnJlbmRlcihjb3JldWlUYWJsZVRwbFsnY29udHJvbHMvcGFnZXMuaHRtbCddLCB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlOiB0aGlzLl90YWJsZS5fcGFnZSxcclxuICAgICAgICAgICAgaXNBY3RpdmVQcmV2OiB0aGlzLl90YWJsZS5fcGFnZSA+IDEsXHJcbiAgICAgICAgICAgIGlzQWN0aXZlTmV4dDogdGhpcy5fdGFibGUuX3BhZ2UgPCBwYWdlc1RvdGFsLFxyXG4gICAgICAgICAgICBwYWdlc1RvdGFsOiBwYWdlc1RvdGFsLFxyXG5cclxuICAgICAgICAgICAgc2hvd1ByZXY6IHNob3dQcmV2LFxyXG4gICAgICAgICAgICBzaG93UGFnZUZpcnN0OiBzaG93UGFnZUZpcnN0LFxyXG4gICAgICAgICAgICBzaG93RGl2aWRlclN0YXJ0OiBzaG93RGl2aWRlclN0YXJ0LFxyXG5cclxuICAgICAgICAgICAgcGFnZXM6IHBhZ2VzLFxyXG5cclxuICAgICAgICAgICAgc2hvd0RpdmlkZXJFbmQ6IHNob3dEaXZpZGVyRW5kLFxyXG4gICAgICAgICAgICBzaG93UGFnZUxhc3Q6IHNob3dQYWdlTGFzdCxcclxuICAgICAgICAgICAgc2hvd05leHQ6IHNob3dOZXh0LFxyXG5cclxuICAgICAgICAgICAgYXR0cjogYXR0cmlidXRlcy5sZW5ndGggPiAwID8gKCcgJyArIGF0dHJpYnV0ZXMuam9pbignICcpKSA6ICcnLFxyXG4gICAgICAgICAgICBsYW5nOiB0aGlzLl90YWJsZS5nZXRMYW5nKCksXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGB0L7QsdGL0YLQuNC5INC90LAg0Y3Qu9C10LzQtdC90YLQsNGFXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBfaW5pdEV2ZW50czogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBsZXQgdGhhdCAgICA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGNvbnRyb2wgPSBjb3JldWlUYWJsZUVsZW1lbnRzLmdldENvbnRyb2wodGhpcy5fdGFibGUuZ2V0SWQoKSwgdGhpcy5nZXRJZCgpKTtcclxuXHJcbiAgICAgICAgbGV0IGJ0blByZXYgPSAkKCcuY29yZXVpLXRhYmxlX19wYWdlX3ByZXYnLCBjb250cm9sKVxyXG4gICAgICAgIGlmIChidG5QcmV2WzBdKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGF0Ll90YWJsZS5fcGFnZSA8PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBidG5QcmV2LmFkZENsYXNzKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBidG5QcmV2LmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGF0Ll90YWJsZS5fcGFnZSA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Ll90YWJsZS5wcmV2UGFnZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGJ0bk5leHQgPSAkKCcuY29yZXVpLXRhYmxlX19wYWdlX25leHQnLCBjb250cm9sKVxyXG4gICAgICAgIGlmIChidG5OZXh0WzBdKSB7XHJcbiAgICAgICAgICAgIGJ0bk5leHQuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5fdGFibGUubmV4dFBhZ2UoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwYWdlcyA9ICQoJy5jb3JldWktdGFibGVfX3BhZ2UnLCBjb250cm9sKVxyXG4gICAgICAgIGlmIChwYWdlc1swXSkge1xyXG4gICAgICAgICAgICBwYWdlcy5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGFnZSA9IE51bWJlcigkLnRyaW0oJCh0aGlzKS50ZXh0KCkpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocGFnZSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Ll90YWJsZS5nb1BhZ2UocGFnZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiXHJcbmltcG9ydCAnLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Vqcy9lanMubWluJztcclxuaW1wb3J0IGNvcmV1aVRhYmxlICAgICAgZnJvbSBcIi4uL2NvcmV1aS50YWJsZVwiO1xyXG5pbXBvcnQgY29yZXVpVGFibGVUcGwgICBmcm9tIFwiLi4vY29yZXVpLnRhYmxlLnRlbXBsYXRlc1wiO1xyXG5pbXBvcnQgY29yZXVpVGFibGVVdGlscyBmcm9tICcuLi9jb3JldWkudGFibGUudXRpbHMnO1xyXG5pbXBvcnQgY29yZXVpVGFibGVFbGVtZW50cyBmcm9tIFwiLi4vY29yZXVpLnRhYmxlLmVsZW1lbnRzXCI7XHJcblxyXG5jb3JldWlUYWJsZS5jb250cm9scy50b3RhbCA9IHtcclxuXHJcbiAgICBfaWQ6IG51bGwsXHJcbiAgICBfdGFibGU6IG51bGwsXHJcbiAgICBfb3B0aW9uczoge1xyXG4gICAgICAgIGF0dHI6IHtcclxuICAgICAgICAgICAgY2xhc3M6ICdweC0xJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y9cclxuICAgICAqIEBwYXJhbSB7Q29yZVVJLnRhYmxlLmluc3RhbmNlfSB0YWJsZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgIG9wdGlvbnNcclxuICAgICAqL1xyXG4gICAgaW5pdDogZnVuY3Rpb24gKHRhYmxlLCBvcHRpb25zKSB7XHJcblxyXG4gICAgICAgIGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KCdhdHRyJykgJiYgY29yZXVpVGFibGVVdGlscy5pc09iamVjdChvcHRpb25zLmF0dHIpKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuYXR0ciA9IGNvcmV1aVRhYmxlVXRpbHMubWVyZ2VBdHRyKHRoaXMuX29wdGlvbnMuYXR0ciwgb3B0aW9ucy5hdHRyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSAkLmV4dGVuZCh7fSwgdGhpcy5fb3B0aW9ucywgb3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5fdGFibGUgICA9IHRhYmxlO1xyXG4gICAgICAgIHRoaXMuX2lkICAgICAgPSBjb3JldWlUYWJsZVV0aWxzLmhhc2hDb2RlKCk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGB0L7QsdGL0YLQuNC5INGB0LLRj9C30LDQvdC90YvRhSDRgSDRjdC70LXQvNC10L3RgtC+0Lwg0YPQv9GA0LDQstC70LXQvdC40Y9cclxuICAgICAqL1xyXG4gICAgaW5pdEV2ZW50czogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBsZXQgdGhhdCAgICA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGNvbnRyb2wgPSBjb3JldWlUYWJsZUVsZW1lbnRzLmdldENvbnRyb2wodGhpcy5fdGFibGUuZ2V0SWQoKSwgdGhpcy5nZXRJZCgpKTtcclxuXHJcbiAgICAgICAgdGhpcy5fdGFibGUub24oJ3Nob3ctcmVjb3JkcycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29udHJvbC5odG1sKHRoYXQucmVuZGVyKCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUgSUQg0Y3Qu9C10LzQtdC90YLQsCDRg9C/0YDQsNCy0LvQtdC90LjRj1xyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0SWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCk0L7RgNC80LjRgNC+0LLQsNC90LjQtSDQutC+0L3RgtC10L3RgtCwINC00LvRjyDRgNCw0LfQvNC10YnQtdC90LjRjyDQvdCwINGB0YLRgNCw0L3QuNGG0LVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCBhdHRyaWJ1dGVzID0gW107XHJcblxyXG4gICAgICAgIGlmIChjb3JldWlUYWJsZVV0aWxzLmlzT2JqZWN0KHRoaXMuX29wdGlvbnMuYXR0cikpIHtcclxuICAgICAgICAgICAgJC5lYWNoKHRoaXMuX29wdGlvbnMuYXR0ciwgZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzLnB1c2gobmFtZSArICc9XCInICsgdmFsdWUgKyAnXCInKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlanMucmVuZGVyKGNvcmV1aVRhYmxlVHBsWydjb250cm9scy90b3RhbC5odG1sJ10sIHtcclxuICAgICAgICAgICAgcmVjb3Jkc1RvdGFsOiB0aGlzLl90YWJsZS5fcmVjb3Jkc1RvdGFsLFxyXG4gICAgICAgICAgICBhdHRyOiBhdHRyaWJ1dGVzLmxlbmd0aCA+IDAgPyAoJyAnICsgYXR0cmlidXRlcy5qb2luKCcgJykpIDogJycsXHJcbiAgICAgICAgICAgIGxhbmc6IHRoaXMuX3RhYmxlLmdldExhbmcoKSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSIsIlxyXG5pbXBvcnQgY29yZXVpVGFibGVVdGlscyBmcm9tICcuLi9jb3JldWkudGFibGUudXRpbHMnO1xyXG5pbXBvcnQgY29yZXVpVGFibGUgICAgICBmcm9tIFwiLi4vY29yZXVpLnRhYmxlXCI7XHJcbmltcG9ydCBjb3JldWlUYWJsZVRwbCAgIGZyb20gXCIuLi9jb3JldWkudGFibGUudGVtcGxhdGVzXCI7XHJcbmltcG9ydCBDb3JldWlUYWJsZVV0aWxzIGZyb20gXCIuLi9jb3JldWkudGFibGUudXRpbHNcIjtcclxuaW1wb3J0IGNvcmV1aVRhYmxlRWxlbWVudHMgZnJvbSBcIi4uL2NvcmV1aS50YWJsZS5lbGVtZW50c1wiO1xyXG5cclxuY29yZXVpVGFibGUuY29udHJvbHMuc2VhcmNoID0ge1xyXG5cclxuICAgIF9pZDogbnVsbCxcclxuICAgIF90YWJsZTogbnVsbCxcclxuICAgIF9vcHRpb25zOiB7XHJcbiAgICAgICAgYnRuOiB7XHJcbiAgICAgICAgICAgIGF0dHI6IHsgY2xhc3M6ICdidG4gYnRuLXNlY29uZGFyeScgfSxcclxuICAgICAgICAgICAgY29udGVudDogbnVsbCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJ0bkNsZWFyOiB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwiPGkgY2xhc3M9XFxcImJpIGJpLXhcXFwiPjwvaT5cIixcclxuICAgICAgICAgICAgYXR0cjogeyBjbGFzczogJ2J0biBidG4tb3V0bGluZS1zZWNvbmRhcnknIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGJ0bkNvbXBsZXRlOiB7XHJcbiAgICAgICAgICAgIGF0dHI6IHsgY2xhc3M6ICdidG4gYnRuLXByaW1hcnknIH0sXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IG51bGxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPXHJcbiAgICAgKiBAcGFyYW0ge0NvcmVVSS50YWJsZS5pbnN0YW5jZX0gdGFibGVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXHJcbiAgICAgKi9cclxuICAgIGluaXQ6IGZ1bmN0aW9uICh0YWJsZSwgb3B0aW9ucykge1xyXG5cclxuICAgICAgICB0aGlzLl9vcHRpb25zID0gJC5leHRlbmQodHJ1ZSwge30sIHRoaXMuX29wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuX3RhYmxlICAgPSB0YWJsZTtcclxuICAgICAgICB0aGlzLl9pZCAgICAgID0gY29yZXVpVGFibGVVdGlscy5oYXNoQ29kZSgpO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKCAhIENvcmV1aVRhYmxlVXRpbHMuaXNPYmplY3QodGhpcy5fb3B0aW9ucy5idG4pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuYnRuID0ge307XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoICEgdGhpcy5fb3B0aW9ucy5idG4uaGFzT3duUHJvcGVydHkoJ2NvbnRlbnQnKSB8fFxyXG4gICAgICAgICAgICB0eXBlb2YgdGhpcy5fb3B0aW9ucy5idG4uY29udGVudCAhPT0gJ3N0cmluZydcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5idG4uY29udGVudCA9IHRhYmxlLmdldExhbmcoKS5zZWFyY2hcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZiAoICEgQ29yZXVpVGFibGVVdGlscy5pc09iamVjdCh0aGlzLl9vcHRpb25zLmJ0bkNsZWFyKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLmJ0bkNsZWFyID0ge307XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoICEgdGhpcy5fb3B0aW9ucy5idG5DbGVhci5oYXNPd25Qcm9wZXJ0eSgnY29udGVudCcpIHx8XHJcbiAgICAgICAgICAgIHR5cGVvZiB0aGlzLl9vcHRpb25zLmJ0bkNsZWFyLmNvbnRlbnQgIT09ICdzdHJpbmcnXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuYnRuQ2xlYXIuY29udGVudCA9IHRhYmxlLmdldExhbmcoKS5jbGVhclxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGlmICggISBDb3JldWlUYWJsZVV0aWxzLmlzT2JqZWN0KHRoaXMuX29wdGlvbnMuYnRuQ29tcGxldGUpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuYnRuQ29tcGxldGUgPSB7fTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggISB0aGlzLl9vcHRpb25zLmJ0bkNvbXBsZXRlLmhhc093blByb3BlcnR5KCdjb250ZW50JykgfHxcclxuICAgICAgICAgICAgdHlwZW9mIHRoaXMuX29wdGlvbnMuYnRuQ29tcGxldGUuY29udGVudCAhPT0gJ3N0cmluZydcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5idG5Db21wbGV0ZS5jb250ZW50ID0gdGFibGUuZ2V0TGFuZygpLnNlYXJjaFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0YHQvtCx0YvRgtC40Lkg0YHQstGP0LfQsNC90L3Ri9GFINGBINGN0LvQtdC80LXQvdGC0L7QvCDRg9C/0YDQsNCy0LvQtdC90LjRj1xyXG4gICAgICovXHJcbiAgICBpbml0RXZlbnRzOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGxldCB0aGF0ICAgICAgICAgPSB0aGlzO1xyXG4gICAgICAgIGxldCBjb250cm9sICAgICAgPSBjb3JldWlUYWJsZUVsZW1lbnRzLmdldENvbnRyb2wodGhpcy5fdGFibGUuZ2V0SWQoKSwgdGhpcy5nZXRJZCgpKTtcclxuICAgICAgICBsZXQgYnV0dG9uVG9nZ2xlID0gJCgnYnV0dG9uLmJ0bi1zZWFyY2gtdG9nZ2xlJywgY29udHJvbCk7XHJcbiAgICAgICAgbGV0IGJ1dHRvbkNsZWFyICA9ICQoJ2J1dHRvbi5idG4tY2xlYXInLCBjb250cm9sKTtcclxuXHJcbiAgICAgICAgYnV0dG9uVG9nZ2xlLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IGNvbnRhaW5lciA9IGNvcmV1aVRhYmxlRWxlbWVudHMuZ2V0U2VhcmNoQ29udGFpbmVyKHRoYXQuX3RhYmxlLmdldElkKCkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvbnRhaW5lclswXSkge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmZhZGVUb2dnbGUoJ2Zhc3QnKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29udHJvbHMgICAgICAgICAgID0gW107XHJcbiAgICAgICAgICAgICAgICBsZXQgY29udHJvbHNFdmVudHMgICAgID0gW107XHJcbiAgICAgICAgICAgICAgICBsZXQgYnRuQ29tcGxldGVBdHRyICAgID0gW107XHJcbiAgICAgICAgICAgICAgICBsZXQgYnRuQ29tcGxldGVDb250ZW50ID0gJyc7XHJcbiAgICAgICAgICAgICAgICBsZXQgd3JhcHBlciAgICAgICAgICAgID0gY29yZXVpVGFibGVFbGVtZW50cy5nZXRXcmFwcGVyKHRoYXQuX3RhYmxlLmdldElkKCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICQuZWFjaCh0aGF0Ll90YWJsZS5fc2VhcmNoLCBmdW5jdGlvbiAoa2V5LCBjb250cm9sKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9wdGlvbnMgPSBjb250cm9sLmdldE9wdGlvbnMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2ZpZWxkJykgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mIG9wdGlvbnMuZmllbGQgPT09ICdzdHJpbmcnICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZmllbGRcclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbHMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogICAgICAgb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnbGFiZWwnKSAmJiB0eXBlb2Ygb3B0aW9ucy5sYWJlbCA9PT0gJ3N0cmluZycgPyBvcHRpb25zLmxhYmVsIDogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnZGVzY3JpcHRpb24nKSAmJiB0eXBlb2Ygb3B0aW9ucy5kZXNjcmlwdGlvbiA9PT0gJ3N0cmluZycgPyBvcHRpb25zLmRlc2NyaXB0aW9uIDogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmVmaXg6ICAgICAgb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgncHJlZml4JykgJiYgdHlwZW9mIG9wdGlvbnMucHJlZml4ID09PSAnc3RyaW5nJyA/IG9wdGlvbnMucHJlZml4IDogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogICAgICAgICAgY29udHJvbC5nZXRJZCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogICAgIGNvbnRyb2wucmVuZGVyKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRyb2wuaGFzT3duUHJvcGVydHkoJ2luaXRFdmVudHMnKSAmJiB0eXBlb2YgY29udHJvbC5pbml0RXZlbnRzID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sc0V2ZW50cy5wdXNoKGNvbnRyb2wuaW5pdEV2ZW50cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmICggISBjb3JldWlUYWJsZVV0aWxzLmlzT2JqZWN0KHRoYXQuX29wdGlvbnMuYnRuQ29tcGxldGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5fb3B0aW9ucy5idG5Db21wbGV0ZSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICggISBjb3JldWlUYWJsZVV0aWxzLmlzT2JqZWN0KHRoYXQuX29wdGlvbnMuYnRuQ29tcGxldGUuYXR0cikpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Ll9vcHRpb25zLmJ0bkNvbXBsZXRlLmF0dHIgPSB7fTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhhdC5fb3B0aW9ucy5idG5Db21wbGV0ZS5hdHRyLmhhc093blByb3BlcnR5KCd0eXBlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhhdC5fb3B0aW9ucy5idG5Db21wbGV0ZS5hdHRyLnR5cGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCAhIHRoYXQuX29wdGlvbnMuYnRuQ29tcGxldGUuYXR0ci5oYXNPd25Qcm9wZXJ0eSgnY2xhc3MnKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGVvZiB0aGF0Ll9vcHRpb25zLmJ0bkNvbXBsZXRlLmF0dHIuY2xhc3MgIT09ICdzdHJpbmcnXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Ll9vcHRpb25zLmJ0bkNvbXBsZXRlLmF0dHIuY2xhc3MgPSAnYnRuLWNvbXBsZXRlJztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5fb3B0aW9ucy5idG5Db21wbGV0ZS5hdHRyLmNsYXNzICs9ICcgYnRuLWNvbXBsZXRlJztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY29yZXVpVGFibGVVdGlscy5pc09iamVjdCh0aGF0Ll9vcHRpb25zLmJ0bkNvbXBsZXRlLmF0dHIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKHRoYXQuX29wdGlvbnMuYnRuQ29tcGxldGUuYXR0ciwgZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ0bkNvbXBsZXRlQXR0ci5wdXNoKG5hbWUgKyAnPVwiJyArIHZhbHVlICsgJ1wiJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoYXQuX29wdGlvbnMuYnRuQ29tcGxldGUuY29udGVudCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgICAgICBidG5Db21wbGV0ZUNvbnRlbnQgPSB0aGF0Ll9vcHRpb25zLmJ0bkNvbXBsZXRlLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBjb250ZW50ID0gZWpzLnJlbmRlcihjb3JldWlUYWJsZVRwbFsnY29udHJvbHMvc2VhcmNoLWNvbnRhaW5lci5odG1sJ10sIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250cm9sczogY29udHJvbHMsXHJcbiAgICAgICAgICAgICAgICAgICAgYnRuQ29tcGxldGVBdHRyOiAgICBidG5Db21wbGV0ZUF0dHIubGVuZ3RoID4gMCA/ICgnICcgKyBidG5Db21wbGV0ZUF0dHIuam9pbignICcpKSA6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgIGJ0bkNvbXBsZXRlQ29udGVudDogYnRuQ29tcGxldGVDb250ZW50LFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB3cmFwcGVyLnByZXBlbmQoY29udGVudCk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjb250cm9sc0V2ZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKGNvbnRyb2xzRXZlbnRzLCBmdW5jdGlvbiAoa2V5LCBldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lciA9ICQoJz4gLmNvcmV1aS10YWJsZV9fc2VhcmNoJywgd3JhcHBlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmJ0bi1jb21wbGV0ZScsIGNvbnRhaW5lcikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuX3RhYmxlLnNlYXJjaFJlY29yZHMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmZhZGVPdXQoJ2Zhc3QnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChidXR0b25DbGVhclswXSkge1xyXG4gICAgICAgICAgICBidXR0b25DbGVhci5jbGljayhmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSBJRCDRjdC70LXQvNC10L3RgtCwINGD0L/RgNCw0LLQu9C10L3QuNGPXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXRJZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0KTQvtGA0LzQuNGA0L7QstCw0L3QuNC1INC60L7QvdGC0LXQvdGC0LAg0LTQu9GPINGA0LDQt9C80LXRidC10L3QuNGPINC90LAg0YHRgtGA0LDQvdC40YbQtVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgbGV0IGJ0bkF0dHIgICAgPSBbXTtcclxuICAgICAgICBsZXQgYnRuQ29udGVudCA9ICcnO1xyXG5cclxuICAgICAgICBsZXQgc2hvd0NsZWFyICAgICAgID0gZmFsc2U7IC8vIFRPRE8g0L/RgNC+0LLQtdGA0LrQsCDQvdCw0LvQuNGH0LjRjyDQv9C+0LjRgdC60LBcclxuICAgICAgICBsZXQgYnRuQ2xlYXJBdHRyICAgID0gW107XHJcbiAgICAgICAgbGV0IGJ0bkNsZWFyQ29udGVudCA9ICcnO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKCAhIGNvcmV1aVRhYmxlVXRpbHMuaXNPYmplY3QodGhpcy5fb3B0aW9ucy5idG4pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuYnRuID0ge307XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggISBjb3JldWlUYWJsZVV0aWxzLmlzT2JqZWN0KHRoaXMuX29wdGlvbnMuYnRuLmF0dHIpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuYnRuLmF0dHIgPSB7fTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggISB0aGlzLl9vcHRpb25zLmJ0bi5hdHRyLmhhc093blByb3BlcnR5KCdjbGFzcycpIHx8XHJcbiAgICAgICAgICAgIHR5cGVvZiB0aGlzLl9vcHRpb25zLmJ0bi5hdHRyLmNsYXNzICE9PSAnc3RyaW5nJ1xyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLmJ0bi5hdHRyLmNsYXNzID0gJ2J0bi1zZWFyY2gtdG9nZ2xlJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLmJ0bi5hdHRyLmNsYXNzICs9ICcgYnRuLXNlYXJjaC10b2dnbGUnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJC5lYWNoKHRoaXMuX29wdGlvbnMuYnRuLmF0dHIsIGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICBidG5BdHRyLnB1c2gobmFtZSArICc9XCInICsgdmFsdWUgKyAnXCInKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9vcHRpb25zLmJ0bi5jb250ZW50ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBidG5Db250ZW50ID0gdGhpcy5fb3B0aW9ucy5idG4uY29udGVudDtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgaWYgKHNob3dDbGVhcikge1xyXG4gICAgICAgICAgICBpZiAoICEgY29yZXVpVGFibGVVdGlscy5pc09iamVjdCh0aGlzLl9vcHRpb25zLmJ0bkNsZWFyKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5idG5DbGVhciA9IHt9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICggISBjb3JldWlUYWJsZVV0aWxzLmlzT2JqZWN0KHRoaXMuX29wdGlvbnMuYnRuQ2xlYXIuYXR0cikpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuYnRuQ2xlYXIuYXR0ciA9IHt9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoICEgdGhpcy5fb3B0aW9ucy5idG5DbGVhci5hdHRyLmhhc093blByb3BlcnR5KCdjbGFzcycpIHx8XHJcbiAgICAgICAgICAgICAgICB0eXBlb2YgdGhpcy5fb3B0aW9ucy5idG5DbGVhci5hdHRyLmNsYXNzICE9PSAnc3RyaW5nJ1xyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuYnRuQ2xlYXIuYXR0ci5jbGFzcyA9ICdidG4tY2xlYXInO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5idG5DbGVhci5hdHRyLmNsYXNzICs9ICcgYnRuLWNsZWFyJztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJC5lYWNoKHRoaXMuX29wdGlvbnMuYnRuQ2xlYXIuYXR0ciwgZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBidG5DbGVhckF0dHIucHVzaChuYW1lICsgJz1cIicgKyB2YWx1ZSArICdcIicpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5fb3B0aW9ucy5idG5DbGVhci5jb250ZW50ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgYnRuQ2xlYXJDb250ZW50ID0gdGhpcy5fb3B0aW9ucy5idG5DbGVhci5jb250ZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIGVqcy5yZW5kZXIoY29yZXVpVGFibGVUcGxbJ2NvbnRyb2xzL3NlYXJjaC5odG1sJ10sIHtcclxuICAgICAgICAgICAgYnRuQ29udGVudDogYnRuQ29udGVudCxcclxuICAgICAgICAgICAgYnRuQXR0cjogYnRuQXR0ci5sZW5ndGggPiAwID8gKCcgJyArIGJ0bkF0dHIuam9pbignICcpKSA6ICcnLFxyXG5cclxuICAgICAgICAgICAgc2hvd0NsZWFyOiBzaG93Q2xlYXIsXHJcbiAgICAgICAgICAgIGNsZWFyQ29udGVudDogYnRuQ2xlYXJDb250ZW50LFxyXG4gICAgICAgICAgICBjbGVhckF0dHI6IGJ0bkNsZWFyQXR0ci5sZW5ndGggPiAwID8gKCcgJyArIGJ0bkNsZWFyQXR0ci5qb2luKCcgJykpIDogJycsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iLCJcclxuaW1wb3J0IGNvcmV1aVRhYmxlVXRpbHMgZnJvbSAnLi4vY29yZXVpLnRhYmxlLnV0aWxzJztcclxuaW1wb3J0IGNvcmV1aVRhYmxlICAgICAgZnJvbSBcIi4uL2NvcmV1aS50YWJsZVwiO1xyXG5pbXBvcnQgY29yZXVpVGFibGVUcGwgZnJvbSBcIi4uL2NvcmV1aS50YWJsZS50ZW1wbGF0ZXNcIjtcclxuaW1wb3J0IENvcmV1aVRhYmxlVXRpbHMgZnJvbSBcIi4uL2NvcmV1aS50YWJsZS51dGlsc1wiO1xyXG5pbXBvcnQgY29yZXVpVGFibGVFbGVtZW50cyBmcm9tIFwiLi4vY29yZXVpLnRhYmxlLmVsZW1lbnRzXCI7XHJcblxyXG5jb3JldWlUYWJsZS5jb250cm9scy5jb2x1bW5zID0ge1xyXG5cclxuICAgIF9pZDogbnVsbCxcclxuICAgIF90YWJsZTogbnVsbCxcclxuICAgIF9vcHRpb25zOiB7XHJcbiAgICAgICAgYnRuOiB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ6ICc8aSBjbGFzcz1cImJpIGJpLWxheW91dC10aHJlZS1jb2x1bW5zXCI+PC9pPicsXHJcbiAgICAgICAgICAgIGF0dHI6IHtcclxuICAgICAgICAgICAgICAgIGNsYXNzOiAnYnRuIGJ0bi1vdXRsaW5lLXNlY29uZGFyeSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYnRuQ29tcGxldGU6IHtcclxuICAgICAgICAgICAgY29udGVudDogbnVsbCxcclxuICAgICAgICAgICAgYXR0cjogeyBjbGFzczogJ2J0biBidG4tcHJpbWFyeScgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y9cclxuICAgICAqIEBwYXJhbSB7Q29yZVVJLnRhYmxlLmluc3RhbmNlfSB0YWJsZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnNcclxuICAgICAqL1xyXG4gICAgaW5pdDogZnVuY3Rpb24gKHRhYmxlLCBvcHRpb25zKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSAkLmV4dGVuZCh7fSwgdGhpcy5fb3B0aW9ucywgb3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5fdGFibGUgICA9IHRhYmxlO1xyXG4gICAgICAgIHRoaXMuX2lkICAgICAgPSBjb3JldWlUYWJsZVV0aWxzLmhhc2hDb2RlKCk7XHJcblxyXG5cclxuICAgICAgICBpZiAoICEgQ29yZXVpVGFibGVVdGlscy5pc09iamVjdCh0aGlzLl9vcHRpb25zLmJ0bikpIHtcclxuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5idG4gPSB7fTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggISBDb3JldWlUYWJsZVV0aWxzLmlzT2JqZWN0KHRoaXMuX29wdGlvbnMuYnRuQ29tcGxldGUpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuYnRuQ29tcGxldGUgPSB7fTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChDb3JldWlUYWJsZVV0aWxzLmlzT2JqZWN0KHRoaXMuX29wdGlvbnMuYnRuQ29tcGxldGUpICYmXHJcbiAgICAgICAgICAgIHR5cGVvZiB0aGlzLl9vcHRpb25zLmJ0bkNvbXBsZXRlLmNvbnRlbnQgIT09ICdzdHJpbmcnXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuYnRuQ29tcGxldGUuY29udGVudCA9IHRhYmxlLmdldExhbmcoKS5jb21wbGV0ZVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QvtC70YPRh9C10L3QuNC1INC/0LDRgNCw0LzQtdGC0YDQvtCyXHJcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fVxyXG4gICAgICovXHJcbiAgICBnZXRPcHRpb25zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICQuZXh0ZW5kKHRydWUsIHt9LCB0aGlzLl9vcHRpb25zKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0YHQvtCx0YvRgtC40Lkg0YHQstGP0LfQsNC90L3Ri9GFINGBINGN0LvQtdC80LXQvdGC0L7QvCDRg9C/0YDQsNCy0LvQtdC90LjRj1xyXG4gICAgICovXHJcbiAgICBpbml0RXZlbnRzOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGxldCB0aGF0ICAgID0gdGhpcztcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHRoaXMuZ2V0T3B0aW9ucygpO1xyXG4gICAgICAgIGxldCBjb250cm9sID0gY29yZXVpVGFibGVFbGVtZW50cy5nZXRDb250cm9sKHRoaXMuX3RhYmxlLmdldElkKCksIHRoaXMuX2lkKTtcclxuICAgICAgICBsZXQgYnV0dG9uICA9ICQoJ2J1dHRvbicsIGNvbnRyb2wpO1xyXG5cclxuICAgICAgICBidXR0b24uY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgY29udGFpbmVyID0gY29yZXVpVGFibGVFbGVtZW50cy5nZXRDb2x1bW5zQ29udGFpbmVyKHRoYXQuX3RhYmxlLmdldElkKCkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvbnRhaW5lclswXSkge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmZhZGVUb2dnbGUoJ2Zhc3QnKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29sdW1ucyAgICAgICAgICAgID0gW107XHJcbiAgICAgICAgICAgICAgICBsZXQgc2hvd0FsbCAgICAgICAgICAgID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGxldCBidG5Db21wbGV0ZUF0dHIgICAgPSBbXTtcclxuICAgICAgICAgICAgICAgIGxldCBidG5Db21wbGV0ZUNvbnRlbnQgPSAnJztcclxuICAgICAgICAgICAgICAgIGxldCB3cmFwcGVyICAgICAgICAgICAgPSBjb3JldWlUYWJsZUVsZW1lbnRzLmdldFdyYXBwZXIodGhhdC5fdGFibGUuZ2V0SWQoKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJC5lYWNoKHRoYXQuX3RhYmxlLl9jb2x1bW5zLCBmdW5jdGlvbiAoa2V5LCBjb2x1bW4pIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgb3B0aW9ucyA9IGNvbHVtbi5nZXRPcHRpb25zKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KCdmaWVsZCcpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZiBvcHRpb25zLmZpZWxkID09PSAnc3RyaW5nJyAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmZpZWxkXHJcbiAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpc1Nob3cgPSBjb2x1bW4uaXNTaG93KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQ6IG9wdGlvbnMuZmllbGQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnbGFiZWwnKSAmJiB0eXBlb2Ygb3B0aW9ucy5sYWJlbCA9PT0gJ3N0cmluZycgPyBvcHRpb25zLmxhYmVsIDogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93OiBpc1Nob3csXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCAhIGlzU2hvdykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0FsbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoICEgY29yZXVpVGFibGVVdGlscy5pc09iamVjdChvcHRpb25zLmJ0bkNvbXBsZXRlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuYnRuQ29tcGxldGUgPSB7fTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoICEgY29yZXVpVGFibGVVdGlscy5pc09iamVjdChvcHRpb25zLmJ0bkNvbXBsZXRlLmF0dHIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5idG5Db21wbGV0ZS5hdHRyID0ge307XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuYnRuQ29tcGxldGUuYXR0ci5oYXNPd25Qcm9wZXJ0eSgndHlwZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG9wdGlvbnMuYnRuQ29tcGxldGUuYXR0ci50eXBlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICggISBvcHRpb25zLmJ0bkNvbXBsZXRlLmF0dHIuaGFzT3duUHJvcGVydHkoJ2NsYXNzJykgfHxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlb2Ygb3B0aW9ucy5idG5Db21wbGV0ZS5hdHRyLmNsYXNzICE9PSAnc3RyaW5nJ1xyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5idG5Db21wbGV0ZS5hdHRyLmNsYXNzID0gJ2J0bi1jb21wbGV0ZSc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuYnRuQ29tcGxldGUuYXR0ci5jbGFzcyArPSAnIGJ0bi1jb21wbGV0ZSc7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNvcmV1aVRhYmxlVXRpbHMuaXNPYmplY3Qob3B0aW9ucy5idG5Db21wbGV0ZS5hdHRyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQuZWFjaChvcHRpb25zLmJ0bkNvbXBsZXRlLmF0dHIsIGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidG5Db21wbGV0ZUF0dHIucHVzaChuYW1lICsgJz1cIicgKyB2YWx1ZSArICdcIicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5idG5Db21wbGV0ZS5jb250ZW50ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ0bkNvbXBsZXRlQ29udGVudCA9IG9wdGlvbnMuYnRuQ29tcGxldGUuY29udGVudDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSBlanMucmVuZGVyKGNvcmV1aVRhYmxlVHBsWydjb250cm9scy9jb2x1bW5zLWNvbnRhaW5lci5odG1sJ10sIHtcclxuICAgICAgICAgICAgICAgICAgICBzaG93QWxsOiAgICAgICAgICAgIHNob3dBbGwsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogICAgICAgICAgICBjb2x1bW5zLFxyXG4gICAgICAgICAgICAgICAgICAgIGJ0bkNvbXBsZXRlQXR0cjogICAgYnRuQ29tcGxldGVBdHRyLmxlbmd0aCA+IDAgPyAoJyAnICsgYnRuQ29tcGxldGVBdHRyLmpvaW4oJyAnKSkgOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICBidG5Db21wbGV0ZUNvbnRlbnQ6IGJ0bkNvbXBsZXRlQ29udGVudCxcclxuICAgICAgICAgICAgICAgICAgICBsYW5nOiAgICAgICAgICAgICAgIHRoYXQuX3RhYmxlLmdldExhbmcoKSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgd3JhcHBlci5wcmVwZW5kKGNvbnRlbnQpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyID0gJCgnPiAuY29yZXVpLXRhYmxlX19jb2x1bW5zJywgd3JhcHBlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmNvcmV1aS10YWJsZV9fY2hlY2tfYWxsIGlucHV0JywgY29udGFpbmVyKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5jb3JldWktdGFibGVfY2hlY2stY29sdW1uIGlucHV0JywgY29udGFpbmVyKS5wcm9wKCdjaGVja2VkJywgJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuYnRuLWNvbXBsZXRlJywgY29udGFpbmVyKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbHVtbnMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmNvcmV1aS10YWJsZV9jaGVjay1jb2x1bW4gaW5wdXQ6Y2hlY2tlZCcsIGNvbnRhaW5lcikuZWFjaChmdW5jdGlvbiAoa2V5LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zLnB1c2goJChpbnB1dCkudmFsKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGF0Ll90YWJsZS5zZXRDb2x1bW5zU2hvdyhjb2x1bW5zKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Ll90YWJsZS5yZWZyZXNoKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5mYWRlT3V0KCdmYXN0Jyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUgSUQg0Y3Qu9C10LzQtdC90YLQsCDRg9C/0YDQsNCy0LvQtdC90LjRj1xyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0SWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCk0L7RgNC80LjRgNC+0LLQsNC90LjQtSDQutC+0L3RgtC10L3RgtCwINC00LvRjyDRgNCw0LfQvNC10YnQtdC90LjRjyDQvdCwINGB0YLRgNCw0L3QuNGG0LVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCBhdHRyaWJ1dGVzID0gW107XHJcblxyXG4gICAgICAgIGlmIChjb3JldWlUYWJsZVV0aWxzLmlzT2JqZWN0KHRoaXMuX29wdGlvbnMuYnRuLmF0dHIpKSB7XHJcbiAgICAgICAgICAgICQuZWFjaCh0aGlzLl9vcHRpb25zLmJ0bi5hdHRyLCBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXMucHVzaChuYW1lICsgJz1cIicgKyB2YWx1ZSArICdcIicpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBlanMucmVuZGVyKGNvcmV1aVRhYmxlVHBsWydjb250cm9scy9jb2x1bW5zLmh0bWwnXSwge1xyXG4gICAgICAgICAgICBidG5Db250ZW50OiB0aGlzLl9vcHRpb25zLmJ0bi5jb250ZW50LFxyXG4gICAgICAgICAgICBidG5BdHRyOiBhdHRyaWJ1dGVzLmxlbmd0aCA+IDAgPyAoJyAnICsgYXR0cmlidXRlcy5qb2luKCcgJykpIDogJycsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iLCJcclxuaW1wb3J0IGNvcmV1aVRhYmxlICAgICAgZnJvbSBcIi4uL2NvcmV1aS50YWJsZVwiO1xyXG5pbXBvcnQgY29yZXVpVGFibGVUcGwgICBmcm9tIFwiLi4vY29yZXVpLnRhYmxlLnRlbXBsYXRlc1wiO1xyXG5pbXBvcnQgY29yZXVpVGFibGVVdGlscyBmcm9tIFwiLi4vY29yZXVpLnRhYmxlLnV0aWxzXCI7XHJcbmltcG9ydCBDb3JldWlUYWJsZVV0aWxzIGZyb20gXCIuLi9jb3JldWkudGFibGUudXRpbHNcIjtcclxuXHJcbmNvcmV1aVRhYmxlLmZpbHRlcnMuY2xlYXIgPSB7XHJcblxyXG4gICAgX2lkOiBudWxsLFxyXG4gICAgX3RhYmxlOiBudWxsLFxyXG4gICAgX29wdGlvbnM6IHtcclxuICAgICAgICB0eXBlOiAnY2xlYXInLFxyXG4gICAgICAgIGNvbnRlbnQ6IG51bGwsXHJcbiAgICAgICAgYXR0cjoge1xyXG4gICAgICAgICAgICBjbGFzczogJ2J0biBidG4tc2Vjb25kYXJ5J1xyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPXHJcbiAgICAgKiBAcGFyYW0ge0NvcmVVSS50YWJsZS5pbnN0YW5jZX0gdGFibGVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICBvcHRpb25zXHJcbiAgICAgKi9cclxuICAgIGluaXQ6IGZ1bmN0aW9uICh0YWJsZSwgb3B0aW9ucykge1xyXG5cclxuICAgICAgICB0aGlzLl9vcHRpb25zID0gJC5leHRlbmQodHJ1ZSwge30sIHRoaXMuX29wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuX3RhYmxlICAgPSB0YWJsZTtcclxuICAgICAgICB0aGlzLl9pZCAgICAgID0gY29yZXVpVGFibGVVdGlscy5oYXNoQ29kZSgpO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKCAhIHRoaXMuX29wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2NvbnRlbnQnKSB8fFxyXG4gICAgICAgICAgICB0eXBlb2YgdGhpcy5fb3B0aW9ucy5jb250ZW50ICE9PSAnc3RyaW5nJ1xyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLmNvbnRlbnQgPSB0YWJsZS5nZXRMYW5nKCkuY2xlYXJcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSDQv9Cw0YDQsNC80LXRgtGA0L7QslxyXG4gICAgICogQHJldHVybnMge29iamVjdH1cclxuICAgICAqL1xyXG4gICAgZ2V0T3B0aW9uczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAkLmV4dGVuZCh0cnVlLCB7fSwgdGhpcy5fb3B0aW9ucyk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSBpZFxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0SWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCj0YHRgtCw0L3QvtCy0LrQsCDQt9C90LDRh9C10L3QuNGPXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcclxuICAgICAqL1xyXG4gICAgc2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QvtC70YPRh9C10L3QuNC1INC30L3QsNGH0LXQvdC40Y9cclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldFZhbHVlOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0YHQvtCx0YvRgtC40LlcclxuICAgICAqIEByZXR1cm5zIHtvYmplY3R9XHJcbiAgICAgKi9cclxuICAgIGluaXRFdmVudHM6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCk0L7RgNC80LjRgNC+0LLQsNC90LjQtSDQutC+0L3RgtC10L3RgtCwXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHRoaXMuZ2V0T3B0aW9ucygpO1xyXG5cclxuICAgICAgICBpZiAoICEgY29yZXVpVGFibGVVdGlscy5pc09iamVjdChvcHRpb25zLmF0dHIpKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuYXR0ciA9IHt9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG9wdGlvbnMuYXR0ci5oYXNPd25Qcm9wZXJ0eSgndHlwZScpKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBvcHRpb25zLmF0dHIudHlwZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBhdHRyID0gW107XHJcblxyXG4gICAgICAgICQuZWFjaChvcHRpb25zLmF0dHIsIGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICBhdHRyLnB1c2gobmFtZSArICc9XCInICsgdmFsdWUgKyAnXCInKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVqcy5yZW5kZXIoY29yZXVpVGFibGVUcGxbJ2ZpbHRlcnMvY2xlYXIuaHRtbCddLCB7XHJcbiAgICAgICAgICAgIGF0dHI6IGF0dHIubGVuZ3RoID4gMCA/ICgnICcgKyBhdHRyLmpvaW4oJyAnKSkgOiAnJyxcclxuICAgICAgICAgICAgY29udGVudDogb3B0aW9ucy5jb250ZW50ID8gb3B0aW9ucy5jb250ZW50IDogJycsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iLCJcclxuaW1wb3J0ICcuLi8uLi8uLi9ub2RlX21vZHVsZXMvZWpzL2Vqcy5taW4nO1xyXG5pbXBvcnQgY29yZXVpVGFibGUgICAgICAgICBmcm9tIFwiLi4vY29yZXVpLnRhYmxlXCI7XHJcbmltcG9ydCBjb3JldWlUYWJsZVRwbCAgICAgIGZyb20gXCIuLi9jb3JldWkudGFibGUudGVtcGxhdGVzXCI7XHJcbmltcG9ydCBjb3JldWlUYWJsZVV0aWxzICAgIGZyb20gXCIuLi9jb3JldWkudGFibGUudXRpbHNcIjtcclxuaW1wb3J0IGNvcmV1aVRhYmxlRWxlbWVudHMgZnJvbSBcIi4uL2NvcmV1aS50YWJsZS5lbGVtZW50c1wiO1xyXG5cclxuY29yZXVpVGFibGUuZmlsdGVycy50ZXh0ID0ge1xyXG5cclxuICAgIF9pZDogbnVsbCxcclxuICAgIF90YWJsZTogbnVsbCxcclxuICAgIF92YWx1ZTogbnVsbCxcclxuICAgIF9vcHRpb25zOiB7XHJcbiAgICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICAgIGZpZWxkOiBudWxsLFxyXG4gICAgICAgIGxhYmVsOiBudWxsLFxyXG4gICAgICAgIHdpZHRoOiAyMDAsXHJcbiAgICAgICAgYXR0cjoge1xyXG4gICAgICAgICAgICBjbGFzczogXCJmb3JtLWNvbnRyb2xcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJ0bjoge1xyXG4gICAgICAgICAgICBhdHRyOiB7IGNsYXNzOiBcImJ0biBidG4tb3V0bGluZS1zZWNvbmRhcnkgYm9yZGVyLXNlY29uZGFyeS1zdWJ0bGVcIiB9LFxyXG4gICAgICAgICAgICBjb250ZW50OiAnPGkgY2xhc3M9XCJiaSBiaS1zZWFyY2hcIj48L2k+J1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y9cclxuICAgICAqIEBwYXJhbSB7Q29yZVVJLnRhYmxlLmluc3RhbmNlfSB0YWJsZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgIG9wdGlvbnNcclxuICAgICAqL1xyXG4gICAgaW5pdDogZnVuY3Rpb24gKHRhYmxlLCBvcHRpb25zKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgdGhpcy5fb3B0aW9ucywgb3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5fdGFibGUgICA9IHRhYmxlO1xyXG4gICAgICAgIHRoaXMuX2lkICAgICAgPSBjb3JldWlUYWJsZVV0aWxzLmhhc2hDb2RlKCk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSDQv9Cw0YDQsNC80LXRgtGA0L7QslxyXG4gICAgICogQHJldHVybnMge29iamVjdH1cclxuICAgICAqL1xyXG4gICAgZ2V0T3B0aW9uczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAkLmV4dGVuZCh0cnVlLCB7fSwgdGhpcy5fb3B0aW9ucyk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSBpZFxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0SWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCj0YHRgtCw0L3QvtCy0LrQsCDQt9C90LDRh9C10L3QuNGPXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcclxuICAgICAqL1xyXG4gICAgc2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJyAmJiB0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIHJldHVybicnXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSDQt9C90LDRh9C10L3QuNGPXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfG51bGx9XHJcbiAgICAgKi9cclxuICAgIGdldFZhbHVlOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGxldCBjb250cm9sID0gY29yZXVpVGFibGVFbGVtZW50cy5nZXRDb250cm9sKHRoaXMuX3RhYmxlLmdldElkKCksIHRoaXMuX2lkKTtcclxuICAgICAgICBsZXQgaW5wdXQgICA9ICQoJ2lucHV0JywgY29udHJvbCk7XHJcblxyXG4gICAgICAgIGlmIChpbnB1dFswXSkge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBpbnB1dC52YWwoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlICE9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGB0L7QsdGL0YLQuNC5XHJcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fVxyXG4gICAgICovXHJcbiAgICBpbml0RXZlbnRzOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIC8vIFRPRE8g0LrQvdC+0L/QutCwINC/0L7QuNGB0LrQsCArIGVudGVyXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCk0L7RgNC80LjRgNC+0LLQsNC90LjQtSDQutC+0L3RgtC10L3RgtCwXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHRoaXMuZ2V0T3B0aW9ucygpO1xyXG4gICAgICAgIGxldCBsYWJlbCAgID0gdHlwZW9mIG9wdGlvbnMubGFiZWwgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBvcHRpb25zLmxhYmVsID09PSAnbnVtYmVyJ1xyXG4gICAgICAgICAgICA/IG9wdGlvbnMubGFiZWxcclxuICAgICAgICAgICAgOiAnJztcclxuXHJcbiAgICAgICAgaWYgKCAhIGNvcmV1aVRhYmxlVXRpbHMuaXNPYmplY3Qob3B0aW9ucy5hdHRyKSkge1xyXG4gICAgICAgICAgICBvcHRpb25zLmF0dHIgPSB7fTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KCd3aWR0aCcpICYmXHJcbiAgICAgICAgICAgIGNvcmV1aVRhYmxlVXRpbHMuaXNOdW1lcmljKG9wdGlvbnMud2lkdGgpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmF0dHIuaGFzT3duUHJvcGVydHkoJ3N0eWxlJykpIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMuYXR0clsnc3R5bGUnXSArPSAnO3dpZHRoOicgKyBvcHRpb25zLndpZHRoICsgJ3B4JztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMuYXR0clsnc3R5bGUnXSA9ICd3aWR0aDonICsgb3B0aW9ucy53aWR0aCArICdweCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9wdGlvbnMuYXR0clsnbmFtZSddICA9IHR5cGVvZiBvcHRpb25zLmZpZWxkID09PSAnc3RyaW5nJyA/IG9wdGlvbnMuZmllbGQgOiAnJztcclxuICAgICAgICBvcHRpb25zLmF0dHJbJ3ZhbHVlJ10gPSB0eXBlb2YgdGhpcy5fdmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB0aGlzLl92YWx1ZSA9PT0gJ251bWJlcidcclxuICAgICAgICAgICAgPyB0aGlzLl92YWx1ZVxyXG4gICAgICAgICAgICA6ICcnO1xyXG5cclxuICAgICAgICBpZiAob3B0aW9ucy5hdHRyLmhhc093blByb3BlcnR5KCd0eXBlJykpIHtcclxuICAgICAgICAgICAgZGVsZXRlIG9wdGlvbnMuYXR0ci50eXBlO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICBpZiAoICEgY29yZXVpVGFibGVVdGlscy5pc09iamVjdChvcHRpb25zLmJ0bikpIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5idG4gPSB7fTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCAhIGNvcmV1aVRhYmxlVXRpbHMuaXNPYmplY3Qob3B0aW9ucy5idG4uYXR0cikpIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5idG4uYXR0ciA9IHt9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG9wdGlvbnMuYnRuLmF0dHIuaGFzT3duUHJvcGVydHkoJ3R5cGUnKSkge1xyXG4gICAgICAgICAgICBkZWxldGUgb3B0aW9ucy5idG4uYXR0ci50eXBlO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGxldCBhdHRyICAgID0gW107XHJcbiAgICAgICAgbGV0IGF0dHJCdG4gPSBbXTtcclxuXHJcbiAgICAgICAgJC5lYWNoKG9wdGlvbnMuYXR0ciwgZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGF0dHIucHVzaChuYW1lICsgJz1cIicgKyB2YWx1ZSArICdcIicpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQuZWFjaChvcHRpb25zLmJ0bi5hdHRyLCBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgYXR0ckJ0bi5wdXNoKG5hbWUgKyAnPVwiJyArIHZhbHVlICsgJ1wiJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBlanMucmVuZGVyKGNvcmV1aVRhYmxlVHBsWydmaWx0ZXJzL3RleHQuaHRtbCddLCB7XHJcbiAgICAgICAgICAgIGF0dHI6IGF0dHIubGVuZ3RoID4gMCA/ICgnICcgKyBhdHRyLmpvaW4oJyAnKSkgOiAnJyxcclxuICAgICAgICAgICAgbGFiZWw6IGxhYmVsLFxyXG4gICAgICAgICAgICBidG5BdHRyOiBhdHRyQnRuLmxlbmd0aCA+IDAgPyAoJyAnICsgYXR0ckJ0bi5qb2luKCcgJykpIDogJycsXHJcbiAgICAgICAgICAgIGJ0bkNvbnRlbnQ6IG9wdGlvbnMuYnRuLmNvbnRlbnQgPyBvcHRpb25zLmJ0bi5jb250ZW50IDogJycsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iLCJcclxuaW1wb3J0ICcuLi8uLi8uLi9ub2RlX21vZHVsZXMvZWpzL2Vqcy5taW4nO1xyXG5pbXBvcnQgY29yZXVpVGFibGUgICAgICBmcm9tIFwiLi4vY29yZXVpLnRhYmxlXCI7XHJcbmltcG9ydCBjb3JldWlUYWJsZVRwbCAgIGZyb20gXCIuLi9jb3JldWkudGFibGUudGVtcGxhdGVzXCI7XHJcbmltcG9ydCBjb3JldWlUYWJsZVV0aWxzIGZyb20gXCIuLi9jb3JldWkudGFibGUudXRpbHNcIjtcclxuaW1wb3J0IGNvcmV1aVRhYmxlRWxlbWVudHMgZnJvbSBcIi4uL2NvcmV1aS50YWJsZS5lbGVtZW50c1wiO1xyXG5cclxuY29yZXVpVGFibGUuZmlsdGVycy5udW1iZXIgPSB7XHJcblxyXG4gICAgX2lkOiBudWxsLFxyXG4gICAgX3RhYmxlOiBudWxsLFxyXG4gICAgX3ZhbHVlOiBudWxsLFxyXG4gICAgX29wdGlvbnM6IHtcclxuICAgICAgICB0eXBlOiAnbnVtYmVyJyxcclxuICAgICAgICBmaWVsZDogbnVsbCxcclxuICAgICAgICBsYWJlbDogbnVsbCxcclxuICAgICAgICB3aWR0aDogOTAsXHJcbiAgICAgICAgYXR0cjoge1xyXG4gICAgICAgICAgICBjbGFzczogXCJmb3JtLWNvbnRyb2xcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJ0bjoge1xyXG4gICAgICAgICAgICBhdHRyOiB7IGNsYXNzOiBcImJ0biBidG4tb3V0bGluZS1zZWNvbmRhcnkgYm9yZGVyLXNlY29uZGFyeS1zdWJ0bGVcIiB9LFxyXG4gICAgICAgICAgICBjb250ZW50OiAnPGkgY2xhc3M9XCJiaSBiaS1zZWFyY2hcIj48L2k+J1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y9cclxuICAgICAqIEBwYXJhbSB7Q29yZVVJLnRhYmxlLmluc3RhbmNlfSB0YWJsZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgIG9wdGlvbnNcclxuICAgICAqL1xyXG4gICAgaW5pdDogZnVuY3Rpb24gKHRhYmxlLCBvcHRpb25zKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgdGhpcy5fb3B0aW9ucywgb3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5fdGFibGUgICA9IHRhYmxlO1xyXG4gICAgICAgIHRoaXMuX2lkICAgICAgPSBjb3JldWlUYWJsZVV0aWxzLmhhc2hDb2RlKCk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSDQv9Cw0YDQsNC80LXRgtGA0L7QslxyXG4gICAgICogQHJldHVybnMge29iamVjdH1cclxuICAgICAqL1xyXG4gICAgZ2V0T3B0aW9uczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAkLmV4dGVuZCh0cnVlLCB7fSwgdGhpcy5fb3B0aW9ucyk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSBpZFxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0SWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCj0YHRgtCw0L3QvtCy0LrQsCDQt9C90LDRh9C10L3QuNGPXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcclxuICAgICAqL1xyXG4gICAgc2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cclxuICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKCAhIGNvcmV1aVRhYmxlVXRpbHMuaXNPYmplY3QodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBudW1iZXJTdGFydCA9IG51bGw7XHJcbiAgICAgICAgICAgIGxldCBudW1iZXJFbmQgICA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICBpZiAodmFsdWUuaGFzT3duUHJvcGVydHkoJ3N0YXJ0JykgJiZcclxuICAgICAgICAgICAgICAgICh0eXBlb2YgdmFsdWUuc3RhcnQgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB2YWx1ZS5zdGFydCAhPT0gJ251bWJlcicpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgbnVtYmVyU3RhcnQgPSB2YWx1ZS5zdGFydDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHZhbHVlLmhhc093blByb3BlcnR5KCdlbmQnKSAmJlxyXG4gICAgICAgICAgICAgICAgKHR5cGVvZiB2YWx1ZS5lbmQgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB2YWx1ZS5lbmQgIT09ICdudW1iZXInKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIG51bWJlckVuZCA9IHZhbHVlLmVuZDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG51bWJlclN0YXJ0ID09PSBudWxsICYmIG51bWJlckVuZCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBudW1iZXJTdGFydCxcclxuICAgICAgICAgICAgICAgICAgICBlbmQ6IG51bWJlckVuZFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUg0LfQvdCw0YfQtdC90LjRj1xyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0VmFsdWU6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgbGV0IGNvbnRyb2wgICAgPSBjb3JldWlUYWJsZUVsZW1lbnRzLmdldENvbnRyb2wodGhpcy5fdGFibGUuZ2V0SWQoKSwgdGhpcy5faWQpO1xyXG4gICAgICAgIGxldCBpbnB1dFN0YXJ0ID0gJCgnaW5wdXQubnVtYmVyLXN0YXJ0JywgY29udHJvbCk7XHJcbiAgICAgICAgbGV0IGlucHV0RW5kICAgPSAkKCdpbnB1dC5udW1iZXItZW5kJywgY29udHJvbCk7XHJcblxyXG4gICAgICAgIGlmIChpbnB1dFN0YXJ0WzBdICYmIGlucHV0RW5kWzBdKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBzdGFydDogaW5wdXRTdGFydC52YWwoKSxcclxuICAgICAgICAgICAgICAgIGVuZDogaW5wdXRFbmQudmFsKCksXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGB0L7QsdGL0YLQuNC5XHJcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fVxyXG4gICAgICovXHJcbiAgICBpbml0RXZlbnRzOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIC8vIFRPRE8g0LrQvdC+0L/QutCwINC/0L7QuNGB0LrQsCArIGVudGVyXHJcblxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQpNC+0YDQvNC40YDQvtCy0LDQvdC40LUg0LrQvtC90YLQtdC90YLQsFxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB0aGlzLmdldE9wdGlvbnMoKTtcclxuICAgICAgICBsZXQgbGFiZWwgICA9IHR5cGVvZiBvcHRpb25zLmxhYmVsID09PSAnc3RyaW5nJyB8fCB0eXBlb2Ygb3B0aW9ucy5sYWJlbCA9PT0gJ251bWJlcidcclxuICAgICAgICAgICAgPyBvcHRpb25zLmxhYmVsXHJcbiAgICAgICAgICAgIDogJyc7XHJcblxyXG4gICAgICAgIGlmICggISBjb3JldWlUYWJsZVV0aWxzLmlzT2JqZWN0KG9wdGlvbnMuYXR0cikpIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5hdHRyID0ge307XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnd2lkdGgnKSAmJlxyXG4gICAgICAgICAgICBjb3JldWlUYWJsZVV0aWxzLmlzTnVtZXJpYyhvcHRpb25zLndpZHRoKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5hdHRyLmhhc093blByb3BlcnR5KCdzdHlsZScpKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLmF0dHJbJ3N0eWxlJ10gKz0gJzt3aWR0aDonICsgb3B0aW9ucy53aWR0aCArICdweCc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLmF0dHJbJ3N0eWxlJ10gPSAnd2lkdGg6JyArIG9wdGlvbnMud2lkdGggKyAncHgnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAob3B0aW9ucy5hdHRyLmhhc093blByb3BlcnR5KCd0eXBlJykpIHtcclxuICAgICAgICAgICAgZGVsZXRlIG9wdGlvbnMuYXR0ci50eXBlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG9wdGlvbnMuYXR0ci5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSkge1xyXG4gICAgICAgICAgICBkZWxldGUgb3B0aW9ucy5hdHRyLnZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGxldCBmaWVsZCAgICAgPSB0eXBlb2Ygb3B0aW9ucy5maWVsZCA9PT0gJ3N0cmluZycgPyBvcHRpb25zLmZpZWxkIDogJyc7XHJcbiAgICAgICAgbGV0IHN0YXJ0QXR0ciA9IFtdO1xyXG4gICAgICAgIGxldCBlbmRBdHRyICAgPSBbXTtcclxuICAgICAgICBsZXQgYXR0ckJ0biAgID0gW107XHJcblxyXG5cclxuICAgICAgICAkLmVhY2gob3B0aW9ucy5hdHRyLCBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKFsnbmFtZScsICd2YWx1ZScsICdjbGFzcyddLmluZGV4T2YobmFtZSkgPj0gMCB8fFxyXG4gICAgICAgICAgICAgICAgWydzdHJpbmcnLCAnbnVtYmVyJ10uaW5kZXhPZih0eXBlb2YgdmFsdWUpIDwgMFxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc3RhcnRBdHRyLnB1c2gobmFtZSArICc9XCInICsgdmFsdWUgKyAnXCInKTtcclxuICAgICAgICAgICAgZW5kQXR0ci5wdXNoKG5hbWUgKyAnPVwiJyArIHZhbHVlICsgJ1wiJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChvcHRpb25zLmF0dHIuaGFzT3duUHJvcGVydHkoJ2NsYXNzJykgJiZcclxuICAgICAgICAgICAgWydzdHJpbmcnLCAnbnVtYmVyJ10uaW5kZXhPZih0eXBlb2Ygb3B0aW9ucy5hdHRyLmNsYXNzKSA+PSAwXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHN0YXJ0QXR0ci5wdXNoKCdjbGFzcz1cIicgKyBvcHRpb25zLmF0dHIuY2xhc3MgKyAnIGRhdGUtc3RhcnRcIicpO1xyXG4gICAgICAgICAgICBlbmRBdHRyLnB1c2goJ2NsYXNzPVwiJyArIG9wdGlvbnMuYXR0ci5jbGFzcyArICcgZGF0ZS1lbmRcIicpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN0YXJ0QXR0ci5wdXNoKCdjbGFzcz1cImRhdGUtc3RhcnRcIicpO1xyXG4gICAgICAgICAgICBlbmRBdHRyLnB1c2goJ2NsYXNzPVwiZGF0ZS1lbmRcIicpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGlmIChmaWVsZCkge1xyXG4gICAgICAgICAgICBzdGFydEF0dHIucHVzaCgnbmFtZT1cIicgKyBmaWVsZCArICdbc3RhcnRdXCInKTtcclxuICAgICAgICAgICAgZW5kQXR0ci5wdXNoKCduYW1lPVwiJyArIGZpZWxkICsgJ1tlbmRdXCInKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXJ0QXR0ci5wdXNoKCd2YWx1ZT1cIicgKyAodGhpcy5fdmFsdWUgPyB0aGlzLl92YWx1ZS5zdGFydCA6ICcnKSArICdcIicpO1xyXG4gICAgICAgIGVuZEF0dHIucHVzaCgndmFsdWU9XCInICsgKHRoaXMuX3ZhbHVlID8gdGhpcy5fdmFsdWUuZW5kIDogJycpICsgJ1wiJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgaWYgKCAhIGNvcmV1aVRhYmxlVXRpbHMuaXNPYmplY3Qob3B0aW9ucy5idG4pKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuYnRuID0ge307XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggISBjb3JldWlUYWJsZVV0aWxzLmlzT2JqZWN0KG9wdGlvbnMuYnRuLmF0dHIpKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuYnRuLmF0dHIgPSB7fTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChvcHRpb25zLmJ0bi5hdHRyLmhhc093blByb3BlcnR5KCd0eXBlJykpIHtcclxuICAgICAgICAgICAgZGVsZXRlIG9wdGlvbnMuYnRuLmF0dHIudHlwZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAkLmVhY2gob3B0aW9ucy5idG4uYXR0ciwgZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGF0dHJCdG4ucHVzaChuYW1lICsgJz1cIicgKyB2YWx1ZSArICdcIicpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZWpzLnJlbmRlcihjb3JldWlUYWJsZVRwbFsnZmlsdGVycy9udW1iZXIuaHRtbCddLCB7XHJcbiAgICAgICAgICAgIGF0dHJTdGFydDogc3RhcnRBdHRyLmxlbmd0aCA+IDAgPyAoJyAnICsgc3RhcnRBdHRyLmpvaW4oJyAnKSkgOiAnJyxcclxuICAgICAgICAgICAgYXR0ckVuZDogZW5kQXR0ci5sZW5ndGggPiAwID8gKCcgJyArIGVuZEF0dHIuam9pbignICcpKSA6ICcnLFxyXG4gICAgICAgICAgICBsYWJlbDogbGFiZWwsXHJcbiAgICAgICAgICAgIGJ0bkF0dHI6IGF0dHJCdG4ubGVuZ3RoID4gMCA/ICgnICcgKyBhdHRyQnRuLmpvaW4oJyAnKSkgOiAnJyxcclxuICAgICAgICAgICAgYnRuQ29udGVudDogb3B0aW9ucy5idG4uY29udGVudCA/IG9wdGlvbnMuYnRuLmNvbnRlbnQgOiAnJyxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSIsIlxyXG5pbXBvcnQgJy4uLy4uLy4uL25vZGVfbW9kdWxlcy9lanMvZWpzLm1pbic7XHJcbmltcG9ydCBjb3JldWlUYWJsZSAgICAgIGZyb20gXCIuLi9jb3JldWkudGFibGVcIjtcclxuaW1wb3J0IGNvcmV1aVRhYmxlVHBsICAgZnJvbSBcIi4uL2NvcmV1aS50YWJsZS50ZW1wbGF0ZXNcIjtcclxuaW1wb3J0IGNvcmV1aVRhYmxlVXRpbHMgZnJvbSBcIi4uL2NvcmV1aS50YWJsZS51dGlsc1wiO1xyXG5pbXBvcnQgY29yZXVpVGFibGVFbGVtZW50cyBmcm9tIFwiLi4vY29yZXVpLnRhYmxlLmVsZW1lbnRzXCI7XHJcblxyXG5jb3JldWlUYWJsZS5maWx0ZXJzLmRhdGUgPSB7XHJcblxyXG4gICAgX2lkOiBudWxsLFxyXG4gICAgX3RhYmxlOiBudWxsLFxyXG4gICAgX3ZhbHVlOiBudWxsLFxyXG4gICAgX29wdGlvbnM6IHtcclxuICAgICAgICB0eXBlOiAnZGF0ZScsXHJcbiAgICAgICAgZmllbGQ6IG51bGwsXHJcbiAgICAgICAgbGFiZWw6IG51bGwsXHJcbiAgICAgICAgd2lkdGg6IDIwMCxcclxuICAgICAgICBhdHRyOiB7XHJcbiAgICAgICAgICAgIGNsYXNzOiBcImZvcm0tY29udHJvbFwiLFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y9cclxuICAgICAqIEBwYXJhbSB7Q29yZVVJLnRhYmxlLmluc3RhbmNlfSB0YWJsZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgIG9wdGlvbnNcclxuICAgICAqL1xyXG4gICAgaW5pdDogZnVuY3Rpb24gKHRhYmxlLCBvcHRpb25zKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgdGhpcy5fb3B0aW9ucywgb3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5fdGFibGUgICA9IHRhYmxlO1xyXG4gICAgICAgIHRoaXMuX2lkICAgICAgPSBjb3JldWlUYWJsZVV0aWxzLmhhc2hDb2RlKCk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSDQv9Cw0YDQsNC80LXRgtGA0L7QslxyXG4gICAgICogQHJldHVybnMge29iamVjdH1cclxuICAgICAqL1xyXG4gICAgZ2V0T3B0aW9uczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAkLmV4dGVuZCh0cnVlLCB7fSwgdGhpcy5fb3B0aW9ucyk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSBpZFxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0SWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCj0YHRgtCw0L3QvtCy0LrQsCDQt9C90LDRh9C10L3QuNGPXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcclxuICAgICAqL1xyXG4gICAgc2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cclxuICAgICAgICBpZiAodmFsdWUgJiZcclxuICAgICAgICAgICAgKFxyXG4gICAgICAgICAgICAgICAgdHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJyB8fFxyXG4gICAgICAgICAgICAgICAgdmFsdWUubWF0Y2goL15cXGR7NH1cXC1cXGR7Mn1cXC1cXGR7Mn0kLykgPT09IG51bGwgfHxcclxuICAgICAgICAgICAgICAgIGlzTmFOKG5ldyBEYXRlKHZhbHVlKSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSDQt9C90LDRh9C10L3QuNGPXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXRWYWx1ZTogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBsZXQgY29udHJvbCA9IGNvcmV1aVRhYmxlRWxlbWVudHMuZ2V0Q29udHJvbCh0aGlzLl90YWJsZS5nZXRJZCgpLCB0aGlzLl9pZCk7XHJcbiAgICAgICAgbGV0IGlucHV0ICAgPSAkKCdpbnB1dCcsIGNvbnRyb2wpO1xyXG5cclxuICAgICAgICBpZiAoaW5wdXRbMF0pIHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gaW5wdXQudmFsKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB2YWx1ZSAhPT0gJycpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDRgdC+0LHRi9GC0LjQuVxyXG4gICAgICogQHJldHVybnMge29iamVjdH1cclxuICAgICAqL1xyXG4gICAgaW5pdEV2ZW50czogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAvLyBUT0RPINC60L3QvtC/0LrQsCDQv9C+0LjRgdC60LAgKyBlbnRlclxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQpNC+0YDQvNC40YDQvtCy0LDQvdC40LUg0LrQvtC90YLQtdC90YLQsFxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB0aGlzLmdldE9wdGlvbnMoKTtcclxuICAgICAgICBsZXQgbGFiZWwgICA9IHR5cGVvZiBvcHRpb25zLmxhYmVsID09PSAnc3RyaW5nJyB8fCB0eXBlb2Ygb3B0aW9ucy5sYWJlbCA9PT0gJ251bWJlcidcclxuICAgICAgICAgICAgPyBvcHRpb25zLmxhYmVsXHJcbiAgICAgICAgICAgIDogJyc7XHJcblxyXG4gICAgICAgIGlmICggISBjb3JldWlUYWJsZVV0aWxzLmlzT2JqZWN0KG9wdGlvbnMuYXR0cikpIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5hdHRyID0ge307XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnd2lkdGgnKSAmJlxyXG4gICAgICAgICAgICBjb3JldWlUYWJsZVV0aWxzLmlzTnVtZXJpYyhvcHRpb25zLndpZHRoKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5hdHRyLmhhc093blByb3BlcnR5KCdzdHlsZScpKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLmF0dHJbJ3N0eWxlJ10gKz0gJzt3aWR0aDonICsgb3B0aW9ucy53aWR0aCArICdweCc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLmF0dHJbJ3N0eWxlJ10gPSAnd2lkdGg6JyArIG9wdGlvbnMud2lkdGggKyAncHgnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvcHRpb25zLmF0dHJbJ25hbWUnXSAgPSB0eXBlb2Ygb3B0aW9ucy5maWVsZCA9PT0gJ3N0cmluZycgPyBvcHRpb25zLmZpZWxkIDogJyc7XHJcbiAgICAgICAgb3B0aW9ucy5hdHRyWyd2YWx1ZSddID0gdHlwZW9mIHRoaXMuX3ZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdGhpcy5fdmFsdWUgPT09ICdudW1iZXInXHJcbiAgICAgICAgICAgID8gdGhpcy5fdmFsdWVcclxuICAgICAgICAgICAgOiAnJztcclxuXHJcbiAgICAgICAgaWYgKG9wdGlvbnMuYXR0ci5oYXNPd25Qcm9wZXJ0eSgndHlwZScpKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBvcHRpb25zLmF0dHIudHlwZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBsZXQgYXR0ciA9IFtdO1xyXG5cclxuICAgICAgICAkLmVhY2gob3B0aW9ucy5hdHRyLCBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgYXR0ci5wdXNoKG5hbWUgKyAnPVwiJyArIHZhbHVlICsgJ1wiJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBlanMucmVuZGVyKGNvcmV1aVRhYmxlVHBsWydmaWx0ZXJzL2RhdGUuaHRtbCddLCB7XHJcbiAgICAgICAgICAgIGF0dHI6IGF0dHIubGVuZ3RoID4gMCA/ICgnICcgKyBhdHRyLmpvaW4oJyAnKSkgOiAnJyxcclxuICAgICAgICAgICAgbGFiZWw6IGxhYmVsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iLCJcclxuaW1wb3J0ICcuLi8uLi8uLi9ub2RlX21vZHVsZXMvZWpzL2Vqcy5taW4nO1xyXG5pbXBvcnQgY29yZXVpVGFibGUgICAgICBmcm9tIFwiLi4vY29yZXVpLnRhYmxlXCI7XHJcbmltcG9ydCBjb3JldWlUYWJsZVRwbCAgIGZyb20gXCIuLi9jb3JldWkudGFibGUudGVtcGxhdGVzXCI7XHJcbmltcG9ydCBjb3JldWlUYWJsZVV0aWxzIGZyb20gXCIuLi9jb3JldWkudGFibGUudXRpbHNcIjtcclxuaW1wb3J0IGNvcmV1aVRhYmxlRWxlbWVudHMgZnJvbSBcIi4uL2NvcmV1aS50YWJsZS5lbGVtZW50c1wiO1xyXG5cclxuY29yZXVpVGFibGUuZmlsdGVycy5kYXRldGltZSA9IHtcclxuXHJcbiAgICBfaWQ6IG51bGwsXHJcbiAgICBfdGFibGU6IG51bGwsXHJcbiAgICBfdmFsdWU6IG51bGwsXHJcbiAgICBfb3B0aW9uczoge1xyXG4gICAgICAgIHR5cGU6ICdkYXRldGltZScsXHJcbiAgICAgICAgZmllbGQ6IG51bGwsXHJcbiAgICAgICAgbGFiZWw6IG51bGwsXHJcbiAgICAgICAgd2lkdGg6IDIwMCxcclxuICAgICAgICBhdHRyOiB7XHJcbiAgICAgICAgICAgIGNsYXNzOiBcImZvcm0tY29udHJvbFwiLFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y9cclxuICAgICAqIEBwYXJhbSB7Q29yZVVJLnRhYmxlLmluc3RhbmNlfSB0YWJsZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgIG9wdGlvbnNcclxuICAgICAqL1xyXG4gICAgaW5pdDogZnVuY3Rpb24gKHRhYmxlLCBvcHRpb25zKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgdGhpcy5fb3B0aW9ucywgb3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5fdGFibGUgICA9IHRhYmxlO1xyXG4gICAgICAgIHRoaXMuX2lkICAgICAgPSBjb3JldWlUYWJsZVV0aWxzLmhhc2hDb2RlKCk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSDQv9Cw0YDQsNC80LXRgtGA0L7QslxyXG4gICAgICogQHJldHVybnMge29iamVjdH1cclxuICAgICAqL1xyXG4gICAgZ2V0T3B0aW9uczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAkLmV4dGVuZCh0cnVlLCB7fSwgdGhpcy5fb3B0aW9ucyk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSBpZFxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0SWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCj0YHRgtCw0L3QvtCy0LrQsCDQt9C90LDRh9C10L3QuNGPXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcclxuICAgICAqL1xyXG4gICAgc2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cclxuICAgICAgICBpZiAodmFsdWUgJiZcclxuICAgICAgICAgICAgKFxyXG4gICAgICAgICAgICAgICAgdHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJyB8fFxyXG4gICAgICAgICAgICAgICAgdmFsdWUubWF0Y2goL15cXGR7NH1cXC1cXGR7Mn1cXC1cXGR7Mn0gXFxkezJ9OlxcZHsyfTpcXGR7Mn0kLykgPT09IG51bGwgfHxcclxuICAgICAgICAgICAgICAgIGlzTmFOKG5ldyBEYXRlKHZhbHVlKSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSDQt9C90LDRh9C10L3QuNGPXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfG51bGx9XHJcbiAgICAgKi9cclxuICAgIGdldFZhbHVlOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGxldCBjb250cm9sID0gY29yZXVpVGFibGVFbGVtZW50cy5nZXRDb250cm9sKHRoaXMuX3RhYmxlLmdldElkKCksIHRoaXMuX2lkKTtcclxuICAgICAgICBsZXQgaW5wdXQgICA9ICQoJ2lucHV0JywgY29udHJvbCk7XHJcblxyXG4gICAgICAgIGlmIChpbnB1dFswXSkge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBpbnB1dC52YWwoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlICE9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGB0L7QsdGL0YLQuNC5XHJcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fVxyXG4gICAgICovXHJcbiAgICBpbml0RXZlbnRzOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIC8vIFRPRE8g0LrQvdC+0L/QutCwINC/0L7QuNGB0LrQsCArIGVudGVyXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCk0L7RgNC80LjRgNC+0LLQsNC90LjQtSDQutC+0L3RgtC10L3RgtCwXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHRoaXMuZ2V0T3B0aW9ucygpO1xyXG4gICAgICAgIGxldCBsYWJlbCAgID0gdHlwZW9mIG9wdGlvbnMubGFiZWwgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBvcHRpb25zLmxhYmVsID09PSAnbnVtYmVyJ1xyXG4gICAgICAgICAgICA/IG9wdGlvbnMubGFiZWxcclxuICAgICAgICAgICAgOiAnJztcclxuXHJcbiAgICAgICAgaWYgKCAhIGNvcmV1aVRhYmxlVXRpbHMuaXNPYmplY3Qob3B0aW9ucy5hdHRyKSkge1xyXG4gICAgICAgICAgICBvcHRpb25zLmF0dHIgPSB7fTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KCd3aWR0aCcpICYmXHJcbiAgICAgICAgICAgIGNvcmV1aVRhYmxlVXRpbHMuaXNOdW1lcmljKG9wdGlvbnMud2lkdGgpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmF0dHIuaGFzT3duUHJvcGVydHkoJ3N0eWxlJykpIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMuYXR0clsnc3R5bGUnXSArPSAnO3dpZHRoOicgKyBvcHRpb25zLndpZHRoICsgJ3B4JztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMuYXR0clsnc3R5bGUnXSA9ICd3aWR0aDonICsgb3B0aW9ucy53aWR0aCArICdweCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9wdGlvbnMuYXR0clsnbmFtZSddICA9IHR5cGVvZiBvcHRpb25zLmZpZWxkID09PSAnc3RyaW5nJyA/IG9wdGlvbnMuZmllbGQgOiAnJztcclxuICAgICAgICBvcHRpb25zLmF0dHJbJ3ZhbHVlJ10gPSB0eXBlb2YgdGhpcy5fdmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB0aGlzLl92YWx1ZSA9PT0gJ251bWJlcidcclxuICAgICAgICAgICAgPyB0aGlzLl92YWx1ZVxyXG4gICAgICAgICAgICA6ICcnO1xyXG5cclxuICAgICAgICBpZiAob3B0aW9ucy5hdHRyLmhhc093blByb3BlcnR5KCd0eXBlJykpIHtcclxuICAgICAgICAgICAgZGVsZXRlIG9wdGlvbnMuYXR0ci50eXBlO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGxldCBhdHRyID0gW107XHJcblxyXG4gICAgICAgICQuZWFjaChvcHRpb25zLmF0dHIsIGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICBhdHRyLnB1c2gobmFtZSArICc9XCInICsgdmFsdWUgKyAnXCInKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVqcy5yZW5kZXIoY29yZXVpVGFibGVUcGxbJ2ZpbHRlcnMvZGF0ZXRpbWUuaHRtbCddLCB7XHJcbiAgICAgICAgICAgIGF0dHI6IGF0dHIubGVuZ3RoID4gMCA/ICgnICcgKyBhdHRyLmpvaW4oJyAnKSkgOiAnJyxcclxuICAgICAgICAgICAgbGFiZWw6IGxhYmVsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iLCJcclxuaW1wb3J0ICcuLi8uLi8uLi9ub2RlX21vZHVsZXMvZWpzL2Vqcy5taW4nO1xyXG5pbXBvcnQgY29yZXVpVGFibGUgICAgICBmcm9tIFwiLi4vY29yZXVpLnRhYmxlXCI7XHJcbmltcG9ydCBjb3JldWlUYWJsZVRwbCAgIGZyb20gXCIuLi9jb3JldWkudGFibGUudGVtcGxhdGVzXCI7XHJcbmltcG9ydCBjb3JldWlUYWJsZVV0aWxzIGZyb20gXCIuLi9jb3JldWkudGFibGUudXRpbHNcIjtcclxuaW1wb3J0IGNvcmV1aVRhYmxlRWxlbWVudHMgZnJvbSBcIi4uL2NvcmV1aS50YWJsZS5lbGVtZW50c1wiO1xyXG5cclxuY29yZXVpVGFibGUuZmlsdGVycy5kYXRlX21vbnRoID0ge1xyXG5cclxuICAgIF9pZDogbnVsbCxcclxuICAgIF90YWJsZTogbnVsbCxcclxuICAgIF92YWx1ZTogbnVsbCxcclxuICAgIF9vcHRpb25zOiB7XHJcbiAgICAgICAgdHlwZTogJ2RhdGVfbW9udGgnLFxyXG4gICAgICAgIGZpZWxkOiBudWxsLFxyXG4gICAgICAgIGxhYmVsOiBudWxsLFxyXG4gICAgICAgIHdpZHRoOiAyMDAsXHJcbiAgICAgICAgYXR0cjoge1xyXG4gICAgICAgICAgICBjbGFzczogXCJmb3JtLWNvbnRyb2xcIixcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPXHJcbiAgICAgKiBAcGFyYW0ge0NvcmVVSS50YWJsZS5pbnN0YW5jZX0gdGFibGVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICBvcHRpb25zXHJcbiAgICAgKi9cclxuICAgIGluaXQ6IGZ1bmN0aW9uICh0YWJsZSwgb3B0aW9ucykge1xyXG5cclxuICAgICAgICB0aGlzLl9vcHRpb25zID0gJC5leHRlbmQodHJ1ZSwge30sIHRoaXMuX29wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuX3RhYmxlICAgPSB0YWJsZTtcclxuICAgICAgICB0aGlzLl9pZCAgICAgID0gY29yZXVpVGFibGVVdGlscy5oYXNoQ29kZSgpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUg0L/QsNGA0LDQvNC10YLRgNC+0LJcclxuICAgICAqIEByZXR1cm5zIHtvYmplY3R9XHJcbiAgICAgKi9cclxuICAgIGdldE9wdGlvbnM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gJC5leHRlbmQodHJ1ZSwge30sIHRoaXMuX29wdGlvbnMpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUgaWRcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldElkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQo9GB0YLQsNC90L7QstC60LAg0LfQvdCw0YfQtdC90LjRj1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXHJcbiAgICAgKi9cclxuICAgIHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHJcbiAgICAgICAgaWYgKHZhbHVlICYmXHJcbiAgICAgICAgICAgIChcclxuICAgICAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycgfHxcclxuICAgICAgICAgICAgICAgIHZhbHVlLm1hdGNoKC9eXFxkezR9XFwtXFxkezJ9JC8pID09PSBudWxsIHx8XHJcbiAgICAgICAgICAgICAgICBpc05hTihuZXcgRGF0ZSh2YWx1ZSkpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZVxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUg0LfQvdCw0YfQtdC90LjRj1xyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0VmFsdWU6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgbGV0IGNvbnRyb2wgPSBjb3JldWlUYWJsZUVsZW1lbnRzLmdldENvbnRyb2wodGhpcy5fdGFibGUuZ2V0SWQoKSwgdGhpcy5faWQpO1xyXG4gICAgICAgIGxldCBpbnB1dCAgID0gJCgnaW5wdXQnLCBjb250cm9sKTtcclxuXHJcbiAgICAgICAgaWYgKGlucHV0WzBdKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IGlucHV0LnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUgIT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfSxcclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0YHQvtCx0YvRgtC40LlcclxuICAgICAqIEByZXR1cm5zIHtvYmplY3R9XHJcbiAgICAgKi9cclxuICAgIGluaXRFdmVudHM6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgLy8gVE9ETyDQutC90L7Qv9C60LAg0L/QvtC40YHQutCwICsgZW50ZXJcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0KTQvtGA0LzQuNGA0L7QstCw0L3QuNC1INC60L7QvdGC0LXQvdGC0LBcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCBvcHRpb25zID0gdGhpcy5nZXRPcHRpb25zKCk7XHJcbiAgICAgICAgbGV0IGxhYmVsICAgPSB0eXBlb2Ygb3B0aW9ucy5sYWJlbCA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIG9wdGlvbnMubGFiZWwgPT09ICdudW1iZXInXHJcbiAgICAgICAgICAgID8gb3B0aW9ucy5sYWJlbFxyXG4gICAgICAgICAgICA6ICcnO1xyXG5cclxuICAgICAgICBpZiAoICEgY29yZXVpVGFibGVVdGlscy5pc09iamVjdChvcHRpb25zLmF0dHIpKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuYXR0ciA9IHt9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3dpZHRoJykgJiZcclxuICAgICAgICAgICAgY29yZXVpVGFibGVVdGlscy5pc051bWVyaWMob3B0aW9ucy53aWR0aClcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuYXR0ci5oYXNPd25Qcm9wZXJ0eSgnc3R5bGUnKSkge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5hdHRyWydzdHlsZSddICs9ICc7d2lkdGg6JyArIG9wdGlvbnMud2lkdGggKyAncHgnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5hdHRyWydzdHlsZSddID0gJ3dpZHRoOicgKyBvcHRpb25zLndpZHRoICsgJ3B4JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb3B0aW9ucy5hdHRyWyduYW1lJ10gID0gdHlwZW9mIG9wdGlvbnMuZmllbGQgPT09ICdzdHJpbmcnID8gb3B0aW9ucy5maWVsZCA6ICcnO1xyXG4gICAgICAgIG9wdGlvbnMuYXR0clsndmFsdWUnXSA9IHR5cGVvZiB0aGlzLl92YWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHRoaXMuX3ZhbHVlID09PSAnbnVtYmVyJ1xyXG4gICAgICAgICAgICA/IHRoaXMuX3ZhbHVlXHJcbiAgICAgICAgICAgIDogJyc7XHJcblxyXG4gICAgICAgIGlmIChvcHRpb25zLmF0dHIuaGFzT3duUHJvcGVydHkoJ3R5cGUnKSkge1xyXG4gICAgICAgICAgICBkZWxldGUgb3B0aW9ucy5hdHRyLnR5cGU7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgbGV0IGF0dHIgPSBbXTtcclxuXHJcbiAgICAgICAgJC5lYWNoKG9wdGlvbnMuYXR0ciwgZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGF0dHIucHVzaChuYW1lICsgJz1cIicgKyB2YWx1ZSArICdcIicpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZWpzLnJlbmRlcihjb3JldWlUYWJsZVRwbFsnZmlsdGVycy9kYXRlX21vbnRoLmh0bWwnXSwge1xyXG4gICAgICAgICAgICBhdHRyOiBhdHRyLmxlbmd0aCA+IDAgPyAoJyAnICsgYXR0ci5qb2luKCcgJykpIDogJycsXHJcbiAgICAgICAgICAgIGxhYmVsOiBsYWJlbFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59IiwiXHJcbmltcG9ydCBjb3JldWlUYWJsZSAgICAgIGZyb20gXCIuLi9jb3JldWkudGFibGVcIjtcclxuaW1wb3J0IGNvcmV1aVRhYmxlVHBsICAgZnJvbSBcIi4uL2NvcmV1aS50YWJsZS50ZW1wbGF0ZXNcIjtcclxuaW1wb3J0IGNvcmV1aVRhYmxlVXRpbHMgZnJvbSBcIi4uL2NvcmV1aS50YWJsZS51dGlsc1wiO1xyXG5pbXBvcnQgY29yZXVpVGFibGVFbGVtZW50cyBmcm9tIFwiLi4vY29yZXVpLnRhYmxlLmVsZW1lbnRzXCI7XHJcblxyXG5jb3JldWlUYWJsZS5maWx0ZXJzLmRhdGVfcmFuZ2UgPSB7XHJcblxyXG4gICAgX2lkOiBudWxsLFxyXG4gICAgX3RhYmxlOiBudWxsLFxyXG4gICAgX3ZhbHVlOiBudWxsLFxyXG4gICAgX29wdGlvbnM6IHtcclxuICAgICAgICB0eXBlOiAnZGF0ZV9yYW5nZScsXHJcbiAgICAgICAgZmllbGQ6IG51bGwsXHJcbiAgICAgICAgbGFiZWw6IG51bGwsXHJcbiAgICAgICAgd2lkdGg6IDIwMCxcclxuICAgICAgICBhdHRyOiB7XHJcbiAgICAgICAgICAgIGNsYXNzOiBcImZvcm0tY29udHJvbCBkLWlubGluZS1ibG9ja1wiLFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y9cclxuICAgICAqIEBwYXJhbSB7Q29yZVVJLnRhYmxlLmluc3RhbmNlfSB0YWJsZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgIG9wdGlvbnNcclxuICAgICAqL1xyXG4gICAgaW5pdDogZnVuY3Rpb24gKHRhYmxlLCBvcHRpb25zKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgdGhpcy5fb3B0aW9ucywgb3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5fdGFibGUgICA9IHRhYmxlO1xyXG4gICAgICAgIHRoaXMuX2lkICAgICAgPSBjb3JldWlUYWJsZVV0aWxzLmhhc2hDb2RlKCk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSDQv9Cw0YDQsNC80LXRgtGA0L7QslxyXG4gICAgICogQHJldHVybnMge29iamVjdH1cclxuICAgICAqL1xyXG4gICAgZ2V0T3B0aW9uczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAkLmV4dGVuZCh0cnVlLCB7fSwgdGhpcy5fb3B0aW9ucyk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSBpZFxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0SWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCj0YHRgtCw0L3QvtCy0LrQsCDQt9C90LDRh9C10L3QuNGPXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdmFsdWVcclxuICAgICAqL1xyXG4gICAgc2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cclxuICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKCAhIGNvcmV1aVRhYmxlVXRpbHMuaXNPYmplY3QodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBkYXRlU3RhcnQgPSBudWxsO1xyXG4gICAgICAgICAgICBsZXQgZGF0ZUVuZCAgID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIGlmICh2YWx1ZS5oYXNPd25Qcm9wZXJ0eSgnc3RhcnQnKSAmJlxyXG4gICAgICAgICAgICAgICAgdHlwZW9mIHZhbHVlLnN0YXJ0ID09PSAnc3RyaW5nJyAmJlxyXG4gICAgICAgICAgICAgICAgdmFsdWUuc3RhcnQubWF0Y2goL15cXGR7NH1cXC1cXGR7Mn1cXC1cXGR7Mn0kLykgPT09IG51bGwgJiZcclxuICAgICAgICAgICAgICAgIGlzTmFOKG5ldyBEYXRlKHZhbHVlLnN0YXJ0KSlcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRlU3RhcnQgPSB2YWx1ZS5zdGFydDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHZhbHVlLmhhc093blByb3BlcnR5KCdlbmQnKSAmJlxyXG4gICAgICAgICAgICAgICAgdHlwZW9mIHZhbHVlLmVuZCA9PT0gJ3N0cmluZycgJiZcclxuICAgICAgICAgICAgICAgIHZhbHVlLmVuZC5tYXRjaCgvXlxcZHs0fVxcLVxcZHsyfVxcLVxcZHsyfSQvKSA9PT0gbnVsbCAmJlxyXG4gICAgICAgICAgICAgICAgaXNOYU4obmV3IERhdGUodmFsdWUuZW5kKSlcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRlRW5kID0gdmFsdWUuZW5kO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0ZVN0YXJ0ID09PSBudWxsICYmIGRhdGVFbmQgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydDogZGF0ZVN0YXJ0LFxyXG4gICAgICAgICAgICAgICAgICAgIGVuZDogZGF0ZUVuZFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUg0LfQvdCw0YfQtdC90LjRj1xyXG4gICAgICogQHJldHVybnMge09iamVjdHxudWxsfVxyXG4gICAgICovXHJcbiAgICBnZXRWYWx1ZTogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBsZXQgY29udHJvbCAgICA9IGNvcmV1aVRhYmxlRWxlbWVudHMuZ2V0Q29udHJvbCh0aGlzLl90YWJsZS5nZXRJZCgpLCB0aGlzLl9pZCk7XHJcbiAgICAgICAgbGV0IGlucHV0U3RhcnQgPSAkKCdpbnB1dC5kYXRlLXN0YXJ0JywgY29udHJvbCk7XHJcbiAgICAgICAgbGV0IGlucHV0RW5kICAgPSAkKCdpbnB1dC5kYXRlLWVuZCcsIGNvbnRyb2wpO1xyXG5cclxuICAgICAgICBpZiAoaW5wdXRTdGFydFswXSAmJiBpbnB1dEVuZFswXSkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgc3RhcnQ6IGlucHV0U3RhcnQudmFsKCksXHJcbiAgICAgICAgICAgICAgICBlbmQ6IGlucHV0RW5kLnZhbCgpLFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDRgdC+0LHRi9GC0LjQuVxyXG4gICAgICogQHJldHVybnMge29iamVjdH1cclxuICAgICAqL1xyXG4gICAgaW5pdEV2ZW50czogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0KTQvtGA0LzQuNGA0L7QstCw0L3QuNC1INC60L7QvdGC0LXQvdGC0LBcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCBvcHRpb25zID0gdGhpcy5nZXRPcHRpb25zKCk7XHJcbiAgICAgICAgbGV0IGxhYmVsICAgPSB0eXBlb2Ygb3B0aW9ucy5sYWJlbCA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIG9wdGlvbnMubGFiZWwgPT09ICdudW1iZXInXHJcbiAgICAgICAgICAgID8gb3B0aW9ucy5sYWJlbFxyXG4gICAgICAgICAgICA6ICcnO1xyXG5cclxuICAgICAgICBpZiAoICEgY29yZXVpVGFibGVVdGlscy5pc09iamVjdChvcHRpb25zLmF0dHIpKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuYXR0ciA9IHt9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3dpZHRoJykgJiZcclxuICAgICAgICAgICAgY29yZXVpVGFibGVVdGlscy5pc051bWVyaWMob3B0aW9ucy53aWR0aClcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuYXR0ci5oYXNPd25Qcm9wZXJ0eSgnc3R5bGUnKSkge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5hdHRyWydzdHlsZSddICs9ICc7d2lkdGg6JyArIG9wdGlvbnMud2lkdGggKyAncHgnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5hdHRyWydzdHlsZSddID0gJ3dpZHRoOicgKyBvcHRpb25zLndpZHRoICsgJ3B4JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG9wdGlvbnMuYXR0ci5oYXNPd25Qcm9wZXJ0eSgndHlwZScpKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBvcHRpb25zLmF0dHIudHlwZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChvcHRpb25zLmF0dHIuaGFzT3duUHJvcGVydHkoJ3ZhbHVlJykpIHtcclxuICAgICAgICAgICAgZGVsZXRlIG9wdGlvbnMuYXR0ci52YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBsZXQgZmllbGQgICAgID0gdHlwZW9mIG9wdGlvbnMuZmllbGQgPT09ICdzdHJpbmcnID8gb3B0aW9ucy5maWVsZCA6ICcnO1xyXG4gICAgICAgIGxldCBzdGFydEF0dHIgPSBbXTtcclxuICAgICAgICBsZXQgc3RhcnRFbmQgID0gW107XHJcblxyXG5cclxuICAgICAgICAkLmVhY2gob3B0aW9ucy5hdHRyLCBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKFsnbmFtZScsICd2YWx1ZScsICdjbGFzcyddLmluZGV4T2YobmFtZSkgPj0gMCB8fFxyXG4gICAgICAgICAgICAgICAgWydzdHJpbmcnLCAnbnVtYmVyJ10uaW5kZXhPZih0eXBlb2YgdmFsdWUpIDwgMFxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc3RhcnRBdHRyLnB1c2gobmFtZSArICc9XCInICsgdmFsdWUgKyAnXCInKTtcclxuICAgICAgICAgICAgc3RhcnRFbmQucHVzaChuYW1lICsgJz1cIicgKyB2YWx1ZSArICdcIicpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAob3B0aW9ucy5hdHRyLmhhc093blByb3BlcnR5KCdjbGFzcycpICYmXHJcbiAgICAgICAgICAgIFsnc3RyaW5nJywgJ251bWJlciddLmluZGV4T2YodHlwZW9mIG9wdGlvbnMuYXR0ci5jbGFzcykgPj0gMFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBzdGFydEF0dHIucHVzaCgnY2xhc3M9XCInICsgb3B0aW9ucy5hdHRyLmNsYXNzICsgJyBkYXRlLXN0YXJ0XCInKTtcclxuICAgICAgICAgICAgc3RhcnRFbmQucHVzaCgnY2xhc3M9XCInICsgb3B0aW9ucy5hdHRyLmNsYXNzICsgJyBkYXRlLWVuZFwiJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3RhcnRBdHRyLnB1c2goJ2NsYXNzPVwiZGF0ZS1zdGFydFwiJyk7XHJcbiAgICAgICAgICAgIHN0YXJ0RW5kLnB1c2goJ2NsYXNzPVwiZGF0ZS1lbmRcIicpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGlmIChmaWVsZCkge1xyXG4gICAgICAgICAgICBzdGFydEF0dHIucHVzaCgnbmFtZT1cIicgKyBmaWVsZCArICdbc3RhcnRdXCInKTtcclxuICAgICAgICAgICAgc3RhcnRFbmQucHVzaCgnbmFtZT1cIicgKyBmaWVsZCArICdbZW5kXVwiJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGFydEF0dHIucHVzaCgndmFsdWU9XCInICsgKHRoaXMuX3ZhbHVlID8gdGhpcy5fdmFsdWUuc3RhcnQgOiAnJykgKyAnXCInKTtcclxuICAgICAgICBzdGFydEVuZC5wdXNoKCd2YWx1ZT1cIicgKyAodGhpcy5fdmFsdWUgPyB0aGlzLl92YWx1ZS5lbmQgOiAnJykgKyAnXCInKTtcclxuXHJcblxyXG4gICAgICAgIHJldHVybiBlanMucmVuZGVyKGNvcmV1aVRhYmxlVHBsWydmaWx0ZXJzL2RhdGVfcmFuZ2UuaHRtbCddLCB7XHJcbiAgICAgICAgICAgIGxhYmVsOiBsYWJlbCxcclxuICAgICAgICAgICAgc3RhcnRBdHRyOiBzdGFydEF0dHIubGVuZ3RoID4gMCA/ICgnICcgKyBzdGFydEF0dHIuam9pbignICcpKSA6ICcnLFxyXG4gICAgICAgICAgICBlbmRBdHRyOiBzdGFydEVuZC5sZW5ndGggPiAwID8gKCcgJyArIHN0YXJ0RW5kLmpvaW4oJyAnKSkgOiAnJyxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSIsIlxyXG5pbXBvcnQgY29yZXVpVGFibGUgICAgICBmcm9tIFwiLi4vY29yZXVpLnRhYmxlXCI7XHJcbmltcG9ydCBjb3JldWlUYWJsZVRwbCAgIGZyb20gXCIuLi9jb3JldWkudGFibGUudGVtcGxhdGVzXCI7XHJcbmltcG9ydCBjb3JldWlUYWJsZVV0aWxzIGZyb20gXCIuLi9jb3JldWkudGFibGUudXRpbHNcIjtcclxuaW1wb3J0IGNvcmV1aVRhYmxlRWxlbWVudHMgZnJvbSBcIi4uL2NvcmV1aS50YWJsZS5lbGVtZW50c1wiO1xyXG5cclxuY29yZXVpVGFibGUuZmlsdGVycy5kYXRldGltZV9yYW5nZSA9IHtcclxuXHJcbiAgICBfaWQ6IG51bGwsXHJcbiAgICBfdGFibGU6IG51bGwsXHJcbiAgICBfdmFsdWU6IG51bGwsXHJcbiAgICBfb3B0aW9uczoge1xyXG4gICAgICAgIHR5cGU6ICdkYXRldGltZV9yYW5nZScsXHJcbiAgICAgICAgZmllbGQ6IG51bGwsXHJcbiAgICAgICAgbGFiZWw6IG51bGwsXHJcbiAgICAgICAgd2lkdGg6IDIwMCxcclxuICAgICAgICBhdHRyOiB7XHJcbiAgICAgICAgICAgIGNsYXNzOiBcImZvcm0tY29udHJvbCBkLWlubGluZS1ibG9ja1wiLFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y9cclxuICAgICAqIEBwYXJhbSB7Q29yZVVJLnRhYmxlLmluc3RhbmNlfSB0YWJsZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgIG9wdGlvbnNcclxuICAgICAqL1xyXG4gICAgaW5pdDogZnVuY3Rpb24gKHRhYmxlLCBvcHRpb25zKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgdGhpcy5fb3B0aW9ucywgb3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5fdGFibGUgICA9IHRhYmxlO1xyXG4gICAgICAgIHRoaXMuX2lkICAgICAgPSBjb3JldWlUYWJsZVV0aWxzLmhhc2hDb2RlKCk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSDQv9Cw0YDQsNC80LXRgtGA0L7QslxyXG4gICAgICogQHJldHVybnMge29iamVjdH1cclxuICAgICAqL1xyXG4gICAgZ2V0T3B0aW9uczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAkLmV4dGVuZCh0cnVlLCB7fSwgdGhpcy5fb3B0aW9ucyk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSBpZFxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0SWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCj0YHRgtCw0L3QvtCy0LrQsCDQt9C90LDRh9C10L3QuNGPXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdmFsdWVcclxuICAgICAqL1xyXG4gICAgc2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cclxuICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKCAhIGNvcmV1aVRhYmxlVXRpbHMuaXNPYmplY3QodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBkYXRlU3RhcnQgPSBudWxsO1xyXG4gICAgICAgICAgICBsZXQgZGF0ZUVuZCAgID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIGlmICh2YWx1ZS5oYXNPd25Qcm9wZXJ0eSgnc3RhcnQnKSAmJlxyXG4gICAgICAgICAgICAgICAgdHlwZW9mIHZhbHVlLnN0YXJ0ID09PSAnc3RyaW5nJyAmJlxyXG4gICAgICAgICAgICAgICAgdmFsdWUuc3RhcnQubWF0Y2goL15cXGR7NH1cXC1cXGR7Mn1cXC1cXGR7Mn0gXFxkezJ9OlxcZHsyfTpcXGR7Mn0kLykgPT09IG51bGwgJiZcclxuICAgICAgICAgICAgICAgIGlzTmFOKG5ldyBEYXRlKHZhbHVlLnN0YXJ0KSlcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRlU3RhcnQgPSB2YWx1ZS5zdGFydDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHZhbHVlLmhhc093blByb3BlcnR5KCdlbmQnKSAmJlxyXG4gICAgICAgICAgICAgICAgdHlwZW9mIHZhbHVlLmVuZCA9PT0gJ3N0cmluZycgJiZcclxuICAgICAgICAgICAgICAgIHZhbHVlLmVuZC5tYXRjaCgvXlxcZHs0fVxcLVxcZHsyfVxcLVxcZHsyfSBcXGR7Mn06XFxkezJ9OlxcZHsyfSQvKSA9PT0gbnVsbCAmJlxyXG4gICAgICAgICAgICAgICAgaXNOYU4obmV3IERhdGUodmFsdWUuZW5kKSlcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRlRW5kID0gdmFsdWUuZW5kO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0ZVN0YXJ0ID09PSBudWxsICYmIGRhdGVFbmQgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydDogZGF0ZVN0YXJ0LFxyXG4gICAgICAgICAgICAgICAgICAgIGVuZDogZGF0ZUVuZFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUg0LfQvdCw0YfQtdC90LjRj1xyXG4gICAgICogQHJldHVybnMge09iamVjdHxudWxsfVxyXG4gICAgICovXHJcbiAgICBnZXRWYWx1ZTogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBsZXQgY29udHJvbCAgICA9IGNvcmV1aVRhYmxlRWxlbWVudHMuZ2V0Q29udHJvbCh0aGlzLl90YWJsZS5nZXRJZCgpLCB0aGlzLl9pZCk7XHJcbiAgICAgICAgbGV0IGlucHV0U3RhcnQgPSAkKCdpbnB1dC5kYXRlLXN0YXJ0JywgY29udHJvbCk7XHJcbiAgICAgICAgbGV0IGlucHV0RW5kICAgPSAkKCdpbnB1dC5kYXRlLWVuZCcsIGNvbnRyb2wpO1xyXG5cclxuICAgICAgICBpZiAoaW5wdXRTdGFydFswXSAmJiBpbnB1dEVuZFswXSkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgc3RhcnQ6IGlucHV0U3RhcnQudmFsKCksXHJcbiAgICAgICAgICAgICAgICBlbmQ6IGlucHV0RW5kLnZhbCgpLFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDRgdC+0LHRi9GC0LjQuVxyXG4gICAgICogQHJldHVybnMge29iamVjdH1cclxuICAgICAqL1xyXG4gICAgaW5pdEV2ZW50czogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0KTQvtGA0LzQuNGA0L7QstCw0L3QuNC1INC60L7QvdGC0LXQvdGC0LBcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCBvcHRpb25zID0gdGhpcy5nZXRPcHRpb25zKCk7XHJcbiAgICAgICAgbGV0IGxhYmVsICAgPSB0eXBlb2Ygb3B0aW9ucy5sYWJlbCA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIG9wdGlvbnMubGFiZWwgPT09ICdudW1iZXInXHJcbiAgICAgICAgICAgID8gb3B0aW9ucy5sYWJlbFxyXG4gICAgICAgICAgICA6ICcnO1xyXG5cclxuICAgICAgICBpZiAoICEgY29yZXVpVGFibGVVdGlscy5pc09iamVjdChvcHRpb25zLmF0dHIpKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuYXR0ciA9IHt9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3dpZHRoJykgJiZcclxuICAgICAgICAgICAgY29yZXVpVGFibGVVdGlscy5pc051bWVyaWMob3B0aW9ucy53aWR0aClcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuYXR0ci5oYXNPd25Qcm9wZXJ0eSgnc3R5bGUnKSkge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5hdHRyWydzdHlsZSddICs9ICc7d2lkdGg6JyArIG9wdGlvbnMud2lkdGggKyAncHgnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5hdHRyWydzdHlsZSddID0gJ3dpZHRoOicgKyBvcHRpb25zLndpZHRoICsgJ3B4JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG9wdGlvbnMuYXR0ci5oYXNPd25Qcm9wZXJ0eSgndHlwZScpKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBvcHRpb25zLmF0dHIudHlwZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChvcHRpb25zLmF0dHIuaGFzT3duUHJvcGVydHkoJ3ZhbHVlJykpIHtcclxuICAgICAgICAgICAgZGVsZXRlIG9wdGlvbnMuYXR0ci52YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBsZXQgZmllbGQgICAgID0gdHlwZW9mIG9wdGlvbnMuZmllbGQgPT09ICdzdHJpbmcnID8gb3B0aW9ucy5maWVsZCA6ICcnO1xyXG4gICAgICAgIGxldCBzdGFydEF0dHIgPSBbXTtcclxuICAgICAgICBsZXQgc3RhcnRFbmQgID0gW107XHJcblxyXG5cclxuICAgICAgICAkLmVhY2gob3B0aW9ucy5hdHRyLCBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKFsnbmFtZScsICd2YWx1ZScsICdjbGFzcyddLmluZGV4T2YobmFtZSkgPj0gMCB8fFxyXG4gICAgICAgICAgICAgICAgWydzdHJpbmcnLCAnbnVtYmVyJ10uaW5kZXhPZih0eXBlb2YgdmFsdWUpIDwgMFxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc3RhcnRBdHRyLnB1c2gobmFtZSArICc9XCInICsgdmFsdWUgKyAnXCInKTtcclxuICAgICAgICAgICAgc3RhcnRFbmQucHVzaChuYW1lICsgJz1cIicgKyB2YWx1ZSArICdcIicpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAob3B0aW9ucy5hdHRyLmhhc093blByb3BlcnR5KCdjbGFzcycpICYmXHJcbiAgICAgICAgICAgIFsnc3RyaW5nJywgJ251bWJlciddLmluZGV4T2YodHlwZW9mIG9wdGlvbnMuYXR0ci5jbGFzcykgPj0gMFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBzdGFydEF0dHIucHVzaCgnY2xhc3M9XCInICsgb3B0aW9ucy5hdHRyLmNsYXNzICsgJyBkYXRlLXN0YXJ0XCInKTtcclxuICAgICAgICAgICAgc3RhcnRFbmQucHVzaCgnY2xhc3M9XCInICsgb3B0aW9ucy5hdHRyLmNsYXNzICsgJyBkYXRlLWVuZFwiJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3RhcnRBdHRyLnB1c2goJ2NsYXNzPVwiZGF0ZS1zdGFydFwiJyk7XHJcbiAgICAgICAgICAgIHN0YXJ0RW5kLnB1c2goJ2NsYXNzPVwiZGF0ZS1lbmRcIicpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGlmIChmaWVsZCkge1xyXG4gICAgICAgICAgICBzdGFydEF0dHIucHVzaCgnbmFtZT1cIicgKyBmaWVsZCArICdbc3RhcnRdXCInKTtcclxuICAgICAgICAgICAgc3RhcnRFbmQucHVzaCgnbmFtZT1cIicgKyBmaWVsZCArICdbZW5kXVwiJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGFydEF0dHIucHVzaCgndmFsdWU9XCInICsgKHRoaXMuX3ZhbHVlID8gdGhpcy5fdmFsdWUuc3RhcnQgOiAnJykgKyAnXCInKTtcclxuICAgICAgICBzdGFydEVuZC5wdXNoKCd2YWx1ZT1cIicgKyAodGhpcy5fdmFsdWUgPyB0aGlzLl92YWx1ZS5lbmQgOiAnJykgKyAnXCInKTtcclxuXHJcblxyXG4gICAgICAgIHJldHVybiBlanMucmVuZGVyKGNvcmV1aVRhYmxlVHBsWydmaWx0ZXJzL2RhdGV0aW1lX3JhbmdlLmh0bWwnXSwge1xyXG4gICAgICAgICAgICBsYWJlbDogbGFiZWwsXHJcbiAgICAgICAgICAgIHN0YXJ0QXR0cjogc3RhcnRBdHRyLmxlbmd0aCA+IDAgPyAoJyAnICsgc3RhcnRBdHRyLmpvaW4oJyAnKSkgOiAnJyxcclxuICAgICAgICAgICAgZW5kQXR0cjogc3RhcnRFbmQubGVuZ3RoID4gMCA/ICgnICcgKyBzdGFydEVuZC5qb2luKCcgJykpIDogJycsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iLCJcclxuaW1wb3J0IGNvcmV1aVRhYmxlICAgICAgZnJvbSBcIi4uL2NvcmV1aS50YWJsZVwiO1xyXG5pbXBvcnQgY29yZXVpVGFibGVUcGwgICBmcm9tIFwiLi4vY29yZXVpLnRhYmxlLnRlbXBsYXRlc1wiO1xyXG5pbXBvcnQgY29yZXVpVGFibGVVdGlscyBmcm9tIFwiLi4vY29yZXVpLnRhYmxlLnV0aWxzXCI7XHJcbmltcG9ydCBjb3JldWlUYWJsZUVsZW1lbnRzIGZyb20gXCIuLi9jb3JldWkudGFibGUuZWxlbWVudHNcIjtcclxuXHJcbmNvcmV1aVRhYmxlLmZpbHRlcnMuY2hlY2tib3ggPSB7XHJcblxyXG4gICAgX2lkOiBudWxsLFxyXG4gICAgX3RhYmxlOiBudWxsLFxyXG4gICAgX3ZhbHVlOiBudWxsLFxyXG4gICAgX2NsYXNzOiAnYnRuIGJ0bi1vdXRsaW5lLXNlY29uZGFyeScsXHJcbiAgICBfb3B0aW9uczoge1xyXG4gICAgICAgIHR5cGU6ICdjaGVja2JveCcsXHJcbiAgICAgICAgZmllbGQ6IG51bGwsXHJcbiAgICAgICAgbGFiZWw6IG51bGwsXHJcbiAgICAgICAgb3B0aW9uczogW10sXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPXHJcbiAgICAgKiBAcGFyYW0ge0NvcmVVSS50YWJsZS5pbnN0YW5jZX0gdGFibGVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICBvcHRpb25zXHJcbiAgICAgKi9cclxuICAgIGluaXQ6IGZ1bmN0aW9uICh0YWJsZSwgb3B0aW9ucykge1xyXG5cclxuICAgICAgICB0aGlzLl9vcHRpb25zID0gJC5leHRlbmQodHJ1ZSwge30sIHRoaXMuX29wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuX3RhYmxlICAgPSB0YWJsZTtcclxuICAgICAgICB0aGlzLl9pZCAgICAgID0gY29yZXVpVGFibGVVdGlscy5oYXNoQ29kZSgpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUg0L/QsNGA0LDQvNC10YLRgNC+0LJcclxuICAgICAqIEByZXR1cm5zIHtvYmplY3R9XHJcbiAgICAgKi9cclxuICAgIGdldE9wdGlvbnM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gJC5leHRlbmQodHJ1ZSwge30sIHRoaXMuX29wdGlvbnMpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUgaWRcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldElkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQo9GB0YLQsNC90L7QstC60LAg0LfQvdCw0YfQtdC90LjRj1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXHJcbiAgICAgKi9cclxuICAgIHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHJcbiAgICAgICAgaWYgKCAhIEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBpdGVtcyA9IFtdO1xyXG5cclxuICAgICAgICAkLmVhY2godmFsdWUsIGZ1bmN0aW9uIChrZXksIGl0ZW0pIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycgJiYgdHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpdGVtcy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5fdmFsdWUgPSBpdGVtc1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUg0LfQvdCw0YfQtdC90LjRj1xyXG4gICAgICogQHJldHVybnMge3N0cmluZ3xudWxsfVxyXG4gICAgICovXHJcbiAgICBnZXRWYWx1ZTogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBsZXQgY29udHJvbCA9IGNvcmV1aVRhYmxlRWxlbWVudHMuZ2V0Q29udHJvbCh0aGlzLl90YWJsZS5nZXRJZCgpLCB0aGlzLl9pZCk7XHJcbiAgICAgICAgbGV0IGlucHV0cyAgPSAkKCdpbnB1dDpjaGVja2VkJywgY29udHJvbCk7XHJcblxyXG4gICAgICAgIGlmIChpbnB1dHNbMF0pIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW1zICA9IFtdO1xyXG5cclxuICAgICAgICAgICAgJC5lYWNoKGlucHV0cywgZnVuY3Rpb24gKGtleSwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goaW5wdXQudmFsKCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtcztcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0YHQvtCx0YvRgtC40LlcclxuICAgICAqIEByZXR1cm5zIHtvYmplY3R9XHJcbiAgICAgKi9cclxuICAgIGluaXRFdmVudHM6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCk0L7RgNC80LjRgNC+0LLQsNC90LjQtSDQutC+0L3RgtC10L3RgtCwXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBsZXQgdGhhdCAgICA9IHRoaXM7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB0aGlzLmdldE9wdGlvbnMoKTtcclxuICAgICAgICBsZXQgZmllbGQgICA9IHR5cGVvZiBvcHRpb25zLmZpZWxkID09PSAnc3RyaW5nJyA/IG9wdGlvbnMuZmllbGQgOiAnJztcclxuICAgICAgICBsZXQgaXRlbXMgICA9IFtdO1xyXG4gICAgICAgIGxldCBsYWJlbCAgID0gdHlwZW9mIG9wdGlvbnMubGFiZWwgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBvcHRpb25zLmxhYmVsID09PSAnbnVtYmVyJ1xyXG4gICAgICAgICAgICA/IG9wdGlvbnMubGFiZWxcclxuICAgICAgICAgICAgOiAnJztcclxuXHJcbiAgICAgICAgJC5lYWNoKG9wdGlvbnMub3B0aW9ucywgZnVuY3Rpb24gKGtleSwgb3B0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmICggISBjb3JldWlUYWJsZVV0aWxzLmlzT2JqZWN0KG9wdGlvbikgfHxcclxuICAgICAgICAgICAgICAgICEgb3B0aW9uLmhhc093blByb3BlcnR5KCd2YWx1ZScpIHx8XHJcbiAgICAgICAgICAgICAgICBbJ3N0cmluZycsICdudW1lcmljJ10uaW5kZXhPZih0eXBlb2Ygb3B0aW9uLnZhbHVlKSA9PT0gLTFcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBjaGVja2VkID0gQXJyYXkuaXNBcnJheSh0aGF0Ll92YWx1ZSkgPyB0aGF0Ll92YWx1ZS5pbmRleE9mKG9wdGlvbi52YWx1ZSkgPj0gMCA6IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgdGV4dCAgICA9IG9wdGlvbi5oYXNPd25Qcm9wZXJ0eSgndGV4dCcpXHJcbiAgICAgICAgICAgICAgICA/IG9wdGlvbi50ZXh0XHJcbiAgICAgICAgICAgICAgICA6IG9wdGlvbi52YWx1ZTtcclxuXHJcbiAgICAgICAgICAgIGl0ZW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgdGV4dDogICAgdGV4dCxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiAgIG9wdGlvbi52YWx1ZSxcclxuICAgICAgICAgICAgICAgIGNsYXNzOiAgIG9wdGlvbi5oYXNPd25Qcm9wZXJ0eSgnY2xhc3MnKSAmJiB0eXBlb2Ygb3B0aW9uLmNsYXNzID09PSAnc3RyaW5nJyA/IG9wdGlvbi5jbGFzcyA6IHRoYXQuX2NsYXNzLFxyXG4gICAgICAgICAgICAgICAgY2hlY2tlZDogY2hlY2tlZCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBlanMucmVuZGVyKGNvcmV1aVRhYmxlVHBsWydmaWx0ZXJzL2NoZWNrYm94Lmh0bWwnXSwge1xyXG4gICAgICAgICAgICBsYWJlbDogbGFiZWwsXHJcbiAgICAgICAgICAgIGl0ZW1zOiBpdGVtcyxcclxuICAgICAgICAgICAgZmllbGQ6IGZpZWxkICsgdGhpcy5nZXRJZCgpLFxyXG4gICAgICAgICAgICBsYW5nOiB0aGlzLl90YWJsZS5nZXRMYW5nKClcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSIsIlxyXG5pbXBvcnQgY29yZXVpVGFibGUgICAgICBmcm9tIFwiLi4vY29yZXVpLnRhYmxlXCI7XHJcbmltcG9ydCBjb3JldWlUYWJsZVRwbCAgIGZyb20gXCIuLi9jb3JldWkudGFibGUudGVtcGxhdGVzXCI7XHJcbmltcG9ydCBjb3JldWlUYWJsZVV0aWxzIGZyb20gXCIuLi9jb3JldWkudGFibGUudXRpbHNcIjtcclxuaW1wb3J0IGNvcmV1aVRhYmxlRWxlbWVudHMgZnJvbSBcIi4uL2NvcmV1aS50YWJsZS5lbGVtZW50c1wiO1xyXG5cclxuY29yZXVpVGFibGUuZmlsdGVycy5yYWRpbyA9IHtcclxuXHJcbiAgICBfaWQ6IG51bGwsXHJcbiAgICBfdGFibGU6IG51bGwsXHJcbiAgICBfdmFsdWU6IG51bGwsXHJcbiAgICBfY2xhc3M6ICdidG4gYnRuLW91dGxpbmUtc2Vjb25kYXJ5JyxcclxuICAgIF9vcHRpb25zOiB7XHJcbiAgICAgICAgdHlwZTogJ3JhZGlvJyxcclxuICAgICAgICBmaWVsZDogbnVsbCxcclxuICAgICAgICBsYWJlbDogbnVsbCxcclxuICAgICAgICBvcHRpb25zOiBbXSxcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y9cclxuICAgICAqIEBwYXJhbSB7Q29yZVVJLnRhYmxlLmluc3RhbmNlfSB0YWJsZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgIG9wdGlvbnNcclxuICAgICAqL1xyXG4gICAgaW5pdDogZnVuY3Rpb24gKHRhYmxlLCBvcHRpb25zKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgdGhpcy5fb3B0aW9ucywgb3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5fdGFibGUgICA9IHRhYmxlO1xyXG4gICAgICAgIHRoaXMuX2lkICAgICAgPSBjb3JldWlUYWJsZVV0aWxzLmhhc2hDb2RlKCk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSDQv9Cw0YDQsNC80LXRgtGA0L7QslxyXG4gICAgICogQHJldHVybnMge29iamVjdH1cclxuICAgICAqL1xyXG4gICAgZ2V0T3B0aW9uczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAkLmV4dGVuZCh0cnVlLCB7fSwgdGhpcy5fb3B0aW9ucyk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSBpZFxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0SWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCj0YHRgtCw0L3QvtCy0LrQsCDQt9C90LDRh9C10L3QuNGPXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcclxuICAgICAqL1xyXG4gICAgc2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJyAmJiB0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIHJldHVybicnXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSDQt9C90LDRh9C10L3QuNGPXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfG51bGx9XHJcbiAgICAgKi9cclxuICAgIGdldFZhbHVlOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGxldCBjb250cm9sID0gY29yZXVpVGFibGVFbGVtZW50cy5nZXRDb250cm9sKHRoaXMuX3RhYmxlLmdldElkKCksIHRoaXMuX2lkKTtcclxuICAgICAgICBsZXQgaW5wdXQgICA9ICQoJ2lucHV0OmNoZWNrZWQnLCBjb250cm9sKTtcclxuXHJcbiAgICAgICAgaWYgKGlucHV0WzBdKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IGlucHV0LnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlID09PSAnJ1xyXG4gICAgICAgICAgICAgICAgPyBudWxsXHJcbiAgICAgICAgICAgICAgICA6IHZhbHVlXHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDRgdC+0LHRi9GC0LjQuVxyXG4gICAgICogQHJldHVybnMge29iamVjdH1cclxuICAgICAqL1xyXG4gICAgaW5pdEV2ZW50czogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0KTQvtGA0LzQuNGA0L7QstCw0L3QuNC1INC60L7QvdGC0LXQvdGC0LBcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCB0aGF0ICAgID0gdGhpcztcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHRoaXMuZ2V0T3B0aW9ucygpO1xyXG4gICAgICAgIGxldCBmaWVsZCAgID0gdHlwZW9mIG9wdGlvbnMuZmllbGQgPT09ICdzdHJpbmcnID8gb3B0aW9ucy5maWVsZCA6ICcnO1xyXG4gICAgICAgIGxldCBpdGVtcyAgID0gW107XHJcbiAgICAgICAgbGV0IGxhYmVsICAgPSB0eXBlb2Ygb3B0aW9ucy5sYWJlbCA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIG9wdGlvbnMubGFiZWwgPT09ICdudW1iZXInXHJcbiAgICAgICAgICAgID8gb3B0aW9ucy5sYWJlbFxyXG4gICAgICAgICAgICA6ICcnO1xyXG5cclxuICAgICAgICAkLmVhY2gob3B0aW9ucy5vcHRpb25zLCBmdW5jdGlvbiAoa2V5LCBvcHRpb24pIHtcclxuICAgICAgICAgICAgaWYgKCAhIGNvcmV1aVRhYmxlVXRpbHMuaXNPYmplY3Qob3B0aW9uKSB8fFxyXG4gICAgICAgICAgICAgICAgISBvcHRpb24uaGFzT3duUHJvcGVydHkoJ3ZhbHVlJykgfHxcclxuICAgICAgICAgICAgICAgIFsnc3RyaW5nJywgJ251bWVyaWMnXS5pbmRleE9mKHR5cGVvZiBvcHRpb24udmFsdWUpID09PSAtMVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHRleHQgPSBvcHRpb24uaGFzT3duUHJvcGVydHkoJ3RleHQnKVxyXG4gICAgICAgICAgICAgICAgPyBvcHRpb24udGV4dFxyXG4gICAgICAgICAgICAgICAgOiBvcHRpb24udmFsdWU7XHJcblxyXG4gICAgICAgICAgICBpdGVtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHRleHQ6ICAgIHRleHQsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogICBvcHRpb24udmFsdWUsXHJcbiAgICAgICAgICAgICAgICBjbGFzczogICBvcHRpb24uaGFzT3duUHJvcGVydHkoJ2NsYXNzJykgJiYgdHlwZW9mIG9wdGlvbi5jbGFzcyA9PT0gJ3N0cmluZycgPyBvcHRpb24uY2xhc3MgOiB0aGF0Ll9jbGFzcyxcclxuICAgICAgICAgICAgICAgIGNoZWNrZWQ6IG9wdGlvbi52YWx1ZSA9PSB0aGF0Ll92YWx1ZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBlanMucmVuZGVyKGNvcmV1aVRhYmxlVHBsWydmaWx0ZXJzL3JhZGlvLmh0bWwnXSwge1xyXG4gICAgICAgICAgICBsYWJlbDogbGFiZWwsXHJcbiAgICAgICAgICAgIGl0ZW1zOiBpdGVtcyxcclxuICAgICAgICAgICAgZmllbGQ6IGZpZWxkICsgdGhpcy5nZXRJZCgpLFxyXG4gICAgICAgICAgICBsYW5nOiB0aGlzLl90YWJsZS5nZXRMYW5nKClcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSIsIlxyXG5pbXBvcnQgY29yZXVpVGFibGUgICAgICBmcm9tIFwiLi4vY29yZXVpLnRhYmxlXCI7XHJcbmltcG9ydCBjb3JldWlUYWJsZVRwbCAgIGZyb20gXCIuLi9jb3JldWkudGFibGUudGVtcGxhdGVzXCI7XHJcbmltcG9ydCBjb3JldWlUYWJsZVV0aWxzIGZyb20gXCIuLi9jb3JldWkudGFibGUudXRpbHNcIjtcclxuaW1wb3J0IENvcmV1aVRhYmxlVXRpbHMgZnJvbSBcIi4uL2NvcmV1aS50YWJsZS51dGlsc1wiO1xyXG5pbXBvcnQgY29yZXVpVGFibGVFbGVtZW50cyBmcm9tIFwiLi4vY29yZXVpLnRhYmxlLmVsZW1lbnRzXCI7XHJcblxyXG5jb3JldWlUYWJsZS5maWx0ZXJzLnNlbGVjdCA9IHtcclxuXHJcbiAgICBfaWQ6IG51bGwsXHJcbiAgICBfdGFibGU6IG51bGwsXHJcbiAgICBfdmFsdWU6IG51bGwsXHJcbiAgICBfb3B0aW9uczoge1xyXG4gICAgICAgIHR5cGU6ICdzZWxlY3QnLFxyXG4gICAgICAgIGZpZWxkOiBudWxsLFxyXG4gICAgICAgIGxhYmVsOiBudWxsLFxyXG4gICAgICAgIHdpZHRoOiBudWxsLFxyXG4gICAgICAgIGF0dHI6IHtcclxuICAgICAgICAgICAgY2xhc3M6ICdmb3JtLXNlbGVjdCBkLWlubGluZS1ibG9jaydcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9wdGlvbnM6IFtdXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPXHJcbiAgICAgKiBAcGFyYW0ge0NvcmVVSS50YWJsZS5pbnN0YW5jZX0gdGFibGVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICBvcHRpb25zXHJcbiAgICAgKi9cclxuICAgIGluaXQ6IGZ1bmN0aW9uICh0YWJsZSwgb3B0aW9ucykge1xyXG5cclxuICAgICAgICB0aGlzLl9vcHRpb25zID0gJC5leHRlbmQodHJ1ZSwge30sIHRoaXMuX29wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuX3RhYmxlICAgPSB0YWJsZTtcclxuICAgICAgICB0aGlzLl9pZCAgICAgID0gY29yZXVpVGFibGVVdGlscy5oYXNoQ29kZSgpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUg0L/QsNGA0LDQvNC10YLRgNC+0LJcclxuICAgICAqIEByZXR1cm5zIHtvYmplY3R9XHJcbiAgICAgKi9cclxuICAgIGdldE9wdGlvbnM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gJC5leHRlbmQodHJ1ZSwge30sIHRoaXMuX29wdGlvbnMpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUgaWRcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldElkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQo9GB0YLQsNC90L7QstC60LAg0LfQvdCw0YfQtdC90LjRj1xyXG4gICAgICogQHBhcmFtIHtBcnJheX0gdmFsdWVcclxuICAgICAqL1xyXG4gICAgc2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cclxuICAgICAgICBpZiAoWydzdHJpbmcnLCAnbnVtYmVyJywgJ29iamVjdCddLmluZGV4T2YodHlwZW9mIHZhbHVlKSA8IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbXMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAkLmVhY2godmFsdWUsIGZ1bmN0aW9uIChrZXksIGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJyAmJiB0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZSA9IGl0ZW1zO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QvtC70YPRh9C10L3QuNC1INC30L3QsNGH0LXQvdC40Y9cclxuICAgICAqIEByZXR1cm5zIHtBcnJheXxudWxsfVxyXG4gICAgICovXHJcbiAgICBnZXRWYWx1ZTogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBsZXQgY29udHJvbCA9IGNvcmV1aVRhYmxlRWxlbWVudHMuZ2V0Q29udHJvbCh0aGlzLl90YWJsZS5nZXRJZCgpLCB0aGlzLl9pZCk7XHJcblxyXG4gICAgICAgIGlmIChjb250cm9sWzBdKSB7XHJcbiAgICAgICAgICAgIGxldCBvcHRpb25zID0gJCgnc2VsZWN0IG9wdGlvbjpjaGVja2VkJywgY29udHJvbCk7XHJcbiAgICAgICAgICAgIGxldCBpdGVtcyAgID0gW107XHJcblxyXG4gICAgICAgICAgICAkLmVhY2gob3B0aW9ucywgZnVuY3Rpb24gKGtleSwgb3B0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBvcHRpb24udmFsKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2godmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtcztcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGB0L7QsdGL0YLQuNC5XHJcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fVxyXG4gICAgICovXHJcbiAgICBpbml0RXZlbnRzOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQpNC+0YDQvNC40YDQvtCy0LDQvdC40LUg0LrQvtC90YLQtdC90YLQsFxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgbGV0IHRoYXQgICAgICAgICAgPSB0aGlzO1xyXG4gICAgICAgIGxldCBvcHRpb25zICAgICAgID0gdGhpcy5nZXRPcHRpb25zKCk7XHJcbiAgICAgICAgbGV0IHNlbGVjdE9wdGlvbnMgPSBbXTtcclxuICAgICAgICBsZXQgYXR0cmlidXRlcyAgICA9IFtdO1xyXG4gICAgICAgIGxldCBsYWJlbCAgICAgICAgID0gdHlwZW9mIG9wdGlvbnMubGFiZWwgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBvcHRpb25zLmxhYmVsID09PSAnbnVtYmVyJ1xyXG4gICAgICAgICAgICA/IG9wdGlvbnMubGFiZWxcclxuICAgICAgICAgICAgOiAnJztcclxuXHJcbiAgICAgICAgaWYgKCAhIG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2F0dHInKSB8fFxyXG4gICAgICAgICAgICAhIGNvcmV1aVRhYmxlVXRpbHMuaXNPYmplY3Qob3B0aW9ucy5hdHRyKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBvcHRpb25zLmF0dHIgPSB7fTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChvcHRpb25zLmZpZWxkKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuYXR0ci5uYW1lID0gdGhpcy5fb3B0aW9ucy5maWVsZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChvcHRpb25zLndpZHRoKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuYXR0ciA9IGNvcmV1aVRhYmxlVXRpbHMubWVyZ2VBdHRyKFxyXG4gICAgICAgICAgICAgICAgeyBzdHlsZTogJ3dpZHRoOicgKyBvcHRpb25zLndpZHRoICsgJ3B4JyB9LFxyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5hdHRyXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnb3B0aW9ucycpICYmXHJcbiAgICAgICAgICAgIHR5cGVvZiBvcHRpb25zLm9wdGlvbnMgPT09ICdvYmplY3QnICYmXHJcbiAgICAgICAgICAgIG9wdGlvbnMub3B0aW9ucyAhPT0gbnVsbFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICAkLmVhY2gob3B0aW9ucy5vcHRpb25zLCBmdW5jdGlvbiAoa2V5LCBvcHRpb24pIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIG9wdGlvbiA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RPcHRpb25zLnB1c2godGhhdC5fYnVpbGRPcHRpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnb3B0aW9uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGtleSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogb3B0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoQ29yZXVpVGFibGVVdGlscy5pc09iamVjdChvcHRpb24pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHR5cGUgPSBvcHRpb24uaGFzT3duUHJvcGVydHkoJ3R5cGUnKSAmJiB0eXBlb2Ygb3B0aW9uLnR5cGUgPT09ICdzdHJpbmcnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gb3B0aW9uLnR5cGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiAnb3B0aW9uJztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdncm91cCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlbmRlckF0dHIgICA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ3JvdXBBdHRyICAgID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBncm91cE9wdGlvbnMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb24uaGFzT3duUHJvcGVydHkoJ2F0dHInKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29yZXVpVGFibGVVdGlscy5pc09iamVjdChvcHRpb24uYXR0cilcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cEF0dHIgPSBvcHRpb24uYXR0cjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5oYXNPd25Qcm9wZXJ0eSgnbGFiZWwnKSAmJiBbJ3N0cmluZycsICdudW1iZXInXS5pbmRleE9mKHR5cGVvZihvcHRpb24ubGFiZWwpKSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cEF0dHIubGFiZWwgPSBvcHRpb24ubGFiZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChncm91cEF0dHIsIGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyQXR0ci5wdXNoKG5hbWUgKyAnPVwiJyArIHZhbHVlICsgJ1wiJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob3B0aW9uLm9wdGlvbnMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2gob3B0aW9uLm9wdGlvbnMsIGZ1bmN0aW9uIChrZXksIGdyb3VwT3B0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBPcHRpb25zLnB1c2godGhhdC5fYnVpbGRPcHRpb24oZ3JvdXBPcHRpb24pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RPcHRpb25zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2dyb3VwJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHI6IHJlbmRlckF0dHIubGVuZ3RoID4gMCA/ICgnICcgKyByZW5kZXJBdHRyLmpvaW4oJyAnKSkgOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IGdyb3VwT3B0aW9ucyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMucHVzaCh0aGF0Ll9idWlsZE9wdGlvbihvcHRpb24pKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJC5lYWNoKG9wdGlvbnMuYXR0ciwgZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMucHVzaChuYW1lICsgJz1cIicgKyB2YWx1ZSArICdcIicpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZWpzLnJlbmRlcihjb3JldWlUYWJsZVRwbFsnZmlsdGVycy9zZWxlY3QuaHRtbCddLCB7XHJcbiAgICAgICAgICAgIGxhYmVsOiBsYWJlbCxcclxuICAgICAgICAgICAgYXR0cjogYXR0cmlidXRlcy5sZW5ndGggPiAwID8gKCcgJyArIGF0dHJpYnV0ZXMuam9pbignICcpKSA6ICcnLFxyXG4gICAgICAgICAgICBvcHRpb25zOiBzZWxlY3RPcHRpb25zXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCh0LHQvtGA0LrQsCDQvtC/0YbQuNC4XHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uXHJcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBfYnVpbGRPcHRpb246IGZ1bmN0aW9uIChvcHRpb24pIHtcclxuXHJcbiAgICAgICAgbGV0IG9wdGlvbkF0dHIgPSBbXTtcclxuICAgICAgICBsZXQgb3B0aW9uVGV4dCA9IG9wdGlvbi5oYXNPd25Qcm9wZXJ0eSgndGV4dCcpICYmIFsnc3RyaW5nJywgJ251bWJlciddLmluZGV4T2YodHlwZW9mKG9wdGlvbi50ZXh0KSkgPj0gMFxyXG4gICAgICAgICAgICA/IG9wdGlvbi50ZXh0XHJcbiAgICAgICAgICAgIDogJyc7XHJcblxyXG4gICAgICAgICQuZWFjaChvcHRpb24sIGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAobmFtZSAhPT0gJ3RleHQnKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25BdHRyLnB1c2gobmFtZSArICc9XCInICsgdmFsdWUgKyAnXCInKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5fdmFsdWUpKSB7XHJcbiAgICAgICAgICAgICQuZWFjaCh0aGlzLl92YWx1ZSwgZnVuY3Rpb24gKGtleSwgaXRlbVZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbVZhbHVlID09IG9wdGlvbi52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbkF0dHIucHVzaCgnc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl92YWx1ZSA9PSBvcHRpb24udmFsdWUpIHtcclxuICAgICAgICAgICAgb3B0aW9uQXR0ci5wdXNoKCdzZWxlY3RlZD1cInNlbGVjdGVkXCInKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdvcHRpb24nLFxyXG4gICAgICAgICAgICB0ZXh0OiBvcHRpb25UZXh0LFxyXG4gICAgICAgICAgICBhdHRyOiBvcHRpb25BdHRyLmxlbmd0aCA+IDAgPyAoJyAnICsgb3B0aW9uQXR0ci5qb2luKCcgJykpIDogJydcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59IiwiXHJcbmltcG9ydCBjb3JldWlUYWJsZSAgICAgIGZyb20gXCIuLi9jb3JldWkudGFibGVcIjtcclxuaW1wb3J0IGNvcmV1aVRhYmxlVHBsICAgZnJvbSBcIi4uL2NvcmV1aS50YWJsZS50ZW1wbGF0ZXNcIjtcclxuaW1wb3J0IGNvcmV1aVRhYmxlVXRpbHMgZnJvbSBcIi4uL2NvcmV1aS50YWJsZS51dGlsc1wiO1xyXG5pbXBvcnQgY29yZXVpVGFibGVFbGVtZW50cyBmcm9tIFwiLi4vY29yZXVpLnRhYmxlLmVsZW1lbnRzXCI7XHJcblxyXG5jb3JldWlUYWJsZS5maWx0ZXJzLnN3aXRjaCA9IHtcclxuXHJcbiAgICBfaWQ6IG51bGwsXHJcbiAgICBfdGFibGU6IG51bGwsXHJcbiAgICBfdmFsdWU6IG51bGwsXHJcbiAgICBfb3B0aW9uczoge1xyXG4gICAgICAgIHR5cGU6ICdzd2l0Y2gnLFxyXG4gICAgICAgIGZpZWxkOiBudWxsLFxyXG4gICAgICAgIGxhYmVsOiBudWxsLFxyXG4gICAgICAgIHZhbHVlWTogJ1knXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPXHJcbiAgICAgKiBAcGFyYW0ge0NvcmVVSS50YWJsZS5pbnN0YW5jZX0gdGFibGVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICBvcHRpb25zXHJcbiAgICAgKi9cclxuICAgIGluaXQ6IGZ1bmN0aW9uICh0YWJsZSwgb3B0aW9ucykge1xyXG5cclxuICAgICAgICB0aGlzLl9vcHRpb25zID0gJC5leHRlbmQodHJ1ZSwge30sIHRoaXMuX29wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuX3RhYmxlICAgPSB0YWJsZTtcclxuICAgICAgICB0aGlzLl9pZCAgICAgID0gY29yZXVpVGFibGVVdGlscy5oYXNoQ29kZSgpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUg0L/QsNGA0LDQvNC10YLRgNC+0LJcclxuICAgICAqIEByZXR1cm5zIHtvYmplY3R9XHJcbiAgICAgKi9cclxuICAgIGdldE9wdGlvbnM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gJC5leHRlbmQodHJ1ZSwge30sIHRoaXMuX29wdGlvbnMpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUgaWRcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldElkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQo9GB0YLQsNC90L7QstC60LAg0LfQvdCw0YfQtdC90LjRj1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXHJcbiAgICAgKi9cclxuICAgIHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycgJiYgdHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICByZXR1cm4nJ1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZVxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUg0LfQvdCw0YfQtdC90LjRj1xyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0VmFsdWU6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgbGV0IGNvbnRyb2wgPSBjb3JldWlUYWJsZUVsZW1lbnRzLmdldENvbnRyb2wodGhpcy5fdGFibGUuZ2V0SWQoKSwgdGhpcy5faWQpO1xyXG4gICAgICAgIGxldCBpbnB1dCAgID0gJCgnaW5wdXQ6Y2hlY2tlZCcsIGNvbnRyb2wpO1xyXG5cclxuICAgICAgICByZXR1cm4gaW5wdXRbMF0gPyBpbnB1dC52YWwoKSA6IG51bGw7XHJcbiAgICB9LFxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDRgdC+0LHRi9GC0LjQuVxyXG4gICAgICogQHJldHVybnMge29iamVjdH1cclxuICAgICAqL1xyXG4gICAgaW5pdEV2ZW50czogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0KTQvtGA0LzQuNGA0L7QstCw0L3QuNC1INC60L7QvdGC0LXQvdGC0LBcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCBvcHRpb25zID0gdGhpcy5nZXRPcHRpb25zKCk7XHJcbiAgICAgICAgbGV0IHZhbHVlWSAgPSB0eXBlb2Ygb3B0aW9ucy52YWx1ZVkgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBvcHRpb25zLmxhYmVsID09PSAnbnVtYmVyJ1xyXG4gICAgICAgICAgICA/IG9wdGlvbnMudmFsdWVZXHJcbiAgICAgICAgICAgIDogJydcclxuICAgICAgICBsZXQgbGFiZWwgICA9IHR5cGVvZiBvcHRpb25zLmxhYmVsID09PSAnc3RyaW5nJyB8fCB0eXBlb2Ygb3B0aW9ucy5sYWJlbCA9PT0gJ251bWJlcidcclxuICAgICAgICAgICAgPyBvcHRpb25zLmxhYmVsXHJcbiAgICAgICAgICAgIDogJyc7XHJcblxyXG4gICAgICAgIGxldCBjaGVja2VkID0gdGhpcy5fdmFsdWUgPT0gdmFsdWVZO1xyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIGVqcy5yZW5kZXIoY29yZXVpVGFibGVUcGxbJ2ZpbHRlcnMvc3dpdGNoLmh0bWwnXSwge1xyXG4gICAgICAgICAgICBpZDogdGhpcy5faWQsXHJcbiAgICAgICAgICAgIHZhbHVlWTogdmFsdWVZLFxyXG4gICAgICAgICAgICBmaWVsZDogdHlwZW9mIG9wdGlvbnMuZmllbGQgPT09ICdzdHJpbmcnID8gb3B0aW9ucy5maWVsZCA6ICcnLFxyXG4gICAgICAgICAgICBjaGVja2VkOiBjaGVja2VkLFxyXG4gICAgICAgICAgICBsYWJlbDogbGFiZWwsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iLCJcclxuaW1wb3J0IGNvcmV1aVRhYmxlICAgICAgICAgZnJvbSBcIi4uL2NvcmV1aS50YWJsZVwiO1xyXG5pbXBvcnQgY29yZXVpVGFibGVUcGwgICAgICBmcm9tIFwiLi4vY29yZXVpLnRhYmxlLnRlbXBsYXRlc1wiO1xyXG5pbXBvcnQgY29yZXVpVGFibGVVdGlscyAgICBmcm9tIFwiLi4vY29yZXVpLnRhYmxlLnV0aWxzXCI7XHJcbmltcG9ydCBjb3JldWlUYWJsZUVsZW1lbnRzIGZyb20gXCIuLi9jb3JldWkudGFibGUuZWxlbWVudHNcIjtcclxuXHJcbmNvcmV1aVRhYmxlLnNlYXJjaC50ZXh0ID0ge1xyXG5cclxuICAgIF9pZDogbnVsbCxcclxuICAgIF90YWJsZTogbnVsbCxcclxuICAgIF92YWx1ZTogbnVsbCxcclxuICAgIF9vcHRpb25zOiB7XHJcbiAgICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICAgIGZpZWxkOiBudWxsLFxyXG4gICAgICAgIGxhYmVsOiBudWxsLFxyXG4gICAgICAgIHdpZHRoOiAyMDAsXHJcbiAgICAgICAgYXR0cjoge1xyXG4gICAgICAgICAgICBjbGFzczogXCJmb3JtLWNvbnRyb2wgZC1pbmxpbmUtYmxvY2tcIixcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPXHJcbiAgICAgKiBAcGFyYW0ge0NvcmVVSS50YWJsZS5pbnN0YW5jZX0gdGFibGVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICBvcHRpb25zXHJcbiAgICAgKi9cclxuICAgIGluaXQ6IGZ1bmN0aW9uICh0YWJsZSwgb3B0aW9ucykge1xyXG5cclxuICAgICAgICB0aGlzLl9vcHRpb25zID0gJC5leHRlbmQodHJ1ZSwge30sIHRoaXMuX29wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuX3RhYmxlICAgPSB0YWJsZTtcclxuICAgICAgICB0aGlzLl9pZCAgICAgID0gY29yZXVpVGFibGVVdGlscy5oYXNoQ29kZSgpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUg0L/QsNGA0LDQvNC10YLRgNC+0LJcclxuICAgICAqIEByZXR1cm5zIHtvYmplY3R9XHJcbiAgICAgKi9cclxuICAgIGdldE9wdGlvbnM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gJC5leHRlbmQodHJ1ZSwge30sIHRoaXMuX29wdGlvbnMpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUgaWRcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldElkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQo9GB0YLQsNC90L7QstC60LAg0LfQvdCw0YfQtdC90LjRj1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXHJcbiAgICAgKi9cclxuICAgIHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycgJiYgdHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICByZXR1cm4nJ1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZVxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUg0LfQvdCw0YfQtdC90LjRj1xyXG4gICAgICogQHJldHVybnMge3N0cmluZ3xudWxsfVxyXG4gICAgICovXHJcbiAgICBnZXRWYWx1ZTogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBsZXQgY29udHJvbCA9IGNvcmV1aVRhYmxlRWxlbWVudHMuZ2V0U2VhcmNoQ29udHJvbCh0aGlzLl90YWJsZS5nZXRJZCgpLCB0aGlzLl9pZCk7XHJcbiAgICAgICAgbGV0IGlucHV0ICAgPSAkKCdpbnB1dCcsIGNvbnRyb2wpO1xyXG5cclxuICAgICAgICBpZiAoaW5wdXRbMF0pIHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gaW5wdXQudmFsKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB2YWx1ZSAhPT0gJycpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDRgdC+0LHRi9GC0LjQuVxyXG4gICAgICogQHJldHVybnMge29iamVjdH1cclxuICAgICAqL1xyXG4gICAgaW5pdEV2ZW50czogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0KTQvtGA0LzQuNGA0L7QstCw0L3QuNC1INC60L7QvdGC0LXQvdGC0LBcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGlmICggISBjb3JldWlUYWJsZVV0aWxzLmlzT2JqZWN0KHRoaXMuX29wdGlvbnMuYXR0cikpIHtcclxuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5hdHRyID0ge307XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnd2lkdGgnKSAmJlxyXG4gICAgICAgICAgICBjb3JldWlUYWJsZVV0aWxzLmlzTnVtZXJpYyh0aGlzLl9vcHRpb25zLndpZHRoKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5hdHRyLmhhc093blByb3BlcnR5KCdzdHlsZScpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vcHRpb25zLmF0dHJbJ3N0eWxlJ10gKz0gJzt3aWR0aDonICsgdGhpcy5fb3B0aW9ucy53aWR0aCArICdweCc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vcHRpb25zLmF0dHJbJ3N0eWxlJ10gPSAnd2lkdGg6JyArIHRoaXMuX29wdGlvbnMud2lkdGggKyAncHgnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9vcHRpb25zLmF0dHJbJ25hbWUnXSAgPSB0eXBlb2YgdGhpcy5fb3B0aW9ucy5maWVsZCA9PT0gJ3N0cmluZycgPyB0aGlzLl9vcHRpb25zLmZpZWxkIDogJyc7XHJcbiAgICAgICAgdGhpcy5fb3B0aW9ucy5hdHRyWyd2YWx1ZSddID0gdHlwZW9mIHRoaXMuX3ZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdGhpcy5fdmFsdWUgPT09ICdudW1iZXInXHJcbiAgICAgICAgICAgID8gdGhpcy5fdmFsdWVcclxuICAgICAgICAgICAgOiAnJztcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuYXR0ci5oYXNPd25Qcm9wZXJ0eSgndHlwZScpKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9vcHRpb25zLmF0dHIudHlwZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBhdHRyaWJ1dGVzID0gW107XHJcblxyXG4gICAgICAgICQuZWFjaCh0aGlzLl9vcHRpb25zLmF0dHIsIGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzLnB1c2gobmFtZSArICc9XCInICsgdmFsdWUgKyAnXCInKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVqcy5yZW5kZXIoY29yZXVpVGFibGVUcGxbJ3NlYXJjaC90ZXh0Lmh0bWwnXSwge1xyXG4gICAgICAgICAgICBhdHRyOiBhdHRyaWJ1dGVzLmxlbmd0aCA+IDAgPyAoJyAnICsgYXR0cmlidXRlcy5qb2luKCcgJykpIDogJycsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iLCJcclxuaW1wb3J0IGNvcmV1aVRhYmxlICAgICAgICAgZnJvbSBcIi4uL2NvcmV1aS50YWJsZVwiO1xyXG5pbXBvcnQgY29yZXVpVGFibGVUcGwgICAgICBmcm9tIFwiLi4vY29yZXVpLnRhYmxlLnRlbXBsYXRlc1wiO1xyXG5pbXBvcnQgY29yZXVpVGFibGVVdGlscyAgICBmcm9tIFwiLi4vY29yZXVpLnRhYmxlLnV0aWxzXCI7XHJcbmltcG9ydCBjb3JldWlUYWJsZUVsZW1lbnRzIGZyb20gXCIuLi9jb3JldWkudGFibGUuZWxlbWVudHNcIjtcclxuXHJcbmNvcmV1aVRhYmxlLnNlYXJjaC5udW1iZXIgPSB7XHJcblxyXG4gICAgX2lkOiBudWxsLFxyXG4gICAgX3RhYmxlOiBudWxsLFxyXG4gICAgX3ZhbHVlOiBudWxsLFxyXG4gICAgX29wdGlvbnM6IHtcclxuICAgICAgICB0eXBlOiAnbnVtYmVyJyxcclxuICAgICAgICBmaWVsZDogbnVsbCxcclxuICAgICAgICBsYWJlbDogbnVsbCxcclxuICAgICAgICB3aWR0aDogMjAwLFxyXG4gICAgICAgIGF0dHI6IHtcclxuICAgICAgICAgICAgY2xhc3M6IFwiZm9ybS1jb250cm9sIGQtaW5saW5lLWJsb2NrXCIsXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRj1xyXG4gICAgICogQHBhcmFtIHtDb3JlVUkudGFibGUuaW5zdGFuY2V9IHRhYmxlXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgb3B0aW9uc1xyXG4gICAgICovXHJcbiAgICBpbml0OiBmdW5jdGlvbiAodGFibGUsIG9wdGlvbnMpIHtcclxuXHJcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9ICQuZXh0ZW5kKHRydWUsIHt9LCB0aGlzLl9vcHRpb25zLCBvcHRpb25zKTtcclxuICAgICAgICB0aGlzLl90YWJsZSAgID0gdGFibGU7XHJcbiAgICAgICAgdGhpcy5faWQgICAgICA9IGNvcmV1aVRhYmxlVXRpbHMuaGFzaENvZGUoKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QvtC70YPRh9C10L3QuNC1INC/0LDRgNCw0LzQtdGC0YDQvtCyXHJcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fVxyXG4gICAgICovXHJcbiAgICBnZXRPcHRpb25zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICQuZXh0ZW5kKHRydWUsIHt9LCB0aGlzLl9vcHRpb25zKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QvtC70YPRh9C10L3QuNC1IGlkXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXRJZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0KPRgdGC0LDQvdC+0LLQutCwINC30L3QsNGH0LXQvdC40Y9cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZVxyXG4gICAgICovXHJcbiAgICBzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAoICEgY29yZXVpVGFibGVVdGlscy5pc09iamVjdCh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IG51bWJlclN0YXJ0ID0gbnVsbDtcclxuICAgICAgICAgICAgbGV0IG51bWJlckVuZCAgID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIGlmICh2YWx1ZS5oYXNPd25Qcm9wZXJ0eSgnc3RhcnQnKSAmJlxyXG4gICAgICAgICAgICAgICAgWydzdHJpbmcnLCAnbnVtYmVyJ10uaW5kZXhPZih0eXBlb2YgdmFsdWUuc3RhcnQpID49IDBcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBudW1iZXJTdGFydCA9IHZhbHVlLnN0YXJ0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodmFsdWUuaGFzT3duUHJvcGVydHkoJ2VuZCcpICYmXHJcbiAgICAgICAgICAgICAgICBbJ3N0cmluZycsICdudW1iZXInXS5pbmRleE9mKHR5cGVvZiB2YWx1ZS5lbmQpID49IDBcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBudW1iZXJFbmQgPSB2YWx1ZS5lbmQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChudW1iZXJTdGFydCA9PT0gbnVsbCAmJiBudW1iZXJFbmQgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydDogbnVtYmVyU3RhcnQsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5kOiBudW1iZXJFbmRcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QvtC70YPRh9C10L3QuNC1INC30L3QsNGH0LXQvdC40Y9cclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd8bnVsbH1cclxuICAgICAqL1xyXG4gICAgZ2V0VmFsdWU6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgbGV0IGNvbnRyb2wgICAgPSBjb3JldWlUYWJsZUVsZW1lbnRzLmdldFNlYXJjaENvbnRyb2wodGhpcy5fdGFibGUuZ2V0SWQoKSwgdGhpcy5faWQpO1xyXG4gICAgICAgIGxldCBpbnB1dFN0YXJ0ID0gJCgnaW5wdXQubnVtYmVyLXN0YXJ0JywgY29udHJvbCk7XHJcbiAgICAgICAgbGV0IGlucHV0RW5kICAgPSAkKCdpbnB1dC5udW1iZXItZW5kJywgY29udHJvbCk7XHJcblxyXG4gICAgICAgIGlmIChpbnB1dFN0YXJ0WzBdICYmIGlucHV0RW5kWzBdKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdmFsdWVTdGFydCA9IGlucHV0U3RhcnQudmFsKCk7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZUVuZCAgID0gaW5wdXRFbmQudmFsKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAodHlwZW9mIHZhbHVlU3RhcnQgPT09ICdzdHJpbmcnICYmIHZhbHVlU3RhcnQgIT09ICcnKSB8fFxyXG4gICAgICAgICAgICAgICAgKHR5cGVvZiB2YWx1ZUVuZCA9PT0gJ3N0cmluZycgJiYgdmFsdWVFbmQgIT09ICcnKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IHZhbHVlU3RhcnQsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5kOiB2YWx1ZUVuZCxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfSxcclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0YHQvtCx0YvRgtC40LlcclxuICAgICAqIEByZXR1cm5zIHtvYmplY3R9XHJcbiAgICAgKi9cclxuICAgIGluaXRFdmVudHM6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCk0L7RgNC80LjRgNC+0LLQsNC90LjQtSDQutC+0L3RgtC10L3RgtCwXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBpZiAoICEgY29yZXVpVGFibGVVdGlscy5pc09iamVjdCh0aGlzLl9vcHRpb25zLmF0dHIpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuYXR0ciA9IHt9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3dpZHRoJykgJiZcclxuICAgICAgICAgICAgY29yZXVpVGFibGVVdGlscy5pc051bWVyaWModGhpcy5fb3B0aW9ucy53aWR0aClcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuYXR0ci5oYXNPd25Qcm9wZXJ0eSgnc3R5bGUnKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5hdHRyWydzdHlsZSddICs9ICc7d2lkdGg6JyArIHRoaXMuX29wdGlvbnMud2lkdGggKyAncHgnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5hdHRyWydzdHlsZSddID0gJ3dpZHRoOicgKyB0aGlzLl9vcHRpb25zLndpZHRoICsgJ3B4JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuYXR0ci5oYXNPd25Qcm9wZXJ0eSgndHlwZScpKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9vcHRpb25zLmF0dHIudHlwZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLmF0dHIuaGFzT3duUHJvcGVydHkoJ3ZhbHVlJykpIHtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX29wdGlvbnMuYXR0ci52YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBsZXQgZmllbGQgICAgID0gdHlwZW9mIHRoaXMuX29wdGlvbnMuZmllbGQgPT09ICdzdHJpbmcnID8gdGhpcy5fb3B0aW9ucy5maWVsZCA6ICcnO1xyXG4gICAgICAgIGxldCBzdGFydEF0dHIgPSBbXTtcclxuICAgICAgICBsZXQgc3RhcnRFbmQgID0gW107XHJcblxyXG5cclxuICAgICAgICAkLmVhY2godGhpcy5fb3B0aW9ucy5hdHRyLCBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKFsnbmFtZScsICd2YWx1ZScsICdjbGFzcyddLmluZGV4T2YobmFtZSkgPj0gMCB8fFxyXG4gICAgICAgICAgICAgICAgWydzdHJpbmcnLCAnbnVtYmVyJ10uaW5kZXhPZih0eXBlb2YgdmFsdWUpIDwgMFxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc3RhcnRBdHRyLnB1c2gobmFtZSArICc9XCInICsgdmFsdWUgKyAnXCInKTtcclxuICAgICAgICAgICAgc3RhcnRFbmQucHVzaChuYW1lICsgJz1cIicgKyB2YWx1ZSArICdcIicpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5hdHRyLmhhc093blByb3BlcnR5KCdjbGFzcycpICYmXHJcbiAgICAgICAgICAgIFsnc3RyaW5nJywgJ251bWJlciddLmluZGV4T2YodHlwZW9mIHRoaXMuX29wdGlvbnMuYXR0ci5jbGFzcykgPj0gMFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBzdGFydEF0dHIucHVzaCgnY2xhc3M9XCInICsgdGhpcy5fb3B0aW9ucy5hdHRyLmNsYXNzICsgJyBudW1iZXItc3RhcnRcIicpO1xyXG4gICAgICAgICAgICBzdGFydEVuZC5wdXNoKCdjbGFzcz1cIicgKyB0aGlzLl9vcHRpb25zLmF0dHIuY2xhc3MgKyAnIG51bWJlci1lbmRcIicpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN0YXJ0QXR0ci5wdXNoKCdjbGFzcz1cIm51bWJlci1zdGFydFwiJyk7XHJcbiAgICAgICAgICAgIHN0YXJ0RW5kLnB1c2goJ2NsYXNzPVwibnVtYmVyLWVuZFwiJyk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgaWYgKGZpZWxkKSB7XHJcbiAgICAgICAgICAgIHN0YXJ0QXR0ci5wdXNoKCduYW1lPVwiJyArIGZpZWxkICsgJ1tzdGFydF1cIicpO1xyXG4gICAgICAgICAgICBzdGFydEVuZC5wdXNoKCduYW1lPVwiJyArIGZpZWxkICsgJ1tlbmRdXCInKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXJ0QXR0ci5wdXNoKCd2YWx1ZT1cIicgKyAodGhpcy5fdmFsdWUgPyB0aGlzLl92YWx1ZS5zdGFydCA6ICcnKSArICdcIicpO1xyXG4gICAgICAgIHN0YXJ0RW5kLnB1c2goJ3ZhbHVlPVwiJyArICh0aGlzLl92YWx1ZSA/IHRoaXMuX3ZhbHVlLmVuZCA6ICcnKSArICdcIicpO1xyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIGVqcy5yZW5kZXIoY29yZXVpVGFibGVUcGxbJ3NlYXJjaC9udW1iZXIuaHRtbCddLCB7XHJcbiAgICAgICAgICAgIHN0YXJ0QXR0cjogc3RhcnRBdHRyLmxlbmd0aCA+IDAgPyAoJyAnICsgc3RhcnRBdHRyLmpvaW4oJyAnKSkgOiAnJyxcclxuICAgICAgICAgICAgZW5kQXR0cjogc3RhcnRFbmQubGVuZ3RoID4gMCA/ICgnICcgKyBzdGFydEVuZC5qb2luKCcgJykpIDogJycsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iLCJcclxuaW1wb3J0IGNvcmV1aVRhYmxlICAgICAgZnJvbSBcIi4uL2NvcmV1aS50YWJsZVwiO1xyXG5pbXBvcnQgY29yZXVpVGFibGVUcGwgICBmcm9tIFwiLi4vY29yZXVpLnRhYmxlLnRlbXBsYXRlc1wiO1xyXG5pbXBvcnQgY29yZXVpVGFibGVVdGlscyBmcm9tIFwiLi4vY29yZXVpLnRhYmxlLnV0aWxzXCI7XHJcblxyXG5jb3JldWlUYWJsZS5zZWFyY2guZGF0ZSA9IHtcclxuXHJcbiAgICBfaWQ6IG51bGwsXHJcbiAgICBfdGFibGU6IG51bGwsXHJcbiAgICBfdmFsdWU6IG51bGwsXHJcbiAgICBfb3B0aW9uczoge1xyXG4gICAgICAgIHR5cGU6ICdkYXRlJyxcclxuICAgICAgICBmaWVsZDogbnVsbCxcclxuICAgICAgICBsYWJlbDogbnVsbCxcclxuICAgICAgICB3aWR0aDogMjAwLFxyXG4gICAgICAgIGF0dHI6IHtcclxuICAgICAgICAgICAgY2xhc3M6IFwiZm9ybS1jb250cm9sIGQtaW5saW5lLWJsb2NrXCIsXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRj1xyXG4gICAgICogQHBhcmFtIHtDb3JlVUkudGFibGUuaW5zdGFuY2V9IHRhYmxlXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgb3B0aW9uc1xyXG4gICAgICovXHJcbiAgICBpbml0OiBmdW5jdGlvbiAodGFibGUsIG9wdGlvbnMpIHtcclxuXHJcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9ICQuZXh0ZW5kKHRydWUsIHt9LCB0aGlzLl9vcHRpb25zLCBvcHRpb25zKTtcclxuICAgICAgICB0aGlzLl90YWJsZSAgID0gdGFibGU7XHJcbiAgICAgICAgdGhpcy5faWQgICAgICA9IGNvcmV1aVRhYmxlVXRpbHMuaGFzaENvZGUoKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QvtC70YPRh9C10L3QuNC1INC/0LDRgNCw0LzQtdGC0YDQvtCyXHJcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fVxyXG4gICAgICovXHJcbiAgICBnZXRPcHRpb25zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICQuZXh0ZW5kKHRydWUsIHt9LCB0aGlzLl9vcHRpb25zKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QvtC70YPRh9C10L3QuNC1IGlkXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXRJZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0KPRgdGC0LDQvdC+0LLQutCwINC30L3QsNGH0LXQvdC40Y9cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxyXG4gICAgICovXHJcbiAgICBzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZSAmJlxyXG4gICAgICAgICAgICAoXHJcbiAgICAgICAgICAgICAgICB0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnIHx8XHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5tYXRjaCgvXlxcZHs0fVxcLVxcZHsyfVxcLVxcZHsyfSQvKSA9PT0gbnVsbCB8fFxyXG4gICAgICAgICAgICAgICAgaXNOYU4obmV3IERhdGUodmFsdWUpKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSDQt9C90LDRh9C10L3QuNGPXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfG51bGx9XHJcbiAgICAgKi9cclxuICAgIGdldFZhbHVlOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGxldCBzZWFyY2hDb250YWluZXIgPSAkKCcjY29yZXVpLXRhYmxlLScgKyB0aGlzLl90YWJsZS5nZXRJZCgpICsgJyA+IC5jb3JldWktdGFibGVfX2NvbnRhaW5lciA+IC5jb3JldWktdGFibGVfX3dyYXBwZXIgPiAuY29yZXVpLXRhYmxlX19zZWFyY2gnKTtcclxuICAgICAgICBsZXQgaW5wdXQgICAgICAgICAgID0gJCgnLnNlYXJjaC1jb250cm9sLScgKyB0aGlzLl9pZCArICcgaW5wdXQnLCBzZWFyY2hDb250YWluZXIpO1xyXG5cclxuICAgICAgICBpZiAoaW5wdXRbMF0pIHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gaW5wdXQudmFsKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB2YWx1ZSAhPT0gJycpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDRgdC+0LHRi9GC0LjQuVxyXG4gICAgICogQHJldHVybnMge29iamVjdH1cclxuICAgICAqL1xyXG4gICAgaW5pdEV2ZW50czogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0KTQvtGA0LzQuNGA0L7QstCw0L3QuNC1INC60L7QvdGC0LXQvdGC0LBcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGlmICggISBjb3JldWlUYWJsZVV0aWxzLmlzT2JqZWN0KHRoaXMuX29wdGlvbnMuYXR0cikpIHtcclxuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5hdHRyID0ge307XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnd2lkdGgnKSAmJlxyXG4gICAgICAgICAgICBjb3JldWlUYWJsZVV0aWxzLmlzTnVtZXJpYyh0aGlzLl9vcHRpb25zLndpZHRoKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5hdHRyLmhhc093blByb3BlcnR5KCdzdHlsZScpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vcHRpb25zLmF0dHJbJ3N0eWxlJ10gKz0gJzt3aWR0aDonICsgdGhpcy5fb3B0aW9ucy53aWR0aCArICdweCc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vcHRpb25zLmF0dHJbJ3N0eWxlJ10gPSAnd2lkdGg6JyArIHRoaXMuX29wdGlvbnMud2lkdGggKyAncHgnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9vcHRpb25zLmF0dHJbJ25hbWUnXSAgPSB0eXBlb2YgdGhpcy5fb3B0aW9ucy5maWVsZCA9PT0gJ3N0cmluZycgPyB0aGlzLl9vcHRpb25zLmZpZWxkIDogJyc7XHJcbiAgICAgICAgdGhpcy5fb3B0aW9ucy5hdHRyWyd2YWx1ZSddID0gdHlwZW9mIHRoaXMuX3ZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdGhpcy5fdmFsdWUgPT09ICdudW1iZXInXHJcbiAgICAgICAgICAgID8gdGhpcy5fdmFsdWVcclxuICAgICAgICAgICAgOiAnJztcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuYXR0ci5oYXNPd25Qcm9wZXJ0eSgndHlwZScpKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9vcHRpb25zLmF0dHIudHlwZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBhdHRyaWJ1dGVzID0gW107XHJcblxyXG4gICAgICAgICQuZWFjaCh0aGlzLl9vcHRpb25zLmF0dHIsIGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzLnB1c2gobmFtZSArICc9XCInICsgdmFsdWUgKyAnXCInKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVqcy5yZW5kZXIoY29yZXVpVGFibGVUcGxbJ3NlYXJjaC9kYXRlLmh0bWwnXSwge1xyXG4gICAgICAgICAgICBhdHRyOiBhdHRyaWJ1dGVzLmxlbmd0aCA+IDAgPyAoJyAnICsgYXR0cmlidXRlcy5qb2luKCcgJykpIDogJycsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iLCJcclxuaW1wb3J0IGNvcmV1aVRhYmxlICAgICAgZnJvbSBcIi4uL2NvcmV1aS50YWJsZVwiO1xyXG5pbXBvcnQgY29yZXVpVGFibGVUcGwgICBmcm9tIFwiLi4vY29yZXVpLnRhYmxlLnRlbXBsYXRlc1wiO1xyXG5pbXBvcnQgY29yZXVpVGFibGVVdGlscyBmcm9tIFwiLi4vY29yZXVpLnRhYmxlLnV0aWxzXCI7XHJcbmltcG9ydCBjb3JldWlUYWJsZUVsZW1lbnRzIGZyb20gXCIuLi9jb3JldWkudGFibGUuZWxlbWVudHNcIjtcclxuXHJcbmNvcmV1aVRhYmxlLnNlYXJjaC5kYXRlX21vbnRoID0ge1xyXG5cclxuICAgIF9pZDogbnVsbCxcclxuICAgIF90YWJsZTogbnVsbCxcclxuICAgIF92YWx1ZTogbnVsbCxcclxuICAgIF9vcHRpb25zOiB7XHJcbiAgICAgICAgdHlwZTogJ2RhdGVfbW9udGgnLFxyXG4gICAgICAgIGZpZWxkOiBudWxsLFxyXG4gICAgICAgIGxhYmVsOiBudWxsLFxyXG4gICAgICAgIHdpZHRoOiAyMDAsXHJcbiAgICAgICAgYXR0cjoge1xyXG4gICAgICAgICAgICBjbGFzczogXCJmb3JtLWNvbnRyb2wgZC1pbmxpbmUtYmxvY2tcIixcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPXHJcbiAgICAgKiBAcGFyYW0ge0NvcmVVSS50YWJsZS5pbnN0YW5jZX0gdGFibGVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICBvcHRpb25zXHJcbiAgICAgKi9cclxuICAgIGluaXQ6IGZ1bmN0aW9uICh0YWJsZSwgb3B0aW9ucykge1xyXG5cclxuICAgICAgICB0aGlzLl9vcHRpb25zID0gJC5leHRlbmQodHJ1ZSwge30sIHRoaXMuX29wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuX3RhYmxlICAgPSB0YWJsZTtcclxuICAgICAgICB0aGlzLl9pZCAgICAgID0gY29yZXVpVGFibGVVdGlscy5oYXNoQ29kZSgpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUg0L/QsNGA0LDQvNC10YLRgNC+0LJcclxuICAgICAqIEByZXR1cm5zIHtvYmplY3R9XHJcbiAgICAgKi9cclxuICAgIGdldE9wdGlvbnM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gJC5leHRlbmQodHJ1ZSwge30sIHRoaXMuX29wdGlvbnMpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUgaWRcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldElkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQo9GB0YLQsNC90L7QstC60LAg0LfQvdCw0YfQtdC90LjRj1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXHJcbiAgICAgKi9cclxuICAgIHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHJcbiAgICAgICAgaWYgKHZhbHVlICYmXHJcbiAgICAgICAgICAgIChcclxuICAgICAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycgfHxcclxuICAgICAgICAgICAgICAgIHZhbHVlLm1hdGNoKC9eXFxkezR9XFwtXFxkezJ9JC8pID09PSBudWxsIHx8XHJcbiAgICAgICAgICAgICAgICBpc05hTihuZXcgRGF0ZSh2YWx1ZSkpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QvtC70YPRh9C10L3QuNC1INC30L3QsNGH0LXQvdC40Y9cclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd8bnVsbH1cclxuICAgICAqL1xyXG4gICAgZ2V0VmFsdWU6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgbGV0IGNvbnRyb2wgPSBjb3JldWlUYWJsZUVsZW1lbnRzLmdldFNlYXJjaENvbnRyb2wodGhpcy5fdGFibGUuZ2V0SWQoKSwgdGhpcy5faWQpO1xyXG4gICAgICAgIGxldCBpbnB1dCAgID0gJCgnaW5wdXQnLCBjb250cm9sKTtcclxuXHJcbiAgICAgICAgaWYgKGlucHV0WzBdKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IGlucHV0LnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUgIT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfSxcclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0YHQvtCx0YvRgtC40LlcclxuICAgICAqIEByZXR1cm5zIHtvYmplY3R9XHJcbiAgICAgKi9cclxuICAgIGluaXRFdmVudHM6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCk0L7RgNC80LjRgNC+0LLQsNC90LjQtSDQutC+0L3RgtC10L3RgtCwXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBpZiAoICEgY29yZXVpVGFibGVVdGlscy5pc09iamVjdCh0aGlzLl9vcHRpb25zLmF0dHIpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuYXR0ciA9IHt9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3dpZHRoJykgJiZcclxuICAgICAgICAgICAgY29yZXVpVGFibGVVdGlscy5pc051bWVyaWModGhpcy5fb3B0aW9ucy53aWR0aClcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuYXR0ci5oYXNPd25Qcm9wZXJ0eSgnc3R5bGUnKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5hdHRyWydzdHlsZSddICs9ICc7d2lkdGg6JyArIHRoaXMuX29wdGlvbnMud2lkdGggKyAncHgnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5hdHRyWydzdHlsZSddID0gJ3dpZHRoOicgKyB0aGlzLl9vcHRpb25zLndpZHRoICsgJ3B4JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fb3B0aW9ucy5hdHRyWyduYW1lJ10gID0gdHlwZW9mIHRoaXMuX29wdGlvbnMuZmllbGQgPT09ICdzdHJpbmcnID8gdGhpcy5fb3B0aW9ucy5maWVsZCA6ICcnO1xyXG4gICAgICAgIHRoaXMuX29wdGlvbnMuYXR0clsndmFsdWUnXSA9IHR5cGVvZiB0aGlzLl92YWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHRoaXMuX3ZhbHVlID09PSAnbnVtYmVyJ1xyXG4gICAgICAgICAgICA/IHRoaXMuX3ZhbHVlXHJcbiAgICAgICAgICAgIDogJyc7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLmF0dHIuaGFzT3duUHJvcGVydHkoJ3R5cGUnKSkge1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fb3B0aW9ucy5hdHRyLnR5cGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYXR0cmlidXRlcyA9IFtdO1xyXG5cclxuICAgICAgICAkLmVhY2godGhpcy5fb3B0aW9ucy5hdHRyLCBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgYXR0cmlidXRlcy5wdXNoKG5hbWUgKyAnPVwiJyArIHZhbHVlICsgJ1wiJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBlanMucmVuZGVyKGNvcmV1aVRhYmxlVHBsWydzZWFyY2gvZGF0ZV9tb250aC5odG1sJ10sIHtcclxuICAgICAgICAgICAgYXR0cjogYXR0cmlidXRlcy5sZW5ndGggPiAwID8gKCcgJyArIGF0dHJpYnV0ZXMuam9pbignICcpKSA6ICcnLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59IiwiXHJcbmltcG9ydCBjb3JldWlUYWJsZSAgICAgICAgIGZyb20gXCIuLi9jb3JldWkudGFibGVcIjtcclxuaW1wb3J0IGNvcmV1aVRhYmxlVHBsICAgICAgZnJvbSBcIi4uL2NvcmV1aS50YWJsZS50ZW1wbGF0ZXNcIjtcclxuaW1wb3J0IGNvcmV1aVRhYmxlVXRpbHMgICAgZnJvbSBcIi4uL2NvcmV1aS50YWJsZS51dGlsc1wiO1xyXG5pbXBvcnQgY29yZXVpVGFibGVFbGVtZW50cyBmcm9tIFwiLi4vY29yZXVpLnRhYmxlLmVsZW1lbnRzXCI7XHJcblxyXG5jb3JldWlUYWJsZS5zZWFyY2guZGF0ZXRpbWUgPSB7XHJcblxyXG4gICAgX2lkOiBudWxsLFxyXG4gICAgX3RhYmxlOiBudWxsLFxyXG4gICAgX3ZhbHVlOiBudWxsLFxyXG4gICAgX29wdGlvbnM6IHtcclxuICAgICAgICB0eXBlOiAnZGF0ZXRpbWUnLFxyXG4gICAgICAgIGZpZWxkOiBudWxsLFxyXG4gICAgICAgIGxhYmVsOiBudWxsLFxyXG4gICAgICAgIHdpZHRoOiAyMDAsXHJcbiAgICAgICAgYXR0cjoge1xyXG4gICAgICAgICAgICBjbGFzczogXCJmb3JtLWNvbnRyb2wgZC1pbmxpbmUtYmxvY2tcIixcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPXHJcbiAgICAgKiBAcGFyYW0ge0NvcmVVSS50YWJsZS5pbnN0YW5jZX0gdGFibGVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICBvcHRpb25zXHJcbiAgICAgKi9cclxuICAgIGluaXQ6IGZ1bmN0aW9uICh0YWJsZSwgb3B0aW9ucykge1xyXG5cclxuICAgICAgICB0aGlzLl9vcHRpb25zID0gJC5leHRlbmQodHJ1ZSwge30sIHRoaXMuX29wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuX3RhYmxlICAgPSB0YWJsZTtcclxuICAgICAgICB0aGlzLl9pZCAgICAgID0gY29yZXVpVGFibGVVdGlscy5oYXNoQ29kZSgpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUg0L/QsNGA0LDQvNC10YLRgNC+0LJcclxuICAgICAqIEByZXR1cm5zIHtvYmplY3R9XHJcbiAgICAgKi9cclxuICAgIGdldE9wdGlvbnM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gJC5leHRlbmQodHJ1ZSwge30sIHRoaXMuX29wdGlvbnMpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUgaWRcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldElkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQo9GB0YLQsNC90L7QstC60LAg0LfQvdCw0YfQtdC90LjRj1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXHJcbiAgICAgKi9cclxuICAgIHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHJcbiAgICAgICAgaWYgKHZhbHVlICYmXHJcbiAgICAgICAgICAgIChcclxuICAgICAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycgfHxcclxuICAgICAgICAgICAgICAgIHZhbHVlLm1hdGNoKC9eXFxkezR9XFwtXFxkezJ9XFwtXFxkezJ9IFxcZHsyfTpcXGR7Mn06XFxkezJ9JC8pID09PSBudWxsIHx8XHJcbiAgICAgICAgICAgICAgICBpc05hTihuZXcgRGF0ZSh2YWx1ZSkpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QvtC70YPRh9C10L3QuNC1INC30L3QsNGH0LXQvdC40Y9cclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldFZhbHVlOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGxldCBjb250cm9sID0gY29yZXVpVGFibGVFbGVtZW50cy5nZXRTZWFyY2hDb250cm9sKHRoaXMuX3RhYmxlLmdldElkKCksIHRoaXMuX2lkKTtcclxuICAgICAgICBsZXQgaW5wdXQgICA9ICQoJ2lucHV0JywgY29udHJvbCk7XHJcblxyXG4gICAgICAgIGlmIChpbnB1dFswXSkge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBpbnB1dC52YWwoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlICE9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGB0L7QsdGL0YLQuNC5XHJcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fVxyXG4gICAgICovXHJcbiAgICBpbml0RXZlbnRzOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQpNC+0YDQvNC40YDQvtCy0LDQvdC40LUg0LrQvtC90YLQtdC90YLQsFxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgaWYgKCAhIGNvcmV1aVRhYmxlVXRpbHMuaXNPYmplY3QodGhpcy5fb3B0aW9ucy5hdHRyKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLmF0dHIgPSB7fTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLmhhc093blByb3BlcnR5KCd3aWR0aCcpICYmXHJcbiAgICAgICAgICAgIGNvcmV1aVRhYmxlVXRpbHMuaXNOdW1lcmljKHRoaXMuX29wdGlvbnMud2lkdGgpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zLmF0dHIuaGFzT3duUHJvcGVydHkoJ3N0eWxlJykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuYXR0clsnc3R5bGUnXSArPSAnO3dpZHRoOicgKyB0aGlzLl9vcHRpb25zLndpZHRoICsgJ3B4JztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuYXR0clsnc3R5bGUnXSA9ICd3aWR0aDonICsgdGhpcy5fb3B0aW9ucy53aWR0aCArICdweCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX29wdGlvbnMuYXR0clsnbmFtZSddICA9IHR5cGVvZiB0aGlzLl9vcHRpb25zLmZpZWxkID09PSAnc3RyaW5nJyA/IHRoaXMuX29wdGlvbnMuZmllbGQgOiAnJztcclxuICAgICAgICB0aGlzLl9vcHRpb25zLmF0dHJbJ3ZhbHVlJ10gPSB0eXBlb2YgdGhpcy5fdmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB0aGlzLl92YWx1ZSA9PT0gJ251bWJlcidcclxuICAgICAgICAgICAgPyB0aGlzLl92YWx1ZVxyXG4gICAgICAgICAgICA6ICcnO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5hdHRyLmhhc093blByb3BlcnR5KCd0eXBlJykpIHtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX29wdGlvbnMuYXR0ci50eXBlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGF0dHJpYnV0ZXMgPSBbXTtcclxuXHJcbiAgICAgICAgJC5lYWNoKHRoaXMuX29wdGlvbnMuYXR0ciwgZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMucHVzaChuYW1lICsgJz1cIicgKyB2YWx1ZSArICdcIicpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZWpzLnJlbmRlcihjb3JldWlUYWJsZVRwbFsnc2VhcmNoL2RhdGV0aW1lLmh0bWwnXSwge1xyXG4gICAgICAgICAgICBhdHRyOiBhdHRyaWJ1dGVzLmxlbmd0aCA+IDAgPyAoJyAnICsgYXR0cmlidXRlcy5qb2luKCcgJykpIDogJycsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iLCJcclxuaW1wb3J0IGNvcmV1aVRhYmxlICAgICAgICAgZnJvbSBcIi4uL2NvcmV1aS50YWJsZVwiO1xyXG5pbXBvcnQgY29yZXVpVGFibGVUcGwgICAgICBmcm9tIFwiLi4vY29yZXVpLnRhYmxlLnRlbXBsYXRlc1wiO1xyXG5pbXBvcnQgY29yZXVpVGFibGVVdGlscyAgICBmcm9tIFwiLi4vY29yZXVpLnRhYmxlLnV0aWxzXCI7XHJcbmltcG9ydCBjb3JldWlUYWJsZUVsZW1lbnRzIGZyb20gXCIuLi9jb3JldWkudGFibGUuZWxlbWVudHNcIjtcclxuXHJcbmNvcmV1aVRhYmxlLnNlYXJjaC5kYXRlX3JhbmdlID0ge1xyXG5cclxuICAgIF9pZDogbnVsbCxcclxuICAgIF90YWJsZTogbnVsbCxcclxuICAgIF92YWx1ZTogbnVsbCxcclxuICAgIF9vcHRpb25zOiB7XHJcbiAgICAgICAgdHlwZTogJ2RhdGVfcmFuZ2UnLFxyXG4gICAgICAgIGZpZWxkOiBudWxsLFxyXG4gICAgICAgIGxhYmVsOiBudWxsLFxyXG4gICAgICAgIHdpZHRoOiAyMDAsXHJcbiAgICAgICAgYXR0cjoge1xyXG4gICAgICAgICAgICBjbGFzczogXCJmb3JtLWNvbnRyb2wgZC1pbmxpbmUtYmxvY2tcIixcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPXHJcbiAgICAgKiBAcGFyYW0ge0NvcmVVSS50YWJsZS5pbnN0YW5jZX0gdGFibGVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICBvcHRpb25zXHJcbiAgICAgKi9cclxuICAgIGluaXQ6IGZ1bmN0aW9uICh0YWJsZSwgb3B0aW9ucykge1xyXG5cclxuICAgICAgICB0aGlzLl9vcHRpb25zID0gJC5leHRlbmQodHJ1ZSwge30sIHRoaXMuX29wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuX3RhYmxlICAgPSB0YWJsZTtcclxuICAgICAgICB0aGlzLl9pZCAgICAgID0gY29yZXVpVGFibGVVdGlscy5oYXNoQ29kZSgpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUg0L/QsNGA0LDQvNC10YLRgNC+0LJcclxuICAgICAqIEByZXR1cm5zIHtvYmplY3R9XHJcbiAgICAgKi9cclxuICAgIGdldE9wdGlvbnM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gJC5leHRlbmQodHJ1ZSwge30sIHRoaXMuX29wdGlvbnMpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUgaWRcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldElkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQo9GB0YLQsNC90L7QstC60LAg0LfQvdCw0YfQtdC90LjRj1xyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHZhbHVlXHJcbiAgICAgKi9cclxuICAgIHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHJcbiAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmICggISBjb3JldWlUYWJsZVV0aWxzLmlzT2JqZWN0KHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgZGF0ZVN0YXJ0ID0gbnVsbDtcclxuICAgICAgICAgICAgbGV0IGRhdGVFbmQgICA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICBpZiAodmFsdWUuaGFzT3duUHJvcGVydHkoJ3N0YXJ0JykgJiZcclxuICAgICAgICAgICAgICAgIHR5cGVvZiB2YWx1ZS5zdGFydCA9PT0gJ3N0cmluZycgJiZcclxuICAgICAgICAgICAgICAgIHZhbHVlLnN0YXJ0Lm1hdGNoKC9eXFxkezR9XFwtXFxkezJ9XFwtXFxkezJ9JC8pID09PSBudWxsICYmXHJcbiAgICAgICAgICAgICAgICBpc05hTihuZXcgRGF0ZSh2YWx1ZS5zdGFydCkpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgZGF0ZVN0YXJ0ID0gdmFsdWUuc3RhcnQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh2YWx1ZS5oYXNPd25Qcm9wZXJ0eSgnZW5kJykgJiZcclxuICAgICAgICAgICAgICAgIHR5cGVvZiB2YWx1ZS5lbmQgPT09ICdzdHJpbmcnICYmXHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5lbmQubWF0Y2goL15cXGR7NH1cXC1cXGR7Mn1cXC1cXGR7Mn0kLykgPT09IG51bGwgJiZcclxuICAgICAgICAgICAgICAgIGlzTmFOKG5ldyBEYXRlKHZhbHVlLmVuZCkpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgZGF0ZUVuZCA9IHZhbHVlLmVuZDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGVTdGFydCA9PT0gbnVsbCAmJiBkYXRlRW5kID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZSA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGRhdGVTdGFydCxcclxuICAgICAgICAgICAgICAgICAgICBlbmQ6IGRhdGVFbmRcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QvtC70YPRh9C10L3QuNC1INC30L3QsNGH0LXQvdC40Y9cclxuICAgICAqIEByZXR1cm5zIHtPYmplY3R8bnVsbH1cclxuICAgICAqL1xyXG4gICAgZ2V0VmFsdWU6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgbGV0IGNvbnRyb2wgICAgPSBjb3JldWlUYWJsZUVsZW1lbnRzLmdldFNlYXJjaENvbnRyb2wodGhpcy5fdGFibGUuZ2V0SWQoKSwgdGhpcy5faWQpO1xyXG4gICAgICAgIGxldCBpbnB1dFN0YXJ0ID0gJCgnaW5wdXQuZGF0ZS1zdGFydCcsIGNvbnRyb2wpO1xyXG4gICAgICAgIGxldCBpbnB1dEVuZCAgID0gJCgnaW5wdXQuZGF0ZS1lbmQnLCBjb250cm9sKTtcclxuXHJcbiAgICAgICAgaWYgKGlucHV0U3RhcnRbMF0gJiYgaW5wdXRFbmRbMF0pIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB2YWx1ZVN0YXJ0ID0gaW5wdXRTdGFydC52YWwoKTtcclxuICAgICAgICAgICAgbGV0IHZhbHVlRW5kICAgPSBpbnB1dEVuZC52YWwoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICh0eXBlb2YgdmFsdWVTdGFydCA9PT0gJ3N0cmluZycgJiYgdmFsdWVTdGFydCAhPT0gJycpIHx8XHJcbiAgICAgICAgICAgICAgICAodHlwZW9mIHZhbHVlRW5kID09PSAnc3RyaW5nJyAmJiB2YWx1ZUVuZCAhPT0gJycpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydDogdmFsdWVTdGFydCxcclxuICAgICAgICAgICAgICAgICAgICBlbmQ6IHZhbHVlRW5kLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDRgdC+0LHRi9GC0LjQuVxyXG4gICAgICogQHJldHVybnMge29iamVjdH1cclxuICAgICAqL1xyXG4gICAgaW5pdEV2ZW50czogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0KTQvtGA0LzQuNGA0L7QstCw0L3QuNC1INC60L7QvdGC0LXQvdGC0LBcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCBvcHRpb25zID0gdGhpcy5nZXRPcHRpb25zKCk7XHJcblxyXG4gICAgICAgIGlmICggISBjb3JldWlUYWJsZVV0aWxzLmlzT2JqZWN0KG9wdGlvbnMuYXR0cikpIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5hdHRyID0ge307XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnd2lkdGgnKSAmJlxyXG4gICAgICAgICAgICBjb3JldWlUYWJsZVV0aWxzLmlzTnVtZXJpYyhvcHRpb25zLndpZHRoKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5hdHRyLmhhc093blByb3BlcnR5KCdzdHlsZScpKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLmF0dHJbJ3N0eWxlJ10gKz0gJzt3aWR0aDonICsgb3B0aW9ucy53aWR0aCArICdweCc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLmF0dHJbJ3N0eWxlJ10gPSAnd2lkdGg6JyArIG9wdGlvbnMud2lkdGggKyAncHgnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAob3B0aW9ucy5hdHRyLmhhc093blByb3BlcnR5KCd0eXBlJykpIHtcclxuICAgICAgICAgICAgZGVsZXRlIG9wdGlvbnMuYXR0ci50eXBlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG9wdGlvbnMuYXR0ci5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSkge1xyXG4gICAgICAgICAgICBkZWxldGUgb3B0aW9ucy5hdHRyLnZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGxldCBmaWVsZCAgICAgPSB0eXBlb2Ygb3B0aW9ucy5maWVsZCA9PT0gJ3N0cmluZycgPyBvcHRpb25zLmZpZWxkIDogJyc7XHJcbiAgICAgICAgbGV0IHN0YXJ0QXR0ciA9IFtdO1xyXG4gICAgICAgIGxldCBzdGFydEVuZCAgPSBbXTtcclxuXHJcblxyXG4gICAgICAgICQuZWFjaChvcHRpb25zLmF0dHIsIGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAoWyduYW1lJywgJ3ZhbHVlJywgJ2NsYXNzJ10uaW5kZXhPZihuYW1lKSA+PSAwIHx8XHJcbiAgICAgICAgICAgICAgICBbJ3N0cmluZycsICdudW1iZXInXS5pbmRleE9mKHR5cGVvZiB2YWx1ZSkgPCAwXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzdGFydEF0dHIucHVzaChuYW1lICsgJz1cIicgKyB2YWx1ZSArICdcIicpO1xyXG4gICAgICAgICAgICBzdGFydEVuZC5wdXNoKG5hbWUgKyAnPVwiJyArIHZhbHVlICsgJ1wiJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChvcHRpb25zLmF0dHIuaGFzT3duUHJvcGVydHkoJ2NsYXNzJykgJiZcclxuICAgICAgICAgICAgWydzdHJpbmcnLCAnbnVtYmVyJ10uaW5kZXhPZih0eXBlb2Ygb3B0aW9ucy5hdHRyLmNsYXNzKSA+PSAwXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHN0YXJ0QXR0ci5wdXNoKCdjbGFzcz1cIicgKyBvcHRpb25zLmF0dHIuY2xhc3MgKyAnIGRhdGUtc3RhcnRcIicpO1xyXG4gICAgICAgICAgICBzdGFydEVuZC5wdXNoKCdjbGFzcz1cIicgKyBvcHRpb25zLmF0dHIuY2xhc3MgKyAnIGRhdGUtZW5kXCInKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzdGFydEF0dHIucHVzaCgnY2xhc3M9XCJkYXRlLXN0YXJ0XCInKTtcclxuICAgICAgICAgICAgc3RhcnRFbmQucHVzaCgnY2xhc3M9XCJkYXRlLWVuZFwiJyk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgaWYgKGZpZWxkKSB7XHJcbiAgICAgICAgICAgIHN0YXJ0QXR0ci5wdXNoKCduYW1lPVwiJyArIGZpZWxkICsgJ1tzdGFydF1cIicpO1xyXG4gICAgICAgICAgICBzdGFydEVuZC5wdXNoKCduYW1lPVwiJyArIGZpZWxkICsgJ1tlbmRdXCInKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXJ0QXR0ci5wdXNoKCd2YWx1ZT1cIicgKyAodGhpcy5fdmFsdWUgPyB0aGlzLl92YWx1ZS5zdGFydCA6ICcnKSArICdcIicpO1xyXG4gICAgICAgIHN0YXJ0RW5kLnB1c2goJ3ZhbHVlPVwiJyArICh0aGlzLl92YWx1ZSA/IHRoaXMuX3ZhbHVlLmVuZCA6ICcnKSArICdcIicpO1xyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIGVqcy5yZW5kZXIoY29yZXVpVGFibGVUcGxbJ3NlYXJjaC9kYXRlX3JhbmdlLmh0bWwnXSwge1xyXG4gICAgICAgICAgICBzdGFydEF0dHI6IHN0YXJ0QXR0ci5sZW5ndGggPiAwID8gKCcgJyArIHN0YXJ0QXR0ci5qb2luKCcgJykpIDogJycsXHJcbiAgICAgICAgICAgIGVuZEF0dHI6IHN0YXJ0RW5kLmxlbmd0aCA+IDAgPyAoJyAnICsgc3RhcnRFbmQuam9pbignICcpKSA6ICcnLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59IiwiXHJcbmltcG9ydCBjb3JldWlUYWJsZSAgICAgICAgIGZyb20gXCIuLi9jb3JldWkudGFibGVcIjtcclxuaW1wb3J0IGNvcmV1aVRhYmxlVHBsICAgICAgZnJvbSBcIi4uL2NvcmV1aS50YWJsZS50ZW1wbGF0ZXNcIjtcclxuaW1wb3J0IGNvcmV1aVRhYmxlVXRpbHMgICAgZnJvbSBcIi4uL2NvcmV1aS50YWJsZS51dGlsc1wiO1xyXG5pbXBvcnQgY29yZXVpVGFibGVFbGVtZW50cyBmcm9tIFwiLi4vY29yZXVpLnRhYmxlLmVsZW1lbnRzXCI7XHJcblxyXG5jb3JldWlUYWJsZS5zZWFyY2guZGF0ZXRpbWVfcmFuZ2UgPSB7XHJcblxyXG4gICAgX2lkOiBudWxsLFxyXG4gICAgX3RhYmxlOiBudWxsLFxyXG4gICAgX3ZhbHVlOiBudWxsLFxyXG4gICAgX29wdGlvbnM6IHtcclxuICAgICAgICB0eXBlOiAnZGF0ZXRpbWVfcmFuZ2UnLFxyXG4gICAgICAgIGZpZWxkOiBudWxsLFxyXG4gICAgICAgIGxhYmVsOiBudWxsLFxyXG4gICAgICAgIHdpZHRoOiAyMDAsXHJcbiAgICAgICAgYXR0cjoge1xyXG4gICAgICAgICAgICBjbGFzczogXCJmb3JtLWNvbnRyb2wgZC1pbmxpbmUtYmxvY2tcIixcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPXHJcbiAgICAgKiBAcGFyYW0ge0NvcmVVSS50YWJsZS5pbnN0YW5jZX0gdGFibGVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICBvcHRpb25zXHJcbiAgICAgKi9cclxuICAgIGluaXQ6IGZ1bmN0aW9uICh0YWJsZSwgb3B0aW9ucykge1xyXG5cclxuICAgICAgICB0aGlzLl9vcHRpb25zID0gJC5leHRlbmQodHJ1ZSwge30sIHRoaXMuX29wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuX3RhYmxlICAgPSB0YWJsZTtcclxuICAgICAgICB0aGlzLl9pZCAgICAgID0gY29yZXVpVGFibGVVdGlscy5oYXNoQ29kZSgpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUg0L/QsNGA0LDQvNC10YLRgNC+0LJcclxuICAgICAqIEByZXR1cm5zIHtvYmplY3R9XHJcbiAgICAgKi9cclxuICAgIGdldE9wdGlvbnM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gJC5leHRlbmQodHJ1ZSwge30sIHRoaXMuX29wdGlvbnMpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUgaWRcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldElkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQo9GB0YLQsNC90L7QstC60LAg0LfQvdCw0YfQtdC90LjRj1xyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHZhbHVlXHJcbiAgICAgKi9cclxuICAgIHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHJcbiAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmICggISBjb3JldWlUYWJsZVV0aWxzLmlzT2JqZWN0KHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgZGF0ZVN0YXJ0ID0gbnVsbDtcclxuICAgICAgICAgICAgbGV0IGRhdGVFbmQgICA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICBpZiAodmFsdWUuaGFzT3duUHJvcGVydHkoJ3N0YXJ0JykgJiZcclxuICAgICAgICAgICAgICAgIHR5cGVvZiB2YWx1ZS5zdGFydCA9PT0gJ3N0cmluZycgJiZcclxuICAgICAgICAgICAgICAgIHZhbHVlLnN0YXJ0Lm1hdGNoKC9eXFxkezR9XFwtXFxkezJ9XFwtXFxkezJ9IFxcZHsyfTpcXGR7Mn06XFxkezJ9JC8pID09PSBudWxsICYmXHJcbiAgICAgICAgICAgICAgICBpc05hTihuZXcgRGF0ZSh2YWx1ZS5zdGFydCkpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgZGF0ZVN0YXJ0ID0gdmFsdWUuc3RhcnQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh2YWx1ZS5oYXNPd25Qcm9wZXJ0eSgnZW5kJykgJiZcclxuICAgICAgICAgICAgICAgIHR5cGVvZiB2YWx1ZS5lbmQgPT09ICdzdHJpbmcnICYmXHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5lbmQubWF0Y2goL15cXGR7NH1cXC1cXGR7Mn1cXC1cXGR7Mn0gXFxkezJ9OlxcZHsyfTpcXGR7Mn0kLykgPT09IG51bGwgJiZcclxuICAgICAgICAgICAgICAgIGlzTmFOKG5ldyBEYXRlKHZhbHVlLmVuZCkpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgZGF0ZUVuZCA9IHZhbHVlLmVuZDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGVTdGFydCA9PT0gbnVsbCAmJiBkYXRlRW5kID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZSA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGRhdGVTdGFydCxcclxuICAgICAgICAgICAgICAgICAgICBlbmQ6IGRhdGVFbmRcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QvtC70YPRh9C10L3QuNC1INC30L3QsNGH0LXQvdC40Y9cclxuICAgICAqIEByZXR1cm5zIHtPYmplY3R8bnVsbH1cclxuICAgICAqL1xyXG4gICAgZ2V0VmFsdWU6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgbGV0IGNvbnRyb2wgICAgPSBjb3JldWlUYWJsZUVsZW1lbnRzLmdldFNlYXJjaENvbnRyb2wodGhpcy5fdGFibGUuZ2V0SWQoKSwgdGhpcy5faWQpO1xyXG4gICAgICAgIGxldCBpbnB1dFN0YXJ0ID0gJCgnaW5wdXQuZGF0ZS1zdGFydCcsIGNvbnRyb2wpO1xyXG4gICAgICAgIGxldCBpbnB1dEVuZCAgID0gJCgnaW5wdXQuZGF0ZS1lbmQnLCBjb250cm9sKTtcclxuXHJcbiAgICAgICAgaWYgKGlucHV0U3RhcnRbMF0gJiYgaW5wdXRFbmRbMF0pIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB2YWx1ZVN0YXJ0ID0gaW5wdXRTdGFydC52YWwoKTtcclxuICAgICAgICAgICAgbGV0IHZhbHVlRW5kICAgPSBpbnB1dEVuZC52YWwoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICh0eXBlb2YgdmFsdWVTdGFydCA9PT0gJ3N0cmluZycgJiYgdmFsdWVTdGFydCAhPT0gJycpIHx8XHJcbiAgICAgICAgICAgICAgICAodHlwZW9mIHZhbHVlRW5kID09PSAnc3RyaW5nJyAmJiB2YWx1ZUVuZCAhPT0gJycpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydDogdmFsdWVTdGFydCxcclxuICAgICAgICAgICAgICAgICAgICBlbmQ6IHZhbHVlRW5kLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGB0L7QsdGL0YLQuNC5XHJcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fVxyXG4gICAgICovXHJcbiAgICBpbml0RXZlbnRzOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQpNC+0YDQvNC40YDQvtCy0LDQvdC40LUg0LrQvtC90YLQtdC90YLQsFxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgaWYgKCAhIGNvcmV1aVRhYmxlVXRpbHMuaXNPYmplY3QodGhpcy5fb3B0aW9ucy5hdHRyKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLmF0dHIgPSB7fTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLmhhc093blByb3BlcnR5KCd3aWR0aCcpICYmXHJcbiAgICAgICAgICAgIGNvcmV1aVRhYmxlVXRpbHMuaXNOdW1lcmljKHRoaXMuX29wdGlvbnMud2lkdGgpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zLmF0dHIuaGFzT3duUHJvcGVydHkoJ3N0eWxlJykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuYXR0clsnc3R5bGUnXSArPSAnO3dpZHRoOicgKyB0aGlzLl9vcHRpb25zLndpZHRoICsgJ3B4JztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuYXR0clsnc3R5bGUnXSA9ICd3aWR0aDonICsgdGhpcy5fb3B0aW9ucy53aWR0aCArICdweCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLmF0dHIuaGFzT3duUHJvcGVydHkoJ3R5cGUnKSkge1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fb3B0aW9ucy5hdHRyLnR5cGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5hdHRyLmhhc093blByb3BlcnR5KCd2YWx1ZScpKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9vcHRpb25zLmF0dHIudmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgbGV0IGZpZWxkICAgICA9IHR5cGVvZiB0aGlzLl9vcHRpb25zLmZpZWxkID09PSAnc3RyaW5nJyA/IHRoaXMuX29wdGlvbnMuZmllbGQgOiAnJztcclxuICAgICAgICBsZXQgc3RhcnRBdHRyID0gW107XHJcbiAgICAgICAgbGV0IHN0YXJ0RW5kICA9IFtdO1xyXG5cclxuXHJcbiAgICAgICAgJC5lYWNoKHRoaXMuX29wdGlvbnMuYXR0ciwgZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChbJ25hbWUnLCAndmFsdWUnLCAnY2xhc3MnXS5pbmRleE9mKG5hbWUpID49IDAgfHxcclxuICAgICAgICAgICAgICAgIFsnc3RyaW5nJywgJ251bWJlciddLmluZGV4T2YodHlwZW9mIHZhbHVlKSA8IDBcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHN0YXJ0QXR0ci5wdXNoKG5hbWUgKyAnPVwiJyArIHZhbHVlICsgJ1wiJyk7XHJcbiAgICAgICAgICAgIHN0YXJ0RW5kLnB1c2gobmFtZSArICc9XCInICsgdmFsdWUgKyAnXCInKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuYXR0ci5oYXNPd25Qcm9wZXJ0eSgnY2xhc3MnKSAmJlxyXG4gICAgICAgICAgICBbJ3N0cmluZycsICdudW1iZXInXS5pbmRleE9mKHR5cGVvZiB0aGlzLl9vcHRpb25zLmF0dHIuY2xhc3MpID49IDBcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgc3RhcnRBdHRyLnB1c2goJ2NsYXNzPVwiJyArIHRoaXMuX29wdGlvbnMuYXR0ci5jbGFzcyArICcgZGF0ZS1zdGFydFwiJyk7XHJcbiAgICAgICAgICAgIHN0YXJ0RW5kLnB1c2goJ2NsYXNzPVwiJyArIHRoaXMuX29wdGlvbnMuYXR0ci5jbGFzcyArICcgZGF0ZS1lbmRcIicpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN0YXJ0QXR0ci5wdXNoKCdjbGFzcz1cImRhdGUtc3RhcnRcIicpO1xyXG4gICAgICAgICAgICBzdGFydEVuZC5wdXNoKCdjbGFzcz1cImRhdGUtZW5kXCInKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZiAoZmllbGQpIHtcclxuICAgICAgICAgICAgc3RhcnRBdHRyLnB1c2goJ25hbWU9XCInICsgZmllbGQgKyAnW3N0YXJ0XVwiJyk7XHJcbiAgICAgICAgICAgIHN0YXJ0RW5kLnB1c2goJ25hbWU9XCInICsgZmllbGQgKyAnW2VuZF1cIicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhcnRBdHRyLnB1c2goJ3ZhbHVlPVwiJyArICh0aGlzLl92YWx1ZSA/IHRoaXMuX3ZhbHVlLnN0YXJ0IDogJycpICsgJ1wiJyk7XHJcbiAgICAgICAgc3RhcnRFbmQucHVzaCgndmFsdWU9XCInICsgKHRoaXMuX3ZhbHVlID8gdGhpcy5fdmFsdWUuZW5kIDogJycpICsgJ1wiJyk7XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gZWpzLnJlbmRlcihjb3JldWlUYWJsZVRwbFsnc2VhcmNoL2RhdGV0aW1lX3JhbmdlLmh0bWwnXSwge1xyXG4gICAgICAgICAgICBzdGFydEF0dHI6IHN0YXJ0QXR0ci5sZW5ndGggPiAwID8gKCcgJyArIHN0YXJ0QXR0ci5qb2luKCcgJykpIDogJycsXHJcbiAgICAgICAgICAgIGVuZEF0dHI6IHN0YXJ0RW5kLmxlbmd0aCA+IDAgPyAoJyAnICsgc3RhcnRFbmQuam9pbignICcpKSA6ICcnLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59IiwiXHJcbmltcG9ydCBjb3JldWlUYWJsZSAgICAgICAgIGZyb20gXCIuLi9jb3JldWkudGFibGVcIjtcclxuaW1wb3J0IGNvcmV1aVRhYmxlVHBsICAgICAgZnJvbSBcIi4uL2NvcmV1aS50YWJsZS50ZW1wbGF0ZXNcIjtcclxuaW1wb3J0IGNvcmV1aVRhYmxlVXRpbHMgICAgZnJvbSBcIi4uL2NvcmV1aS50YWJsZS51dGlsc1wiO1xyXG5pbXBvcnQgY29yZXVpVGFibGVFbGVtZW50cyBmcm9tIFwiLi4vY29yZXVpLnRhYmxlLmVsZW1lbnRzXCI7XHJcblxyXG5jb3JldWlUYWJsZS5zZWFyY2guY2hlY2tib3ggPSB7XHJcblxyXG4gICAgX2lkOiBudWxsLFxyXG4gICAgX3RhYmxlOiBudWxsLFxyXG4gICAgX3ZhbHVlOiBudWxsLFxyXG4gICAgX29wdGlvbnM6IHtcclxuICAgICAgICB0eXBlOiAnY2hlY2tib3gnLFxyXG4gICAgICAgIGZpZWxkOiBudWxsLFxyXG4gICAgICAgIGxhYmVsOiBudWxsLFxyXG4gICAgICAgIG9wdGlvbnM6IFtdXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPXHJcbiAgICAgKiBAcGFyYW0ge0NvcmVVSS50YWJsZS5pbnN0YW5jZX0gdGFibGVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICBvcHRpb25zXHJcbiAgICAgKi9cclxuICAgIGluaXQ6IGZ1bmN0aW9uICh0YWJsZSwgb3B0aW9ucykge1xyXG5cclxuICAgICAgICB0aGlzLl9vcHRpb25zID0gJC5leHRlbmQodHJ1ZSwge30sIHRoaXMuX29wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuX3RhYmxlICAgPSB0YWJsZTtcclxuICAgICAgICB0aGlzLl9pZCAgICAgID0gY29yZXVpVGFibGVVdGlscy5oYXNoQ29kZSgpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUg0L/QsNGA0LDQvNC10YLRgNC+0LJcclxuICAgICAqIEByZXR1cm5zIHtvYmplY3R9XHJcbiAgICAgKi9cclxuICAgIGdldE9wdGlvbnM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gJC5leHRlbmQodHJ1ZSwge30sIHRoaXMuX29wdGlvbnMpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUgaWRcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldElkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQo9GB0YLQsNC90L7QstC60LAg0LfQvdCw0YfQtdC90LjRj1xyXG4gICAgICogQHBhcmFtIHtBcnJheXxudWxsfSB2YWx1ZVxyXG4gICAgICovXHJcbiAgICBzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblxyXG4gICAgICAgIGlmICggISBBcnJheS5pc0FycmF5KHZhbHVlKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaXRlbXMgPSBbXTtcclxuXHJcbiAgICAgICAgJC5lYWNoKHZhbHVlLCBmdW5jdGlvbiAoa2V5LCBpdGVtKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnICYmIHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaXRlbXMucHVzaChpdGVtKTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gaXRlbXNcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QvtC70YPRh9C10L3QuNC1INC30L3QsNGH0LXQvdC40Y9cclxuICAgICAqIEByZXR1cm5zIHtBcnJheXxudWxsfVxyXG4gICAgICovXHJcbiAgICBnZXRWYWx1ZTogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBsZXQgY29udHJvbCA9IGNvcmV1aVRhYmxlRWxlbWVudHMuZ2V0U2VhcmNoQ29udHJvbCh0aGlzLl90YWJsZS5nZXRJZCgpLCB0aGlzLl9pZCk7XHJcblxyXG4gICAgICAgIGlmIChjb250cm9sWzBdKSB7XHJcbiAgICAgICAgICAgIGxldCBpbnB1dHMgPSAkKCdpbnB1dDpjaGVja2VkJywgY29udHJvbCk7XHJcbiAgICAgICAgICAgIGxldCBpdGVtcyAgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICQuZWFjaChpbnB1dHMsIGZ1bmN0aW9uIChrZXksIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSAkKGlucHV0KS5hdHRyKCd2YWx1ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChbJ3N0cmluZycsICdudW1iZXInXS5pbmRleE9mKHR5cGVvZiB2YWx1ZSkgPj0gMCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlICE9PSAnJ1xyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXMucHVzaCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW1zLmxlbmd0aCA+IDAgPyBpdGVtcyA6IG51bGw7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDRgdC+0LHRi9GC0LjQuVxyXG4gICAgICogQHJldHVybnMge29iamVjdH1cclxuICAgICAqL1xyXG4gICAgaW5pdEV2ZW50czogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0KTQvtGA0LzQuNGA0L7QstCw0L3QuNC1INC60L7QvdGC0LXQvdGC0LBcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCB0aGF0ICAgID0gdGhpcztcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IFtdO1xyXG5cclxuICAgICAgICAkLmVhY2godGhpcy5fb3B0aW9ucy5vcHRpb25zLCBmdW5jdGlvbiAoa2V5LCBvcHRpb24pIHtcclxuICAgICAgICAgICAgaWYgKCAhIGNvcmV1aVRhYmxlVXRpbHMuaXNPYmplY3Qob3B0aW9uKSB8fFxyXG4gICAgICAgICAgICAgICAgISBvcHRpb24uaGFzT3duUHJvcGVydHkoJ3ZhbHVlJykgfHxcclxuICAgICAgICAgICAgICAgIFsnc3RyaW5nJywgJ251bWVyaWMnXS5pbmRleE9mKHR5cGVvZiBvcHRpb24udmFsdWUpID09PSAtMVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGNoZWNrZWQgPSBBcnJheS5pc0FycmF5KHRoYXQuX3ZhbHVlKSA/IHRoYXQuX3ZhbHVlLmluZGV4T2Yob3B0aW9uLnZhbHVlKSA+PSAwIDogZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCB0ZXh0ICAgID0gb3B0aW9uLmhhc093blByb3BlcnR5KCd0ZXh0JylcclxuICAgICAgICAgICAgICAgID8gb3B0aW9uLnRleHRcclxuICAgICAgICAgICAgICAgIDogb3B0aW9uLnZhbHVlO1xyXG5cclxuICAgICAgICAgICAgb3B0aW9ucy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHRleHQ6ICAgIHRleHQsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogICBvcHRpb24udmFsdWUsXHJcbiAgICAgICAgICAgICAgICBjaGVja2VkOiBjaGVja2VkLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVqcy5yZW5kZXIoY29yZXVpVGFibGVUcGxbJ3NlYXJjaC9jaGVja2JveC5odG1sJ10sIHtcclxuICAgICAgICAgICAgb3B0aW9uczogb3B0aW9ucyxcclxuICAgICAgICAgICAgZmllbGQ6IHR5cGVvZiB0aGlzLl9vcHRpb25zLmZpZWxkID09PSAnc3RyaW5nJyA/IHRoaXMuX29wdGlvbnMuZmllbGQgOiAnJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59IiwiXHJcbmltcG9ydCBjb3JldWlUYWJsZSAgICAgICAgIGZyb20gXCIuLi9jb3JldWkudGFibGVcIjtcclxuaW1wb3J0IGNvcmV1aVRhYmxlVHBsICAgICAgZnJvbSBcIi4uL2NvcmV1aS50YWJsZS50ZW1wbGF0ZXNcIjtcclxuaW1wb3J0IGNvcmV1aVRhYmxlVXRpbHMgICAgZnJvbSBcIi4uL2NvcmV1aS50YWJsZS51dGlsc1wiO1xyXG5pbXBvcnQgY29yZXVpVGFibGVFbGVtZW50cyBmcm9tIFwiLi4vY29yZXVpLnRhYmxlLmVsZW1lbnRzXCI7XHJcblxyXG5jb3JldWlUYWJsZS5zZWFyY2gucmFkaW8gPSB7XHJcblxyXG4gICAgX2lkOiBudWxsLFxyXG4gICAgX3RhYmxlOiBudWxsLFxyXG4gICAgX3ZhbHVlOiBudWxsLFxyXG4gICAgX29wdGlvbnM6IHtcclxuICAgICAgICB0eXBlOiAncmFkaW8nLFxyXG4gICAgICAgIGZpZWxkOiBudWxsLFxyXG4gICAgICAgIGxhYmVsOiBudWxsLFxyXG4gICAgICAgIG9wdGlvbnM6IFtdLFxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRj1xyXG4gICAgICogQHBhcmFtIHtDb3JlVUkudGFibGUuaW5zdGFuY2V9IHRhYmxlXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgb3B0aW9uc1xyXG4gICAgICovXHJcbiAgICBpbml0OiBmdW5jdGlvbiAodGFibGUsIG9wdGlvbnMpIHtcclxuXHJcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9ICQuZXh0ZW5kKHRydWUsIHt9LCB0aGlzLl9vcHRpb25zLCBvcHRpb25zKTtcclxuICAgICAgICB0aGlzLl90YWJsZSAgID0gdGFibGU7XHJcbiAgICAgICAgdGhpcy5faWQgICAgICA9IGNvcmV1aVRhYmxlVXRpbHMuaGFzaENvZGUoKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QvtC70YPRh9C10L3QuNC1INC/0LDRgNCw0LzQtdGC0YDQvtCyXHJcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fVxyXG4gICAgICovXHJcbiAgICBnZXRPcHRpb25zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICQuZXh0ZW5kKHRydWUsIHt9LCB0aGlzLl9vcHRpb25zKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QvtC70YPRh9C10L3QuNC1IGlkXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXRJZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0KPRgdGC0LDQvdC+0LLQutCwINC30L3QsNGH0LXQvdC40Y9cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxyXG4gICAgICovXHJcbiAgICBzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnICYmIHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgcmV0dXJuJydcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWVcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QvtC70YPRh9C10L3QuNC1INC30L3QsNGH0LXQvdC40Y9cclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd8bnVsbH1cclxuICAgICAqL1xyXG4gICAgZ2V0VmFsdWU6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgbGV0IGNvbnRyb2wgPSBjb3JldWlUYWJsZUVsZW1lbnRzLmdldFNlYXJjaENvbnRyb2wodGhpcy5fdGFibGUuZ2V0SWQoKSwgdGhpcy5faWQpO1xyXG4gICAgICAgIGxldCBpbnB1dCAgID0gJCgnaW5wdXQ6Y2hlY2tlZCcsIGNvbnRyb2wpO1xyXG5cclxuICAgICAgICBpZiAoaW5wdXRbMF0pIHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gaW5wdXQudmFsKCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgPT09ICcnXHJcbiAgICAgICAgICAgICAgICA/IG51bGxcclxuICAgICAgICAgICAgICAgIDogdmFsdWVcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGB0L7QsdGL0YLQuNC5XHJcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fVxyXG4gICAgICovXHJcbiAgICBpbml0RXZlbnRzOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQpNC+0YDQvNC40YDQvtCy0LDQvdC40LUg0LrQvtC90YLQtdC90YLQsFxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgbGV0IHRoYXQgICAgICAgPSB0aGlzO1xyXG4gICAgICAgIGxldCBjaGVja2VkQWxsID0gdHJ1ZTtcclxuICAgICAgICBsZXQgb3B0aW9ucyAgICA9IFtdO1xyXG5cclxuICAgICAgICAkLmVhY2godGhpcy5fb3B0aW9ucy5vcHRpb25zLCBmdW5jdGlvbiAoa2V5LCBvcHRpb24pIHtcclxuICAgICAgICAgICAgaWYgKCAhIGNvcmV1aVRhYmxlVXRpbHMuaXNPYmplY3Qob3B0aW9uKSB8fFxyXG4gICAgICAgICAgICAgICAgICEgb3B0aW9uLmhhc093blByb3BlcnR5KCd2YWx1ZScpIHx8XHJcbiAgICAgICAgICAgICAgICBbJ3N0cmluZycsICdudW1lcmljJ10uaW5kZXhPZih0eXBlb2Ygb3B0aW9uLnZhbHVlKSA9PT0gLTFcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBjaGVja2VkID0gb3B0aW9uLnZhbHVlID09IHRoYXQuX3ZhbHVlO1xyXG4gICAgICAgICAgICBsZXQgdGV4dCAgICA9IG9wdGlvbi5oYXNPd25Qcm9wZXJ0eSgndGV4dCcpXHJcbiAgICAgICAgICAgICAgICA/IG9wdGlvbi50ZXh0XHJcbiAgICAgICAgICAgICAgICA6IG9wdGlvbi52YWx1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICBjaGVja2VkQWxsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG9wdGlvbnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAgICB0ZXh0LFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6ICAgb3B0aW9uLnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgY2hlY2tlZDogY2hlY2tlZCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBlanMucmVuZGVyKGNvcmV1aVRhYmxlVHBsWydzZWFyY2gvcmFkaW8uaHRtbCddLCB7XHJcbiAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnMsXHJcbiAgICAgICAgICAgIGNoZWNrZWRBbGw6IGNoZWNrZWRBbGwsXHJcbiAgICAgICAgICAgIGZpZWxkOiB0eXBlb2YgdGhpcy5fb3B0aW9ucy5maWVsZCA9PT0gJ3N0cmluZycgPyB0aGlzLl9vcHRpb25zLmZpZWxkIDogJycsXHJcbiAgICAgICAgICAgIGxhbmc6IHRoaXMuX3RhYmxlLmdldExhbmcoKVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59IiwiXHJcbmltcG9ydCBjb3JldWlUYWJsZSAgICAgICAgIGZyb20gXCIuLi9jb3JldWkudGFibGVcIjtcclxuaW1wb3J0IGNvcmV1aVRhYmxlVHBsICAgICAgZnJvbSBcIi4uL2NvcmV1aS50YWJsZS50ZW1wbGF0ZXNcIjtcclxuaW1wb3J0IGNvcmV1aVRhYmxlVXRpbHMgICAgZnJvbSBcIi4uL2NvcmV1aS50YWJsZS51dGlsc1wiO1xyXG5pbXBvcnQgQ29yZXVpVGFibGVVdGlscyAgICBmcm9tIFwiLi4vY29yZXVpLnRhYmxlLnV0aWxzXCI7XHJcbmltcG9ydCBjb3JldWlUYWJsZUVsZW1lbnRzIGZyb20gXCIuLi9jb3JldWkudGFibGUuZWxlbWVudHNcIjtcclxuXHJcbmNvcmV1aVRhYmxlLnNlYXJjaC5zZWxlY3QgPSB7XHJcblxyXG4gICAgX2lkOiBudWxsLFxyXG4gICAgX3RhYmxlOiBudWxsLFxyXG4gICAgX3ZhbHVlOiBudWxsLFxyXG4gICAgX29wdGlvbnM6IHtcclxuICAgICAgICB0eXBlOiAnc2VsZWN0JyxcclxuICAgICAgICBmaWVsZDogbnVsbCxcclxuICAgICAgICBsYWJlbDogbnVsbCxcclxuICAgICAgICB3aWR0aDogbnVsbCxcclxuICAgICAgICBhdHRyOiB7XHJcbiAgICAgICAgICAgIGNsYXNzOiAnZm9ybS1zZWxlY3QgZC1pbmxpbmUtYmxvY2snXHJcbiAgICAgICAgfSxcclxuICAgICAgICBvcHRpb25zOiBbXVxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRj1xyXG4gICAgICogQHBhcmFtIHtDb3JlVUkudGFibGUuaW5zdGFuY2V9IHRhYmxlXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgb3B0aW9uc1xyXG4gICAgICovXHJcbiAgICBpbml0OiBmdW5jdGlvbiAodGFibGUsIG9wdGlvbnMpIHtcclxuXHJcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9ICQuZXh0ZW5kKHRydWUsIHt9LCB0aGlzLl9vcHRpb25zLCBvcHRpb25zKTtcclxuICAgICAgICB0aGlzLl90YWJsZSAgID0gdGFibGU7XHJcbiAgICAgICAgdGhpcy5faWQgICAgICA9IGNvcmV1aVRhYmxlVXRpbHMuaGFzaENvZGUoKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QvtC70YPRh9C10L3QuNC1INC/0LDRgNCw0LzQtdGC0YDQvtCyXHJcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fVxyXG4gICAgICovXHJcbiAgICBnZXRPcHRpb25zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICQuZXh0ZW5kKHRydWUsIHt9LCB0aGlzLl9vcHRpb25zKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QvtC70YPRh9C10L3QuNC1IGlkXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXRJZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0KPRgdGC0LDQvdC+0LLQutCwINC30L3QsNGH0LXQvdC40Y9cclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlXHJcbiAgICAgKi9cclxuICAgIHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHJcbiAgICAgICAgaWYgKFsnc3RyaW5nJywgJ251bWJlcicsICdvYmplY3QnXS5pbmRleE9mKHR5cGVvZiB2YWx1ZSkgPCAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1zID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgJC5lYWNoKHZhbHVlLCBmdW5jdGlvbiAoa2V5LCBpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycgJiYgdHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBpdGVtcztcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZSA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSDQt9C90LDRh9C10L3QuNGPXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl8bnVsbH1cclxuICAgICAqL1xyXG4gICAgZ2V0VmFsdWU6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgbGV0IGNvbnRyb2wgPSBjb3JldWlUYWJsZUVsZW1lbnRzLmdldFNlYXJjaENvbnRyb2wodGhpcy5fdGFibGUuZ2V0SWQoKSwgdGhpcy5faWQpO1xyXG5cclxuICAgICAgICBpZiAoY29udHJvbFswXSkge1xyXG4gICAgICAgICAgICBsZXQgb3B0aW9ucyA9ICQoJ3NlbGVjdCBvcHRpb246Y2hlY2tlZCcsIGNvbnRyb2wpO1xyXG4gICAgICAgICAgICBsZXQgaXRlbXMgICA9IFtdO1xyXG5cclxuICAgICAgICAgICAgJC5lYWNoKG9wdGlvbnMsIGZ1bmN0aW9uIChrZXksIG9wdGlvbikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gJChvcHRpb24pLmF0dHIoJ3ZhbHVlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKFsnc3RyaW5nJywgJ251bWJlciddLmluZGV4T2YodHlwZW9mIHZhbHVlKSA+PSAwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgIT09ICcnXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gaXRlbXMubGVuZ3RoID4gMCA/IGl0ZW1zIDogbnVsbDtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGB0L7QsdGL0YLQuNC5XHJcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fVxyXG4gICAgICovXHJcbiAgICBpbml0RXZlbnRzOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQpNC+0YDQvNC40YDQvtCy0LDQvdC40LUg0LrQvtC90YLQtdC90YLQsFxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgbGV0IHRoYXQgICAgICAgICAgPSB0aGlzO1xyXG4gICAgICAgIGxldCBvcHRpb25zICAgICAgID0gdGhpcy5nZXRPcHRpb25zKCk7XHJcbiAgICAgICAgbGV0IHNlbGVjdE9wdGlvbnMgPSBbXTtcclxuICAgICAgICBsZXQgYXR0cmlidXRlcyAgICA9IFtdO1xyXG5cclxuICAgICAgICBpZiAoICEgb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnYXR0cicpIHx8XHJcbiAgICAgICAgICAgICAhIGNvcmV1aVRhYmxlVXRpbHMuaXNPYmplY3Qob3B0aW9ucy5hdHRyKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBvcHRpb25zLmF0dHIgPSB7fTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChvcHRpb25zLmZpZWxkKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuYXR0ci5uYW1lID0gdGhpcy5fb3B0aW9ucy5maWVsZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChvcHRpb25zLndpZHRoKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuYXR0ciA9IGNvcmV1aVRhYmxlVXRpbHMubWVyZ2VBdHRyKFxyXG4gICAgICAgICAgICAgICAgeyBzdHlsZTogJ3dpZHRoOicgKyBvcHRpb25zLndpZHRoICsgJ3B4JyB9LFxyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5hdHRyXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnb3B0aW9ucycpICYmXHJcbiAgICAgICAgICAgIHR5cGVvZiBvcHRpb25zLm9wdGlvbnMgPT09ICdvYmplY3QnICYmXHJcbiAgICAgICAgICAgIG9wdGlvbnMub3B0aW9ucyAhPT0gbnVsbFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICAkLmVhY2gob3B0aW9ucy5vcHRpb25zLCBmdW5jdGlvbiAoa2V5LCBvcHRpb24pIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIG9wdGlvbiA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RPcHRpb25zLnB1c2godGhhdC5fYnVpbGRPcHRpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnb3B0aW9uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGtleSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogb3B0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoQ29yZXVpVGFibGVVdGlscy5pc09iamVjdChvcHRpb24pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHR5cGUgPSBvcHRpb24uaGFzT3duUHJvcGVydHkoJ3R5cGUnKSAmJiB0eXBlb2Ygb3B0aW9uLnR5cGUgPT09ICdzdHJpbmcnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gb3B0aW9uLnR5cGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiAnb3B0aW9uJztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdncm91cCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlbmRlckF0dHIgICA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ3JvdXBBdHRyICAgID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBncm91cE9wdGlvbnMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb24uaGFzT3duUHJvcGVydHkoJ2F0dHInKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29yZXVpVGFibGVVdGlscy5pc09iamVjdChvcHRpb24uYXR0cilcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cEF0dHIgPSBvcHRpb24uYXR0cjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5oYXNPd25Qcm9wZXJ0eSgnbGFiZWwnKSAmJiBbJ3N0cmluZycsICdudW1iZXInXS5pbmRleE9mKHR5cGVvZihvcHRpb24ubGFiZWwpKSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cEF0dHIubGFiZWwgPSBvcHRpb24ubGFiZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChncm91cEF0dHIsIGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyQXR0ci5wdXNoKG5hbWUgKyAnPVwiJyArIHZhbHVlICsgJ1wiJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob3B0aW9uLm9wdGlvbnMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2gob3B0aW9uLm9wdGlvbnMsIGZ1bmN0aW9uIChrZXksIGdyb3VwT3B0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBPcHRpb25zLnB1c2godGhhdC5fYnVpbGRPcHRpb24oZ3JvdXBPcHRpb24pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RPcHRpb25zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2dyb3VwJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHI6IHJlbmRlckF0dHIubGVuZ3RoID4gMCA/ICgnICcgKyByZW5kZXJBdHRyLmpvaW4oJyAnKSkgOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IGdyb3VwT3B0aW9ucyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMucHVzaCh0aGF0Ll9idWlsZE9wdGlvbihvcHRpb24pKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJC5lYWNoKG9wdGlvbnMuYXR0ciwgZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMucHVzaChuYW1lICsgJz1cIicgKyB2YWx1ZSArICdcIicpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZWpzLnJlbmRlcihjb3JldWlUYWJsZVRwbFsnc2VhcmNoL3NlbGVjdC5odG1sJ10sIHtcclxuICAgICAgICAgICAgZmllbGQ6IG9wdGlvbnMsXHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLl92YWx1ZSxcclxuICAgICAgICAgICAgYXR0cjogYXR0cmlidXRlcy5sZW5ndGggPiAwID8gKCcgJyArIGF0dHJpYnV0ZXMuam9pbignICcpKSA6ICcnLFxyXG4gICAgICAgICAgICBvcHRpb25zOiBzZWxlY3RPcHRpb25zXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCh0LHQvtGA0LrQsCDQvtC/0YbQuNC4XHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uXHJcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBfYnVpbGRPcHRpb246IGZ1bmN0aW9uIChvcHRpb24pIHtcclxuXHJcbiAgICAgICAgbGV0IG9wdGlvbkF0dHIgPSBbXTtcclxuICAgICAgICBsZXQgb3B0aW9uVGV4dCA9IG9wdGlvbi5oYXNPd25Qcm9wZXJ0eSgndGV4dCcpICYmIFsnc3RyaW5nJywgJ251bWJlciddLmluZGV4T2YodHlwZW9mKG9wdGlvbi50ZXh0KSkgPj0gMFxyXG4gICAgICAgICAgICA/IG9wdGlvbi50ZXh0XHJcbiAgICAgICAgICAgIDogJyc7XHJcblxyXG4gICAgICAgICQuZWFjaChvcHRpb24sIGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAobmFtZSAhPT0gJ3RleHQnKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25BdHRyLnB1c2gobmFtZSArICc9XCInICsgdmFsdWUgKyAnXCInKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5fdmFsdWUpKSB7XHJcbiAgICAgICAgICAgICQuZWFjaCh0aGlzLl92YWx1ZSwgZnVuY3Rpb24gKGtleSwgaXRlbVZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbVZhbHVlID09IG9wdGlvbi52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbkF0dHIucHVzaCgnc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl92YWx1ZSA9PSBvcHRpb24udmFsdWUpIHtcclxuICAgICAgICAgICAgb3B0aW9uQXR0ci5wdXNoKCdzZWxlY3RlZD1cInNlbGVjdGVkXCInKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdvcHRpb24nLFxyXG4gICAgICAgICAgICB0ZXh0OiBvcHRpb25UZXh0LFxyXG4gICAgICAgICAgICBhdHRyOiBvcHRpb25BdHRyLmxlbmd0aCA+IDAgPyAoJyAnICsgb3B0aW9uQXR0ci5qb2luKCcgJykpIDogJydcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59IiwiXHJcbmltcG9ydCBjb3JldWlUYWJsZSBmcm9tIFwiLi4vY29yZXVpLnRhYmxlXCI7XHJcblxyXG5jb3JldWlUYWJsZS5jb2x1bW5zLmRhdGUgPSB7XHJcblxyXG4gICAgX3RhYmxlOiBudWxsLFxyXG4gICAgX29wdGlvbnM6IHtcclxuICAgICAgICB0eXBlOiAnZGF0ZScsXHJcbiAgICAgICAgZmllbGQ6IG51bGwsXHJcbiAgICAgICAgbGFiZWw6IG51bGwsXHJcbiAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICB3aWR0aDogbnVsbCxcclxuICAgICAgICBmb3JtYXQ6ICdERC5NTS5ZWVlZJyxcclxuICAgICAgICBhdHRyOiB7fSxcclxuICAgICAgICBhdHRySGVhZGVyOiB7fSxcclxuICAgICAgICByZW5kZXI6IG51bGxcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y9cclxuICAgICAqIEBwYXJhbSB7Q29yZVVJLnRhYmxlLmluc3RhbmNlfSB0YWJsZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgIG9wdGlvbnNcclxuICAgICAqL1xyXG4gICAgaW5pdDogZnVuY3Rpb24gKHRhYmxlLCBvcHRpb25zKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX3RhYmxlICAgPSB0YWJsZTtcclxuICAgICAgICB0aGlzLl9vcHRpb25zID0gJC5leHRlbmQoe30sIHRoaXMuX29wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQo9GB0YLQsNC90L7QstC60LAg0LLQuNC00LjQvNC+0YHRgtC4INC60L7Qu9C+0L3QutC4XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzU2hvd1xyXG4gICAgICovXHJcbiAgICBzZXRTaG93OiBmdW5jdGlvbiAoaXNTaG93KSB7XHJcbiAgICAgICAgdGhpcy5fb3B0aW9ucy5zaG93ID0gISEgaXNTaG93O1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQktC40LTQuNC80L7RgdGC0Lgg0LrQvtC70L7QvdC60LhcclxuICAgICAqL1xyXG4gICAgaXNTaG93OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICEhIHRoaXMuX29wdGlvbnMuc2hvdztcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QvtC70YPRh9C10L3QuNC1INC/0LDRgNCw0LzQtdGC0YDQvtCyXHJcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fVxyXG4gICAgICovXHJcbiAgICBnZXRPcHRpb25zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICQuZXh0ZW5kKHt9LCB0aGlzLl9vcHRpb25zKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0KTQvtGA0LzQuNGA0L7QstCw0L3QuNC1INC60L7QvdGC0LXQvdGC0LBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50XHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcmVjb3JkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVjb3JkS2V5XHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKGNvbnRlbnQsIHJlY29yZCwgcmVjb3JkS2V5KSB7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoY29udGVudCk7XHJcblxyXG4gICAgICAgICAgICBjb250ZW50ID0gdGhpcy5fb3B0aW9ucy5mb3JtYXRcclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9ZWVlZL2csIHRoaXMuX3N0clBhZExlZnQoZGF0ZS5nZXRGdWxsWWVhcigpLCA0KSlcclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9NTS9nLCAgIHRoaXMuX3N0clBhZExlZnQoZGF0ZS5nZXRNb250aCgpICsgMSwgMikpXHJcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvTS9nLCAgICBkYXRlLmdldE1vbnRoKCkgKyAxKVxyXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL0REL2csICAgdGhpcy5fc3RyUGFkTGVmdChkYXRlLmdldERhdGUoKSwgMikpXHJcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvRC9nLCAgICBkYXRlLmdldERhdGUoKSk7XHJcblxyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29udGVudCA9ICcnO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHJldHVybiBjb250ZW50O1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQoNCw0LfQvNC10YDQvdC+0YHRgtGMINGB0YLRgNC+0LrQuFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0clxyXG4gICAgICogQHBhcmFtIHtpbnR9ICAgIGNvdW50XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVwZWF0XHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBfc3RyUGFkTGVmdDogZnVuY3Rpb24gKHN0ciwgY291bnQsIHJlcGVhdCkge1xyXG5cclxuICAgICAgICBzdHIgPSBTdHJpbmcoc3RyKTtcclxuXHJcbiAgICAgICAgaWYgKHN0ci5sZW5ndGggPj0gY291bnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlcGVhdCA9IHJlcGVhdCA/IHJlcGVhdCA6ICcwJztcclxuXHJcbiAgICAgICAgcmV0dXJuIChyZXBlYXQucmVwZWF0KGNvdW50KSArIHN0cikuc2xpY2UoLShjb3VudCkpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IGNvcmV1aVRhYmxlIGZyb20gXCIuLi9jb3JldWkudGFibGVcIjtcclxuXHJcbmNvcmV1aVRhYmxlLmNvbHVtbnMuZGF0ZXRpbWUgPSB7XHJcblxyXG4gICAgX3RhYmxlOiBudWxsLFxyXG4gICAgX29wdGlvbnM6IHtcclxuICAgICAgICB0eXBlOiAnZGF0ZXRpbWUnLFxyXG4gICAgICAgIGZpZWxkOiBudWxsLFxyXG4gICAgICAgIGxhYmVsOiBudWxsLFxyXG4gICAgICAgIHNob3c6IHRydWUsXHJcbiAgICAgICAgd2lkdGg6IG51bGwsXHJcbiAgICAgICAgZm9ybWF0OiAnREQuTU0uWVlZWSBoaDptbTpzcycsXHJcbiAgICAgICAgYXR0cjoge30sXHJcbiAgICAgICAgYXR0ckhlYWRlcjoge30sXHJcbiAgICAgICAgcmVuZGVyOiBudWxsXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPXHJcbiAgICAgKiBAcGFyYW0ge0NvcmVVSS50YWJsZS5pbnN0YW5jZX0gdGFibGVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICBvcHRpb25zXHJcbiAgICAgKi9cclxuICAgIGluaXQ6IGZ1bmN0aW9uICh0YWJsZSwgb3B0aW9ucykge1xyXG5cclxuICAgICAgICB0aGlzLl90YWJsZSAgID0gdGFibGU7XHJcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCB0aGlzLl9vcHRpb25zLCBvcHRpb25zKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0KPRgdGC0LDQvdC+0LLQutCwINCy0LjQtNC40LzQvtGB0YLQuCDQutC+0LvQvtC90LrQuFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBpc1Nob3dcclxuICAgICAqL1xyXG4gICAgc2V0U2hvdzogZnVuY3Rpb24gKGlzU2hvdykge1xyXG4gICAgICAgIHRoaXMuX29wdGlvbnMuc2hvdyA9ICEhIGlzU2hvdztcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JLQuNC00LjQvNC+0YHRgtC4INC60L7Qu9C+0L3QutC4XHJcbiAgICAgKi9cclxuICAgIGlzU2hvdzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAhISB0aGlzLl9vcHRpb25zLnNob3c7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSDQv9Cw0YDQsNC80LXRgtGA0L7QslxyXG4gICAgICogQHJldHVybnMge29iamVjdH1cclxuICAgICAqL1xyXG4gICAgZ2V0T3B0aW9uczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAkLmV4dGVuZCh7fSwgdGhpcy5fb3B0aW9ucyk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCk0L7RgNC80LjRgNC+0LLQsNC90LjQtSDQutC+0L3RgtC10L3RgtCwXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGVudFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHJlY29yZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHJlY29yZEtleVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgcmVuZGVyOiBmdW5jdGlvbihjb250ZW50LCByZWNvcmQsIHJlY29yZEtleSkge1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoY29udGVudCk7XHJcblxyXG4gICAgICAgICAgICBjb250ZW50ID0gdGhpcy5fb3B0aW9ucy5mb3JtYXRcclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9ZWVlZL2csIHRoaXMuX3N0clBhZExlZnQoZGF0ZS5nZXRGdWxsWWVhcigpLCA0KSlcclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9NTS9nLCAgIHRoaXMuX3N0clBhZExlZnQoZGF0ZS5nZXRNb250aCgpICsgMSwgMikpXHJcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvTS9nLCAgICBkYXRlLmdldE1vbnRoKCkgKyAxKVxyXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL0REL2csICAgdGhpcy5fc3RyUGFkTGVmdChkYXRlLmdldERhdGUoKSwgMikpXHJcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvRC9nLCAgICBkYXRlLmdldERhdGUoKSlcclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9oaC9nLCAgIHRoaXMuX3N0clBhZExlZnQoZGF0ZS5nZXRIb3VycygpLCAyKSlcclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9tbS9nLCAgIHRoaXMuX3N0clBhZExlZnQoZGF0ZS5nZXRNaW51dGVzKCksIDIpKVxyXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL20vZywgICAgZGF0ZS5nZXRNaW51dGVzKCkpXHJcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvc3MvZywgICB0aGlzLl9zdHJQYWRMZWZ0KGRhdGUuZ2V0U2Vjb25kcygpLCAyKSlcclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9zL2csICAgIGRhdGUuZ2V0U2Vjb25kcygpKTtcclxuXHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb250ZW50ID0gJyc7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCg0LDQt9C80LXRgNC90L7RgdGC0Ywg0YHRgtGA0L7QutC4XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyXHJcbiAgICAgKiBAcGFyYW0ge2ludH0gICAgY291bnRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXBlYXRcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIF9zdHJQYWRMZWZ0OiBmdW5jdGlvbiAoc3RyLCBjb3VudCwgcmVwZWF0KSB7XHJcblxyXG4gICAgICAgIHN0ciA9IFN0cmluZyhzdHIpO1xyXG5cclxuICAgICAgICBpZiAoc3RyLmxlbmd0aCA+PSBjb3VudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVwZWF0ID0gcmVwZWF0ID8gcmVwZWF0IDogJzAnO1xyXG5cclxuICAgICAgICByZXR1cm4gKHJlcGVhdC5yZXBlYXQoY291bnQpICsgc3RyKS5zbGljZSgtKGNvdW50KSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgY29yZXVpVGFibGUgZnJvbSBcIi4uL2NvcmV1aS50YWJsZVwiO1xyXG5cclxuY29yZXVpVGFibGUuY29sdW1ucy5odG1sID0ge1xyXG5cclxuICAgIF90YWJsZTogbnVsbCxcclxuICAgIF9vcHRpb25zOiB7XHJcbiAgICAgICAgdHlwZTogJ2h0bWwnLFxyXG4gICAgICAgIGZpZWxkOiBudWxsLFxyXG4gICAgICAgIGxhYmVsOiBudWxsLFxyXG4gICAgICAgIHNob3c6IHRydWUsXHJcbiAgICAgICAgd2lkdGg6IG51bGwsXHJcbiAgICAgICAgYXR0cjoge30sXHJcbiAgICAgICAgYXR0ckhlYWRlcjoge30sXHJcbiAgICAgICAgcmVuZGVyOiBudWxsXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPXHJcbiAgICAgKiBAcGFyYW0ge0NvcmVVSS50YWJsZS5pbnN0YW5jZX0gdGFibGVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICBvcHRpb25zXHJcbiAgICAgKi9cclxuICAgIGluaXQ6IGZ1bmN0aW9uICh0YWJsZSwgb3B0aW9ucykge1xyXG5cclxuICAgICAgICB0aGlzLl90YWJsZSAgID0gdGFibGU7XHJcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCB0aGlzLl9vcHRpb25zLCBvcHRpb25zKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0KPRgdGC0LDQvdC+0LLQutCwINCy0LjQtNC40LzQvtGB0YLQuCDQutC+0LvQvtC90LrQuFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBpc1Nob3dcclxuICAgICAqL1xyXG4gICAgc2V0U2hvdzogZnVuY3Rpb24gKGlzU2hvdykge1xyXG4gICAgICAgIHRoaXMuX29wdGlvbnMuc2hvdyA9ICEhIGlzU2hvdztcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JLQuNC00LjQvNC+0YHRgtC4INC60L7Qu9C+0L3QutC4XHJcbiAgICAgKi9cclxuICAgIGlzU2hvdzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAhISB0aGlzLl9vcHRpb25zLnNob3c7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSDQv9Cw0YDQsNC80LXRgtGA0L7QslxyXG4gICAgICogQHJldHVybnMge29iamVjdH1cclxuICAgICAqL1xyXG4gICAgZ2V0T3B0aW9uczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAkLmV4dGVuZCh7fSwgdGhpcy5fb3B0aW9ucyk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCk0L7RgNC80LjRgNC+0LLQsNC90LjQtSDQutC+0L3RgtC10L3RgtCwXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGVudFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHJlY29yZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHJlY29yZEtleVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgcmVuZGVyOiBmdW5jdGlvbihjb250ZW50LCByZWNvcmQsIHJlY29yZEtleSkge1xyXG5cclxuICAgICAgICBpZiAoWydzdHJpbmcnLCAnYmlnaW50JywgJ3N5bWJvbCcsICdudW1iZXInXS5pbmRleE9mKHR5cGVvZiBjb250ZW50KSA8IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIFN0cmluZyhjb250ZW50KTtcclxuICAgIH1cclxufSIsImltcG9ydCBjb3JldWlUYWJsZSBmcm9tIFwiLi4vY29yZXVpLnRhYmxlXCI7XHJcblxyXG5jb3JldWlUYWJsZS5jb2x1bW5zLm51bWJlciA9IHtcclxuXHJcbiAgICBfdGFibGU6IG51bGwsXHJcbiAgICBfb3B0aW9uczoge1xyXG4gICAgICAgIHR5cGU6ICdudW1iZXInLFxyXG4gICAgICAgIGZpZWxkOiBudWxsLFxyXG4gICAgICAgIGxhYmVsOiBudWxsLFxyXG4gICAgICAgIHNob3c6IHRydWUsXHJcbiAgICAgICAgd2lkdGg6IG51bGwsXHJcbiAgICAgICAgYXR0cjoge30sXHJcbiAgICAgICAgYXR0ckhlYWRlcjoge30sXHJcbiAgICAgICAgcmVuZGVyOiBudWxsXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPXHJcbiAgICAgKiBAcGFyYW0ge0NvcmVVSS50YWJsZS5pbnN0YW5jZX0gdGFibGVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICBvcHRpb25zXHJcbiAgICAgKi9cclxuICAgIGluaXQ6IGZ1bmN0aW9uICh0YWJsZSwgb3B0aW9ucykge1xyXG5cclxuICAgICAgICB0aGlzLl90YWJsZSAgID0gdGFibGU7XHJcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCB0aGlzLl9vcHRpb25zLCBvcHRpb25zKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0KPRgdGC0LDQvdC+0LLQutCwINCy0LjQtNC40LzQvtGB0YLQuCDQutC+0LvQvtC90LrQuFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBpc1Nob3dcclxuICAgICAqL1xyXG4gICAgc2V0U2hvdzogZnVuY3Rpb24gKGlzU2hvdykge1xyXG4gICAgICAgIHRoaXMuX29wdGlvbnMuc2hvdyA9ICEhIGlzU2hvdztcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JLQuNC00LjQvNC+0YHRgtC4INC60L7Qu9C+0L3QutC4XHJcbiAgICAgKi9cclxuICAgIGlzU2hvdzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAhISB0aGlzLl9vcHRpb25zLnNob3c7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSDQv9Cw0YDQsNC80LXRgtGA0L7QslxyXG4gICAgICogQHJldHVybnMge29iamVjdH1cclxuICAgICAqL1xyXG4gICAgZ2V0T3B0aW9uczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAkLmV4dGVuZCh7fSwgdGhpcy5fb3B0aW9ucyk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCk0L7RgNC80LjRgNC+0LLQsNC90LjQtSDQutC+0L3RgtC10L3RgtCwXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGVudFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHJlY29yZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHJlY29yZEtleVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgcmVuZGVyOiBmdW5jdGlvbihjb250ZW50LCByZWNvcmQsIHJlY29yZEtleSkge1xyXG5cclxuICAgICAgICBpZiAoWydzdHJpbmcnLCAnYmlnaW50JywgJ3N5bWJvbCcsICdudW1iZXInXS5pbmRleE9mKHR5cGVvZiBjb250ZW50KSA8IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29udGVudCA9IFN0cmluZyhjb250ZW50KVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvLC9nLCAnLicpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9bXjAtOVxcLVxcLl0vZywgJycpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9bXFxzXXsyLH0vZywgJyAnKTtcclxuXHJcbiAgICAgICAgY29udGVudCA9IGNvbnRlbnQucmVwbGFjZSgvKD88IShcXC5cXGQqfF4uezB9KSkoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCAnJDEgJylcclxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcLSAvZywgJy0nKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgY29yZXVpVGFibGUgZnJvbSBcIi4uL2NvcmV1aS50YWJsZVwiO1xyXG5cclxuY29yZXVpVGFibGUuY29sdW1ucy5udW1iZXJzID0ge1xyXG5cclxuICAgIF90YWJsZTogbnVsbCxcclxuICAgIF9vcHRpb25zOiB7XHJcbiAgICAgICAgdHlwZTogJ251bWJlcnMnLFxyXG4gICAgICAgIGxhYmVsOiAn4oSWJyxcclxuICAgICAgICB3aWR0aDogMjAsXHJcbiAgICAgICAgYXR0cjogeyBjbGFzczogJ3RleHQtZW5kJyB9LFxyXG4gICAgICAgIGF0dHJIZWFkZXI6IG51bGxcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y9cclxuICAgICAqIEBwYXJhbSB7Q29yZVVJLnRhYmxlLmluc3RhbmNlfSB0YWJsZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgIG9wdGlvbnNcclxuICAgICAqL1xyXG4gICAgaW5pdDogZnVuY3Rpb24gKHRhYmxlLCBvcHRpb25zKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX3RhYmxlICAgID0gdGFibGU7XHJcbiAgICAgICAgdGhpcy5fb3B0aW9ucyAgPSAkLmV4dGVuZCh0cnVlLCB7fSwgdGhpcy5fb3B0aW9ucywgb3B0aW9ucyk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCS0LjQtNC40LzQvtGB0YLQuCDQutC+0LvQvtC90LrQuFxyXG4gICAgICovXHJcbiAgICBpc1Nob3c6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QvtC70YPRh9C10L3QuNC1INC/0LDRgNCw0LzQtdGC0YDQvtCyXHJcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fVxyXG4gICAgICovXHJcbiAgICBnZXRPcHRpb25zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICQuZXh0ZW5kKHt9LCB0aGlzLl9vcHRpb25zKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0KTQvtGA0LzQuNGA0L7QstCw0L3QuNC1INC60L7QvdGC0LXQvdGC0LBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50XHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcmVjb3JkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVjb3JkS2V5XHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKGNvbnRlbnQsIHJlY29yZCwgcmVjb3JkS2V5KSB7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl90YWJsZS5fcmVjb3Jkc051bWJlcjtcclxuICAgIH1cclxufSIsImltcG9ydCBjb3JldWlUYWJsZSBmcm9tIFwiLi4vY29yZXVpLnRhYmxlXCI7XHJcbmltcG9ydCBjb3JldWlUYWJsZUVsZW1lbnRzIGZyb20gXCIuLi9jb3JldWkudGFibGUuZWxlbWVudHNcIjtcclxuXHJcbmNvcmV1aVRhYmxlLmNvbHVtbnMuc2VsZWN0ID0ge1xyXG5cclxuICAgIF90YWJsZTogbnVsbCxcclxuICAgIF9vcHRpb25zOiB7XHJcbiAgICAgICAgdHlwZTogJ3NlbGVjdCcsXHJcbiAgICAgICAgZmllbGQ6IG51bGwsXHJcbiAgICAgICAgbGFiZWw6ICcnLFxyXG4gICAgICAgIHNob3c6IHRydWUsXHJcbiAgICAgICAgd2lkdGg6IDM1LFxyXG4gICAgICAgIGF0dHI6IHsgY2xhc3M6ICdjb3JldWktdGFibGVfX3NlbGVjdF9jb250YWluZXIgdGV4dC1jZW50ZXInIH0sXHJcbiAgICAgICAgYXR0ckhlYWRlcjogeyBjbGFzczogJ3RleHQtY2VudGVyJyB9XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPXHJcbiAgICAgKiBAcGFyYW0ge0NvcmVVSS50YWJsZS5pbnN0YW5jZX0gdGFibGVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICBvcHRpb25zXHJcbiAgICAgKi9cclxuICAgIGluaXQ6IGZ1bmN0aW9uICh0YWJsZSwgb3B0aW9ucykge1xyXG5cclxuICAgICAgICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnYXR0cicpKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuYXR0ciA9IENvcmVVSS50YWJsZS5fbWVyZ2VBdHRyKHRoaXMuX29wdGlvbnMuYXR0ciwgb3B0aW9ucy5hdHRyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2F0dHJIZWFkZXInKSkge1xyXG4gICAgICAgICAgICBvcHRpb25zLmF0dHJIZWFkZXIgPSBDb3JlVUkudGFibGUuX21lcmdlQXR0cih0aGlzLl9vcHRpb25zLmF0dHJIZWFkZXIsIG9wdGlvbnMuYXR0ckhlYWRlcik7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5fdGFibGUgICAgICAgICA9IHRhYmxlO1xyXG4gICAgICAgIHRoaXMuX29wdGlvbnMgICAgICAgPSAkLmV4dGVuZCh0cnVlLCB7fSwgdGhpcy5fb3B0aW9ucywgb3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5fb3B0aW9ucy5sYWJlbCA9ICc8aW5wdXQgY2xhc3M9XCJjb3JldWktdGFibGVfX3NlbGVjdC1hbGwgZm9ybS1jaGVjay1pbnB1dFwiIHR5cGU9XCJjaGVja2JveFwiIHZhbHVlPVwiXCI+JztcclxuXHJcbiAgICAgICAgLy8g0J/QvtC60LDQtyDRgdGC0YDQvtC6XHJcbiAgICAgICAgdGhpcy5fdGFibGUub24oJ3Nob3ctcmVjb3JkcycsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBzZWxlY3RzICAgPSBjb3JldWlUYWJsZUVsZW1lbnRzLmdldFJvd3NTZWxlY3RzKHRhYmxlLmdldElkKCkpO1xyXG4gICAgICAgICAgICBsZXQgc2VsZWN0QWxsID0gY29yZXVpVGFibGVFbGVtZW50cy5nZXRSb3dzU2VsZWN0QWxsKHRhYmxlLmdldElkKCkpO1xyXG5cclxuICAgICAgICAgICAgLy8g0J7RgtC80LXQvdCwINC+0LHRgNCw0LHQvtGC0LrQuCDQvdCw0LbQsNGC0LjRjyDQsiBzZWxlY3Qg0LrQvtC70L7QvdC60LDRhVxyXG4gICAgICAgICAgICAkKHNlbGVjdHMpLmNsaWNrKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8g0JLRi9Cx0L7RgCDRgdGC0YDQvtC60LhcclxuICAgICAgICAgICAgJCgnID4gLmNvcmV1aS10YWJsZV9fc2VsZWN0Jywgc2VsZWN0cykuY2xpY2soZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVjb3JkSW5kZXggPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlY29yZCAgICAgID0gdGFibGUuZ2V0UmVjb3JkQnlJbmRleChyZWNvcmRJbmRleCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdHIgICAgICAgICAgPSBjb3JldWlUYWJsZUVsZW1lbnRzLmdldFRyQnlJbmRleCh0YWJsZS5nZXRJZCgpLCByZWNvcmRJbmRleCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCAhIHJlY29yZCB8fCAhIHJvdykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodHIpLmFkZENsYXNzKCd0YWJsZS1wcmltYXJ5Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRhYmxlLl90cmlnZ2VyKCdzZWxlY3QnLCB0YWJsZSwgWyByZWNvcmQgXSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICQodHIpLnJlbW92ZUNsYXNzKCd0YWJsZS1wcmltYXJ5Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRhYmxlLl90cmlnZ2VyKCd1bnNlbGVjdCcsIHRhYmxlLCBbIHJlY29yZCBdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyDQktGL0LHQvtGAINCy0YHQtdGFINGB0YLRgNC+0LpcclxuICAgICAgICAgICAgc2VsZWN0QWxsLmNsaWNrKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICB0YWJsZS5zZWxlY3RBbGwoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFibGUudW5zZWxlY3RBbGwoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCj0YHRgtCw0L3QvtCy0LrQsCDQstC40LTQuNC80L7RgdGC0Lgg0LrQvtC70L7QvdC60LhcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNTaG93XHJcbiAgICAgKi9cclxuICAgIHNldFNob3c6IGZ1bmN0aW9uIChpc1Nob3cpIHtcclxuICAgICAgICB0aGlzLl9vcHRpb25zLnNob3cgPSAhISBpc1Nob3c7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCS0LjQtNC40LzQvtGB0YLQuCDQutC+0LvQvtC90LrQuFxyXG4gICAgICovXHJcbiAgICBpc1Nob3c6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gISEgdGhpcy5fb3B0aW9ucy5zaG93O1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUg0L/QsNGA0LDQvNC10YLRgNC+0LJcclxuICAgICAqIEByZXR1cm5zIHtvYmplY3R9XHJcbiAgICAgKi9cclxuICAgIGdldE9wdGlvbnM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gJC5leHRlbmQoe30sIHRoaXMuX29wdGlvbnMpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQpNC+0YDQvNC40YDQvtCy0LDQvdC40LUg0LrQvtC90YLQtdC90YLQsFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnRcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSByZWNvcmRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByZWNvcmRLZXlcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHJlbmRlcjogZnVuY3Rpb24oY29udGVudCwgcmVjb3JkLCByZWNvcmRLZXkpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuICc8aW5wdXQgY2xhc3M9XCJjb3JldWktdGFibGVfX3NlbGVjdCBmb3JtLWNoZWNrLWlucHV0XCIgdHlwZT1cImNoZWNrYm94XCIgdmFsdWU9XCInICsgcmVjb3JkS2V5ICsgJ1wiPic7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgY29yZXVpVGFibGUgZnJvbSBcIi4uL2NvcmV1aS50YWJsZVwiO1xyXG5pbXBvcnQgY29yZXVpVGFibGVFbGVtZW50cyBmcm9tIFwiLi4vY29yZXVpLnRhYmxlLmVsZW1lbnRzXCI7XHJcblxyXG5jb3JldWlUYWJsZS5jb2x1bW5zLnN3aXRjaCA9IHtcclxuXHJcbiAgICBfdGFibGU6IG51bGwsXHJcbiAgICBfb3B0aW9uczoge1xyXG4gICAgICAgIHR5cGU6ICdzd2l0Y2gnLFxyXG4gICAgICAgIGxhYmVsOiAnJyxcclxuICAgICAgICBmaWVsZDogJycsXHJcbiAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICB3aWR0aDogNSxcclxuICAgICAgICB2YWx1ZVk6ICdZJyxcclxuICAgICAgICB2YWx1ZU46ICdOJyxcclxuICAgICAgICBhdHRyOiB7IGNsYXNzOiAnY29yZXVpLXRhYmxlX19zd2l0Y2hfY29udGFpbmVyJyB9LFxyXG4gICAgICAgIGF0dHJIZWFkZXI6IHsgfSxcclxuICAgICAgICBvbkNoYW5nZTogbnVsbFxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRj1xyXG4gICAgICogQHBhcmFtIHtDb3JlVUkudGFibGUuaW5zdGFuY2V9IHRhYmxlXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgb3B0aW9uc1xyXG4gICAgICovXHJcbiAgICBpbml0OiBmdW5jdGlvbiAodGFibGUsIG9wdGlvbnMpIHtcclxuXHJcbiAgICAgICAgbGV0IHRoYXQgICAgICA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5fdGFibGUgICA9IHRhYmxlO1xyXG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgdGhpcy5fb3B0aW9ucywgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgIC8vINCf0L7QutCw0Lcg0YHRgtGA0L7QulxyXG4gICAgICAgIHRoaXMuX3RhYmxlLm9uKCdzaG93LXJlY29yZHMnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgY29udGFpbmVycyA9IGNvcmV1aVRhYmxlRWxlbWVudHMuZ2V0Um93c1N3aXRjaGVzKHRoYXQuX3RhYmxlLmdldElkKCkpO1xyXG5cclxuICAgICAgICAgICAgLy8g0J7RgtC80LXQvdCwINC+0LHRgNCw0LHQvtGC0LrQuCDQvdCw0LbQsNGC0LjRjyDQsiBzd2l0Y2gg0LrQvtC70L7QvdC60LDRhVxyXG4gICAgICAgICAgICBjb250YWluZXJzLmNsaWNrKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8g0KHQvtCx0YvRgtC40Y8g0L3QsNC20LDRgtC40Y8g0L3QsCDQv9C10YDQtdC60LvRjtGH0LDRgtC10LvRjFxyXG4gICAgICAgICAgICBpZiAodGhhdC5fb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnb25DaGFuZ2UnKSAmJlxyXG4gICAgICAgICAgICAgICAgKHR5cGVvZiB0aGF0Ll9vcHRpb25zLm9uQ2hhbmdlID09PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiB0aGF0Ll9vcHRpb25zLm9uQ2hhbmdlID09PSAnc3RyaW5nJylcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuY29yZXVpLXRhYmxlX19zd2l0Y2hbZGF0YS1maWVsZD1cIicgKyB0aGF0Ll9vcHRpb25zLmZpZWxkICsgJ1wiXScsIGNvbnRhaW5lcnMpLmNoYW5nZShmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVjb3JkSW5kZXggPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpc0NoZWNrZWQgICA9ICQodGhpcykuaXMoJzpjaGVja2VkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlY29yZCAgICAgID0gdGFibGUuZ2V0UmVjb3JkQnlJbmRleChyZWNvcmRJbmRleCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhhdC5fb3B0aW9ucy5vbkNoYW5nZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Ll9vcHRpb25zLm9uQ2hhbmdlKHJlY29yZCwgaXNDaGVja2VkLCB0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhhdC5fb3B0aW9ucy5vbkNoYW5nZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlkID0gJyc7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVjb3JkLmhhc093blByb3BlcnR5KHRhYmxlLl9vcHRpb25zLnByaW1hcnlLZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZCA9IHJlY29yZFt0YWJsZS5fb3B0aW9ucy5wcmltYXJ5S2V5XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZ1bmMgPSBuZXcgRnVuY3Rpb24oJ3JlY29yZCcsICdjaGVja2VkJywgJ2lkJywgdGhhdC5fb3B0aW9ucy5vbkNoYW5nZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmMocmVjb3JkLCB0aGlzLCBpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQo9GB0YLQsNC90L7QstC60LAg0LLQuNC00LjQvNC+0YHRgtC4INC60L7Qu9C+0L3QutC4XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzU2hvd1xyXG4gICAgICovXHJcbiAgICBzZXRTaG93OiBmdW5jdGlvbiAoaXNTaG93KSB7XHJcbiAgICAgICAgdGhpcy5fb3B0aW9ucy5zaG93ID0gISEgaXNTaG93O1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQktC40LTQuNC80L7RgdGC0Lgg0LrQvtC70L7QvdC60LhcclxuICAgICAqL1xyXG4gICAgaXNTaG93OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICEhIHRoaXMuX29wdGlvbnMuc2hvdztcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QvtC70YPRh9C10L3QuNC1INC/0LDRgNCw0LzQtdGC0YDQvtCyXHJcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fVxyXG4gICAgICovXHJcbiAgICBnZXRPcHRpb25zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICQuZXh0ZW5kKHRydWUsIHt9LCB0aGlzLl9vcHRpb25zKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0KTQvtGA0LzQuNGA0L7QstCw0L3QuNC1INC60L7QvdGC0LXQvdGC0LBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50XHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcmVjb3JkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVjb3JkS2V5XHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKGNvbnRlbnQsIHJlY29yZCwgcmVjb3JkS2V5KSB7XHJcblxyXG4gICAgICAgIGxldCBjaGVja2VkID0gcmVjb3JkLmhhc093blByb3BlcnR5KHRoaXMuX29wdGlvbnMuZmllbGQpICYmIHJlY29yZFt0aGlzLl9vcHRpb25zLmZpZWxkXSA9PT0gdGhpcy5fb3B0aW9ucy52YWx1ZVlcclxuICAgICAgICAgICAgPyAnIGNoZWNrZWQ9XCJjaGVja2VkXCInXHJcbiAgICAgICAgICAgIDogJyc7XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJmb3JtLXN3aXRjaFwiPicgK1xyXG4gICAgICAgICAgICAgICAgICAgJzxpbnB1dCBjbGFzcz1cImNvcmV1aS10YWJsZV9fc3dpdGNoIGZvcm0tY2hlY2staW5wdXRcIiB0eXBlPVwiY2hlY2tib3hcIiB2YWx1ZT1cIicgKyByZWNvcmRLZXkgKyAnXCInICsgY2hlY2tlZCArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAnIGRhdGEtZmllbGQ9XCInICsgdGhpcy5fb3B0aW9ucy5maWVsZCArICdcIiBkYXRhLWZpZWxkPVwiJyArIHRoaXMuX29wdGlvbnMuZmllbGQgKyAnXCI+JyArXHJcbiAgICAgICAgICAgICAgICc8L2Rpdj4nO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IGNvcmV1aVRhYmxlIGZyb20gXCIuLi9jb3JldWkudGFibGVcIjtcclxuXHJcbmNvcmV1aVRhYmxlLmNvbHVtbnMudGV4dCA9IHtcclxuXHJcbiAgICBfdGFibGU6IG51bGwsXHJcbiAgICBfb3B0aW9uczoge1xyXG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgICBmaWVsZDogbnVsbCxcclxuICAgICAgICBsYWJlbDogbnVsbCxcclxuICAgICAgICBzaG93OiB0cnVlLFxyXG4gICAgICAgIHdpZHRoOiBudWxsLFxyXG4gICAgICAgIGF0dHI6IG51bGwsXHJcbiAgICAgICAgYXR0ckhlYWRlcjogbnVsbCxcclxuICAgICAgICByZW5kZXI6IG51bGxcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y9cclxuICAgICAqIEBwYXJhbSB7Q29yZVVJLnRhYmxlLmluc3RhbmNlfSB0YWJsZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgIG9wdGlvbnNcclxuICAgICAqL1xyXG4gICAgaW5pdDogZnVuY3Rpb24gKHRhYmxlLCBvcHRpb25zKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX3RhYmxlICAgPSB0YWJsZTtcclxuICAgICAgICB0aGlzLl9vcHRpb25zID0gJC5leHRlbmQoe30sIHRoaXMuX29wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQo9GB0YLQsNC90L7QstC60LAg0LLQuNC00LjQvNC+0YHRgtC4INC60L7Qu9C+0L3QutC4XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzU2hvd1xyXG4gICAgICovXHJcbiAgICBzZXRTaG93OiBmdW5jdGlvbiAoaXNTaG93KSB7XHJcbiAgICAgICAgdGhpcy5fb3B0aW9ucy5zaG93ID0gISEgaXNTaG93O1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQktC40LTQuNC80L7RgdGC0Lgg0LrQvtC70L7QvdC60LhcclxuICAgICAqL1xyXG4gICAgaXNTaG93OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICEhIHRoaXMuX29wdGlvbnMuc2hvdztcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QvtC70YPRh9C10L3QuNC1INC/0LDRgNCw0LzQtdGC0YDQvtCyXHJcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fVxyXG4gICAgICovXHJcbiAgICBnZXRPcHRpb25zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICQuZXh0ZW5kKHt9LCB0aGlzLl9vcHRpb25zKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0KTQvtGA0LzQuNGA0L7QstCw0L3QuNC1INC60L7QvdGC0LXQvdGC0LBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50XHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcmVjb3JkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVjb3JkS2V5XHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKGNvbnRlbnQsIHJlY29yZCwgcmVjb3JkS2V5KSB7XHJcblxyXG4gICAgICAgIGlmIChbJ3N0cmluZycsICdiaWdpbnQnLCAnc3ltYm9sJywgJ251bWJlciddLmluZGV4T2YodHlwZW9mIGNvbnRlbnQpIDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gU3RyaW5nKGNvbnRlbnQpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC88L2csICcmbHQ7JylcclxuICAgICAgICAgICAgLnJlcGxhY2UoLz4vZywgJyZndDsnKTtcclxuICAgIH1cclxufSJdLCJuYW1lcyI6WyJmIiwiZXhwb3J0cyIsIm1vZHVsZSIsImRlZmluZSIsImFtZCIsImciLCJ3aW5kb3ciLCJnbG9iYWwiLCJzZWxmIiwiZWpzIiwiciIsImUiLCJuIiwidCIsIm8iLCJpIiwiYyIsInJlcXVpcmUiLCJ1IiwiYSIsIkVycm9yIiwiY29kZSIsInAiLCJjYWxsIiwibGVuZ3RoIiwiZnMiLCJwYXRoIiwidXRpbHMiLCJzY29wZU9wdGlvbldhcm5lZCIsIl9WRVJTSU9OX1NUUklORyIsInZlcnNpb24iLCJfREVGQVVMVF9PUEVOX0RFTElNSVRFUiIsIl9ERUZBVUxUX0NMT1NFX0RFTElNSVRFUiIsIl9ERUZBVUxUX0RFTElNSVRFUiIsIl9ERUZBVUxUX0xPQ0FMU19OQU1FIiwiX05BTUUiLCJfUkVHRVhfU1RSSU5HIiwiX09QVFNfUEFTU0FCTEVfV0lUSF9EQVRBIiwiX09QVFNfUEFTU0FCTEVfV0lUSF9EQVRBX0VYUFJFU1MiLCJjb25jYXQiLCJfQk9NIiwiX0pTX0lERU5USUZJRVIiLCJjYWNoZSIsImZpbGVMb2FkZXIiLCJyZWFkRmlsZVN5bmMiLCJsb2NhbHNOYW1lIiwicHJvbWlzZUltcGwiLCJGdW5jdGlvbiIsIlByb21pc2UiLCJyZXNvbHZlSW5jbHVkZSIsIm5hbWUiLCJmaWxlbmFtZSIsImlzRGlyIiwiZGlybmFtZSIsImV4dG5hbWUiLCJyZXNvbHZlIiwiaW5jbHVkZVBhdGgiLCJleHQiLCJyZXNvbHZlUGF0aHMiLCJwYXRocyIsImZpbGVQYXRoIiwic29tZSIsInYiLCJleGlzdHNTeW5jIiwiZ2V0SW5jbHVkZVBhdGgiLCJvcHRpb25zIiwidmlld3MiLCJtYXRjaCIsImV4ZWMiLCJyZXBsYWNlIiwiQXJyYXkiLCJpc0FycmF5Iiwicm9vdCIsImluY2x1ZGVyIiwiZXNjYXBlRnVuY3Rpb24iLCJoYW5kbGVDYWNoZSIsInRlbXBsYXRlIiwiZnVuYyIsImhhc1RlbXBsYXRlIiwiYXJndW1lbnRzIiwiZ2V0IiwidG9TdHJpbmciLCJjb21waWxlIiwic2V0IiwidHJ5SGFuZGxlQ2FjaGUiLCJkYXRhIiwiY2IiLCJyZXN1bHQiLCJyZWplY3QiLCJlcnIiLCJpbmNsdWRlRmlsZSIsIm9wdHMiLCJzaGFsbG93Q29weSIsImNyZWF0ZU51bGxQcm90b09ialdoZXJlUG9zc2libGUiLCJpbmNsdWRlclJlc3VsdCIsInJldGhyb3ciLCJzdHIiLCJmbG5tIiwibGluZW5vIiwiZXNjIiwibGluZXMiLCJzcGxpdCIsInN0YXJ0IiwiTWF0aCIsIm1heCIsImVuZCIsIm1pbiIsImNvbnRleHQiLCJzbGljZSIsIm1hcCIsImxpbmUiLCJjdXJyIiwiam9pbiIsIm1lc3NhZ2UiLCJzdHJpcFNlbWkiLCJ0ZW1wbCIsInNjb3BlIiwiY29uc29sZSIsIndhcm4iLCJUZW1wbGF0ZSIsInJlbmRlciIsImQiLCJzaGFsbG93Q29weUZyb21MaXN0IiwicmVuZGVyRmlsZSIsImFyZ3MiLCJwcm90b3R5cGUiLCJzaGlmdCIsInZpZXdPcHRzIiwicG9wIiwic2V0dGluZ3MiLCJjbGVhckNhY2hlIiwicmVzZXQiLCJ0ZXh0IiwidGVtcGxhdGVUZXh0IiwibW9kZSIsInRydW5jYXRlIiwiY3VycmVudExpbmUiLCJzb3VyY2UiLCJjbGllbnQiLCJlc2NhcGUiLCJlc2NhcGVYTUwiLCJjb21waWxlRGVidWciLCJkZWJ1ZyIsIm9wZW5EZWxpbWl0ZXIiLCJjbG9zZURlbGltaXRlciIsImRlbGltaXRlciIsInN0cmljdCIsInJtV2hpdGVzcGFjZSIsIm91dHB1dEZ1bmN0aW9uTmFtZSIsImFzeW5jIiwiZGVzdHJ1Y3R1cmVkTG9jYWxzIiwibGVnYWN5SW5jbHVkZSIsIl93aXRoIiwicmVnZXgiLCJjcmVhdGVSZWdleCIsIm1vZGVzIiwiRVZBTCIsIkVTQ0FQRUQiLCJSQVciLCJDT01NRU5UIiwiTElURVJBTCIsImRlbGltIiwiZXNjYXBlUmVnRXhwQ2hhcnMiLCJvcGVuIiwiY2xvc2UiLCJSZWdFeHAiLCJzcmMiLCJmbiIsInByZXBlbmRlZCIsImFwcGVuZGVkIiwiZXNjYXBlRm4iLCJjdG9yIiwic2FuaXRpemVkRmlsZW5hbWUiLCJKU09OIiwic3RyaW5naWZ5IiwiZ2VuZXJhdGVTb3VyY2UiLCJ0ZXN0IiwiZGVzdHJ1Y3R1cmluZyIsImxvZyIsIlN5bnRheEVycm9yIiwicmV0dXJuZWRGbiIsImFub255bW91cyIsImluY2x1ZGUiLCJpbmNsdWRlRGF0YSIsImFwcGx5IiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJiYXNlbmFtZSIsInZhbHVlIiwid3JpdGFibGUiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwibWF0Y2hlcyIsInBhcnNlVGVtcGxhdGVUZXh0IiwiZm9yRWFjaCIsImluZGV4IiwiY2xvc2luZyIsImluZGV4T2YiLCJzY2FuTGluZSIsInBhdCIsImFyciIsImZpcnN0UG9zIiwicHVzaCIsInN1YnN0cmluZyIsIl9hZGRPdXRwdXQiLCJuZXdMaW5lQ291bnQiLCJsYXN0SW5kZXhPZiIsIl9fZXhwcmVzcyIsIlZFUlNJT04iLCJyZWdFeHBDaGFycyIsImhhc093blByb3BlcnR5IiwiaGFzT3duIiwib2JqIiwia2V5Iiwic3RyaW5nIiwiU3RyaW5nIiwiX0VOQ09ERV9IVE1MX1JVTEVTIiwiX01BVENIX0hUTUwiLCJlbmNvZGVfY2hhciIsImVzY2FwZUZ1bmNTdHIiLCJtYXJrdXAiLCJ1bmRlZmluZWQiLCJlc2NhcGVYTUxUb1N0cmluZyIsInRvIiwiZnJvbSIsImxpc3QiLCJfZGF0YSIsInZhbCIsInJlbW92ZSIsImh5cGhlblRvQ2FtZWwiLCJ0b1VwcGVyQ2FzZSIsImNyZWF0ZSIsIl9fcHJvdG9fXyIsInByb2Nlc3MiLCJub3JtYWxpemVBcnJheSIsInBhcnRzIiwiYWxsb3dBYm92ZVJvb3QiLCJ1cCIsImxhc3QiLCJzcGxpY2UiLCJ1bnNoaWZ0IiwicmVzb2x2ZWRQYXRoIiwicmVzb2x2ZWRBYnNvbHV0ZSIsImN3ZCIsIlR5cGVFcnJvciIsImNoYXJBdCIsImZpbHRlciIsIm5vcm1hbGl6ZSIsImlzQWJzb2x1dGUiLCJ0cmFpbGluZ1NsYXNoIiwic3Vic3RyIiwicmVsYXRpdmUiLCJ0cmltIiwiZnJvbVBhcnRzIiwidG9QYXJ0cyIsInNhbWVQYXJ0c0xlbmd0aCIsIm91dHB1dFBhcnRzIiwic2VwIiwiY2hhckNvZGVBdCIsImhhc1Jvb3QiLCJtYXRjaGVkU2xhc2giLCJzdGFydERvdCIsInN0YXJ0UGFydCIsInByZURvdFN0YXRlIiwieHMiLCJyZXMiLCJsZW4iLCJfcHJvY2VzcyIsImNhY2hlZFNldFRpbWVvdXQiLCJjYWNoZWRDbGVhclRpbWVvdXQiLCJkZWZhdWx0U2V0VGltb3V0IiwiZGVmYXVsdENsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJydW5UaW1lb3V0IiwiZnVuIiwicnVuQ2xlYXJUaW1lb3V0IiwibWFya2VyIiwicXVldWUiLCJkcmFpbmluZyIsImN1cnJlbnRRdWV1ZSIsInF1ZXVlSW5kZXgiLCJjbGVhblVwTmV4dFRpY2siLCJkcmFpblF1ZXVlIiwidGltZW91dCIsInJ1biIsIm5leHRUaWNrIiwiSXRlbSIsImFycmF5IiwidGl0bGUiLCJicm93c2VyIiwiZW52IiwiYXJndiIsInZlcnNpb25zIiwibm9vcCIsIm9uIiwiYWRkTGlzdGVuZXIiLCJvbmNlIiwib2ZmIiwicmVtb3ZlTGlzdGVuZXIiLCJyZW1vdmVBbGxMaXN0ZW5lcnMiLCJlbWl0IiwicHJlcGVuZExpc3RlbmVyIiwicHJlcGVuZE9uY2VMaXN0ZW5lciIsImxpc3RlbmVycyIsImJpbmRpbmciLCJjaGRpciIsImRpciIsInVtYXNrIiwiZGVzY3JpcHRpb24iLCJrZXl3b3JkcyIsImF1dGhvciIsImxpY2Vuc2UiLCJiaW4iLCJtYWluIiwianNkZWxpdnIiLCJ1bnBrZyIsInJlcG9zaXRvcnkiLCJ0eXBlIiwidXJsIiwiYnVncyIsImhvbWVwYWdlIiwiZGVwZW5kZW5jaWVzIiwiamFrZSIsImRldkRlcGVuZGVuY2llcyIsImJyb3dzZXJpZnkiLCJlc2xpbnQiLCJqc2RvYyIsIm1vY2hhIiwiZW5naW5lcyIsIm5vZGUiLCJzY3JpcHRzIiwidHBsIiwiY29yZXVpVGFibGVVdGlscyIsIm1lcmdlQXR0ciIsImF0dHIxIiwiYXR0cjIiLCJhc3NpZ24iLCJfdHlwZW9mIiwiJCIsImVhY2giLCJpc051bWVyaWMiLCJudW0iLCJpc05hTiIsImhhc2hDb2RlIiwiY3JjMzIiLCJEYXRlIiwiZ2V0VGltZSIsInJhbmRvbSIsImlzT2JqZWN0IiwiY29yZXVpVGFibGVSZW5kZXIiLCJyZW5kZXJUYWJsZSIsInRhYmxlIiwidGhhdCIsImdldE9wdGlvbnMiLCJodG1sUmVjb3JkcyIsImNvbHVtbkdyb3Vwc0hlYWRlciIsImNvbHVtbkdyb3Vwc0Zvb3RlciIsImNvbEdyb3VwcyIsImNvbHVtbnMiLCJfY29sdW1ucyIsImNvbHVtbiIsImlzU2hvdyIsImNvbHVtbk9wdGlvbnMiLCJhdHRyaWJ1dGVzIiwiZml4ZWQiLCJhdHRySGVhZGVyIiwiYXR0ciIsIndpZHRoIiwidW5pdCIsImxhYmVsIiwicmVjb3JkcyIsIl9yZWNvcmRzVG90YWwiLCJfcmVjb3Jkc051bWJlciIsIl9wYWdlIiwiX3JlY29yZHNQZXJQYWdlIiwicmVjb3JkIiwicmVuZGVyUmVjb3JkIiwiY29yZXVpVGFibGVUcGwiLCJpc1JlbW90ZSIsInJlY29yZHNSZXF1ZXN0IiwiY29sdW1uc0NvdW50IiwibGFuZyIsImdldExhbmciLCJyb3dzIiwiaGVhZGVyUm93IiwiY2VsbHMiLCJoZWFkZXJDb2x1bW4iLCJmb290ZXJSb3ciLCJmb290ZXJDb2x1bW4iLCJjbGFzc2VzIiwic2l6ZSIsImhvdmVyIiwic3RyaXBlZCIsInBhZ2VzIiwiaHRtbENvbHVtbnMiLCJzaG93IiwicmVjb3JkS2V5IiwiZmllbGRzIiwicmVjb3JkTWV0YSIsIl9tZXRhIiwicmVjb3JkQXR0ciIsInJlbmRlckZpZWxkIiwib25DbGlja1VybCIsInJlY29yZEF0dHJSZXN1bHQiLCJjb2x1bW5GaWVsZCIsImZpZWxkIiwiY29udGVudCIsImZpZWxkUHJvcHMiLCJmaWVsZEF0dHIiLCJmaWVsZEF0dHJSZXN1bHQiLCJyZW5kZXJDb250cm9sIiwiY29udHJvbCIsImNvbnRyb2xJbnN0YW5jZSIsImNvcmV1aVRhYmxlIiwiY29udHJvbHMiLCJleHRlbmQiLCJmaWx0ZXJOYW1lIiwiZmlsdGVycyIsImluaXQiLCJjb250cm9sUmVuZGVyIiwiaWQiLCJnZXRJZCIsImluaXRFdmVudHMiLCJjb3JldWlUYWJsZUVsZW1lbnRzIiwiZ2V0Q29udGFpbmVyIiwidGFibGVJZCIsImdldExvY2siLCJnZXRXcmFwcGVyIiwiZ2V0U2VhcmNoQ29udGFpbmVyIiwiZ2V0Q29sdW1uc0NvbnRhaW5lciIsImdldFNlYXJjaENvbnRyb2wiLCJjb250cm9sSWQiLCJnZXRDb250cm9sIiwiZ2V0VGFibGUiLCJnZXRUYWJsZVRib2R5IiwiZ2V0VHJSZWNvcmRzIiwiZ2V0VHJCeUluZGV4IiwiZ2V0U2VsZWN0ZWRJbmRleGVzIiwiaW5kZXhlcyIsImVsZW1lbnQiLCJnZXRSb3dzU3dpdGNoZXMiLCJnZXRSb3dzU2VsZWN0cyIsImdldFJvd3NTZWxlY3RBbGwiLCJzZWxlY3RUciIsInRyIiwiYWRkQ2xhc3MiLCJwcm9wIiwic2VsZWN0VHJBbGwiLCJ0YWJsZUNvbnRhaW5lciIsInVuc2VsZWN0VHIiLCJyZW1vdmVDbGFzcyIsInVuc2VsZWN0VHJBbGwiLCJmaXhlZENvbHNMZWZ0IiwidGFibGVXcmFwcGVyIiwiY29sT2Zmc2V0IiwiY3NzIiwib3V0ZXJXaWR0aCIsImZpeGVkQ29sc1JpZ2h0IiwicmV2ZXJzZSIsImNvcmV1aVRhYmxlSW5zdGFuY2UiLCJfb3B0aW9ucyIsInByaW1hcnlLZXkiLCJtaW5XaWR0aCIsIm1heFdpZHRoIiwiaGVpZ2h0IiwibWluSGVpZ2h0IiwibmF4SGVpZ2h0IiwicGFnZSIsInJlY29yZHNQZXJQYWdlIiwibWV0aG9kIiwicGFnZVBhcmFtIiwicmVjb3Jkc1BlclBhZ2VQYXJhbSIsImNvbHVtbkhlYWRlcnMiLCJvbkNsaWNrIiwiX3NlYXJjaCIsIl9maWx0ZXIiLCJfZXZlbnRzIiwiX2luaXQiLCJjb2x1bW5JbnN0YW5jZSIsInNlYXJjaCIsImNsaWNrIiwiZ2V0UmVjb3JkQnlJbmRleCIsImZpZWxkUXVvdGUiLCJsb2NhdGlvbiIsImhyZWYiLCJldmVudCIsIl90cmlnZ2VyIiwid2lkdGhTaXplcyIsImhlaWdodFNpemVzIiwiaGVhZGVyc091dCIsImhlYWRlcnNJbiIsImZvb3RlcnNJbiIsImZvb3RlcnNPdXQiLCJtYXhIZWlnaHQiLCJoZWFkZXIiLCJjb250cm9sc0xlZnQiLCJjb250cm9sc0NlbnRlciIsImNvbnRyb2xzUmlnaHQiLCJ0b0xvd2VyQ2FzZSIsImxlZnQiLCJjZW50ZXIiLCJyaWdodCIsImhlYWRlckNvbnRyb2xzIiwiZm9vdGVyIiwiZm9vdGVyQ29udHJvbHMiLCJsb2FkIiwiaHRtbCIsInJlY29yZHNUb3RhbCIsImRvbUVsZW1lbnQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiSFRNTEVsZW1lbnQiLCJpbm5lckhUTUwiLCJsb2NrIiwiY29udGFpbmVyIiwiZmluZCIsInByZXBlbmQiLCJ1bmxvY2siLCJoaWRlIiwiTnVtYmVyIiwiYWpheCIsImRhdGFUeXBlIiwiYmVmb3JlU2VuZCIsInhociIsInN1Y2Nlc3MiLCJ0b3RhbCIsIl92aWV3UmVjb3JkcyIsImVycm9yIiwidGV4dFN0YXR1cyIsImVycm9yVGhyb3duIiwiY29tcGxldGUiLCJyZWxvYWQiLCJyZWZyZXNoIiwicmVwbGFjZVdpdGgiLCJzZXRQYWdlU2l6ZSIsInNlbGVjdEFsbCIsInVuc2VsZWN0QWxsIiwic2VsZWN0UmVjb3JkIiwicm93IiwiZ2V0Um93QnlJZCIsInVuc2VsZWN0UmVjb3JkIiwiZ2V0U2VsZWN0ZWRSZWNvcmRzSWQiLCJnZXRTZWxlY3RlZFJlY29yZHMiLCJnZXRSZWNvcmQiLCJnZXRSZWNvcmRzIiwicHJldlBhZ2UiLCJuZXh0UGFnZSIsInRvdGFsUGFnZXMiLCJjZWlsIiwiZ29QYWdlIiwiZXZlbnROYW1lIiwiY2FsbGJhY2siLCJzaW5nbGVFeGVjIiwiZ2V0U2V0dGluZyIsImtleXMiLCJzZXRDb2x1bW5zU2hvdyIsInNldFNob3ciLCJzZWFyY2hSZWNvcmRzIiwiY29udHJvbHNTZWFyY2giLCJnZXRWYWx1ZSIsImZpbHRlclJlY29yZHMiLCJjb250cm9sc0ZpbHRlcnMiLCJnZXRSb3dCeUZpZWxkIiwicmVjb3JkSXRlbSIsInBhcnNlSW50IiwicmVuZGVyUmVjb3JkZXJzIiwicGFyYW1zIiwiX2luc3RhbmNlcyIsIl9zZXR0aW5ncyIsImluc3RhbmNlIiwiY29yZXVpRm9ybUluc3RhbmNlIiwic2V0U2V0dGluZ3MiLCJydSIsImxpbmsiLCJfaWQiLCJfdGFibGUiLCJidXR0b24iLCJfcmVuZGVyIiwiZHJvcGRvd24iLCJpdGVtcyIsIml0ZW0iLCJDb3JldWlUYWJsZVV0aWxzIiwiYnV0dG9uX2dyb3VwIiwiX2xpbmsiLCJfYnV0dG9uIiwiX2Ryb3Bkb3duIiwiYnV0dG9ucyIsImN1c3RvbSIsInBhZ2Vfc2l6ZSIsInNlbGVjdFBhZ2VTaXplIiwiY2hhbmdlIiwicmVjb3Jkc1BlclBhZ2VMaXN0IiwicGFnZV9qdW1wIiwiaW5wdXQiLCJrZXl1cCIsImtleUNvZGUiLCJwcmV2IiwibmV4dCIsImNvdW50IiwiX2luaXRFdmVudHMiLCJzaG93UHJldiIsInNob3dOZXh0Iiwic2hvd0RpdmlkZXJTdGFydCIsInNob3dEaXZpZGVyRW5kIiwic2hvd1BhZ2VGaXJzdCIsInNob3dQYWdlTGFzdCIsInBhZ2VzVG90YWwiLCJjb3VudEhhbGYiLCJmbG9vciIsImN1cnJlbnRQYWdlIiwiaXNBY3RpdmVQcmV2IiwiaXNBY3RpdmVOZXh0IiwiYnRuUHJldiIsImJ0bk5leHQiLCJidG4iLCJidG5DbGVhciIsImJ0bkNvbXBsZXRlIiwiY2xlYXIiLCJidXR0b25Ub2dnbGUiLCJidXR0b25DbGVhciIsImZhZGVUb2dnbGUiLCJjb250cm9sc0V2ZW50cyIsImJ0bkNvbXBsZXRlQXR0ciIsImJ0bkNvbXBsZXRlQ29udGVudCIsIndyYXBwZXIiLCJwcmVmaXgiLCJmYWRlT3V0IiwiYnRuQXR0ciIsImJ0bkNvbnRlbnQiLCJzaG93Q2xlYXIiLCJidG5DbGVhckF0dHIiLCJidG5DbGVhckNvbnRlbnQiLCJjbGVhckNvbnRlbnQiLCJjbGVhckF0dHIiLCJzaG93QWxsIiwiaXMiLCJzZXRWYWx1ZSIsIl92YWx1ZSIsImF0dHJCdG4iLCJudW1iZXIiLCJudW1iZXJTdGFydCIsIm51bWJlckVuZCIsImlucHV0U3RhcnQiLCJpbnB1dEVuZCIsInN0YXJ0QXR0ciIsImVuZEF0dHIiLCJhdHRyU3RhcnQiLCJhdHRyRW5kIiwiZGF0ZSIsImRhdGV0aW1lIiwiZGF0ZV9tb250aCIsImRhdGVfcmFuZ2UiLCJkYXRlU3RhcnQiLCJkYXRlRW5kIiwic3RhcnRFbmQiLCJkYXRldGltZV9yYW5nZSIsImNoZWNrYm94IiwiX2NsYXNzIiwiaW5wdXRzIiwib3B0aW9uIiwiY2hlY2tlZCIsInJhZGlvIiwic2VsZWN0Iiwic2VsZWN0T3B0aW9ucyIsInN0eWxlIiwiX2J1aWxkT3B0aW9uIiwicmVuZGVyQXR0ciIsImdyb3VwQXR0ciIsImdyb3VwT3B0aW9ucyIsImdyb3VwT3B0aW9uIiwib3B0aW9uQXR0ciIsIm9wdGlvblRleHQiLCJpdGVtVmFsdWUiLCJ2YWx1ZVkiLCJ2YWx1ZVN0YXJ0IiwidmFsdWVFbmQiLCJzZWFyY2hDb250YWluZXIiLCJjaGVja2VkQWxsIiwiZm9ybWF0IiwiX3N0clBhZExlZnQiLCJnZXRGdWxsWWVhciIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsInJlcGVhdCIsImdldEhvdXJzIiwiZ2V0TWludXRlcyIsImdldFNlY29uZHMiLCJudW1iZXJzIiwiQ29yZVVJIiwiX21lcmdlQXR0ciIsInNlbGVjdHMiLCJzdG9wUHJvcGFnYXRpb24iLCJyZWNvcmRJbmRleCIsInZhbHVlTiIsIm9uQ2hhbmdlIiwiY29udGFpbmVycyIsImlzQ2hlY2tlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQ0FBQyxVQUFTQSxDQUFDLEVBQUM7RUFBQyxJQUFHLE9BQU9DLE9BQU8sS0FBRyxRQUFRLElBQUUsT0FBT0MsTUFBTSxLQUFHLFdBQVcsRUFBQztJQUFDQSxNQUFNLENBQUNELE9BQU8sR0FBQ0QsQ0FBQyxFQUFFO0dBQUMsTUFBSyxJQUFHLE9BQU9HLE1BQU0sS0FBRyxVQUFVLElBQUVBLE1BQU0sQ0FBQ0MsR0FBRyxFQUFDO0lBQUNELE1BQU0sQ0FBQyxFQUFFLEVBQUNILENBQUMsQ0FBQztHQUFDLE1BQUk7SUFBQyxJQUFJSyxDQUFDO0lBQUMsSUFBRyxPQUFPQyxNQUFNLEtBQUcsV0FBVyxFQUFDO01BQUNELENBQUMsR0FBQ0MsTUFBTTtLQUFDLE1BQUssSUFBRyxPQUFPQyxNQUFNLEtBQUcsV0FBVyxFQUFDO01BQUNGLENBQUMsR0FBQ0UsTUFBTTtLQUFDLE1BQUssSUFBRyxPQUFPQyxJQUFJLEtBQUcsV0FBVyxFQUFDO01BQUNILENBQUMsR0FBQ0csSUFBSTtLQUFDLE1BQUk7TUFBQ0gsQ0FBQyxHQUFDLElBQUk7O0lBQUNBLENBQUMsQ0FBQ0ksR0FBRyxHQUFDVCxDQUFDLEVBQUU7O0NBQUUsRUFBRSxZQUFVO0VBQUMsQUFBMEIsT0FBTyxZQUFVO0lBQUMsU0FBU1UsQ0FBQ0EsQ0FBQ0MsQ0FBQyxFQUFDQyxDQUFDLEVBQUNDLENBQUMsRUFBQztNQUFDLFNBQVNDLENBQUNBLENBQUNDLENBQUMsRUFBQ2YsQ0FBQyxFQUFDO1FBQUMsSUFBRyxDQUFDWSxDQUFDLENBQUNHLENBQUMsQ0FBQyxFQUFDO1VBQUMsSUFBRyxDQUFDSixDQUFDLENBQUNJLENBQUMsQ0FBQyxFQUFDO1lBQUMsSUFBSUMsQ0FBQyxH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