---
id: "_transformation_split_merge_clone_split_by_curvature_and_length_"
title: "transformation/split-merge-clone/split-by-curvature-and-length"
sidebar_label: "transformation/split-merge-clone/split-by-curvature-and-length"
---

[flo-bezier3](../globals.md) › ["transformation/split-merge-clone/split-by-curvature-and-length"](_transformation_split_merge_clone_split_by_curvature_and_length_.md)

## Index

### Functions

* [splitByCurvatureAndLength](_transformation_split_merge_clone_split_by_curvature_and_length_.md#splitbycurvatureandlength)

## Functions

###  splitByCurvatureAndLength

▸ **splitByCurvatureAndLength**(`ps`: number[][], `maxFlatness`: number, `maxLength`: number): *number[]*

*Defined in [src/transformation/split-merge-clone/split-by-curvature-and-length.ts:15](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/transformation/split-merge-clone/split-by-curvature-and-length.ts#L15)*

Split the order 1, 2 or 3 bezier into pieces (given as an array of parameter
(t) values) such that each piece is flat within a given tolerance given by
maxFlatness and maxLength.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`ps` | number[][] | - | - |
`maxFlatness` | number | 1.001 | - |
`maxLength` | number | 10 |   |

**Returns:** *number[]*
