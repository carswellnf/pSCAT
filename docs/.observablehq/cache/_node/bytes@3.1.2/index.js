function v(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var p={exports:{}};p.exports=x;var y=p.exports.format=u,B=p.exports.parse=l,g=/\B(?=(\d{3})+(?!\d))/g,h=/(?:\.0*|(\.[^0]+)0+)$/,o={b:1,kb:1024,mb:1<<20,gb:1<<30,tb:Math.pow(1024,4),pb:Math.pow(1024,5)},w=/^((-|\+)?(\d+(?:\.\d+)?)) *(kb|mb|gb|tb|pb)$/i;function x(t,e){return typeof t=="string"?l(t):typeof t=="number"?u(t,e):null}function u(t,e){if(!Number.isFinite(t))return null;var a=Math.abs(t),n=e&&e.thousandsSeparator||"",b=e&&e.unitSeparator||"",f=e&&e.decimalPlaces!==void 0?e.decimalPlaces:2,c=!!(e&&e.fixedDecimals),r=e&&e.unit||"";(!r||!o[r.toLowerCase()])&&(a>=o.pb?r="PB":a>=o.tb?r="TB":a>=o.gb?r="GB":a>=o.mb?r="MB":a>=o.kb?r="KB":r="B");var d=t/o[r.toLowerCase()],s=d.toFixed(f);return c||(s=s.replace(h,"$1")),n&&(s=s.split(".").map(function(i,m){return m===0?i.replace(g,n):i}).join(".")),s+b+r}function l(t){if(typeof t=="number"&&!isNaN(t))return t;if(typeof t!="string")return null;var e=w.exec(t),a,n="b";return e?(a=parseFloat(e[1]),n=e[4].toLowerCase()):(a=parseInt(t,10),n="b"),isNaN(a)?null:Math.floor(o[n]*a)}var M=p.exports,N=v(M);export{N as default,y as format,B as parse};