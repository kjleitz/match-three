!function(t){var r={};function n(e){if(r[e])return r[e].exports;var o=r[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=r,n.d=function(t,r,e){n.o(t,r)||Object.defineProperty(t,r,{enumerable:!0,get:e})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,r){if(1&r&&(t=n(t)),8&r)return t;if(4&r&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(n.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&r&&"string"!=typeof t)for(var o in t)n.d(e,o,function(r){return t[r]}.bind(null,o));return e},n.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(r,"a",r),r},n.o=function(t,r){return Object.prototype.hasOwnProperty.call(t,r)},n.p="",n(n.s=3)}([function(t,r,n){"use strict";n.d(r,"d",(function(){return o})),n.d(r,"c",(function(){return u})),n.d(r,"h",(function(){return i})),n.d(r,"a",(function(){return c})),n.d(r,"g",(function(){return a})),n.d(r,"b",(function(){return s})),n.d(r,"e",(function(){return l})),n.d(r,"f",(function(){return h})),n.d(r,"i",(function(){return d}));var e=function(){for(var t=0,r=0,n=arguments.length;r<n;r++)t+=arguments[r].length;var e=Array(t),o=0;for(r=0;r<n;r++)for(var u=arguments[r],i=0,c=u.length;i<c;i++,o++)e[o]=u[i];return e};function o(t){for(var r=[],n=1;n<arguments.length;n++)r[n-1]=arguments[n];for(var e="number"==typeof r[0]?r[0]:0,o="function"==typeof r[0]?r[0]:r[1],u=t<e?[t,e]:[e,t],i=u[0],c=u[1]-i,a=Array(c),f=0;f<c;f++)a[f]=o?o(f+i):f+i;return a}var u=function(t,r,n){void 0===r&&(r=0),void 0===n&&(n=!0);var e=t<r?[t,r]:[r,t],o=e[0],u=e[1],i=Math.random()*(u-o);return o+(n?Math.floor(i):i)},i=function(t){return t[Math.floor(Math.random()*t.length)]},c=function(t,r){var n=r.x-t.x,e=r.y-t.y;return Math.sqrt(Math.pow(n,2)+Math.pow(e,2))},a=function(t,r,n){var e=t.x-r.x,o=t.y-r.y,u=Math.cos(n),i=Math.sin(n),c=e*i+o*u;return{x:e*u-o*i+r.x,y:c+r.y}};function f(t){return void 0===t||"[object Null]"===Object.prototype.toString.call(t)}window.rotatePoint=a;var s=function(t,r){var n;return t.find((function(t,e,o){return!f(n=r(t,e,o))})),n},l=function(t,r){void 0===r&&(r=1);var n=r%4;switch(n<0?4-n:n){case 1:return t.reduce((function(r,n,e){return n.forEach((function(n,o){var u=o,i=t.length-e-1;r[u]=r[u]||[],r[u][i]=n})),r}),[]);case 2:return e(t).reverse().map((function(t){return e(t).reverse()}));case 3:return t.reduce((function(t,r,n){return r.forEach((function(e,o){var u=r.length-o-1,i=n;t[u]=t[u]||[],t[u][i]=e})),t}),[]);default:return t.map((function(t){return e(t)}))}},h=function(t,r,n,e){var o=t.row,u=t.col,i=e%4;switch(i<0?4-i:i){case 1:return{row:u,col:r-o-1};case 2:return{row:r-o-1,col:n-u-1};case 3:return{row:n-u-1,col:o};default:return{row:o,col:u}}},d=function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return t}},function(t,r,n){"use strict";var e="mundane",o=function(){function t(t){var r=t.type,n=t.value,o=t.variant;this.type=r,this.value=n||1,this._variant=o||e}return Object.defineProperty(t.prototype,"variant",{get:function(){return this._variant||e},set:function(t){this._variant=t||e},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isMundane",{get:function(){return this.variant===e},enumerable:!0,configurable:!0}),t}();r.a=o},function(t,r,n){"use strict";var e=n(1),o=n(0),u=function(){for(var t=0,r=0,n=arguments.length;r<n;r++)t+=arguments[r].length;var e=Array(t),o=0;for(r=0;r<n;r++)for(var u=arguments[r],i=0,c=u.length;i<c;i++,o++)e[o]=u[i];return e},i=function(){function t(t){this.rowCount=9,this.colCount=9,this.tileClass=e.a,Object.assign(this,t),this.tileDefs=t.tileDefs}return Object.defineProperty(t.prototype,"rows",{get:function(){return this._rows=this._rows||this.newRows(),this._rows},set:function(t){this._rows=t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"tiles",{get:function(){return this.rows.reduce((function(t,r){return u(t,r)}),[])},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"tileTypes",{get:function(){return Object.keys(this.tileDefs)},enumerable:!0,configurable:!0}),t.prototype.newMundaneTile=function(){var t=Object(o.h)(this.tileTypes);return this.tileDefs[t].generator({variant:"mundane"})},t.prototype.newRows=function(){var t=this;return Object(o.d)(this.rowCount,(function(){return Object(o.d)(t.colCount,(function(){return t.newMundaneTile()}))}))},t.prototype.shuffle=function(){var t=this,r=this.rows.length;this.rows.forEach((function(n,e){var u=n.length;n.forEach((function(n,i){var c=Object(o.c)(r),a=Object(o.c)(u),f=t.rows[c][a];t.rows[c][a]=n,t.rows[e][i]=f}))}))},t}();r.a=i},function(t,r,n){"use strict";n.r(r);var e=n(2),o=n(0);window.Board=e.a,window.rand=o.c}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmNlcm5zL3V0aWxpdGllcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvVGlsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvQm9hcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbImluc3RhbGxlZE1vZHVsZXMiLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwibW9kdWxlSWQiLCJleHBvcnRzIiwibW9kdWxlIiwiaSIsImwiLCJtb2R1bGVzIiwiY2FsbCIsIm0iLCJjIiwiZCIsIm5hbWUiLCJnZXR0ZXIiLCJvIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiZ2V0IiwiciIsIlN5bWJvbCIsInRvU3RyaW5nVGFnIiwidmFsdWUiLCJ0IiwibW9kZSIsIl9fZXNNb2R1bGUiLCJucyIsImNyZWF0ZSIsImtleSIsImJpbmQiLCJuIiwib2JqZWN0IiwicHJvcGVydHkiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsInAiLCJzIiwicmFuZ2UiLCJtaW4iLCJtYXgiLCJtYXhBbmRPck1hcHBlciIsIm1hcHBlciIsInJlYWxNaW4iLCJkaWZmIiwibGlzdCIsIkFycmF5IiwicmFuZCIsImludCIsInJlYWxNYXgiLCJyYW5kb21EaWZmIiwiTWF0aCIsInJhbmRvbSIsImZsb29yIiwic2FtcGxlIiwibGVuZ3RoIiwiZGlzdGFuY2VCZXR3ZWVuIiwib3JpZ2luIiwiZGVzdGluYXRpb24iLCJkeCIsIngiLCJkeSIsInkiLCJzcXJ0Iiwicm90YXRlUG9pbnQiLCJjb29yZHMiLCJhcm91bmQiLCJyYWRpYW5zIiwicmVsYXRpdmUiLCJjb3NpbmUiLCJjb3MiLCJzaW5lIiwic2luIiwibmV3WSIsImlzTnVsbGlzaCIsInRvU3RyaW5nIiwid2luZG93IiwiZmluZE1hcCIsInJlc3VsdCIsImZpbmQiLCJpdGVtIiwiaW5kZXgiLCJvcmlnaW5hbCIsInJvdGF0ZSIsImdyaWQiLCJyb3RhdGlvbnMiLCJxdWFkcmFudHMiLCJyZWR1Y2UiLCJtZW1vIiwicm93Iiwicm93SW5kZXgiLCJmb3JFYWNoIiwiY29sSW5kZXgiLCJuZXdSb3dJbmRleCIsIm5ld0NvbEluZGV4IiwicmV2ZXJzZSIsIm1hcCIsInJvdGF0ZUdyaWRQb3NpdGlvbiIsInJvd3MiLCJjb2xzIiwiY29sIiwidHVwbGUiLCJNVU5EQU5FX1ZBUklBTlQiLCJ0eXBlIiwidmFyaWFudCIsInRoaXMiLCJfdmFyaWFudCIsIm9wdHMiLCJyb3dDb3VudCIsImNvbENvdW50IiwidGlsZUNsYXNzIiwiYXNzaWduIiwidGlsZURlZnMiLCJfcm93cyIsIm5ld1Jvd3MiLCJ0aWxlcyIsImtleXMiLCJuZXdNdW5kYW5lVGlsZSIsInRpbGVUeXBlIiwidGlsZVR5cGVzIiwiZ2VuZXJhdG9yIiwic2h1ZmZsZSIsInRpbGUiLCJleGlzdGluZyIsIkJvYXJkIl0sIm1hcHBpbmdzIjoiYUFDRSxJQUFJQSxFQUFtQixHQUd2QixTQUFTQyxFQUFvQkMsR0FHNUIsR0FBR0YsRUFBaUJFLEdBQ25CLE9BQU9GLEVBQWlCRSxHQUFVQyxRQUduQyxJQUFJQyxFQUFTSixFQUFpQkUsR0FBWSxDQUN6Q0csRUFBR0gsRUFDSEksR0FBRyxFQUNISCxRQUFTLElBVVYsT0FOQUksRUFBUUwsR0FBVU0sS0FBS0osRUFBT0QsUUFBU0MsRUFBUUEsRUFBT0QsUUFBU0YsR0FHL0RHLEVBQU9FLEdBQUksRUFHSkYsRUFBT0QsUUFLZkYsRUFBb0JRLEVBQUlGLEVBR3hCTixFQUFvQlMsRUFBSVYsRUFHeEJDLEVBQW9CVSxFQUFJLFNBQVNSLEVBQVNTLEVBQU1DLEdBQzNDWixFQUFvQmEsRUFBRVgsRUFBU1MsSUFDbENHLE9BQU9DLGVBQWViLEVBQVNTLEVBQU0sQ0FBRUssWUFBWSxFQUFNQyxJQUFLTCxLQUtoRVosRUFBb0JrQixFQUFJLFNBQVNoQixHQUNYLG9CQUFYaUIsUUFBMEJBLE9BQU9DLGFBQzFDTixPQUFPQyxlQUFlYixFQUFTaUIsT0FBT0MsWUFBYSxDQUFFQyxNQUFPLFdBRTdEUCxPQUFPQyxlQUFlYixFQUFTLGFBQWMsQ0FBRW1CLE9BQU8sS0FRdkRyQixFQUFvQnNCLEVBQUksU0FBU0QsRUFBT0UsR0FFdkMsR0FEVSxFQUFQQSxJQUFVRixFQUFRckIsRUFBb0JxQixJQUMvQixFQUFQRSxFQUFVLE9BQU9GLEVBQ3BCLEdBQVcsRUFBUEUsR0FBOEIsaUJBQVZGLEdBQXNCQSxHQUFTQSxFQUFNRyxXQUFZLE9BQU9ILEVBQ2hGLElBQUlJLEVBQUtYLE9BQU9ZLE9BQU8sTUFHdkIsR0FGQTFCLEVBQW9Ca0IsRUFBRU8sR0FDdEJYLE9BQU9DLGVBQWVVLEVBQUksVUFBVyxDQUFFVCxZQUFZLEVBQU1LLE1BQU9BLElBQ3RELEVBQVBFLEdBQTRCLGlCQUFURixFQUFtQixJQUFJLElBQUlNLEtBQU9OLEVBQU9yQixFQUFvQlUsRUFBRWUsRUFBSUUsRUFBSyxTQUFTQSxHQUFPLE9BQU9OLEVBQU1NLElBQVFDLEtBQUssS0FBTUQsSUFDOUksT0FBT0YsR0FJUnpCLEVBQW9CNkIsRUFBSSxTQUFTMUIsR0FDaEMsSUFBSVMsRUFBU1QsR0FBVUEsRUFBT3FCLFdBQzdCLFdBQXdCLE9BQU9yQixFQUFnQixTQUMvQyxXQUE4QixPQUFPQSxHQUV0QyxPQURBSCxFQUFvQlUsRUFBRUUsRUFBUSxJQUFLQSxHQUM1QkEsR0FJUlosRUFBb0JhLEVBQUksU0FBU2lCLEVBQVFDLEdBQVksT0FBT2pCLE9BQU9rQixVQUFVQyxlQUFlMUIsS0FBS3VCLEVBQVFDLElBR3pHL0IsRUFBb0JrQyxFQUFJLEdBSWpCbEMsRUFBb0JBLEVBQW9CbUMsRUFBSSxHLDZnQkM1RTlDLFNBQVNDLEVBQVNDLEcsSUFBYSx3REFNcEMsSUFMQSxJQUFNQyxFQUFtQyxpQkFBdEJDLEVBQWUsR0FBa0JBLEVBQWUsR0FBSyxFQUNsRUMsRUFBc0MsbUJBQXRCRCxFQUFlLEdBQW9CQSxFQUFlLEdBQUtBLEVBQWUsR0FDdEYsa0JBQUNFLEVBQUEsS0FDREMsRUFEVSxLQUNPRCxFQUNqQkUsRUFBT0MsTUFBTUYsR0FDVnRDLEVBQUksRUFBR0EsRUFBSXNDLEVBQU10QyxJQUFLdUMsRUFBS3ZDLEdBQUtvQyxFQUFTQSxFQUFPcEMsRUFBSXFDLEdBQVdyQyxFQUFJcUMsRUFDNUUsT0FBT0UsRUFHRixJQUFNRSxFQUFPLFNBQUNSLEVBQWFDLEVBQVNRLFFBQVQsSUFBQVIsTUFBQSxRQUFTLElBQUFRLE9BQUEsR0FDbkMsc0JBQUNMLEVBQUEsS0FBU00sRUFBQSxLQUNWQyxFQUFhQyxLQUFLQyxVQUFZSCxFQUFVTixHQUM5QyxPQUFPQSxHQUFXSyxFQUFNRyxLQUFLRSxNQUFNSCxHQUFjQSxJQWdDdENJLEVBQVMsU0FBSVQsR0FDeEIsT0FBT0EsRUFBS00sS0FBS0UsTUFBTUYsS0FBS0MsU0FBV1AsRUFBS1UsVUFHakNDLEVBQWtCLFNBQUNDLEVBQXVCQyxHQUNyRCxJQUFNQyxFQUFLRCxFQUFZRSxFQUFJSCxFQUFPRyxFQUM1QkMsRUFBS0gsRUFBWUksRUFBSUwsRUFBT0ssRUFDbEMsT0FBT1gsS0FBS1ksS0FBTSxTQUFBSixFQUFNLEdBQU0sU0FBQUUsRUFBTSxLQUd6QkcsRUFBYyxTQUFDQyxFQUF1QkMsRUFBdUJDLEdBQ3hFLElBQU1DLEVBQWdCSCxFQUFPTCxFQUFJTSxFQUFPTixFQUFsQ1EsRUFBd0NILEVBQU9ILEVBQUlJLEVBQU9KLEVBQzFETyxFQUFTbEIsS0FBS21CLElBQUlILEdBQ2xCSSxFQUFPcEIsS0FBS3FCLElBQUlMLEdBRWhCTSxFQUFRTCxFQUFhRyxFQUFTSCxFQUFhQyxFQUNqRCxNQUFPLENBQUVULEVBRktRLEVBQWFDLEVBQVdELEVBQWFHLEVBRWhDTCxFQUFPTixFQUFHRSxFQUFHVyxFQUFPUCxFQUFPSixJQUt6QyxTQUFTWSxFQUFVbkQsR0FDeEIsWUFBd0IsSUFBVkEsR0FBbUUsa0JBQTFDUCxPQUFPa0IsVUFBVXlDLFNBQVNsRSxLQUFLYyxHQUh2RXFELE9BQWVaLFlBQWNBLEVBTXZCLElBT01hLEVBQVUsU0FBT2hDLEVBQVdILEdBQ3ZDLElBQUlvQyxFQUtKLE9BSkFqQyxFQUFLa0MsTUFBSyxTQUFDQyxFQUFNQyxFQUFPQyxHQUV0QixPQUFRUixFQURSSSxFQUFTcEMsRUFBT3NDLEVBQU1DLEVBQU9DLE9BR3hCSixHQXdCSUssRUFBUyxTQUFJQyxFQUFhQyxRQUFBLElBQUFBLE1BQUEsR0FDckMsSUFBTUMsRUFBWUQsRUFBWSxFQUM5QixPQUFRQyxFQUFZLEVBQUksRUFBSUEsRUFBWUEsR0FDdEMsS0FBSyxFQUNILE9BQU9GLEVBQUtHLFFBQU8sU0FBQ0MsRUFBTUMsRUFBS0MsR0FPN0IsT0FOQUQsRUFBSUUsU0FBUSxTQUFDWCxFQUFNWSxHQUNqQixJQUFNQyxFQUFjRCxFQUNkRSxFQUFjVixFQUFLN0IsT0FBU21DLEVBQVcsRUFDN0NGLEVBQUtLLEdBQWVMLEVBQUtLLElBQWdCLEdBQ3pDTCxFQUFLSyxHQUFhQyxHQUFlZCxLQUU1QlEsSUFDTixJQUVMLEtBQUssRUFBRyxPQUFPLEVBQUlKLEdBQU1XLFVBQVVDLEtBQUksU0FBQVAsR0FBTyxTQUFJQSxHQUFLTSxhQUN2RCxLQUFLLEVBQ0gsT0FBT1gsRUFBS0csUUFBTyxTQUFDQyxFQUFNQyxFQUFLQyxHQU83QixPQU5BRCxFQUFJRSxTQUFRLFNBQUNYLEVBQU1ZLEdBQ2pCLElBQU1DLEVBQWNKLEVBQUlsQyxPQUFTcUMsRUFBVyxFQUN0Q0UsRUFBY0osRUFDcEJGLEVBQUtLLEdBQWVMLEVBQUtLLElBQWdCLEdBQ3pDTCxFQUFLSyxHQUFhQyxHQUFlZCxLQUU1QlEsSUFDTixJQUVMLFFBQVMsT0FBT0osRUFBS1ksS0FBSSxTQUFBUCxHQUFPLFNBQUlBLFFBSTNCUSxFQUFxQixTQUFDLEVBQTRCQyxFQUFjQyxFQUFjZCxHLElBQXRESSxFQUFBLEVBQUFBLElBQUtXLEVBQUEsRUFBQUEsSUFDbENkLEVBQVlELEVBQVksRUFDOUIsT0FBUUMsRUFBWSxFQUFJLEVBQUlBLEVBQVlBLEdBQ3RDLEtBQUssRUFBRyxNQUFPLENBQUVHLElBQUtXLEVBQUtBLElBQUtGLEVBQU9ULEVBQU0sR0FDN0MsS0FBSyxFQUFHLE1BQU8sQ0FBRUEsSUFBS1MsRUFBT1QsRUFBTSxFQUFHVyxJQUFLRCxFQUFPQyxFQUFNLEdBQ3hELEtBQUssRUFBRyxNQUFPLENBQUVYLElBQUtVLEVBQU9DLEVBQU0sRUFBR0EsSUFBS1gsR0FDM0MsUUFBUyxNQUFPLENBQUVBLElBQUcsRUFBRVcsSUFBRyxLQUlqQkMsRUFBUSxXLElBQW9CLHNEQUFzQixPQUFBeEQsSSw2QkN2Si9ELElBQU15RCxFQUFrQixVQUV4QixhQUtFLFdBQVksRyxJQUFFQyxFQUFBLEVBQUFBLEtBQU1oRixFQUFBLEVBQUFBLE1BQU9pRixFQUFBLEVBQUFBLFFBQ3pCQyxLQUFLRixLQUFPQSxFQUNaRSxLQUFLbEYsTUFBUUEsR0FBUyxFQUN0QmtGLEtBQUtDLFNBQVdGLEdBQVdGLEVBTy9CLE9BSkUsc0JBQUksc0JBQU8sQyxJQUNYLFdBQXdCLE9BQU9HLEtBQUtDLFVBQVlKLEcsSUFEaEQsU0FBWUUsR0FBbUJDLEtBQUtDLFNBQVdGLEdBQVdGLEcsZ0NBRzFELHNCQUFJLHdCQUFTLEMsSUFBYixXQUEyQixPQUFPRyxLQUFLRCxVQUFZRixHLGdDQUNyRCxFQWZBLEcsOE9Dd0JBLGFBUUUsV0FBWUssR0FQTCxLQUFBQyxTQUFXLEVBQ1gsS0FBQUMsU0FBVyxFQUNYLEtBQUFDLFVBQVksSUFNakI5RixPQUFPK0YsT0FBT04sS0FBTUUsR0FDcEJGLEtBQUtPLFNBQVdMLEVBQUtLLFNBMkN6QixPQXhDRSxzQkFBSSxtQkFBSSxDLElBQVIsV0FFRSxPQURBUCxLQUFLUSxNQUFRUixLQUFLUSxPQUFTUixLQUFLUyxVQUN6QlQsS0FBS1EsTyxJQUdkLFNBQVNmLEdBQ1BPLEtBQUtRLE1BQVFmLEcsZ0NBR2Ysc0JBQUksb0JBQUssQyxJQUFULFdBQ0UsT0FBT08sS0FBS1AsS0FBS1gsUUFBTyxTQUFDNEIsRUFBTzFCLEdBQVEsU0FBSTBCLEVBQVUxQixLQUFNLEssZ0NBRzlELHNCQUFJLHdCQUFTLEMsSUFBYixXQUNFLE9BQU96RSxPQUFPb0csS0FBS1gsS0FBS08sVyxnQ0FHMUIsWUFBQUssZUFBQSxXQUNFLElBQU1DLEVBQVcsWUFBT2IsS0FBS2MsV0FFN0IsT0FEZ0JkLEtBQUtPLFNBQVNNLEdBQ2ZFLFVBQVUsQ0FBRWhCLFFBQVMsYUFHdEMsWUFBQVUsUUFBQSxzQkFDRSxPQUFPLFlBQU1ULEtBQUtHLFVBQVUsV0FBTSxPQUFDLFdBQUQsQ0FBTyxFQUFLQyxVQUFVLFdBQU0sU0FBS1Esd0JBR3JFLFlBQUFJLFFBQUEsc0JBQ1FiLEVBQVdILEtBQUtQLEtBQUszQyxPQUMzQmtELEtBQUtQLEtBQUtQLFNBQVEsU0FBQ0YsRUFBS0MsR0FDdEIsSUFBTW1CLEVBQVdwQixFQUFJbEMsT0FDckJrQyxFQUFJRSxTQUFRLFNBQUMrQixFQUFNOUIsR0FDakIsSUFBTUMsRUFBYyxZQUFLZSxHQUNuQmQsRUFBYyxZQUFLZSxHQUNuQmMsRUFBVyxFQUFLekIsS0FBS0wsR0FBYUMsR0FDeEMsRUFBS0ksS0FBS0wsR0FBYUMsR0FBZTRCLEVBQ3RDLEVBQUt4QixLQUFLUixHQUFVRSxHQUFZK0IsU0FJeEMsRUFyREEsRyxvQ0M1QkEseUJBR0MvQyxPQUFlZ0QsTUFBUSxJQUN2QmhELE9BQWU3QixLQUFPIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMyk7XG4iLCJpbXBvcnQgeyBDb29yZFBvc2l0aW9uLCBOdWxsaXNoLCBHcmlkUG9zaXRpb24sIExpdGVyYWwgfSBmcm9tIFwiLi4vdHlwZXMvY29tbW9uXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiByYW5nZTxUPihtaW46IG51bWJlciwgLi4ubWF4QW5kT3JNYXBwZXI6IFtdKTogbnVtYmVyW107XG5leHBvcnQgZnVuY3Rpb24gcmFuZ2U8VD4obWluOiBudW1iZXIsIC4uLm1heEFuZE9yTWFwcGVyOiBbbnVtYmVyXSk6IG51bWJlcltdO1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmdlPFQ+KG1pbjogbnVtYmVyLCAuLi5tYXhBbmRPck1hcHBlcjogWyhuOiBudW1iZXIpID0+IFRdKTogVFtdO1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmdlPFQ+KG1pbjogbnVtYmVyLCAuLi5tYXhBbmRPck1hcHBlcjogW251bWJlciwgKG46IG51bWJlcikgPT4gVF0pOiBUW107XG5leHBvcnQgZnVuY3Rpb24gcmFuZ2U8VD4obWluOiBudW1iZXIsIC4uLm1heEFuZE9yTWFwcGVyOiBbXXxbbnVtYmVyfCgobjogbnVtYmVyKSA9PiBUKV18W251bWJlciwgKG46IG51bWJlcikgPT4gVF0pOiAobnVtYmVyfFQpW10ge1xuICBjb25zdCBtYXggPSB0eXBlb2YgbWF4QW5kT3JNYXBwZXJbMF0gPT09ICdudW1iZXInID8gbWF4QW5kT3JNYXBwZXJbMF0gOiAwO1xuICBjb25zdCBtYXBwZXIgPSB0eXBlb2YgbWF4QW5kT3JNYXBwZXJbMF0gPT09ICdmdW5jdGlvbicgPyBtYXhBbmRPck1hcHBlclswXSA6IG1heEFuZE9yTWFwcGVyWzFdO1xuICBjb25zdCBbcmVhbE1pbiwgcmVhbE1heF0gPSBtaW4gPCBtYXggPyBbbWluLCBtYXhdIDogW21heCwgbWluXTtcbiAgY29uc3QgZGlmZiA9IHJlYWxNYXggLSByZWFsTWluO1xuICBjb25zdCBsaXN0ID0gQXJyYXkoZGlmZik7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGlmZjsgaSsrKSBsaXN0W2ldID0gbWFwcGVyID8gbWFwcGVyKGkgKyByZWFsTWluKSA6IGkgKyByZWFsTWluO1xuICByZXR1cm4gbGlzdDtcbn1cblxuZXhwb3J0IGNvbnN0IHJhbmQgPSAobWluOiBudW1iZXIsIG1heCA9IDAsIGludCA9IHRydWUpOiBudW1iZXIgPT4ge1xuICBjb25zdCBbcmVhbE1pbiwgcmVhbE1heF0gPSBtaW4gPCBtYXggPyBbbWluLCBtYXhdIDogW21heCwgbWluXTtcbiAgY29uc3QgcmFuZG9tRGlmZiA9IE1hdGgucmFuZG9tKCkgKiAocmVhbE1heCAtIHJlYWxNaW4pO1xuICByZXR1cm4gcmVhbE1pbiArIChpbnQgPyBNYXRoLmZsb29yKHJhbmRvbURpZmYpIDogcmFuZG9tRGlmZik7XG59O1xuXG5leHBvcnQgY29uc3QgZGFtcGVuID0gKG51bTogbnVtYmVyLCBieTogbnVtYmVyLCBjZW50ZXIgPSAwKTogbnVtYmVyID0+IHtcbiAgLy8gbnVtYmVyIGlzIGFscmVhZHkgYXQgdGhlIGNlbnRlclxuICBpZiAobnVtID09PSBjZW50ZXIpIHJldHVybiBjZW50ZXI7XG5cbiAgLy8gbnVtYmVyIGlzIGhpZ2hlciB0aGFuIHRoZSBjZW50ZXI7IHN1YnRyYWN0IGFuZCBkb24ndCBvdmVyc2hvb3QgdGhlIGNlbnRlclxuICBpZiAobnVtID4gY2VudGVyKSB7XG4gICAgY29uc3QgbmV3TnVtID0gbnVtIC0gYnk7XG4gICAgcmV0dXJuIG5ld051bSA8IGNlbnRlciA/IGNlbnRlciA6IG5ld051bTtcbiAgfVxuXG4gIC8vIG51bWJlciBpcyBsb3dlciB0aGFuIHRoZSBjZW50ZXI7IGFkZCBhbmQgZG9uJ3Qgb3ZlcnNob290IHRoZSBjZW50ZXJcbiAgY29uc3QgbmV3TnVtID0gbnVtICsgYnk7XG4gIHJldHVybiBuZXdOdW0gPiBjZW50ZXIgPyBjZW50ZXIgOiBuZXdOdW07XG59O1xuXG5leHBvcnQgY29uc3QgYm91bmQgPSAobnVtOiBudW1iZXIsIG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IG51bWJlciA9PiB7XG4gIGNvbnN0IFtyZWFsTWluLCByZWFsTWF4XSA9IG1pbiA8IG1heCA/IFttaW4sIG1heF0gOiBbbWF4LCBtaW5dO1xuICBpZiAobnVtIDwgcmVhbE1pbikgcmV0dXJuIHJlYWxNaW47XG4gIGlmIChudW0gPiByZWFsTWF4KSByZXR1cm4gcmVhbE1heDtcbiAgcmV0dXJuIG51bTtcbn07XG5cbmV4cG9ydCBjb25zdCBiZXR3ZWVuID0gKG51bTogbnVtYmVyLCBtaW46IG51bWJlciwgbWF4OiBudW1iZXIsIGluY2x1c2l2ZSA9IHRydWUpOiBib29sZWFuID0+IHtcbiAgY29uc3QgW3JlYWxNaW4sIHJlYWxNYXhdID0gbWluIDwgbWF4ID8gW21pbiwgbWF4XSA6IFttYXgsIG1pbl07XG4gIHJldHVybiBpbmNsdXNpdmUgPyAobnVtID49IHJlYWxNaW4gJiYgbnVtIDw9IHJlYWxNYXgpIDogKG51bSA+IHJlYWxNaW4gJiYgbnVtIDwgcmVhbE1heCk7XG59O1xuXG5leHBvcnQgY29uc3QgZGlmZmVyZW5jZSA9IChuOiBudW1iZXIsIG06IG51bWJlcik6IG51bWJlciA9PiBNYXRoLmFicyhuIC0gbSk7XG5cbmV4cG9ydCBjb25zdCBzYW1wbGUgPSA8VD4obGlzdDogVFtdKTogVCA9PiB7XG4gIHJldHVybiBsaXN0W01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGxpc3QubGVuZ3RoKV07XG59O1xuXG5leHBvcnQgY29uc3QgZGlzdGFuY2VCZXR3ZWVuID0gKG9yaWdpbjogQ29vcmRQb3NpdGlvbiwgZGVzdGluYXRpb246IENvb3JkUG9zaXRpb24pOiBudW1iZXIgPT4ge1xuICBjb25zdCBkeCA9IGRlc3RpbmF0aW9uLnggLSBvcmlnaW4ueDtcbiAgY29uc3QgZHkgPSBkZXN0aW5hdGlvbi55IC0gb3JpZ2luLnk7XG4gIHJldHVybiBNYXRoLnNxcnQoKGR4ICoqIDIpICsgKGR5ICoqIDIpKTtcbn07XG5cbmV4cG9ydCBjb25zdCByb3RhdGVQb2ludCA9IChjb29yZHM6IENvb3JkUG9zaXRpb24sIGFyb3VuZDogQ29vcmRQb3NpdGlvbiwgcmFkaWFuczogbnVtYmVyKTogQ29vcmRQb3NpdGlvbiA9PiB7XG4gIGNvbnN0IHJlbGF0aXZlID0geyB4OiBjb29yZHMueCAtIGFyb3VuZC54LCB5OiBjb29yZHMueSAtIGFyb3VuZC55IH07XG4gIGNvbnN0IGNvc2luZSA9IE1hdGguY29zKHJhZGlhbnMpO1xuICBjb25zdCBzaW5lID0gTWF0aC5zaW4ocmFkaWFucyk7XG4gIGNvbnN0IG5ld1ggPSAocmVsYXRpdmUueCAqIGNvc2luZSkgLSAocmVsYXRpdmUueSAqIHNpbmUpO1xuICBjb25zdCBuZXdZID0gKHJlbGF0aXZlLnggKiBzaW5lKSArIChyZWxhdGl2ZS55ICogY29zaW5lKTtcbiAgcmV0dXJuIHsgeDogbmV3WCArIGFyb3VuZC54LCB5OiBuZXdZICsgYXJvdW5kLnkgfTtcbn07XG5cbih3aW5kb3cgYXMgYW55KS5yb3RhdGVQb2ludCA9IHJvdGF0ZVBvaW50O1xuXG5leHBvcnQgZnVuY3Rpb24gaXNOdWxsaXNoKHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyBOdWxsaXNoIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgTnVsbF0nO1xufVxuXG5leHBvcnQgY29uc3QgZmlsdGVyTWFwID0gPFQsIEs+KGxpc3Q6IFRbXSwgbWFwcGVyOiAoaXRlbTogVCwgaW5kZXg6IG51bWJlciwgb3JpZ2luYWw6IFRbXSkgPT4gS3xOdWxsaXNoKTogS1tdID0+IHtcbiAgcmV0dXJuIGxpc3QucmVkdWNlKChtZW1vLCBpdGVtLCBpbmRleCwgb3JpZ2luYWwpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSBtYXBwZXIoaXRlbSwgaW5kZXgsIG9yaWdpbmFsKTtcbiAgICByZXR1cm4gaXNOdWxsaXNoKHJlc3VsdCkgPyBtZW1vIDogWy4uLm1lbW8sIHJlc3VsdF07XG4gIH0sIFtdIGFzIEtbXSk7XG59O1xuXG5leHBvcnQgY29uc3QgZmluZE1hcCA9IDxULCBLPihsaXN0OiBUW10sIG1hcHBlcjogKGl0ZW06IFQsIGluZGV4OiBudW1iZXIsIG9yaWdpbmFsOiBUW10pID0+IEt8TnVsbGlzaCk6IEt8dW5kZWZpbmVkID0+IHtcbiAgbGV0IHJlc3VsdDtcbiAgbGlzdC5maW5kKChpdGVtLCBpbmRleCwgb3JpZ2luYWwpID0+IHtcbiAgICByZXN1bHQgPSBtYXBwZXIoaXRlbSwgaW5kZXgsIG9yaWdpbmFsKTtcbiAgICByZXR1cm4gIWlzTnVsbGlzaChyZXN1bHQpO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbmV4cG9ydCBjb25zdCB1bmlxID0gPFQsIFAgZXh0ZW5kcyBrZXlvZiBUPihsaXN0OiBUW10sIG1hcHBlcjogUHxOdWxsaXNofCgoaXRlbTogVCwgaW5kZXg6IG51bWJlciwgb3JpZ2luYWw6IFRbXSkgPT4gYW55KSwgc29ydGVkID0gZmFsc2UpOiBUW10gPT4ge1xuICBjb25zdCBtYXBwZXJGbiA9IGlzTnVsbGlzaChtYXBwZXIpIHx8IHR5cGVvZiBtYXBwZXIgPT09ICdmdW5jdGlvbicgPyBtYXBwZXIgOiAoaXRlbTogVCkgPT4gaXRlbVttYXBwZXJdO1xuXG4gIGlmIChzb3J0ZWQgJiYgIW1hcHBlckZuKSB7XG4gICAgbGV0IGxhc3RTZWVuOiBUO1xuICAgIHJldHVybiBsaXN0LnJlZHVjZSgobWVtbywgaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgIGlmIChpbmRleCAhPT0gMCAmJiBpdGVtID09PSBsYXN0U2VlbikgcmV0dXJuIG1lbW87XG4gICAgICBsYXN0U2VlbiA9IGl0ZW07XG4gICAgICByZXR1cm4gWy4uLm1lbW8sIGl0ZW1dO1xuICAgIH0sIFtdIGFzIFRbXSk7XG4gIH1cblxuICBjb25zdCBzZWVuID0gbmV3IFNldCgpO1xuICByZXR1cm4gbGlzdC5yZWR1Y2UoKG1lbW8sIGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgY29uc3Qga2V5ID0gbWFwcGVyRm4gPyBtYXBwZXJGbihpdGVtLCBpbmRleCwgbGlzdCkgOiBpdGVtO1xuICAgIGlmIChzZWVuLmhhcyhrZXkpKSByZXR1cm4gbWVtbztcbiAgICBzZWVuLmFkZChrZXkpO1xuICAgIHJldHVybiBbLi4ubWVtbywgaXRlbV07XG4gIH0sIFtdIGFzIFRbXSk7XG59O1xuXG5leHBvcnQgY29uc3Qgcm90YXRlID0gPFQ+KGdyaWQ6IFRbXVtdLCByb3RhdGlvbnMgPSAxKTogVFtdW10gPT4ge1xuICBjb25zdCBxdWFkcmFudHMgPSByb3RhdGlvbnMgJSA0O1xuICBzd2l0Y2ggKHF1YWRyYW50cyA8IDAgPyA0IC0gcXVhZHJhbnRzIDogcXVhZHJhbnRzKSB7XG4gICAgY2FzZSAxOiB7XG4gICAgICByZXR1cm4gZ3JpZC5yZWR1Y2UoKG1lbW8sIHJvdywgcm93SW5kZXgpID0+IHtcbiAgICAgICAgcm93LmZvckVhY2goKGl0ZW0sIGNvbEluZGV4KSA9PiB7XG4gICAgICAgICAgY29uc3QgbmV3Um93SW5kZXggPSBjb2xJbmRleDtcbiAgICAgICAgICBjb25zdCBuZXdDb2xJbmRleCA9IGdyaWQubGVuZ3RoIC0gcm93SW5kZXggLSAxO1xuICAgICAgICAgIG1lbW9bbmV3Um93SW5kZXhdID0gbWVtb1tuZXdSb3dJbmRleF0gfHwgW107XG4gICAgICAgICAgbWVtb1tuZXdSb3dJbmRleF1bbmV3Q29sSW5kZXhdID0gaXRlbTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBtZW1vO1xuICAgICAgfSwgW10gYXMgVFtdW10pO1xuICAgIH1cbiAgICBjYXNlIDI6IHJldHVybiBbLi4uZ3JpZF0ucmV2ZXJzZSgpLm1hcChyb3cgPT4gWy4uLnJvd10ucmV2ZXJzZSgpKTtcbiAgICBjYXNlIDM6IHtcbiAgICAgIHJldHVybiBncmlkLnJlZHVjZSgobWVtbywgcm93LCByb3dJbmRleCkgPT4ge1xuICAgICAgICByb3cuZm9yRWFjaCgoaXRlbSwgY29sSW5kZXgpID0+IHtcbiAgICAgICAgICBjb25zdCBuZXdSb3dJbmRleCA9IHJvdy5sZW5ndGggLSBjb2xJbmRleCAtIDE7XG4gICAgICAgICAgY29uc3QgbmV3Q29sSW5kZXggPSByb3dJbmRleDtcbiAgICAgICAgICBtZW1vW25ld1Jvd0luZGV4XSA9IG1lbW9bbmV3Um93SW5kZXhdIHx8IFtdO1xuICAgICAgICAgIG1lbW9bbmV3Um93SW5kZXhdW25ld0NvbEluZGV4XSA9IGl0ZW07XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbWVtbztcbiAgICAgIH0sIFtdIGFzIFRbXVtdKTtcbiAgICB9XG4gICAgZGVmYXVsdDogcmV0dXJuIGdyaWQubWFwKHJvdyA9PiBbLi4ucm93XSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCByb3RhdGVHcmlkUG9zaXRpb24gPSAoeyByb3csIGNvbCB9OiBHcmlkUG9zaXRpb24sIHJvd3M6IG51bWJlciwgY29sczogbnVtYmVyLCByb3RhdGlvbnM6IG51bWJlcik6IEdyaWRQb3NpdGlvbiA9PiB7XG4gIGNvbnN0IHF1YWRyYW50cyA9IHJvdGF0aW9ucyAlIDQ7XG4gIHN3aXRjaCAocXVhZHJhbnRzIDwgMCA/IDQgLSBxdWFkcmFudHMgOiBxdWFkcmFudHMpIHtcbiAgICBjYXNlIDE6IHJldHVybiB7IHJvdzogY29sLCBjb2w6IHJvd3MgLSByb3cgLSAxIH07XG4gICAgY2FzZSAyOiByZXR1cm4geyByb3c6IHJvd3MgLSByb3cgLSAxLCBjb2w6IGNvbHMgLSBjb2wgLSAxIH07XG4gICAgY2FzZSAzOiByZXR1cm4geyByb3c6IGNvbHMgLSBjb2wgLSAxLCBjb2w6IHJvdyB9O1xuICAgIGRlZmF1bHQ6IHJldHVybiB7IHJvdywgY29sIH07XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCB0dXBsZSA9IDxUIGV4dGVuZHMgTGl0ZXJhbD4oLi4ubGlzdDogVFtdKTogVFtdID0+IGxpc3Q7XG4iLCJpbXBvcnQgeyBOZWVkIH0gZnJvbSBcIi4vdHlwZXMvY29tbW9uXCI7XG5cbmNvbnN0IE1VTkRBTkVfVkFSSUFOVCA9ICdtdW5kYW5lJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGlsZSB7XG4gIHB1YmxpYyB0eXBlOiBzdHJpbmc7XG4gIHB1YmxpYyB2YWx1ZTogbnVtYmVyO1xuICBwdWJsaWMgX3ZhcmlhbnQhOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoeyB0eXBlLCB2YWx1ZSwgdmFyaWFudCB9OiBOZWVkPFRpbGUsICd0eXBlJz4pIHtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZSB8fCAxO1xuICAgIHRoaXMuX3ZhcmlhbnQgPSB2YXJpYW50IHx8IE1VTkRBTkVfVkFSSUFOVDtcbiAgfVxuXG4gIHNldCB2YXJpYW50KHZhcmlhbnQ6IHN0cmluZykgeyB0aGlzLl92YXJpYW50ID0gdmFyaWFudCB8fCBNVU5EQU5FX1ZBUklBTlQgfVxuICBnZXQgdmFyaWFudCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fdmFyaWFudCB8fCBNVU5EQU5FX1ZBUklBTlQgfVxuXG4gIGdldCBpc011bmRhbmUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLnZhcmlhbnQgPT09IE1VTkRBTkVfVkFSSUFOVCB9XG59XG4iLCJpbXBvcnQgVGlsZSBmcm9tIFwiLi9UaWxlXCI7XG5pbXBvcnQgeyByYW5nZSwgc2FtcGxlLCByb3RhdGUsIHJhbmQgfSBmcm9tIFwiLi9jb25jZXJucy91dGlsaXRpZXNcIjtcbmltcG9ydCB7IE5lZWQgfSBmcm9tIFwiLi90eXBlcy9jb21tb25cIjtcblxuZXhwb3J0IHR5cGUgVGlsZUdlbmVyYXRvcjxUaWxlQ2xhc3MgZXh0ZW5kcyBUaWxlPiA9IChvcHRzOiBQaWNrPFRpbGVDbGFzcywgJ3ZhcmlhbnQnPikgPT4gVGlsZUNsYXNzO1xuXG5leHBvcnQgaW50ZXJmYWNlIE11bmRhbmVUaWxlRGVmPFRpbGVDbGFzcyBleHRlbmRzIFRpbGU+IHtcbiAgZ2VuZXJhdG9yOiBUaWxlR2VuZXJhdG9yPFRpbGVDbGFzcz47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3BlY2lhbFRpbGVEZWY8VGlsZUNsYXNzIGV4dGVuZHMgVGlsZT4ge1xuICBnZW5lcmF0b3I6IFRpbGVHZW5lcmF0b3I8VGlsZUNsYXNzPjtcbn1cblxuZXhwb3J0IHR5cGUgVGlsZURlZjxUaWxlQ2xhc3MgZXh0ZW5kcyBUaWxlPiA9IE11bmRhbmVUaWxlRGVmPFRpbGVDbGFzcz4gfCBTcGVjaWFsVGlsZURlZjxUaWxlQ2xhc3M+O1xuXG5leHBvcnQgaW50ZXJmYWNlIE11bmRhbmVUaWxlRGVmczxUaWxlQ2xhc3MgZXh0ZW5kcyBUaWxlPiB7XG4gIFt0eXBlOiBzdHJpbmddOiBNdW5kYW5lVGlsZURlZjxUaWxlQ2xhc3M+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNwZWNpYWxUaWxlRGVmczxUaWxlQ2xhc3MgZXh0ZW5kcyBUaWxlPiB7XG4gIFt0eXBlOiBzdHJpbmddOiBNdW5kYW5lVGlsZURlZjxUaWxlQ2xhc3M+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRpbGVEZWZzPFRpbGVDbGFzcyBleHRlbmRzIFRpbGU+IHtcbiAgW3R5cGU6IHN0cmluZ106IFRpbGVEZWY8VGlsZUNsYXNzPjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9hcmQ8VGlsZUNsYXNzIGV4dGVuZHMgVGlsZSA9IFRpbGU+IHtcbiAgcHVibGljIHJvd0NvdW50ID0gOTtcbiAgcHVibGljIGNvbENvdW50ID0gOTtcbiAgcHVibGljIHRpbGVDbGFzcyA9IFRpbGU7XG4gIHB1YmxpYyB0aWxlRGVmczogVGlsZURlZnM8VGlsZUNsYXNzPjtcbiAgcHVibGljIG9uVGlsZU1hdGNoZWQ/OiAodGlsZTogVGlsZUNsYXNzKSA9PiB2b2lkO1xuICBwcml2YXRlIF9yb3dzPzogVGlsZUNsYXNzW11bXTtcblxuICBjb25zdHJ1Y3RvcihvcHRzOiBOZWVkPEJvYXJkPFRpbGVDbGFzcz4sICd0aWxlRGVmcyc+KSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvcHRzKTtcbiAgICB0aGlzLnRpbGVEZWZzID0gb3B0cy50aWxlRGVmcztcbiAgfVxuXG4gIGdldCByb3dzKCk6IFRpbGVDbGFzc1tdW10ge1xuICAgIHRoaXMuX3Jvd3MgPSB0aGlzLl9yb3dzIHx8IHRoaXMubmV3Um93cygpO1xuICAgIHJldHVybiB0aGlzLl9yb3dzO1xuICB9XG5cbiAgc2V0IHJvd3Mocm93czogVGlsZUNsYXNzW11bXSkge1xuICAgIHRoaXMuX3Jvd3MgPSByb3dzO1xuICB9XG5cbiAgZ2V0IHRpbGVzKCk6IFRpbGVDbGFzc1tdIHtcbiAgICByZXR1cm4gdGhpcy5yb3dzLnJlZHVjZSgodGlsZXMsIHJvdykgPT4gWy4uLnRpbGVzLCAuLi5yb3ddLCBbXSk7XG4gIH1cblxuICBnZXQgdGlsZVR5cGVzKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy50aWxlRGVmcyk7XG4gIH1cblxuICBuZXdNdW5kYW5lVGlsZSgpOiBUaWxlQ2xhc3Mge1xuICAgIGNvbnN0IHRpbGVUeXBlID0gc2FtcGxlKHRoaXMudGlsZVR5cGVzKTtcbiAgICBjb25zdCB0aWxlRGVmID0gdGhpcy50aWxlRGVmc1t0aWxlVHlwZV07XG4gICAgcmV0dXJuIHRpbGVEZWYuZ2VuZXJhdG9yKHsgdmFyaWFudDogJ211bmRhbmUnIH0pO1xuICB9XG5cbiAgbmV3Um93cygpOiBUaWxlQ2xhc3NbXVtdIHtcbiAgICByZXR1cm4gcmFuZ2UodGhpcy5yb3dDb3VudCwgKCkgPT4gKHJhbmdlKHRoaXMuY29sQ291bnQsICgpID0+IHRoaXMubmV3TXVuZGFuZVRpbGUoKSkpKTtcbiAgfVxuXG4gIHNodWZmbGUoKTogdm9pZCB7XG4gICAgY29uc3Qgcm93Q291bnQgPSB0aGlzLnJvd3MubGVuZ3RoO1xuICAgIHRoaXMucm93cy5mb3JFYWNoKChyb3csIHJvd0luZGV4KSA9PiB7XG4gICAgICBjb25zdCBjb2xDb3VudCA9IHJvdy5sZW5ndGg7XG4gICAgICByb3cuZm9yRWFjaCgodGlsZSwgY29sSW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgbmV3Um93SW5kZXggPSByYW5kKHJvd0NvdW50KTtcbiAgICAgICAgY29uc3QgbmV3Q29sSW5kZXggPSByYW5kKGNvbENvdW50KTtcbiAgICAgICAgY29uc3QgZXhpc3RpbmcgPSB0aGlzLnJvd3NbbmV3Um93SW5kZXhdW25ld0NvbEluZGV4XTtcbiAgICAgICAgdGhpcy5yb3dzW25ld1Jvd0luZGV4XVtuZXdDb2xJbmRleF0gPSB0aWxlO1xuICAgICAgICB0aGlzLnJvd3Nbcm93SW5kZXhdW2NvbEluZGV4XSA9IGV4aXN0aW5nO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBCb2FyZCBmcm9tICcuL0JvYXJkJztcbmltcG9ydCB7IHJhbmQgfSBmcm9tICcuL2NvbmNlcm5zL3V0aWxpdGllcyc7XG5cbih3aW5kb3cgYXMgYW55KS5Cb2FyZCA9IEJvYXJkO1xuKHdpbmRvdyBhcyBhbnkpLnJhbmQgPSByYW5kO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==