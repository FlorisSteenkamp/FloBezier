---
id: "_debug_draw_elem_draw_elem_.idrawelemfunctions"
title: "IDrawElemFunctions"
sidebar_label: "IDrawElemFunctions"
---

[flo-bezier3](../globals.md) › ["debug/draw-elem/draw-elem"](../modules/_debug_draw_elem_draw_elem_.md) › [IDrawElemFunctions](_debug_draw_elem_draw_elem_.idrawelemfunctions.md)

## Hierarchy

* object

  ↳ **IDrawElemFunctions**

## Index

### Properties

* [beziers](_debug_draw_elem_draw_elem_.idrawelemfunctions.md#beziers)
* [boundingHull](_debug_draw_elem_draw_elem_.idrawelemfunctions.md#boundinghull)
* [extreme](_debug_draw_elem_draw_elem_.idrawelemfunctions.md#extreme)
* [fatLine](_debug_draw_elem_draw_elem_.idrawelemfunctions.md#fatline)
* [intersection](_debug_draw_elem_draw_elem_.idrawelemfunctions.md#intersection)
* [looseBoundingBox](_debug_draw_elem_draw_elem_.idrawelemfunctions.md#looseboundingbox)
* [tightBoundingBox](_debug_draw_elem_draw_elem_.idrawelemfunctions.md#tightboundingbox)

## Properties

###  beziers

• **beziers**: *function*

*Defined in [src/debug/draw-elem/draw-elem.ts:13](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/debug/draw-elem/draw-elem.ts#L13)*

#### Type declaration:

▸ (`g`: SVGGElement, `beziers`: number[][][]): *SVGElement[]*

**Parameters:**

Name | Type |
------ | ------ |
`g` | SVGGElement |
`beziers` | number[][][] |

___

###  boundingHull

• **boundingHull**: *function*

*Defined in [src/debug/draw-elem/draw-elem.ts:18](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/debug/draw-elem/draw-elem.ts#L18)*

#### Type declaration:

▸ (`g`: SVGGElement, `hull`: number[][]): *SVGElement[]*

**Parameters:**

Name | Type |
------ | ------ |
`g` | SVGGElement |
`hull` | number[][] |

___

###  extreme

• **extreme**: *function*

*Defined in [src/debug/draw-elem/draw-elem.ts:15](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/debug/draw-elem/draw-elem.ts#L15)*

#### Type declaration:

▸ (`g`: SVGGElement, `extreme`: object): *SVGElement[]*

**Parameters:**

▪ **g**: *SVGGElement*

▪ **extreme**: *object*

Name | Type |
------ | ------ |
`p` | number[] |
`t` | number |

___

###  fatLine

• **fatLine**: *function*

*Defined in [src/debug/draw-elem/draw-elem.ts:19](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/debug/draw-elem/draw-elem.ts#L19)*

#### Type declaration:

▸ (`g`: SVGGElement, `fatLine`: object): *SVGElement[]*

**Parameters:**

▪ **g**: *SVGGElement*

▪ **fatLine**: *object*

Name | Type |
------ | ------ |
`l` | number[][] |
`maxD` | number |
`minD` | number |

___

###  intersection

• **intersection**: *function*

*Defined in [src/debug/draw-elem/draw-elem.ts:14](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/debug/draw-elem/draw-elem.ts#L14)*

#### Type declaration:

▸ (`g`: SVGGElement, `p`: number[]): *SVGElement[]*

**Parameters:**

Name | Type |
------ | ------ |
`g` | SVGGElement |
`p` | number[] |

___

###  looseBoundingBox

• **looseBoundingBox**: *function*

*Defined in [src/debug/draw-elem/draw-elem.ts:16](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/debug/draw-elem/draw-elem.ts#L16)*

#### Type declaration:

▸ (`g`: SVGGElement, `box`: number[][]): *SVGElement[]*

**Parameters:**

Name | Type |
------ | ------ |
`g` | SVGGElement |
`box` | number[][] |

___

###  tightBoundingBox

• **tightBoundingBox**: *function*

*Defined in [src/debug/draw-elem/draw-elem.ts:17](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/debug/draw-elem/draw-elem.ts#L17)*

#### Type declaration:

▸ (`g`: SVGGElement, `box`: number[][]): *SVGElement[]*

**Parameters:**

Name | Type |
------ | ------ |
`g` | SVGGElement |
`box` | number[][] |
