(this.webpackJsonpdydash=this.webpackJsonpdydash||[]).push([[0],{33:function(e,t,n){},54:function(e,t,n){},55:function(e,t,n){},56:function(e,t,n){},57:function(e,t,n){},58:function(e,t,n){},59:function(e,t,n){"use strict";n.r(t);var c=n(1),s=n.n(c),a=n(23),o=n.n(a),r=n(3),i=n(6),l=n(2),j=n(61),u=n(11),h=n(27),d=(n(33),n(0)),b=[{name:"Player",fields:["Player Name","Access Token"]},{name:"Token",fields:["Access Token"]}],O="Cloud Hostaddress";function m(e){var t=e.method,n=e.hooks;return Object(d.jsx)(d.Fragment,{children:t.fields.map((function(e){return Object(d.jsx)(v,{name:e,hooks:n},e)}))})}function v(e){var t=e.name,n=e.hooks,s=Object(c.useState)(),a=Object(r.a)(s,2),o=a[0],i=a[1];return n[t]={value:o,set:i},Object(d.jsx)("input",{className:"input",placeholder:t,onChange:function(e){return i(e.target.value)}})}function f(e){var t=e.method,n=e.setMethod,s=e.hooks,a=Object(c.useState)(!0),o=Object(r.a)(a,2),i=o[0],l=o[1];return Object(d.jsxs)("div",{className:"LoginSelect",children:[Object(d.jsxs)("div",{className:"box",onClick:function(e){return l(!i)},children:[Object(d.jsx)("p",{className:"text",children:null==t?"Select Method":t.name}),Object(d.jsx)(h.a,{className:"icon"+(i?"":" rotated")})]}),Object(d.jsx)("div",{className:"dropdown-container",children:Object(d.jsx)("span",{className:"dropdown"+(i?"":" shown"),children:Object(d.jsx)("div",{className:"dropdown-selection",children:b.map((function(e){return Object(d.jsx)("p",{className:e===t?"current":"",onClick:function(t){n(e),l(!0)},children:e.name},e.name)}))})})}),Object(d.jsx)(v,{name:O,hooks:s}),null!=t?Object(d.jsx)(m,{method:t,hooks:s}):null]})}function x(e){var t=e.setCookies,n=Object(c.useState)(),s=Object(r.a)(n,2),a=s[0],o=s[1],i=Object(c.useState)(!1),j=Object(r.a)(i,2),h=j[0],b=j[1],m={};function v(e){var t=e.to;return h?Object(d.jsx)(l.a,{to:t}):null}return Object(d.jsxs)("div",{className:"Login",children:[Object(d.jsxs)("div",{className:"header",children:[Object(d.jsx)("img",{alt:"",src:"logo-sized.png"}),Object(d.jsx)("h1",{children:"DyCloud \xbb Dashboard"})]}),Object(d.jsx)("div",{className:"form-container",children:Object(d.jsxs)("div",{className:"form",children:[Object(d.jsx)("h1",{children:"Login"}),Object(d.jsx)(f,{method:a,setMethod:o,hooks:m}),Object(d.jsx)("div",{className:"button",onClick:function(e){if(e.preventDefault(),null!=a){var n=m[O].value,c={magAge:36288e3};t("method",a,c),t("host",n,c);var s,o="",r=Object(u.a)(a.fields);try{for(r.s();!(s=r.n()).done;){var i=s.value;o.length>0&&(o+=":"),o+=m[i].value}}catch(l){r.e(l)}finally{r.f()}t("token",o,c),b(!0)}},children:"Login"}),Object(d.jsx)(v,{to:"/"})]})})]})}function p(e){var t=e.cookies,n=e.setCookies;for(var c in t)"cookieconsent_status"!==c&&n(c,"",{expires:new Date(0)});return Object(d.jsx)(l.a,{to:"/login"})}var k,g,N=n(8),y=n.n(N),S=n(14),C=n(24),w=n(25),E=n(26),P=n.n(E);(g=k||(k={})).UPGRADE_WEBSOCKET={path:"/upgrade",method:"get"},g.ONLINE_PLAYERS={path:"/player/online",method:"get"};var L=function(){function e(t,n){Object(C.a)(this,e),this.host=void 0,this.auth=void 0,this.socket=void 0,this.host=t,this.auth=n}return Object(w.a)(e,[{key:"getAuth",value:function(){return this.auth.method+" "+this.auth.token}},{key:"initSocket",value:function(e){this.socket=e,this.socket.onmessage=function(e){var t=e.data;console.log("WebSocket: "+t)}}},{key:"useUrl",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"http";console.log(t);var c="";for(var s in t)""===c?c="?":c+="&",c+=s,c+="=",c+=encodeURIComponent(t[s]),console.log(s),console.log(t[s]);return"".concat(n,"://").concat(this.host,"/v").concat(1).concat(e.path).concat(c)}},{key:"upgradeWebSocket",value:function(){return new WebSocket(this.useUrl(k.UPGRADE_WEBSOCKET,{auth:this.auth.method+" "+this.auth.token},"wss"))}},{key:"makeRequest",value:function(){var e=Object(S.a)(y.a.mark((function e(t){var n;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=this.useUrl(t),e.abrupt("return",P()(n,{headers:{Authorization:this.getAuth()},timeout:3500,method:t.method}).then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"fetchPlayers",value:function(){var e=Object(S.a)(y.a.mark((function e(){return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",this.makeRequest(k.ONLINE_PLAYERS));case 1:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()}]),e}();function A(e){var t=e.name,n=e.icon,c=e.path;return Object(d.jsx)("div",{children:Object(d.jsxs)(i.b,{to:c,className:"NavEntry",children:[s.a.createElement(n,{className:"icon"}),Object(d.jsx)("p",{className:"name",children:t})]})})}n(54);var D=[{name:"Overview",path:"/",icon:h.b},{name:"Players",path:"player",icon:h.d},{name:"Services",path:"service",icon:h.f},{name:"Logout",path:"logout",icon:h.c}];function F(){return Object(d.jsxs)("div",{className:"Nav",children:[Object(d.jsxs)("div",{className:"header",children:[Object(d.jsx)("img",{alt:"",src:"logo-sized.png"}),Object(d.jsx)("h1",{children:"DyCloud"})]}),Object(d.jsx)("div",{className:"links",children:D.map((function(e){return Object(d.jsx)(A,{name:e.name,icon:e.icon,path:e.path},e.path)}))})]})}n(55);function R(){return Object(d.jsx)("div",{className:"Loader",children:Object(d.jsxs)("div",{className:"lds-ellipsis",children:[Object(d.jsx)("div",{}),Object(d.jsx)("div",{}),Object(d.jsx)("div",{}),Object(d.jsx)("div",{})]})})}function T(e){var t=e.name,n=e.value;return Object(d.jsxs)("div",{className:"Card",children:[Object(d.jsx)(h.e,{className:"icon"}),Object(d.jsx)("p",{className:"name",children:t}),Object(d.jsx)("p",{className:"value",children:n})]})}function U(e){var t=e.api,n=Object(c.useState)(),s=Object(r.a)(n,2),a=s[0],o=s[1];return Object(c.useEffect)((function(){null==a&&t.fetchPlayers().then((function(e){return o(e)}))})),Object(d.jsx)("div",{className:"Overview Dashboard-Component",children:null==a?Object(d.jsx)(R,{}):Object(d.jsx)(d.Fragment,{children:Object(d.jsx)(T,{name:"Online Player",value:a.length})})})}function W(e){var t=e.api,n=Object(c.useState)(),s=Object(r.a)(n,2),a=s[0],o=s[1];return Object(c.useEffect)((function(){null==a&&t.fetchPlayers().then((function(e){return o(e)}))})),Object(d.jsx)("div",{className:"Players Dashboard-Component",children:null==a?Object(d.jsx)(R,{}):Object(d.jsx)(d.Fragment,{})})}n(56);function I(e){var t=e.cookies,n=Object(c.useState)(),s=Object(r.a)(n,2),a=s[0],o=s[1];return Object(c.useEffect)((function(){if(null==a){var e=new L(t.host,{method:t.method,token:t.token}),n=e.upgradeWebSocket();n.onerror=function(){o(!1)},n.onopen=function(){e.initSocket(n),o(e)}}})),Object(d.jsx)(d.Fragment,{children:null==a?Object(d.jsx)(R,{}):a?Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(F,{}),Object(d.jsx)("div",{className:"content",children:Object(d.jsxs)(l.d,{children:[Object(d.jsx)(l.b,{path:"/",element:Object(d.jsx)(U,{api:a})}),Object(d.jsx)(l.b,{path:"player",element:Object(d.jsx)(W,{api:a})})]})})]}):Object(d.jsx)(l.a,{to:"login"})})}n(57);function _(){var e=Object(j.a)(["host","method","token"]),t=Object(r.a)(e,2),n=t[0],c=t[1],s=null!=n.method&&null!=n.host&&null!=n.token;return Object(d.jsx)("div",{className:"App",children:Object(d.jsx)(i.a,{children:Object(d.jsxs)(l.d,{children:[Object(d.jsx)(l.b,{path:"logout",element:Object(d.jsx)(p,{cookies:n,setCookies:c})}),Object(d.jsx)(l.b,{path:"login",element:Object(d.jsx)(x,{setCookies:c})}),Object(d.jsx)(l.b,{path:"*",element:s?Object(d.jsx)(I,{cookies:n}):Object(d.jsx)(l.a,{to:"/login"})})]})})})}var B=function(e){null!=e&&n.e(3).then(n.bind(null,62)).then((function(t){var n=t.getCLS,c=t.getFID,s=t.getFCP,a=t.getLCP,o=t.getTTFB;n(e),c(e),s(e),a(e),o(e)}))};n(58);o.a.render(Object(d.jsx)(s.a.StrictMode,{children:Object(d.jsx)(_,{})}),document.getElementById("root")),B(void 0)}},[[59,1,2]]]);
//# sourceMappingURL=main.ac6b72e1.chunk.js.map