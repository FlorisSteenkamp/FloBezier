---
id: "_transformation_split_merge_clone_split_by_max_curve_length_"
title: "transformation/split-merge-clone/split-by-max-curve-length"
sidebar_label: "transformation/split-merge-clone/split-by-max-curve-length"
---

[flo-bezier3](../globals.md) › ["transformation/split-merge-clone/split-by-max-curve-length"](_transformation_split_merge_clone_split_by_max_curve_length_.md)

## Index

### Functions

* [splitByMaxCurveLength](_transformation_split_merge_clone_split_by_max_curve_length_.md#splitbymaxcurvelength)

## Functions

###  splitByMaxCurveLength

▸ **splitByMaxCurveLength**(`ps`: number[][], `maxLength`: number): *number[]*

*Defined in [src/transformation/split-merge-clone/split-by-max-curve-length.ts:13](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/transformation/split-merge-clone/split-by-max-curve-length.ts#L13)*

Split the order 1, 2 or 3 bezier into pieces (given as an array of parameter
(t) values) such that the longest curve length is guaranteed to be lower than
the given max length.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | - |
`maxLength` | number |   |

**Returns:** *number[]*
