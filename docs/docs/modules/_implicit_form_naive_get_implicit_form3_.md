---
id: "_implicit_form_naive_get_implicit_form3_"
title: "implicit-form/naive/get-implicit-form3"
sidebar_label: "implicit-form/naive/get-implicit-form3"
---

[flo-bezier3](../globals.md) › ["implicit-form/naive/get-implicit-form3"](_implicit_form_naive_get_implicit_form3_.md)

## Index

### Variables

* [abs](_implicit_form_naive_get_implicit_form3_.md#const-abs)

### Functions

* [getImplicitForm3](_implicit_form_naive_get_implicit_form3_.md#getimplicitform3)

## Variables

### `Const` abs

• **abs**: *abs* = Math.abs

*Defined in [src/implicit-form/naive/get-implicit-form3.ts:5](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/naive/get-implicit-form3.ts#L5)*

## Functions

###  getImplicitForm3

▸ **getImplicitForm3**(`ps`: number[][]): *object*

*Defined in [src/implicit-form/naive/get-implicit-form3.ts:18](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/naive/get-implicit-form3.ts#L18)*

Returns an approximate implicit form of the given cubic bezier and a
coefficientwise error bound.
* the error bound needs to be multiplied by γ === nu/(1-nu), where
u === Number.EPSILON / 2
* the coordinates of the given bezier must be 47-bit aligned
* Adapted from http://www.mare.ee/indrek/misc/2d.pdf
* takes about 1.2 micro-seconds on a 1st gen i7 and Chrome 79

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] |   |

**Returns:** *object*

* ### **coeffs**: *object*

  * **v**: *number*

  * **vᵧ**: *number*

  * **vᵧᵧ**: *number*

  * **vᵧᵧᵧ**: *number*

  * **vₓ**: *number*

  * **vₓᵧ**: *number*

  * **vₓᵧᵧ**: *number*

  * **vₓₓ**: *number*

  * **vₓₓᵧ**: *number*

  * **vₓₓₓ**: *number*

* ### **errorBound**: *object*

  * **v_**: *number*

  * **vᵧ_**: *number*

  * **vᵧᵧ_**: *number*

  * **vᵧᵧᵧ_**: *number*

  * **vₓ_**: *number*

  * **vₓᵧ_**: *number*

  * **vₓᵧᵧ_**: *number*

  * **vₓₓ_**: *number*

  * **vₓₓᵧ_**: *number*

  * **vₓₓₓ_**: *number*
