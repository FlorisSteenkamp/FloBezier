"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[9718],{1437:function(e,t,n){n.r(t),n.d(t,{assets:function(){return y},contentTitle:function(){return g},default:function(){return F},frontMatter:function(){return z},metadata:function(){return v},toc:function(){return C}});var r=n(7462),a=n(3366),i=n(7294),o=n(3905),s=n(3546),l=n(2041),p=n(6085),u=n(9354),m=n(4388),d=n(809),_=(0,m.t)(p.E,p.d),c=s.ZL,f=[[7,1],[5.125,8],[15.375,.875],[5.375,3.325]],h=[5,1.5];function k(e){var t=(0,u.P)(e,"#0f0","transparent"),n=(0,u.P)(e,"#ff0","transparent"),r=[f,h],a=c.apply(void 0,r),i=a.p,o=a.t;a.d;return t(f.map(_)),n([h,i].map(_)),function(t){(0,d.x)(e,"transparent","#00f")(t,5)}(_((0,s.ku)(f,o))),[{result:a,params:[r]}]}function b(){return i.createElement(i.Fragment,null,i.createElement(l.O,{functionName:c.name,draw:k,draggables:[].concat(f,[h])}))}var N=["components"],z={id:"simultaneous_properties_closest_and_furthest_point_on_bezier_furthest_point_on_bezier",title:"furthest-point-on-bezier"},g=void 0,v={unversionedId:"modules/simultaneous_properties_closest_and_furthest_point_on_bezier_furthest_point_on_bezier",id:"modules/simultaneous_properties_closest_and_furthest_point_on_bezier_furthest_point_on_bezier",title:"furthest-point-on-bezier",description:"Defined in simultaneous-properties/closest-and-furthest-point-on-bezier/furthest-point-on-bezier.ts:29",source:"@site/docs/modules/simultaneous_properties_closest_and_furthest_point_on_bezier_furthest_point_on_bezier.mdx",sourceDirName:"modules",slug:"/modules/simultaneous_properties_closest_and_furthest_point_on_bezier_furthest_point_on_bezier",permalink:"/FloBezier/docs/modules/simultaneous_properties_closest_and_furthest_point_on_bezier_furthest_point_on_bezier",draft:!1,tags:[],version:"current",frontMatter:{id:"simultaneous_properties_closest_and_furthest_point_on_bezier_furthest_point_on_bezier",title:"furthest-point-on-bezier"},sidebar:"sidebar",previous:{title:"closest-point-on-bezier-certified",permalink:"/FloBezier/docs/modules/simultaneous_properties_closest_and_furthest_point_on_bezier_closest_point_on_bezier_certified"},next:{title:"hausdorff-distance",permalink:"/FloBezier/docs/modules/simultaneous_properties_hausdorff_distance_hausdorff_distance"}},y={},C=[{value:"Parameters:",id:"parameters",level:4}],w={toc:C};function F(e){var t=e.components,n=(0,a.Z)(e,N);return(0,o.kt)("wrapper",(0,r.Z)({},w,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"function furthestPointOnBezier(ps: number[][], p: number[]): object\n")),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"Defined in ",(0,o.kt)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloBezier/blob/a2fe14d/src/simultaneous-properties/closest-and-furthest-point-on-bezier/furthest-point-on-bezier.ts#L29"},"simultaneous-properties/closest-and-furthest-point-on-bezier/furthest-point-on-bezier.ts:29"))),(0,o.kt)("p",null,"Returns the furthest point(s) (and parameter ",(0,o.kt)("inlineCode",{parentName:"p"},"t")," value(s)) on the given\nbezier curve to the given point (with ",(0,o.kt)("inlineCode",{parentName:"p"},"t \u2208 [0,1]"),")."),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"intermediate calculations are done in double precision"),(0,o.kt)("li",{parentName:"ul"},"in some cases there can be more than one furthest point, e.g. on parts of\nthe axis of symmetry of a parabola (in which case only one of the points are returned)"),(0,o.kt)("li",{parentName:"ul"},"the returned point(s) are objects with the following properties:",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"p"),": the furthest point on the bezier curve"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"t"),": the parameter value of the point on the bezier curve"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"d"),": the furthest distance between the point and the bezier curve")))),(0,o.kt)(b,{mdxType:"FurthestPointOnBezier"}),(0,o.kt)("h4",{id:"parameters"},"Parameters:"),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},"Name"),(0,o.kt)("th",{parentName:"tr",align:null},"Type"),(0,o.kt)("th",{parentName:"tr",align:null},"Description"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"ps")),(0,o.kt)("td",{parentName:"tr",align:null},"number","[][]"),(0,o.kt)("td",{parentName:"tr",align:null},"an order 0,1,2 or 3 bezier curve given as an ordered array of its control point coordinates, e.g. ",(0,o.kt)("inlineCode",{parentName:"td"},"[[0,0], [1,1], [2,1], [2,0]]"))),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"p")),(0,o.kt)("td",{parentName:"tr",align:null},"number[]"),(0,o.kt)("td",{parentName:"tr",align:null},"a point, e.g. ",(0,o.kt)("inlineCode",{parentName:"td"},"[1,2]"))))),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Returns:")," object"),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},"Name"),(0,o.kt)("th",{parentName:"tr",align:null},"Type"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"p")),(0,o.kt)("td",{parentName:"tr",align:null},"number[]")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"t")),(0,o.kt)("td",{parentName:"tr",align:null},"number")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"d")),(0,o.kt)("td",{parentName:"tr",align:null},"number")))))}F.isMDXComponent=!0}}]);