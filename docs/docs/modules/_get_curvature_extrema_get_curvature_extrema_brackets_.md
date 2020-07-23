---
id: "_get_curvature_extrema_get_curvature_extrema_brackets_"
title: "get-curvature-extrema/get-curvature-extrema-brackets"
sidebar_label: "get-curvature-extrema/get-curvature-extrema-brackets"
---

[flo-bezier3](../globals.md) › ["get-curvature-extrema/get-curvature-extrema-brackets"](_get_curvature_extrema_get_curvature_extrema_brackets_.md)

## Index

### Variables

* [DELTA](_get_curvature_extrema_get_curvature_extrema_brackets_.md#const-delta)

### Functions

* [clipBoundary](_get_curvature_extrema_get_curvature_extrema_brackets_.md#clipboundary)
* [deParameterize](_get_curvature_extrema_get_curvature_extrema_brackets_.md#deparameterize)
* [deParameterizeBoundary](_get_curvature_extrema_get_curvature_extrema_brackets_.md#deparameterizeboundary)
* [getCurvatureExtremaBrackets](_get_curvature_extrema_get_curvature_extrema_brackets_.md#getcurvatureextremabrackets)

## Variables

### `Const` DELTA

• **DELTA**: *0.000001* = 0.000001

*Defined in [src/get-curvature-extrema/get-curvature-extrema-brackets.ts:2](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/get-curvature-extrema/get-curvature-extrema-brackets.ts#L2)*

## Functions

###  clipBoundary

▸ **clipBoundary**(`range`: number[]): *number[]*

*Defined in [src/get-curvature-extrema/get-curvature-extrema-brackets.ts:221](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/get-curvature-extrema/get-curvature-extrema-brackets.ts#L221)*

Clips to [0,1] or returns undefined if not within [0,1].

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`range` | number[] |   |

**Returns:** *number[]*

___

###  deParameterize

▸ **deParameterize**(`λ`: number, `μ`: number, `a`: number): *(Anonymous function)*

*Defined in [src/get-curvature-extrema/get-curvature-extrema-brackets.ts:241](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/get-curvature-extrema/get-curvature-extrema-brackets.ts#L241)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`λ` | number | - |
`μ` | number | - |
`a` | number |   |

**Returns:** *(Anonymous function)*

___

###  deParameterizeBoundary

▸ **deParameterizeBoundary**(`λ`: number, `μ`: number, `a`: number): *(Anonymous function)*

*Defined in [src/get-curvature-extrema/get-curvature-extrema-brackets.ts:252](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/get-curvature-extrema/get-curvature-extrema-brackets.ts#L252)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`λ` | number | - |
`μ` | number | - |
`a` | number |   |

**Returns:** *(Anonymous function)*

___

###  getCurvatureExtremaBrackets

▸ **getCurvatureExtremaBrackets**(`ps`: number[][]): *object*

*Defined in [src/get-curvature-extrema/get-curvature-extrema-brackets.ts:11](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/get-curvature-extrema/get-curvature-extrema-brackets.ts#L11)*

Calculates the curvature extrema brackets of the given cubic bezier.
See the paper at http://ac.els-cdn.com/S037704270000529X/1-s2.0-S037704270000529X-main.pdf?_tid=0b25a2cc-ad35-11e5-a728-00000aacb362&acdnat=1451288083_86359fc83af9dec3232c90a6d2e71031
Note that naming conventions is roughly as in the paper above.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] |   |

**Returns:** *object*

* **brackets**: *number[][]*

* **inflections**: *number[]*
