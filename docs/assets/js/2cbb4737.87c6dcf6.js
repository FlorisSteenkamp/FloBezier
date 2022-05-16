"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[7809],{7591:function(t,e,n){n.r(e),n.d(e,{assets:function(){return C},contentTitle:function(){return N},default:function(){return z},frontMatter:function(){return v},metadata:function(){return y},toc:function(){return x}});var a=n(7462),r=n(3366),l=n(7294),i=n(3905),u=n(2041),s=n(6085),o=n(9354),p=n(3546),m=n(4388),d=n(809),c=(0,m.t)(s.E,s.d),k=p.xO,g=[[1,1],[5.125,8],[15.375,.875],[13.5,9]],b=[{title:"max curviness (radians)",val:.4,min:.001,max:2,step:.001},{title:"max length",val:5,min:.001,max:10,step:.001}];function f(t){var e=(0,o.P)(t,"#0f0","transparent"),n=b[0].val,a=b[1].val,r=[g,n,a],l=k.apply(void 0,r);return e(g.map(c)),l.map((function(e){return n=c((0,p.ku)(g,e)),(0,d.x)(t,"transparent","#00f")(n,5);var n})),[{result:l,params:[r]}]}function _(){return l.createElement(l.Fragment,null,l.createElement(u.O,{functionName:k.name,draw:f,draggables:g,scalars:b}))}var h=["components"],v={id:"transformation_split_split_by_curvature_and_length",title:"split-by-curvature-and-length"},N=void 0,y={unversionedId:"modules/transformation_split_split_by_curvature_and_length",id:"modules/transformation_split_split_by_curvature_and_length",title:"split-by-curvature-and-length",description:"Defined in transformation/split/split-by-curvature-and-length.ts:24",source:"@site/docs/modules/transformation_split_split_by_curvature_and_length.mdx",sourceDirName:"modules",slug:"/modules/transformation_split_split_by_curvature_and_length",permalink:"/FloBezier/docs/modules/transformation_split_split_by_curvature_and_length",draft:!1,tags:[],version:"current",frontMatter:{id:"transformation_split_split_by_curvature_and_length",title:"split-by-curvature-and-length"},sidebar:"sidebar",previous:{title:"split-by-curvature",permalink:"/FloBezier/docs/modules/transformation_split_split_by_curvature"},next:{title:"split-by-length",permalink:"/FloBezier/docs/modules/transformation_split_split_by_length"}},C={},x=[{value:"Parameters:",id:"parameters",level:4}],w={toc:x};function z(t){var e=t.components,n=(0,r.Z)(t,h);return(0,i.kt)("wrapper",(0,a.Z)({},w,n,{components:e,mdxType:"MDXLayout"}),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"function splitByCurvatureAndLength(ps: number[][], maxCurviness?: number, maxLength?: number, minTSpan?: number): number[]\n")),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},"Defined in ",(0,i.kt)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloBezier/blob/a2fe14d/src/transformation/split/split-by-curvature-and-length.ts#L24"},"transformation/split/split-by-curvature-and-length.ts:24"))),(0,i.kt)("p",null,"Split the given bezier curve into pieces (given as an array of parameter\n",(0,i.kt)("inlineCode",{parentName:"p"},"t")," values) such that each piece is flat within a given tolerance (where\ncurvature is measured by the ",(0,i.kt)("inlineCode",{parentName:"p"},"curviness")," function)."),(0,i.kt)(_,{mdxType:"SplitByCurvatureAndLength"}),(0,i.kt)("h4",{id:"parameters"},"Parameters:"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"Name"),(0,i.kt)("th",{parentName:"tr",align:null},"Type"),(0,i.kt)("th",{parentName:"tr",align:null},"Default value"),(0,i.kt)("th",{parentName:"tr",align:null},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"ps")),(0,i.kt)("td",{parentName:"tr",align:null},"number","[][]"),(0,i.kt)("td",{parentName:"tr",align:null},"-"),(0,i.kt)("td",{parentName:"tr",align:null},"an order 0,1,2 or 3 bezier curve given as an ordered array of its control point coordinates, e.g. ",(0,i.kt)("inlineCode",{parentName:"td"},"[[0,0], [1,1], [2,1], [2,0]]"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"maxCurviness")),(0,i.kt)("td",{parentName:"tr",align:null},"number"),(0,i.kt)("td",{parentName:"tr",align:null},"0.4"),(0,i.kt)("td",{parentName:"tr",align:null},"optional; defaults to ",(0,i.kt)("inlineCode",{parentName:"td"},"0.4 radians"),"; maximum curviness (must be > 0) as calculated using the ",(0,i.kt)("inlineCode",{parentName:"td"},"curviness")," function (that measures the total angle in radians formed by the vectors formed by the ordered control points)")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"maxLength")),(0,i.kt)("td",{parentName:"tr",align:null},"number"),(0,i.kt)("td",{parentName:"tr",align:null},"10"),(0,i.kt)("td",{parentName:"tr",align:null},"optional; defaults to ",(0,i.kt)("inlineCode",{parentName:"td"},"10"),"; maximum allowed length of any returned piece")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"minTSpan")),(0,i.kt)("td",{parentName:"tr",align:null},"number"),(0,i.kt)("td",{parentName:"tr",align:null},"2**-16"),(0,i.kt)("td",{parentName:"tr",align:null},"optional; defaults to ",(0,i.kt)("inlineCode",{parentName:"td"},"2**-16"),"; the minimum ",(0,i.kt)("inlineCode",{parentName:"td"},"t")," span that can be returned for a bezier piece; necessary for cubics otherwise a curve with a cusp would cause an infinite loop")))))}z.isMDXComponent=!0}}]);