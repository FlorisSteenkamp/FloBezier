"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[874],{8132:function(e,t,n){n.d(t,{O:function(){return o}});var r=n(3546),a=n(809);function o(e,t,n){var o=function(n){return(0,a.x)(e,t,t)(n,4)};return function(a,i,l,s){void 0===l&&(l=!0),void 0===s&&(s=!0);var u=(0,r.JQ)(a,i[0],i[1]);if(4===a.length){var p=u[0],d=u[1],b=u[2],m=u[3],g=p[0],_=p[1],v=d[0],c=d[1],k=b[0],f=b[1],x=m[0],h=m[1];e.strokeStyle=t,e.fillStyle=n,e.lineWidth=2,e.beginPath(),e.moveTo(g,_),e.bezierCurveTo(v,c,k,f,x,h),e.stroke(),s&&(e.save(),e.lineWidth=.5,e.beginPath(),e.moveTo(g,_),e.lineTo(v,c),e.lineTo(k,f),e.lineTo(x,h),e.stroke(),e.restore()),l&&(o(p),o(d),o(b),o(m))}else if(3===a.length){var N=u[0],T=u[1],y=u[2],P=N[0],C=N[1],S=T[0],z=T[1],w=y[0],B=y[1];e.strokeStyle=t,e.fillStyle=n,e.lineWidth=2,e.beginPath(),e.moveTo(P,C),e.quadraticCurveTo(S,z,w,B),e.stroke(),s&&(e.save(),e.lineWidth=.5,e.beginPath(),e.moveTo(P,C),e.lineTo(S,z),e.lineTo(w,B),e.stroke(),e.restore()),l&&(o(N),o(T),o(y))}else if(2===a.length){var D=u[0],M=u[1],W=D[0],F=D[1],I=M[0],O=M[1];e.strokeStyle=t,e.fillStyle=n,e.lineWidth=2,e.beginPath(),e.moveTo(W,F),e.lineTo(I,O),e.stroke(),s&&(e.save(),e.lineWidth=.5,e.beginPath(),e.moveTo(W,F),e.lineTo(I,O),e.stroke(),e.restore()),l&&(o(D),o(M))}}}},8601:function(e,t,n){function r(e,t,n){return function(r){var a=r[0],o=a[0],i=a[1],l=r[1],s=l[0],u=l[1];t&&(e.strokeStyle=t),n&&(e.fillStyle=n),e.beginPath(),e.moveTo(o,i),e.lineTo(o,u),e.lineTo(s,u),e.lineTo(s,i),e.lineTo(o,i),t&&e.stroke(),n&&e.fill()}}n.d(t,{M:function(){return r}})},8911:function(e,t,n){n.r(t),n.d(t,{assets:function(){return y},contentTitle:function(){return N},default:function(){return S},frontMatter:function(){return h},metadata:function(){return T},toc:function(){return P}});var r=n(7462),a=n(3366),o=n(7294),i=n(3905),l=n(2041),s=n(6085),u=n(3546),p=n(4388),d=n(8601),b=n(9354),m=n(8132),g=(0,p.t)(s.E,s.d),_=u.mk,v=[[13.375,2.343],[3.15,4.41],[10.34,8.8],[15.818,2.406]],c=[{title:"t start",val:.15,min:0,max:1,step:.01},{title:"t end",val:.65,min:0,max:1,step:.01}];function k(e){var t=(0,d.M)(e,"#ff0","transparent"),n=(0,b.P)(e,"#f00","transparent"),r=(0,m.O)(e,"#0f0","transparent"),a=[v,[c[0].val,c[1].val]],o=_.apply(void 0,a);return t(o.map(g)),n(v.map(g)),r(v.map(g),[c[0].val,c[1].val],!0,!0),[{result:o,params:[a]}]}function f(){return o.createElement(l.O,{functionName:_.name,draw:k,draggables:v,scalars:c})}var x=["components"],h={id:"global_properties_bounds_get_interval_box_get_interval_box",title:"get-interval-box"},N=void 0,T={unversionedId:"modules/global_properties_bounds_get_interval_box_get_interval_box",id:"modules/global_properties_bounds_get_interval_box_get_interval_box",title:"get-interval-box",description:"Defined in global-properties/bounds/get-interval-box/get-interval-box.ts:27",source:"@site/docs/modules/global_properties_bounds_get_interval_box_get_interval_box.mdx",sourceDirName:"modules",slug:"/modules/global_properties_bounds_get_interval_box_get_interval_box",permalink:"/FloBezier/docs/modules/global_properties_bounds_get_interval_box_get_interval_box",draft:!1,tags:[],version:"current",frontMatter:{id:"global_properties_bounds_get_interval_box_get_interval_box",title:"get-interval-box"},sidebar:"sidebar",previous:{title:"get-y-bounds-tight",permalink:"/FloBezier/docs/modules/global_properties_bounds_get_y_bounds_tight"},next:{title:"get-interval-box-dd",permalink:"/FloBezier/docs/modules/global_properties_bounds_get_interval_box_get_interval_box_dd"}},y={},P=[{value:"Parameters:",id:"parameters",level:4}],C={toc:P};function S(e){var t=e.components,n=(0,a.Z)(e,x);return(0,i.kt)("wrapper",(0,r.Z)({},C,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"function getIntervalBox(ps: number[][], ts: number[]): number[][]\n")),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},"Defined in ",(0,i.kt)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloBezier/blob/a2fe14d/src/global-properties/bounds/get-interval-box/get-interval-box.ts#L27"},"global-properties/bounds/get-interval-box/get-interval-box.ts:27"))),(0,i.kt)("p",null,"Returns an axis-aligned-box that is guaranteed to engulf the entire\ngiven bezier curve from t1 to t2. The returned box is given as a pair\nof points (the box corners) in double precision, e.g. ",(0,i.kt)("inlineCode",{parentName:"p"},"[[1,1], [2,2]]"),"."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"precondition:")," (to satisfy guarantee) t1 < t2"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"precondition:")," (to satisfy guarantee) t1,t2 >= 0 && t1,t2 <= 1")),(0,i.kt)(f,{mdxType:"GetIntervalBox"}),(0,i.kt)("h4",{id:"parameters"},"Parameters:"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"Name"),(0,i.kt)("th",{parentName:"tr",align:null},"Type"),(0,i.kt)("th",{parentName:"tr",align:null},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"ps")),(0,i.kt)("td",{parentName:"tr",align:null},"number","[][]"),(0,i.kt)("td",{parentName:"tr",align:null},"an order 1,2 or 3 bezier curve given as an array of its control points, e.g. ",(0,i.kt)("inlineCode",{parentName:"td"},"[[0,0], [1,1], [2,1], [2,0]]"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"ts")),(0,i.kt)("td",{parentName:"tr",align:null},"number[]"),(0,i.kt)("td",{parentName:"tr",align:null},"parameter values, e.g. ","[0.11, 0.12]")))))}S.isMDXComponent=!0}}]);