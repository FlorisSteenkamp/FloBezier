---
id: "_implicit_form_naive_get_implicit_form1_"
title: "implicit-form/naive/get-implicit-form1"
sidebar_label: "implicit-form/naive/get-implicit-form1"
---

[flo-bezier3](../globals.md) › ["implicit-form/naive/get-implicit-form1"](_implicit_form_naive_get_implicit_form1_.md)

## Index

### Functions

* [getImplicitForm1](_implicit_form_naive_get_implicit_form1_.md#getimplicitform1)

## Functions

###  getImplicitForm1

▸ **getImplicitForm1**(`ps`: number[][]): *object*

*Defined in [src/implicit-form/naive/get-implicit-form1.ts:13](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/naive/get-implicit-form1.ts#L13)*

Returns an approximate implicit form of the given linear bezier and a
coefficientwise error bound.
* the error bound needs to be multiplied by γ === nu/(1-nu), where
u === Number.EPSILON / 2
* Adapted from http://www.mare.ee/indrek/misc/2d.pdf

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] |   |

**Returns:** *object*

* ### **coeffs**: *object*

  * **v**: *number*

  * **vᵧ**: *number*

  * **vₓ**: *number*

* ### **errorBound**: *object*

  * **v_**: *number*
