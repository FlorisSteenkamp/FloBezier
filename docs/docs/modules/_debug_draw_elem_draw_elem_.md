---
id: "_debug_draw_elem_draw_elem_"
title: "debug/draw-elem/draw-elem"
sidebar_label: "debug/draw-elem/draw-elem"
---

[flo-bezier3](../globals.md) › ["debug/draw-elem/draw-elem"](_debug_draw_elem_draw_elem_.md)

## Index

### Interfaces

* [IDrawElemFunctions](../interfaces/_debug_draw_elem_draw_elem_.idrawelemfunctions.md)

### Type aliases

* [TDrawElemFunctions](_debug_draw_elem_draw_elem_.md#tdrawelemfunctions)

### Functions

* [beziers](_debug_draw_elem_draw_elem_.md#beziers)
* [boundingHull](_debug_draw_elem_draw_elem_.md#boundinghull)
* [extreme](_debug_draw_elem_draw_elem_.md#extreme)
* [fatLine](_debug_draw_elem_draw_elem_.md#fatline)
* [getSize](_debug_draw_elem_draw_elem_.md#getsize)
* [intersection](_debug_draw_elem_draw_elem_.md#intersection)
* [looseBoundingBox](_debug_draw_elem_draw_elem_.md#looseboundingbox)
* [tightBoundingBox](_debug_draw_elem_draw_elem_.md#tightboundingbox)

### Object literals

* [drawElemFunctions](_debug_draw_elem_draw_elem_.md#let-drawelemfunctions)

## Type aliases

###  TDrawElemFunctions

Ƭ **TDrawElemFunctions**: *object*

*Defined in [src/debug/draw-elem/draw-elem.ts:8](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/debug/draw-elem/draw-elem.ts#L8)*

#### Type declaration:

## Functions

###  beziers

▸ **beziers**(`g`: SVGGElement, `beziers`: number[][][]): *SVGElement[]*

*Defined in [src/debug/draw-elem/draw-elem.ts:56](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/debug/draw-elem/draw-elem.ts#L56)*

**Parameters:**

Name | Type |
------ | ------ |
`g` | SVGGElement |
`beziers` | number[][][] |

**Returns:** *SVGElement[]*

___

###  boundingHull

▸ **boundingHull**(`g`: SVGGElement, `hull`: number[][]): *SVGPathElement[]*

*Defined in [src/debug/draw-elem/draw-elem.ts:135](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/debug/draw-elem/draw-elem.ts#L135)*

**Parameters:**

Name | Type |
------ | ------ |
`g` | SVGGElement |
`hull` | number[][] |

**Returns:** *SVGPathElement[]*

___

###  extreme

▸ **extreme**(`g`: SVGGElement, `extreme`: object): *SVGElement[]*

*Defined in [src/debug/draw-elem/draw-elem.ts:123](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/debug/draw-elem/draw-elem.ts#L123)*

**Parameters:**

▪ **g**: *SVGGElement*

▪ **extreme**: *object*

Name | Type |
------ | ------ |
`p` | number[] |
`t` | number |

**Returns:** *SVGElement[]*

___

###  fatLine

▸ **fatLine**(`g`: SVGGElement, `fatLine`: object): *SVGLineElement[]*

*Defined in [src/debug/draw-elem/draw-elem.ts:23](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/debug/draw-elem/draw-elem.ts#L23)*

**Parameters:**

▪ **g**: *SVGGElement*

▪ **fatLine**: *object*

Name | Type |
------ | ------ |
`l` | number[][] |
`maxD` | number |
`minD` | number |

**Returns:** *SVGLineElement[]*

___

###  getSize

▸ **getSize**(`ps`: number[][]): *number*

*Defined in [src/debug/draw-elem/draw-elem.ts:91](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/debug/draw-elem/draw-elem.ts#L91)*

**Parameters:**

Name | Type |
------ | ------ |
`ps` | number[][] |

**Returns:** *number*

___

###  intersection

▸ **intersection**(`g`: SVGGElement, `p`: number[]): *SVGElement[]*

*Defined in [src/debug/draw-elem/draw-elem.ts:111](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/debug/draw-elem/draw-elem.ts#L111)*

**Parameters:**

Name | Type |
------ | ------ |
`g` | SVGGElement |
`p` | number[] |

**Returns:** *SVGElement[]*

___

###  looseBoundingBox

▸ **looseBoundingBox**(`g`: SVGGElement, `box`: number[][]): *SVGRectElement[]*

*Defined in [src/debug/draw-elem/draw-elem.ts:145](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/debug/draw-elem/draw-elem.ts#L145)*

**Parameters:**

Name | Type |
------ | ------ |
`g` | SVGGElement |
`box` | number[][] |

**Returns:** *SVGRectElement[]*

___

###  tightBoundingBox

▸ **tightBoundingBox**(`g`: SVGGElement, `box`: number[][]): *SVGPathElement[]*

*Defined in [src/debug/draw-elem/draw-elem.ts:157](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/debug/draw-elem/draw-elem.ts#L157)*

**Parameters:**

Name | Type |
------ | ------ |
`g` | SVGGElement |
`box` | number[][] |

**Returns:** *SVGPathElement[]*

## Object literals

### `Let` drawElemFunctions

### ▪ **drawElemFunctions**: *object*

*Defined in [src/debug/draw-elem/draw-elem.ts:169](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/debug/draw-elem/draw-elem.ts#L169)*

###  beziers

• **beziers**: *[beziers](_debug_draw_elem_draw_elem_.md#beziers)*

*Defined in [src/debug/draw-elem/draw-elem.ts:170](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/debug/draw-elem/draw-elem.ts#L170)*

###  boundingHull

• **boundingHull**: *[boundingHull](_debug_draw_elem_draw_elem_.md#boundinghull)*

*Defined in [src/debug/draw-elem/draw-elem.ts:173](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/debug/draw-elem/draw-elem.ts#L173)*

###  extreme

• **extreme**: *[extreme](_debug_draw_elem_draw_elem_.md#extreme)*

*Defined in [src/debug/draw-elem/draw-elem.ts:172](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/debug/draw-elem/draw-elem.ts#L172)*

###  fatLine

• **fatLine**: *[fatLine](_debug_draw_elem_draw_elem_.md#fatline)*

*Defined in [src/debug/draw-elem/draw-elem.ts:176](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/debug/draw-elem/draw-elem.ts#L176)*

###  intersection

• **intersection**: *[intersection](_debug_draw_elem_draw_elem_.md#intersection)*

*Defined in [src/debug/draw-elem/draw-elem.ts:171](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/debug/draw-elem/draw-elem.ts#L171)*

###  looseBoundingBox

• **looseBoundingBox**: *[looseBoundingBox](_debug_draw_elem_draw_elem_.md#looseboundingbox)*

*Defined in [src/debug/draw-elem/draw-elem.ts:174](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/debug/draw-elem/draw-elem.ts#L174)*

###  tightBoundingBox

• **tightBoundingBox**: *[tightBoundingBox](_debug_draw_elem_draw_elem_.md#tightboundingbox)*

*Defined in [src/debug/draw-elem/draw-elem.ts:175](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/debug/draw-elem/draw-elem.ts#L175)*
