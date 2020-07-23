---
id: "_implicit_form_exact_get_implicit_form2_"
title: "implicit-form/exact/get-implicit-form2"
sidebar_label: "implicit-form/exact/get-implicit-form2"
---

[flo-bezier3](../globals.md) › ["implicit-form/exact/get-implicit-form2"](_implicit_form_exact_get_implicit_form2_.md)

## Index

### Variables

* [eCalculate](_implicit_form_exact_get_implicit_form2_.md#ecalculate)
* [eProduct](_implicit_form_exact_get_implicit_form2_.md#eproduct)
* [expansionProduct](_implicit_form_exact_get_implicit_form2_.md#expansionproduct)

### Functions

* [getImplicitForm2Exact](_implicit_form_exact_get_implicit_form2_.md#getimplicitform2exact)

## Variables

###  eCalculate

• **eCalculate**: *[eCalculate](_implicit_form_exact_get_implicit_form3_.md#ecalculate)*

*Defined in [src/implicit-form/exact/get-implicit-form2.ts:7](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/exact/get-implicit-form2.ts#L7)*

___

###  eProduct

• **eProduct**: *[eProduct](_implicit_form_exact_get_implicit_form3_.md#eproduct)*

*Defined in [src/implicit-form/exact/get-implicit-form2.ts:7](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/exact/get-implicit-form2.ts#L7)*

___

###  expansionProduct

• **expansionProduct**: *[expansionProduct](_implicit_form_exact_get_implicit_form2_.md#expansionproduct)*

*Defined in [src/implicit-form/exact/get-implicit-form2.ts:7](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/exact/get-implicit-form2.ts#L7)*

## Functions

###  getImplicitForm2Exact

▸ **getImplicitForm2Exact**(`ps`: number[][]): *object*

*Defined in [src/implicit-form/exact/get-implicit-form2.ts:15](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/exact/get-implicit-form2.ts#L15)*

Returns the exact implicit form of the given quadratic bezier.
Adapted from http://www.mare.ee/indrek/misc/2d.pdf

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] |   |

**Returns:** *object*

* **v**: *number[]*

* **vᵧ**: *number[]*

* **vᵧᵧ**: *number[]*

* **vₓ**: *number[]*

* **vₓᵧ**: *number[]*

* **vₓₓ**: *number[]*
