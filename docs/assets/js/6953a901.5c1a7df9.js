"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[4637],{4944:function(e,t,r){r.r(t),r.d(t,{assets:function(){return v},contentTitle:function(){return k},default:function(){return z},frontMatter:function(){return y},metadata:function(){return g},toc:function(){return N}});var a=r(7462),n=r(3366),i=r(7294),o=r(3905),u=r(3546),c=r(2041),d=r(6085),l=r(9354),s=(0,r(4388).t)(d.E,d.d),m=u.Wb,p=[[1,1],[5.125,8],[12,8],[16,3]],b=[{title:"t",val:.75,min:0,max:1,step:.01}];function _(e){var t=(0,l.P)(e,"#0f0","transparent"),r=(0,l.P)(e,"#ff0","transparent"),a=b[0].val,n=[p],i=m.apply(void 0,n);return t(p.map(s)),r([i[0],(0,u.su)(i[1],a),i[2]].map(s)),[{result:i,params:[n]}]}function f(){return i.createElement(i.Fragment,null,i.createElement(c.O,{functionName:"cubicToHybridQuadratic",draw:_,draggables:p,scalars:b}))}var h=["components"],y={id:"transformation_degree_or_type_cubic_to_hybrid_quadratic",title:"cubic-to-hybrid-quadratic"},k=void 0,g={unversionedId:"modules/transformation_degree_or_type_cubic_to_hybrid_quadratic",id:"modules/transformation_degree_or_type_cubic_to_hybrid_quadratic",title:"cubic-to-hybrid-quadratic",description:"Defined in transformation/degree-or-type/cubic-to-hybrid-quadratic.ts:20",source:"@site/docs/modules/transformation_degree_or_type_cubic_to_hybrid_quadratic.mdx",sourceDirName:"modules",slug:"/modules/transformation_degree_or_type_cubic_to_hybrid_quadratic",permalink:"/FloBezier/docs/modules/transformation_degree_or_type_cubic_to_hybrid_quadratic",draft:!1,tags:[],version:"current",frontMatter:{id:"transformation_degree_or_type_cubic_to_hybrid_quadratic",title:"cubic-to-hybrid-quadratic"},sidebar:"sidebar",previous:{title:"to-string",permalink:"/FloBezier/docs/modules/transformation_to_string"},next:{title:"cubic-to-quadratic",permalink:"/FloBezier/docs/modules/transformation_degree_or_type_cubic_to_quadratic"}},v={},N=[{value:"Parameters:",id:"parameters",level:4}],q={toc:N};function z(e){var t=e.components,r=(0,n.Z)(e,h);return(0,o.kt)("wrapper",(0,a.Z)({},q,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"function cubicToHybridQuadratic(ps: number[][]): [[number, number], [[number, number], [number, number]], [number, number]]\n")),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"Defined in ",(0,o.kt)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloBezier/blob/a2fe14d/src/transformation/degree-or-type/cubic-to-hybrid-quadratic.ts#L20"},"transformation/degree-or-type/cubic-to-hybrid-quadratic.ts:20"))),(0,o.kt)("p",null,"Returns the hybrid quadratic version of the given cubic bezier. For a\ndefinition of hybrid quadratic bezier curves please see\nthis ",(0,o.kt)("a",{parentName:"p",href:"http://scholarsarchive.byu.edu/cgi/viewcontent.cgi?article=2206&context=etd"},"article")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"returns an array of three quadratic bezier points where the\nmiddle point is a 'hybrid' point represented as a line (itself represented\nby two points (a linear bezier curve)) that can be evaluated at a different\n",(0,o.kt)("inlineCode",{parentName:"p"},"t")," value (call it ",(0,o.kt)("inlineCode",{parentName:"p"},"th"),"). If evaluated at the same t value the result is the\nsame as evaluating the original cubic bezier at ",(0,o.kt)("inlineCode",{parentName:"p"},"t"),".")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"the length of the linear bezier curve mentioned above is a measure of how\nclosely the cubic can be represented as a quadratic bezier curve."))),(0,o.kt)(f,{mdxType:"CubicToHybridQuadratic"}),(0,o.kt)("h4",{id:"parameters"},"Parameters:"),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},"Name"),(0,o.kt)("th",{parentName:"tr",align:null},"Type"),(0,o.kt)("th",{parentName:"tr",align:null},"Description"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"ps")),(0,o.kt)("td",{parentName:"tr",align:null},"number","[][]"),(0,o.kt)("td",{parentName:"tr",align:null},"a cubic bezier curve given as an ordered array of its control point coordinates, e.g. ",(0,o.kt)("inlineCode",{parentName:"td"},"[[0,0], [1,1], [2,1], [2,0]]"))))))}z.isMDXComponent=!0}}]);