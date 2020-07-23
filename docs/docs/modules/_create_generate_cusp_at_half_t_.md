---
id: "_create_generate_cusp_at_half_t_"
title: "create/generate-cusp-at-half-t"
sidebar_label: "create/generate-cusp-at-half-t"
---

[flo-bezier3](../globals.md) › ["create/generate-cusp-at-half-t"](_create_generate_cusp_at_half_t_.md)

## Index

### Functions

* [generateCuspAtHalf3](_create_generate_cusp_at_half_t_.md#generatecuspathalf3)

## Functions

###  generateCuspAtHalf3

▸ **generateCuspAtHalf3**(`p0`: number[], `pz`: number[], `pE`: number[]): *number[][]*

*Defined in [src/create/generate-cusp-at-half-t.ts:9](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/create/generate-cusp-at-half-t.ts#L9)*

Returns a cubic bezier curve of the given order with a zero tangent (as a
vector) at t = 0.5 (i.e. a 'cusp').

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`p0` | number[] | the bezier start point |
`pz` | number[] | the point at which the vanishing tangent should occur |
`pE` | number[] | the bezier end point  |

**Returns:** *number[][]*
