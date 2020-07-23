---
id: "_transformation_split_merge_clone_from_to_"
title: "transformation/split-merge-clone/from-to"
sidebar_label: "transformation/split-merge-clone/from-to"
---

[flo-bezier3](../globals.md) › ["transformation/split-merge-clone/from-to"](_transformation_split_merge_clone_from_to_.md)

## Index

### Functions

* [fromTo](_transformation_split_merge_clone_from_to_.md#fromto)
* [fromToExact](_transformation_split_merge_clone_from_to_.md#fromtoexact)
* [fromToPrecise](_transformation_split_merge_clone_from_to_.md#fromtoprecise)

## Functions

###  fromTo

▸ **fromTo**(`ps`: number[][]): *(Anonymous function)*

*Defined in [src/transformation/split-merge-clone/from-to.ts:19](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/transformation/split-merge-clone/from-to.ts#L19)*

Returns a bezier curve that starts and ends at the given t parameters.
Uses de Casteljau's algorithm.

A loose bound on the accuracy of the resultant points is given by:
|δP| = 2*2n*max_k(|b_k|)η, where n = 3 (for a cubic), b_k are the control
points and η is Number.EPSILON.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | A cubic bezier curve |

**Returns:** *(Anonymous function)*

___

###  fromToExact

▸ **fromToExact**(`ps`: number[][][]): *(Anonymous function)*

*Defined in [src/transformation/split-merge-clone/from-to.ts:89](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/transformation/split-merge-clone/from-to.ts#L89)*

**Parameters:**

Name | Type |
------ | ------ |
`ps` | number[][][] |

**Returns:** *(Anonymous function)*

___

###  fromToPrecise

▸ **fromToPrecise**(`ps`: number[][]): *(Anonymous function)*

*Defined in [src/transformation/split-merge-clone/from-to.ts:59](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/transformation/split-merge-clone/from-to.ts#L59)*

Returns a bezier curve that starts at the given curve and ends at the
given t parameter. Uses de Casteljau's algorithm.

A loose bound on the accuracy of the resultant points is given by:
|δP| = 2*2n*max_k(|b_k|)η, where n = 3 (for a cubic), b_k are the control
points and η is Number.EPSILON.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | A cubic bezier curve |

**Returns:** *(Anonymous function)*
