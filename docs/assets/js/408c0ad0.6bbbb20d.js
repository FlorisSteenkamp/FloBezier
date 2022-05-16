"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[4263],{8132:function(t,e,a){a.d(e,{O:function(){return l}});var r=a(3546),n=a(809);function l(t,e,a){var l=function(a){return(0,n.x)(t,e,e)(a,4)};return function(n,i,o,u){void 0===o&&(o=!0),void 0===u&&(u=!0);var s=(0,r.JQ)(n,i[0],i[1]);if(4===n.length){var p=s[0],m=s[1],d=s[2],v=s[3],k=p[0],b=p[1],c=m[0],g=m[1],N=d[0],f=d[1],h=v[0],_=v[1];t.strokeStyle=e,t.fillStyle=a,t.lineWidth=2,t.beginPath(),t.moveTo(k,b),t.bezierCurveTo(c,g,N,f,h,_),t.stroke(),u&&(t.save(),t.lineWidth=.5,t.beginPath(),t.moveTo(k,b),t.lineTo(c,g),t.lineTo(N,f),t.lineTo(h,_),t.stroke(),t.restore()),o&&(l(p),l(m),l(d),l(v))}else if(3===n.length){var y=s[0],T=s[1],C=s[2],x=y[0],P=y[1],D=T[0],z=T[1],w=C[0],S=C[1];t.strokeStyle=e,t.fillStyle=a,t.lineWidth=2,t.beginPath(),t.moveTo(x,P),t.quadraticCurveTo(D,z,w,S),t.stroke(),u&&(t.save(),t.lineWidth=.5,t.beginPath(),t.moveTo(x,P),t.lineTo(D,z),t.lineTo(w,S),t.stroke(),t.restore()),o&&(l(y),l(T),l(C))}else if(2===n.length){var W=s[0],O=s[1],E=W[0],M=W[1],B=O[0],F=O[1];t.strokeStyle=e,t.fillStyle=a,t.lineWidth=2,t.beginPath(),t.moveTo(E,M),t.lineTo(B,F),t.stroke(),u&&(t.save(),t.lineWidth=.5,t.beginPath(),t.moveTo(E,M),t.lineTo(B,F),t.stroke(),t.restore()),o&&(l(W),l(O))}}}},4526:function(t,e,a){a.r(e),a.d(e,{assets:function(){return w},contentTitle:function(){return D},default:function(){return O},frontMatter:function(){return P},metadata:function(){return z},toc:function(){return S}});var r=a(7462),n=a(3366),l=a(7294),i=a(3905),o=a(2041),u=a(6085),s=a(9354),p=a(3546),m=a(4388),d=a(8132),v=(0,m.t)(u.E,u.d),k=p._G,b=[[1,1],[5.78125,7.21875],[11.8125,1.3125],[6.21875,6.21875]],c=[{title:"t start",val:0,min:0,max:1,step:.01},{title:"t end",val:1,min:0,max:1,step:.01}];function g(t){var e=(0,s.P)(t,"#f00","transparent"),a=(0,d.O)(t,"#0f0",void 0),r=[b,[c[0].val,c[1].val]],n=k.apply(void 0,r);return e(b.map(v)),a(b.map(v),[c[0].val,c[1].val],!1,!1),[{result:n,params:[r]}]}function N(){return l.createElement(o.O,{functionName:k.name,draw:g,draggables:b,scalars:c})}var f=(0,m.t)(u.E,u.d),h=p.Ce,_=[[1,1],[5.78125,7.21875],[11.8125,1.3125],[6.21875,6.21875]],y=[{title:"t start",val:0,min:0,max:1,step:.01},{title:"t end",val:1,min:0,max:1,step:.01}];function T(t){var e=(0,s.P)(t,"#f00","transparent"),a=(0,d.O)(t,"#0f0",void 0),r=[_,[y[0].val,y[1].val]],n=h.apply(void 0,r);return e(_.map(f)),a(_.map(f),[y[0].val,y[1].val],!1,!1),[{result:n,params:[r]}]}function C(){return l.createElement(o.O,{functionName:h.name,draw:T,draggables:_,scalars:y})}var x=["components"],P={id:"global_properties_total_absolute_curvature",title:"total-absolute-curvature"},D=void 0,z={unversionedId:"modules/global_properties_total_absolute_curvature",id:"modules/global_properties_total_absolute_curvature",title:"total-absolute-curvature",description:"Defined in global-properties/total-absolute-curvature.ts:22",source:"@site/docs/modules/global_properties_total_absolute_curvature.mdx",sourceDirName:"modules",slug:"/modules/global_properties_total_absolute_curvature",permalink:"/FloBezier/docs/modules/global_properties_total_absolute_curvature",draft:!1,tags:[],version:"current",frontMatter:{id:"global_properties_total_absolute_curvature",title:"total-absolute-curvature"},sidebar:"sidebar",previous:{title:"get-inflections",permalink:"/FloBezier/docs/modules/global_properties_get_inflections"},next:{title:"get-bounding-box",permalink:"/FloBezier/docs/modules/global_properties_bounds_get_bounding_box"}},w={},S=[{value:"Parameters:",id:"parameters",level:4},{value:"Parameters:",id:"parameters-1",level:4}],W={toc:S};function O(t){var e=t.components,a=(0,n.Z)(t,x);return(0,i.kt)("wrapper",(0,r.Z)({},W,a,{components:e,mdxType:"MDXLayout"}),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"function totalAbsoluteCurvature(ps: number[][], interval?: number[]): number\n")),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},"Defined in global-properties/total-absolute-curvature.ts:22")),(0,i.kt)("p",null,"Returns the total absolute curvature of the given bezier curve over the\ngiven interval"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"the result is given in radians.")),(0,i.kt)(N,{mdxType:"TotalAbsoluteCurvature"}),(0,i.kt)("h4",{id:"parameters"},"Parameters:"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"Name"),(0,i.kt)("th",{parentName:"tr",align:null},"Type"),(0,i.kt)("th",{parentName:"tr",align:null},"Default value"),(0,i.kt)("th",{parentName:"tr",align:null},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"ps")),(0,i.kt)("td",{parentName:"tr",align:null},"number","[][]"),(0,i.kt)("td",{parentName:"tr",align:null},"-"),(0,i.kt)("td",{parentName:"tr",align:null},"an order 0,1,2 or 3 bezier curve given as an array of its control points, e.g. ",(0,i.kt)("inlineCode",{parentName:"td"},"[[1,2],[3,4],[5,6],[7,8]]"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"interval")),(0,i.kt)("td",{parentName:"tr",align:null},"number[]"),(0,i.kt)("td",{parentName:"tr",align:null},"[0,1]"),(0,i.kt)("td",{parentName:"tr",align:null})))),(0,i.kt)("hr",null),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"function totalCurvature(ps: number[][], interval?: number[]): number\n")),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},"Defined in global-properties/total-absolute-curvature.ts:59")),(0,i.kt)("p",null,"Returns the total curvature of the bezier over the given interval."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"the result is given in radians.")),(0,i.kt)(C,{mdxType:"TotalCurvature"}),(0,i.kt)("h4",{id:"parameters-1"},"Parameters:"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"Name"),(0,i.kt)("th",{parentName:"tr",align:null},"Type"),(0,i.kt)("th",{parentName:"tr",align:null},"Default value"),(0,i.kt)("th",{parentName:"tr",align:null},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"ps")),(0,i.kt)("td",{parentName:"tr",align:null},"number","[][]"),(0,i.kt)("td",{parentName:"tr",align:null},"-"),(0,i.kt)("td",{parentName:"tr",align:null},"a cubic bezier, e.g. [","[0,0]",",","[1,1]",",","[2,1]",",","[2,0]","]")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"interval")),(0,i.kt)("td",{parentName:"tr",align:null},"number[]"),(0,i.kt)("td",{parentName:"tr",align:null},"[0,1]"),(0,i.kt)("td",{parentName:"tr",align:null},"the interval of integration (often === ","[0,1]",")")))))}O.isMDXComponent=!0}}]);