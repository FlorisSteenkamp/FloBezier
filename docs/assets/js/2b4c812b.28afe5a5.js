"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[8053],{988:function(e,t,n){n.r(t),n.d(t,{assets:function(){return y},contentTitle:function(){return g},default:function(){return B},frontMatter:function(){return z},metadata:function(){return v},toc:function(){return C}});var r=n(7462),a=n(3366),o=n(7294),i=n(3905),l=n(3546),s=n(2041),p=n(6085),u=n(9354),m=n(4388),d=n(809),_=(0,m.t)(p.E,p.d),c=l.jd,k=[[1,1],[5.125,8],[15.375,.875],[4.375,5.125]],b=[7,8];function N(e){var t=(0,u.P)(e,"#0f0","transparent"),n=(0,u.P)(e,"#ff0","transparent"),r=[k,b],a=c.apply(void 0,r),o=a.p,i=a.t;a.d;return t(k.map(_)),n([b,o].map(_)),function(t){(0,d.x)(e,"transparent","#00f")(t,5)}(_((0,l.ku)(k,i))),[{result:a,params:[r]}]}function h(){return o.createElement(o.Fragment,null,o.createElement(s.O,{functionName:"closestPointOnBezier",draw:N,draggables:[].concat(k,[b])}))}var f=["components"],z={id:"simultaneous_properties_closest_and_furthest_point_on_bezier_closest_point_on_bezier",title:"closest-point-on-bezier"},g=void 0,v={unversionedId:"modules/simultaneous_properties_closest_and_furthest_point_on_bezier_closest_point_on_bezier",id:"modules/simultaneous_properties_closest_and_furthest_point_on_bezier_closest_point_on_bezier",title:"closest-point-on-bezier",description:"Defined in simultaneous-properties/closest-and-furthest-point-on-bezier/closest-point-on-bezier.ts:29",source:"@site/docs/modules/simultaneous_properties_closest_and_furthest_point_on_bezier_closest_point_on_bezier.mdx",sourceDirName:"modules",slug:"/modules/simultaneous_properties_closest_and_furthest_point_on_bezier_closest_point_on_bezier",permalink:"/FloBezier/docs/modules/simultaneous_properties_closest_and_furthest_point_on_bezier_closest_point_on_bezier",draft:!1,tags:[],version:"current",frontMatter:{id:"simultaneous_properties_closest_and_furthest_point_on_bezier_closest_point_on_bezier",title:"closest-point-on-bezier"},sidebar:"sidebar",previous:{title:"equal",permalink:"/FloBezier/docs/modules/simultaneous_properties_equal"},next:{title:"closest-point-on-bezier-certified",permalink:"/FloBezier/docs/modules/simultaneous_properties_closest_and_furthest_point_on_bezier_closest_point_on_bezier_certified"}},y={},C=[{value:"Parameters:",id:"parameters",level:4}],w={toc:C};function B(e){var t=e.components,n=(0,a.Z)(e,f);return(0,i.kt)("wrapper",(0,r.Z)({},w,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"function closestPointOnBezier(ps: number[][], p: number[]): object\n")),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},"Defined in ",(0,i.kt)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloBezier/blob/a2fe14d/src/simultaneous-properties/closest-and-furthest-point-on-bezier/closest-point-on-bezier.ts#L29"},"simultaneous-properties/closest-and-furthest-point-on-bezier/closest-point-on-bezier.ts:29"))),(0,i.kt)("p",null,"Returns the closest point(s) (and parameter ",(0,i.kt)("inlineCode",{parentName:"p"},"t")," value(s)) on the given\nbezier curve to the given point (with ",(0,i.kt)("inlineCode",{parentName:"p"},"t \u2208 [0,1]"),")."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"intermediate calculations are done in double precision"),(0,i.kt)("li",{parentName:"ul"},"in some cases there can be more than one closest point, e.g. on the axis\nof symmetry of a parabola (in which case only one of the points are returned)"),(0,i.kt)("li",{parentName:"ul"},"the returned point(s) are objects with the following properties:",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"p"),": the closest point on the bezier curve"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"t"),": the parameter value of the point on the bezier curve"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"d"),": the closest distance between the point and the bezier curve")))),(0,i.kt)(h,{mdxType:"ClosestPointOnBezier"}),(0,i.kt)("h4",{id:"parameters"},"Parameters:"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"Name"),(0,i.kt)("th",{parentName:"tr",align:null},"Type"),(0,i.kt)("th",{parentName:"tr",align:null},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"ps")),(0,i.kt)("td",{parentName:"tr",align:null},"number","[][]"),(0,i.kt)("td",{parentName:"tr",align:null},"an order 0,1,2 or 3 bezier curve given as an ordered array of its control point coordinates, e.g. ",(0,i.kt)("inlineCode",{parentName:"td"},"[[0,0], [1,1], [2,1], [2,0]]"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"p")),(0,i.kt)("td",{parentName:"tr",align:null},"number[]"),(0,i.kt)("td",{parentName:"tr",align:null},"a point, e.g. ",(0,i.kt)("inlineCode",{parentName:"td"},"[1,2]"))))),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Returns:")," object"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"Name"),(0,i.kt)("th",{parentName:"tr",align:null},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"p")),(0,i.kt)("td",{parentName:"tr",align:null},"number[]")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"t")),(0,i.kt)("td",{parentName:"tr",align:null},"number")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"d")),(0,i.kt)("td",{parentName:"tr",align:null},"number")))))}B.isMDXComponent=!0}}]);