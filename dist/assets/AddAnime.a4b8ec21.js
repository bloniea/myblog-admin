import{L as K}from"./fetch.0f22f1f0.js";/* empty css                           *//* empty css                     *//* empty css                  *//* empty css                   */import{i as g,h as L,j as R,Y as S,Z as $,A as j,B as M,r as T,m as H,D as J,a2 as O,o as _,I as D,a,w as o,u as t,ac as P,J as u,M as Q,N as W,L as Y,a7 as Z,c as I,W as G,K as p,P as X,Q as ee,ag as ae,R as C}from"./vendor.9ce32bbf.js";import{_ as te}from"./plugin-vue_export-helper.21dcd24c.js";import"./index.483ec574.js";const k=v=>(X("data-v-dd63fdf4"),v=v(),ee(),v),le={class:"add-anime"},oe=p("\u9996\u9875"),se=p("\u5A31\u4E50\u7BA1\u7406"),de=p("\u52A8\u6F2B\u5217\u8868"),ne=p("\u6DFB\u52A0\u52A8\u6F2B"),ue=["src"],re={class:"tags"},me={class:"tag-list"},ie={class:"tag-list"},pe=k(()=>u("span",null,"\u89C6\u9891:",-1)),ce={class:"tag-list"},_e=k(()=>u("span",null,"ass\u5B57\u5E55:",-1)),fe={class:"tag-list"},ge=k(()=>u("span",null,"vtt\u5B57\u5E55:",-1)),ve=p(" \u6DFB\u52A0\u96C6\u6570 "),Ve=p("\u7ACB\u5373\u521B\u5EFA"),De=p("\u91CD\u7F6E"),he={setup(v){const h=g(),b=g(!1),w=L(),e=R({addData:{name:"",generalize:"",content:[],img_url:"",fonts:""},rules:{name:[{required:!0,message:"\u8BF7\u8F93\u5165\u6807\u9898",trigger:"blur"}],generalize:[{required:!0,message:"\u8BF7\u8F93\u5165\u5185\u5BB9",trigger:"change"}],content:[{required:!0,message:"\u8BF7\u8F93\u5165\u96C6\u6570",trigger:"blur"}],img_url:[{required:!0,message:"\u8BF7\u8F93\u5165\u56FE\u7247\u5730\u5740",trigger:"blur"}]}}),U=g(null),f=g(""),y=g(!1),B=()=>{y.value=!0,ae(()=>{U.value.focus()})},E=i=>{e.addData.content.splice(e.addData.content.indexOf(i),1)},z=()=>{if(f.value){const i={title:f.value,episode:"",ass:"",vtt:""};e.addData.content.push(i)}y.value=!1,f.value=""},x=async i=>{!i||i.validate(async l=>{if(l){b.value=!0;const r=await K(e.addData);r.status==200&&r.ok?(w.push({name:"Anime"}),C.success("\u6DFB\u52A0\u6210\u529F")):C.error(r.data.message),b.value=!1}})};return(i,l)=>{const r=S,A=$,n=j,c=M,F=T("v-md-editor"),V=H,N=J,q=O;return _(),D("div",le,[a(A,{"separator-class":"el-icon-arrow-right"},{default:o(()=>[a(r,{to:{name:"Home"}},{default:o(()=>[oe]),_:1}),a(r,null,{default:o(()=>[se]),_:1}),a(r,{to:{name:"Anime"}},{default:o(()=>[de]),_:1}),a(r,null,{default:o(()=>[ne]),_:1})]),_:1}),a(q,null,{default:o(()=>[a(N,{ref_key:"addform",ref:h,model:t(e).addData,"label-width":"80px",rules:t(e).rules},{default:o(()=>[a(c,{label:"\u6807\u9898",prop:"name"},{default:o(()=>[a(n,{modelValue:t(e).addData.name,"onUpdate:modelValue":l[0]||(l[0]=s=>t(e).addData.name=s),placeholder:"\u6807\u9898"},null,8,["modelValue"])]),_:1}),a(c,{label:"\u56FE\u7247",prop:"img_url"},{default:o(()=>[a(n,{modelValue:t(e).addData.img_url,"onUpdate:modelValue":l[1]||(l[1]=s=>t(e).addData.img_url=s),placeholder:"htts://example1/1.png"},null,8,["modelValue"]),t(e).addData.img_url?(_(),D("img",{key:0,src:t(e).addData.img_url,class:"preview"},null,8,ue)):P("",!0)]),_:1}),a(c,{label:"\u7B80\u4ECB",prop:"generalize"},{default:o(()=>[a(n,{modelValue:t(e).addData.generalize,"onUpdate:modelValue":l[2]||(l[2]=s=>t(e).addData.generalize=s),class:"seat"},null,8,["modelValue"]),a(F,{modelValue:t(e).addData.generalize,"onUpdate:modelValue":l[3]||(l[3]=s=>t(e).addData.generalize=s),height:"400px"},null,8,["modelValue"])]),_:1}),a(c,{label:"\u5185\u5BB9",prop:"content"},{default:o(()=>[u("div",re,[(_(!0),D(Q,null,W(t(e).addData.content,(s,d)=>(_(),D("div",{class:"tag",key:d},[u("div",me,[u("span",null,"\u7B2C"+Y(d+1)+"\u96C6:",1),a(n,{modelValue:t(e).addData.content[d].title,"onUpdate:modelValue":m=>t(e).addData.content[d].title=m},null,8,["modelValue","onUpdate:modelValue"])]),u("div",ie,[pe,a(n,{modelValue:t(e).addData.content[d].episode,"onUpdate:modelValue":m=>t(e).addData.content[d].episode=m,type:"textarea",autosize:!0},null,8,["modelValue","onUpdate:modelValue"])]),u("div",ce,[_e,a(n,{modelValue:t(e).addData.content[d].ass,"onUpdate:modelValue":m=>t(e).addData.content[d].ass=m,type:"textarea",autosize:!0},null,8,["modelValue","onUpdate:modelValue"])]),u("div",fe,[ge,a(n,{modelValue:t(e).addData.content[d].vtt,"onUpdate:modelValue":m=>t(e).addData.content[d].vtt=m,type:"textarea",autosize:!0},null,8,["modelValue","onUpdate:modelValue"])]),a(V,{icon:t(Z),class:"delete",onClick:m=>E(s)},null,8,["icon","onClick"])]))),128)),y.value?(_(),I(n,{key:0,ref_key:"InputRef",ref:U,modelValue:f.value,"onUpdate:modelValue":l[4]||(l[4]=s=>f.value=s),onKeyup:G(z,["enter"]),onBlur:z},null,8,["modelValue","onKeyup"])):(_(),I(V,{key:1,class:"button-new-tag ml-1",size:"small",onClick:B},{default:o(()=>[ve]),_:1}))])]),_:1}),a(c,{label:"\u5B57\u5E55\u5B57\u4F53",prop:"fonts"},{default:o(()=>[a(n,{modelValue:t(e).addData.fonts,"onUpdate:modelValue":l[5]||(l[5]=s=>t(e).addData.fonts=s),type:"textarea",placeholder:"https://example1.com/1.ttf,https://example1.com/2.ttf",autosize:!0},null,8,["modelValue"])]),_:1}),a(c,null,{default:o(()=>[a(V,{type:"primary",onClick:l[6]||(l[6]=s=>x(h.value)),loading:b.value},{default:o(()=>[Ve]),_:1},8,["loading"]),a(V,{onClick:l[7]||(l[7]=s=>h.value.resetFields())},{default:o(()=>[De]),_:1})]),_:1})]),_:1},8,["model","rules"])]),_:1})])}}};var Be=te(he,[["__scopeId","data-v-dd63fdf4"]]);export{Be as default};
