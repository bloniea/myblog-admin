var hr=Object.defineProperty,Sr=Object.defineProperties;var Ar=Object.getOwnPropertyDescriptors;var Le=Object.getOwnPropertySymbols;var br=Object.prototype.hasOwnProperty,wr=Object.prototype.propertyIsEnumerable;var Je=(r,e,t)=>e in r?hr(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Ge=(r,e)=>{for(var t in e||(e={}))br.call(e,t)&&Je(r,t,e[t]);if(Le)for(var t of Le(e))wr.call(e,t)&&Je(r,t,e[t]);return r},ze=(r,e)=>Sr(r,Ar(e));import{S as Or}from"./vendor.9ce32bbf.js";import{r as Pr}from"./index.483ec574.js";var Er=function(){if(typeof Symbol!="function"||typeof Object.getOwnPropertySymbols!="function")return!1;if(typeof Symbol.iterator=="symbol")return!0;var e={},t=Symbol("test"),n=Object(t);if(typeof t=="string"||Object.prototype.toString.call(t)!=="[object Symbol]"||Object.prototype.toString.call(n)!=="[object Symbol]")return!1;var o=42;e[t]=o;for(t in e)return!1;if(typeof Object.keys=="function"&&Object.keys(e).length!==0||typeof Object.getOwnPropertyNames=="function"&&Object.getOwnPropertyNames(e).length!==0)return!1;var a=Object.getOwnPropertySymbols(e);if(a.length!==1||a[0]!==t||!Object.prototype.propertyIsEnumerable.call(e,t))return!1;if(typeof Object.getOwnPropertyDescriptor=="function"){var i=Object.getOwnPropertyDescriptor(e,t);if(i.value!==o||i.enumerable!==!0)return!1}return!0},He=typeof Symbol!="undefined"&&Symbol,Ir=Er,Nr=function(){return typeof He!="function"||typeof Symbol!="function"||typeof He("foo")!="symbol"||typeof Symbol("bar")!="symbol"?!1:Ir()},Fr="Function.prototype.bind called on incompatible ",ve=Array.prototype.slice,xr=Object.prototype.toString,$r="[object Function]",Rr=function(e){var t=this;if(typeof t!="function"||xr.call(t)!==$r)throw new TypeError(Fr+t);for(var n=ve.call(arguments,1),o,a=function(){if(this instanceof o){var u=t.apply(this,n.concat(ve.call(arguments)));return Object(u)===u?u:this}else return t.apply(e,n.concat(ve.call(arguments)))},i=Math.max(0,t.length-n.length),l=[],c=0;c<i;c++)l.push("$"+c);if(o=Function("binder","return function ("+l.join(",")+"){ return binder.apply(this,arguments); }")(a),t.prototype){var f=function(){};f.prototype=t.prototype,o.prototype=new f,f.prototype=null}return o},Mr=Rr,Ce=Function.prototype.bind||Mr,Cr=Ce,_r=Cr.call(Function.call,Object.prototype.hasOwnProperty),d,ne=SyntaxError,nr=Function,H=TypeError,me=function(r){try{return nr('"use strict"; return ('+r+").constructor;")()}catch{}},k=Object.getOwnPropertyDescriptor;if(k)try{k({},"")}catch{k=null}var ge=function(){throw new H},Dr=k?function(){try{return arguments.callee,ge}catch{try{return k(arguments,"callee").get}catch{return ge}}}():ge,G=Nr(),x=Object.getPrototypeOf||function(r){return r.__proto__},z={},Tr=typeof Uint8Array=="undefined"?d:x(Uint8Array),Q={"%AggregateError%":typeof AggregateError=="undefined"?d:AggregateError,"%Array%":Array,"%ArrayBuffer%":typeof ArrayBuffer=="undefined"?d:ArrayBuffer,"%ArrayIteratorPrototype%":G?x([][Symbol.iterator]()):d,"%AsyncFromSyncIteratorPrototype%":d,"%AsyncFunction%":z,"%AsyncGenerator%":z,"%AsyncGeneratorFunction%":z,"%AsyncIteratorPrototype%":z,"%Atomics%":typeof Atomics=="undefined"?d:Atomics,"%BigInt%":typeof BigInt=="undefined"?d:BigInt,"%Boolean%":Boolean,"%DataView%":typeof DataView=="undefined"?d:DataView,"%Date%":Date,"%decodeURI%":decodeURI,"%decodeURIComponent%":decodeURIComponent,"%encodeURI%":encodeURI,"%encodeURIComponent%":encodeURIComponent,"%Error%":Error,"%eval%":eval,"%EvalError%":EvalError,"%Float32Array%":typeof Float32Array=="undefined"?d:Float32Array,"%Float64Array%":typeof Float64Array=="undefined"?d:Float64Array,"%FinalizationRegistry%":typeof FinalizationRegistry=="undefined"?d:FinalizationRegistry,"%Function%":nr,"%GeneratorFunction%":z,"%Int8Array%":typeof Int8Array=="undefined"?d:Int8Array,"%Int16Array%":typeof Int16Array=="undefined"?d:Int16Array,"%Int32Array%":typeof Int32Array=="undefined"?d:Int32Array,"%isFinite%":isFinite,"%isNaN%":isNaN,"%IteratorPrototype%":G?x(x([][Symbol.iterator]())):d,"%JSON%":typeof JSON=="object"?JSON:d,"%Map%":typeof Map=="undefined"?d:Map,"%MapIteratorPrototype%":typeof Map=="undefined"||!G?d:x(new Map()[Symbol.iterator]()),"%Math%":Math,"%Number%":Number,"%Object%":Object,"%parseFloat%":parseFloat,"%parseInt%":parseInt,"%Promise%":typeof Promise=="undefined"?d:Promise,"%Proxy%":typeof Proxy=="undefined"?d:Proxy,"%RangeError%":RangeError,"%ReferenceError%":ReferenceError,"%Reflect%":typeof Reflect=="undefined"?d:Reflect,"%RegExp%":RegExp,"%Set%":typeof Set=="undefined"?d:Set,"%SetIteratorPrototype%":typeof Set=="undefined"||!G?d:x(new Set()[Symbol.iterator]()),"%SharedArrayBuffer%":typeof SharedArrayBuffer=="undefined"?d:SharedArrayBuffer,"%String%":String,"%StringIteratorPrototype%":G?x(""[Symbol.iterator]()):d,"%Symbol%":G?Symbol:d,"%SyntaxError%":ne,"%ThrowTypeError%":Dr,"%TypedArray%":Tr,"%TypeError%":H,"%Uint8Array%":typeof Uint8Array=="undefined"?d:Uint8Array,"%Uint8ClampedArray%":typeof Uint8ClampedArray=="undefined"?d:Uint8ClampedArray,"%Uint16Array%":typeof Uint16Array=="undefined"?d:Uint16Array,"%Uint32Array%":typeof Uint32Array=="undefined"?d:Uint32Array,"%URIError%":URIError,"%WeakMap%":typeof WeakMap=="undefined"?d:WeakMap,"%WeakRef%":typeof WeakRef=="undefined"?d:WeakRef,"%WeakSet%":typeof WeakSet=="undefined"?d:WeakSet},Br=function r(e){var t;if(e==="%AsyncFunction%")t=me("async function () {}");else if(e==="%GeneratorFunction%")t=me("function* () {}");else if(e==="%AsyncGeneratorFunction%")t=me("async function* () {}");else if(e==="%AsyncGenerator%"){var n=r("%AsyncGeneratorFunction%");n&&(t=n.prototype)}else if(e==="%AsyncIteratorPrototype%"){var o=r("%AsyncGenerator%");o&&(t=x(o.prototype))}return Q[e]=t,t},Qe={"%ArrayBufferPrototype%":["ArrayBuffer","prototype"],"%ArrayPrototype%":["Array","prototype"],"%ArrayProto_entries%":["Array","prototype","entries"],"%ArrayProto_forEach%":["Array","prototype","forEach"],"%ArrayProto_keys%":["Array","prototype","keys"],"%ArrayProto_values%":["Array","prototype","values"],"%AsyncFunctionPrototype%":["AsyncFunction","prototype"],"%AsyncGenerator%":["AsyncGeneratorFunction","prototype"],"%AsyncGeneratorPrototype%":["AsyncGeneratorFunction","prototype","prototype"],"%BooleanPrototype%":["Boolean","prototype"],"%DataViewPrototype%":["DataView","prototype"],"%DatePrototype%":["Date","prototype"],"%ErrorPrototype%":["Error","prototype"],"%EvalErrorPrototype%":["EvalError","prototype"],"%Float32ArrayPrototype%":["Float32Array","prototype"],"%Float64ArrayPrototype%":["Float64Array","prototype"],"%FunctionPrototype%":["Function","prototype"],"%Generator%":["GeneratorFunction","prototype"],"%GeneratorPrototype%":["GeneratorFunction","prototype","prototype"],"%Int8ArrayPrototype%":["Int8Array","prototype"],"%Int16ArrayPrototype%":["Int16Array","prototype"],"%Int32ArrayPrototype%":["Int32Array","prototype"],"%JSONParse%":["JSON","parse"],"%JSONStringify%":["JSON","stringify"],"%MapPrototype%":["Map","prototype"],"%NumberPrototype%":["Number","prototype"],"%ObjectPrototype%":["Object","prototype"],"%ObjProto_toString%":["Object","prototype","toString"],"%ObjProto_valueOf%":["Object","prototype","valueOf"],"%PromisePrototype%":["Promise","prototype"],"%PromiseProto_then%":["Promise","prototype","then"],"%Promise_all%":["Promise","all"],"%Promise_reject%":["Promise","reject"],"%Promise_resolve%":["Promise","resolve"],"%RangeErrorPrototype%":["RangeError","prototype"],"%ReferenceErrorPrototype%":["ReferenceError","prototype"],"%RegExpPrototype%":["RegExp","prototype"],"%SetPrototype%":["Set","prototype"],"%SharedArrayBufferPrototype%":["SharedArrayBuffer","prototype"],"%StringPrototype%":["String","prototype"],"%SymbolPrototype%":["Symbol","prototype"],"%SyntaxErrorPrototype%":["SyntaxError","prototype"],"%TypedArrayPrototype%":["TypedArray","prototype"],"%TypeErrorPrototype%":["TypeError","prototype"],"%Uint8ArrayPrototype%":["Uint8Array","prototype"],"%Uint8ClampedArrayPrototype%":["Uint8ClampedArray","prototype"],"%Uint16ArrayPrototype%":["Uint16Array","prototype"],"%Uint32ArrayPrototype%":["Uint32Array","prototype"],"%URIErrorPrototype%":["URIError","prototype"],"%WeakMapPrototype%":["WeakMap","prototype"],"%WeakSetPrototype%":["WeakSet","prototype"]},pe=Ce,ce=_r,Ur=pe.call(Function.call,Array.prototype.concat),kr=pe.call(Function.apply,Array.prototype.splice),Ve=pe.call(Function.call,String.prototype.replace),fe=pe.call(Function.call,String.prototype.slice),Wr=/[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,Lr=/\\(\\)?/g,Jr=function(e){var t=fe(e,0,1),n=fe(e,-1);if(t==="%"&&n!=="%")throw new ne("invalid intrinsic syntax, expected closing `%`");if(n==="%"&&t!=="%")throw new ne("invalid intrinsic syntax, expected opening `%`");var o=[];return Ve(e,Wr,function(a,i,l,c){o[o.length]=l?Ve(c,Lr,"$1"):i||a}),o},Gr=function(e,t){var n=e,o;if(ce(Qe,n)&&(o=Qe[n],n="%"+o[0]+"%"),ce(Q,n)){var a=Q[n];if(a===z&&(a=Br(n)),typeof a=="undefined"&&!t)throw new H("intrinsic "+e+" exists, but is not available. Please file an issue!");return{alias:o,name:n,value:a}}throw new ne("intrinsic "+e+" does not exist!")},_e=function(e,t){if(typeof e!="string"||e.length===0)throw new H("intrinsic name must be a non-empty string");if(arguments.length>1&&typeof t!="boolean")throw new H('"allowMissing" argument must be a boolean');var n=Jr(e),o=n.length>0?n[0]:"",a=Gr("%"+o+"%",t),i=a.name,l=a.value,c=!1,f=a.alias;f&&(o=f[0],kr(n,Ur([0,1],f)));for(var u=1,v=!0;u<n.length;u+=1){var y=n[u],g=fe(y,0,1),h=fe(y,-1);if((g==='"'||g==="'"||g==="`"||h==='"'||h==="'"||h==="`")&&g!==h)throw new ne("property names with quotes must have matching quotes");if((y==="constructor"||!v)&&(c=!0),o+="."+y,i="%"+o+"%",ce(Q,i))l=Q[i];else if(l!=null){if(!(y in l)){if(!t)throw new H("base intrinsic for "+e+" exists, but the property is not available.");return}if(k&&u+1>=n.length){var O=k(l,y);v=!!O,v&&"get"in O&&!("originalValue"in O.get)?l=O.get:l=l[y]}else v=ce(l,y),l=l[y];v&&!c&&(Q[i]=l)}}return l},ar={exports:{}};(function(r){var e=Ce,t=_e,n=t("%Function.prototype.apply%"),o=t("%Function.prototype.call%"),a=t("%Reflect.apply%",!0)||e.call(o,n),i=t("%Object.getOwnPropertyDescriptor%",!0),l=t("%Object.defineProperty%",!0),c=t("%Math.max%");if(l)try{l({},"a",{value:1})}catch{l=null}r.exports=function(v){var y=a(e,o,arguments);if(i&&l){var g=i(y,"length");g.configurable&&l(y,"length",{value:1+c(0,v.length-(arguments.length-1))})}return y};var f=function(){return a(e,n,arguments)};l?l(r.exports,"apply",{value:f}):r.exports.apply=f})(ar);var or=_e,ir=ar.exports,zr=ir(or("String.prototype.indexOf")),Hr=function(e,t){var n=or(e,!!t);return typeof n=="function"&&zr(e,".prototype.")>-1?ir(n):n},Qr={},Vr=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:Qr}),qr=Or(Vr),De=typeof Map=="function"&&Map.prototype,he=Object.getOwnPropertyDescriptor&&De?Object.getOwnPropertyDescriptor(Map.prototype,"size"):null,ue=De&&he&&typeof he.get=="function"?he.get:null,Kr=De&&Map.prototype.forEach,Te=typeof Set=="function"&&Set.prototype,Se=Object.getOwnPropertyDescriptor&&Te?Object.getOwnPropertyDescriptor(Set.prototype,"size"):null,se=Te&&Se&&typeof Se.get=="function"?Se.get:null,jr=Te&&Set.prototype.forEach,Yr=typeof WeakMap=="function"&&WeakMap.prototype,ee=Yr?WeakMap.prototype.has:null,Xr=typeof WeakSet=="function"&&WeakSet.prototype,re=Xr?WeakSet.prototype.has:null,Zr=typeof WeakRef=="function"&&WeakRef.prototype,qe=Zr?WeakRef.prototype.deref:null,et=Boolean.prototype.valueOf,rt=Object.prototype.toString,tt=Function.prototype.toString,nt=String.prototype.match,Be=String.prototype.slice,R=String.prototype.replace,at=String.prototype.toUpperCase,Ke=String.prototype.toLowerCase,lr=RegExp.prototype.test,je=Array.prototype.concat,E=Array.prototype.join,ot=Array.prototype.slice,Ye=Math.floor,Ne=typeof BigInt=="function"?BigInt.prototype.valueOf:null,Ae=Object.getOwnPropertySymbols,Fe=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Symbol.prototype.toString:null,V=typeof Symbol=="function"&&typeof Symbol.iterator=="object",b=typeof Symbol=="function"&&Symbol.toStringTag&&(typeof Symbol.toStringTag===V?"object":"symbol")?Symbol.toStringTag:null,cr=Object.prototype.propertyIsEnumerable,Xe=(typeof Reflect=="function"?Reflect.getPrototypeOf:Object.getPrototypeOf)||([].__proto__===Array.prototype?function(r){return r.__proto__}:null);function Ze(r,e){if(r===1/0||r===-1/0||r!==r||r&&r>-1e3&&r<1e3||lr.call(/e/,e))return e;var t=/[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;if(typeof r=="number"){var n=r<0?-Ye(-r):Ye(r);if(n!==r){var o=String(n),a=Be.call(e,o.length+1);return R.call(o,t,"$&_")+"."+R.call(R.call(a,/([0-9]{3})/g,"$&_"),/_$/,"")}}return R.call(e,t,"$&_")}var be=qr.custom,we=be&&ur(be)?be:null,it=function r(e,t,n,o){var a=t||{};if($(a,"quoteStyle")&&a.quoteStyle!=="single"&&a.quoteStyle!=="double")throw new TypeError('option "quoteStyle" must be "single" or "double"');if($(a,"maxStringLength")&&(typeof a.maxStringLength=="number"?a.maxStringLength<0&&a.maxStringLength!==1/0:a.maxStringLength!==null))throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');var i=$(a,"customInspect")?a.customInspect:!0;if(typeof i!="boolean"&&i!=="symbol")throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");if($(a,"indent")&&a.indent!==null&&a.indent!=="	"&&!(parseInt(a.indent,10)===a.indent&&a.indent>0))throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');if($(a,"numericSeparator")&&typeof a.numericSeparator!="boolean")throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');var l=a.numericSeparator;if(typeof e=="undefined")return"undefined";if(e===null)return"null";if(typeof e=="boolean")return e?"true":"false";if(typeof e=="string")return pr(e,a);if(typeof e=="number"){if(e===0)return 1/0/e>0?"0":"-0";var c=String(e);return l?Ze(e,c):c}if(typeof e=="bigint"){var f=String(e)+"n";return l?Ze(e,f):f}var u=typeof a.depth=="undefined"?5:a.depth;if(typeof n=="undefined"&&(n=0),n>=u&&u>0&&typeof e=="object")return xe(e)?"[Array]":"[Object]";var v=Et(a,n);if(typeof o=="undefined")o=[];else if(sr(o,e)>=0)return"[Circular]";function y(w,T,ye){if(T&&(o=ot.call(o),o.push(T)),ye){var X={depth:a.depth};return $(a,"quoteStyle")&&(X.quoteStyle=a.quoteStyle),r(w,X,n+1,o)}return r(w,a,n+1,o)}if(typeof e=="function"){var g=mt(e),h=oe(e,y);return"[Function"+(g?": "+g:" (anonymous)")+"]"+(h.length>0?" { "+E.call(h,", ")+" }":"")}if(ur(e)){var O=V?R.call(String(e),/^(Symbol\(.*\))_[^)]*$/,"$1"):Fe.call(e);return typeof e=="object"&&!V?Z(O):O}if(wt(e)){for(var m="<"+Ke.call(String(e.nodeName)),N=e.attributes||[],I=0;I<N.length;I++)m+=" "+N[I].name+"="+fr(lt(N[I].value),"double",a);return m+=">",e.childNodes&&e.childNodes.length&&(m+="..."),m+="</"+Ke.call(String(e.nodeName))+">",m}if(xe(e)){if(e.length===0)return"[]";var W=oe(e,y);return v&&!Pt(W)?"["+$e(W,v)+"]":"[ "+E.call(W,", ")+" ]"}if(ut(e)){var L=oe(e,y);return"cause"in e&&!cr.call(e,"cause")?"{ ["+String(e)+"] "+E.call(je.call("[cause]: "+y(e.cause),L),", ")+" }":L.length===0?"["+String(e)+"]":"{ ["+String(e)+"] "+E.call(L,", ")+" }"}if(typeof e=="object"&&i){if(we&&typeof e[we]=="function")return e[we]();if(i!=="symbol"&&typeof e.inspect=="function")return e.inspect()}if(gt(e)){var j=[];return Kr.call(e,function(w,T){j.push(y(T,e,!0)+" => "+y(w,e))}),er("Map",ue.call(e),j,v)}if(At(e)){var Y=[];return jr.call(e,function(w){Y.push(y(w,e))}),er("Set",se.call(e),Y,v)}if(ht(e))return Oe("WeakMap");if(bt(e))return Oe("WeakSet");if(St(e))return Oe("WeakRef");if(pt(e))return Z(y(Number(e)));if(dt(e))return Z(y(Ne.call(e)));if(yt(e))return Z(et.call(e));if(st(e))return Z(y(String(e)));if(!ct(e)&&!ft(e)){var J=oe(e,y),C=Xe?Xe(e)===Object.prototype:e instanceof Object||e.constructor===Object,_=e instanceof Object?"":"null prototype",F=!C&&b&&Object(e)===e&&b in e?Be.call(M(e),8,-1):_?"Object":"",ae=C||typeof e.constructor!="function"?"":e.constructor.name?e.constructor.name+" ":"",D=ae+(F||_?"["+E.call(je.call([],F||[],_||[]),": ")+"] ":"");return J.length===0?D+"{}":v?D+"{"+$e(J,v)+"}":D+"{ "+E.call(J,", ")+" }"}return String(e)};function fr(r,e,t){var n=(t.quoteStyle||e)==="double"?'"':"'";return n+r+n}function lt(r){return R.call(String(r),/"/g,"&quot;")}function xe(r){return M(r)==="[object Array]"&&(!b||!(typeof r=="object"&&b in r))}function ct(r){return M(r)==="[object Date]"&&(!b||!(typeof r=="object"&&b in r))}function ft(r){return M(r)==="[object RegExp]"&&(!b||!(typeof r=="object"&&b in r))}function ut(r){return M(r)==="[object Error]"&&(!b||!(typeof r=="object"&&b in r))}function st(r){return M(r)==="[object String]"&&(!b||!(typeof r=="object"&&b in r))}function pt(r){return M(r)==="[object Number]"&&(!b||!(typeof r=="object"&&b in r))}function yt(r){return M(r)==="[object Boolean]"&&(!b||!(typeof r=="object"&&b in r))}function ur(r){if(V)return r&&typeof r=="object"&&r instanceof Symbol;if(typeof r=="symbol")return!0;if(!r||typeof r!="object"||!Fe)return!1;try{return Fe.call(r),!0}catch{}return!1}function dt(r){if(!r||typeof r!="object"||!Ne)return!1;try{return Ne.call(r),!0}catch{}return!1}var vt=Object.prototype.hasOwnProperty||function(r){return r in this};function $(r,e){return vt.call(r,e)}function M(r){return rt.call(r)}function mt(r){if(r.name)return r.name;var e=nt.call(tt.call(r),/^function\s*([\w$]+)/);return e?e[1]:null}function sr(r,e){if(r.indexOf)return r.indexOf(e);for(var t=0,n=r.length;t<n;t++)if(r[t]===e)return t;return-1}function gt(r){if(!ue||!r||typeof r!="object")return!1;try{ue.call(r);try{se.call(r)}catch{return!0}return r instanceof Map}catch{}return!1}function ht(r){if(!ee||!r||typeof r!="object")return!1;try{ee.call(r,ee);try{re.call(r,re)}catch{return!0}return r instanceof WeakMap}catch{}return!1}function St(r){if(!qe||!r||typeof r!="object")return!1;try{return qe.call(r),!0}catch{}return!1}function At(r){if(!se||!r||typeof r!="object")return!1;try{se.call(r);try{ue.call(r)}catch{return!0}return r instanceof Set}catch{}return!1}function bt(r){if(!re||!r||typeof r!="object")return!1;try{re.call(r,re);try{ee.call(r,ee)}catch{return!0}return r instanceof WeakSet}catch{}return!1}function wt(r){return!r||typeof r!="object"?!1:typeof HTMLElement!="undefined"&&r instanceof HTMLElement?!0:typeof r.nodeName=="string"&&typeof r.getAttribute=="function"}function pr(r,e){if(r.length>e.maxStringLength){var t=r.length-e.maxStringLength,n="... "+t+" more character"+(t>1?"s":"");return pr(Be.call(r,0,e.maxStringLength),e)+n}var o=R.call(R.call(r,/(['\\])/g,"\\$1"),/[\x00-\x1f]/g,Ot);return fr(o,"single",e)}function Ot(r){var e=r.charCodeAt(0),t={8:"b",9:"t",10:"n",12:"f",13:"r"}[e];return t?"\\"+t:"\\x"+(e<16?"0":"")+at.call(e.toString(16))}function Z(r){return"Object("+r+")"}function Oe(r){return r+" { ? }"}function er(r,e,t,n){var o=n?$e(t,n):E.call(t,", ");return r+" ("+e+") {"+o+"}"}function Pt(r){for(var e=0;e<r.length;e++)if(sr(r[e],`
`)>=0)return!1;return!0}function Et(r,e){var t;if(r.indent==="	")t="	";else if(typeof r.indent=="number"&&r.indent>0)t=E.call(Array(r.indent+1)," ");else return null;return{base:t,prev:E.call(Array(e+1),t)}}function $e(r,e){if(r.length===0)return"";var t=`
`+e.prev+e.base;return t+E.call(r,","+t)+`
`+e.prev}function oe(r,e){var t=xe(r),n=[];if(t){n.length=r.length;for(var o=0;o<r.length;o++)n[o]=$(r,o)?e(r[o],r):""}var a=typeof Ae=="function"?Ae(r):[],i;if(V){i={};for(var l=0;l<a.length;l++)i["$"+a[l]]=a[l]}for(var c in r)!$(r,c)||t&&String(Number(c))===c&&c<r.length||V&&i["$"+c]instanceof Symbol||(lr.call(/[^\w$]/,c)?n.push(e(c,r)+": "+e(r[c],r)):n.push(c+": "+e(r[c],r)));if(typeof Ae=="function")for(var f=0;f<a.length;f++)cr.call(r,a[f])&&n.push("["+e(a[f])+"]: "+e(r[a[f]],r));return n}var Ue=_e,K=Hr,It=it,Nt=Ue("%TypeError%"),ie=Ue("%WeakMap%",!0),le=Ue("%Map%",!0),Ft=K("WeakMap.prototype.get",!0),xt=K("WeakMap.prototype.set",!0),$t=K("WeakMap.prototype.has",!0),Rt=K("Map.prototype.get",!0),Mt=K("Map.prototype.set",!0),Ct=K("Map.prototype.has",!0),ke=function(r,e){for(var t=r,n;(n=t.next)!==null;t=n)if(n.key===e)return t.next=n.next,n.next=r.next,r.next=n,n},_t=function(r,e){var t=ke(r,e);return t&&t.value},Dt=function(r,e,t){var n=ke(r,e);n?n.value=t:r.next={key:e,next:r.next,value:t}},Tt=function(r,e){return!!ke(r,e)},Bt=function(){var e,t,n,o={assert:function(a){if(!o.has(a))throw new Nt("Side channel does not contain "+It(a))},get:function(a){if(ie&&a&&(typeof a=="object"||typeof a=="function")){if(e)return Ft(e,a)}else if(le){if(t)return Rt(t,a)}else if(n)return _t(n,a)},has:function(a){if(ie&&a&&(typeof a=="object"||typeof a=="function")){if(e)return $t(e,a)}else if(le){if(t)return Ct(t,a)}else if(n)return Tt(n,a);return!1},set:function(a,i){ie&&a&&(typeof a=="object"||typeof a=="function")?(e||(e=new ie),xt(e,a,i)):le?(t||(t=new le),Mt(t,a,i)):(n||(n={key:{},next:null}),Dt(n,a,i))}};return o},Ut=String.prototype.replace,kt=/%20/g,Pe={RFC1738:"RFC1738",RFC3986:"RFC3986"},We={default:Pe.RFC3986,formatters:{RFC1738:function(r){return Ut.call(r,kt,"+")},RFC3986:function(r){return String(r)}},RFC1738:Pe.RFC1738,RFC3986:Pe.RFC3986},Wt=We,Ee=Object.prototype.hasOwnProperty,B=Array.isArray,P=function(){for(var r=[],e=0;e<256;++e)r.push("%"+((e<16?"0":"")+e.toString(16)).toUpperCase());return r}(),Lt=function(e){for(;e.length>1;){var t=e.pop(),n=t.obj[t.prop];if(B(n)){for(var o=[],a=0;a<n.length;++a)typeof n[a]!="undefined"&&o.push(n[a]);t.obj[t.prop]=o}}},yr=function(e,t){for(var n=t&&t.plainObjects?Object.create(null):{},o=0;o<e.length;++o)typeof e[o]!="undefined"&&(n[o]=e[o]);return n},Jt=function r(e,t,n){if(!t)return e;if(typeof t!="object"){if(B(e))e.push(t);else if(e&&typeof e=="object")(n&&(n.plainObjects||n.allowPrototypes)||!Ee.call(Object.prototype,t))&&(e[t]=!0);else return[e,t];return e}if(!e||typeof e!="object")return[e].concat(t);var o=e;return B(e)&&!B(t)&&(o=yr(e,n)),B(e)&&B(t)?(t.forEach(function(a,i){if(Ee.call(e,i)){var l=e[i];l&&typeof l=="object"&&a&&typeof a=="object"?e[i]=r(l,a,n):e.push(a)}else e[i]=a}),e):Object.keys(t).reduce(function(a,i){var l=t[i];return Ee.call(a,i)?a[i]=r(a[i],l,n):a[i]=l,a},o)},Gt=function(e,t){return Object.keys(t).reduce(function(n,o){return n[o]=t[o],n},e)},zt=function(r,e,t){var n=r.replace(/\+/g," ");if(t==="iso-8859-1")return n.replace(/%[0-9a-f]{2}/gi,unescape);try{return decodeURIComponent(n)}catch{return n}},Ht=function(e,t,n,o,a){if(e.length===0)return e;var i=e;if(typeof e=="symbol"?i=Symbol.prototype.toString.call(e):typeof e!="string"&&(i=String(e)),n==="iso-8859-1")return escape(i).replace(/%u[0-9a-f]{4}/gi,function(u){return"%26%23"+parseInt(u.slice(2),16)+"%3B"});for(var l="",c=0;c<i.length;++c){var f=i.charCodeAt(c);if(f===45||f===46||f===95||f===126||f>=48&&f<=57||f>=65&&f<=90||f>=97&&f<=122||a===Wt.RFC1738&&(f===40||f===41)){l+=i.charAt(c);continue}if(f<128){l=l+P[f];continue}if(f<2048){l=l+(P[192|f>>6]+P[128|f&63]);continue}if(f<55296||f>=57344){l=l+(P[224|f>>12]+P[128|f>>6&63]+P[128|f&63]);continue}c+=1,f=65536+((f&1023)<<10|i.charCodeAt(c)&1023),l+=P[240|f>>18]+P[128|f>>12&63]+P[128|f>>6&63]+P[128|f&63]}return l},Qt=function(e){for(var t=[{obj:{o:e},prop:"o"}],n=[],o=0;o<t.length;++o)for(var a=t[o],i=a.obj[a.prop],l=Object.keys(i),c=0;c<l.length;++c){var f=l[c],u=i[f];typeof u=="object"&&u!==null&&n.indexOf(u)===-1&&(t.push({obj:i,prop:f}),n.push(u))}return Lt(t),e},Vt=function(e){return Object.prototype.toString.call(e)==="[object RegExp]"},qt=function(e){return!e||typeof e!="object"?!1:!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))},Kt=function(e,t){return[].concat(e,t)},jt=function(e,t){if(B(e)){for(var n=[],o=0;o<e.length;o+=1)n.push(t(e[o]));return n}return t(e)},dr={arrayToObject:yr,assign:Gt,combine:Kt,compact:Qt,decode:zt,encode:Ht,isBuffer:qt,isRegExp:Vt,maybeMap:jt,merge:Jt},vr=Bt,Re=dr,te=We,Yt=Object.prototype.hasOwnProperty,rr={brackets:function(e){return e+"[]"},comma:"comma",indices:function(e,t){return e+"["+t+"]"},repeat:function(e){return e}},U=Array.isArray,Xt=String.prototype.split,Zt=Array.prototype.push,mr=function(r,e){Zt.apply(r,U(e)?e:[e])},en=Date.prototype.toISOString,tr=te.default,A={addQueryPrefix:!1,allowDots:!1,charset:"utf-8",charsetSentinel:!1,delimiter:"&",encode:!0,encoder:Re.encode,encodeValuesOnly:!1,format:tr,formatter:te.formatters[tr],indices:!1,serializeDate:function(e){return en.call(e)},skipNulls:!1,strictNullHandling:!1},rn=function(e){return typeof e=="string"||typeof e=="number"||typeof e=="boolean"||typeof e=="symbol"||typeof e=="bigint"},Ie={},tn=function r(e,t,n,o,a,i,l,c,f,u,v,y,g,h,O){for(var m=e,N=O,I=0,W=!1;(N=N.get(Ie))!==void 0&&!W;){var L=N.get(e);if(I+=1,typeof L!="undefined"){if(L===I)throw new RangeError("Cyclic object value");W=!0}typeof N.get(Ie)=="undefined"&&(I=0)}if(typeof l=="function"?m=l(t,m):m instanceof Date?m=u(m):n==="comma"&&U(m)&&(m=Re.maybeMap(m,function(de){return de instanceof Date?u(de):de})),m===null){if(o)return i&&!g?i(t,A.encoder,h,"key",v):t;m=""}if(rn(m)||Re.isBuffer(m)){if(i){var j=g?t:i(t,A.encoder,h,"key",v);if(n==="comma"&&g){for(var Y=Xt.call(String(m),","),J="",C=0;C<Y.length;++C)J+=(C===0?"":",")+y(i(Y[C],A.encoder,h,"value",v));return[y(j)+"="+J]}return[y(j)+"="+y(i(m,A.encoder,h,"value",v))]}return[y(t)+"="+y(String(m))]}var _=[];if(typeof m=="undefined")return _;var F;if(n==="comma"&&U(m))F=[{value:m.length>0?m.join(",")||null:void 0}];else if(U(l))F=l;else{var ae=Object.keys(m);F=c?ae.sort(c):ae}for(var D=0;D<F.length;++D){var w=F[D],T=typeof w=="object"&&typeof w.value!="undefined"?w.value:m[w];if(!(a&&T===null)){var ye=U(m)?typeof n=="function"?n(t,w):t:t+(f?"."+w:"["+w+"]");O.set(e,I);var X=vr();X.set(Ie,O),mr(_,r(T,ye,n,o,a,i,l,c,f,u,v,y,g,h,X))}}return _},nn=function(e){if(!e)return A;if(e.encoder!==null&&typeof e.encoder!="undefined"&&typeof e.encoder!="function")throw new TypeError("Encoder has to be a function.");var t=e.charset||A.charset;if(typeof e.charset!="undefined"&&e.charset!=="utf-8"&&e.charset!=="iso-8859-1")throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var n=te.default;if(typeof e.format!="undefined"){if(!Yt.call(te.formatters,e.format))throw new TypeError("Unknown format option provided.");n=e.format}var o=te.formatters[n],a=A.filter;return(typeof e.filter=="function"||U(e.filter))&&(a=e.filter),{addQueryPrefix:typeof e.addQueryPrefix=="boolean"?e.addQueryPrefix:A.addQueryPrefix,allowDots:typeof e.allowDots=="undefined"?A.allowDots:!!e.allowDots,charset:t,charsetSentinel:typeof e.charsetSentinel=="boolean"?e.charsetSentinel:A.charsetSentinel,delimiter:typeof e.delimiter=="undefined"?A.delimiter:e.delimiter,encode:typeof e.encode=="boolean"?e.encode:A.encode,encoder:typeof e.encoder=="function"?e.encoder:A.encoder,encodeValuesOnly:typeof e.encodeValuesOnly=="boolean"?e.encodeValuesOnly:A.encodeValuesOnly,filter:a,format:n,formatter:o,serializeDate:typeof e.serializeDate=="function"?e.serializeDate:A.serializeDate,skipNulls:typeof e.skipNulls=="boolean"?e.skipNulls:A.skipNulls,sort:typeof e.sort=="function"?e.sort:null,strictNullHandling:typeof e.strictNullHandling=="boolean"?e.strictNullHandling:A.strictNullHandling}},an=function(r,e){var t=r,n=nn(e),o,a;typeof n.filter=="function"?(a=n.filter,t=a("",t)):U(n.filter)&&(a=n.filter,o=a);var i=[];if(typeof t!="object"||t===null)return"";var l;e&&e.arrayFormat in rr?l=e.arrayFormat:e&&"indices"in e?l=e.indices?"indices":"repeat":l="indices";var c=rr[l];o||(o=Object.keys(t)),n.sort&&o.sort(n.sort);for(var f=vr(),u=0;u<o.length;++u){var v=o[u];n.skipNulls&&t[v]===null||mr(i,tn(t[v],v,c,n.strictNullHandling,n.skipNulls,n.encode?n.encoder:null,n.filter,n.sort,n.allowDots,n.serializeDate,n.format,n.formatter,n.encodeValuesOnly,n.charset,f))}var y=i.join(n.delimiter),g=n.addQueryPrefix===!0?"?":"";return n.charsetSentinel&&(n.charset==="iso-8859-1"?g+="utf8=%26%2310003%3B&":g+="utf8=%E2%9C%93&"),y.length>0?g+y:""},q=dr,Me=Object.prototype.hasOwnProperty,on=Array.isArray,S={allowDots:!1,allowPrototypes:!1,allowSparse:!1,arrayLimit:20,charset:"utf-8",charsetSentinel:!1,comma:!1,decoder:q.decode,delimiter:"&",depth:5,ignoreQueryPrefix:!1,interpretNumericEntities:!1,parameterLimit:1e3,parseArrays:!0,plainObjects:!1,strictNullHandling:!1},ln=function(r){return r.replace(/&#(\d+);/g,function(e,t){return String.fromCharCode(parseInt(t,10))})},gr=function(r,e){return r&&typeof r=="string"&&e.comma&&r.indexOf(",")>-1?r.split(","):r},cn="utf8=%26%2310003%3B",fn="utf8=%E2%9C%93",un=function(e,t){var n={},o=t.ignoreQueryPrefix?e.replace(/^\?/,""):e,a=t.parameterLimit===1/0?void 0:t.parameterLimit,i=o.split(t.delimiter,a),l=-1,c,f=t.charset;if(t.charsetSentinel)for(c=0;c<i.length;++c)i[c].indexOf("utf8=")===0&&(i[c]===fn?f="utf-8":i[c]===cn&&(f="iso-8859-1"),l=c,c=i.length);for(c=0;c<i.length;++c)if(c!==l){var u=i[c],v=u.indexOf("]="),y=v===-1?u.indexOf("="):v+1,g,h;y===-1?(g=t.decoder(u,S.decoder,f,"key"),h=t.strictNullHandling?null:""):(g=t.decoder(u.slice(0,y),S.decoder,f,"key"),h=q.maybeMap(gr(u.slice(y+1),t),function(O){return t.decoder(O,S.decoder,f,"value")})),h&&t.interpretNumericEntities&&f==="iso-8859-1"&&(h=ln(h)),u.indexOf("[]=")>-1&&(h=on(h)?[h]:h),Me.call(n,g)?n[g]=q.combine(n[g],h):n[g]=h}return n},sn=function(r,e,t,n){for(var o=n?e:gr(e,t),a=r.length-1;a>=0;--a){var i,l=r[a];if(l==="[]"&&t.parseArrays)i=[].concat(o);else{i=t.plainObjects?Object.create(null):{};var c=l.charAt(0)==="["&&l.charAt(l.length-1)==="]"?l.slice(1,-1):l,f=parseInt(c,10);!t.parseArrays&&c===""?i={0:o}:!isNaN(f)&&l!==c&&String(f)===c&&f>=0&&t.parseArrays&&f<=t.arrayLimit?(i=[],i[f]=o):c!=="__proto__"&&(i[c]=o)}o=i}return o},pn=function(e,t,n,o){if(!!e){var a=n.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,i=/(\[[^[\]]*])/,l=/(\[[^[\]]*])/g,c=n.depth>0&&i.exec(a),f=c?a.slice(0,c.index):a,u=[];if(f){if(!n.plainObjects&&Me.call(Object.prototype,f)&&!n.allowPrototypes)return;u.push(f)}for(var v=0;n.depth>0&&(c=l.exec(a))!==null&&v<n.depth;){if(v+=1,!n.plainObjects&&Me.call(Object.prototype,c[1].slice(1,-1))&&!n.allowPrototypes)return;u.push(c[1])}return c&&u.push("["+a.slice(c.index)+"]"),sn(u,t,n,o)}},yn=function(e){if(!e)return S;if(e.decoder!==null&&e.decoder!==void 0&&typeof e.decoder!="function")throw new TypeError("Decoder has to be a function.");if(typeof e.charset!="undefined"&&e.charset!=="utf-8"&&e.charset!=="iso-8859-1")throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var t=typeof e.charset=="undefined"?S.charset:e.charset;return{allowDots:typeof e.allowDots=="undefined"?S.allowDots:!!e.allowDots,allowPrototypes:typeof e.allowPrototypes=="boolean"?e.allowPrototypes:S.allowPrototypes,allowSparse:typeof e.allowSparse=="boolean"?e.allowSparse:S.allowSparse,arrayLimit:typeof e.arrayLimit=="number"?e.arrayLimit:S.arrayLimit,charset:t,charsetSentinel:typeof e.charsetSentinel=="boolean"?e.charsetSentinel:S.charsetSentinel,comma:typeof e.comma=="boolean"?e.comma:S.comma,decoder:typeof e.decoder=="function"?e.decoder:S.decoder,delimiter:typeof e.delimiter=="string"||q.isRegExp(e.delimiter)?e.delimiter:S.delimiter,depth:typeof e.depth=="number"||e.depth===!1?+e.depth:S.depth,ignoreQueryPrefix:e.ignoreQueryPrefix===!0,interpretNumericEntities:typeof e.interpretNumericEntities=="boolean"?e.interpretNumericEntities:S.interpretNumericEntities,parameterLimit:typeof e.parameterLimit=="number"?e.parameterLimit:S.parameterLimit,parseArrays:e.parseArrays!==!1,plainObjects:typeof e.plainObjects=="boolean"?e.plainObjects:S.plainObjects,strictNullHandling:typeof e.strictNullHandling=="boolean"?e.strictNullHandling:S.strictNullHandling}},dn=function(r,e){var t=yn(e);if(r===""||r===null||typeof r=="undefined")return t.plainObjects?Object.create(null):{};for(var n=typeof r=="string"?un(r,t):r,o=t.plainObjects?Object.create(null):{},a=Object.keys(n),i=0;i<a.length;++i){var l=a[i],c=pn(l,n[l],t,typeof r=="string");o=q.merge(o,c,t)}return t.allowSparse===!0?o:q.compact(o)},vn=an,mn=dn,gn=We,hn={formats:gn,parse:mn,stringify:vn};const p="/adminApi",s=async(r,e={})=>{try{(!e.method||e.method=="get")&&e.params&&(r=r+"?"+hn.stringify(e.params));const t=localStorage.getItem("token"),n=await fetch(r,ze(Ge({},e),{headers:{authorization:t||"","Content-Type":"application/json;charset=utf-8"}}));if(n.status==401){window.localStorage.setItem("url",r),window.localStorage.setItem("options",JSON.stringify(e));const a=window.localStorage.getItem("refresh_token");if(a&&a!="undefined"){const i=await s(p+"/refresh_token?refresh_token="+a,{method:"post"});if(i.status===200&&i.ok){window.localStorage.setItem("token",i.data.data.token),i.data.data.refresh_token&&i.data.data.refresh_token!="undefined"&&window.localStorage.setItem("refresh_token",i.data.data.refresh_token);let l=window.localStorage.getItem("url"),c=window.localStorage.getItem("options");return await s(l,JSON.parse(c))}else i.status===402&&(window.localStorage.removeItem("token"),window.localStorage.removeItem("userInfo"),window.localStorage.removeItem("refresh_token"),Pr.push({name:"Login"}))}}const o=await n.json();return n.data=o,n}catch(t){console.log(t)}},wn=async r=>{const e=p+"/login";return await s(e,{method:"post",body:JSON.stringify(r)})},On=async()=>{const r=p+"/info";return await s(r)},Pn=async(r,e)=>{const t=p+"/me/"+r;return await s(t,{method:"put",body:JSON.stringify(e)})},En=async r=>{const e=p+"/user/"+r;return await s(e)},In=async r=>{const e=p+"/users";return await s(e,{params:r})},Nn=async r=>{const e=p+"/user";return await s(e,{method:"post",body:JSON.stringify(r)})},Fn=async r=>{const e=p+"/user/"+r;return await s(e,{method:"delete"})},xn=async(r,e)=>{const t=p+"/user/"+r;return await s(t,{method:"put",body:JSON.stringify(e)})},$n=async r=>{const e=p+"/roles";return await s(e,{params:r})},Rn=async r=>{const e=p+"/role/"+r;return await s(e,{method:"delete"})},Mn=async r=>{const e=p+"/role";return await s(e,{method:"post",body:JSON.stringify(r)})},Cn=async()=>{const r=p+"/rights";return await s(r)},_n=async(r,e)=>{const t=p+"/role/"+r;return await s(t,{method:"put",body:JSON.stringify(e)})},Dn=async r=>{const e=p+"/categories";return await s(e,{params:r})},Tn=async r=>{const e=p+"/category";return await s(e,{method:"post",body:JSON.stringify(r)})},Bn=async r=>{const e=p+"/category/"+r;return await s(e,{method:"delete"})},Un=async(r,e)=>{const t=p+"/category/"+r;return await s(t,{method:"put",body:JSON.stringify(e)})},kn=async r=>{const e=p+"/labels";return await s(e,{params:r})},Wn=async r=>{const e=p+"/label";return await s(e,{method:"post",body:JSON.stringify(r)})},Ln=async r=>{const e=p+"/label/"+r;return await s(e,{method:"delete"})},Jn=async(r,e)=>{const t=p+"/label/"+r;return await s(t,{method:"put",body:JSON.stringify(e)})},Gn=async r=>{const e=p+"/friends/";return await s(e,{params:r})},zn=async r=>{const e=p+"/friend";return await s(e,{method:"post",body:JSON.stringify(r)})},Hn=async r=>{const e=p+"/friend/"+r;return await s(e,{method:"delete"})},Qn=async(r,e)=>{const t=p+"/friend/"+r;return await s(t,{method:"put",body:JSON.stringify(e)})},Vn=async r=>{const e=p+"/articles/";return await s(e,{params:r})},qn=async r=>{const e=p+"/article/"+r;return await s(e)},Kn=async r=>{const e=p+"/article/"+r;return await s(e,{method:"delete"})},jn=async r=>{const e=p+"/article/";return await s(e,{method:"post",body:JSON.stringify(r)})},Yn=async(r,e)=>{const t=p+"/article/"+r;return await s(t,{method:"put",body:JSON.stringify(e)})},Xn=async r=>{const e=p+"/aboutArticle";return await s(e,{method:"post",body:JSON.stringify(r)})},Zn=async r=>{const e=p+"/aboutArticles";return await s(e,{params:r})},ea=async r=>{const e=p+"/aboutArticle/"+r;return await s(e)},ra=async(r,e)=>{const t=p+"/aboutArticle/"+r;return await s(t,{method:"put",body:JSON.stringify(e)})},ta=async r=>{const e=p+"/aboutArticle/"+r;return await s(e,{method:"delete"})},na=async r=>{const e=p+"/anime";return await s(e,{method:"post",body:JSON.stringify(r)})},aa=async r=>{const e=p+"/animes";return await s(e,{params:r})},oa=async r=>{const e=p+"/anime/"+r;return await s(e)},ia=async(r,e)=>{const t=p+"/anime/"+r;return await s(t,{method:"put",body:JSON.stringify(e)})},la=async r=>{const e=p+"/anime/"+r;return await s(e,{method:"delete"})};export{Gn as A,zn as B,Qn as C,Hn as D,Zn as E,ta as F,Xn as G,ea as H,ra as I,aa as J,la as K,na as L,oa as M,ia as N,In as a,$n as b,Nn as c,Fn as d,Pn as e,On as f,En as g,Mn as h,Rn as i,Cn as j,_n as k,wn as l,Dn as m,Tn as n,Un as o,Bn as p,kn as q,Wn as r,Jn as s,Ln as t,xn as u,Vn as v,Kn as w,jn as x,qn as y,Yn as z};