---
id: "_transformation_split_merge_clone_split_at_"
title: "transformation/split-merge-clone/split-at"
sidebar_label: "transformation/split-merge-clone/split-at"
---

[flo-bezier3](../globals.md) › ["transformation/split-merge-clone/split-at"](_transformation_split_merge_clone_split_at_.md)

## Index

### Variables

* [epr](_transformation_split_merge_clone_split_at_.md#const-epr)
* [estimate](_transformation_split_merge_clone_split_at_.md#const-estimate)
* [fes](_transformation_split_merge_clone_split_at_.md#const-fes)
* [sce](_transformation_split_merge_clone_split_at_.md#const-sce)
* [splitAtExactFs](_transformation_split_merge_clone_split_at_.md#let-splitatexactfs)
* [splitAtFs](_transformation_split_merge_clone_split_at_.md#let-splitatfs)
* [splitAtPreciseFs](_transformation_split_merge_clone_split_at_.md#let-splitatprecisefs)
* [sum](_transformation_split_merge_clone_split_at_.md#const-sum)
* [tp](_transformation_split_merge_clone_split_at_.md#const-tp)

### Functions

* [splitAt](_transformation_split_merge_clone_split_at_.md#splitat)
* [splitAtExact](_transformation_split_merge_clone_split_at_.md#splitatexact)
* [splitAtPrecise](_transformation_split_merge_clone_split_at_.md#splitatprecise)
* [splitCubicAt](_transformation_split_merge_clone_split_at_.md#splitcubicat)
* [splitCubicAtExact](_transformation_split_merge_clone_split_at_.md#splitcubicatexact)
* [splitCubicAtPrecise](_transformation_split_merge_clone_split_at_.md#splitcubicatprecise)
* [splitLineAt](_transformation_split_merge_clone_split_at_.md#splitlineat)
* [splitLineAtExact](_transformation_split_merge_clone_split_at_.md#splitlineatexact)
* [splitLineAtPrecise](_transformation_split_merge_clone_split_at_.md#splitlineatprecise)
* [splitQuadAt](_transformation_split_merge_clone_split_at_.md#splitquadat)
* [splitQuadAtExact](_transformation_split_merge_clone_split_at_.md#splitquadatexact)
* [splitQuadAtPrecise](_transformation_split_merge_clone_split_at_.md#splitquadatprecise)

## Variables

### `Const` epr

• **epr**: *[expansionProduct](_implicit_form_exact_get_implicit_form2_.md#expansionproduct)* = expansionProduct

*Defined in [src/transformation/split-merge-clone/split-at.ts:8](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/transformation/split-merge-clone/split-at.ts#L8)*

___

### `Const` estimate

• **estimate**: *[eEstimate](_intersection_self_intersection_self_intersection_.md#eestimate)* = eEstimate

*Defined in [src/transformation/split-merge-clone/split-at.ts:7](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/transformation/split-merge-clone/split-at.ts#L7)*

___

### `Const` fes

• **fes**: *[fastExpansionSum](_intersection_bezier_intersection_implicit_inversion_old_.md#fastexpansionsum)* = fastExpansionSum

*Defined in [src/transformation/split-merge-clone/split-at.ts:9](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/transformation/split-merge-clone/split-at.ts#L9)*

___

### `Const` sce

• **sce**: *[scaleExpansion](_intersection_bezier_intersection_implicit_inversion_old_.md#scaleexpansion)* = scaleExpansion

*Defined in [src/transformation/split-merge-clone/split-at.ts:10](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/transformation/split-merge-clone/split-at.ts#L10)*

___

### `Let` splitAtExactFs

• **splitAtExactFs**: *[splitLineAtExact](_transformation_split_merge_clone_split_at_.md#splitlineatexact)[]* = [
    splitLineAtExact, 
    splitQuadAtExact, 
    splitCubicAtExact
]

*Defined in [src/transformation/split-merge-clone/split-at.ts:45](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/transformation/split-merge-clone/split-at.ts#L45)*

___

### `Let` splitAtFs

• **splitAtFs**: *[splitLineAt](_transformation_split_merge_clone_split_at_.md#splitlineat)[]* = [splitLineAt, splitQuadAt, splitCubicAt]

*Defined in [src/transformation/split-merge-clone/split-at.ts:13](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/transformation/split-merge-clone/split-at.ts#L13)*

___

### `Let` splitAtPreciseFs

• **splitAtPreciseFs**: *[splitLineAtPrecise](_transformation_split_merge_clone_split_at_.md#splitlineatprecise)[]* = [
    splitLineAtPrecise, 
    splitQuadAtPrecise, 
    splitCubicAtPrecise
]

*Defined in [src/transformation/split-merge-clone/split-at.ts:25](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/transformation/split-merge-clone/split-at.ts#L25)*

___

### `Const` sum

• **sum**: *[eSum](_intersection_bezier_intersection_implicit_inversion_old_.md#esum)* = eSum

*Defined in [src/transformation/split-merge-clone/split-at.ts:6](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/transformation/split-merge-clone/split-at.ts#L6)*

___

### `Const` tp

• **tp**: *[twoProduct](_intersection_bezier_intersection_implicit_inversion_old_.md#twoproduct)* = twoProduct

*Defined in [src/transformation/split-merge-clone/split-at.ts:5](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/transformation/split-merge-clone/split-at.ts#L5)*

## Functions

###  splitAt

▸ **splitAt**(`ps`: number[][], `t`: number): *number[][][]*

*Defined in [src/transformation/split-merge-clone/split-at.ts:20](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/transformation/split-merge-clone/split-at.ts#L20)*

Returns 2 new beziers split at the given t parameter, i.e. for the ranges
[0,t] and [t,1].

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | An order 1, 2 or 3 bezier curve |
`t` | number | The curve parameter  |

**Returns:** *number[][][]*

___

###  splitAtExact

▸ **splitAtExact**(`ps`: number[][][], `t`: number): *number[][][][]*

*Defined in [src/transformation/split-merge-clone/split-at.ts:52](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/transformation/split-merge-clone/split-at.ts#L52)*

**Parameters:**

Name | Type |
------ | ------ |
`ps` | number[][][] |
`t` | number |

**Returns:** *number[][][][]*

___

###  splitAtPrecise

▸ **splitAtPrecise**(`ps`: number[][], `t`: number): *number[][][]*

*Defined in [src/transformation/split-merge-clone/split-at.ts:40](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/transformation/split-merge-clone/split-at.ts#L40)*

Returns 2 new beziers split at the given t parameter, i.e. for the ranges
[0,t] and [t,1].

The result is precise, i.e. each returned coordinate is rounded to the
nearest ulp (unit in the last place)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | An order 1, 2 or 3 bezier curve |
`t` | number | The curve parameter  |

**Returns:** *number[][][]*

___

###  splitCubicAt

▸ **splitCubicAt**(`ps`: number[][], `t`: number): *number[][][]*

*Defined in [src/transformation/split-merge-clone/split-at.ts:67](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/transformation/split-merge-clone/split-at.ts#L67)*

Returns 2 new cubic beziers split at the given t parameter, i.e. for the ranges
[0,t] and [t,1]. Uses de Casteljau's algorithm.

A loose bound on the accuracy of the resultant points is given by:
|δP| = 2n*max_k(|b_k|)η, where n = 3 (cubic), b_k are the control points
and η is Number.EPSILON.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | A cubic bezier curve |
`t` | number | The t parameter where the curve should be split  |

**Returns:** *number[][][]*

___

###  splitCubicAtExact

▸ **splitCubicAtExact**(`ps`: number[][][], `t`: number): *number[][][][]*

*Defined in [src/transformation/split-merge-clone/split-at.ts:101](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/transformation/split-merge-clone/split-at.ts#L101)*

**Parameters:**

Name | Type |
------ | ------ |
`ps` | number[][][] |
`t` | number |

**Returns:** *number[][][][]*

___

###  splitCubicAtPrecise

▸ **splitCubicAtPrecise**(`ps`: number[][], `t`: number): *number[][][]*

*Defined in [src/transformation/split-merge-clone/split-at.ts:209](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/transformation/split-merge-clone/split-at.ts#L209)*

Returns 2 new cubic beziers split at the given t parameter, i.e. for the ranges
[0,t] and [t,1]. Uses de Casteljau's algorithm.

The result is precise, i.e. each returned coordinate is rounded to the
nearest ulp (unit in the last place)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | A cubic bezier curve |
`t` | number | The t parameter where the curve should be split  |

**Returns:** *number[][][]*

___

###  splitLineAt

▸ **splitLineAt**(`ps`: number[][], `t`: number): *number[][][]*

*Defined in [src/transformation/split-merge-clone/split-at.ts:451](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/transformation/split-merge-clone/split-at.ts#L451)*

**Parameters:**

Name | Type |
------ | ------ |
`ps` | number[][] |
`t` | number |

**Returns:** *number[][][]*

___

###  splitLineAtExact

▸ **splitLineAtExact**(`ps`: number[][][], `t`: number): *number[][][][]*

*Defined in [src/transformation/split-merge-clone/split-at.ts:479](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/transformation/split-merge-clone/split-at.ts#L479)*

**Parameters:**

Name | Type |
------ | ------ |
`ps` | number[][][] |
`t` | number |

**Returns:** *number[][][][]*

___

###  splitLineAtPrecise

▸ **splitLineAtPrecise**(`ps`: number[][], `t`: number): *number[][][]*

*Defined in [src/transformation/split-merge-clone/split-at.ts:514](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/transformation/split-merge-clone/split-at.ts#L514)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | - |
`t` | number |   |

**Returns:** *number[][][]*

___

###  splitQuadAt

▸ **splitQuadAt**(`ps`: number[][], `t`: number): *number[][][]*

*Defined in [src/transformation/split-merge-clone/split-at.ts:308](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/transformation/split-merge-clone/split-at.ts#L308)*

**Parameters:**

Name | Type |
------ | ------ |
`ps` | number[][] |
`t` | number |

**Returns:** *number[][][]*

___

###  splitQuadAtExact

▸ **splitQuadAtExact**(`ps`: number[][][], `t`: number): *number[][][][]*

*Defined in [src/transformation/split-merge-clone/split-at.ts:340](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/transformation/split-merge-clone/split-at.ts#L340)*

**Parameters:**

Name | Type |
------ | ------ |
`ps` | number[][][] |
`t` | number |

**Returns:** *number[][][][]*

___

###  splitQuadAtPrecise

▸ **splitQuadAtPrecise**(`ps`: number[][], `t`: number): *number[][][]*

*Defined in [src/transformation/split-merge-clone/split-at.ts:398](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/transformation/split-merge-clone/split-at.ts#L398)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | - |
`t` | number |   |

**Returns:** *number[][][]*
