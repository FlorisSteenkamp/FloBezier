---
id: "_transformation_split_merge_clone_split_by_max_curvature_"
title: "transformation/split-merge-clone/split-by-max-curvature"
sidebar_label: "transformation/split-merge-clone/split-by-max-curvature"
---

[flo-bezier3](../globals.md) › ["transformation/split-merge-clone/split-by-max-curvature"](_transformation_split_merge_clone_split_by_max_curvature_.md)

## Index

### Functions

* [splitByMaxCurvature](_transformation_split_merge_clone_split_by_max_curvature_.md#splitbymaxcurvature)

## Functions

###  splitByMaxCurvature

▸ **splitByMaxCurvature**(`ps`: number[][], `tolerance`: number): *number[]*

*Defined in [src/transformation/split-merge-clone/split-by-max-curvature.ts:13](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/transformation/split-merge-clone/split-by-max-curvature.ts#L13)*

Split the order 1, 2 or 3 bezier into pieces (given as an array of parameter
(t) values) such that each piece is flat within a given tolerance given by
the flatness function.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`ps` | number[][] | - | - |
`tolerance` | number | 1.1 | Maximum tolerance (must be > 1) for flatness measure.  |

**Returns:** *number[]*
