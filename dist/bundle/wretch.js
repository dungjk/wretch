!function(t,r){"object"==typeof exports&&"undefined"!=typeof module?module.exports=r():"function"==typeof define&&define.amd?define(r):(t=t||self).wretch=r()}(this,function(){"use strict";var y=function(){return(y=Object.assign||function(t){for(var r,e=1,o=arguments.length;e<o;e++)for(var n in r=arguments[e])Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n]);return t}).apply(this,arguments)},m=function(t,r,e){if(void 0===e&&(e=!1),!t||!r||"object"!=typeof t||"object"!=typeof r)return t;var o=y({},t);for(var n in r)r.hasOwnProperty(n)&&(r[n]instanceof Array&&t[n]instanceof Array?o[n]=e?t[n].concat(r[n]):r[n]:"object"==typeof r[n]&&"object"==typeof t[n]?o[n]=m(t[n],r[n],e):o[n]=r[n]);return o},b={defaults:{},errorType:null,polyfills:{fetch:null,FormData:null,URLSearchParams:null,performance:null,PerformanceObserver:null,AbortController:null},polyfill:function(t,r){for(var e=void 0===r?{}:r,o=e.doThrow,n=void 0===o||o,i=e.instance,s=void 0!==i&&i,u=[],c=2;c<arguments.length;c++)u[c-2]=arguments[c];var a=this.polyfills[t]||("undefined"!=typeof self?self[t]:null)||("undefined"!=typeof global?global[t]:null);if(n&&!a)throw new Error(t+" is not defined");return s&&a?new(a.bind.apply(a,[void 0].concat(u))):a}},s=function(t,r,e,o){if(!t.getEntriesByName)return!1;var n=t.getEntriesByName(r);return!!(n&&0<n.length)&&(e(n.reverse()[0]),o.clearMeasures&&o.clearMeasures(r),g.callbacks.delete(r),g.callbacks.size<1&&(g.observer.disconnect(),o.clearResourceTimings&&o.clearResourceTimings()),!0)},g={callbacks:new Map,observer:null,observe:function(t,r){if(t&&r){var o,e,n=b.polyfill("performance",{doThrow:!1}),i=b.polyfill("PerformanceObserver",{doThrow:!1});if(o=n,e=i,!g.observer&&o&&e&&(g.observer=new e(function(e){g.callbacks.forEach(function(t,r){s(e,r,t,o)})}),o.clearResourceTimings&&o.clearResourceTimings()),g.observer)s(n,t,r,n)||(g.callbacks.size<1&&g.observer.observe({entryTypes:["resource","measure"]}),g.callbacks.set(t,r))}}},t=function(){function d(t,r,e,o,n,i){void 0===e&&(e=new Map),void 0===o&&(o=[]),void 0===n&&(n=[]),void 0===i&&(i=[]),this._url=t,this._options=r,this._catchers=e,this._resolvers=o,this._middlewares=n,this._deferredChain=i}return d.factory=function(t,r){return void 0===t&&(t=""),void 0===r&&(r={}),new d(t,r)},d.prototype.selfFactory=function(t){var r=void 0===t?{}:t,e=r.url,o=void 0===e?this._url:e,n=r.options,i=void 0===n?this._options:n,s=r.catchers,u=void 0===s?this._catchers:s,c=r.resolvers,a=void 0===c?this._resolvers:c,f=r.middlewares,l=void 0===f?this._middlewares:f,p=r.deferredChain,h=void 0===p?this._deferredChain:p;return new d(o,y({},i),new Map(u),a.slice(),l.slice(),h.slice())},d.prototype.defaults=function(t,r){return void 0===r&&(r=!1),b.defaults=r?m(b.defaults,t):t,this},d.prototype.errorType=function(t){return b.errorType=t,this},d.prototype.polyfills=function(t){return b.polyfills=y({},b.polyfills,t),this},d.prototype.url=function(t,r){if(void 0===r&&(r=!1),r)return this.selfFactory({url:t});var e=this._url.split("?");return this.selfFactory({url:1<e.length?e[0]+t+"?"+e[1]:this._url+t})},d.prototype.options=function(t,r){return void 0===r&&(r=!0),this.selfFactory({options:r?m(this._options,t):t})},d.prototype.query=function(t,r){return void 0===r&&(r=!1),this.selfFactory({url:e(this._url,t,r)})},d.prototype.headers=function(t){return this.selfFactory({options:m(this._options,{headers:t})})},d.prototype.accept=function(t){return this.headers({Accept:t})},d.prototype.content=function(t){return this.headers({"Content-Type":t})},d.prototype.auth=function(t){return this.headers({Authorization:t})},d.prototype.catcher=function(t,r){var e=new Map(this._catchers);return e.set(t,r),this.selfFactory({catchers:e})},d.prototype.signal=function(t){return this.selfFactory({options:y({},this._options,{signal:t.signal})})},d.prototype.resolve=function(t,r){return void 0===r&&(r=!1),this.selfFactory({resolvers:r?[t]:this._resolvers.concat([t])})},d.prototype.defer=function(t,r){return void 0===r&&(r=!1),this.selfFactory({deferredChain:r?[t]:this._deferredChain.concat([t])})},d.prototype.middlewares=function(t,r){return void 0===r&&(r=!1),this.selfFactory({middlewares:r?t:this._middlewares.concat(t)})},d.prototype.method=function(t,r,e){void 0===r&&(r={}),void 0===e&&(e=null);var o=e?"object"==typeof e?this.json(e):this.body(e):this;return function(e){var t=e._url,r=e._catchers,o=e._resolvers,n=e._middlewares,i=e._options,s=new Map(r),u=m(b.defaults,i),c=b.polyfill("AbortController",{doThrow:!1,instance:!0});!u.signal&&c&&(u.signal=c.signal);var a,f,l={ref:null,clear:function(){l.ref&&(clearTimeout(l.ref),l.ref=null)}},p=(f=n,a=b.polyfill("fetch"),(0===f.length?a:1===f.length?f[0](a):f.reduceRight(function(t,r,e){return e===f.length-2?r(t(a)):r(t)}))(t,u)),h=p.then(function(e){return l.clear(),e.ok?e:e[b.errorType||"text"]().then(function(t){var r=new Error(t);throw r[b.errorType||"text"]=t,r.status=e.status,r.response=e,r})}),d=function(t){return t.catch(function(t){if(l.clear(),s.has(t.status))return s.get(t.status)(t,e);if(s.has(t.name))return s.get(t.name)(t,e);throw t})},y=function(e){return function(r){return d(e?h.then(function(t){return t&&t[e]()}).then(function(t){return t&&r&&r(t)||t}):h.then(function(t){return t&&r&&r(t)||t}))}},v={res:y(null),json:y("json"),blob:y("blob"),formData:y("formData"),arrayBuffer:y("arrayBuffer"),text:y("text"),perfs:function(r){return p.then(function(t){return g.observe(t.url,r)}),v},setTimeout:function(t,r){return void 0===r&&(r=c),l.clear(),l.ref=setTimeout(function(){return r.abort()},t),v},controller:function(){return[c,v]},error:function(t,r){return s.set(t,r),v},badRequest:function(t){return v.error(400,t)},unauthorized:function(t){return v.error(401,t)},forbidden:function(t){return v.error(403,t)},notFound:function(t){return v.error(404,t)},timeout:function(t){return v.error(408,t)},internalError:function(t){return v.error(500,t)},onAbort:function(t){return v.error("AbortError",t)}};return o.reduce(function(t,r){return r(t,e)},v)}(o._deferredChain.reduce(function(t,r){return r(t,t._url,t._options)},o).options(y({},r,{method:t})))},d.prototype.get=function(t){return this.method("GET",t)},d.prototype.delete=function(t){return this.method("DELETE",t)},d.prototype.put=function(t,r){return this.method("PUT",r,t)},d.prototype.post=function(t,r){return this.method("POST",r,t)},d.prototype.patch=function(t,r){return this.method("PATCH",r,t)},d.prototype.head=function(t){return this.method("HEAD",t)},d.prototype.opts=function(t){return this.method("OPTIONS",t)},d.prototype.replay=function(t){return this.method(this._options.method,t)},d.prototype.body=function(t){return this.selfFactory({options:y({},this._options,{body:t})})},d.prototype.json=function(t){return this.content("application/json").body(JSON.stringify(t))},d.prototype.formData=function(t){return this.body(function(t){var r=b.polyfill("FormData",{instance:!0});for(var e in t)if(t[e]instanceof Array)for(var o=0,n=t[e];o<n.length;o++){var i=n[o];r.append(e+"[]",i)}else r.append(e,t[e]);return r}(t))},d.prototype.formUrl=function(t){return this.body("string"==typeof t?t:(e=t,Object.keys(e).map(function(r){var t=e[r];return t instanceof Array?t.map(function(t){return o(r,t)}).join("&"):o(r,t)}).join("&"))).content("application/x-www-form-urlencoded");var e},d}(),e=function(t,r,e){var o;if("string"==typeof r)o=r;else{var n=b.polyfill("URLSearchParams",{instance:!0});for(var i in r)if(r[i]instanceof Array)for(var s=0,u=r[i];s<u.length;s++){var c=u[s];n.append(i,c)}else n.append(i,r[i]);o=n.toString()}var a=t.split("?");return e||a.length<2?a[0]+"?"+o:t+"&"+o};function o(t,r){return encodeURIComponent(t)+"="+encodeURIComponent("object"==typeof r?JSON.stringify(r):""+r)}var r=t.factory;return r.default=t.factory,r});
//# sourceMappingURL=wretch.js.map
