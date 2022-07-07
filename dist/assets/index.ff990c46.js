import{r as p,o as f,c as h,w as E,u as l,E as v,a as g,z as L,b as A,d as y,V as c,C as I,g as P,l as w,e as O}from"./vendor.3ed8f5cd.js";const R=function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&t(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}};R();const b={setup(a){return(s,r)=>{const t=p("router-view");return f(),h(l(v),{locale:l(L)},{default:E(()=>[g(t)]),_:1},8,["locale"])}}};const V="modulepreload",m={},T="/admin/",i=function(s,r){return!r||r.length===0?s():Promise.all(r.map(t=>{if(t=`${T}${t}`,t in m)return;m[t]=!0;const e=t.endsWith(".css"),o=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${t}"]${o}`))return;const n=document.createElement("link");if(n.rel=e?"stylesheet":V,e||(n.as="script",n.crossOrigin=""),n.href=t,document.head.appendChild(n),e)return new Promise((u,_)=>{n.addEventListener("load",u),n.addEventListener("error",_)})})).then(()=>s())},C=()=>i(()=>import("./index.8ae4b443.js"),["assets/index.8ae4b443.js","assets/index.4635b768.css","assets/el-loading.fb7520d6.css","assets/el-dialog.0cfbe824.css","assets/el-tooltip.12274e2c.css","assets/el-form-item.a77cdfac.css","assets/el-message.0964603e.css","assets/el-popper.8a454d38.css","assets/fetch.78d37eeb.js","assets/fetch.64286673.css","assets/vendor.3ed8f5cd.js","assets/plugin-vue_export-helper.21dcd24c.js"]),D=()=>i(()=>import("./index.fb0d2000.js"),["assets/index.fb0d2000.js","assets/index.40444d08.css","assets/el-form-item.a77cdfac.css","assets/el-message.0964603e.css","assets/fetch.78d37eeb.js","assets/fetch.64286673.css","assets/vendor.3ed8f5cd.js","assets/plugin-vue_export-helper.21dcd24c.js"]),k=()=>i(()=>import("./index.d48701ad.js"),["assets/index.d48701ad.js","assets/index.f44135f0.css","assets/el-loading.fb7520d6.css","assets/el-dialog.0cfbe824.css","assets/el-tooltip.12274e2c.css","assets/el-form-item.a77cdfac.css","assets/el-message.0964603e.css","assets/el-breadcrumb-item.0e7af043.css","assets/el-popper.8a454d38.css","assets/el-message-box.475f4870.css","assets/fetch.78d37eeb.js","assets/fetch.64286673.css","assets/vendor.3ed8f5cd.js","assets/functions.4004cecb.js"]),S=()=>i(()=>import("./index.0308ac8c.js"),["assets/index.0308ac8c.js","assets/index.946d748c.css","assets/el-loading.fb7520d6.css","assets/fetch.78d37eeb.js","assets/fetch.64286673.css","assets/vendor.3ed8f5cd.js","assets/plugin-vue_export-helper.21dcd24c.js"]),W=()=>i(()=>import("./index.e26479e6.js"),["assets/index.e26479e6.js","assets/index.43c05dc9.css","assets/el-loading.fb7520d6.css","assets/el-message-box.475f4870.css","assets/el-dialog.0cfbe824.css","assets/el-tooltip.12274e2c.css","assets/el-form-item.a77cdfac.css","assets/el-breadcrumb-item.0e7af043.css","assets/el-message.0964603e.css","assets/el-popper.8a454d38.css","assets/fetch.78d37eeb.js","assets/fetch.64286673.css","assets/vendor.3ed8f5cd.js","assets/functions.4004cecb.js"]),H=()=>i(()=>import("./index.a03e7cdd.js"),["assets/index.a03e7cdd.js","assets/index.f7aa1bb1.css","assets/el-loading.fb7520d6.css","assets/el-dialog.0cfbe824.css","assets/el-tooltip.12274e2c.css","assets/el-form-item.a77cdfac.css","assets/el-breadcrumb-item.0e7af043.css","assets/el-message-box.475f4870.css","assets/el-message.0964603e.css","assets/el-popper.8a454d38.css","assets/el-image-viewer.07fde959.css","assets/fetch.78d37eeb.js","assets/fetch.64286673.css","assets/vendor.3ed8f5cd.js","assets/functions.4004cecb.js","assets/plugin-vue_export-helper.21dcd24c.js"]),N=()=>i(()=>import("./index.96050c2b.js"),["assets/index.96050c2b.js","assets/index.1c37b41b.css","assets/el-loading.fb7520d6.css","assets/el-dialog.0cfbe824.css","assets/el-tooltip.12274e2c.css","assets/el-form-item.a77cdfac.css","assets/el-message.0964603e.css","assets/el-breadcrumb-item.0e7af043.css","assets/el-message-box.475f4870.css","assets/el-popper.8a454d38.css","assets/fetch.78d37eeb.js","assets/fetch.64286673.css","assets/vendor.3ed8f5cd.js","assets/plugin-vue_export-helper.21dcd24c.js"]),$=()=>i(()=>import("./index.8728e021.js"),["assets/index.8728e021.js","assets/index.133e810d.css","assets/el-loading.fb7520d6.css","assets/el-breadcrumb-item.0e7af043.css","assets/el-message-box.475f4870.css","assets/el-message.0964603e.css","assets/el-popper.8a454d38.css","assets/el-tooltip.12274e2c.css","assets/el-image-viewer.07fde959.css","assets/fetch.78d37eeb.js","assets/fetch.64286673.css","assets/vendor.3ed8f5cd.js","assets/functions.4004cecb.js","assets/plugin-vue_export-helper.21dcd24c.js"]),F=()=>i(()=>import("./index.da28f026.js"),["assets/index.da28f026.js","assets/index.28fe098a.css","assets/el-loading.fb7520d6.css","assets/el-breadcrumb-item.0e7af043.css","assets/el-form-item.a77cdfac.css","assets/el-message.0964603e.css","assets/el-popper.8a454d38.css","assets/fetch.78d37eeb.js","assets/fetch.64286673.css","assets/vendor.3ed8f5cd.js","assets/plugin-vue_export-helper.21dcd24c.js"]),q=()=>i(()=>import("./index.e24a1724.js"),["assets/index.e24a1724.js","assets/index.3819b12c.css","assets/el-loading.fb7520d6.css","assets/el-breadcrumb-item.0e7af043.css","assets/el-form-item.a77cdfac.css","assets/el-message.0964603e.css","assets/el-popper.8a454d38.css","assets/fetch.78d37eeb.js","assets/fetch.64286673.css","assets/vendor.3ed8f5cd.js","assets/functions.4004cecb.js","assets/plugin-vue_export-helper.21dcd24c.js"]),z=()=>i(()=>import("./index.be96f42a.js"),["assets/index.be96f42a.js","assets/index.dc8122bb.css","assets/el-loading.fb7520d6.css","assets/el-dialog.0cfbe824.css","assets/el-tooltip.12274e2c.css","assets/el-form-item.a77cdfac.css","assets/el-message.0964603e.css","assets/el-breadcrumb-item.0e7af043.css","assets/el-message-box.475f4870.css","assets/el-popper.8a454d38.css","assets/el-image-viewer.07fde959.css","assets/fetch.78d37eeb.js","assets/fetch.64286673.css","assets/vendor.3ed8f5cd.js","assets/functions.4004cecb.js","assets/plugin-vue_export-helper.21dcd24c.js"]),B=[{path:"/login",name:"Login",component:D},{path:"/",name:"Home",component:C,redirect:"/welcome",meta:{auth:!0},children:[{path:"/welcome",name:"Welcome",component:S},{path:"/users",name:"Users",component:k},{path:"/roles",name:"Roles",component:W},{path:"/categories",name:"Cat",component:H},{path:"/labels",name:"Label",component:N},{path:"/articles",name:"Articles",component:$,children:[{path:"add",name:"AddArticle",component:F,meta:{article:!0}},{path:"edit",name:"EditArticle",component:q,meta:{article:!0}}]},{path:"/friends",name:"Friends",component:z}]}],d=A({history:y("/admin"),routes:B});d.beforeEach((a,s,r)=>{const t=window.localStorage.getItem("refresh_token");a.meta.auth?!t||t=="undefined"?(window.localStorage.removeItem("token"),window.localStorage.removeItem("userInfo"),window.localStorage.removeItem("refresh_token"),r({name:"Login"})):r():a.name=="Login"&&t&&t!="undefined"?r({name:"Welcome"}):r()});c.Codemirror=I;c.use(P,{Hljs:w});const U=O(b);U.use(c).use(d).mount("#app");export{d as r};
