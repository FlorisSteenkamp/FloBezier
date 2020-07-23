---
id: "_transformation_from_bezier_piece_"
title: "transformation/from-bezier-piece"
sidebar_label: "transformation/from-bezier-piece"
---

[flo-bezier3](../globals.md) › ["transformation/from-bezier-piece"](_transformation_from_bezier_piece_.md)

## Index

### Functions

* [bezierFromPart](_transformation_from_bezier_piece_.md#bezierfrompart)

## Functions

###  bezierFromPart

▸ **bezierFromPart**(`bezierPart`: [BezierPart](../interfaces/_bezier_part_.bezierpart.md)): *number[][]*

*Defined in [src/transformation/from-bezier-piece.ts:15](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/transformation/from-bezier-piece.ts#L15)*

Returns a new bezier from the given bezier by limiting its t range.

Uses de Casteljau's algorithm.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`bezierPart` | [BezierPart](../interfaces/_bezier_part_.bezierpart.md) | A partial bezier  |

**Returns:** *number[][]*
