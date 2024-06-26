import{d as A,r as m,a as L,c as F,o as z,b as g,e as o,u as c,t as v,F as y,w as b,v as T,n as x,f as D,g as h,h as S}from"./vendor.d83d9000.js";const I=function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&t(u)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function t(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}};I();function M(d){const l=document.documentElement,a=localStorage.getItem("theme"),t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";d?(l.setAttribute("data-theme",d),localStorage.setItem("theme",d)):(a||t)==="dark"?(l.setAttribute("data-theme","light"),localStorage.setItem("theme","light")):(l.setAttribute("data-theme","dark"),localStorage.setItem("theme","dark")),a&&a!==t&&(l.removeAttribute("data-theme"),localStorage.removeItem("theme"))}const N={class:"section-import"},O={class:"import"},V=o("label",{for:"file",class:"import-btn center btn"},"\u62D6\u62FD\u4E0A\u4F20\u5B57\u4F53\u5305",-1),$={class:"info"},P={key:0,class:"info-tip info-error"},j={key:1,class:"info-tip"},q={class:"info-name"},H={class:"info-size"},K={class:"drag-area"},U=o("div",{class:"drag-area-content"},[o("h2",null,"\u677E\u5F00\u5373\u53EF\u4E0A\u4F20"),o("span",null,"*\u4EC5\u652F\u6301ttf\u683C\u5F0F")],-1),G=[U],J=A({setup(d){const l=m("");let a=m("");const t=L({name:"",size:0,path:""}),e=m(!1),s=m(null),u=F(()=>!!l.value&&!a.value&&t.path),w=F(()=>t.size===0?"--":`${(t.size/1e6).toFixed(3)}MB`),E=i=>{const n=i.target;if(!n.files||!n.files.length)return;console.warn(n.files.length);const{name:r,path:f,size:p}=n.files[0];if(a.value="",/\.ttf$/.test(r.toLowerCase()))a.value="";else return a.value="*\u8BF7\u4E0A\u4F20ttf\u683C\u5F0F\u6587\u4EF6";console.warn(111,n.files),t.name=r,t.path=f,t.size=p,console.warn(t),_()},k=()=>{!u.value||window.fontTiny.compress(l.value)},_=()=>{console.warn("upload",t),window.fontTiny.upload(t.path,t.name)},C=()=>{let i=0;!s.value||(s.value.addEventListener("dragenter",()=>{i++,i===1&&(console.log("dragenter"),e.value||(e.value=!0))}),s.value.addEventListener("dragleave",()=>{i--,i===0&&(console.log("dragleave"),e.value&&(e.value=!1))}),s.value.addEventListener("drop",n=>{var f;i=0,console.log("drop:",n),e.value&&(e.value=!1),n.preventDefault();const r=(f=n.dataTransfer)==null?void 0:f.files;if(console.log("files:",r,n),r&&r.length>0){const p=r[0].path;if(console.log("path:",p,r[0].name),/\.ttf$/.test(r[0].name.toLowerCase()))a.value="";else return a.value="*\u8BF7\u4E0A\u4F20TTF\u683C\u5F0F\u6587\u4EF6";t.name=r[0].name,t.path=p,t.size=r[0].size,_()}}),s.value.addEventListener("dragover",n=>{n.preventDefault()}))},B=i=>{M(),console.log("click"),i.preventDefault()};return z(()=>{C()}),(i,n)=>(h(),g(y,null,[o("div",{class:"wrapper",ref_key:"dragger",ref:s,id:"dragger"},[o("header",null,[o("div",{onClick:B,class:"logo"})]),o("main",null,[o("section",N,[o("div",O,[V,o("input",{type:"file",id:"file",class:"import-input",onChange:E,accept:".ttf"},null,32)]),o("div",$,[c(a)?(h(),g("span",P,v(c(a)),1)):c(t).path?(h(),g(y,{key:2},[o("span",q,v(c(t).name||"--"),1),o("span",H,v(c(w)),1)],64)):(h(),g("span",j,"*\u4EC5\u652F\u6301ttf\u683C\u5F0F"))])]),b(o("textarea",{class:"section-textarea",placeholder:"\u8BF7\u5728\u6B64\u8F93\u5165\u6240\u9700\u5B57\u7B26","onUpdate:modelValue":n[0]||(n[0]=r=>l.value=r)},null,512),[[T,l.value]]),o("section",{class:x(["section-export center btn",{disabled:!c(u)}]),onClick:k},"\u5BFC\u51FA",2)])],512),b(o("div",K,G,512),[[D,e.value]])],64))}});S(J).mount("#app");