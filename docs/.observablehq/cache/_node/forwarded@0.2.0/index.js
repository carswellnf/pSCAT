function u(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var s=o;function o(e){if(!e)throw new TypeError("argument req is required");var t=d(e.headers["x-forwarded-for"]||""),a=c(e),r=[a].concat(t);return r}function c(e){return e.socket?e.socket.remoteAddress:e.connection.remoteAddress}function d(e){for(var t=e.length,a=[],r=e.length,n=e.length-1;n>=0;n--)switch(e.charCodeAt(n)){case 32:r===t&&(r=t=n);break;case 44:r!==t&&a.push(e.substring(r,t)),r=t=n;break;default:r=n;break}return r!==t&&a.push(e.substring(r,t)),a}var f=u(s);export{f as default};
