
var CoreUI = typeof CoreUI !== 'undefined' ? CoreUI : {};

CoreUI.table = {

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
    create: function (options) {

        let instance = $.extend(true, {}, this.instance);
        instance._init(options instanceof Object ? options : {});

        let tableId = instance.getId();
        this._instances[tableId] = instance;

        return instance;
    },


    /**
     * @param {string} id
     * @returns {CoreUI.table.instance|null}
     */
    get: function (id) {

        if ( ! this._instances.hasOwnProperty(id)) {
            return null;
        }

        if ( ! $('#coreui-table-' + id)[0]) {
            delete this._instances[id];
            return null;
        }

        return this._instances[id];
    },


    /**
     * Объединение атрибутов
     * @param attr1
     * @param attr2
     * @returns {object}
     */
    _mergeAttr: function (attr1, attr2) {

        let mergeAttr = Object.assign({}, attr1);

        if (typeof attr2 === 'object') {
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
    _isNumeric: function(num) {
        return (typeof(num) === 'number' || typeof(num) === "string" && num.trim() !== '') && ! isNaN(num);
    },


    /**
     * @returns {string}
     * @private
     */
    _hashCode: function() {
        return this._crc32((new Date().getTime() + Math.random()).toString()).toString(16);
    },


    /**
     * @param str
     * @returns {number}
     * @private
     */
    _crc32: function (str) {

        for (var a, o = [], c = 0; c < 256; c++) {
            a = c;
            for (var f = 0; f < 8; f++) {
                a = 1 & a ? 3988292384 ^ a >>> 1 : a >>> 1
            }
            o[c] = a
        }

        for (var n = -1, t = 0; t < str.length; t++) {
            n = n >>> 8 ^ o[255 & (n ^ str.charCodeAt(t))]
        }

        return (-1 ^ n) >>> 0;
    }
};
(function() {"use strict";(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ejs=f()}})(function(){var define,module,exports;return function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r}()({1:[function(require,module,exports){"use strict";var fs=require("fs");var path=require("path");var utils=require("./utils");var scopeOptionWarned=false;var _VERSION_STRING=require("../package.json").version;var _DEFAULT_OPEN_DELIMITER="<";var _DEFAULT_CLOSE_DELIMITER=">";var _DEFAULT_DELIMITER="%";var _DEFAULT_LOCALS_NAME="locals";var _NAME="ejs";var _REGEX_STRING="(<%%|%%>|<%=|<%-|<%_|<%#|<%|%>|-%>|_%>)";var _OPTS_PASSABLE_WITH_DATA=["delimiter","scope","context","debug","compileDebug","client","_with","rmWhitespace","strict","filename","async"];var _OPTS_PASSABLE_WITH_DATA_EXPRESS=_OPTS_PASSABLE_WITH_DATA.concat("cache");var _BOM=/^\uFEFF/;var _JS_IDENTIFIER=/^[a-zA-Z_$][0-9a-zA-Z_$]*$/;exports.cache=utils.cache;exports.fileLoader=fs.readFileSync;exports.localsName=_DEFAULT_LOCALS_NAME;exports.promiseImpl=new Function("return this;")().Promise;exports.resolveInclude=function(name,filename,isDir){var dirname=path.dirname;var extname=path.extname;var resolve=path.resolve;var includePath=resolve(isDir?filename:dirname(filename),name);var ext=extname(name);if(!ext){includePath+=".ejs"}return includePath};function resolvePaths(name,paths){var filePath;if(paths.some(function(v){filePath=exports.resolveInclude(name,v,true);return fs.existsSync(filePath)})){return filePath}}function getIncludePath(path,options){var includePath;var filePath;var views=options.views;var match=/^[A-Za-z]+:\\|^\//.exec(path);if(match&&match.length){path=path.replace(/^\/*/,"");if(Array.isArray(options.root)){includePath=resolvePaths(path,options.root)}else{includePath=exports.resolveInclude(path,options.root||"/",true)}}else{if(options.filename){filePath=exports.resolveInclude(path,options.filename);if(fs.existsSync(filePath)){includePath=filePath}}if(!includePath&&Array.isArray(views)){includePath=resolvePaths(path,views)}if(!includePath&&typeof options.includer!=="function"){throw new Error('Could not find the include file "'+options.escapeFunction(path)+'"')}}return includePath}function handleCache(options,template){var func;var filename=options.filename;var hasTemplate=arguments.length>1;if(options.cache){if(!filename){throw new Error("cache option requires a filename")}func=exports.cache.get(filename);if(func){return func}if(!hasTemplate){template=fileLoader(filename).toString().replace(_BOM,"")}}else if(!hasTemplate){if(!filename){throw new Error("Internal EJS error: no file name or template "+"provided")}template=fileLoader(filename).toString().replace(_BOM,"")}func=exports.compile(template,options);if(options.cache){exports.cache.set(filename,func)}return func}function tryHandleCache(options,data,cb){var result;if(!cb){if(typeof exports.promiseImpl=="function"){return new exports.promiseImpl(function(resolve,reject){try{result=handleCache(options)(data);resolve(result)}catch(err){reject(err)}})}else{throw new Error("Please provide a callback function")}}else{try{result=handleCache(options)(data)}catch(err){return cb(err)}cb(null,result)}}function fileLoader(filePath){return exports.fileLoader(filePath)}function includeFile(path,options){var opts=utils.shallowCopy(utils.createNullProtoObjWherePossible(),options);opts.filename=getIncludePath(path,opts);if(typeof options.includer==="function"){var includerResult=options.includer(path,opts.filename);if(includerResult){if(includerResult.filename){opts.filename=includerResult.filename}if(includerResult.template){return handleCache(opts,includerResult.template)}}}return handleCache(opts)}function rethrow(err,str,flnm,lineno,esc){var lines=str.split("\n");var start=Math.max(lineno-3,0);var end=Math.min(lines.length,lineno+3);var filename=esc(flnm);var context=lines.slice(start,end).map(function(line,i){var curr=i+start+1;return(curr==lineno?" >> ":"    ")+curr+"| "+line}).join("\n");err.path=filename;err.message=(filename||"ejs")+":"+lineno+"\n"+context+"\n\n"+err.message;throw err}function stripSemi(str){return str.replace(/;(\s*$)/,"$1")}exports.compile=function compile(template,opts){var templ;if(opts&&opts.scope){if(!scopeOptionWarned){console.warn("`scope` option is deprecated and will be removed in EJS 3");scopeOptionWarned=true}if(!opts.context){opts.context=opts.scope}delete opts.scope}templ=new Template(template,opts);return templ.compile()};exports.render=function(template,d,o){var data=d||utils.createNullProtoObjWherePossible();var opts=o||utils.createNullProtoObjWherePossible();if(arguments.length==2){utils.shallowCopyFromList(opts,data,_OPTS_PASSABLE_WITH_DATA)}return handleCache(opts,template)(data)};exports.renderFile=function(){var args=Array.prototype.slice.call(arguments);var filename=args.shift();var cb;var opts={filename:filename};var data;var viewOpts;if(typeof arguments[arguments.length-1]=="function"){cb=args.pop()}if(args.length){data=args.shift();if(args.length){utils.shallowCopy(opts,args.pop())}else{if(data.settings){if(data.settings.views){opts.views=data.settings.views}if(data.settings["view cache"]){opts.cache=true}viewOpts=data.settings["view options"];if(viewOpts){utils.shallowCopy(opts,viewOpts)}}utils.shallowCopyFromList(opts,data,_OPTS_PASSABLE_WITH_DATA_EXPRESS)}opts.filename=filename}else{data=utils.createNullProtoObjWherePossible()}return tryHandleCache(opts,data,cb)};exports.Template=Template;exports.clearCache=function(){exports.cache.reset()};function Template(text,opts){opts=opts||utils.createNullProtoObjWherePossible();var options=utils.createNullProtoObjWherePossible();this.templateText=text;this.mode=null;this.truncate=false;this.currentLine=1;this.source="";options.client=opts.client||false;options.escapeFunction=opts.escape||opts.escapeFunction||utils.escapeXML;options.compileDebug=opts.compileDebug!==false;options.debug=!!opts.debug;options.filename=opts.filename;options.openDelimiter=opts.openDelimiter||exports.openDelimiter||_DEFAULT_OPEN_DELIMITER;options.closeDelimiter=opts.closeDelimiter||exports.closeDelimiter||_DEFAULT_CLOSE_DELIMITER;options.delimiter=opts.delimiter||exports.delimiter||_DEFAULT_DELIMITER;options.strict=opts.strict||false;options.context=opts.context;options.cache=opts.cache||false;options.rmWhitespace=opts.rmWhitespace;options.root=opts.root;options.includer=opts.includer;options.outputFunctionName=opts.outputFunctionName;options.localsName=opts.localsName||exports.localsName||_DEFAULT_LOCALS_NAME;options.views=opts.views;options.async=opts.async;options.destructuredLocals=opts.destructuredLocals;options.legacyInclude=typeof opts.legacyInclude!="undefined"?!!opts.legacyInclude:true;if(options.strict){options._with=false}else{options._with=typeof opts._with!="undefined"?opts._with:true}this.opts=options;this.regex=this.createRegex()}Template.modes={EVAL:"eval",ESCAPED:"escaped",RAW:"raw",COMMENT:"comment",LITERAL:"literal"};Template.prototype={createRegex:function(){var str=_REGEX_STRING;var delim=utils.escapeRegExpChars(this.opts.delimiter);var open=utils.escapeRegExpChars(this.opts.openDelimiter);var close=utils.escapeRegExpChars(this.opts.closeDelimiter);str=str.replace(/%/g,delim).replace(/</g,open).replace(/>/g,close);return new RegExp(str)},compile:function(){var src;var fn;var opts=this.opts;var prepended="";var appended="";var escapeFn=opts.escapeFunction;var ctor;var sanitizedFilename=opts.filename?JSON.stringify(opts.filename):"undefined";if(!this.source){this.generateSource();prepended+='  var __output = "";\n'+"  function __append(s) { if (s !== undefined && s !== null) __output += s }\n";if(opts.outputFunctionName){if(!_JS_IDENTIFIER.test(opts.outputFunctionName)){throw new Error("outputFunctionName is not a valid JS identifier.")}prepended+="  var "+opts.outputFunctionName+" = __append;"+"\n"}if(opts.localsName&&!_JS_IDENTIFIER.test(opts.localsName)){throw new Error("localsName is not a valid JS identifier.")}if(opts.destructuredLocals&&opts.destructuredLocals.length){var destructuring="  var __locals = ("+opts.localsName+" || {}),\n";for(var i=0;i<opts.destructuredLocals.length;i++){var name=opts.destructuredLocals[i];if(!_JS_IDENTIFIER.test(name)){throw new Error("destructuredLocals["+i+"] is not a valid JS identifier.")}if(i>0){destructuring+=",\n  "}destructuring+=name+" = __locals."+name}prepended+=destructuring+";\n"}if(opts._with!==false){prepended+="  with ("+opts.localsName+" || {}) {"+"\n";appended+="  }"+"\n"}appended+="  return __output;"+"\n";this.source=prepended+this.source+appended}if(opts.compileDebug){src="var __line = 1"+"\n"+"  , __lines = "+JSON.stringify(this.templateText)+"\n"+"  , __filename = "+sanitizedFilename+";"+"\n"+"try {"+"\n"+this.source+"} catch (e) {"+"\n"+"  rethrow(e, __lines, __filename, __line, escapeFn);"+"\n"+"}"+"\n"}else{src=this.source}if(opts.client){src="escapeFn = escapeFn || "+escapeFn.toString()+";"+"\n"+src;if(opts.compileDebug){src="rethrow = rethrow || "+rethrow.toString()+";"+"\n"+src}}if(opts.strict){src='"use strict";\n'+src}if(opts.debug){console.log(src)}if(opts.compileDebug&&opts.filename){src=src+"\n"+"//# sourceURL="+sanitizedFilename+"\n"}try{if(opts.async){try{ctor=new Function("return (async function(){}).constructor;")()}catch(e){if(e instanceof SyntaxError){throw new Error("This environment does not support async/await")}else{throw e}}}else{ctor=Function}fn=new ctor(opts.localsName+", escapeFn, include, rethrow",src)}catch(e){if(e instanceof SyntaxError){if(opts.filename){e.message+=" in "+opts.filename}e.message+=" while compiling ejs\n\n";e.message+="If the above error is not helpful, you may want to try EJS-Lint:\n";e.message+="https://github.com/RyanZim/EJS-Lint";if(!opts.async){e.message+="\n";e.message+="Or, if you meant to create an async function, pass `async: true` as an option."}}throw e}var returnedFn=opts.client?fn:function anonymous(data){var include=function(path,includeData){var d=utils.shallowCopy(utils.createNullProtoObjWherePossible(),data);if(includeData){d=utils.shallowCopy(d,includeData)}return includeFile(path,opts)(d)};return fn.apply(opts.context,[data||utils.createNullProtoObjWherePossible(),escapeFn,include,rethrow])};if(opts.filename&&typeof Object.defineProperty==="function"){var filename=opts.filename;var basename=path.basename(filename,path.extname(filename));try{Object.defineProperty(returnedFn,"name",{value:basename,writable:false,enumerable:false,configurable:true})}catch(e){}}return returnedFn},generateSource:function(){var opts=this.opts;if(opts.rmWhitespace){this.templateText=this.templateText.replace(/[\r\n]+/g,"\n").replace(/^\s+|\s+$/gm,"")}this.templateText=this.templateText.replace(/[ \t]*<%_/gm,"<%_").replace(/_%>[ \t]*/gm,"_%>");var self=this;var matches=this.parseTemplateText();var d=this.opts.delimiter;var o=this.opts.openDelimiter;var c=this.opts.closeDelimiter;if(matches&&matches.length){matches.forEach(function(line,index){var closing;if(line.indexOf(o+d)===0&&line.indexOf(o+d+d)!==0){closing=matches[index+2];if(!(closing==d+c||closing=="-"+d+c||closing=="_"+d+c)){throw new Error('Could not find matching close tag for "'+line+'".')}}self.scanLine(line)})}},parseTemplateText:function(){var str=this.templateText;var pat=this.regex;var result=pat.exec(str);var arr=[];var firstPos;while(result){firstPos=result.index;if(firstPos!==0){arr.push(str.substring(0,firstPos));str=str.slice(firstPos)}arr.push(result[0]);str=str.slice(result[0].length);result=pat.exec(str)}if(str){arr.push(str)}return arr},_addOutput:function(line){if(this.truncate){line=line.replace(/^(?:\r\n|\r|\n)/,"");this.truncate=false}if(!line){return line}line=line.replace(/\\/g,"\\\\");line=line.replace(/\n/g,"\\n");line=line.replace(/\r/g,"\\r");line=line.replace(/"/g,'\\"');this.source+='    ; __append("'+line+'")'+"\n"},scanLine:function(line){var self=this;var d=this.opts.delimiter;var o=this.opts.openDelimiter;var c=this.opts.closeDelimiter;var newLineCount=0;newLineCount=line.split("\n").length-1;switch(line){case o+d:case o+d+"_":this.mode=Template.modes.EVAL;break;case o+d+"=":this.mode=Template.modes.ESCAPED;break;case o+d+"-":this.mode=Template.modes.RAW;break;case o+d+"#":this.mode=Template.modes.COMMENT;break;case o+d+d:this.mode=Template.modes.LITERAL;this.source+='    ; __append("'+line.replace(o+d+d,o+d)+'")'+"\n";break;case d+d+c:this.mode=Template.modes.LITERAL;this.source+='    ; __append("'+line.replace(d+d+c,d+c)+'")'+"\n";break;case d+c:case"-"+d+c:case"_"+d+c:if(this.mode==Template.modes.LITERAL){this._addOutput(line)}this.mode=null;this.truncate=line.indexOf("-")===0||line.indexOf("_")===0;break;default:if(this.mode){switch(this.mode){case Template.modes.EVAL:case Template.modes.ESCAPED:case Template.modes.RAW:if(line.lastIndexOf("//")>line.lastIndexOf("\n")){line+="\n"}}switch(this.mode){case Template.modes.EVAL:this.source+="    ; "+line+"\n";break;case Template.modes.ESCAPED:this.source+="    ; __append(escapeFn("+stripSemi(line)+"))"+"\n";break;case Template.modes.RAW:this.source+="    ; __append("+stripSemi(line)+")"+"\n";break;case Template.modes.COMMENT:break;case Template.modes.LITERAL:this._addOutput(line);break}}else{this._addOutput(line)}}if(self.opts.compileDebug&&newLineCount){this.currentLine+=newLineCount;this.source+="    ; __line = "+this.currentLine+"\n"}}};exports.escapeXML=utils.escapeXML;exports.__express=exports.renderFile;exports.VERSION=_VERSION_STRING;exports.name=_NAME;if(typeof window!="undefined"){window.ejs=exports}},{"../package.json":6,"./utils":2,fs:3,path:4}],2:[function(require,module,exports){"use strict";var regExpChars=/[|\\{}()[\]^$+*?.]/g;var hasOwnProperty=Object.prototype.hasOwnProperty;var hasOwn=function(obj,key){return hasOwnProperty.apply(obj,[key])};exports.escapeRegExpChars=function(string){if(!string){return""}return String(string).replace(regExpChars,"\\$&")};var _ENCODE_HTML_RULES={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&#34;","'":"&#39;"};var _MATCH_HTML=/[&<>'"]/g;function encode_char(c){return _ENCODE_HTML_RULES[c]||c}var escapeFuncStr="var _ENCODE_HTML_RULES = {\n"+'      "&": "&amp;"\n'+'    , "<": "&lt;"\n'+'    , ">": "&gt;"\n'+'    , \'"\': "&#34;"\n'+'    , "\'": "&#39;"\n'+"    }\n"+"  , _MATCH_HTML = /[&<>'\"]/g;\n"+"function encode_char(c) {\n"+"  return _ENCODE_HTML_RULES[c] || c;\n"+"};\n";exports.escapeXML=function(markup){return markup==undefined?"":String(markup).replace(_MATCH_HTML,encode_char)};function escapeXMLToString(){return Function.prototype.toString.call(this)+";\n"+escapeFuncStr}try{if(typeof Object.defineProperty==="function"){Object.defineProperty(exports.escapeXML,"toString",{value:escapeXMLToString})}else{exports.escapeXML.toString=escapeXMLToString}}catch(err){console.warn("Unable to set escapeXML.toString (is the Function prototype frozen?)")}exports.shallowCopy=function(to,from){from=from||{};if(to!==null&&to!==undefined){for(var p in from){if(!hasOwn(from,p)){continue}if(p==="__proto__"||p==="constructor"){continue}to[p]=from[p]}}return to};exports.shallowCopyFromList=function(to,from,list){list=list||[];from=from||{};if(to!==null&&to!==undefined){for(var i=0;i<list.length;i++){var p=list[i];if(typeof from[p]!="undefined"){if(!hasOwn(from,p)){continue}if(p==="__proto__"||p==="constructor"){continue}to[p]=from[p]}}}return to};exports.cache={_data:{},set:function(key,val){this._data[key]=val},get:function(key){return this._data[key]},remove:function(key){delete this._data[key]},reset:function(){this._data={}}};exports.hyphenToCamel=function(str){return str.replace(/-[a-z]/g,function(match){return match[1].toUpperCase()})};exports.createNullProtoObjWherePossible=function(){if(typeof Object.create=="function"){return function(){return Object.create(null)}}if(!({__proto__:null}instanceof Object)){return function(){return{__proto__:null}}}return function(){return{}}}()},{}],3:[function(require,module,exports){},{}],4:[function(require,module,exports){(function(process){function normalizeArray(parts,allowAboveRoot){var up=0;for(var i=parts.length-1;i>=0;i--){var last=parts[i];if(last==="."){parts.splice(i,1)}else if(last===".."){parts.splice(i,1);up++}else if(up){parts.splice(i,1);up--}}if(allowAboveRoot){for(;up--;up){parts.unshift("..")}}return parts}exports.resolve=function(){var resolvedPath="",resolvedAbsolute=false;for(var i=arguments.length-1;i>=-1&&!resolvedAbsolute;i--){var path=i>=0?arguments[i]:process.cwd();if(typeof path!=="string"){throw new TypeError("Arguments to path.resolve must be strings")}else if(!path){continue}resolvedPath=path+"/"+resolvedPath;resolvedAbsolute=path.charAt(0)==="/"}resolvedPath=normalizeArray(filter(resolvedPath.split("/"),function(p){return!!p}),!resolvedAbsolute).join("/");return(resolvedAbsolute?"/":"")+resolvedPath||"."};exports.normalize=function(path){var isAbsolute=exports.isAbsolute(path),trailingSlash=substr(path,-1)==="/";path=normalizeArray(filter(path.split("/"),function(p){return!!p}),!isAbsolute).join("/");if(!path&&!isAbsolute){path="."}if(path&&trailingSlash){path+="/"}return(isAbsolute?"/":"")+path};exports.isAbsolute=function(path){return path.charAt(0)==="/"};exports.join=function(){var paths=Array.prototype.slice.call(arguments,0);return exports.normalize(filter(paths,function(p,index){if(typeof p!=="string"){throw new TypeError("Arguments to path.join must be strings")}return p}).join("/"))};exports.relative=function(from,to){from=exports.resolve(from).substr(1);to=exports.resolve(to).substr(1);function trim(arr){var start=0;for(;start<arr.length;start++){if(arr[start]!=="")break}var end=arr.length-1;for(;end>=0;end--){if(arr[end]!=="")break}if(start>end)return[];return arr.slice(start,end-start+1)}var fromParts=trim(from.split("/"));var toParts=trim(to.split("/"));var length=Math.min(fromParts.length,toParts.length);var samePartsLength=length;for(var i=0;i<length;i++){if(fromParts[i]!==toParts[i]){samePartsLength=i;break}}var outputParts=[];for(var i=samePartsLength;i<fromParts.length;i++){outputParts.push("..")}outputParts=outputParts.concat(toParts.slice(samePartsLength));return outputParts.join("/")};exports.sep="/";exports.delimiter=":";exports.dirname=function(path){if(typeof path!=="string")path=path+"";if(path.length===0)return".";var code=path.charCodeAt(0);var hasRoot=code===47;var end=-1;var matchedSlash=true;for(var i=path.length-1;i>=1;--i){code=path.charCodeAt(i);if(code===47){if(!matchedSlash){end=i;break}}else{matchedSlash=false}}if(end===-1)return hasRoot?"/":".";if(hasRoot&&end===1){return"/"}return path.slice(0,end)};function basename(path){if(typeof path!=="string")path=path+"";var start=0;var end=-1;var matchedSlash=true;var i;for(i=path.length-1;i>=0;--i){if(path.charCodeAt(i)===47){if(!matchedSlash){start=i+1;break}}else if(end===-1){matchedSlash=false;end=i+1}}if(end===-1)return"";return path.slice(start,end)}exports.basename=function(path,ext){var f=basename(path);if(ext&&f.substr(-1*ext.length)===ext){f=f.substr(0,f.length-ext.length)}return f};exports.extname=function(path){if(typeof path!=="string")path=path+"";var startDot=-1;var startPart=0;var end=-1;var matchedSlash=true;var preDotState=0;for(var i=path.length-1;i>=0;--i){var code=path.charCodeAt(i);if(code===47){if(!matchedSlash){startPart=i+1;break}continue}if(end===-1){matchedSlash=false;end=i+1}if(code===46){if(startDot===-1)startDot=i;else if(preDotState!==1)preDotState=1}else if(startDot!==-1){preDotState=-1}}if(startDot===-1||end===-1||preDotState===0||preDotState===1&&startDot===end-1&&startDot===startPart+1){return""}return path.slice(startDot,end)};function filter(xs,f){if(xs.filter)return xs.filter(f);var res=[];for(var i=0;i<xs.length;i++){if(f(xs[i],i,xs))res.push(xs[i])}return res}var substr="ab".substr(-1)==="b"?function(str,start,len){return str.substr(start,len)}:function(str,start,len){if(start<0)start=str.length+start;return str.substr(start,len)}}).call(this,require("_process"))},{_process:5}],5:[function(require,module,exports){var process=module.exports={};var cachedSetTimeout;var cachedClearTimeout;function defaultSetTimout(){throw new Error("setTimeout has not been defined")}function defaultClearTimeout(){throw new Error("clearTimeout has not been defined")}(function(){try{if(typeof setTimeout==="function"){cachedSetTimeout=setTimeout}else{cachedSetTimeout=defaultSetTimout}}catch(e){cachedSetTimeout=defaultSetTimout}try{if(typeof clearTimeout==="function"){cachedClearTimeout=clearTimeout}else{cachedClearTimeout=defaultClearTimeout}}catch(e){cachedClearTimeout=defaultClearTimeout}})();function runTimeout(fun){if(cachedSetTimeout===setTimeout){return setTimeout(fun,0)}if((cachedSetTimeout===defaultSetTimout||!cachedSetTimeout)&&setTimeout){cachedSetTimeout=setTimeout;return setTimeout(fun,0)}try{return cachedSetTimeout(fun,0)}catch(e){try{return cachedSetTimeout.call(null,fun,0)}catch(e){return cachedSetTimeout.call(this,fun,0)}}}function runClearTimeout(marker){if(cachedClearTimeout===clearTimeout){return clearTimeout(marker)}if((cachedClearTimeout===defaultClearTimeout||!cachedClearTimeout)&&clearTimeout){cachedClearTimeout=clearTimeout;return clearTimeout(marker)}try{return cachedClearTimeout(marker)}catch(e){try{return cachedClearTimeout.call(null,marker)}catch(e){return cachedClearTimeout.call(this,marker)}}}var queue=[];var draining=false;var currentQueue;var queueIndex=-1;function cleanUpNextTick(){if(!draining||!currentQueue){return}draining=false;if(currentQueue.length){queue=currentQueue.concat(queue)}else{queueIndex=-1}if(queue.length){drainQueue()}}function drainQueue(){if(draining){return}var timeout=runTimeout(cleanUpNextTick);draining=true;var len=queue.length;while(len){currentQueue=queue;queue=[];while(++queueIndex<len){if(currentQueue){currentQueue[queueIndex].run()}}queueIndex=-1;len=queue.length}currentQueue=null;draining=false;runClearTimeout(timeout)}process.nextTick=function(fun){var args=new Array(arguments.length-1);if(arguments.length>1){for(var i=1;i<arguments.length;i++){args[i-1]=arguments[i]}}queue.push(new Item(fun,args));if(queue.length===1&&!draining){runTimeout(drainQueue)}};function Item(fun,array){this.fun=fun;this.array=array}Item.prototype.run=function(){this.fun.apply(null,this.array)};process.title="browser";process.browser=true;process.env={};process.argv=[];process.version="";process.versions={};function noop(){}process.on=noop;process.addListener=noop;process.once=noop;process.off=noop;process.removeListener=noop;process.removeAllListeners=noop;process.emit=noop;process.prependListener=noop;process.prependOnceListener=noop;process.listeners=function(name){return[]};process.binding=function(name){throw new Error("process.binding is not supported")};process.cwd=function(){return"/"};process.chdir=function(dir){throw new Error("process.chdir is not supported")};process.umask=function(){return 0}},{}],6:[function(require,module,exports){module.exports={name:"ejs",description:"Embedded JavaScript templates",keywords:["template","engine","ejs"],version:"3.1.8",author:"Matthew Eernisse <mde@fleegix.org> (http://fleegix.org)",license:"Apache-2.0",bin:{ejs:"./bin/cli.js"},main:"./lib/ejs.js",jsdelivr:"ejs.min.js",unpkg:"ejs.min.js",repository:{type:"git",url:"git://github.com/mde/ejs.git"},bugs:"https://github.com/mde/ejs/issues",homepage:"https://github.com/mde/ejs",dependencies:{jake:"^10.8.5"},devDependencies:{browserify:"^16.5.1",eslint:"^6.8.0","git-directory-deploy":"^1.5.1",jsdoc:"^4.0.2","lru-cache":"^4.0.1",mocha:"^10.2.0","uglify-js":"^3.3.16"},engines:{node:">=0.10.0"},scripts:{test:"mocha -u tdd"}}},{}]},{},[1])(1)});
;CoreUI.table.ejs = ejs;})();;

CoreUI.table.instance = {

    _options: {
        id: null,
        class: '',
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
        recordsPerPageList: [ 25, 50, 100, 1000 ], // 0 - all
        pageParam: 'page',
        recordsPerPageParam: 'count',
        method: 'GET',
        url: null,  // '/mod/index/orders/?page=[page]'
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
    _init: function (options) {

        this._options = $.extend(true, {}, this._options, options);
        this._events  = {};


        if ( ! this._options.id) {
            this._options.id = CoreUI.table._hashCode();
        }

        if (this._options.page > 0) {
            this._page = this._options.page;
        }
        if (this._options.recordsPerPage > 0) {
            this._recordsPerPage = this._options.recordsPerPage;
        }

        let that = this;


        // Инициализация колонок
        if (typeof this._options.columns === 'object' &&
            Array.isArray(this._options.columns) &&
            this._options.columns.length > 0
        ) {
            $.each(this._options.columns, function (key, column) {
                if (typeof column.type === 'undefined' ||
                    ! CoreUI.table.columns.hasOwnProperty(column.type)
                ) {
                    column.type = 'text';
                }

                let columnInstance = $.extend(true, {}, CoreUI.table.columns[column.type]);
                columnInstance.init(that, column);
                that._columns.push(columnInstance);
            });
        }
    },


    /**
     *
     */
    initEvents: function () {

        let that         = this;
        let tableWrapper = '#coreui-table-' + this._options.id + ' > .coreui-table__container > .coreui-table__wrapper';

        // Показ строк
        this.on('show-records.coreui.table', function () {

            // Переход по ссылке
            if (typeof that._options.onClickUrl === 'string' && that._options.onClickUrl) {
                $(tableWrapper + ' > table > tbody > tr.coreui-table__record').click(function () {
                    let recordKey = $(this).data('record-key');
                    let record    = that._getRecordByKey(recordKey);

                    if ( ! record) {
                        return;
                    }

                    let url = that._options.onClickUrl;

                    $.each(record, function (field, value) {
                        let fieldQuote = field.replace(/([^\w\d])/g, '\\$1');
                        url = url.replace(
                            new RegExp('\\[' + fieldQuote + '\\]', 'g'),
                            value
                        );
                    });

                    if (url && url !== '#') {
                        location.href = url;
                    }
                });
            }

            // Событие нажатия на строку
            if (typeof that._options.onClick === 'function') {
                $(tableWrapper + ' > table > tbody > tr.coreui-table__record').click(function (event) {
                    let recordKey = $(this).data('record-key');
                    let record    = that._getRecordByKey(recordKey);

                    if ( ! record) {
                        return;
                    }

                    that._options.onClick(event, record);
                });
            }

            // Фиксация колонок
            let colOffset = 0;
            $(tableWrapper + ' > table > thead > tr:last-child > td.coreui-table__fixed_left').each(function () {
                let index  = $(this).index() + 1;

                if (index !== 1) {
                    $(tableWrapper + ' > table > thead > tr:last-child > td:nth-child(' + index + ')').css('left', colOffset + 'px');
                    $(tableWrapper + ' > table > tbody > tr > td:nth-child(' + index + ')').css('left', colOffset + 'px');
                }

                colOffset += $(this).outerWidth();
            });

            colOffset = 0;
            $($(tableWrapper + ' > table > thead > tr:last-child > td.coreui-table__fixed_right').get().reverse()).each(function () {
                let index  = $(this).index() + 1;

                if (index !== 1) {
                    $(tableWrapper + ' > table > thead > tr:last-child > td:nth-child(' + index + ')').css('right', colOffset + 'px');
                    $(tableWrapper + ' > table > tbody > tr > td:nth-child(' + index + ')').css('right', colOffset + 'px');
                }

                colOffset += $(this).outerWidth();
            });
        });



        // Страницы
        let btnPrev = $(tableWrapper + ' > table > tfoot > tr > td .coreui-table__page_prev')
        if (btnPrev[0]) {
            btnPrev.click(function () {
                if (that._page > 1) {
                    that.prevPage();
                }
            })
        }

        let btnNext = $(tableWrapper + ' > table > tfoot > tr > td .coreui-table__page_next')
        if (btnNext[0]) {
            btnNext.click(function () {
                that.nextPage();
            })
        }

        let inputGoPage = $(tableWrapper + ' > table > tfoot > tr > td .coreui-table__page_go_container input');
        let btnGoPage   = $(tableWrapper + ' > table > tfoot > tr > td .coreui-table__page_go')
        if (btnGoPage[0]) {
            btnGoPage.click(function () {
                that.goPage(inputGoPage.val());
            });
            inputGoPage.keyup(function (event) {
                event;
            });
        }

        let selectPerPage = $(tableWrapper + ' > table > tfoot > tr > td .coreui-table__pages_list_container select');
        if (selectPerPage[0]) {
            selectPerPage.change(function () {
                that._page           = 1;
                that._recordsPerPage = selectPerPage.val();
                that.reload();
            });
        }



        this._trigger('shown.coreui.table');

        // Вызов события показа строк
        if (( ! this._options.url || this._options.url === '#') &&
            typeof this._options.records === 'object' &&
            Array.isArray(this._options.records) &&
            this._options.records.length > 0
        ) {
            this._trigger('show-records.coreui.table', this, [ this ]);
        }
    },


    /**
     *
     * @returns {*}
     */
    getId: function () {
        return this._options.id;
    },


    /**
     *
     * @param element
     * @returns {*}
     */
    render: function(element) {

        let that        = this;
        let widthSizes  = [];
        let heightSizes = [];
        let htmlRecords = '';
        let render      = {
            controls: [],
            columnsHeader: [],
            columns: [],
            columnGroups: [],
            records: [],
            footer: '',
            pages: '',
        };

        this._recordsTotal = this._options.records.length;


        if (this._options.width > 0) {
            let unit = typeof this._options.width === 'number' ? 'px' : '';
            widthSizes.push('width:' + this._options.width + unit);
        }

        if (this._options.minWidth > 0) {
            let unit = typeof this._options.minWidth === 'number' ? 'px' : '';
            widthSizes.push('min-width:' + this._options.minWidth + unit);
        }

        if (this._options.maxWidth > 0) {
            let unit = typeof this._options.maxWidth === 'number' ? 'px' : '';
            widthSizes.push('max-width:' + this._options.maxWidth + unit);
        }


        if (this._options.height > 0) {
            let unit = typeof this._options.height === 'number' ? 'px' : '';
            heightSizes.push('height:' + this._options.height + unit);
        }

        if (this._options.minHeight > 0) {
            let unit = typeof this._options.minHeight === 'number' ? 'px' : '';
            heightSizes.push('min-height:' + this._options.minHeight + unit);
        }

        if (this._options.maxHeight > 0) {
            let unit = typeof this._options.maxHeight === 'number' ? 'px' : '';
            heightSizes.push('max-height:' + this._options.maxHeight + unit);
        }



        // Элементы управления
        if (typeof this._options.controls === 'object' &&
            Array.isArray(this._options.controls) &&
            this._options.controls.length > 0
        ) {
            $.each(this._options.controls, function (key, control) {
                if (CoreUI.table.controls.hasOwnProperty(control.type)) {

                    let controlInstance = $.extend(true, {}, CoreUI.table.controls[control.type]);
                    controlInstance.init(that, control);

                    render.controls.push({
                        id: controlInstance.getId(),
                        content: controlInstance.render(),
                    });

                    that.on('shown.coreui.table', function () {
                        controlInstance.initEvents()
                    });
                }
            });
        }


        // Колонки
        if (this._columns.length > 0) {
            $.each(this._columns, function (key, column) {
                let columnOptions = column.getOptions();
                let attributes    = [];

                if (columnOptions.fixed && typeof columnOptions.fixed === 'string') {
                    columnOptions.attrHeader = CoreUI.table._mergeAttr(columnOptions.attrHeader, {
                        class: 'coreui-table__fixed_' + columnOptions.fixed
                    });

                    columnOptions.attr = CoreUI.table._mergeAttr(columnOptions.attr, {
                        class: 'coreui-table__fixed_' + columnOptions.fixed
                    });
                }

                if (columnOptions.attrHeader && typeof columnOptions.attrHeader === 'object') {
                    $.each(columnOptions.attrHeader, function (name, value) {
                        attributes.push(name + '="' + value + '"');
                    });
                }

                render.columnGroups.push({
                    width: columnOptions.hasOwnProperty('width') ? columnOptions.width : '',
                    unit: typeof columnOptions.width === 'number' ? 'px' : ''
                });

                render.columns.push({
                    attr: attributes.length > 0 ? (' ' + attributes.join(' ')) : '',
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
            if (typeof this._options.records === 'object' &&
                Array.isArray(this._options.records) &&
                this._options.records.length > 0
            ) {
                that._recordsTotal = this._options.records.length;

                $.each(this._options.records, function (key, record) {
                    render.records.push(that._renderRecord(record, key));
                    that._recordsNumber++;
                });

                htmlRecords = CoreUI.table.ejs.render(CoreUI.table.tpl['table-records.html'], {
                    records: render.records,
                });

            } else {
                htmlRecords = CoreUI.table.ejs.render(CoreUI.table.tpl['table-records-empty.html'], {
                    columnsCount: this._columns.length ? this._columns.length : 1,
                    lang: this._getLang(),
                });
            }
        }


        // Страницы
        if (typeof this._options.show === 'object' &&
            (this._options.show.pages ||
             this._options.show.pagesJump ||
             this._options.show.prePageList)
        ) {
            let totalPages = this._recordsTotal > 0 && this._recordsPerPage > 0
                ? Math.ceil(this._recordsTotal / this._recordsPerPage)
                : 1;

            if (this._options.recordsPerPageList.indexOf(this._recordsPerPage) < 0) {
                this._options.recordsPerPageList.unshift(this._recordsPerPage);
            }

            render.pages = CoreUI.table.ejs.render(CoreUI.table.tpl['table-pages.html'], {
                columnsCount: this._columns.length ? this._columns.length : 1,
                table: this._options,
                lang: this._getLang(),
                currentPage: this._page,
                pagesTotal: totalPages,
                prevPage: this._page > 1,
                nextPage: this._page < totalPages,
                recordsPerPage: this._recordsPerPage,
                recordsPerPageList: this._options.recordsPerPageList
            })
        }


        if (typeof this._options.columnGroups === 'object' &&
            Array.isArray(this._options.columnGroups) &&
            this._options.columnGroups.length > 0
        ) {
            let rows = [];

            $.each(this._options.columnGroups, function (key, headerRow) {
                if (typeof headerRow === 'object' && Array.isArray(headerRow)) {
                    let cells = [];

                    $.each(headerRow, function (key, headerColumn) {
                        if (typeof headerColumn === 'object' && ! Array.isArray(headerColumn)) {
                            let attributes = [];

                            if (headerColumn.attr && typeof headerColumn.attr === 'object') {
                                $.each(headerColumn.attr, function (name, value) {
                                    attributes.push(name + '="' + value + '"');
                                });
                            }

                            cells.push({
                                label: headerColumn.hasOwnProperty('label') ? headerColumn.label : '',
                                attr: attributes.length > 0 ? ' ' + attributes.join(' ') : '',
                            });
                        }
                    });

                    rows.push(
                        CoreUI.table.ejs.render(CoreUI.table.tpl['table-columns.html'], {
                            columns: cells,
                        })
                    );
                }
            });

            render.columnsHeader = rows.join('');
        }

        if (typeof this._options.footer === 'object' &&
            Array.isArray(this._options.footer) &&
            this._options.footer.length > 0
        ) {
            let rows = [];

            $.each(this._options.footer, function (key, footerRow) {
                if (typeof footerRow === 'object' && Array.isArray(footerRow)) {
                    let cells = [];

                    $.each(footerRow, function (key, footerColumn) {
                        if (typeof footerColumn === 'object' && ! Array.isArray(footerColumn)) {
                            let attributes = [];

                            if (footerColumn.attr && typeof footerColumn.attr === 'object') {
                                $.each(footerColumn.attr, function (name, value) {
                                    attributes.push(name + '="' + value + '"');
                                });
                            }

                            cells.push({
                                label: footerColumn.hasOwnProperty('label') ? footerColumn.label : '',
                                attr: attributes.length > 0 ? ' ' + attributes.join(' ') : '',
                            });
                        }
                    });

                    rows.push(
                        CoreUI.table.ejs.render(CoreUI.table.tpl['table-columns-footer.html'], {
                            columns: cells,
                        })
                    );
                }
            });

            render.footer = rows.join('');
        }


        let htmlColumns = CoreUI.table.ejs.render(CoreUI.table.tpl['table-columns.html'], {
            columns: render.columns,
        });


        let html = CoreUI.table.ejs.render(CoreUI.table.tpl['table.html'], {
            table: this._options,
            lang: this._getLang(),
            widthSizes: widthSizes,
            heightSizes: heightSizes,
            recordsTotal: this._recordsTotal,
            render: {
                columnGroups : render.columnGroups,
                columnsHeader : render.columnsHeader,
                controls : render.controls,
                columns  : htmlColumns,
                records  : htmlRecords,
                footer   : render.footer,
                pages   : render.pages,
            },
        });

        if (element === undefined) {
            return html;
        }

        // Dom element
        let domElement = {};

        if (typeof element === 'string') {
            domElement = document.getElementById(element);

            if ( ! domElement) {
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
    lock: function () {

        let container = $('#coreui-table-' + this._options.id + ' > .coreui-table__container');

        if (container[0] && ! container.find('.coreui-table-lock')[0]) {
            let html =  CoreUI.table.ejs.render(CoreUI.table.tpl['table-loader.html'], {
                lang: this._getLang()
            });

            container.prepend(html);
        }
    },


    /**
     *
     */
    unlock: function () {

        $('#coreui-table-' + this._options.id + ' > .coreui-table__container > .coreui-table-lock').hide(50, function () {
            $(this).remove()
        });
    },


    /**
     * Загрузка строк
     * @param {string} url
     * @param {string} method
     */
    load: function (url, method) {

        this.lock();

        let that   = this;
        let params = {};

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
            url += url.match(/\?/)
                ? '&' + $.param(params)
                : '?' + $.param(params);
        }

        $.ajax({
            url: url,
            method: method || 'GET',
            dataType: "json",
            beforeSend: function(xhr) {
                that._trigger('start-load-records.coreui.table', that, [ that, xhr ]);
            },
            success: function (result) {

                if (result.hasOwnProperty('records') &&
                    typeof result.records === 'object' &&
                    Array.isArray(result.records)
                ) {
                    let total = result.hasOwnProperty('total') && CoreUI.table._isNumeric(result.total) ? result.total : null;
                    that._viewRecords(result.records, total);

                } else {
                    that._viewRecords([]);
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                that._viewRecords([]);
                that._trigger('error-load-records.coreui.table', that, [ that, xhr, textStatus, errorThrown ]);
            },
            complete: function(xhr, textStatus) {
                that.unlock();
                that._trigger('end-load-records.coreui.table', that, [ that, xhr, textStatus ]);
            },
        });
    },


    /**
     * Перезагрузка записей в таблице
     */
    reload: function () {

        if (this._options.url && this._options.url !== '#') {
            this.load(this._options.url, this._options.method)
        }
    },


    /**
     * Выбор всех записей в таблице
     */
    selectAll: function () {

        let tableContainer = '#coreui-table-' + this._options.id + ' > .coreui-table__container > .coreui-table__wrapper > table';

        $(tableContainer + ' > thead > tr > td > .coreui-table__select-all').prop('checked', true);
        $(tableContainer + ' > tbody > tr.coreui-table__record').addClass('table-primary');
        $(tableContainer + ' > tbody > tr.coreui-table__record > td > .coreui-table__select').prop('checked', true);

        this._trigger('select-all.coreui.table', this);
    },


    /**
     * Отмена выбор всех записей в таблице
     */
    unselectAll: function () {

        let tableContainer = '#coreui-table-' + this._options.id + ' > .coreui-table__container > .coreui-table__wrapper > table';

        $(tableContainer + ' > thead > tr > td > .coreui-table__select-all').prop('checked', false);
        $(tableContainer + ' > tbody > tr.coreui-table__record').removeClass('table-primary');
        $(tableContainer + ' > tbody > tr.coreui-table__record > td.coreui-table__select_container > .coreui-table__select').prop('checked', false);

        this._trigger('unselect-all.coreui.table', this);
    },


    /**
     * Выбор записи в таблице
     * @param {string} primaryKey
     */
    selectRecord: function (primaryKey) {

        let recordItem = this._getRecordByPrimaryKey(primaryKey);

        if ( ! recordItem) {
            return;
        }

        let row = this._getRowByKey(recordItem.key);

        if ( ! row) {
            return;
        }

        $(row).addClass('table-primary');
        $('.coreui-table__select', row).prop('checked', true);

        this._trigger('select.coreui.table', this, [ recordItem.record ]);
    },


    /**
     * Отмена выбора записи в таблице
     * @param {string} primaryKey
     */
    unselectRecord: function (primaryKey) {

        let recordItem = this._getRecordByPrimaryKey(primaryKey);

        if ( ! recordItem) {
            return;
        }

        let row = this._getRowByKey(recordItem.key);

        if ( ! row) {
            return;
        }

        $(row).removeClass('table-primary');
        $('.coreui-table__select', row).prop('checked', false);

        this._trigger('unselect.coreui.table', this, [ recordItem.record ]);
    },


    /**
     * Получение выбранных id
     * @return {array}
     */
    getSelected: function () {

        let primaryKeys = [];
        let that        = this;
        let field       = this._options.primaryKey;

        $('#coreui-table-' + this._options.id + ' > .coreui-table__container > .coreui-table__wrapper > table > tbody > tr.coreui-table__record > td.coreui-table__select_container > .coreui-table__select:checked')
            .each(function (key, element) {
                let record = that._getRecordByKey($(element).val());

                if ( ! record || ! record.hasOwnProperty(field)) {
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
    getSelectedRecords: function () {

        let records = [];
        let that    = this;

        $('#coreui-table-' + this._options.id + ' > .coreui-table__container > .coreui-table__wrapper > table > tbody > tr.coreui-table__record > td.coreui-table__select_container > .coreui-table__select:checked')
            .each(function (key, element) {
                let record = that._getRecordByKey($(element).val());

                if ( ! record) {
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
    getRecord: function (primaryKey) {

        let recordItem = this._getRecordByPrimaryKey(primaryKey);

        if ( ! recordItem) {
            return null;
        }

        return recordItem.record;
    },


    /**
     * Получение записей
     */
    getRecords: function () {

        return this._options.records
    },


    /**
     * Переход к предыдущей странице
     */
    prevPage: function () {

        if (this._page > 1) {
            this._page--;
            this.reload();
        }
    },


    /**
     * Переход к следующей странице
     * @return {array}
     */
    nextPage: function () {

        let totalPages = this._recordsTotal > 0 && this._recordsPerPage > 0
            ? Math.ceil(this._recordsTotal / this._recordsPerPage)
            : 1;

        if (this._page < totalPages) {
            this._page++;
            this.reload();
        }
    },


    /**
     * Переход к указанной странице
     */
    goPage: function (page) {

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
    on: function(eventName, callback, context, singleExec) {
        if (typeof this._events[eventName] !== 'object') {
            this._events[eventName] = [];
        }
        this._events[eventName].push({
            context : context || this,
            callback: callback,
            singleExec: !! singleExec,
        });
    },


    /**
     * @param name
     * @param context
     * @param params
     * @private
     */
    _trigger: function(name, context, params) {

        params = params || [];

        if (this._events[name] instanceof Object && this._events[name].length > 0) {
            for (var i = 0; i < this._events[name].length; i++) {
                let callback = this._events[name][i].callback;

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
    _getLang: function () {

        return CoreUI.table.lang.hasOwnProperty(this._options.lang)
            ? CoreUI.table.lang[this._options.lang]
            : CoreUI.table.lang['ru'];
    },


    /**
     * Получение записи по ключу
     * @param recordKey
     * @return {object|null}
     * @private
     */
    _getRecordByKey: function (recordKey) {

        if (typeof recordKey === 'undefined' || recordKey === '') {
            return null;
        }

        let record = this._options.records.hasOwnProperty(recordKey)
            ? this._options.records[recordKey]
            : null;

        if ( ! record) {
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
    _getRecordByPrimaryKey: function (primaryKey) {

        if (typeof primaryKey === 'undefined' || primaryKey === '') {
            return null;
        }

        let record    = null;
        let recordKey = null;
        let field     = this._options.primaryKey;

        $.each(this._options.records, function (key, recordItem) {
            if (recordItem.hasOwnProperty(field) && recordItem[field] === primaryKey) {
                recordKey = key;
                record    = recordItem;
                return false;
            }
        });

        if ( ! record) {
            return null;
        }

        return {
            key: recordKey,
            record: record,
        };
    },


    /**
     * Получение элемента строки по ключу
     * @param {int} recordKey
     * @private
     */
    _getRowByKey: function (recordKey) {

        return $('#coreui-table-' + this._options.id + ' > .coreui-table__container > .coreui-table__wrapper > table > tbody > tr[data-record-key="' + recordKey + '"]');
    },


    /**
     * Показ указанных записей в таблице
     * @param records
     * @param total
     * @private
     */
    _viewRecords: function (records, total) {

        this._recordsTotal = CoreUI.table._isNumeric(total) ? parseInt(total) : records.length;
        let that           = this;
        let htmlRecords    = '';
        let totalPages     = this._recordsTotal > 0 && this._recordsPerPage > 0
            ? Math.ceil(this._recordsTotal / this._recordsPerPage)
            : 1;

        this._options.records = records;

        that._recordsNumber = this._page === 1 ? 1 : ((this._page - 1) * this._recordsPerPage) + 1;

        if (records.length > 0) {
            let renderRecorders = [];

            $.each(records, function (key, record) {
                renderRecorders.push(that._renderRecord(record, key));
                that._recordsNumber++;
            });

            htmlRecords = CoreUI.table.ejs.render(CoreUI.table.tpl['table-records.html'], {
                records: renderRecorders,
            });

        } else {
            htmlRecords = CoreUI.table.ejs.render(CoreUI.table.tpl['table-records-empty.html'], {
                columnsCount: this._columns.length > 0 ? this._columns.length : 1,
                lang: this._getLang(),
            });
        }


        let tableContainer = '#coreui-table-' + this._options.id + ' > .coreui-table__container > .coreui-table__wrapper > table';

        $(tableContainer + ' > tfoot > tr > td .coreui-table__page_current').text(this._page);
        $(tableContainer + ' > tfoot > tr > td .coreui-table__pages_total').text(totalPages);
        $(tableContainer + ' > tfoot > tr > td .coreui-table__page_prev').attr('disabled', this._page <= 1);
        $(tableContainer + ' > tfoot > tr > td .coreui-table__page_next').attr('disabled', this._page >= totalPages);

        $(tableContainer + ' > tbody').html(htmlRecords);
        $('#coreui-table-' + this._options.id + ' .coreui-table__count-total').text(this._recordsTotal);

        this._trigger('show-records.coreui.table', this, [ this ]);
    },


    /**
     * @param {object} record
     * @param {int}    recordKey
     * @returns {{ attr: (string), fields: (object) }}}
     * @private
     */
    _renderRecord: function (record, recordKey) {

        let that        = this;
        let fields      = [];
        let recordProps = typeof record.coreui === 'object' && ! Array.isArray(record.coreui) ? record.coreui : null;
        let recordAttr  = {
            class: 'coreui-table__record'
        };

        $.each(this._columns, function (key, column) {
            fields.push(that._renderField(column, record, recordKey));
        });

        if (typeof this._options.onClickUrl === 'string' && this._options.onClickUrl) {
            recordAttr.class += ' coreui-table_pointer';
        }

        if (recordProps) {
            recordAttr = CoreUI.table._mergeAttr(recordAttr, recordProps.attr);
        }

        let recordAttrResult = [];

        $.each(recordAttr, function (name, value) {
            recordAttrResult.push(name + '="' + value + '"');
        });

        return {
            attr: recordAttrResult.length > 0 ? (' ' + recordAttrResult.join(' ')) : '',
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
    _renderField: function (column, record, recordKey) {

        let columnOptions = column.getOptions();
        let columnField   = typeof columnOptions.field === 'string' ? columnOptions.field : null;
        let content       = '';
        let recordProps   = typeof record.coreui === 'object' && ! Array.isArray(record.coreui) ? record.coreui : null;
        let fieldProps    = recordProps && recordProps.hasOwnProperty('fields') && recordProps.fields.hasOwnProperty(columnField)
            ? recordProps.fields[columnField]
            : null;
        let fieldAttr = typeof columnOptions.attr === 'object' && ! Array.isArray(columnOptions.attr)
            ? columnOptions.attr
            : {};

        if (fieldProps && typeof fieldProps.attr === 'object' && ! Array.isArray(fieldProps.attr)) {
            fieldAttr = CoreUI.table._mergeAttr(fieldAttr, fieldProps.attr);

        }

        if (typeof columnOptions.render === 'function') {
            content = columnOptions.render(record);
        } else {
            content = columnField && record.hasOwnProperty(columnField)
                ? record[columnField]
                : '';
        }

        content = column.render(content, record, recordKey);

        let fieldAttrResult = [];

        $.each(fieldAttr, function (name, value) {
            fieldAttrResult.push(name + '="' + value + '"');
        });

        return {
            attr:    fieldAttrResult.length > 0 ? (' ' + fieldAttrResult.join(' ')) : '',
            content: content,
        };
    }
};
//HEAD 
window["CoreUI"]["table"]["tpl"] = {};

window["CoreUI"]["table"]["tpl"]["table-columns-footer.html"] = "<tr class=\"bg-white\">\n" +
    "  <% $.each(columns, function(key, column) { %>\n" +
    "  <td<%- column.attr%>><%- column.label %></td>\n" +
    "  <% }); %>\n" +
    "</tr>"; 

window["CoreUI"]["table"]["tpl"]["table-columns.html"] = "<tr class=\"fw-medium bg-white\">\n" +
    "  <% $.each(columns, function(key, column) { %>\n" +
    "  <td<%- column.attr%>><%- column.label %></td>\n" +
    "  <% }); %>\n" +
    "</tr>"; 

window["CoreUI"]["table"]["tpl"]["table-loader.html"] = "<div class=\"coreui-table-lock position-absolute w-100 top-0 bottom-0\">\n" +
    "    <div class=\"coreui-table-block bg-secondary-subtle position-absolute opacity-50 w-100 top-0 bottom-0\"></div>\n" +
    "    <div class=\"coreui-table-message position-relative d-flex align-content-center justify-content-start gap-2 mt-3 py-1 px-2 m-auto border border-secondary-subtle rounded-3 bg-body-secondary\">\n" +
    "        <div class=\"spinner-border text-secondary align-self-center\"></div>\n" +
    "        <span class=\"lh-lg\"><%= lang.loading %></span>\n" +
    "    </div>\n" +
    "</div>"; 

window["CoreUI"]["table"]["tpl"]["table-pages.html"] = "<tr class=\"bg-white\">\n" +
    "    <td colspan=\"<%= columnsCount %>\">\n" +
    "        <div class=\"d-flex justify-content-between\">\n" +
    "            <% if (table.show.pagesJump) { %>\n" +
    "            <div class=\"coreui-table__page_go_container float-start\">\n" +
    "                <div class=\"input-group\">\n" +
    "                    <input type=\"number\" class=\"form-control form-control-sm\" min=\"1\">\n" +
    "                    <button class=\"coreui-table__page_go btn btn-sm btn-outline-secondary border-secondary-subtle\" type=\"button\">\n" +
    "                        <i class=\"bi bi-chevron-compact-right\"></i>\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <% } %>\n" +
    "\n" +
    "            <% if (table.show.pages) { %>\n" +
    "            <div class=\"coreui-table__pages_container text-center\">\n" +
    "                <button type=\"button\" class=\"btn btn-sm btn-outline-secondary coreui-table__page_prev\"<% if ( ! prevPage) { %> disabled=\"disabled\"<% } %>>\n" +
    "                    <i class=\"bi bi-chevron-compact-left\"></i>\n" +
    "                </button>\n" +
    "\n" +
    "                <small>\n" +
    "                    <span class=\"coreui-table__page_current\"><%= currentPage %></span>\n" +
    "                    <%= lang.of %>\n" +
    "                    <span class=\"coreui-table__pages_total\"><%= pagesTotal %></span>\n" +
    "                </small>\n" +
    "\n" +
    "                <button type=\"button\" class=\"btn btn-sm btn-outline-secondary coreui-table__page_next\"<% if ( ! nextPage) { %> disabled=\"disabled\"<% } %>>\n" +
    "                    <i class=\"bi bi-chevron-compact-right\"></i>\n" +
    "                </button>\n" +
    "            </div>\n" +
    "            <% } %>\n" +
    "\n" +
    "            <% if (table.show.prePageList) { %>\n" +
    "            <div class=\"coreui-table__pages_list_container float-end\">\n" +
    "                <select class=\"form-select form-select-sm\">\n" +
    "                    <% $.each(recordsPerPageList, function(key, count) { %>\n" +
    "                    <option value=\"<%= count %>\"<% if (recordsPerPage == count) { %>selected=\"selected\"<% } %>>\n" +
    "                        <% if (count == '0') { %><%= lang.all %><% } else { %><%= count %><% } %>\n" +
    "                    </option>\n" +
    "                    <% }); %>\n" +
    "                </select>\n" +
    "            </div>\n" +
    "            <% } %>\n" +
    "        </div>\n" +
    "    </td>\n" +
    "</tr>"; 

window["CoreUI"]["table"]["tpl"]["table-records-empty.html"] = "<tr>\n" +
    "    <td class=\"text-center\" colspan=\"<%= columnsCount %>\"><%= lang.emptyRecords %></td>\n" +
    "</tr>"; 

window["CoreUI"]["table"]["tpl"]["table-records.html"] = "<% $.each(records, function(key, record) { %>\n" +
    "    <tr<%- record.attr %> data-record-key=\"<%= key %>\">\n" +
    "        <% $.each(record.fields, function(key2, field) { %>\n" +
    "            <td<%- field.attr %>><%- field.content %></td>\n" +
    "        <% }); %>\n" +
    "    </tr>\n" +
    "<% }); %>"; 

window["CoreUI"]["table"]["tpl"]["table.html"] = "\n" +
    "<div id=\"coreui-table-<%= table.id %>\" class=\"coreui-table\"<%- render.attr %>\n" +
    "     <% if (widthSizes) { %>style=\"<%= widthSizes.join(';') %>\"<% } %>>\n" +
    "    <% if (render.controls.length > 0) { %>\n" +
    "        <div class=\"coreui-table__controls d-flex justify-content-start gap-2 flex-wrap mb-3 align-items-center\">\n" +
    "            <% $.each(render.controls, function(key, control) { %>\n" +
    "                <div id=\"coreui-table-control-<%= control.id %>\" class=\"coreui-table__control\">\n" +
    "                    <%- control.content %>\n" +
    "                </div>\n" +
    "            <% }); %>\n" +
    "        </div>\n" +
    "    <% } %>\n" +
    "\n" +
    "\n" +
    "    <div class=\"coreui-table__container bg-white position-relative rounded-1 border border-1\">\n" +
    "        <% if (table.show.total) { %>\n" +
    "        <div class=\"ps-2 lh-lg border-bottom\">\n" +
    "            <small><%= lang.total %>: <span class=\"coreui-table__count-total\"><%= recordsTotal %></span></small>\n" +
    "        </div>\n" +
    "        <% } %>\n" +
    "\n" +
    "        <div class=\"coreui-table__wrapper table-responsive overflow-x-auto\" <% if (heightSizes) { %>style=\"<%= heightSizes.join(';') %>\"<% } %>>\n" +
    "            <table class=\"table <% if (table.size) { %>table-<%= table.size %><% } %> <% if (table.hover) { %>table-hover<% } %> <% if (table.striped) { %>table-striped<% } %> mb-0 <%= table.class %>\">\n" +
    "                <colgroup>\n" +
    "                    <% $.each(render.columnGroups, function(key, columnGroup) { %>\n" +
    "                    <col<% if (columnGroup.width) { %> style=\"width: <%= (columnGroup.width.toString() + columnGroup.unit) %>\"<% } %>>\n" +
    "                    <% }); %>\n" +
    "                </colgroup>\n" +
    "                <% if (table.show.columnHeaders) { %>\n" +
    "                <thead>\n" +
    "                    <%- render.columnsHeader %>\n" +
    "                    <%- render.columns %>\n" +
    "                </thead>\n" +
    "                <% } %>\n" +
    "                <tbody class=\"border-secondary-subtle\">\n" +
    "                    <%- render.records %>\n" +
    "                </tbody>\n" +
    "                <% if (render.footer != '' || render.pages != '') { %>\n" +
    "                <tfoot>\n" +
    "                    <%- render.footer %>\n" +
    "                    <%- render.pages %>\n" +
    "                </tfoot>\n" +
    "                <% } %>\n" +
    "            </table>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"; 

window["CoreUI"]["table"]["tpl"]["controls/button.html"] = "<button type=\"button\"<%- render.attr %>>\n" +
    "<%- control.content %>\n" +
    "</button>"; 

window["CoreUI"]["table"]["tpl"]["controls/link.html"] = "<a href=\"<%- control.href %>\"<%- render.attr %>><%- control.content %></a>"; 
// END ;

var coreuiTableUtils = {


    /**
     *
     */
    eval: function (code) {

        (function () {
            eval(code);
        })();
    }
};

CoreUI.table.columns.date = {

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
    init: function (table, options) {

        this._table   = table;
        this._options = $.extend({}, this._options, options);
    },


    /**
     * Получение параметров
     */
    getOptions: function () {
        return this._options;
    },


    /**
     * Формирование контента
     * @param {string} content
     * @param {object} record
     * @param {string} recordKey
     * @returns {string}
     */
    render: function(content, record, recordKey) {

        if (typeof content !== 'string') {
            return '';
        }


        try {
            let date = new Date(content);

            content = this._options.format
                .replace(/YYYY/g, this._strPadLeft(date.getFullYear(), 4))
                .replace(/MM/g,   this._strPadLeft(date.getMonth() + 1, 2))
                .replace(/M/g,    date.getMonth() + 1)
                .replace(/DD/g,   this._strPadLeft(date.getDate(), 2))
                .replace(/D/g,    date.getDate());

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
    _strPadLeft: function (str, count, repeat) {

        str = String(str);

        if (str.length >= count) {
            return str;
        }

        repeat = repeat ? repeat : '0';

        return (repeat.repeat(count) + str).slice(-(count));
    }
};

CoreUI.table.columns.datetime = {

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
    init: function (table, options) {

        this._table   = table;
        this._options = $.extend({}, this._options, options);
    },


    /**
     * Получение параметров
     */
    getOptions: function () {
        return this._options;
    },


    /**
     * Формирование контента
     * @param {string} content
     * @param {object} record
     * @param {string} recordKey
     * @returns {string}
     */
    render: function(content, record, recordKey) {

        if (typeof content !== 'string') {
            return '';
        }

        try {
            let date = new Date(content);

            content = this._options.format
                .replace(/YYYY/g, this._strPadLeft(date.getFullYear(), 4))
                .replace(/MM/g,   this._strPadLeft(date.getMonth() + 1, 2))
                .replace(/M/g,    date.getMonth() + 1)
                .replace(/DD/g,   this._strPadLeft(date.getDate(), 2))
                .replace(/D/g,    date.getDate())
                .replace(/hh/g,   this._strPadLeft(date.getHours(), 2))
                .replace(/mm/g,   this._strPadLeft(date.getMinutes(), 2))
                .replace(/m/g,    date.getMinutes())
                .replace(/ss/g,   this._strPadLeft(date.getSeconds(), 2))
                .replace(/s/g,    date.getSeconds());

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
    _strPadLeft: function (str, count, repeat) {

        str = String(str);

        if (str.length >= count) {
            return str;
        }

        repeat = repeat ? repeat : '0';

        return (repeat.repeat(count) + str).slice(-(count));
    }
};

CoreUI.table.columns.html = {

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
    init: function (table, options) {

        this._table   = table;
        this._options = $.extend({}, this._options, options);
    },


    /**
     * Получение параметров
     */
    getOptions: function () {
        return this._options;
    },


    /**
     * Формирование контента
     * @param {string} content
     * @param {object} record
     * @param {string} recordKey
     * @returns {string}
     */
    render: function(content, record, recordKey) {

        if (['string', 'bigint', 'symbol', 'number'].indexOf(typeof content) < 0) {
            return '';
        }

        return String(content);
    }
};

CoreUI.table.columns.number = {

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
    init: function (table, options) {

        this._table   = table;
        this._options = $.extend({}, this._options, options);
    },


    /**
     * Получение параметров
     */
    getOptions: function () {
        return this._options;
    },


    /**
     * Формирование контента
     * @param {string} content
     * @param {object} record
     * @param {string} recordKey
     * @returns {string}
     */
    render: function(content, record, recordKey) {

        if (['string', 'bigint', 'symbol', 'number'].indexOf(typeof content) < 0) {
            return '';
        }

        content = String(content)
            .replace(/,/g, '.')
            .replace(/[^0-9\-\.]/g, '')
            .replace(/[\s]{2,}/g, ' ');

        content = content.replace(/(?<!(\.\d*|^.{0}))(?=(\d{3})+(?!\d))/g, "$1 ")
            .replace(/\- /g, '-');

        return content;
    }
};

CoreUI.table.columns.numbers = {

    _table: null,
    _options: {
        type: 'numbers',
        label: '№',
        width: 20,
        attr: { class: 'text-end' },
        attrHeader: null
    },


    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object}                options
     */
    init: function (table, options) {

        this._table    = table;
        this._options  = $.extend(true, {}, this._options, options);
    },


    /**
     * Получение параметров
     */
    getOptions: function () {
        return this._options;
    },


    /**
     * Формирование контента
     * @param {string} content
     * @param {object} record
     * @param {string} recordKey
     * @returns {string}
     */
    render: function(content, record, recordKey) {

        return this._table._recordsNumber;
    }
};

CoreUI.table.columns.select = {

    _table: null,
    _options: {
        type: 'select',
        label: '',
        width: 35,
        attr: { class: 'coreui-table__select_container text-center' },
        attrHeader: { class: 'text-center' }
    },


    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object}                options
     */
    init: function (table, options) {

        if (options.hasOwnProperty('attr')) {
            options.attr = CoreUI.table._mergeAttr(this._options.attr, options.attr);
        }
        if (options.hasOwnProperty('attrHeader')) {
            options.attrHeader = CoreUI.table._mergeAttr(this._options.attrHeader, options.attrHeader);
        }


        this._table   = table;
        this._options = $.extend(true, {}, this._options, options);

        this._options.label = '<input class="coreui-table__select-all form-check-input" type="checkbox" value="">';
        let tableWrapper    = '#coreui-table-' + table._options.id + ' > .coreui-table__container > .coreui-table__wrapper';
        let containers      = tableWrapper + ' > table > tbody > tr.coreui-table__record > td.coreui-table__select_container';


        // Показ строк
        this._table.on('show-records.coreui.table', function () {

            // Отмена обработки нажатия в select колонках
            $(containers).click(function (event) {
                event.stopPropagation();
            });

            // Выбор строки
            $(containers + ' > .coreui-table__select').click(function (event) {
                let recordKey = $(this).val();
                let record    = table._getRecordByKey(recordKey);
                let row       = table._getRowByKey(recordKey);

                if ( ! record || ! row) {
                    return;
                }

                if ($(this).is(':checked')) {
                    $(row).addClass('table-primary');
                    table._trigger('select.coreui.table', table, [ record ]);
                } else {
                    $(row).removeClass('table-primary');
                    table._trigger('unselect.coreui.table', table, [ record ]);
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
    getOptions: function () {
        return this._options;
    },


    /**
     * Формирование контента
     * @param {string} content
     * @param {object} record
     * @param {string} recordKey
     * @returns {string}
     */
    render: function(content, record, recordKey) {

        return '<input class="coreui-table__select form-check-input" type="checkbox" value="' + recordKey + '">';
    }
};

CoreUI.table.columns.switch = {

    _table: null,
    _options: {
        type: 'switch',
        label: '',
        field: '',
        width: 5,
        valueY: 'Y',
        valueN: 'N',
        attr: { class: 'coreui-table__switch_container' },
        attrHeader: { },
        onChange: null
    },


    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object}                options
     */
    init: function (table, options) {

        this._table    = table;
        this._options  = $.extend(true, {}, this._options, options);
        let that       = this;
        let containers = '#coreui-table-' + table._options.id + ' > .coreui-table__container > .coreui-table__wrapper > table > tbody > tr.coreui-table__record > td.coreui-table__switch_container';

        // Показ строк
        this._table.on('show-records.coreui.table', function () {

            // Отмена обработки нажатия в switch колонках
            $(containers).click(function (event) {
                event.stopPropagation();
            });

            // События нажатия на переключатель
            if (that._options.hasOwnProperty('onChange') &&
                (typeof that._options.onChange === 'function' || typeof that._options.onChange === 'string')
            ) {
                $(containers + ' .coreui-table__switch[data-field="' + that._options.field + '"]').change(function (event) {
                    let recordKey = $(this).val();
                    let isChecked = $(this).is(':checked');
                    let record    = table._getRecordByKey(recordKey);

                    if (typeof that._options.onChange === 'function') {
                        that._options.onChange(record, isChecked, this);

                    } else if (typeof that._options.onChange === 'string') {
                        let id = '';

                        if (record.hasOwnProperty(table._options.primaryKey)) {
                            id = record[table._options.primaryKey];
                        }

                        let func = new Function('record', 'checked', 'id', that._options.onChange);
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
    getOptions: function () {
        return this._options;
    },


    /**
     * Формирование контента
     * @param {string} content
     * @param {object} record
     * @param {string} recordKey
     * @returns {string}
     */
    render: function(content, record, recordKey) {

        let checked = record.hasOwnProperty(this._options.field) && record[this._options.field] === this._options.valueY
            ? ' checked="checked"'
            : '';


        return '<div class="form-switch">' +
                   '<input class="coreui-table__switch form-check-input" type="checkbox" value="' + recordKey + '"' + checked +
                         ' data-field="' + this._options.field + '" data-field="' + this._options.field + '">' +
               '</div>';
    }
};

CoreUI.table.columns.text = {

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
    init: function (table, options) {

        this._table   = table;
        this._options = $.extend({}, this._options, options);
    },


    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function () {
        return this._options;
    },


    /**
     * Формирование контента
     * @param {string} content
     * @param {object} record
     * @param {string} recordKey
     * @returns {string}
     */
    render: function(content, record, recordKey) {

        if (['string', 'bigint', 'symbol', 'number'].indexOf(typeof content) < 0) {
            return '';
        }

        return String(content)
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }
};

CoreUI.table.controls.button = {

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
    init: function (table, options) {

        this._options = $.extend({}, this._options, options);
        this._table   = table;

        if ( ! this._options.id) {
            this._options.id = CoreUI.table._hashCode();
        }
    },


    /**
     * Инициализация событий связанных с элементом управления
     */
    initEvents: function () {

        let that = this;

        if (typeof this._options.onClick === 'function' || typeof this._options.onClick === 'string') {
            $('#coreui-table-' + this._table._options.id + ' #coreui-table-control-' + this._options.id + ' > button')
                .click(function (event) {
                    if (typeof that._options.onClick === 'function') {
                        that._options.onClick(event, that._table);

                    } else if (typeof that._options.onClick === 'string') {
                        coreuiTableUtils.eval(that._options.onClick);
                    }
                });
        }
    },


    /**
     * Получение ID элемента управления
     * @returns {string}
     */
    getId: function () {

        return this._options.id;
    },


    /**
     * Формирование контента для размещения на странице
     * @returns {string}
     */
    render: function() {

        if (typeof this._options.attr === 'object') {
            let attributes = [];

            $.each(this._options.attr, function (name, value) {
                attributes.push(name + '="' + value + '"');
            });

            this._render.attr = ' ' + attributes.join(' ');
        }


        return CoreUI.table.ejs.render(CoreUI.table.tpl['controls/button.html'], {
            control: this._options,
            render: this._render,
        });
    }
};

CoreUI.table.controls.custom = {

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
    init: function (table, options) {

        this._options = $.extend({}, this._options, options);
        this._table   = table;

        if ( ! this._options.id) {
            this._options.id = CoreUI.table._hashCode();
        }
    },


    /**
     * Инициализация событий связанных с элементом управления
     */
    initEvents: function () {

    },


    /**
     * Получение ID элемента управления
     * @returns {string}
     */
    getId: function () {

        return this._options.id;
    },


    /**
     * Формирование контента для размещения на странице
     * @returns {string}
     */
    render: function() {

        return this._options.content;
    }
};

CoreUI.table.controls.link = {

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
    init: function (table, options) {

        this._options = $.extend({}, this._options, options);
        this._table   = table;

        if ( ! this._options.id) {
            this._options.id = CoreUI.table._hashCode();
        }
    },


    /**
     * Инициализация событий связанных с элементом управления
     */
    initEvents: function () {

    },


    /**
     * Получение ID элемента управления
     * @returns {string}
     */
    getId: function () {

        return this._options.id;
    },


    /**
     * Формирование контента для размещения на странице
     * @returns {string}
     */
    render: function() {

        if (typeof this._options.attr === 'object') {
            let attributes = [];

            $.each(this._options.attr, function (name, value) {
                attributes.push(name + '="' + value + '"');
            });

            this._render.attr = ' ' + attributes.join(' ');
        }

        return CoreUI.table.ejs.render(CoreUI.table.tpl['controls/link.html'], {
            control: this._options,
            render: this._render,
        });
    }
};

CoreUI.table.lang.ru = {
    "emptyRecords": "No records",
    "loading": "Loading...",
    "total": "Total",
    "of": "of",
    "all": "All",
};

CoreUI.table.lang.ru = {
    "emptyRecords": "Нет записей",
    "loading": "Загрузка...",
    "total": "Всего",
    "of": "из",
    "all": "Все",
}
//# sourceMappingURL=coreui-table.js.map
