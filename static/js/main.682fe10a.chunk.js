(this.webpackJsonpstickery=this.webpackJsonpstickery||[]).push([[0],{10:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),a=n(3),c=n.n(a),l=(n(9),function(e){var t=e.Canvas,n=e.TopBar;return o.a.createElement("div",{style:i},o.a.createElement("div",{style:u},n),o.a.createElement("div",{style:s},t))}),i={position:"fixed",left:0,top:0,right:0,bottom:0},u={position:"fixed",left:0,top:0,right:0,bottom:"95%",backgroundColor:"#262626"},s={position:"fixed",left:0,top:"5%",right:0,bottom:0,backgroundColor:"#1a1a1a"},f=n(1),d=function(e){var t=e.onClick,n=e.children;return o.a.createElement("button",{style:b,onClick:t},n)},b={float:"left",backgroundColor:"gray"},m=function(e){var t=e.clickOut,n=e.children,a=Object(r.useRef)(null);Object(r.useEffect)((function(){if(a.current){var e=a.current,t=a.current.parentElement;return document.body.appendChild(e),function(){t&&t.appendChild(e)}}}),[]);var c=Object(r.useCallback)((function(e){e.target===e.currentTarget&&t()}),[t]);return o.a.createElement("div",{id:"modal",ref:a,style:v,onClick:c},o.a.createElement("div",{style:p},n))},p={position:"fixed",left:"20%",top:"20%",right:"20%",bottom:"20%",backgroundColor:"gray"},v={position:"fixed",left:0,top:0,right:0,bottom:0,backgroundColor:"rgba(0,0,0,0.5)"},E=function(e){var t=e.closeModal,n=e.isModalOpen,r=e.openModal,a=e.importFile;return o.a.createElement(o.a.Fragment,null,o.a.createElement(d,{onClick:r},"Sfondo"),n&&o.a.createElement(m,{clickOut:t},o.a.createElement("button",{onClick:a},"scegli file"),o.a.createElement("br",null),o.a.createElement("span",null,"o incolla")))},g=function(){var e=Object(r.useState)(!1),t=Object(f.a)(e,2),n=t[0],a=t[1],c=Object(r.useCallback)((function(){return a(!1)}),[]),l=Object(r.useCallback)((function(){return a(!0)}),[]),i=function(e){var t=e.fileChoosen;Object(r.useEffect)((function(){var e=function(e){var n=e.clipboardData;if(n&&n.files&&n.files.length>0){var r=n.files[0];t(r,"paste")}};return document.body.addEventListener("paste",e),function(){document.body.removeEventListener("paste",e)}}),[t]),Object(r.useEffect)((function(){var e=function(e){var n=e.dataTransfer;if(n&&n.files.length>0){var r=n.files[0];t(r,"paste")}};return document.body.addEventListener("drop",e),function(){document.body.removeEventListener("drop",e)}}),[t]);var n=Object(r.useRef)(null),o=Object(r.useCallback)((function(){return n.current&&n.current.click()}),[]);return Object(r.useEffect)((function(){var e=document.createElement("input");e.setAttribute("type","file"),e.style.display="none";var r=function(){var n=e.files&&e.files.length>0&&e.files[0];n&&t(n,"fs")};return e.addEventListener("change",r),document.body.appendChild(e),n.current=e,function(){e.removeEventListener("change",r),document.body.removeChild(e),n.current=null}}),[t]),[o]}({fileChoosen:Object(r.useCallback)((function(e){console.log(e)}),[])}),u=Object(f.a)(i,1)[0];return o.a.createElement(E,{importFile:u,closeModal:c,isModalOpen:n,openModal:l})};c.a.render(o.a.createElement((function(){var e=Object(r.useMemo)((function(){return{TopBar:o.a.createElement(o.a.Fragment,null,o.a.createElement(g,null)),Canvas:o.a.createElement("div",null,"canvas")}}),[]);return o.a.createElement(l,e)}),null),document.getElementById("root")),navigator.serviceWorker.register("sw.js")},4:function(e,t,n){e.exports=n(10)},9:function(e,t,n){}},[[4,1,2]]]);
//# sourceMappingURL=main.682fe10a.chunk.js.map