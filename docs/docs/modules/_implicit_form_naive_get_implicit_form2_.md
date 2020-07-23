---
id: "_implicit_form_naive_get_implicit_form2_"
title: "implicit-form/naive/get-implicit-form2"
sidebar_label: "implicit-form/naive/get-implicit-form2"
---

[flo-bezier3](../globals.md) › ["implicit-form/naive/get-implicit-form2"](_implicit_form_naive_get_implicit_form2_.md)

## Index

### Functions

* [getImplicitForm2](_implicit_form_naive_get_implicit_form2_.md#getimplicitform2)

## Functions

###  getImplicitForm2

▸ **getImplicitForm2**(`ps`: number[][]): *object*

*Defined in [src/implicit-form/naive/get-implicit-form2.ts:14](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/naive/get-implicit-form2.ts#L14)*

Returns an approximate implicit form of the given quadratic bezier and a
coefficientwise error bound.
* the error bound needs to be multiplied by γ === nu/(1-nu), where
u === Number.EPSILON / 2
* the coordinates of the given bezier must be 47-bit aligned
* Adapted from http://www.mare.ee/indrek/misc/2d.pdf

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] |   |

**Returns:** *object*

* ### **coeffs**: *object*

  * **v**: *number*

  * **vᵧ**: *number*

  * **vᵧᵧ**: *number*

  * **vₓ**: *number*

  * **vₓᵧ**: *number*

  * **vₓₓ**: *number*

* ### **errorBound**: *object*

  * **v_**: *number*

  * **vᵧ_**: *number*

  * **vᵧᵧ_**: *number*

  * **vₓ_**: *number*

  * **vₓᵧ_**: *number*

  * **vₓₓ_**: *number*
