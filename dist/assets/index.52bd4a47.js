import{l as E}from"./fetch.c8dec845.js";/* empty css                     *//* empty css                  *//* empty css                   */import{T as W,U as $,o as S,I as x,J as y,h as H,i as b,j as z,A as B,B as P,m as T,D as F,a as i,w as f,u as m,W as w,P as K,Q as q,K as I,R as C}from"./vendor.9ce32bbf.js";import{_ as N}from"./plugin-vue_export-helper.21dcd24c.js";import"./index.9588bbd7.js";const D={class:"s-identify"},R=["width","height"],U={props:{identifyCode:{type:String,default:"1234"},fontSizeMin:{type:Number,default:25},fontSizeMax:{type:Number,default:40},backgroundColorMin:{type:Number,default:180},backgroundColorMax:{type:Number,default:240},colorMin:{type:Number,default:50},colorMax:{type:Number,default:160},lineColorMin:{type:Number,default:40},lineColorMax:{type:Number,default:180},dotColorMin:{type:Number,default:0},dotColorMax:{type:Number,default:255},contentWidth:{type:Number,default:112},contentHeight:{type:Number,default:38}},setup(_){const o=_,l=(e,n)=>Math.floor(Math.random()*(n-e)+e),g=(e,n)=>{let u=l(e,n),r=l(e,n),t=l(e,n);return"rgb("+u+","+r+","+t+")"},v=()=>{let n=document.getElementById("s-canvas").getContext("2d");n.textBaseline="bottom",n.fillStyle=g(o.backgroundColorMin,o.backgroundColorMax),n.fillRect(0,0,o.contentWidth,o.contentHeight);for(let u=0;u<o.identifyCode.length;u++)h(n,o.identifyCode[u],u);s(n),c(n)},h=(e,n,u)=>{e.fillStyle=g(o.colorMin,o.colorMax),e.font=l(o.fontSizeMin,o.fontSizeMax)+"px SimHei";let r=(u+1)*(o.contentWidth/(o.identifyCode.length+1)),t=l(o.fontSizeMax,o.contentHeight-5);var a=l(-45,45);e.translate(r,t),e.rotate(a*Math.PI/180),e.fillText(n,0,0),e.rotate(-a*Math.PI/180),e.translate(-r,-t)},s=e=>{for(let n=0;n<8;n++)e.strokeStyle=g(o.lineColorMin,o.lineColorMax),e.beginPath(),e.moveTo(l(0,o.contentWidth),l(0,o.contentHeight)),e.lineTo(l(0,o.contentWidth),l(0,o.contentHeight)),e.stroke()},c=e=>{for(let n=0;n<100;n++)e.fillStyle=g(0,255),e.beginPath(),e.arc(l(0,o.contentWidth),l(0,o.contentHeight),1,0,2*Math.PI),e.fill()};return W(()=>o.identifyCode,()=>v()),$(()=>{v()}),(e,n)=>(S(),x("div",D,[y("canvas",{id:"s-canvas",width:o.contentWidth,height:o.contentHeight},null,8,R)]))}};var j=N(U,[["__scopeId","data-v-5ea4faba"]]);const k=_=>(K("data-v-4b68bbe4"),_=_(),q(),_),J={class:"login"},L={class:"login-form"},A=k(()=>y("div",{class:"avatar-box"},[y("img",{src:"https://cloud.bloniea.xyz/images/avatar.png",alt:""})],-1)),O=k(()=>y("h3",{class:"title"}," \u535A\u5BA2\u540E\u53F0\u7BA1\u7406\u7CFB\u7EDF ",-1)),Q={class:"s-identify-box"},G=I("\u767B\u9646"),X=I("\u91CD\u7F6E "),Y={setup(_){const o=H(),g={user:[{required:!0,message:"\u8BF7\u8F93\u5165\u7528\u6237\u540D",trigger:"blur"}],password:[{required:!0,message:"\u8BF7\u8F93\u5165\u5BC6\u7801",trigger:"blur"}],code:[{validator:(r,t,a)=>{t===""?a(new Error("\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801")):s.code!==v.value?a(new Error("\u9A8C\u8BC1\u7801\u9519\u8BEF")):a()},trigger:"change"}]},v=b(""),h=()=>{const r="1234567890abcdefghijklmnopqrstuvwsyz";let t="";for(let a=0;a<4;a++){let d=Math.floor(Math.random()*(r.length-1));t+=r[d]}v.value=t};h();const s=z({user:"test",password:"123456",code:""}),c=b(),e=b(!1),n=r=>{r.validate(async t=>{if(t){e.value=!0;const a={user:s.user,password:s.password},d=await E(a);d.ok&&d.status===200?(e.value=!1,C.success("\u767B\u5F55\u6210\u529F"),window.localStorage.setItem("userInfo",JSON.stringify(d.data.data.user)),window.localStorage.setItem("token",d.data.data.token),window.localStorage.setItem("refresh_token",d.data.data.refresh_token),o.push({name:"Welcome"})):(e.value=!1,C.error("\u7528\u6237\u540D\u6216\u5BC6\u7801\u9519\u8BEF"))}})},u=r=>{r.resetFields()};return(r,t)=>{const a=B,d=P,M=T,V=F;return S(),x("div",J,[y("div",L,[A,O,i(V,{ref_key:"loginForm",ref:c,model:m(s),"label-width":"80px",rules:g},{default:f(()=>[i(d,{label:"\u7528\u6237\u540D",prop:"user"},{default:f(()=>[i(a,{modelValue:m(s).user,"onUpdate:modelValue":t[0]||(t[0]=p=>m(s).user=p),onKeyup:t[1]||(t[1]=w(p=>n(c.value),["enter"]))},null,8,["modelValue"])]),_:1}),i(d,{label:"\u5BC6\u7801",prop:"password"},{default:f(()=>[i(a,{modelValue:m(s).password,"onUpdate:modelValue":t[2]||(t[2]=p=>m(s).password=p),type:"password",onKeyup:t[3]||(t[3]=w(p=>n(c.value),["enter"]))},null,8,["modelValue"])]),_:1}),i(d,{label:"\u9A8C\u8BC1\u7801",prop:"code"},{default:f(()=>[y("div",Q,[i(a,{modelValue:m(s).code,"onUpdate:modelValue":t[4]||(t[4]=p=>m(s).code=p),onKeyup:t[5]||(t[5]=w(p=>n(c.value),["enter"]))},null,8,["modelValue"]),i(j,{identifyCode:v.value,onClick:h},null,8,["identifyCode"])])]),_:1}),i(d,{class:"login-btn"},{default:f(()=>[i(M,{type:"primary",loading:e.value,onClick:t[6]||(t[6]=p=>n(c.value))},{default:f(()=>[G]),_:1},8,["loading"]),i(M,{onClick:t[7]||(t[7]=p=>u(c.value))},{default:f(()=>[X]),_:1})]),_:1})]),_:1},8,["model"])])])}}};var re=N(Y,[["__scopeId","data-v-4b68bbe4"]]);export{re as default};
