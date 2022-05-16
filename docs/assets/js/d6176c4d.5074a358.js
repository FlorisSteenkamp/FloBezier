"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[8639],{8221:function(e,t,r){r.r(t),r.d(t,{assets:function(){return y},contentTitle:function(){return g},default:function(){return F},frontMatter:function(){return h},metadata:function(){return C},toc:function(){return z}});var a=r(7462),n=r(3366),l=r(7294),i=r(3905),u=r(2041),p=r(6085),o=r(9354),m=r(3546),s=r(4388),c=r(809),d=(0,s.t)(p.E,p.d),k=m.Ne,v=[[1,1],[7,7],[4,2],[8,1.5]],N=[{title:"t",val:.4,min:0,max:1,step:.01}];function _(e){var t=N[0].val,r=[v,t],a=(0,o.P)(e,"#f00","transparent"),n=k.apply(void 0,r);a(v.map(d),!0);var l=(0,m.su)(v,t);return function(t){(0,c.x)(e,"transparent","#00f")(t,5)}(d(l)),[{result:n,params:[r]}]}function b(){return l.createElement(u.O,{functionName:k.name,draw:_,draggables:v,scalars:N})}var f=["components"],h={id:"local_properties_at_t_curvature",title:"curvature"},g=void 0,C={unversionedId:"modules/local_properties_at_t_curvature",id:"modules/local_properties_at_t_curvature",title:"curvature",description:"Defined in local-properties-at-t/curvature.ts:17",source:"@site/docs/modules/local_properties_at_t_curvature.mdx",sourceDirName:"modules",slug:"/modules/local_properties_at_t_curvature",permalink:"/FloBezier/docs/modules/local_properties_at_t_curvature",draft:!1,tags:[],version:"current",frontMatter:{id:"local_properties_at_t_curvature",title:"curvature"},sidebar:"sidebar",previous:{title:"bezier-self-intersection",permalink:"/FloBezier/docs/modules/intersection_self_intersection_bezier_self_intersection"},next:{title:"evaluate-2nd-derivative",permalink:"/FloBezier/docs/modules/local_properties_at_t_evaluate_2nd_derivative_double_evaluate_2nd_derivative"}},y={},z=[{value:"Parameters:",id:"parameters",level:4},{value:"Parameters:",id:"parameters-1",level:4}],w={toc:z};function F(e){var t=e.components,r=(0,n.Z)(e,f);return(0,i.kt)("wrapper",(0,a.Z)({},w,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"function curvature(ps: number[][], t: number): number\n")),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},"Defined in ",(0,i.kt)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloBezier/blob/a2fe14d/src/local-properties-at-t/curvature.ts#L17"},"local-properties-at-t/curvature.ts:17"))),(0,i.kt)("p",null,"Returns the curvature ",(0,i.kt)("inlineCode",{parentName:"p"},"\u03ba")," of the given linear, quadratic or cubic bezier\ncurve at a specific given parameter value ",(0,i.kt)("inlineCode",{parentName:"p"},"t"),"."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"returns ",(0,i.kt)("inlineCode",{parentName:"li"},"Number.NaN")," at a cusp - this can be tested for with ",(0,i.kt)("inlineCode",{parentName:"li"},"Number.isNaN"))),(0,i.kt)(b,{mdxType:"Curvature"}),(0,i.kt)("h4",{id:"parameters"},"Parameters:"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"Name"),(0,i.kt)("th",{parentName:"tr",align:null},"Type"),(0,i.kt)("th",{parentName:"tr",align:null},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"ps")),(0,i.kt)("td",{parentName:"tr",align:null},"number","[][]"),(0,i.kt)("td",{parentName:"tr",align:null},"an order 1,2 or 3 bezier curve, e.g. ",(0,i.kt)("inlineCode",{parentName:"td"},"[[0,0],[1,1],[2,1],[2,0]]"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"t")),(0,i.kt)("td",{parentName:"tr",align:null},"number"),(0,i.kt)("td",{parentName:"tr",align:null},"the parameter value where the curvature should be evaluated")))),(0,i.kt)("hr",null),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"const")," \u03ba: (ps: number","[][]",", t: number): number"),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},"Defined in ",(0,i.kt)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloBezier/blob/a2fe14d/src/local-properties-at-t/curvature.ts#L46"},"local-properties-at-t/curvature.ts:46"))),(0,i.kt)("p",null,"Alias for ",(0,i.kt)("a",{parentName:"p",href:"/FloBezier/docs/modules/local_properties_at_t_curvature#%CE%BA"},"\u03ba"),".\nReturns the curvature ",(0,i.kt)("inlineCode",{parentName:"p"},"\u03ba")," of the given linear, quadratic or cubic bezier\ncurve at a specific given parameter value ",(0,i.kt)("inlineCode",{parentName:"p"},"t"),"."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"alias"),": ",(0,i.kt)("a",{parentName:"li",href:"/FloBezier/docs/modules/local_properties_at_t_curvature#curvature"},"curvature"))),(0,i.kt)("h4",{id:"parameters-1"},"Parameters:"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"Name"),(0,i.kt)("th",{parentName:"tr",align:null},"Type"),(0,i.kt)("th",{parentName:"tr",align:null},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"ps")),(0,i.kt)("td",{parentName:"tr",align:null},"number","[][]"),(0,i.kt)("td",{parentName:"tr",align:null},"an order 1, 2 or 3 bezier curve, e.g. ",(0,i.kt)("inlineCode",{parentName:"td"},"[[0,0],[1,1],[2,1],[2,0]]"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"t")),(0,i.kt)("td",{parentName:"tr",align:null},"number"),(0,i.kt)("td",{parentName:"tr",align:null},"the parameter value where the curvature should be evaluated")))))}F.isMDXComponent=!0}}]);