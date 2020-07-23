---
id: "_get_curvature_extrema_get_curvature_extrema_"
title: "get-curvature-extrema/get-curvature-extrema"
sidebar_label: "get-curvature-extrema/get-curvature-extrema"
---

[flo-bezier3](../globals.md) › ["get-curvature-extrema/get-curvature-extrema"](_get_curvature_extrema_get_curvature_extrema_.md)

## Index

### Functions

* [dκMod](_get_curvature_extrema_get_curvature_extrema_.md#dκmod)
* [getCurvatureExtrema](_get_curvature_extrema_get_curvature_extrema_.md#getcurvatureextrema)
* [lookForRoot](_get_curvature_extrema_get_curvature_extrema_.md#lookforroot)

## Functions

###  dκMod

▸ **dκMod**(`ps`: number[][]): *function*

*Defined in [src/get-curvature-extrema/get-curvature-extrema.ts:85](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/get-curvature-extrema/get-curvature-extrema.ts#L85)*

**Parameters:**

Name | Type |
------ | ------ |
`ps` | number[][] |

**Returns:** *function*

▸ (`t`: number): *number*

**Parameters:**

Name | Type |
------ | ------ |
`t` | number |

___

###  getCurvatureExtrema

▸ **getCurvatureExtrema**(`ps`: number[][]): *object*

*Defined in [src/get-curvature-extrema/get-curvature-extrema.ts:11](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/get-curvature-extrema/get-curvature-extrema.ts#L11)*

Finds the osculating circles and inflection points for the given bezier.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] |   |

**Returns:** *object*

* **maxCurvatureTs**: *number[]*

* **maxNegativeCurvatureTs**: *number[]*

___

###  lookForRoot

▸ **lookForRoot**(`ps`: number[][], `__namedParameters`: [number, number]): *number*

*Defined in [src/get-curvature-extrema/get-curvature-extrema.ts:58](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/get-curvature-extrema/get-curvature-extrema.ts#L58)*

**Parameters:**

Name | Type |
------ | ------ |
`ps` | number[][] |
`__namedParameters` | [number, number] |

**Returns:** *number*
