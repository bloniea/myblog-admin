import{M as L,N as M}from"./fetch.0f22f1f0.js";/* empty css                   *//* empty css                           *//* empty css                     *//* empty css                  *//* empty css                   */import{i as f,h as j,f as H,j as T,k as G,Y as J,Z as O,A as P,B as Q,r as W,m as Y,D as Z,a2 as X,G as ee,o as p,I as D,a,w as s,H as te,c as B,u as l,ac as ae,J as r,M as le,N as oe,L as se,a7 as ne,W as de,K as m,P as ie,Q as ue,ag as re,R as A}from"./vendor.9ce32bbf.js";import{_ as me}from"./plugin-vue_export-helper.21dcd24c.js";import"./index.483ec574.js";const U=v=>(ie("data-v-00bed3f6"),v=v(),ue(),v),ce={class:"edit-anime"},pe=m("\u9996\u9875"),_e=m("\u5A31\u4E50\u7BA1\u7406"),fe=m("\u52A8\u6F2B\u5217\u8868"),ge=m("\u4FEE\u6539\u52A8\u6F2B"),ve=["src"],Ve={class:"tags"},De={class:"tag-list"},he={class:"tag-list"},be=U(()=>r("span",null,"\u89C6\u9891:",-1)),ye={class:"tag-list"},ke=U(()=>r("span",null,"ass\u5B57\u5E55:",-1)),ze=m(" >"),Be={class:"tag-list"},Ue=U(()=>r("span",null,"vtt\u5B57\u5E55:",-1)),we=m(" >"),Ce=m(" \u6DFB\u52A0\u96C6\u6570 "),Ee=m("\u7ACB\u5373\u4FEE\u6539"),Ie=m("\u91CD\u7F6E"),Ae={setup(v){const h=f(),b=f(!1),x=j(),w=H(),y=f(!0),e=T({editData:{name:"",generalize:"",content:[],img_url:"",fonts:""},rules:{name:[{required:!0,message:"\u8BF7\u8F93\u5165\u6807\u9898",trigger:"blur"}],generalize:[{required:!0,message:"\u8BF7\u8F93\u5165\u5185\u5BB9",trigger:"change"}],content:[{required:!0,message:"\u8BF7\u8F93\u5165\u96C6\u6570",trigger:"blur"}],img_url:[{required:!0,message:"\u8BF7\u8F93\u5165\u56FE\u7247\u5730\u5740",trigger:"blur"}]}}),C=f(),g=f(""),k=f(!1),F=()=>{k.value=!0,re(()=>{C.value.input.focus()})},E=n=>{e.editData.content.splice(e.editData.content.indexOf(n),1)},z=n=>{n==""&&E(n)},I=()=>{if(g.value){const n={title:g.value,episode:"",ass:"",vtt:""};e.editData.content.push(n)}k.value=!1,g.value=""};G(()=>e.editData.fonts.toString()),(async()=>{y.value=!0;const n=w.query.id,t=await L(n);t.status==200&&t.ok&&(e.editData=t.data.data,e.editData.generalize=String(t.data.data.generalize)=="null"?"":t.data.data.generalize,y.value=!1)})();const q=async n=>{!n||n.validate(async t=>{if(t){b.value=!0;const c=await M(w.query.id,e.editData);c.status==200&&c.ok?(x.push({name:"Anime"}),A.success("\u4FEE\u6539\u6210\u529F")):A.error(c.data.message),b.value=!1}})};return(n,t)=>{const c=J,N=O,u=P,_=Q,S=W("v-md-editor"),V=Y,$=Z,R=X,K=ee;return p(),D("div",ce,[a(N,{"separator-class":"el-icon-arrow-right"},{default:s(()=>[a(c,{to:{name:"Home"}},{default:s(()=>[pe]),_:1}),a(c,null,{default:s(()=>[_e]),_:1}),a(c,{to:{name:"Anime"}},{default:s(()=>[fe]),_:1}),a(c,null,{default:s(()=>[ge]),_:1})]),_:1}),a(R,null,{default:s(()=>[te((p(),B($,{ref_key:"editForm",ref:h,model:l(e).editData,"label-width":"80px",rules:l(e).rules},{default:s(()=>[a(_,{label:"\u6807\u9898",prop:"name"},{default:s(()=>[a(u,{modelValue:l(e).editData.name,"onUpdate:modelValue":t[0]||(t[0]=o=>l(e).editData.name=o),placeholder:"\u6807\u9898"},null,8,["modelValue"])]),_:1}),a(_,{label:"\u56FE\u7247",prop:"img_url"},{default:s(()=>[a(u,{modelValue:l(e).editData.img_url,"onUpdate:modelValue":t[1]||(t[1]=o=>l(e).editData.img_url=o),placeholder:"htts://example1/1.png"},null,8,["modelValue"]),l(e).editData.img_url?(p(),D("img",{key:0,src:l(e).editData.img_url,class:"preview"},null,8,ve)):ae("",!0)]),_:1}),a(_,{label:"\u5185\u5BB9",prop:"generalize"},{default:s(()=>[a(u,{modelValue:l(e).editData.generalize,"onUpdate:modelValue":t[2]||(t[2]=o=>l(e).editData.generalize=o),class:"seat"},null,8,["modelValue"]),a(S,{modelValue:l(e).editData.generalize,"onUpdate:modelValue":t[3]||(t[3]=o=>l(e).editData.generalize=o),height:"400px"},null,8,["modelValue"])]),_:1}),a(_,{label:"\u5185\u5BB9",prop:"content"},{default:s(()=>[r("div",Ve,[(p(!0),D(le,null,oe(l(e).editData.content,(o,i)=>(p(),D("div",{class:"tag",key:i},[r("div",De,[r("span",null,"\u7B2C"+se(i+1)+"\u96C6:",1),a(u,{modelValue:l(e).editData.content[i].title,"onUpdate:modelValue":d=>l(e).editData.content[i].title=d},null,8,["modelValue","onUpdate:modelValue"])]),r("div",he,[be,a(u,{modelValue:l(e).editData.content[i].episode,"onUpdate:modelValue":d=>l(e).editData.content[i].episode=d,onBlur:d=>z(o),type:"textarea",autosize:!0},null,8,["modelValue","onUpdate:modelValue","onBlur"])]),r("div",ye,[ke,a(u,{modelValue:l(e).editData.content[i].ass,"onUpdate:modelValue":d=>l(e).editData.content[i].ass=d,onBlur:d=>z(o),type:"textarea",autosize:!0},{default:s(()=>[ze]),_:2},1032,["modelValue","onUpdate:modelValue","onBlur"])]),r("div",Be,[Ue,a(u,{modelValue:l(e).editData.content[i].vtt,"onUpdate:modelValue":d=>l(e).editData.content[i].vtt=d,onBlur:d=>z(o),type:"textarea",autosize:!0},{default:s(()=>[we]),_:2},1032,["modelValue","onUpdate:modelValue","onBlur"])]),a(V,{icon:l(ne),class:"delete",onClick:d=>E(o)},null,8,["icon","onClick"])]))),128)),k.value?(p(),B(u,{key:0,ref_key:"InputRef",ref:C,modelValue:g.value,"onUpdate:modelValue":t[4]||(t[4]=o=>g.value=o),size:"small",onKeyup:de(I,["enter"]),onBlur:I},null,8,["modelValue","onKeyup"])):(p(),B(V,{key:1,class:"button-new-tag ml-1",size:"small",onClick:F},{default:s(()=>[Ce]),_:1}))])]),_:1}),a(_,{label:"\u5B57\u5E55\u5B57\u4F53",prop:"fonts"},{default:s(()=>[a(u,{modelValue:l(e).editData.fonts,"onUpdate:modelValue":t[5]||(t[5]=o=>l(e).editData.fonts=o),type:"textarea",placeholder:"https://example1.com/1.ttf,https://example1.com/2.ttf",autosize:!0},null,8,["modelValue"])]),_:1}),a(_,null,{default:s(()=>[a(V,{type:"primary",onClick:t[6]||(t[6]=o=>q(h.value)),loading:b.value},{default:s(()=>[Ee]),_:1},8,["loading"]),a(V,{onClick:t[7]||(t[7]=o=>h.value.resetFields())},{default:s(()=>[Ie]),_:1})]),_:1})]),_:1},8,["model","rules"])),[[K,y.value]])]),_:1})])}}};var je=me(Ae,[["__scopeId","data-v-00bed3f6"]]);export{je as default};
