function l(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var p=c;function c(t,e,i){if(typeof e!="string")throw new TypeError("argument str must be a string");var s=e.indexOf("=");if(s===-1)return-2;var a=e.slice(s+1).split(","),r=[];r.type=e.slice(0,s);for(var u=0;u<a.length;u++){var o=a[u].split("-"),d=parseInt(o[0],10),n=parseInt(o[1],10);isNaN(d)?(d=t-n,n=t-1):isNaN(n)&&(n=t-1),n>t-1&&(n=t-1),!(isNaN(d)||isNaN(n)||d>n||d<0)&&r.push({start:d,end:n})}return r.length<1?-1:i&&i.combine?f(r):r}function f(t){for(var e=t.map(v).sort(g),i=0,s=1;s<e.length;s++){var a=e[s],r=e[i];a.start>r.end+1?e[++i]=a:a.end>r.end&&(r.end=a.end,r.index=Math.min(r.index,a.index))}e.length=i+1;var u=e.sort(N).map(h);return u.type=t.type,u}function v(t,e){return{start:t.start,end:t.end,index:e}}function h(t){return{start:t.start,end:t.end}}function N(t,e){return t.index-e.index}function g(t,e){return t.start-e.start}var m=l(p);export{m as default};
