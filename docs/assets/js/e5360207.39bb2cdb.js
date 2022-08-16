"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[3468],{6206:function(e,t,r){r.r(t),r.d(t,{assets:function(){return N},contentTitle:function(){return h},default:function(){return C},frontMatter:function(){return b},metadata:function(){return g},toc:function(){return _}});var n=r(7462),a=r(3366),s=r(7294),i=r(3905),o=r(3546),l=r(2041),u=r(6085),p=r(9354),c=(0,r(4388).t)(u.E,u.d),m=o.oj,d=[[1,1],[5.125,8],[15.375,.875],[11,8]];function f(e){var t=(0,p.P)(e,"#0f0","transparent"),r=[d],n=m.apply(void 0,r);return t(d.map(c)),[{result:n,params:[r]}]}function v(){return s.createElement(s.Fragment,null,s.createElement(l.O,{functionName:"curviness",draw:f,draggables:d}))}var k=["components"],b={id:"global_properties_curviness",title:"curviness"},h=void 0,g={unversionedId:"modules/global_properties_curviness",id:"modules/global_properties_curviness",title:"curviness",description:"Defined in global-properties/curviness.ts:27",source:"@site/docs/modules/global_properties_curviness.mdx",sourceDirName:"modules",slug:"/modules/global_properties_curviness",permalink:"/FloBezier/docs/modules/global_properties_curviness",draft:!1,tags:[],version:"current",frontMatter:{id:"global_properties_curviness",title:"curviness"},sidebar:"sidebar",previous:{title:"get-curvature-extrema",permalink:"/FloBezier/docs/modules/get_curvature_extrema_get_curvature_extrema"},next:{title:"get-inflections",permalink:"/FloBezier/docs/modules/global_properties_get_inflections"}},N={},_=[{value:"Parameters:",id:"parameters",level:4}],y={toc:_};function C(e){var t=e.components,r=(0,a.Z)(e,k);return(0,i.kt)("wrapper",(0,n.Z)({},y,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"function curviness(ps: number[][]): number\n")),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},"Defined in ",(0,i.kt)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloBezier/blob/a2fe14d/src/global-properties/curviness.ts#L27"},"global-properties/curviness.ts:27"))),(0,i.kt)("p",null,"Returns a 'curviness' measure of the given bezier curve. ",(0,i.kt)("inlineCode",{parentName:"p"},"0")," is considered\nthe ",(0,i.kt)("inlineCode",{parentName:"p"},"flattest")," (as is the case of e.g. a line).\nThe returned flatness, say ",(0,i.kt)("inlineCode",{parentName:"p"},"f")," is such that ",(0,i.kt)("inlineCode",{parentName:"p"},"0 <= f <= (order-1)*\ud835\udf0b"),", where\n",(0,i.kt)("inlineCode",{parentName:"p"},"order")," is the order of the bezier curve (e.g. cubics are of order 3); thus,\nfor example, cubics can have a maximum value of ",(0,i.kt)("inlineCode",{parentName:"p"},"2\ud835\udf0b")," for curviness (the most\ncurvy) and a minimum value of ",(0,i.kt)("inlineCode",{parentName:"p"},"0")," (the flattest)"),(0,i.kt)("p",null,"This function is useful as a heuristic to test the ",(0,i.kt)("inlineCode",{parentName:"p"},"flatness")," of curves to\nsee if they should be subdivided (in which case they would become flatter)"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"curviness is calculated simply as the sum of the absolute rotation (in\nradians) of consecutive vectors formed by the ordered control points of the\ncurve")),(0,i.kt)(v,{mdxType:"Curviness"}),(0,i.kt)("h4",{id:"parameters"},"Parameters:"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"Name"),(0,i.kt)("th",{parentName:"tr",align:null},"Type"),(0,i.kt)("th",{parentName:"tr",align:null},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"ps")),(0,i.kt)("td",{parentName:"tr",align:null},"number","[][]"),(0,i.kt)("td",{parentName:"tr",align:null},"an order 0,1,2 or 3 bezier curve given as an array of its control points, e.g. ",(0,i.kt)("inlineCode",{parentName:"td"},"[[1,2],[3,4],[5,6],[7,8]]"))))))}C.isMDXComponent=!0}}]);