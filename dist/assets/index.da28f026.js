import{m as N,q as h,x as D}from"./fetch.78d37eeb.js";/* empty css                   *//* empty css                           *//* empty css                     *//* empty css                   *//* empty css                  */import{i as V,h as H,j as y,Y as M,Z as R,A as $,B as j,a3 as G,a4 as J,r as K,m as O,D as S,a2 as T,G as Y,o as d,I as p,a as l,w as r,H as Z,c as f,u as a,J as z,M as k,N as E,ac as P,K as i,R as x}from"./vendor.3ed8f5cd.js";import{_ as Q}from"./plugin-vue_export-helper.21dcd24c.js";import"./index.ff990c46.js";const W={class:"addArticle"},X=i("\u9996\u9875"),ee=i("\u6587\u7AE0\u7BA1\u7406"),te=i("\u6587\u7AE0\u5217\u8868"),le=i("\u6DFB\u52A0\u6587\u7AE0"),ae={class:"category_label"},oe=["src"],re=i("\u7ACB\u5373\u521B\u5EFA"),se=i("\u91CD\u7F6E"),ne={setup(ue){const _=V(!0),A=H(),g=V(),m=y({btn:!1}),e=y({req:{title:"",category_id:"",label_ids:[],img_url:"",content:"",img_source:""},categories:[],labels:[],rules:{title:[{required:!0,message:"\u8BF7\u8F93\u5165\u6807\u9898",trigger:"blur"}],category_id:[{required:!0,message:"\u8BF7\u9009\u62E9\u5206\u7C7B",trigger:"change"}],img_url:[{required:!0,message:"\u8BF7\u8F93\u5165\u56FE\u7247\u5730\u5740",trigger:"blur"}],img_source:[{required:!0,message:"\u8BF7\u8F93\u5165\u56FE\u7247\u6765\u6E90",trigger:"blur"}],content:[{required:!0,message:"\u8BF7\u8F93\u5165\u5185\u5BB9",trigger:"change"}]}});(async()=>{_.value=!0;const s=await N();s.status===200&&s.ok&&(e.categories=s.data.data,_.value=!1)})(),(async()=>{_.value=!0;const s=await h();s.status===200&&s.ok&&(e.labels=s.data.data,_.value=!1)})();const w=s=>{!s||s.validate(async o=>{if(o){m.btn=!0;const n=await D(e.req);n.status===200&&n.ok?(s.resetFields(),x.success("\u521B\u5EFA\u6210\u529F"),m.btn=!1,A.push({name:"Articles"})):(m.btn=!1,x.error(n.data.message))}})},C=s=>{s.resetFields()};return(s,o)=>{const n=M,B=R,c=$,u=j,b=G,v=J,F=K("v-md-editor"),q=O,U=S,L=T,I=Y;return d(),p("div",W,[l(B,{"separator-class":"el-icon-arrow-right"},{default:r(()=>[l(n,{to:{name:"Home"}},{default:r(()=>[X]),_:1}),l(n,null,{default:r(()=>[ee]),_:1}),l(n,{to:{name:"Articles"}},{default:r(()=>[te]),_:1}),l(n,null,{default:r(()=>[le]),_:1})]),_:1}),l(L,null,{default:r(()=>[Z((d(),f(U,{ref_key:"Addform",ref:g,model:a(e).req,"label-width":"80px",rules:a(e).rules},{default:r(()=>[l(u,{label:"\u6807\u9898",prop:"title"},{default:r(()=>[l(c,{modelValue:a(e).req.title,"onUpdate:modelValue":o[0]||(o[0]=t=>a(e).req.title=t)},null,8,["modelValue"])]),_:1}),z("div",ae,[l(u,{label:"\u5206\u7C7B",prop:"category_id"},{default:r(()=>[l(v,{modelValue:a(e).req.category_id,"onUpdate:modelValue":o[1]||(o[1]=t=>a(e).req.category_id=t),placeholder:"\u8BF7\u9009\u62E9\u5206\u7C7B"},{default:r(()=>[(d(!0),p(k,null,E(a(e).categories,t=>(d(),f(b,{key:t._id,label:t.cat_name,value:t._id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),l(u,{label:"\u6807\u7B7E"},{default:r(()=>[l(v,{modelValue:a(e).req.label_ids,"onUpdate:modelValue":o[2]||(o[2]=t=>a(e).req.label_ids=t),multiple:"",placeholder:"\u8BF7\u9009\u62E9\u6807\u7B7E"},{default:r(()=>[(d(!0),p(k,null,E(a(e).labels,t=>(d(),f(b,{key:t._id,label:t.label_name,value:t._id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1})]),l(u,{label:"\u56FE\u7247\u6765\u6E90",prop:"img_source"},{default:r(()=>[l(c,{modelValue:a(e).req.img_source,"onUpdate:modelValue":o[3]||(o[3]=t=>a(e).req.img_source=t)},null,8,["modelValue"])]),_:1}),l(u,{label:"\u56FE\u7247\u5730\u5740",prop:"img_url"},{default:r(()=>[l(c,{modelValue:a(e).req.img_url,"onUpdate:modelValue":o[4]||(o[4]=t=>a(e).req.img_url=t)},null,8,["modelValue"]),a(e).req.img_url?(d(),p("img",{key:0,src:a(e).req.img_url,class:"preview"},null,8,oe)):P("",!0)]),_:1}),l(u,{label:"\u5185\u5BB9",prop:"content"},{default:r(()=>[l(c,{modelValue:a(e).req.content,"onUpdate:modelValue":o[5]||(o[5]=t=>a(e).req.content=t),style:{display:"none"}},null,8,["modelValue"]),l(F,{modelValue:a(e).req.content,"onUpdate:modelValue":o[6]||(o[6]=t=>a(e).req.content=t),height:"400px"},null,8,["modelValue"])]),_:1}),l(u,null,{default:r(()=>[l(q,{type:"primary",onClick:o[7]||(o[7]=t=>w(g.value)),loading:a(m).btn},{default:r(()=>[re]),_:1},8,["loading"]),l(q,{onClick:o[8]||(o[8]=t=>C(g.value))},{default:r(()=>[se]),_:1})]),_:1})]),_:1},8,["model","rules"])),[[I,_.value]])]),_:1})])}}};var Ve=Q(ne,[["__scopeId","data-v-51d9d6ea"]]);export{Ve as default};
