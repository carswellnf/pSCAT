function c(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var v={exports:{}},g={exports:{}};g.exports=m,g.exports.preferredCharsets=m;var G=/^\s*([^\s;]+)\s*(?:;(.*))?$/;function H(t){for(var e=t.split(","),r=0,n=0;r<e.length;r++){var o=I(e[r].trim(),r);o&&(e[n++]=o)}return e.length=n,e}function I(t,e){var r=G.exec(t);if(!r)return null;var n=r[1],o=1;if(r[2])for(var i=r[2].split(";"),u=0;u<i.length;u++){var s=i[u].trim().split("=");if(s[0]==="q"){o=parseFloat(s[1]);break}}return{charset:n,q:o,i:e}}function J(t,e,r){for(var n={o:-1,q:0,s:0},o=0;o<e.length;o++){var i=K(t,e[o],r);i&&(n.s-i.s||n.q-i.q||n.o-i.o)<0&&(n=i)}return n}function K(t,e,r){var n=0;if(e.charset.toLowerCase()===t.toLowerCase())n|=1;else if(e.charset!=="*")return null;return{i:r,o:e.i,q:e.q,s:n}}function m(t,e){var r=H(t===void 0?"*":t||"");if(!e)return r.filter(C).sort($).map(Q);var n=e.map(function(o,i){return J(o,r,i)});return n.filter(C).sort($).map(function(o){return e[n.indexOf(o)]})}function $(t,e){return e.q-t.q||e.s-t.s||t.o-e.o||t.i-e.i||0}function Q(t){return t.charset}function C(t){return t.q>0}var L=g.exports;c(L);var d={exports:{}};d.exports=b,d.exports.preferredEncodings=b;var R=/^\s*([^\s;]+)\s*(?:;(.*))?$/;function S(t){for(var e=t.split(","),r=!1,n=1,o=0,i=0;o<e.length;o++){var u=U(e[o].trim(),o);u&&(e[i++]=u,r=r||w("identity",u),n=Math.min(n,u.q||1))}return r||(e[i++]={encoding:"identity",q:n,i:o}),e.length=i,e}function U(t,e){var r=R.exec(t);if(!r)return null;var n=r[1],o=1;if(r[2])for(var i=r[2].split(";"),u=0;u<i.length;u++){var s=i[u].trim().split("=");if(s[0]==="q"){o=parseFloat(s[1]);break}}return{encoding:n,q:o,i:e}}function V(t,e,r){for(var n={o:-1,q:0,s:0},o=0;o<e.length;o++){var i=w(t,e[o],r);i&&(n.s-i.s||n.q-i.q||n.o-i.o)<0&&(n=i)}return n}function w(t,e,r){var n=0;if(e.encoding.toLowerCase()===t.toLowerCase())n|=1;else if(e.encoding!=="*")return null;return{i:r,o:e.i,q:e.q,s:n}}function b(t,e){var r=S(t||"");if(!e)return r.filter(T).sort(O).map(W);var n=e.map(function(o,i){return V(o,r,i)});return n.filter(T).sort(O).map(function(o){return e[n.indexOf(o)]})}function O(t,e){return e.q-t.q||e.s-t.s||t.o-e.o||t.i-e.i||0}function W(t){return t.encoding}function T(t){return t.q>0}var E=d.exports;c(E);var h={exports:{}};h.exports=F,h.exports.preferredLanguages=F;var X=/^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;function Y(t){for(var e=t.split(","),r=0,n=0;r<e.length;r++){var o=M(e[r].trim(),r);o&&(e[n++]=o)}return e.length=n,e}function M(t,e){var r=X.exec(t);if(!r)return null;var n=r[1],o=r[2],i=n;o&&(i+="-"+o);var u=1;if(r[3])for(var s=r[3].split(";"),f=0;f<s.length;f++){var l=s[f].split("=");l[0]==="q"&&(u=parseFloat(l[1]))}return{prefix:n,suffix:o,q:u,i:e,full:i}}function Z(t,e,r){for(var n={o:-1,q:0,s:0},o=0;o<e.length;o++){var i=ee(t,e[o],r);i&&(n.s-i.s||n.q-i.q||n.o-i.o)<0&&(n=i)}return n}function ee(t,e,r){var n=M(t);if(!n)return null;var o=0;if(e.full.toLowerCase()===n.full.toLowerCase())o|=4;else if(e.prefix.toLowerCase()===n.full.toLowerCase())o|=2;else if(e.full.toLowerCase()===n.prefix.toLowerCase())o|=1;else if(e.full!=="*")return null;return{i:r,o:e.i,q:e.q,s:o}}function F(t,e){var r=Y(t===void 0?"*":t||"");if(!e)return r.filter(k).sort(j).map(te);var n=e.map(function(o,i){return Z(o,r,i)});return n.filter(k).sort(j).map(function(o){return e[n.indexOf(o)]})}function j(t,e){return e.q-t.q||e.s-t.s||t.o-e.o||t.i-e.i||0}function te(t){return t.full}function k(t){return t.q>0}var _=h.exports;c(_);var y={exports:{}};y.exports=D,y.exports.preferredMediaTypes=D;var re=/^\s*([^\s\/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;function ne(t){for(var e=se(t),r=0,n=0;r<e.length;r++){var o=N(e[r].trim(),r);o&&(e[n++]=o)}return e.length=n,e}function N(t,e){var r=re.exec(t);if(!r)return null;var n=Object.create(null),o=1,i=r[2],u=r[1];if(r[3])for(var s=fe(r[3]).map(ue),f=0;f<s.length;f++){var l=s[f],q=l[0].toLowerCase(),p=l[1],x=p&&p[0]==='"'&&p[p.length-1]==='"'?p.substr(1,p.length-2):p;if(q==="q"){o=parseFloat(x);break}n[q]=x}return{type:u,subtype:i,params:n,q:o,i:e}}function oe(t,e,r){for(var n={o:-1,q:0,s:0},o=0;o<e.length;o++){var i=ie(t,e[o],r);i&&(n.s-i.s||n.q-i.q||n.o-i.o)<0&&(n=i)}return n}function ie(t,e,r){var n=N(t),o=0;if(!n)return null;if(e.type.toLowerCase()==n.type.toLowerCase())o|=4;else if(e.type!="*")return null;if(e.subtype.toLowerCase()==n.subtype.toLowerCase())o|=2;else if(e.subtype!="*")return null;var i=Object.keys(e.params);if(i.length>0)if(i.every(function(u){return e.params[u]=="*"||(e.params[u]||"").toLowerCase()==(n.params[u]||"").toLowerCase()}))o|=1;else return null;return{i:r,o:e.i,q:e.q,s:o}}function D(t,e){var r=ne(t===void 0?"*/*":t||"");if(!e)return r.filter(z).sort(P).map(ae);var n=e.map(function(o,i){return oe(o,r,i)});return n.filter(z).sort(P).map(function(o){return e[n.indexOf(o)]})}function P(t,e){return e.q-t.q||e.s-t.s||t.o-e.o||t.i-e.i||0}function ae(t){return t.type+"/"+t.subtype}function z(t){return t.q>0}function A(t){for(var e=0,r=0;(r=t.indexOf('"',r))!==-1;)e++,r++;return e}function ue(t){var e=t.indexOf("="),r,n;return e===-1?r=t:(r=t.substr(0,e),n=t.substr(e+1)),[r,n]}function se(t){for(var e=t.split(","),r=1,n=0;r<e.length;r++)A(e[n])%2==0?e[++n]=e[r]:e[n]+=","+e[r];return e.length=n+1,e}function fe(t){for(var e=t.split(";"),r=1,n=0;r<e.length;r++)A(e[n])%2==0?e[++n]=e[r]:e[n]+=";"+e[r];e.length=n+1;for(var r=0;r<e.length;r++)e[r]=e[r].trim();return e}var B=y.exports;c(B);var pe=L,le=E,ce=_,ve=B;v.exports=a;var ge=v.exports.Negotiator=a;function a(t){if(!(this instanceof a))return new a(t);this.request=t}a.prototype.charset=function(t){var e=this.charsets(t);return e&&e[0]},a.prototype.charsets=function(t){return pe(this.request.headers["accept-charset"],t)},a.prototype.encoding=function(t){var e=this.encodings(t);return e&&e[0]},a.prototype.encodings=function(t){return le(this.request.headers["accept-encoding"],t)},a.prototype.language=function(t){var e=this.languages(t);return e&&e[0]},a.prototype.languages=function(t){return ce(this.request.headers["accept-language"],t)},a.prototype.mediaType=function(t){var e=this.mediaTypes(t);return e&&e[0]},a.prototype.mediaTypes=function(t){return ve(this.request.headers.accept,t)},a.prototype.preferredCharset=a.prototype.charset,a.prototype.preferredCharsets=a.prototype.charsets,a.prototype.preferredEncoding=a.prototype.encoding,a.prototype.preferredEncodings=a.prototype.encodings,a.prototype.preferredLanguage=a.prototype.language,a.prototype.preferredLanguages=a.prototype.languages,a.prototype.preferredMediaType=a.prototype.mediaType,a.prototype.preferredMediaTypes=a.prototype.mediaTypes;var de=v.exports,he=c(de);export{ge as Negotiator,he as default};