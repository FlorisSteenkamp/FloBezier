---
id: "_local_properties_at_t_t_to_xy_eval_de_casteljau_with_err_"
title: "local-properties-at-t/t-to-xy/eval-de-casteljau-with-err"
sidebar_label: "local-properties-at-t/t-to-xy/eval-de-casteljau-with-err"
---

[flo-bezier3](../globals.md) › ["local-properties-at-t/t-to-xy/eval-de-casteljau-with-err"](_local_properties_at_t_t_to_xy_eval_de_casteljau_with_err_.md)

## Index

### Variables

* [abs](_local_properties_at_t_t_to_xy_eval_de_casteljau_with_err_.md#const-abs)
* [qaq](_local_properties_at_t_t_to_xy_eval_de_casteljau_with_err_.md#const-qaq)
* [qdq](_local_properties_at_t_t_to_xy_eval_de_casteljau_with_err_.md#const-qdq)
* [qmd](_local_properties_at_t_t_to_xy_eval_de_casteljau_with_err_.md#const-qmd)
* [qmq](_local_properties_at_t_t_to_xy_eval_de_casteljau_with_err_.md#const-qmq)
* [u](_local_properties_at_t_t_to_xy_eval_de_casteljau_with_err_.md#const-u)

### Functions

* [evalDeCasteljauWithErr](_local_properties_at_t_t_to_xy_eval_de_casteljau_with_err_.md#evaldecasteljauwitherr)
* [evalDeCasteljauWithErrQuad](_local_properties_at_t_t_to_xy_eval_de_casteljau_with_err_.md#evaldecasteljauwitherrquad)

## Variables

### `Const` abs

• **abs**: *abs* = Math.abs

*Defined in [src/local-properties-at-t/t-to-xy/eval-de-casteljau-with-err.ts:11](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/t-to-xy/eval-de-casteljau-with-err.ts#L11)*

___

### `Const` qaq

• **qaq**: *[ddAddDd](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#ddadddd)* = ddAddDd

*Defined in [src/local-properties-at-t/t-to-xy/eval-de-casteljau-with-err.ts:7](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/t-to-xy/eval-de-casteljau-with-err.ts#L7)*

___

### `Const` qdq

• **qdq**: *[ddDiffDd](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#dddiffdd)* = ddDiffDd

*Defined in [src/local-properties-at-t/t-to-xy/eval-de-casteljau-with-err.ts:8](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/t-to-xy/eval-de-casteljau-with-err.ts#L8)*

___

### `Const` qmd

• **qmd**: *[ddMultDouble2](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#ddmultdouble2)* = ddMultDouble2

*Defined in [src/local-properties-at-t/t-to-xy/eval-de-casteljau-with-err.ts:9](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/t-to-xy/eval-de-casteljau-with-err.ts#L9)*

___

### `Const` qmq

• **qmq**: *[ddMultDd](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#ddmultdd)* = ddMultDd

*Defined in [src/local-properties-at-t/t-to-xy/eval-de-casteljau-with-err.ts:6](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/t-to-xy/eval-de-casteljau-with-err.ts#L6)*

___

### `Const` u

• **u**: *number* = Number.EPSILON / 2

*Defined in [src/local-properties-at-t/t-to-xy/eval-de-casteljau-with-err.ts:12](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/t-to-xy/eval-de-casteljau-with-err.ts#L12)*

## Functions

###  evalDeCasteljauWithErr

▸ **evalDeCasteljauWithErr**(`ps`: number[][], `t`: number): *object*

*Defined in [src/local-properties-at-t/t-to-xy/eval-de-casteljau-with-err.ts:21](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/t-to-xy/eval-de-casteljau-with-err.ts#L21)*

Evaluates the given bezier curve at the parameter t, including error.
* **precondition**: 49-bit aligned coordinates

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | An order 1, 2 or 3 bezier curve, e.g. [[0,0],[1,1],[2,1],[2,0]] |
`t` | number | The parameter value where the bezier should be evaluated  |

**Returns:** *object*

* **p**: *number[]*

* **pE**: *number[]*

___

###  evalDeCasteljauWithErrQuad

▸ **evalDeCasteljauWithErrQuad**(`ps`: number[][], `t`: number[]): *object*

*Defined in [src/local-properties-at-t/t-to-xy/eval-de-casteljau-with-err.ts:146](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/t-to-xy/eval-de-casteljau-with-err.ts#L146)*

Evaluates the given bezier curve at the parameter t, including error.
* **precondition**: 49-bit aligned coordinates

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | An order 1, 2 or 3 bezier curve, e.g. [[0,0],[1,1],[2,1],[2,0]] |
`t` | number[] | The parameter value where the bezier should be evaluated  |

**Returns:** *object*

* **p**: *number[][]*

* **pE**: *number[]*
