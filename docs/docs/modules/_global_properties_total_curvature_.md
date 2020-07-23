---
id: "_global_properties_total_curvature_"
title: "global-properties/total-curvature"
sidebar_label: "global-properties/total-curvature"
---

[flo-bezier3](../globals.md) › ["global-properties/total-curvature"](_global_properties_total_curvature_.md)

## Index

### Functions

* [totalAbsoluteCurvature](_global_properties_total_curvature_.md#totalabsolutecurvature)
* [totalCurvature](_global_properties_total_curvature_.md#totalcurvature)
* [κds](_global_properties_total_curvature_.md#private-κds)

## Functions

###  totalAbsoluteCurvature

▸ **totalAbsoluteCurvature**(`ps`: number[][], `interval`: number[]): *number*

*Defined in [src/global-properties/total-curvature.ts:19](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/total-curvature.ts#L19)*

TODO - replace this function with a more sane version where total curvature
is tallied by looking for inflection points and adding curvature over those
pieces by looking at tangent at beginning and end of the pieces.
Returns the total absolute curvature of the bezier over [0,1] using Gaussian
Quadrature integration with 16 wieghts and abscissas which is generally very
accurate and fast. Returns the result in radians.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | A cubic bezier |
`interval` | number[] |   |

**Returns:** *number*

▸ **totalAbsoluteCurvature**(`ps`: number[][]): *function*

*Defined in [src/global-properties/total-curvature.ts:20](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/total-curvature.ts#L20)*

**Parameters:**

Name | Type |
------ | ------ |
`ps` | number[][] |

**Returns:** *function*

▸ (`interval`: number[]): *number*

**Parameters:**

Name | Type |
------ | ------ |
`interval` | number[] |

___

###  totalCurvature

▸ **totalCurvature**(`ps`: number[][], `interval`: number[]): *number*

*Defined in [src/global-properties/total-curvature.ts:48](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/total-curvature.ts#L48)*

Returns the total curvature of the bezier over the given interval using
Gaussian Quadrature integration with 16 wieghts and abscissas which is
generally very accurate and fast. This function is curried.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]] |
`interval` | number[] | The interval of integration (often === [0,1]) |

**Returns:** *number*

The total curvature.

▸ **totalCurvature**(`ps`: number[][]): *function*

*Defined in [src/global-properties/total-curvature.ts:49](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/total-curvature.ts#L49)*

**Parameters:**

Name | Type |
------ | ------ |
`ps` | number[][] |

**Returns:** *function*

▸ (`interval`: number[]): *number*

**Parameters:**

Name | Type |
------ | ------ |
`interval` | number[] |

___

### `Private` κds

▸ **κds**(`ps`: number[][], `t`: number): *number*

*Defined in [src/global-properties/total-curvature.ts:73](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/total-curvature.ts#L73)*

Helper function. This function is curried.

**Parameters:**

Name | Type |
------ | ------ |
`ps` | number[][] |
`t` | number |

**Returns:** *number*

▸ **κds**(`ps`: number[][]): *function*

*Defined in [src/global-properties/total-curvature.ts:74](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/total-curvature.ts#L74)*

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
