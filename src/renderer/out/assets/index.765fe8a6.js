import{d as B,r as m,a as A,c as y,o as L,b as h,e as s,u as d,t as v,F,w,v as z,n as x,f as D,g,h as S}from"./vendor.d83d9000.js";const M=function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}};M();async function N(){const u="fontiny-theme",r=document.documentElement,o=await window.fontTiny.getStore(u),n=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",e=o||n;let t=e;e==="dark"?(r.setAttribute("data-theme","light"),t="light"):(r.setAttribute("data-theme","dark"),t="dark"),o&&o!==n&&(r.removeAttribute("theme"),t=""),await window.fontTiny.setStore(u,t)}async function O(){const u="fontiny-theme",r=document.documentElement,o=await window.fontTiny.getStore(u);!o||r.setAttribute("data-theme",o)}const K={class:"section-import"},V={class:"import"},$=s("label",{for:"file",class:"import-btn center btn"},"\u62D6\u62FD\u4E0A\u4F20\u5B57\u4F53\u5305",-1),P={class:"info"},Y={key:0,class:"info-tip info-error"},j={key:1,class:"info-tip"},q={class:"info-name"},H={class:"info-size"},I={class:"drag-area"},U=s("div",{class:"drag-area-content"},[s("h2",null,"\u677E\u5F00\u5373\u53EF\u4E0A\u4F20"),s("span",null,"*\u4EC5\u652F\u6301ttf\u683C\u5F0F")],-1),G=[U],J=B({setup(u){const r=m("");let o=m("");const n=A({name:"",size:0,path:""}),e=m(!1),t=m(null),c=y(()=>!!r.value&&!o.value&&n.path),E=y(()=>n.size===0?"--":`${(n.size/1e6).toFixed(3)}MB`),k=l=>{const a=l.target;if(!a.files||!a.files.length)return;console.warn(a.files.length);const{name:i,path:f,size:p}=a.files[0];if(o.value="",/\.ttf$/.test(i.toLowerCase()))o.value="";else return o.value="*\u8BF7\u4E0A\u4F20ttf\u683C\u5F0F\u6587\u4EF6";console.warn(111,a.files),n.name=i,n.path=f,n.size=p,console.warn(n),_()},C=()=>{!c.value||window.fontTiny.compress(r.value)},_=()=>{console.warn("upload",n),window.fontTiny.upload(n.path,n.name)},T=()=>{let l=0;!t.value||(t.value.addEventListener("dragenter",()=>{l++,l===1&&(console.log("dragenter"),e.value||(e.value=!0))}),t.value.addEventListener("dragleave",()=>{l--,l===0&&(console.log("dragleave"),e.value&&(e.value=!1))}),t.value.addEventListener("drop",a=>{var f;l=0,console.log("drop:",a),e.value&&(e.value=!1),a.preventDefault();const i=(f=a.dataTransfer)==null?void 0:f.files;if(console.log("files:",i,a),i&&i.length>0){const p=i[0].path;if(console.log("path:",p,i[0].name),/\.ttf$/.test(i[0].name.toLowerCase()))o.value="";else return o.value="*\u8BF7\u4E0A\u4F20ttf\u683C\u5F0F\u6587\u4EF6";n.name=i[0].name,n.path=p,n.size=i[0].size,_()}}),t.value.addEventListener("dragover",a=>{a.preventDefault()}))},b=l=>{N(),console.log("click"),l.preventDefault()};return L(()=>{T(),O()}),(l,a)=>(g(),h(F,null,[s("div",{class:"wrapper",ref_key:"dragger",ref:t,id:"dragger"},[s("header",null,[s("div",{onClick:b,class:"logo"})]),s("main",null,[s("section",K,[s("div",V,[$,s("input",{type:"file",id:"file",class:"import-input",onChange:k,accept:".ttf"},null,32)]),s("div",P,[d(o)?(g(),h("span",Y,v(d(o)),1)):d(n).path?(g(),h(F,{key:2},[s("span",q,v(d(n).name||"--"),1),s("span",H,v(d(E)),1)],64)):(g(),h("span",j,"*\u4EC5\u652F\u6301ttf\u683C\u5F0F"))])]),w(s("textarea",{class:"section-textarea",placeholder:"\u8BF7\u5728\u6B64\u8F93\u5165\u6240\u9700\u5B57\u7B26","onUpdate:modelValue":a[0]||(a[0]=i=>r.value=i)},null,512),[[z,r.value]]),s("section",{class:x(["section-export center btn",{disabled:!d(c)}]),onClick:C},"\u5BFC\u51FA",2)])],512),w(s("div",I,G,512),[[D,e.value]])],64))}});S(J).mount("#app");